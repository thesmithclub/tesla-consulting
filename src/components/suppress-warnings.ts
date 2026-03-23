// Suppress warnings related to library compatibility
if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const msg = args[0];
    if (typeof msg === 'string' && (
      msg.includes('dampingFactor')
    )) {
      return;
    }
    originalWarn(...args);
  };
}
