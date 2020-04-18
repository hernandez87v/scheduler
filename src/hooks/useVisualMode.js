import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace) {
    if (!replace) {
      setHistory([...history, newMode]);
    }
    return setMode(newMode);
  }

  function back() {
    if (history.length !== 1) {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, history.length - 1));
    }
  }

  return { mode, transition, back };
}
