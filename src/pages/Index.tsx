import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import SEO from "@/components/SEO";

const Home = () => {
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "RootNexis",
    "description": "RootNexis is a leading digital agency in Kigali, Rwanda specializing in web development, UI/UX design, AI automation, and branding.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "RootNexis",
      "logo": "/logoRN.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kigali",
        "addressCountry": "Rwanda"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+250725064686",
        "contactType": "customer service",
        "email": "rootnexis@gmail.com",
        "availableLanguage": ["English"]
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO 
        title="RootNexis — Transform Ideas Into Digital Reality | Web Development & AI Solutions in Kigali, Rwanda"
        description="RootNexis is a leading digital agency in Kigali, Rwanda specializing in web development, UI/UX design, AI automation, and branding. Transform your vision into high-performance digital products with our expert team."
        keywords="web development Kigali Rwanda, UI UX design Rwanda, AI automation Africa, digital agency Rwanda, React development, Next.js apps, branding services, mobile app development, SEO optimization, chatbot development, RootNexis, Rwanda tech company"
        structuredData={homeStructuredData}
      />
      <Navbar />
      <HeroSection />
      <CTASection />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Home;
