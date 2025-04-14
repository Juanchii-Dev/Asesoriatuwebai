import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  sentiment?: {
    type: 'positive' | 'negative' | 'neutral';
    score: number;
  };
  avatar?: string;
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  fontSize: 'small' | 'medium' | 'large';
  notificationsEnabled: boolean;
  voiceEnabled: boolean;
  language: 'es' | 'en';
  expansionMode: 'minimal' | 'expanded' | 'fullscreen';
  position: 'left' | 'right';
}

export interface ChatContextState {
  // Estado general
  isOpen: boolean;
  messages: ChatMessage[];
  inputValue: string;
  isLoading: boolean;
  sessionId: string;
  conversationHistory: Record<string, ChatMessage[]>;
  
  // Preferencias del usuario
  userPreferences: UserPreferences;

  // Estado de la navegación
  currentPage: string;
  visibleSections: string[];
  currentSection: string | null;
  
  // Acciones
  setIsOpen: (isOpen: boolean) => void;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  setInputValue: (value: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
  setCurrentPage: (page: string) => void;
  setVisibleSections: (sections: string[]) => void;
  setCurrentSection: (section: string | null) => void;
  startNewSession: () => void;
  saveCurrentSession: () => void;
  loadSession: (sessionId: string) => void;
}

// Traducciones de secciones
export const SECTION_TRANSLATIONS: Record<string, string> = {
  'hero': 'Inicio',
  'hero-section': 'Inicio',
  'services': 'Servicios',
  'services-section': 'Servicios',
  'pricing': 'Precios',
  'pricing-section': 'Precios',
  'contact': 'Contacto',
  'contact-section': 'Contacto',
  'process': 'Proceso',
  'process-section': 'Proceso',
  'team': 'Equipo',
  'team-section': 'Equipo',
  'testimonials': 'Testimonios',
  'testimonials-section': 'Testimonios',
  'impact': 'Impacto',
  'impact-section': 'Impacto',
  'tech': 'Tecnologías',
  'tech-section': 'Tecnologías',
  'philosophy': 'Filosofía',
  'philosophy-section': 'Filosofía',
  'about': 'Nosotros',
  'about-section': 'Nosotros',
  'cta': 'Llamada a la acción',
  'cta-section': 'Llamada a la acción'
};

export const useChatbotStore = create<ChatContextState>()(
  persist(
    (set, get) => ({
      // Estado inicial general
      isOpen: false,
      messages: [
        {
          id: '1',
          role: 'assistant',
          content: '¡Hola y bienvenido a TuWeb.ai! 👋\n\nSoy Websy, tu asistente virtual, y estoy aquí para ayudarte a explorar nuestros servicios, resolver tus dudas y brindarte toda la información que necesites para que tu negocio crezca en el entorno digital.\n\n¡Comencemos a transformar tu presencia digital juntos! 🚀\n\nSi necesitas algo más, solo avísame. 😊',
          timestamp: new Date(),
          avatar: '/images/websy-avatar.png',
          sentiment: { type: 'positive', score: 0.9 }
        }
      ],
      inputValue: '',
      isLoading: false,
      sessionId: `session-${Date.now()}`,
      conversationHistory: {},
      
      // Preferencias iniciales del usuario
      userPreferences: {
        theme: 'dark',
        fontSize: 'medium',
        notificationsEnabled: true,
        voiceEnabled: false,
        language: 'es',
        expansionMode: 'minimal',
        position: 'left'
      },
      
      // Estado inicial de navegación
      currentPage: '/',
      visibleSections: [],
      currentSection: null,
      
      // Acciones
      setIsOpen: (isOpen) => set({ isOpen }),
      
      addMessage: (message) => set((state) => ({
        messages: [
          ...state.messages,
          {
            ...message,
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            timestamp: new Date()
          }
        ]
      })),
      
      clearMessages: () => set((state) => ({
        messages: [state.messages[0]] // Mantener solo el mensaje de bienvenida
      })),
      
      setInputValue: (inputValue) => set({ inputValue }),
      
      setIsLoading: (isLoading) => set({ isLoading }),
      
      updateUserPreferences: (preferences) => set((state) => ({
        userPreferences: { ...state.userPreferences, ...preferences }
      })),
      
      setCurrentPage: (currentPage) => set({ currentPage }),
      
      setVisibleSections: (visibleSections) => set({ visibleSections }),
      
      setCurrentSection: (currentSection) => set({ currentSection }),
      
      startNewSession: () => {
        const currentMessages = get().messages;
        const currentSessionId = get().sessionId;
        
        // Guardar sesión actual
        set((state) => ({
          conversationHistory: {
            ...state.conversationHistory,
            [currentSessionId]: currentMessages
          }
        }));
        
        // Iniciar nueva sesión
        const newSessionId = `session-${Date.now()}`;
        set({
          sessionId: newSessionId,
          messages: [get().messages[0]] // Mantener solo el mensaje de bienvenida
        });
      },
      
      saveCurrentSession: () => {
        const currentMessages = get().messages;
        const currentSessionId = get().sessionId;
        
        set((state) => ({
          conversationHistory: {
            ...state.conversationHistory,
            [currentSessionId]: currentMessages
          }
        }));
      },
      
      loadSession: (sessionId) => {
        const history = get().conversationHistory;
        if (history[sessionId]) {
          set({
            sessionId,
            messages: history[sessionId]
          });
        }
      }
    }),
    {
      name: 'chatbot-storage',
      partialize: (state) => ({
        messages: state.messages,
        conversationHistory: state.conversationHistory,
        userPreferences: state.userPreferences,
        sessionId: state.sessionId
      }),
    }
  )
);

// Funciones de navegación
export function scrollToSection(sectionName: string): boolean {
  // Limpiar y normalizar el nombre de sección
  const normalizedName = sectionName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n');
  
  // Mapeo de nombres comunes en español a posibles IDs en inglés
  const sectionMappings: Record<string, string[]> = {
    'inicio': ['hero', 'hero-section', 'home', 'intro'],
    'servicios': ['services', 'services-section', 'our-services'],
    'nosotros': ['about', 'about-section', 'about-us'],
    'contacto': ['contact', 'contact-section', 'contact-us'],
    'precios': ['pricing', 'pricing-section', 'prices'],
    'proceso': ['process', 'process-section', 'our-process'],
    'equipo': ['team', 'team-section', 'our-team'],
    'testimonios': ['testimonials', 'testimonials-section'],
    'impacto': ['impact', 'impact-section'],
    'tecnologias': ['tech', 'tech-section', 'technologies'],
    'filosofia': ['philosophy', 'philosophy-section']
  };
  
  // Buscar el mapeo o usar el nombre normalizado
  let targetIds = [normalizedName];
  
  // Añadir mapeos si existen
  Object.entries(sectionMappings).forEach(([key, values]) => {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      targetIds = [...targetIds, ...values];
    }
  });
  
  // También probar con variaciones comunes
  targetIds.push(`${normalizedName}-section`);
  targetIds.push(`section-${normalizedName}`);
  
  console.log('Buscando secciones:', targetIds);
  
  // Intentar cada ID posible
  for (const id of targetIds) {
    const element = document.getElementById(id);
    if (element) {
      console.log(`Encontrada sección con ID: ${id}`);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
  }
  
  // Si no encontramos por ID, buscar por texto en encabezados
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const headingsArray = Array.from(headings);
  for (const heading of headingsArray) {
    const text = heading.textContent?.toLowerCase() || '';
    if (text.includes(normalizedName) || normalizedName.includes(text)) {
      console.log(`Encontrado encabezado con texto: ${text}`);
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
  }
  
  console.log(`No se encontró una sección para: ${sectionName}`);
  return false;
}
