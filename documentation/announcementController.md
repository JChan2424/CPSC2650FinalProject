# Announcement Controller API Documentation

The Announcement Controller handles various routes related to announcements.

## Custom Middleware

`validateAnnoucement`

Middleware function to validate announcement data before creating a new announcement.

- Request Properties Modified:
  - req.body.topic: If null, it is set to "general"; otherwise, converted to lowercase.
  - req.body.date: Current date and time in ISO 8601 format.

## Routes

### Get All Announcements

- Endpoint: /api/announcements
- Method: GET
- Description: Returns all announcements.
- Response Status Code: 200 OK
- Response Body Example:

```
[
  {
    "_id": "617f0d88236e100001000000",
    "title": "New Announcement",
    "message": "This is the content of the announcement.",
    "topic": "important",
    "author": "John Doe",
    "createdAt": "2023-07-31T12:34:56Z"
  },
  // More announcements...
]
```

### Get Announcement by ID

- Endpoint: /api/announcements/:id
- Method: GET
- Description: Returns the announcement with the specified ID.
- Request URL Parameter:
  - `id`: The unique ID of the announcement.
- Response Status Code: 200 OK
- Response Body Example:

```
{
  "_id": "617f0d88236e100001000000",
  "title": "New Announcement",
  "message": "This is the content of the announcement.",
  "topic": "important",
  "author": "John Doe",
  "createdAt": "2023-07-31T12:34:56Z"
}
```

### Get Announcements by Topic

- **Endpoint:** `/api/announcements/topic/:topic`
- **Method:** GET
- **Description:** Returns announcements filtered by the specified topic.
- **Request URL Parameter:**
  - `topic`: The topic of announcements to retrieve.
- **Response Status Code:** 200 OK
- **Response Body Example:**

```
[
  {
    "_id": "617f0d88236e100001000000",
    "title": "New Announcement",
    "message": "This is the content of the announcement.",
    "topic": "important",
    "author": "John Doe",
    "createdAt": "2023-07-31T12:34:56Z"
  },
  // More announcements with the specified topic...
]

```

### Get Last X Announcements

- **Endpoint:** `/api/announcements/last/:count`
- **Method:** GET
- **Description:** Returns the last `count` announcements.
- **Request URL Parameter:**
  - `count`: The number of announcements to retrieve.
- **Response Status Code:** 200 OK
- **Response Body Example:**

```
[
  {
    "_id": "617f0d88236e100001000000",
    "title": "New Announcement",
    "message": "This is the content of the announcement.",
    "topic": "important",
    "author": "John Doe",
    "createdAt": "2023-07-31T12:34:56Z"
  },
  // Last X announcements...
]
```

### Create Announcement

- **Endpoint:** `/api/announcements`
- **Method:** POST
- **Description:** Creates a new announcement.
- **Request Body Example:**

```
{
  "title": "New Announcement",
  "message": "This is the content of the announcement.",
  "topic": "important",
  "author": "John Doe"
}
```

- **Response Status Code:** 200 OK
- **Response Body Example:**

```
{
  "_id": "617f0d88236e100001000000",
  "title": "New Announcement",
  "message": "This is the content of the announcement.",
  "topic": "important",
  "author": "John Doe",
  "createdAt": "2023-07-31T12:34:56Z"
}
```

### Delete Announcement by ID

- **Endpoint:** `/api/announcements/:id`
- **Method:** DELETE
- **Description:** Deletes the announcement with the specified ID.
- **Request URL Parameter:**
  - `id`: The unique ID of the announcement to delete.
- **Response Status Code:** 200 OK
- **Response Body Example:**

```
{
  "deletedCount": 1
}
```

Please note that some routes marked with "!! DEBUG" may not be intended for production use and should be reviewed or removed accordingly.
