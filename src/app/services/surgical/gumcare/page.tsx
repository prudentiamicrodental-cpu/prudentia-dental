"use client"
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Heart, CheckCircle, Activity, Stethoscope, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
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
};

const renderIcon = (name: string, className: string) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
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

interface WarningData {
  title: string;
  paragraph: string;
}

interface SymptomsData {
  title: string;
  image: string;
  items: FeatureItem[];
  warning: WarningData;
}

interface TreatmentApproachData {
  title: string;
  images: string[];
  paragraph: string;
  treatments: FeatureItem[];
}

interface WhyVisitsData {
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
}

interface GumDiseaseData {
  meta: MetaData;
  hero: HeroData;
  intro: IntroData;
  symptoms: SymptomsData;
  treatmentApproach: TreatmentApproachData;
  whyVisits: WhyVisitsData;
  finalCta: FinalCtaData;
}

const EMPTY_DATA: GumDiseaseData = {
  meta: { title: '', description: '' },
  hero: { titleLine1: '', titleHighlight: '', image: '' },
  intro: { paragraph: '' },
  symptoms: { title: '', image: '', items: [], warning: { title: '', paragraph: '' } },
  treatmentApproach: { title: '', images: [], paragraph: '', treatments: [] },
  whyVisits: { image: '', badges: [], title: '', paragraphs: [], cards: [] },
  finalCta: { titleLine: '', titleHighlight: '', paragraph: '', buttonText: '', footerText: '' },
};

const GumDiseaseTherapyPage = () => {
  const { handleOpenChatbot } = useChatbot();
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [data, setData] = useState<GumDiseaseData>(EMPTY_DATA);

 useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/surgical/gumDisease.json";

      const LOCAL_URL = "/data/service/surgical/gumDisease.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: GumDiseaseData = await res.json();
        setData(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: GumDiseaseData = await localRes.json();
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
            <div 
              id="hero-content"
              data-animate
              style={slideInLeft('hero-content')}
            >
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
            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
              <Markdown inline>{data.intro.paragraph}</Markdown>
            </p>
          </div>
        </div>
      </section>

      {/* Signs and Symptoms Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div 
              className="text-center mb-16"
              id="symptoms-title"
              data-animate
              style={fadeInUp('symptoms-title')}
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-8">
                <Markdown inline>{data.symptoms.title}</Markdown>
              </h2>
              {data.symptoms.image && (
                <div className="max-w-3xl mx-auto mb-12 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={data.symptoms.image}
                    alt="Modern denture solutions"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {data.symptoms.items.map((symptom, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg border-2 ${symptom.color} p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                  id={`symptom-${index}`}
                  data-animate
                  style={index % 2 === 0 ? slideInLeft(`symptom-${index}`) : slideInRight(`symptom-${index}`)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-white p-3 rounded-xl shadow-md flex-shrink-0">
                      {renderIcon(symptom.icon, `w-8 h-8 ${symptom.iconColor}`)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        <Markdown inline>{symptom.title}</Markdown>
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        <Markdown inline>{symptom.description}</Markdown>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div 
              className="bg-gradient-to-r from-yellow-50 to-red-50 border-2 border-yellow-300 rounded-2xl p-8"
              id="symptoms-warning"
              data-animate
              style={fadeInUp('symptoms-warning')}
            >
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-100 p-3 rounded-xl">
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    <Markdown inline>{data.symptoms.warning.title}</Markdown>
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <Markdown inline>{data.symptoms.warning.paragraph}</Markdown>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Approach Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div 
              className="text-center mb-16"
              id="treatment-title"
              data-animate
              style={fadeInUp('treatment-title')}
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-8">
                <Markdown inline>{data.treatmentApproach.title}</Markdown>
              </h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12 ">
                {data.treatmentApproach.images.map((image, index) => (
                  <div key={index} className='relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8'>
                    <Image
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      src={image}
                      alt="Modern denture solutions"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                ))}
              </div>
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                <Markdown inline>{data.treatmentApproach.paragraph}</Markdown>
              </p>
            </div>

            <div className="space-y-8">
              {data.treatmentApproach.treatments.map((treatment, index) => (
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

      {/* Why Regular Visits Matter Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div 
                className="flex justify-center order-2 lg:order-1"
                id="visits-image"
                data-animate
                style={slideInLeft('visits-image')}
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                  {data.whyVisits.image && (
                    <Image
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      src={data.whyVisits.image}
                      alt="Modern denture solutions"
                      fill
                      className="object-contain"
                      priority
                    />
                  )}
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex justify-center space-x-4">
                      {data.whyVisits.badges.map((badge, index) => (
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
              <div 
                className="order-1 lg:order-2"
                id="visits-content"
                data-animate
                style={slideInRight('visits-content')}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
                  <Markdown inline>{data.whyVisits.title}</Markdown>
                </h2>
                {data.whyVisits.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={index < data.whyVisits.paragraphs.length - 1 ? "text-lg lg:text-xl text-gray-700 leading-relaxed mb-6" : "text-lg lg:text-xl text-gray-700 leading-relaxed"}
                  >
                    <Markdown inline>{paragraph}</Markdown>
                  </p>
                ))}
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  {data.whyVisits.cards.map((card, index) => (
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

export default GumDiseaseTherapyPage;