"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import { X, Send, Sparkles, MessageCircle } from "lucide-react";

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
    botResponse: "RunCall révolutionne votre closing téléphonique ! 📞\n\n💰 **15% de taux de conversion** en moyenne\n⚡ **Réactivité maximale** : rappel immédiat\n🎯 **Scripts personnalisés** adaptés à votre secteur\n📊 **Reporting détaillé** en temps réel\n\nCalculez votre ROI potentiel avec notre simulateur ou demandez une démo gratuite !"
  },
  {
    id: "automat-x",
    name: "Automat-X",
    emoji: "🤖",
    tooltip: "IA & Automatisation",
    prefilledMessage: "Quelles automatisations proposez-vous ?",
    botResponse: "Automat-X libère votre potentiel avec l'IA ! 🤖\n\n⚡ **Chatbots intelligents** disponibles 24/7\n🔄 **Automatisation des processus** répétitifs\n📊 **Analyse prédictive** pour anticiper les tendances\n🎯 **Personnalisation IA** de l'expérience client\n\nNos solutions s'intègrent facilement à vos outils existants. Prêt pour la transformation digitale ?"
  },
  {
    id: "contact",
    name: "Contact",
    emoji: "💬",
    tooltip: "Parlons de votre projet",
    prefilledMessage: "Je veux discuter de mon projet",
    botResponse: "Parfait ! Je suis là pour comprendre vos besoins. 💬\n\n📧 Laissez-moi vos coordonnées ou\n📞 Appelez directement notre équipe\n🗓️ Réservez un créneau de 30 minutes\n\nQuel est votre projet ? Je peux vous orienter vers la bonne équipe !"
  }
];

function SectionAwareChatbotComponent() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<SectionInfo>(sections[0]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatbotPosition, setChatbotPosition] = useState({ x: 50, y: 200 });
  
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setMounted(true);
    console.log("Section-aware Chatbot mounted!");
  }, []);

  // Track current section using Intersection Observer
  useEffect(() => {
    if (!mounted || isOpen) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id || entry.target.closest('[id]')?.id;
          const section = sections.find(s => s.id === sectionId);
          
          if (section && section.id !== currentSection.id) {
            console.log("Entering section:", section.name);
            setCurrentSection(section);
            
            // Update chatbot position based on section
            const rect = entry.target.getBoundingClientRect();
            const newY = window.scrollY + rect.top + rect.height / 2;
            setChatbotPosition({
              x: 50,
              y: Math.min(Math.max(200, newY), window.innerHeight - 150)
            });

            // Show tooltip briefly when entering new section
            setShowTooltip(true);
            if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
            tooltipTimeoutRef.current = setTimeout(() => {
              setShowTooltip(false);
            }, 3000);
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px'
    });

    // Observe all sections
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    // Also observe main containers
    const containers = document.querySelectorAll('section, main > div');
    containers.forEach(container => {
      if (container.id) {
        observerRef.current?.observe(container);
      }
    });

    return () => {
      observerRef.current?.disconnect();
      if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    };
  }, [mounted, isOpen, currentSection.id]);

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
    }, 15000);

    return () => clearInterval(interval);
  }, [mounted, isOpen]);

  const openChatWithContext = () => {
    console.log("Opening chat with context:", currentSection.name);
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
      } else if (userInput.includes("automat") || userInput.includes("ia") || userInput.includes("robot")) {
        response = sections.find(s => s.id === "automat-x")?.botResponse || response;
      } else if (userInput.includes("prix") || userInput.includes("tarif") || userInput.includes("devis")) {
        response = "Nos tarifs sont personnalisés selon vos besoins ! 💰\n\n📊 Demandez un devis gratuit\n📞 Consultation offerte de 30 minutes\n🎯 Solutions adaptées à votre budget\n\nQuel est votre budget approximatif ?";
      }
      
      addBotMessage(response);
      setIsTyping(false);
    }, 1500);
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
            top: `${chatbotPosition.y}px`,
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
            background: `linear-gradient(135deg, ${currentSection.id.includes('digiqo') ? '#3b82f6' : currentSection.id.includes('runcall') ? '#10b981' : '#8b5cf6'} 0%, #ec4899 100%)`,
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
            <span style={{ animation: showTooltip ? 'bounce 1s ease-in-out' : 'none' }}>
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
                  gap: '4px'
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
export default dynamic(() => Promise.resolve(SectionAwareChatbotComponent), {
  ssr: false
});