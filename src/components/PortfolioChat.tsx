"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Code2, Terminal, Copy, Check, Briefcase, User, Sparkles, Cpu } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function PortfolioChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- REFINED LOADING STATUS ---
  const [loadingStatus, setLoadingStatus] = useState("DALBOT IS THINKING");
  
  useEffect(() => {
    if (isLoading) {
      const statuses = [
        "DALBOT IS THINKING",
        "RECALLING PROJECTS",
        "GENERATING RESPONSE"
      ];
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setLoadingStatus(statuses[i % statuses.length]);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // --- TOOLTIP TIMING ---
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 2000);
    const hideTimer = setTimeout(() => setShowHint(false), 10000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const SUGGESTED_PROMPTS = [
    { 
      label: "About Me", 
      icon: <User size={12} />, 
      text: "Tell me about your journey and how you balance UI/UX design with blockchain development." 
    },
    { 
      label: "Sui Projects", 
      icon: <Code2 size={12} />, 
      text: "Tell me about your work on Sui, specifically The Vault and Orbital Foundry. How did you design their UX?" 
    },
    { 
      label: "Contacts",
      icon: <Sparkles size={12} />, 
      text: "Tell me about your contact details"
    },
    { 
      label: "Availability", 
      icon: <Briefcase size={12} />, 
      text: "Are you currently open to new job opportunities, internships, or collaboration?" 
    },
  ];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ 
        role: "model", 
        text: "System Online. I am **DalBot**, the Digital Twin of Dalrymple Ramos.\n\nI build at the intersection of **Sui Move** logic and **High-Fidelity UI/UX**. Ask me about **Beats Music**, **The Vault**, or my design philosophy!" 
      }]);
    }
    if (isOpen) setShowHint(false);
  }, [isOpen, messages.length]);

  const copyLinkedIn = () => {
    navigator.clipboard.writeText("https://www.linkedin.com/in/dalrymple-ramos/");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = async (forcedText?: string) => {
    const textToSend = forcedText || input;
    if (!textToSend.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: "user", text: textToSend }]);
    setInput("");
    setIsLoading(true);

    try {
      const historyApi = messages.filter((msg, i) => !(i === 0 && msg.role === "model"));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history: historyApi }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Brain synchronization failed.");
      setMessages(prev => [...prev, { role: "model", text: data.text }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { 
        role: "model", 
        text: "Brief synchronization delay. Connect with me on [LinkedIn](https://www.linkedin.com/in/dalrymple-ramos/) while I recalibrate!" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* --- GREETING TOOLTIP --- */}
      <AnimatePresence>
        {showHint && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="absolute right-20 bottom-2 whitespace-nowrap bg-zinc-900 border border-zinc-800 text-zinc-400 text-[11px] px-4 py-2 rounded-xl shadow-2xl pointer-events-none font-mono tracking-wider uppercase flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            IF YOU HAVE QUESTIONS: <span className="text-white">ASK DALBOT</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: [1, 1.4, 1.6], opacity: [0.5, 0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-white/20 z-[-1]"
            />
          )}
        </AnimatePresence>

        <motion.button 
          whileTap={{ scale: 0.95 }} 
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsOpen(!isOpen)} 
          className={`relative z-10 p-4 rounded-full shadow-2xl border transition-all duration-300 ${
            isOpen 
            ? "bg-zinc-900 border-zinc-800 text-white" 
            : "bg-zinc-900 border-zinc-700 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          }`}
        >
          {isOpen ? <X size={24} /> : <Terminal size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 20 }} 
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[580px] bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-zinc-900/50 backdrop-blur-md text-white flex justify-between items-center border-b border-zinc-800">
              <span className="flex items-center gap-2 font-mono text-xs tracking-tighter uppercase font-bold">
                <Bot size={16} className="text-white animate-pulse"/> 
                <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent italic">
                  DalBot v1.1.1
                </span>
              </span>
              <button 
                onClick={copyLinkedIn} 
                className="text-[10px] bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded-full border border-zinc-700 transition-all flex items-center gap-1.5"
              >
                {copied ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} />}
                {copied ? "COPIED" : "LINKEDIN"}
              </button>
            </div>
            
            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`p-3 rounded-2xl text-[13px] leading-relaxed shadow-sm transition-all ${
                    msg.role === 'user' 
                    ? 'bg-zinc-100 text-zinc-900 font-medium ml-8' 
                    : 'bg-zinc-900 text-zinc-100 border border-zinc-800 mr-8'
                  }`}>
                    <div className="prose prose-invert prose-sm max-w-none prose-p:mb-2 prose-strong:font-bold">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Suggested Prompts - Stays visible after welcome message */}
              {messages.length === 1 && !isLoading && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => handleSend(prompt.text)} 
                      className="p-3 text-[10px] bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white hover:border-zinc-500 transition-all text-left flex flex-col gap-2"
                    >
                      {prompt.icon} <span className="font-medium text-zinc-300">{prompt.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Enhanced Thinking Indicator - Refined Statuses */}
              {isLoading && (
                <div className="flex flex-col gap-2 ml-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-zinc-900 rounded-lg border border-zinc-800">
                      <Cpu size={14} className="text-zinc-400 animate-spin [animation-duration:3s]" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] uppercase animate-pulse">
                      {loadingStatus}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 ml-10">
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-white rounded-full" />
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-white rounded-full" />
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-white rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 backdrop-blur-md flex gap-2">
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                placeholder="Message DalBot..." 
                className="flex-1 bg-zinc-950 text-white text-sm px-4 py-2 rounded-full outline-none border border-zinc-800 focus:border-zinc-500 transition-all placeholder:text-zinc-700" 
              />
              <button 
                onClick={() => handleSend()} 
                className="p-2.5 bg-white text-black rounded-full hover:bg-zinc-200 transition-all shadow-lg active:scale-90" 
                disabled={isLoading}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );    
}