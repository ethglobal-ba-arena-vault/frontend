import { useState, useEffect, useCallback, useRef } from 'react';
import { PredictionData } from './LatestPredictions';

const MAX_ROWS = 5;
const ANIMATION_DURATION = 500;

// Best Practice: Custom hook for declarative intervals
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function usePredictions() {
  const [rows, setRows] = useState<PredictionData[]>([]);
  const [availablePredictions, setAvailablePredictions] = useState<PredictionData[]>([]);
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
  
  const [fadingOutId, setFadingOutId] = useState<string | null>(null);
  const [fadingInId, setFadingInId] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    const loadPredictions = async () => {
      try {
        const response = await fetch('/predictions.json');
        if (!response.ok) {
          throw new Error('Failed to load predictions data');
        }
        
        const data = (await response.json()) as PredictionData[];
        setAvailablePredictions(data);
        
        // Initialize with random rows
        const initialCount = Math.min(MAX_ROWS, data.length);
        const initialRows: PredictionData[] = [];
        const initialUsedIds = new Set<string>();
        
        for (let i = 0; i < initialCount; i++) {
          const unused = data.filter(p => !initialUsedIds.has(p.id));
          if (unused.length === 0) {
            break;
          }
          
          const random = unused[Math.floor(Math.random() * unused.length)];
          initialRows.unshift(random);
          initialUsedIds.add(random.id);
        }
        
        setRows(initialRows);
        setUsedIds(initialUsedIds);
      } catch (error) {
        console.error('Error loading predictions:', error);
      }
    };

    loadPredictions();
  }, []);

  const addRandomRow = useCallback(() => {
    if (availablePredictions.length === 0) {
      return;
    }

    // Logic to pick a new row (uses current state)
    const unused = availablePredictions.filter(p => !usedIds.has(p.id));
    const candidates = unused.length > 0 ? unused : availablePredictions; // Reset if exhausted
    
    if (candidates.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * candidates.length);
    const selectedPrediction = candidates[randomIndex];

    // 1. Handle Used IDs
    setUsedIds(prev => {
      const next = new Set(prev);
      next.add(selectedPrediction.id);
      return next;
    });

    // 2. Handle Animation (Fade In)
    setFadingInId(selectedPrediction.id);
    setTimeout(() => setFadingInId(null), ANIMATION_DURATION);

    // 3. Update Rows (Handle Fade Out if full)
    setRows(currentRows => {
      const isFull = currentRows.length >= MAX_ROWS;
      
      if (isFull) {
        // Mark the last row to fade out
        const lastRowToExit = currentRows[currentRows.length - 1];
        setFadingOutId(lastRowToExit.id);
        
        // Schedule removal after animation
        setTimeout(() => {
          setFadingOutId(null);
          setRows(curr => curr.filter(r => r.id !== lastRowToExit.id));
        }, ANIMATION_DURATION);
        
        // Temporarily add new row while keeping the old one for animation
        // This ensures the "fade out" row is still in the DOM to be animated
        return [selectedPrediction, ...currentRows];
      }
      
      return [selectedPrediction, ...currentRows];
    });
  }, [availablePredictions, usedIds]);

  // Run interval every 1s if we have data
  useInterval(addRandomRow, availablePredictions.length > 0 ? 1000 : null);

  return {
    rows,
    addRandomRow,
    canAddMore: rows.length < MAX_ROWS,
    fadingOutId,
    fadingInId,
  };
}
