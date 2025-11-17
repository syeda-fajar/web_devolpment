# User Authentication API

RESTful API with JWT-based authentication system.

## Features

- User registration with bcrypt password hashing
- User login with JWT token generation
- Automatic password hashing (Mongoose pre-save hook)
- Environment variables for secrets
- Secure password comparison

## Tech Stack

- **Node.js** - Runtime
- **Express.js** - Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT tokens

## Installation
```bash
npm install
```

## Setup

Create `.env`:
```
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
```

## Run
```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & get JWT token |

## Learning Progress

**Project 4 of 5** - Backend Roadmap

-  Day 1: User registration + password hashing
-  Day 2: Login + JWT token generation
-  Day 3: Protected routes + auth middleware
-  Day 4: Testing & polish

## Key Concepts Learned

- Password hashing with bcrypt & salt
- Mongoose pre-save hooks
- Custom schema methods
- JWT token generation & payload
- Environment variables
- Security best practices