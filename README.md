# Providers Nearby API

An Express + TypeScript + Bun + Sequelize API that returns the **nearest providers** (e.g., trainers, therapists, etc.) based on a user’s location.  
It supports sorting by **distance or rating**, pagination, and a reusable **test user middleware**.

---

## Tech Stack

- [Bun](https://bun.sh) (runtime & test runner)
- [Express](https://expressjs.com/)
- [Sequelize ORM](https://sequelize.org/)
- [MySQL 8+](https://www.mysql.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [@faker-js/faker](https://github.com/faker-js/faker) (for seeding fake data)

---

## Features

- `/providers/nearby` endpoint
- Filters providers within `X km` radius
- Sorts by distance or rating
- Pagination (`limit`, `page`)
- Test user support (injects fake providers)
- Bun native tests
- Works efficiently with huge data set using spatial index

---

## Installation

### 1. Clone the repo

```bash
git clone https://github.com/CeazarMasula/providers-nearby.git
cd providers-nearby
```

### 2. Install dependencies

```bash
bun install
```

### 3. Setup environment

Create .env with your database credentials:

```bash
DATABASE_URL=mysql://root:password@127.0.0.1:3306/providers_db
PORT=3000
```

### 4. Database Setup

Run db migration `src\migrations\table-migrations.sql` to add the tables

### 5. Seed Fake Data

Create .env with your database credentials:

```bash
bun run src/seeders/seedProviders.ts
```

### 5. Run the Server

Start the API:

```bash
bun run dev
```

You should see:

```bash
Database connected
Server running at http://localhost:3000
```

### 7. Test the API

`POST http://localhost:3000/providers/nearby`

Request body

```json
{
  "latitude": 1.35,
  "longitude": 103.86,
  "limit": 3,
  "distance": 10,
  "sortby": "distance"
}
```

Example Response

```json
{
  "data": [
    {
      "id": 600,
      "name": "Lindsay Dickinson III",
      "latitude": 1.3485180186060242,
      "longitude": 103.86295087449396,
      "overAllRating": 3.6,
      "distance_km": 0.3670957526193117
    },
    {
      "id": 1,
      "name": "Carlos Bogan",
      "latitude": 1.3515600686633311,
      "longitude": 103.863390041267,
      "overAllRating": 4.1,
      "distance_km": 0.41485911405952114
    },
    {
      "id": 688,
      "name": "Harold Abshire",
      "latitude": 1.346820835127461,
      "longitude": 103.85613178633076,
      "overAllRating": 2.6,
      "distance_km": 0.5566610630882682
    }
  ]
}
```

### 8. Running Tests

```bash
bun test
```
