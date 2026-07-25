"use client";
import React, { useState, useEffect } from 'react';
import { Shield, Eye, Clock, Star, Calendar, Smile, ChevronDown } from 'lucide-react';
import { useChatbot } from '@/components/chatbotContext';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown';
import Head from 'next/head';
import { AnimatePresence, motion } from 'framer-motion';

interface InlayOnlayType {
  title: string;
  description: string;
  gradient: string;
}

interface WhyChooseFeature {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

interface Visit {
  step: string;
  title: string;
  description: string;
  gradient: string;
}

interface Result {
  icon: string;
  title: string;
  description: string;
}

interface InlaysOnlaysData {
  meta: { title: '', description: '' },
  hero: {
    title: string;
    highlightedText: string;
    tags: string[];
    image: string;
  };
  introduction: {
    text: string;
    highlightedText: string;
  };
  whatAreInlaysOnlays: {
    title: string;
    description: string;
    image: string;
    types: InlayOnlayType[];
    closingText: string;
  };
  whyChoose: {
    title: string;
    subtitle: string;
    image: string;
    features: WhyChooseFeature[];
  };
  whatToExpect: {
    title: string;
    subtitle: string;
    visits: Visit[];
    result: Result;
  };
  testimonials: {
    title: string;
    items: { quote: string }[];
  };
  faq :{
    title: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    title: string;
    image: string;
    description: string;
    callToAction: string;
    highlightedText: string;
    buttonText: string;
    buttonIcon: string;
  };
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Shield,
  Eye,
  Clock,
  Star,
  Calendar,
  Smile,
};

export default function InlaysOnlays() {
  const { handleOpenChatbot } = useChatbot();
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<InlaysOnlaysData | null>(null);
   const [openFaq, setOpenFaq] = useState<number | null>(0);

 useEffect(() => {
    async function loadData() {

      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/restorative/inlays-onlays.json";

      const LOCAL_URL = "/data/service/restorative/inlays-onlays.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: InlaysOnlaysData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: InlaysOnlaysData = await localRes.json();
          setContent(localData);
        } catch (localError) {
          console.error("Failed to load local fallback:", localError);
        }
      }
    }

    loadData();
  }, []);


  useEffect(() => {
    if (content) {
      setIsVisible(true);
    }
  }, [content]);

  if (!content) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  const fadeInUp = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(40px)',
    transition: 'all 0.8s ease-out'
  };

  const staggerDelay = (index: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(40px)',
    transition: `all 0.8s ease-out ${index * 0.15}s`
  });

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Head>
              <title>{content.meta.title}</title>
              <meta name="description" content={content.meta.description} />
        </Head>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div 
            className="text-center space-y-8"
            style={fadeInUp}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <Markdown inline>{content.hero.title.split(content.hero.highlightedText)[0]}</Markdown>
              <br />
              <span className="text-yellow-300"><Markdown inline>{content.hero.highlightedText}</Markdown></span>
            </h1>
            <div className="flex text-black flex-col sm:flex-row justify-center items-center gap-4 text-xl md:text-2xl font-medium">
              {content.hero.tags.map((tag, index) => (
                <React.Fragment key={index}>
                  <span className="bg-white bg-opacity-20 px-6 py-3 rounded-full backdrop-blur-sm">
                    <Markdown inline>{tag}</Markdown>
                  </span>
                  {index < content.hero.tags.length - 1 && (
                    <span className="hidden sm:block text-2xl">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="mt-12">
              <div className="bg-white bg-opacity-95 rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.hero.image}
                  alt="Inlays and onlays"
                  fill
                  className="object-contain"
                  priority
                />                
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Introduction */}
        <section className="mb-24">
          <div 
            className="text-center max-w-5xl mx-auto"
            style={staggerDelay(1)}
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                <Markdown inline>{content.introduction.text.split(content.introduction.highlightedText)[0]}</Markdown>
                <span className="font-semibold text-indigo-600"><Markdown inline>{content.introduction.highlightedText}</Markdown></span>
                <Markdown inline>{content.introduction.text.split(content.introduction.highlightedText)[1]}</Markdown>
              </p>
            </div>
          </div>
        </section>

        {/* What Are Inlays and Onlays */}
        <section className="mb-24">
          <div 
            className="text-center mb-16"
            style={staggerDelay(2)}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              <Markdown inline>{content.whatAreInlaysOnlays.title}</Markdown>
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              <Markdown inline>{content.whatAreInlaysOnlays.description}</Markdown>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div 
              className="space-y-8"
              style={staggerDelay(3)}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.whatAreInlaysOnlays.image}
                  alt="Inlays and onlays comparison"
                  fill
                  className="object-contain"
                />                 
              </div>
            </div>
            
            <div 
              className="space-y-8"
              style={staggerDelay(4)}
            >
              {content.whatAreInlaysOnlays.types.map((type, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br ${type.gradient} text-white rounded-2xl p-8 transform hover:scale-105 transition-all duration-300`}
                >
                  <h3 className="text-2xl font-bold mb-4">
                    <Markdown inline>{type.title}</Markdown>
                  </h3>
                  <p className="text-lg opacity-95">
                    <Markdown inline>{type.description}</Markdown>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div 
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
            style={staggerDelay(5)}
          >
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
              <Markdown inline>{content.whatAreInlaysOnlays.closingText}</Markdown>
            </p>
          </div>
        </section>

        {/* Why Choose Inlays and Onlays */}
        <section className="mb-24">
          <div 
            className="text-center mb-16"
            style={staggerDelay(6)}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              <Markdown inline>{content.whyChoose.title}</Markdown>
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              <Markdown inline>{content.whyChoose.subtitle}</Markdown>
            </p>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl inline-block mb-12 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.whyChoose.image}
                alt="Why choose inlays and onlays"
                fill
                className="object-contain"
              />               
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {content.whyChoose.features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon];
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                  style={staggerDelay(7 + index)}
                >
                  <div className={`bg-gradient-to-r ${feature.gradient} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                    {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    <Markdown inline>{feature.title}</Markdown>
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <Markdown inline>{feature.description}</Markdown>
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* What to Expect */}
        <section className="mb-24">
          <div 
            className="text-center mb-16"
            style={staggerDelay(11)}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              <Markdown inline>{content.whatToExpect.title}</Markdown>
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              <Markdown inline>{content.whatToExpect.subtitle}</Markdown>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div 
              className="space-y-8"
              style={staggerDelay(12)}
            >
              {content.whatToExpect.visits.map((visit, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br ${visit.gradient} text-white rounded-3xl p-8 transform hover:scale-105 transition-all duration-300`}
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-white text-indigo-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4">
                      {visit.step}
                    </div>
                    <h3 className="text-2xl font-bold">
                      <Markdown inline>{visit.title}</Markdown>
                    </h3>
                  </div>
                  <p className="text-lg opacity-95 leading-relaxed">
                    <Markdown inline>{visit.description}</Markdown>
                  </p>
                </div>
              ))}
            </div>

            <div 
              className="flex items-center justify-center"
              style={staggerDelay(13)}
            >
              <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6 mb-6">
                  {iconMap[content.whatToExpect.result.icon] && 
                    React.createElement(iconMap[content.whatToExpect.result.icon], { className: "w-16 h-16 mx-auto mb-4" })
                  }
                  <h3 className="text-xl font-bold">
                    <Markdown inline>{content.whatToExpect.result.title}</Markdown>
                  </h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  <Markdown inline>{content.whatToExpect.result.description}</Markdown>
                </p>
              </div>
            </div>
          </div>
        </section>
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
        <section className="text-center">
          <div 
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 md:p-16 text-white shadow-2xl"
            style={staggerDelay(14)}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <Markdown inline>{content.cta.title}</Markdown>
            </h2>
            
            <div className="bg-white bg-opacity-10 rounded-2xl p-6 mb-8 backdrop-blur-sm relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.cta.image}
                alt="Before after dental onlay"
                fill
                className="object-contain"
              />               
            </div>
            
            <p className="text-lg md:text-xl leading-relaxed mb-8 opacity-95 max-w-4xl mx-auto">
              <Markdown inline>{content.cta.description}</Markdown>
            </p>
            
            <p className="text-lg leading-relaxed mb-10 opacity-90 max-w-4xl mx-auto">
              <Markdown inline>{content.cta.callToAction.split(content.cta.highlightedText)[0]}</Markdown>
              <span className="font-semibold"><Markdown inline>{content.cta.highlightedText}</Markdown></span>
              <Markdown inline>{content.cta.callToAction.split(content.cta.highlightedText)[1]}</Markdown>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={handleOpenChatbot} 
                className="bg-purple-400 text-indigo-900 px-10 py-4 rounded-full text-lg font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Calendar className="w-6 h-6" />
                {content.cta.buttonText}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}