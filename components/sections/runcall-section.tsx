"use client";

import { ZoomParallax } from "@/components/zoom-parallax";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RunCallSection() {
  const [panierMoyen, setPanierMoyen] = useState<string>("");
  const [nombreLeads, setNombreLeads] = useState<string>("");
  const [tauxConversion, setTauxConversion] = useState<string>("");

  // Calculs
  const tempsGagne = nombreLeads ? Math.round((parseInt(nombreLeads) || 0) * 17 / 60) : 0;
  const caActuel = (parseFloat(panierMoyen) || 0) * (parseInt(nombreLeads) || 0) * ((parseFloat(tauxConversion) || 0) / 100);
  const caAvecRunCall = (parseFloat(panierMoyen) || 0) * (parseInt(nombreLeads) || 0) * 0.15;
  const gainCA = caAvecRunCall - caActuel;

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
            qui parlent créole et comprennent le marché réunionnais.
          </p>
        </motion.div>
      </div>

      {/* Zoom Parallax Component */}
      <ZoomParallax images={images} />

      {/* Explication et Calculateur après le zoom parallax */}
      <div className="container mx-auto px-6 py-24">
        {/* Brève explication */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-bold mb-6">
            RunCall, c'est simple et efficace
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Vos leads arrivent, nous les rappelons en moins de 5 minutes. 
            Nos closers créoles qualifient, relancent et convertissent. 
            Vous récupérez des clients prêts à acheter.
          </p>
        </motion.div>

        {/* Calculateur */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-white mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-8">
            Calculez votre potentiel avec RunCall
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <Label htmlFor="panier" className="text-white mb-2 block">
                Panier moyen (€)
              </Label>
              <Input
                id="panier"
                type="number"
                placeholder="Ex: 250"
                value={panierMoyen}
                onChange={(e) => setPanierMoyen(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div>
              <Label htmlFor="leads" className="text-white mb-2 block">
                Nombre de leads/mois
              </Label>
              <Input
                id="leads"
                type="number"
                placeholder="Ex: 100"
                value={nombreLeads}
                onChange={(e) => setNombreLeads(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div>
              <Label htmlFor="taux" className="text-white mb-2 block">
                Taux de conversion actuel (%)
              </Label>
              <Input
                id="taux"
                type="number"
                placeholder="Ex: 3"
                value={tauxConversion}
                onChange={(e) => setTauxConversion(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </div>

          {(panierMoyen && nombreLeads && tauxConversion) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">{tempsGagne}h</div>
                  <p className="text-blue-100">
                    Gagnées par mois<br/>
                    <span className="text-sm opacity-80">(17 min/lead économisées)</span>
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">
                    +{gainCA > 0 ? Math.round(gainCA).toLocaleString('fr-FR') : '0'}€
                  </div>
                  <p className="text-blue-100">
                    De CA supplémentaire/mois<br/>
                    <span className="text-sm opacity-80">(avec 15% de conversion)</span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Arrêtez de perdre des ventes. Commencez à convertir.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg font-semibold"
            onClick={() => window.open("https://runcall.re", "_blank")}
          >
            Activer RunCall
          </Button>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Formule Pioneer • 0€ de frais fixes • Paiement au résultat
          </p>
        </motion.div>
      </div>
    </section>
  );
}