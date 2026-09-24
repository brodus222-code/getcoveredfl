import React, { useEffect, useRef } from 'react';
import { Shield } from 'lucide-react';

export default function ChatThread({ messages, busy }) {
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4" aria-live="polite">
      {messages.map((m, i) => m.role === 'assistant' ? (
        <div key={i} className="flex gap-3 max-w-[90%]">
          <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-accent" />
          </div>
          <p className="bg-sand border-l-2 border-accent rounded-r-xl px-4 py-3 text-sm text-navy leading-relaxed whitespace-pre-line">{m.content}</p>
        </div>
      ) : (
        <div key={i} className="flex justify-end">
          <p className="bg-primary text-primary-foreground rounded-xl rounded-br-sm px-4 py-3 text-sm max-w-[85%] whitespace-pre-line break-words">{m.content}</p>
        </div>
      ))}
      {busy && (
        <div className="flex gap-3 items-center text-sm text-navy-soft pl-11">
          <span className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-navy-soft animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-navy-soft animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 rounded-full bg-navy-soft animate-bounce [animation-delay:300ms]" />
          </span>
          Guide is typing…
        </div>
      )}
    </div>
  );
}