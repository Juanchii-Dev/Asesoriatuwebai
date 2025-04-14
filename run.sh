#!/bin/bash

echo "Verificando configuración del avatar del chatbot..."
cd Asesoriatuwebai

# Verificar que existe el directorio de imágenes
mkdir -p tuwebaiext/public/images 2>/dev/null

# Comprobar si existen las imágenes del avatar
if [ ! -f "tuwebaiext/public/images/websy-avatar.png" ]; then
  echo "Copiando imagen del avatar desde ./websy-image.jpg..."
  if [ -f "websy-image.jpg" ]; then
    cp -f websy-image.jpg tuwebaiext/public/images/websy-avatar.png 2>/dev/null
    cp -f websy-image.jpg tuwebaiext/public/images/websy.jpg 2>/dev/null
    echo "✅ Imagen de avatar instalada correctamente"
  else
    echo "⚠️ Advertencia: No se encontró websy-image.jpg"
  fi
fi

# Verificar si el componente de chatbot fue actualizado
if [ -f "tuwebaiext/client/src/components/ui/chatbot.tsx" ]; then
  # Comprobar si ya tiene nuestros cambios
  if ! grep -q "scrollToSection" "tuwebaiext/client/src/components/ui/chatbot.tsx"; then
    echo "Aplicando mejoras al chatbot..."
    ./fix2.sh
  else
    echo "✅ Chatbot ya está mejorado"
  fi
else
  echo "⚠️ No se encontró el archivo del chatbot"
fi

# Iniciar el servidor original que sabemos que funciona
echo "Iniciando el servidor..."
cd tuwebaiext && npm run dev