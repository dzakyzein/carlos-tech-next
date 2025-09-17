'use client';
import { useEffect } from 'react';

export default function VisitorTracker() {
  useEffect(() => {
    const device = /Mobi|Android/i.test(navigator.userAgent)
      ? 'mobile'
      : 'desktop';

    fetch('/api/visitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ device }),
    }).catch((err) => console.error('Visitor tracking error:', err));
  }, []);

  return null; // tidak render apapun
}
