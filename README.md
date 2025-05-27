ReadX is a microservices-based reading tracking application built with NestJS. It helps users manage their reading lists, track their reading progress, and discover new books.

## Architecture

The application follows a microservices architecture with three main services:

1. **API Gateway** (Port 3000)
   - Entry point for all client requests
   - Routes requests to appropriate microservices
   - Handles request validation and transformation

2. **Library Service** (Port 3001)
   - Manages book and author information
   - Handles book catalog operations
   - Stores book metadata and user library data
   - Uses PostgreSQL database (library_db)

3. **Tracker Service** (Port 3002)
   - Manages user reading progress
   - Tracks reading sessions and statistics
   - Stores user reading history
   - Uses PostgreSQL database (tracker_db)

## Features

*Flow diagram showing the architecture and data flow of the Library Service*

![flow](https://github.com/user-attachments/assets/f87916fd-33b3-485e-a8c6-6ac81831503e)



*Same goes applies on tracker service*



## Tech Stack

- **Backend Framework**: NestJS
- **Language**: TypeScript
- **Databases**: PostgreSQL
- **Containerization**: Docker
- **API Communication**: TCP (Microservices)
- **Validation**: class-validator, class-transformer

## Prerequisites

- Node.js 18 or higher
- Docker and Docker Compose
- PostgreSQL (if running locally)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ReadX
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

   This will start all services:
   - API Gateway on http://localhost:3000
   - Library Service on port 3001
   - Tracker Service on port 3002
   - Library Database on port 5432
   - Tracker Database on port 5433

3. Access the API:
   - All API endpoints are prefixed with `/api`
   - Example: `http://localhost:3000/api/books`

## Development

### Running Services Individually

Each service can be run independently for development:

```bash
# API Gateway
cd api-gateway
npm install
npm run start:dev

# Library Service
cd library-service
npm install
npm run start:dev

# Tracker Service
cd tracker-service
npm install
npm run start:dev
```

### Database Migrations

The Library Service includes database migrations. To run migrations:

```bash
cd library-service
npm run typeorm:migration:run
```

## API Endpoints

All endpoints are prefixed with `/api` and are accessible through the API Gateway (Port 3000).

### Books
- `GET /books` - Get all books
- `GET /books/:id` - Get book by ID
- `POST /books` - Create new book
- `PUT /books/:id` - Update book
- `DELETE /books/:id` - Delete book

### Authors
- `GET /authors` - Get all authors
- `GET /authors/:id` - Get author by ID
- `POST /authors` - Create new author
- `PUT /authors/:id` - Update author
- `DELETE /authors/:id` - Delete author

### User Library
- `GET /library` - Get user's library
- `POST /library/books` - Add book to library
- `DELETE /library/books/:id` - Remove book from library

### Reading Progress
- `GET /progress/:bookId` - Get reading progress for a book
- `POST /progress` - Start tracking reading progress
- `PUT /progress/:id` - Update reading progress
- `DELETE /progress/:id` - Stop tracking reading progress

### Reading Statistics
- `GET /statistics` - Get user's reading statistics
- `GET /statistics/:bookId` - Get statistics for specific book

### Reading History
- `GET /history` - Get user's reading history
- `GET /history/:bookId` - Get reading history for specific book

## End Points Screenshots

![Screenshot 2025-05-27 at 11 33 56 PM](https://github.com/user-attachments/assets/67cd638a-76ab-4a0d-97aa-4b66cc990ebb)
![Screenshot 2025-05-27 at 11 34 15 PM](https://github.com/user-attachments/assets/a8e660b2-37d9-417e-9ab4-58f6ab62fc21)
![Screenshot 2025-05-27 at 11 34 21 PM](https://github.com/user-attachments/assets/940eb721-3770-4afd-a740-042ce7159173)
<img width="1440" alt="Screenshot 2025-05-27 at 11 34 26 PM" src="https://github.com/user-attachments/assets/05b03c59-8c8d-49c3-a7c3-f145dc877d5e" />
<img width="1440" alt="Screenshot 2025-05-27 at 11 34 33 PM" src="https://github.com/user-attachments/assets/f3416eb2-cb53-46dc-a6bd-6b8feeb139e0" />
![Screenshot 2025-05-27 at 11 34 38 PM](https://github.com/user-attachments/assets/1efda6ea-af5a-4397-9971-5b5115c41e52)
![Screenshot 2025-05-27 at 11 34 42 PM](https://github.com/user-attachments/assets/5d705fe8-1647-4638-a64c-3a4a7bf286b2)
![Screenshot 2025-05-27 at 11 34 45 PM](https://github.com/user-attachments/assets/770f3238-c3be-4f64-b0c1-0b41f1213ff1)
![Screenshot 2025-05-27 at 11 34 48 PM](https://github.com/user-attachments/assets/16ab22d7-5616-4a66-a1a7-a33b6ff2b89f)
![Screenshot 2025-05-27 at 11 34 51 PM](https://github.com/user-attachments/assets/a305a727-39ef-4709-bd3f-682ded8b7baf)
<img width="1440" alt="Screenshot 2025-05-27 at 11 34 55 PM" src="https://github.com/user-attachments/assets/cfe564cd-a871-4cf4-91c3-209e8bf5f1cd" />
![Screenshot 2025-05-27 at 11 34 58 PM](https://github.com/user-attachments/assets/a8a2edcd-c479-43b9-97d6-8c426ddc7275)
![Screenshot 2025-05-27 at 11 35 02 PM](https://github.com/user-attachments/assets/dd9382a4-bbd4-4c29-b3ef-8c44c4fb9446)
![Screenshot 2025-05-27 at 11 35 05 PM](https://github.com/user-attachments/assets/bc933686-5531-4b23-8e76-5bde3dacba80)
<img width="1440" alt="Screenshot 2025-05-27 at 11 35 08 PM" src="https://github.com/user-attachments/assets/65f7a254-d9c9-41c1-96dc-ea9d58eb9314" /># ReadX


## Docker Support

Each service includes a Dockerfile for containerization. The `docker-compose.yml` file orchestrates all services:

- Uses Node.js 18 Alpine as base image
- Includes proper environment configuration
- Sets up networking between services
- Manages database volumes for data persistence

## License

This project is licensed under the MIT License.
