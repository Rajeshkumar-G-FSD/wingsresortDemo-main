import React, { useEffect, useState } from 'react';

export const LoadingScreen: React.FC = () => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLeaving(true), 1450);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`site-loader ${leaving ? 'site-loader--leaving' : ''}`} aria-label="Loading Palm and Coast">
      <div className="loader-mark" aria-hidden="true">✦</div>
      <p className="loader-wordmark">PALM &amp; COAST</p>
      <p className="loader-subtitle">HOME STYLING STUDIO</p>
      <div className="loader-line"><span /></div>
      <p className="loader-copy">Creating your tropical escape</p>
    </div>
  );
};
