interface NavigationProps {
  sections: Array<{ id: string; label: string }>;
  activeSection: number;
  onNavigate: (index: number) => void;
}

export function Navigation({ sections, activeSection, onNavigate }: NavigationProps) {
  return (
    <nav className={`hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-4 ${
      sections[activeSection]?.id === 'earlybird' ? '' : 'mix-blend-difference'
    }`}>
      {sections.map((section, index) => {
        const labels = [
          "메인 화면",
          "테트리스란?",
          "얼리버드 특별 혜택",
          "테트리스 아이템",
          "시공 전 후 비교",
          "서비스 하이라이트",
          "혜택 3가지",
          "서비스 프로세스",
          "문의하기"
        ];

        return (
          <button
            key={section.id}
            onClick={() => onNavigate(index)}
            className="group relative"
            aria-label={`${labels[index]} 섹션으로 이동`}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === index
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}