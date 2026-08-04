import { CSSProperties, useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';

type FoldTextProps = {
  text: string;
  splitBy?: 'char' | 'word';
  hinge?: 'top' | 'bottom';
  trigger?: 'mount';
  duration?: number;
  stagger?: number;
  ease?: string;
  perspective?: number;
  creaseShading?: number;
  fontSize?: number | string;
  fontWeight?: number;
  color?: string;
  className?: string;
};

export default function FoldText({
  text, splitBy = 'char', hinge = 'top', duration = .65, stagger = .045,
  ease = 'power3.out', perspective = 700, creaseShading = .55,
  fontSize = 80, fontWeight = 800, color = '#004449', className = ''
}: FoldTextProps) {
  const root = useRef<HTMLSpanElement>(null);
  const parts = useMemo(() => splitBy === 'word' ? text.split(/(\s+)/) : Array.from(text), [text, splitBy]);

  useEffect(() => {
    if (!root.current) return;
    const pieces = root.current.querySelectorAll('.fold-text-piece');
    const rotateX = hinge === 'top' ? -92 : 92;
    const origin = hinge === 'top' ? '50% 0%' : '50% 100%';
    const context = gsap.context(() => {
      gsap.fromTo(pieces, { opacity: 0, rotateX, transformOrigin: origin }, {
        opacity: 1, rotateX: 0, duration, stagger, ease, delay: 1.55, clearProps: 'willChange'
      });
    }, root);
    return () => context.revert();
  }, [duration, ease, hinge, stagger, text]);

  const style = {
    '--fold-size': typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
    '--fold-weight': fontWeight,
    '--fold-color': color,
    '--fold-perspective': `${perspective}px`,
    '--fold-crease': creaseShading,
  } as CSSProperties;

  return <span ref={root} className={`fold-text ${className}`} style={style} aria-label={text}>
    {parts.map((part, index) => part === '\n' ? <br key={index} /> : (
      <span className="fold-text-segment" key={`${part}-${index}`}>
        <span className="fold-text-piece">{part === ' ' ? '\u00a0' : part}</span>
      </span>
    ))}
  </span>;
}
