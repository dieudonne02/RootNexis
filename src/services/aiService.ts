interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface AIConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

class AIService {
  private config: AIConfig;

  constructor(config: AIConfig) {
    this.config = {
      model: "gpt-3.5-turbo",
      maxTokens: 1000,
      temperature: 0.7,
      ...config,
    };
  }

  async generateResponse(messages: ChatMessage[]): Promise<string> {
    if (!this.config.apiKey) {
      throw new Error("API key is required");
    }

    console.log("Making OpenRouter API call directly with messages:", messages);
    console.log("🔑 API Key:", this.config.apiKey.substring(0, 10) + "...");
    console.log("📝 Model:", this.config.model);

    try {
      // Call OpenRouter API directly
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.config.apiKey}`,
          "HTTP-Referer": "http://localhost:8080",
          "X-Title": "RootNexis Chatbot",
        },
        body: JSON.stringify({
          model: this.config.model,
          messages,
          max_tokens: this.config.maxTokens,
          temperature: this.config.temperature,
        }),
      });

      console.log("📡 OpenRouter API response status:", response.status);
      console.log("📋 Response headers:", Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const error = await response.json();
        console.error("❌ OpenRouter API error:", error);
        throw new Error(error.error?.message || error.error || "Failed to generate response");
      }

      const data = await response.json();
      console.log("✅ OpenRouter API success:", data);
      console.log("💬 Response content:", data.choices[0]?.message?.content);
      return data.choices[0].message.content;
    } catch (error) {
      console.error("🔥 AI Service Error:", error);
      console.error("🔥 Error stack:", error.stack);
      throw error;
    }
  }

  // Alternative: Use a free API or other service
  async generateResponseFree(messages: ChatMessage[]): Promise<string> {
    // This is a demo fallback that returns contextual responses
    // In production, you could integrate with other AI services like:
    // - Anthropic Claude
    // - Google Gemini
    // - Local LLM via Ollama
    // - Hugging Face models
    
    const lastUserMessage = messages.filter(m => m.role === "user").pop()?.content || "";
    
    // Simple keyword-based responses for demo
    const keywords = {
      "web development": "We specialize in modern web development using React, TypeScript, and cutting-edge frameworks. Our team builds scalable, performant applications tailored to your needs.",
      "design": "Our design team creates stunning UI/UX experiences that are both beautiful and functional. We follow the latest design trends and best practices.",
      "price": "Our pricing is project-based and varies depending on scope and complexity. We offer competitive rates and flexible payment options. Contact us for a custom quote!",
      "contact": "You can reach us through the contact form on this website, or email us directly at hello@pixelperfectstudio.com. We typically respond within 24 hours.",
      "portfolio": "Check out our portfolio section to see examples of our work. We've helped businesses across various industries achieve their digital goals.",
      "ai": "We offer AI automation services including chatbots, data analysis, machine learning models, and intelligent workflow automation to streamline your business processes.",
    };

    for (const [keyword, response] of Object.entries(keywords)) {
      if (lastUserMessage.toLowerCase().includes(keyword)) {
        return response;
      }
    }

    // Default responses
    const defaultResponses = [
      "Thank you for your message! Our team would be happy to help with your project. We specialize in creating amazing digital experiences.",
      "That's interesting! We'd love to learn more about your requirements. Feel free to share more details about what you're looking for.",
      "Great question! We offer comprehensive digital solutions including web development, design, and AI automation. What specific service interests you most?",
      "We appreciate you reaching out! Our team is experienced in delivering high-quality digital solutions. How can we assist you today?",
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  updateConfig(newConfig: Partial<AIConfig>) {
    this.config = { ...this.config, ...newConfig };
  }
}

export default AIService;
