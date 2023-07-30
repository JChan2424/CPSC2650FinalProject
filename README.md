# CPSC2650FinalProject

## Models

**User**
- username: String
- password: String (sha256 hash)
- role: String
- firstName: String
- lastName: String
- subscribed_topics: String[]
- announcements: Announcement[]

**Announcement**
- title: String
- message: String
- topic: String
- author: User
- createdAt: String (date in ISO format, 2011-10-05T14:48:00.000Z)

## Routes

### Backend

#### All Users (No Auth Required)
- GET /api/announcements - Retrieves all announcements
- GET /api/announcements/:id - Retrieves a specific announcement by its ID
- GET /api/announcements/last/:count - Retrieves the last 'count' number of announcements
- POST /api/signup - Signs up a new user and starts a session
- GET /api/search - Provides search functionality across the platform

#### Users (USER, MODERATOR, ADMIN)
- GET /api/announcements/:topic - Retrieves all announcements under a specific topic
- GET /api/verify - Checks the current session for authentication status
- POST /api/login - Logs in a user and starts a session
- GET /account - Account overview page for a logged in user
- GET /logout - Log out and ends session
- GET /announcements/:topic - Announcements page filtered by a specific topic

#### Moderators (MODERATOR, ADMIN)
- POST /api/announcements - Add a new announcement

#### Admins (ADMIN)
- GET /api/users/:username - Retrieves user info for a specific user
- POST /api/users/ - Creates a new user (or updates if user exists and request is authenticated)
- DELETE /api/announcements/:id - Deletes a specific announcement by its ID

### Frontend
- GET / - Homepage
- GET /login - Login page
- GET /signup - Sign up page
- GET /announcements - Announcements page showing all announcements
