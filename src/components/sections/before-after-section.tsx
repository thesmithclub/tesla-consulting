import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useRef } from 'react';

export function BeforeAfterSection() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.9, 1.05, 0.9]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const tabs = [
    { 
      name: "요크핸들 & 화이트 인테리어", 
      color: "bg-[#8B5CF6]",
      type: "slider",
      beforeImage: "https://smith.speedgabia.com/tetris/info/t_after.png",
      afterImage: "https://smith.speedgabia.com/tetris/info/t_before.png",
      beforeLabel: "설치 전",
      afterLabel: "설치 후"
    },
    { 
      name: "오토프렁크 & 오토도어", 
      color: "bg-[#10B981]",
      type: "single",
      image: "https://smith.speedgabia.com/tetris/con_item/auto_handle.gif",
      badgeLabel: "오토도어 설치 후"
    },
    { 
      name: "광각미러", 
      color: "bg-[#3B82F6]",
      type: "slider",
      beforeImage: "https://smith.speedgabia.com/tetris/info/side_af.gif",
      afterImage: "https://smith.speedgabia.com/tetris/info/side_bf.gif",
      beforeLabel: "순정미러",
      afterLabel: "광각미러"
    },
    { 
      name: "안드로이드 오토 & 카플레이어", 
      color: "bg-[#FF5733]",
      type: "single",
      image: "https://smith.speedgabia.com/tetris/con_item/ac_auto.gif"
    }
  ];

  const currentTab = tabs[activeTab];

  return (
    <div ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center py-24 overflow-hidden" style={{ backgroundColor: '#232326' }}>
      <style>{`
        @keyframes move-forever {
          0% {
            transform: translate3d(-90px, 0, 0);
          }
          100% {
            transform: translate3d(85px, 0, 0);
          }
        }
      `}</style>
      
      {/* Background Waves */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <svg 
          className="w-full h-[30vh] min-h-[100px] max-h-[300px]" 
          xmlns="http://www.w3.org/2000/svg" 
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28" 
          preserveAspectRatio="none" 
          shapeRendering="auto"
        >
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use 
              xlinkHref="#gentle-wave" 
              x="48" 
              y="0" 
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="0.5"
              style={{ 
                animation: 'move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite',
                animationDelay: '-2s', 
                animationDuration: '7s' 
              }} 
            />
            <use 
              xlinkHref="#gentle-wave" 
              x="48" 
              y="3" 
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="0.5"
              style={{ 
                animation: 'move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite',
                animationDelay: '-3s', 
                animationDuration: '10s' 
              }} 
            />
            <use 
              xlinkHref="#gentle-wave" 
              x="48" 
              y="5" 
              fill="none"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="0.5"
              style={{ 
                animation: 'move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite',
                animationDelay: '-4s', 
                animationDuration: '13s' 
              }} 
            />
            <use 
              xlinkHref="#gentle-wave" 
              x="48" 
              y="7" 
              fill="none"
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth="0.5"
              style={{ 
                animation: 'move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite',
                animationDelay: '-5s', 
                animationDuration: '20s' 
              }} 
            />
          </g>
        </svg>
      </div>
      
      {/* Black Overlay 70% */}
      <div className="absolute inset-0 bg-black/70 pointer-events-none z-0"></div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <div className="flex flex-col items-center gap-8 my-5">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-[#DEDAD8] text-5xl md:text-[5.5rem] leading-[0.9] font-black tracking-tight text-center"
            >
              Before & After
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-4 md:max-w-3xl text-center"
          >
            <p className="text-[#DEDAD8]/70 text-lg leading-relaxed m-0">
              단조로움을 넘어선 혁신, <br className="md:hidden" />지금 The Smith에서 경험하세요.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 w-full items-center mb-16 md:mb-24"
        >

          <div className="flex flex-wrap justify-center gap-3">
            {tabs.map((item, index) => (
              <button
                key={item.name}
                onClick={() => {
                   setActiveTab(index);
                   setSliderPosition(50);
                }}
                className={`group px-5 py-2.5 rounded-xl border text-sm font-medium transition-all flex items-center gap-2.5 
                  ${activeTab === index 
                    ? 'bg-white text-black border-white' 
                    : 'border-white/20 text-white hover:bg-white hover:text-black hover:border-white active:scale-95'
                  }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${item.color} ${activeTab === index ? 'bg-black' : 'group-hover:bg-black'} transition-colors`}></div>
                {item.name}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          key={currentTab.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ scale: 1 }} // Force consistent scale
          className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl"
        >
          {currentTab.type === 'slider' ? (
            <div className="relative w-full aspect-video">
              {/* Before Image */}
              <div className="relative w-full h-full">
                <img
                  src={currentTab.beforeImage}
                  alt={currentTab.beforeLabel}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* After Image with Clip */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={currentTab.afterImage}
                  alt={currentTab.afterLabel}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Labels */}
              <div className="absolute top-[15px] md:top-8 left-[10px] md:left-8 bg-black/50 backdrop-blur-sm px-2 py-0.5 md:px-4 md:py-2 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] md:text-sm" style={{ fontWeight: 600 }}>{currentTab.beforeLabel}</span>
              </div>
              <div className="absolute top-[15px] md:top-8 right-[10px] md:right-8 bg-[#E63946]/90 backdrop-blur-sm px-2 py-0.5 md:px-4 md:py-2 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] md:text-sm" style={{ fontWeight: 600 }}>{currentTab.afterLabel}</span>
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />

              {/* Custom Slider Button Overlay */}
              <div 
                className="absolute top-0 bottom-0 pointer-events-none" 
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-0 bottom-0 w-1 bg-white -translate-x-1/2 shadow-sm"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm z-10">
                  <div className="flex items-center justify-center gap-1">
                     <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 14.5L2 8L8.5 1.5" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                     <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 1.5L8 8L1.5 14.5" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full aspect-video">
               <img
                  src={currentTab.image}
                  alt={currentTab.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
               <div className="absolute top-[15px] md:top-8 right-[10px] md:right-8 bg-[#E63946]/90 backdrop-blur-sm px-2 py-0.5 md:px-4 md:py-2 rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] md:text-sm" style={{ fontWeight: 600 }}>{currentTab.badgeLabel || "카플레이어 설치 후"}</span>
               </div>
            </div>
          )}
        </motion.div>

        <div className="mt-8 min-h-[1.25rem]">
          {currentTab.type === 'slider' && (
            <motion.p
              key={`hint-${currentTab.name}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[#DEDAD8]/50 text-center text-sm"
            >
              좌우로 드래그하여 비교해보세요
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}