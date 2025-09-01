"use client";

export interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 6) return "🌙 Vous travaillez tard ! Comment puis-je vous aider ?";
  if (hour < 12) return "☀️ Bonjour ! Prêt à transformer votre business ?";
  if (hour < 18) return "👋 Bon après-midi ! Explorons vos besoins ensemble.";
  if (hour < 22) return "🌆 Bonsoir ! Découvrez comment ARACORP peut vous aider.";
  return "🌜 Bonne soirée ! Je suis là pour répondre à vos questions.";
};

export const contextualMessages = {
  onScroll: [
    "Je vois que vous explorez notre site ! 🔍",
    "Vous avez des questions ? Je suis là ! 💬",
    "Impressionnant, n'est-ce pas ? 🚀",
  ],
  onHoverServices: [
    "Excellent choix ! Ce service est très populaire 🌟",
    "Nos clients adorent cette solution ! 💙",
    "Je peux vous en dire plus si vous voulez ! 📊",
  ],
  onIdle: [
    "💤 Je suis toujours là si vous avez besoin...",
    "🤔 Prenez votre temps pour explorer !",
    "☕ Je reste disponible quand vous voulez !",
  ],
  onCarouselInteraction: [
    "Nos trois piliers de l'innovation ! 🏗️",
    "Chaque filiale a son expertise unique 🎯",
    "La synergie ARACORP en action ! ⚡",
  ]
};

export const quickResponses = [
  { text: "💼 Voir les services", action: "services" },
  { text: "📞 Contact rapide", action: "contact" },
  { text: "🎯 Démo gratuite", action: "demo" },
  { text: "💬 Parler à un humain", action: "human" },
];

export const botResponses: { [key: string]: string[] } = {
  hello: [
    "Salut ! Je suis ARA, l'assistant virtuel d'ARACORP ! 🤖",
    "Comment puis-je illuminer votre journée ? ✨",
    "Ravi de vous rencontrer ! Que puis-je faire pour vous ? 🎯"
  ],
  services: [
    "Nous avons 3 branches d'expertise :\n🎨 Digiqo - Marketing digital\n📞 RunCall - Closing téléphonique\n🤖 Automat-X - Solutions IA",
    "Chaque filiale peut travailler indépendamment ou en synergie pour maximiser vos résultats ! 🚀",
  ],
  contact: [
    "Vous pouvez nous joindre directement ou je peux prendre vos coordonnées ! 📝",
    "Un expert ARACORP vous contactera dans les 24h ! ⏰",
  ],
  demo: [
    "Génial ! Une démo personnalisée peut être organisée cette semaine ! 🗓️",
    "Nos démos durent 30 minutes et sont 100% personnalisées à vos besoins 🎯",
  ],
  joke: [
    "Pourquoi les développeurs n'aiment pas la nature ? Il y a trop de bugs ! 🐛😄",
    "Comment appelle-t-on un chat tombé dans un pot de peinture ? Un chat-mallow ! 🎨😸",
    "Je suis une IA, mais j'ai encore des bugs... c'est mon côté humain ! 🤖❤️",
  ],
  easter: [
    "🎮 Vous avez trouvé un easter egg ! Tapez /game pour jouer !",
    "🏆 Bravo ! Vous êtes curieux, j'aime ça ! Voici un code promo : ARACORP2024",
    "🎪 Mode secret activé ! Les vraies innovations se cachent dans les détails...",
  ]
};

export const detectIntent = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("bonjour") || lowerMessage.includes("salut") || lowerMessage.includes("hello")) {
    return "hello";
  }
  if (lowerMessage.includes("service") || lowerMessage.includes("offre") || lowerMessage.includes("solution")) {
    return "services";
  }
  if (lowerMessage.includes("contact") || lowerMessage.includes("appel") || lowerMessage.includes("téléphone")) {
    return "contact";
  }
  if (lowerMessage.includes("demo") || lowerMessage.includes("démonstration") || lowerMessage.includes("essai")) {
    return "demo";
  }
  if (lowerMessage.includes("blague") || lowerMessage.includes("joke") || lowerMessage.includes("drôle")) {
    return "joke";
  }
  if (lowerMessage.startsWith("/") || lowerMessage.includes("easter") || lowerMessage.includes("secret")) {
    return "easter";
  }
  
  return "hello"; // Default response
};

export const getRandomResponse = (responses: string[]): string => {
  return responses[Math.floor(Math.random() * responses.length)];
};