import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

const packageItems = [
  { text: '신차검수 (기본)', sub: 'PDI 전문 인력 검수', highlight: true, bonus: false },
  { text: 'VEGA 프리미엄 열차단 필름', sub: '모델3 열선 = 하프시공 기준 / 모델X = 별도 문의', highlight: true, bonus: false },
  { text: '테슬라 전용 루프 열차단 PPF', sub: 'IR 97% 차단 · 유리보호 + 발수코팅', highlight: true, bonus: false },
  { text: 'PPF 8종 패키지', sub: null, tags: ['도어컵', '도어엣지', 'B필러', '등 8종'], highlight: true, bonus: false },
  { text: '유리막 코팅', sub: '광택 보호 및 발수 효과', highlight: false, bonus: false },
  { text: '유리발수 (유막 제거)', sub: '시야 확보 및 안전 강화', highlight: false, bonus: false },
  { text: '테슬라 차량 가이드 및 기능 설명', sub: '1:1 맞춤 안내', highlight: false, bonus: false },
  { text: '테슬라 전용 APP 증정', sub: '전비 관리 및 주행 기록', highlight: false, bonus: true },
];

export function PackagesSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

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
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(227,25,55,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-6 md:px-8 py-20 md:py-28 relative z-10">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 md:mb-20 text-center"
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
            Premium Package
          </div>
          <h2
            className="text-white text-4xl md:text-[4rem] leading-tight mb-4"
            style={{ fontWeight: 900, letterSpacing: '-0.02em' }}
          >
            신차패키지 한눈에 보기
          </h2>
          <p className="text-base md:text-lg" style={{ color: '#999' }}>
            신차 검수부터 전문가 보호까지, 스마트한 케어를 한 번에
          </p>
        </motion.div>

        {/* 단일 패키지 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(170deg, #1a0408, #141414)',
              border: '1px solid rgba(227,25,55,0.35)',
              boxShadow: '0 0 60px rgba(227,25,55,0.15)',
            }}
          >
            <div className="p-8 md:p-12">
              {/* 상단: 티어 + 이름 + 설명 */}
              <div className="mb-8">
                <div
                  className="text-[0.7rem] font-bold mb-3"
                  style={{ color: '#e31937', letterSpacing: '0.2em' }}
                >
                  THE SMITH PREMIUM
                </div>
                <h3
                  className="text-white text-3xl md:text-4xl mb-3"
                  style={{ fontWeight: 900, letterSpacing: '-0.02em' }}
                >
                  테슬라 올인원 패키지
                </h3>
                <p className="text-sm md:text-base" style={{ color: '#999' }}>
                  테슬라 전문 컨설팅 서비스 · 신차 검수부터 보호 시공까지 완벽한 세팅
                </p>
              </div>

              {/* 가격 */}
              <div
                className="mb-8 pb-8"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-xs" style={{ color: '#555' }}>정가</div>
                  <div
                    className="text-lg"
                    style={{
                      color: '#666',
                      textDecoration: 'line-through',
                      fontWeight: 500,
                    }}
                  >
                    ₩2,500,000
                  </div>
                </div>
                <div className="flex items-end gap-4 flex-wrap">
                  <div>
                    <div className="text-sm mb-1" style={{ color: '#e31937' }}>특가</div>
                    <div
                      className="text-5xl md:text-6xl"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 900,
                        color: '#f0f0f0',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      ₩1,500,000
                    </div>
                  </div>
                  <div
                    className="px-4 py-2 rounded-full text-sm self-end mb-1"
                    style={{
                      background: '#e31937',
                      color: '#fff',
                      fontWeight: 700,
                    }}
                  >
                    40% OFF
                  </div>
                </div>
              </div>

              {/* 항목 그리드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
                {packageItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
                    className="flex items-start gap-3 rounded-xl p-4"
                    style={{
                      background: item.highlight
                        ? 'rgba(227,25,55,0.06)'
                        : 'rgba(255,255,255,0.03)',
                      border: item.highlight
                        ? '1px solid rgba(227,25,55,0.15)'
                        : '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <span
                      className="flex-shrink-0 mt-0.5 text-base"
                      style={{ color: item.bonus ? undefined : '#e31937' }}
                    >
                      {item.bonus ? '🎁' : '✓'}
                    </span>
                    <div>
                      <div
                        className="text-sm"
                        style={{
                          color: item.highlight ? '#f0f0f0' : '#ccc',
                          fontWeight: item.highlight ? 600 : 400,
                          lineHeight: 1.4,
                        }}
                      >
                        {item.text}
                      </div>
                      {item.sub && (
                        <div className="text-xs mt-0.5" style={{ color: '#666' }}>
                          {item.sub}
                        </div>
                      )}
                      {'tags' in item && item.tags && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-block"
                              style={{
                                fontSize: '0.6rem',
                                padding: '1px 6px',
                                borderRadius: '4px',
                                background: 'rgba(227,25,55,0.12)',
                                color: 'rgba(227,25,55,0.8)',
                                border: '1px solid rgba(227,25,55,0.2)',
                                letterSpacing: '0.01em',
                                lineHeight: '1.6',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA 버튼 */}
              <button
                className="w-full py-4 rounded-xl text-base transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{
                  background: '#e31937',
                  color: '#fff',
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                  border: 'none',
                }}
                onClick={() => {
                  const el = document.getElementById('mbti');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                상담 신청하기
              </button>
            </div>
          </div>
        </motion.div>

        {/* 안내 문구 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-xs mt-10"
          style={{ color: '#555', lineHeight: 1.9 }}
        >
          ※ 가격은 차량 모델, 틴팅 필름 종류, 시공 항목에 따라 변동될 수 있습니다.<br />
          ※ 개별 항목 추가·삭제 가능합니다. 상담 시 안내드립니다.
        </motion.p>
      </div>
    </div>
  );
}
