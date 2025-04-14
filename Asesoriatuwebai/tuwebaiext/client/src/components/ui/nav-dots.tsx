import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface Section {
  id: string;
  label: string;
}

interface NavDotsProps {
  sections: Section[];
}

export default function NavDots({ sections }: NavDotsProps) {
  const [activeSection, setActiveSection] = useState('intro');
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;

        const { offsetTop, offsetHeight } = element;
        
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Determine position based on screen size
  const navPosition = isMobile
    ? "fixed right-2 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3 p-2"
    : "fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-5 p-2";

  // Mobile styles have smaller dots and different spacing
  const dotSize = isMobile ? "h-2.5 w-2.5" : "h-3 w-3";
  const labelPosition = isMobile ? "right-full mr-1.5" : "right-full mr-2";

  return (
    <nav className={navPosition}>
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="relative flex items-center group"
          aria-label={`Navigate to ${section.label} section`}
        >
          <motion.div
            className={`${dotSize} rounded-full transition-all duration-300 hover:bg-[#9933FF] ${
              activeSection === section.id 
                ? 'bg-[#00CCFF] glow' 
                : 'bg-gray-500'
            }`}
            whileHover={{ scale: isMobile ? 1.2 : 1.5 }}
            animate={{ 
              scale: activeSection === section.id ? (isMobile ? 1.2 : 1.5) : 1
            }}
          />
          {/* Adjust label for mobile */}
          <span className={`opacity-0 group-hover:opacity-100 absolute ${labelPosition} text-white ${isMobile ? 'text-xs' : 'text-sm'} whitespace-nowrap transition-opacity duration-300`}>
            {section.label}
          </span>
        </a>
      ))}
    </nav>
  );
}
