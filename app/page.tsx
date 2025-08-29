import FractalBloomHero from '@/components/fractal-bloom-tree';

export default function Home() {
  return (
    <main className="min-h-screen">
      <FractalBloomHero />
      
      {/* Future sections */}
      <section className="py-20 px-4 text-center bg-slate-50">
        <h2 className="text-3xl font-bold mb-4">Nos Services</h2>
        <p className="text-gray-600">Section en cours de développement...</p>
      </section>
    </main>
  );
}