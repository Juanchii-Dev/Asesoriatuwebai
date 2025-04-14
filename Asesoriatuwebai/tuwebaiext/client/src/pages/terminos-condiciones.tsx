import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import AnimatedShape from '@/components/ui/animated-shape';
import ScrollProgress from '@/components/ui/scroll-progress';
import WhatsAppButton from '@/components/ui/whatsapp-button';

export default function TerminosCondiciones() {
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
                <span className="gradient-text gradient-border inline-block pb-2">Términos y Condiciones</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Estos términos y condiciones constituyen un acuerdo legalmente vinculante entre tú y Asesoría Tu Web AI.
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
                  <h2>1. Aceptación de los Términos</h2>
                  <p>Al acceder y utilizar los servicios de Asesoría Tu Web AI ("la Empresa", "nosotros", "nuestro"), aceptas quedar vinculado por estos Términos y Condiciones ("Términos"), nuestra Política de Privacidad, y cualquier otro término o política a la que se haga referencia aquí. Si no estás de acuerdo con estos Términos, por favor, abstente de utilizar nuestros servicios.</p>

                  <h2>2. Descripción de los Servicios</h2>
                  <p>Asesoría Tu Web AI proporciona servicios de consultoría estratégica, desarrollo web profesional, marketing digital y SEO, optimización de conversión (CRO), y automatización de marketing (colectivamente, los "Servicios"). Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto de nuestros Servicios en cualquier momento sin previo aviso.</p>

                  <h2>3. Elegibilidad</h2>
                  <p>Para utilizar nuestros Servicios, debes ser mayor de 18 años o la edad legal de mayoría en tu jurisdicción, y tener la capacidad legal para celebrar acuerdos vinculantes. Si utilizas los Servicios en nombre de una empresa u otra entidad legal, garantizas que tienes la autoridad para vincular a dicha entidad a estos Términos.</p>

                  <h2>4. Cuentas de Usuario</h2>
                  <p>4.1. <strong>Registro:</strong> Algunos de nuestros Servicios pueden requerir que te registres y crees una cuenta. Debes proporcionar información precisa, actualizada y completa durante el proceso de registro y mantener esta información actualizada.</p>
                  <p>4.2. <strong>Seguridad de la Cuenta:</strong> Eres responsable de mantener la confidencialidad de tus credenciales de cuenta y de todas las actividades que ocurran bajo tu cuenta. Debes notificarnos inmediatamente de cualquier uso no autorizado de tu cuenta o cualquier otra violación de seguridad.</p>
                  <p>4.3. <strong>Terminación de la Cuenta:</strong> Nos reservamos el derecho de suspender o terminar tu cuenta y el acceso a nuestros Servicios a nuestra discreción, sin previo aviso, por cualquier razón, incluyendo, pero no limitado a, la violación de estos Términos.</p>

                  <h2>5. Servicios y Tarifas</h2>
                  <p>5.1. <strong>Tarifas y Pagos:</strong> Las tarifas por nuestros Servicios se describen en nuestro sitio web o en los acuerdos separados. Todos los pagos son finales y no reembolsables, a menos que se especifique lo contrario.</p>
                  <p>5.2. <strong>Métodos de Pago:</strong> Aceptamos varios métodos de pago como se indica en nuestro sitio web. Eres responsable de proporcionar información de pago válida y actualizada.</p>
                  <p>5.3. <strong>Impuestos:</strong> Las tarifas por nuestros Servicios no incluyen impuestos, a menos que se indique expresamente. Eres responsable de pagar todos los impuestos aplicables.</p>
                  <p>5.4. <strong>Cambios en las Tarifas:</strong> Nos reservamos el derecho de modificar nuestras tarifas en cualquier momento. Te notificaremos con anticipación sobre cualquier cambio en las tarifas.</p>

                  <h2>6. Derechos de Propiedad Intelectual</h2>
                  <p>6.1. <strong>Nuestros Derechos:</strong> Todos los derechos, títulos e intereses sobre nuestros Servicios, incluyendo todo el contenido, características, funcionalidades, y tecnologías subyacentes, son y permanecerán nuestra propiedad exclusiva o la de nuestros licenciantes.</p>
                  <p>6.2. <strong>Licencia Limitada:</strong> Sujeto a tu cumplimiento de estos Términos, te otorgamos una licencia limitada, no exclusiva, no transferible y revocable para acceder y utilizar nuestros Servicios para tus propósitos internos.</p>
                  <p>6.3. <strong>Retroalimentación:</strong> Si nos proporcionas ideas, sugerencias u otra retroalimentación sobre nuestros Servicios, nos otorgas una licencia perpetua, irrevocable, mundial, libre de regalías y no exclusiva para usar, modificar, distribuir, sublicenciar y de otro modo explotar dicha retroalimentación sin restricciones.</p>
                  <p>6.4. <strong>Materiales del Cliente:</strong> Retienes todos los derechos sobre cualquier contenido, datos o materiales que nos proporciones en relación con nuestros Servicios. Nos otorgas una licencia mundial, no exclusiva, libre de regalías para usar, reproducir, modificar, adaptar, publicar, distribuir y mostrar dichos materiales con el único propósito de proporcionarte nuestros Servicios.</p>

                  <h2>7. Contenido del Usuario</h2>
                  <p>7.1. <strong>Responsabilidad:</strong> Eres el único responsable de todo el contenido que envíes, publiques o muestres a través de nuestros Servicios.</p>
                  <p>7.2. <strong>Restricciones:</strong> No puedes enviar, publicar o transmitir a través de nuestros Servicios cualquier contenido que sea ilegal, amenazante, abusivo, difamatorio, obsceno, invasivo de la privacidad de otros, o que infrinja cualquier derecho de terceros.</p>
                  <p>7.3. <strong>Derechos de Supervisión:</strong> No tenemos obligación de monitorear el contenido enviado por los usuarios, pero nos reservamos el derecho de eliminar, editar o rechazar cualquier contenido a nuestra discreción.</p>

                  <h2>8. Indemnización</h2>
                  <p>Aceptas indemnizar, defender y mantener indemne a Asesoría Tu Web AI, sus afiliados, oficiales, directores, empleados, agentes y licenciantes, de y contra cualquier reclamo, demanda, daño, responsabilidad, costo y gasto (incluyendo honorarios razonables de abogados) que surjan de o estén relacionados con tu uso de nuestros Servicios, tu violación de estos Términos, o tu infracción de cualquier derecho de terceros.</p>

                  <h2>9. Limitación de Responsabilidad</h2>
                  <p>9.1. <strong>Exención de Garantías:</strong> Nuestros Servicios se proporcionan "tal cual" y "según disponibilidad", sin garantías de ningún tipo, ya sean expresas o implícitas.</p>
                  <p>9.2. <strong>Limitación de Responsabilidad:</strong> En ningún caso Asesoría Tu Web AI será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, o cualquier pérdida de beneficios o ingresos, ya sea incurrida directa o indirectamente, o cualquier pérdida de datos, uso, buena voluntad, u otras pérdidas intangibles, que resulten de (i) tu acceso o uso o incapacidad para acceder o usar nuestros Servicios; (ii) cualquier conducta o contenido de terceros en nuestros Servicios; o (iii) acceso no autorizado, uso o alteración de tus transmisiones o contenido.</p>
                  <p>9.3. <strong>Exclusiones:</strong> Algunas jurisdicciones no permiten la exclusión de ciertas garantías o la exclusión o limitación de responsabilidad por ciertos tipos de daños. En consecuencia, algunas de las limitaciones anteriores pueden no aplicarse a ti.</p>

                  <h2>10. Terminación</h2>
                  <p>10.1. <strong>Por Tu Parte:</strong> Puedes dejar de utilizar nuestros Servicios en cualquier momento.</p>
                  <p>10.2. <strong>Por Nuestra Parte:</strong> Podemos terminar o suspender tu acceso a nuestros Servicios, a nuestra discreción, sin previo aviso, por cualquier razón, incluyendo, pero no limitado a, la violación de estos Términos.</p>
                  <p>10.3. <strong>Efecto de la Terminación:</strong> Tras la terminación, tu derecho a utilizar nuestros Servicios cesará inmediatamente. Todas las disposiciones de estos Términos que por su naturaleza deberían sobrevivir a la terminación sobrevivirán, incluyendo, sin limitación, las disposiciones de propiedad, exenciones de garantía, indemnización y limitaciones de responsabilidad.</p>

                  <h2>11. Modificaciones de los Términos</h2>
                  <p>Nos reservamos el derecho de modificar estos Términos en cualquier momento. Te notificaremos de cualquier cambio publicando los nuevos Términos en nuestro sitio web o a través de otros canales de comunicación. Los cambios entrarán en vigor inmediatamente después de su publicación. Tu uso continuado de nuestros Servicios después de la publicación de los Términos modificados constituye tu aceptación de los cambios.</p>

                  <h2>12. Disposiciones Generales</h2>
                  <p>12.1. <strong>Ley Aplicable:</strong> Estos Términos se regirán e interpretarán de acuerdo con las leyes de España, sin tener en cuenta sus conflictos de principios legales.</p>
                  <p>12.2. <strong>Resolución de Disputas:</strong> Cualquier disputa que surja de o en relación con estos Términos será sometida a la jurisdicción exclusiva de los tribunales de Madrid, España.</p>
                  <p>12.3. <strong>Acuerdo Completo:</strong> Estos Términos constituyen el acuerdo completo entre tú y Asesoría Tu Web AI con respecto a nuestros Servicios y reemplazan cualquier acuerdo previo o contemporáneo.</p>
                  <p>12.4. <strong>Divisibilidad:</strong> Si alguna disposición de estos Términos se considera inválida o inaplicable, dicha disposición se interpretará, limitará o, si es necesario, separará en la medida necesaria para eliminar dicha invalidez o inaplicabilidad, y las demás disposiciones de estos Términos permanecerán en pleno vigor y efecto.</p>
                  <p>12.5. <strong>No Renuncia:</strong> Nuestra falta de hacer cumplir cualquier derecho o disposición de estos Términos no constituirá una renuncia a dicho derecho o disposición.</p>
                  <p>12.6. <strong>Contacto:</strong> Si tienes alguna pregunta sobre estos Términos, por favor contáctanos a través de la información proporcionada a continuación.</p>

                  <h2>13. Contacto</h2>
                  <p>Si tienes preguntas, comentarios o inquietudes sobre estos Términos, contáctanos en:</p>
                  <p>
                    <strong>Correo electrónico:</strong> legal@asesoriatuwebai.com<br />
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