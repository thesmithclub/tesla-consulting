import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

const packages = [
  {
    tier: 'ESSENTIAL',
    tierColor: '#4a9eff',
    tierBg: 'rgba(74,158,255,0.1)',
    tierBorder: 'rgba(74,158,255,0.25)',
    name: '에센셜 패키지',
    desc: <>처음 테슬라를 시작하는 분에게<br />꼭 필요한 것만 담았습니다</>,
    price: '79',
    priceNote: 'Model Y 기준 / VAT 포함',
    items: [
      { text: '프리미엄 틴팅 "벨라"', highlight: true },
      { text: '생활 PPF 5종 (도어컵·엣지·충전구·헤드라이트)', highlight: false },
      { text: '스미스패스 하이패스 단말기', highlight: false },
      { text: '신차 검수 (PDI 전문 인력)', highlight: true },
      { text: '차량 기능 설명 (1:1 안내)', highlight: false },
      { text: '테슬라 숨은 기능 공유', bonus: true },
    ],
    btnLabel: '상담 신청하기',
    btnStyle: { background: 'rgba(74,158,255,0.12)', color: '#4a9eff', border: '1px solid rgba(74,158,255,0.3)' },
    popular: false,
    badge: null,
  },
  {
    tier: 'STANDARD',
    tierColor: '#a855f7',
    tierBg: 'rgba(168,85,247,0.1)',
    tierBorder: 'rgba(168,85,247,0.25)',
    name: '스탠다드 패키지',
    desc: <>보호와 편의를 동시에.<br />가장 인기 있는 구성</>,
    price: '129',
    priceNote: 'Model Y 기준 / VAT 포함',
    items: [
      { text: '프리미엄 틴팅 "벨라"', highlight: true },
      { text: '글라스 루프 열차단 PPF', highlight: true },
      { text: '생활 PPF 7종', highlight: false },
      { text: '스미스패스 하이패스 단말기', highlight: false },
      { text: '신차 검수 (PDI 전문 인력)', highlight: true },
      { text: '테슬라 숨은 기능 공유', bonus: true },
    ],
    btnLabel: '상담 신청하기',
    btnStyle: { background: 'rgba(168,85,247,0.12)', color: '#a855f7', border: '1px solid rgba(168,85,247,0.3)' },
    popular: false,
    badge: 'Good 추천',
  },
  {
    tier: 'PREMIUM',
    tierColor: '#f59e0b',
    tierBg: 'rgba(245,158,11,0.1)',
    tierBorder: 'rgba(245,158,11,0.35)',
    name: '프리미엄 패키지',
    desc: <>테슬라를 200% 즐기는<br />완벽한 세팅</>,
    price: '199',
    priceNote: 'Model Y 기준 / VAT 포함',
    items: [
      { text: '최상급 틴팅 "베가"', highlight: true },
      { text: '글라스 루프 열차단 PPF', highlight: true },
      { text: '본넷 PPF + 생활 PPF 7종', highlight: true },
      { text: '스미스패스 하이패스 단말기', highlight: false },
      { text: '신차 검수 (PDI 전문 인력)', highlight: true },
      { text: '테슬라 숨은 기능 공유', bonus: true },
    ],
    btnLabel: '상담 신청하기',
    btnStyle: { background: '#e31937', color: '#fff', border: 'none' },
    popular: true,
    badge: 'BEST 추천',
  },
  {
    tier: 'VIP',
    tierColor: '#e31937',
    tierBg: 'rgba(227,25,55,0.1)',
    tierBorder: 'rgba(227,25,55,0.25)',
    name: 'VIP 컨설팅',
    desc: <>나만의 테슬라를 완성하는<br />풀커스텀 솔루션</>,
    price: null,
    priceNote: '1:1 상담 후 견적 안내',
    items: [
      { text: '프리미엄 패키지 전 항목 포함', highlight: true },
      { text: '요크 핸들 교체', highlight: true },
      { text: '화이트 인테리어 시공', highlight: true },
      { text: '오토도어 설치', highlight: true },
      { text: '안드로이드 오토 / 카플레이어', highlight: true },
      { text: '풀 랩핑 또는 전체 PPF 선택', highlight: false },
      { text: '전용 컨설턴트 배정 + VIP 애프터케어', bonus: true },
    ],
    btnLabel: 'VIP 상담 신청',
    btnStyle: { background: 'linear-gradient(135deg, #c9a94e, #a8860a)', color: '#0a0a0a', border: 'none' },
    popular: false,
    badge: null,
  },
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
          className="mb-14 md:mb-20"
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
            Tesla Packages
          </div>
          <h2
            className="text-white text-4xl md:text-[4rem] leading-tight mb-4"
            style={{ fontWeight: 900, letterSpacing: '-0.02em' }}
          >
            신차패키지 한눈에 보기
          </h2>
          <p className="text-base md:text-lg" style={{ color: '#999' }}>
            내 예산과 라이프스타일에 맞는 패키지를 선택하세요. 모든 패키지에 신차 검수 포함.
          </p>
        </motion.div>

        {/* 패키지 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.tier}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="relative flex flex-col rounded-2xl p-6 md:p-7 transition-transform duration-300 hover:-translate-y-2"
              style={{
                background: pkg.popular
                  ? 'linear-gradient(170deg, #1a0408, #141414)'
                  : '#141414',
                border: `1px solid ${pkg.popular ? pkg.tierBorder : '#222'}`,
                boxShadow: pkg.popular
                  ? `0 0 40px rgba(227,25,55,0.12)`
                  : 'none',
              }}
            >
              {/* 배지 */}
              {pkg.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs whitespace-nowrap"
                  style={{
                    background: pkg.popular ? '#e31937' : 'rgba(168,85,247,0.85)',
                    color: '#fff',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                >
                  {pkg.badge}
                </div>
              )}

              {/* 티어 라벨 */}
              <div
                className="text-[0.7rem] font-bold tracking-widest mb-2"
                style={{ color: pkg.tierColor, letterSpacing: '0.15em' }}
              >
                {pkg.tier}
              </div>

              {/* 이름 */}
              <div className="text-white text-xl md:text-2xl mb-2" style={{ fontWeight: 800 }}>
                {pkg.name}
              </div>

              {/* 설명 */}
              <div className="text-sm mb-5" style={{ color: '#999', lineHeight: 1.6 }}>
                {pkg.desc}
              </div>

              {/* 가격 */}
              <div
                className="text-4xl md:text-5xl mb-1"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, color: '#f0f0f0' }}
              >
                {pkg.price ? (
                  <>
                    {pkg.price}
                    <span className="text-base" style={{ fontWeight: 400 }}>만원~</span>
                  </>
                ) : (
                  <span className="text-2xl md:text-3xl">맞춤 견적</span>
                )}
              </div>
              <div className="text-xs mb-5" style={{ color: '#666' }}>
                {pkg.priceNote}
              </div>

              {/* 구분선 */}
              <div className="mb-5" style={{ height: 1, background: '#222' }} />

              {/* 항목 리스트 */}
              <ul className="flex flex-col gap-2 flex-1 mb-6">
                {pkg.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ lineHeight: 1.5 }}>
                    <span
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: item.bonus ? undefined : '#e31937' }}
                    >
                      {item.bonus ? '🎁' : '✓'}
                    </span>
                    <span
                      style={{
                        color: item.highlight ? '#f0f0f0' : '#999',
                        fontWeight: item.highlight ? 500 : 400,
                      }}
                    >
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* 버튼 */}
              <button
                className="w-full py-3 rounded-xl text-sm transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{
                  ...pkg.btnStyle,
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                }}
              >
                {pkg.btnLabel}
              </button>
            </motion.div>
          ))}
        </div>

        {/* 안내 문구 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-xs mt-10"
          style={{ color: '#555', lineHeight: 1.9 }}
        >
          ※ 가격은 차량 모델, 틴팅 필름 종류, 블랙박스 기종 등에 따라 변동될 수 있습니다.<br />
          ※ 패키지 간 개별 품목 교체·추가·삭제 가능합니다. 상담 시 안내드립니다.
        </motion.p>
      </div>
    </div>
  );
}
