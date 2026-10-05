import { useState } from 'react'
import { Send } from 'lucide-react'
import { tenantMessages } from '../../data.jsx'
import { PageHeader, Avatar } from '../../components/ui.jsx'

export default function Messages() {
  const [messages, setMessages] = useState(tenantMessages)
  const [draft, setDraft] = useState('')

  const send = (e) => {
    e.preventDefault()
    if (!draft.trim()) return
    setMessages([...messages, { id: Date.now(), from: 'tenant', text: draft, time: 'now', date: 'Today' }])
    setDraft('')
  }

  return (
    <div>
      <PageHeader title="Messages" sub="Chat with property management" />

      <div className="card flex flex-col h-[520px]">
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-thin">
          {messages.map((m) => (
            <div key={m.id} className={'flex gap-3 ' + (m.from === 'tenant' ? 'flex-row-reverse' : '')}>
              {m.from === 'management' ? (
                <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center text-xs font-semibold text-white shrink-0">PM</div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-semibold text-white shrink-0">KO</div>
              )}
              <div className={'max-w-[70%] ' + (m.from === 'tenant' ? 'text-right' : '')}>
                <div className={'rounded-xl px-4 py-2.5 text-sm inline-block text-left ' + (m.from === 'tenant' ? 'bg-emerald-600/25 text-slate-200' : 'bg-navy-900/80 text-slate-200')}>
                  {m.text}
                </div>
                <p className="text-xs text-slate-600 mt-1">{m.date} - {m.time}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={send} className="border-t border-navy-700/50 p-4 flex gap-3">
          <input className="input" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a message..." />
          <button type="submit" className="btn-primary px-4 inline-flex items-center justify-center">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
