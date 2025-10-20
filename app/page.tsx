import FractalBloomHero from '@/components/fractal-bloom-tree';
import SubsidiariesCarousel from '@/components/subsidiaries-carousel';
import DigiqoSection from '@/components/sections/digiqo-section';
import RunCallSection from '@/components/sections/runcall-section';
import VelocitAISection from '@/components/sections/velocitai-section';

export default function Home() {
  return (
    <main className="min-h-screen">
      <FractalBloomHero />
      <SubsidiariesCarousel />
      <DigiqoSection />
      <RunCallSection />
      <VelocitAISection />
    </main>
  );
}