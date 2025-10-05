import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import clientPromise from '../../../../lib/mongodb';

export async function GET() {
  try {
    // Temporarily use JSON data instead of MongoDB due to connection issues
    const booksPath = path.join(process.cwd(), 'src', 'app', 'data', 'books.json');
    const booksData = fs.readFileSync(booksPath, 'utf8');
    const books = JSON.parse(booksData);
    return NextResponse.json(books);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('Bookstore');
    const body = await request.json();
    // Generate a unique id string for the book
    const { insertedId } = await db.collection('books').insertOne({
      ...body,
      id: new Date().getTime().toString()
    });
    return NextResponse.json({ message: 'Book added', id: insertedId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add book' }, { status: 500 });
  }
}
