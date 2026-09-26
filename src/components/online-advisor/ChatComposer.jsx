import React, { useState } from 'react';
import { Send } from 'lucide-react';

const STARTERS = ['What’s the difference between an HMO and a PPO?', 'Do I qualify for a subsidy?', 'I’m losing my job coverage', 'Just me — I need coverage'];

export default function ChatComposer({ onSend, busy, error, showStarters }) {
  const [text, setText] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!text.trim() || busy) return;
    onSend(text);
    setText('');
  };

  return (
    <div className="border-t border-border p-4 space-y-3">
      {showStarters && (
        <div className="flex flex-wrap gap-2">
          {STARTERS.map((s) => (
            <button key={s} type="button" disabled={busy} onClick={() => onSend(s)} className="text-xs border border-primary/30 text-primary rounded-full px-3 py-2 hover:bg-primary-soft transition-colors">{s}</button>
          ))}
        </div>
      )}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <form onSubmit={submit} className="flex gap-2">
        <label htmlFor="online-advisor-input" className="sr-only">Message Sunny</label>
        <input id="online-advisor-input" value={text} onChange={(e) => setText(e.target.value)} maxLength={600} placeholder="Ask Sunny a question…" className="flex-1 h-12 rounded-xl border border-input bg-background px-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <button type="submit" disabled={busy || !text.trim()} aria-label="Send message" className="h-12 w-12 rounded-xl bg-accent hover:bg-accent-deep text-accent-foreground flex items-center justify-center shrink-0 disabled:cursor-not-allowed">
          <Send className="w-5 h-5" />
        </button>
      </form>
      <p className="text-[11px] text-muted-foreground">General information only — not licensed advice. Please don’t share SSNs, medical records, or payment details.</p>
    </div>
  );
}