# Auth Controller API Documentation

The Auth Controller handles routes related to user authentication and authorization.

## Register User

- **Endpoint:** `/api/register`
- **Method:** POST
- **Description:** Registers a new user with the provided credentials.
- **Request Body Example:**

```
{
  "username": "john_doe",
  "password": "securepassword123",
  "confirmedPassword": "securepassword123",
  "invite": "valid_invite_code",
  "role": "admin"
}
```

- **Response Status Code:** 200 OK
- **Response Body Example:**

```
{
  "_id": "617f0d88236e100001000000",
  "username": "john_doe",
  "role": "admin"
}
```

- **Possible Status Codes:**
  - 400 Bad Request: If `username` or `password` is missing, or `password` and `confirmedPassword` do not match.
  - 401 Unauthorized: If the `invite` code is invalid.
  - 409 Conflict: If the provided `username` already exists in the database.

## User Login

- **Endpoint:** `/api/login`
- **Method:** POST
- **Description:** Authenticates the user with the provided credentials and returns an access token (JWT) upon successful login.
- **Request Body Example:**

```
{
  "username": "john_doe",
  "password": "securepassword123"
}
```

- **Response Status Code:** 200 OK
- **Response Body Example:**

```
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjMwNjAxOTI2LCJleHAiOjE2MzA2MDI4MjZ9.7TLDxvaBGdMZn64jGtv9O_4DBS_xRDRmO2q0Xquim8w"
}
```

- **Possible Status Codes:**
  - 400 Bad Request: If `username` or `password` is missing.
  - 401 Unauthorized: If the provided `username` and `password` do not match any user in the database.

## Verify Token

- **Endpoint:** `/api/verify`
- **Method:** POST
- **Description:** Verifies the validity of the provided access token (JWT) and checks if the token matches the role and username provided in the request.
- **Request Headers:**
  - `Authorization`: Bearer token
- **Request Body Example:**

```
{
  "role": "admin",
  "username": "john_doe"
}

```

- **Response Status Code:** 200 OK
- **Response Body Example:**

```
{
  "success": true,
  "username": "john_doe",
  "role": "admin"
}
```

- **Possible Status Codes:**
  - 400 Bad Request: If the token's role or username does not match the provided data in the request.
  - 401 Unauthorized: If the access token is invalid or expired.
  - 403 Forbidden: If no access token is provided in the request headers.

Please note that the role handling in this documentation is marked as "TODO: Fix Roles" and "TODO: Need to fix this," indicating that it may require further implementation or modification to ensure proper functionality. Additionally, the route `/api/register` checks for an invite code and sets the user's role accordingly. The route `/api/login` generates a JWT token for authentication, and `/api/verify` validates the provided JWT token to authenticate the user.
