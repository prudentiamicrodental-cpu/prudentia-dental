"use client"
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Heart, CheckCircle, Clock, Stethoscope, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChatbot } from '@/components/chatbotContext';
import { FiArrowRight } from 'react-icons/fi';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown';
import Head from 'next/head';

const iconMap: { [key: string]: LucideIcon } = {
  AlertTriangle,
  Shield,
  Heart,
  CheckCircle,
  Clock,
  Stethoscope,
};
interface MetaData{
  title: string;
  description: string 
};

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  color: string;
}

interface HeroData {
  titleLine1: string;
  titleHighlight: string;
  paragraph: string;
}

interface ProblemsData {
  title: string;
  image: string;
  items: FeatureItem[];
  conclusion: string;
}

interface ExtractionData {
  title: string;
  paragraph: string;
  expectText: string;
  image: string;
  steps: FeatureItem[];
}

interface CtaBoxData {
  title: string;
  paragraph: string;
  badges: string[];
}

interface DecisionData {
  title: string;
  paragraph: string;
  ctaBox: CtaBoxData;
  image: string;
  imageCaption: string;
}

interface FinalCtaData {
  titleLine: string;
  titleHighlight: string;
  paragraph: string;
  buttonText: string;
  footerText: string;
}

interface WisdomData {
  meta: MetaData;
  hero: HeroData;
  problems: ProblemsData;
  extraction: ExtractionData;
  decision: DecisionData;
  finalCta: FinalCtaData;
}

const EMPTY_DATA: WisdomData = {
  meta: { title: '', description: '' },
  hero: { titleLine1: '', titleHighlight: '', paragraph: '' },
  problems: { title: '', image: '', items: [], conclusion: '' },
  extraction: { title: '', paragraph: '', expectText: '', image: '', steps: [] },
  decision: {
    title: '',
    paragraph: '',
    ctaBox: { title: '', paragraph: '', badges: [] },
    image: '',
    imageCaption: '',
  },
  finalCta: { titleLine: '', titleHighlight: '', paragraph: '', buttonText: '', footerText: '' },
};

const renderIcon = (name: string, className: string) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

const WisdomTeethExtractionPage = () => {
  const { handleOpenChatbot } = useChatbot();
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [data, setData] = useState<WisdomData>(EMPTY_DATA);

 useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/surgical/wisdom.json";

      const LOCAL_URL = "/data/service/surgical/wisdom.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: WisdomData = await res.json();
        setData(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: WisdomData = await localRes.json();
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
    <div className="min-h-screen bg-gradient-to-br overflow-hidden from-purple-500 via-white to-purple-50">
       <Head>
        <title>{data.meta.title}</title>
        <meta name="description" content={data.meta.description} />
      </Head>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-700 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div 
            className="text-center max-w-5xl mx-auto"
            id="hero"
            data-animate
            style={fadeInUp('hero')}
          >
            <div className="flex justify-center mb-8">
              <div className="bg-white bg-opacity-20 p-6 rounded-full backdrop-blur-sm">
                <Shield className="w-16 h-16 text-black" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
              <Markdown inline>{data.hero.titleLine1}</Markdown><br />
              <span className="text-yellow-300"><Markdown inline>{data.hero.titleHighlight}</Markdown></span>
            </h1>
            <p className="text-lg lg:text-xl mb-8 opacity-90 max-w-4xl mx-auto leading-relaxed">
              <Markdown inline>{data.hero.paragraph}</Markdown>
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Common Problems Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div 
              className="text-center mb-16"
              id="problems-title"
              data-animate
              style={fadeInUp('problems-title')}
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-8">
                <Markdown inline>{data.problems.title}</Markdown>
              </h2>
              {data.problems.image && (
                <div className="max-w-3xl mx-auto mb-12 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={data.problems.image}
                    alt="Modern denture solutions"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {data.problems.items.map((problem, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg border-2 ${problem.color} p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
                  id={`problem-${index}`}
                  data-animate
                  style={index % 2 === 0 ? slideInLeft(`problem-${index}`) : slideInRight(`problem-${index}`)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-white p-3 rounded-xl shadow-md flex-shrink-0">
                      {renderIcon(problem.icon, `w-8 h-8 ${problem.iconColor}`)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        <Markdown inline>{problem.title}</Markdown>
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        <Markdown inline>{problem.description}</Markdown>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div 
              className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 text-center"
              id="problems-conclusion"
              data-animate
              style={fadeInUp('problems-conclusion')}
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                <Markdown inline>{data.problems.conclusion}</Markdown>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Your Extraction Experience Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div 
              className="text-center mb-16"
              id="extraction-title"
              data-animate
              style={fadeInUp('extraction-title')}
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-8">
                <Markdown inline>{data.extraction.title}</Markdown>
              </h2>
              <p className="text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
                <Markdown inline>{data.extraction.paragraph}</Markdown>
              </p>
              <p className="text-xl font-semibold text-gray-800 mb-8">
                <Markdown inline>{data.extraction.expectText}</Markdown>
              </p>
              {data.extraction.image && (
                <div className="max-w-3xl mx-auto mb-12 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={data.extraction.image}
                    alt="Modern denture solutions"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </div>

            <div className="space-y-8">
              {data.extraction.steps.map((step, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                  id={`care-step-${index}`}
                  data-animate
                  style={index % 2 === 0 ? slideInLeft(`care-step-${index}`) : slideInRight(`care-step-${index}`)}
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                    <div className={`${step.color} p-4 rounded-xl shadow-md flex-shrink-0`}>
                      {renderIcon(step.icon, `w-8 h-8 ${step.iconColor}`)}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        <Markdown inline>{step.title}</Markdown>
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

      {/* Making the Right Decision Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div 
                id="decision-content"
                data-animate
                style={slideInLeft('decision-content')}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
                  <Markdown inline>{data.decision.title}</Markdown>
                </h2>
                <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8">
                  <Markdown inline>{data.decision.paragraph}</Markdown>
                </p>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl">
                  <h3 className="text-2xl font-bold mb-4">
                    <Markdown inline>{data.decision.ctaBox.title}</Markdown>
                  </h3>
                  <p className="text-lg opacity-90 mb-6">
                    <Markdown inline>{data.decision.ctaBox.paragraph}</Markdown>
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {data.decision.ctaBox.badges.map((badge, index) => (
                      <div key={index} className="bg-indigo-900 bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                        <span className="text-sm font-medium">
                          <Markdown inline>{badge}</Markdown>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div 
                className="flex justify-center"
                id="decision-image"
                data-animate
                style={slideInRight('decision-image')}
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                  {data.decision.image && (
                    <Image
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      src={data.decision.image}
                      alt="Modern denture solutions"
                      fill
                      className="object-contain"
                      priority
                    />
                  )}
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                    <p className="text-lg text-gray-700 font-medium text-center">
                      <Markdown inline>{data.decision.imageCaption}</Markdown>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default WisdomTeethExtractionPage;