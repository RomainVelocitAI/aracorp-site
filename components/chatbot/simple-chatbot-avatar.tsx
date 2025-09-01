"use client";

interface SimpleChatbotAvatarProps {
  emotion?: "happy" | "thinking" | "surprised" | "sleeping" | "excited";
  isTyping?: boolean;
}

export default function SimpleChatbotAvatar({ emotion = "happy", isTyping = false }: SimpleChatbotAvatarProps) {
  return (
    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
      <div className="text-white text-2xl">
        {emotion === "sleeping" ? "😴" : 
         emotion === "thinking" ? "🤔" :
         emotion === "surprised" ? "😮" :
         emotion === "excited" ? "🤩" : "😊"}
      </div>
      {isTyping && (
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
          <div className="flex space-x-0.5">
            <div className="w-1 h-1 bg-gray-600 rounded-full animate-bounce" />
            <div className="w-1 h-1 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "100ms" }} />
            <div className="w-1 h-1 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "200ms" }} />
          </div>
        </div>
      )}
    </div>
  );
}