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

interface SectionInfo {
  id: string;
  name: string;
  emoji: string;
  tooltip: string;
  prefilledMessage: string;
  botResponse: string;
}

const sections: SectionInfo[] = [
  {
    id: "hero",
    name: "Accueil",
    emoji: "🚀",
    tooltip: "Découvrez ARACORP",
    prefilledMessage: "Je veux en savoir plus sur ARACORP",
    botResponse: "ARACORP est votre partenaire technologique pour transformer votre entreprise ! Nous combinons marketing digital (Digiqo), closing téléphonique (RunCall) et solutions IA (Automat-X) pour maximiser votre croissance. 🚀"
  },
  {
    id: "carousel",
    name: "Nos Filiales",
    emoji: "🏢",
    tooltip: "3 piliers d'innovation",
    prefilledMessage: "Parlez-moi de vos filiales",
    botResponse: "Nos 3 filiales travaillent en synergie :\n🎨 **Digiqo** - Marketing digital et présence en ligne\n📞 **RunCall** - Closing téléphonique et conversion\n🤖 **Automat-X** - Automatisation par l'IA\n\nChaque filiale peut intervenir indépendamment ou en collaboration pour des résultats optimaux !"
  },
  {
    id: "digiqo-section",
    name: "Digiqo",
    emoji: "🎨",
    tooltip: "Marketing digital innovant",
    prefilledMessage: "Je suis intéressé par les services de Digiqo",
    botResponse: "Digiqo transforme votre présence digitale ! 🎨\n\n✅ Sites web premium sur-mesure\n✅ Campagnes publicitaires ciblées\n✅ SEO & référencement naturel\n✅ Design graphique professionnel\n✅ Stratégie social media\n\nNos services s'adaptent à vos besoins avec des tarifs flexibles. Voulez-vous une démo personnalisée ?"
  },
  {
    id: "runcall-section",
    name: "RunCall",
    emoji: "📞",
    tooltip: "Closing téléphonique expert",
    prefilledMessage: "Comment RunCall peut augmenter mes ventes ?",
    botResponse: "RunCall révolutionne votre closing téléphonique ! 📞\n\n💰 **15% de taux de conversion** en moyenne\n⚡ **Réactivité maximale** : rappel en moins de 30 secondes\n🎯 **Scripts personnalisés** adaptés à votre secteur\n📊 **Reporting détaillé** en temps réel\n\nCalculez votre ROI potentiel avec notre simulateur ou demandez une démo gratuite !"
  }
];

function StableSectionChatbotComponent() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<SectionInfo>(sections[0]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSectionRef = useRef<string>(sections[0].id);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track scroll position and detect current section with debouncing
  useEffect(() => {
    if (!mounted) return;

    const detectSection = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Get viewport height
      const viewportHeight = window.innerHeight;
      const scrollCenter = currentScrollY + viewportHeight / 2;
      
      // Find which section is currently most visible
      let bestSection = sections[0];
      let bestOverlap = 0;
      
      for (const sectionInfo of sections) {
        const element = document.getElementById(sectionInfo.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const absoluteTop = rect.top + currentScrollY;
          const absoluteBottom = absoluteTop + rect.height;
          
          // Calculate how much of the section is visible
          const viewportTop = currentScrollY;
          const viewportBottom = currentScrollY + viewportHeight;
          
          const overlapTop = Math.max(absoluteTop, viewportTop);
          const overlapBottom = Math.min(absoluteBottom, viewportBottom);
          const overlap = Math.max(0, overlapBottom - overlapTop);
          
          if (overlap > bestOverlap) {
            bestOverlap = overlap;
            bestSection = sectionInfo;
          }
        }
      }
      
      // Only update if section actually changed
      if (bestSection.id !== lastSectionRef.current) {
        console.log("Section changed to:", bestSection.name);
        lastSectionRef.current = bestSection.id;
        setCurrentSection(bestSection);
        
        // Show tooltip briefly when entering new section
        setShowTooltip(true);
        if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
        tooltipTimeoutRef.current = setTimeout(() => {
          setShowTooltip(false);
        }, 3000);
      }
    };

    const handleScroll = () => {
      // Debounce scroll events
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(detectSection, 100);
    };

    // Initial detection
    detectSection();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    };
  }, [mounted]);

  // Keyboard shortcut (Ctrl+Space)
  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === "Space") {
        e.preventDefault();
        if (!isOpen) {
          openChatWithContext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mounted, isOpen, currentSection]);

  // Periodic tooltip
  useEffect(() => {
    if (!mounted || isOpen) return;

    const interval = setInterval(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    }, 20000);

    return () => clearInterval(interval);
  }, [mounted, isOpen]);

  const openChatWithContext = () => {
    setIsOpen(true);
    setShowTooltip(false);
    
    // Pre-fill message based on current section
    setInputValue(currentSection.prefilledMessage);
    
    // Add greeting
    if (messages.length === 0) {
      setTimeout(() => {
        addBotMessage(`Bonjour ! Je vois que vous êtes intéressé par ${currentSection.name}. ${currentSection.botResponse}`);
      }, 500);
    } else {
      setTimeout(() => {
        addBotMessage(currentSection.botResponse);
      }, 500);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
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
    const userInput = inputValue.toLowerCase();
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      // Smart responses based on keywords
      let response = "Merci pour votre message ! Notre équipe vous contactera rapidement. 📞";
      
      if (userInput.includes("digiqo") || userInput.includes("site") || userInput.includes("marketing")) {
        response = sections.find(s => s.id === "digiqo-section")?.botResponse || response;
      } else if (userInput.includes("runcall") || userInput.includes("appel") || userInput.includes("vente")) {
        response = sections.find(s => s.id === "runcall-section")?.botResponse || response;
      } else if (userInput.includes("prix") || userInput.includes("tarif") || userInput.includes("devis")) {
        response = "Nos tarifs sont personnalisés selon vos besoins ! 💰\n\n📊 Demandez un devis gratuit\n📞 Consultation offerte de 30 minutes\n🎯 Solutions adaptées à votre budget\n\nQuel est votre budget approximatif ?";
      } else if (userInput.includes("contact") || userInput.includes("rdv") || userInput.includes("rendez-vous")) {
        response = "Excellente initiative ! 📞\n\n✅ Appelez-nous directement\n✅ Réservez un créneau de 30 minutes\n✅ Laissez vos coordonnées\n\nNotre équipe vous recontactera sous 24h maximum !";
      }
      
      addBotMessage(response);
      setIsTyping(false);
    }, 1500);
  };

  // Calculate chatbot position based on scroll
  const calculatePosition = () => {
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - viewportHeight;
    
    if (maxScroll <= 0) return viewportHeight * 0.5;
    
    const scrollPercent = Math.min(scrollY / maxScroll, 1);
    
    // Position between 25% and 75% of viewport height
    const minY = viewportHeight * 0.25;
    const maxY = viewportHeight * 0.75;
    const posY = minY + (maxY - minY) * scrollPercent;
    
    return Math.round(posY);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating Chatbot Avatar */}
      {!isOpen && (
        <div 
          style={{
            position: 'fixed',
            right: '30px',
            top: `${calculatePosition()}px`,
            zIndex: 50,
            transition: 'top 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer'
          }}
          onClick={openChatWithContext}
        >
          {/* Glowing effect */}
          <div style={{
            position: 'absolute',
            inset: '-8px',
            background: `linear-gradient(135deg, ${
              currentSection.id === 'digiqo-section' ? '#3b82f6' : 
              currentSection.id === 'runcall-section' ? '#10b981' : 
              currentSection.id === 'carousel' ? '#f59e0b' :
              '#8b5cf6'
            } 0%, #ec4899 100%)`,
            borderRadius: '50%',
            opacity: 0.3,
            filter: 'blur(8px)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }} />
          
          {/* Avatar */}
          <div style={{
            position: 'relative',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            fontSize: '28px',
            animation: 'float 3s ease-in-out infinite',
            transform: showTooltip ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.3s'
          }}>
            <span style={{ 
              animation: showTooltip ? 'bounce 1s ease-in-out' : 'none',
              display: 'inline-block'
            }}>
              {currentSection.emoji}
            </span>
          </div>
          
          {/* Section-specific Tooltip */}
          {showTooltip && (
            <div style={{
              position: 'absolute',
              left: '-220px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'white',
              padding: '12px 16px',
              borderRadius: '12px',
              whiteSpace: 'nowrap',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333',
              border: '2px solid #667eea',
              animation: 'slideInRight 0.3s ease-out',
              minWidth: '200px'
            }}>
              <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '4px' }}>
                {currentSection.name}
              </div>
              <div>{currentSection.tooltip}</div>
              <div style={{ fontSize: '11px', marginTop: '4px', opacity: 0.8 }}>
                💬 Cliquez ou Ctrl+Espace
              </div>
              <div style={{
                position: 'absolute',
                right: '-6px',
                top: '50%',
                transform: 'translateY(-50%) rotate(45deg)',
                width: '12px',
                height: '12px',
                background: 'white',
                borderTop: '2px solid #667eea',
                borderRight: '2px solid #667eea'
              }} />
            </div>
          )}
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '400px',
          height: '600px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          animation: 'slideUp 0.3s ease-out'
        }}>
          {/* Header with current section context */}
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
              <div style={{ fontSize: '24px' }}>{currentSection.emoji}</div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>ARA - Assistant ARACORP</div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>
                  {isTyping ? "En train d'écrire..." : `Section: ${currentSection.name}`}
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

          {/* Quick Section Navigation */}
          <div style={{
            padding: '8px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            gap: '4px',
            overflowX: 'auto',
            background: '#f9fafb'
          }}>
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => {
                  setCurrentSection(section);
                  setInputValue(section.prefilledMessage);
                  // Scroll to section
                  const element = document.getElementById(section.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: currentSection.id === section.id ? '2px solid #667eea' : '1px solid #e5e7eb',
                  background: currentSection.id === section.id ? '#f3f4ff' : 'white',
                  cursor: 'pointer',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.2s'
                }}
              >
                <span>{section.emoji}</span>
                <span>{section.name}</span>
              </button>
            ))}
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
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'fadeIn 0.3s ease-out'
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
                  <div style={{ whiteSpace: 'pre-line' }}>{message.text}</div>
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

          {/* Input with pre-filled message */}
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
              placeholder={`Question sur ${currentSection.name}...`}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '24px',
                border: '1px solid #e5e7eb',
                outline: 'none',
                fontSize: '14px',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
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
                justifyContent: 'center',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Send size={18} />
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
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(-20px) translateY(-50%); }
          to { opacity: 1; transform: translateX(0) translateY(-50%); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}

// Export as dynamic component with SSR disabled
export default dynamic(() => Promise.resolve(StableSectionChatbotComponent), {
  ssr: false
});