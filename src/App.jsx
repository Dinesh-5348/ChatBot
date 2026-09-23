import { useEffect, useRef, useState } from 'react'
import './App.css'

const starterMessage = {
  role: 'assistant',
  content: 'Welcome to Lumen. Ask me anything and I will help you think it through.',
}

function App() {
  const [messages, setMessages] = useState([starterMessage])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const endOfMessages = useRef(null)

  useEffect(() => {
    endOfMessages.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  async function sendMessage(event) {
    event.preventDefault()
    const content = input.trim()
    if (!content || isLoading) return

    const nextMessages = [...messages, { role: 'user', content }]
    setMessages(nextMessages)
    setInput('')
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: nextMessages,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error?.message || data.message || `Request failed with status ${response.status}`)
      }
      const reply = data.content
      if (!reply) throw new Error('The API returned an empty response.')
      setMessages((current) => [...current, { role: 'assistant', content: reply }])
    } catch (requestError) {
      setError(requestError.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  function clearConversation() {
    setMessages([starterMessage])
    setError('')
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">*</span><span>Lumen</span></div>
        <div className="sidebar-copy">
          <span className="eyebrow">Personal assistant</span>
          <h1>Make room<br />for better<br /><em>thinking.</em></h1>
          <p>A quiet place to ask, explore, and make sense of the next thing.</p>
        </div>
        <div className="sidebar-footer"><span className="status-dot" /> Groq Qwen 3.8 27B <span className="version">v1.0</span></div>
      </aside>

      <section className="chat-panel">
        <header className="chat-header">
          <div><span className="eyebrow">Conversation</span><h2>New thought</h2></div>
          <button className="clear-button" type="button" onClick={clearConversation} title="Clear conversation">↺ <span>Clear</span></button>
        </header>

        <div className="messages" aria-live="polite">
          {messages.map((message, index) => (
            <article className={`message ${message.role}`} key={`${message.role}-${index}`}>
              <div className="message-label">{message.role === 'assistant' ? 'Lumen' : 'You'}</div>
              <p>{message.content}</p>
            </article>
          ))}
          {isLoading && <article className="message assistant"><div className="message-label">Lumen</div><p className="typing"><span /><span /><span /></p></article>}
          <div ref={endOfMessages} />
        </div>

        {error && <div className="error-message" role="alert">{error}</div>}
        <form className="composer" onSubmit={sendMessage}>
          <textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask anything..." rows="1" aria-label="Message" onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); event.currentTarget.form.requestSubmit() } }} />
          <button className="send-button" type="submit" disabled={!input.trim() || isLoading} aria-label="Send message">↑</button>
        </form>
        <p className="disclaimer">Lumen can make mistakes. Check important information.</p>
      </section>
    </main>
  )
}

export default App
