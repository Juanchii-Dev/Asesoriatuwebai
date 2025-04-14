import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import WhatsAppButton from "@/components/ui/whatsapp-button";

export default function UXUI() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <WhatsAppButton />
      
      {/* Header */}
      <motion.header 
        className="bg-gradient-to-b from-[#0f0f19] to-[#0a0a0f] pt-24 pb-16 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <Link to="/" className="text-3xl font-rajdhani font-bold mb-6 inline-block">
                TuWeb<span className="text-[#00CCFF]">.ai</span>
              </Link>
              <h1 className="text-4xl md:text-5xl font-rajdhani font-bold mb-4">
                <span className="gradient-text pb-2">Desarrollo UX/UI</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mt-4">
                Interfaces intuitivas y experiencias de usuario excepcionales que convierten visitantes en clientes fieles.
              </p>
            </div>

            <motion.div 
              className="w-40 h-40 bg-gradient-to-br from-[#00CCFF]/30 to-[#9933FF]/30 rounded-full flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Descripción extendida */}
      <section className="py-16 px-4 bg-[#0a0a0f]">
        <div className="container mx-auto">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-rajdhani font-bold mb-6 text-white">Diseño centrado en el usuario</h2>
            <p className="text-lg text-gray-300 mb-8">
              En el mundo digital actual, la experiencia del usuario determina el éxito de tu proyecto. En TuWeb.ai combinamos psicología del comportamiento, diseño visual avanzado y las últimas tendencias en interfaces para crear experiencias digitales que cautivan, guían y convierten. Cada píxel está pensado para hacer que tus usuarios disfruten interactuando con tu marca.
            </p>
          </motion.div>

          {/* Beneficios clave */}
          <div className="mt-16">
            <motion.h3 
              className="text-2xl font-rajdhani font-bold mb-8 text-center text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              ¿Por qué es crucial el diseño UX/UI?
            </motion.h3>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  ),
                  title: "Engagement inmediato",
                  description: "Captá la atención de tus usuarios en los primeros 5 segundos con interfaces atractivas e intuitivas."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "Reduce la fricción",
                  description: "Elimina obstáculos en el recorrido del usuario para aumentar las conversiones y reducir abandonos."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  ),
                  title: "Consistencia de marca",
                  description: "Sistemas de diseño escalables que mantienen la coherencia visual en todos tus productos digitales."
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className="bg-[#121217] rounded-xl p-6 h-full">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#00CCFF] to-[#9933FF] flex items-center justify-center mb-4">
                      <div className="text-white">
                        {benefit.icon}
                      </div>
                    </div>
                    <h4 className="text-xl font-rajdhani font-bold mb-3 text-white">{benefit.title}</h4>
                    <p className="text-gray-300">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ejemplos de proyectos */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#0a0a0f] to-[#0f0f19]">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-rajdhani font-bold mb-4 text-white">Nuestros proyectos</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Interfaces diseñadas con foco en resultados
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[1, 2].map((item, index) => (
              <motion.div
                key={index}
                className="rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 p-[1px] rounded-xl">
                  <div className="bg-[#121217] rounded-xl p-6">
                    <div className="h-64 rounded-lg bg-gradient-to-br from-[#0f0f19]/90 to-[#121217]/90 mb-4 flex items-center justify-center">
                      <span className="text-gray-500 font-medium">
                        Mock de interfaz {item}
                      </span>
                    </div>
                    <h4 className="text-xl font-rajdhani font-bold mb-2 text-white">Proyecto UX/UI {item}</h4>
                    <p className="text-gray-300 mb-4">
                      Descripción del desafío, estrategia y resultados obtenidos con este rediseño de interfaz.
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="px-3 py-1 rounded-full bg-[#00CCFF]/20 text-[#00CCFF]">User Flows</span>
                      <span className="px-3 py-1 rounded-full bg-[#9933FF]/20 text-[#9933FF]">Usabilidad</span>
                      <span className="px-3 py-1 rounded-full bg-[#00CCFF]/20 text-[#00CCFF]">A/B Testing</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 px-4 bg-[#0a0a0f]">
        <div className="container mx-auto">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-rajdhani font-bold mb-6 text-white">
              Transformá la experiencia de tus usuarios
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Convertí visitantes en usuarios leales con interfaces que enamoran desde el primer click.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/consulta"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium shadow-lg hover:shadow-[#00CCFF]/20 transition-all transform hover:scale-105"
              >
                Solicitá tu proyecto UX/UI
              </Link>
              <a 
                href="https://wa.me/5492215688349?text=Hola,%20estoy%20interesado%20en%20sus%20servicios%20de%20UX/UI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 border border-[#9933FF] rounded-full text-[#9933FF] font-medium hover:bg-[#9933FF]/10 transition-all"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}