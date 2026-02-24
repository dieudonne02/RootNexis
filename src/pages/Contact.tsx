import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "rootnexis@gmail.com",
      href: "mailto:rootnexis@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+250 725 064 686",
      href: "tel:+250725064686"
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+250 725 064 686",
      href: "https://wa.me/+250725064686"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kigali, Rwanda",
      href: "#"
    }
  ];

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    console.log('Sending email with EmailJS...');
    console.log('📝 Form data:', form.current);

    emailjs
      .sendForm('service_lvzrugh', 'template_lgad2kd', form.current, {
        publicKey: '9LwC091dQYohtNpa8',
      })
      .then(
        (result) => {
          console.log('✅ EmailJS SUCCESS!', result.text);
          setSubmitStatus("success");
          setIsSubmitting(false);
          // Reset form
          if (form.current) {
            (form.current as HTMLFormElement).reset();
          }
          // Reset success message after 5 seconds
          setTimeout(() => setSubmitStatus("idle"), 5000);
        },
        (error) => {
          console.error('❌ EmailJS ERROR:', error);
          setSubmitStatus("error");
          setIsSubmitting(false);
          // Reset error message after 5 seconds
          setTimeout(() => setSubmitStatus("idle"), 5000);
        },
      );
  };

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
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Let's discuss how we can bring your digital vision to life
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8"
            >
              <h2 className="font-display text-2xl font-bold mb-6">
                Send us a <span className="gradient-text">Message</span>
              </h2>
              
              {/* Success/Error Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center gap-3"
                >
                  <CheckCircle size={20} className="text-green-500" />
                  <span className="text-green-500 font-medium">
                    Message sent successfully! We'll get back to you soon.
                  </span>
                </motion.div>
              )}
              
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30"
                >
                  <div className="space-y-2">
                    <span className="text-red-500 font-medium">
                      Failed to send message through form.
                    </span>
                    <div className="flex flex-col sm:flex-row gap-2 text-sm">
                      <span className="text-red-500">
                        Contact us directly:
                      </span>
                      <div className="flex gap-2 flex-wrap">
                        <a 
                          href="mailto:rootnexis@gmail.com" 
                          className="text-red-500 font-semibold underline hover:text-red-400 transition-colors"
                        >
                          Email
                        </a>
                        <span className="text-red-500">or</span>
                        <a 
                          href="https://wa.me/+250725064686" 
                          className="text-red-500 font-semibold underline hover:text-red-400 transition-colors"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="user_lastname"
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Project Inquiry"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Project Details
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary-glow px-6 py-3 rounded-xl text-base font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
                
                {/* Fallback Email Button */}
                <div className="text-center">
                  <span className="text-muted-foreground text-sm">or</span>
                  <a
                    href="mailto:rootnexis@gmail.com?subject=Project Inquiry from RootNexis Website&body=Hi RootNexis team,%0D%0A%0D%0AI'd like to discuss a project with you.%0D%0A%0D%0ABest regards,%0D%0A[Your Name]"
                    className="block mt-2 text-primary font-medium text-sm hover:underline transition-colors"
                  >
                    Email us directly at rootnexis@gmail.com
                  </a>
                </div>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="glass-card rounded-2xl p-8">
                <h2 className="font-display text-2xl font-bold mb-6">
                  Contact <span className="gradient-text">Info</span>
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center">
                        <item.icon size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{item.label}</div>
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {item.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8">
                <h2 className="font-display text-2xl font-bold mb-6">
                  Business <span className="gradient-text">Hours</span>
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Contact;
