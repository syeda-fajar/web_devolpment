# User Authentication API

JWT-based authentication system with secure password handling and protected routes.

## Features

- User registration with bcrypt password hashing  
- User login with JWT token generation  
- Protected routes using auth middleware  
- Automatic password hashing (Mongoose pre-save hook)  
- Token-based authentication (stateless)  
- Environment variables for secrets  
- Secure password comparison with custom schema methods  

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT token generation & verification
- **dotenv** - Environment variables

## Installation
```bash
npm install
```

## Environment Setup

Create `.env` file:
```
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
```

## Run
```bash
npm run dev
```

Server runs on `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login & get JWT token | No |
| GET | `/api/auth/me` | Get current user profile | Yes |

## Request Examples

### Register
```json
POST /api/auth/register

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```json
POST /api/auth/login

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "673c5f8e...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User"
  }
}
```

### Get Profile (Protected)
```
GET /api/auth/me
Headers: 
  Authorization: Bearer YOUR_TOKEN_HERE
```

## Project Structure
```
UserAuthAPI/
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   └── User.js            # User schema with methods
├── controllers/
│   └── authController.js  # Auth logic
├── routes/
│   └── authRoutes.js      # API routes
├── middleware/
│   └── authMiddleware.js  # JWT verification
├── server.js              # Entry point
└── .env                   # Environment variables
```

## Learning Progress

**Project 4 of 5** - Backend Development Roadmap

### Completed:
-  Day 1: User registration with bcrypt hashing
-  Day 2: Login with JWT token generation
-  Day 3: Protected routes with auth middleware
-  Day 4: Testing & completion

### Key Concepts Mastered:
- Password hashing with bcrypt & salt
- Mongoose pre-save hooks
- Custom schema methods
- JWT token generation & verification
- Auth middleware pattern
- Protected routes
- Token-based stateless authentication
- Environment variables for secrets
- Security best practices

## Security Features

- Passwords hashed with bcrypt (10 salt rounds)  
- JWT tokens for stateless authentication  
- Passwords excluded from API responses  
- Token expiration (7 days default)  
- Same error messages for auth failures (security)  
- Environment variables for sensitive data  

## Status

 **Complete** - Full authentication system with registration, login, and protected routes