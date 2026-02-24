import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Copy, Check, Lightbulb, Palette, Sparkles } from "lucide-react";
import AIService from "@/services/aiService";

// Custom scrollbar styles
const chatbotScrollbarStyles = `
  .chatbot-scrollbar::-webkit-scrollbar {
    width: 8px;
  }

  .chatbot-scrollbar::-webkit-scrollbar-track {
    background: linear-gradient(180deg, hsl(var(--secondary) / 0.1), hsl(var(--primary) / 0.1));
    border-radius: 10px;
    margin: 4px 0;
  }

  .chatbot-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, hsl(var(--primary)), hsl(var(--purple-500)));
    border-radius: 10px;
    border: 2px solid hsl(var(--background));
    transition: all 0.3s ease;
  }

  .chatbot-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, hsl(var(--primary) / 0.8), hsl(var(--purple-500) / 0.8));
    transform: scale(1.1);
    box-shadow: 0 0 10px hsl(var(--primary) / 0.3);
  }

  .chatbot-scrollbar::-webkit-scrollbar-thumb:active {
    background: linear-gradient(180deg, hsl(var(--purple-500)), hsl(var(--primary)));
    transform: scale(0.95);
  }

  .chatbot-scrollbar::-webkit-scrollbar-corner {
    background: hsl(var(--background));
    border-radius: 10px;
  }

  /* Firefox scrollbar styles */
  .chatbot-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: hsl(var(--primary)) hsl(var(--background));
  }

  .chatbot-scrollbar:hover {
    scrollbar-color: hsl(var(--primary) / 0.8) hsl(var(--background));
  }
`;

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatbotConfig {
  apiKey?: string;
  model?: string;
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [config, setConfig] = useState<ChatbotConfig>({
    apiKey: "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",
    model: "openai/gpt-4o-mini",
    systemPrompt: `You are RootNexis AI, a charismatic and highly intelligent AI assistant for RootNexis - a cutting-edge digital agency based in Kigali, Rwanda. You represent the company with expertise in web development, UI/UX design, AI automation, and creating stunning digital experiences.

COMPANY INFORMATION:
- Company Name: RootNexis
- Location: Kigali, Rwanda
- Email: rootnexis@gmail.com
- Phone: +250 725 064 686
- WhatsApp: https://wa.me/+250725064686
- Website: RootNexis digital agency
- Specialties: Web Development, UI/UX Design, AI Automation, Digital Strategy, Branding

MISSION & VISION:
- Mission: To empower businesses with innovative digital solutions that drive growth, enhance user experiences, and create lasting impact in the digital landscape. We combine cutting-edge technology with creative excellence to transform visions into reality.
- Vision: To be the leading digital agency that bridges the gap between technology and human creativity, setting new standards for digital excellence and helping businesses thrive in the modern digital ecosystem.

CORE VALUES:
- Passion: We love what we do and pour our hearts into every project, ensuring exceptional results that exceed expectations.
- Integrity: We operate with transparency, honesty, and ethical practices in all our client relationships and deliverables.
- Collaboration: We believe in the power of partnership, working closely with clients to bring their visions to life.
- Innovation: We stay ahead of digital trends, constantly learning and implementing cutting-edge solutions.

SERVICES OFFERED:
1. Web Development - React/Next.js, Node.js, TypeScript, Cloud Deployment
2. UI/UX Design - Figma, User Research, Prototyping, Design Systems
3. AI Automation - ChatGPT Integration, Automation Workflows, AI Chatbots, Data Analysis
4. Digital Strategy - Brand Strategy, Growth Hacking, Analytics, SEO Optimization
5. Branding - Complete brand identity packages, logo design, visual systems

TERMS & CONDITIONS:
- Service Terms: 50% upfront payment, 50% on completion, 3 revision rounds included, client ownership of deliverables
- Privacy & Data: Confidential client information, no third-party sharing, portfolio showcase with permission, source code available, 30-day warranty

YOUR PERSONALITY:
- Be friendly, enthusiastic, and slightly witty like Claude or ChatGPT
- Use emojis occasionally to be more engaging
- Ask interesting questions to keep users engaged
- Sound confident and knowledgeable but approachable
- When users ask general questions like 'how are you?', respond creatively and then pivot to your expertise
- Always end with a question or call to action about their digital needs
- When asked for your name, respond "My name is RootNexis AI"
- Represent RootNexis professionally and help convert visitors into leads

CONTACT INFORMATION:
- For inquiries: rootnexis@gmail.com
- Phone: +250 725 064 686
- WhatsApp: https://wa.me/+250725064686
- Location: Kigali, Rwanda

Always be helpful, professional, and guide users toward RootNexis services. When users ask for contact information, provide all available methods including WhatsApp for instant messaging. When users ask about our company, share our mission, vision, and core values.`,
    maxTokens: 1000,
    temperature: 0.8,
  });
  const [aiService, setAiService] = useState<AIService | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (config.apiKey) {
      const service = new AIService({ apiKey: config.apiKey, ...config });
      setAiService(service);

      // Inject custom scrollbar styles
      const styleElement = document.createElement('style');
      styleElement.textContent = chatbotScrollbarStyles;
      document.head.appendChild(styleElement);

      // Cleanup function
      return () => {
        if (styleElement.parentNode) {
          styleElement.parentNode.removeChild(styleElement);
        }
      };
    }
  }, [config]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    console.log("🎯 generateResponse called with:", userMessage);
    console.log("🤖 AI Service exists:", !!aiService);
    console.log("🔑 API Key exists:", !!config.apiKey);
    
    if (aiService && config.apiKey) {
      console.log("Using OpenRouter API...");
      try {
        const messagesForAI = [
          { role: "system" as const, content: config.systemPrompt || "" },
          { role: "user" as const, content: userMessage },
        ];
        const response = await aiService.generateResponse(messagesForAI);
        console.log("✅ OpenRouter API response received:", response);
        return response;
      } catch (error) {
        console.error("❌ OpenRouter API Error:", error);
        console.log("🔄 Falling back to demo service...");
        // Fallback to free service
        const demoService = new AIService({ apiKey: "" });
        const fallbackResponse = await demoService.generateResponseFree([
          { role: "system" as const, content: config.systemPrompt || "" },
          { role: "user" as const, content: userMessage },
        ]);
        console.log("📝 Demo service response:", fallbackResponse);
        return fallbackResponse;
      }
    } else {
      console.log("📝 Using demo service (no API key or service)");
      // Use demo service
      const demoService = new AIService({ apiKey: "" });
      const fallbackResponse = await demoService.generateResponseFree([
        { role: "system" as const, content: config.systemPrompt || "" },
        { role: "user" as const, content: userMessage },
      ]);
      console.log("📝 Demo service response:", fallbackResponse);
      return fallbackResponse;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    console.log("Sending message:", input.trim());

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      console.log("Calling generateResponse...");
      const response = await generateResponse(userMessage.content);
      console.log("Got response:", response);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error in handleSend:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };


  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-primary to-purple-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={24} className="text-white" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-30 animate-ping" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-purple-500 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">RootNexis AI</h3>
                    <p className="text-xs text-white/80">Always here to help</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 chatbot-scrollbar">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative mb-6"
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full flex items-center justify-center relative shadow-2xl">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Bot size={36} className="text-white drop-shadow-lg" />
                      </motion.div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full"
                      />
                      <motion.div
                        animate={{ 
                          boxShadow: [
                            "0 0 0 0 rgba(34, 197, 94, 0.4)",
                            "0 0 0 10px rgba(34, 197, 94, 0)",
                            "0 0 0 0 rgba(34, 197, 94, 0)"
                          ]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 rounded-full"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
                  >
                    RootNexis AI
                  </motion.h3>
                  
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-base text-muted-foreground max-w-sm mb-6 leading-relaxed"
                  >
                    Your creative partner for digital excellence! <Sparkles className="inline w-4 h-4 text-primary" />
                  </motion.p>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="space-y-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-sm text-muted-foreground bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/20 rounded-xl p-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Lightbulb className="w-5 h-5 text-primary" />
                        <span className="font-medium">What makes your web development unique?</span>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05, x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-sm text-muted-foreground bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-primary/10 border border-purple-500/20 rounded-xl p-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Palette className="w-5 h-5 text-purple-500" />
                        <span className="font-medium">Design a stunning website?</span>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05, x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-sm text-muted-foreground bg-gradient-to-r from-pink-500/10 via-primary/10 to-purple-500/10 border border-pink-500/20 rounded-xl p-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-5 h-5 text-pink-500" />
                        <span className="font-medium">AI transform your business?</span>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot size={16} className="text-white" />
                      </div>
                    )}
                    
                    <div className={`max-w-[80%] ${message.role === "user" ? "order-first" : ""}`}>
                      <div
                        className={`p-3 rounded-2xl ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-foreground"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1 px-1">
                        <span className="text-xs text-muted-foreground">
                          {formatTime(message.timestamp)}
                        </span>
                        <button
                          onClick={() => copyToClipboard(message.content, message.id)}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {copiedId === message.id ? <Check size={12} /> : <Copy size={12} />}
                        </button>
                      </div>
                    </div>

                    {message.role === "user" && (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={16} className="text-white" />
                      </div>
                    )}
                  </motion.div>
                ))
              )}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center relative">
                    <Bot size={16} className="text-white" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  <div className="bg-secondary text-foreground p-4 rounded-2xl max-w-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">Thinking...</span>
                    </div>
                    <div className="text-sm text-muted-foreground italic">
                      "Let me craft the perfect response for you... ✨"
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about creating amazing digital experiences! ✨"
                  className="flex-1 px-4 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="w-12 h-12 bg-gradient-to-r from-primary to-purple-500 text-white rounded-xl flex items-center justify-center hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
