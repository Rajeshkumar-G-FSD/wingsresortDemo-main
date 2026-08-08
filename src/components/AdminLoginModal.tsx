import React, { useState } from 'react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ADMIN_USERNAME = 'krazywingsresort@gmail.com';
const ADMIN_PASSWORD = '123456';

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string; auth?: string }>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!username.trim()) next.username = 'Enter your admin email.';
    if (!password.trim()) next.password = 'Enter your password.';
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    if (username.trim() !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      setErrors({ auth: 'Incorrect email or password.' });
      return;
    }
    setErrors({});
    setUsername('');
    setPassword('');
    onSuccess();
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn" onClick={handleClose}>
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-[#e4e2df] bg-[#fbf9f6] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-[#004449] hover:bg-white"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div className="flex flex-col items-center bg-[#004449] px-8 pb-8 pt-10 text-center text-white">
          <img src="/images/wings_resort_ooty_icon.png" alt="Wings Resort" className="h-14 w-auto" />
          <h2 className="mt-4 font-headline text-2xl font-semibold">Admin Login</h2>
          <p className="mt-1 text-xs text-white/70">Sign in to manage bookings</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4 p-8">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#004449]">Email</label>
            <input
              type="email"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setErrors((p) => ({ ...p, username: undefined, auth: undefined })); }}
              autoComplete="username"
              className={`w-full rounded-xl border px-4 py-3 text-sm text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#004449]/30 ${errors.username ? 'border-[#c0392b]' : 'border-[#e0dcd3]'}`}
              placeholder="krazywingsresort@gmail.com"
            />
            {errors.username && <p className="mt-1 text-xs text-[#c0392b]">{errors.username}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#004449]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined, auth: undefined })); }}
              autoComplete="current-password"
              className={`w-full rounded-xl border px-4 py-3 text-sm text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#004449]/30 ${errors.password ? 'border-[#c0392b]' : 'border-[#e0dcd3]'}`}
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-xs text-[#c0392b]">{errors.password}</p>}
          </div>
          {errors.auth && <p className="text-xs font-semibold text-[#c0392b]">{errors.auth}</p>}
          <button type="submit" className="w-full rounded-full bg-[#004449] py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition hover:bg-[#0e5d63]">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
