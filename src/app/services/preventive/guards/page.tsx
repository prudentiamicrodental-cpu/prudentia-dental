'use client';

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Shield, Moon, Activity, Zap, ChevronDown } from "lucide-react";
import { useChatbot } from "@/components/chatbotContext";
import { Image } from "@imagekit/next";
import Markdown from '@/components/markdown';
import { AnimatePresence, motion } from "framer-motion";

interface MouthguardsData {
  meta: {
    title: string;
    description: string;
  };

  hero: {
    title: string;
    subtitle: string;
    image: string;
  };

  intro: {
    text: string;
  };

  symptoms: {
    title: string;
    image: string;
    items: string[];
  };

  nightGuard: {
    title: string;
    image: string;
    description: string;
    items: string[];
    footer: string;
  };

  sportGuard: {
    title: string;
    image: string;
    description: string;
    items: string[];
    footer: string;
  };

  benefits: {
    title: string;
    image: string;
    items: string[];
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
    description: string;
    button: string;
  };
}

type VisibilityState = {
  [key: string]: boolean;
};

export default function MouthguardsPage() {
  const { handleOpenChatbot } = useChatbot();

  const [content, setContent] = useState<MouthguardsData | null>(null);

  const [isVisible, setIsVisible] = useState<VisibilityState>({});
   const [openFaq, setOpenFaq] = useState<number | null>(0);

 useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/preventive/mouthguards.json";

      const LOCAL_URL = "/data/service/preventive/mouthguards.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: MouthguardsData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: MouthguardsData = await localRes.json();
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
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[id^="section-"]');

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [content]);

  const fadeInUp = (sectionId: string) => ({
    opacity: isVisible[sectionId] ? 1 : 0,
    transform: isVisible[sectionId]
      ? "translateY(0)"
      : "translateY(30px)",
    transition: "all 0.6s ease-out",
  });

  if (!content) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{content.meta.title}</title>

        <meta
          name="description"
          content={content.meta.description}
        />
      </Head>

      <div className="min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 to-gray-50">

        {/* Hero Section */}

        <div className="relative overflow-hidden bg-gradient-to-r from-purple-400 to-purple-800 text-white">

          <div className="absolute inset-0 bg-black opacity-10"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

            <div
              id="section-hero"
              className="text-center transform transition-all duration-1000"
              style={fadeInUp("section-hero")}
            >

              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                <Markdown inline>{content.hero.title}</Markdown>
              </h1>

              <p className="text-xl md:text-2xl mb-8 text-purple-100">
                <Markdown inline>{content.hero.subtitle}</Markdown>
              </p>

              <div className="max-w-4xl mx-auto mb-8">

                <div className="bg-white bg-opacity-20 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8 rounded-2xl p-8 backdrop-blur-sm border border-white border-opacity-30">

                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={content.hero.image}
                    alt={content.hero.title}
                    fill
                    className="object-contain"
                    priority
                  />

                </div>

              </div>

            </div>

          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white opacity-70" />
          </div>

        </div>
                {/* Main Content */}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Introduction */}

          <div
            id="section-intro"
            className="mb-16 transform transition-all duration-700 delay-200"
            style={fadeInUp("section-intro")}
          >

            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">

                <p className="text-lg md:text-xl mb-6">
                  <Markdown inline>{content.intro.text}</Markdown>
                </p>

              </div>

            </div>

          </div>

          {/* Symptoms */}

          <div
            id="section-symptoms"
            className="mb-16 transform transition-all duration-700 delay-300"
            style={fadeInUp("section-symptoms")}
          >

            <div className="bg-gradient-to-r from-purple-50 to-purple-50 rounded-3xl shadow-xl p-8 md:p-12 border border-purple-100">

              <div className="text-center mb-8">

                <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  <Markdown inline>{content.symptoms.title}</Markdown>
                </h2>

              </div>

              <div className="grid md:grid-cols-2 gap-8">

                <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">

                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={content.symptoms.image}
                    alt={content.symptoms.title}
                    fill
                    className="object-contain"
                    priority
                  />

                </div>

                <div>

                  <ul className="space-y-4 text-gray-700">

                    {content.symptoms.items.map((item, index) => (

                      <li
                        key={index}
                        className="flex items-start"
                      >

                        <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 mt-1">
                          •
                        </span>

                        <span className="text-lg">
                          <Markdown inline>{item}</Markdown>
                        </span>

                      </li>

                    ))}

                  </ul>

                </div>

              </div>

            </div>

          </div>
                    {/* Night Guards */}

          <div
            id="section-night-guards"
            className="mb-16 transform transition-all duration-700 delay-400"
            style={fadeInUp("section-night-guards")}
          >

            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">

              <div className="text-center mb-8">

                <Moon className="w-12 h-12 text-purple-600 mx-auto mb-4" />

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  <Markdown inline>{content.nightGuard.title}</Markdown>
                </h2>

              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">

                <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">

                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={content.nightGuard.image}
                    alt={content.nightGuard.title}
                    fill
                    className="object-contain"
                    priority
                  />

                </div>

                <div>

                  <p className="text-lg mb-6">
                    <Markdown inline>{content.nightGuard.description}</Markdown>
                  </p>

                  <ul className="space-y-3 text-gray-700">

                    {content.nightGuard.items.map((item, index) => (

                      <li
                        key={index}
                        className="flex items-start"
                      >

                        <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 mt-1">
                          •
                        </span>

                        <span className="text-lg">
                          <Markdown inline>{item}</Markdown>
                        </span>

                      </li>

                    ))}

                  </ul>

                  <p className="text-lg mt-6">
                    <Markdown inline>{content.nightGuard.footer}</Markdown>
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Sport Guards */}

          <div
            id="section-sport-guards"
            className="mb-16 transform transition-all duration-700 delay-500"
            style={fadeInUp("section-sport-guards")}
          >

            <div className="bg-gradient-to-r from-purple-50 to-purple-50 rounded-3xl shadow-xl p-8 md:p-12 border border-purple-100">

              <div className="text-center mb-8">

                <Activity className="w-12 h-12 text-purple-600 mx-auto mb-4" />

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  <Markdown inline>{content.sportGuard.title}</Markdown>
                </h2>

              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">

                <div className="order-1 md:order-2 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">

                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={content.sportGuard.image}
                    alt={content.sportGuard.title}
                    fill
                    className="object-contain"
                    priority
                  />

                </div>

                <div className="order-2 md:order-1">

                  <p className="text-lg mb-6">
                    <Markdown inline>{content.sportGuard.description}</Markdown>
                  </p>

                  <ul className="space-y-3 text-gray-700">

                    {content.sportGuard.items.map((item, index) => (

                      <li
                        key={index}
                        className="flex items-start"
                      >

                        <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 mt-1">
                          •
                        </span>

                        <span className="text-lg">
                          <Markdown inline>{item}</Markdown>
                        </span>

                      </li>

                    ))}

                  </ul>

                  <p className="text-lg mt-6">
                    <Markdown inline>{content.sportGuard.footer}</Markdown>
                  </p>

                </div>

              </div>

            </div>

          </div>
                    {/* Benefits */}

          <div
            id="section-benefits"
            className="mb-16 transform transition-all duration-700 delay-600"
            style={fadeInUp("section-benefits")}
          >

            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">

              <div className="text-center mb-8">

                <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  <Markdown inline>{content.benefits.title}</Markdown>
                </h2>

              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">

                <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">

                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={content.benefits.image}
                    alt={content.benefits.title}
                    fill
                    className="object-contain"
                    priority
                  />

                </div>

                <div>

                  <ul className="space-y-3 text-gray-700">

                    {content.benefits.items.map((item, index) => (

                      <li
                        key={index}
                        className="flex items-start"
                      >

                        <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 mt-1">
                          •
                        </span>

                        <span className="text-lg">
                          <Markdown inline>{item}</Markdown>
                        </span>

                      </li>

                    ))}

                  </ul>

                </div>

              </div>

            </div>

          </div>
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
          

          {/* CTA */}

          <div
            id="section-cta"
            className="transform transition-all duration-700 delay-700"
            style={fadeInUp("section-cta")}
          >

            <div className="bg-gradient-to-r from-purple-600 to-purple-600 text-white rounded-3xl p-8 md:p-12 shadow-xl text-center">

              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                <Markdown inline>{content.cta.title}</Markdown>
              </h2>

              <p className="text-lg md:text-xl mb-8 leading-relaxed">
                <Markdown inline>{content.cta.description}</Markdown>
              </p>

              <button
                onClick={handleOpenChatbot}
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {content.cta.button}
              </button>

            </div>

          </div>

        </div>

      </div>

    </>

  );
}