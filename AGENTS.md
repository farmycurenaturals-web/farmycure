# AGENTS.md

## Project Overview
Organic_02 is a monorepo with three packages:
- **backend** - Express.js API server (port defined in src/server.js)
- **user_frontend** - React + Vite user-facing app ("farmycure")
- **admin_frontend** - React + Vite admin dashboard

## Tech Stack
- **Backend:** Node.js, Express 5, Mongoose, JWT auth, bcryptjs
- **Frontends:** React, Vite, Tailwind CSS, React Router v7
- **User frontend extras:** Firebase, Framer Motion, react-helmet-async
- **Admin frontend extras:** lucide-react

## Commands

### Backend
```
cd Organic_02/backend && npm run dev
```

### User Frontend
```
cd Organic_02/user_frontend && npm run dev
```

### Admin Frontend
```
cd Organic_02/admin_frontend && npm run dev
```

## Conventions
- Backend uses CommonJS (`"type": "commonjs"`)
- Frontends use ES modules (`"type": "module"`)
- Tailwind CSS is used for styling in both frontends
- No test framework is configured yet
