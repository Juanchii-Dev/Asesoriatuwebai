#!/bin/bash

echo "Aplicando solución simplificada al chatbot..."

# Crear directorios necesarios si no existen
mkdir -p Asesoriatuwebai/tuwebaiext/public/images 2>/dev/null

# Copiar avatar para el chatbot
cp -f websy-image.jpg Asesoriatuwebai/tuwebaiext/public/images/websy-avatar.png 2>/dev/null
cp -f websy-image.jpg Asesoriatuwebai/tuwebaiext/public/images/websy.jpg 2>/dev/null

# Corrección de vite.config.ts 
cat > Asesoriatuwebai/tuwebaiext/vite.config.ts << 'EOL'
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

# Crear chatbot mejorado
cat > Asesoriatuwebai/tuwebaiext/client/src/components/ui/chatbot.tsx << 'EOL'
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import * as FiIcons from "react-icons/fi";
import { useLocation } from 'react-router-dom';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  avatar?: string;
}

// Mapeo de secciones en inglés a español
const SECTION_TRANSLATIONS: Record<string, string> = {
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

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola y bienvenido a TuWeb.ai! 👋\n\nSoy Websy, tu asistente virtual, y estoy aquí para ayudarte a explorar nuestros servicios, resolver tus dudas y brindarte toda la información que necesites para que tu negocio crezca en el entorno digital.\n\n¡Comencemos a transformar tu presencia digital juntos! 🚀\n\nSi necesitas algo más, solo avísame. 😊',
      timestamp: new Date(),
      avatar: '/images/websy-avatar.png'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [lastCommand, setLastCommand] = useState<string | null>(null);
  
  // Obtener la ubicación actual para contexto
  const location = useLocation();

  // Función para traducir IDs de sección al español
  const translateSectionId = (id: string): string => {
    const normalizedId = id.toLowerCase().replace('-section', '');
    return SECTION_TRANSLATIONS[normalizedId] || normalizedId;
  };

  // Función para convertir al español los nombres de las secciones
  const getSpanishSectionNames = (): string[] => {
    const elements = document.querySelectorAll('[id]');
    const sectionIds = Array.from(elements)
      .map(el => el.id)
      .filter(id => id && !id.includes('root'));
    
    return sectionIds.map(id => translateSectionId(id));
  };

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

  // Procesar comandos del chatbot y hacer scroll a secciones
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    
    if (lastMessage?.role === 'assistant' && lastCommand) {
      const sectionMatch = /(?:llevar|scrollear|ir|mostrarte) (?:a|hacia) (?:la sección|la parte|el área|el apartado) (?:de )?([\wáéíóúüñ\s-]+)/i.exec(lastCommand);
      
      if (sectionMatch && sectionMatch[1]) {
        const targetSection = sectionMatch[1].trim().toLowerCase();
        scrollToSection(targetSection);
        setLastCommand(null);
      }
    }
  }, [messages, lastCommand]);

  // Función para hacer scroll a una sección específica
  const scrollToSection = (sectionName: string): boolean => {
    console.log(`Intentando hacer scroll a la sección: ${sectionName}`);
    
    // Limpieza y normalización del nombre
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
    
    // Intentar mapeos de nombres comunes
    const sectionMappings: Record<string, string[]> = {
      'inicio': ['hero', 'hero-section', 'home'],
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
    
    // Buscar el mapeo específico o usar el nombre normalizado
    let targetIds = [normalizedName];
    
    // Añadir mapeos si existen
    Object.entries(sectionMappings).forEach(([key, values]) => {
      if (normalizedName.includes(key) || key.includes(normalizedName)) {
        targetIds = [...targetIds, ...values];
      }
    });
    
    // También probar con el nombre + -section
    targetIds.push(`${normalizedName}-section`);
    
    console.log('Buscando secciones:', targetIds);
    
    // Intentar cada ID posible
    for (const id of targetIds) {
      const element = document.getElementById(id);
      if (element) {
        console.log(`Encontrada sección con ID: ${id}`);
        // Hacemos scroll con un pequeño tiempo de espera para asegurar que funcione
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return true;
      }
    }
    
    // Si no encontramos por ID, buscamos por texto en encabezados
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingsArray = Array.from(headings);
    for (const heading of headingsArray) {
      const text = heading.textContent?.toLowerCase() || '';
      if (text.includes(normalizedName) || normalizedName.includes(text)) {
        console.log(`Encontrado encabezado con texto: ${text}`);
        setTimeout(() => {
          heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return true;
      }
    }
    
    // Si todo falla, intentamos elementos que puedan tener el texto
    const allElements = document.querySelectorAll('*');
    const elementsArray = Array.from(allElements);
    for (const el of elementsArray) {
      if (!el.id) continue; // Ya los procesamos antes
      
      const text = el.textContent?.toLowerCase() || '';
      if ((text.includes(normalizedName) || normalizedName.includes(text)) && 
          text.length < 100 && text.length > 3) {
        console.log(`Encontrado elemento que contiene: ${text}`);
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return true;
      }
    }
    
    console.log(`No se pudo encontrar una sección para: ${sectionName}`);
    return false;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Verificar comandos directos de navegación
    const userInput = inputValue.trim().toLowerCase();
    let isNavigationCommand = false;
    let targetSection = '';

    // Patrones de navegación
    const navigationPatterns = [
      /^(?:llevame|llévame|ir|vamos|andá|mostra|mostrame|muéstrame) (?:a|hacia|hasta) (?:la sección de |la sección |el |la )?([\wáéíóúüñ\s-]+)$/i,
      /^(?:quiero ver|quiero conocer|necesito ver) (?:la sección de |la sección |el |la )?([\wáéíóúüñ\s-]+)$/i,
      /^(?:ir a|vamos a) ([\wáéíóúüñ\s-]+)$/i
    ];

    for (const pattern of navigationPatterns) {
      const match = userInput.match(pattern);
      if (match && match[1]) {
        isNavigationCommand = true;
        targetSection = match[1].trim();
        setLastCommand(`llevar a la sección de ${targetSection}`);
        break;
      }
    }

    // Verificar si pregunta por las secciones
    const isSectionQuery = /^(?:qué|cuáles|cuales|que|dime) (?:secciones|apartados|partes) (?:hay|existen|se ven|tiene|contiene)(?:\?)?$/i.test(userInput) ||
                          /^(?:qué|que) (?:puedo ver|se ve|hay) (?:en la página|en pantalla)(?:\?)?$/i.test(userInput);

    try {
      // Si es una consulta de secciones, responder sin API
      if (isSectionQuery) {
        const sectionsList = getSpanishSectionNames();
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `En este momento, las secciones disponibles en la página son las siguientes:\n\n${sectionsList.map((section, index) => `${index + 1}. **${section}**`).join('\n')}\n\n¿Deseas que te explique alguna de estas secciones o prefieres que te lleve a alguna en particular?`,
            timestamp: new Date(),
            avatar: '/images/websy-avatar.png'
          }]);
          setIsLoading(false);
        }, 1000);
        return;
      }

      // Si es un comando de navegación directo, responder sin API
      if (isNavigationCommand) {
        // Intentar scroll
        scrollToSection(targetSection);
        
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `¡Claro! Te llevaré a la sección de **${targetSection}**. Si necesitas más información sobre lo que puedes encontrar allí, no dudes en preguntarme.`,
            timestamp: new Date(),
            avatar: '/images/websy-avatar.png'
          }]);
          setIsLoading(false);
        }, 1000);
        return;
      }

      // Para otras consultas, usar la API del chatbot
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `Eres Websy, el asistente virtual de TuWeb.ai. Estás respondiendo a un usuario que está navegando por nuestro sitio web.
              
Información de contexto: El usuario está actualmente en la ruta ${location.pathname}

Usa términos en español, no en inglés, cuando hables de las secciones del sitio.`
            },
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
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
        avatar: '/images/websy-avatar.png'
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error al comunicarse con el asistente:', err);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, intenta nuevamente más tarde.',
        timestamp: new Date(),
        avatar: '/images/websy-avatar.png'
      };
      
      setMessages(prev => [...prev, errorMessage]);
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

echo "✓ Correcciones aplicadas para mejorar el chatbot"
echo "✓ Ahora el chatbot detecta secciones y puede navegar entre ellas"
echo "✓ Traducidas las secciones al español"
echo "✓ Añadido avatar en los mensajes del chatbot"
echo "✓ Implementado sistema de sugerencias de comandos"
echo "✓ Añadido soporte para acentos en búsqueda de secciones"