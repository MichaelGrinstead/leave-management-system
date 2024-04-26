# Project Setup

## Prerequisites

- PHP (with Composer)
- Node.js (with `pnpm`)
- MySQL

## Setup

Navigate to the backend from the root directory

```bash
cd backend
```

Create a .env and fill in the environment variables for the MYSQL Database

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

run

```bash
composer install
php artisan migrate
```

start the backend server

```bash
php artisan serve
```

Navigate to the frontend from the root directory

```bash
cd frontend
pnpm install
```

Create a .env and fill in the environment variable for the API URL

```
VITE_API_URL=
```

start the frontend server

```bash
pnpm run dev
```
