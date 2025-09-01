"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import { X, Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

function ChatbotComponent() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    console.log("Working Chatbot mounted!");
  }, []);

  // Track mouse position
  useEffect(() => {
    if (!mounted || !isFollowing || isOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted, isFollowing, isOpen]);

  // Keyboard shortcut (Ctrl+Space)
  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      console.log("Key pressed:", e.key, "Ctrl:", e.ctrlKey, "Code:", e.code);
      
      if (e.ctrlKey && e.code === "Space") {
        e.preventDefault();
        console.log("Ctrl+Space detected!");
        if (!isOpen) {
          openChat();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mounted, isOpen]);

  // Show tooltip periodically
  useEffect(() => {
    if (!mounted || hasBeenOpened || isOpen) return;

    // First tooltip after 3 seconds
    tooltipTimeoutRef.current = setTimeout(() => {
      console.log("Showing first tooltip");
      setShowTooltip(true);
      
      // Hide tooltip after 4 seconds
      setTimeout(() => {
        setShowTooltip(false);
      }, 4000);
    }, 3000);

    // Periodic tooltips every 20 seconds
    tooltipIntervalRef.current = setInterval(() => {
      if (!hasBeenOpened && !isOpen) {
        console.log("Showing periodic tooltip");
        setShowTooltip(true);
        
        setTimeout(() => {
          setShowTooltip(false);
        }, 4000);
      }
    }, 20000);

    return () => {
      if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
      if (tooltipIntervalRef.current) clearInterval(tooltipIntervalRef.current);
    };
  }, [mounted, hasBeenOpened, isOpen]);

  // Check if already opened in this session
  useEffect(() => {
    if (!mounted) return;
    
    const opened = sessionStorage.getItem("chatbotOpened");
    if (opened === "true") {
      setHasBeenOpened(true);
    }
  }, [mounted]);

  const openChat = () => {
    console.log("Opening chat!");
    setIsFollowing(false);
    setShowTooltip(false);
    setIsOpen(true);
    setHasBeenOpened(true);
    
    // Clear tooltip timers
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    if (tooltipIntervalRef.current) clearInterval(tooltipIntervalRef.current);
    
    sessionStorage.setItem("chatbotOpened", "true");
    
    // Add greeting if first time
    if (messages.length === 0) {
      setTimeout(() => {
        addBotMessage("Bonjour ! Je suis ARA, l'assistant virtuel d'ARACORP ! 🤖 Comment puis-je vous aider ?");
      }, 500);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsFollowing(true);
  };

  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      addBotMessage("Merci pour votre message ! Je suis en développement. Contactez-nous directement pour plus d'informations. 📞");
      setIsTyping(false);
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Following Avatar */}
      {isFollowing && !isOpen && (
        <div 
          style={{
            position: 'fixed',
            left: `${mousePosition.x + 20}px`,
            top: `${mousePosition.y + 20}px`,
            zIndex: 50,
            pointerEvents: 'none',
            transition: 'left 0.1s ease-out, top 0.1s ease-out'
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
            fontSize: '28px',
            animation: 'float 3s ease-in-out infinite'
          }}>
            🤖
          </div>
          
          {/* Floating Tooltip */}
          {showTooltip && (
            <div style={{
              position: 'absolute',
              bottom: '70px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'white',
              padding: '10px 16px',
              borderRadius: '12px',
              whiteSpace: 'nowrap',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333',
              border: '2px solid #667eea',
              animation: 'fadeIn 0.3s ease-out'
            }}>
              Ctrl+Espace pour discuter 💬
              <div style={{
                position: 'absolute',
                bottom: '-6px',
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                width: '12px',
                height: '12px',
                background: 'white',
                borderRight: '2px solid #667eea',
                borderBottom: '2px solid #667eea'
              }} />
            </div>
          )}
        </div>
      )}

      {/* Fixed Chat Button (when not following) */}
      {!isFollowing && !isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 50
        }}>
          <button
            onClick={openChat}
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              fontSize: '32px',
              border: 'none',
              cursor: 'pointer',
              transform: 'scale(1)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            🤖
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '380px',
          height: '600px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
          animation: 'slideUp 0.3s ease-out'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '16px',
            borderRadius: '16px 16px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '24px' }}>🤖</div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>ARA - Assistant ARACORP</div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>
                  {isTyping ? "En train d'écrire..." : "En ligne"}
                </div>
              </div>
            </div>
            <button
              onClick={closeChat}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: message.sender === 'user' 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : '#f3f4f6',
                  color: message.sender === 'user' ? 'white' : '#333',
                  fontSize: '14px'
                }}>
                  <div>{message.text}</div>
                  <div style={{
                    fontSize: '10px',
                    opacity: 0.7,
                    marginTop: '4px'
                  }}>
                    {message.timestamp.toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: '#f3f4f6',
                  display: 'flex',
                  gap: '4px'
                }}>
                  <span style={{ animation: 'bounce 1.4s infinite' }}>•</span>
                  <span style={{ animation: 'bounce 1.4s infinite 0.2s' }}>•</span>
                  <span style={{ animation: 'bounce 1.4s infinite 0.4s' }}>•</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{
            padding: '16px',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tapez votre message..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '24px',
                border: '1px solid #e5e7eb',
                outline: 'none',
                fontSize: '14px'
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Send size={18} />
            </button>
            <button
              onClick={() => {
                addBotMessage("✨ Mode magique activé ! Découvrez nos solutions innovantes sur aracorp.com !");
              }}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Sparkles size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Inline styles for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }
      `}</style>
    </>
  );
}

// Export as dynamic component with SSR disabled
export default dynamic(() => Promise.resolve(ChatbotComponent), {
  ssr: false
});