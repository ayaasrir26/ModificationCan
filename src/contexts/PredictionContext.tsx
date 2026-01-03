import { createContext } from 'react';
import { Tables } from '@/integrations/supabase/types';

export interface PredictionMatch {
    id: string;
    round: 'roundOf16' | 'quarterFinals' | 'semiFinals' | 'final';
    matchIndex: number;
    team1?: Tables<'teams'> | null;
    team2?: Tables<'teams'> | null;
    score1?: number | null;
    score2?: number | null;
    predictedWinner?: Tables<'teams'> | null;
    actualWinner?: Tables<'teams'> | null;
}

interface PredictionContextType {
    predictions: Record<string, PredictionMatch>;
    setPrediction: (matchId: string, winner: Tables<'teams'>) => void;
    setScore: (matchId: string, score1: number | null, score2: number | null) => void;
    getWinner: (matchId: string, t1: Tables<"teams"> | null, t2: Tables<"teams"> | null) => Tables<"teams"> | null;
    clearPredictions: () => void;
    calculatePathToFinal: (teamCode: string) => string[];
    getPredictedChampion: () => Tables<'teams'> | null;
    savePredictions: () => Promise<void>;
    isSaving: boolean;
}

export const PredictionContext = createContext<PredictionContextType | undefined>(undefined);