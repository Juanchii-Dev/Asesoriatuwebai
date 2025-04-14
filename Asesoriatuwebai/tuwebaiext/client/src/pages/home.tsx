import { useRef } from 'react';
import NavDots from '@/components/ui/nav-dots';
import HeroSection from '@/components/sections/hero-section';
import PhilosophySection from '@/components/sections/philosophy-section';
import ServicesSection from '@/components/sections/services-section';
import ProcessSection from '@/components/sections/process-section';
import TechSection from '@/components/sections/tech-section';
import ImpactSection from '@/components/sections/impact-section';
import TestimonialsSection from '@/components/sections/testimonials-section';
import TeamSection from '@/components/sections/team-section';
import PricingSection from '@/components/sections/pricing-section';
import CTASection from '@/components/sections/cta-section';
import ContactSection from '@/components/sections/contact-section';
import CompanyLogoSlider from '@/components/ui/company-logo-slider';
import WhatsAppButton from '@/components/ui/whatsapp-button';
import ScrollProgress from '@/components/ui/scroll-progress';

export default function Home() {
  const sections = [
    { id: "intro", label: "Introducción" },
    { id: "philosophy", label: "Filosofía" },
    { id: "services", label: "Servicios" },
    { id: "process", label: "Proceso" },
    { id: "tech", label: "Tecnologías" },
    { id: "impact", label: "Impacto" },
    { id: "testimonials", label: "Testimonios" },
    { id: "team", label: "Equipo" },
    { id: "pricing", label: "Precios" },
    { id: "cta", label: "Acción" },
    { id: "contact", label: "Contacto" }
  ];

  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({
    intro: null,
    philosophy: null,
    services: null,
    process: null,
    tech: null,
    impact: null,
    testimonials: null,
    team: null,
    pricing: null,
    cta: null,
    contact: null
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
        <HeroSection setRef={(ref: HTMLElement | null) => setSectionRef('intro', ref)} />
        <PhilosophySection setRef={(ref: HTMLElement | null) => setSectionRef('philosophy', ref)} />
        <ServicesSection setRef={(ref: HTMLElement | null) => setSectionRef('services', ref)} />
        <ProcessSection setRef={(ref: HTMLElement | null) => setSectionRef('process', ref)} />
        <TechSection setRef={(ref: HTMLElement | null) => setSectionRef('tech', ref)} />
        
        {/* Slider de logos de empresas antes de la sección de impacto */}
        <CompanyLogoSlider className="py-20 bg-gray-900 bg-opacity-30" />
        
        <ImpactSection setRef={(ref: HTMLElement | null) => setSectionRef('impact', ref)} />
        <TestimonialsSection setRef={(ref: HTMLElement | null) => setSectionRef('testimonials', ref)} />
        <TeamSection setRef={(ref: HTMLElement | null) => setSectionRef('team', ref)} />
        <PricingSection setRef={(ref: HTMLElement | null) => setSectionRef('pricing', ref)} />
        <CTASection setRef={(ref: HTMLElement | null) => setSectionRef('cta', ref)} />
        <ContactSection setRef={(ref: HTMLElement | null) => setSectionRef('contact', ref)} />
      </main>
    </>
  );
}