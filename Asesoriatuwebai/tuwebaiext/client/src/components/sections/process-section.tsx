import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import AnimatedShape from '../ui/animated-shape';
import TypeWriterEffect from 'react-typewriter-effect';

interface ProcessStepProps {
  number: number;
  title: string;
  description: string | string[];
  delay: number;
  useTypewriter?: boolean;
}

function ProcessStep({ number, title, description, delay, useTypewriter = false }: ProcessStepProps) {
  const { ref, hasIntersected } = useIntersectionObserver();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (hasIntersected) {
      const timer = setTimeout(() => setIsReady(true), 1000 + (delay * 150));
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [hasIntersected, delay]);

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        delay: delay * 0.15 
      } 
    }
  };

  return (
    <motion.div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className="flex items-start gap-6"
      initial="hidden"
      animate={hasIntersected ? "visible" : "hidden"}
      variants={stepVariants}
    >
      <div className="flex-shrink-0">
        <motion.div 
          className="h-12 w-12 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-rajdhani font-bold text-xl"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {number}
        </motion.div>
      </div>
      
      <div>
        <h3 className="font-rajdhani font-bold text-xl mb-2 text-white">
          {title}
        </h3>
        <p className="text-gray-300">
          {typeof description === 'object' ? description.join(' ') : description}
        </p>
      </div>
    </motion.div>
  );
}

interface ProcessSectionProps {
  setRef: (ref: HTMLElement | null) => void;
}

export default function ProcessSection({ setRef }: ProcessSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: titleRef, hasIntersected: titleVisible } = useIntersectionObserver<HTMLDivElement>();
  const { ref: subtitleRef, hasIntersected: subtitleVisible } = useIntersectionObserver<HTMLDivElement>();
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    if (subtitleVisible) {
      const timer = setTimeout(() => setIsReady(true), 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [subtitleVisible]);
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  
  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
  };

  return (
    <section 
      id="process" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative bg-gradient-2"
    >
      <AnimatedShape type={1} className="top-[10%] right-[-150px]" delay={1} />
      
      <div className="container mx-auto px-4 py-16 z-10">
        <motion.div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className="text-center mb-6"
          initial="hidden"
          animate={titleVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="font-rajdhani font-bold text-3xl md:text-5xl mb-6">
            <span className="gradient-text gradient-border inline-block pb-2">
              El Proceso de Trabajo
            </span>
          </h2>
        </motion.div>
        
        <motion.div
          ref={subtitleRef as React.RefObject<HTMLDivElement>}
          className="text-center mb-16"
          initial="hidden"
          animate={subtitleVisible ? "visible" : "hidden"}
          variants={subtitleVariants}
        >
          {isReady ? (
            <div className="h-8">
              <TypeWriterEffect
                textStyle={{
                  fontFamily: 'inherit',
                  color: '#d1d5db',
                  fontWeight: 400,
                  fontSize: '1.1rem',
                  textAlign: 'center',
                }}
                startDelay={500}
                cursorColor="#00CCFF"
                multiText={[
                  "Nuestro Proceso: De la Estrategia a los Resultados",
                  "De la Estrategia a los Resultados: Nuestro Método",
                  "Un Enfoque Metódico para Resultados Excepcionales"
                ]}
                multiTextDelay={1000}
                typeSpeed={50}
                multiTextLoop
              />
            </div>
          ) : (
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Nuestro Proceso: De la Estrategia a los Resultados
            </p>
          )}
        </motion.div>
        
        <div className="max-w-3xl mx-auto space-y-12">
          <ProcessStep 
            number={1} 
            title="Análisis y Diagnóstico Inicial" 
            description={[
              "Investigación profunda de tu mercado, audiencia y presencia digital.",
              "Definición de KPIs clave para medir el éxito."
            ]}
            delay={1}
            useTypewriter={true}
          />
          
          <ProcessStep 
            number={2} 
            title="Diseño de Estrategia Personalizada" 
            description="Basado en tus objetivos, diseñamos una estrategia integral de marketing digital, optimización web y análisis continuo."
            delay={2}
            useTypewriter={true}
          />
          
          <ProcessStep 
            number={3} 
            title="Implementación y Ejecución" 
            description={[
              "Creación de la página web o landing pages.",
              "Ejecución de campañas SEO y PPC con optimización en tiempo real."
            ]}
            delay={3}
            useTypewriter={true}
          />
          
          <ProcessStep 
            number={4} 
            title="Monitoreo y Ajustes" 
            description={[
              "Análisis y monitoreo constante de todas las campañas y rendimiento web.",
              "Implementación de ajustes necesarios para mejorar los resultados."
            ]}
            delay={4}
            useTypewriter={true}
          />
          
          <ProcessStep 
            number={5} 
            title="Resultados Medibles" 
            description={[
              "Reportes periódicos con datos claros, análisis y recomendaciones.",
              "Mejoras continuas en la estrategia para maximizar resultados."
            ]}
            delay={5}
            useTypewriter={true}
          />
        </div>
      </div>
    </section>
  );
}