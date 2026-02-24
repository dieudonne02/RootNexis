import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Filter } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

const Portfolio = () => {
  const [active, setActive] = useState("All");
  
  const projects = [
    {
      title: "FinTech Dashboard",
      category: "Web",
      tech: "React · Node.js · D3",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      description: "Real-time financial analytics dashboard with advanced data visualization"
    },
    {
      title: "Fashion Brand Identity",
      category: "Branding",
      tech: "Illustrator · Figma",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      description: "Complete brand identity package for luxury fashion startup"
    },
    {
      title: "AI Customer Support",
      category: "AI",
      tech: "OpenAI · Python · React",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      description: "Intelligent customer service automation with 24/7 support"
    },
    {
      title: "E-Commerce Redesign",
      category: "Design",
      tech: "Figma · Tailwind · Next.js",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      description: "Modern e-commerce platform with enhanced user experience"
    },
    {
      title: "SaaS Landing Page",
      category: "Web",
      tech: "React · Framer Motion",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      description: "High-converting landing page for B2B SaaS product"
    },
    {
      title: "Restaurant Brand Kit",
      category: "Branding",
      tech: "Photoshop · Figma",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
      description: "Complete branding system for premium restaurant chain"
    }
  ];

  const filters = ["All", "Web", "Design", "Branding", "AI"];
  const filtered = active === "All" ? projects : projects.filter(p => p.category === active);

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
              Our <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our latest projects and success stories
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActive(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  active === filter
                    ? "btn-primary-glow"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <Filter size={14} />
                {filter}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <div className="relative overflow-hidden aspect-[3/2]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <ExternalLink size={18} className="text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-lg mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {project.tech}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Portfolio;
