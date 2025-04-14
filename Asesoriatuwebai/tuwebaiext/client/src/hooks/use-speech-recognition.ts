import { useState, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionProps {
  onResult?: (transcript: string) => void;
  onEnd?: () => void;
  language?: string;
}

interface SpeechRecognitionResult {
  transcript: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  error: string | null;
  isSpeechSupported: boolean;
}

// Crear un tipo para la API de reconocimiento de voz
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onerror: (event: any) => void;
  onend: (event: any) => void;
  onresult: (event: any) => void;
}

// Adaptador para verificar si el navegador soporta reconocimiento de voz
const getSpeechRecognition = (): { supported: boolean, recognition: SpeechRecognition | null } => {
  if (typeof window === 'undefined') {
    return { supported: false, recognition: null };
  }
  
  const SpeechRecognitionAPI = (window as any).SpeechRecognition ||
                           (window as any).webkitSpeechRecognition ||
                           (window as any).mozSpeechRecognition ||
                           (window as any).msSpeechRecognition;
  
  if (!SpeechRecognitionAPI) {
    return { supported: false, recognition: null };
  }
  
  return { supported: true, recognition: new SpeechRecognitionAPI() };
};

export function useSpeechRecognition({
  onResult,
  onEnd,
  language = 'es-ES'
}: UseSpeechRecognitionProps = {}): SpeechRecognitionResult {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { supported, recognition } = getSpeechRecognition();

  // Configurar reconocimiento de voz
  useEffect(() => {
    if (!supported || !recognition) return;
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language;
    
    recognition.onresult = (event: any) => {
      const last = event.results.length - 1;
      const result = event.results[last][0].transcript;
      setTranscript(result);
      if (onResult) onResult(result);
    };
    
    recognition.onerror = (event: any) => {
      setError(`Error: ${event.error}`);
    };
    
    recognition.onend = () => {
      setIsListening(false);
      if (onEnd) onEnd();
    };
    
    return () => {
      if (isListening && recognition) {
        recognition.stop();
      }
    };
  }, [onResult, onEnd, language, supported, recognition]);

  // Funciones para iniciar y detener el reconocimiento
  const startListening = useCallback(() => {
    if (!supported || !recognition) {
      setError('El reconocimiento de voz no está soportado en este navegador');
      return;
    }
    
    setError(null);
    try {
      recognition.start();
      setIsListening(true);
    } catch (e) {
      setError('Error al iniciar el reconocimiento de voz');
      console.error(e);
    }
  }, [supported, recognition]);

  const stopListening = useCallback(() => {
    if (!supported || !recognition) return;
    
    try {
      recognition.stop();
      setIsListening(false);
    } catch (e) {
      console.error(e);
    }
  }, [supported, recognition]);

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    error,
    isSpeechSupported: supported
  };
}

// Hook para sintesis de voz
interface UseSpeechSynthesisProps {
  onEnd?: () => void;
  language?: string;
  rate?: number;
  pitch?: number;
}

interface SpeechSynthesisResult {
  speak: (text: string) => void;
  cancel: () => void;
  isSpeaking: boolean;
  isSynthesisSupported: boolean;
  availableVoices: SpeechSynthesisVoice[];
  setVoice: (voice: SpeechSynthesisVoice) => void;
  currentVoice: SpeechSynthesisVoice | null;
}

export function useSpeechSynthesis({
  onEnd,
  language = 'es-ES',
  rate = 1,
  pitch = 1
}: UseSpeechSynthesisProps = {}): SpeechSynthesisResult {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null);
  
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  const isSynthesisSupported = !!synth;
  
  // Obtener voces disponibles
  useEffect(() => {
    if (!isSynthesisSupported) return;
    
    const updateVoices = () => {
      const voices = synth?.getVoices() || [];
      setAvailableVoices(voices);
      
      // Configurar voz por defecto en español si existe
      if (!currentVoice && voices.length > 0) {
        const spanishVoice = voices.find(voice => voice.lang.includes('es'));
        setCurrentVoice(spanishVoice || voices[0]);
      }
    };
    
    updateVoices();
    
    // Algunas implementaciones cargan las voces de forma asíncrona
    if (synth?.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = updateVoices;
    }
  }, [isSynthesisSupported, synth]);
  
  // Función para hablar
  const speak = useCallback((text: string) => {
    if (!isSynthesisSupported || !synth) return;
    
    // Cancelar cualquier síntesis en curso
    synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = rate;
    utterance.pitch = pitch;
    
    if (currentVoice) {
      utterance.voice = currentVoice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };
    
    synth.speak(utterance);
  }, [isSynthesisSupported, synth, language, rate, pitch, currentVoice, onEnd]);
  
  // Cancelar síntesis
  const cancel = useCallback(() => {
    if (!isSynthesisSupported || !synth) return;
    synth.cancel();
    setIsSpeaking(false);
  }, [isSynthesisSupported, synth]);
  
  return {
    speak,
    cancel,
    isSpeaking,
    isSynthesisSupported,
    availableVoices,
    setVoice: setCurrentVoice,
    currentVoice
  };
}