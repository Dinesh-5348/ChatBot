# Lumen Chatbot

A frontend-only React chatbot powered by the Groq API.

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

The browser calls the Groq API directly. This is suitable for local experiments only because the API key is bundled into client-side JavaScript. Use a backend or serverless proxy before deploying with a real key.
