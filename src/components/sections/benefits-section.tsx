import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const benefits = [
  {
    id: 1,
    title: "정확한 신차 검수 보장",
    description: "PDI 전문 인력 보유",
    image: "https://smith.speedgabia.com/tetris/info/new_car_inspection1.png"
  },
  {
    id: 2,
    title: "상세하고 실용적인 차량설명",
    description: "테슬라 1세대 전문컨설턴트가 직접 안내합니다.",
    image: "https://smith.speedgabia.com/tetris/info/consulting1.jpg"
  },
  {
    id: 3,
    title: "1:1 맞춤형 솔루션제공",
    description: "당신의 라이프 스타일에 맞는 전문 컨설팅을 제공합니다.",
    image: "https://smith.speedgabia.com/tetris/info/consulting2.jpg"
  }
];

/* ── Extracted card component to respect hooks rules ── */
function BenefitCard({
  benefit,
  index,
  stickyProgress,
  isMobile,
  textColor,
}: {
  benefit: typeof benefits[0];
  index: number;
  stickyProgress: any;
  isMobile: boolean;
  textColor: any;
}) {
  const rangeStart = (index - 0.8) / (benefits.length - 1);
  const rangeCenter = index / (benefits.length - 1);
  const rangeEnd = (index + 0.8) / (benefits.length - 1);

  const scale = useTransform(
    stickyProgress,
    [rangeStart, rangeCenter - 0.1, rangeCenter + 0.1, rangeEnd],
    [0.6, 1.15, 1.15, 0.6]
  );

  const opacity = useTransform(
    stickyProgress,
    [rangeStart, rangeCenter - 0.1, rangeCenter + 0.1, rangeEnd],
    [0.4, 1, 1, 0.4]
  );

  const textOpacity = useTransform(
    stickyProgress,
    [rangeStart + 0.2, rangeCenter, rangeEnd - 0.2],
    [0, 1, 0]
  );

  const textY = useTransform(
    stickyProgress,
    [rangeStart, rangeCenter],
    [50, 0]
  );

  return (
    <motion.div
      style={{ scale: isMobile ? 1 : scale, opacity: isMobile ? 1 : opacity }}
      className="w-full md:w-[30vw] flex flex-col items-start justify-center transition-all duration-300 px-8 md:px-0"
    >
      {/* Image Container - 6:4 Ratio (3:2) */}
      <div className="relative w-full aspect-[3/2] max-h-[30vh] md:max-h-[50vh] rounded-2xl overflow-hidden shadow-2xl mb-3 md:mb-8">
        <ImageWithFallback
          src={benefit.image || ""}
          alt={benefit.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 md:top-6 md:left-6">
          <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/30 backdrop-blur-md text-black text-xs md:text-sm border border-white/20" style={{ fontWeight: 700 }}>
            BENEFIT 0{index + 1}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      {/* Text Content */}
      <motion.div
        style={{ opacity: isMobile ? 1 : textOpacity, y: isMobile ? 0 : textY, color: textColor }}
        className="w-full pl-1"
      >
        <h3 className="text-xl md:text-3xl mb-2 md:mb-4 tracking-tight leading-snug" style={{ fontWeight: 700 }}>
          {benefit.title}
        </h3>
        <p className="text-base md:text-lg opacity-80 leading-relaxed break-keep" style={{ fontWeight: 500 }}>
          {benefit.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ── CSS animated gradient backgrounds (replaces THREE.js ShaderGradient) ── */
function LightGradientBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #DBDBDB 40%, #E8E8E8 60%, #FFFFFF 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 12s ease-in-out infinite',
        }}
      />
      {/* Soft animated orb */}
      <div
        className="absolute w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(200,200,200,0.3) 50%, transparent 70%)',
          top: '20%',
          left: '30%',
          animation: 'orbFloat 8s ease-in-out infinite',
        }}
      />
    </div>
  );
}

function DarkGradientBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 30%, #222222 60%, #111111 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease-in-out infinite',
        }}
      />
      {/* Subtle dark orb */}
      <div
        className="absolute w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(50,50,60,0.6) 0%, rgba(0,0,0,0.2) 60%, transparent 80%)',
          top: '30%',
          left: '40%',
          animation: 'orbFloat 10s ease-in-out infinite reverse',
        }}
      />
    </div>
  );
}

export function BenefitsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stride, setStride] = useState(39);
  const [paddingLeft, setPaddingLeft] = useState(32.5);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setStride(80);
        setPaddingLeft(12.5);
      } else {
        setStride(44);
        setPaddingLeft(35);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const stickyProgress = useTransform(smoothProgress, [0.28, 0.85], [0, 1]);

  const backgroundColor = useTransform(
    smoothProgress,
    [0, 0.15, 0.2, 0.45, 0.55, 0.75, 0.85, 1],
    ["#DEDAD8", "#DEDAD8", "#DEDAD8", "#DEDAD8", "#232326", "#232326", "#DEDAD8", "#DEDAD8"]
  );

  const textColor = useTransform(
    smoothProgress,
    [0, 0.15, 0.2, 0.45, 0.55, 0.75, 0.85, 1],
    ["#232326", "#232326", "#232326", "#232326", "#ffffff", "#ffffff", "#232326", "#232326"]
  );

  const x = useTransform(
    stickyProgress,
    [0, 1],
    ["0vw", `-${stride * (benefits.length - 1)}vw`]
  );

  useEffect(() => {
    const unsubscribe = stickyProgress.on("change", (latest) => {
      const clamped = Math.max(0, Math.min(1, latest));
      const slideIndex = Math.round(clamped * (benefits.length - 1));
      setCurrentSlide(slideIndex);
    });
    return () => unsubscribe();
  }, [stickyProgress]);

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const totalScrollHeight = container.scrollHeight - window.innerHeight;

    let nextSlide = currentSlide;
    if (direction === 'next') {
      nextSlide = Math.min(currentSlide + 1, benefits.length - 1);
    } else {
      nextSlide = Math.max(currentSlide - 1, 0);
    }

    const targetScroll = container.offsetTop + (totalScrollHeight * (nextSlide / (benefits.length - 1)));

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={containerRef} className="relative h-auto md:h-[350vh]">
      {/* Keyframes for CSS gradient animations */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes orbFloat {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(5%, -8%) scale(1.05); }
          66% { transform: translate(-3%, 5%) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>

      {/* Snap Points */}
      <div className="absolute inset-0 md:flex flex-col pointer-events-none z-0 hidden">
        {benefits.map((_, i) => (
          <div key={i} className="flex-1 snap-start snap-always" />
        ))}
      </div>

      <motion.div className="md:sticky md:top-0 md:h-screen overflow-hidden flex flex-col py-16 md:py-0">
        {/* CSS Gradient Backgrounds (replacing ShaderGradient) */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{
              opacity: currentSlide === 1 ? 0 : 1,
              zIndex: 10,
              pointerEvents: currentSlide === 1 ? 'none' : 'auto'
            }}
          >
            <LightGradientBg />
          </div>

          <div
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{
              opacity: currentSlide === 1 ? 1 : 0,
              zIndex: 20,
              pointerEvents: currentSlide === 1 ? 'auto' : 'none'
            }}
          >
            <DarkGradientBg />
          </div>
        </div>

        {/* Top Bar: Title */}
        <div className="container mx-[0px] px-[32px] pt-0 md:pt-12 z-50 flex flex-col md:flex-row justify-between items-center md:items-end mb-0 mt-0 md:mt-[40px] md:mr-[346px] md:ml-[346px] py-[18px] my-[13px]">
          <motion.h2
            className="text-4xl md:text-[4.5rem] tracking-tighter text-left leading-tight md:leading-tight"
            style={{ color: textColor, fontWeight: 900 }}
          >
            스미스 솔루션만의
            <br /> 혜택 3가지
          </motion.h2>
        </div>

        {/* Arrows */}
        <div className="hidden md:block absolute left-1/2 top-1/2 z-50 gap-2 -translate-x-full -translate-y-full pb-4 ml-[43vw] mt-[-52vw] md:ml-[17.25vw] md:mt-[calc(-11.5vw+10px)]">
          <div className="flex gap-2">
            <motion.button
              onClick={() => handleNavigation('prev')}
              style={{ color: textColor }}
              className={`p-2 transition-opacity hover:opacity-50 ${currentSlide === 0 ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </motion.button>
            <motion.button
              onClick={() => handleNavigation('next')}
              style={{ color: textColor }}
              className={`p-2 transition-opacity hover:opacity-50 ${currentSlide === benefits.length - 1 ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </motion.button>
          </div>
        </div>

        {/* Carousel Track */}
        <div className="flex-1 flex items-start md:items-center justify-start h-full w-full pt-4 md:pt-0">
          <motion.div
            style={{ x: isMobile ? 0 : x, paddingLeft: isMobile ? '0' : `${paddingLeft}vw` }}
            className="flex flex-col md:flex-row gap-8 md:gap-[14vw] w-full md:w-max h-full items-start md:items-center px-0 md:px-0"
          >
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={benefit.id}
                benefit={benefit}
                index={index}
                stickyProgress={stickyProgress}
                isMobile={isMobile}
                textColor={textColor}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
