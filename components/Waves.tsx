'use client';

import React, { useEffect, useRef } from 'react';

interface Wave {
  color: string;
  speed?: number;
  amplitude?: number;
  height: number; // New property: height of the wave
}

interface OverlappingWavesProps {
  height: number;
  width: number;
  waves: Wave[];
  baseSpeed?: number;
  baseAmplitude?: number;
}

const Waves: React.FC<OverlappingWavesProps> = ({
  height,
  width,
  waves,
  baseSpeed = 0.5,
  baseAmplitude = 20,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let startTime: number | null = null;

    const setCanvasSize = () => {
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const drawWaves = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, width, height);

      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        const waveSpeed = wave.speed || baseSpeed;
        const waveAmplitude = wave.amplitude || baseAmplitude;
        const waveHeight = wave.height;

        for (let x = 0; x < width; x++) {
          const frequency = 0.01 + index * 0.005;
          const y = Math.sin(x * frequency + elapsed * waveSpeed * 0.002 + (index * Math.PI * 2) / waves.length) * waveAmplitude;
          ctx.lineTo(x, waveHeight + y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.fillStyle = wave.color;
        ctx.globalAlpha = 0.5; // Set transparency
        ctx.fill();
        ctx.globalAlpha = 1; // Reset transparency
      });

      animationFrameId = requestAnimationFrame(drawWaves);
    };

    setCanvasSize();
    animationFrameId = requestAnimationFrame(drawWaves);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [height, width, waves, baseSpeed, baseAmplitude]);

  return (
    <div
      style={{ height }}
      className="rounded-xl overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
};

export default Waves;