import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { asset } = await request.json();

    console.log('asset', asset);
    if (!asset) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const response = await fetch(
      `http://ec2-54-91-215-149.compute-1.amazonaws.com/api/invoke/createAsset`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa('psAdmin:goledger')}`,
        },
        body: JSON.stringify({ asset }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to create playlist');
    }

    const data = await response.json();

    return NextResponse.json({
      message: 'playlist created successfully',
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create playlist' },
      { status: 500 }
    );
  }
}
