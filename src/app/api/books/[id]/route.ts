import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import clientPromise from '../../../../../lib/mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Temporarily use JSON data instead of MongoDB due to connection issues
    const booksPath = path.join(process.cwd(), 'src', 'app', 'data', 'books.json');
    const booksData = fs.readFileSync(booksPath, 'utf8');
    const books = JSON.parse(booksData);
    const book = books.find((b: { id: string }) => b.id === id);
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch book' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db('bookstore');
    const body = await request.json();
    const result = await db.collection('books').updateOne(
      { id },
      { $set: body }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Book updated' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update book' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db('bookstore');
    const result = await db.collection('books').deleteOne({ id });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Book deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });
  }
}
