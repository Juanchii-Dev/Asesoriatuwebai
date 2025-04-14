import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatbotHandler } from "./chatbot";
import { WebSocketServer } from "ws";
import WebSocket from "ws";

export async function registerRoutes(app: Express): Promise<Server> {
  // Rutas de la API
  app.post('/api/chatbot', chatbotHandler);
  
  // Route para verificar el estado de la API
  app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      features: {
        chatbot: true
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
  
  // Configurar WebSocket Server (para comunicación en tiempo real)
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (ws: WebSocket) => {
    console.log('Cliente WebSocket conectado');
    
    // Enviar mensaje de bienvenida
    ws.send(JSON.stringify({
      type: 'welcome',
      message: 'Conexión WebSocket establecida con éxito'
    }));
    
    // Manejar mensajes del cliente
    ws.on('message', async (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        
        // Procesar diferentes tipos de mensajes
        switch (data.type) {
          case 'chat':
            // Simular respuesta asíncrona
            setTimeout(() => {
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({
                  type: 'chat_response',
                  message: `Respuesta en tiempo real a: ${data.message}`,
                  timestamp: new Date().toISOString()
                }));
              }
            }, 500);
            break;
            
          case 'visibility_update':
            // Transmitir actualización de visibilidad a todos los clientes
            wss.clients.forEach(client => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                  type: 'visibility_update',
                  sections: data.sections
                }));
              }
            });
            break;
            
          default:
            ws.send(JSON.stringify({
              type: 'error',
              message: 'Tipo de mensaje no reconocido'
            }));
        }
      } catch (err) {
        console.error('Error al procesar mensaje WebSocket:', err);
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Error al procesar el mensaje'
        }));
      }
    });
    
    // Manejar desconexiones
    ws.on('close', () => {
      console.log('Cliente WebSocket desconectado');
    });
  });

  return httpServer;
}
