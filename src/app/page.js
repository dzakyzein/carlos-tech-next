import Navbar from '@/components/RealNavbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import Services from '@/components/Services';
import Workflow from '@/components/Workflow';
import PopularProducts from '@/components/PopularProducts';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CallToAction';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />
      <Services />
      <Workflow />
      <PopularProducts />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </>
  );
}
