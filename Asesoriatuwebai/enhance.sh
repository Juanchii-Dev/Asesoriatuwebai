#!/bin/bash

# Script para mejorar el chatbot con todas las funcionalidades solicitadas
echo "Iniciando proceso de mejora del chatbot..."

# Crear directorios necesarios
mkdir -p tuwebaiext/public/images 2>/dev/null

# Copiar avatar para el chatbot
cp -f websy-image.jpg tuwebaiext/public/images/websy-avatar.png 2>/dev/null
cp -f websy-image.jpg tuwebaiext/public/images/websy.jpg 2>/dev/null

# Instalación de dependencias necesarias
cd tuwebaiext
echo "Instalando dependencias adicionales..."
npm install --save zustand framer-motion ws @types/ws

# Creando el archivo para el store del chatbot
echo "Creando context store para el chatbot..."
cat > client/src/hooks/use-chatbot-store.ts << 'EOL'
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
EOL

# Creando el archivo chatbot mejorado
echo "Creando componente de chatbot mejorado..."
cat > client/src/components/ui/chatbot.tsx << 'EOL'
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import * as FiIcons from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import { useChatbotStore, scrollToSection, SECTION_TRANSLATIONS } from '@/hooks/use-chatbot-store';

export default function Chatbot() {
  // Estado del chatbot usando Zustand
  const { 
    isOpen, messages, inputValue, isLoading, userPreferences,
    setIsOpen, addMessage, setInputValue, setIsLoading
  } = useChatbotStore();
  
  // Referencias para elementos DOM
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Obtener la ubicación actual para contexto
  const location = useLocation();
  
  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  // Detectar contexto de la página
  useEffect(() => {
    const detectContext = () => {
      // Obtener todas las secciones visibles
      const sections = Array.from(document.querySelectorAll('[id]'))
        .filter(el => {
          const rect = el.getBoundingClientRect();
          return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
          );
        })
        .map(el => ({
          id: el.id,
          element: el
        }));
      
      console.log('Secciones visibles:', sections.map(s => s.id).join(', '));
    };
    
    // Ejecutar detección inicial
    detectContext();
    
    // Configurar detección en scroll
    window.addEventListener('scroll', detectContext);
    return () => window.removeEventListener('scroll', detectContext);
  }, [location.pathname]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage = {
      role: 'user' as const,
      content: inputValue.trim(),
    };
    
    setInputValue('');
    setIsLoading(true);
    
    // Agregar mensaje del usuario
    addMessage(userMessage);
    
    const userInput = userMessage.content.toLowerCase();
    
    // Verificar comandos directos para navegación
    let isNavigationCommand = false;
    const navigationPatterns = [
      /^(?:ir|vamos|llévame|mostrar|llevame) (?:a|hacia|hasta|al) (?:la sección de |la sección |el |la )?([\wáéíóúüñ\s-]+)$/i,
      /^(?:mostrame|muéstrame|dame|déjame ver) (?:la sección de |la sección |el |la )?([\wáéíóúüñ\s-]+)$/i
    ];
    
    for (const pattern of navigationPatterns) {
      const match = userInput.match(pattern);
      if (match && match[1]) {
        const targetSection = match[1].trim();
        isNavigationCommand = scrollToSection(targetSection);
        break;
      }
    }
    
    // Verificar si pregunta por las secciones
    const isSectionQuery = /(?:qué|cuales|que|cuáles|dime) (?:secciones|apartados|partes) (?:hay|existen|se ven|tienen|están disponibles)(?:\?)?/i.test(userInput) ||
                          /(?:qué|que) (?:puedo ver|se ve|hay) (?:en la página|en pantalla)(?:\?)?/i.test(userInput);
    
    try {
      // Obtener todas las secciones disponibles para generar contexto
      const availableSections = Array.from(document.querySelectorAll('[id]'))
        .map(el => el.id)
        .filter(id => id && !id.includes('root'))
        .map(id => {
          const baseName = id.replace('-section', '');
          return SECTION_TRANSLATIONS[baseName] || baseName;
        });
      
      // Añadir mensajes especiales para comandos específicos
      if (isSectionQuery) {
        setTimeout(() => {
          addMessage({
            role: 'assistant',
            content: `En este momento, las secciones disponibles en la página son las siguientes:\n\n${availableSections.map((section, index) => `${index + 1}. **${section}**`).join('\n')}\n\n¿Deseas que te explique alguna de estas secciones o prefieres que te lleve a alguna en particular?`,
            avatar: '/images/websy-avatar.png',
          });
          setIsLoading(false);
        }, 1000);
        return;
      }
      
      if (isNavigationCommand) {
        setTimeout(() => {
          addMessage({
            role: 'assistant',
            content: `¡Claro! Te llevaré a la sección solicitada. Si necesitas más información sobre lo que puedes encontrar allí, no dudes en preguntarme.`,
            avatar: '/images/websy-avatar.png',
          });
          setIsLoading(false);
        }, 1000);
        return;
      }
      
      // Enviar mensaje al API del chatbot
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages.filter(msg => msg.role !== 'system').map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: userInput
            }
          ],
        }),
      });
      
      if (!response.ok) {
        throw new Error('Error en la comunicación con el asistente');
      }
      
      const data = await response.json();
      
      // Agregar mensaje del asistente
      addMessage({
        role: 'assistant',
        content: data.message,
        avatar: '/images/websy-avatar.png',
      });
    } catch (err) {
      console.error('Error al comunicarse con el asistente:', err);
      
      addMessage({
        role: 'assistant',
        content: 'Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, intenta nuevamente más tarde.',
        avatar: '/images/websy-avatar.png',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const adjustTextareaHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
  };

  return (
    <>
      {/* Chat button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed left-6 bottom-6 w-12 h-12 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full flex items-center justify-center shadow-lg z-50 overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img src="/images/websy-avatar.png" alt="Websy" className="w-full h-full object-cover" />
      </motion.button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed left-6 bottom-24 w-80 md:w-96 h-[500px] max-h-[80vh] bg-[#121217] border border-[#2a2a35] rounded-xl overflow-hidden shadow-2xl z-50 flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#00CCFF]/20 to-[#9933FF]/20 px-4 py-3 flex justify-between items-center border-b border-[#2a2a35]">
              <div className="flex items-center">
                <div className="rounded-full w-8 h-8 mr-2 overflow-hidden">
                  <img src="/images/websy-avatar.png" alt="Websy" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white font-medium">Websy - Asistente Virtual</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <div className="text-xl">
                  <FiIcons.FiX />
                </div>
              </button>
            </div>
            
            {/* Messages container */}
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-4 relative">
              {messages.filter(msg => msg.role !== 'system').map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "max-w-[85%] p-3 rounded-2xl",
                    message.role === 'user' 
                      ? "bg-[#9933FF]/20 ml-auto rounded-tr-none" 
                      : "bg-[#2a2a35] mr-auto rounded-tl-none"
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden mr-2 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex-shrink-0 shadow">
                        <img 
                          src="/images/websy-avatar.png" 
                          alt="Websy" 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = '/images/websy.jpg';
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-300 font-medium">Websy</span>
                    </div>
                  )}
                  <p className="text-white text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#2a2a35] p-3 rounded-2xl rounded-tl-none max-w-[85%] mr-auto"
                >
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden mr-2 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex-shrink-0 shadow">
                      <img 
                        src="/images/websy-avatar.png" 
                        alt="Websy" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/images/websy.jpg';
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-300 font-medium">Websy</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-[#00CCFF] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-[#00CCFF] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-[#00CCFF] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input area */}
            <form onSubmit={handleSubmit} className="p-3 bg-[#1a1a23] border-t border-[#2a2a35]">
              <div className="flex items-end gap-2">
                <div className="relative flex-1">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      adjustTextareaHeight(e);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe tu mensaje..."
                    className="w-full bg-[#252530] border border-[#3a3a45] rounded-xl py-2 pl-3 pr-10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#00CCFF] resize-none min-h-[40px] max-h-[100px]"
                    rows={1}
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className={cn(
                    "p-2 rounded-xl text-white",
                    inputValue.trim() && !isLoading
                      ? "bg-gradient-to-r from-[#00CCFF] to-[#9933FF]"
                      : "bg-[#3a3a45] opacity-50"
                  )}
                >
                  <div className="text-lg">
                    <FiIcons.FiSend />
                  </div>
                </button>
              </div>
              
              {/* Command suggestions */}
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  onClick={() => setInputValue("Muéstrame los servicios")}
                  className="px-2 py-1 text-xs bg-[#2a2a35] rounded-full hover:bg-[#3a3a45] text-gray-300 transition-colors"
                >
                  Mostrar servicios
                </button>
                <button
                  onClick={() => setInputValue("Llévame a la sección de contacto")}
                  className="px-2 py-1 text-xs bg-[#2a2a35] rounded-full hover:bg-[#3a3a45] text-gray-300 transition-colors"
                >
                  Ir a contacto
                </button>
                <button
                  onClick={() => setInputValue("¿Qué secciones hay disponibles?")}
                  className="px-2 py-1 text-xs bg-[#2a2a35] rounded-full hover:bg-[#3a3a45] text-gray-300 transition-colors"
                >
                  Ver secciones
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
EOL

# Crear archivo mejorado del servidor chatbot
echo "Creando servidor de chatbot mejorado..."
cat > server/enhanced-chatbot.ts << 'EOL'
import { Request, Response } from 'express';
import OpenAI from 'openai';

// El modelo más reciente es "gpt-4o" que fue lanzado el 13 de mayo de 2024. No lo cambies a menos que el usuario te lo pida explícitamente
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface SentimentAnalysisResult {
  type: 'positive' | 'negative' | 'neutral';
  score: number;
  confidence: number;
}

/**
 * Manejador mejorado del chatbot con funcionalidades adicionales
 */
export async function enhancedChatbotHandler(req: Request, res: Response) {
  try {
    const { messages, context } = req.body;
    
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Se requiere un array de mensajes válido' });
    }

    // Contexto del sistema para el comportamiento del asistente
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `Contexto: Eres Websy, un asistente virtual altamente profesional y eficiente de TuWeb.ai. Tu propósito es asistir a los usuarios de manera fluida, clara, concisa y profesional. Proporcionas respuestas detalladas y estructuradas, adaptadas a las necesidades de cada usuario. Siempre debes ser accesible y claro, manteniendo el tono profesional y confiable que refleja la imagen de la empresa.

Instrucciones Generales:

1. Tono Profesional y Amigable:
- Responde de manera formal pero accesible, transmitiendo confianza y autoridad.
- Utiliza frases claras, simples y bien estructuradas.
- Emplea negritas para resaltar puntos clave y organiza la información con listas numeradas o con viñetas cuando sea apropiado.
- Sé claro y directo, pero también empático. Si el usuario no está seguro de lo que necesita, ofrécele ayuda para aclarar sus necesidades.

2. Conocimiento y Respuestas:
- Proporciona información precisa sobre los servicios de TuWeb.ai.
- Responde preguntas sobre desarrollo web, marketing digital, SEO, contenido de calidad y otros servicios.
- Ofrece ideas y consejos prácticos que demuestren tu experiencia en el campo digital.
- Siempre mantén el foco en el valor que TuWeb.ai puede aportar a los clientes.

3. Navegación y Asistencia:
- Ayuda a los usuarios a navegar por la página web.
- Ofrece guiar a los usuarios a secciones específicas según sus necesidades.
- Sugiere secciones relevantes basándote en sus consultas.
- Explica claramente los servicios y metodologías de TuWeb.ai.

4. Atención al Cliente:
- Responde a preguntas sobre precios, plazos y procesos de contratación.
- Ofrece opciones para contactar con el equipo humano cuando sea necesario.
- Gestiona objeciones con empatía y soluciones claras.
- Da seguimiento a las consultas anteriores para mantener la continuidad de la conversación.

5. Límites y Derivación:
- Si una consulta está fuera de tu capacidad, sugiere contactar directamente con el equipo a través del formulario de contacto o WhatsApp.
- Para consultas muy específicas o técnicas, recomienda una llamada o reunión con un especialista.
- No proporciones información confidencial sobre clientes o precios exactos sin autorización.
- Si el cliente se muestra frustrado, ofrece disculpas y la opción de contactar a una persona real.

Información Clave sobre TuWeb.ai:
- La empresa ofrece servicios en desarrollo web, marketing digital, SEO, UX/UI, consultoría estratégica, CRO, automatización de marketing.
- El proceso de trabajo es: análisis, estrategia, implementación, medición y optimización.
- Se enfoca en resultados medibles y crecimiento sostenible.
- Valores: profesionalidad, innovación, transparencia, resultados y compromiso.

${context ? `Información contextual adicional:
${context}` : ''}

Recuerda que cada interacción es una oportunidad para demostrar el valor y la calidad de TuWeb.ai. Tu objetivo es no solo responder preguntas, sino también entusiasmar y generar confianza en los servicios que ofrecemos.`
    };

    // Procesar contexto adicional si existe
    let enhancedSystemMessage = systemMessage;
    if (context) {
      enhancedSystemMessage = {
        ...systemMessage,
        content: `${systemMessage.content}\n\nContexto específico de esta conversación: ${JSON.stringify(context)}`
      };
    }

    // Completar la conversación con OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Usamos el modelo más avanzado para el chatbot mejorado
      messages: [enhancedSystemMessage, ...messages],
      max_tokens: 700, // Permitimos respuestas más largas para el chatbot mejorado
      temperature: 0.7,
    });

    // Extraer la respuesta
    const reply = completion.choices[0].message.content || 'Lo siento, no pude procesar tu consulta en este momento.';

    return res.status(200).json({ message: reply });
  } catch (error: any) {
    console.error('Error en el chatbot mejorado:', error);
    return res.status(500).json({ 
      error: 'Error al procesar la solicitud del chatbot',
      details: error.message
    });
  }
}

/**
 * Analiza el sentimiento de un texto usando reglas simples
 */
export async function analyzeSentiment(req: Request, res: Response) {
  try {
    const { text } = req.body;
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Se requiere un texto válido para el análisis' });
    }

    const lowerText = text.toLowerCase();
    
    // Lista básica de palabras para análisis simple
    const positiveWords = [
      'gracias', 'excelente', 'genial', 'bueno', 'fantástico', 'increíble',
      'satisfecho', 'feliz', 'útil', 'ayuda', 'perfecto', 'claro', 'fácil'
    ];
    
    const negativeWords = [
      'malo', 'terrible', 'problema', 'error', 'difícil', 'confuso',
      'incompleto', 'tardanza', 'peor', 'horrible', 'molesto', 'enojado', 'frustrado'
    ];
    
    // Contar coincidencias
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
      if (lowerText.includes(word)) positiveCount++;
    });
    
    negativeWords.forEach(word => {
      if (lowerText.includes(word)) negativeCount++;
    });
    
    // Determinar el sentimiento
    let type: 'positive' | 'negative' | 'neutral';
    let score: number;
    
    if (positiveCount > negativeCount) {
      type = 'positive';
      score = Math.min(1, positiveCount * 0.2);
    } else if (negativeCount > positiveCount) {
      type = 'negative';
      score = Math.min(1, negativeCount * 0.2);
    } else {
      type = 'neutral';
      score = 0.5;
    }
    
    // Calcular confianza basada en la diferencia entre positivos y negativos
    const confidence = Math.min(1, Math.abs(positiveCount - negativeCount) * 0.2);
    
    return res.status(200).json({
      type,
      score,
      confidence
    });
  } catch (error: any) {
    console.error('Error en el análisis de sentimiento:', error);
    return res.status(500).json({ 
      error: 'Error al analizar el sentimiento',
      details: error.message
    });
  }
}
EOL

# Actualizando las rutas para las nuevas funcionalidades
echo "Actualizando rutas para las nuevas funcionalidades..."
cat > server/routes.enhanced.ts << 'EOL'
import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatbotHandler } from "./chatbot";
import { enhancedChatbotHandler, analyzeSentiment } from "./enhanced-chatbot";

export async function registerRoutes(app: Express): Promise<Server> {
  // Rutas de la API
  app.post('/api/chatbot', chatbotHandler);
  
  // Rutas para el chatbot mejorado
  app.post('/api/enhanced-chatbot', enhancedChatbotHandler);
  app.post('/api/analyze-sentiment', analyzeSentiment);
  
  // Route para verificar el estado de la API
  app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      features: {
        chatbot: true,
        enhancedChatbot: true,
        sentimentAnalysis: true
      }
    });
  });

  // Ruta para obtener información básica de la aplicación
  app.get('/api/info', (req: Request, res: Response) => {
    res.status(200).json({
      name: 'Asesoría Tu Web AI',
      version: '2.0.0',
      environment: process.env.NODE_ENV || 'development',
      services: [
        'Desarrollo Web Profesional',
        'Marketing Digital y SEO',
        'Consultoría Estratégica',
        'Optimización de Conversión (CRO)',
        'Automatización de Marketing',
        'UX/UI Design'
      ],
      aiCapabilities: {
        openai: process.env.OPENAI_API_KEY ? true : false
      }
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
EOL

# Actualizar vite.config.ts para corregir el problema con await
echo "Actualizando configuración de Vite..."
cat > vite.config.ts << 'EOL'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Función auxiliar para cargar plugins dinámicamente
function loadCartographerPlugin() {
  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
    return import("@replit/vite-plugin-cartographer")
      .then((m) => [m.cartographer()])
      .catch(() => []);
  }
  return Promise.resolve([]);
}

// Configuración asíncrona en una función autoejecutable
export default defineConfig(async () => {
  const extraPlugins = await loadCartographerPlugin();

  return {
    plugins: [
      react(),
      runtimeErrorOverlay(),
      themePlugin(),
      ...extraPlugins,
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
    },
  };
});
EOL

echo "Actualizando el package.json para que incluya las dependencias necesarias..."
cat > package.json << 'EOL'
{
  "name": "rest-express",
  "version": "1.0.0",
  "license": "MIT",
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "npm run generate && tsc && vite build",
    "db:push": "drizzle-kit push:pg",
    "db:studio": "drizzle-kit studio",
    "start": "NODE_ENV=production node dist/server/index.js",
    "generate": "drizzle-kit generate:pg"
  },
  "dependencies": {
    "@types/express-session": "^1.17.10",
    "@types/ws": "^8.5.10",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "drizzle-orm": "^0.29.3",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "framer-motion": "^10.17.12",
    "openai": "^4.20.1",
    "postgres": "^3.4.3",
    "react-spring": "^9.7.3",
    "ws": "^8.16.0",
    "zustand": "^4.4.7",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.4",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "drizzle-kit": "^0.20.9",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "tsx": "^4.6.2",
    "typescript": "^5.3.3",
    "vite": "^5.0.7"
  }
}
EOL

echo "Todas las mejoras han sido implementadas. La aplicación está lista para reiniciar."

cd ..
echo "✓ Reemplazado el componente chatbot con una versión mejorada"
echo "✓ Implementadas traducciones de secciones de inglés a español"
echo "✓ Mejorado el avatar para siempre mostrarse en la sección de mensajes"
echo "✓ Optimizado el algoritmo de búsqueda de secciones con métodos de respaldo"
echo "✓ Añadida compatibilidad con acentos y caracteres especiales del español"
echo "✓ Implementado sistema de sugerencias de comandos"