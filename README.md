# Online Bookstore Admin Panel

## Overview
A full-stack admin panel for managing an online bookstore, built with Angular (frontend), Node.js/Express (backend), and PostgreSQL. Features JWT authentication, logging, and unit testing.

## Tech Stack
- **Frontend:** Angular, Jasmine/Karma
- **Backend:** Node.js, Express, Sequelize, PostgreSQL, Jest
- **Authentication:** JWT
- **Logging:** Winston

## Features
- Admin login/logout (JWT)
- CRUD for Books (title, author, ISBN, price, stock, description, cover image)
- CRUD for Categories (name, description)
- Inventory management (update stock, low-stock alerts)
- Filter/search tables for books and categories
- Form validation (Angular Reactive Forms)
- Error handling and user-friendly messages
- Logging of actions and failures
- Route protection (Angular guards, Express middleware)
- Unit tests (frontend and backend)

## Project Structure
- `/frontend` - Angular app
- `/backend` - Node.js/Express API

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL

### 1. Backend Setup
```sh
cd backend
cp .env.example .env # Edit .env with your DB credentials
npm install
npm run db:init # (to create tables)
npm run dev # (start backend)
```

### 2. Frontend Setup
```sh
cd frontend
npm install
ng serve
```

### 3. Running Tests
- **Backend:** `npm test` in `/backend`
- **Frontend:** `ng test` in `/frontend`

### 4. Default Admin User
- Register via API or seed a user in the DB.

---

## Folder Details
- `/frontend/src/app/components` - Angular components
- `/frontend/src/app/services` - Angular services
- `/frontend/src/app/guards` - Angular route guards
- `/backend/controllers` - Express controllers
- `/backend/models` - Sequelize models
- `/backend/routes` - Express routes
- `/backend/middleware` - JWT, error handler
- `/backend/logs` - Winston logs

---

## Environment Variables (`backend/.env.example`)
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookstore
DB_USER=postgres
DB_PASS=yourpassword
JWT_SECRET=your_jwt_secret
```

---

## Notes
- Replace placeholder values in `.env` before running.
- For production, use LTS Node.js and secure your JWT secret.
- Cover image upload is stubbed; integrate with a storage service as needed.
