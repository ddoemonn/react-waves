# react-waves

The Waves component is a customizable, animated wave generator built with React. It allows you to create beautiful, overlapping wave animations with ease, perfect for adding dynamic backgrounds or decorative elements to your web applications.

https://github.com/user-attachments/assets/7f5f3f6e-70c4-4949-88d1-ea0ee9cdf05e


## Features

- Create multiple overlapping waves
- Customize colors, speeds, amplitudes, and heights for each wave
- Responsive design
- Smooth animations using HTML5 Canvas
- TypeScript support

## Component Code

Here's the full implementation of the Waves component:

```typescript
'use client';

import React, { useEffect, useRef } from 'react';

interface Wave {
  color: string;
  speed?: number;
  amplitude?: number;
  height: number;
}

interface WavesProps {
  height: number;
  width: number;
  waves: Wave[];
  baseSpeed?: number;
  baseAmplitude?: number;
}

const Waves: React.FC<WavesProps> = ({
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
```

Note the `'use client';` directive at the top of the file. This is necessary when using this component in a Next.js 13+ project with the App Router, as it marks this component as a Client Component.

## Usage

Here's a basic example of how to use the Waves component:

```jsx
import React from 'react';
import  Waves  from '@/components/Waves';

const WavesExample = () => {
  const waves = [
    { color: '#3B82F6', height: 100, speed: 0.3 },
    { color: '#60A5FA', height: 150, amplitude: 15 },
    { color: '#93C5FD', height: 200, speed: 0.6 },
    { color: '#BFDBFE', height: 250, amplitude: 10 },
  ];

  return (
    <Waves
      height={400}
      width={600}
      waves={waves}
      baseSpeed={0.5}
      baseAmplitude={20}
    />
  );
};

export default WavesExample;
```

### Props

The `Waves` component accepts the following props:

- `height` (number): The height of the canvas in pixels.
- `width` (number): The width of the canvas in pixels.
- `waves` (array): An array of wave objects, each with the following properties:
  - `color` (string): The color of the wave (e.g., '#3B82F6').
  - `height` (number): The vertical position of the wave.
  - `speed` (number, optional): The speed of the wave animation.
  - `amplitude` (number, optional): The amplitude of the wave.
- `baseSpeed` (number, optional): The default speed for waves without a specified speed.
- `baseAmplitude` (number, optional): The default amplitude for waves without a specified amplitude.

### Advanced Usage

You can create more complex wave compositions by using multiple `Waves` components:

```jsx
import React from 'react';
import Waves from '@components/Waves';

const AdvancedWavesExample = () => {
  const wavesSets = [
    [
      { color: '#3B82F6', height: 100, speed: 0.3 },
      { color: '#60A5FA', height: 150, amplitude: 15 },
      { color: '#93C5FD', height: 200, speed: 0.6 },
      { color: '#BFDBFE', height: 250, amplitude: 10 },
    ],
    [
      { color: '#10B981', height: 80, amplitude: 25 },
      { color: '#34D399', height: 120, speed: 0.8 },
      { color: '#6EE7B7', height: 160, amplitude: 10 },
      { color: '#A7F3D0', height: 200, speed: 0.4 },
    ],
    [
      { color: '#8B5CF6', height: 70, speed: 0.5 },
      { color: '#A78BFA', height: 140, amplitude: 20 },
      { color: '#C4B5FD', height: 210, speed: 0.7 },
      { color: '#DDD6FE', height: 280, amplitude: 15 },
      { color: '#EDE9FE', height: 350, speed: 0.3 },
    ],
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {wavesSets.map((waves, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
          <Waves
            height={400}
            width={400}
            waves={waves}
            baseSpeed={0.5}
            baseAmplitude={20}
          />
        </div>
      ))}
    </div>
  );
};

export default AdvancedWavesExample;
```

This example creates three different wave sets, each with its own color scheme and properties.

## Customization

You can easily customize the appearance and behavior of the waves by adjusting the properties of each wave object. Experiment with different colors, speeds, amplitudes, and heights to create unique wave effects that match your design requirements.


## Browser Support

The Waves component should work in all modern browsers that support HTML5 Canvas. For older browsers, consider adding a fallback or polyfill for Canvas support.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
