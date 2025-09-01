"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

function ChatbotComponent() {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });

  useEffect(() => {
    setMounted(true);
    console.log("Chatbot is mounted!");
    
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX + 20, y: e.clientY + 20 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Only render on client side
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Fixed visible element to test */}
      <div 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          fontSize: '32px',
          zIndex: 99999,
          cursor: 'pointer'
        }}
        onClick={() => alert('Chatbot cliqué!')}
      >
        🤖
      </div>

      {/* Following element */}
      <div 
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 99998,
          pointerEvents: 'none'
        }}
      >
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px'
        }}>
          👋
        </div>
      </div>
    </>
  );
}

// Export as dynamic component with SSR disabled
export default dynamic(() => Promise.resolve(ChatbotComponent), {
  ssr: false
});