import React, { useState } from 'react';
import { CONTACT_INFO, GOOGLE_MAPS_PLACE_URL, GOOGLE_MAPS_EMBED_URL } from '../data/contactInfo';

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9]{10}$/;

const INITIAL_FORM: ContactFormState = { name: '', email: '', phone: '', message: '' };

const validate = (form: ContactFormState): ContactFormErrors => {
  const errors: ContactFormErrors = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  else if (form.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';

  if (!form.email.trim()) errors.email = 'Please enter your email.';
  else if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = 'Enter a valid email address.';

  if (!form.phone.trim()) errors.phone = 'Please enter your phone number.';
  else if (!PHONE_PATTERN.test(form.phone.trim().replace(/\s+/g, ''))) errors.phone = 'Enter a valid 10-digit phone number.';

  if (!form.message.trim()) errors.message = 'Please add a short message.';
  else if (form.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.';

  return errors;
};

const infoRows = [
  { icon: 'call', label: 'Contact Number', value: CONTACT_INFO.phone, href: `tel:+91${CONTACT_INFO.phone}` },
  { icon: 'chat', label: 'WhatsApp Number', value: CONTACT_INFO.whatsapp, href: `https://wa.me/91${CONTACT_INFO.whatsapp}` },
  { icon: 'phone_forwarded', label: 'Alternate Number', value: CONTACT_INFO.alternatePhone, href: `tel:+91${CONTACT_INFO.alternatePhone}` },
  { icon: 'mail', label: 'Official Email', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  { icon: 'location_on', label: 'Full Address', value: CONTACT_INFO.address },
];

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof ContactFormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const whatsappMessage = [
        'Hello Wings Resort! I would like to get in touch.',
        '',
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Message: ${form.message}`,
      ].join('\n');
      window.open(
        `https://wa.me/91${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`,
        '_blank',
        'noopener,noreferrer'
      );
      setSubmitted(true);
      setForm(INITIAL_FORM);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section id="contact" className="bg-[#fbf9f6] px-5 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[.22em] text-[#f06c52]">Get in touch</p>
          <h2 className="font-headline text-3xl text-[#004449] sm:text-4xl">Contact Wings Resort</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3f4849]">
            Questions about your stay, availability, or getting here? Reach out directly or say hello below and we'll pick it up on WhatsApp.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          {/* Contact details card */}
          <aside className="rounded-2xl bg-[#004449] p-6 text-white md:p-8">
            <h3 className="font-headline text-2xl">Reach Us Directly</h3>
            <ul className="mt-6 space-y-4">
              {infoRows.map((row) => (
                <li key={row.label} className="flex items-start gap-3">
                  <span className="material-symbols-outlined mt-0.5 text-lg text-[#f06c52]">{row.icon}</span>
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-wide text-white/60">{row.label}</span>
                    {row.href ? (
                      <a href={row.href} target={row.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="text-sm font-semibold hover:text-[#f06c52] transition-colors">
                        {row.value}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold">{row.value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-white/15 pt-6 text-center">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wide text-white/60">Hours</span>
                <span className="text-xs font-semibold">{CONTACT_INFO.workingHours.split(',')[0]}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wide text-white/60">Check-In</span>
                <span className="text-xs font-semibold">{CONTACT_INFO.checkIn}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wide text-white/60">Check-Out</span>
                <span className="text-xs font-semibold">{CONTACT_INFO.checkOut}</span>
              </div>
            </div>

            <a
              href={GOOGLE_MAPS_PLACE_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full coral-gradient px-5 py-3 text-[10px] font-bold uppercase tracking-[.12em] text-white shadow hover:opacity-90 transition-opacity"
            >
              Get Directions <span className="material-symbols-outlined text-base">directions</span>
            </a>
          </aside>

          {/* Contact form */}
          <article className="rounded-2xl border border-[#e8e3dc] bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-5 font-headline text-2xl text-[#004449]">Say Hello</h3>
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#004449]">Full Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  aria-invalid={!!errors.name}
                  className={`w-full rounded-xl border px-4 py-3 text-sm text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#004449]/30 ${errors.name ? 'border-[#c0392b]' : 'border-[#e0dcd3]'}`}
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-xs text-[#c0392b]">{errors.name}</p>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#004449]">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    aria-invalid={!!errors.email}
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#004449]/30 ${errors.email ? 'border-[#c0392b]' : 'border-[#e0dcd3]'}`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-[#c0392b]">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="contact-phone" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#004449]">Phone</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    aria-invalid={!!errors.phone}
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#004449]/30 ${errors.phone ? 'border-[#c0392b]' : 'border-[#e0dcd3]'}`}
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-[#c0392b]">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#004449]">Message</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange('message')}
                  aria-invalid={!!errors.message}
                  className={`w-full resize-none rounded-xl border px-4 py-3 text-sm text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#004449]/30 ${errors.message ? 'border-[#c0392b]' : 'border-[#e0dcd3]'}`}
                  placeholder="Tell us about your stay dates and any questions you have"
                />
                {errors.message && <p className="mt-1 text-xs text-[#c0392b]">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#004449] px-6 py-3.5 text-xs font-bold uppercase tracking-[.12em] text-white transition hover:bg-[#0e5d63] sm:w-auto"
              >
                Send via WhatsApp <span className="material-symbols-outlined text-base">chat</span>
              </button>

              {submitted && (
                <p className="text-xs font-semibold text-[#0e5d63]">
                  ✓ Opening WhatsApp with your details — just hit send there and we'll reply shortly.
                </p>
              )}
            </form>
          </article>
        </div>

        {/* Map */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-[#e4e2df] shadow-inner">
          <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
            <iframe
              title="Wings Resort Ooty location on Google Maps"
              src={GOOGLE_MAPS_EMBED_URL}
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};
