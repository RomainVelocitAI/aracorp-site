"use client";

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Zap,
  Brain,
  BarChart3,
  FileText,
  Users,
  Calendar,
  Target,
  ArrowRight,
  CheckCircle,
  Sparkles,
  TrendingUp
} from 'lucide-react';

const AutomatxSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      icon: Brain,
      title: "IA prédictive",
      description: "Intelligence artificielle qui apprend de vos données pour optimiser vos ventes",
      color: "oklch(0.6 0.2 280)" // Violet Automat-X
    },
    {
      icon: FileText,
      title: "Génération de devis",
      description: "Créez des devis professionnels automatiquement en quelques clics",
      color: "oklch(0.65 0.18 300)" // Violet clair
    },
    {
      icon: BarChart3,
      title: "Facturation intégrée",
      description: "Gérez vos factures et paiements depuis une seule plateforme",
      color: "oklch(0.55 0.22 260)" // Violet foncé
    },
    {
      icon: Zap,
      title: "Workflows automatisés",
      description: "Automatisez vos processus commerciaux répétitifs",
      color: "oklch(0.6 0.2 280)" // Violet Automat-X
    }
  ];

  const stats = [
    { value: "75%", label: "Temps économisé", trend: "sur admin" },
    { value: "2x", label: "Vitesse de closing", trend: "en moyenne" },
    { value: "99%", label: "Uptime garanti", trend: "SLA Premium" },
    { value: "24/7", label: "Assistant IA", trend: "disponible" }
  ];

  const useCases = [
    {
      title: "PME & Startups",
      subtitle: "Automatisez vos ventes",
      features: [
        "CRM intelligent intuitif",
        "Génération auto de devis",
        "Suivi leads automatique",
        "Tableaux de bord simples"
      ],
      color: "from-purple-400 to-violet-400"
    },
    {
      title: "Entreprises",
      subtitle: "Gestion commerciale complète", 
      features: [
        "Workflows complexes",
        "IA prédictive avancée",
        "Intégrations multiples",
        "Analytics approfondis"
      ],
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "Agences",
      subtitle: "Multi-clients & reporting",
      features: [
        "Gestion multi-comptes",
        "White-label disponible",
        "Reporting automatisé",
        "API complète"
      ],
      color: "from-purple-600 to-indigo-500"
    }
  ];

  const testimonials = [
    {
      company: "TechFlow SaaS",
      quote: "Automat-X nous a fait gagner 15h par semaine. L'IA prédit nos meilleurs prospects.",
      author: "Julie Chen",
      role: "Sales Director",
      metric: "300% ROI"
    },
    {
      company: "GrowthCorp",
      quote: "Plus de devis perdus ! L'automatisation nous fait fermer 2x plus de deals.",
      author: "Marc Dubois", 
      role: "CEO",
      metric: "2x conversion"
    },
    {
      company: "AgencePlus",
      quote: "Le multi-client est parfait pour notre agence. Nos clients adorent le reporting auto.",
      author: "Sarah Martin",
      role: "Partner",
      metric: "50 clients"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 bg-white overflow-hidden"
    >
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B5CF6' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
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
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-violet-600 to-pink-500">
              AUTOMAT-X
            </h2>
          </div>
          
          <p className="text-2xl font-bold text-gray-900 mb-4">
            Votre CRM IA qui transforme vos prospects en clients
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Le seul CRM qui pense à votre place. Intelligence artificielle + automatisation = croissance exponentielle
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="group"
              >
                <div className="h-full p-6 bg-white border border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: hoveredFeature === index ? feature.color : 'oklch(0.95 0.01 280)',
                      }}
                    >
                      <Icon 
                        className="w-6 h-6 transition-all duration-300"
                        style={{
                          color: hoveredFeature === index ? 'white' : feature.color
                        }}
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Hover indicator */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
                    style={{ backgroundColor: feature.color }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredFeature === index ? 1 : 0 }}
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
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-600 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              
              <div className="relative text-center p-6 bg-white rounded-2xl border border-gray-100 group-hover:border-transparent group-hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 via-violet-600 to-pink-500 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {stat.label}
                </div>
                <div className="text-xs text-purple-600 font-medium">
                  {stat.trend}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Une solution pour chaque type d'entreprise
            </h3>
            <p className="text-lg text-gray-600">
              De la startup à l'enterprise, Automat-X s'adapte à vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className="relative group"
              >
                <div className="h-full p-8 bg-white rounded-2xl border border-gray-200 group-hover:shadow-xl transition-all duration-300">
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {useCase.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {useCase.subtitle}
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {useCase.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 px-4 bg-gradient-to-r ${useCase.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all group/btn`}>
                    <span className="flex items-center justify-center gap-2">
                      Découvrir
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ils ont multiplié leur croissance avec Automat-X
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border border-purple-100"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-900">
                      {testimonial.company}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                      {testimonial.metric}
                    </span>
                  </div>
                  <blockquote className="text-gray-700 mb-3">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
                <cite className="text-sm">
                  <span className="font-semibold text-gray-900">
                    {testimonial.author}
                  </span>
                  <span className="text-gray-600">
                    , {testimonial.role}
                  </span>
                </cite>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-50 via-violet-50 to-pink-50 rounded-3xl p-12">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                L'IA au service de votre croissance
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Rejoignez les centaines d'entreprises qui ont automatisé leur succès avec Automat-X
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 via-violet-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Démo gratuite
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-all"
                >
                  Voir les tarifs
                </motion.button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Essai gratuit 14 jours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Sans engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Support premium</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AutomatxSection;