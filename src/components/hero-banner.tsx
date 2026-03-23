import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';

export function HeroBanner() {
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const opacity = Math.min(scrollPosition / windowHeight, 1);
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.playbackRate = 1.5; // 1.5배 속도로 재생
      
      // 비디오 이벤트 리스너 추가
      const handleVideoEnd = () => {
        console.log('Video ended');
        setVideoEnded(true);
      };
      
      videoRef.current.addEventListener('ended', handleVideoEnd);
      
      return () => {
        videoRef.current?.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (volume === 0) {
        setVolume(0.5);
      }
    } else {
      setIsMuted(true);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX className="w-6 h-6 text-white" />;
    } else if (volume < 0.5) {
      return <Volume1 className="w-6 h-6 text-white" />;
    } else {
      return <Volume2 className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* 비디오 배경 */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
          onEnded={() => setVideoEnded(true)}
        >
          <source src="https://www.dropbox.com/scl/fi/za646ica8smbakv1ccs5d/8___202511191054_hk4qo.mp4?rlkey=62vpvgl2vdtooxma44pcq4mww&st=vep2gi2b&raw=1" type="video/mp4" />
        </video>
      </div>

      {/* 스크롤에 따라 어두워지는 오버레이 */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: scrollOpacity }}
      />

      {/* 비디오 종료 후 오버레이 및 텍스트 */}
      {videoEnded && (
        <>
          {/* 어두운 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-black z-10"
          />
          
          {/* 텍스트 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <div className="text-center text-white">
              <h3 className="mb-4 text-white/90 text-[23px] font-[Pretendard] tracking-[-1px]">
                테슬라 유저만을 위한
              </h3>
              <h1 className="text-white text-[96px] font-[Pretendard_Variable] tracking-[-1px] font-bold">
                테트리스 솔루션
              </h1>
            </div>
          </motion.div>
        </>
      )}

      {/* 음량 조절 UI */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
        {/* 볼륨 슬라이더 */}
        {showVolumeControl && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-3"
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </motion.div>
        )}

        {/* 스피커 버튼 */}
        <button
          onClick={() => setShowVolumeControl(!showVolumeControl)}
          onDoubleClick={toggleMute}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center"
          aria-label="음량 조절"
        >
          {getVolumeIcon()}
        </button>
      </div>
    </div>
  );
}