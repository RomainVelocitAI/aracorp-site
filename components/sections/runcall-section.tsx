"use client";

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Phone,
  TrendingUp,
  Users,
  Target,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  BarChart3
} from 'lucide-react';

const RuncallSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  const services = [
    {
      icon: Phone,
      title: "Closing téléphonique",
      description: "Closers experts 100% réunionnais qui maîtrisent le marché local",
      color: "oklch(0.6 0.2 260)" // Bleu RunCall
    },
    {
      icon: Target,
      title: "Scripts personnalisés",
      description: "Scripts adaptés à votre secteur et votre audience locale",
      color: "oklch(0.65 0.15 200)" // Bleu clair
    },
    {
      icon: BarChart3,
      title: "Suivi temps réel",
      description: "Dashboard complet pour suivre vos performances",
      color: "oklch(0.55 0.18 220)" // Bleu moyen
    },
    {
      icon: Users,
      title: "Équipe dédiée",
      description: "Une équipe formée spécifiquement pour votre entreprise",
      color: "oklch(0.6 0.2 260)" // Bleu RunCall
    }
  ];

  const stats = [
    { value: "15%", label: "Taux de conversion", trend: "moyen" },
    { value: "x4", label: "ROI garanti", trend: "minimum" },
    { value: "4.9/5", label: "Note clients", trend: "47 avis" },
    { value: "100%", label: "Closers locaux", trend: "La Réunion" }
  ];

  const plans = [
    {
      name: "Pioneer",
      subtitle: "Startups",
      price: "0€",
      commission: "20%",
      features: [
        "Idéal pour tester",
        "Sans engagement",
        "Formation incluse",
        "Support dédié"
      ],
      recommended: false
    },
    {
      name: "Starter",
      subtitle: "PME",
      price: "497€",
      commission: "14%",
      features: [
        "10h de closing/mois",
        "Script personnalisé",
        "Rapport hebdomadaire",
        "Account manager"
      ],
      recommended: false
    },
    {
      name: "Growth",
      subtitle: "Croissance",
      price: "1497€",
      commission: "12%",
      features: [
        "30h de closing/mois",
        "Équipe dédiée",
        "Optimisation continue",
        "Dashboard premium"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      subtitle: "Grands comptes",
      price: "2997€",
      commission: "10%",
      features: [
        "Illimité",
        "Multi-campagnes",
        "IA prédictive",
        "Support prioritaire"
      ],
      recommended: false
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
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234169E1' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
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
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 mb-4">
            RUNCALL
          </h2>
          <p className="text-2xl font-bold text-gray-900 mb-4">
            Multipliez vos ventes par 3 avec nos closers réunionnais
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Le service de closing téléphonique 100% local qui transforme vos leads en clients
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
                className="group"
              >
                <div className="h-full p-6 bg-white border border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: 'oklch(0.95 0.01 240)' }}
                    >
                      <Icon 
                        className="w-6 h-6"
                        style={{ color: service.color }}
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              
              <div className="relative text-center p-6 bg-white rounded-2xl border border-gray-100 group-hover:border-transparent group-hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-blue-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500">
                  {stat.trend}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pricing Plans */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Une formule adaptée à chaque entreprise
            </h3>
            <p className="text-lg text-gray-600">
              Modèle flexible : fixe + commission sur résultats
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(null)}
                className="relative"
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                      POPULAIRE
                    </span>
                  </div>
                )}
                
                <div className={`h-full p-6 bg-white rounded-2xl border-2 transition-all duration-300 ${
                  plan.recommended 
                    ? 'border-blue-500 shadow-xl' 
                    : hoveredPlan === index 
                      ? 'border-blue-300 shadow-lg' 
                      : 'border-gray-200'
                }`}>
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                      {plan.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      {plan.subtitle}
                    </p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-gray-600">/mois</span>
                    </div>
                    <p className="text-sm text-blue-600 font-medium mt-2">
                      + {plan.commission} commission
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${
                    plan.recommended
                      ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    Choisir {plan.name}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Prêt à booster vos ventes ?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Découvrez comment nos closers réunionnais peuvent transformer vos leads en clients
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all group"
              >
                <span className="flex items-center justify-center gap-2">
                  Démarrer gratuitement
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              
              <motion.a
                href="https://runcall.re"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all"
              >
                Visiter runcall.re
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RuncallSection;