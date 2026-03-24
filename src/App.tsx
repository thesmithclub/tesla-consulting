import './components/suppress-warnings';
import { useState, useEffect, useRef } from 'react';
import { EarlybirdSection } from './components/sections/earlybird-section';
import { SolutionsSection } from './components/sections/solutions-section';
import { PackagesSection } from './components/sections/packages-section';
import { BeforeAfterSection } from './components/sections/before-after-section';
import { HighlightsSection } from './components/sections/highlights-section';
import { BenefitsSection } from './components/sections/benefits-section';
import { ProcessSection } from './components/sections/process-section';
import { MBTISection } from './components/sections/mbti-section';
import { ReviewsSection } from './components/sections/reviews-section';
import { ConsultingSection } from './components/sections/consulting-section';
import { CtaSection } from './components/sections/cta-section';
import { FaqSection } from './components/sections/faq-section';
import { Navigation } from './components/navigation';
import { ScrollIndicator } from './components/scroll-indicator';

const sections = [
  { id: 'consulting', component: ConsultingSection, label: '고민상담' },
  { id: 'reviews', component: ReviewsSection, label: '리뷰' },
  { id: 'earlybird', component: EarlybirdSection, label: '얼리버드' },
  { id: 'packages', component: PackagesSection, label: '패키지' },
  { id: 'solutions', component: SolutionsSection, label: '솔루션' },
  { id: 'before-after', component: BeforeAfterSection, label: '전후비교' },
  { id: 'highlights', component: HighlightsSection, label: '강점' },
  { id: 'benefits', component: BenefitsSection, label: '혜택' },
  { id: 'process', component: ProcessSection, label: '프로세스' },
  { id: 'mbti', component: MBTISection, label: 'AI 추천' },
  { id: 'cta', component: CtaSection, label: 'CTA' },
  { id: 'faq', component: FaqSection, label: 'FAQ' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prevSectionRef = useRef(0);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let currentSectionIndex = 0;
      
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSectionIndex = index;
          }
        }
      });

      if (currentSectionIndex !== prevSectionRef.current) {
        // Only apply snap-to-top behavior on desktop when scrolling up
        if (!isMobile && currentSectionIndex < prevSectionRef.current) {
          const targetSection = sections[currentSectionIndex];
          const element = document.getElementById(targetSection.id);
          if (element) {
            window.scrollTo({
              top: element.offsetTop,
              behavior: 'smooth'
            });
          }
        }
        
        prevSectionRef.current = currentSectionIndex;
        setActiveSection(currentSectionIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(sections[index].id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <Navigation
        sections={sections}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
      
      <ScrollIndicator />
      
      {sections.map((section) => {
        const Component = section.component;
        return (
          <section key={section.id} id={section.id} className="md:snap-start md:snap-always">
            <Component />
          </section>
        );
      })}
    </div>
  );
}
