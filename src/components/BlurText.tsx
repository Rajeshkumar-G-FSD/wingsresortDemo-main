import { motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';

type BlurTextProps = {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  className?: string;
  onAnimationComplete?: () => void;
  startDelay?: number;
};

export default function BlurText({ text, delay = 200, animateBy = 'words', direction = 'top', className = '', onAnimationComplete, startDelay = 0 }: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [inView, setInView] = useState(false);
  const elements = useMemo(() => animateBy === 'words' ? text.split(' ') : Array.from(text), [animateBy, text]);
  const initialY = direction === 'top' ? -26 : 26;

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: .1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <p ref={ref} className={`blur-text flex flex-wrap ${className}`}>
      {elements.map((segment, index) => (
        <motion.span
          className="inline-block will-change-[transform,filter,opacity]"
          key={`${segment}-${index}`}
          initial={{ filter: 'blur(10px)', opacity: 0, y: initialY }}
          animate={inView ? { filter: ['blur(10px)', 'blur(3px)', 'blur(0px)'], opacity: [0, .55, 1], y: [initialY, direction === 'top' ? 4 : -4, 0] } : undefined}
          transition={{ duration: .52, times: [0, .45, 1], delay: startDelay + (index * delay) / 1000, ease: 'easeOut' }}
          onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
        >
          {segment}{animateBy === 'words' && index < elements.length - 1 ? '\u00a0' : ''}
        </motion.span>
      ))}
    </p>
  );
}
