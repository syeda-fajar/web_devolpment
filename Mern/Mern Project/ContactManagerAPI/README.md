# Contact Manager API

A RESTful API for managing contacts with MongoDB database integration.

## Features

-  Full CRUD operations for contacts
-  MongoDB database with Mongoose ODM
-  Schema validation (email format, required fields)
-  Duplicate email detection
-  Automatic timestamps
-  MVC architecture
-  Comprehensive error handling

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM (Object Data Modeling)

## Installation
```bash
npm install
```

## Setup

1. Make sure MongoDB is running locally on port 27017
2. Start the server:
```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contacts` | Get all contacts |
| GET | `/api/contacts/:id` | Get contact by ID |
| POST | `/api/contacts` | Create new contact |
| PUT | `/api/contacts/:id` | Update contact |
| DELETE | `/api/contacts/:id` | Delete contact |

## Request Example

### Create Contact
```json
POST /api/contacts

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

### Response (201)
```json
{
  "success": true,
  "data": {
    "_id": "673c5f8e9d8b2a1c3e4f5678",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "123 Main St",
    "createdAt": "2025-11-03T10:30:00.000Z",
    "updatedAt": "2025-11-03T10:30:00.000Z"
  }
}
```

## Project Structure
```
ContactManagerAPI/
├── config/
│   └── db.js              # Database connection
├── models/
│   └── Contact.js         # Mongoose schema
├── controllers/
│   └── contactController.js  # Business logic
├── routes/
│   └── contactRoutes.js   # API routes
├── server.js              # Entry point
└── package.json
```

## Learning Outcomes

**Project 2 of 5** in backend learning roadmap

- MongoDB connection and operations
- Mongoose schema design and validation
- MVC architectural pattern
- RESTful API best practices
- Database error handling

## Status

 **Completed** - Fully functional with all CRUD operations tested