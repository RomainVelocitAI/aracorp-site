"use client";

import { useState, useEffect } from "react";

export default function TestChatbot() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.log("TestChatbot mounted!");
    
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX + 20, y: e.clientY + 20 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    >
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        fontSize: '24px'
      }}>
        🤖
      </div>
      <div style={{
        position: 'absolute',
        bottom: '70px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'white',
        padding: '8px 12px',
        borderRadius: '8px',
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontSize: '12px',
        color: '#333'
      }}>
        Ctrl+Espace pour discuter 💬
      </div>
    </div>
  );
}