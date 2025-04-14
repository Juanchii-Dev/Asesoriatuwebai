import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import AnimatedShape from '../ui/animated-shape';
import TypewriterEffect from 'react-typewriter-effect';

interface PriceFeatureProps {
  feature: string;
}

function PriceFeature({ feature }: PriceFeatureProps) {
  return (
    <div className="flex items-center space-x-3 py-2">
      <div className="flex-shrink-0">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 text-[#00CCFF]" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
      <span className="text-gray-300">{feature}</span>
    </div>
  );
}

interface PricingCardProps {
  title: string;
  price: string;
  description?: string;
  features: string[];
  isPopular?: boolean;
  delay: number;
  ctaText: string;
}

function PricingCard({ title, price, description, features, isPopular = false, delay, ctaText }: PricingCardProps) {
  const { ref, hasIntersected } = useIntersectionObserver();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        delay: delay * 0.2 
      } 
    }
  };

  return (
    <motion.div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative rounded-xl overflow-hidden shadow-xl flex flex-col ${
        isPopular 
          ? 'bg-gradient-to-b from-[#13131f] to-[#1A1A2E] border-2 border-[#00CCFF]' 
          : 'bg-glass border border-gray-800'
      }`}
      initial="hidden"
      animate={hasIntersected ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 204, 255, 0.25)' }}
      transition={{ duration: 0.3 }}
    >
      {isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-r from-[#00CCFF] to-[#9933FF] text-white text-xs px-4 py-1 rounded-bl-lg uppercase font-semibold tracking-wider">
            Más popular
          </div>
        </div>
      )}
      
      <div className="p-8 flex-grow flex flex-col">
        <div className="text-center mb-8">
          <h3 className="font-rajdhani font-bold text-2xl text-white mb-2">{title}</h3>
          
          <p className="text-gray-400 min-h-[50px]">{description}</p>
          
          <div className="mt-4">
            <span className="text-4xl font-bold text-white">{price}</span>
            {price !== 'Personalizado' && <span className="text-gray-400 ml-2">/mes</span>}
          </div>
        </div>
        
        <div className="space-y-1 mb-8 flex-grow">
          {features.map((feature, index) => (
            <PriceFeature key={index} feature={feature} />
          ))}
        </div>
        
        <motion.a 
          href="/consulta" 
          className={`w-full py-4 rounded-lg text-center font-medium ${
            isPopular 
              ? 'bg-gradient-to-r from-[#00CCFF] to-[#9933FF] text-white shadow-lg shadow-[#00CCFF]/20' 
              : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
          }`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {ctaText}
        </motion.a>
      </div>
    </motion.div>
  );
}

interface PricingSectionProps {
  setRef: (ref: HTMLElement | null) => void;
}

export default function PricingSection({ setRef }: PricingSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: titleRef, hasIntersected: titleVisible } = useIntersectionObserver();
  const [showAnnual, setShowAnnual] = useState(false);
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const toggleVariants = {
    monthly: { x: 0 },
    annual: { x: 28 }
  };

  const pricingPlans = [
    {
      title: "Esencial",
      price: showAnnual ? "$799" : "$899",
      description: "Ideal para emprendedores y pequeñas empresas",
      features: [
        "Diseño web personalizado",
        "Responsive para todos los dispositivos",
        "Hasta 5 páginas",
        "SEO básico",
        "Formulario de contacto",
        "Enlaces a redes sociales",
        "Mantenimiento básico por 3 meses"
      ],
      ctaText: "Comenzar Ahora"
    },
    {
      title: "Profesional",
      price: showAnnual ? "$1,399" : "$1,599",
      description: "Perfecto para empresas en crecimiento",
      features: [
        "Todo lo de Esencial +",
        "Hasta 10 páginas",
        "Blog integrado",
        "SEO avanzado",
        "Optimización de velocidad",
        "Integración con Google Analytics",
        "Mantenimiento por 6 meses",
        "Capacitación para actualización"
      ],
      isPopular: true,
      ctaText: "Elegir Plan"
    },
    {
      title: "Corporativo",
      price: showAnnual ? "$2,499" : "$2,899",
      description: "Para negocios que buscan destacar",
      features: [
        "Todo lo de Profesional +",
        "Páginas ilimitadas",
        "Integración de CRM/ERP",
        "Área de miembros/clientes",
        "Estrategia de marketing digital",
        "Optimización de conversión",
        "Mantenimiento por 12 meses",
        "Soporte prioritario 24/7"
      ],
      ctaText: "Contactar Ventas"
    },
    {
      title: "Enterprise",
      price: "Personalizado",
      description: "Soluciones a medida para grandes empresas",
      features: [
        "Todo lo de Corporativo +",
        "Desarrollo completamente personalizado",
        "Auditorías de seguridad avanzadas",
        "Integraciones API personalizadas",
        "Consultoría estratégica digital",
        "Plan de escalabilidad",
        "Arquitectura cloud optimizada",
        "Equipo dedicado"
      ],
      ctaText: "Solicitar Propuesta"
    }
  ];

  return (
    <section 
      id="pricing" 
      ref={sectionRef}
      className="py-24 min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#121217] to-[#0A0A0F]"
    >
      <AnimatedShape type={1} className="top-[10%] left-[-150px]" delay={1} />
      <AnimatedShape type={2} className="bottom-[20%] right-[-100px]" delay={2} />
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className="text-center mb-16"
          initial="hidden"
          animate={titleVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="font-rajdhani font-bold text-3xl md:text-5xl mb-6">
            <span className="gradient-text gradient-border inline-block pb-2">
              Planes adaptados a tus necesidades
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Invierte en tu presencia digital y obtén un retorno excepcional
          </p>
          
          {/* Toggle switch */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${!showAnnual ? 'text-white font-semibold' : 'text-gray-400'}`}>
              Mensual
            </span>
            
            <button 
              onClick={() => setShowAnnual(!showAnnual)}
              className="relative w-14 h-7 bg-gray-800 rounded-full p-1 transition-colors duration-300 focus:outline-none"
              aria-label={showAnnual ? "Switch to monthly billing" : "Switch to annual billing"}
            >
              <motion.div 
                className="w-5 h-5 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full shadow-md"
                variants={toggleVariants}
                animate={showAnnual ? "annual" : "monthly"}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            
            <div className="flex items-center">
              <span className={`text-sm ${showAnnual ? 'text-white font-semibold' : 'text-gray-400'}`}>
                Anual
              </span>
              <span className="ml-2 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] text-white text-xs px-2 py-1 rounded-full">
                Ahorra 15%
              </span>
            </div>
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={plan.title}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              delay={index}
              ctaText={plan.ctaText}
            />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-gray-400 max-w-3xl mx-auto">
            Todos nuestros planes incluyen soporte técnico, actualizaciones de seguridad y garantía de satisfacción. 
            Si no encuentras un plan que se adapte perfectamente a tus necesidades, contáctanos para una solución personalizada.
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a href="/consulta" className="text-[#00CCFF] hover:text-white transition-colors flex items-center">
              <span>Ver comparativa detallada</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            
            <a href="/consulta" className="text-[#9933FF] hover:text-white transition-colors flex items-center">
              <span>Preguntas frecuentes</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}