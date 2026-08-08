import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QRCodeImageProps {
  value: string;
  size?: number;
  className?: string;
}

export const QRCodeImage: React.FC<QRCodeImageProps> = ({ value, size = 180, className }) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(value, { width: size * 2, margin: 1, color: { dark: '#004449', light: '#ffffff' } })
      .then((url) => { if (!cancelled) setDataUrl(url); })
      .catch(() => { if (!cancelled) setDataUrl(null); });
    return () => { cancelled = true; };
  }, [value, size]);

  if (!dataUrl) {
    return (
      <div
        className={`flex items-center justify-center bg-[#f5f3f0] text-[#6f797a] ${className ?? ''}`}
        style={{ width: size, height: size }}
      >
        <span className="material-symbols-outlined animate-pulse text-2xl">qr_code_2</span>
      </div>
    );
  }

  return <img src={dataUrl} alt="Scan to pay via UPI" width={size} height={size} className={className} />;
};
