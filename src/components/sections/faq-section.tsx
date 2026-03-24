import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: '프로모션 혜택은 중복으로 받을 수 있나요?',
    a: '네, 6가지 혜택 모두 중복 적용 가능합니다. 예를 들어 프리미엄 패키지를 선택하시면 틴팅 30% 할인 + 하이패스 증정 + 무료 신차검수 + 패키지 업그레이드 + 1년 애프터케어를 모두 받으실 수 있습니다.',
  },
  {
    q: '아직 출고일이 확정되지 않았는데 예약 가능한가요?',
    a: '네, 사전예약 시스템을 통해 지금 프로모션 가격을 확정해두실 수 있습니다. 출고일이 확정되면 연락주시고, 출고 당일 또는 익일 시공을 진행합니다. 사전예약 취소 시 위약금은 없습니다.',
  },
  {
    q: '신차 검수만 받고 시공은 안 해도 되나요?',
    a: '물론입니다. 론칭 프로모션 기간 중 신차 검수는 패키지 구매와 관계없이 무료로 제공됩니다. 검수 후 시공 여부는 자유롭게 결정하시면 됩니다.',
  },
  {
    q: '시공 시간은 얼마나 걸리나요?',
    a: '패키지에 따라 다르지만, 에센셜 패키지 기준 약 4~5시간, 프리미엄 패키지 기준 약 6~8시간 소요됩니다. 대부분 당일 인도가 가능하며, VIP 컨설팅의 경우 1~2일 소요될 수 있습니다.',
  },
  {
    q: '어디서 시공하나요?',
    a: '경기도 고양시 일산 본사(스미스 빌딩)에서 진행됩니다. 추후 수도권 내 추가 지점 확장 예정이며, 자세한 위치는 상담 시 안내드립니다.',
  },
];

export function FaqSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div
      ref={ref}
      className="w-full relative overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* 배경 그라데이션 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(227,25,55,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-6 md:px-8 py-20 md:py-28 relative z-10">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 md:mb-20"
        >
          <div
            className="inline-block text-xs tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{
              color: '#e31937',
              background: 'rgba(227,25,55,0.1)',
              border: '1px solid rgba(227,25,55,0.25)',
              letterSpacing: '0.15em',
            }}
          >
            FAQ
          </div>
          <h2
            className="text-white text-4xl md:text-[4rem] leading-tight"
            style={{ fontWeight: 900, letterSpacing: '-0.02em' }}
          >
            자주 묻는 질문
          </h2>
        </motion.div>

        {/* FAQ 목록 */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="border-b"
              style={{ borderColor: '#1e1e1e' }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 py-6 text-left group"
              >
                <span
                  className="text-base md:text-lg transition-colors duration-200"
                  style={{
                    color: openIndex === i ? '#e31937' : '#f0f0f0',
                    fontWeight: 600,
                  }}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  className="flex-shrink-0 w-5 h-5 transition-transform duration-300"
                  style={{
                    color: openIndex === i ? '#e31937' : '#555',
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p
                      className="pb-6 text-sm md:text-base leading-relaxed"
                      style={{ color: '#888' }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* 하단 애니메이션 구분선 */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
          className="mt-20 md:mt-28 relative h-px max-w-3xl mx-auto"
          style={{ background: 'linear-gradient(90deg, transparent, #e31937, transparent)', transformOrigin: 'center' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-8 flex justify-center"
        >
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-2 h-2 rounded-full"
            style={{ background: '#e31937', boxShadow: '0 0 12px 4px rgba(227,25,55,0.4)' }}
          />
        </motion.div>
      </div>
    </div>
  );
}
