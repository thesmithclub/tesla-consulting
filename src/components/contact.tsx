import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useState } from 'react';

const contactInfo = [
  {
    icon: Mail,
    label: '이메일',
    value: 'contact@example.com',
  },
  {
    icon: Phone,
    label: '전화',
    value: '+82 10-1234-5678',
  },
  {
    icon: MapPin,
    label: '주소',
    value: '서울특별시 강남구',
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('메시지가 전송되었습니다!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="relative h-full w-full bg-slate-50 flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="mb-4 text-slate-900">연락하기</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            프로젝트에 대해 이야기 나누고 싶으신가요? 언제든 연락주세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="이름"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-white"
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  placeholder="이메일"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-white"
                />
              </div>
              
              <div>
                <Textarea
                  placeholder="메시지를 입력하세요"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="bg-white resize-none"
                />
              </div>
              
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                <Send className="w-4 h-4 mr-2" />
                메시지 보내기
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <info.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-slate-500 mb-1">{info.label}</p>
                  <p className="text-slate-900">{info.value}</p>
                </div>
              </motion.div>
            ))}

            <div className="pt-8">
              <p className="text-slate-600 mb-4">소셜 미디어</p>
              <div className="flex gap-4">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center justify-center"
                    aria-label={social}
                  >
                    {social.charAt(0)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
