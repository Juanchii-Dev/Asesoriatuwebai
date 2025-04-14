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
