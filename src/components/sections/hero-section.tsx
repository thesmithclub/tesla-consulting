import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function HeroSection() {
  const [volume, setVolume] = useState(0.5); // 기본 음량 50%
  const [isMuted, setIsMuted] = useState(false); // 음소거 상태
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.5); // 음소거 전 음량 저장
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 화면/탭 활성화 및 스크롤 위치 감지 상태
  const [isInView, setIsInView] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // 탭 활성화 상태 감지
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // 섹션 노출 여부 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 1.7; // 재생 속도 1.7배
      const handleTimeUpdate = () => {
        if (video.currentTime >= 7) {
          setShowOverlay(true);
        }
      };
      
      video.addEventListener('timeupdate', handleTimeUpdate);
      return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, []);

  // 볼륨 제어 (사용자 설정 + 화면 노출/활성화 상태 반영)
  useEffect(() => {
    if (videoRef.current) {
      if (!isPageVisible || !isInView) {
        videoRef.current.volume = 0;
      } else {
        videoRef.current.volume = volume;
      }
    }
  }, [volume, isPageVisible, isInView]);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <img
        src="https://smith.speedgabia.com/tetris/info/hero_02.gif"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Hero Background"
        onLoad={() => setShowOverlay(true)}
      />

      {/* Black Overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: showOverlay ? 0.7 : 0 }}
        transition={{ duration: 1.5 }}
      />

      {/* Main Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-white"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: showOverlay ? 1 : 0, scale: showOverlay ? 1 : 0.9 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center px-8"
        >
          <div className="relative mx-auto flex flex-col items-center justify-center">
            <div 
              className="grid gap-[1px] w-[90vw] md:w-[800px] aspect-[32/10]"
              style={{
                gridTemplateColumns: 'repeat(32, 1fr)',
                gridTemplateRows: 'repeat(10, 1fr)'
              }}
            >
              {(() => {
                const textDesign = [
                  { y: 2, x: 4, c: 7 }, { y: 2, x: 5, c: 7 }, { y: 2, x: 6, c: 7 }, { y: 3, x: 5, c: 7 }, { y: 4, x: 5, c: 7 }, { y: 5, x: 5, c: 7 }, { y: 6, x: 5, c: 7 },
                  { y: 2, x: 8, c: 3 }, { y: 2, x: 9, c: 3 }, { y: 2, x: 10, c: 3 }, { y: 3, x: 8, c: 3 }, { y: 4, x: 8, c: 3 }, { y: 4, x: 9, c: 3 }, { y: 4, x: 10, c: 3 }, { y: 5, x: 8, c: 3 }, { y: 6, x: 8, c: 3 }, { y: 6, x: 9, c: 3 }, { y: 6, x: 10, c: 3 },
                  { y: 2, x: 12, c: 4 }, { y: 2, x: 13, c: 4 }, { y: 2, x: 14, c: 4 }, { y: 3, x: 13, c: 4 }, { y: 4, x: 13, c: 4 }, { y: 5, x: 13, c: 4 }, { y: 6, x: 13, c: 4 },
                  { y: 2, x: 16, c: 5 }, { y: 2, x: 17, c: 5 }, { y: 2, x: 18, c: 5 }, { y: 3, x: 16, c: 5 }, { y: 3, x: 18, c: 5 }, { y: 4, x: 16, c: 5 }, { y: 4, x: 17, c: 5 }, { y: 5, x: 16, c: 5 }, { y: 5, x: 18, c: 5 }, { y: 6, x: 16, c: 5 }, { y: 6, x: 18, c: 5 },
                  { y: 2, x: 20, c: 1 }, { y: 2, x: 21, c: 1 }, { y: 2, x: 22, c: 1 }, { y: 3, x: 21, c: 1 }, { y: 4, x: 21, c: 1 }, { y: 5, x: 21, c: 1 }, { y: 6, x: 20, c: 1 }, { y: 6, x: 21, c: 1 }, { y: 6, x: 22, c: 1 },
                  { y: 2, x: 24, c: 6 }, { y: 2, x: 25, c: 6 }, { y: 2, x: 26, c: 6 }, { y: 3, x: 24, c: 6 }, { y: 4, x: 24, c: 6 }, { y: 4, x: 25, c: 6 }, { y: 4, x: 26, c: 6 }, { y: 5, x: 26, c: 6 }, { y: 6, x: 24, c: 6 }, { y: 6, x: 25, c: 6 }, { y: 6, x: 26, c: 6 }
                ];
                const colors: Record<number, { bg: string; l: string; d: string }> = {
                  1: { bg: '#00f0f0', l: '#a0ffff', d: '#008080' },
                  2: { bg: '#0000f0', l: '#8080ff', d: '#000080' },
                  3: { bg: '#f0a000', l: '#ffca60', d: '#a06000' },
                  4: { bg: '#f0f000', l: '#ffffa0', d: '#a0a000' },
                  5: { bg: '#00f000', l: '#80ff80', d: '#008000' },
                  6: { bg: '#a000f0', l: '#d080ff', d: '#600090' },
                  7: { bg: '#f00000', l: '#ff8080', d: '#800000' }
                };
                const grid = [];
                for(let r=0; r<10; r++) {
                  for(let c=0; c<32; c++) {
                    const block = textDesign.find(b => b.x === c && b.y === r);
                    if(block) {
                      const color = colors[block.c];
                      grid.push(
                        <motion.div
                          key={`${r}-${c}`}
                          initial={{ y: -500, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ 
                            delay: (c * 0.1) + (Math.random() * 0.5), 
                            duration: 1.5, 
                            type: "spring", 
                            bounce: 0.2 
                          }}
                          className="w-full h-full relative box-border border-solid"
                          style={{
                            backgroundColor: color.bg,
                            borderTopColor: color.l,
                            borderLeftColor: color.l,
                            borderBottomColor: color.d,
                            borderRightColor: color.d,
                            borderWidth: 'clamp(2px, 0.4vw, 4px)'
                          }}
                        />
                      );
                    } else {
                      grid.push(<div key={`${r}-${c}`} className="w-full h-full" />);
                    }
                  }
                }
                return grid;
              })()}
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showOverlay ? 1 : 0, y: showOverlay ? 0 : 20 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="text-white/80 text-sm md:text-lg font-light tracking-widest mt-2 md:-mt-6 relative z-30"
            >
              테트리스는 더 스미스의 테슬라 프리미엄 컨설팅 서비스입니다.
            </motion.p>
          </div>

        </motion.div>
      </motion.div>

      {/* Volume Control */}
      <div 
        className="absolute bottom-8 right-8 z-20 flex items-center gap-3"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        {/* Volume Slider */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ 
            opacity: showVolumeSlider ? 1 : 0, 
            width: showVolumeSlider ? '120px' : '0px' 
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) => setVolume(Number(e.target.value) / 100)}
            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
            style={{
              accentColor: '#DEDAD8',
            }}
          />
        </motion.div>

        {/* Volume Button */}
        <button
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="음량 조절"
          onClick={() => {
            if (isMuted) {
              setVolume(previousVolume);
              setIsMuted(false);
            } else {
              setPreviousVolume(volume);
              setVolume(0);
              setIsMuted(true);
            }
          }}
        >
          {volume === 0 ? <VolumeX className="w-5 h-5 text-white" style={{ opacity: volume === 0 ? 0.5 : 1 }} /> : <Volume2 className="w-5 h-5 text-white" style={{ opacity: volume === 0 ? 0.5 : 1 }} />}
        </button>
      </div>
    </div>
  );
}