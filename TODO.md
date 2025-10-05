# TODO: Integrate MongoDB with Next.js using Vercel Serverless Functions

## 1. Install Dependencies
- [x] Install mongodb package using npm

## 2. Create Database Connection Utility
- [ ] Create lib/mongodb.js for MongoDB connection

## 3. Create API Routes for Books
- [ ] Create app/api/books/route.js for GET all books and POST new book
- [ ] Create app/api/books/[id]/route.js for GET, PUT, DELETE book by ID

## 4. Migrate Existing Data
- [ ] Create a migration script to insert books from books.json into MongoDB

## 5. Update Frontend
- [x] Update components to fetch data from API instead of local books.json

## 6. Testing
- [x] Test API endpoints locally
- [x] Ensure frontend works with new API

## 7. Deployment
- [ ] Deploy to Vercel and verify functionality
