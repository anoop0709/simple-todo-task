# Todo App

A full-stack Todo application built with **React + TypeScript** (frontend) and **Node.js + GraphQL** (backend), featuring real-time task management and serverless weather enrichment.

---

## 🚀 Features

- Authentication (Register / Login / Logout)
- Task management (Create, Update, Delete, Toggle)
- Task board with drag & drop support
- Tags, due dates, and search
- Material UI library used for Front-end design
- Weather enrichment based on city names in task titles
- Serverless integration using AWS Lambda + API Gateway
- Mobile-friendly UI
- Snackbar notifications
- Robust error handling

---

## 🏗 Tech Stack

### Frontend

- React
- TypeScript
- Apollo Client
- Vite
- Material UI

### Backend

- Node.js
- GraphQL
- MongoDB
- JWT Authentication

### AWS

- AWS Lambda
- API Gateway

---

## ⚙️ Architecture Overview

- Tasks are fetched via `me → tasks` GraphQL query
- City names are extracted from task titles using NLP
- Weather data is fetched via a serverless Lambda function
- Results are merged into task notes dynamically

---

## 🧪 Run Locally

### 1. Backend

```bash
cd server
npm install
```

Create `.env` file:
please refer the .env.example file in the server folder.

```env
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
WEATHER_API_URL=https://6hiym7f9b3.execute-api.eu-west-2.amazonaws.com/dev/weather
NODE_ENV=dev
```

Run server:

```bash
npm run dev
```

👉 Runs at: http://localhost:4000/graphql

---

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

👉 Runs at: http://localhost:5173

---

## AWS Setup (Weather Service)

- Deploy Lambda using Serverless Framework
- API Gateway exposes `/weather` endpoint
- Uses external weather API
- Environment variable required:

```env
WEATHER_API_KEY=your_api_key
WEATHER_API_BASE_URL=url_for_weather_api
```

---

## Notes

- Weather data is dynamically injected at query time
- Apollo Client cache is used for UI updates
- Refetch is triggered after mutations to ensure consistency
- `.serverless/` and `.env` are excluded from version control

---

## 🗣 Design Decisions

- Used GraphQL field resolvers (`User.tasks`) for lazy data fetching
- Separated backend logic and serverless infrastructure
- Leveraged batching to optimize external API calls
- Used input types in mutations for scalability

---

## Mobile Authentication Note

This application uses cookie-based authentication with a separate frontend and backend domain.

On some mobile browsers (especially iOS Safari and Chrome mobile), third-party cookies may be blocked by default. This can prevent the authentication cookie from being stored, causing login to appear successful but not persist.

Why this happens

- Frontend and backend are hosted on different domains
- Mobile browsers enforce stricter privacy policies for cross-site cookies

Alternative

- Test on desktop browsers where cookies are allowed
