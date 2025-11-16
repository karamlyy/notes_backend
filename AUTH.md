## Authentication – Notes API

The Notes API uses **JWT-based authentication** with **access** and **refresh** tokens.
All protected endpoints (like notes CRUD) require an **access token** sent as a Bearer token.

- **Base URL**: `http://localhost:3000`
- **Swagger UI**: `http://localhost:3000/api`

```http
Authorization: Bearer <accessToken>
```

Tokens are returned in the same `AuthResponse` structure:

```json
{
  "user": {
    "id": 1,
    "name": "Karam Afandi",
    "email": "karam@example.com",
    "createdAt": "2025-11-14T10:15:30.000Z"
  },
  "accessToken": "ACCESS_TOKEN_HERE",
  "refreshToken": "REFRESH_TOKEN_HERE"
}
```

---

### Register

- **Method**: `POST`
- **URL**: `/auth/register`
- **Auth required**: No

**Request body**

```json
{
  "name": "Karam Afandi",
  "email": "karam@example.com",
  "password": "12345678"
}
```

Constraints (validated server-side):

- `name`: string, length 3–50
- `email`: must be a valid email, unique
- `password`: string, length 6–50

**Success (201 Created)**

- Returns `AuthResponse` with user + `accessToken` + `refreshToken`.

**Possible errors**

- `400 Bad Request` – validation error or email already exists

---

### Login

- **Method**: `POST`
- **URL**: `/auth/login`
- **Auth required**: No

**Request body**

```json
{
  "email": "karam@example.com",
  "password": "12345678"
}
```

**Success (200 OK)**

- Returns `AuthResponse` with new tokens.

**Possible errors**

- `401 Unauthorized` – email or password is incorrect

---

### Refresh Tokens

- **Method**: `POST`
- **URL**: `/auth/refresh`
- **Auth required**: No (uses refresh token instead)

**Request body**

```json
{
  "refreshToken": "REFRESH_TOKEN_HERE"
}
```

**Success (200 OK)**

- Returns `AuthResponse` with **new** `accessToken` and `refreshToken`.

**Possible errors**

- `403 Forbidden` – refresh token is invalid, expired, or does not match the user

---

### Typical Client Flow

1. **Register** or **Login** to receive `accessToken` and `refreshToken`.
2. Use `accessToken` as a **Bearer** token for all `/notes` endpoints.
3. When the access token expires, call **`POST /auth/refresh`** with the `refreshToken`.
4. Store and use the newly returned tokens from the refresh endpoint.


