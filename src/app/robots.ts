export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://free-for-dev.vercel.app/sitemap.xml',
  };
}
