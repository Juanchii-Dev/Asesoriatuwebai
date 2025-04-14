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
