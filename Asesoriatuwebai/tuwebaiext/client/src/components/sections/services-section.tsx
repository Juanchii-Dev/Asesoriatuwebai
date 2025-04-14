import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import AnimatedShape from '../ui/animated-shape';
import TypeWriterEffect from 'react-typewriter-effect';

interface ServiceCardProps {
  title: string;
  description: string | React.ReactNode;
  icon: React.ReactNode;
  delay: number;
  isTypewriter?: boolean;
}

function ServiceCard({ title, description, icon, delay, isTypewriter = false }: ServiceCardProps) {
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    if (hasIntersected) {
      const timer = setTimeout(() => setIsReady(true), 1000 + (delay * 200));
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [hasIntersected, delay]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        delay: delay * 0.2 
      } 
    }
  };

  return (
    <motion.div 
      ref={ref}
      className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] h-full"
      initial="hidden"
      animate={hasIntersected ? "visible" : "hidden"}
      variants={cardVariants}
    >
      <motion.div 
        className="bg-[#121217] h-full rounded-xl p-6 flex flex-col"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-4 h-14 w-14 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
          {icon}
        </div>
        
        <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">{title}</h3>
        
        {isTypewriter && isReady ? (
          <div className="text-gray-300 flex-grow min-h-[100px]">
            <TypeWriterEffect
              textStyle={{
                fontFamily: 'inherit',
                color: '#d1d5db',
                fontWeight: 400,
                fontSize: '0.9rem',
                textAlign: 'left',
              }}
              startDelay={100}
              cursorColor="#00CCFF"
              text={typeof description === 'string' ? description : ''}
              typeSpeed={50}
            />
          </div>
        ) : (
          <div className="text-gray-300 flex-grow">
            {description}
          </div>
        )}
        
        <div className="mt-6 pt-4 border-t border-gray-700">
          <a 
            href={title.includes("1") ? "/consultoria-estrategica" : 
                 title.includes("2") ? "/desarrollo-web-profesional" : 
                 title.includes("3") ? "/marketing-digital-y-seo" : 
                 title.includes("4") ? "/conversion-cro" : 
                 title.includes("5") ? "/automatizacion-marketing" : "/consulta"}
            target="_blank"
            rel="noopener noreferrer" 
            className="text-[#00CCFF] hover:text-[#9933FF] transition-colors duration-300 flex items-center text-sm"
          >
            <span>Descubrir más</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ServicesSectionProps {
  setRef: (ref: HTMLElement | null) => void;
}

export default function ServicesSection({ setRef }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: titleRef, hasIntersected: titleVisible } = useIntersectionObserver<HTMLDivElement>();
  const { ref: introRef, hasIntersected: introVisible } = useIntersectionObserver<HTMLDivElement>();
  const { ref: buttonRef, hasIntersected: buttonVisible } = useIntersectionObserver<HTMLDivElement>();
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    if (introVisible) {
      const timer = setTimeout(() => setIsReady(true), 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [introVisible]);
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  
  const introVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } }
  };

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative bg-gradient-1"
    >
      <AnimatedShape type={2} className="bottom-[10%] right-[-100px]" delay={2} />
      
      <div className="container mx-auto px-4 py-16 z-10">
        <motion.div 
          ref={titleRef}
          className="text-center mb-6"
          initial="hidden"
          animate={titleVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="font-rajdhani font-bold text-3xl md:text-5xl mb-6">
            <span className="gradient-text gradient-border inline-block pb-2">Nuestra Solución Integral</span>
          </h2>
        </motion.div>
        
        <motion.div
          ref={introRef}
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden"
          animate={introVisible ? "visible" : "hidden"}
          variants={introVariants}
        >
          {isReady ? (
            <div className="h-20">
              <TypeWriterEffect
                textStyle={{
                  fontFamily: 'inherit',
                  color: '#d1d5db',
                  fontWeight: 400,
                  fontSize: '1.1rem',
                  textAlign: 'center',
                }}
                startDelay={1000}
                cursorColor="#00CCFF"
                multiText={[
                  "Ofrecemos una solución completa de asesoría comercial digital...",
                  "Maximizamos tu rendimiento en el mundo digital...",
                  "Todo lo que necesitas, bajo un mismo techo."
                ]}
                multiTextDelay={1000}
                typeSpeed={50}
                multiTextLoop
              />
            </div>
          ) : (
            <p className="text-xl text-gray-300">
              Cargando...
            </p>
          )}
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ServiceCard 
            title="1. Consultoría Estratégica"
            description={
              <ul className="list-disc list-inside space-y-2">
                <li>Análisis exhaustivo de tu modelo de negocio.</li>
                <li>Diseño de una estrategia digital adaptada a tus necesidades y metas.</li>
                <li>Asesoría en optimización comercial.</li>
              </ul>
            }
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            delay={1}
          />
          
          <ServiceCard 
            title="2. Desarrollo Web Profesional"
            description={
              <ul className="list-disc list-inside space-y-2">
                <li>Diseño y desarrollo de sitios web modernos, rápidos y optimizados para SEO y conversión.</li>
                <li>Implementación de landing pages de alta conversión.</li>
              </ul>
            }
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            delay={2}
          />
          
          <ServiceCard 
            title="3. Posicionamiento SEO y Marketing Digital"
            description={
              <ul className="list-disc list-inside space-y-2">
                <li>Estrategias SEO avanzadas para mejorar tu posicionamiento en motores de búsqueda.</li>
                <li>Publicidad de pago por clic (PPC) en plataformas como Google Ads, Facebook Ads, LinkedIn Ads.</li>
              </ul>
            }
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            }
            delay={3}
          />
          
          <ServiceCard 
            title="4. Optimización de Conversión (CRO)"
            description={
              <ul className="list-disc list-inside space-y-2">
                <li>Mejoramos la tasa de conversión de tu sitio web mediante pruebas A/B, diseño UX/UI y optimización continua.</li>
                <li>Implementación de herramientas como Google Optimize y Hotjar para análisis de comportamiento.</li>
              </ul>
            }
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
            delay={4}
          />
          
          <ServiceCard 
            title="5. Automatización de Marketing"
            description={
              <ul className="list-disc list-inside space-y-2">
                <li>Implementación de herramientas de automatización para nutrir leads y gestionar clientes sin esfuerzo.</li>
                <li>Integración con plataformas como HubSpot, ActiveCampaign.</li>
              </ul>
            }
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            }
            delay={5}
          />
        </div>
        
        <motion.div 
          ref={buttonRef}
          className="text-center mt-16"
          initial="hidden"
          animate={buttonVisible ? "visible" : "hidden"}
          variants={buttonVariants}
        >
          <motion.a 
            href="/consulta" 
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium shadow-lg hover:shadow-[#00CCFF]/20"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Agenda tu consulta gratuita
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
