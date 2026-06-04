import { useState, useEffect, useRef } from 'react';

export function useCounter(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(start + (end - start) * eased));
            if (progress < 1) ref.current = requestAnimationFrame(animate);
          };

          ref.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    const el = document.getElementById('stats-section');
    if (el) observer.observe(el);

    return () => {
      observer.disconnect();
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [end, duration, start]);

  return count;
}
