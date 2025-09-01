"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import Image from "next/image";

interface SubsidiaryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

export default function SubsidiariesCarousel() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const items: SubsidiaryItem[] = [
    {
      id: "digiqo",
      title: "Digiqo",
      summary: "L'agence digitale qui décroche la lune. Marketing digital, publicité en ligne et création de sites web pour propulser votre entreprise.",
      url: "https://digiqo.fr",
      image: "/images/digiqo-screenshot.png",
    },
    {
      id: "runcall",
      title: "RunCall",
      summary: "Le service de closing téléphonique 100% réunionnais qui convertit vos prospects en clients. Expertise locale, résultats exceptionnels.",
      url: "https://runcall.re",
      image: "/images/runcall-screenshot.png",
    },
    {
      id: "automatx",
      title: "Automat-X",
      summary: "L'intelligence artificielle au service de votre entreprise. Automatisation des processus, chatbots intelligents et solutions IA sur mesure.",
      url: "#",
      image: "/images/automatix.png",
    },
  ];

  // Carousel scroll tracking
  useEffect(() => {
    if (!carouselApi) return;
    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    update();
    carouselApi.on("select", update);
    return () => {
      carouselApi.off("select", update);
    };
  }, [carouselApi]);

  return (
    <section id="carousel" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div className="max-w-2xl">
            <h3 className="text-lg sm:text-xl lg:text-3xl font-medium text-gray-900 dark:text-white leading-relaxed">
              <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base lg:text-3xl">
                La synergie ARACORP : trois expertises complémentaires pour accélérer votre transformation digitale complète.
              </span>
            </h3>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="h-10 w-10 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="h-10 w-10 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="w-full max-w-full">
          <Carousel
            setApi={setCarouselApi}
            opts={{ 
              breakpoints: { "(max-width: 768px)": { dragFree: true } },
              loop: true,
              align: "start"
            }}
            className="relative w-full max-w-full"
          >
            <CarouselContent className="hide-scrollbar w-full max-w-full md:ml-4 md:-mr-4">
              {items.map((item) => (
                <CarouselItem key={item.id} className="ml-6 md:max-w-[400px] lg:max-w-[450px]">
                  <div className="group block relative w-full h-[350px] md:h-[400px]">
                    <Card className="overflow-hidden rounded-xl h-full w-full rounded-3xl">
                      {/* Image */}
                      <div className="relative h-full w-full transition-all duration-500 group-hover:h-1/2">
                        <Image
                          width={450}
                          height={350}
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover object-top"
                        />
                        {/* Fade overlay at bottom */}
                        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Text Section */}
                      <div className="absolute bottom-0 left-0 w-full px-6 py-4 transition-all duration-500 group-hover:h-1/2 group-hover:flex flex-col justify-center bg-background/95 backdrop-blur-sm opacity-0 group-hover:opacity-100">
                        <h3 className="text-xl font-bold md:text-2xl mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm md:text-base line-clamp-3 mb-4">
                          {item.summary}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-300"
                            onClick={() => {
                              if (item.url.startsWith("http")) {
                                window.open(item.url, '_blank');
                              }
                            }}
                          >
                            Voir le site
                            <ArrowRight className="ml-1 size-4 rotate-[-45deg]" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
                            onClick={() => {
                              // TODO: Navigate to section
                            }}
                          >
                            Découvrir
                            <ArrowRight className="ml-1 size-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}