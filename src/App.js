import React, { useState, useEffect } from 'react';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const stop$ = new Subject();

  useEffect(() => {
    const interval$ = interval(1000).pipe(
      takeUntil(stop$)
    );

    if (isRunning) {
      const subscription = interval$.subscribe(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      });

      return () => {
        subscription.unsubscribe();
      };
    }

    return () => {};
  }, [isRunning, stop$]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setSeconds(0);
    setIsRunning(false);
    stop$.next();
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>{seconds} segundos</p>
      <button onClick={startStopwatch} disabled={isRunning}>
        Iniciar
      </button>
      <button onClick={stopStopwatch} disabled={!isRunning}>
        Detener
      </button>
      <button onClick={resetStopwatch}>Reiniciar</button>
    </div>
  );
};

export default Stopwatch;
