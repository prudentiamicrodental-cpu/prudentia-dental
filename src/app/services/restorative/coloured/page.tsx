"use client";
import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Calendar,
  Smile,
  Shield,
  Clock,
  Star,
} from "lucide-react";
import { useChatbot } from "@/components/chatbotContext";
import { Image } from "@imagekit/next";
import Markdown from '@/components/markdown';
import Head from "next/head";



interface Feature {
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface ProcedureStep {
  step: string;
  title: string;
  description: string;
}

interface AftercareTip {
  title: string;
  description: string;
}

interface CompositeFillingsData {
  meta: { title: '', description: '' },
  hero: {
    title: string;
    subtitle: string;
    tags: string[];
    image: string;
  };
  introduction: {
    text: string;
    highlightedText: string;
  };
  whatAreCompositeFillings: {
    title: string;
    description: string;
    image: string;
    features: Feature[];
  };
  recommendations: {
    title: string;
    subtitle: string;
    items: string[];
    image: string;
  };
  procedure: {
    title: string;
    subtitle: string;
    image: string;
    steps: ProcedureStep[];
  };
  aftercare: {
    title: string;
    subtitle: string;
    tips: AftercareTip[];
    closingText: string;
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
  Smile,
  Clock,
  Star,
};

export default function CompositeFillings() {
  const { handleOpenChatbot } = useChatbot();
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<CompositeFillingsData | null>(null);

 useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/restorative/composite-fillings.json";

      const LOCAL_URL = "/data/service/restorative/coloured.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: CompositeFillingsData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: CompositeFillingsData = await localRes.json();
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
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-50 via-white to-teal-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  const fadeInUp = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(30px)",
    transition: "all 0.6s ease-out",
  };

  const staggerDelay = (index: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(30px)",
    transition: `all 0.6s ease-out ${index * 0.1}s`,
  });

  return (
    <div className="min-h-screen overflow-hidden py-5 bg-gradient-to-br from-purple-50 via-white to-teal-50">
        <Head>
              <title>{content.meta.title}</title>
              <meta name="description" content={content.meta.description} />
        </Head>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="absolute inset-0 bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div
            className="text-center space-y-6"
            style={ fadeInUp}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <Markdown inline>{content.hero.title}</Markdown>
              <br />
              <span className="text-yellow-300"><Markdown inline>{content.hero.subtitle}</Markdown></span>
              <br />
              Composite Fillings
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-lg text-black md:text-xl font-medium">
              {content.hero.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm"
                >
                  <Markdown inline>{tag}</Markdown>
                </span>
              ))}
            </div>
            <div className="mt-8 bg-white bg-opacity-90 rounded-2xl p-6 max-w-2xl mx-auto relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.hero.image}
                alt="Composite fillings hero image"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <section className="mb-20">
          <div
            className="text-center mb-12"
            style={staggerDelay(1) }
          >
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              <Markdown inline>{content.introduction.text.split(content.introduction.highlightedText)[0]}</Markdown>
              <span className="font-semibold text-purple-600">
                <Markdown inline>{content.introduction.highlightedText}</Markdown>
              </span>
              <Markdown inline>{content.introduction.text.split(content.introduction.highlightedText)[1]}</Markdown>
            </p>
          </div>
        </section>

        {/* What Are Composite Fillings */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6" style={staggerDelay(2)}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                <Markdown inline>{content.whatAreCompositeFillings.title}</Markdown>
              </h2>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={content.whatAreCompositeFillings.image}
                    alt="Composite filling procedure"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  <Markdown inline>{content.whatAreCompositeFillings.description}</Markdown>
                </p>
              </div>
            </div>
            <div
              className="grid grid-cols-2 gap-4"
              style={staggerDelay(3) }
            >
              {content.whatAreCompositeFillings.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon];
                const colorClasses = {
                  blue: "from-blue-500 to-blue-600",
                  teal: "from-teal-500 to-teal-600",
                  purple: "from-purple-500 to-purple-600",
                  orange: "from-orange-500 to-orange-600",
                };
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${colorClasses[feature.color as keyof typeof colorClasses]} text-white p-6 rounded-2xl text-center transform hover:scale-105 transition-transform duration-300`}
                  >
                    {IconComponent && <IconComponent className="w-12 h-12 mx-auto mb-4" />}
                    <h3 className="font-semibold text-lg">
                      <Markdown inline>{feature.title}</Markdown>
                    </h3>
                    <p className="text-sm opacity-90">
                      <Markdown inline>{feature.description}</Markdown>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* When Are Composite Fillings Recommended */}
        <section className="mb-20">
          <div
            className="text-center mb-12"
            style={staggerDelay(4)}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              <Markdown inline>{content.recommendations.title}</Markdown>
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              <Markdown inline>{content.recommendations.subtitle}</Markdown>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {content.recommendations.items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={ staggerDelay(5 + index) }
              >
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 font-medium">
                    <Markdown inline>{item}</Markdown>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div
            className="text-center"
            style={ staggerDelay(10)}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg inline-block relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.recommendations.image}
                alt="Composite fillings recommendations"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* Procedure Section */}
        <section className="mb-20">
          <div
            className="text-center mb-12"
            style={ staggerDelay(11) }
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              <Markdown inline>{content.procedure.title}</Markdown>
            </h2>
            <p className="text-xl text-gray-700">
              <Markdown inline>{content.procedure.subtitle}</Markdown>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div
              className="space-y-6"
              style={staggerDelay(12) }
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.procedure.image}
                  alt="Composite filling procedure steps"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="space-y-6">
              {content.procedure.steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300"
                  style={staggerDelay(13 + index) }
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        <Markdown inline>{step.title}</Markdown>
                      </h3>
                      <p className="text-gray-700">
                        <Markdown inline>{step.description}</Markdown>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Aftercare Section */}
        <section className="mb-20">
          <div
            className="bg-gradient-to-r from-purple-600 to-teal-600 rounded-3xl p-8 md:p-12 text-white"
            style={ staggerDelay(17) }
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              <Markdown inline>{content.aftercare.title}</Markdown>
            </h2>
            <p className="text-xl text-center mb-8 opacity-90">
              <Markdown inline>{content.aftercare.subtitle}</Markdown>
            </p>

            <div className="grid md:grid-cols-3 text-black gap-6 mb-8">
              {content.aftercare.tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm"
                >
                  <h3 className="font-semibold text-lg mb-3">
                    <Markdown inline>{tip.title}</Markdown>
                  </h3>
                  <p className="opacity-90">
                    <Markdown inline>{tip.description}</Markdown>
                  </p>
                </div>
              ))}
            </div>

            <p className="text-center text-lg opacity-90">
              <Markdown inline>{content.aftercare.closingText}</Markdown>
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
            style={staggerDelay(18) }
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              <Markdown inline>{content.cta.title}</Markdown>
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              <Markdown inline>{content.cta.description}</Markdown>
            </p>
            <p className="text-lg text-gray-700 mb-8">
              <Markdown inline>{content.cta.callToAction.split(content.cta.highlightedText)[0]}</Markdown>
              <span className="font-semibold text-purple-600">
                <Markdown inline>{content.cta.highlightedText}</Markdown>
              </span>
              <Markdown inline>{content.cta.callToAction.split(content.cta.highlightedText)[1]}</Markdown>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleOpenChatbot}
                className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                {content.cta.buttonText}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}