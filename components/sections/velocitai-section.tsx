"use client";

import { Brain, Users, Network } from "lucide-react";
import { ScannerCardStream } from "@/components/scanner-card-stream";
import { ExpandingCards, CardItem } from "@/components/expanding-cards";

const agentsData: CardItem[] = [
  {
    id: "admin",
    title: "Agent Administratif IA",
    description: "Automatise l'ensemble de vos processus administratifs. Gestion documentaire intelligente, classement automatique, traitement des factures et conformité RGPD garantie.",
    imgSrc: "/images/agent-admin.jpg",
    icon: <Brain className="w-8 h-8" />,
    linkHref: "#contact",
  },
  {
    id: "service-client",
    title: "Agent Service Client IA",
    description: "Support client 24h/24 multicanal. Réponses instantanées, gestion des tickets, satisfaction client maximale avec escalade intelligente vers vos équipes si nécessaire.",
    imgSrc: "/images/agent-service-client.jpg",
    icon: <Users className="w-8 h-8" />,
    linkHref: "#contact",
  },
  {
    id: "email",
    title: "Agent Email IA",
    description: "Trie, classe et répond à vos emails automatiquement. Priorisation intelligente, réponses personnalisées et gestion complète de votre boîte de réception.",
    imgSrc: "/images/agent-email.jpg",
    icon: <Brain className="w-8 h-8" />,
    linkHref: "#contact",
  },
  {
    id: "reseaux-sociaux",
    title: "Agent Réseaux Sociaux IA",
    description: "Présence digitale continue et engagement automatisé. Publication programmée, réponses aux commentaires, analyse de performance et croissance de votre audience.",
    imgSrc: "/images/agent-reseaux-sociaux.jpg",
    icon: <Network className="w-8 h-8" />,
    linkHref: "#contact",
  },
  {
    id: "prospection",
    title: "Agent Prospection IA",
    description: "Qualification automatisée des leads et suivi commercial intelligent. Identification des opportunités, scoring des prospects et accompagnement jusqu'à la conversion.",
    imgSrc: "/images/agent-prospection.jpg",
    icon: <Users className="w-8 h-8" />,
    linkHref: "#contact",
  },
];

const taskImages = [
  "/images/task-emails.jpg",
  "/images/task-admin.jpg",
  "/images/task-suivi.jpg",
  "/images/task-temps.jpg",
  "/images/task-charge.jpg",
];

export default function VelocitAISection() {
  return (
    <section id="velocitai" className="relative py-32 bg-gradient-to-b from-background via-slate-950 to-background overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-6 mb-20 text-center relative z-10">
        <div className="inline-block mb-6 px-8 py-3 rounded-full bg-violet-500/10 border border-violet-500/20">
          <span className="text-violet-400 font-semibold text-2xl uppercase tracking-wider">
            VelocitAI
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Écosystème d'Agents IA
          </span>
          <br />
          <span className="text-white">
            pour Diriger avec Croissance
          </span>
        </h2>

        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Nos agents IA spécialisés libèrent 25h par semaine à votre équipe et font tourner votre entreprise 24h/24.
          Votre business devient autonome, vos processus s'optimisent en continu.
        </p>
      </div>

      {/* Section: Nous faisons disparaître */}
      <div className="mb-40 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-violet-400">Tout disparaît :</span>
          </h3>
          <p className="text-2xl md:text-3xl font-semibold max-w-3xl mx-auto mb-8 leading-relaxed text-gray-900">
            Les tâches répétitives, la charge mentale, les erreurs humaines, les oublis...
            <span className="block mt-2 text-violet-600">
              Tout ce qui freine votre croissance.
            </span>
          </p>
        </div>

        {/* Scanner Card Stream */}
        <div className="relative h-screen max-h-[600px]">
          <ScannerCardStream
            cardImages={taskImages}
            initialSpeed={120}
            direction={-1}
            repeat={4}
            cardGap={50}
            scanEffect="scramble"
          />
        </div>
      </div>

      {/* Section: Agents IA */}
      <div className="container mx-auto px-6 mb-12 relative z-10">
        <div className="text-center mb-24 mt-32">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Écosystème d'Agents IA Spécialisés par Métier
            </span>
          </h3>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Transformez votre organisation avec des agents IA intelligents dédiés à chaque fonction business.
            Architecture évolutive : démarrez par vos processus prioritaires, étendez selon votre croissance.
          </p>
        </div>

        {/* Expanding Cards */}
        <div className="flex justify-center">
          <ExpandingCards items={agentsData} defaultActiveIndex={0} />
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur-sm border border-violet-500/20 rounded-2xl p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Prêt à libérer 25h par semaine ?
          </h3>
          <p className="text-gray-300 mb-6">
            Planifiez un audit stratégique personnalisé et découvrez comment nos agents IA
            peuvent transformer votre entreprise dès aujourd'hui.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-xl hover:from-violet-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-violet-500/50"
          >
            <Brain className="w-5 h-5" />
            Audit stratégique gratuit
          </a>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
