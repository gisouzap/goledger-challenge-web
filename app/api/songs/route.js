import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      `http://ec2-54-91-215-149.compute-1.amazonaws.com/api/query/search`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa('psAdmin:goledger')}`,
        },
        body: JSON.stringify({
          query: {
            selector: {
              '@assetType': 'song',
            },
          },
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch songs.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data.result);
  } catch (error) {
    console.error('Error fetching songs:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
