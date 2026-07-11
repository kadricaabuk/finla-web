import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Showcase from "@/components/Showcase";
import Tech from "@/components/Tech";
import Security from "@/components/Security";
import Audience from "@/components/Audience";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <HowItWorks />
      <Features />
      <Showcase />
      <Tech />
      <Security />
      <Audience />
      <Faq />
      <Footer />
    </main>
  );
}
