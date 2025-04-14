import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import AnimatedShape from '../ui/animated-shape';
import TypeWriterEffect from 'react-typewriter-effect';

interface CaseStudyCardProps {
  title: string;
  problem: string;
  solution: string;
  result: string;
  delay: number;
}

function CaseStudyCard({ title, problem, solution, result, delay }: CaseStudyCardProps) {
  const { ref, hasIntersected } = useIntersectionObserver();
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    if (hasIntersected) {
      const timer = setTimeout(() => setIsReady(true), 1000 + (delay * 200));
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [hasIntersected, delay]);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.6, 
        delay: delay * 0.15 
      } 
    }
  };

  return (
    <motion.div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className="bg-[#121217] rounded-lg p-6 border border-gray-800 h-full"
      initial="hidden"
      animate={hasIntersected ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4">
        <h3 className="font-rajdhani font-bold text-xl mb-2 text-white">
          {title}
        </h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-[#00CCFF] font-medium mb-1">Problema:</p>
          <p className="text-gray-300">{problem}</p>
        </div>
        
        <div>
          <p className="text-[#9933FF] font-medium mb-1">Solución:</p>
          <p className="text-gray-300">{solution}</p>
        </div>
        
        <div>
          <p className="text-green-400 font-medium mb-1">Resultado:</p>
          <p className="text-gray-300">{result}</p>
        </div>
      </div>
    </motion.div>
  );
}

interface ImpactSectionProps {
  setRef: (ref: HTMLElement | null) => void;
}

export default function ImpactSection({ setRef }: ImpactSectionProps) {
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
      id="impact" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative bg-gradient-2"
    >
      <AnimatedShape type={1} className="bottom-[10%] right-[-100px]" delay={3} />
      
      <div className="container mx-auto px-4 py-16 z-10">
        <motion.div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className="text-center mb-6"
          initial="hidden"
          animate={titleVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="font-rajdhani font-bold text-3xl md:text-5xl mb-6">
            <span className="gradient-text gradient-border inline-block pb-2">Casos de Éxito Reales</span>
          </h2>
        </motion.div>
        
        <motion.div
          ref={subtitleRef as React.RefObject<HTMLDivElement>}
          className="text-center mb-12"
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
                  "Impacto Real en el Mundo Digital",
                  "Resultados Verificables para Nuestros Clientes",
                  "Transformación Digital con Resultados Medibles"
                ]}
                multiTextDelay={1000}
                typeSpeed={50}
                multiTextLoop
              />
            </div>
          ) : (
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Impacto Real en el Mundo Digital
            </p>
          )}
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <CaseStudyCard 
            title="Empresa X - Comercio Local"
            problem="Poca visibilidad online y ventas bajas."
            solution="Rediseñamos su página web y creamos campañas de SEO y Google Ads."
            result="Aumento de 50% en tráfico web y un incremento del 30% en ventas durante los primeros 3 meses."
            delay={1}
          />
          
          <CaseStudyCard 
            title="Empresa Y - Expansión Internacional"
            problem="Solo vendían localmente y querían expandir su alcance."
            solution="Creamos una estrategia de publicidad segmentada, optimización web y estrategias de contenido."
            result="Su presencia internacional creció un 200%, duplicando las ventas online en 6 meses."
            delay={2}
          />
          
          <CaseStudyCard 
            title="Empresa Z - Optimización de Conversión"
            problem="Alta tasa de visitas pero baja conversión."
            solution="Realizamos un análisis exhaustivo de su UX/UI, con pruebas A/B y cambios en el diseño de la página."
            result="Mejoraron la conversión en un 40% en 2 meses."
            delay={3}
          />
        </div>
        
        <motion.div 
          className="max-w-3xl mx-auto text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-rajdhani font-bold text-2xl mb-4 text-white">Tu empresa podría ser el próximo caso de éxito</h3>
          
          <p className="text-gray-300 text-lg">
            En TuWeb.ai nos especializamos en transformar negocios a través de estrategias digitales 
            personalizadas. Desde pequeñas empresas locales hasta compañías con proyección internacional, 
            nuestro enfoque se centra en resultados medibles y sostenibles.
          </p>
          
          <motion.div 
            className="mt-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <a 
              href="/consulta" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium shadow-lg hover:shadow-[#00CCFF]/20"
            >
              Sé nuestro próximo éxito
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}