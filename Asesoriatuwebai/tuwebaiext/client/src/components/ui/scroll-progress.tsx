import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollPercentage(Math.round(latest * 100));
    });

    return () => {
      unsubscribe();
    };
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-800">
      <motion.div
        className="h-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF]"
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      />
      <div className="fixed top-4 right-4 bg-glass rounded-full px-2 py-1 text-xs font-medium text-white opacity-70">
        {scrollPercentage}%
      </div>
    </div>
  );
}