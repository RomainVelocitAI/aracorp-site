"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  Users,
  CheckCircle
} from 'lucide-react';
import { GlowCard } from '@/components/spotlight-card';

const PromiseSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const keyPoints = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Croissance mesurable",
      description: "ROI multiplié par 3 en moyenne, résultats visibles dès 30 jours"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Gain de temps",
      description: "15h par semaine libérées grâce à l'automatisation intelligente"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Pipeline optimisé",
      description: "300 à 500 leads qualifiés par mois, taux de conversion de 25%"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 bg-white overflow-hidden"
    >
      {/* Subtle background effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Votre transformation digitale en 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> 90 jours</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            L'écosystème ARA Corp synchronise marketing, automatisation et vente 
            pour créer une machine de croissance qui fonctionne 24/7
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Un écosystème, pas une agence
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Contrairement aux agences traditionnelles qui travaillent en silos, 
                nous avons créé un écosystème où <span className="text-blue-400 font-semibold">Digiqo</span> génère les leads, 
                <span className="text-purple-400 font-semibold"> Automat-X</span> (notre CRM IA) centralise et automatise la gestion commerciale, 
                et <span className="text-green-400 font-semibold"> RunCall</span> maximise la conversion. 
                Chaque outil communique pour créer une synergie parfaite.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                500+ success stories
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Depuis 2019, nous avons accompagné plus de 500 entreprises dans leur transformation. 
                De la startup en croissance au groupe international, notre méthode s'adapte 
                à votre contexte tout en garantissant des résultats mesurables et durables.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                La méthode A.R.A
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">
                    <strong className="text-gray-900">Analyser :</strong> Audit complet de votre potentiel digital
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">
                    <strong className="text-gray-900">Révolutionner :</strong> Déploiement des solutions sur-mesure
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">
                    <strong className="text-gray-900">Accélérer :</strong> Optimisation continue pour maximiser le ROI
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right: Key metrics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {keyPoints.map((point, index) => (
              <GlowCard
                key={index}
                glowColor={index === 0 ? 'turquoise' : index === 1 ? 'digiqo' : 'purple'}
                customSize={true}
                className="p-6 bg-white/90"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-[#2BA8B5]/20 to-[#D97652]/20 rounded-xl text-[#2BA8B5]">
                    {point.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {point.title}
                    </h4>
                    <p className="text-gray-600">
                      {point.description}
                    </p>
                  </div>
                </div>
              </GlowCard>
            ))}

            {/* Testimonial */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-2xl">
              <blockquote className="text-gray-600 italic mb-4">
                "En 3 mois, ARA Corp a transformé notre approche commerciale. 
                Résultat : 4x plus de clients et 50% de temps en moins."
              </blockquote>
              <cite className="text-gray-900 font-semibold">
                Sophie Martin, CEO FashionTech
              </cite>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-lg text-gray-400 mb-8">
            Rejoignez les entreprises qui ont choisi de passer à la vitesse supérieure
          </p>
          
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/20 transition-all">
            Découvrir notre approche
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PromiseSection;