import { motion } from "framer-motion";
import {
  Globe,
  Palette,
  Bot,
  Smartphone,
  Search,
  PenTool,
  Code2,
  Megaphone,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    desc: "High-performance websites built with modern frameworks. Fast, responsive, and scalable.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "User-centered design that converts. Wireframes, prototypes, and polished interfaces.",
  },
  {
    icon: PenTool,
    title: "Graphic Design",
    desc: "Stunning visuals from logos to marketing assets that make your brand unforgettable.",
  },
  {
    icon: Code2,
    title: "Branding",
    desc: "Complete brand identity systems — typography, colors, and guidelines that resonate.",
  },
  {
    icon: Bot,
    title: "AI Automation",
    desc: "Intelligent chatbots, workflow automation, and AI-powered features for your business.",
  },
  {
    icon: Smartphone,
    title: "App Development",
    desc: "Cross-platform mobile apps with native performance and beautiful user experience.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    desc: "Dominate search rankings with technical SEO, content strategy, and analytics.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    desc: "Data-driven campaigns that grow your audience and maximize your ROI.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const ServicesSection = () => (
  <section id="services" className="section-padding relative">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">
          What We Do
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
          Services That <span className="gradient-text">Deliver Results</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          From concept to launch, we provide end-to-end digital solutions
          tailored to your business goals.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {services.map((s) => (
          <motion.div
            key={s.title}
            variants={item}
            className="glass-card glow-border rounded-2xl p-6 group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <s.icon size={22} className="text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">
              {s.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ServicesSection;
