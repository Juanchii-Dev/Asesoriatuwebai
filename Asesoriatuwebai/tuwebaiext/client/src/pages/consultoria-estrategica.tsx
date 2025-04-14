import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import NavDots from '@/components/ui/nav-dots';
import AnimatedShape from '@/components/ui/animated-shape';
import ScrollProgress from '@/components/ui/scroll-progress';
import WhatsAppButton from '@/components/ui/whatsapp-button';
import TypeWriterEffect from 'react-typewriter-effect';

export default function ConsultoriaEstrategica() {
  const sections = [
    { id: "hero", label: "Inicio" },
    { id: "estrategia", label: "Estrategia" },
    { id: "planes", label: "Planes" },
    { id: "competitivo", label: "Análisis" },
    { id: "crecimiento", label: "Crecimiento" },
    { id: "contacto", label: "Contacto" }
  ];

  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({
    hero: null,
    estrategia: null,
    planes: null,
    competitivo: null,
    crecimiento: null,
    contacto: null
  });

  const setSectionRef = (id: string, ref: HTMLElement | null) => {
    sectionRefs.current[id] = ref;
  };

  return (
    <>
      {/* Barra de progreso de scroll */}
      <ScrollProgress />
      
      {/* Navegación de puntos */}
      <NavDots sections={sections} />
      
      {/* Botón de WhatsApp */}
      <WhatsAppButton />

      <main className="relative">
        <HeroSection setRef={(ref: HTMLElement | null) => setSectionRef('hero', ref)} />
        <EstrategiaSection setRef={(ref: HTMLElement | null) => setSectionRef('estrategia', ref)} />
        <PlanesNegocioSection setRef={(ref: HTMLElement | null) => setSectionRef('planes', ref)} />
        <AnalisisCompetitivoSection setRef={(ref: HTMLElement | null) => setSectionRef('competitivo', ref)} />
        <CrecimientoEmpresarialSection setRef={(ref: HTMLElement | null) => setSectionRef('crecimiento', ref)} />
        <ContactoSection setRef={(ref: HTMLElement | null) => setSectionRef('contacto', ref)} />
      </main>
    </>
  );
}

interface SectionProps {
  setRef: (ref: HTMLElement | null) => void;
}

function HeroSection({ setRef }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }
  
  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative bg-gradient-1"
    >
      <AnimatedShape type={1} className="top-[20%] left-[-100px]" delay={0} />
      <AnimatedShape type={2} className="bottom-[20%] right-[-100px]" delay={1} />
      
      <div className="container mx-auto px-4 py-16 z-10">
        <motion.div 
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-rajdhani font-bold text-4xl md:text-6xl mb-6">
            <span className="gradient-text gradient-border inline-block pb-2">Consultoría Estratégica</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Transformamos tu visión de negocio en una estrategia digital efectiva y medible, adaptada a tus necesidades y objetivos específicos.
          </p>
          
          <motion.div
            className="flex justify-center gap-6 flex-wrap"
            initial={{ opacity: 0 }}
            animate={hasIntersected ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.a 
              href="#estrategia" 
              className="px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium shadow-lg hover:shadow-[#00CCFF]/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Explorar Servicios
            </motion.a>
            
            <motion.a 
              href="/consulta" 
              className="px-8 py-4 bg-transparent border border-[#00CCFF] rounded-full text-white font-medium hover:bg-[#00CCFF]/10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Agenda una Consulta
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function EstrategiaSection({ setRef }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    if (hasIntersected) {
      const timer = setTimeout(() => setIsReady(true), 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [hasIntersected]);
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }
  
  return (
    <section 
      id="estrategia" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative bg-gradient-2"
    >
      <AnimatedShape type={2} className="top-[30%] right-[-100px]" delay={0.5} />
      
      <div className="container mx-auto px-4 py-16 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-rajdhani font-bold text-3xl md:text-4xl mb-6">
              <span className="gradient-text gradient-border inline-block pb-2">Nuestra Metodología Estratégica</span>
            </h2>
            
            {isReady ? (
              <div className="min-h-[180px]">
                <TypeWriterEffect
                  textStyle={{
                    fontFamily: 'inherit',
                    color: '#d1d5db',
                    fontWeight: 400,
                    fontSize: '1.1rem',
                  }}
                  startDelay={500}
                  cursorColor="#00CCFF"
                  text="Desarrollamos estrategias a medida que alinean tus objetivos de negocio con las necesidades de tu audiencia. Nuestro enfoque metodológico se basa en datos y análisis exhaustivos para potenciar tu crecimiento digital."
                  typeSpeed={30}
                />
              </div>
            ) : (
              <p className="text-xl text-gray-300 min-h-[180px]">
                Cargando...
              </p>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]"
          >
            <div className="bg-[#121217] rounded-xl p-8">
              <h3 className="font-rajdhani font-bold text-2xl mb-6 text-white">
                Nuestro Proceso de Estrategia
              </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Diagnóstico Inicial</h4>
                    <p className="text-gray-300">Análisis exhaustivo de tu empresa, sector, competencia y audiencia.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Definición de Objetivos</h4>
                    <p className="text-gray-300">Establecimiento de metas claras, medibles y alcanzables alineadas con tu visión.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Planificación Estratégica</h4>
                    <p className="text-gray-300">Desarrollo de un plan de acción detallado con timeline y KPIs.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Implementación y Seguimiento</h4>
                    <p className="text-gray-300">Ejecución táctica del plan con monitoreo y ajustes constantes.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3 mt-0.5">
                    5
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Evaluación de Resultados</h4>
                    <p className="text-gray-300">Análisis de métricas, valoración de impacto y optimización continua.</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PlanesNegocioSection({ setRef }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }
  
  const featureItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
      }
    })
  };
  
  return (
    <section 
      id="planes" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative bg-gradient-1"
    >
      <AnimatedShape type={1} className="bottom-[20%] left-[-100px]" delay={0} />
      
      <div className="container mx-auto px-4 py-16 z-10">
        <motion.div 
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-rajdhani font-bold text-3xl md:text-5xl mb-6">
            <span className="gradient-text gradient-border inline-block pb-2">Planes de Negocio Integrales</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Creamos planes de negocio completos y detallados que sirven como hoja de ruta para el éxito de tu empresa en el entorno digital.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            custom={0}
            variants={featureItemVariants}
            initial="hidden"
            animate={hasIntersected ? "visible" : "hidden"}
            className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] h-full"
          >
            <div className="bg-[#121217] h-full rounded-xl p-6">
              <div className="mb-4 h-14 w-14 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Planes de Startup</h3>
              
              <ul className="text-gray-300 space-y-3 mb-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Análisis de viabilidad y validación de idea</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Estrategia de lanzamiento al mercado</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Proyecciones financieras y plan de financiación</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Estructura organizativa y roles clave</span>
                </li>
              </ul>
              
              <div className="mt-auto pt-4 border-t border-gray-700">
                <a 
                  href="/consulta" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00CCFF] hover:text-[#9933FF] transition-colors duration-300 flex items-center text-sm"
                >
                  <span>Solicitar información</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            custom={1}
            variants={featureItemVariants}
            initial="hidden"
            animate={hasIntersected ? "visible" : "hidden"}
            className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] h-full"
          >
            <div className="bg-[#121217] h-full rounded-xl p-6">
              <div className="mb-4 h-14 w-14 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Planes de Crecimiento</h3>
              
              <ul className="text-gray-300 space-y-3 mb-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Estrategias de expansión de mercado</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Optimización de procesos internos</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Diversificación de productos/servicios</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Escalabilidad y planificación de recursos</span>
                </li>
              </ul>
              
              <div className="mt-auto pt-4 border-t border-gray-700">
                <a 
                  href="/consulta" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00CCFF] hover:text-[#9933FF] transition-colors duration-300 flex items-center text-sm"
                >
                  <span>Solicitar información</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            custom={2}
            variants={featureItemVariants}
            initial="hidden"
            animate={hasIntersected ? "visible" : "hidden"}
            className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] h-full"
          >
            <div className="bg-[#121217] h-full rounded-xl p-6">
              <div className="mb-4 h-14 w-14 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Planes de Transformación</h3>
              
              <ul className="text-gray-300 space-y-3 mb-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Digitalización de procesos empresariales</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Adaptación a nuevos modelos de negocio</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Innovación y desarrollo de nuevas líneas</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gestión del cambio y capacitación</span>
                </li>
              </ul>
              
              <div className="mt-auto pt-4 border-t border-gray-700">
                <a 
                  href="/consulta" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00CCFF] hover:text-[#9933FF] transition-colors duration-300 flex items-center text-sm"
                >
                  <span>Solicitar información</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AnalisisCompetitivoSection({ setRef }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }
  
  return (
    <section 
      id="competitivo" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative bg-gradient-2"
    >
      <AnimatedShape type={2} className="top-[10%] right-[-100px]" delay={0.5} />
      
      <div className="container mx-auto px-4 py-16 z-10">
        <motion.div 
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-rajdhani font-bold text-3xl md:text-5xl mb-6">
            <span className="gradient-text gradient-border inline-block pb-2">Análisis Competitivo Avanzado</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Investigamos a fondo tu sector y competencia para identificar oportunidades estratégicas que te den una ventaja competitiva sostenible.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
                <div className="bg-[#121217] rounded-xl p-6">
                  <h3 className="font-rajdhani font-bold text-xl mb-3 text-white flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3">
                      1
                    </div>
                    Análisis DAFO Digital
                  </h3>
                  
                  <p className="text-gray-300">
                    Evaluación exhaustiva de las debilidades, amenazas, fortalezas y oportunidades de tu empresa en el entorno digital, para identificar áreas clave de mejora y ventajas competitivas.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
                <div className="bg-[#121217] rounded-xl p-6">
                  <h3 className="font-rajdhani font-bold text-xl mb-3 text-white flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3">
                      2
                    </div>
                    Benchmarking de Competidores
                  </h3>
                  
                  <p className="text-gray-300">
                    Estudio detallado de los competidores directos e indirectos, analizando sus estrategias, posicionamiento, precios, canales de distribución y propuestas de valor para identificar gaps y oportunidades.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
                <div className="bg-[#121217] rounded-xl p-6">
                  <h3 className="font-rajdhani font-bold text-xl mb-3 text-white flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3">
                      3
                    </div>
                    Análisis de Market Share
                  </h3>
                  
                  <p className="text-gray-300">
                    Evaluación de la cuota de mercado actual y potencial, identificando nichos de mercado desatendidos y oportunidades de crecimiento específicas para tu sector.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
                <div className="bg-[#121217] rounded-xl p-6">
                  <h3 className="font-rajdhani font-bold text-xl mb-3 text-white flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3">
                      4
                    </div>
                    Estudio de Tendencias
                  </h3>
                  
                  <p className="text-gray-300">
                    Investigación de las tendencias actuales y emergentes en tu industria, anticipando cambios en el comportamiento del consumidor, tecnologías disruptivas y oportunidades futuras.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
                <div className="bg-[#121217] rounded-xl p-6">
                  <h3 className="font-rajdhani font-bold text-xl mb-3 text-white flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3">
                      5
                    </div>
                    Análisis de Customer Journey
                  </h3>
                  
                  <p className="text-gray-300">
                    Mapeo detallado del recorrido del cliente, identificando puntos de contacto, pain points y oportunidades de mejora en la experiencia del usuario comparados con tus competidores.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
                <div className="bg-[#121217] rounded-xl p-6">
                  <h3 className="font-rajdhani font-bold text-xl mb-3 text-white flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3">
                      6
                    </div>
                    Recomendaciones Estratégicas
                  </h3>
                  
                  <p className="text-gray-300">
                    Elaboración de un plan de acción detallado con recomendaciones específicas basadas en el análisis competitivo, priorizadas según impacto y viabilidad.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CrecimientoEmpresarialSection({ setRef }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }
  
  return (
    <section 
      id="crecimiento" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative bg-gradient-1"
    >
      <AnimatedShape type={1} className="bottom-[20%] left-[-100px]" delay={0} />
      
      <div className="container mx-auto px-4 py-16 z-10">
        <motion.div 
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-rajdhani font-bold text-3xl md:text-5xl mb-6">
            <span className="gradient-text gradient-border inline-block pb-2">Crecimiento Empresarial Sostenible</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Desarrollamos estrategias personalizadas para impulsar tu crecimiento empresarial de forma sostenible y escalable en el tiempo.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] h-full"
          >
            <div className="bg-[#121217] rounded-xl p-6 h-full flex flex-col">
              <div className="mb-4 h-14 w-14 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Crecimiento Orgánico</h3>
              
              <div className="text-gray-300 flex-grow">
                <p className="mb-4">Estrategias enfocadas en aumentar ventas, expandir la base de clientes y mejorar la retención a través de canales orgánicos.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>SEO y marketing de contenidos</li>
                  <li>Fidelización de clientes</li>
                  <li>Expansión de productos/servicios</li>
                  <li>Optimización de embudos de conversión</li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] h-full"
          >
            <div className="bg-[#121217] rounded-xl p-6 h-full flex flex-col">
              <div className="mb-4 h-14 w-14 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Crecimiento Inorgánico</h3>
              
              <div className="text-gray-300 flex-grow">
                <p className="mb-4">Asesoría para crecer a través de fusiones, adquisiciones y alianzas estratégicas que amplíen tu capacidad y mercado.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Identificación de oportunidades</li>
                  <li>Due diligence digital</li>
                  <li>Alianzas estratégicas</li>
                  <li>Integración post-adquisición</li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] h-full"
          >
            <div className="bg-[#121217] rounded-xl p-6 h-full flex flex-col">
              <div className="mb-4 h-14 w-14 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Internacionalización</h3>
              
              <div className="text-gray-300 flex-grow">
                <p className="mb-4">Planificación y ejecución de estrategias para expandir tu negocio a nuevos mercados internacionales.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Estudio de mercados internacionales</li>
                  <li>Adaptación de producto/servicio</li>
                  <li>Estrategias de entrada a mercado</li>
                  <li>Localización y cumplimiento normativo</li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] h-full"
          >
            <div className="bg-[#121217] rounded-xl p-6 h-full flex flex-col">
              <div className="mb-4 h-14 w-14 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Innovación Empresarial</h3>
              
              <div className="text-gray-300 flex-grow">
                <p className="mb-4">Desarrollo de una cultura de innovación para mantener la competitividad y abrir nuevas vías de crecimiento.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Workshops de innovación</li>
                  <li>Diseño de nuevos modelos de negocio</li>
                  <li>Innovación en procesos internos</li>
                  <li>Transformación digital integral</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-16"
        >
          <a 
            href="/consulta" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium shadow-lg hover:shadow-[#00CCFF]/20 transition duration-300 transform hover:scale-105"
          >
            Solicita tu Consultoría de Crecimiento
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ContactoSection({ setRef }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }
  
  return (
    <section 
      id="contacto" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative bg-gradient-2"
    >
      <AnimatedShape type={2} className="top-[30%] right-[-100px]" delay={0.5} />
      
      <div className="container mx-auto px-4 py-16 z-10">
        <motion.div 
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-rajdhani font-bold text-3xl md:text-5xl mb-6">
            <span className="gradient-text gradient-border inline-block pb-2">¿Listo para transformar tu estrategia?</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Da el primer paso hacia el crecimiento sostenible de tu negocio. Nuestros expertos te guiarán en cada etapa del proceso.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] h-full">
              <div className="bg-[#121217] rounded-xl p-8 h-full">
                <h3 className="font-rajdhani font-bold text-2xl mb-6 text-white">Agenda tu Consulta Gratuita</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-medium mb-2">Lo que obtendrás:</h4>
                    <ul className="text-gray-300 space-y-3">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Evaluación inicial de tu situación actual</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Identificación de oportunidades clave</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Recomendaciones estratégicas personalizadas</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Plan de acción inicial para empezar</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="text-center pt-4">
                    <a 
                      href="/consulta" 
                      className="inline-block px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium shadow-lg hover:shadow-[#00CCFF]/20 transition duration-300 transform hover:scale-105"
                    >
                      Agendar Ahora
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col space-y-6"
          >
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00CCFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-lg mb-2">Correo Electrónico</h3>
                    <p className="text-gray-300">info@asesoriatuwebai.com</p>
                    <p className="text-gray-300">soporte@asesoriatuwebai.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00CCFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-lg mb-2">Teléfono</h3>
                    <p className="text-gray-300">+34 912 345 678</p>
                    <p className="text-gray-300">+34 600 123 456</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00CCFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-lg mb-2">Ubicación</h3>
                    <p className="text-gray-300">Calle Gran Vía 123, 28013</p>
                    <p className="text-gray-300">Madrid, España</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-auto">
              <a 
                href="/" 
                className="inline-flex items-center text-[#00CCFF] hover:text-[#9933FF] transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Volver al inicio</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}