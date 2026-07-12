"use client";
import React, { useState, useEffect } from 'react';
import { Shield, Eye, CheckCircle, Microscope, Star, Calendar } from 'lucide-react';
import { useChatbot } from '@/components/chatbotContext';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown';
import Head from 'next/head';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface TechnologyItem {
  title: string;
  description: string;
}

interface CrownsBridgesData {
  meta: { title: '', description: '' },
  hero: {
    title: string;
    highlightedText: string;
    subtitle: string;
    tags: string[];
    image: string;
  };
  introduction: {
    text: string;
    highlightedText: string;
  };
  crowns: {
    title: string;
    description: string;
    image: string;
    features: Feature[];
    technology: {
      title: string;
      description: string;
      items: TechnologyItem[];
      highlight: string;
    };
  };
  whyChooseUs: {
    title: string;
    image: string;
    mainTitle: string;
    subtitle: string;
    features: Feature[];
    highlight: string;
  };
  bridges: {
    title: string;
    description: string;
    image: string;
    features: string[];
    closingText: string;
  };
  whyBridgesStandOut: {
    title: string;
    features: Feature[];
  };
  cta: {
    title: string;
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
  CheckCircle,
  Microscope,
  Star,
  Calendar,
};

const featureIconColors: { [key: string]: string } = {
  Shield: "from-blue-500 to-indigo-600",
  Eye: "from-purple-500 to-violet-600",
  Star: "from-yellow-500 to-orange-600",
  CheckCircle: "from-green-500 to-emerald-600",
};

export default function CrownsBridges() {
  const { handleOpenChatbot } = useChatbot();
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<CrownsBridgesData | null>(null);

 useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/restorative/crowns-bridges.json";

      const LOCAL_URL = "/data/service/restorative/crowns-bridges.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: CrownsBridgesData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: CrownsBridgesData = await localRes.json();
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
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  const fadeInUp = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(50px)',
    transition: 'all 0.9s ease-out'
  };

  const staggerDelay = (index: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(50px)',
    transition: `all 0.9s ease-out ${index * 0.2}s`
  });

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Head>
              <title>{content.meta.title}</title>
              <meta name="description" content={content.meta.description} />
        </Head>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-800 via-purple-900 to-purple-800 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div 
            className="text-center space-y-8"
            style={fadeInUp}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <Markdown inline>{content.hero.title.split(content.hero.highlightedText)[0]}</Markdown>
              <span className="text-purple-400"><Markdown inline>{content.hero.highlightedText}</Markdown></span>
              <br />
              <Markdown inline>{content.hero.subtitle}</Markdown>
            </h1>
            <div className="flex text-black flex-wrap justify-center gap-6 text-xl md:text-2xl font-semibold">
              {content.hero.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white bg-opacity-15 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20"
                >
                  <Markdown inline>{tag}</Markdown>
                </span>
              ))}
            </div>
            <div className="mt-12">
              <div className="bg-white bg-opacity-10 rounded-3xl p-8 backdrop-blur-sm border border-white/20 max-w-4xl mx-auto relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.hero.image}
                  alt="Dental crowns and bridges"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Introduction */}
        <section className="mb-28">
          <div 
            className="text-center max-w-6xl mx-auto"
            style={staggerDelay(1)}
          >
            <div className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl border border-purple-100">
              <p className="text-lg md:text-2xl text-purple-700 leading-relaxed">
                <Markdown inline>{content.introduction.text.split(content.introduction.highlightedText)[0]}</Markdown>
                <span className="font-bold text-purple-600"><Markdown inline>{content.introduction.highlightedText}</Markdown></span>
                <Markdown inline>{content.introduction.text.split(content.introduction.highlightedText)[1]}</Markdown>
              </p>
            </div>
          </div>
        </section>

        {/* What Is a Dental Crown */}
        <section className="mb-28">
          <div 
            className="text-center mb-16"
            style={staggerDelay(2)}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-purple-800 mb-12">
              <Markdown inline>{content.crowns.title}</Markdown>
            </h2>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl inline-block mb-12 border border-purple-100 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.crowns.image}
                alt="Dental crown"
                fill
                className="object-contain"
              />
            </div>
            
            <p className="text-xl text-purple-700 max-w-5xl mx-auto leading-relaxed mb-16">
              <Markdown inline>{content.crowns.description}</Markdown>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {content.crowns.features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon];
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100 hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300"
                  style={staggerDelay(3 + index)}
                >
                  <div className="bg-gradient-to-r from-purple-500 to-cyan-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                    {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="text-2xl font-bold text-purple-800 mb-4 text-center">
                    <Markdown inline>{feature.title}</Markdown>
                  </h3>
                  <p className="text-purple-700 text-center leading-relaxed">
                    <Markdown inline>{feature.description}</Markdown>
                  </p>
                </div>
              );
            })}
          </div>

          <div 
            className="bg-gradient-to-r from-slate-800 to-purple-800 rounded-3xl p-10 md:p-16 text-white"
            style={staggerDelay(6)}
          >
            <h3 className="text-3xl font-bold mb-8 text-center">
              <Markdown inline>{content.crowns.technology.title}</Markdown>
            </h3>
            <p className="text-lg leading-relaxed mb-8 text-center opacity-95">
              <Markdown inline>{content.crowns.technology.description}</Markdown>
            </p>
            
            <div className="grid md:grid-cols-3 text-black gap-6 mb-10">
              {content.crowns.technology.items.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm border border-white/20 text-center"
                >
                  <h4 className="font-bold text-xl mb-3">
                    <Markdown inline>{item.title}</Markdown>
                  </h4>
                  <p className="opacity-90">
                    <Markdown inline>{item.description}</Markdown>
                  </p>
                </div>
              ))}
            </div>
            
            <div className="bg-purple-500 bg-opacity-20 rounded-2xl p-8 border border-purple-400/30">
              <p className="text-lg text-center leading-relaxed">
                <Markdown inline>{content.crowns.technology.highlight}</Markdown>
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-28">
          <div 
            className="text-center mb-16"
            style={staggerDelay(7)}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-purple-800 mb-12">
              <Markdown inline>{content.whyChooseUs.title}</Markdown>
            </h2>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl inline-block mb-12 border border-purple-100 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.whyChooseUs.image}
                alt="Microscope guided dentistry"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div 
            className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl border border-purple-100"
            style={staggerDelay(8)}
          >
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mr-6">
                <Microscope className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-purple-800">
                <Markdown inline>{content.whyChooseUs.mainTitle}</Markdown>
              </h3>
            </div>
            
            <p className="text-xl text-purple-700 text-center mb-10">
              <Markdown inline>{content.whyChooseUs.subtitle}</Markdown>
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              {content.whyChooseUs.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon];
                const colorClass = featureIconColors[feature.icon] || "from-purple-500 to-violet-600";
                return (
                  <div key={index} className="text-center">
                    <div className={`bg-gradient-to-r ${colorClass} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                    </div>
                    <h4 className="font-bold text-lg mb-2">
                      <Markdown inline>{feature.title}</Markdown>
                    </h4>
                    <p className="text-purple-700">
                      <Markdown inline>{feature.description}</Markdown>
                    </p>
                  </div>
                );
              })}
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-cyan-50 rounded-2xl p-8 border border-purple-200">
              <p className="text-lg text-purple-700 text-center leading-relaxed">
                <Markdown inline>{content.whyChooseUs.highlight}</Markdown>
              </p>
            </div>
          </div>
        </section>

        {/* What Is a Dental Bridge */}
        <section className="mb-28">
          <div 
            className="text-center mb-16"
            style={staggerDelay(9)}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-purple-800 mb-12">
              <Markdown inline>{content.bridges.title}</Markdown>
            </h2>
            <p className="text-xl text-purple-700 max-w-5xl mx-auto leading-relaxed mb-12">
              <Markdown inline>{content.bridges.description}</Markdown>
            </p>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl inline-block mb-12 border border-purple-100 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.bridges.image}
                alt="Dental bridge"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {content.bridges.features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center"
                style={staggerDelay(10 + index)}
              >
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-purple-700 font-medium">
                  <Markdown inline>{feature}</Markdown>
                </p>
              </div>
            ))}
          </div>

          <div 
            className="text-center"
            style={staggerDelay(14)}
          >
            <p className="text-lg text-purple-700 leading-relaxed max-w-4xl mx-auto">
              <Markdown inline>{content.bridges.closingText}</Markdown>
            </p>
          </div>
        </section>

        {/* Why Our Bridges Stand Out */}
        <section className="mb-28">
          <div 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 md:p-16 text-white text-center"
            style={staggerDelay(15)}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              <Markdown inline>{content.whyBridgesStandOut.title}</Markdown>
            </h2>
            
            <div className="grid text-black md:grid-cols-3 gap-8">
              {content.whyBridgesStandOut.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon];
                return (
                  <div 
                    key={index}
                    className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm border border-white/20"
                  >
                    {IconComponent && <IconComponent className="w-12 h-12 mx-auto mb-4" />}
                    <h3 className="text-xl font-bold mb-3">
                      <Markdown inline>{feature.title}</Markdown>
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div 
            className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl border border-purple-100"
            style={staggerDelay(16)}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-8">
              <Markdown inline>{content.cta.title}</Markdown>
            </h2>
            
            <p className="text-lg md:text-xl text-purple-700 leading-relaxed mb-8 max-w-4xl mx-auto">
              <Markdown inline>{content.cta.description}</Markdown>
            </p>
            
            <p className="text-lg text-purple-700 leading-relaxed mb-12 max-w-4xl mx-auto">
              <Markdown inline>{content.cta.callToAction.split(content.cta.highlightedText)[0]}</Markdown>
              <span className="font-bold text-purple-600"><Markdown inline>{content.cta.highlightedText}</Markdown></span>
              <Markdown inline>{content.cta.callToAction.split(content.cta.highlightedText)[1]}</Markdown>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={handleOpenChatbot} 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
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