import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Clock, Gift, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FireworksV2 as Fireworks } from '../ui/fireworks-v2';

const benefits = [
  {
    icon: Gift,
    title: "프리미엄 패키지 40% 할인",
    description: "얼리버드 특가로 프리미엄 솔루션을 합리적인 가격에"
  },
  {
    icon: Zap,
    title: "우선 시공 혜택",
    description: "대기 없이 가장 빠르게 당신의 테슬라를 완성하세요"
  },
  {
    icon: Clock,
    title: "무료 추가 서비스",
    description: "신차 검수 및 차량 기능 설명& 틴팅 필름 설치 고객 한정 하이패스 50대 무료 증정"
  }
];

export function EarlybirdSection() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [timeLeft, setTimeLeft] = useState({ days: 42, hours: 15, minutes: 32, seconds: 10 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={ref} className="min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: '#E63946' }}>
      {inView && <Fireworks />}
      <div className="container mx-auto px-8 py-24 flex flex-col items-center justify-center min-h-screen relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-white mb-4 text-4xl md:text-[5rem]" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
            테슬라 컨설팅 서비스<br />론칭 기념 프로모션
          </h2>
          
          <p className="text-white mb-8 opacity-90 text-[15px] md:text-[20px]">
            테슬라 전용 프리미엄 패키지,<br />40% 할인된 가격으로 지금 만나보세요.
          </p>

          {/* Countdown Timer */}
          <div className="flex gap-2 md:gap-4 justify-center mb-12">
            {[
              { label: '일', value: timeLeft.days },
              { label: '시간', value: timeLeft.hours },
              { label: '분', value: timeLeft.minutes },
              { label: '초', value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-2 md:p-4 min-w-[50px] md:min-w-[80px] px-[20px] md:px-[42px] py-[15px] md:py-[30px]">
                <div className="text-white text-xl md:text-3xl mb-1" style={{ fontWeight: 900 }}>
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-white/70 text-xs md:text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full max-w-6xl">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center hover:bg-white transition-colors duration-300 group cursor-default"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-[#E63946]/10 transition-colors duration-300">
                <benefit.icon className="w-8 h-8 text-white group-hover:text-[#E63946] transition-colors duration-300" />
              </div>
              <h3 className="text-white text-2xl mb-4 group-hover:text-[#E63946] transition-colors duration-300" style={{ fontWeight: 700 }}>
                {benefit.title}
              </h3>
              <p className="text-white/80 text-lg group-hover:text-[#E63946]/80 transition-colors duration-300">
                {index === 0 && (
                  <>
                    <span className="hidden md:inline">얼리버드 특가로 프리미엄 패키지를<br />합리적인 가격에 받으세요.</span>
                    <span className="md:hidden">얼리버드 특가로 프리미엄 패키지를<br />합리적인 가격에</span>
                  </>
                )}
                {index === 1 && (
                  <>
                    <span className="hidden md:inline">대기 없이 가장 빠르게<br />당신의 테슬라를 완성하세요</span>
                    <span className="md:hidden">대기 없이 가장 빠르게<br />당신의 테슬라를 완성하세요</span>
                  </>
                )}
                {index === 2 && (
                  <>
                    신차 검수 및 차량 기능 설명 &<br />
                    패키지 구매 고객 한정 스미스패스 증정<br />
                    <span className="text-sm mt-[10px] block text-[13px] italic mr-[0px] mb-[-5px] ml-[0px]">하이패스 증정은 선착순 50대 한정으로 진행됩니다.</span>
                  </>
                )}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button className="bg-white text-[#E63946] px-12 py-6 rounded-full text-xl hover:scale-105 transition-transform" style={{ fontWeight: 700 }}>
            얼리버드 혜택 신청하고 특별한 테슬라 완성하기 →
          </button>
          <p className="text-white/70 text-sm mt-4 text-center">
            마감일: 한정 제품 소진시까지
          </p>
        </motion.div>
      </div>
    </div>
  );
}