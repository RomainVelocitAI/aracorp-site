"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Zap, 
  Target, 
  TrendingUp, 
  ArrowRight,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { GlowCard } from '@/components/spotlight-card';

const EcosystemSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const companies = [
    {
      id: 'digiqo',
      name: 'DIGIQO',
      tagline: 'Marketing & Acquisition',
      description: 'Génération de leads qualifiés et campagnes publicitaires optimisées par l\'IA',
      features: [
        'Campagnes Facebook & Google Ads',
        'Landing pages haute conversion',
        'Analyse prédictive du ROI',
        'A/B testing automatisé'
      ],
      icon: <Target className="w-8 h-8" />,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      id: 'automat-x',
      name: 'AUTOMAT-X',
      tagline: 'CRM IA tout-en-un',
      description: 'Centralisation et automatisation de votre gestion commerciale avec l\'intelligence artificielle',
      features: [
        'CRM intelligent et prédictif',
        'Génération automatique de devis',
        'Facturation et paiements intégrés',
        'Workflows commerciaux automatisés'
      ],
      icon: <Zap className="w-8 h-8" />,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10'
    },
    {
      id: 'runcall',
      name: 'RUNCALL',
      tagline: 'Vente & Conversion',
      description: 'Maximisation de la conversion avec des équipes de vente expertes et des outils avancés',
      features: [
        'Qualification en temps réel',
        'Scripts de vente optimisés',
        'Formation continue des équipes',
        'Reporting et analytics avancés'
      ],
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10'
    }
  ];

  const synergyPoints = [
    {
      title: "Flux de données unifié",
      description: "Chaque interaction est trackée et optimisée en temps réel"
    },
    {
      title: "Intelligence partagée",
      description: "L'IA apprend de chaque point de contact pour améliorer l'ensemble"
    },
    {
      title: "ROI maximisé",
      description: "Chaque euro investi est optimisé à travers tout l'écosystème"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Un écosystème unique, 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-green-600"> 3 expertises synchronisées</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nos trois filiales travaillent en synergie pour créer une machine de croissance 
            qui génère, qualifie, convertit et fidélise vos clients automatiquement.
          </p>
        </motion.div>

        {/* Company Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {companies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <GlowCard 
                glowColor={company.id === 'digiqo' ? 'turquoise' : company.id === 'automat-x' ? 'purple' : 'green'}
                customSize={true}
                className="h-full p-8 bg-white/90"
              >
                {/* Company Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${company.gradient}`}>
                      {company.name}
                    </h3>
                    <p className="text-gray-600 mt-1">{company.tagline}</p>
                  </div>
                  <div className={`p-3 bg-gradient-to-br ${company.bgGradient} rounded-xl`}>
                    {company.icon}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-6">
                  {company.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {company.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        company.color === 'blue' ? 'text-blue-500' :
                        company.color === 'purple' ? 'text-purple-500' :
                        'text-green-500'
                      }`} />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className={`mt-6 w-full py-3 px-4 bg-gradient-to-r ${company.gradient} text-white font-semibold rounded-xl hover:shadow-lg transition-all group/btn`}>
                  <span className="flex items-center justify-center gap-2">
                    Découvrir {company.name}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </button>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* Synergy Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 rounded-3xl p-12 border border-gray-200">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 mb-4">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-semibold text-gray-700">La synergie fait la différence</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                1 + 1 + 1 = 10
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Quand nos trois expertises travaillent ensemble, les résultats dépassent 
                la simple addition. C'est l'effet multiplicateur de notre écosystème.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {synergyPoints.map((point, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{index + 1}</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{point.title}</h4>
                  <p className="text-gray-600 text-sm">{point.description}</p>
                </div>
              ))}
            </div>

            {/* Success Metric */}
            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-6 px-8 py-4 bg-white rounded-2xl border border-gray-200">
                <div>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-green-600">
                    500+
                  </p>
                  <p className="text-gray-600 text-sm">Entreprises transformées</p>
                </div>
                <div className="w-px h-12 bg-gray-300" />
                <div>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-green-600">
                    3x ROI
                  </p>
                  <p className="text-gray-600 text-sm">En moyenne</p>
                </div>
                <div className="w-px h-12 bg-gray-300" />
                <div>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-green-600">
                    90 jours
                  </p>
                  <p className="text-gray-600 text-sm">Pour voir les résultats</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:scale-105 transition-all">
            Découvrir notre écosystème complet
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default EcosystemSection;