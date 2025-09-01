"use client";

import { useEffect, useState, useRef } from "react";

interface ChatbotAvatarProps {
  emotion: "happy" | "thinking" | "surprised" | "sleeping" | "excited";
  isTyping?: boolean;
}

export default function ChatbotAvatar({ emotion = "happy", isTyping = false }: ChatbotAvatarProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  // Track mouse for eye following
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (avatarRef.current) {
        const rect = avatarRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const angleX = (e.clientX - centerX) / window.innerWidth;
        const angleY = (e.clientY - centerY) / window.innerHeight;
        
        setMousePosition({
          x: Math.max(-1, Math.min(1, angleX * 3)),
          y: Math.max(-1, Math.min(1, angleY * 3))
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  const getEmotionStyles = () => {
    switch (emotion) {
      case "thinking":
        return "eyebrow-raised";
      case "surprised":
        return "eyes-wide";
      case "sleeping":
        return "eyes-closed";
      case "excited":
        return "eyes-sparkle";
      default:
        return "";
    }
  };

  return (
    <div 
      ref={avatarRef}
      className="relative w-20 h-20 flex items-center justify-center"
    >
      {/* Floating animation container */}
      <div className="absolute inset-0 animate-float">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
        
        {/* Main avatar body */}
        <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-xl">
          {/* Face container */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Eyes container */}
            <div className="relative w-full h-full">
              {/* Left eye */}
              <div 
                className={`absolute left-[25%] top-[35%] transition-all duration-200 ${getEmotionStyles()}`}
                style={{
                  transform: `translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px)`
                }}
              >
                <div className={`w-3 h-3 bg-white rounded-full transition-all ${isBlinking ? 'scale-y-0' : 'scale-y-100'}`}>
                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full relative top-0.5 left-0.5" />
                </div>
              </div>
              
              {/* Right eye */}
              <div 
                className={`absolute right-[25%] top-[35%] transition-all duration-200 ${getEmotionStyles()}`}
                style={{
                  transform: `translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px)`
                }}
              >
                <div className={`w-3 h-3 bg-white rounded-full transition-all ${isBlinking ? 'scale-y-0' : 'scale-y-100'}`}>
                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full relative top-0.5 left-0.5" />
                </div>
              </div>

              {/* Mouth */}
              <div className="absolute bottom-[30%] left-1/2 transform -translate-x-1/2">
                {emotion === "sleeping" ? (
                  <div className="text-white text-xs">z Z Z</div>
                ) : emotion === "surprised" ? (
                  <div className="w-3 h-3 bg-white/90 rounded-full" />
                ) : emotion === "excited" ? (
                  <div className="w-8 h-2 bg-white/90 rounded-full" />
                ) : (
                  <div className="w-6 h-1 bg-white/90 rounded-full" />
                )}
              </div>

              {/* Thinking bubbles */}
              {emotion === "thinking" && (
                <>
                  <div className="absolute -top-2 -right-2 w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                  <div className="absolute -top-4 -right-4 w-3 h-3 bg-white/40 rounded-full animate-bounce delay-100" />
                  <div className="absolute -top-7 -right-6 w-4 h-4 bg-white/20 rounded-full animate-bounce delay-200" />
                </>
              )}

              {/* Excitement stars */}
              {emotion === "excited" && (
                <>
                  <div className="absolute -top-1 left-2 text-yellow-300 animate-spin">✨</div>
                  <div className="absolute -bottom-1 right-2 text-yellow-300 animate-spin delay-150">⭐</div>
                </>
              )}
            </div>
          </div>

          {/* Typing indicator */}
          {isTyping && (
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full px-2 py-1 shadow-lg">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce delay-100" />
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          )}
        </div>

        {/* Particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-1 h-1 bg-blue-400 rounded-full animate-particle-1" />
          <div className="absolute top-0 right-0 w-1 h-1 bg-purple-400 rounded-full animate-particle-2" />
          <div className="absolute bottom-0 left-0 w-1 h-1 bg-pink-400 rounded-full animate-particle-3" />
        </div>
      </div>
    </div>
  );
}