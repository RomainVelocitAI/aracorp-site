"use client";

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Target,
  Zap,
  BarChart3,
  Palette,
  ArrowRight,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Check
} from 'lucide-react';
import Image from 'next/image';

const DigiqoPresentationSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    {
      icon: Target,
      title: "Publicité ciblée",
      description: "Campagnes Google Ads et Meta optimisées par l'IA",
      color: "oklch(0.7 0.15 185)" // Turquoise Digiqo
    },
    {
      icon: BarChart3,
      title: "Analytics & SEO",
      description: "Référencement naturel et analyse de performance",
      color: "oklch(0.65 0.2 30)" // Orange Digiqo
    },
    {
      icon: Zap,
      title: "Création de site web",
      description: "Sites web modernes et performants",
      color: "oklch(0.5 0.18 15)" // Rouge Digiqo
    },
    {
      icon: Palette,
      title: "Création digitale",
      description: "Identité visuelle et production de contenu",
      color: "oklch(0.7 0.15 185)" // Turquoise
    }
  ];

  const stats = [
    { value: "500", label: "Campagnes actives", trend: "+23%" },
    { value: "3x", label: "ROI moyen", trend: "+45%" },
    { value: "98%", label: "Satisfaction client", trend: "stable" },
    { value: "24h", label: "Temps de réponse", trend: "-50%" }
  ];


  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 bg-white overflow-hidden"
    >
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232BA8B5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <Image
              src="/images/digiqo-logo.png"
              alt="Digiqo"
              width={180}
              height={180}
              className="w-32 h-auto"
            />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            L'agence qui décroche la lune
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Premier Meta Business Partner certifié de l'Océan Indien.
            Nous transformons votre présence digitale avec des résultats mesurables.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                className="relative group"
              >
                <div className="h-full p-6 bg-white border border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  {/* Icon Container */}
                  <div className="mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: hoveredService === index ? service.color : 'oklch(0.95 0.01 240)',
                      }}
                    >
                      <Icon 
                        className="w-6 h-6 transition-all duration-300"
                        style={{
                          color: hoveredService === index ? 'white' : service.color
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Hover indicator */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
                    style={{ backgroundColor: service.color }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredService === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="relative group"
            >
              {/* Gradient background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2BA8B5] via-[#D97652] to-[#A73A50] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              
              <div className="relative text-center p-6 bg-white rounded-2xl border border-gray-100 group-hover:border-transparent group-hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#2BA8B5] via-[#D97652] to-[#A73A50] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {stat.label}
                </div>
                <div className={`text-xs font-medium ${
                  stat.trend.includes('+') ? 'text-green-600' : 
                  stat.trend.includes('-') ? 'text-blue-600' : 
                  'text-gray-500'
                }`}>
                  {stat.trend}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default DigiqoPresentationSection;