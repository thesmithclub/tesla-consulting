import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: '전자상거래 플랫폼',
    category: '웹 개발',
    image: 'ecommerce platform',
  },
  {
    title: '모바일 뱅킹 앱',
    category: '모바일 앱',
    image: 'mobile banking app',
  },
  {
    title: '기업 브랜딩',
    category: '브랜딩',
    image: 'corporate branding',
  },
  {
    title: '소셜 미디어 대시보드',
    category: 'UI/UX',
    image: 'dashboard interface',
  },
];

export function Portfolio() {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-white">포트폴리오</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            우리가 만들어온 성공적인 프로젝트들을 확인해보세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl bg-slate-800 hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback
                  src={`https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop`}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-purple-300 mb-2">{project.category}</p>
                    <h3 className="text-white">{project.title}</h3>
                  </div>
                  <ExternalLink className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
