## Notes API – Overview

This backend is a simple **note taking REST API** built with **NestJS**, **TypeScript**, and **PostgreSQL/TypeORM**.
It exposes authentication endpoints and protected CRUD operations for personal notes.

- **Base URL**: `http://localhost:3000`
- **Swagger UI**: `http://localhost:3000/api`
- **Auth style**: JWT **Bearer** token in the `Authorization` header

```http
Authorization: Bearer <accessToken>
```

### Main Modules

- **Auth**
  - `POST /auth/register` – create a new user and get tokens
  - `POST /auth/login` – login and get tokens
  - `POST /auth/refresh` – get new tokens using a refresh token
- **Notes** (requires valid access token)
  - `GET /notes` – list current user's notes
  - `GET /notes/:id` – get a single note by id (only if owned by the user)
  - `POST /notes` – create a note
  - `PUT /notes/:id` – update a note
  - `DELETE /notes/:id` – delete a note

### Running the API

See `README.md` for installation, running, and testing commands.

### Where to Start

- For detailed authentication flow and payloads, see `AUTH.md`.
- For detailed notes endpoints and examples, see `NOTES.md`.


