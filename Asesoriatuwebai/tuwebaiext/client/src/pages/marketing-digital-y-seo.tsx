import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import NavDots from '@/components/ui/nav-dots';
import AnimatedShape from '@/components/ui/animated-shape';
import ScrollProgress from '@/components/ui/scroll-progress';
import WhatsAppButton from '@/components/ui/whatsapp-button';
import TypeWriterEffect from 'react-typewriter-effect';

export default function MarketingDigitalYSeo() {
  const sections = [
    { id: "hero", label: "Inicio" },
    { id: "posicionamiento", label: "SEO" },
    { id: "ppc", label: "PPC" },
    { id: "social", label: "Redes" },
    { id: "content", label: "Contenido" },
    { id: "testimonios", label: "Testimonios" },
    { id: "contacto", label: "Contacto" }
  ];

  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({
    hero: null,
    posicionamiento: null,
    ppc: null,
    social: null,
    content: null,
    testimonios: null,
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
        <PosicionamientoSection setRef={(ref: HTMLElement | null) => setSectionRef('posicionamiento', ref)} />
        <PPCSection setRef={(ref: HTMLElement | null) => setSectionRef('ppc', ref)} />
        <SocialMediaSection setRef={(ref: HTMLElement | null) => setSectionRef('social', ref)} />
        <ContentMarketingSection setRef={(ref: HTMLElement | null) => setSectionRef('content', ref)} />
        <TestimoniosSection setRef={(ref: HTMLElement | null) => setSectionRef('testimonios', ref)} />
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
            <span className="gradient-text gradient-border inline-block pb-2">Marketing Digital y SEO</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Estrategias de posicionamiento orgánico y campañas de marketing digital que maximizan tu visibilidad online y generan resultados medibles.
          </p>
          
          <motion.div
            className="flex justify-center gap-6 flex-wrap"
            initial={{ opacity: 0 }}
            animate={hasIntersected ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.a 
              href="#posicionamiento" 
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
              Solicitar Auditoría Gratuita
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PosicionamientoSection({ setRef }: SectionProps) {
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
      id="posicionamiento" 
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
            <span className="gradient-text gradient-border inline-block pb-2">Posicionamiento SEO Orgánico</span>
          </h2>
          
          {isReady ? (
            <div className="min-h-[80px]">
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
                text="Implementamos estrategias SEO avanzadas para mejorar tu visibilidad orgánica en los motores de búsqueda, generando tráfico de calidad y aumentando tus conversiones."
                typeSpeed={30}
              />
            </div>
          ) : (
            <p className="text-xl text-gray-300 min-h-[80px]">
              Cargando...
            </p>
          )}
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-6">
                <h3 className="font-rajdhani font-bold text-xl mb-3 text-white flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3">
                    1
                  </div>
                  Auditoría SEO Completa
                </h3>
                
                <p className="text-gray-300">
                  Análisis detallado de tu sitio web para identificar fortalezas, debilidades y oportunidades de mejora en términos de SEO, con recomendaciones accionables.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-6">
                <h3 className="font-rajdhani font-bold text-xl mb-3 text-white flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3">
                    2
                  </div>
                  Optimización On-Page
                </h3>
                
                <p className="text-gray-300">
                  Optimización de elementos clave dentro de tu sitio: estructura, meta tags, contenido, velocidad de carga, experiencia móvil y arquitectura de información.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-6">
                <h3 className="font-rajdhani font-bold text-xl mb-3 text-white flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3">
                    3
                  </div>
                  Investigación de Palabras Clave
                </h3>
                
                <p className="text-gray-300">
                  Análisis exhaustivo para identificar las palabras clave más relevantes y rentables para tu negocio, incluyendo intención de búsqueda y volumen.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-6">
                <h3 className="font-rajdhani font-bold text-xl mb-3 text-white flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3">
                    4
                  </div>
                  Link Building Estratégico
                </h3>
                
                <p className="text-gray-300">
                  Desarrollo de estrategias para obtener backlinks de calidad, relevantes y naturales que mejoren la autoridad de dominio y el posicionamiento.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-6">
                <h3 className="font-rajdhani font-bold text-xl mb-3 text-white flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3">
                    5
                  </div>
                  SEO Técnico
                </h3>
                
                <p className="text-gray-300">
                  Optimización técnica del sitio web: esquemas, XML sitemaps, robots.txt, redirecciones, solución de errores de rastreo y problemas de indexación.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-6">
                <h3 className="font-rajdhani font-bold text-xl mb-3 text-white flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-3">
                    6
                  </div>
                  Seguimiento y Análisis
                </h3>
                
                <p className="text-gray-300">
                  Monitoreo continuo del rendimiento SEO, análisis de métricas clave, informes periódicos y ajustes estratégicos basados en resultados.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] max-w-4xl mx-auto"
        >
          <div className="bg-[#121217] rounded-xl p-8">
            <h3 className="font-rajdhani font-bold text-2xl mb-4 text-white text-center">Beneficios del SEO</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-300">Tráfico orgánico sostenible a largo plazo</p>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-300">Mayor credibilidad y autoridad en tu sector</p>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-300">Mejor ROI comparado con publicidad de pago</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-300">Atracción de usuarios con alta intención de compra</p>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-300">Mejor experiencia de usuario en tu sitio web</p>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-300">Ventaja competitiva en el mercado digital</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PPCSection({ setRef }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }
  
  return (
    <section 
      id="ppc" 
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
            <span className="gradient-text gradient-border inline-block pb-2">Campañas de Pago por Clic (PPC)</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Diseñamos y gestionamos campañas publicitarias altamente efectivas en plataformas como Google Ads, Facebook Ads y LinkedIn Ads para generar resultados inmediatos.
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Google Ads</h3>
              
              <div className="text-gray-300 flex-grow">
                <p className="mb-4">Campañas optimizadas en la red de búsqueda, display, shopping y YouTube para captar usuarios con intención de compra.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Investigación avanzada de palabras clave</li>
                  <li>Optimización de calidad y relevancia</li>
                  <li>Estrategias de puja inteligentes</li>
                  <li>Remarketing estratégico</li>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Facebook & Instagram Ads</h3>
              
              <div className="text-gray-300 flex-grow">
                <p className="mb-4">Campañas de alto impacto visual en las redes sociales más grandes del mundo, con segmentación avanzada.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Segmentación por intereses y comportamientos</li>
                  <li>Públicos personalizados y similares</li>
                  <li>Anuncios para cada fase del embudo</li>
                  <li>Automatización y optimización de presupuesto</li>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">LinkedIn Ads</h3>
              
              <div className="text-gray-300 flex-grow">
                <p className="mb-4">Campañas B2B dirigidas a profesionales y empresas específicas, ideales para generación de leads cualificados.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Segmentación por cargo, empresa y sector</li>
                  <li>Formatos orientados a conversión</li>
                  <li>Campañas de generación de leads</li>
                  <li>Medición de ROI en ciclos largos de venta</li>
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
          className="mt-16 text-center"
        >
          <h3 className="font-rajdhani font-bold text-2xl mb-8 text-white">Nuestro Proceso de Gestión de Campañas</h3>
          
          <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-0">
            <div className="relative flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-lg z-10">
                1
              </div>
              <div className="hidden md:block h-[2px] w-24 bg-gradient-to-r from-[#9933FF] to-transparent absolute right-0 translate-x-1/2"></div>
            </div>
            
            <div className="relative flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-lg z-10">
                2
              </div>
              <div className="hidden md:block h-[2px] w-24 bg-gradient-to-r from-transparent via-[#00CCFF] to-transparent absolute left-0 -translate-x-1/2"></div>
              <div className="hidden md:block h-[2px] w-24 bg-gradient-to-r from-[#9933FF] to-transparent absolute right-0 translate-x-1/2"></div>
            </div>
            
            <div className="relative flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-lg z-10">
                3
              </div>
              <div className="hidden md:block h-[2px] w-24 bg-gradient-to-r from-transparent via-[#00CCFF] to-transparent absolute left-0 -translate-x-1/2"></div>
              <div className="hidden md:block h-[2px] w-24 bg-gradient-to-r from-[#9933FF] to-transparent absolute right-0 translate-x-1/2"></div>
            </div>
            
            <div className="relative flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-lg z-10">
                4
              </div>
              <div className="hidden md:block h-[2px] w-24 bg-gradient-to-r from-transparent to-[#00CCFF] absolute left-0 -translate-x-1/2"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
            <div className="text-center">
              <h4 className="text-white font-medium mb-2">Investigación y Estrategia</h4>
              <p className="text-gray-300">Análisis completo del mercado, competencia y audiencia objetivo.</p>
            </div>
            
            <div className="text-center">
              <h4 className="text-white font-medium mb-2">Configuración y Lanzamiento</h4>
              <p className="text-gray-300">Creación y configuración detallada de campañas, grupos de anuncios y creatividades.</p>
            </div>
            
            <div className="text-center">
              <h4 className="text-white font-medium mb-2">Optimización Continua</h4>
              <p className="text-gray-300">Monitoreo diario y ajustes basados en datos para maximizar el rendimiento.</p>
            </div>
            
            <div className="text-center">
              <h4 className="text-white font-medium mb-2">Análisis y Reportes</h4>
              <p className="text-gray-300">Informes detallados con métricas clave y recomendaciones estratégicas.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialMediaSection({ setRef }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }
  
  return (
    <section 
      id="social" 
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
            <span className="gradient-text gradient-border inline-block pb-2">Estrategia en Redes Sociales</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Desarrollamos e implementamos estrategias en redes sociales que generan engagement, construyen comunidad y aumentan la visibilidad de tu marca.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]"
          >
            <div className="bg-[#121217] rounded-xl p-8">
              <h3 className="font-rajdhani font-bold text-2xl mb-6 text-white">Servicios de Gestión de Redes Sociales</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="text-white font-medium mb-1">Estrategia de Contenido</h4>
                    <p className="text-gray-300">Planificación estratégica del calendario editorial y tipos de contenido para cada plataforma.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="text-white font-medium mb-1">Diseño y Creación de Contenido</h4>
                    <p className="text-gray-300">Desarrollo de contenido visual y textual atractivo y alineado con tu marca y objetivos.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="text-white font-medium mb-1">Gestión y Publicación</h4>
                    <p className="text-gray-300">Administración completa de tus perfiles, programación de publicaciones y optimización de horarios.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="text-white font-medium mb-1">Community Management</h4>
                    <p className="text-gray-300">Interacción con tu audiencia, respuesta a comentarios y mensajes, y construcción de comunidad.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="text-white font-medium mb-1">Análisis y Reportes</h4>
                    <p className="text-gray-300">Monitoreo de métricas clave, análisis de rendimiento e informes periódicos con recomendaciones.</p>
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
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
                <div className="bg-[#121217] rounded-xl p-6 text-center">
                  <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </div>
                  <h4 className="text-white font-medium mb-2">Facebook</h4>
                  <p className="text-gray-300 text-sm">Estrategias para construir comunidad y generar engagement.</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
                <div className="bg-[#121217] rounded-xl p-6 text-center">
                  <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-white font-medium mb-2">Instagram</h4>
                  <p className="text-gray-300 text-sm">Contenido visual impactante para aumentar seguidores.</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
                <div className="bg-[#121217] rounded-xl p-6 text-center">
                  <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-white font-medium mb-2">LinkedIn</h4>
                  <p className="text-gray-300 text-sm">Posicionamiento profesional y generación de leads B2B.</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
                <div className="bg-[#121217] rounded-xl p-6 text-center">
                  <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <h4 className="text-white font-medium mb-2">TikTok</h4>
                  <p className="text-gray-300 text-sm">Tendencias virales para conectar con audiencias jóvenes.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-6">
                <h4 className="text-white font-medium mb-3">Beneficios de nuestra gestión de redes sociales:</h4>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Aumento significativo en engagement y seguidores</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Contenido profesional y consistente con tu marca</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Mejora de la reputación online y fidelización</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Mayor tráfico a tu sitio web y más conversiones</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContentMarketingSection({ setRef }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }
  
  return (
    <section 
      id="content" 
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
            <span className="gradient-text gradient-border inline-block pb-2">Marketing de Contenidos</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Creamos y distribuimos contenido de valor que atrae, convierte y fideliza a tu audiencia, estableciéndote como referente en tu sector.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-8">
                <h3 className="font-rajdhani font-bold text-2xl mb-6 text-white">Nuestro Enfoque de Content Marketing</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-4 mt-1">
                      1
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Estrategia de Contenidos</h4>
                      <p className="text-gray-300">Desarrollamos un plan estratégico alineado con tus objetivos de negocio y las necesidades de tu audiencia.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-4 mt-1">
                      2
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Creación de Contenido</h4>
                      <p className="text-gray-300">Producimos contenido de alta calidad y optimizado para SEO: artículos, guías, infografías, vídeos y podcasts.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-4 mt-1">
                      3
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Distribución y Promoción</h4>
                      <p className="text-gray-300">Amplificamos el alcance de tu contenido a través de múltiples canales: redes sociales, email marketing y plataformas especializadas.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-sm mr-4 mt-1">
                      4
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Análisis y Optimización</h4>
                      <p className="text-gray-300">Medimos el rendimiento de cada contenido y realizamos mejoras continuas basadas en datos para maximizar resultados.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-6">
                <h3 className="font-rajdhani font-bold text-xl mb-4 text-white">Tipos de Contenido</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-gray-300">Artículos de blog</span>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-300">Guías y whitepapers</span>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                    <span className="text-gray-300">Vídeos y webinars</span>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="text-gray-300">Infografías</span>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    <span className="text-gray-300">Podcasts</span>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-300">Estudios de caso</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-6">
                <h3 className="font-rajdhani font-bold text-xl mb-4 text-white">Beneficios del Content Marketing</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Establece tu autoridad y expertise en el sector</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Genera tráfico orgánico de calidad y sostenible</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Mejora la nutrición de leads y acorta el ciclo de ventas</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Crea activos digitales valiosos para tu marca</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Complementa y potencia tus estrategias SEO y social media</p>
                  </div>
                </div>
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
            Solicitar Estrategia de Contenidos
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function TestimoniosSection({ setRef }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }
  
  const testimonios = [
    {
      nombre: "Alejandro Mendoza",
      empresa: "Grupo Comercial Impacto",
      cargo: "Director de Marketing",
      testimonio: "Las estrategias SEO implementadas por Asesoría Tu Web AI transformaron nuestra presencia online. En solo 6 meses, aumentamos el tráfico orgánico en un 213% y las conversiones crecieron un 87%. El retorno sobre la inversión superó todas nuestras expectativas.",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      delay: 0.1
    },
    {
      nombre: "Sofía Ramírez",
      empresa: "Innova Health",
      cargo: "CEO",
      testimonio: "Probamos varias agencias de marketing digital antes, pero ninguna como Asesoría Tu Web AI. Su enfoque orientado a datos y métricas reales ha sido clave para optimizar nuestras campañas PPC. Redujeron nuestro coste por adquisición en un 42% mientras aumentaron el volumen de leads cualificados.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      delay: 0.2
    },
    {
      nombre: "Javier Herrera",
      empresa: "MueblesDeco Online",
      cargo: "Director de E-commerce",
      testimonio: "La estrategia integral de marketing digital que diseñaron para nuestro e-commerce revolucionó nuestro negocio. La combinación de SEO técnico, campañas de Google Ads optimizadas y marketing de contenidos relevantes incrementó nuestras ventas online en un 156% en el primer año de colaboración.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      delay: 0.3
    }
  ];
  
  return (
    <section 
      id="testimonios" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative bg-gradient-1"
    >
      <AnimatedShape type={1} className="top-[20%] left-[-100px]" delay={0} />
      
      <div className="container mx-auto px-4 py-16 z-10">
        <motion.div 
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-rajdhani font-bold text-3xl md:text-5xl mb-6">
            <span className="gradient-text gradient-border inline-block pb-2">Casos de Éxito en Marketing Digital</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre cómo nuestras estrategias de posicionamiento y marketing digital han transformado negocios como el tuyo, generando resultados excepcionales y medibles.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonios.map((testimonio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: testimonio.delay }}
              className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] h-full"
            >
              <div className="bg-[#121217] rounded-xl p-8 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-4 border-2 border-[#00CCFF]">
                    <img src={testimonio.avatar} alt={testimonio.nombre} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{testimonio.nombre}</h4>
                    <p className="text-sm text-gray-300">{testimonio.cargo}, {testimonio.empresa}</p>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <svg className="h-8 w-8 text-[#00CCFF]/40 mb-2" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-300">{testimonio.testimonio}</p>
                </div>
                
                <div className="flex justify-center mt-6">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] max-w-4xl mx-auto"
        >
          <div className="bg-[#121217] rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:max-w-xl mb-8 md:mb-0">
                <h3 className="font-rajdhani font-bold text-2xl mb-4 text-white">¿Listo para transformar tu presencia digital?</h3>
                <p className="text-gray-300">Únete a nuestros clientes satisfechos y lleva tu negocio al siguiente nivel con estrategias de marketing personalizadas.</p>
              </div>
              
              <div>
                <a 
                  href="/consulta" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium shadow-lg hover:shadow-[#00CCFF]/20 transition duration-300 transform hover:scale-105"
                >
                  Solicitar Auditoría Gratuita
                </a>
              </div>
            </div>
          </div>
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
            <span className="gradient-text gradient-border inline-block pb-2">¿Listo para mejorar tu presencia digital?</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Potencia tu visibilidad online y genera más conversiones con nuestras estrategias de marketing digital personalizadas.
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
                <h3 className="font-rajdhani font-bold text-2xl mb-6 text-white">Auditoría Digital Gratuita</h3>
                
                <p className="text-gray-300 mb-6">
                  Realiza nuestra auditoría digital gratuita y descubre oportunidades de mejora para tu estrategia online. Analizaremos:
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Estado actual de tu SEO on-page y off-page</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Rendimiento de tu presencia en redes sociales</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Evaluación de competidores directos</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Recomendaciones personalizadas de mejora</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <a 
                    href="/consulta" 
                    className="inline-block px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium shadow-lg hover:shadow-[#00CCFF]/20 transition duration-300 transform hover:scale-105"
                  >
                    Solicitar Auditoría Gratuita
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
                    <p className="text-gray-300">marketing@asesoriatuwebai.com</p>
                    <p className="text-gray-300">seo@asesoriatuwebai.com</p>
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
                    href="/development"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white hover:bg-[#00CCFF]/30 transition-colors"
                  >
                    Desarrollo Web
                  </a>
                  
                  <a 
                    href="/conversion-cro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white hover:bg-[#00CCFF]/30 transition-colors"
                  >
                    Optimización CRO
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