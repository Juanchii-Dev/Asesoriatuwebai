#!/bin/bash

# Este es un script que permite ejecutar el repositorio Asesoriatuwebai
# sin hacer modificaciones a los archivos originales

# Verificamos si ya existe el repositorio, si no lo clonamos
if [ ! -d "Asesoriatuwebai" ]; then
  echo "Clonando el repositorio original..."
  git clone https://github.com/Juanchii-Dev/Asesoriatuwebai.git
  if [ $? -ne 0 ]; then
    echo "Error al clonar el repositorio."
    exit 1
  fi
fi

# Exportamos la API key de OpenAI si está presente
if [ -n "$OPENAI_API_KEY" ]; then
  echo "OpenAI API Key detectada, exportando..."
  export OPENAI_API_KEY=$OPENAI_API_KEY
else
  echo "No se encontró OpenAI API Key. El chatbot no funcionará correctamente."
fi

# Ejecutar la versión simple del servidor en Asesoriatuwebai/simple-app
echo "Iniciando la aplicación alternativa..."
cd Asesoriatuwebai/simple-app
echo "Instalando dependencias de la aplicación simple..."
npm install express openai

# Crear archivos necesarios si no existen
if [ ! -f "server.js" ]; then
  echo "El archivo server.js no existe, creándolo..."
  cat > server.js << 'EOL'
const express = require('express');
const { OpenAI } = require('openai');
const path = require('path');
const app = express();

// Configurar middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configurar OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Contexto del sistema para el chatbot
const systemMessage = {
  role: 'system',
  content: `Eres Websy, el asistente virtual profesional de TuWeb.ai. Proporciona información sobre servicios de desarrollo web, marketing digital, consultoría estratégica, UX/UI, optimización CRO, y automatización de marketing. Sé profesional, claro y conciso.`
};

// Ruta para el chatbot
app.post('/api/chatbot', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Se requiere un array de mensajes válido' });
    }

    // Completa la conversación con OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [systemMessage, ...messages],
      max_tokens: 500,
      temperature: 0.7,
    });

    // Extrae la respuesta
    const reply = completion.choices[0].message.content || 'Lo siento, no pude procesar tu consulta en este momento.';

    return res.status(200).json({ message: reply });
  } catch (error) {
    console.error('Error en el chatbot:', error);
    return res.status(500).json({
      error: 'Error al procesar la solicitud del chatbot',
      details: error.message
    });
  }
});

// Ruta principal para servir la página
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor ejecutándose en http://0.0.0.0:${PORT}`);
});
EOL
fi

# Iniciar el servidor simple
echo "Ejecutando el servidor en el puerto 5000..."
node server.js