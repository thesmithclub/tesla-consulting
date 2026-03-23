import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const typingTexts = [
  "내 테슬라, 이대로 괜찮은걸까?",
  "다들 옵션으로 완성한다는데, 뭐가 좋은걸까?",
  "누가 좀 제대로 알려줬으면 좋겠는데..."
];

export function TypingSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      className="relative h-full w-full flex items-center justify-center" 
      style={{ backgroundColor: '#232326' }}
    >
      <div className="container mx-auto px-4 text-center" style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white/80 mb-8"
        >
          테슬라 오너라면, 고민하실 겁니다.
        </motion.h3>

        <div className="min-h-[120px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentTextIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-white"
            >
              "{typingTexts[currentTextIndex]}"
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}