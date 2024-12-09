import { NextResponse } from 'next/server';

export async function PUT(request) {
  try {
    const body = await request.json();

    const response = await fetch(
      `http://ec2-54-91-215-149.compute-1.amazonaws.com/api/invoke/updateAsset`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa('psAdmin:goledger')}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update asset');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating asset:', error);
    return NextResponse.json(
      { error: 'Failed to update asset' },
      { status: 500 }
    );
  }
}
