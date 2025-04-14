import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import AnimatedShape from '@/components/ui/animated-shape';
import ScrollProgress from '@/components/ui/scroll-progress';
import WhatsAppButton from '@/components/ui/whatsapp-button';

export default function PoliticaPrivacidad() {
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();

  return (
    <>
      {/* Barra de progreso de scroll */}
      <ScrollProgress />
      
      {/* Botón de WhatsApp */}
      <WhatsAppButton />

      <main className="relative">
        <section 
          className="min-h-screen flex items-center justify-center relative bg-gradient-1 py-16"
        >
          <AnimatedShape type={1} className="top-[20%] left-[-100px]" delay={0} />
          <AnimatedShape type={2} className="bottom-[20%] right-[-100px]" delay={1} />
          
          <div className="container mx-auto px-4 z-10">
            <motion.div 
              ref={ref}
              className="text-center mb-10"
              initial={{ opacity: 0, y: 50 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-rajdhani font-bold text-4xl md:text-6xl mb-6">
                <span className="gradient-text gradient-border inline-block pb-2">Política de Privacidad</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                En Asesoría Tu Web AI nos tomamos muy en serio la privacidad de tus datos. Esta política explica cómo recopilamos, utilizamos y protegemos tu información.
              </p>
            </motion.div>
            
            <div className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px] max-w-4xl mx-auto">
              <div className="bg-[#121217] rounded-xl p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="prose prose-invert max-w-none"
                >
                  <h2>1. Información que Recopilamos</h2>
                  <p>En Asesoría Tu Web AI ("nosotros", "nuestro", "la Empresa") podemos recopilar los siguientes tipos de información personal:</p>
                  
                  <h3>1.1 Información que tú nos proporcionas</h3>
                  <ul>
                    <li><strong>Información de contacto:</strong> Nombre, dirección de correo electrónico, número de teléfono, dirección postal.</li>
                    <li><strong>Información de la cuenta:</strong> Nombre de usuario, contraseña, preferencias de la cuenta.</li>
                    <li><strong>Información de pago:</strong> Datos de tarjetas de crédito, información bancaria, historial de pagos.</li>
                    <li><strong>Contenido del usuario:</strong> Cualquier contenido que subas o crees usando nuestros servicios.</li>
                    <li><strong>Comunicaciones:</strong> Información que proporcionas cuando te comunicas con nosotros, incluyendo registros de tus contactos con nuestro servicio de atención al cliente.</li>
                  </ul>
                  
                  <h3>1.2 Información recopilada automáticamente</h3>
                  <ul>
                    <li><strong>Información del dispositivo:</strong> Tipo de dispositivo, sistema operativo, identificadores únicos de dispositivo, navegador, idioma, red móvil.</li>
                    <li><strong>Información de registro:</strong> Direcciones IP, horas de acceso, páginas visitadas, acciones realizadas.</li>
                    <li><strong>Información de ubicación:</strong> Ubicación geográfica general basada en la dirección IP u otra información de ubicación más precisa si lo permites.</li>
                    <li><strong>Información de uso:</strong> Cómo utilizas nuestros servicios, incluyendo las características que utilizas y el tiempo que pasas en ellos.</li>
                    <li><strong>Cookies y tecnologías similares:</strong> Usamos cookies y tecnologías similares para recopilar información sobre cómo interactúas con nuestros servicios y para recordar tus preferencias.</li>
                  </ul>
                  
                  <h3>1.3 Información de terceros</h3>
                  <p>Podemos recibir información sobre ti de otras fuentes, incluyendo:</p>
                  <ul>
                    <li><strong>Socios comerciales:</strong> Información técnica de referencia y de uso compartida por nuestros socios comerciales.</li>
                    <li><strong>Redes sociales:</strong> Si te conectas a nuestros servicios a través de una red social, podemos recibir información de esa red social.</li>
                    <li><strong>Proveedores de servicios:</strong> Información de proveedores que nos ayudan a entender el uso de nuestros servicios.</li>
                    <li><strong>Fuentes públicamente disponibles:</strong> Información de bases de datos públicamente disponibles.</li>
                  </ul>

                  <h2>2. Cómo Utilizamos tu Información</h2>
                  <p>Utilizamos la información que recopilamos para los siguientes propósitos:</p>
                  
                  <h3>2.1 Proporcionar, mantener y mejorar nuestros servicios</h3>
                  <ul>
                    <li>Procesar transacciones y gestionar tu cuenta.</li>
                    <li>Proporcionar asistencia al cliente y responder a tus consultas.</li>
                    <li>Personalizar tu experiencia y entregar contenido y ofertas de productos que puedan interesarte.</li>
                    <li>Mejorar y desarrollar nuevos productos y servicios.</li>
                    <li>Realizar análisis de datos y pruebas para mejorar la calidad del servicio.</li>
                  </ul>
                  
                  <h3>2.2 Comunicación</h3>
                  <ul>
                    <li>Enviarte información técnica, actualizaciones, alertas de seguridad y mensajes de soporte.</li>
                    <li>Comunicarte sobre productos, servicios, ofertas, promociones, recompensas y eventos.</li>
                    <li>Solicitarte opiniones sobre nuestros productos y servicios.</li>
                  </ul>
                  
                  <h3>2.3 Protección y seguridad</h3>
                  <ul>
                    <li>Proteger contra, investigar y prevenir actividades fraudulentas, no autorizadas o ilegales.</li>
                    <li>Detectar, prevenir o abordar problemas de seguridad o técnicos.</li>
                    <li>Proteger los derechos, la propiedad o la seguridad de la Empresa, nuestros usuarios o el público.</li>
                  </ul>
                  
                  <h3>2.4 Cumplimiento legal</h3>
                  <ul>
                    <li>Cumplir con las leyes y regulaciones aplicables.</li>
                    <li>Hacer cumplir nuestros términos de servicio y otras políticas.</li>
                    <li>Responder a solicitudes legales y procesos judiciales.</li>
                  </ul>

                  <h2>3. Compartición de Información</h2>
                  <p>Podemos compartir tu información personal con terceros en las siguientes circunstancias:</p>
                  
                  <h3>3.1 Con tu consentimiento</h3>
                  <p>Podemos compartir tu información cuando des tu consentimiento para hacerlo.</p>
                  
                  <h3>3.2 Con proveedores de servicios</h3>
                  <p>Compartimos información con proveedores de servicios que trabajan en nuestro nombre para ayudarnos a proporcionar nuestros servicios, como procesamiento de pagos, análisis de datos, entrega de correos electrónicos, alojamiento de servicios y servicio al cliente.</p>
                  
                  <h3>3.3 Por razones legales</h3>
                  <p>Podemos compartir información si creemos de buena fe que es necesario para:</p>
                  <ul>
                    <li>Cumplir con las leyes y regulaciones aplicables.</li>
                    <li>Responder a citaciones, órdenes judiciales u otros procesos legales.</li>
                    <li>Proteger los derechos, la propiedad y la seguridad de la Empresa, nuestros usuarios o el público.</li>
                  </ul>
                  
                  <h3>3.4 En caso de transacción comercial</h3>
                  <p>Si la Empresa está involucrada en una fusión, adquisición o venta de activos, tu información puede ser transferida como parte de esa transacción. Te notificaremos sobre cualquier cambio en la propiedad o el uso de tu información personal.</p>
                  
                  <h3>3.5 Datos agregados o anonimizados</h3>
                  <p>Podemos compartir información agregada o anonimizada que no te identifique directamente con terceros para fines de investigación, marketing o análisis.</p>

                  <h2>4. Tus Derechos y Opciones</h2>
                  <p>Dependiendo de tu ubicación, puedes tener ciertos derechos con respecto a tu información personal:</p>
                  
                  <h3>4.1 Acceso y actualización</h3>
                  <p>Puedes acceder y actualizar cierta información a través de la configuración de tu cuenta. También puedes contactarnos para solicitar acceso a tu información personal.</p>
                  
                  <h3>4.2 Eliminación</h3>
                  <p>Puedes solicitar la eliminación de tu cuenta y la información personal asociada a ella. Ten en cuenta que podemos retener cierta información según lo requiera la ley o para fines comerciales legítimos.</p>
                  
                  <h3>4.3 Oposición al procesamiento</h3>
                  <p>En ciertas circunstancias, puedes oponerte al procesamiento de tu información personal.</p>
                  
                  <h3>4.4 Restricción del procesamiento</h3>
                  <p>Puedes solicitar que restrinjamos el procesamiento de tu información personal en ciertas circunstancias.</p>
                  
                  <h3>4.5 Portabilidad de datos</h3>
                  <p>Puedes solicitar una copia de tu información personal en un formato estructurado, comúnmente utilizado y legible por máquina.</p>
                  
                  <h3>4.6 Retirada del consentimiento</h3>
                  <p>Si hemos recopilado y procesado tu información con tu consentimiento, puedes retirar tu consentimiento en cualquier momento. Esto no afectará la legalidad de cualquier procesamiento que hayamos realizado antes de que retires tu consentimiento.</p>
                  
                  <h3>4.7 Opciones de comunicación</h3>
                  <p>Puedes optar por no recibir comunicaciones promocionales siguiendo las instrucciones de cancelación de suscripción incluidas en esos mensajes o ajustando la configuración de tu cuenta.</p>

                  <h2>5. Seguridad de la Información</h2>
                  <p>La seguridad de tu información personal es importante para nosotros. Implementamos medidas técnicas, administrativas y físicas diseñadas para proteger tu información contra acceso no autorizado, divulgación, alteración o destrucción.</p>
                  <p>Sin embargo, ningún sistema de seguridad es impenetrable, y no podemos garantizar la seguridad absoluta de tu información. Te recomendamos tomar precauciones para proteger tu información personal, como mantener confidenciales tus credenciales de cuenta.</p>

                  <h2>6. Transferencias Internacionales de Datos</h2>
                  <p>Podemos transferir, almacenar y procesar tu información en países distintos al tuyo. Estas transferencias son necesarias para operar nuestros servicios de manera eficiente y para proporcionarte nuestros servicios.</p>
                  <p>Cuando transferimos información desde el Espacio Económico Europeo (EEE) a países que no han sido reconocidos por la Comisión Europea como que ofrecen un nivel adecuado de protección de datos, nos aseguramos de que existan salvaguardias apropiadas, como cláusulas contractuales estándar, para proteger tu información.</p>

                  <h2>7. Retención de Datos</h2>
                  <p>Conservamos tu información personal durante el tiempo necesario para cumplir con los propósitos descritos en esta Política de Privacidad, a menos que se requiera o permita un período de retención más largo por ley.</p>
                  <p>Los criterios utilizados para determinar nuestros períodos de retención incluyen:</p>
                  <ul>
                    <li>El tiempo que tienes una cuenta o utilizas nuestros servicios.</li>
                    <li>Si tenemos una obligación legal de conservar la información.</li>
                    <li>Si la retención es aconsejable a la luz de nuestra posición legal (como en relación con estatutos de limitaciones aplicables, litigios o investigaciones regulatorias).</li>
                  </ul>

                  <h2>8. Niños</h2>
                  <p>Nuestros servicios no están dirigidos a niños menores de 18 años. No recopilamos intencionalmente información personal de niños menores de 18 años. Si eres padre o tutor y crees que tu hijo nos ha proporcionado información personal, contáctanos para que podamos tomar las medidas adecuadas.</p>

                  <h2>9. Cambios a esta Política de Privacidad</h2>
                  <p>Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas de información o leyes aplicables. Te notificaremos sobre cualquier cambio material publicando la nueva Política de Privacidad en nuestro sitio web y, cuando sea apropiado, enviándote una notificación.</p>
                  <p>La fecha de la última actualización se indicará al principio de la Política de Privacidad. Te recomendamos revisar periódicamente esta Política de Privacidad para estar informado sobre cómo protegemos tu información.</p>

                  <h2>10. Contacto</h2>
                  <p>Si tienes preguntas, comentarios o inquietudes sobre esta Política de Privacidad o nuestras prácticas de privacidad, contáctanos en:</p>
                  <p>
                    <strong>Correo electrónico:</strong> privacidad@asesoriatuwebai.com<br />
                    <strong>Dirección postal:</strong> Calle Principal 123, 28001 Madrid, España<br />
                    <strong>Teléfono:</strong> +34 91 123 4567
                  </p>

                  <p><strong>Última actualización:</strong> 14 de abril de 2025</p>
                </motion.div>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <motion.a 
                href="/" 
                className="inline-flex items-center text-[#00CCFF] hover:text-[#9933FF] transition-colors duration-300"
                initial={{ opacity: 0 }}
                animate={hasIntersected ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Volver al inicio</span>
              </motion.a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}