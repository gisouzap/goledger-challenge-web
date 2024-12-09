import { NextResponse } from 'next/server';

export async function DELETE(request) {
  try {
    const body = await request.json();

    const response = await fetch(
      `http://ec2-54-91-215-149.compute-1.amazonaws.com/api/invoke/deleteAsset`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa('psAdmin:goledger')}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete asset');
    }

    const data = await response.json();

    return NextResponse.json({ message: 'Asset deleted successfully', data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete asset' },
      { status: 500 }
    );
  }
}
