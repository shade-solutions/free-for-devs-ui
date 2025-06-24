import { NextResponse } from 'next/server';
import { getToolsMetadata } from '@/lib/data';

export async function GET() {
    try {
        const metadata = await getToolsMetadata();

        const response = {
            ...metadata,
            source: 'https://github.com/ripienaar/free-for-dev',
            apiEndpoint: 'https://free-on.pages.dev/api/tools',
            documentation: 'https://free-on.pages.dev/about',
            features: [
                'Real-time data from GitHub repository',
                'Automatic parsing and categorization',
                'RESTful API access',
                'CORS enabled for cross-origin requests',
                'Cached for optimal performance'
            ]
        };

        return NextResponse.json(response, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error) {
        console.error('Stats API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch metadata' },
            { status: 500 }
        );
    }
}
