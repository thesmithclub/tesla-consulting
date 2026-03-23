// @ts-nocheck
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useRef, useEffect, useState } from "react";

const reviews = [
  {
    text: "옵션 선택 고민이 한 번에 해결됐어요! 컨설팅부터 설치까지 완벽했습니다.",
    author: "Model Y 오너 Y**",
    image: "https://smith.speedgabia.com/tetris/info/profile_1.png",
    rating: 5
  },
  {
    text: "처음에는 긴가민가했는데 막상 받아보니 너무 좋았습니다. 나만의 차가된 느낌쓰~",
    author: "Model Y 오너 K**",
    image: "https://smith.speedgabia.com/tetris/info/profile_2.png",
    rating: 5
  },
  {
    text: "가격 대비 이만한 만족도는 없을 겁니다. 컨설팅 서비스가 생각보다 훨씬 디테일했어요.",
    author: "Model 3 오너 H**",
    image: "https://smith.speedgabia.com/tetris/info/profile_3.png",
    rating: 5
  },
  {
    text: "시공 품질이 정말 훌륭합니다. 꼼꼼한 검수와 친절한 상담이 인상적이었어요.",
    author: "Model Y 오너 L**",
    image: "https://smith.speedgabia.com/tetris/info/profile_4.png",
    rating: 5
  },
  {
    text: "전문가의 노하우가 담긴 솔루션 제안이 좋았습니다. 차량이 한층 업그레이드된 느낌이에요.",
    author: "Model 3 오너 P**",
    image: "https://smith.speedgabia.com/tetris/info/profile_5.png",
    rating: 5
  },
  {
    text: "완벽하게 대응해주셔서 처음부터 믿음이 갔습니다. 주변 분들에게 추천하고 있어요.",
    author: "Model Y 오너 C**",
    image: "https://smith.speedgabia.com/tetris/info/profile_6.png",
    rating: 5
  }
];

const newReviews = [
  {
    text: "기대 이상의 퀄리티였습니다. 세심한 배려와 전문성이 느껴지는 서비스였어요.",
    author: "Model S 오너 J**",
    image: "https://smith.speedgabia.com/tetris/info/profile_7.png",
    rating: 5
  },
  {
    text: "테트리스 덕분에 차량 커스터마이징이 쉽게 했습니다. 강력 추천합니다!",
    author: "Model 3 오너 M**",
    image: "https://smith.speedgabia.com/tetris/info/profile_8.png",
    rating: 5
  },
  {
    text: "진짜 경험자로써 말합니다. 믿고 맡길 수 있는 곳입니다.",
    author: "Model Y 오너 S**",
    image: "https://smith.speedgabia.com/tetris/info/profile_9.png",
    rating: 5
  },
  {
    text: "상담부터 시공까지 모든 과정이 체계적이고 빠릅니다. 매우 만족스러워요.",
    author: "Model X 오너 T**",
    image: "https://smith.speedgabia.com/tetris/info/profile_9.png",
    rating: 5
  },
  {
    text: "아이템이 가격도 합리적이고 품질도 뛰어나요. 테슬라 오너라면 꼭 경험해보세요!",
    author: "Model 3 오너 W**",
    image: "https://smith.speedgabia.com/tetris/info/profile_10.png",
    rating: 5
  }
];

export function ReviewsSection() {
  const titleRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative py-32 overflow-hidden" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container mx-auto px-8 mb-20">
        <h2 ref={titleRef} className="text-[#232326] text-center w-full mb-6 text-[30px] md:text-[4.5rem]" style={{ fontWeight: 900 }}>
          <motion.span
            animate={{
              color: isInView ? '#DC2626' : '#232326'
            }}
            transition={{
              duration: 1.2,
              ease: "easeInOut"
            }}
          >
            생생한
          </motion.span> <span className="hidden md:inline">테슬라오너들의 리뷰를 확인하세요</span>
          <span className="md:hidden" style={{ lineHeight: 1.2 }}>테슬라 오너들의<br />리뷰를 확인해보세요.</span>
        </h2>
        <p className="text-[#232326]/60 text-[15px] md:text-xl text-center max-w-2xl mx-auto">
          이미 많은 테슬라 오너들이 테트리스와 함께<br />완벽한 드림카를 완성했습니다
        </p>
      </div>

      {/* First Row - Left to Right */}
      <div className="mb-8 overflow-hidden">
        <motion.div
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex gap-3 md:gap-6"
        >
          {[...reviews, ...reviews, ...reviews].map((review, index) => (
            <div
              key={index}
              className="bg-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-sm flex-shrink-0 border border-[#232326]/10 min-w-[210px] max-w-[210px] md:min-w-[450px] md:max-w-[450px]"
            >
              <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
                <div className="w-8 h-8 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={review.image}
                    alt={review.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex gap-0.5 md:gap-1 mb-1 md:mb-2">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-[#DC2626] text-sm md:text-xl">&#9733;</span>
                    ))}
                  </div>
                  <p className="text-[#232326]/60 text-xs md:text-sm">
                    {review.author}
                  </p>
                </div>
              </div>
              <p className="text-[#232326] leading-relaxed text-xs md:text-lg">
                &quot;{review.text}&quot;
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Second Row - Right to Left */}
      <div className="overflow-hidden">
        <motion.div
          animate={{
            x: ['-50%', '0%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex gap-3 md:gap-6"
        >
          {[...newReviews, ...newReviews, ...newReviews].map((review, index) => (
            <div
              key={index}
              className="bg-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-sm flex-shrink-0 border border-[#232326]/10 min-w-[210px] max-w-[210px] md:min-w-[450px] md:max-w-[450px]"
            >
              <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
                <div className="w-8 h-8 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={review.image}
                    alt={review.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex gap-0.5 md:gap-1 mb-1 md:mb-2">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-[#DC2626] text-sm md:text-xl">&#9733;</span>
                    ))}
                  </div>
                  <p className="text-[#232326]/60 text-xs md:text-sm">
                    {review.author}
                  </p>
                </div>
              </div>
              <p className="text-[#232326] leading-relaxed text-xs md:text-lg">
                &quot;{review.text}&quot;
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Note */}
      <div className="text-center mt-16">
        <p className="text-sm text-[#232326]/40">
          본 리뷰는 사전 이벤트를 통해 선정된 오너들의<br className="md:hidden" />의견을 정리하여 작성된 내용입니다.
        </p>
      </div>
    </div>
  );
}
