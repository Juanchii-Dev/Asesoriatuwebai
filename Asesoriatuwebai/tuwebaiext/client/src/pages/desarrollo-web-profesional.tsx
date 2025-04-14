import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import NavDots from '@/components/ui/nav-dots';
import AnimatedShape from '@/components/ui/animated-shape';
import ScrollProgress from '@/components/ui/scroll-progress';
import WhatsAppButton from '@/components/ui/whatsapp-button';
import TypeWriterEffect from 'react-typewriter-effect';
import * as SiIcons from 'react-icons/si';

export default function DesarrolloWebProfesional() {
  const sections = [
    { id: "hero", label: "Inicio" },
    { id: "servicios", label: "Servicios" },
    { id: "tecnologias", label: "Tecnologías" },
    { id: "proceso", label: "Proceso" },
    { id: "portafolio", label: "Portafolio" },
    { id: "testimonios", label: "Testimonios" },
    { id: "contacto", label: "Contacto" }
  ];

  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({
    hero: null,
    servicios: null,
    tecnologias: null,
    proceso: null,
    portafolio: null,
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
        <ServiciosSection setRef={(ref: HTMLElement | null) => setSectionRef('servicios', ref)} />
        <TecnologiasSection setRef={(ref: HTMLElement | null) => setSectionRef('tecnologias', ref)} />
        <ProcesoSection setRef={(ref: HTMLElement | null) => setSectionRef('proceso', ref)} />
        <PortafolioSection setRef={(ref: HTMLElement | null) => setSectionRef('portafolio', ref)} />
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
            <span className="gradient-text gradient-border inline-block pb-2">Desarrollo Web Profesional</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Creamos experiencias digitales de alto rendimiento que potencian tu marca y maximizan tu conversión, utilizando tecnologías de vanguardia.
          </p>
          
          <motion.div
            className="flex justify-center gap-6 flex-wrap"
            initial={{ opacity: 0 }}
            animate={hasIntersected ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.a 
              href="#servicios" 
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
              Solicitar Presupuesto
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ServiciosSection({ setRef }: SectionProps) {
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
      id="servicios" 
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
            <span className="gradient-text gradient-border inline-block pb-2">Nuestros Servicios Web</span>
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
                text="Ofrecemos soluciones web completas y personalizadas que combinan diseño impactante con funcionalidad avanzada para impulsar el éxito de tu negocio en el entorno digital."
                typeSpeed={30}
              />
            </div>
          ) : (
            <p className="text-xl text-gray-300 min-h-[80px]">
              Cargando...
            </p>
          )}
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] h-full"
          >
            <div className="bg-[#121217] rounded-xl p-6 h-full flex flex-col">
              <div className="mb-4 h-14 w-14 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Desarrollo de Sitios Web Corporativos</h3>
              
              <div className="text-gray-300 flex-grow">
                <p className="mb-4">Diseñamos y desarrollamos sitios web profesionales que proyectan la identidad de tu marca y ofrecen una experiencia de usuario excepcional.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Diseño UX/UI a medida</li>
                  <li>Responsive para todos los dispositivos</li>
                  <li>Optimizado para rendimiento</li>
                  <li>Implementación de CMS personalizado</li>
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
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
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] h-full"
          >
            <div className="bg-[#121217] rounded-xl p-6 h-full flex flex-col">
              <div className="mb-4 h-14 w-14 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Tiendas Online y eCommerce</h3>
              
              <div className="text-gray-300 flex-grow">
                <p className="mb-4">Desarrollamos plataformas de comercio electrónico completas que impulsan tus ventas y ofrecen una experiencia de compra excepcional.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Integración con pasarelas de pago</li>
                  <li>Gestión de inventario</li>
                  <li>Procesos de compra optimizados</li>
                  <li>Paneles de administración intuitivos</li>
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
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
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] h-full"
          >
            <div className="bg-[#121217] rounded-xl p-6 h-full flex flex-col">
              <div className="mb-4 h-14 w-14 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Landing Pages de Alta Conversión</h3>
              
              <div className="text-gray-300 flex-grow">
                <p className="mb-4">Diseñamos landing pages específicas para campañas que maximizan tus tasas de conversión y generan leads de calidad.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Diseño centrado en conversión</li>
                  <li>Call-to-actions estratégicos</li>
                  <li>A/B testing incluido</li>
                  <li>Integración con herramientas de marketing</li>
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
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
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] h-full"
          >
            <div className="bg-[#121217] rounded-xl p-6 h-full flex flex-col">
              <div className="mb-4 h-14 w-14 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Aplicaciones Web Personalizadas</h3>
              
              <div className="text-gray-300 flex-grow">
                <p className="mb-4">Desarrollamos aplicaciones web a medida que resuelven necesidades específicas de tu negocio con interfaces intuitivas y gran rendimiento.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Sistemas de gestión</li>
                  <li>Plataformas SaaS</li>
                  <li>Intranets y extranets</li>
                  <li>Aplicaciones de procesamiento de datos</li>
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
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
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] h-full"
          >
            <div className="bg-[#121217] rounded-xl p-6 h-full flex flex-col">
              <div className="mb-4 h-14 w-14 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Mantenimiento y Optimización</h3>
              
              <div className="text-gray-300 flex-grow">
                <p className="mb-4">Ofrecemos servicios continuos de mantenimiento y optimización para garantizar que tu sitio web esté siempre actualizado y funcionando al máximo rendimiento.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Actualizaciones de seguridad</li>
                  <li>Optimización de rendimiento</li>
                  <li>Respaldo y recuperación</li>
                  <li>Monitoreo continuo</li>
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
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
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] h-full"
          >
            <div className="bg-[#121217] rounded-xl p-6 h-full flex flex-col">
              <div className="mb-4 h-14 w-14 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">Auditoría y Consultoría Web</h3>
              
              <div className="text-gray-300 flex-grow">
                <p className="mb-4">Analizamos tu presencia web actual y proporcionamos recomendaciones estratégicas para mejorar su rendimiento, usabilidad y conversión.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Análisis de usabilidad</li>
                  <li>Evaluación de rendimiento</li>
                  <li>Auditoría de seguridad</li>
                  <li>Recomendaciones de mejora</li>
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
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

function TecnologiasSection({ setRef }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }
  
  const tecnologias = [
    { icon: <div className="text-[#61DAFB]">{SiIcons.SiReact && <SiIcons.SiReact size={32} />}</div>, name: "React", delay: 0.1 },
    { icon: <div className="text-white">{SiIcons.SiNextdotjs && <SiIcons.SiNextdotjs size={32} />}</div>, name: "Next.js", delay: 0.2 },
    { icon: <div className="text-[#3178C6]">{SiIcons.SiTypescript && <SiIcons.SiTypescript size={32} />}</div>, name: "TypeScript", delay: 0.3 },
    { icon: <div className="text-[#38B2AC]">{SiIcons.SiTailwindcss && <SiIcons.SiTailwindcss size={32} />}</div>, name: "Tailwind CSS", delay: 0.4 },
    { icon: <div className="text-[#68A063]">{SiIcons.SiNodedotjs && <SiIcons.SiNodedotjs size={32} />}</div>, name: "Node.js", delay: 0.5 },
    { icon: <div className="text-[#47A248]">{SiIcons.SiMongodb && <SiIcons.SiMongodb size={32} />}</div>, name: "MongoDB", delay: 0.6 },
    { icon: <div className="text-[#336791]">{SiIcons.SiPostgresql && <SiIcons.SiPostgresql size={32} />}</div>, name: "PostgreSQL", delay: 0.7 },
    { icon: <div className="text-[#FFCA28]">{SiIcons.SiFirebase && <SiIcons.SiFirebase size={32} />}</div>, name: "Firebase", delay: 0.8 }
  ];
  
  return (
    <section 
      id="tecnologias" 
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
            <span className="gradient-text gradient-border inline-block pb-2">Tecnologías de Vanguardia</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Utilizamos tecnologías modernas y eficientes para crear soluciones web de alto rendimiento, escalables y mantenibles.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {tecnologias.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: tech.delay }}
              className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]"
            >
              <div className="bg-[#121217] rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <div className="text-[#00CCFF] mb-4">{tech.icon}</div>
                <h3 className="text-white font-medium">{tech.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={hasIntersected ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] max-w-4xl mx-auto"
        >
          <div className="bg-[#121217] rounded-xl p-8">
            <h3 className="font-rajdhani font-bold text-2xl mb-4 text-white text-center">Ventajas de Nuestro Stack Tecnológico</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-300">Rendimiento optimizado y tiempos de carga rápidos</p>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-300">Interfaces de usuario fluidas y reactivas</p>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-300">Código mantenible y escalable a largo plazo</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-300">Seguridad robusta integrada desde el inicio</p>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-300">SEO optimizado y compatibilidad con motores de búsqueda</p>
                </div>
                
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00CCFF] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-300">Fácil integración con APIs y servicios de terceros</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProcesoSection({ setRef }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }
  
  const pasos = [
    {
      numero: 1,
      titulo: "Descubrimiento y Planificación",
      descripcion: "Analizamos tus necesidades, objetivos y audiencia para definir la estrategia ideal para tu proyecto web.",
      delay: 0.1
    },
    {
      numero: 2,
      titulo: "Diseño UX/UI",
      descripcion: "Creamos wireframes y diseños visuales que combinan estética con usabilidad, optimizados para la conversión.",
      delay: 0.2
    },
    {
      numero: 3,
      titulo: "Desarrollo",
      descripcion: "Implementamos el diseño utilizando tecnologías modernas y código limpio, siguiendo las mejores prácticas.",
      delay: 0.3
    },
    {
      numero: 4,
      titulo: "Pruebas y Control de Calidad",
      descripcion: "Realizamos pruebas exhaustivas para garantizar que todo funcione correctamente en diferentes dispositivos y navegadores.",
      delay: 0.4
    },
    {
      numero: 5,
      titulo: "Lanzamiento",
      descripcion: "Implementamos tu sitio en producción con configuraciones optimizadas para rendimiento y seguridad.",
      delay: 0.5
    },
    {
      numero: 6,
      titulo: "Soporte y Mantenimiento",
      descripcion: "Ofrecemos servicios continuos para mantener tu sitio actualizado, seguro y funcionando perfectamente.",
      delay: 0.6
    }
  ];
  
  return (
    <section 
      id="proceso" 
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
            <span className="gradient-text gradient-border inline-block pb-2">Nuestro Proceso de Desarrollo</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Seguimos una metodología probada para entregar proyectos web exitosos que superan las expectativas y alcanzan objetivos de negocio.
          </p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
            {pasos.map((paso) => (
              <motion.div
                key={paso.numero}
                initial={{ opacity: 0, y: 20 }}
                animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: paso.delay }}
              >
                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center text-white font-bold text-lg">
                      {paso.numero}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">{paso.titulo}</h3>
                    <p className="text-gray-300">{paso.descripcion}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]"
          >
            <div className="bg-[#121217] rounded-xl p-8">
              <h3 className="font-rajdhani font-bold text-2xl mb-4 text-white text-center">¿Por qué Nuestro Proceso Marca la Diferencia?</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="text-[#00CCFF] font-medium">Transparencia Total</h4>
                  <p className="text-gray-300">Te mantenemos informado en cada etapa del proceso, con comunicación clara y acceso a avances en tiempo real.</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-[#00CCFF] font-medium">Enfoque Colaborativo</h4>
                  <p className="text-gray-300">Trabajamos en estrecha colaboración contigo, incorporando feedback continuo para asegurar que el resultado final cumpla tus expectativas.</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-[#00CCFF] font-medium">Mejora Continua</h4>
                  <p className="text-gray-300">Analizamos métricas post-lanzamiento y realizamos optimizaciones incrementales para maximizar el rendimiento y resultados.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PortafolioSection({ setRef }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }
  
  const proyectos = [
    {
      titulo: "E-commerce de Moda Sostenible",
      descripcion: "Tienda online para marca de moda sostenible con más de 50.000 visitas mensuales y tasa de conversión del 5.2%.",
      tecnologias: ["Next.js", "Tailwind CSS", "Stripe", "PostgreSQL"],
      delay: 0.1
    },
    {
      titulo: "Aplicación Web para Gestión Médica",
      descripcion: "Plataforma de gestión de citas y expedientes médicos que incrementó la eficiencia administrativa en un 70%.",
      tecnologias: ["React", "Node.js", "MongoDB", "Docker"],
      delay: 0.2
    },
    {
      titulo: "Portal Inmobiliario",
      descripcion: "Marketplace inmobiliario con más de 10.000 propiedades, sistema de filtros avanzados y visualización 3D de inmuebles.",
      tecnologias: ["Vue.js", "Express", "PostgreSQL", "Three.js"],
      delay: 0.3
    },
    {
      titulo: "Plataforma Educativa Online",
      descripcion: "LMS para academia online con más de 5.000 estudiantes activos, sistema de videoconferencia integrado y análisis de progreso.",
      tecnologias: ["React", "Firebase", "WebRTC", "Tailwind CSS"],
      delay: 0.4
    }
  ];
  
  return (
    <section 
      id="portafolio" 
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
            <span className="gradient-text gradient-border inline-block pb-2">Nuestros Proyectos Destacados</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explora algunos de nuestros trabajos más recientes y descubre cómo hemos ayudado a nuestros clientes a alcanzar sus objetivos digitales.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {proyectos.map((proyecto, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: proyecto.delay }}
              className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] h-full"
            >
              <div className="bg-[#121217] rounded-xl p-8 h-full flex flex-col">
                <h3 className="font-rajdhani font-bold text-xl mb-3 text-white">{proyecto.titulo}</h3>
                
                <p className="text-gray-300 mb-6">{proyecto.descripcion}</p>
                
                <div className="mt-auto">
                  <h4 className="text-white font-medium mb-2">Tecnologías utilizadas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {proyecto.tecnologias.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-gradient-to-r from-[#00CCFF]/20 to-[#9933FF]/20 rounded-full text-sm text-white">
                        {tech}
                      </span>
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
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-16"
        >
          <a 
            href="/consulta" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium shadow-lg hover:shadow-[#00CCFF]/20 transition duration-300 transform hover:scale-105"
          >
            Comienza Tu Proyecto Ahora
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
      nombre: "Laura Martínez",
      empresa: "MedicalTech S.L.",
      cargo: "Directora de Marketing",
      testimonio: "Asesoria Tu Web AI transformó completamente nuestra presencia digital. El nuevo sitio web no solo es visualmente impresionante, sino que ha mejorado significativamente nuestras conversiones. Su enfoque en la experiencia de usuario y la optimización técnica es excepcional.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      delay: 0.1
    },
    {
      nombre: "Carlos Rodríguez",
      empresa: "Innovate Retail",
      cargo: "CEO",
      testimonio: "Su equipo entendió perfectamente nuestras necesidades. Implementaron una plataforma e-commerce que no solo es fácil de gestionar, sino que ha multiplicado nuestras ventas online. La velocidad de carga y el diseño responsive son exactamente lo que necesitábamos.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      delay: 0.2
    },
    {
      nombre: "Elena Sánchez",
      empresa: "Global Education",
      cargo: "Directora de Operaciones",
      testimonio: "Nuestra plataforma de cursos online es ahora intuitiva, escalable y técnicamente impecable. El proceso de desarrollo fue transparente y colaborativo, y el resultado final superó todas nuestras expectativas. Los felicito por su profesionalismo.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
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
            <span className="gradient-text gradient-border inline-block pb-2">Lo Que Nuestros Clientes Dicen</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre por qué empresas innovadoras confían en nuestros servicios de desarrollo web profesional para potenciar su presencia digital.
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
                <h3 className="font-rajdhani font-bold text-2xl mb-4 text-white">¿Listo para potenciar tu presencia digital?</h3>
                <p className="text-gray-300">Únete a nuestros clientes satisfechos y transforma tu negocio con un desarrollo web profesional a medida.</p>
              </div>
              
              <div>
                <a 
                  href="/consulta" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium shadow-lg hover:shadow-[#00CCFF]/20 transition duration-300 transform hover:scale-105"
                >
                  Solicitar Presupuesto
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
            <span className="gradient-text gradient-border inline-block pb-2">¿Listo para hacer realidad tu proyecto?</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hablemos sobre tus necesidades y cómo podemos ayudarte a crear la presencia web perfecta para tu negocio.
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
                <h3 className="font-rajdhani font-bold text-2xl mb-6 text-white">¿Qué Podemos Hacer Por Ti?</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Diseño Web Responsive</h4>
                      <p className="text-gray-300">Sitios web adaptados a todos los dispositivos para una experiencia de usuario óptima.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Rendimiento Optimizado</h4>
                      <p className="text-gray-300">Sitios rápidos y eficientes que cargan en milisegundos para mantener a tus usuarios comprometidos.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Escalabilidad</h4>
                      <p className="text-gray-300">Soluciones que crecen con tu negocio, adaptándose a tus necesidades futuras sin problemas.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-700">
                  <h4 className="text-white font-medium mb-3">Tecnologías que dominamos:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                      React.js
                    </span>
                    <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                      Next.js
                    </span>
                    <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                      Node.js
                    </span>
                    <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                      Tailwind CSS
                    </span>
                    <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                      WordPress
                    </span>
                    <span className="px-3 py-1 bg-[#00CCFF]/20 rounded-full text-sm text-white">
                      Shopify
                    </span>
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
                <h3 className="font-rajdhani font-bold text-xl mb-4 text-white">Solicita un Presupuesto</h3>
                <p className="text-gray-300 mb-6">Completa el formulario de contacto y nos pondremos en contacto contigo en menos de 24 horas con un presupuesto personalizado.</p>
                <a 
                  href="/consulta" 
                  className="inline-block w-full px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium text-center shadow-lg hover:shadow-[#00CCFF]/20 transition duration-300 transform hover:scale-105"
                >
                  Solicitar Presupuesto
                </a>
              </div>
            </div>
            
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
                    <p className="text-gray-300">desarrollo@asesoriatuwebai.com</p>
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