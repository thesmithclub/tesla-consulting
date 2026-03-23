import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

export function Hero() {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          환영합니다
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto"
        >
          풀페이지 스크롤로 경험하는 아름다운 원페이지 웹사이트
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={scrollToNext}
          className="bg-white text-purple-600 px-8 py-3 rounded-full hover:bg-white/90 transition-colors"
        >
          시작하기
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
}
