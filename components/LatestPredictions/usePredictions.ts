import { useState, useEffect, useCallback, useRef } from 'react';
import { useInterval } from 'react-use';
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

  // Periodically add rows every 1 second (only after data is loaded)
  // useInterval handles cleanup automatically - pass null to pause
  useInterval(() => {
    const currentRows = rowsRef.current;
    const currentUsedIds = usedIdsRef.current;
    const currentAvailable = availablePredictionsRef.current;

    if (currentAvailable.length === 0) {
      return; // No predictions available yet
    }

    // Safety check: ensure we never exceed MAX_ROWS
    // If somehow we have more than MAX_ROWS, trim it first and skip this iteration
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

    // Calculate new rows
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
    
    // Update state separately (not nested)
    setRows(finalRows);
    setUsedIds(newUsedIds);
    
    // Update refs
    rowsRef.current = finalRows;
    usedIdsRef.current = newUsedIds;

    // Mark new row for fade in
    setFadingInId(selectedPrediction.id);
    setTimeout(() => {
      setFadingInId(null);
    }, 500);
  }, availablePredictions.length > 0 ? 1000 : null); // Pause when no data available

  return {
    rows,
    addRandomRow,
    canAddMore: rows.length < MAX_ROWS,
    fadingOutId,
    fadingInId,
  };
}
