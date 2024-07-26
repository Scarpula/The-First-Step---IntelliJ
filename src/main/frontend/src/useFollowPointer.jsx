import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

const springConfig = { damping: 3, stiffness: 50, restDelta: 0.001 };

export function useFollowPointer(ref) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        x.set(clientX - rect.left - rect.width / 2);
        y.set(clientY - rect.top - rect.height / 2);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ref, x, y]);

  return { x: springX, y: springY };
}
