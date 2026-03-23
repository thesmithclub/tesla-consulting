import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { ShoppingCart, Sparkles, CheckCircle } from 'lucide-react';

const highlights = [
  {
    icon: ShoppingCart,
    title: "1:1 맞춤",
    subtitle: "라이프스타일을 담다",
    description: "나만의 테슬라를 만들어 드립니다"
  },
  {
    icon: Sparkles,
    title: "테슬라 전문가의",
    subtitle: "원스톱 완벽 케어",
    description: "상담부터 옵션설치 원스톱"
  },
  {
    icon: CheckCircle,
    title: "꼼꼼한 기준",
    subtitle: "검증된 품질과 토탈 케어",
    description: (
      <>
        더 스미스가 검증한 믿을 수 있는<br />아이템을 제공합니다.
      </>
    )
  }
];

export function HighlightsSection() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    null
  );
}