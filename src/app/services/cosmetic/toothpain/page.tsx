'use client'

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  FiArrowRight, 
  FiCheck, 
  FiZoomIn, 
  FiEye, 
  FiShield, 
  FiActivity,
  FiMapPin,
  FiPhone,
  FiClock,
  FiStar
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown';
import { useChatbot } from '@/components/chatbotContext';

const ICONS: Record<string, IconType> = { 
  FiZoomIn, 
  FiEye, 
  FiShield, 
  FiActivity 
};

// Type definitions based on the JSON structure
interface MetaData {
  title: string;
  description: string;
}

interface HeroData {
  titleLine1: string;
  titleHighlight: string;
  paragraph: string;
  buttonText: string;
  image: string;
  imageCaption: string;
}

interface TrustBadgesData {
  title: string;
  items: string[];
}

interface WhyMattersItem {
  title: string;
  description: string;
}

interface PhilosophyBox {
  title: string;
  items: string[];
}

interface WhyMattersBox {
  title: string;
  paragraph: string;
  items: WhyMattersItem[];
}

interface WhatIsSectionData {
  title: string;
  titleHighlight: string;
  subtitle: string;
  images: string[];
  philosophyBox: PhilosophyBox;
  whyMattersBox: WhyMattersBox;
}

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface WhyChooseData {
  title: string;
  titleHighlight: string;
  paragraph: string;
  image: string;
  benefits: Benefit[];
}

interface CausesData {
  title: string;
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

interface TreatmentType {
  title: string;
  description: string;
}

interface TreatmentTypesData {
  title: string;
  items: TreatmentType[];
}

interface ProcessItem {
  label: string;
  text: string;
}

interface ProcessBox {
  title: string;
  items: ProcessItem[];
}

interface LongTermBox {
  title: string;
  paragraph: string;
}

interface ProcessData {
  title: string;
  titleHighlight: string;
  subtitle: string;
  image: string;
  processBox: ProcessBox;
  longTermBox: LongTermBox;
}

interface KeyBenefitsData {
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

interface Testimonial {
  quote: string;
}

interface TestimonialsData {
  title: string;
  items: Testimonial[];
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQData {
  title: string;
  items: FAQItem[];
}

interface WhatToExpectItem {
  title: string;
  description: string;
}

interface WhatToExpectData {
  title: string;
  items: WhatToExpectItem[];
}

interface HealthConnectionData {
  titleLine: string;
  titleHighlight: string;
  paragraph1: string;
  paragraph2: string;
  buttonText: string;
}

interface CtaData {
  title: string;
  titleHighlight: string;
  paragraph: string;
  buttonText: string;
  footerText: string;
  phone: string;
  address: string;
}

interface ProcedureStep {
  title: string;
  description: string;
}

interface ToothPainData {
  meta: MetaData;
  hero: HeroData;
  trustBadges: TrustBadgesData;
  whatIsSection: WhatIsSectionData;
  whyChoose: WhyChooseData;
  causes: CausesData;
  signs: SignsData;
  treatmentTypes: TreatmentTypesData;
  processing: ProcessData;
  keyBenefits: KeyBenefitsData;
  cost: CostData;
  consultation: ConsultationData;
  areasServed: AreasServedData;
  testimonials: TestimonialsData;
  faq: FAQData;
  whatToExpect: WhatToExpectData;
  healthConnection: HealthConnectionData;
  cta: CtaData;
  procedureSteps: ProcedureStep[];
}

const EMPTY_DATA: ToothPainData = {
  meta: { title: '', description: '' },
  hero: { 
    titleLine1: '', 
    titleHighlight: '', 
    paragraph: '', 
    buttonText: '', 
    image: '', 
    imageCaption: '' 
  },
  trustBadges: { title: '', items: [] },
  whatIsSection: {
    title: '',
    titleHighlight: '',
    subtitle: '',
    images: [],
    philosophyBox: { title: '', items: [] },
    whyMattersBox: { title: '', paragraph: '', items: [] },
  },
  whyChoose: { 
    title: '', 
    titleHighlight: '', 
    paragraph: '', 
    image: '',
    benefits: [] 
  },
  causes: { title: '', intro: '', items: [], footer: '' },
  signs: { title: '', intro: '', items: [], footer: '' },
  treatmentTypes: { title: '', items: [] },
  processing: {
    title: '',
    titleHighlight: '',
    subtitle: '',
    image: '',
    processBox: { title: '', items: [] },
    longTermBox: { title: '', paragraph: '' },
  },
  keyBenefits: { title: '', items: [], footer: '' },
  cost: { title: '', paragraph: '', factors: [], highlights: [] },
  consultation: { title: '', paragraph: '', points: [] },
  areasServed: { title: '', paragraph: '', areas: [] },
  testimonials: { title: '', items: [] },
  faq: { title: '', items: [] },
  whatToExpect: { title: '', items: [] },
  healthConnection: { 
    titleLine: '', 
    titleHighlight: '', 
    paragraph1: '', 
    paragraph2: '', 
    buttonText: '' 
  },
  cta: { 
    title: '', 
    titleHighlight: '', 
    paragraph: '', 
    buttonText: '', 
    footerText: '',
    phone: '',
    address: ''
  },
  procedureSteps: [],
};

const ToothPainTreatmentPage = () => {
    const [data, setData] = useState<ToothPainData>(EMPTY_DATA);
    const { handleOpenChatbot } = useChatbot();
  useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/cosmetic/toothpain.json";

      const LOCAL_URL = "/data/service/cosmetic/toothpain.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: ToothPainData = await res.json();
        setData(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: ToothPainData = await localRes.json();
          setData(localData);
        } catch (localError) {
          console.error("Failed to load local fallback:", localError);
        }
      }
    }

    loadData();
  }, []);

  const { 
    meta,
    hero, 
    trustBadges,
    whatIsSection, 
    whyChoose, 
    causes,
    signs,
    treatmentTypes,
    processing,
    keyBenefits,
    cost,
    consultation,
    areasServed,
    testimonials,
    faq,
    whatToExpect,
    healthConnection, 
    cta, 
    procedureSteps 
  } = data;

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>

      <div className="min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 to-white">
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  <Markdown inline>{hero.titleLine1}</Markdown> <span className="text-purple-600"><Markdown inline>{hero.titleHighlight}</Markdown></span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  <Markdown inline>{hero.paragraph}</Markdown>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                 onClick={handleOpenChatbot}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-full shadow-lg transition-all duration-300 flex items-center text-sm sm:text-base"
                >
                  {hero.buttonText} <FiArrowRight className="ml-2" />
                </motion.button>
              </motion.div>

              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-xl shadow-lg mb-4 overflow-hidden">
                  {hero.image && (
                    <Image
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      src={hero.image}
                      alt="Tooth pain treatment at Prudentia Micro Dental Care"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4 sm:p-6">
                    <p className="text-white text-sm sm:text-lg font-medium">
                      <Markdown inline>{hero.imageCaption}</Markdown>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-8 bg-purple-600 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <p className="text-lg sm:text-xl font-semibold mb-4">
                {trustBadges.title}
              </p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                {trustBadges.items.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <FiCheck className="mr-2" />
                    <span className="text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* What Is Missing Teeth Treatment Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                <Markdown inline>{whatIsSection.title}</Markdown> <span className="text-purple-600"><Markdown inline>{whatIsSection.titleHighlight}</Markdown></span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                <Markdown inline>{whatIsSection.subtitle}</Markdown>
              </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {whatIsSection.images.map((image, index) => (
                    <div key={index} className="relative h-48 sm:h-56 md:h-64 w-full rounded-xl overflow-hidden shadow-lg">
                      <Image
                        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                        src={image}
                        alt="Dental examination for tooth pain diagnosis"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <div className="col-span-1 sm:col-span-2 bg-purple-50 p-4 sm:p-6 rounded-xl border border-purple-100 mt-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-purple-800 mb-3">
                      <Markdown inline>{whatIsSection.philosophyBox.title}</Markdown>
                    </h3>
                    <ul className="space-y-2">
                      {whatIsSection.philosophyBox.items.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <FiCheck className="text-purple-600 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm sm:text-base">
                            <Markdown inline>{item}</Markdown>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-gray-50 p-6 sm:p-8 rounded-xl">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    <Markdown inline>{whatIsSection.whyMattersBox.title}</Markdown>
                  </h3>
                  <p className="text-gray-600 mb-6">
                    <Markdown inline>{whatIsSection.whyMattersBox.paragraph}</Markdown>
                  </p>
                  <div className="space-y-4">
                    {whatIsSection.whyMattersBox.items.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-purple-100 p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                          <FiCheck className="text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">
                            <Markdown inline>{item.title}</Markdown>
                          </p>
                          <p className="text-gray-600 text-sm sm:text-base">
                            <Markdown inline>{item.description}</Markdown>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full lg:w-1/2 order-2 lg:order-1">
                <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
                  {whyChoose.image && (
                    <Image
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      src={whyChoose.image}
                      alt="Why choose Prudentia for tooth pain treatment"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="w-full lg:w-1/2 order-1 lg:order-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  <Markdown inline>{whyChoose.title}</Markdown> <span className="text-purple-600"><Markdown inline>{whyChoose.titleHighlight}</Markdown></span>
                </h2>
                <p className="text-gray-600 mb-6 sm:mb-8">
                  <Markdown inline>{whyChoose.paragraph}</Markdown>
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {whyChoose.benefits.map((benefit, index) => {
                    const BenefitIcon = ICONS[benefit.icon];
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100"
                      >
                        <div className="flex items-center mb-3 sm:mb-4">
                          {BenefitIcon && <BenefitIcon className="text-2xl sm:text-3xl text-purple-600" />}
                          <p className="text-lg sm:text-xl font-semibold ml-3">
                            <Markdown inline>{benefit.title}</Markdown>
                          </p>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base">
                          <Markdown inline>{benefit.description}</Markdown>
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Causes Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
                {causes.title}
              </h2>
              <p className="text-lg text-gray-600 text-center mb-8">
                {causes.intro}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {causes.items.map((item, index) => (
                  <div key={index} className="flex items-start bg-gray-50 p-4 rounded-lg">
                    <FiCheck className="text-purple-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-600 mt-6 text-sm sm:text-base">
                {causes.footer}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Signs Section */}
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
                {signs.title}
              </h2>
              <p className="text-lg text-gray-600 text-center mb-8">
                {signs.intro}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {signs.items.map((item, index) => (
                  <div key={index} className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <FiCheck className="text-purple-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-600 mt-6 text-sm sm:text-base">
                {signs.footer}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Treatment Types */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
                {treatmentTypes.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
                {treatmentTypes.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200"
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                <Markdown inline>{processing.title}</Markdown> <span className="text-purple-600"><Markdown inline>{processing.titleHighlight}</Markdown></span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                <Markdown inline>{processing.subtitle}</Markdown>
              </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
                  {processing.image && (
                    <Image
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      src={processing.image}
                      alt="Tooth pain treatment procedure"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      className="object-cover"
                    />
                  )}
                </div>
              </motion.div>

              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-6">
                  <div className="bg-purple-50 p-4 sm:p-6 rounded-xl border border-purple-100">
                    <h3 className="text-lg sm:text-xl font-semibold text-purple-800 mb-3">
                      <Markdown inline>{processing.processBox.title}</Markdown>
                    </h3>
                    <ul className="space-y-3">
                      {processing.processBox.items.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <FiCheck className="text-purple-600 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm sm:text-base">
                            <strong><Markdown inline>{item.label}</Markdown>:</strong> <Markdown inline>{item.text}</Markdown>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-100 p-4 sm:p-6 rounded-xl">
                    <p className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                      <Markdown inline>{processing.longTermBox.title}</Markdown>
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base">
                      <Markdown inline>{processing.longTermBox.paragraph}</Markdown>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
                {keyBenefits.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {keyBenefits.items.map((item, index) => (
                  <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <FiCheck className="text-purple-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-600 mt-6 text-sm sm:text-base max-w-3xl mx-auto">
                {keyBenefits.footer}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cost Section */}
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
                {cost.title}
              </h2>
              <p className="text-gray-600 text-center mb-6">
                {cost.paragraph}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Factors Affecting Cost</h3>
                  <ul className="space-y-2">
                    {cost.factors.map((factor, index) => (
                      <li key={index} className="flex items-start">
                        <FiCheck className="text-purple-600 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">What We Offer</h3>
                  <ul className="space-y-2">
                    {cost.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <FiCheck className="text-purple-600 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Consultation Section */}
        <section className="py-12 sm:py-16 bg-purple-600 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {consultation.title}
              </h2>
              <p className="text-lg mb-6">
                {consultation.paragraph}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {consultation.points.map((point, index) => (
                  <div key={index} className="flex items-center justify-center bg-purple-500/30 rounded-lg p-3">
                    <FiCheck className="mr-2" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Areas Served */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {areasServed.title}
              </h2>
              <p className="text-gray-600 mb-6">
                {areasServed.paragraph}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {areasServed.areas.map((area, index) => (
                  <span key={index} className="bg-gray-100 px-4 py-2 rounded-full text-gray-700">
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
                {testimonials.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {testimonials.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="flex items-start">
                      <FiStar className="text-yellow-400 mr-2 flex-shrink-0 mt-1" />
                      <p className="text-gray-700 italic">"{item.quote}"</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
                {faq.title}
              </h2>
              <div className="max-w-3xl mx-auto space-y-4">
                {faq.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200"
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      {item.question}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {item.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* What To Expect */}
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
                {whatToExpect.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {whatToExpect.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheck className="text-purple-600 text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Health Connection Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-purple-600 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                  <Markdown inline>{healthConnection.titleLine}</Markdown> <span className="text-purple-200"><Markdown inline>{healthConnection.titleHighlight}</Markdown></span>
                </h2>
                <p className="text-lg sm:text-xl mb-6 sm:mb-8">
                  <Markdown inline>{healthConnection.paragraph1}</Markdown>
                </p>
                <p className="text-base sm:text-lg text-purple-200 mb-8 sm:mb-10">
                  <Markdown inline>{healthConnection.paragraph2}</Markdown>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenChatbot}
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3 px-6 sm:px-8 rounded-full shadow-lg transition-all duration-300 flex items-center mx-auto text-sm sm:text-base"
                >
                  {healthConnection.buttonText} <FiArrowRight className="ml-2" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  <Markdown inline>{cta.title}</Markdown> <span className="text-purple-600"><Markdown inline>{cta.titleHighlight}</Markdown></span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10">
                  <Markdown inline>{cta.paragraph}</Markdown>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
                  {procedureSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 text-left"
                    >
                      <div className="text-purple-600 font-bold text-xl sm:text-2xl mb-2">{index + 1}.</div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                        <Markdown inline>{step.title}</Markdown>
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        <Markdown inline>{step.description}</Markdown>
                      </p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  onClick={handleOpenChatbot}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-full shadow-lg transition-all duration-300 flex items-center text-base sm:text-lg"
                  >
                    {cta.buttonText} <FiArrowRight className="ml-2" />
                  </motion.button>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-600 text-sm">
                  <div className="flex items-center">
                    <FiPhone className="mr-2" />
                    <a href={`tel:${cta.phone}`} className="hover:text-purple-600">
                      {cta.phone}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="mr-2" />
                    <span>{cta.address}</span>
                  </div>
                </div>
                
                <p className="text-gray-500 mt-4 text-sm sm:text-base">
                  <Markdown inline>{cta.footerText}</Markdown>
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ToothPainTreatmentPage;