import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const authCredentials = Buffer.from(`psAdmin:goledger`).toString('base64');

    const response = await fetch(
      `http://ec2-54-91-215-149.compute-1.amazonaws.com/api/query/search`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${authCredentials}`,
        },
        body: JSON.stringify({
          query: {
            selector: {
              '@assetType': 'artist',
            },
          },
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch artists.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data.result);
  } catch (error) {
    console.error('Error fetching artists:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
