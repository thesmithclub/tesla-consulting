import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const images = [
  {
    src: "https://images.unsplash.com/photo-1615153633888-da0f14b3c2fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMGludGVyaW9yJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2MzUzODE5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    position: 'left',
    delay: 0,
    borderRadius: '40% 60% 60% 40% / 40% 50% 50% 60%'
  },
  {
    src: "https://images.unsplash.com/photo-1591004835292-2516a9074f85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB3aGVlbCUyMGRldGFpbHxlbnwxfHx8fDE3NjM0Nzg2MTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    position: 'right',
    delay: 0.2,
    borderRadius: '60% 40% 40% 60% / 50% 60% 40% 50%'
  },
  {
    src: "https://images.unsplash.com/photo-1572375180666-c23ef8bef639?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMGNoYXJnaW5nfGVufDF8fHx8MTc2MzUzODE5OHww&ixlib=rb-4.1.0&q=80&w=1080",
    position: 'left',
    delay: 0.4,
    borderRadius: '50% 50% 40% 60% / 60% 40% 60% 40%'
  },
  {
    src: "https://images.unsplash.com/photo-1706493339308-06fd5c38044b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMGNhciUyMGRyaXZpbmd8ZW58MXx8fHwxNjM1MzgxOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    position: 'right',
    delay: 0.6,
    borderRadius: '40% 60% 50% 50% / 50% 50% 50% 50%'
  },
];

export function SolutionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div 
      ref={containerRef}
      className="relative h-full w-full overflow-hidden" 
      style={{ backgroundColor: '#DEDAD8' }}
    >
      <div className="relative h-full">
        {/* 중앙 텍스트 - 고정 */}
        <div className="sticky top-0 h-screen flex items-center justify-center z-10">
          <div className="text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-6" style={{ fontSize: '96px', lineHeight: '1.1', fontWeight: '700', color: '#232326' }}>
                더 스미스<br />
                "테트리스 솔루션"
              </div>
              <div style={{ fontSize: '23px', color: '#232326' }}>
                그 답은 여기에 있습니다.<br />
                테슬라를 가장 잘 아는 사람들이, 당신의 테슬라를 완성합니다.
              </div>
            </motion.div>
          </div>
        </div>

        {/* 이미지들 - 스크롤에 따라 위로 올라감 */}
        <div className="absolute inset-0 pointer-events-none">
          {images.map((image, index) => {
            const yStart = 100 + (index * 150);
            const yEnd = -100 - (index * 150);
            const y = useTransform(scrollYProgress, [0, 1], [yStart, yEnd]);

            return (
              <motion.div
                key={index}
                style={{
                  y,
                  position: 'absolute',
                  [image.position]: image.position === 'left' ? '10%' : '10%',
                  top: `${20 + index * 25}%`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: image.delay }}
                viewport={{ once: true }}
              >
                <div
                  style={{
                    width: '280px',
                    height: '320px',
                    borderRadius: image.borderRadius,
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                  }}
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={`테슬라 이미지 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
