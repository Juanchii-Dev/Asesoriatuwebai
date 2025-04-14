#!/bin/bash

# Asegurar que el directorio del proyecto existe
if [ ! -d "tuwebaiext" ]; then
  # Clonar repositorio si no existe
  git clone https://github.com/Juanchii-Dev/tuwebaiext.git
fi

# Cambiar al directorio del proyecto
cd tuwebaiext

# Crear carpeta de imágenes si no existe
mkdir -p public/images

# Copiar la imagen del avatar (asegurándonos de que existe)
cp ../websy-image.jpg public/images/websy.jpg || echo "Error: No se pudo copiar la imagen de avatar"

# Verificamos que la imagen esté en el lugar correcto
if [ -f "public/images/websy.jpg" ]; then
  echo "✅ Imagen de avatar instalada correctamente"
else
  echo "❌ Error: La imagen de avatar no se instaló correctamente"
fi

# Instalar dependencias si node_modules no existe o está vacío
if [ ! -d "node_modules" ] || [ -z "$(ls -A node_modules)" ]; then
  npm install
  npm install openai
fi

# Crear el alias para framer-motion (sin modificar archivos)
mkdir -p node_modules/framer-motion

# Crear un archivo que defina 'motion' para que el código existente funcione
cat > node_modules/framer-motion/index.js << 'EOL'
// Alias para framer-motion
const motion = {
  div: 'div',
  button: 'button',
  span: 'span',
  p: 'p',
  svg: 'svg',
  path: 'path',
  circle: 'circle',
  rect: 'rect',
};

// Mock de AnimatePresence
const AnimatePresence = ({ children }) => children;

module.exports = {
  motion,
  AnimatePresence,
};
EOL

echo "✅ Alias para framer-motion creado correctamente"

# Actualizar el archivo chatbot.tsx con el mensaje de bienvenida y la imagen
cat > client/src/components/ui/chatbot.tsx << 'EOL'
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import * as FiIcons from "react-icons/fi";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
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
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
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
        <img src="/images/websy.jpg" alt="Websy" className="w-full h-full object-cover" />
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
                  <img src="/images/websy.jpg" alt="Websy" className="w-full h-full object-cover" />
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
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-4">
              {messages.map((message) => (
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
EOL

# Actualizar el archivo chatbot.ts con el prompt personalizado
cat > server/chatbot.ts << 'EOL'
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

export async function chatbotHandler(req: Request, res: Response) {
  try {
    const { messages } = req.body;
    
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Se requiere un array de mensajes válido' });
    }

    // Añade contexto del sistema para definir comportamiento del asistente
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `Contexto: Eres Websy, un asistente virtual altamente profesional y eficiente de TuWeb.ai. Tu propósito es asistir a los usuarios de manera fluida, clara, concisa y profesional. Tienes que proporcionar respuestas detalladas y estructuradas, adaptadas a las necesidades de cada usuario. Siempre debes ser accesible y claro, manteniendo el tono profesional y confiable que refleja la imagen de la empresa.

Instrucciones Generales:

1. Tono Profesional y Amigable:
- Responde de manera formal pero accesible, transmitiendo confianza y autoridad.
- Utiliza frases claras, simples y bien estructuradas.
- Emplea negritas para resaltar puntos clave y organiza la información con listas numeradas o con viñetas cuando sea apropiado.
- Sé claro y directo, pero también empático. Si el usuario no está seguro de lo que necesita, ofrécele ayuda adicional.

2. Estructura de Respuesta:
- Respuesta principal → Responde la pregunta o inquietud.
- Explicación → Desarrolla el tema de manera detallada.
- Ejemplos → Ofrece ejemplos relevantes que ayuden a entender mejor la información.
- Recomendación o Llamado a la acción → Dirige al usuario a lo siguiente que debe hacer, sea agendar una llamada, leer un artículo, o tomar alguna acción.

Además:
- Eres el asistente virtual de TuWeb.ai, una agencia especializada en desarrollo web profesional, marketing digital, consultoría estratégica, UX/UI, optimización CRO, y automatización de marketing.
- Ofrece información sobre los servicios de la empresa.
- Ayuda a resolver dudas sobre desarrollo web, marketing digital, SEO, y transformación digital.
- Proporciona información básica sobre precios y plazos, pero recomienda una consulta personalizada para detalles específicos.
- Siempre ofrece la opción de hablar con un asesor humano a través de WhatsApp o el formulario de contacto.
- Mantén un tono amigable y profesional, utilizando emojis ocasionalmente.
- Limita tus respuestas a 3-4 párrafos cortos como máximo.
- Si no puedes ayudar con algo, sugieres contactar directamente con el equipo.
      `
    };

    // Completa la conversación con OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // O "gpt-4o" para la versión completa
      messages: [systemMessage, ...messages],
      max_tokens: 500,
      temperature: 0.7,
    });

    // Extrae la respuesta
    const reply = completion.choices[0].message.content || 'Lo siento, no pude procesar tu consulta en este momento.';

    return res.status(200).json({ message: reply });
  } catch (error: any) {
    console.error('Error en el chatbot:', error);
    return res.status(500).json({ 
      error: 'Error al procesar la solicitud del chatbot',
      details: error.message
    });
  }
}
EOL

# Crear un archivo vite.config.js para asegurarnos de que escuche en el puerto 5000
cat > vite.config.js << EOL
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
  },
})
EOL

# Iniciar la aplicación
NODE_ENV=development npm run dev