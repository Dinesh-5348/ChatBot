# Lumen Chatbot

A React chatbot powered by Groq through a Vercel serverless API route.

## Run locally

1. Add your key to `.env`:

   ```env
   GROQ_API_KEY=your_groq_api_key
   ```

2. Install dependencies and start the app:

   ```bash
   npm install
   npm run dev
   ```

The browser calls `/api/chat`; the Groq API key stays on the server and is never bundled into client-side JavaScript.

## Deploy to Vercel

Import this repository into Vercel and add `GROQ_API_KEY` under the project environment variables. Vercel detects the Vite frontend and the `api/chat.js` serverless function automatically.

For local serverless development, install the Vercel CLI and run `vercel dev`.
