import { useState, useCallback } from 'react';

interface SentimentResult {
  type: 'positive' | 'negative' | 'neutral';
  score: number;
  confidence: number;
}

interface UseSentimentAnalysisResult {
  analyzeSentiment: (text: string) => Promise<SentimentResult>;
  isAnalyzing: boolean;
  error: Error | null;
}

// Lista de palabras positivas y negativas en español para análisis simple
const POSITIVE_WORDS = [
  'excelente', 'genial', 'increíble', 'bueno', 'fantástico', 'maravilloso', 
  'encantado', 'feliz', 'contento', 'satisfecho', 'perfecto', 'asombroso',
  'gracias', 'agradecido', 'útil', 'claridad', 'fácil', 'eficiente',
  'rapidez', 'magnífico', 'estupendo', 'brillante', 'efectivo', 'valioso'
];

const NEGATIVE_WORDS = [
  'malo', 'terrible', 'horrible', 'pésimo', 'deficiente', 'decepcionado',
  'frustrado', 'enfadado', 'molesto', 'enojado', 'inútil', 'difícil',
  'complicado', 'lento', 'confuso', 'incomprensible', 'error', 'problema',
  'fallo', 'no funciona', 'perdido', 'aburrido', 'tedioso', 'ineficiente'
];

// Hook para análisis de sentimiento local
export function useSentimentAnalysis(): UseSentimentAnalysisResult {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const analyzeSentiment = useCallback(async (text: string): Promise<SentimentResult> => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // En un entorno real, podríamos usar la API de OpenAI para esto
      // Pero como es un ejemplo, implementamos un análisis local simple
      
      const lowerText = text.toLowerCase();
      let positiveScore = 0;
      let negativeScore = 0;
      
      // Contar palabras positivas
      POSITIVE_WORDS.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = lowerText.match(regex);
        if (matches) positiveScore += matches.length * 0.1;
      });
      
      // Contar palabras negativas
      NEGATIVE_WORDS.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = lowerText.match(regex);
        if (matches) negativeScore += matches.length * 0.1;
      });
      
      // Calcular score total (entre -1 y 1)
      const totalScore = positiveScore - negativeScore;
      const normalizedScore = Math.max(-1, Math.min(1, totalScore));
      
      // Determinar tipo de sentimiento
      let type: 'positive' | 'negative' | 'neutral';
      if (normalizedScore > 0.2) {
        type = 'positive';
      } else if (normalizedScore < -0.2) {
        type = 'negative';
      } else {
        type = 'neutral';
      }
      
      // Calcular nivel de confianza (0 a 1)
      // Más palabras de sentimiento = mayor confianza
      const totalMatches = positiveScore + negativeScore;
      const confidence = Math.min(1, totalMatches / 5); // 5+ matches = confianza máxima
      
      return {
        type,
        score: Math.abs(normalizedScore),
        confidence
      };
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error en el análisis de sentimiento');
      setError(error);
      return {
        type: 'neutral',
        score: 0,
        confidence: 0
      };
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return {
    analyzeSentiment,
    isAnalyzing,
    error
  };
}

// Versión avanzada que podría usar OpenAI
export async function analyzeTextWithAI(text: string, apiKey?: string): Promise<SentimentResult> {
  // Esta función se implementaría con la API real de OpenAI
  // Por ahora, usamos nuestra versión simplificada
  if (!apiKey) {
    throw new Error('Se requiere una API key para el análisis avanzado de sentimiento');
  }
  
  try {
    const response = await fetch('/api/analyze-sentiment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    
    if (!response.ok) {
      throw new Error('Error en la solicitud de análisis de sentimiento');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al analizar sentimiento con IA:', error);
    throw error;
  }
}