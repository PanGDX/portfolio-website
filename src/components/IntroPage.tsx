import React, { useState, useEffect, useCallback } from 'react';

const IntroPage: React.FC = () => {
  const colors: string[] = ["blue", "red", "cyan", "purple", "pink"];
  const toPositions: string[] = ["bg-gradient-to-t", "bg-gradient-to-tr", "bg-gradient-to-r", "bg-gradient-to-br", "bg-gradient-to-b", "bg-gradient-to-bl", "bg-gradient-to-l", "bg-gradient-to-tl"];

  const [currentToPos, setToPos] = useState<string>("bg-gradient-to-r");
  const [currentColors, setCurrentColors] = useState<[string, string, string]>(["blue", "purple", "pink"]);

  const updateColors = useCallback(() => {
    setCurrentColors(prevColors => {
      const newColors = [...prevColors];
      const randomIndex = Math.floor(Math.random() * 3);
      newColors[randomIndex] = colors[Math.floor(Math.random() * colors.length)];

      console.log(newColors)
      return newColors as [string, string, string];
    });
  }, []);

  const updatePosition = useCallback(() => {
    setToPos(() => {
      const newPosition = toPositions[Math.floor(Math.random() * toPositions.length)];
      console.log(newPosition)
      return newPosition;
    });
  }, []);

  useEffect(() => {
    const colorIntervalID = setInterval(updateColors, 3000);
    const posIntervalID = setInterval(updatePosition, 3000);

    return () => {
      clearInterval(colorIntervalID);
      clearInterval(posIntervalID);
    };
  }, [updateColors, updatePosition]);

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <div className="w-1/2 flex flex-col justify-center items-start p-12">
        <h1 className="text-6xl font-bold mb-4">
          <span className={`animate-gradient-x bg-clip-text text-transparent ${currentToPos} from-${currentColors[0]}-400 via-${currentColors[1]}-600 to-${currentColors[2]}-500`}>
            PRAN
          </span>
          <br />
          <span className={`animate-gradient-x bg-clip-text text-transparent ${currentToPos} from-${currentColors[0]}-400 via-${currentColors[1]}-600 to-${currentColors[2]}-500`}>
            TANPRASERTKUL
          </span>
        </h1>
        <p className="text-xl text-gray-400">
          Developer / Student
        </p>
      </div>
      <div className="w-1/2">
        {/* <Scene modelUrl="/cute_animation.glb" /> */}
      </div>
      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          transition: background 0.5s ease;
        }
      `}</style>
    </div>
  );
};

export default IntroPage;