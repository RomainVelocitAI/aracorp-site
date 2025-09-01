"use client";

import { useState, useEffect, useRef } from "react";
import { X, MessageCircle, Send, Sparkles } from "lucide-react";
import ChatbotAvatar from "./chatbot-avatar";
import { 
  Message, 
  getGreeting, 
  contextualMessages, 
  quickResponses,
  botResponses,
  detectIntent,
  getRandomResponse
} from "./chatbot-messages";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [emotion, setEmotion] = useState<"happy" | "thinking" | "surprised" | "sleeping" | "excited">("happy");
  const [lastActivity, setLastActivity] = useState(Date.now());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Initialize with greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      if (messages.length === 0) {
        addBotMessage(getGreeting());
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Track user activity for emotions
  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now());
      if (emotion === "sleeping") {
        setEmotion("surprised");
        setTimeout(() => setEmotion("happy"), 1000);
      }
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("scroll", handleActivity);
    
    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("scroll", handleActivity);
    };
  }, [emotion]);

  // Check for idle state
  useEffect(() => {
    const idleCheck = setInterval(() => {
      if (Date.now() - lastActivity > 30000 && emotion !== "sleeping") {
        setEmotion("sleeping");
        if (isOpen && messages.length > 1) {
          addBotMessage(getRandomResponse(contextualMessages.onIdle));
        }
      }
    }, 5000);

    return () => clearInterval(idleCheck);
  }, [lastActivity, emotion, isOpen, messages]);

  // Scroll detection for contextual messages
  useEffect(() => {
    let scrollCount = 0;
    const handleScroll = () => {
      scrollCount++;
      if (scrollCount === 3 && isOpen) {
        addBotMessage(getRandomResponse(contextualMessages.onScroll));
        setEmotion("excited");
        setTimeout(() => setEmotion("happy"), 2000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

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

    // Add user message
    addUserMessage(inputValue);
    const userInput = inputValue;
    setInputValue("");
    
    // Bot thinking
    setIsTyping(true);
    setEmotion("thinking");

    // Simulate response delay
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

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setEmotion("excited");
      setTimeout(() => setEmotion("happy"), 1500);
      if (messages.length === 0) {
        setTimeout(() => addBotMessage(getGreeting()), 500);
      }
    }
  };

  return (
    <>
      {/* Chatbot Button/Avatar */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={toggleChat}
            className="relative group"
            aria-label="Ouvrir le chat"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-1 shadow-2xl transform transition-transform group-hover:scale-110">
              <ChatbotAvatar emotion={emotion} isTyping={false} />
            </div>
            {/* Notification badge */}
            {messages.length === 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
            )}
            {/* Floating message bubble */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-3 py-2 whitespace-nowrap">
                <p className="text-sm font-medium">Besoin d'aide ? 💬</p>
              </div>
            </div>
          </button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className="absolute bottom-0 right-0 w-96 h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col animate-slideUp">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ChatbotAvatar emotion={emotion} isTyping={isTyping} />
                <div>
                  <h3 className="font-bold">ARA - Assistant ARACORP</h3>
                  <p className="text-xs opacity-90">
                    {isTyping ? "En train d'écrire..." : "En ligne"}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
                    } animate-fadeIn`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
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
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes particle-1 {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(-20px, -40px);
            opacity: 0;
          }
        }

        @keyframes particle-2 {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(20px, -40px);
            opacity: 0;
          }
        }

        @keyframes particle-3 {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(0, -40px);
            opacity: 0;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-particle-1 {
          animation: particle-1 2s ease-out infinite;
        }

        .animate-particle-2 {
          animation: particle-2 2s ease-out infinite;
        }

        .animate-particle-3 {
          animation: particle-3 2s ease-out infinite;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-150 {
          animation-delay: 150ms;
        }

        .delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </>
  );
}