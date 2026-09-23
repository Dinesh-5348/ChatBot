export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed.' })
  }

  const { messages } = request.body || {}
  if (!Array.isArray(messages) || messages.length === 0) {
    return response.status(400).json({ error: 'Messages are required.' })
  }

  if (!process.env.GROQ_API_KEY) {
    return response.status(500).json({ error: 'GROQ_API_KEY is not configured.' })
  }

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'qwen/qwen3.8-27b',
        messages,
        temperature: 0.7,
      }),
    })

    const data = await groqResponse.json()
    if (!groqResponse.ok) {
      return response.status(groqResponse.status).json({
        error: data.error?.message || data.message || 'Groq request failed.',
      })
    }

    return response.status(200).json({
      content: data.choices?.[0]?.message?.content || '',
    })
  } catch {
    return response.status(502).json({ error: 'Unable to reach Groq.' })
  }
}