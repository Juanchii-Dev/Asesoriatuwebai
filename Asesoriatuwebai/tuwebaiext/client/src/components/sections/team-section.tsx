import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import AnimatedShape from '../ui/animated-shape';
import TypewriterEffect from 'react-typewriter-effect';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  delay: number;
}

function TeamMember({ name, role, bio, delay }: TeamMemberProps) {
  const { ref, hasIntersected } = useIntersectionObserver();

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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
      className="bg-glass rounded-xl overflow-hidden shadow-xl border border-gray-800"
      initial="hidden"
      animate={hasIntersected ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 204, 255, 0.25)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-1 bg-gradient-to-r from-[#00CCFF] to-[#9933FF]"></div>
      
      <div className="p-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] p-[3px] mx-auto mb-6">
          <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-white text-3xl font-medium">
            {name.charAt(0)}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-center text-white mb-2">{name}</h3>
        <p className="text-center text-[#00CCFF] mb-6">{role}</p>
        
        <div className="text-gray-300 leading-relaxed">
          {bio}
        </div>
        
        <div className="flex justify-center mt-8 space-x-4">
          <a 
            href="#" 
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#00CCFF] hover:text-white transition-colors"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
            </svg>
          </a>
          <a 
            href="#" 
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#9933FF] hover:text-white transition-colors"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a 
            href="#" 
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gradient-to-r from-[#00CCFF] to-[#9933FF] hover:text-white transition-colors"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

interface TeamSectionProps {
  setRef: (ref: HTMLElement | null) => void;
}

export default function TeamSection({ setRef }: TeamSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: titleRef, hasIntersected: titleVisible } = useIntersectionObserver();
  
  // Set the ref for the parent component
  if (sectionRef.current && !sectionRef.current.hasAttribute('data-ref-set')) {
    setRef(sectionRef.current);
    sectionRef.current.setAttribute('data-ref-set', 'true');
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const teamMembers = [
    {
      name: "Alejandro Méndez",
      role: "Fundador & CEO",
      bio: "Emprendedor serial y visionario digital con más de 10 años de experiencia transformando negocios a través de soluciones tecnológicas innovadoras. Impulsa cada proyecto con pasión por la excelencia y resultados tangibles."
    },
    {
      name: "Valeria Torres",
      role: "Directora de Estrategia Digital",
      bio: "Estratega de marketing digital con experiencia internacional. Especialista en desarrollar planes que combinan analítica avanzada con creatividad para generar crecimiento exponencial y presencia de marca memorable."
    },
    {
      name: "Marcos Ruiz",
      role: "Desarrollador Full-Stack Senior",
      bio: "Ingeniero de software con maestría en sistemas interactivos. Experto en arquitecturas escalables y tecnologías emergentes que garantizan soluciones robustas, seguras y con rendimiento excepcional."
    },
    {
      name: "Sofía Vargas",
      role: "Diseñadora UX/UI",
      bio: "Diseñadora premiada con enfoque centrado en el usuario. Transforma conceptos complejos en interfaces intuitivas y atractivas que elevan la experiencia digital y refuerzan la identidad de marca."
    }
  ];

  return (
    <section 
      id="team" 
      ref={sectionRef}
      className="py-24 min-h-screen flex items-center relative overflow-hidden bg-gradient-to-b from-[#0F0F1A] to-[#121217]"
    >
      <AnimatedShape type={1} className="top-[10%] right-[-150px]" delay={1} />
      <AnimatedShape type={2} className="bottom-[10%] left-[-100px]" delay={2} />
      
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
              Nuestro equipo de expertos
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Profesionales apasionados que harán brillar tu presencia digital
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={member.name}
              name={member.name}
              role={member.role}
              bio={member.bio}
              delay={index}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-400 max-w-3xl mx-auto">
            Nuestro equipo multidisciplinario combina experiencia técnica, visión estratégica y creatividad para transformar tu presencia digital. Trabajamos en estrecha colaboración con cada cliente para garantizar soluciones personalizadas que impulsen resultados excepcionales.
          </p>
        </div>
      </div>
    </section>
  );
}