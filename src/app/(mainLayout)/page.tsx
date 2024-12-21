import FAQSection from './_components/landing/faq';
import FeatureGrid from './_components/landing/feature-grid';
import FeatureShowcase from './_components/landing/feature-showcase';
import Hero from './_components/landing/hero';
import XFactor from './_components/landing/x-factor';

export default async function Home() {
  return (
    <main>
      <Hero />
      <FeatureShowcase />
      <FeatureGrid />
      <XFactor />
      <FAQSection />
    </main>
  );
}
