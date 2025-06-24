import { NextResponse } from 'next/server';
import { getToolsData } from '@/lib/data';

// Edge runtime enabled after removing fs/path module usage
export const runtime = 'edge';

export async function GET() {
  try {
    const { tools, categories } = await getToolsData();
    
    const response = {
      meta: {
        source: 'https://github.com/ripienaar/free-for-dev',
        lastUpdated: new Date().toISOString(),
        totalTools: tools.length,
        totalCategories: categories.length,
        description: 'Real-time parsed data from the free-for-dev GitHub repository'
      },
      tools,
      categories
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch tools data',
        message: 'Unable to fetch or parse the free-for-dev repository data'
      },
      { status: 500 }
    );
  }
}

// Add OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
