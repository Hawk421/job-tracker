# Job Tracker

A full-stack job application tracker built with React, Node.js, Express and PostgreSQL.

The application allows users to create an account, log in, and manage their job applications with JWT authentication.

## 🌐 Live Demo

**Live application:**

https://job-tracker-hawk421.vercel.app

### Demo account

You can explore the application using the demo account:

- **Email:** `demo@jobtracker.app`
- **Password:** `Demo123456`

> This account is provided for demonstration purposes only.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT authentication
- Protected API routes
- User-specific job data
- Create, read, update and delete job applications
- Job status management
- Search and filtering
- Statistics dashboard
- Loading and error states
- Responsive UI
- PostgreSQL database
- Production deployment
- Local development with Vite and Express

## Tech Stack

### Frontend

- React
- React Router
- Vite
- JavaScript
- CSS
- Context API

### Backend

- Node.js
- Express
- PostgreSQL
- pg
- JSON Web Token
- bcryptjs
- CORS
- dotenv

### Database

- PostgreSQL
- Neon

### Deployment

- Vercel — frontend
- Render — backend
- Neon — PostgreSQL

## Architecture

```text
React / Vite
     │
     │ HTTPS
     ▼
Vercel
     │
     │ REST API
     ▼
Node.js / Express
     │
     │ PostgreSQL
     ▼
Neon PostgreSQL
```

## Authentication

The application uses JWT-based authentication.

The authentication flow is:

```text
Register
   ↓
Password hashing with bcrypt
   ↓
User stored in PostgreSQL
   ↓
Login
   ↓
JWT token generated
   ↓
Token sent with protected API requests
```

Protected job routes require a valid JWT token.

Each job is associated with the authenticated user through `user_id`, so users can only access their own job applications.

## API

### Authentication

#### Register

```http
POST /api/auth/register
```

Creates a new user account.

#### Login

```http
POST /api/auth/login
```

Authenticates a user and returns a JWT token.

### Jobs

All job routes require authentication.

#### Get all jobs

```http
GET /api/jobs
```

Returns jobs belonging to the authenticated user.

#### Get a single job

```http
GET /api/jobs/:id
```

Returns a specific job belonging to the authenticated user.

#### Create a job

```http
POST /api/jobs
```

Creates a new job application.

#### Update a job

```http
PUT /api/jobs/:id
```

Updates an existing job application.

#### Delete a job

```http
DELETE /api/jobs/:id
```

Deletes an existing job application.

## Database

The application uses PostgreSQL with two main tables:

### users

```text
id
email
password
created_at
```

### jobs

```text
id
company
position
status
user_id
```

The `user_id` column establishes a relationship between users and their job applications.

```text
users
  │
  └── user_id
        │
        ▼
       jobs
```

## Environment Variables

### Frontend

Create a `.env.local` file in the project root:

```env
VITE_API_URL=http://localhost:3000/api
```

For the production frontend, `VITE_API_URL` points to the deployed Render API.

### Backend

Create a `.env` file inside the `server` directory:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
FRONTEND_URL=http://localhost:5173
```

Environment files containing secrets are excluded from Git using `.gitignore`.

Use the provided `.env.example` files as templates.

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/Hawk421/job-tracker.git
cd job-tracker
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
cd ..
```

### 4. Configure environment variables

Create `.env.local` in the project root and `.env` inside the `server` directory.

Use the `.env.example` files as templates.

### 5. Start the backend

```bash
cd server
npm run dev
```

The API will run on:

```text
http://localhost:3000
```

### 6. Start the frontend

Open another terminal:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## Production Deployment

The project is deployed using three services:

```text
Frontend → Vercel
Backend  → Render
Database → Neon
```

The frontend communicates with the deployed Render API through the `VITE_API_URL` environment variable.

The backend connects to the Neon PostgreSQL database through `DATABASE_URL`.

CORS is configured using the `FRONTEND_URL` environment variable.

## Development Scripts

### Frontend

```bash
npm run dev
npm run build
npm run lint
```

### Backend

```bash
npm run dev
npm start
```

## Testing

The production application was tested for:

- User registration
- User login
- JWT authentication
- Protected API routes
- User-specific job data
- Creating job applications
- Updating job applications
- Deleting job applications
- CORS configuration
- Frontend-to-backend communication
- PostgreSQL data persistence

## GitHub

Repository:

https://github.com/Hawk421/job-tracker

## Author

Mike

Built as a full-stack portfolio project to practice React, Node.js, Express, REST APIs, JWT authentication, PostgreSQL and production deployment.
