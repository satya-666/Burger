# Burger

A burger ordering web app built with Next.js and Express.

## Deployed Links

| Resource | URL |
| --- | --- |
| **Frontend** | https://burger-mu-sooty.vercel.app |
| **Backend API** | https://burger-mu-sooty.vercel.app/_/backend/api |
| **Database** | MongoDB Atlas (`cluster0.la83aha.mongodb.net` — `burger` database) |

## Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS, Framer Motion
- **Backend:** Express.js, Mongoose, JWT
- **Database:** MongoDB Atlas
- **Hosting:** Vercel (monorepo)

## Authentication

Email + password authentication with JWT tokens.

### API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/signup` | Create an account |
| POST | `/api/auth/login` | Log in |
| POST | `/api/auth/logout` | Log out (requires auth) |
| GET | `/api/health` | Health check |
| GET | `/api/user/profile` | Get profile (requires auth) |
| PUT | `/api/user/profile` | Update profile (requires auth) |

## Local Development

```bash
# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```
