# Burger Backend API

Express.js backend for the Burger app. It provides OTP-based mobile authentication, JWT-protected user profile APIs, MongoDB persistence, and production-oriented middleware for security, CORS, logging, rate limiting, and errors.

## Hosted Backend URL

Not deployed yet. Deployment to Render/Railway and MongoDB Atlas requires project owner credentials and platform access.

- Backend live URL: `TBD`
- API base URL: `http://localhost:5000/api` locally, hosted URL after deployment
- Database hosting: MongoDB Atlas recommended

## Folder Structure

```text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.js
├── .env.example
├── server.js
├── package.json
└── README.md
```

## Installation

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` with your MongoDB and OTP provider credentials.

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `NODE_ENV` | No | `development` or `production`. |
| `PORT` | No | API port. Defaults to `5000`. |
| `CORS_ORIGIN` | Yes | Comma-separated frontend origins, for example `http://localhost:3000`. |
| `MONGODB_URI` | Yes | MongoDB connection string. MongoDB Atlas is recommended for deployment. |
| `DB_CONNECTION_TIMEOUT_MS` | No | MongoDB connection timeout. Defaults to `10000`. |
| `JWT_SECRET` | Yes | Long random string used to sign JWTs. |
| `JWT_EXPIRES_IN` | No | JWT lifetime, for example `7d`. |
| `OTP_PROVIDER` | Yes | Use `twilio` in production or `mock` for local development. |
| `OTP_EXPIRY_MINUTES` | No | OTP expiry window. Defaults to `5`. |
| `TWILIO_ACCOUNT_SID` | If Twilio | Twilio account SID. |
| `TWILIO_AUTH_TOKEN` | If Twilio | Twilio auth token. |
| `TWILIO_VERIFY_SERVICE_SID` | If Twilio | Twilio Verify service SID. |

## Local Development

For local development without Twilio, set:

```env
OTP_PROVIDER=mock
MONGODB_URI=mongodb://127.0.0.1:27017/burger
JWT_SECRET=local-development-secret
```

Run:

```bash
npm run dev
```

The API will run at `http://localhost:5000/api`.

## API Response Format

Success:

```json
{
  "success": true,
  "message": "Profile fetched successfully.",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Authentication token is required.",
  "error": {
    "code": "AUTH_TOKEN_REQUIRED",
    "details": null
  }
}
```

## API Documentation

### GET `/api/health`

Checks service and database status.

Example response:

```json
{
  "success": true,
  "message": "API is healthy.",
  "data": {
    "service": "burger-backend",
    "uptime": 12.4,
    "database": "connected",
    "timestamp": "2026-06-18T10:00:00.000Z"
  }
}
```

### POST `/api/auth/send-otp`

Request body:

```json
{
  "mobileNumber": "+919876543210"
}
```

Example response:

```json
{
  "success": true,
  "message": "OTP sent successfully.",
  "data": {
    "mobileNumber": "+919876543210",
    "channel": "sms",
    "expiresInMinutes": 5
  }
}
```

In `OTP_PROVIDER=mock` development mode, the response also includes `devOtp`.

### POST `/api/auth/verify-otp`

Request body:

```json
{
  "mobileNumber": "+919876543210",
  "otp": "123456",
  "name": "Demo User",
  "email": "demo@example.com"
}
```

Example response:

```json
{
  "success": true,
  "message": "Account created and verified successfully.",
  "data": {
    "accessToken": "jwt-token",
    "tokenType": "Bearer",
    "isNewUser": true,
    "user": {
      "name": "Demo User",
      "mobileNumber": "+919876543210",
      "email": "demo@example.com",
      "profileImage": "",
      "lastLogin": "2026-06-18T10:00:00.000Z",
      "isVerified": true,
      "createdAt": "2026-06-18T10:00:00.000Z",
      "updatedAt": "2026-06-18T10:00:00.000Z",
      "id": "..."
    }
  }
}
```

### POST `/api/auth/logout`

Requires `Authorization: Bearer <token>`.

Example response:

```json
{
  "success": true,
  "message": "Logged out successfully. Remove the token from the client.",
  "data": null
}
```

### GET `/api/user/profile`

Requires `Authorization: Bearer <token>`.

Example response:

```json
{
  "success": true,
  "message": "Profile fetched successfully.",
  "data": {
    "user": {
      "id": "...",
      "name": "Demo User",
      "mobileNumber": "+919876543210",
      "email": "demo@example.com",
      "profileImage": "",
      "lastLogin": "2026-06-18T10:00:00.000Z",
      "isVerified": true,
      "createdAt": "2026-06-18T10:00:00.000Z",
      "updatedAt": "2026-06-18T10:00:00.000Z"
    }
  }
}
```

### PUT `/api/user/profile`

Requires `Authorization: Bearer <token>`.

Request body:

```json
{
  "name": "Updated User",
  "email": "updated@example.com",
  "profileImage": "https://example.com/avatar.png"
}
```

Example response:

```json
{
  "success": true,
  "message": "Profile updated successfully.",
  "data": {
    "user": {
      "id": "...",
      "name": "Updated User",
      "mobileNumber": "+919876543210",
      "email": "updated@example.com",
      "profileImage": "https://example.com/avatar.png",
      "isVerified": true
    }
  }
}
```

## Database Schema

`User` fields:

- `_id`
- `name`
- `mobileNumber`
- `email`
- `profileImage`
- `createdAt`
- `updatedAt`
- `lastLogin`
- `isVerified`

## Seed Data

After configuring `.env`, run:

```bash
npm run seed
```

This creates or updates a verified demo user with mobile number `+919999999999`.

## Deployment Details

### MongoDB Atlas

1. Create a MongoDB Atlas project and cluster.
2. Create a database user.
3. Add the Render/Railway outbound IP to Network Access, or temporarily allow access from anywhere for initial testing.
4. Copy the connection string into `MONGODB_URI`.

### Render

1. Create a new Web Service.
2. Set root directory to `backend`.
3. Set build command to `npm install`.
4. Set start command to `npm start`.
5. Add all environment variables from `.env.example`.
6. Deploy and copy the generated Render URL into this README.

### Railway

1. Create a new Railway service from the repository.
2. Set the service root to `backend`.
3. Add all environment variables from `.env.example`.
4. Deploy and copy the generated Railway URL into this README.

## Production Notes

- Use `OTP_PROVIDER=twilio` in production.
- Use a strong `JWT_SECRET`.
- Restrict `CORS_ORIGIN` to the deployed frontend origin.
- Stateless JWT logout requires the client to delete its token. Add a token denylist if immediate server-side invalidation is required.
