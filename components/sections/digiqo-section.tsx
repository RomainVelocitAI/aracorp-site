"use client";

import { 
  HoverSlider,
  TextStaggerHover,
  HoverSliderImage,
  HoverSliderImageWrap
} from "@/components/animated-slideshow";
import { 
  Globe, 
  Megaphone, 
  Users, 
  Search, 
  Video,
  Palette,
  FileCheck,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/spotlight-card";

export default function DigiqoSection() {
  const services = [
    {
      title: "Publicité en Ligne",
      icon: Megaphone,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop"
    },
    {
      title: "Développement Web",
      icon: Globe,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&h=900&fit=crop"
    },
    {
      title: "Community Management",
      icon: Users,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&h=900&fit=crop"
    },
    {
      title: "Référencement SEO",
      icon: Search,
      image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1600&h=900&fit=crop"
    },
    {
      title: "Visuels & Vidéos",
      icon: Video,
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&h=900&fit=crop"
    },
    {
      title: "Identité de Marque",
      icon: Palette,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&h=900&fit=crop"
    },
    {
      title: "Audit Gratuit",
      icon: FileCheck,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=900&fit=crop"
    },
    {
      title: "SiteKeeper",
      icon: Shield,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1600&h=900&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-orange-50/30 to-white dark:from-gray-900 dark:via-orange-950/20 dark:to-gray-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              DIGIQO
            </span>
            <span className="text-gray-900 dark:text-white">
              {" "}transforme vos visiteurs en clients
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Pendant que vous vous concentrez sur votre cœur de métier, Digiqo orchestre 
            l'intégralité de votre présence en ligne.
          </p>
        </motion.div>

        {/* Services avec HoverSlider */}
        <div className="mb-20">
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white"
          >
            Une palette complète de services pour votre croissance
          </motion.h3>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            De la publicité en ligne au développement web, en passant par le community management et la création de contenu, 
            nous mettons notre expertise au service de votre réussite digitale.
          </p>

          <HoverSlider className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Textes à gauche */}
              <div className="space-y-8">
                {services.map((service, index) => (
                  <TextStaggerHover 
                    key={index}
                    text={service.title} 
                    index={index}
                    className="text-3xl font-bold text-gray-900 dark:text-white hover:text-orange-600 transition-colors cursor-pointer block"
                  />
                ))}
              </div>

              {/* Images à droite */}
              <HoverSliderImageWrap className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                {services.map((service, index) => (
                  <HoverSliderImage
                    key={index}
                    index={index}
                    imageUrl={service.image}
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                ))}
              </HoverSliderImageWrap>
            </div>
          </HoverSlider>
        </div>

        {/* Section après le slider */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <GlowCard
            glowColor="digiqo"
            customSize={true}
            className="w-full p-10 md:p-12 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-950/10 dark:to-red-950/10"
          >
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Votre partenaire digital à La Réunion depuis 2020
              </h3>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-8">
                Digiqo, c'est l'expertise d'une équipe certifiée Google Partner et Meta Business Partner. 
                Nous transformons votre vision en résultats concrets : plus de trafic, plus de leads, plus de ventes.
              </p>

              <div className="grid md:grid-cols-3 gap-8 text-center">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.div 
                    className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  >
                    +167
                  </motion.div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Entreprises accompagnées</p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.div 
                    className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                  >
                    4.8/5
                  </motion.div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Note Google</p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.div 
                    className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, type: "spring", stiffness: 200 }}
                  >
                    +3M€
                  </motion.div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Budget géré</p>
                </motion.div>
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Prêt à propulser votre entreprise vers de nouveaux sommets ?
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-6 text-lg font-semibold"
            onClick={() => window.open("https://digiqo.fr", "_blank")}
          >
            Découvrir Digiqo
          </Button>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Audit gratuit • Sans engagement • Résultats garantis
          </p>
        </motion.div>
      </div>
    </section>
  );
}