import { motion } from 'motion/react';
import { Target, Zap, Heart } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: '목표 지향적',
    description: '명확한 목표를 가지고 최고의 결과를 만들어냅니다',
  },
  {
    icon: Zap,
    title: '빠른 실행력',
    description: '신속한 의사결정과 실행으로 프로젝트를 완성합니다',
  },
  {
    icon: Heart,
    title: '열정적인 태도',
    description: '모든 프로젝트에 열정과 진심을 담아 작업합니다',
  },
];

export function About() {
  return (
    <div className="relative h-full w-full bg-slate-900 flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-white">소개</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            우리는 혁신적인 솔루션으로 고객의 비전을 현실로 만듭니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-800 p-8 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="mb-3 text-white">{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
