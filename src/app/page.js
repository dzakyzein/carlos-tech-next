import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import Services from '@/components/Services';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />
      <Services />
    </>
  );
}
