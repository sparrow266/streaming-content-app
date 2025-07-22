# Streaming Content App

A full-stack application for streaming video content featuring a NestJS backend API and Next.js frontend. This application allows users to browse, search, and stream video content with full authentication support.

## Project Goals

Create a Streaming Content App where users can:
- Browse a list of available streaming videos (mock or static URLs)
- Click into a video to view its details and play it

## Deliverable Showcase

This project demonstrates:
- End-to-end implementation of a simple content viewer
- Practical understanding of backend API architecture, database modeling, and SSR/CSR
- Clean, testable code and thoughtful technical decisions

## Features

- **Content Streaming:** Browse and watch streaming video content
- **User Authentication:** Secure JWT-based authentication system
- **Content Management:** CRUD operations for streaming content
- **Responsive UI:** Mobile-friendly interface built with Next.js
- **API Documentation:** Interactive Swagger documentation
- **Database Seeding:** Pre-populated content and admin user

## Tech Stack

### Backend
- **Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** JWT
- **API Documentation:** Swagger/OpenAPI

### Frontend
- **Framework:** Next.js with TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API

### Infrastructure
- **Containerization:** Docker & Docker Compose
- **API Testing:** Postman Collection

## Project Structure

```
streaming-content-app/
├── backend/               # NestJS backend application
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   ├── streaming/     # Streaming content module
│   │   └── auth/          # Authentication module
│   ├── test/              # Test files
│   ├── package.json
│   └── tsconfig.json
└── frontend/              # Next.js frontend application
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   └── services/
    ├── public/
    ├── package.json
    └── tsconfig.json
```

## Prerequisites

- Docker and Docker Compose (recommended)
- Node.js v16 or later (if running without Docker)
- PostgreSQL (if running without Docker)

## Quick Start with Docker

The easiest way to get started is using Docker Compose:

```bash
# Start all services
docker-compose up -d

# Check logs if needed
docker-compose logs -f
```

### Docker Setup

The application uses Docker Compose to orchestrate three containers:

1. **Backend (NestJS)**: Built from `backend/Dockerfile`
   - Exposes port 3000 for the API
   - Connected to the PostgreSQL container

2. **Frontend (Next.js)**: Built from `frontend/Dockerfile`
   - Exposes port 3001 for the web interface
   - Configured to communicate with the backend API

3. **PostgreSQL**: Uses the official PostgreSQL image
   - Data persistence through Docker volume
   - Automatically runs database initialization

This will start:
- Backend API on http://localhost:3000
- Frontend on http://localhost:3001
- PostgreSQL database on port 5432

### Default Admin User

```
Email: admin@example.com
Password: password123
```

## Manual Setup

### Backend Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Configure PostgreSQL:
   - Create a database named `streaming_content_db`
   - Create a `.env` file based on `.env.example`
   - Update database connection settings if needed

3. Run migrations and seed data:
   ```bash
   npm run typeorm:migration:run
   npm run seed
   ```

4. Start the backend server:
   ```bash
   npm run start:dev
   ```

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Configure the environment:
   - Create a `.env.local` file
   - Set `NEXT_PUBLIC_API_URL=http://localhost:3000/api`

3. Start the development server:
   ```bash
   npm run dev

## API Documentation

### Swagger UI

The backend provides interactive API documentation via Swagger UI:

1. Start the backend server (either with Docker or manually)
2. Navigate to http://localhost:3000/api/docs
3. Use the Swagger UI to explore and test all API endpoints
4. Authenticate using the admin credentials to access protected endpoints

### Postman Collection

A Postman collection is included in the project root (`streaming-content-api.postman_collection.json`):

1. Import the collection into Postman
2. Create an environment with the following variables:
   - `baseUrl`: `http://localhost:3000/api`
   - `token`: (will be automatically set after login)
3. Run the login request first to authenticate
4. Test other endpoints using the obtained token

## Available Endpoints

### Authentication
- `POST /api/auth/login` - Authenticate user and get JWT token
- `POST /api/auth/register` - Register a new user

### Streaming Content
- `GET /api/streaming` - Get all streaming content items
- `GET /api/streaming/:id` - Get a specific content item
- `POST /api/streaming` - Create a new content item (auth required)
- `PUT /api/streaming/:id` - Update a content item (auth required)
- `DELETE /api/streaming/:id` - Delete a content item (auth required)

## Design Decisions & Challenges

### Architecture
- **Modular Backend**: NestJS modules for clear separation of concerns between streaming content and authentication
- **TypeORM**: Used for type-safe database interactions with PostgreSQL
- **Next.js Frontend**: Server-side rendering for improved SEO and performance
- **Docker Multi-Container**: Separate containers for backend, frontend, and database for isolation and easy development

### Challenges & Solutions

1. **TypeScript Type Errors**:
   - Fixed TypeORM findOne method usage to correctly use FindOneOptions
   - Added proper type checking for potentially undefined values

2. **Docker Configuration**:
   - Updated Dockerfile paths to correctly include public assets
   - Fixed container networking to ensure proper communication

3. **Next.js Image Optimization**:
   - Configured domains for external images via next.config.js
   - Added proper image attributes for optimal loading performance

4. **API Root Endpoint**:
   - Added a dedicated root endpoint to provide API information
   - Ensures users don't encounter 404 when accessing the API root

### Future Improvements

1. **Testing**:
   - Add missing type declarations for test files
   - Increase test coverage for backend services

2. **Node.js Version Upgrade**:
   - Update to Node.js 18+ for better performance and features

3. **Additional Features**:
   - User profile management
   - Content categories and filtering
   - Watch history and recommendations
   - Responsive design improvements

4. **Deployment**:
   - Configure CI/CD pipelines
   - Production-ready environment variables
   - Dockerized production builds
3. Start the frontend development server:
   ```
   npm run dev
   ```

## Technologies Used

### Backend
- NestJS - Node.js framework
- TypeORM - ORM for database interactions
- PostgreSQL - Database
- JWT - Authentication
- class-validator - Input validation
- Jest - Testing

### Frontend
- Next.js - React framework with SSR
- TypeScript - Type safety
- TailwindCSS - Styling
- React Testing Library - Component testing
- react-player - Video playback

## API Endpoints

- GET /api/streaming - List all content
- GET /api/streaming/:id - Fetch a single content item
- POST /api/streaming - Add new content (Protected)
- PUT /api/streaming/:id - Update content (Protected)
- DELETE /api/streaming/:id - Delete content (Protected)

## Design Decisions & Notes

- **Authentication**: JWT-based authentication with a simple mock setup for demonstration purposes
- **Database**: Used TypeORM for database operations for its seamless integration with NestJS
- **Frontend Data Fetching**: Leveraged Next.js SSR capabilities for optimal performance and SEO
- **Video Player**: Used react-player for cross-browser compatibility and enhanced features
- **Styling**: Implemented TailwindCSS for rapid UI development and responsive design

## Future Improvements

- Implement user accounts and favorites
- Add content categories and filtering
- Implement content rating system
- Add video analytics (views, watch time)
- Improve video player with custom controls

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

As the creator of this codebase, you retain full ownership rights. The MIT License allows you to:

- Use the code commercially
- Distribute the code
- Modify the code
- Use it privately

Others who receive the code can do the same, provided they include the original copyright notice and license text.
