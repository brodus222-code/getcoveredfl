import { useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { buildLead, cleanInfo, validateInfo } from '@/components/online-advisor/fields';

const GREETING = {
  role: 'assistant',
  content: "Hi! I'm the GetCoveredFL virtual guide. Ask me anything about Florida health insurance — ACA plans, PPOs, subsidies, COBRA, and more. I'll also gather what a licensed agent needs to prepare your quote. To start, who are you looking to cover?",
};

export default function useOnlineAdvisor() {
  const [messages, setMessages] = useState([GREETING]);
  const [info, setInfo] = useState({});
  const [summary, setSummary] = useState('');
  const [busy, setBusy] = useState(false);
  const [chatError, setChatError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const sending = useRef(false);

  const send = async (text) => {
    const content = text.trim().slice(0, 600);
    if (!content || sending.current) return;
    sending.current = true; setBusy(true); setChatError('');
    const next = [...messages, { role: 'user', content }];
    setMessages(next);
    try {
      const { data } = await base44.functions.invoke('onlineAdvisorChat', { messages: next, info });
      if (!data?.reply) throw new Error('No reply');
      setInfo((prev) => ({ ...prev, ...cleanInfo(data.info) }));
      if (data.summary) setSummary(data.summary);
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (e) {
      setChatError('The guide is unavailable right now. Please try again or call (855) 634-5343.');
    } finally { sending.current = false; setBusy(false); }
  };

  const updateInfo = (key, value) => setInfo((prev) => ({ ...prev, [key]: value }));

  const submit = async () => {
    if (sending.current || submitted) return;
    const message = validateInfo(info);
    if (message) { setSubmitError(message); return; }
    sending.current = true; setSubmitting(true); setSubmitError('');
    try {
      await base44.entities.Lead.create(buildLead(info, summary, messages));
      setSubmitted(true);
    } catch (e) {
      setSubmitError('Your request could not be sent. Please try again or call (855) 634-5343.');
    } finally { sending.current = false; setSubmitting(false); }
  };

  return { messages, info, busy, chatError, send, updateInfo, submit, submitting, submitError, submitted };
}