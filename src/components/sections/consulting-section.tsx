import { motion, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

const steps = [
  {
    id: 1,
    title: "테슬라의 완성은 알리템?",
    desc: "테슬라 구매는 했는데 어떻게 나에게 맞게 튜닝하지?",
    image: "https://smith.speedgabia.com/tetris/info/story_01.gif"
  },
  {
    id: 2,
    title: "사무실에서 고민",
    desc: "직장 상사 눈치 보며 자료를 찾고...",
    image: "https://smith.speedgabia.com/tetris/info/story_02.gif"
  },
  {
    id: 3,
    title: "밤 잠을 설치며 고민",
    desc: "잠 안자고 서칭과 디깅의 반복 끝내 내린 결론!!",
    image: "https://smith.speedgabia.com/tetris/info/story_03.gif"
  },
  {
    id: 4,
    title: "테슬라 컨설팅!",
    desc: "내 라이프 스타일에 맞는 테슬라 아이템 추천부터 설치까지 한 번에",
    image: "https://smith.speedgabia.com/tetris/info/story_04.gif"
  }
];

function Step({
  step,
  isActive,
  onNext
}: {
  step: typeof steps[0],
  isActive: boolean,
  onNext: () => void
}) {
  const [imgUrl, setImgUrl] = useState<string>("");
  const [isPressing, setIsPressing] = useState(false);

  // 해당 스텝이 활성화될 때 GIF 재생 (타임스탬프 갱신)
  useEffect(() => {
    if (isActive) {
      setImgUrl(`${step.image}?t=${Date.now()}`);
      setIsPressing(false); // 상태 초기화
    }
  }, [isActive, step.image]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPressing && isActive) {
      timer = setTimeout(() => {
        onNext();
        setIsPressing(false);
      }, 1000); // 1초 누르면 다음으로 이동
    }
    return () => clearTimeout(timer);
  }, [isPressing, isActive, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ zIndex: isActive ? 10 : 0, pointerEvents: isActive ? 'auto' : 'none' }}
      className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[#111]">
        {imgUrl && (
          <img
            src={imgUrl}
            alt={step.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            {step.title}
          </h2>
          <p className="text-lg md:text-2xl text-white/80 font-light leading-relaxed whitespace-pre-line mb-8">
            {step.desc}
          </p>

          <motion.button
            className="relative px-8 py-3 rounded-full overflow-hidden group cursor-pointer select-none"
            onMouseDown={() => setIsPressing(true)}
            onMouseUp={() => setIsPressing(false)}
            onMouseLeave={() => setIsPressing(false)}
            onTouchStart={() => setIsPressing(true)}
            onTouchEnd={() => setIsPressing(false)}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {/* Background Border/Base */}
            <div className="absolute inset-0 border border-white/30 rounded-full" />

            {/* Fill Animation */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isPressing ? 1 : 0 }}
              transition={{ duration: 1.0, ease: "linear" }}
              style={{ originX: 0 }}
            />

            {/* Text */}
            <span className={`relative z-10 text-sm tracking-[0.2em] uppercase transition-colors duration-200 ${isPressing ? 'text-black' : 'text-white'}`}>
              꾹 눌러서 다음 내용을 확인하세요.
            </span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ConsultingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // 마지막 스텝에서 버튼을 누르면 다음 섹션으로 스크롤 이동
      if (containerRef.current) {
        const { top, height } = containerRef.current.getBoundingClientRect();
        // 현재 섹션의 하단 위치로 스크롤 (즉, 다음 섹션의 상단)
        const targetY = window.scrollY + top + height;

        window.scrollTo({
          top: targetY,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {steps.map((step, index) => (
        <Step
          key={step.id}
          step={step}
          isActive={index === currentStep}
          onNext={handleNext}
        />
      ))}
    </div>
  );
}