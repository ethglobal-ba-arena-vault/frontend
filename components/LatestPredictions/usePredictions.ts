import { useState, useEffect, useCallback, useRef } from 'react';
import { PredictionData } from './LatestPredictions';

const MAX_ROWS = 5;

export function usePredictions() {
  const [rows, setRows] = useState<PredictionData[]>([]);
  const [availablePredictions, setAvailablePredictions] = useState<PredictionData[]>([]);
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
  const [fadingOutId, setFadingOutId] = useState<string | null>(null);
  const [fadingInId, setFadingInId] = useState<string | null>(null);
  
  // Use refs to access latest state in interval callback (to avoid stale closures)
  const rowsRef = useRef<PredictionData[]>([]);
  const usedIdsRef = useRef<Set<string>>(new Set());
  const availablePredictionsRef = useRef<PredictionData[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isProcessingRef = useRef<boolean>(false); // Prevent concurrent executions

  // Keep refs in sync with state
  useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);

  useEffect(() => {
    usedIdsRef.current = usedIds;
  }, [usedIds]);

  useEffect(() => {
    availablePredictionsRef.current = availablePredictions;
  }, [availablePredictions]);

  // Load predictions data on mount and add initial rows
  useEffect(() => {
    const loadPredictions = async () => {
      try {
        // Fetch the JSON file
        const response = await fetch('/predictions.json');
        if (!response.ok) {
          throw new Error('Failed to load predictions data');
        }
        const data = (await response.json()) as PredictionData[];
        
        setAvailablePredictions(data);
        availablePredictionsRef.current = data;
        
        // Add 5 initial rows randomly
        const initialCount = Math.min(5, data.length);
        const initialRows: PredictionData[] = [];
        const initialUsedIds = new Set<string>();
        
        for (let i = 0; i < initialCount; i++) {
          const unusedPredictions = data.filter((pred) => !initialUsedIds.has(pred.id));
          if (unusedPredictions.length === 0) break;
          
          const randomIndex = Math.floor(Math.random() * unusedPredictions.length);
          const selectedPrediction = unusedPredictions[randomIndex];
          initialRows.unshift(selectedPrediction); // Add to beginning so first is at top
          initialUsedIds.add(selectedPrediction.id);
        }
        
        setRows(initialRows);
        rowsRef.current = initialRows;
        setUsedIds(initialUsedIds);
        usedIdsRef.current = initialUsedIds;
      } catch (error) {
        console.error('Error loading predictions:', error);
      }
    };

    loadPredictions();
  }, []);

  // Function to add a random row
  const addRandomRow = useCallback(() => {
    const currentRows = rowsRef.current;
    const currentUsedIds = usedIdsRef.current;
    const currentAvailable = availablePredictionsRef.current;

    // Filter out already used predictions
    const unusedPredictions = currentAvailable.filter(
      (pred) => !currentUsedIds.has(pred.id)
    );

    // If all predictions are used, reset the used set
    const predictionsToChooseFrom =
      unusedPredictions.length > 0 ? unusedPredictions : currentAvailable;

    if (predictionsToChooseFrom.length === 0) {
      return; // No predictions available
    }

    // Pick a random prediction
    const randomIndex = Math.floor(Math.random() * predictionsToChooseFrom.length);
    const selectedPrediction = predictionsToChooseFrom[randomIndex];

    // If at max rows, fade out the last row and remove it
    let newRows: PredictionData[];
    let lastRowId: string | null = null;
    
    // Mark new row for fade in
    setFadingInId(selectedPrediction.id);
    setTimeout(() => {
      setFadingInId(null);
    }, 500);
    
    if (currentRows.length >= MAX_ROWS) {
      // Mark the last row for fade out
      lastRowId = currentRows[currentRows.length - 1].id;
      setFadingOutId(lastRowId);
      
      // Remove the last row and add new one at the beginning
      newRows = [selectedPrediction, ...currentRows.slice(0, -1)];
      
      // Clear fade out after animation completes
      setTimeout(() => {
        setFadingOutId(null);
      }, 500);
    } else {
      // Add new row at the beginning
      newRows = [selectedPrediction, ...currentRows];
    }

    const newUsedIds = new Set(currentUsedIds).add(selectedPrediction.id);
    
    setRows(newRows);
    setUsedIds(newUsedIds);
    rowsRef.current = newRows;
    usedIdsRef.current = newUsedIds;
  }, []);

  // Callback for adding a random row - uses refs to avoid stale closures
  const addRandomRowPeriodically = useCallback(() => {
    // Prevent concurrent executions - critical for preventing multiple intervals from running simultaneously
    if (isProcessingRef.current) {
      return;
    }
    
    isProcessingRef.current = true;
    
    try {
      const currentRows = rowsRef.current;
      const currentUsedIds = usedIdsRef.current;
      const currentAvailable = availablePredictionsRef.current;

      if (currentAvailable.length === 0) {
        return; // No predictions available yet
      }

      // Critical safety check: ensure we never exceed MAX_ROWS
      if (currentRows.length > MAX_ROWS) {
        const trimmedRows = currentRows.slice(0, MAX_ROWS);
        setRows(trimmedRows);
        rowsRef.current = trimmedRows;
        return; // Skip this iteration to let the state settle
      }

      // Filter out already used predictions
      const unusedPredictions = currentAvailable.filter(
        (pred) => !currentUsedIds.has(pred.id)
      );

      // If all predictions are used, reset the used set
      const predictionsToChooseFrom =
        unusedPredictions.length > 0 ? unusedPredictions : currentAvailable;

      if (predictionsToChooseFrom.length === 0) {
        return; // No predictions available
      }

      // Pick a random prediction
      const randomIndex = Math.floor(Math.random() * predictionsToChooseFrom.length);
      const selectedPrediction = predictionsToChooseFrom[randomIndex];

      // Calculate new rows - ensure we never exceed MAX_ROWS
      let newRows: PredictionData[];
      
      if (currentRows.length >= MAX_ROWS) {
        // Mark the last row for fade out
        const lastRowId = currentRows[currentRows.length - 1].id;
        setFadingOutId(lastRowId);
        
        // Remove the last row and add new one at the beginning
        newRows = [selectedPrediction, ...currentRows.slice(0, -1)];
        
        // Clear fade out after animation completes
        setTimeout(() => {
          setFadingOutId(null);
        }, 500);
      } else {
        // Add new row at the beginning
        newRows = [selectedPrediction, ...currentRows];
      }

      // Final safety check: ensure newRows never exceeds MAX_ROWS
      const finalRows = newRows.length > MAX_ROWS ? newRows.slice(0, MAX_ROWS) : newRows;
      const newUsedIds = new Set(currentUsedIds).add(selectedPrediction.id);
      
      // Use functional update to prevent race conditions
      setRows((prevRows) => {
        // Double-check: if we're already at max, don't add more
        if (prevRows.length >= MAX_ROWS && finalRows.length > MAX_ROWS) {
          return prevRows;
        }
        // Ensure we never exceed MAX_ROWS
        const safeRows = finalRows.length > MAX_ROWS ? finalRows.slice(0, MAX_ROWS) : finalRows;
        rowsRef.current = safeRows;
        return safeRows;
      });
      
      setUsedIds(newUsedIds);
      usedIdsRef.current = newUsedIds;

      // Mark new row for fade in
      setFadingInId(selectedPrediction.id);
      setTimeout(() => {
        setFadingInId(null);
      }, 500);
    } finally {
      isProcessingRef.current = false;
    }
  }, []); // Empty deps - callback uses refs, so it doesn't need to change

  // Manual interval management for better control and to prevent duplicate intervals
  useEffect(() => {
    // Always clear existing interval first - critical to prevent duplicates
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Don't start interval until we have predictions data
    if (availablePredictions.length === 0) {
      return;
    }

    // Create new interval
    intervalRef.current = setInterval(() => {
      addRandomRowPeriodically();
    }, 1000);

    // Cleanup function - always runs on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      isProcessingRef.current = false; // Reset processing flag on cleanup
    };
  }, [availablePredictions.length, addRandomRowPeriodically]);

  // Safety effect: ensure rows never exceed MAX_ROWS (defensive check)
  useEffect(() => {
    if (rows.length > MAX_ROWS) {
      const trimmedRows = rows.slice(0, MAX_ROWS);
      setRows(trimmedRows);
      rowsRef.current = trimmedRows;
    }
  }, [rows]);

  return {
    rows,
    addRandomRow,
    canAddMore: rows.length < MAX_ROWS,
    fadingOutId,
    fadingInId,
  };
}
