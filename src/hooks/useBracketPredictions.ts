import { useContext } from 'react';
import { PredictionContext } from '../contexts/PredictionContext';

export const useBracketPredictions = () => {
    const context = useContext(PredictionContext);
    if (context === undefined) {
        throw new Error('useBracketPredictions must be used within a BracketPredictionProvider');
    }
    return context;
};