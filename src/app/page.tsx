import { Suspense } from 'react';
import { Metadata } from 'next';
import { getToolsData, getToolsMetadata } from '@/lib/data';
import Navigation from '@/components/Navigation';
import ToolsPage from '@/components/ToolsPage';
import LoadingSpinner from '@/components/LoadingSpinner';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getToolsMetadata();

  return {
    title: `Free for Developers - ${metadata.totalTools}+ Free Tools & Services`,
    description: `Discover ${metadata.totalTools}+ amazing free tools and services for developers across ${metadata.totalCategories}+ categories. From APIs to hosting, analytics to databases - everything you need to build your next project.`,
    keywords: [
      'free developer tools',
      'free APIs',
      'free hosting',
      'developer resources',
      'SaaS',
      'PaaS',
      'IaaS',
      'open source tools',
      'freemium services',
      'developer productivity'
    ],
    authors: [{ name: 'Free for Developers' }],
    openGraph: {
      title: `Free for Developers - ${metadata.totalTools}+ Free Tools & Services`,
      description: `Discover ${metadata.totalTools}+ amazing free tools and services for developers`,
      type: 'website',
      url: 'https://free-on.pages.dev',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Free for Developers - Tool Discovery Platform'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `Free for Developers - ${metadata.totalTools}+ Free Tools`,
      description: `Discover amazing free tools and services for developers`,
      images: ['/og-image.png']
    },
    alternates: {
      canonical: 'https://free-on.pages.dev'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    }
  };
}

export default async function Home() {
  const { tools, categories, lastUpdated } = await getToolsData();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <Suspense fallback={<LoadingSpinner />}>
        <ToolsPage
          initialTools={tools}
          initialCategories={categories}
          lastUpdated={lastUpdated}
        />
      </Suspense>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Free for Developers",
            "description": `Discover ${tools.length}+ amazing free tools and services for developers`,
            "url": "https://free-on.pages.dev",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://free-on.pages.dev/?search={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": tools.length,
              "itemListElement": tools.slice(0, 10).map((tool, index) => ({
                "@type": "SoftwareApplication",
                "position": index + 1,
                "name": tool.name,
                "description": tool.description,
                "url": tool.url,
                "applicationCategory": tool.category,
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": tool.pricingModel === 'free' ? "0" : "varies",
                  "priceCurrency": "USD"
                }
              }))
            }
          })
        }}
      />
    </div>
  );
}
