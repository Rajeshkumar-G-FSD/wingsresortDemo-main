import { CSSProperties, ElementType, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

type SplitType = 'chars' | 'words' | 'lines' | 'chars,words' | 'words,lines' | 'chars,words,lines';
type TweenVars = Record<string, string | number>;

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: SplitType;
  from?: TweenVars;
  to?: TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: CSSProperties['textAlign'];
  tag?: ElementType;
  /** Replay the reveal every time the element scrolls back into view (default true). Set false for a play-once entrance like the hero title. */
  repeat?: boolean;
  onLetterAnimationComplete?: () => void;
}

interface SplitTextTarget extends HTMLElement {
  _rbsplitInstance?: { revert: () => void } | null;
}

export default function SplitText({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  repeat = true,
  onLetterAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<SplitTextTarget>(null);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      const el = ref.current;

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch {
          /* ignore */
        }
        el._rbsplitInstance = null;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign = marginValue === 0 ? '' : marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      let targets: Element[] | undefined;
      const assignTargets = (self: { chars: Element[]; words: Element[]; lines: Element[] }) => {
        if (splitType.includes('chars') && self.chars.length) targets = self.chars;
        if (!targets && splitType.includes('words') && self.words.length) targets = self.words;
        if (!targets && splitType.includes('lines') && self.lines.length) targets = self.lines;
        if (!targets) targets = self.chars || self.words || self.lines;
      };

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: (self: { chars: Element[]; words: Element[]; lines: Element[] }) => {
          assignTargets(self);
          return gsap.fromTo(
            targets!,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: {
                trigger: el,
                start,
                once: !repeat,
                // Replay on entry from either scroll direction: down past the top (onEnter) or up past the bottom (onEnterBack).
                toggleActions: repeat ? 'restart none restart reset' : 'play none none none',
                fastScrollEnd: true,
              },
              onComplete: () => {
                onCompleteRef.current?.();
              },
              willChange: 'transform, opacity',
              force3D: true,
            }
          );
        },
      });
      el._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch {
          /* ignore */
        }
        el._rbsplitInstance = null;
      };
    },
    {
      dependencies: [text, delay, duration, ease, splitType, JSON.stringify(from), JSON.stringify(to), threshold, rootMargin, fontsLoaded, repeat],
      scope: ref,
    }
  );

  const style: CSSProperties = { textAlign, overflowWrap: 'break-word', willChange: 'transform, opacity' };
  const classes = `split-parent overflow-hidden inline-block whitespace-normal ${className}`;
  const Tag = tag;

  return (
    <Tag ref={ref} style={style} className={classes}>
      {text}
    </Tag>
  );
}
