# Util Controller API Documentation

The Util Controller provides utility routes for handling specific functionalities.

## Search

- **Endpoint:** `/api/search/:term`
- **Method:** GET
- **Description:** Performs a search across all announcements for the specified `term` and returns matching results.
- **Request URL Parameter:**
  - `term`: The search term to look for in announcements.
- **Response Status Code:** 200 OK
- **Response Body Example:**

```
{
  "success": true,
  "data": [
    {
      "_id": "617f0d88236e100001000001",
      "title": "New Announcement",
      "message": "This is the content of the announcement.",
      "topic": "important",
      "author": "John Doe",
      "createdAt": "2023-07-31T12:34:56Z"
    },
    {
      "_id": "617f0d88236e100001000002",
      "title": "Another Announcement",
      "message": "Another important message.",
      "topic": "general",
      "author": "Jane Smith",
      "createdAt": "2023-08-01T09:00:00Z"
    },
    // More matching announcements...
  ]
}
```

- **Possible Status Codes:**
  - 200 OK: Successful search with matching results.
  - 400 Bad Request: If the `term` is not provided in the request URL.
  - 404 Not Found: If no matching announcements are found.

Please note that the search functionality in this documentation searches for the specified `term` in all fields of each announcement in the database and returns all matching announcements. The search is case-insensitive, meaning it matches results regardless of the case of the search term or the data in the announcements. Additionally, the route `/api/search/:term` utilizes the `util.getMongoClient()` function to obtain the MongoDB client instance, which should be appropriately implemented for proper database connection and querying. The route responds with a JSON object containing the search results if successful.
