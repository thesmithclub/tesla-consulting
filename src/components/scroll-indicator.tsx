import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

export function ScrollIndicator() {
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{
        y: [0, 10, 0],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <ChevronDown className="w-8 h-8 text-white" strokeWidth={2} />
    </motion.div>
  );
}
