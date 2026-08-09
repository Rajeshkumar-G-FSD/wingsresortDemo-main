import { motion, useInView, Variants } from 'framer-motion';
import React, { ElementType, ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

export interface TypingTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  letterSpacing?: string;
  align?: 'left' | 'center' | 'right';
  /** How much of the element must be in view (0–1) before the typing animation (re-)plays. */
  threshold?: number;
}

export const TypingText = ({
  children,
  as: Component = 'div',
  className = '',
  delay = 0,
  duration = 0.6,
  fontSize = 'text-4xl',
  fontWeight = 'font-bold',
  color = 'text-white',
  letterSpacing = 'tracking-wide',
  align = 'left',
  threshold = 0.4,
}: TypingTextProps) => {
  const [textContent, setTextContent] = useState<string>('');
  const containerRef = useRef<HTMLSpanElement>(null);
  // once: false — replays the typing animation every time it scrolls back into view, not just the first time.
  const isInView = useInView(containerRef, { amount: threshold, once: false });

  useEffect(() => {
    const extractText = (node: ReactNode): string => {
      if (typeof node === 'string' || typeof node === 'number') {
        return node.toString();
      }
      if (Array.isArray(node)) {
        return node.map(extractText).join('');
      }
      if (React.isValidElement(node)) {
        const element = node as React.ReactElement<any>;
        if (typeof element.props.children !== 'undefined') {
          return extractText(element.props.children);
        }
      }
      return '';
    };

    setTextContent(extractText(children));
  }, [children]);

  const characters = textContent.split('').map((char) => (char === ' ' ? ' ' : char));

  const characterVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: delay + i * (duration / Math.max(characters.length, 1)),
        duration: 0.15,
        ease: 'easeInOut',
      },
    }),
  };

  return React.createElement(
    Component as any,
    {
      className: cn(
        'inline-flex',
        className,
        fontSize,
        fontWeight,
        color,
        letterSpacing,
        align === 'center' ? 'justify-center text-center' : align === 'right' ? 'justify-end text-right' : 'justify-start text-left'
      ),
    },
    <motion.span ref={containerRef} className="inline-block" initial="hidden" animate={isInView ? 'visible' : 'hidden'} aria-label={textContent} role="text">
      {characters.map((char, index) => (
        <motion.span key={`${char}-${index}`} className="inline-block" variants={characterVariants} custom={index} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default TypingText;
