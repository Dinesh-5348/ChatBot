import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    plugins: [react()],
    define: {
      'import.meta.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'import.meta.env.OpenAI_API_KEY': JSON.stringify(env.OpenAI_API_KEY),
      'import.meta.env.GROQ_API_KEY': JSON.stringify(env.GROQ_API_KEY),
    },
  }
})
