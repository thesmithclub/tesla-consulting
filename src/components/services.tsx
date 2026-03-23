import { motion } from 'motion/react';
import { Code, Palette, Smartphone, Globe } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: '웹 개발',
    description: '최신 기술 스택을 활용한 반응형 웹 애플리케이션 개발',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Palette,
    title: 'UI/UX 디자인',
    description: '사용자 중심의 직관적이고 아름다운 인터페이스 설계',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Smartphone,
    title: '모바일 앱',
    description: 'iOS와 Android를 위한 네이티브 앱 개발',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Globe,
    title: '브랜딩',
    description: '기업의 정체성을 담은 브랜드 전략 및 디자인',
    color: 'from-orange-500 to-red-500',
  },
];

export function Services() {
  return (
    <div className="relative h-full w-full bg-white flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-slate-900">서비스</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            다양한 분야의 전문성으로 최상의 서비스를 제공합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl bg-white border border-slate-200 p-8 hover:shadow-xl transition-shadow"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${service.color} mb-4`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="mb-3 text-slate-900">{service.title}</h3>
                <p className="text-slate-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
