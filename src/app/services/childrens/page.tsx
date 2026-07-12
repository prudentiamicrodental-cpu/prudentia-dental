"use client"
import React, { useState, useEffect } from 'react';
import { Heart, Shield, Smile, Star, Phone, Mail, MapPin, Baby } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChatbot } from '@/components/chatbotContext';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown';
import Head from 'next/head';

interface PediatricData {
  meta: { title: string, description: string};
  hero: { titleLine1: string; titleLine2: string; description: string };
  introImage: { image: string; caption: string };
  procedures: {
    title: string;
    intro: string;
    items: { number: string; title: string; content: string; icon: string; iconColor: string; color: string }[];
  };
  safeHands: {
    title: string;
    description: string;
    features: { icon: string; title: string; description: string }[];
  };
  contact: {
    title: string;
    description: string;
    cards: { icon: string; title: string; description: string }[];
    button: string;
  };
}

const iconMap: { [key: string]: React.ElementType } = { Shield, Smile, Heart, Star, Phone, Mail, MapPin };

const PediatricDentistryPage = () => {
     const { handleOpenChatbot } = useChatbot();
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [content, setContent] = useState<PediatricData | null>(null);

 useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/childrens/pediatric-dentistry.json";

      const LOCAL_URL = "/data/service/childrens/pediatric-dentistry.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: PediatricData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: PediatricData = await localRes.json();
          setContent(localData);
        } catch (localError) {
          console.error("Failed to load local fallback:", localError);
        }
      }
    }

    loadData();
  }, []);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [content]);

  const fadeInUp = (id: string) => ({
    opacity: isVisible[id] ? 1 : 0,
    transform: isVisible[id] ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease'
  });

  const slideInLeft = (id: string) => ({
    opacity: isVisible[id] ? 1 : 0,
    transform: isVisible[id] ? 'translateX(0)' : 'translateX(-50px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease'
  });

  const slideInRight = (id: string) => ({
    opacity: isVisible[id] ? 1 : 0,
    transform: isVisible[id] ? 'translateX(0)' : 'translateX(50px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease'
  });

  if (!content) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const procedures = content.procedures.items;

  return (
    
    <div className="min-h-screen bg-gradient-to-br overflow-hidden from-pink-50 via-blue-50 to-purple-50">
        <Head>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
      </Head>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div 
            className="text-center max-w-4xl mx-auto"
            id="hero"
            data-animate
            style={fadeInUp('hero')}
          >
            <div className="flex justify-center mb-8">
              <div className="bg-white bg-opacity-20 p-4 rounded-full">
                <Baby className="w-16 h-16 text-black" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              <Markdown inline>{content.hero.titleLine1}</Markdown><br />
              <span className="text-yellow-300"><Markdown inline>{content.hero.titleLine2}</Markdown></span>
            </h1>
            <p className="text-lg lg:text-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              <Markdown inline>{content.hero.description}</Markdown>
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Introduction Image Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div 
            className="max-w-4xl mx-auto text-center"
            id="intro-image"
            data-animate
            style={fadeInUp('intro-image')}
          >
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
         
                <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                          <Image
                           urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={content.introImage.image}
                            alt="Modern denture solutions"
                            fill
                            className="object-contain"
                            priority
                          />
                        </div>
              <div className="p-6 bg-gradient-to-r from-pink-100 to-blue-100">
                <p className="text-lg text-gray-700 font-medium">
                  <Markdown inline>{content.introImage.caption}</Markdown>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Procedures Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div 
              className="text-center mb-16"
              id="procedures-title"
              data-animate
              style={fadeInUp('procedures-title')}
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6">
                <Markdown inline>{content.procedures.title}</Markdown>
              </h2>
              <p className="text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                <Markdown inline>{content.procedures.intro}</Markdown>
              </p>
            </div>

            <div className="space-y-8">
              {procedures.map((procedure, index) => {
                const Icon = iconMap[procedure.icon];
                return (
                  <div 
                    key={procedure.number}
                    className={`bg-white rounded-2xl shadow-lg border-2 ${procedure.color} hover:shadow-xl transition-all duration-300 overflow-hidden`}
                    id={`procedure-${index}`}
                    data-animate
                    style={index % 2 === 0 ? slideInLeft(`procedure-${index}`) : slideInRight(`procedure-${index}`)}
                  >
                    <div className="lg:flex">
                      <div className="lg:w-1/4 p-8 flex flex-col items-center justify-center text-center bg-gradient-to-br from-white to-gray-50">
                        <div className="bg-white rounded-full p-4 shadow-lg mb-4">
                          <Icon className={`w-8 h-8 ${procedure.iconColor}`} />
                        </div>
                        <div className="text-4xl font-bold text-gray-800 mb-2">
                          {procedure.number}
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                          <Markdown inline>{procedure.title}</Markdown>
                        </h3>
                      </div>
                      <div className="lg:w-3/4 p-8">
                        <p className="text-lg text-gray-700 leading-relaxed">
                          <Markdown inline>{procedure.content}</Markdown>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Safe Hands Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              id="safe-hands"
              data-animate
              style={fadeInUp('safe-hands')}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border-4 border-gradient-to-r from-pink-200 to-blue-200">
                <div className="flex justify-center mb-8">
                  <div className="bg-gradient-to-r from-pink-400 to-blue-500 p-6 rounded-full">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
                  <Markdown inline>{content.safeHands.title}</Markdown>
                </h2>
                <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8">
                  <Markdown inline>{content.safeHands.description}</Markdown>
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {content.safeHands.features.map((feature, index) => {
                    const Icon = iconMap[feature.icon];
                    const bgColors = ["bg-pink-50 border-pink-200", "bg-blue-50 border-blue-200", "bg-purple-50 border-purple-200"];
                    const iconColors = ["text-pink-600", "text-blue-600", "text-purple-600"];
                    return (
                      <div key={index} className={`${bgColors[index % 3]} p-6 rounded-xl border-2`}>
                        <Icon className={`w-10 h-10 ${iconColors[index % 3]} mx-auto mb-3`} />
                        <h4 className="font-semibold text-gray-800 mb-2">
                          <Markdown inline>{feature.title}</Markdown>
                        </h4>
                        <p className="text-sm text-gray-600">
                          <Markdown inline>{feature.description}</Markdown>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div 
            className="max-w-4xl mx-auto text-center"
            id="contact"
            data-animate
            style={fadeInUp('contact')}
          >
            <div className="bg-white text-black bg-opacity-10 rounded-2xl p-8 lg:p-12 backdrop-blur-sm">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                <Markdown inline>{content.contact.title}</Markdown>
              </h2>
              <p className="text-lg lg:text-xl mb-8 opacity-90 leading-relaxed">
                <Markdown inline>{content.contact.description}</Markdown>
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {content.contact.cards.map((card, index) => {
                  const Icon = iconMap[card.icon];
                  return (
                    <div key={index} className="bg-white bg-opacity-20 p-6 rounded-xl backdrop-blur-sm hover:bg-opacity-30 transition-all duration-300">
                      <Icon className="w-10 h-10 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold mb-2">
                        <Markdown inline>{card.title}</Markdown>
                      </h4>
                      <p className="opacity-90">
                        <Markdown inline>{card.description}</Markdown>
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#800080", color: " #ffff" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenChatbot}
              transition={{ duration: 0.2 }}
              className="bg-transparent border-2 border-black text-black font-bold px-8 py-4 rounded-lg text-lg hover:bg-white hover:text-purple-900 transition duration-300"
            >
              {content.contact.button}
            </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PediatricDentistryPage;