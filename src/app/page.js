import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import Services from '@/components/Services';
import Workflow from '@/components/Workflow';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />
      <Services />
      <Workflow />
    </>
  );
}
