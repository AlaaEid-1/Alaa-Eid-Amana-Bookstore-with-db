'use client';

import { useState } from 'react';
import BookGrid from '../components/BookGrid';
import { books } from '../data/books';

export default function BooksPage() {
  // Simple cart handler for demo purposes
  const handleAddToCart = (bookId: string) => {
    console.log(`Added book ${bookId} to cart`);
    // Here you would typically dispatch to a cart state or call an API
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">All Books</h1>
      <BookGrid books={books} onAddToCart={handleAddToCart} />
    </div>
  );
}
