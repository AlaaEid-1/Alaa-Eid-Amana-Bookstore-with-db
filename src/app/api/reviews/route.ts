import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');

    // Read reviews from JSON file
    const reviewsPath = path.join(process.cwd(), 'src', 'app', 'data', 'reviews.json');
    const reviewsData = fs.readFileSync(reviewsPath, 'utf8');
    const allReviews: { id: string; bookId: string; author: string; rating: number; title: string; comment: string; timestamp: string; verified: boolean; }[] = JSON.parse(reviewsData);

    // Filter reviews by bookId if provided
    const reviews = bookId
      ? allReviews.filter((review) => review.bookId === bookId)
      : allReviews;

    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
