import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import StatisticsSection from './components/StatisticsSection';
import ProcessesSection from './components/ProcessesSection';
import SafetySection from './components/SafetySection';
import ClientSection from './components/ClientSection';
import CTASection from './components/CTASection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProcessesSection />
      <SafetySection />
      <ClientSection />
      <StatisticsSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
}
