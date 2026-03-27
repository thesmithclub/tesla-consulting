import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

export function Footer() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <footer
      ref={ref}
      className="w-full relative"
      style={{ backgroundColor: '#060606', borderTop: '1px solid #1a1a1a' }}
    >
      <div className="container mx-auto px-6 md:px-8 py-14 md:py-16">
        {/* 구분선 */}
        <div className="mb-8" style={{ height: 1, background: '#1a1a1a' }} />

        {/* 회사 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="text-xs leading-loose" style={{ color: '#444' }}>
            <p>모빌리티 플랫폼 기업 <span style={{ color: '#666' }}>더 스미스</span> · 경기도 고양시 일산동구 일산로 418 스미스 빌딩</p>
            <p>사업자등록번호 128-87-16927 · 031-903-2121</p>
            <p className="mt-3">
              <a href="#" className="hover:text-white transition-colors duration-200 mr-4" style={{ color: '#444' }}>이용약관</a>
              <a href="#" className="hover:text-white transition-colors duration-200 mr-4" style={{ color: '#444' }}>개인정보처리방침</a>
              <a href="https://www.smithclub.net" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200" style={{ color: '#444' }}>더 스미스 본사</a>
            </p>
            <p className="mt-3" style={{ color: '#333' }}>영업시간 평일 09:00~18:00 · 카카오톡은 24시간 접수 가능</p>
          </div>

          <p className="text-xs" style={{ color: '#2e2e2e', whiteSpace: 'nowrap' }}>
            © 2025 THE SMITH. All rights reserved.<br className="md:hidden" />
            {' '}Tesla는 Tesla, Inc.의 등록 상표입니다.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
