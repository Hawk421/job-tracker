# Job Tracker

A full-stack job application tracker built with React, Node.js, Express and PostgreSQL.

The application allows users to create an account, log in, and manage their job applications with JWT authentication.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT authentication
- Protected API routes
- Create, read, update and delete job applications
- PostgreSQL database
- User-specific job data
- Job status management
- Search and filtering
- Statistics dashboard
- Loading and error states
- Responsive UI
- Local development with Vite and Express
- Neon PostgreSQL database

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
- JWT
- bcryptjs
- CORS
- dotenv

### Database

- PostgreSQL
- Neon

## Project Structure

```text
job-tracker/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── api.js
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── .env.example
├── .gitignore
├── package.json
└── README.md