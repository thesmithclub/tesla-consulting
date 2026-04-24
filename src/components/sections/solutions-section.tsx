import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const solutions = [
  {
    title: "프리미엄 틴팅",
    description: "전비를 향상시키는 기적같은 프리미엄 틴팅필름",
    videoId: "jNQXAC9IVRw"
  },
  {
    title: "PPF & 열차단 루프 PPF",
    description: "열차단 & 발수코팅까지 한 번에 가능한 루프 PPF",
    videoId: "jNQXAC9IVRw"
  },
  {
    title: "요크 핸들 & 화이트 인테리어",
    description: "감각적인 디자인과 실용성을 동시에. 당신의 테슬라가 더 특별해집니다",
    videoId: "9bZkp7q19f0"
  },
  {
    title: "오토 프렁크 & 오토 도어",
    description: "편리함의 시작. 손쉬운 개폐로 일상이 더 스마트해집니다",
    videoId: "dQw4w9WgXcQ"
  },
  {
    title: "광각 미러 & 익스테리어 파츠",
    description: "스포티한 감성과 안전한 시야. 완성도 높은 마무리",
    videoId: "M7lc1UVf-VE"
  }
];

export function SolutionsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSlides, setSelectedSlides] = useState<string[] | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const solutionImages = [
    "https://smith.speedgabia.com/tetris/info/Premitting_01.jpg",
    "https://smith.speedgabia.com/tetris/con_item/roofppf.gif",
    "https://smith.speedgabia.com/tetris/con_item/handel.png",
    "https://smith.speedgabia.com/tetris/con_item/autofrunk.gif",
    "https://smith.speedgabia.com/tetris/con_item/wide_side.png"
  ];

  // 슬라이드가 여러 장인 아이템 (index 기준)
  const solutionSlides: Record<number, string[]> = {
    0: [
      "https://smith.speedgabia.com/tetris/info/Premitting_01.jpg",
      "https://smith.speedgabia.com/tetris/info/Premitting_02.jpg",
    ]
  };

  const openSlides = (index: number) => {
    const slides = solutionSlides[index] ?? [solutionImages[index]];
    setSelectedSlides(slides);
    setCurrentSlide(0);
  };
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // 2번씩 스크롤할 때마다 이동 (정지 -> 이동 -> 정지 -> 이동 패턴)
  // 0~25%: 1번 유지 (첫 스크롤)
  // 25~50%: 1->2 이동 (두 번째 스크롤)
  // 50~75%: 2번 유지
  // 75~100%: 2->3 이동
  const x = useTransform(scrollYProgress,
    [0, 0.167, 0.333, 0.5, 0.667, 0.833, 1],
    ["0px", "0px", "-698px", "-698px", "-1396px", "-1396px", "-2094px"]
  );

  return (
    <div ref={containerRef} className="relative" style={{ backgroundColor: '#DEDAD8', height: isMobile ? 'auto' : '500vh' }}>
      {/* Internal Snap Point for Smooth Scrubbing */}
      <div className="absolute top-1/2 w-full h-1 snap-start snap-always opacity-0 pointer-events-none md:block hidden" />
      
      <div 
        className="md:sticky md:top-0 md:h-screen overflow-hidden flex flex-col justify-center py-16 md:py-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://smith.speedgabia.com/tetris/info/ribbon_background.gif)' }}
      >
        <div className="container mx-auto px-8 mb-10 md:mb-16 bg-[rgba(255,255,255,0)]">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-[#FFFFFF] text-4xl md:text-[4.5rem] mb-6 md:mb-8"
            style={{ fontWeight: 900 }}
          >
            테슬라 아이템
          </motion.h2>

          {/* 개별 아이템 태그 — 스태거 슬라이드업 + shimmer */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {[
              '프리미엄 틴팅',
              'PPF (페인트 보호 필름)',
              '블랙박스',
              '스미스패스 (하이패스)',
              '요크 핸들',
              '오토 프렁크 & 오토 도어',
              '광각 사이드미러',
              '안드로이드 오토 & 카플레이',
            ].map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 18, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.07, ease: 'easeOut' }}
                whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.22)', borderColor: 'rgba(255,255,255,0.6)' }}
                className="relative px-4 py-2 rounded-full text-sm md:text-base backdrop-blur-md cursor-default overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.22)',
                  fontWeight: 500,
                }}
              >
                {/* shimmer sweep */}
                <motion.span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['-100% 0%', '200% 0%'] }}
                  transition={{ duration: 2.2, delay: 0.6 + i * 0.15, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                />
                {item}
              </motion.span>
            ))}
          </div>
        </div>

        {/* 텍스트 라인(container)에 맞춰 시작하되, 우측으로 쭉 뻗어나가도록 설정 */}
        <div className="container mx-auto px-8">
          <motion.div
            style={{ x: isMobile ? 0 : x }}
            className="flex flex-col md:flex-row w-full md:w-max gap-8 md:gap-0"
          >
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-[698px] md:pr-12"
              >
                <div className="w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
                <div
                  className="h-[250px] md:h-[400px] overflow-hidden cursor-pointer relative group"
                  onClick={() => openSlides(index)}
                >
                  <img
                    src={solutionImages[index]}
                    alt={solution.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-6 py-3 md:px-8 md:py-4 rounded-full">
                      <span className="text-[#232326] text-base md:text-xl" style={{ fontWeight: 600 }}>클릭하여 확대</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 md:p-10">
                  <h3 className="text-[#232326] text-xl md:text-3xl mb-3 md:mb-5" style={{ fontWeight: 700 }}>
                    {solution.title}
                  </h3>
                  <p className="text-[#232326]/70 text-base md:text-xl">
                    {solution.description}
                  </p>
                </div>
              </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="hidden md:block md:absolute md:bottom-24 left-0 right-0 text-center pb-16 md:pb-0 pt-8 md:pt-0">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-[#232326] text-[#DEDAD8] px-6 py-4 md:px-10 md:py-5 rounded-full text-base md:text-lg hover:scale-105 transition-transform"
          style={{ fontWeight: 600 }}
          onClick={() => window.open('https://thesmithclub.github.io/smith-tecon-page/', '_blank')}
        >
          더 다양한 솔루션이 궁금하신가요?<br className="md:hidden" />
          1:1 맞춤 컨설팅 접수 →
        </motion.button>
      </div>

      {/* Expanded Image Modal (슬라이드 지원) */}
      <AnimatePresence>
        {selectedSlides && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-8"
            onClick={() => setSelectedSlides(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-6xl h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 닫기 버튼 */}
              <button
                onClick={() => setSelectedSlides(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors z-10"
                aria-label="닫기"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* 이미지 슬라이드 */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={selectedSlides[currentSlide]}
                  alt={`슬라이드 ${currentSlide + 1}`}
                  className="w-full h-full object-contain rounded-2xl"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* 이전/다음 버튼 (슬라이드가 2장 이상일 때만 표시) */}
              {selectedSlides.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + selectedSlides.length) % selectedSlides.length)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors"
                    aria-label="이전"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % selectedSlides.length)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors"
                    aria-label="다음"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>

                  {/* 인디케이터 점 */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentSlide ? 'bg-white scale-125' : 'bg-white/40'}`}
                        aria-label={`슬라이드 ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}