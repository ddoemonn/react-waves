import Waves from "@/components/Waves";

export default function Home() {
  const wavesSets = [
    [
     
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
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
    
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {wavesSets.map((waves, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
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

     
    </main>
  );
}