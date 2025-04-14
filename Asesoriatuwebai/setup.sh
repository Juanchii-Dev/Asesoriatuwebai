#!/bin/bash

# Este script prepara el entorno para ejecutar la aplicación original sin modificar archivos

# Crear el alias para framer-motion
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