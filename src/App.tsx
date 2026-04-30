import './components/suppress-warnings';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  X,
} from 'lucide-react';
import { useEffect, useState, type PointerEvent } from 'react';

const applyUrl = 'https://thesmithclub.github.io/smith-tecon-page/';
const phoneNumber = '010-4227-2010';
const emailAddress = 'gh.kim@smithclub.net';
const googleAdsConversionId = 'AW-16826926132/M9uSCIyM9pwcELSI2tc-';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const serviceCards = [
  {
    title: '맞춤 추천',
    text: '차량 모델, 출고 상태, 운전 습관, 주차 환경, 예산을 기준으로 필요한 아이템만 정리합니다.',
  },
  {
    title: '설치 연결',
    text: '틴팅, PPF, 오토 프렁크, 광각 미러, 인테리어 파츠 등 시공이<br />필요한 항목을 한 번에 안내합니다.',
  },
  {
    title: '정보 제공',
    text: '신차 검수, 차량 기능 설명, 출고 전 준비사항, 관리 팁까지<br />상담 과정에서 함께 제공합니다.',
  },
];

const lifestyleCards = [
  {
    title: '출퇴근 장거리형',
    text: '프리미엄 틴팅, 루프 열차단 PPF, 하이패스',
    image: 'https://smith.speedgabia.com/tetris/info_v2/life_dia/Lifecard1.gif',
    summary: '장거리 주행 피로와 실내 열감을 줄이는 실사용 중심 세팅',
  },
  {
    title: '가족 탑승형',
    text: '광각 미러, PPF, 발수 코팅',
    image: 'https://smith.speedgabia.com/tetris/info_v2/life_dia/Lifecard2.png',
    summary: '가족 탑승 빈도와 안전 시야, 외장 보호를 우선한 구성',
  },
  {
    title: '감성 커스텀형',
    text: '요크 핸들, 화이트 인테리어, 익스테리어',
    image: 'https://smith.speedgabia.com/tetris/info/profile_1.png',
    summary: '실내 분위기와 오너 취향이 드러나는 커스텀 중심 세팅',
  },
  {
    title: '편의 기능형',
    text: '오토 프렁크, 오토 도어,<br />카플레이/안드로이드 오토',
    image: 'https://smith.speedgabia.com/tetris/con_item/autofrunk.gif',
    summary: '매일 반복되는 조작을 줄이고 사용 편의를 높이는 구성',
  },
  {
    title: '입고부터 출고까지',
    text: '신차 검수, 틴팅, PPF 8종, 차량 기능 설명',
    image: 'https://smith.speedgabia.com/tetris/info/new_car_inspection1.png',
    summary: '출고 직후 필요한 보호와 기본 안내를 빠짐없이 정리',
  },
];

const itemCards = [
  {
    title: '프리미엄 틴팅',
    image: 'https://smith.speedgabia.com/tetris/info/Premitting_01.jpg',
    text: '장거리 주행과 여름철 실내 열감을 줄이는 기본 보호 세팅입니다.',
  },
  {
    title: '루프 열차단 PPF',
    image: 'https://smith.speedgabia.com/tetris/con_item/roofppf.gif',
    text: '테슬라 글라스 루프의 열감, 유리 보호, 발수 관리를 함께 고려합니다.',
  },
  {
    title: '요크 핸들 & 인테리어',
    image: 'https://smith.speedgabia.com/tetris/con_item/handel.png',
    text: '실내 분위기를 바꾸고 싶은 오너를 위한 감성 커스텀 항목입니다.',
  },
  {
    title: '오토 프렁크 & 오토 도어',
    image: 'https://smith.speedgabia.com/tetris/con_item/autofrunk.gif',
    text: '매일 반복되는 개폐 동작을 편하게 만드는 사용 빈도 높은 옵션입니다.',
  },
];

const processSteps = [
  {
    num: '01',
    title: '상담 접수',
    text: '차량 모델, 출고 상태, 관심 항목을 남겨주세요.',
    detail: '접수 정보 기준으로 차량 상태와 출고 일정을 먼저 확인합니다.',
  },
  {
    num: '02',
    title: '맞춤 진단',
    text: '운전 습관, 예산, 선호 스타일을 확인합니다.',
    detail: '필요 항목과 보류해도 되는 항목을 분리하기 위한 진단 단계입니다.',
  },
  {
    num: '03',
    title: '아이템 제안',
    text: '필요한 항목만 정리하여 추천드립니다.',
    detail: '패키지 기준가를 바탕으로 실제 구성과 예상 비용을 조정합니다.',
  },
  {
    num: '04',
    title: '설치 및 안내',
    text: '일정, 기능 설명, 관리 팁까지 안내합니다.',
    detail: '설치 이후 사용법과 관리 포인트까지 함께 정리합니다.',
  },
];


const reviews = [
  ['Model Y 오너 Y**', '옵션 선택 고민이 한 번에 해결됐어요. 컨설팅부터 설치까지 완벽했습니다.'],
  ['Model 3 오너 H**', '가격 대비 만족도가 높았습니다. 컨설팅이 생각보다 훨씬 디테일했어요.'],
  ['Model X 오너 T**', '상담부터 시공까지 과정이 체계적이고 빠릅니다. 매우 만족스러워요.'],
];

const compareItems = [
  {
    title: '요크핸들 & 화이트 인테리어',
    before: 'https://smith.speedgabia.com/tetris/info/t_after.png',
    after: 'https://smith.speedgabia.com/tetris/info/t_before.png',
    beforeLabel: 'Before',
    afterLabel: 'After',
    point: '실내 분위기를 더 화사하게 만드는 화이트 인테리어',
  },
  {
    title: '광각 사이드미러',
    before: 'https://smith.speedgabia.com/tetris/info/side_af.gif',
    after: 'https://smith.speedgabia.com/tetris/info/side_bf.gif',
    beforeLabel: 'Before',
    afterLabel: 'After',
    point: '사각지대를 최소화 하여 안전한 차선변경',
  },
  {
    title: '프리미엄 틴팅',
    before: 'https://smith.speedgabia.com/tetris/info/Premitting_01.jpg',
    after: 'https://smith.speedgabia.com/tetris/info/Premitting_02.jpg',
    beforeLabel: '후면',
    afterLabel: '전면',
    point: '뛰어난 열차단 성능으로 전비 향상',
  },
];

const packageOptions = [
  {
    label: '패키지 A',
    price: '1,150,000원',
  },
  {
    label: '패키지 B',
    price: '1,500,000원',
  },
];

const packageRows = [
  { label: '신차검수', values: [true, true] },
  { label: '프리미엄 틴팅', values: [true, true] },
  { label: '루프 열차단 PPF', values: [false, true] },
  { label: 'PPF 구성', values: ['6종', '8종'] },
  { label: '유리막 코팅', values: [true, true] },
  { label: '차량 기능 설명', values: [true, true] },
];

const workedBrands = [
  'Porsche',
  'Bentley',
  'BMW',
  'Lexus',
  'Ferrari',
  'Polestar',
  'Tesla',
];

const allBrandsLabel = 'all';

const workPhotos: Record<string, { title: string; desc: string; image: string }[]> = {
  Porsche: [
    { title: 'Porsche 911 Spirit 70 Heritage Edition', desc: '고급 차량 외장 보호 기준', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/pors3.png' },
    { title: 'Porsche Panamera 4', desc: 'PPF 맞춤 시공', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/pors2.jpg' },
    { title: 'Porsche Taycan Turbo GT', desc: '프리미엄 틴팅', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/pors1.jpg' },
  ],
  Bentley: [
    { title: 'Bentley Flying Spur V8', desc: '고급 차량 외장 보호 기준', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/bentley1.jpg' },
    { title: 'Bentley Continental GT', desc: 'PPF 맞춤 시공', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/bentley2.jpg' },
    { title: 'Bentley Continental GT', desc: '프리미엄 틴팅', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/bentley3.jpg' },
  ],
  BMW: [
    { title: 'BMW X3', desc: '고급 차량 외장 보호 기준', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/bmw1.jpg' },
    { title: 'BMW 520d', desc: 'PPF 맞춤 시공', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/bmw2.jpg' },
    { title: 'BMW 420d', desc: '프리미엄 틴팅', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/bmw3.jpg' },
  ],
  Lexus: [
    { title: 'Lexus LM', desc: '고급 차량 외장 보호 기준', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/Lus1.jpeg' },
    { title: 'Lexus NX450h+ AWD', desc: 'PPF 맞춤 시공', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/Lus2.jpg' },
    { title: 'Lexus RX450h+ AWD', desc: '프리미엄 틴팅', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/Lus3.jpg' },
  ],
  Ferrari: [
    { title: 'Ferrari 296 GTS', desc: '고급 차량 외장 보호 기준', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/fer1.jpg' },
    { title: 'Ferrari Purosangue', desc: 'PPF 맞춤 시공', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/fer2.jpg' },
    { title: 'Ferrari SF90', desc: '프리미엄 틴팅', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/fer3.jpg' },
  ],
  Polestar: [
    { title: 'Polestar 3', desc: '전기차 중심 세팅 경험', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/pstar1.png' },
    { title: 'Polestar 5', desc: '실내 인테리어 커스텀', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/pstar2.png' },
    { title: 'Polestar 4', desc: '프리미엄 틴팅', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/pstar3.jpg' },
  ],
  Tesla: [
    { title: 'Tesla Model Y Juniper', desc: '테슬라 맞춤 아이템 시공', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/tes1.png' },
    { title: 'Tesla Model 3 Highlander', desc: '요크 핸들 커스텀', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/tes2.jpg' },
    { title: 'Tesla Model X', desc: '오토 프렁크/도어', image: 'https://smith.speedgabia.com/tetris/info_v2/work_ref/tes3.jpg' },
  ],
};

const allWorkPhotos = workedBrands.flatMap((brand) => workPhotos[brand] ?? []);

const faqs = [
  ['아직 출고 전인데 상담 가능한가요?', '가능합니다. 출고 예정 모델과 예상 일정 기준으로 우선 준비할 항목을 안내드립니다.'],
  ['서드파티 아이템 추천만 받을 수도 있나요?', '가능합니다. 설치까지 진행하지 않더라도 차량과 생활 패턴에 맞는 아이템 구성을 상담받을 수 있습니다.'],
  ['제가 직접 구매한 아이템도 설치 가능한가요?', '제품 사양과 차량 호환성을 확인한 뒤 가능 여부를 안내드립니다.'],
  ['패키지가 아니라 필요한 항목만 선택할 수 있나요?', '가능합니다. 패키지는 기준 구성이고, 실제 상담에서는 항목 추가/삭제가 가능합니다.'],
  ['테슬라 공식 서비스인가요?', '아닙니다. 테슬라 오너를 위한 서드파티 아이템 추천 및 설치 컨설팅 서비스이며 Tesla Inc.의 공식 서비스가 아닙니다.'],
];

function renderText(text: string) {
  return text.split(/<br\s*\/?>/gi).flatMap((part, index) => (
    index === 0 ? [part] : [<br key={`br-${index}`} />, part]
  ));
}

function Mark({ children }: { children: React.ReactNode }) {
  return <span className="tc-marker">{children}</span>;
}

function openApply() {
  window.gtag?.('event', 'conversion', {
    send_to: googleAdsConversionId,
    value: 1.0,
    currency: 'KRW',
  });
  window.fbq?.('track', 'Lead');
  window.open(applyUrl, '_blank', 'noopener,noreferrer');
}

function updateInteractiveBackground(event: PointerEvent<HTMLElement>) {
  const target = event.currentTarget;
  target.style.setProperty('--pointer-x', `${event.clientX}px`);
  target.style.setProperty('--pointer-y', `${event.clientY}px`);
}

function Header() {
  return (
    <header className="tc-header">
      <a className="tc-wordmark" href="#top" aria-label="The Smith Tesla Consulting">
        THE SMITH
      </a>
      <nav className="tc-nav" aria-label="주요 섹션">
        <a href="#service">Service</a>
        <a href="#items">Items</a>
        <a href="#trust">Trust</a>
        <a href="#process">Process</a>
        <a href="#apply">Apply</a>
      </nav>
      <button className="tc-nav-cta" onClick={openApply}>
        상담 접수
      </button>
    </header>
  );
}

function CtaButtons() {
  return (
    <div className="tc-cta-row">
      <button className="tc-button tc-button-primary" onClick={openApply}>
        1:1 컨설팅 접수
      </button>
      <a className="tc-button tc-button-secondary" href={`tel:${phoneNumber}`}>
        전화로 빠르게 상담
      </a>
    </div>
  );
}

export default function App() {
  const [activeBrand, setActiveBrand] = useState(allBrandsLabel);
  const [compareIndex, setCompareIndex] = useState(0);
  const [comparePosition, setComparePosition] = useState(50);
  const [activeProcess, setActiveProcess] = useState(0);
  const [activeLifestyle, setActiveLifestyle] = useState(0);
  const currentCompare = compareItems[compareIndex];
  const isAllBrands = activeBrand === allBrandsLabel;
  const standardPhotos = isAllBrands ? allWorkPhotos : workPhotos[activeBrand]?.slice(0, 3) ?? [];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveProcess((current) => (current + 1) % processSteps.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main id="top" className="tc-page" onPointerMove={updateInteractiveBackground}>
      <div className="tc-interactive-bg" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Header />

      <section className="tc-hero" aria-label="테슬라 컨설팅 소개">
        <div className="tc-hero-shell">
          <div className="tc-hero-content">
            <p className="tc-eyebrow">Tesla third-party consulting</p>
            <h1>
              테슬라 아이템,<br className="tc-mobile-break" /> <Mark>혼자 고르지 마세요.</Mark>
            </h1>
            <p className="tc-hero-copy">
              내 운전 습관과 라이프스타일에 맞춰<br />
              <Mark>서드파티 아이템 추천부터 설치까지</Mark> 한 번에 도와드립니다.
            </p>
            <div className="tc-consult-methods" aria-label="상담 방식">
              <button type="button" onClick={openApply}>접수 페이지</button>
              <a href={`tel:${phoneNumber}`}>전화상담</a>
              <button type="button" onClick={openApply}>카카오상담</button>
              <a href={`mailto:${emailAddress}`}>메일상담</a>
            </div>
            <div className="tc-hero-badges" aria-label="서비스 특징">
              <span>#테슬라 전문 컨설팅</span>
              <span>#맞춤 아이템 추천</span>
              <span>#설치까지 원스톱</span>
            </div>
          </div>
          <div className="tc-hero-board" aria-hidden="true">
            <img
              className="tc-hero-board-image"
              src="https://smith.speedgabia.com/tetris/info/story_03.gif"
              alt=""
            />
          </div>
        </div>
      </section>

      <section className="tc-section tc-problem tc-animate">
        <div className="tc-section-heading">
          <p className="tc-eyebrow">Why consulting</p>
          <h2>아이템은 많지만<br />내 차에 맞는 <Mark>좋은 제품</Mark>을<br />찾기는 어렵습니다.</h2>
          <p>
            알리익스프레스, 국내몰, 커뮤니티 추천까지 선택지는 많습니다.<br />
            하지만 <Mark>모델 호환성, 설치 난이도, 시공 품질, 실제 체감 효과</Mark>는<br />
            고객마다 다릅니다.
          </p>
        </div>
        <div className="tc-problem-grid">
          {[
            ['출고 전 준비', '무엇부터 해야 할지 모르겠어요.'],
            ['호환성 확인', '아이템은 많은데 내 차에 맞는지 걱정돼요.'],
            ['설치 연결', '구매는 했는데 설치가 어려워요.'],
            ['실사용 판단', '사놓고 사용하지 않을까 걱정돼요.'],
          ].map(([title, text]) => (
            <article key={title} className="tc-quiet-card">
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="service" className="tc-section tc-white tc-animate">
        <div className="tc-section-heading">
          <p className="tc-eyebrow">Service</p>
          <h2>꼭 필요한 아이템만 <Mark>추천받고 설치</Mark>하세요.</h2>
          <p>더 스미스는 다양한 외제차 브랜드에 공식옵션 개발 및 제품개발을 기반으로 전문화된 컨설팅 서비스를 제공합니다.</p>
        </div>
        <div className="tc-card-grid three">
          {serviceCards.map((card) => (
            <article className="tc-service-card" key={card.title}>
              <h3>{renderText(card.title)}</h3>
              <p>{renderText(card.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tc-standard tc-animate" id="trust">
        <div className="tc-standard-copy">
          <div>
            <p className="tc-eyebrow">The Smith standard</p>
            <h2><Mark>프리미엄 고객님들과 함께한 경험</Mark>으로 테슬라를 세팅합니다.</h2>
            <p>
              더 스미스는 다양한 고급 차량의 출고 컨디션과 보호 시공을 다뤄온 경험을 바탕으로,<br />
              테슬라 오너에게 필요한 항목을 선별합니다.
            </p>
          </div>
        </div>
        <div className="tc-brand-strip" aria-label="작업 브랜드">
          <span>WORKED ON</span>
          {[allBrandsLabel, ...workedBrands].map((brand) => (
            <button
              className={brand === activeBrand ? 'is-active' : ''}
              key={brand}
              type="button"
              onClick={() => setActiveBrand(brand)}
            >
              {brand}
            </button>
          ))}
        </div>
        <div className={`tc-standard-gallery ${isAllBrands ? 'is-all' : ''}`} aria-label="외제차 작업이력 이미지 영역">
          {standardPhotos.map((photo, index) => (
            <figure className="tc-standard-photo" key={`${photo.title}-${index}`}>
              <img src={photo.image} alt={photo.title} loading="lazy" />
              <figcaption>
                <strong>{photo.title}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="tc-standard-bottom">
          <p>
            더 스미스는 다양한 글로벌 완성차 브랜드의 차량관리, 공식옵션 개발 및 제조 공급 경험을 바탕으로,<br />
            차량에 꼭 필요한 항목만 선별하여 합리적인 세팅을 제안합니다.
          </p>
          <button className="tc-button tc-button-primary" onClick={openApply}>
            내 테슬라에 맞는 세팅 상담하기 <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <section className="tc-section tc-white tc-animate">
        <div className="tc-section-heading">
          <p className="tc-eyebrow">Lifestyle diagnosis</p>
          <h2>라이프스타일에 따라 달라지는 <Mark>추천제품들</Mark></h2>
          <div className="tc-lifestyle-actions">
            <a className="tc-button tc-button-primary" href="#apply">
              나에게 맞는 제품 추천 받기 <ArrowRight size={16} />
            </a>
          </div>
        </div>
        <div className={`tc-lifestyle-grid ${activeLifestyle === 2 ? 'is-third-active' : ''}`}>
          {lifestyleCards.map((card, index) => (
            <button
              className={`tc-lifestyle-card ${index === activeLifestyle ? 'is-active' : ''}`}
              key={card.title}
              type="button"
              onClick={() => setActiveLifestyle(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{renderText(card.title)}</h3>
              <p>{renderText(card.text)}</p>
              {index === activeLifestyle && (
                <div className="tc-lifestyle-card-media">
                  <img src={card.image} alt={card.title} loading="lazy" />
                  <strong>{card.summary}</strong>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      <section id="items" className="tc-section tc-light tc-animate">
        <div className="tc-section-heading">
          <p className="tc-eyebrow">Recommended items</p>
          <h2>대표 <Mark>서드파티 아이템</Mark></h2>
          <p>운전자의 라이프 스타일과 예산에 맞춘 최적화된 아이템을 제공합니다.</p>
        </div>
        <div className="tc-item-grid">
          {itemCards.map((item) => (
            <article className="tc-item-card" key={item.title}>
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{renderText(item.title)}</h3>
                <p>{renderText(item.text)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="tc-before-after tc-animate">
        <div className="tc-section-heading">
          <p className="tc-eyebrow">Before & after</p>
          <h2>더 스미스의 테슬라 컨설팅<br /><Mark>전/후를 눈으로 비교</Mark>하세요.</h2>
          <p>{renderText(currentCompare.point)}</p>
          <div className="tc-compare-tabs" role="tablist" aria-label="전후비교 항목">
            {compareItems.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={index === compareIndex ? 'is-active' : ''}
                onClick={() => {
                  setCompareIndex(index);
                  setComparePosition(50);
                }}
              >
                {renderText(item.title)}
              </button>
            ))}
          </div>
        </div>
        <div className="tc-compare-shell">
          <div className="tc-compare-stage" style={{ '--compare-position': `${comparePosition}%` } as any}>
            <img src={currentCompare.before} alt={`${currentCompare.title} 설치 전`} />
            <div className="tc-compare-after">
              <img src={currentCompare.after} alt={`${currentCompare.title} 설치 후`} />
            </div>
            <span className="tc-compare-label before">{currentCompare.beforeLabel}</span>
            <span className="tc-compare-label after">{currentCompare.afterLabel}</span>
            <div className="tc-compare-handle">
              <span aria-hidden="true">&lt;&gt;</span>
            </div>
            <input
              aria-label="전후 비교 슬라이더"
              type="range"
              min="5"
              max="95"
              value={comparePosition}
              onChange={(event) => setComparePosition(Number(event.target.value))}
            />
          </div>
        </div>
      </section>

      <section id="packages" className="tc-section tc-white tc-package-section">
        <div className="tc-section-heading">
          <p className="tc-eyebrow">Package example</p>
          <h2><Mark>추천 패키지</Mark></h2>
        </div>
        <div className="tc-package-comparison" aria-label="패키지 가격 비교표">
          <div className="tc-package-head">
            <div className="tc-package-side">
              <strong>Pricing</strong>
              <span>Plan</span>
            </div>
            {packageOptions.map((option, index) => (
              <div className={`tc-package-plan ${index === 0 ? 'is-featured' : ''}`} key={option.label}>
                <strong>{option.label}</strong>
                <span>{option.price}</span>
              </div>
            ))}
          </div>
          <div className="tc-package-rows">
            {packageRows.map((row) => (
              <div className="tc-package-row" key={row.label}>
                <span className="tc-package-feature">{row.label}</span>
                {row.values.map((value, index) => (
                  <span className="tc-package-cell" key={`${row.label}-${index}`}>
                    {value === true ? <Check size={22} aria-label="포함" /> : value === false ? <X size={22} aria-label="제외" /> : value}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <p className="tc-package-note">차량 모델, 필름 등급, 선택 항목에 따라 상담 시 조정됩니다.</p>
        </div>
        <CtaButtons />
      </section>

      <section className="tc-reviews-marquee tc-animate">
        <div className="tc-section-heading">
          <p className="tc-eyebrow">Reviews</p>
          <h2>생생한 <Mark>테슬라 오너들의 리뷰</Mark>를 확인하세요.</h2>
          <p>이미 많은 테슬라 오너들이 테트리스와 함께 드림카를 완성했습니다.</p>
        </div>
        <div className="tc-marquee-row">
          <div className="tc-marquee-track">
            {[...reviews, ...reviews, ...reviews].map(([author, text], index) => (
              <article className="tc-review-card" key={`a-${author}-${index}`}>
                <div className="tc-stars">★★★★★</div>
                <p>"{renderText(text)}"</p>
                <strong>{renderText(author)}</strong>
              </article>
            ))}
          </div>
        </div>
        <div className="tc-marquee-row reverse">
          <div className="tc-marquee-track">
            {[...reviews.slice().reverse(), ...reviews.slice().reverse(), ...reviews.slice().reverse()].map(([author, text], index) => (
              <article className="tc-review-card" key={`b-${author}-${index}`}>
                <div className="tc-stars">★★★★★</div>
                <p>"{renderText(text)}"</p>
                <strong>{renderText(author)}</strong>
              </article>
            ))}
          </div>
        </div>
        <p className="tc-note">본 리뷰는 사전 이벤트를 통해 선정된 오너들의 의견을 정리하여 작성된 내용입니다.</p>
      </section>

      <section id="process" className="tc-section tc-process-v2 tc-animate">
        <div className="tc-section-heading">
          <p className="tc-eyebrow">Process</p>
          <h2>접수 후 <Mark>진행 과정</Mark></h2>
        </div>
        <div className="tc-process-steps" role="list" aria-label="진행 단계">
          {processSteps.map((step, index) => (
            <button
              key={step.num}
              type="button"
              role="listitem"
              className={`tc-process-step ${index === activeProcess ? 'is-active' : ''}`}
              onClick={() => setActiveProcess(index)}
              aria-current={index === activeProcess ? 'step' : undefined}
            >
              <span className="tc-pstep-num">{step.num}</span>
              <h3>{renderText(step.title)}</h3>
              <p>{renderText(step.text)}</p>
            </button>
          ))}
        </div>
      </section>

      <section id="apply" className="tc-final-section tc-apply-v2 tc-animate">
        <div className="tc-final">
          <div>
            <p className="tc-eyebrow">Apply</p>
            <h2>내 테슬라에 맞는<br /><Mark>아이템을 추천</Mark>받으세요.</h2>
            <p>접수 후 영업시간 기준 빠르게 연락드립니다.</p>
            <div className="tc-apply-cta-wrap">
              <button className="tc-button tc-button-primary" type="button" onClick={openApply}>
                1:1 컨설팅 접수하기 <ArrowRight size={18} />
              </button>
            </div>
            <div className="tc-final-actions" aria-label="기타 상담 방법">
              <a className="tc-button tc-button-secondary" href={`tel:${phoneNumber}`}>
                전화상담 <Phone size={15} />
              </a>
              <button className="tc-button tc-button-secondary" type="button" onClick={openApply}>
                카카오상담 <ArrowRight size={15} />
              </button>
              <a className="tc-button tc-button-secondary" href={`mailto:${emailAddress}`}>
                메일상담 <Mail size={15} />
              </a>
            </div>
            <div className="tc-contact-list">
              <a href={`tel:${phoneNumber}`}><Phone size={16} /> {phoneNumber}</a>
              <a href={`mailto:${emailAddress}`}><Mail size={16} /> {emailAddress}</a>
              <span><MapPin size={16} /> 경기도 고양시 일산동구 일산로 418 스미스 빌딩</span>
            </div>
          </div>
        </div>
      </section>

      <section className="tc-section tc-light">
        <div className="tc-section-heading">
          <p className="tc-eyebrow">FAQ</p>
          <h2><Mark>자주 묻는 질문</Mark></h2>
        </div>
        <div className="tc-faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {renderText(question)}
                <ChevronDown size={18} />
              </summary>
              <p>{renderText(answer)}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="tc-footer">
        <span>THE SMITH · 테슬라 컨설팅 서비스</span>
        <span>영업시간 평일 09:00~18:00 · Tesla는 Tesla, Inc.의 등록 상표입니다.</span>
      </footer>

      <div className="tc-mobile-bar">
        <a href={`tel:${phoneNumber}`}>전화 상담</a>
        <button onClick={openApply}>바로 접수</button>
      </div>
    </main>
  );
}
