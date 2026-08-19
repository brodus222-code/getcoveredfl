import React from 'react';
import { MailCheck, MailX } from 'lucide-react';

export default function WelcomeEmailBadge({ sent }) {
  return sent ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 text-green-800 px-2.5 py-1 text-xs font-semibold">
      <MailCheck className="w-3.5 h-3.5" />
      Welcome email sent
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 px-2.5 py-1 text-xs font-semibold">
      <MailX className="w-3.5 h-3.5" />
      Welcome email pending
    </span>
  );
}