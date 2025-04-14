#!/bin/bash

# Este script se encarga de actualizar la importación de OpenAI para que el proyecto funcione

# Comprobar si hay acceso al directorio del proyecto
if [ ! -d "tuwebaiext" ]; then
  echo "Error: No se encuentra el directorio tuwebaiext"
  exit 1
fi

# Cambiar al directorio del proyecto
cd tuwebaiext

# Actualizar el archivo chatbot.ts
echo "Actualizando importación de OpenAI en chatbot.ts..."
sed -i 's/import OpenAI from/import { OpenAI } from/' server/chatbot.ts

# Verificar si se actualizó correctamente
if grep -q "import { OpenAI } from 'openai';" server/chatbot.ts; then
  echo "✅ Importación de OpenAI actualizada correctamente"
else
  echo "❌ Error: No se pudo actualizar la importación de OpenAI"
  exit 1
fi

echo "La corrección se ha completado correctamente"
exit 0
