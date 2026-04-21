import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, MessageSquare, Phone, Mail, Zap, Copy, Check } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const mbtiData: Record<string, { method: string; methodType: 'phone' | 'email' | 'direct'; desc: string; quote: string }> = {
  // 전화문의
  ESTP: { method: '전화문의', methodType: 'phone', desc: '말하는 게 제일 빨라! 행동파 & 소통파', quote: '타자 칠 시간에 전화해서 끝내는 게 낫죠. <br />지금 바로 해결해 주세요!' },
  ESFP: { method: '전화문의', methodType: 'phone', desc: '말하는 게 제일 빨라! 행동파 & 소통파', quote: '글로 쓰려니 너무 딱딱해요~ <br />상담원님 목소리 듣고 기분 좋게 해결할래요!' },
  ENTP: { method: '전화문의', methodType: 'phone', desc: '말하는 게 제일 빨라! 행동파 & 소통파', quote: '이메일은 너무 느려요. <br />논리적으로 따져보고 즉각적인 피드백을 원합니다.' },
  ESTJ: { method: '전화문의', methodType: 'phone', desc: '말하는 게 제일 빨라! 행동파 & 소통파', quote: '가장 확실한 방법은 담당자와 직접 통화하는 거죠. <br />업무 처리는 신속 정확하게!' },
  ENFJ: { method: '전화문의', methodType: 'phone', desc: '말하는 게 제일 빨라! 행동파 & 소통파', quote: '글보다는 말로 제 진심을 전하고 싶어요. <br />상담원님도 힘내세요!' },
  ESFJ: { method: '전화문의', methodType: 'phone', desc: '말하는 게 제일 빨라! 행동파 & 소통파', quote: '혹시 제 글이 차갑게 보일까 봐 걱정돼요. <br />친절하게 말로 설명하고 싶어요.' },
  ENFP: { method: '전화문의', methodType: 'phone', desc: '말하는 게 제일 빨라! 행동파 & 소통파', quote: '문의하다가 다른 아이디어도 떠오를 것 같아요! <br />일단 통화 버튼 누르고 봅니다!' },

  // 이메일문의
  INFP: { method: '이메일문의', methodType: 'email', desc: '생각할 시간이 필요해! 신중파 & 기록파', quote: '(전화벨 울리는 상상만 해도 긴장됨) <br />제 마음을 담아 정성스럽게 적어서 보낼게요...' },
  INFJ: { method: '이메일문의', methodType: 'email', desc: '생각할 시간이 필요해! 신중파 & 기록파', quote: '혹시라도 말실수할까 봐 걱정돼요. <br />완벽하게 문장을 다듬어서 메일로 보낼게요.' },
  ISFJ: { method: '이메일문의', methodType: 'email', desc: '생각할 시간이 필요해! 신중파 & 기록파', quote: '지금 전화하면 상담원분이 바쁘시지 않을까요? <br />차분히 읽으실 수 있게 메일로 남깁니다.' },
  ISFP: { method: '이메일문의', methodType: 'email', desc: '생각할 시간이 필요해! 신중파 & 기록파', quote: '전화는 기 빨려요... <br />그냥 조용히 메일 보내고 내 할 일 하러 갈래...' },

  // 바로접수
  INTJ: { method: '바로접수', methodType: 'direct', desc: '절차와 효율이 생명! 논리파 & 마이웨이', quote: '감정 소모는 비효율적입니다. <br />정해진 양식에 맞춰 접수했으니, 결과만 통보해 주세요.' },
  ISTJ: { method: '바로접수', methodType: 'direct', desc: '절차와 효율이 생명! 논리파 & 마이웨이', quote: '규정과 절차에 맞게 빈칸을 모두 채웠습니다. <br />시스템대로 처리 부탁드립니다.' },
  INTP: { method: '바로접수', methodType: 'direct', desc: '절차와 효율이 생명! 논리파 & 마이웨이', quote: '전화나 메일은 귀찮네요. <br />그냥 버튼 몇 번 눌러서 접수되는 이 기능이 최고입니다.' },
  ENTJ: { method: '바로접수', methodType: 'direct', desc: '절차와 효율이 생명! 논리파 & 마이웨이', quote: '빠른 일 처리가 핵심이죠. <br />구구절절 설명할 필요 없이 바로 접수하고 다음 업무 봅니다.' },
  ISTP: { method: '바로접수', methodType: 'direct', desc: '절차와 효율이 생명! 논리파 & 마이웨이', quote: '(입력 항목이 많으면 뒤로 가기 누름) 간편 접수? <br />오케이, 딱 필요한 것만 있군. 전송.' },
};

type ResultType = {
  mbti: string;
  method: string;
  methodType: 'phone' | 'email' | 'direct';
  desc: string;
  quote: string;
};

export function MBTISection() {
  const [mbti, setMbti] = useState({
    EI: '',
    NS: '',
    TF: '',
    JP: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);
  // Contact Modal State
  const [contactModal, setContactModal] = useState<{ open: boolean; type: 'phone' | 'email'; value: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const isComplete = mbti.EI && mbti.NS && mbti.TF && mbti.JP;
  const userMBTI = `${mbti.EI}${mbti.NS}${mbti.TF}${mbti.JP}`;

  const handleConsult = async () => {
    if (!isComplete) return;

    // Google 광고 전환 이벤트 호출
    if (typeof (window as any).gtag_report_conversion === 'function') {
      (window as any).gtag_report_conversion();
    }

    setLoading(true);
    setResult(null); // Reset result

    // Mock API Call - Increased delay to 3.5s (1.5s original + 2s requested)
    setTimeout(() => {
      const data = mbtiData[userMBTI] || mbtiData['ESTP']; // Default fallback
      setResult({
        mbti: userMBTI,
        ...data
      });
      setLoading(false);
    }, 3500);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'phone': return <Phone className="w-8 h-8 md:w-12 md:h-12 text-[#E63946]" />;
      case 'email': return <Mail className="w-8 h-8 md:w-12 md:h-12 text-[#E63946]" />;
      case 'direct': return <Zap className="w-8 h-8 md:w-12 md:h-12 text-[#E63946]" />;
      default: return <MessageSquare className="w-8 h-8 md:w-12 md:h-12 text-[#E63946]" />;
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContactClick = (type: 'phone' | 'email') => {
    const isPC = window.innerWidth >= 768;
    const value = type === 'phone' ? '010-4227-2010' : 'gh.kim@smithclub.net';

    if (isPC) {
      setContactModal({ open: true, type, value });
    } else {
      if (type === 'phone') {
        window.location.href = `tel:${value}`;
      } else {
        window.location.href = `mailto:${value}`;
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#111111] flex flex-col justify-between relative overflow-hidden">
      <style>{`
        @keyframes smokeMove {
          0% { transform: rotate(var(--rotate)) translate(120px) scale(1); opacity: 0; }
          10% { opacity: 0.8; }
          50% { transform: rotate(var(--rotate)) translate(200px) scale(2); opacity: 0.5; }
          100% { transform: rotate(var(--rotate)) translate(300px) scale(0); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(0.9); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
      
      {/* Dynamic Smoke Background */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-1000 ease-in-out"
        style={{ '--time-scale': loading ? 0.3 : 1 } as any}
      >
        <div className="relative w-[300px] h-[300px] flex items-center justify-center">
          <div className="absolute w-[300px] h-[300px] rounded-full blur-[30px] animate-[pulse_4s_ease-in-out_infinite]"
               style={{ background: 'radial-gradient(circle, rgba(230, 57, 70, 0.3) 0%, transparent 70%)' }} />
          {Array.from({ length: 40 }).map((_, i) => {
             const angle = (360 / 40) * i;
             const duration = 2 + Math.random() * 3;
             const delay = Math.random() * 5;
             return (
               <div
                 key={i}
                 className="absolute w-2 h-2 bg-[#E63946] rounded-full blur-[1px]"
                 style={{
                   boxShadow: '0 0 15px #E63946, 0 0 30px #E63946',
                   '--rotate': `${angle}deg`,
                   animationName: 'smokeMove',
                   animationDuration: `calc(${duration}s * var(--time-scale))`,
                   animationTimingFunction: 'ease-in-out',
                   animationIterationCount: 'infinite',
                   animationDelay: `-${delay}s`
                 } as any}
               />
             );
          })}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center w-full py-24 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl min-h-[600px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-col items-center justify-center text-center h-full py-20"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-[#E63946]/20 blur-xl rounded-full animate-pulse" />
                  <Loader2 className="w-16 h-16 text-[#E63946] animate-spin relative z-10" />
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-white mb-2">
                  AI가 당신의 성향을<br />분석하고 있습니다.
                </h3>
                <p className="text-white/50">잠시만 기다려주세요...</p>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-tight">
                    MBTI로 알아보는<br />
                    <span className="text-[#E63946]">나만의 문의 스타일</span>
                  </h2>
                  <p className="text-white/60 text-lg md:text-xl">
                    성향을 선택하시면 AI가<br className="md:hidden" /> 최적의 상담/접수 방법을 제안해드립니다.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
                  {/* MBTI Selector */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {[
                      ['E', 'I'],
                      ['N', 'S'],
                      ['T', 'F'],
                      ['J', 'P']
                    ].map((pair, idx) => (
                      <div key={idx} className="bg-black/20 rounded-2xl p-2 flex flex-col gap-2">
                        {pair.map((type) => {
                          const isActive = Object.values(mbti)[idx] === type;
                          return (
                            <button
                              key={type}
                              onClick={() => setMbti(prev => {
                                const keys = ['EI', 'NS', 'TF', 'JP'];
                                return { ...prev, [keys[idx]]: type };
                              })}
                              className={`w-full py-4 rounded-xl text-lg font-bold transition-all duration-300 ${
                                isActive 
                                  ? 'bg-[#E63946] text-white shadow-lg shadow-[#E63946]/30 scale-105' 
                                  : 'bg-transparent text-white/30 hover:bg-white/5 hover:text-white/60'
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="text-center">
                    <button
                      onClick={handleConsult}
                      disabled={!isComplete}
                      className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm md:text-lg font-bold transition-all duration-300 ${
                        isComplete 
                          ? 'bg-white text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]' 
                          : 'bg-white/10 text-white/30 cursor-not-allowed'
                      }`}
                    >
                      <Sparkles className={`w-5 h-5 ${isComplete ? 'text-[#E63946]' : ''}`} />
                      나에게 적합한 문의방법 찾기
                    </button>
                  </div>

                  {/* Result Section */}
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="mt-12 bg-[#E63946]/10 border border-[#E63946]/20 rounded-2xl overflow-hidden"
                    >
                      {/* Main Result */}
                      <div className="p-8 md:p-10 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                          <span className="text-6xl md:text-9xl font-black text-white">{result.mbti}</span>
                        </div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="bg-[#E63946] p-3 md:p-4 rounded-full mb-0 md:mb-6 shadow-lg shadow-[#E63946]/30 scale-50 md:scale-100 origin-center">
                            {getIcon(result.methodType)}
                          </div>
                          
                          <h3 className="text-[#E63946] font-bold text-xl md:text-2xl mb-2">{result.desc}</h3>
                          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-tight">
                            {result.method}
                          </h2>
                          
                          <div className="bg-black/30 p-6 rounded-xl border border-white/5 max-w-2xl w-full">
                            <p 
                              className="text-white/90 text-lg md:text-xl font-medium leading-relaxed break-keep whitespace-pre-wrap line-clamp-2"
                              dangerouslySetInnerHTML={{ __html: `"${result.quote}"` }}
                            />
                          </div>

                          <button
                            onClick={() => {
                              if (result.methodType === 'phone') handleContactClick('phone');
                              else if (result.methodType === 'email') handleContactClick('email');
                              else if (result.methodType === 'direct') window.open('https://thesmithclub.github.io/smith-tecon-page/', '_blank');
                            }}
                            className="mt-8 px-8 py-3 bg-[#E63946] text-white font-bold rounded-lg hover:bg-[#E63946]/90 transition-colors shadow-lg flex items-center gap-2"
                          >
                            {result.method} 바로가기 <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Other Options */}
                      <div className="bg-black/40 p-6 border-t border-white/5">
                        <p className="text-white/40 text-center text-sm font-medium mb-4 uppercase tracking-widest">Other Options</p>
                        <div className="flex flex-wrap justify-center gap-4">
                          {['phone', 'email', 'direct'].filter(t => t !== result.methodType).map((type) => {
                            let label = '';
                            let Icon = MessageSquare;
                            
                            if (type === 'phone') { label = '전화문의'; Icon = Phone; }
                            else if (type === 'email') { label = '이메일문의'; Icon = Mail; }
                            else { label = '바로접수'; Icon = Zap; }

                            return (
                              <button
                                key={type}
                                onClick={() => {
                                  if (type === 'phone') handleContactClick('phone');
                                  if (type === 'email') handleContactClick('email');
                                  if (type === 'direct') window.open('https://thesmithclub.github.io/smith-tecon-page/', '_blank');
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all text-sm"
                              >
                                <Icon className="w-4 h-4" />
                                <span>{label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Contact Modal */}
      <Dialog open={!!contactModal?.open} onOpenChange={(open) => !open && setContactModal(null)}>
        <DialogContent className="sm:max-w-md bg-[#1a1a1a] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              {contactModal?.type === 'phone' ? <Phone className="w-5 h-5 text-[#E63946]" /> : <Mail className="w-5 h-5 text-[#E63946]" />}
              {contactModal?.type === 'phone' ? '전화문의' : '이메일문의'}
            </DialogTitle>
            <DialogDescription className="text-white/60 pt-2">
              상세한 상담 도와드리겠습니다.<br/>
              아래 {contactModal?.type === 'phone' ? '연락처' : '주소'}를 복사해서 사용해주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 pt-4">
            <div className="grid flex-1 gap-2">
              <div className="flex items-center justify-between p-3 rounded-md bg-black/30 border border-white/10">
                <span className="text-sm font-medium text-white/90">{contactModal?.value}</span>
                <button
                  onClick={() => contactModal && handleCopy(contactModal.value)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-white/60" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}