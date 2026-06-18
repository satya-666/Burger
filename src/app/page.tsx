import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import BrandStory from "@/components/sections/BrandStory";
import FeaturedBurgers from "@/components/sections/FeaturedBurgers";
import CustomerExperience from "@/components/sections/CustomerExperience";
import CallToAction from "@/components/sections/CallToAction";
import Footer from "@/components/sections/Footer";
import CookieBanner from "@/components/ui/CookieBanner";
import AuthProvider from "@/components/auth/AuthProvider";

export default function Home() {
  return (
    <AuthProvider>
      <main className="noise-bg relative min-h-screen">
        <Navbar />
        <Hero />
        <ProductShowcase />
        <BrandStory />
        <FeaturedBurgers />
        <CustomerExperience />
        <CallToAction />
        <Footer />
        <CookieBanner />
      </main>
    </AuthProvider>
  );
}
