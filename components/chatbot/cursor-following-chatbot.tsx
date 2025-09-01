"use client";

import { useState, useEffect, useRef } from "react";
import { X, MessageCircle, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SimpleChatbotAvatar from "./simple-chatbot-avatar";
import { 
  Message, 
  getGreeting, 
  contextualMessages, 
  quickResponses,
  botResponses,
  detectIntent,
  getRandomResponse
} from "./chatbot-messages";

export default function CursorFollowingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [emotion, setEmotion] = useState<"happy" | "thinking" | "surprised" | "sleeping" | "excited">("happy");
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const tooltipIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Track mouse position
  useEffect(() => {
    if (!isFollowing || isOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isFollowing, isOpen]);

  // Smooth following with delay
  useEffect(() => {
    if (!isFollowing || isOpen) return;

    const followDelay = setTimeout(() => {
      setTargetPosition({
        x: mousePosition.x - 30, // Center the avatar
        y: mousePosition.y - 30
      });
    }, 100); // 100ms delay for smooth following

    return () => clearTimeout(followDelay);
  }, [mousePosition, isFollowing, isOpen]);

  // Keyboard shortcut (Ctrl+Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === "Space") {
        e.preventDefault();
        if (!isOpen) {
          openChatWithAnimation();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Show tooltip periodically
  useEffect(() => {
    if (hasBeenOpened || isOpen) return;

    // First tooltip after 5 seconds
    const firstTooltip = setTimeout(() => {
      setShowTooltip(true);
      setEmotion("excited");
      
      // Hide tooltip after 3 seconds
      setTimeout(() => {
        setShowTooltip(false);
        setEmotion("happy");
      }, 3000);
    }, 5000);

    // Periodic tooltips every 30 seconds
    tooltipIntervalRef.current = setInterval(() => {
      if (!hasBeenOpened && !isOpen) {
        setShowTooltip(true);
        setEmotion("excited");
        
        setTimeout(() => {
          setShowTooltip(false);
          setEmotion("happy");
        }, 3000);
      }
    }, 30000);

    return () => {
      clearTimeout(firstTooltip);
      if (tooltipIntervalRef.current) {
        clearInterval(tooltipIntervalRef.current);
      }
    };
  }, [hasBeenOpened, isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openChatWithAnimation = () => {
    setIsTransitioning(true);
    setIsFollowing(false);
    setEmotion("excited");
    setShowTooltip(false);
    
    // Clear tooltip interval
    if (tooltipIntervalRef.current) {
      clearInterval(tooltipIntervalRef.current);
    }

    // Animate to bottom right
    setTimeout(() => {
      setIsOpen(true);
      setHasBeenOpened(true);
      setIsTransitioning(false);
      
      // Store in sessionStorage
      sessionStorage.setItem("chatbotOpened", "true");
      
      // Add greeting if first time
      if (messages.length === 0) {
        setTimeout(() => addBotMessage(getGreeting()), 500);
      }
    }, 500);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsFollowing(true);
    setEmotion("happy");
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
    const userInput = inputValue;
    setInputValue("");
    
    setIsTyping(true);
    setEmotion("thinking");

    setTimeout(() => {
      const intent = detectIntent(userInput);
      const response = getRandomResponse(botResponses[intent] || botResponses.hello);
      addBotMessage(response);
      setIsTyping(false);
      setEmotion("happy");
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickResponse = (action: string) => {
    setEmotion("excited");
    const response = botResponses[action] ? getRandomResponse(botResponses[action]) : "Je vais vous aider avec ça ! 🚀";
    addBotMessage(response);
    setTimeout(() => setEmotion("happy"), 2000);
  };

  // Check if already opened in this session
  useEffect(() => {
    const opened = sessionStorage.getItem("chatbotOpened");
    if (opened === "true") {
      setHasBeenOpened(true);
    }
  }, []);

  return (
    <>
      {/* Following Avatar */}
      <AnimatePresence>
        {isFollowing && !isOpen && (
          <motion.div
            className="fixed z-50 pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: isTransitioning ? window.innerWidth - 100 : targetPosition.x,
              y: isTransitioning ? window.innerHeight - 100 : targetPosition.y
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              type: "spring", 
              damping: 15, 
              stiffness: 150,
              x: { type: "spring", damping: 20, stiffness: 100 },
              y: { type: "spring", damping: 20, stiffness: 100 }
            }}
          >
            <div className="relative">
              {/* Avatar */}
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-1 shadow-2xl">
                <SimpleChatbotAvatar emotion={emotion} isTyping={false} />
              </div>
              
              {/* Floating Tooltip */}
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-auto"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div 
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-xl px-4 py-2 whitespace-nowrap border-2 border-gradient-to-r from-blue-500 to-purple-600"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <p className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Ctrl+Espace pour discuter 💬
                      </p>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-gray-800 border-r-2 border-b-2 border-gradient-to-r from-blue-500 to-purple-600"></div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Chat Button (when not following) */}
      {!isFollowing && !isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={openChatWithAnimation}
            className="relative group"
            aria-label="Ouvrir le chat"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-1 shadow-2xl transform transition-transform group-hover:scale-110">
              <SimpleChatbotAvatar emotion={emotion} isTyping={false} />
            </div>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <motion.div 
            className="w-96 h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 15 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SimpleChatbotAvatar emotion={emotion} isTyping={isTyping} />
                <div>
                  <h3 className="font-bold">ARA - Assistant ARACORP</h3>
                  <p className="text-xs opacity-90">
                    {isTyping ? "En train d'écrire..." : "En ligne"}
                  </p>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "100ms" }} />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "200ms" }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Responses */}
            {messages.length > 0 && (
              <div className="px-4 py-2 flex flex-wrap gap-2 border-t dark:border-gray-800">
                {quickResponses.map((response) => (
                  <button
                    key={response.action}
                    onClick={() => handleQuickResponse(response.action)}
                    className="text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full px-3 py-1 transition-colors"
                  >
                    {response.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t dark:border-gray-800">
              <div className="flex space-x-2">
                <input
                  ref={chatInputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  onFocus={() => setEmotion("thinking")}
                  onBlur={() => setEmotion("happy")}
                  placeholder="Tapez votre message..."
                  className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-2 hover:scale-110 transition-transform"
                >
                  <Send size={20} />
                </button>
                <button
                  onClick={() => {
                    addBotMessage("✨ Mode magique activé ! Que puis-je faire d'extraordinaire pour vous ?");
                    setEmotion("excited");
                  }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full p-2 hover:scale-110 transition-transform"
                >
                  <Sparkles size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}