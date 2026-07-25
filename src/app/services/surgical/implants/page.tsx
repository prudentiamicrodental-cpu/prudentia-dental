"use client"
import React, { useState, useEffect } from 'react';
import { Smile, Shield, Heart, CheckCircle, Award, Star, Users, LucideIcon, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useChatbot } from '@/components/chatbotContext';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown';
import { Metadata } from 'next';
import Head from 'next/head';

const iconMap: { [key: string]: LucideIcon } = {
  Shield,
  Heart,
  CheckCircle,
  Award,
  Star,
  Users,
};

const renderIcon = (name: string, className: string) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

interface ImplantPart {
  number: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  color: string;
  borderColor: string;
}

interface BenefitItem {
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  color: string;
}

interface Badge {
  icon: string;
  iconColor: string;
  label: string;
}
interface MetaData{
  title: string;
  description: string 
};

interface HeroData {
  titleLine1: string;
  titleHighlight: string;
  image: string;
}

interface IntroData {
  paragraphs: string[];
}

interface PartsData {
  title: string;
  image: string;
  items: ImplantPart[];
  conclusion: string;
}

interface BenefitsData {
  title: string;
  image: string;
  items: BenefitItem[];
}

interface RightForYouData {
  title: string;
  paragraphs: string[];
  image: string;
  badges: Badge[];
}
interface TestimonialsData {
  title: string;
  items: { quote: string }[];
}

interface FaqData {
  title: string;
  items: { question: string; answer: string }[];
}

interface FinalCtaData {
  titleLine: string;
  titleHighlight: string;
  paragraph: string;
  buttonText: string;
  footerText: string;
}

interface ImplantsData {
  meta: MetaData;
  hero: HeroData;
  intro: IntroData;
  parts: PartsData;
  benefits: BenefitsData;
  rightForYou: RightForYouData;
  testimonials: TestimonialsData;
  faq: FaqData;
  finalCta: FinalCtaData;
}

const EMPTY_DATA: ImplantsData = {
  meta: { title: '', description: '' },
  hero: { titleLine1: '', titleHighlight: '', image: '' },
  intro: { paragraphs: [] },
  parts: { title: '', image: '', items: [], conclusion: '' },
  benefits: { title: '', image: '', items: [] },
  rightForYou: { title: '', paragraphs: [], image: '', badges: [] },
  testimonials: {title: '',items:[]},
  faq: {title: '',items:[]},
  finalCta: { titleLine: '', titleHighlight: '', paragraph: '', buttonText: '', footerText: '' },
};

const DentalImplantsPage = () => {
  const { handleOpenChatbot } = useChatbot();
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [data, setData] = useState<ImplantsData>(EMPTY_DATA);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

 useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/surgical/implants.json";

      const LOCAL_URL = "/data/service/surgical/implants.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: ImplantsData = await res.json();
        setData(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: ImplantsData = await localRes.json();
          setData(localData);
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
  }, [data]);

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

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <Head>
        <title>{data.meta.title}</title>
        <meta name="description" content={data.meta.description} />
      </Head>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-700 via-purple-800 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div 
              id="hero-content"
              data-animate
              style={slideInLeft('hero-content')}
            >
              <div className="flex items-center mb-6">
                <div className="bg-white bg-opacity-20 p-4 rounded-full backdrop-blur-sm mr-4">
                  <Smile className="w-12 h-12 text-black" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                    <Markdown inline>{data.hero.titleLine1}</Markdown>
                  </h1>
                  <p className="text-2xl lg:text-3xl text-yellow-300 font-semibold">
                    <Markdown inline>{data.hero.titleHighlight}</Markdown>
                  </p>
                </div>
              </div>
            </div>
            <div 
              className="flex justify-center"
              id="hero-image"
              data-animate
              style={slideInRight('hero-image')}
            >
              <div className="bg-white bg-opacity-10 p-6 rounded-2xl backdrop-blur-sm relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                {data.hero.image && (
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={data.hero.image}
                    alt="Modern denture solutions"
                    fill
                    className="object-contain"
                    priority
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div 
            className="max-w-4xl mx-auto text-center"
            id="intro"
            data-animate
            style={fadeInUp('intro')}
          >
            {data.intro.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? "text-lg lg:text-xl text-gray-700 leading-relaxed mb-8" : "text-lg lg:text-xl text-gray-700 leading-relaxed"}
              >
                <Markdown inline>{paragraph}</Markdown>
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Three Parts Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-gray-50 to-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div 
              className="text-center mb-16"
              id="parts-title"
              data-animate
              style={fadeInUp('parts-title')}
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-8 ">
                <Markdown inline>{data.parts.title}</Markdown>
              </h2>
              {data.parts.image && (
                <div className="max-w-3xl mx-auto mb-12 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={data.parts.image}
                    alt="Modern denture solutions"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </div>

            <div className="space-y-8 mb-12">
              {data.parts.items.map((part, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-r ${part.color} rounded-2xl shadow-lg border-2 ${part.borderColor} overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                  id={`part-${index}`}
                  data-animate
                  style={index % 2 === 0 ? slideInLeft(`part-${index}`) : slideInRight(`part-${index}`)}
                >
                  <div className="lg:flex">
                    <div className="lg:w-1/4 p-8 flex flex-col items-center justify-center text-center bg-white bg-opacity-50">
                      <div className="bg-white rounded-full p-4 shadow-lg mb-4">
                        {renderIcon(part.icon, `w-10 h-10 ${part.iconColor}`)}
                      </div>
                      <div className="text-4xl font-bold text-gray-800 mb-2">
                        {part.number}
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                        <Markdown inline>{part.title}</Markdown>
                      </h3>
                    </div>
                    <div className="lg:w-3/4 p-8 flex items-center">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        <Markdown inline>{part.description}</Markdown>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div 
              className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-8 text-center"
              id="parts-conclusion"
              data-animate
              style={fadeInUp('parts-conclusion')}
            >
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                <Markdown inline>{data.parts.conclusion}</Markdown>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div 
              className="text-center mb-16"
              id="benefits-title"
              data-animate
              style={fadeInUp('benefits-title')}
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-8 ">
                <Markdown inline>{data.benefits.title}</Markdown>
              </h2>
              {data.benefits.image && (
                <div className="max-w-3xl mx-auto mb-12 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={data.benefits.image}
                    alt="Modern denture solutions"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {data.benefits.items.map((benefit, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg border-2 ${benefit.color} p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                  id={`benefit-${index}`}
                  data-animate
                  style={index % 2 === 0 ? slideInLeft(`benefit-${index}`) : slideInRight(`benefit-${index}`)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-white p-3 rounded-xl shadow-md flex-shrink-0">
                      {renderIcon(benefit.icon, `w-8 h-8 ${benefit.iconColor}`)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        <Markdown inline>{benefit.title}</Markdown>
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        <Markdown inline>{benefit.description}</Markdown>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Are You Right Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div 
                id="right-content"
                data-animate
                style={slideInLeft('right-content')}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
                  <Markdown inline>{data.rightForYou.title}</Markdown>
                </h2>
                {data.rightForYou.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={index < data.rightForYou.paragraphs.length - 1 ? "text-lg lg:text-xl text-gray-700 leading-relaxed mb-8" : "text-lg lg:text-xl text-gray-700 leading-relaxed"}
                  >
                    <Markdown inline>{paragraph}</Markdown>
                  </p>
                ))}
              </div>
              <div 
                className="flex justify-center"
                id="right-image"
                data-animate
                style={slideInRight('right-image')}
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                  {data.rightForYou.image && (
                    <Image
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      src={data.rightForYou.image}
                      alt="Modern denture solutions"
                      fill
                      className="object-contain"
                      priority
                    />
                  )}
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50">
                    <div className="flex justify-center space-x-4">
                      {data.rightForYou.badges.map((badge, index) => (
                        <div key={index} className="text-center">
                          {renderIcon(badge.icon, `w-8 h-8 ${badge.iconColor} mx-auto mb-2`)}
                          <p className="text-sm font-medium text-gray-700">
                            <Markdown inline>{badge.label}</Markdown>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
                            <section className="mb-32">
                              <div className="text-center mb-16" >
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                                  <Markdown inline>{data.testimonials.title}</Markdown>
                                </h2>
                              </div>
                              <div className="grid md:grid-cols-3 gap-8">
                                {data.testimonials.items.map((item, index) => (
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
                                  <Markdown inline>{data.faq.title}</Markdown>
                                </h2>
                              </div>
                    
                              <div className="max-w-4xl mx-auto space-y-4">
                                {data.faq.items.map((item, index) => {
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

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <Markdown inline>{data.finalCta.titleLine}</Markdown> <span className="text-purple-600"><Markdown inline>{data.finalCta.titleHighlight}</Markdown></span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              <Markdown inline>{data.finalCta.paragraph}</Markdown>
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenChatbot}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 flex items-center mx-auto text-lg"
            >
              {data.finalCta.buttonText} <FiArrowRight className="ml-2" />
            </motion.button>
            <p className="text-gray-500 mt-6">
              <Markdown inline>{data.finalCta.footerText}</Markdown>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DentalImplantsPage;