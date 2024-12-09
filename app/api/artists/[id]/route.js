import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const response = await fetch(
      `http://ec2-54-91-215-149.compute-1.amazonaws.com/api/query/readAsset`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa('psAdmin:goledger')}`,
        },
        body: JSON.stringify({
          key: {
            '@assetType': 'artist',
            '@key': id,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch artist');
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching artist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artist' },
      { status: 500 }
    );
  }
}
