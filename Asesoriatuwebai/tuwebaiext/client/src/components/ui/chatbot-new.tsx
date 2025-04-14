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
}

interface VisibleSection {
  id: string;
  visible: boolean;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola y bienvenido a TuWeb.ai! 👋\n\nSoy Websy, tu asistente virtual, y estoy aquí para ayudarte a explorar nuestros servicios, resolver tus dudas y brindarte toda la información que necesites para que tu negocio crezca en el entorno digital.\n\n¡Comencemos a transformar tu presencia digital juntos! 🚀\n\nSi necesitas algo más, solo avísame. 😊',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [visibleSections, setVisibleSections] = useState<VisibleSection[]>([]);
  const [lastProcessedMessage, setLastProcessedMessage] = useState<string | null>(null);

  // Actualizar la ruta cuando cambia la ubicación
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  // Configurar IntersectionObserver para detectar secciones visibles
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const updatedSections = [...visibleSections];
      let firstVisibleSection: string | null = null;

      entries.forEach(entry => {
        const id = entry.target.id;
        const existingIndex = updatedSections.findIndex(section => section.id === id);
        
        if (existingIndex !== -1) {
          updatedSections[existingIndex].visible = entry.isIntersecting;
        } else if (id) { // Solo agregar si tiene ID
          updatedSections.push({ id, visible: entry.isIntersecting });
        }

        // Encontrar la primera sección visible
        if (entry.isIntersecting && !firstVisibleSection && id) {
          firstVisibleSection = id;
        }
      });

      setVisibleSections(updatedSections);
      if (firstVisibleSection) {
        setCurrentSection(firstVisibleSection);
      }
    };

    // Observador con margen para detectar cuando la sección está casi visible
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.15, // 15% de la sección debe ser visible
      rootMargin: "0px"
    });

    // Observar todos los elementos con ID
    const elements = document.querySelectorAll('[id]');
    elements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      elements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  // Detectar comandos de navegación y acciones en las respuestas del asistente
  useEffect(() => {
    const handleAssistantResponse = async (content: string) => {
      if (content === lastProcessedMessage) return; // Evitar procesar el mismo mensaje múltiples veces
      setLastProcessedMessage(content);

      // Buscar patrones como "vamos a [sección]" o "mostrarte [sección]"
      const navigationPatterns = [
        /(?:ir|andá|vamos|bajá|vayamos|mostrar|llevarte) (?:a|hacia|hasta) (?:la sección de |la sección |el |la )?([a-zA-Z0-9_-]+)/i,
        /(?:mostrame|muéstrame|dame|déjame ver) (?:la sección de |la sección |el |la )?([a-zA-Z0-9_-]+)/i
      ];

      for (const pattern of navigationPatterns) {
        const match = content.match(pattern);
        if (match && match[1]) {
          const targetSection = match[1].toLowerCase().trim();
          scrollToSection(targetSection);
          break;
        }
      }
    };

    // Procesar la respuesta más reciente del asistente
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant') {
      handleAssistantResponse(lastMessage.content);
    }
  }, [messages, lastProcessedMessage]);

  // Función para realizar scroll a una sección específica
  const scrollToSection = (sectionName: string) => {
    console.log(`Intentando hacer scroll a la sección: ${sectionName}`);
    
    // Limpiar y normalizar el nombre de la sección
    const normalizedSectionName = sectionName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/á/g, 'a')
      .replace(/é/g, 'e')
      .replace(/í/g, 'i')
      .replace(/ó/g, 'o')
      .replace(/ú/g, 'u')
      .replace(/ñ/g, 'n');
    
    // Mapeo de términos comunes a IDs específicos (agregar según necesidad)
    const commonTermMappings: Record<string, string[]> = {
      'servicios': ['services-section', 'services', 'servicios', 'servicios-section', 'service-section'],
      'contacto': ['contact-section', 'contact', 'contacto', 'contacto-section'],
      'nosotros': ['about-section', 'about', 'about-us', 'nosotros', 'nosotros-section'],
      'precios': ['pricing-section', 'pricing', 'precios', 'precios-section'],
      'inicio': ['hero-section', 'hero', 'home', 'inicio', 'inicio-section'],
      'proceso': ['process-section', 'process', 'proceso', 'proceso-section'],
      'testimonios': ['testimonials-section', 'testimonials', 'testimonios', 'testimonios-section'],
      'equipo': ['team-section', 'team', 'equipo', 'equipo-section'],
      'tecnologias': ['tech-section', 'technologies', 'tecnologias', 'tecnologias-section'],
      'proyectos': ['projects-section', 'projects', 'proyectos', 'proyectos-section'],
      'clientes': ['clients-section', 'clients', 'clientes', 'clientes-section']
    };
    
    // Lista de posibles IDs basados en nombres comunes de secciones
    let possibleIds = [
      normalizedSectionName,
      `${normalizedSectionName}-section`,
      `section-${normalizedSectionName}`,
    ];
    
    // Agregar mapeos específicos si existen
    for (const [term, mappings] of Object.entries(commonTermMappings)) {
      if (normalizedSectionName.includes(term)) {
        possibleIds = [...possibleIds, ...mappings];
      }
    }
    
    console.log('Posibles IDs a buscar:', possibleIds);

    // Buscar todos los elementos con ID en la página
    const allElements = document.querySelectorAll('[id]');
    let foundElement = null;

    // Primero intentar con los IDs exactos
    for (const id of possibleIds) {
      foundElement = document.getElementById(id);
      if (foundElement) {
        console.log(`Encontrado elemento con ID: ${id}`);
        break;
      }
    }

    // Si no se encuentra, buscar IDs que contengan el nombre de la sección
    if (!foundElement) {
      allElements.forEach(element => {
        const elementId = element.id.toLowerCase();
        
        // Verificar si alguno de los términos clave está en el ID
        let isMatch = elementId.includes(normalizedSectionName);
        
        // También verificar si algún término mapeado está en el ID
        for (const term of Object.keys(commonTermMappings)) {
          if (normalizedSectionName.includes(term) && elementId.includes(term)) {
            isMatch = true;
            break;
          }
        }
        
        if (isMatch) {
          foundElement = element;
          console.log(`Encontrado elemento parcial con ID: ${elementId}`);
          return;
        }
      });
    }

    // Si se encontró un elemento, hacer scroll
    if (foundElement) {
      console.log('Haciendo scroll a:', foundElement.id);
      foundElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    } else {
      console.log(`No se encontró ninguna sección con el nombre: ${sectionName}`);
      
      // Última alternativa: buscar cualquier encabezado que contenga el texto
      const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      for (const header of headers) {
        if (header.textContent?.toLowerCase().includes(normalizedSectionName)) {
          console.log('Encontrado encabezado que contiene el texto:', header.textContent);
          header.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
      }
      
      return false;
    }
  };

  // Obtener información sobre las secciones visibles
  const getVisibleSectionsInfo = () => {
    // Obtener todos los elementos con ID en la página
    const allSections = Array.from(document.querySelectorAll('[id]'))
      .filter(element => element.id)
      .map(element => {
        const rect = element.getBoundingClientRect();
        const isInViewport = 
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth);

        return {
          id: element.id,
          visible: isInViewport,
          element
        };
      });

    const visibleOnes = allSections.filter(section => section.visible);
    return {
      all: allSections.map(s => s.id),
      visible: visibleOnes.map(s => s.id),
      current: visibleOnes.length > 0 ? visibleOnes[0].id : null
    };
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
    
    try {
      // Verificar si hay comandos directos del usuario para navegación
      const userInput = inputValue.trim().toLowerCase();
      let wasNavigationCommand = false;

      // Patrones de comando de navegación directa
      const directNavigationPatterns = [
        /^(?:ir|andá|vamos|bajá|vayamos|mostrar|llevame) (?:a|hacia|hasta) (?:la sección de |la sección |el |la )?([a-zA-Z0-9_-]+)$/i,
        /^(?:mostrame|muéstrame|dame|déjame ver) (?:la sección de |la sección |el |la )?([a-zA-Z0-9_-]+)$/i
      ];

      for (const pattern of directNavigationPatterns) {
        const match = userInput.match(pattern);
        if (match && match[1]) {
          const targetSection = match[1].toLowerCase().trim();
          wasNavigationCommand = scrollToSection(targetSection);
          break;
        }
      }

      // Comando para mostrar secciones disponibles
      const sectionQueryPatterns = [
        /^(?:qué|cuales|que|cuáles|dime) (?:secciones|apartados|partes) (?:hay|existen|se ven|tenemos|están disponibles)(?:\?)?$/i,
        /^(?:qué|que) (?:se ve|hay|puedo ver) (?:en pantalla|en la pantalla|ahora)(?:\?)?$/i
      ];

      let isSectionQuery = false;
      for (const pattern of sectionQueryPatterns) {
        if (pattern.test(userInput)) {
          isSectionQuery = true;
          break;
        }
      }

      // Obtener información contextual para el chatbot
      const sectionsInfo = getVisibleSectionsInfo();
      
      // Crear contexto para el asistente
      const contextMessage: Message = {
        id: `context-${Date.now()}`,
        role: 'system',
        content: `Contexto actual:
- Ruta actual: ${currentPath}
- Sección actual: ${currentSection || 'ninguna'}
- Secciones visibles: ${sectionsInfo.visible.join(', ') || 'ninguna'}
- Todas las secciones disponibles: ${sectionsInfo.all.join(', ') || 'ninguna'}

${isSectionQuery ? 'El usuario está preguntando por las secciones disponibles. Muestra una lista ordenada de las secciones disponibles en la página actual.' : ''}
${wasNavigationCommand ? 'El sistema ya ha realizado el scroll a la sección solicitada. Confirma al usuario que ya está viendo esa sección.' : ''}`,
        timestamp: new Date()
      };

      // Enviar el mensaje con el contexto
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages.filter(msg => msg.role !== 'system'), // Filtrar mensajes de sistema anteriores
            contextMessage, 
            userMessage
          ].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
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
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error al comunicarse con el asistente:', err);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, intenta nuevamente más tarde.',
        timestamp: new Date()
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
      {/* Chat button - opposite side to WhatsApp */}
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
            <div className="bg-gradient-to-r from-[#00CCFF]/20 to-[#9933FF]/20 px-4 py-3 flex justify-between items-center">
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
                      <div className="rounded-full w-6 h-6 mr-2 overflow-hidden">
                        <img src="/images/websy-avatar.png" alt="Websy" className="w-6 h-6 rounded-full object-cover shadow" />
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
                    <div className="rounded-full w-6 h-6 mr-2 overflow-hidden">
                      <img src="/images/websy-avatar.png" alt="Websy" className="w-6 h-6 rounded-full object-cover shadow" />
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
                  <button
                    type="button"
                    className="absolute right-2 bottom-2 text-gray-400 hover:text-white"
                  >
                    <div className="text-lg">
                      <FiIcons.FiChevronDown />
                    </div>
                  </button>
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
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}