import React, { useEffect, useState } from 'react';

export const LoadingScreen: React.FC = () => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLeaving(true), 1450);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`site-loader ${leaving ? 'site-loader--leaving' : ''}`} aria-label="Loading Wings Resort">
      <img src="/images/wings_resort_ooty_icon.png" alt="" className="loader-icon" aria-hidden="true" />
      <p className="loader-wordmark">WINGS RESORT</p>
      <p className="loader-subtitle">LUXURY RESORT LIVING</p>
      <div className="loader-line"><span /></div>
      <p className="loader-copy">Creating your tropical escape</p>
    </div>
  );
};
