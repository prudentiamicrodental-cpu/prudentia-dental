'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatbot } from '@/components/chatbotContext';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown';
import { ChevronDown } from 'lucide-react';

interface Insert {
  id: number;
  title: string;
  content: string;
  bullets: string[];
  image: string;
  icon: string;
}

interface Benefit {
  title: string;
  description: string;
  icon: string;
}

interface RootProceduresData {
  meta: { title: string; description: string };
  hero: { title: string; subtitle: string };
  inserts: Insert[];
  benefitsTitle: string;
  benefits: Benefit[];
  testimonials: {
    title: string;
    items: { quote: string }[];
  };
  faq :{
    title: string;
    items: { question: string; answer: string }[];
  };
  cta: { titleMain: string; titleHighlight: string; paragraph: string; button: string };
  clinic: { name: string; location: string; paragraph: string };
}

const RegenerativeTherapy = () => {
  const { handleOpenChatbot } = useChatbot();
  const [activeInsert, setActiveInsert] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [content, setContent] = useState<RootProceduresData | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/root/rootprocedures.json";

      const LOCAL_URL = "/data/service/root/rootprocedures.json";
      setIsMounted(true);

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: RootProceduresData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: RootProceduresData = await localRes.json();
          setContent(localData);
        } catch (localError) {
          console.error("Failed to load local fallback:", localError);
        }
      }
    }

    loadData();
  }, []);

  const inserts = content?.inserts ?? [];

  useEffect(() => {
    if (inserts.length === 0) return;
    const interval = setInterval(() => {
      setActiveInsert(prev => (prev % inserts.length) + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, [inserts.length]);

  if (!content) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const benefits = content.benefits;

  return (
    <div className={`min-h-screen bg-gradient-to-b from-purple-50 to-white transition-colors duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
   <Head>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
      </Head>

    

      <main className="container overflow-hidden mx-auto  px-6 py-12">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-20"
        >
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-5xl my-15 font-bold text-purple-900 mb-4"
          >
            <Markdown inline>{content.hero.title}</Markdown>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-purple-700 mb-6"
          >
            <Markdown inline>{content.hero.subtitle}</Markdown>
          </motion.p>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="w-24 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto"
          />
        </motion.section>

        {/* Content Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {inserts.map(insert => (
                insert.id === activeInsert && (
                  <motion.div
                    key={insert.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center"
                  >
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-9xl"
                    >
                              <Image
                               urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                          src={insert.image}
                           alt="Modern denture solutions"
                           fill
                          className="object-contain"
                          priority
                        />  
                    </motion.div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex justify-center space-x-2">
                {inserts.map(insert => (
                  <motion.button
                    key={insert.id}
                    whileHover={{ scale: 1.2 }}
                    className={`w-3 h-3 rounded-full transition-all ${activeInsert === insert.id ? 'bg-white scale-125' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <AnimatePresence mode="wait">
              {inserts.map(insert => (
                insert.id === activeInsert && (
                  <motion.div
                    key={insert.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.h2 
                      initial={{ y: 10 }}
                      animate={{ y: 0 }}
                      className="text-2xl md:text-3xl font-bold text-purple-900 mb-4"
                    >
                      <Markdown inline>{insert.title}</Markdown>
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-gray-700 mb-6"
                    >
                      <Markdown inline>{insert.content}</Markdown>
                    </motion.p>
                    <motion.ul className="space-y-3 mb-6">
                      {insert.bullets.map((bullet, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          className="flex items-start"
                        >
                          <span className="text-purple-600 mr-2">•</span>
                          <span><Markdown inline>{bullet}</Markdown></span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center text-purple-900 mb-12"
          >
            <Markdown inline>{content.benefitsTitle}</Markdown>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-purple-800">
                  <Markdown inline>{benefit.title}</Markdown>
                </h3>
                <p className="text-gray-700">
                  <Markdown inline>{benefit.description}</Markdown>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
         {/* Testimonials */}
                                      <section className="mb-32">
                                        <div className="text-center mb-16" >
                                          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                                            <Markdown inline>{content.testimonials.title}</Markdown>
                                          </h2>
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-8">
                                          {content.testimonials.items.map((item, index) => (
                                            <div
                                              key={index}
                                              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                                              
                                            >
                                              <div className="text-amber-400 text-lg mb-4">★★★★★</div>
                                              <p className="text-gray-700 italic leading-relaxed">
                                                <Markdown inline>{item.quote}</Markdown>
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                      </section>
                              
                                      {/* FAQ */}
                                      <section className="mb-32">
                                        <div className="text-center mb-16" >
                                          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                                            <Markdown inline>{content.faq.title}</Markdown>
                                          </h2>
                                        </div>
                              
                                        <div className="max-w-4xl mx-auto space-y-4">
                                          {content.faq.items.map((item, index) => {
                                            const isOpen = openFaq === index;
                                            return (
                                              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                                <button
                                                  onClick={() => setOpenFaq(isOpen ? null : index)}
                                                  className="w-full flex justify-between items-center text-left px-8 py-6"
                                                >
                                                  <span className="text-lg font-semibold text-gray-800 pr-4">
                                                    <Markdown inline>{item.question}</Markdown>
                                                  </span>
                                                  <ChevronDown
                                                    className={`w-6 h-6 text-purple-700 flex-shrink-0 transition-transform duration-300 ${
                                                      isOpen ? "rotate-180" : ""
                                                    }`}
                                                  />
                                                </button>
                                                <AnimatePresence initial={false}>
                                                  {isOpen && (
                                                    <motion.div
                                                      initial={{ height: 0, opacity: 0 }}
                                                      animate={{ height: "auto", opacity: 1 }}
                                                      exit={{ height: 0, opacity: 0 }}
                                                      transition={{ duration: 0.3 }}
                                                      className="px-8 overflow-hidden"
                                                    >
                                                      <p className="text-gray-700 pb-6 leading-relaxed">
                                                        <Markdown inline>{item.answer}</Markdown>
                                                      </p>
                                                    </motion.div>
                                                  )}
                                                </AnimatePresence>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </section>
                

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-2xl mb-20"
        >
          <div className="absolute inset-0 bg-purple-900/90 z-0" />
          <div className="relative z-10 py-16 px-8 text-center">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              <Markdown inline>{content.cta.titleMain}</Markdown> <span className="text-purple-300"><Markdown inline>{content.cta.titleHighlight}</Markdown></span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto"
            >
              <Markdown inline>{content.cta.paragraph}</Markdown>
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenChatbot}
                className="bg-white text-purple-900 hover:bg-purple-50 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all"
              >
                {content.cta.button}
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* Clinic Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-purple-900 mb-2">
            <Markdown inline>{content.clinic.name}</Markdown>
          </h3>
          <p className="text-purple-700 mb-6">
            <Markdown inline>{content.clinic.location}</Markdown>
          </p>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent my-6" />
          <p className="text-gray-700 max-w-2xl mx-auto">
            <Markdown inline>{content.clinic.paragraph}</Markdown>
          </p>
        </motion.div>
      </main>

      
    </div>
  );
};

export default RegenerativeTherapy;