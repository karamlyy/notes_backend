## Notes – Endpoints

All notes endpoints are **protected** and require a valid **JWT access token**.

- **Base URL**: `http://localhost:3000`
- **Swagger UI**: `http://localhost:3000/api`

```http
Authorization: Bearer <accessToken>
```

Each note has the following shape:

```json
{
  "id": 1,
  "title": "Günün planı",
  "content": "Səhər idman, sonra kod yazmaq...",
  "createdAt": "2025-11-14T10:15:30.000Z",
  "updatedAt": "2025-11-14T11:00:00.000Z"
}
```

---

### List Notes

- **Method**: `GET`
- **URL**: `/notes`
- **Auth required**: Yes (Bearer token)

**Description**

Returns all notes that belong to the currently authenticated user.

**Success (200 OK)**

```json
[
  {
    "id": 1,
    "title": "Günün planı",
    "content": "Səhər idman, sonra kod yazmaq...",
    "createdAt": "2025-11-14T10:15:30.000Z",
    "updatedAt": "2025-11-14T11:00:00.000Z"
  }
]
```

---

### Get Single Note

- **Method**: `GET`
- **URL**: `/notes/:id`
- **Auth required**: Yes

**Path params**

- `id` – integer, note id

**Success (200 OK)**

Returns the note if it belongs to the current user.

**Errors**

- `404 Not Found` – note does not exist
- `403 Forbidden` – note exists but belongs to another user

---

### Create Note

- **Method**: `POST`
- **URL**: `/notes`
- **Auth required**: Yes

**Request body**

```json
{
  "title": "Günün planı",
  "content": "Səhər idman, sonra kod yazmaq..."
}
```

Constraints:

- `title`: string, length 1–200
- `content`: string

**Success (201 Created)**

Returns the created note (shape may vary slightly depending on serialization):

```json
{
  "id": 1,
  "title": "Günün planı",
  "content": "Səhər idman, sonra kod yazmaq...",
  "createdAt": "2025-11-14T10:15:30.000Z",
  "updatedAt": "2025-11-14T10:15:30.000Z"
}
```

---

### Update Note

- **Method**: `PUT`
- **URL**: `/notes/:id`
- **Auth required**: Yes

**Path params**

- `id` – integer, note id

**Request body**

All fields are optional; send only what you want to change.

```json
{
  "title": "Yeni başlıq",
  "content": "Yenilənmiş content"
}
```

**Success (200 OK)**

- Returns the updated note.

**Errors**

- `404 Not Found` – note does not exist
- `403 Forbidden` – note belongs to another user

---

### Delete Note

- **Method**: `DELETE`
- **URL**: `/notes/:id`
- **Auth required**: Yes

**Path params**

- `id` – integer, note id

**Success (200 OK)**

- Note is removed (for the current user).

**Errors**

- `404 Not Found` – note does not exist
- `403 Forbidden` – note belongs to another user


