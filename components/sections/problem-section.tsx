"use client";

import React, { useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Target, 
  Clock, 
  TrendingUp, 
  BarChart, 
  Zap, 
  Phone, 
  MousePointer, 
  Gauge, 
  Users,
  Sparkles
} from 'lucide-react';
import { useRef } from 'react';

interface ProblemItem {
  id: number;
  text: string;
  checked: boolean;
  solution: 'digiqo' | 'automat-x' | 'runcall';
  icon: React.ReactNode;
}

interface SolutionInfo {
  id: string;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const solutionsData: Record<string, SolutionInfo> = {
  'digiqo': {
    id: 'digiqo',
    name: 'DIGIQO',
    description: 'Marketing & Acquisition',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  },
  'automat-x': {
    id: 'automat-x',
    name: 'AUTOMAT-X',
    description: 'CRM IA tout-en-un',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30'
  },
  'runcall': {
    id: 'runcall',
    name: 'RUNCALL',
    description: 'Vente & Conversion',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30'
  }
};

const ProblemSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [problems, setProblems] = useState<ProblemItem[]>([
    {
      id: 1,
      text: "Vos campagnes publicitaires ne génèrent pas assez de leads qualifiés",
      checked: false,
      solution: 'digiqo',
      icon: <Target className="w-5 h-5" />
    },
    {
      id: 2,
      text: "Votre CRM actuel est complexe et déconnecté de vos outils marketing",
      checked: false,
      solution: 'automat-x',
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 3,
      text: "Votre taux de conversion des prospects est inférieur à 15%",
      checked: false,
      solution: 'runcall',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: 4,
      text: "Vous n'avez pas de vision claire du ROI de vos actions marketing",
      checked: false,
      solution: 'digiqo',
      icon: <BarChart className="w-5 h-5" />
    },
    {
      id: 5,
      text: "Vos devis et factures sont encore gérés manuellement",
      checked: false,
      solution: 'automat-x',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 6,
      text: "Vous n'arrivez pas à suivre efficacement vos prospects chauds",
      checked: false,
      solution: 'runcall',
      icon: <Phone className="w-5 h-5" />
    },
    {
      id: 7,
      text: "Votre site web ne convertit pas vos visiteurs en clients",
      checked: false,
      solution: 'digiqo',
      icon: <MousePointer className="w-5 h-5" />
    },
    {
      id: 8,
      text: "Vos données clients sont éparpillées entre plusieurs outils",
      checked: false,
      solution: 'automat-x',
      icon: <Gauge className="w-5 h-5" />
    },
    {
      id: 9,
      text: "Votre force de vente n'atteint pas ses objectifs mensuels",
      checked: false,
      solution: 'runcall',
      icon: <Users className="w-5 h-5" />
    },
  ]);

  const [checkedCount, setCheckedCount] = useState(0);
  const [activeSolutions, setActiveSolutions] = useState<Set<string>>(new Set());

  const handleCheck = (id: number) => {
    setProblems(prev => 
      prev.map(problem => 
        problem.id === id 
          ? { ...problem, checked: !problem.checked }
          : problem
      )
    );
  };

  useEffect(() => {
    const checkedProblems = problems.filter(p => p.checked);
    setCheckedCount(checkedProblems.length);
    
    const solutions = new Set(checkedProblems.map(p => p.solution));
    setActiveSolutions(solutions);
  }, [problems]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  // Fonction pour obtenir la couleur selon la solution
  const getSolutionStyles = (solution: string, checked: boolean) => {
    if (!checked) return 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300';
    
    const solutionInfo = solutionsData[solution];
    return `${solutionInfo.bgColor} ${solutionInfo.borderColor} shadow-lg`;
  };

  const getCheckboxColor = (solution: string, checked: boolean) => {
    if (!checked) return 'border-gray-500 group-hover:border-gray-400';
    
    const colors: Record<string, string> = {
      'digiqo': 'bg-blue-500 border-blue-500',
      'automat-x': 'bg-purple-500 border-purple-500',
      'runcall': 'bg-green-500 border-green-500'
    };
    return colors[solution] || 'border-gray-500';
  };

  const getTextColor = (solution: string, checked: boolean) => {
    if (!checked) return 'text-gray-300';
    
    const colors: Record<string, string> = {
      'digiqo': 'text-blue-300',
      'automat-x': 'text-purple-300',
      'runcall': 'text-green-300'
    };
    return colors[solution] || 'text-gray-300';
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 bg-gray-50 overflow-hidden"
    >
      {/* Background subtle animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Identifiez vos défis actuels
          </h2>
          <p className="text-gray-400 text-lg">
            Chaque problème a sa solution dans notre écosystème
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.id}
              variants={itemVariants}
              className="group"
            >
              <label
                className={`
                  flex items-start gap-3 p-4 lg:p-5 rounded-xl cursor-pointer
                  transition-all duration-300 border h-full
                  ${getSolutionStyles(problem.solution, problem.checked)}
                `}
              >
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    checked={problem.checked}
                    onChange={() => handleCheck(problem.id)}
                    className="sr-only"
                  />
                  <div
                    className={`
                      w-6 h-6 rounded border-2 transition-all duration-300
                      ${getCheckboxColor(problem.solution, problem.checked)}
                    `}
                  >
                    {problem.checked && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3, type: "spring" }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <X className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <span
                    className={`
                      text-sm lg:text-base transition-colors duration-300 flex items-start gap-2
                      ${getTextColor(problem.solution, problem.checked)}
                    `}
                  >
                    <span className="mt-0.5 opacity-50 flex-shrink-0">{problem.icon}</span>
                    {problem.text}
                  </span>
                </div>
              </label>
            </motion.div>
          ))}
        </motion.div>

        {/* Solutions Display */}
        <AnimatePresence mode="wait">
          {activeSolutions.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-12"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Vos solutions personnalisées
                </h3>
                <p className="text-gray-400">
                  L'écosystème ARA Corp répond à vos besoins spécifiques
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {Array.from(activeSolutions).map((solutionId) => {
                  const solution = solutionsData[solutionId];
                  return (
                    <motion.div
                      key={solutionId}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, type: "spring" }}
                      className={`
                        relative p-6 rounded-xl border
                        ${solution.bgColor} ${solution.borderColor}
                        backdrop-blur-sm
                      `}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`text-xl font-bold ${solution.color}`}>
                          {solution.name}
                        </h4>
                        <Sparkles className={`w-5 h-5 ${solution.color}`} />
                      </div>
                      <p className="text-gray-300 text-sm">
                        {solution.description}
                      </p>
                      
                      {/* Nombre de problèmes adressés */}
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-xs text-gray-400">
                          Résout {problems.filter(p => p.checked && p.solution === solutionId).length} de vos défis
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {activeSolutions.size === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-8 p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 rounded-xl border border-gray-200"
                >
                  <p className="text-gray-900 font-semibold text-lg mb-2">
                    L'écosystème complet est votre solution optimale
                  </p>
                  <p className="text-gray-400">
                    Nos 3 filiales travaillent en synergie pour maximiser votre croissance
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to action subtile */}
        {checkedCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 text-lg">
              Découvrez comment 
              <span className="text-gray-900 font-semibold"> 500+ entreprises </span>
              ont résolu ces mêmes défis
            </p>
            
            <motion.div
              className="mt-6 inline-block"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto">
                <div className="w-1 h-3 bg-white rounded-full mx-auto mt-2 animate-bounce" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProblemSection;