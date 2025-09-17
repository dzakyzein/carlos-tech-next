export async function trackVisitor() {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const platform = isMobile ? 'MOBILE' : 'DESKTOP';

  try {
    await fetch('/api/visitors/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform }),
    });
  } catch (error) {
    console.error('Gagal track visitor:', error);
  }
}
