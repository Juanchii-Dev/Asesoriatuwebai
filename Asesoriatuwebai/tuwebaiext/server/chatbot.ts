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
