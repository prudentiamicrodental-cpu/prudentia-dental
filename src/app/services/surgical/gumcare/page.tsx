"use client"
import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Shield,
  Heart,
  CheckCircle,
  Activity,
  Stethoscope,
  Sparkles,
  ChevronDown,
  LucideIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useChatbot } from '@/components/chatbotContext';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown';
import Head from 'next/head';

const iconMap: { [key: string]: LucideIcon } = {
  AlertTriangle,
  Shield,
  Heart,
  CheckCircle,
  Activity,
  Stethoscope,
  Sparkles,
};

const renderIcon = (name: string, className: string) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

interface MetaData {
  title: string;
  description: string;
}

interface FeatureItem {
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

interface Card {
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  borderColor: string;
}

interface HeroData {
  titleLine1: string;
  titleHighlight: string;
  image: string;
}

interface IntroData {
  paragraph: string;
}

interface TrustBadgesData {
  title: string;
  items: string[];
}

interface WhyChooseData {
  title: string;
  items: FeatureItem[];
}

interface CausesData {
  title: string;
  image: string;
  intro: string;
  items: string[];
  footer: string;
}

interface SignsData {
  title: string;
  intro: string;
  items: string[];
  footer: string;
}

interface TreatmentsData {
  title: string;
  images: string[];
  paragraph: string;
  items: FeatureItem[];
}

interface ProcessData {
  title: string;
  paragraph: string;
  steps: FeatureItem[];
}

interface BenefitsData {
  title: string;
  items: FeatureItem[];
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

interface WhatToExpectData {
  image: string;
  badges: Badge[];
  title: string;
  paragraphs: string[];
  cards: Card[];
}

interface FinalCtaData {
  titleLine: string;
  titleHighlight: string;
  paragraph: string;
  buttonText: string;
  footerText: string;
  phone: string;
  address: string;
}

interface SwollenGumsData {
  meta: MetaData;
  hero: HeroData;
  intro: IntroData;
  trustBadges: TrustBadgesData;
  whyChoose: WhyChooseData;
  causes: CausesData;
  signs: SignsData;
  treatments: TreatmentsData;
  process: ProcessData;
  benefits: BenefitsData;
  cost: CostData;
  consultation: ConsultationData;
  areasServed: AreasServedData;
  testimonials: TestimonialsData;
  faq: FaqData;
  whatToExpect: WhatToExpectData;
  finalCta: FinalCtaData;
}

const EMPTY_DATA: SwollenGumsData = {
  meta: { title: '', description: '' },
  hero: { titleLine1: '', titleHighlight: '', image: '' },
  intro: { paragraph: '' },
  trustBadges: { title: '', items: [] },
  whyChoose: { title: '', items: [] },
  causes: { title: '', image: '', intro: '', items: [], footer: '' },
  signs: { title: '', intro: '', items: [], footer: '' },
  treatments: { title: '', images: [], paragraph: '', items: [] },
  process: { title: '', paragraph: '', steps: [] },
  benefits: { title: '', items: [], footer: '' },
  cost: { title: '', paragraph: '', factors: [], highlights: [] },
  consultation: { title: '', paragraph: '', points: [] },
  areasServed: { title: '', paragraph: '', areas: [] },
  testimonials: { title: '', items: [] },
  faq: { title: '', items: [] },
  whatToExpect: { image: '', badges: [], title: '', paragraphs: [], cards: [] },
  finalCta: { titleLine: '', titleHighlight: '', paragraph: '', buttonText: '', footerText: '', phone: '', address: '' },
};

const SwollenGumsTreatmentPage = () => {
  const { handleOpenChatbot } = useChatbot();
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [data, setData] = useState<SwollenGumsData>(EMPTY_DATA);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/surgical/gumDisease.json";

      const LOCAL_URL = "/data/service/surgical/gumDisease.json";

      try {
        const res = await fetch(GITHUB_URL);
        if (!res.ok) throw new Error("GitHub fetch failed");
        const data: SwollenGumsData = await res.json();
        setData(data);
      } catch (error) {
        console.warn("Using local fallback:", error);
        try {
          const localRes = await fetch(LOCAL_URL);
          if (!localRes.ok) throw new Error("Local fetch failed");
          const localData: SwollenGumsData = await localRes.json();
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
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50">
      <Head>
        <title>{data.meta.title}</title>
        <meta name="description" content={data.meta.description} />
      </Head>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div id="hero-content" data-animate style={slideInLeft('hero-content')}>
              <div className="flex items-center mb-8">
                <div className="bg-white bg-opacity-20 p-4 rounded-full backdrop-blur-sm mr-4">
                  <Shield className="w-12 h-12 text-black" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                    <Markdown inline>{data.hero.titleLine1}</Markdown>
                  </h1>
                  <p className="text-2xl lg:text-3xl text-purple-300 font-semibold">
                    <Markdown inline>{data.hero.titleHighlight}</Markdown>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center" id="hero-image" data-animate style={slideInRight('hero-image')}>
              <div className="bg-white bg-opacity-10 p-6 rounded-2xl backdrop-blur-sm relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                {data.hero.image && (
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={data.hero.image}
                    alt={data.hero.titleLine1}
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
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center" id="intro" data-animate style={fadeInUp('intro')}>
            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
              <Markdown inline>{data.intro.paragraph}</Markdown>
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center" id="trust-title" data-animate style={fadeInUp('trust-title')}>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-8">
              <Markdown inline>{data.trustBadges.title}</Markdown>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {data.trustBadges.items.map((item, index) => (
                <div key={index} className="flex items-center bg-white border border-purple-100 rounded-full px-5 py-2 shadow-sm">
                  <span className="text-amber-400 mr-2">★</span>
                  <span className="text-gray-700 text-sm font-medium">
                    <Markdown inline>{item}</Markdown>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12" id="why-choose-title" data-animate style={fadeInUp('why-choose-title')}>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-800">
                <Markdown inline>{data.whyChoose.title}</Markdown>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {data.whyChoose.items.map((item, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg border-2 ${item.color} p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
                  id={`why-choose-${index}`}
                  data-animate
                  style={index % 2 === 0 ? slideInLeft(`why-choose-${index}`) : slideInRight(`why-choose-${index}`)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-white p-3 rounded-xl shadow-md flex-shrink-0">
                      {renderIcon(item.icon, `w-8 h-8 ${item.iconColor}`)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        <Markdown inline>{item.title}</Markdown>
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        <Markdown inline>{item.description}</Markdown>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Causes Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12" id="causes-title" data-animate style={fadeInUp('causes-title')}>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6">
                <Markdown inline>{data.causes.title}</Markdown>
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                <Markdown inline>{data.causes.intro}</Markdown>
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {data.causes.image && (
                <div className="relative h-72 md:h-96 w-full rounded-xl overflow-hidden shadow-lg" id="causes-image" data-animate style={slideInLeft('causes-image')}>
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={data.causes.image}
                    alt={data.causes.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
              <div id="causes-list" data-animate style={slideInRight('causes-list')}>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {data.causes.items.map((item, index) => (
                    <li key={index} className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                      <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        <Markdown inline>{item}</Markdown>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700 font-medium mt-6">
                  <Markdown inline>{data.causes.footer}</Markdown>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signs Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center" id="signs-title" data-animate style={fadeInUp('signs-title')}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-4">
              <Markdown inline>{data.signs.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-700 mb-10">
              <Markdown inline>{data.signs.intro}</Markdown>
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4 mb-8">
            {data.signs.items.map((item, index) => (
              <div
                key={index}
                id={`sign-${index}`}
                data-animate
                style={fadeInUp(`sign-${index}`)}
                className="flex items-start bg-white rounded-lg shadow-sm p-4 border border-purple-100"
              >
                <CheckCircle className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <Markdown inline>{item}</Markdown>
                </span>
              </div>
            ))}
          </div>

          <div
            className="max-w-4xl mx-auto bg-gradient-to-r from-yellow-50 to-red-50 border-2 border-yellow-300 rounded-2xl p-8 text-center"
            id="signs-footer"
            data-animate
            style={fadeInUp('signs-footer')}
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              <Markdown inline>{data.signs.footer}</Markdown>
            </p>
          </div>
        </div>
      </section>

      {/* Treatments Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16" id="treatments-title" data-animate style={fadeInUp('treatments-title')}>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-8">
                <Markdown inline>{data.treatments.title}</Markdown>
              </h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
                {data.treatments.images.map((image, index) => (
                  <div key={index} className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
                    <Image
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      src={image}
                      alt={data.treatments.title}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                ))}
              </div>
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                <Markdown inline>{data.treatments.paragraph}</Markdown>
              </p>
            </div>

            <div className="space-y-8">
              {data.treatments.items.map((treatment, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-r ${treatment.color} rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                  id={`treatment-${index}`}
                  data-animate
                  style={index % 2 === 0 ? slideInLeft(`treatment-${index}`) : slideInRight(`treatment-${index}`)}
                >
                  <div className="lg:flex">
                    <div className="lg:w-1/4 p-8 flex flex-col items-center justify-center text-center bg-white bg-opacity-50">
                      <div className="bg-white rounded-full p-4 shadow-lg mb-4">
                        {renderIcon(treatment.icon, `w-10 h-10 ${treatment.iconColor}`)}
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                        <Markdown inline>{treatment.title}</Markdown>
                      </h3>
                    </div>
                    <div className="lg:w-3/4 p-8 flex items-center">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        <Markdown inline>{treatment.description}</Markdown>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16" id="process-title" data-animate style={fadeInUp('process-title')}>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-8">
                <Markdown inline>{data.process.title}</Markdown>
              </h2>
              <p className="text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                <Markdown inline>{data.process.paragraph}</Markdown>
              </p>
            </div>

            <div className="space-y-8">
              {data.process.steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  id={`process-step-${index}`}
                  data-animate
                  style={index % 2 === 0 ? slideInLeft(`process-step-${index}`) : slideInRight(`process-step-${index}`)}
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                    <div className={`${step.color} p-4 rounded-xl shadow-md flex-shrink-0`}>
                      {renderIcon(step.icon, `w-8 h-8 ${step.iconColor}`)}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        {index + 1}. <Markdown inline>{step.title}</Markdown>
                      </h3>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        <Markdown inline>{step.description}</Markdown>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12" id="benefits-title" data-animate style={fadeInUp('benefits-title')}>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-800">
                <Markdown inline>{data.benefits.title}</Markdown>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {data.benefits.items.map((item, index) => (
                <div
                  key={index}
                  id={`benefit-${index}`}
                  data-animate
                  style={fadeInUp(`benefit-${index}`)}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className={`h-14 w-14 ${item.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                    {renderIcon(item.icon, `w-7 h-7 ${item.iconColor}`)}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
                    <Markdown inline>{item.title}</Markdown>
                  </h3>
                  <p className="text-gray-700 text-center text-sm">
                    <Markdown inline>{item.description}</Markdown>
                  </p>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto text-center" id="benefits-footer" data-animate style={fadeInUp('benefits-footer')}>
              <p className="text-lg text-gray-700 leading-relaxed">
                <Markdown inline>{data.benefits.footer}</Markdown>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div
            className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start bg-white rounded-2xl shadow-lg p-10"
            id="cost-section"
            data-animate
            style={fadeInUp('cost-section')}
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                <Markdown inline>{data.cost.title}</Markdown>
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                <Markdown inline>{data.cost.paragraph}</Markdown>
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {data.cost.factors.map((factor, index) => (
                  <li key={index}>
                    <Markdown inline>{factor}</Markdown>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50 rounded-xl p-8 space-y-4">
              {data.cost.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-purple-700 font-bold mr-3">✔</span>
                  <span className="text-gray-800 font-medium">
                    <Markdown inline>{highlight}</Markdown>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Same-Day Consultation */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-10 text-center"
            id="consultation-section"
            data-animate
            style={fadeInUp('consultation-section')}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <Markdown inline>{data.consultation.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              <Markdown inline>{data.consultation.paragraph}</Markdown>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {data.consultation.points.map((point, index) => (
                <div key={index} className="bg-white px-5 py-3 rounded-lg shadow-sm text-gray-700 font-medium">
                  <Markdown inline>{point}</Markdown>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center" id="areas-served" data-animate style={fadeInUp('areas-served')}>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <Markdown inline>{data.areasServed.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              <Markdown inline>{data.areasServed.paragraph}</Markdown>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {data.areasServed.areas.map((area, index) => (
                <span key={index} className="bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-medium">
                  <Markdown inline>{area}</Markdown>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-800 mb-12 text-center"
              id="testimonials-title"
              data-animate
              style={fadeInUp('testimonials-title')}
            >
              <Markdown inline>{data.testimonials.title}</Markdown>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {data.testimonials.items.map((item, index) => (
                <div
                  key={index}
                  id={`testimonial-${index}`}
                  data-animate
                  style={fadeInUp(`testimonial-${index}`)}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <div className="text-amber-400 text-lg mb-4">★★★★★</div>
                  <p className="text-gray-700 italic">
                    <Markdown inline>{item.quote}</Markdown>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-800 mb-10 text-center"
              id="faq-title"
              data-animate
              style={fadeInUp('faq-title')}
            >
              <Markdown inline>{data.faq.title}</Markdown>
            </h2>

            <div className="space-y-4">
              {data.faq.items.map((item, index) => {
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
                      <ChevronDown
                        className={`w-5 h-5 text-purple-700 flex-shrink-0 transition-transform duration-300 ${
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
                          className="px-6 overflow-hidden"
                        >
                          <p className="text-gray-700 pb-5">
                            <Markdown inline>{item.answer}</Markdown>
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center order-2 lg:order-1" id="expect-image" data-animate style={slideInLeft('expect-image')}>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative h-80 md:h-96 w-full">
                  {data.whatToExpect.image && (
                    <Image
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      src={data.whatToExpect.image}
                      alt={data.whatToExpect.title}
                      fill
                      className="object-contain"
                      priority
                    />
                  )}
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex justify-center space-x-4">
                      {data.whatToExpect.badges.map((badge, index) => (
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
              <div className="order-1 lg:order-2" id="expect-content" data-animate style={slideInRight('expect-content')}>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
                  <Markdown inline>{data.whatToExpect.title}</Markdown>
                </h2>
                {data.whatToExpect.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={
                      index < data.whatToExpect.paragraphs.length - 1
                        ? "text-lg lg:text-xl text-gray-700 leading-relaxed mb-6"
                        : "text-lg lg:text-xl text-gray-700 leading-relaxed"
                    }
                  >
                    <Markdown inline>{paragraph}</Markdown>
                  </p>
                ))}
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  {data.whatToExpect.cards.map((card, index) => (
                    <div key={index} className={`bg-white p-4 rounded-xl shadow-md border-2 ${card.borderColor}`}>
                      {renderIcon(card.icon, `w-8 h-8 ${card.iconColor} mb-2`)}
                      <h4 className="font-semibold text-gray-800">
                        <Markdown inline>{card.title}</Markdown>
                      </h4>
                      <p className="text-sm text-gray-600">
                        <Markdown inline>{card.description}</Markdown>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <Markdown inline>{data.finalCta.titleLine}</Markdown>{' '}
              <span className="text-purple-600"><Markdown inline>{data.finalCta.titleHighlight}</Markdown></span>
            </h2>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              <Markdown inline>{data.finalCta.paragraph}</Markdown>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-lg text-gray-700">
              <a href={`tel:${data.finalCta.phone}`} className="flex items-center gap-2 hover:underline">
                📞 Call Now: {data.finalCta.phone}
              </a>
              <span className="hidden sm:inline">|</span>
              <span className="flex items-center gap-2">
                📍 {data.finalCta.address}
              </span>
            </div>

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

export default SwollenGumsTreatmentPage;