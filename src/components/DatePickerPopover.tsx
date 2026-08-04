import React, { useEffect, useRef, useState } from 'react';

interface DatePickerPopoverProps {
  label: string;
  value: string;
  onSelect: (date: string) => void;
  minDate?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  icon: string;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export const toISO = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const formatDisplay = (iso: string) => {
  if (!iso) return 'Select date';
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const DatePickerPopover: React.FC<DatePickerPopoverProps> = ({
  label,
  value,
  onSelect,
  minDate,
  open,
  onOpenChange,
  icon
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialMonth = value ? new Date(`${value}T00:00:00`) : minDate ? new Date(`${minDate}T00:00:00`) : new Date();
  const [viewMonth, setViewMonth] = useState(new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1));

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onOpenChange]);

  const minDateObj = minDate ? new Date(`${minDate}T00:00:00`) : null;

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array(firstDayIndex).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1))
  ];

  const isDisabled = (d: Date) => (minDateObj ? d.getTime() < minDateObj.getTime() - DAY_MS / 2 : false);
  const isSelected = (d: Date) => value === toISO(d);

  return (
    <div ref={containerRef} className="relative flex-1 min-w-0">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        className="group flex w-full min-w-0 items-center gap-3 rounded-full bg-[#f5f3f0] border border-[#e4e2df] px-4 py-3 text-left hover:border-[#004449] transition-colors"
      >
        <span className="material-symbols-outlined text-[#f06c52] text-lg shrink-0">{icon}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-[9px] font-bold uppercase tracking-[.14em] text-[#6f797a]">{label}</span>
          <span className="block truncate text-xs font-semibold text-[#004449]">{formatDisplay(value)}</span>
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-40 w-[280px] rounded-3xl bg-white p-4 shadow-2xl border border-[#e4e2df] animate-fadeIn">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => setViewMonth(new Date(year, month - 1, 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#004449] hover:bg-[#f5f3f0] transition-colors"
              aria-label="Previous month"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-[#004449]">
              {viewMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button
              type="button"
              onClick={() => setViewMonth(new Date(year, month + 1, 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#004449] hover:bg-[#f5f3f0] transition-colors"
              aria-label="Next month"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEKDAYS.map((w, i) => (
              <div key={`${w}-${i}`} className="h-7 flex items-center justify-center text-[9px] font-bold text-[#6f797a]">
                {w}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) =>
              d ? (
                <button
                  key={i}
                  type="button"
                  disabled={isDisabled(d)}
                  onClick={() => onSelect(toISO(d))}
                  className={`h-8 w-8 rounded-full text-xs font-semibold transition-colors flex items-center justify-center ${
                    isSelected(d)
                      ? 'coral-gradient text-white shadow-md'
                      : isDisabled(d)
                      ? 'text-[#e4e2df] cursor-not-allowed'
                      : 'text-[#1b1c1a] hover:bg-[#f5f3f0]'
                  }`}
                >
                  {d.getDate()}
                </button>
              ) : (
                <div key={i} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
