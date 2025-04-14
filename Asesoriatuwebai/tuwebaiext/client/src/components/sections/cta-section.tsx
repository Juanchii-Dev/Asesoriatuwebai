import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import AnimatedShape from '../ui/animated-shape';

interface CTASectionProps {
  setRef: (ref: HTMLElement | null) => void;
}

export default function CTASection({ setRef }: CTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: contentRef, hasIntersected: contentVisible } = useIntersectionObserver<HTMLDivElement>();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.3
      } 
    }
  };

  return (
    <section 
      id="cta" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-gradient-to-b from-[#121217] to-[#13131f]"
    >
      <AnimatedShape type={2} className="top-[10%] right-[-100px]" delay={1} />
      <AnimatedShape type={1} className="bottom-[10%] left-[-100px]" delay={2} />
      
      {/* Removida la referencia a imagen no existente */}
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div 
          ref={contentRef}
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate={contentVisible ? "visible" : "hidden"}
          variants={contentVariants}
        >
          <h2 className="font-rajdhani font-bold text-3xl md:text-5xl mb-6 text-white">
            Agenda tu consulta gratuita hoy mismo y lleva tu negocio al siguiente nivel
          </h2>
          
          <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
            Descubre cómo nuestro enfoque estratégico y personalizado puede transformar tu presencia digital 
            y potenciar tu crecimiento comercial.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <motion.a 
              href="/consulta" 
              className="px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium shadow-lg hover:shadow-[#00CCFF]/20 w-full md:w-auto text-center"
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Agenda Consultoría Gratuita
            </motion.a>
            
            <motion.a 
              href="/consulta"
              className="px-8 py-4 bg-transparent border border-[#00CCFF] rounded-full text-white font-medium hover:bg-[#00CCFF]/10 transition-colors w-full md:w-auto text-center"
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Solicita una Propuesta Personalizada
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}