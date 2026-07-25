"use client"
import React, { useState, useEffect } from 'react';
import { Star, Shield, Clock, Sparkles, Heart, CheckCircle, AlertTriangle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatbot } from '@/components/chatbotContext';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown';
import Head from 'next/head';

interface MetaData {
  title: string;
  description: string;
}

interface HeroData {
  titleLine1: string;
  titleLine2: string;
  tagline: string;
  image: string;
  description: string;
}

interface TrustBadgesData {
  title: string;
  items: string[];
}

interface Benefit {
  icon: string;
  text: string;
  color: string;
}

interface WhyChooseData {
  title: string;
  intro: string;
  image: string;
  benefits: Benefit[];
  footer: string;
}

interface WhatIsData {
  title: string;
  description: string;
  points: string[];
  footer: string;
}

interface ListSectionData {
  title: string;
  intro: string;
  items: string[];
  footer: string;
}

interface TreatmentTypeItem {
  title: string;
  description: string;
}

interface TreatmentTypesData {
  title: string;
  items: TreatmentTypeItem[];
}

interface ProcessStep {
  title: string;
  description: string;
}

interface ProcessData {
  title: string;
  steps: ProcessStep[];
}

interface SafetyData {
  title: string;
  highlight: string;
  paragraph1: string;
  paragraph2: string;
}

interface SideEffectsData {
  title: string;
  description: string;
  proTipTitle: string;
  proTipText: string;
}

interface BenefitsData {
  title: string;
  items: string[];
  footer: string;
}

interface CostData {
  title: string;
  paragraph: string;
  factors: string[];
  highlights: string[];
}

interface ConsultationData {
  title: string;
  paragraph: string;
  points: string[];
}

interface AreasServedData {
  title: string;
  paragraph: string;
  areas: string[];
}

interface TestimonialsData {
  title: string;
  items: { quote: string }[];
}

interface FaqData {
  title: string;
  items: { question: string; answer: string }[];
}

interface WhatToExpectItem {
  title: string;
  description: string;
}

interface WhatToExpectData {
  title: string;
  items: WhatToExpectItem[];
}

interface RevealSmileData {
  title: string;
  image: string;
  paragraph: string;
  ctaText: string;
  ctaButton: string;
  phone: string;
  address: string;
}

interface YellowTeethData {
  meta: MetaData;
  hero: HeroData;
  trustBadges: TrustBadgesData;
  whyChoose: WhyChooseData;
  whatIs: WhatIsData;
  causes: ListSectionData;
  signs: ListSectionData;
  treatmentTypes: TreatmentTypesData;
  process: ProcessData;
  safety: SafetyData;
  sideEffects: SideEffectsData;
  benefits: BenefitsData;
  cost: CostData;
  consultation: ConsultationData;
  areasServed: AreasServedData;
  testimonials: TestimonialsData;
  faq: FaqData;
  whatToExpect: WhatToExpectData;
  revealSmile: RevealSmileData;
}

const iconMap: { [key: string]: React.ReactNode } = {
  Star: <Star className="w-6 h-6" />,
  Clock: <Clock className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
};

const YellowTeethTreatmentPage = () => {
  const { handleOpenChatbot } = useChatbot();
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [content, setContent] = useState<YellowTeethData | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/cosmetic/teeth-whitening.json";

      const LOCAL_URL = "/data/service/cosmetic/teeth-whitening.json";

      try {
        const res = await fetch(GITHUB_URL);
        if (!res.ok) throw new Error("GitHub fetch failed");
        const data: YellowTeethData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);
        try {
          const localRes = await fetch(LOCAL_URL);
          if (!localRes.ok) throw new Error("Local fetch failed");
          const localData: YellowTeethData = await localRes.json();
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

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [content]);

  const fadeInUp = (id: string) => ({
    opacity: isVisible[id] ? 1 : 0,
    transform: isVisible[id] ? 'translateY(0)' : 'translateY(30px)',
    transition: 'all 0.6s ease-out'
  });

  const slideInLeft = (id: string) => ({
    opacity: isVisible[id] ? 1 : 0,
    transform: isVisible[id] ? 'translateX(0)' : 'translateX(-50px)',
    transition: 'all 0.8s ease-out'
  });

  const slideInRight = (id: string) => ({
    opacity: isVisible[id] ? 1 : 0,
    transform: isVisible[id] ? 'translateX(0)' : 'translateX(50px)',
    transition: 'all 0.8s ease-out'
  });

  if (!content) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden py-5 bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Head>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
      </Head>

      {/* Header/Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-purple-400 via-purple-500 to-red-500">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-white rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div id="hero" data-animate style={fadeInUp('hero')} className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <Markdown inline>{content.hero.titleLine1}</Markdown><br />
              <span className="text-purple-200"><Markdown inline>{content.hero.titleLine2}</Markdown></span>
            </h1>
            <div className="flex items-center justify-center mb-8">
              <Sparkles className="w-8 h-8 text-purple-200 mr-3" />
              <p className="text-2xl md:text-3xl font-light">
                <Markdown inline>{content.hero.tagline}</Markdown>
              </p>
              <Sparkles className="w-8 h-8 text-purple-200 ml-3" />
            </div>

            <div className="relative h-80 md:h-96 max-w-full shadow-2xl rounded-xl shadow-lg mb-8">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.hero.image}
                alt={content.hero.titleLine1}
                fill
                className="object-cover"
                priority
              />
            </div>

            <p className="text-lg md:text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
              <Markdown inline>{content.hero.description}</Markdown>
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Trust Badges */}
        <section id="trust-badges" data-animate style={fadeInUp('trust-badges')} className="mb-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            <Markdown inline>{content.trustBadges.title}</Markdown>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {content.trustBadges.items.map((item, index) => (
              <div key={index} className="flex items-center bg-white border border-purple-100 rounded-full px-5 py-2 shadow-sm">
                <span className="text-amber-400 mr-2">★</span>
                <span className="text-gray-700 text-sm font-medium">
                  <Markdown inline>{item}</Markdown>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Section */}
        <section id="why-choose" data-animate style={fadeInUp('why-choose')} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              <Markdown inline>{content.whyChoose.title}</Markdown>
            </h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              <Markdown inline>{content.whyChoose.intro}</Markdown>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div id="benefits-left" data-animate style={slideInLeft('benefits-left')}>
              <div className="relative h-80 md:h-96 max-w-full shadow-2xl rounded-xl shadow-lg mb-8">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.whyChoose.image}
                  alt={content.whyChoose.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div id="benefits-right" data-animate style={slideInRight('benefits-right')} className="space-y-6">
              {content.whyChoose.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className={`w-12 h-12 ${benefit.color} rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                    {iconMap[benefit.icon]}
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed"><Markdown inline>{benefit.text}</Markdown></p>
                </div>
              ))}

              <div className="bg-gradient-to-r from-purple-500 to-red-500 text-white p-6 rounded-xl shadow-lg mt-8">
                <p className="text-lg leading-relaxed">
                  <Markdown inline>{content.whyChoose.footer}</Markdown>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Is Yellow Teeth Treatment */}
        <section id="what-is" data-animate style={fadeInUp('what-is')} className="mb-20">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
              <Markdown inline>{content.whatIs.title}</Markdown>
            </h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              <Markdown inline>{content.whatIs.description}</Markdown>
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-6">
              {content.whatIs.points.map((point, index) => (
                <li key={index} className="flex items-start bg-purple-50 rounded-lg p-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><Markdown inline>{point}</Markdown></span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 font-medium">
              <Markdown inline>{content.whatIs.footer}</Markdown>
            </p>
          </div>
        </section>

        {/* Causes Section */}
        <section id="causes" data-animate style={fadeInUp('causes')} className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              <Markdown inline>{content.causes.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              <Markdown inline>{content.causes.intro}</Markdown>
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {content.causes.items.map((item, index) => (
              <div key={index} className="flex items-start bg-white rounded-lg shadow-sm p-4">
                <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700"><Markdown inline>{item}</Markdown></span>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              <Markdown inline>{content.causes.footer}</Markdown>
            </p>
          </div>
        </section>

        {/* Signs Section */}
        <section id="signs" data-animate style={fadeInUp('signs')} className="mb-20">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
              <Markdown inline>{content.signs.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-700 mb-8 text-center">
              <Markdown inline>{content.signs.intro}</Markdown>
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {content.signs.items.map((item, index) => (
                <div key={index} className="flex items-start bg-white rounded-lg p-4 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><Markdown inline>{item}</Markdown></span>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              <Markdown inline>{content.signs.footer}</Markdown>
            </p>
          </div>
        </section>

        {/* Treatment Types */}
        <section id="treatment-types" data-animate style={fadeInUp('treatment-types')} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              <Markdown inline>{content.treatmentTypes.title}</Markdown>
            </h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {content.treatmentTypes.items.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {index + 1}. <Markdown inline>{item.title}</Markdown>
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  <Markdown inline>{item.description}</Markdown>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section id="process" data-animate style={fadeInUp('process')} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              <Markdown inline>{content.process.title}</Markdown>
            </h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto"></div>
          </div>
          <div className="space-y-6">
            {content.process.steps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="bg-gradient-to-r from-purple-500 to-red-500 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    <Markdown inline>{step.title}</Markdown>
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <Markdown inline>{step.description}</Markdown>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Is Teeth Whitening Safe Section */}
        <section id="safety" data-animate style={fadeInUp('safety')} className="mb-20">
          <div className="bg-gradient-to-r from-purple-500 to-purple-800 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <Markdown inline>{content.safety.title}</Markdown>
            </h2>
            <div className="w-20 h-1 bg-purple-200 mb-8"></div>
            <div className="text-2xl font-bold mb-6 text-purple-100">
              <Markdown inline>{content.safety.highlight}</Markdown>
            </div>
            <p className="text-lg mb-6 text-purple-100 leading-relaxed">
              <Markdown inline>{content.safety.paragraph1}</Markdown>
            </p>
            <p className="text-lg text-purple-100 leading-relaxed">
              <Markdown inline>{content.safety.paragraph2}</Markdown>
            </p>
          </div>
        </section>

        {/* Side Effects Section */}
        <section id="side-effects" data-animate style={fadeInUp('side-effects')} className="mb-20">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                <Markdown inline>{content.sideEffects.title}</Markdown>
              </h2>
              <div className="w-20 h-1 bg-purple-500 mx-auto"></div>
            </div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              <Markdown inline>{content.sideEffects.description}</Markdown>
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <div className="flex items-start">
                <Heart className="w-6 h-6 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-blue-800 mb-2">
                    <Markdown inline>{content.sideEffects.proTipTitle}</Markdown>
                  </h3>
                  <p className="text-blue-700">
                    <Markdown inline>{content.sideEffects.proTipText}</Markdown>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" data-animate style={fadeInUp('benefits')} className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              <Markdown inline>{content.benefits.title}</Markdown>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {content.benefits.items.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium"><Markdown inline>{item}</Markdown></span>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              <Markdown inline>{content.benefits.footer}</Markdown>
            </p>
          </div>
        </section>

        {/* Cost Section */}
        <section id="cost" data-animate style={fadeInUp('cost')} className="mb-20">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                <Markdown inline>{content.cost.title}</Markdown>
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                <Markdown inline>{content.cost.paragraph}</Markdown>
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {content.cost.factors.map((factor, index) => (
                  <li key={index}><Markdown inline>{factor}</Markdown></li>
                ))}
              </ul>
            </div>
            <div className="bg-purple-50 rounded-xl p-8 space-y-4">
              {content.cost.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-purple-700 font-bold mr-3">✔</span>
                  <span className="text-gray-800 font-medium"><Markdown inline>{highlight}</Markdown></span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Same-Day Consultation */}
        <section id="consultation" data-animate style={fadeInUp('consultation')} className="mb-20">
          <div className="bg-gradient-to-r from-purple-100 to-red-100 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              <Markdown inline>{content.consultation.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              <Markdown inline>{content.consultation.paragraph}</Markdown>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {content.consultation.points.map((point, index) => (
                <div key={index} className="bg-white px-5 py-3 rounded-lg shadow-sm text-gray-700 font-medium">
                  <Markdown inline>{point}</Markdown>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas Served */}
        <section id="areas-served" data-animate style={fadeInUp('areas-served')} className="mb-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            <Markdown inline>{content.areasServed.title}</Markdown>
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            <Markdown inline>{content.areasServed.paragraph}</Markdown>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {content.areasServed.areas.map((area, index) => (
              <span key={index} className="bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-medium">
                <Markdown inline>{area}</Markdown>
              </span>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" data-animate style={fadeInUp('testimonials')} className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
            <Markdown inline>{content.testimonials.title}</Markdown>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.testimonials.items.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-amber-400 text-lg mb-4">★★★★★</div>
                <p className="text-gray-700 italic"><Markdown inline>{item.quote}</Markdown></p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" data-animate style={fadeInUp('faq')} className="mb-20 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
            <Markdown inline>{content.faq.title}</Markdown>
          </h2>
          <div className="space-y-4">
            {content.faq.items.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex justify-between items-center text-left px-6 py-5"
                  >
                    <span className="text-lg font-semibold text-gray-800 pr-4">
                      <Markdown inline>{item.question}</Markdown>
                    </span>
                    <ChevronDown className={`w-5 h-5 text-purple-700 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 overflow-hidden"
                      >
                        <p className="text-gray-700 pb-5"><Markdown inline>{item.answer}</Markdown></p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* What to Expect */}
        <section id="what-to-expect" data-animate style={fadeInUp('what-to-expect')} className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
            <Markdown inline>{content.whatToExpect.title}</Markdown>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.whatToExpect.items.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="bg-gradient-to-r from-purple-500 to-red-500 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  <Markdown inline>{item.title}</Markdown>
                </h3>
                <p className="text-gray-700"><Markdown inline>{item.description}</Markdown></p>
              </div>
            ))}
          </div>
        </section>

        {/* Reveal Your Radiant Smile Section */}
        <section id="reveal-smile" data-animate style={fadeInUp('reveal-smile')} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              <Markdown inline>{content.revealSmile.title}</Markdown>
            </h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto mb-8"></div>
            <div className="relative h-80 md:h-96 max-w-full shadow-2xl rounded-xl shadow-lg mb-8">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.revealSmile.image}
                alt={content.revealSmile.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              <Markdown inline>{content.revealSmile.paragraph}</Markdown>
            </p>

            <div className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
              <p className="text-xl mb-6 leading-relaxed">
                <Markdown inline>{content.revealSmile.ctaText}</Markdown>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-lg">
                <a href={`tel:${content.revealSmile.phone}`} className="flex items-center gap-2 hover:underline text-white">
                  📞 Call Now: {content.revealSmile.phone}
                </a>
                <span className="hidden sm:inline">|</span>
                <span className="flex items-center gap-2">
                  📍 {content.revealSmile.address}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={handleOpenChatbot} className="bg-white text-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
                  {content.revealSmile.ctaButton}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default YellowTeethTreatmentPage;