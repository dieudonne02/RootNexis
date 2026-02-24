import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "CEO, TechNova",
      text: "RootNexis completely transformed our online presence. The website they built increased our conversion rate by 340% in just three months.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "James Rodriguez",
      role: "Founder, GreenLeaf",
      text: "Their AI chatbot integration saved us 20+ hours per week in customer support. The quality of work is truly world-class.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Emily Chen",
      role: "CMO, StyleHub",
      text: "The branding package they delivered was beyond our expectations. Clean, modern, and perfectly aligned with our vision.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Michael Brown",
      role: "CTO, DataFlow",
      text: "Outstanding development work! They delivered our complex SaaS platform on time and exceeded all our expectations.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Lisa Anderson",
      role: "Marketing Director, CloudNine",
      text: "The UI/UX design they created for our app is incredible. User engagement has never been higher!",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5a9?w=80&h=80&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Product Manager, InnovateCo",
      text: "Professional, creative, and reliable. RootNexis delivered everything they promised and more.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      rating: 5
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
              Client <span className="gradient-text">Testimonials</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear what our clients have to say about working with RootNexis
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-7 relative"
              >
                <Quote size={32} className="text-primary/20 absolute top-6 right-6" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-primary fill-primary" />
                  ))}
                </div>
                
                <p className="text-foreground/80 text-sm leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-display font-semibold text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
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
              Ready to Join Our <span className="gradient-text">Success Stories?</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Let's create something amazing together
            </p>
            <a
              href="/contact"
              className="btn-primary-glow px-8 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2"
            >
              Start Your Project
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Testimonials;
