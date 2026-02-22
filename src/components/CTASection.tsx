import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

const CTASection = () => (
  <section id="contact" className="section-padding relative">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
      >
        {/* Decorative glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Zap size={14} className="text-primary" />
            <span className="text-xs font-medium text-primary">
              Free Consultation
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Ready to Build Something{" "}
            <span className="gradient-text">Amazing?</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Let's discuss your project. We'll provide a free audit and roadmap
            to bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@rootnexis.com"
              className="btn-primary-glow px-8 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2 group"
            >
              Book a Call
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="mailto:hello@rootnexis.com"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              hello@rootnexis.com
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
