import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import NavDots from '@/components/ui/nav-dots';
import AnimatedShape from '@/components/ui/animated-shape';
import ScrollProgress from '@/components/ui/scroll-progress';
import WhatsAppButton from '@/components/ui/whatsapp-button';
import TypeWriterEffect from 'react-typewriter-effect';

export default function AutomatizacionMarketing() {
  const sections = [
    { id: "hero", label: "Inicio" },
    { id: "herramientas", label: "Herramientas" },
    { id: "email", label: "Email" },
    { id: "crm", label: "CRM" },
    { id: "funnels", label: "Funnels" },
    { id: "contacto", label: "Contacto" }
  ];

  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({
    hero: null,
    herramientas: null,
    email: null,
    crm: null,
    funnels: null,
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
        <HerramientasSection setRef={(ref: HTMLElement | null) => setSectionRef('herramientas', ref)} />
        <EmailMarketingSection setRef={(ref: HTMLElement | null) => setSectionRef('email', ref)} />
        <CRMSection setRef={(ref: HTMLElement | null) => setSectionRef('crm', ref)} />
        <FunnelsSection setRef={(ref: HTMLElement | null) => setSectionRef('funnels', ref)} />
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
            <span className="gradient-text gradient-border inline-block pb-2">Automatización de Marketing</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Implementamos soluciones de automatización que nutren leads, optimizan procesos y escalan tu negocio digital sin esfuerzo manual.
          </p>
          
          <motion.div
            className="flex justify-center gap-6 flex-wrap"
            initial={{ opacity: 0 }}
            animate={hasIntersected ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.a 
              href="#herramientas" 
              className="px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium shadow-lg hover:shadow-[#00CCFF]/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Descubrir Soluciones
            </motion.a>
            
            <motion.a 
              href="/consulta" 
              className="px-8 py-4 bg-transparent border border-[#00CCFF] rounded-full text-white font-medium hover:bg-[#00CCFF]/10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Solicitar Asesoría
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function HerramientasSection({ setRef }: SectionProps) {
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
      id="herramientas" 
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
            <span className="gradient-text gradient-border inline-block pb-2">Herramientas de Automatización</span>
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
                text="Implementamos y configuramos las mejores plataformas de automatización de marketing para crear flujos de trabajo eficientes que ahorran tiempo, mejoran la experiencia del cliente y aumentan las conversiones."
                typeSpeed={30}
              />
            </div>
          ) : (
            <p className="text-xl text-gray-300 min-h-[100px]">
              Cargando...
            </p>
          )}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Email Marketing Automation</h3>
              
              <div className="text-gray-300 flex-grow">
                <p className="mb-4">Implementamos sistemas de email marketing automatizado para nutrir leads, convertir prospectos y fidelizar clientes con mensajes personalizados.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Segmentación avanzada</li>
                  <li>Secuencias de nurturing</li>
                  <li>Emails transaccionales</li>
                  <li>Campañas de recuperación</li>
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <a 
                  href="#email" 
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">CRM y Gestión de Leads</h3>
              
              <div className="text-gray-300 flex-grow">
                <p className="mb-4">Configuramos sistemas CRM que automatizan la gestión de contactos, seguimiento de clientes potenciales y procesos de venta.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Calificación automática de leads</li>
                  <li>Distribución inteligente</li>
                  <li>Seguimiento automatizado</li>
                  <li>Reportes personalizados</li>
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <a 
                  href="#crm" 
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Marketing Funnels</h3>
              
              <div className="text-gray-300 flex-grow">
                <p className="mb-4">Diseñamos y automatizamos embudos de marketing que guían a tus prospectos desde el primer contacto hasta la conversión y fidelización.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Landing pages optimizadas</li>
                  <li>Secuencias multi-canal</li>
                  <li>Scoring y cualificación</li>
                  <li>Seguimiento y optimización</li>
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <a 
                  href="#funnels" 
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
            <h3 className="font-rajdhani font-bold text-2xl mb-4 text-white text-center">Beneficios de la Automatización</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-300">Ahorro significativo de tiempo y recursos</p>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-300">Escalabilidad sin incrementar personal</p>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-300">Mejora en la calidad y consistencia</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-300">Respuesta inmediata 24/7 a tus clientes</p>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-300">Mayor personalización basada en comportamiento</p>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-300">Datos y análisis para mejora continua</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EmailMarketingSection({ setRef }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }
  
  return (
    <section 
      id="email" 
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
            <span className="gradient-text gradient-border inline-block pb-2">Automatización de Email Marketing</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Implementamos campañas de email marketing automatizadas que entregan el mensaje correcto, a la persona correcta, en el momento correcto.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-8">
                <h3 className="font-rajdhani font-bold text-2xl mb-6 text-white">Tipos de Campañas Automatizadas</h3>
                
                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Welcome Series</h4>
                      <p className="text-gray-300">Secuencias de bienvenida personalizadas que establecen una primera impresión positiva y guían a los nuevos suscriptores o clientes.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Lead Nurturing</h4>
                      <p className="text-gray-300">Secuencias educativas que construyen relaciones, posicionan tu autoridad y preparan a los leads para la compra.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Abandoned Cart Recovery</h4>
                      <p className="text-gray-300">Emails automáticos que recuperan ventas perdidas recordando a los usuarios completar su compra con incentivos personalizados.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Re-engagement</h4>
                      <p className="text-gray-300">Campañas diseñadas para reactivar suscriptores inactivos y recuperar clientes perdidos con ofertas especiales.</p>
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
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-6">
                <h3 className="font-rajdhani font-bold text-xl mb-4 text-white">Plataformas que Integramos</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-[#00CCFF]/20 flex items-center justify-center mr-2">
                      <span className="text-white font-medium">M</span>
                    </div>
                    <span className="text-gray-300">Mailchimp</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-[#00CCFF]/20 flex items-center justify-center mr-2">
                      <span className="text-white font-medium">AC</span>
                    </div>
                    <span className="text-gray-300">ActiveCampaign</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-[#00CCFF]/20 flex items-center justify-center mr-2">
                      <span className="text-white font-medium">CK</span>
                    </div>
                    <span className="text-gray-300">ConvertKit</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-[#00CCFF]/20 flex items-center justify-center mr-2">
                      <span className="text-white font-medium">KL</span>
                    </div>
                    <span className="text-gray-300">Klaviyo</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-[#00CCFF]/20 flex items-center justify-center mr-2">
                      <span className="text-white font-medium">HS</span>
                    </div>
                    <span className="text-gray-300">HubSpot</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-[#00CCFF]/20 flex items-center justify-center mr-2">
                      <span className="text-white font-medium">SG</span>
                    </div>
                    <span className="text-gray-300">SendGrid</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-6">
                <h3 className="font-rajdhani font-bold text-xl mb-4 text-white">Características Avanzadas</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Segmentación por comportamiento y demografía</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Personalización dinámica basada en datos</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Pruebas A/B para optimización continua</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Seguimiento y análisis detallado de rendimiento</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Integración con CRM y otras herramientas</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <a 
                href="/consulta" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium shadow-lg hover:shadow-[#00CCFF]/20 transition duration-300 transform hover:scale-105"
              >
                Solicitar Asesoría de Email Marketing
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CRMSection({ setRef }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }
  
  return (
    <section 
      id="crm" 
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
            <span className="gradient-text gradient-border inline-block pb-2">CRM y Automatización de Ventas</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Implementamos sistemas CRM inteligentes que automatizan procesos de venta, mejoran el seguimiento de leads y potencian la productividad de tu equipo.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] md:col-span-2 lg:col-span-1"
          >
            <div className="bg-[#121217] rounded-xl p-6 h-full">
              <h3 className="font-rajdhani font-bold text-xl mb-4 text-white">Plataformas CRM que Integramos</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-[#00CCFF]/10 rounded-lg p-4 text-center">
                  <div className="h-10 w-10 rounded-full bg-[#00CCFF]/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-medium">HS</span>
                  </div>
                  <p className="text-gray-300 text-sm">HubSpot</p>
                </div>
                
                <div className="bg-[#00CCFF]/10 rounded-lg p-4 text-center">
                  <div className="h-10 w-10 rounded-full bg-[#00CCFF]/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-medium">SF</span>
                  </div>
                  <p className="text-gray-300 text-sm">Salesforce</p>
                </div>
                
                <div className="bg-[#00CCFF]/10 rounded-lg p-4 text-center">
                  <div className="h-10 w-10 rounded-full bg-[#00CCFF]/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-medium">ZH</span>
                  </div>
                  <p className="text-gray-300 text-sm">Zoho CRM</p>
                </div>
                
                <div className="bg-[#00CCFF]/10 rounded-lg p-4 text-center">
                  <div className="h-10 w-10 rounded-full bg-[#00CCFF]/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-medium">PP</span>
                  </div>
                  <p className="text-gray-300 text-sm">Pipedrive</p>
                </div>
                
                <div className="bg-[#00CCFF]/10 rounded-lg p-4 text-center">
                  <div className="h-10 w-10 rounded-full bg-[#00CCFF]/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-medium">AC</span>
                  </div>
                  <p className="text-gray-300 text-sm">ActiveCampaign</p>
                </div>
                
                <div className="bg-[#00CCFF]/10 rounded-lg p-4 text-center">
                  <div className="h-10 w-10 rounded-full bg-[#00CCFF]/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-medium">CP</span>
                  </div>
                  <p className="text-gray-300 text-sm">ClickUp</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-8">
                <h3 className="font-rajdhani font-bold text-2xl mb-6 text-white">Automatizaciones de Ventas que Implementamos</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Lead Scoring y Cualificación</h4>
                        <p className="text-gray-300">Puntuación automática de leads basada en comportamiento y demografía para priorizar prospectos con mayor potencial de compra.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Asignación y Seguimiento</h4>
                        <p className="text-gray-300">Distribución inteligente de leads a los vendedores adecuados y seguimiento automático con recordatorios de tareas pendientes.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Flujos de Trabajo Personalizados</h4>
                        <p className="text-gray-300">Automatización de procesos de venta con flujos de trabajo adaptados a tu ciclo de ventas específico, desde prospección hasta cierre.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Reportes y Análisis</h4>
                        <p className="text-gray-300">Dashboards e informes automatizados con métricas clave para tomar decisiones informadas y optimizar tu proceso de ventas.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 lg:col-span-3"
          >
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
              <div className="bg-[#121217] rounded-xl p-8">
                <h3 className="font-rajdhani font-bold text-2xl mb-6 text-white text-center">Beneficios de la Automatización CRM</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-white font-medium mb-2">Ahorro de Tiempo</h4>
                    <p className="text-gray-300">Reduce hasta un 80% el tiempo dedicado a tareas administrativas y aumenta el tiempo de venta efectiva.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h4 className="text-white font-medium mb-2">Más Conversiones</h4>
                    <p className="text-gray-300">Mejora las tasas de conversión con seguimiento oportuno y personalizado en cada etapa del embudo.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className="text-white font-medium mb-2">Mejor Experiencia</h4>
                    <p className="text-gray-300">Ofrece una experiencia coherente y personalizada a tus clientes en cada interacción con tu empresa.</p>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <a 
                    href="/consulta" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium shadow-lg hover:shadow-[#00CCFF]/20 transition duration-300 transform hover:scale-105"
                  >
                    Solicitar Asesoría en CRM
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FunnelsSection({ setRef }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }
  
  return (
    <section 
      id="funnels" 
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
            <span className="gradient-text gradient-border inline-block pb-2">Automatización de Funnels de Marketing</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Creamos y automatizamos embudos de conversión que captan, califican y convierten visitantes en clientes de forma sistemática y escalable.
          </p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] mb-16"
          >
            <div className="bg-[#121217] rounded-xl p-8">
              <h3 className="font-rajdhani font-bold text-2xl mb-6 text-white text-center">Nuestro Enfoque de Funnel Marketing</h3>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center relative">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center mx-auto mb-4 z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div className="hidden md:block absolute top-8 left-[calc(50%+36px)] w-[calc(100%-50px)] h-2 bg-gradient-to-r from-[#9933FF]/50 to-transparent"></div>
                  <h4 className="text-white font-medium mb-2">1. Atracción</h4>
                  <p className="text-gray-300 text-sm">Captamos tráfico cualificado a través de landing pages optimizadas, contenido atractivo y campañas multicanal.</p>
                </div>
                
                <div className="text-center relative">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center mx-auto mb-4 z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="hidden md:block absolute top-8 left-[calc(50%+36px)] w-[calc(100%-50px)] h-2 bg-gradient-to-r from-[#9933FF]/50 to-transparent"></div>
                  <h4 className="text-white font-medium mb-2">2. Conversión</h4>
                  <p className="text-gray-300 text-sm">Convertimos visitantes en leads mediante formularios optimizados, magnets y ofertas de valor irresistibles.</p>
                </div>
                
                <div className="text-center relative">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center mx-auto mb-4 z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <div className="hidden md:block absolute top-8 left-[calc(50%+36px)] w-[calc(100%-50px)] h-2 bg-gradient-to-r from-[#9933FF]/50 to-transparent"></div>
                  <h4 className="text-white font-medium mb-2">3. Cualificación</h4>
                  <p className="text-gray-300 text-sm">Nutrimos y calificamos leads mediante secuencias automatizadas que educan y construyen confianza.</p>
                </div>
                
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center mx-auto mb-4 z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-white font-medium mb-2">4. Monetización</h4>
                  <p className="text-gray-300 text-sm">Convertimos leads cualificados en clientes mediante ofertas personalizadas y procesos de venta optimizados.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={hasIntersected ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]">
                <div className="bg-[#121217] rounded-xl p-8">
                  <h3 className="font-rajdhani font-bold text-2xl mb-6 text-white">Tipos de Funnels que Automatizamos</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Funnels de Generación de Leads</h4>
                        <p className="text-gray-300">Diseñados para captar datos de contacto y convertir visitantes en prospectos cualificados.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Funnels de Venta</h4>
                        <p className="text-gray-300">Orientados a convertir prospectos en clientes mediante procesos de venta optimizados.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Funnels de Webinar</h4>
                        <p className="text-gray-300">Especializados en la captación, registro y seguimiento de asistentes a eventos en línea.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white flex-shrink-0 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Funnels de Fidelización</h4>
                        <p className="text-gray-300">Enfocados en maximizar el valor del cliente y promover la recompra y recomendación.</p>
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
                  <h3 className="font-rajdhani font-bold text-2xl mb-6 text-white">Plataformas que Utilizamos</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">Builders de Funnels</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                          ClickFunnels
                        </span>
                        <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                          Kartra
                        </span>
                        <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                          Systeme.io
                        </span>
                        <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                          LeadPages
                        </span>
                        <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                          Instapage
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-3">Automatización</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                          ActiveCampaign
                        </span>
                        <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                          HubSpot
                        </span>
                        <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                          Zapier
                        </span>
                        <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                          Make.com
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-3">Análisis y Optimización</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                          Google Analytics
                        </span>
                        <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                          Hotjar
                        </span>
                        <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                          Optimizely
                        </span>
                        <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                          Google Tag Manager
                        </span>
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
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-center"
          >
            <a 
              href="/consulta" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium shadow-lg hover:shadow-[#00CCFF]/20 transition duration-300 transform hover:scale-105"
            >
              Solicitar Consultoría de Funnels
            </a>
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
            <span className="gradient-text gradient-border inline-block pb-2">¿Listo para Automatizar tu Marketing?</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Automatiza tus procesos de marketing y ventas para escalar tu negocio, ahorrar tiempo y recursos, y ofrecer una experiencia superior a tus clientes.
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
                <h3 className="font-rajdhani font-bold text-2xl mb-6 text-white">Nuestros Servicios de Automatización</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Consultoría y estrategia de automatización</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Implementación de plataformas</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Configuración de flujos automatizados</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Diseño y optimización de funnels</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Integración entre sistemas y plataformas</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-300">Capacitación y soporte continuo</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <a 
                    href="/consulta" 
                    className="inline-block px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium shadow-lg hover:shadow-[#00CCFF]/20 transition duration-300 transform hover:scale-105"
                  >
                    Solicitar Propuesta
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
                    <p className="text-gray-300">automatizacion@asesoriatuwebai.com</p>
                    <p className="text-gray-300">funnels@asesoriatuwebai.com</p>
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
                    href="/conversion-cro" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white hover:bg-[#00CCFF]/30 transition-colors"
                  >
                    Optimización CRO
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