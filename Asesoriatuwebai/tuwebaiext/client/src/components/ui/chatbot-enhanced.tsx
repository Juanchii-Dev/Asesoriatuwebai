import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import * as FiIcons from "react-icons/fi";
import * as HiIcons from "react-icons/hi";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import { useLocation } from 'react-router-dom';
import { useSpeechRecognition, useSpeechSynthesis } from '@/hooks/use-speech-recognition';
import { useSentimentAnalysis } from '@/hooks/use-sentiment-analysis';
import { useChatbotStore, ChatMessage, scrollToSection } from '@/hooks/use-chatbot-context';

// Componente para íconos de respuesta basados en el sentimiento
const SentimentIcon = ({ type }: { type: 'positive' | 'negative' | 'neutral' }) => {
  switch (type) {
    case 'positive':
      return <FiIcons.FiSmile className="text-green-400" />;
    case 'negative':
      return <FiIcons.FiFrown className="text-red-400" />;
    default:
      return <FiIcons.FiMeh className="text-gray-400" />;
  }
};

// Componente de interfaz para mostrar el tema seleccionado
const ThemeSwitch = ({ 
  theme, 
  onChange 
}: { 
  theme: 'dark' | 'light'; 
  onChange: (theme: 'dark' | 'light') => void;
}) => {
  return (
    <button
      onClick={() => onChange(theme === 'dark' ? 'light' : 'dark')}
      className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
    >
      {theme === 'dark' ? (
        <BsIcons.BsSun className="text-yellow-400 text-lg" />
      ) : (
        <BsIcons.BsMoonStars className="text-indigo-400 text-lg" />
      )}
    </button>
  );
};

// Componente para mostrar los controles de voz
const VoiceControls = ({
  isSpeechSupported,
  isListening,
  isSpeaking,
  onStartListening,
  onStopListening,
  onToggleSpeech,
  voiceEnabled
}: {
  isSpeechSupported: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onToggleSpeech: () => void;
  voiceEnabled: boolean;
}) => {
  if (!isSpeechSupported) return null;
  
  return (
    <div className="flex space-x-2">
      <button
        onClick={isListening ? onStopListening : onStartListening}
        className={cn(
          "p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500",
          isListening ? "bg-red-500/20" : "bg-transparent"
        )}
        aria-label={isListening ? "Detener grabación" : "Iniciar grabación"}
        title={isListening ? "Detener grabación" : "Iniciar grabación"}
      >
        {isListening ? (
          <MdIcons.MdMicOff className="text-red-500 text-lg" />
        ) : (
          <MdIcons.MdMic className="text-green-500 text-lg" />
        )}
      </button>
      
      <button
        onClick={onToggleSpeech}
        className={cn(
          "p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500",
          voiceEnabled ? "bg-blue-500/20" : "bg-transparent"
        )}
        aria-label={voiceEnabled ? "Desactivar lectura" : "Activar lectura"}
        title={voiceEnabled ? "Desactivar lectura" : "Activar lectura"}
      >
        {voiceEnabled ? (
          <MdIcons.MdVolumeUp className="text-blue-500 text-lg" />
        ) : (
          <MdIcons.MdVolumeOff className="text-gray-500 text-lg" />
        )}
      </button>
    </div>
  );
};

// Componente para mostrar controles de expansión
const ExpansionControls = ({
  mode,
  onChange
}: {
  mode: 'minimal' | 'expanded' | 'fullscreen';
  onChange: (mode: 'minimal' | 'expanded' | 'fullscreen') => void;
}) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onChange('minimal')}
        className={cn(
          "p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500",
          mode === 'minimal' ? "bg-gray-700" : "bg-transparent"
        )}
        aria-label="Modo compacto"
        title="Modo compacto"
      >
        <MdIcons.MdOutlineMinimize className="text-gray-300 text-lg" />
      </button>
      
      <button
        onClick={() => onChange('expanded')}
        className={cn(
          "p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500",
          mode === 'expanded' ? "bg-gray-700" : "bg-transparent"
        )}
        aria-label="Modo expandido"
        title="Modo expandido"
      >
        <MdIcons.MdOutlineMaximize className="text-gray-300 text-lg" />
      </button>
      
      <button
        onClick={() => onChange('fullscreen')}
        className={cn(
          "p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500",
          mode === 'fullscreen' ? "bg-gray-700" : "bg-transparent"
        )}
        aria-label="Modo pantalla completa"
        title="Modo pantalla completa"
      >
        <MdIcons.MdOutlineFullscreen className="text-gray-300 text-lg" />
      </button>
    </div>
  );
};

// Componente para mostrar sugerencias de comandos
const CommandSuggestions = ({
  onSelect
}: {
  onSelect: (command: string) => void;
}) => {
  const suggestions = [
    { text: "Mostrar servicios", command: "Muéstrame los servicios" },
    { text: "Ir a contacto", command: "Llévame a la sección de contacto" },
    { text: "¿Qué secciones hay?", command: "¿Qué secciones están disponibles?" },
    { text: "¿Qué ofrece TuWeb.ai?", command: "¿Qué servicios ofrece TuWeb.ai?" }
  ];
  
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion.command)}
          className="px-2 py-1 text-xs bg-[#2a2a35] rounded-full hover:bg-[#3a3a45] text-gray-300 transition-colors"
        >
          {suggestion.text}
        </button>
      ))}
    </div>
  );
};

// Componente de calculadora de precios integrada
const PriceCalculator = ({
  onClose,
  onSendEstimate
}: {
  onClose: () => void;
  onSendEstimate: (estimate: string) => void;
}) => {
  const [services, setServices] = useState({
    webDevelopment: false,
    ecommerce: false,
    seo: false,
    contentMarketing: false,
    socialMedia: false
  });
  
  const [complexity, setComplexity] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [timeline, setTimeline] = useState<'normal' | 'urgent'>('normal');
  
  const basePrices = {
    webDevelopment: { basic: 500, standard: 1200, premium: 3000 },
    ecommerce: { basic: 1000, standard: 2500, premium: 5000 },
    seo: { basic: 300, standard: 600, premium: 1200 },
    contentMarketing: { basic: 400, standard: 800, premium: 1600 },
    socialMedia: { basic: 350, standard: 700, premium: 1400 }
  };
  
  const timelineMultiplier = timeline === 'urgent' ? 1.3 : 1;
  
  const calculateTotal = () => {
    let total = 0;
    
    if (services.webDevelopment) total += basePrices.webDevelopment[complexity];
    if (services.ecommerce) total += basePrices.ecommerce[complexity];
    if (services.seo) total += basePrices.seo[complexity];
    if (services.contentMarketing) total += basePrices.contentMarketing[complexity];
    if (services.socialMedia) total += basePrices.socialMedia[complexity];
    
    return Math.round(total * timelineMultiplier);
  };
  
  const total = calculateTotal();
  
  const handleSendEstimate = () => {
    const selectedServices = Object.entries(services)
      .filter(([_, selected]) => selected)
      .map(([key, _]) => {
        switch(key) {
          case 'webDevelopment': return 'Desarrollo Web';
          case 'ecommerce': return 'Ecommerce';
          case 'seo': return 'SEO';
          case 'contentMarketing': return 'Marketing de Contenidos';
          case 'socialMedia': return 'Redes Sociales';
          default: return key;
        }
      })
      .join(', ');
    
    const complexityText = {
      basic: 'Básico',
      standard: 'Estándar',
      premium: 'Premium'
    }[complexity];
    
    const timelineText = timeline === 'urgent' ? 'Urgente' : 'Normal';
    
    const estimate = `Estimación de precio: €${total} para los servicios de ${selectedServices} con un nivel de complejidad ${complexityText} y tiempo de entrega ${timelineText}.`;
    
    onSendEstimate(estimate);
    onClose();
  };
  
  return (
    <div className="bg-[#1a1a23] border border-[#2a2a35] rounded-xl p-4 space-y-4 overflow-auto max-h-[400px]">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-medium">Calculadora de Precios</h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <FiIcons.FiX />
        </button>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-gray-300 text-sm mb-2">Selecciona los servicios:</p>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={services.webDevelopment}
                onChange={() => setServices(s => ({ ...s, webDevelopment: !s.webDevelopment }))}
                className="rounded text-[#00CCFF]"
              />
              <span className="text-gray-300 text-sm">Desarrollo Web</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={services.ecommerce}
                onChange={() => setServices(s => ({ ...s, ecommerce: !s.ecommerce }))}
                className="rounded text-[#00CCFF]"
              />
              <span className="text-gray-300 text-sm">E-commerce</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={services.seo}
                onChange={() => setServices(s => ({ ...s, seo: !s.seo }))}
                className="rounded text-[#00CCFF]"
              />
              <span className="text-gray-300 text-sm">SEO</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={services.contentMarketing}
                onChange={() => setServices(s => ({ ...s, contentMarketing: !s.contentMarketing }))}
                className="rounded text-[#00CCFF]"
              />
              <span className="text-gray-300 text-sm">Marketing de Contenidos</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={services.socialMedia}
                onChange={() => setServices(s => ({ ...s, socialMedia: !s.socialMedia }))}
                className="rounded text-[#00CCFF]"
              />
              <span className="text-gray-300 text-sm">Redes Sociales</span>
            </label>
          </div>
        </div>
        
        <div>
          <p className="text-gray-300 text-sm mb-2">Nivel de complejidad:</p>
          <div className="flex space-x-2">
            <button
              onClick={() => setComplexity('basic')}
              className={cn(
                "px-3 py-1 text-sm rounded-md",
                complexity === 'basic' 
                  ? "bg-[#00CCFF] text-white" 
                  : "bg-[#2a2a35] text-gray-300 hover:bg-[#3a3a45]"
              )}
            >
              Básico
            </button>
            <button
              onClick={() => setComplexity('standard')}
              className={cn(
                "px-3 py-1 text-sm rounded-md",
                complexity === 'standard' 
                  ? "bg-[#00CCFF] text-white" 
                  : "bg-[#2a2a35] text-gray-300 hover:bg-[#3a3a45]"
              )}
            >
              Estándar
            </button>
            <button
              onClick={() => setComplexity('premium')}
              className={cn(
                "px-3 py-1 text-sm rounded-md",
                complexity === 'premium' 
                  ? "bg-[#00CCFF] text-white" 
                  : "bg-[#2a2a35] text-gray-300 hover:bg-[#3a3a45]"
              )}
            >
              Premium
            </button>
          </div>
        </div>
        
        <div>
          <p className="text-gray-300 text-sm mb-2">Tiempo de entrega:</p>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeline('normal')}
              className={cn(
                "px-3 py-1 text-sm rounded-md",
                timeline === 'normal' 
                  ? "bg-[#00CCFF] text-white" 
                  : "bg-[#2a2a35] text-gray-300 hover:bg-[#3a3a45]"
              )}
            >
              Normal
            </button>
            <button
              onClick={() => setTimeline('urgent')}
              className={cn(
                "px-3 py-1 text-sm rounded-md",
                timeline === 'urgent' 
                  ? "bg-[#9933FF] text-white" 
                  : "bg-[#2a2a35] text-gray-300 hover:bg-[#3a3a45]"
              )}
            >
              Urgente (+30%)
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-[#2a2a35] pt-3">
        <div className="flex justify-between items-center">
          <p className="text-white font-medium">Total estimado:</p>
          <p className="text-[#00CCFF] font-bold">€{total}</p>
        </div>
        <p className="text-gray-400 text-xs mt-1">*Precios orientativos, sujetos a análisis detallado</p>
      </div>
      
      <button
        onClick={handleSendEstimate}
        disabled={!Object.values(services).some(value => value)}
        className={cn(
          "w-full py-2 rounded-lg font-medium",
          Object.values(services).some(value => value)
            ? "bg-gradient-to-r from-[#00CCFF] to-[#9933FF] text-white"
            : "bg-[#2a2a35] text-gray-500 cursor-not-allowed"
        )}
      >
        Enviar Presupuesto
      </button>
    </div>
  );
};

export default function ChatbotEnhanced() {
  // Estado global del chatbot usando Zustand
  const { 
    isOpen, messages, inputValue, isLoading, userPreferences,
    setIsOpen, addMessage, clearMessages, setInputValue, setIsLoading,
    updateUserPreferences
  } = useChatbotStore();
  
  // Estado local para características específicas
  const [showSettings, setShowSettings] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [currentTool, setCurrentTool] = useState<'none' | 'calculator' | 'settings'>('none');
  
  // Referencias para elementos DOM
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Obtener la ubicación actual
  const location = useLocation();
  
  // Hooks personalizados para funcionalidades avanzadas
  const { 
    transcript, 
    isListening, 
    startListening, 
    stopListening, 
    isSpeechSupported 
  } = useSpeechRecognition({
    onResult: (text) => setInputValue(text),
    onEnd: () => {
      if (transcript) {
        // Auto-enviar mensaje cuando termina la grabación de voz
        handleSubmit();
      }
    },
    language: 'es-ES'
  });
  
  const { 
    speak, 
    cancel: cancelSpeech, 
    isSpeaking, 
    isSynthesisSupported 
  } = useSpeechSynthesis({
    language: 'es-ES',
    rate: 1.0,
    pitch: 1.0
  });
  
  const { analyzeSentiment } = useSentimentAnalysis();
  
  // Dimensiones basadas en el modo de expansión
  const dimensions = useMemo(() => {
    switch(userPreferences.expansionMode) {
      case 'minimal':
        return {
          width: 'w-80 md:w-96',
          height: 'h-[500px] max-h-[80vh]'
        };
      case 'expanded':
        return {
          width: 'w-96 md:w-[450px]',
          height: 'h-[600px] max-h-[80vh]'
        };
      case 'fullscreen':
        return {
          width: 'w-full md:w-[600px]',
          height: 'h-[90vh]'
        };
      default:
        return {
          width: 'w-80 md:w-96',
          height: 'h-[500px] max-h-[80vh]'
        };
    }
  }, [userPreferences.expansionMode]);
  
  // Usar síntesis de voz para leer mensajes del asistente si está activada
  useEffect(() => {
    if (
      userPreferences.voiceEnabled && 
      isSynthesisSupported &&
      !isSpeaking && 
      messages.length > 0
    ) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        speak(lastMessage.content);
      }
    }
  }, [messages, userPreferences.voiceEnabled, isSynthesisSupported, isSpeaking, speak]);
  
  // Detectar cuando cambia la ruta
  useEffect(() => {
    if (location.pathname) {
      setShowSettings(false);
      setShowCalculator(false);
      setCurrentTool('none');
    }
  }, [location.pathname]);
  
  // Scroll al final cuando hay nuevos mensajes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Focus input cuando se abre el chat
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  // Escuchar atajos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Esc para cerrar el chat
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
      
      // Alt+C para abrir/cerrar el chat
      if (e.key === 'c' && e.altKey) {
        setIsOpen(!isOpen);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);
  
  // Cancelar cualquier síntesis de voz al cerrar
  useEffect(() => {
    if (!isOpen && isSpeaking) {
      cancelSpeech();
    }
  }, [isOpen, isSpeaking, cancelSpeech]);
  
  // Función para manejar envío de mensajes
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;
    
    const userInput = inputValue.trim();
    setInputValue('');
    setIsLoading(true);
    
    // Analizar sentimiento del mensaje del usuario
    const sentiment = await analyzeSentiment(userInput);
    
    // Agregar mensaje del usuario
    addMessage({
      role: 'user',
      content: userInput,
      sentiment: {
        type: sentiment.type,
        score: sentiment.score
      }
    });
    
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
    
    // Verificar si es una solicitud de cálculo de precios
    const isPricingRequest = /(?:precio|costo|cuánto cuesta|cuanto vale|presupuesto|cotización|cotizacion)/i.test(userInput) &&
                            /(?:servicio|desarrollo|web|pagina|página|app|aplicación|aplicacion)/i.test(userInput);
    
    try {
      // Crear contexto para el sistema
      const systemContext = {
        currentPage: location.pathname,
        isNavigationCommand,
        isPricingRequest,
        userSentiment: sentiment.type
      };
      
      // Enviar solicitud al backend
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `Contexto de la conversación:
              - Página actual: ${systemContext.currentPage}
              - Solicitud de navegación: ${systemContext.isNavigationCommand ? 'Sí (ya procesada)' : 'No'}
              - Solicitud de precios: ${systemContext.isPricingRequest ? 'Sí' : 'No'}
              - Sentimiento del usuario: ${systemContext.userSentiment}

              Instrucciones especiales:
              ${systemContext.isNavigationCommand ? 'El sistema ya ha realizado la navegación solicitada. Confirma al usuario que ya está viendo esa sección.' : ''}
              ${systemContext.isPricingRequest ? 'El usuario está preguntando por precios. Ofrece una respuesta general y sugiere usar la calculadora de precios interactiva.' : ''}
              
              Responde de manera amigable y profesional, y adapta tu tono según el sentimiento del usuario.`
            },
            ...messages.filter(msg => msg.role !== 'system').slice(-10).map(msg => ({
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
      
      // Mostrar calculadora si es relevante
      if (systemContext.isPricingRequest && !showCalculator) {
        setShowCalculator(true);
        setCurrentTool('calculator');
      }
      
      // Agregar mensaje del asistente con análisis de sentimiento
      addMessage({
        role: 'assistant',
        content: data.message,
        avatar: '/images/websy-avatar.png',
        sentiment: {
          type: 'neutral',
          score: 0
        }
      });
      
    } catch (err) {
      console.error('Error al comunicarse con el asistente:', err);
      
      addMessage({
        role: 'assistant',
        content: 'Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, intenta nuevamente más tarde.',
        avatar: '/images/websy-avatar.png',
        sentiment: {
          type: 'negative',
          score: 0.8
        }
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Función para manejar entrada de teclado
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  // Ajustar altura del textarea según contenido
  const adjustTextareaHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
  };
  
  // Alternar preferencias de voz
  const toggleVoicePreference = () => {
    updateUserPreferences({ 
      voiceEnabled: !userPreferences.voiceEnabled 
    });
    
    if (isSpeaking) {
      cancelSpeech();
    }
  };
  
  // Alternar tema
  const toggleTheme = () => {
    updateUserPreferences({ 
      theme: userPreferences.theme === 'dark' ? 'light' : 'dark' 
    });
  };
  
  // Cambiar posición del chat
  const togglePosition = () => {
    updateUserPreferences({ 
      position: userPreferences.position === 'left' ? 'right' : 'left' 
    });
  };
  
  // Cambiar modo de expansión
  const setExpansionMode = (mode: 'minimal' | 'expanded' | 'fullscreen') => {
    updateUserPreferences({ expansionMode: mode });
  };
  
  // Manejar selección de sugerencia
  const handleSuggestionSelect = (suggestion: string) => {
    setInputValue(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Manejar envío de estimación de precios
  const handleSendEstimate = (estimate: string) => {
    addMessage({
      role: 'user',
      content: `Solicito un presupuesto con estos parámetros: ${estimate}`,
      sentiment: { type: 'neutral', score: 0 }
    });
    
    // Simulamos la respuesta del asistente
    setIsLoading(true);
    setTimeout(() => {
      addMessage({
        role: 'assistant',
        content: `Gracias por usar nuestra calculadora de precios. He recibido tu solicitud:\n\n${estimate}\n\nTen en cuenta que este es un presupuesto orientativo inicial. Para un presupuesto detallado y personalizado, te recomendamos agendar una consulta con nuestro equipo. ¿Te gustaría que te contactemos para discutir más detalles?`,
        avatar: '/images/websy-avatar.png',
        sentiment: { type: 'positive', score: 0.7 }
      });
      setIsLoading(false);
    }, 1000);
  };
  
  // Determinar la posición del chat
  const chatPosition = userPreferences.position === 'left' ? 'left-6' : 'right-6';
  
  // Determinar colores y estilos basados en el tema
  const theme = userPreferences.theme === 'dark' 
    ? {
        bgColor: 'bg-[#121217]',
        textColor: 'text-white',
        borderColor: 'border-[#2a2a35]',
        headerBg: 'bg-gradient-to-r from-[#00CCFF]/20 to-[#9933FF]/20',
        inputBg: 'bg-[#252530]',
        bubbleUserBg: 'bg-[#9933FF]/20',
        bubbleAssistantBg: 'bg-[#2a2a35]'
      }
    : {
        bgColor: 'bg-white',
        textColor: 'text-gray-800',
        borderColor: 'border-gray-200',
        headerBg: 'bg-gradient-to-r from-[#00CCFF]/10 to-[#9933FF]/10',
        inputBg: 'bg-gray-100',
        bubbleUserBg: 'bg-[#9933FF]/10',
        bubbleAssistantBg: 'bg-gray-100'
      };
  
  return (
    <>
      {/* Chat button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 w-12 h-12 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full flex items-center justify-center shadow-lg z-50 overflow-hidden",
          chatPosition
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        aria-label="Abrir chat"
      >
        <img src="/images/websy-avatar.png" alt="Websy" className="w-full h-full object-cover" />
      </motion.button>
      
      {/* Hotkey indicator */}
      <div className={cn(
        "fixed bottom-20 text-xs bg-black/70 text-white px-2 py-1 rounded",
        chatPosition
      )}>
        Alt+C
      </div>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              "fixed bottom-24 max-h-[90vh] border rounded-xl overflow-hidden shadow-2xl z-50 flex flex-col",
              chatPosition,
              dimensions.width,
              dimensions.height,
              theme.bgColor,
              theme.borderColor
            )}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            ref={chatContainerRef}
          >
            {/* Header */}
            <div className={cn(
              "px-4 py-3 flex justify-between items-center border-b",
              theme.headerBg,
              theme.borderColor
            )}>
              <div className="flex items-center">
                <div className="rounded-full w-8 h-8 mr-2 overflow-hidden">
                  <img src="/images/websy-avatar.png" alt="Websy" className="w-full h-full object-cover" />
                </div>
                <h3 className={theme.textColor + " font-medium"}>Websy - Asistente Virtual</h3>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Settings button */}
                <button 
                  onClick={() => {
                    setCurrentTool(currentTool === 'settings' ? 'none' : 'settings');
                    setShowSettings(currentTool !== 'settings');
                    setShowCalculator(false);
                  }}
                  className={cn(
                    "text-gray-400 hover:text-gray-200 transition-colors p-1 rounded-full",
                    currentTool === 'settings' ? 'bg-gray-700' : ''
                  )}
                  aria-label="Configuración"
                  title="Configuración"
                >
                  <FiIcons.FiSettings />
                </button>
                
                {/* Calculator button */}
                <button 
                  onClick={() => {
                    setCurrentTool(currentTool === 'calculator' ? 'none' : 'calculator');
                    setShowCalculator(currentTool !== 'calculator');
                    setShowSettings(false);
                  }}
                  className={cn(
                    "text-gray-400 hover:text-gray-200 transition-colors p-1 rounded-full",
                    currentTool === 'calculator' ? 'bg-gray-700' : ''
                  )}
                  aria-label="Calculadora de precios"
                  title="Calculadora de precios"
                >
                  <FiIcons.FiDollarSign />
                </button>
                
                {/* Clear button */}
                <button 
                  onClick={() => {
                    clearMessages();
                    setCurrentTool('none');
                    setShowSettings(false);
                    setShowCalculator(false);
                  }}
                  className="text-gray-400 hover:text-gray-200 transition-colors p-1 rounded-full"
                  aria-label="Limpiar conversación"
                  title="Limpiar conversación"
                >
                  <FiIcons.FiTrash2 />
                </button>
                
                {/* Close button */}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                  aria-label="Cerrar chat"
                >
                  <FiIcons.FiX className="text-xl" />
                </button>
              </div>
            </div>
            
            {/* Settings panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "overflow-hidden border-b",
                    theme.borderColor
                  )}
                >
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className={theme.textColor + " font-medium"}>Configuración</h4>
                    </div>
                    
                    <div className="space-y-3">
                      {/* Theme selector */}
                      <div className="flex justify-between items-center">
                        <span className={cn("text-sm", theme.textColor)}>Tema</span>
                        <ThemeSwitch theme={userPreferences.theme} onChange={toggleTheme} />
                      </div>
                      
                      {/* Position toggle */}
                      <div className="flex justify-between items-center">
                        <span className={cn("text-sm", theme.textColor)}>Posición</span>
                        <button
                          onClick={togglePosition}
                          className="px-2 py-1 text-xs rounded-md bg-gray-700 text-gray-300"
                        >
                          {userPreferences.position === 'left' ? 'Izquierda' : 'Derecha'}
                        </button>
                      </div>
                      
                      {/* Voice settings */}
                      <div className="flex justify-between items-center">
                        <span className={cn("text-sm", theme.textColor)}>Leer respuestas</span>
                        <button
                          onClick={toggleVoicePreference}
                          className={cn(
                            "relative inline-flex h-6 w-11 items-center rounded-full",
                            userPreferences.voiceEnabled ? "bg-[#00CCFF]" : "bg-gray-600"
                          )}
                        >
                          <span
                            className={cn(
                              "inline-block h-4 w-4 transform rounded-full bg-white transition",
                              userPreferences.voiceEnabled ? "translate-x-6" : "translate-x-1"
                            )}
                          />
                        </button>
                      </div>
                      
                      {/* Chat size */}
                      <div className="flex justify-between items-center">
                        <span className={cn("text-sm", theme.textColor)}>Tamaño</span>
                        <ExpansionControls 
                          mode={userPreferences.expansionMode} 
                          onChange={setExpansionMode} 
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Calculator panel */}
            <AnimatePresence>
              {showCalculator && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "overflow-hidden border-b",
                    theme.borderColor
                  )}
                >
                  <PriceCalculator 
                    onClose={() => {
                      setShowCalculator(false);
                      setCurrentTool('none');
                    }}
                    onSendEstimate={handleSendEstimate}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Messages container */}
            <div 
              className={cn(
                "flex-1 overflow-y-auto py-4 px-4 space-y-4 relative",
                theme.bgColor
              )}
            >
              {messages.filter(msg => msg.role !== 'system').map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "max-w-[85%] p-3 rounded-2xl relative",
                    message.role === 'user' 
                      ? theme.bubbleUserBg + " ml-auto rounded-tr-none" 
                      : theme.bubbleAssistantBg + " mr-auto rounded-tl-none"
                  )}
                >
                  {message.sentiment && message.role === 'user' && (
                    <div className="absolute top-2 right-2">
                      <SentimentIcon type={message.sentiment.type} />
                    </div>
                  )}
                  
                  {message.role === 'assistant' && (
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden mr-2 flex-shrink-0">
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
                      <span className={cn("text-xs font-medium", 
                        userPreferences.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      )}>
                        Websy
                      </span>
                    </div>
                  )}
                  
                  <p className={cn(
                    "text-sm whitespace-pre-wrap",
                    userPreferences.theme === 'dark' ? 'text-white' : 'text-gray-800'
                  )}>
                    {message.content}
                  </p>
                  
                  <p className={cn(
                    "text-xs mt-1",
                    userPreferences.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  )}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "p-3 rounded-2xl rounded-tl-none max-w-[85%] mr-auto",
                    theme.bubbleAssistantBg
                  )}
                >
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden mr-2 flex-shrink-0">
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
                    <span className={cn(
                      "text-xs font-medium",
                      userPreferences.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    )}>
                      Websy
                    </span>
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
            
            {/* Command suggestions */}
            <AnimatePresence>
              {showSuggestions && messages.length < 3 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className={cn(
                    "p-3 border-t",
                    theme.borderColor,
                    theme.bgColor
                  )}
                >
                  <p className={cn(
                    "text-xs mb-2",
                    userPreferences.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  )}>
                    Sugerencias:
                  </p>
                  <CommandSuggestions onSelect={handleSuggestionSelect} />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Input area */}
            <form 
              onSubmit={handleSubmit} 
              className={cn(
                "p-3 border-t flex flex-col gap-2",
                theme.borderColor,
                userPreferences.theme === 'dark' ? 'bg-[#1a1a23]' : 'bg-gray-50'
              )}
            >
              {/* Voice controls */}
              <div className="flex justify-between items-center">
                <VoiceControls
                  isSpeechSupported={isSpeechSupported}
                  isListening={isListening}
                  isSpeaking={isSpeaking}
                  onStartListening={startListening}
                  onStopListening={stopListening}
                  onToggleSpeech={toggleVoicePreference}
                  voiceEnabled={userPreferences.voiceEnabled}
                />
                
                <button
                  type="button"
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className={cn(
                    "p-1 rounded-full text-sm",
                    userPreferences.theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                  )}
                  title={showSuggestions ? "Ocultar sugerencias" : "Mostrar sugerencias"}
                >
                  {showSuggestions ? (
                    <AiIcons.AiOutlineUp />
                  ) : (
                    <AiIcons.AiOutlineDown />
                  )}
                </button>
              </div>
              
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
                    className={cn(
                      "w-full rounded-xl py-2 pl-3 pr-10 text-sm resize-none min-h-[40px] max-h-[100px] focus:outline-none focus:ring-1 focus:ring-[#00CCFF]",
                      theme.inputBg,
                      userPreferences.theme === 'dark' ? 'text-white border border-[#3a3a45]' : 'text-gray-800 border border-gray-300'
                    )}
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
                      : userPreferences.theme === 'dark' 
                        ? "bg-[#3a3a45] opacity-50" 
                        : "bg-gray-300 opacity-50"
                  )}
                >
                  <FiIcons.FiSend className="text-lg" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}