"use client"
import React, { useState, useEffect } from 'react';
import { Heart, Shield, Smile, Star, Phone, Mail, MapPin, Baby, Microscope, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChatbot } from '@/components/chatbotContext';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown';
import Head from 'next/head';

interface PediatricData {
  meta: { title: string; description: string };
  hero: { titleLine1: string; titleLine2: string; description: string; phone: string };
  introImage: { image: string; caption: string };
  approach: {
    title: string;
    intro: string;
    items: string[];
  };
  whyChooseUs: {
    title: string;
    items: { icon: string; title: string; description: string }[];
  };
  servicesNearYou: {
    title: string;
    intro: string;
    items: { title: string; description: string }[];
  };
  procedures: {
    title: string;
    intro: string;
    items: { number: string; title: string; content: string; icon: string; iconColor: string; color: string }[];
  };
  emergency: {
    title: string;
    intro: string;
    items: string[];
    footer: string;
    phone: string;
  };
  safety: {
    title: string;
    intro: string;
    items: string[];
  };
  whenToVisit: {
    title: string;
    intro: string;
    items: string[];
    footer: string;
  };
  safeHands: {
    title: string;
    description: string;
    features: { icon: string; title: string; description: string }[];
  };
  areasServed: {
    title: string;
    intro: string;
    items: string[];
    footer: string;
    address: string;
  };
  testimonials: {
    title: string;
    items: { quote: string; author: string }[];
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  contact: {
    title: string;
    description: string;
    cards: { icon: string; title: string; description: string }[];
    button: string;
    phone: string;
    address: string;
  };
}

const iconMap: { [key: string]: React.ElementType } = { Shield, Smile, Heart, Star, Phone, Mail, MapPin, Microscope };

const PediatricDentistryPage = () => {
  const { handleOpenChatbot } = useChatbot();
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [content, setContent] = useState<PediatricData | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
            <a
              href={`tel:${content.hero.phone}`}
              className="inline-flex items-center bg-white text-purple-700 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now: {content.hero.phone}
            </a>
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
                  alt="Pediatric dental care"
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

      {/* Gentle & Pain-Free Approach */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto"
            id="approach"
            data-animate
            style={fadeInUp('approach')}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                <Markdown inline>{content.approach.title}</Markdown>
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                <Markdown inline>{content.approach.intro}</Markdown>
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {content.approach.items.map((item, index) => (
                  <div key={index} className="flex items-start bg-pink-50 rounded-lg p-4 text-left">
                    <CheckCircle2 className="w-5 h-5 text-pink-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700"><Markdown inline>{item}</Markdown></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Families Choose Us */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-12"
            id="why-choose-us-title"
            data-animate
            style={fadeInUp('why-choose-us-title')}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
              <Markdown inline>{content.whyChooseUs.title}</Markdown>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {content.whyChooseUs.items.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
                  <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                    {Icon && <Icon className="w-7 h-7 text-purple-600" />}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    <Markdown inline>{item.title}</Markdown>
                  </h3>
                  <p className="text-gray-600 text-sm">
                    <Markdown inline>{item.description}</Markdown>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Near You */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-12"
            id="services-title"
            data-animate
            style={fadeInUp('services-title')}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              <Markdown inline>{content.servicesNearYou.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              <Markdown inline>{content.servicesNearYou.intro}</Markdown>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {content.servicesNearYou.items.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center hover:shadow-lg transition-all duration-300">
                <h3 className="font-bold text-gray-800 mb-2">
                  <Markdown inline>{item.title}</Markdown>
                </h3>
                <p className="text-gray-600 text-sm">
                  <Markdown inline>{item.description}</Markdown>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Procedures Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-pink-50 to-purple-50">
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

      {/* Emergency Care */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto"
            id="emergency"
            data-animate
            style={fadeInUp('emergency')}
          >
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 lg:p-10 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
                <Markdown inline>{content.emergency.title}</Markdown>
              </h2>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                <Markdown inline>{content.emergency.intro}</Markdown>
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {content.emergency.items.map((item, index) => (
                  <span key={index} className="bg-white border border-red-200 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                    <Markdown inline>{item}</Markdown>
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                <Markdown inline>{content.emergency.footer}</Markdown>
              </p>
              <a
                href={`tel:${content.emergency.phone}`}
                className="inline-flex items-center bg-red-600 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                {content.emergency.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Hygiene */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto text-center"
            id="safety"
            data-animate
            style={fadeInUp('safety')}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              <Markdown inline>{content.safety.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              <Markdown inline>{content.safety.intro}</Markdown>
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {content.safety.items.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-5 flex items-start text-left">
                  <Shield className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm"><Markdown inline>{item}</Markdown></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* When to Visit */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto text-center"
            id="when-to-visit"
            data-animate
            style={fadeInUp('when-to-visit')}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              <Markdown inline>{content.whenToVisit.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              <Markdown inline>{content.whenToVisit.intro}</Markdown>
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {content.whenToVisit.items.map((item, index) => (
                <div key={index} className="bg-purple-50 rounded-xl p-5 flex items-start text-left">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm"><Markdown inline>{item}</Markdown></span>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-700 bg-pink-50 p-4 rounded-lg max-w-2xl mx-auto">
              <Markdown inline>{content.whenToVisit.footer}</Markdown>
            </p>
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

      {/* Areas Served */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto text-center"
            id="areas-served"
            data-animate
            style={fadeInUp('areas-served')}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              <Markdown inline>{content.areasServed.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              <Markdown inline>{content.areasServed.intro}</Markdown>
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {content.areasServed.items.map((area, index) => (
                <span key={index} className="bg-white shadow-sm text-gray-700 px-4 py-2 rounded-full flex items-center text-sm">
                  <MapPin className="w-3.5 h-3.5 text-purple-600 mr-1.5" />
                  <Markdown inline>{area}</Markdown>
                </span>
              ))}
            </div>
            <p className="text-gray-700 mb-2">
              <Markdown inline>{content.areasServed.footer}</Markdown>
            </p>
            <p className="text-gray-600 text-sm">{content.areasServed.address}</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-pink-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-12"
            id="testimonials-title"
            data-animate
            style={fadeInUp('testimonials-title')}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
              <Markdown inline>{content.testimonials.title}</Markdown>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {content.testimonials.items.map((t, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-700 italic mb-4 leading-relaxed">
                  <Markdown inline>{t.quote}</Markdown>
                </p>
                <p className="text-purple-600 font-semibold text-sm">— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-12"
            id="faq-title"
            data-animate
            style={fadeInUp('faq-title')}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
              <Markdown inline>{content.faq.title}</Markdown>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {content.faq.items.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-6 py-4 flex justify-between items-center"
                  >
                    <span className="font-semibold text-gray-800 pr-4">
                      <Markdown inline>{item.question}</Markdown>
                    </span>
                    <span className="text-purple-600 text-2xl flex-shrink-0">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                      <Markdown inline>{item.answer}</Markdown>
                    </div>
                  )}
                </div>
              );
            })}
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

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#800080", color: "#ffff" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenChatbot}
                  transition={{ duration: 0.2 }}
                  className="bg-transparent border-2 border-black text-black font-bold px-8 py-4 rounded-lg text-lg hover:bg-white hover:text-purple-900 transition duration-300"
                >
                  {content.contact.button}
                </motion.button>
                <a
                  href={`tel:${content.contact.phone}`}
                  className="bg-white text-purple-700 font-bold px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition duration-300 flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {content.contact.phone}
                </a>
              </div>
              <p className="mt-6 text-white text-opacity-80 text-sm flex items-center justify-center">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                {content.contact.address}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PediatricDentistryPage;