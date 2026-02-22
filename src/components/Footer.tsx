import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12 px-6 md:px-12">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <div className="md:col-span-2">
          <span className="font-display text-2xl font-bold gradient-text">
            RootNexis
          </span>
          <p className="text-sm text-muted-foreground mt-3 max-w-sm leading-relaxed">
            Premium digital solutions — web development, design, branding, and
            AI automation. Turning ideas into high-performing digital products.
          </p>
          <div className="flex gap-4 mt-5">
            {[Github, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm mb-4">Services</h4>
          <ul className="space-y-2">
            {["Web Development", "UI/UX Design", "AI Automation", "Branding"].map(
              (s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {s}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm mb-4">Company</h4>
          <ul className="space-y-2">
            {["About", "Portfolio", "Contact"].map((s) => (
              <li key={s}>
                <a
                  href={`#${s.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} RootNexis. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
