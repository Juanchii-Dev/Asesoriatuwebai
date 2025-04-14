#!/bin/bash

# Clonar el repositorio principal si no existe
if [ ! -d "Asesoriatuwebai" ]; then
  echo "Cloning repository..."
  git clone https://github.com/Juanchii-Dev/Asesoriatuwebai.git
  if [ $? -ne 0 ]; then
    echo "Failed to clone repository."
    exit 1
  fi
fi

# Exportar la API key si está disponible
if [ -n "$OPENAI_API_KEY" ]; then
  echo "Using provided OpenAI API Key..."
  export OPENAI_API_KEY=$OPENAI_API_KEY
else
  echo "No OpenAI API key found. Chatbot functionality will not work properly."
fi

# Ejecutar el script start.sh dentro del directorio Asesoriatuwebai
cd Asesoriatuwebai
bash start.sh
