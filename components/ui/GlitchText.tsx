"use client";
import React, { useEffect, useState, useRef } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchInterval?: number;
}

const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  className = "", 
  glitchInterval = 4000 
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  // Binary and code-like characters that reveal the algorithm behind
  const codeChars = "01{}[]()<>;:=+-*/&|!~^%#@";
  const binaryChars = "01";
  const allGlitchChars = binaryChars + codeChars;

  useEffect(() => {
    const startGlitch = () => {
      // Clear any existing intervals
      intervalsRef.current.forEach(interval => clearInterval(interval));
      intervalsRef.current = [];
      
      setIsGlitching(true);
      
      // Select which characters will glitch (random selection, not all at once)
      const chars = text.split("");
      const glitchingIndices: number[] = [];
      
      chars.forEach((char, index) => {
        if (char !== " " && Math.random() > 0.5) {
          glitchingIndices.push(index);
        }
      });
      
      if (glitchingIndices.length === 0) {
        setIsGlitching(false);
        return;
      }

      // Each character rolls at different times and speeds
      glitchingIndices.forEach((index) => {
        const rollDelay = Math.random() * 400; // 0-400ms delay
        const rollSpeed = 60 + Math.random() * 80; // 60-140ms per roll
        const maxRolls = 3 + Math.floor(Math.random() * 5); // 3-7 rolls
        
        setTimeout(() => {
          let rollCount = 0;
          let currentGlitchIndex = Math.floor(Math.random() * allGlitchChars.length);
          
          const rollInterval = setInterval(() => {
            setDisplayText(prev => {
              const currentChars = prev.split("");
              // Cycle to next glitch character
              currentGlitchIndex = (currentGlitchIndex + 1) % allGlitchChars.length;
              currentChars[index] = allGlitchChars[currentGlitchIndex];
              return currentChars.join("");
            });
            
            rollCount++;
            if (rollCount >= maxRolls) {
              clearInterval(rollInterval);
              
              // Restore to original character after rolling
              setTimeout(() => {
                setDisplayText(prev => {
                  const currentChars = prev.split("");
                  currentChars[index] = text[index];
                  return currentChars.join("");
                });
              }, 50);
            }
          }, rollSpeed);
          
          intervalsRef.current.push(rollInterval);
        }, rollDelay);
      });

      // Ensure all characters are restored after all animations complete
      const maxDelay = 400;
      const maxDuration = maxDelay + (7 * 140) + 100; // Worst case scenario
      setTimeout(() => {
        setDisplayText(text);
        setIsGlitching(false);
      }, maxDuration);
    };

    const interval = setInterval(startGlitch, glitchInterval);
    
    // Initial glitch after a delay
    const initialTimeout = setTimeout(startGlitch, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
      intervalsRef.current.forEach(interval => clearInterval(interval));
      intervalsRef.current = [];
    };
  }, [text, glitchInterval]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span 
        className={`transition-all duration-75 ${isGlitching ? 'text-emerald-300' : 'text-emerald-200'}`}
        data-text={text}
      >
        {displayText}
      </span>
    </span>
  );
};

export default GlitchText;

