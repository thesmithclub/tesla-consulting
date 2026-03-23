import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const reviews = [
  {
    text: "옵션 선택 고민이 한 번에 해결됐어요! 컨설팅부터 설치까지 완벽했습니다.",
    author: "model y 오너 H**님",
    image: "https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjM1MzgxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    text: "테슬라 1년 차인데 이제야 제대로 차를 타는 느낌입니다. 강력 추천합니다.",
    author: "model y 오너 K**님",
    image: "https://images.unsplash.com/photo-1622812947502-0a643f17387e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYzNTMwMzgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    text: "가격 대비 이만한 만족도는 없을 겁니다. 패키지 구성 덕분에 개별로 알아볼 필요도 없었고, 직원분들도 엄청 친절하셨어요. 적극 추천드립니다!",
    author: "model y 오너 C**님",
    image: "https://images.unsplash.com/photo-1622812947502-0a643f17387e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYzNTMwMzgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    text: "튜닝을 '완성'이라고 표현한 이유를 알겠습니다. 제 라이프스타일에 딱 맞는 옵션을 추천받아 설치했습니다. 진짜 최고예요.",
    author: "model 3 오너 L**님",
    image: "https://images.unsplash.com/photo-1622812947502-0a643f17387e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYzNTMwMzgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    text: "이곳 저곳 비교하고 알아보고 설치 받았습니다~~ 저도 와이프도 엄청 만족합니다. 왜 진작 안했나 후회되네요ㅋㅋ",
    author: "model Y 오너 N**님",
    image: "https://images.unsplash.com/photo-1622812947502-0a643f17387e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYzNTMwMzgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
];

export function ReviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [200, -2400]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden py-20" 
      style={{ backgroundColor: '#DEDAD8', minHeight: '300vh' }}
    >
      <div className="sticky top-0 h-screen flex items-center">
        <motion.div 
          style={{ x }}
          className="flex gap-12 px-12"
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-12 shadow-xl w-[500px] h-[400px] flex-shrink-0"
            >
              <div className="flex flex-col items-center text-center h-full justify-center">
                <div className="mb-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden">
                    <ImageWithFallback
                      src={review.image}
                      alt={review.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="mb-6 text-[#232326] leading-relaxed text-lg">
                  "{review.text}"
                </p>
                <p className="text-[#232326]/60 text-base">
                  {review.author}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      <div className="fixed bottom-8 left-0 right-0 text-center pointer-events-none z-10">
        <p className="text-sm text-[#232326]/50">
          본 리뷰는 사전 이벤트를 통해 선정된 오너들의 의견을 정리하였습니다.
        </p>
      </div>
    </div>
  );
}
