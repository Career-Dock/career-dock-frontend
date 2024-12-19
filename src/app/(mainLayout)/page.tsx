import FeatureShowcase from './_components/landing/feature-showcase';
import Hero from './_components/landing/hero';

export default async function Home() {
  return (
    <main>
      <Hero />
      <FeatureShowcase />
    </main>
  );
}
