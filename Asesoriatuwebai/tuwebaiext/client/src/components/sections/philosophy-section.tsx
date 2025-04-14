import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import AnimatedShape from '../ui/animated-shape';
import TypeWriterEffect from 'react-typewriter-effect';

interface PhilosophySectionProps {
  setRef: (ref: HTMLElement | null) => void;
}

export default function PhilosophySection({ setRef }: PhilosophySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: leftColumnRef, hasIntersected: leftVisible } = useIntersectionObserver<HTMLDivElement>();
  const { ref: rightColumnRef, hasIntersected: rightVisible } = useIntersectionObserver<HTMLDivElement>();
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    if (leftVisible || rightVisible) {
      const timer = setTimeout(() => setIsReady(true), 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [leftVisible, rightVisible]);
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }

  const leftVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } }
  };

  return (
    <section 
      id="philosophy" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative bg-gradient-2"
    >
      <AnimatedShape type={1} className="top-[30%] left-[-150px]" delay={5} />
      
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center z-10">
        <motion.div 
          ref={leftColumnRef}
          initial="hidden"
          animate={leftVisible ? "visible" : "hidden"}
          variants={leftVariants}
        >
          <h2 className="font-rajdhani font-bold text-3xl md:text-5xl mb-6">
            <span className="gradient-text gradient-border inline-block pb-2">
              ¿Quiénes Somos?
            </span>
          </h2>
          
          <p className="text-lg md:text-xl font-medium mb-6 text-gray-200">
            TuWeb.ai - Consultoría Digital y Comercial para el Éxito Empresarial
          </p>
          
          <p className="text-gray-300 mb-8">
            Nuestra misión es ofrecer soluciones personalizadas a empresas que buscan optimizar su presencia digital, aumentar su rendimiento comercial y maximizar su ROI a través de estrategias digitales integrales.
          </p>
          
          <div className="inline-flex items-center space-x-3 my-6">
            <div className="h-1 w-12 bg-[#00CCFF]"></div>
            <span className="text-gray-400 font-rajdhani uppercase tracking-wider text-sm">
              Nuestros Valores
            </span>
          </div>
          
          <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
            <li>Innovación constante</li>
            <li>Atención personalizada</li>
            <li>Resultados medibles y sostenibles</li>
            <li>El éxito de nuestros clientes es nuestro éxito</li>
          </ul>
        </motion.div>
        
        <motion.div 
          ref={rightColumnRef}
          initial="hidden"
          animate={rightVisible ? "visible" : "hidden"}
          variants={rightVariants}
        >
          <div className="relative p-1 rounded-lg bg-gradient-to-br from-[#00CCFF] to-[#9933FF]">
            <div className="bg-[#0a0a0f] rounded-lg p-8">
              <h3 className="font-rajdhani text-2xl mb-6 text-gray-100">Nuestra Visión</h3>
              
              {isReady && (
                <div className="h-24">
                  <TypeWriterEffect
                    textStyle={{
                      fontFamily: 'inherit',
                      color: '#d1d5db',
                      fontWeight: 400,
                      fontSize: '1.2rem',
                      textAlign: 'left',
                    }}
                    startDelay={1000}
                    cursorColor="#9933FF"
                    multiText={[
                      "Convertirnos en la consultoría digital más influyente en Latinoamérica...",
                      "Ayudando a empresas de todos los tamaños a innovar...",
                      "Crecer y mantenerse competitivas en el mercado.",
                      "Transformando negocios a través de la tecnología.",
                    ]}
                    multiTextDelay={1000}
                    typeSpeed={50}
                    multiTextLoop
                  />
                </div>
              )}
              
              <p className="text-gray-300 mt-8 mb-4">
                En un mundo donde la primera impresión digital es definitiva, TuWeb.ai nace para 
                transformar ideas en experiencias online memorables que generan resultados comerciales.
              </p>
              
              <p className="text-gray-300">
                Combinamos estrategia comercial, marketing digital y automatización de procesos
                para llevar tu negocio al siguiente nivel.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
