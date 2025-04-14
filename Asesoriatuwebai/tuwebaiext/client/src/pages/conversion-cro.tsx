import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import NavDots from '@/components/ui/nav-dots';
import AnimatedShape from '@/components/ui/animated-shape';
import ScrollProgress from '@/components/ui/scroll-progress';
import WhatsAppButton from '@/components/ui/whatsapp-button';
import TypeWriterEffect from 'react-typewriter-effect';

export default function ConversionCRO() {
  const sections = [
    { id: "hero", label: "Inicio" },
    { id: "cro", label: "CRO" },
    { id: "uxui", label: "UX/UI" },
    { id: "embudos", label: "Embudos" },
    { id: "analytics", label: "Analítica" },
    { id: "contacto", label: "Contacto" }
  ];

  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({
    hero: null,
    cro: null,
    uxui: null,
    embudos: null,
    analytics: null,
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
        <CROSection setRef={(ref: HTMLElement | null) => setSectionRef('cro', ref)} />
        <UXUISection setRef={(ref: HTMLElement | null) => setSectionRef('uxui', ref)} />
        <EmbudosSection setRef={(ref: HTMLElement | null) => setSectionRef('embudos', ref)} />
        <AnalyticsSection setRef={(ref: HTMLElement | null) => setSectionRef('analytics', ref)} />
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
            <span className="gradient-text gradient-border inline-block pb-2">Optimización de Conversión (CRO)</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Maximiza el potencial de conversión de tu sitio web mediante estrategias basadas en datos, diseño UX/UI optimizado y pruebas A/B continuas.
          </p>
          
          <motion.div
            className="flex justify-center gap-6 flex-wrap"
            initial={{ opacity: 0 }}
            animate={hasIntersected ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.a 
              href="#cro" 
              className="px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium shadow-lg hover:shadow-[#00CCFF]/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Descubrir Servicios
            </motion.a>
            
            <motion.a 
              href="/consulta" 
              className="px-8 py-4 bg-transparent border border-[#00CCFF] rounded-full text-white font-medium hover:bg-[#00CCFF]/10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Auditoría CRO Gratuita
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CROSection({ setRef }: SectionProps) {
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
      id="cro" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative bg-gradient-2"
    >
      <AnimatedShape type={2} className="top-[30%] right-[-100px]" delay={0.5} />
      
      <div className="container mx-auto px-4 py-16 z-10">
        <motion.div 
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-rajdhani font-bold text-3xl md:text-5xl mb-6">
            <span className="gradient-text gradient-border inline-block pb-2">¿Qué es la Optimización de Conversión?</span>
          </h2>
          
          {isReady ? (
            <div className="min-h-[100px]">
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
                text="CRO (Conversion Rate Optimization) es un proceso sistemático para aumentar el porcentaje de visitantes que realizan una acción deseada en tu sitio web, como completar una compra, suscribirse a un boletín o solicitar información, utilizando análisis de datos, UX/UI y pruebas A/B."
                typeSpeed={30}
              />
            </div>
          ) : (
            <p className="text-xl text-gray-300 min-h-[100px]">
              Cargando...
            </p>
          )}
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-8">
                <h3 className="font-rajdhani font-bold text-2xl mb-6 text-white">Beneficios del CRO</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Mayor ROI de Marketing</h4>
                      <p className="text-gray-300">Aumenta el retorno de tus inversiones en marketing al convertir más visitantes en clientes sin necesidad de incrementar el tráfico.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Reducción de Costos de Adquisición</h4>
                      <p className="text-gray-300">Disminuye el costo de adquisición de clientes al aprovechar mejor el tráfico existente y aumentar la eficiencia de tus embudos.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Crecimiento Escalable</h4>
                      <p className="text-gray-300">Incluso pequeñas mejoras en la tasa de conversión pueden generar aumentos significativos en los ingresos y el crecimiento del negocio.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Decisiones Basadas en Datos</h4>
                      <p className="text-gray-300">Sustituye las suposiciones por decisiones fundamentadas en datos reales del comportamiento de tus usuarios.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-8">
                <h3 className="font-rajdhani font-bold text-2xl mb-6 text-white">Nuestra Metodología CRO</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3 mt-1">
                      1
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Análisis y Diagnóstico</h4>
                      <p className="text-gray-300">Evaluación exhaustiva de tu sitio web: análisis de métricas, mapas de calor, grabaciones de sesiones y revisión heurística.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3 mt-1">
                      2
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Identificación de Oportunidades</h4>
                      <p className="text-gray-300">Detección de cuellos de botella, puntos de fricción y oportunidades de mejora en embudos de conversión.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3 mt-1">
                      3
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Formulación de Hipótesis</h4>
                      <p className="text-gray-300">Desarrollo de hipótesis claras y medibles basadas en los hallazgos del análisis y las mejores prácticas de CRO.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3 mt-1">
                      4
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Implementación y Pruebas</h4>
                      <p className="text-gray-300">Diseño e implementación de pruebas A/B y multivariante para validar hipótesis de forma científica.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3 mt-1">
                      5
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Análisis y Optimización Continua</h4>
                      <p className="text-gray-300">Evaluación de resultados, implementación de mejoras y repetición del proceso para optimización continua.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="font-rajdhani font-bold text-2xl mb-8 text-white">Mejora Gradual vs. Resultados Inmediatos</h3>
          
          <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] max-w-4xl mx-auto">
            <div className="bg-[#121217] rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[#00CCFF] font-medium mb-3">El Enfoque Tradicional</h4>
                  <p className="text-gray-300 mb-3">Invertir más en tráfico sin optimizar la conversión</p>
                  <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-500 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <p className="text-gray-400 mt-2 text-sm">Rendimiento medio: +30% de conversiones</p>
                </div>
                
                <div>
                  <h4 className="text-[#9933FF] font-medium mb-3">Nuestro Enfoque CRO</h4>
                  <p className="text-gray-300 mb-3">Optimizar la conversión antes de aumentar el tráfico</p>
                  <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <p className="text-gray-400 mt-2 text-sm">Rendimiento superior: +80% de conversiones</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function UXUISection({ setRef }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }
  
  return (
    <section 
      id="uxui" 
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
            <span className="gradient-text gradient-border inline-block pb-2">Diseño UX/UI para Conversión</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Creamos experiencias de usuario centradas en la conversión que guían a tus visitantes suavemente hacia la acción deseada.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] h-full"
          >
            <div className="bg-[#121217] rounded-xl p-6 h-full flex flex-col">
              <div className="mb-4 h-14 w-14 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Experiencia de Usuario (UX)</h3>
              
              <div className="text-gray-300 flex-grow">
                <p className="mb-4">Diseñamos experiencias intuitivas y enfocadas en la conversión que eliminan la fricción y facilitan el recorrido del usuario.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Arquitectura de información optimizada</li>
                  <li>Mapeo de recorridos del usuario</li>
                  <li>Investigación de usuarios</li>
                  <li>Simplificación de procesos</li>
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <a 
                  href="/consulta" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00CCFF] hover:text-[#9933FF] transition-colors duration-300 flex items-center text-sm"
                >
                  <span>Más información</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Interfaz de Usuario (UI)</h3>
              
              <div className="text-gray-300 flex-grow">
                <p className="mb-4">Creamos interfaces visualmente atractivas y funcionales que guían la atención del usuario hacia los elementos clave de conversión.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Diseño visual persuasivo</li>
                  <li>Jerarquía visual estratégica</li>
                  <li>Micro-interacciones efectivas</li>
                  <li>CTAs optimizados</li>
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <a 
                  href="/consulta" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00CCFF] hover:text-[#9933FF] transition-colors duration-300 flex items-center text-sm"
                >
                  <span>Más información</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Responsive y Accesibilidad</h3>
              
              <div className="text-gray-300 flex-grow">
                <p className="mb-4">Garantizamos experiencias optimizadas en todos los dispositivos y para todos los usuarios, maximizando el potencial de conversión.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Diseño mobile-first</li>
                  <li>Optimización cross-device</li>
                  <li>Accesibilidad WCAG</li>
                  <li>Rendimiento optimizado</li>
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <a 
                  href="/consulta" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00CCFF] hover:text-[#9933FF] transition-colors duration-300 flex items-center text-sm"
                >
                  <span>Más información</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] max-w-4xl mx-auto"
        >
          <div className="bg-[#121217] rounded-xl p-8">
            <h3 className="font-rajdhani font-bold text-2xl mb-4 text-white text-center">Principios de Diseño Orientado a Conversión</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300"><span className="text-white font-medium">Claridad:</span> Comunicación clara del valor y próximos pasos</p>
                  </li>
                  
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300"><span className="text-white font-medium">Simplicidad:</span> Eliminación de distracciones y complejidad innecesaria</p>
                  </li>
                  
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300"><span className="text-white font-medium">Enfoque:</span> Dirección de la atención hacia los elementos de conversión</p>
                  </li>
                </ul>
              </div>
              
              <div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300"><span className="text-white font-medium">Confianza:</span> Elementos que generan credibilidad y seguridad</p>
                  </li>
                  
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300"><span className="text-white font-medium">Urgencia:</span> Motivadores que impulsan la acción inmediata</p>
                  </li>
                  
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300"><span className="text-white font-medium">Consistencia:</span> Experiencia coherente en todos los puntos de contacto</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EmbudosSection({ setRef }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }
  
  return (
    <section 
      id="embudos" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative bg-gradient-2"
    >
      <AnimatedShape type={2} className="top-[10%] right-[-100px]" delay={0.5} />
      
      <div className="container mx-auto px-4 py-16 z-10">
        <motion.div 
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-rajdhani font-bold text-3xl md:text-5xl mb-6">
            <span className="gradient-text gradient-border inline-block pb-2">Optimización de Embudos de Conversión</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Analizamos y optimizamos cada etapa del recorrido de compra para minimizar el abandono y maximizar las conversiones.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] mb-6"
            >
              <div className="bg-[#121217] rounded-xl p-6 text-center">
                <h3 className="font-rajdhani font-bold text-xl mb-2 text-white">Conciencia</h3>
                <p className="text-gray-300">El usuario descubre tu marca o producto</p>
                
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                    Landing pages optimizadas
                  </span>
                  <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                    Contenido de valor
                  </span>
                  <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                    Mensajes claros y atractivos
                  </span>
                </div>
              </div>
            </motion.div>
            
            <div className="h-10 w-1 bg-gradient-to-b from-[#00CCFF] to-[#9933FF] mx-auto"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] mb-6"
            >
              <div className="bg-[#121217] rounded-xl p-6 text-center">
                <h3 className="font-rajdhani font-bold text-xl mb-2 text-white">Interés</h3>
                <p className="text-gray-300">El usuario evalúa si tu solución responde a sus necesidades</p>
                
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                    Propuesta de valor clara
                  </span>
                  <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                    Contenido educativo
                  </span>
                  <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                    Testimonios y casos de éxito
                  </span>
                </div>
              </div>
            </motion.div>
            
            <div className="h-10 w-1 bg-gradient-to-b from-[#00CCFF] to-[#9933FF] mx-auto"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] mb-6"
            >
              <div className="bg-[#121217] rounded-xl p-6 text-center">
                <h3 className="font-rajdhani font-bold text-xl mb-2 text-white">Deseo</h3>
                <p className="text-gray-300">El usuario quiere tu producto o servicio</p>
                
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                    Demostraciones detalladas
                  </span>
                  <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                    Comparativas favorables
                  </span>
                  <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                    Storytelling persuasivo
                  </span>
                </div>
              </div>
            </motion.div>
            
            <div className="h-10 w-1 bg-gradient-to-b from-[#00CCFF] to-[#9933FF] mx-auto"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]"
            >
              <div className="bg-[#121217] rounded-xl p-6 text-center">
                <h3 className="font-rajdhani font-bold text-xl mb-2 text-white">Acción</h3>
                <p className="text-gray-300">El usuario realiza la compra o conversión</p>
                
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                    Proceso de compra optimizado
                  </span>
                  <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                    Eliminación de fricciones
                  </span>
                  <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                    CTA persuasivos
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]"
          >
            <div className="bg-[#121217] rounded-xl p-8">
              <h3 className="font-rajdhani font-bold text-2xl mb-6 text-white">Cómo Optimizamos Tus Embudos</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Mapeo y Análisis</h4>
                    <p className="text-gray-300">Identificamos cada etapa del embudo y analizamos métricas clave como tasa de abandono, tiempo en página y tasa de conversión por etapa.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Identificación de Puntos de Fricción</h4>
                    <p className="text-gray-300">Detectamos dónde y por qué los usuarios abandonan el proceso mediante grabaciones de sesión, mapas de calor y análisis de formularios.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Implementación de Mejoras</h4>
                    <p className="text-gray-300">Aplicamos soluciones específicas para cada etapa del embudo, desde contenido persuasivo hasta simplificación de procesos y elementos de confianza.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Pruebas A/B y Análisis Continuo</h4>
                    <p className="text-gray-300">Validamos cada cambio mediante pruebas A/B y monitorizamos continuamente el rendimiento para realizar mejoras incrementales.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AnalyticsSection({ setRef }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }
  
  return (
    <section 
      id="analytics" 
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
            <span className="gradient-text gradient-border inline-block pb-2">Analítica y Testing A/B</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Utilizamos datos y pruebas sistemáticas para tomar decisiones informadas que mejoran continuamente tus resultados.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-8">
                <h3 className="font-rajdhani font-bold text-2xl mb-6 text-white">Herramientas de Análisis</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Análisis de Datos Cuantitativos</h4>
                      <p className="text-gray-300">Implementamos y configuramos herramientas avanzadas de análisis para obtener datos precisos sobre el comportamiento de los usuarios.</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-[#00CCFF]/10 rounded text-xs text-gray-300">
                          Google Analytics 4
                        </span>
                        <span className="px-2 py-1 bg-[#00CCFF]/10 rounded text-xs text-gray-300">
                          Mixpanel
                        </span>
                        <span className="px-2 py-1 bg-[#00CCFF]/10 rounded text-xs text-gray-300">
                          Adobe Analytics
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Visualización del Comportamiento</h4>
                      <p className="text-gray-300">Utilizamos herramientas especializadas para ver exactamente cómo interactúan los usuarios con tu sitio web y dónde encuentran problemas.</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-[#00CCFF]/10 rounded text-xs text-gray-300">
                          Hotjar
                        </span>
                        <span className="px-2 py-1 bg-[#00CCFF]/10 rounded text-xs text-gray-300">
                          Crazy Egg
                        </span>
                        <span className="px-2 py-1 bg-[#00CCFF]/10 rounded text-xs text-gray-300">
                          Microsoft Clarity
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Investigación Cualitativa</h4>
                      <p className="text-gray-300">Complementamos los datos numéricos con información cualitativa para entender mejor las motivaciones y necesidades de los usuarios.</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-[#00CCFF]/10 rounded text-xs text-gray-300">
                          Encuestas y entrevistas
                        </span>
                        <span className="px-2 py-1 bg-[#00CCFF]/10 rounded text-xs text-gray-300">
                          Test de usabilidad
                        </span>
                        <span className="px-2 py-1 bg-[#00CCFF]/10 rounded text-xs text-gray-300">
                          Análisis de feedback
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-8">
                <h3 className="font-rajdhani font-bold text-2xl mb-6 text-white">Testing A/B y Experimentación</h3>
                
                <p className="text-gray-300 mb-6">
                  Validamos cada hipótesis mediante pruebas científicas que nos permiten tomar decisiones basadas en datos reales, no en opiniones o suposiciones.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <h4 className="text-white font-medium mb-2">Pruebas A/B y Multivariante</h4>
                      <p className="text-gray-300">Realizamos pruebas controladas de diferentes versiones para identificar qué variantes generan mejores resultados.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <h4 className="text-white font-medium mb-2">Test de Usabilidad</h4>
                      <p className="text-gray-300">Evaluamos la facilidad de uso de tu interfaz y la efectividad de tus flujos mediante pruebas con usuarios reales.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <h4 className="text-white font-medium mb-2">Optimización de Elementos Clave</h4>
                      <p className="text-gray-300">Probamos sistemáticamente variaciones de elementos críticos como CTA, formularios, títulos y elementos de confianza.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <h4 className="text-white font-medium mb-2">Implementación de Ganadores</h4>
                      <p className="text-gray-300">Implementamos las versiones ganadoras y continuamos el ciclo de mejora con nuevas hipótesis y pruebas.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <h4 className="text-white font-medium mb-3">Herramientas que utilizamos:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                      Google Optimize
                    </span>
                    <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                      Optimizely
                    </span>
                    <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                      VWO
                    </span>
                    <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                      Convert.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-6 text-right"
            >
              <a 
                href="/consulta" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium shadow-lg hover:shadow-[#00CCFF]/20 transition duration-300 transform hover:scale-105"
              >
                Solicitar Auditoría CRO
              </a>
            </motion.div>
          </motion.div>
        </div>
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
            <span className="gradient-text gradient-border inline-block pb-2">Impulsa Tus Conversiones</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transforma tu sitio web en una máquina de conversión con nuestra experiencia en CRO. Comienza hoy mismo y ve resultados medibles.
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
                <h3 className="font-rajdhani font-bold text-2xl mb-6 text-white">¿Qué Podemos Hacer por Ti?</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Aumentar tu tasa de conversión significativamente</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Reducir el costo de adquisición de clientes</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Mejorar la experiencia de usuario y satisfacción</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Maximizar el ROI de tus esfuerzos de marketing</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Obtener insights valiosos sobre tus usuarios</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <a 
                    href="/consulta" 
                    className="inline-block px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium shadow-lg hover:shadow-[#00CCFF]/20 transition duration-300 transform hover:scale-105"
                  >
                    Solicitar Consulta
                  </a>
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
                    <p className="text-gray-300">cro@asesoriatuwebai.com</p>
                    <p className="text-gray-300">conversion@asesoriatuwebai.com</p>
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
                <h3 className="font-medium text-white text-lg mb-3">Servicios Relacionados</h3>
                
                <div className="flex flex-wrap gap-2">
                  <a 
                    href="/desarrollo-web-profesional"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white hover:bg-[#00CCFF]/30 transition-colors"
                  >
                    Desarrollo Web
                  </a>
                  
                  <a 
                    href="/marketing-digital-y-seo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white hover:bg-[#00CCFF]/30 transition-colors"
                  >
                    Marketing Digital
                  </a>
                  
                  <a 
                    href="/automatizacion-marketing" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white hover:bg-[#00CCFF]/30 transition-colors"
                  >
                    Automatización
                  </a>
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