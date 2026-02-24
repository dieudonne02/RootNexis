import { motion } from "framer-motion";
import { Code, Palette, Zap, Smartphone } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom websites and web applications built with cutting-edge technologies",
      features: ["React/Next.js", "Node.js", "TypeScript", "Cloud Deployment"]
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Stunning user interfaces that delight and convert",
      features: ["Figma", "User Research", "Prototyping", "Design Systems"]
    },
    {
      icon: Zap,
      title: "AI Automation",
      description: "Intelligent solutions that streamline your business processes",
      features: ["ChatGPT Integration", "Automation Workflows", "AI Chatbots", "Data Analysis"]
    },
    {
      icon: Smartphone,
      title: "Digital Strategy",
      description: "Comprehensive digital transformation consulting",
      features: ["Brand Strategy", "Growth Hacking", "Analytics", "SEO Optimization"]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your business with our comprehensive digital solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-8 group hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center">
                    <service.icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">
                    {service.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-10 md:p-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="gradient-text">Get Started?</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Let's discuss how we can transform your digital presence
            </p>
            <a
              href="/contact"
              className="btn-primary-glow px-8 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2"
            >
              Get Your Free Consultation
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Services;
