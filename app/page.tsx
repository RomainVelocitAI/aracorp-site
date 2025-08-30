import FractalBloomHero from '@/components/fractal-bloom-tree';
import PromiseSection from '@/components/sections/promise-section';
import { ZoomParallax } from '@/components/zoom-parallax';
import ProblemSection from '@/components/sections/problem-section';
import DigiqoPresentationSection from '@/components/sections/digiqo-presentation-section';
import RuncallSection from '@/components/sections/runcall-section';
import EcosystemSection from '@/components/sections/ecosystem-section';

export default function Home() {
  const zoomImages = [
    { src: '', alt: 'Digiqo - Marketing Digital' }, // Le texte DIGIQO sera affiché à la place
    { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', alt: 'Analytics Dashboard' },
    { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80', alt: 'Équipe stratégie digitale' },
    { src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80', alt: 'Réunion client' },
    { src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80', alt: 'Collaboration équipe' },
    { src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80', alt: 'Graphiques croissance' },
    { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', alt: 'Workshop stratégie' }
  ];

  const runcallZoomImages = [
    { src: '', alt: 'RunCall - Closing téléphonique' }, // Le texte RUNCALL sera affiché à la place
    { src: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&q=80', alt: 'Équipe téléphonique' },
    { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80', alt: 'Centre d\'appels moderne' },
    { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80', alt: 'Consultant au téléphone' },
    { src: 'https://images.unsplash.com/photo-1553484771-047a44eee27f?w=800&q=80', alt: 'Dashboard ventes' },
    { src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80', alt: 'Closing téléphonique' },
    { src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80', alt: 'Résultats commerciaux' }
  ];

  return (
    <main className="min-h-screen">
      <FractalBloomHero />
      <PromiseSection />
      <ZoomParallax images={zoomImages} />
      <DigiqoPresentationSection />
      <ZoomParallax images={runcallZoomImages} />
      <RuncallSection />
      <ProblemSection />
      <EcosystemSection />
      
      {/* Future sections */}
      <section className="py-20 px-4 text-center bg-white">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Prochaines sections</h2>
        <p className="text-gray-600">En cours de développement...</p>
      </section>
    </main>
  );
}