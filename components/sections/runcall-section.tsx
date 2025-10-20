"use client";

import { ZoomParallax } from "@/components/zoom-parallax";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function RunCallSection() {
  const [panierMoyen, setPanierMoyen] = useState<string>("");
  const [nombreLeads, setNombreLeads] = useState<string>("");
  const [tauxConversion, setTauxConversion] = useState<string>("");
  const [dureeAppel, setDureeAppel] = useState<string>("15");
  const [coutHoraire, setCoutHoraire] = useState<string>("25");

  // Calculs enrichis
  const leads = parseInt(nombreLeads) || 0;
  const panier = parseFloat(panierMoyen) || 0;
  const tauxActuel = parseFloat(tauxConversion) || 0;
  const duree = parseFloat(dureeAppel) || 15;
  const cout = parseFloat(coutHoraire) || 25;

  const tempsGagne = leads ? Math.round(leads * 17 / 60) : 0;
  const caActuel = panier * leads * (tauxActuel / 100);
  const caAvecRunCall = panier * leads * 0.15;
  const gainCA = caAvecRunCall - caActuel;

  // Nouveaux calculs
  const coutActuel = (leads * duree / 60) * cout;
  const economie = coutActuel * 0.7; // 70% d'économie avec RunCall
  const roi = gainCA > 0 ? Math.round((gainCA - economie) / economie * 100) : 0;
  const projection6mois = gainCA * 6;
  const projection12mois = gainCA * 12;
  const coutParLeadActuel = caActuel > 0 ? Math.round(coutActuel / (leads * tauxActuel / 100)) : 0;
  const coutParLeadRunCall = caAvecRunCall > 0 ? Math.round((coutActuel * 0.3) / (leads * 0.15)) : 0;

  const images = [
    { src: "", alt: "RunCall" }, // Centre - sera remplacé par le titre
    { src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop", alt: "Closing Expert" },
    { src: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&h=600&fit=crop", alt: "Dashboard Live" },
    { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop", alt: "Équipe Locale" },
    { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop", alt: "Support 7j/7" },
    { src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop", alt: "ROI Garanti" },
    { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", alt: "Analytics" },
  ];

  return (
    <section className="relative">
      {/* Header */}
      <div className="container mx-auto px-6 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gray-900 dark:text-white">Le deuxième pilier : </span>
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Réactivité
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            RunCall transforme vos prospects en clients avec une équipe de closers experts
            qui parlent réunionnais et comprennent le marché local.
          </p>
        </motion.div>
      </div>

      {/* Zoom Parallax Component */}
      <ZoomParallax images={images} />

      {/* Container Scroll Animation */}
      <ContainerScroll
        titleComponent={
          <div className="mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              RunCall, c'est simple et efficace
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Vos leads arrivent, nous les rappelons immédiatement.
              Nos closers réunionnais qualifient, relancent et convertissent.
              Vous récupérez des clients prêts à acheter.
            </p>
          </div>
        }
      >
        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg p-12 flex flex-col justify-center items-center text-white">
          <h4 className="text-5xl md:text-7xl font-bold mb-8 text-center">
            Le processus RunCall
          </h4>
          <div className="space-y-8 max-w-3xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <div>
                <h5 className="text-2xl font-semibold mb-2">Réception du lead</h5>
                <p className="text-white/90 text-lg">Votre prospect remplit un formulaire ou vous contacte</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <div>
                <h5 className="text-2xl font-semibold mb-2">Rappel immédiat</h5>
                <p className="text-white/90 text-lg">Nos closers le rappellent immédiatement</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <div>
                <h5 className="text-2xl font-semibold mb-2">Qualification & Closing</h5>
                <p className="text-white/90 text-lg">Échange avec expertise locale, qualification des besoins et conversion</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                4
              </div>
              <div>
                <h5 className="text-2xl font-semibold mb-2">Client converti</h5>
                <p className="text-white/90 text-lg">Vous récupérez un client prêt à acheter</p>
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>

      {/* Explication et Calculateur après le zoom parallax */}
      <div className="container mx-auto px-6 py-24">

        {/* Introduction SEO avant le calculateur */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Transformez vos leads en revenus avec un service de closing téléphonique premium
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            RunCall révolutionne la gestion de vos prospects à La Réunion grâce à une équipe de <strong>closers professionnels formés</strong> qui comprennent les spécificités du marché réunionnais. Notre expertise en closing téléphonique permet d'atteindre des <strong>taux de conversion jusqu'à 15%</strong>, bien au-dessus des standards du marché.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Chaque lead représente une opportunité de revenus. Avec RunCall, vous ne perdez plus aucune vente potentielle : <strong>réactivité maximale</strong>, qualification professionnelle et closing efficace. Nos closers réunionnais établissent une relation de confiance immédiate avec vos prospects grâce à leur connaissance approfondie du contexte culturel et économique local.
          </p>
        </motion.div>

        {/* Calculateur Premium avec Images et Effets */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mb-20"
        >
          {/* Image de fond avec overlay */}
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&h=900&fit=crop"
              alt="Call center professionnel"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
          </div>

          <div className="relative z-10 p-8 md:p-16">
            {/* Header du calculateur */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-block mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-50" />
                  <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-4">
                    <span className="text-sm font-bold text-white uppercase tracking-[0.2em]">
                      Simulateur ROI
                    </span>
                  </div>
                </div>
              </motion.div>

              <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Mesurez votre potentiel
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  de croissance
                </span>
              </h3>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Découvrez l'impact réel de RunCall sur votre activité commerciale
              </p>
            </div>

            {/* Inputs avec design premium */}
            <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                  <Label htmlFor="panier" className="text-white/80 mb-3 block text-sm font-medium uppercase tracking-wider">
                    Panier moyen
                  </Label>
                  <div className="relative">
                    <Input
                      id="panier"
                      type="number"
                      placeholder="2500"
                      value={panierMoyen}
                      onChange={(e) => setPanierMoyen(e.target.value)}
                      className="bg-white/5 border-white/10 text-white text-2xl font-bold h-16 rounded-xl pl-12 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-cyan-400 font-bold">€</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                  <Label htmlFor="leads" className="text-white/80 mb-3 block text-sm font-medium uppercase tracking-wider">
                    Leads mensuels
                  </Label>
                  <Input
                    id="leads"
                    type="number"
                    placeholder="150"
                    value={nombreLeads}
                    onChange={(e) => setNombreLeads(e.target.value)}
                    className="bg-white/5 border-white/10 text-white text-2xl font-bold h-16 rounded-xl focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                  <Label htmlFor="taux" className="text-white/80 mb-3 block text-sm font-medium uppercase tracking-wider">
                    Taux actuel
                  </Label>
                  <div className="relative">
                    <Input
                      id="taux"
                      type="number"
                      placeholder="5"
                      value={tauxConversion}
                      onChange={(e) => setTauxConversion(e.target.value)}
                      className="bg-white/5 border-white/10 text-white text-2xl font-bold h-16 rounded-xl pr-12 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-cyan-400 font-bold">%</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Inputs supplémentaires */}
            <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300">
                  <Label htmlFor="duree" className="text-white/70 mb-3 block text-xs font-medium uppercase tracking-wider">
                    Duree appel actuel (min)
                  </Label>
                  <Input
                    id="duree"
                    type="number"
                    placeholder="15"
                    value={dureeAppel}
                    onChange={(e) => setDureeAppel(e.target.value)}
                    className="bg-white/5 border-white/10 text-white text-lg font-semibold h-12 rounded-xl focus:border-purple-400/30 focus:ring-1 focus:ring-purple-400/10 transition-all"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300">
                  <Label htmlFor="cout" className="text-white/70 mb-3 block text-xs font-medium uppercase tracking-wider">
                    Cout horaire equipe (€/h)
                  </Label>
                  <div className="relative">
                    <Input
                      id="cout"
                      type="number"
                      placeholder="25"
                      value={coutHoraire}
                      onChange={(e) => setCoutHoraire(e.target.value)}
                      className="bg-white/5 border-white/10 text-white text-lg font-semibold h-12 rounded-xl pl-8 focus:border-purple-400/30 focus:ring-1 focus:ring-purple-400/10 transition-all"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-purple-400 font-semibold">€</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Résultats avec images et animations */}
            {(panierMoyen && nombreLeads && tauxConversion) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                {/* Première rangée : Temps + CA */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Carte Temps gagné */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <img
                          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=600&fit=crop"
                          alt="Time"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="relative z-10">
                        <div className="text-sm font-semibold text-orange-400 mb-4 uppercase tracking-wider">
                          Temps libere
                        </div>
                        <div className="text-7xl md:text-8xl font-black mb-4 bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
                          {tempsGagne}h
                        </div>
                        <div className="text-xl font-semibold text-white mb-2">
                          Par mois
                        </div>
                        <div className="text-gray-400 text-sm leading-relaxed">
                          17 minutes economisees par lead, soit {tempsGagne} heures pour developper votre strategie
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Carte CA supplémentaire */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <img
                          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=600&fit=crop"
                          alt="Revenue"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="relative z-10">
                        <div className="text-sm font-semibold text-emerald-400 mb-4 uppercase tracking-wider">
                          Revenus additionnels
                        </div>
                        <div className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-br from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent">
                          +{gainCA > 0 ? Math.round(gainCA/1000) : '0'}K€
                        </div>
                        <div className="text-xl font-semibold text-white mb-2">
                          Par mois
                        </div>
                        <div className="text-gray-400 text-sm leading-relaxed">
                          Avec 15% de conversion, soit +{Math.round((gainCA / caActuel) * 100)}% de croissance sur votre CA actuel
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Projection annuelle */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="relative group max-w-md mx-auto mb-8"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                    <div className="text-sm font-semibold text-amber-400 mb-3 uppercase tracking-wider text-center">Projection 12 mois</div>
                    <div className="text-6xl font-black mb-3 bg-gradient-to-br from-amber-400 to-orange-400 bg-clip-text text-transparent text-center">
                      {Math.round(projection12mois/1000)}K€
                    </div>
                    <div className="text-gray-400 text-sm text-center">CA additionnel sur un an</div>
                  </div>
                </motion.div>

                {/* Ligne de séparation animée */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent my-8"
                />

                {/* Message de confiance */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="text-center"
                >
                  <p className="text-gray-400 text-sm">
                    Projections basees sur nos performances reelles mesurees sur +1000 leads traites
                  </p>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Texte de conclusion SEO après le calculateur */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Pourquoi choisir RunCall pour votre closing téléphonique à La Réunion ?
          </h3>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative h-full bg-white dark:bg-slate-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-4 flex-shrink-0" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Reactivite maximale garantie
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
                  Nos closers repondent instantanement a vos leads. Dans un marche competitif comme La Reunion, <strong>la rapidite de reponse fait la difference</strong> entre un client conquis et une opportunite perdue. Chaque seconde compte.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative h-full bg-white dark:bg-slate-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-purple-500/50 transition-all duration-300 flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4 flex-shrink-0" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Expertise locale certifiee
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
                  Nos closers reunionnais parlent le meme langage que vos prospects. Ils comprennent les <strong>codes culturels, les attentes specifiques</strong> et les realites economiques du marche local. Cette proximite culturelle se traduit directement en taux de conversion superieurs.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="group relative h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative h-full bg-white dark:bg-slate-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-emerald-500/50 transition-all duration-300 flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl mb-4 flex-shrink-0" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Performance mesurable et transparente
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
                  Accedez a un <strong>tableau de bord en temps reel</strong> avec toutes les metriques importantes : taux de decroche, duree moyenne des appels, objections rencontrees, taux de conversion par source. Pilotez votre activite avec des donnees precises.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="group relative h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative h-full bg-white dark:bg-slate-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-orange-500/50 transition-all duration-300 flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl mb-4 flex-shrink-0" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Modele economique gagnant-gagnant
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
                  Avec la formule Pioneer, vous ne payez que pour les resultats obtenus. <strong>Zero frais fixe</strong>, uniquement une commission sur les ventes realisees. Votre investissement est proportionnel a votre reussite commerciale.
                </p>
              </div>
            </motion.div>
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center mb-8">
            RunCall n'est pas qu'un service de closing téléphonique, c'est un <strong>partenaire de croissance</strong> qui s'engage à vos côtés. Nos closers deviennent une extension naturelle de votre équipe commerciale, avec un seul objectif : <strong>maximiser votre chiffre d'affaires</strong> tout en libérant votre temps pour vous concentrer sur le développement stratégique de votre entreprise.
          </p>
        </motion.div>

        {/* CTA Premium Refondu */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Fond avec image */}
          <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&h=800&fit=crop"
              alt="Success"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700" />
          </div>

          <div className="relative z-10 p-12 md:p-20 text-center">
            {/* Badge de preuve sociale */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block mb-8"
            >
              <div className="bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-full px-8 py-3">
                <span className="text-white font-bold text-sm">
                  50+ entreprises reunionnaises generent +40K€/mois avec RunCall
                </span>
              </div>
            </motion.div>

            {/* Titre puissant */}
            <h3 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Rejoignez l'elite commerciale
              <br />
              <span className="text-cyan-200">de La Reunion</span>
            </h3>

            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Transformez votre strategie commerciale et multipliez vos revenus des aujourd'hui
            </p>

            {/* Bouton CTA avec animation pulse */}
            <div className="mb-12">
              <Button
                size="lg"
                className="group bg-white text-blue-600 hover:bg-blue-50 px-12 py-8 text-2xl font-black shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)] transition-all hover:scale-110 rounded-2xl animate-pulse hover:animate-none"
                onClick={() => window.open("https://runcall.re", "_blank")}
              >
                <span className="flex items-center gap-3">
                  Demarrer maintenant
                  <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
              <p className="text-white/80 text-sm mt-4 font-medium">
                Sans engagement • Configuration en 48h • Support premium inclus
              </p>
            </div>

            {/* Stats de performance */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/20 hover:border-white/40 transition-all hover:scale-105"
              >
                <div className="text-5xl font-black text-cyan-300 mb-2">15%</div>
                <div className="text-white font-semibold text-lg">Taux de conversion</div>
                <div className="text-blue-200 text-sm mt-1">vs 3-5% en moyenne secteur</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/20 hover:border-white/40 transition-all hover:scale-105"
              >
                <div className="text-5xl font-black text-green-300 mb-2">0€</div>
                <div className="text-white font-semibold text-lg">Frais fixes</div>
                <div className="text-blue-200 text-sm mt-1">Paiement uniquement au resultat</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/20 hover:border-white/40 transition-all hover:scale-105"
              >
                <div className="text-5xl font-black text-yellow-300 mb-2">48h</div>
                <div className="text-white font-semibold text-lg">Mise en service</div>
                <div className="text-blue-200 text-sm mt-1">Formation closers incluse</div>
              </motion.div>
            </div>

            {/* Badge de garantie */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-10 flex items-center justify-center gap-3 text-white/90"
            >
              <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Garantie satisfaction 30 jours ou rembourse</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}