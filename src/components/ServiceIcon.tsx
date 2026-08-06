import React from 'react';

interface ServiceIconProps {
  icon: 'vase' | 'armchair' | 'palm' | 'shell';
  className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ icon, className = 'w-10 h-10' }) => {
  switch (icon) {
    case 'vase':
      return (
        <svg className={`${className} fill-none stroke-current`} viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M12 3v6m0 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path d="M7 8c2.5 0 3-3 5-3s2.5 3 5 3" />
          <path d="M8 12h8l-1 8H9l-1-8z" />
          <path d="M10 20h4" />
        </svg>
      );
    case 'armchair':
      return (
        <svg className={`${className} fill-none stroke-current`} viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
          <path d="M3 11a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4z" />
          <path d="M6 17v3M18 17v3" />
        </svg>
      );
    case 'palm':
      return (
        <svg className={`${className} fill-none stroke-current`} viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M13 8c0-2.76-2.24-5-5-5S3 5.24 3 8c2.76 0 5 2.24 5 5" />
          <path d="M13 8c0-2.76 2.24-5 5-5s5 2.24 5 5c-2.76 0-5 2.24-5 5" />
          <path d="M12 13a5 5 0 0 0-5-5" />
          <path d="M12 13a5 5 0 0 1 5-5" />
          <path d="M12 21V8" />
        </svg>
      );
    case 'shell':
      return (
        <svg className={`${className} fill-none stroke-current`} viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9z" />
          <path d="M12 3v18M7.5 4.5c3 4.5 3 10.5 0 15M16.5 4.5c-3 4.5-3 10.5 0 15" />
        </svg>
      );
  }
};
