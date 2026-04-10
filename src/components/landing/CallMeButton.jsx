import React, { useState } from 'react';
import { Phone, CheckCircle2 } from 'lucide-react';

export default function CallMeButton() {
  const [confirmed, setConfirmed] = useState(false);

  const handleClick = () => {
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 3000);
  };

  return (
    <div className="w-full" style={{ maxWidth: '420px' }}>
      {confirmed ? (
        <div
          className="flex items-center justify-center gap-2 text-white font-medium text-base rounded-full"
          style={{
            height: '54px',
            background: '#16a34a',
            boxShadow: '0px 2px 6px rgba(0,0,0,0.12)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Got it — your agent will call you in 2–3 minutes.</span>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="call-me-btn w-full flex items-center justify-center gap-2 text-white font-medium rounded-full"
          style={{
            height: '54px',
            background: '#0A84FF',
            boxShadow: '0px 2px 6px rgba(0,0,0,0.12)',
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif',
            paddingLeft: '22px',
            paddingRight: '22px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 150ms ease-out, box-shadow 100ms ease-out, transform 100ms ease-out',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#1A8FFF';
            e.currentTarget.querySelector('.phone-icon').style.transform = 'translateX(4px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#0A84FF';
            e.currentTarget.querySelector('.phone-icon').style.transform = 'translateX(0px)';
          }}
          onMouseDown={e => {
            e.currentTarget.style.background = '#006FE0';
            e.currentTarget.style.transform = 'translateY(1px)';
            e.currentTarget.style.boxShadow = '0px 1px 3px rgba(0,0,0,0.10)';
          }}
          onMouseUp={e => {
            e.currentTarget.style.background = '#1A8FFF';
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = '0px 2px 6px rgba(0,0,0,0.12)';
          }}
        >
          <Phone
            className="phone-icon flex-shrink-0"
            style={{ width: '18px', height: '18px', transition: 'transform 150ms ease-out' }}
          />
          <span>Skip the Form — Have an Agent Call Me</span>
        </button>
      )}
      <p className="text-center text-teal-200/70 mt-3" style={{ fontSize: '12px' }}>
        Licensed Florida agent will call you — no call centers.
      </p>
    </div>
  );
}