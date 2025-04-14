import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import WhatsAppButton from "@/components/ui/whatsapp-button";

const formSchema = z.object({
  nombre: z.string().min(2, { message: "El nombre es requerido" }),
  email: z.string().email({ message: "Ingresá un email válido" }),
  empresa: z.string().optional(),
  mensaje: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Consulta() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      email: "",
      empresa: "",
      mensaje: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulamos envío del formulario
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    toast({
      title: "Consulta enviada",
      description: "Nos pondremos en contacto a la brevedad",
    });
    
    reset();
    
    // Revertimos el estado después de 5 segundos
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

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
          <div className="text-center">
            <Link to="/" className="text-3xl font-rajdhani font-bold mb-10 inline-block">
              TuWeb<span className="text-[#00CCFF]">.ai</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-rajdhani font-bold mb-4">
              <span className="gradient-text pb-2">Solicitá una consulta</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-4">
              Conversemos sobre tu proyecto y cómo podemos potenciarlo juntos.
            </p>
          </div>
        </div>
      </motion.header>

      {/* Formulario de consulta */}
      <section className="py-16 px-4 bg-[#0a0a0f]">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="bg-gradient-to-br from-[#00CCFF]/10 to-[#9933FF]/10 rounded-xl p-[1px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-[#121217] rounded-xl p-8">
                {submitted ? (
                  <motion.div
                    className="text-center py-16"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-rajdhani font-bold mb-4 text-white">¡Gracias por contactarnos!</h3>
                    <p className="text-gray-300 mb-6">
                      Hemos recibido tu consulta y nos pondremos en contacto a la brevedad.
                    </p>
                    <Link 
                      to="/"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium"
                    >
                      Volver al inicio
                    </Link>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label htmlFor="nombre" className="block text-white font-medium mb-2">
                        Nombre completo <span className="text-[#00CCFF]">*</span>
                      </label>
                      <Input
                        id="nombre"
                        {...register("nombre")}
                        className="bg-[#1A1A23] border-gray-700 text-white"
                        placeholder="Tu nombre"
                      />
                      {errors.nombre && (
                        <p className="text-[#00CCFF] text-sm mt-1">{errors.nombre.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-white font-medium mb-2">
                        Email <span className="text-[#00CCFF]">*</span>
                      </label>
                      <Input
                        id="email"
                        {...register("email")}
                        className="bg-[#1A1A23] border-gray-700 text-white"
                        placeholder="tu@email.com"
                      />
                      {errors.email && (
                        <p className="text-[#00CCFF] text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="empresa" className="block text-white font-medium mb-2">
                        Empresa (opcional)
                      </label>
                      <Input
                        id="empresa"
                        {...register("empresa")}
                        className="bg-[#1A1A23] border-gray-700 text-white"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="mensaje" className="block text-white font-medium mb-2">
                        Mensaje <span className="text-[#00CCFF]">*</span>
                      </label>
                      <Textarea
                        id="mensaje"
                        {...register("mensaje")}
                        className="bg-[#1A1A23] border-gray-700 text-white min-h-[120px]"
                        placeholder="Contanos sobre tu proyecto o consulta"
                      />
                      {errors.mensaje && (
                        <p className="text-[#00CCFF] text-sm mt-1">{errors.mensaje.message}</p>
                      )}
                    </div>
                    
                    <motion.div
                      className="pt-4"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        type="submit"
                        className="w-full py-6 text-lg bg-gradient-to-r from-[#00CCFF] to-[#9933FF] rounded-full text-white font-medium hover:shadow-lg hover:shadow-[#00CCFF]/20 transition-all"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                          </div>
                        ) : (
                          "Enviar consulta"
                        )}
                      </Button>
                    </motion.div>
                  </form>
                )}
                
                <div className="mt-8 pt-8 border-t border-gray-800">
                  <div className="flex items-center justify-center">
                    <p className="text-gray-300 mr-4">¿Preferís hablar directamente?</p>
                    <motion.a
                      href="https://wa.me/5492215688349?text=Hola,%20estoy%20interesado%20en%20sus%20servicios"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-[#25D366] rounded-full text-white font-medium hover:bg-[#20BF5B] transition-colors"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 mr-2">
                        <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                      </svg>
                      Escribinos en WhatsApp
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}