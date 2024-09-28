# Project Documentation

## Prerequisites

- Node.js (v20 or higher)
- Yarn or npm
- PostgreSQL (or any other SQL database)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yandens/jr-be-recharge-test.git
cd jr-be-recharge-test
```

### 2. Install Dependencies

```bash
yarn install
```
or
```bash
npm install
```

### 3. Set Environment Variables

Copy the `.env.example` file to `.env` and set the environment variables.

```bash
cp .env.example .env
```

### 4. Run Migrations

```bash
yarn prisma migrate dev
```
or
```bash
npx prisma migrate dev
```

### 5. Seed the Database

```bash
yarn run seed
```
or
```bash
npm run seed
```

### 6. Start the Development Server

```bash
yarn dev
```
or
```bash
npm run dev
```

The server will start at `http://localhost:xxxx`. The port number will be displayed in the terminal with the port number you defined in the `.env` file.

### 7. Run Tests

```bash
yarn test
```
or
```bash
npm test
```

## API Endpoints

### Authentication

- `POST /api/auth/login`: Login with email and password
- `POST /api/auth/logout`: Logout - `Requires authentication`

### News Categories

- `GET /api/news-categories`: Get all news categories - `Requires authentication`
- `POST /api/news-categories`: Create a news category - `Requires authentication`
- `PUT /api/news-categories/:id`: Update a news category by ID - `Requires authentication`
- `DELETE /api/news-categories/:id`: Delete a news category by ID - `Requires authentication`

### News

- `GET /api/news`: Get all news
- `GET /api/news/:id`: Get a news by ID 
- `GET /api/news/search`: Search news
- `POST /api/news`: Create a news - `Requires authentication`
- `PUT /api/news/:id`: Update a news by ID - `Requires authentication`
- `DELETE /api/news/:id`: Delete a news by ID - `Requires authentication`


## Additional Notes

- The API uses JWT for authentication. You need to send the `Authorization` header with the `Bearer` token for protected routes.
- The API uses Prisma ORM for database operations.
- The API uses Jest for testing.
- Default database is PostgreSQL, if you want to use another database, you need to change the database URL in the `.env` file and database provider in `prisma/schema.prisma`.



