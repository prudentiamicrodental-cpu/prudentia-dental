"use client";
import React, { useState, useEffect } from "react";
import {
  Shield,
  Heart,
  Zap,
  CheckCircle,
  Microscope,
  Star,
  Calendar,
  Smile,
  RefreshCw,
} from "lucide-react";
import { useChatbot } from "@/components/chatbotContext";
import { Image } from "@imagekit/next";
import Markdown from '@/components/markdown';
import Head from "next/head";

interface RehabilitationGoal {
  icon: string;
  title: string;
}

interface WhyChooseFeature {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

interface FullMouthRehabilitationData {
  meta: { title: '', description: '' },
  hero: {
    title: string;
    highlightedText: string;
    subtitle: string;
    tags: string[];
    image: string;
  };
  introduction: {
    paragraph1: string;
    paragraph2: string;
    highlightedText: string;
  };
  whatIs: {
    title: string;
    image: string;
    description: string;
    goals: RehabilitationGoal[];
    consultationText: string;
    highlightedText: string;
  };
  whyEssential: {
    title: string;
    highlight: string;
    description: string;
  };
  treatments: {
    title: string;
    items: string[];
  };
  whyChoose: {
    title: string;
    image: string;
    features: WhyChooseFeature[];
  };
  cta: {
    title: string;
    image: string;
    description: string;
    callToAction: string;
    highlightedText: string;
    buttonText: string;
    buttonIcon: string;
  };
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Shield,
  Heart,
  Zap,
  CheckCircle,
  Microscope,
  Star,
  Calendar,
  Smile,
  RefreshCw,
};

export default function FullMouthRehabilitation() {
  const { handleOpenChatbot } = useChatbot();
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<FullMouthRehabilitationData | null>(null);

 useEffect(() => {
    async function loadData() {

      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/restorative/full-mouth-rehabilitation.json";

      const LOCAL_URL = "/data/service/restorative/full-mouth-rehabilitation.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: FullMouthRehabilitationData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: FullMouthRehabilitationData = await localRes.json();
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
    transform: isVisible ? "translateY(0px)" : "translateY(60px)",
    transition: "all 1s ease-out",
  };

  const staggerDelay = (index: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(60px)",
    transition: `all 1s ease-out ${index * 0.25}s`,
  });

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Head>
              <title>{content.meta.title}</title>
              <meta name="description" content={content.meta.description} />
        </Head>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-opacity-10"></div>
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div
            className="text-center space-y-10"
            style={fadeInUp}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <Markdown inline>{content.hero.title.split(content.hero.highlightedText)[0]}</Markdown>
              <br />
              at <span className="text-yellow-300"><Markdown inline>{content.hero.highlightedText}</Markdown></span>
              <br />
              <Markdown inline>{content.hero.subtitle}</Markdown>
            </h1>
            <div className="flex text-black flex-col sm:flex-row justify-center items-center gap-6 text-2xl md:text-3xl font-semibold">
              {content.hero.tags.map((tag, index) => (
                <React.Fragment key={index}>
                  <span className="bg-white bg-opacity-20 px-8 py-4 rounded-full backdrop-blur-sm border border-white/30">
                    <Markdown inline>{tag}</Markdown>
                  </span>
                  {index < content.hero.tags.length - 1 && (
                    <span className="hidden sm:block text-3xl">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="mt-16">
              <div className="bg-white bg-opacity-15 rounded-3xl p-10 backdrop-blur-sm border border-white/20 max-w-5xl mx-auto relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.hero.image}
                  alt="Full mouth rehabilitation"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Introduction */}
        <section className="mb-32">
          <div
            className="text-center max-w-6xl mx-auto"
            style={staggerDelay(1)}
          >
            <div className="bg-white rounded-3xl p-12 md:p-20 shadow-2xl border border-gray-100">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                <Markdown inline>{content.introduction.paragraph1}</Markdown>
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                <Markdown inline>{content.introduction.paragraph2.split(content.introduction.highlightedText)[0]}</Markdown>
                <span className="font-bold text-purple-600">
                  <Markdown inline>{content.introduction.highlightedText}</Markdown>
                </span>
                <Markdown inline>{content.introduction.paragraph2.split(content.introduction.highlightedText)[1]}</Markdown>
              </p>
            </div>
          </div>
        </section>

        {/* What Is Full Mouth Rehabilitation */}
        <section className="mb-32">
          <div
            className="text-center mb-20"
            style={staggerDelay(2)}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-16">
              <Markdown inline>{content.whatIs.title}</Markdown>
            </h2>

            <div className="bg-white rounded-3xl p-10 shadow-2xl inline-block mb-16 border border-gray-100 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.whatIs.image}
                alt="Full mouth rehabilitation procedure"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="bg-white rounded-3xl p-12 md:p-16 shadow-xl border border-gray-100 max-w-6xl mx-auto mb-16">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-12">
                <Markdown inline>{content.whatIs.description}</Markdown>
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {content.whatIs.goals.map((goal, index) => {
              const IconComponent = iconMap[goal.icon];
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 text-center"
                  style={staggerDelay(3 + index)}
                >
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                    {IconComponent && <IconComponent className="w-10 h-10 text-white" />}
                  </div>
                  <p className="text-lg font-semibold text-gray-800 leading-relaxed">
                    <Markdown inline>{goal.title}</Markdown>
                  </p>
                </div>
              );
            })}
          </div>

          <div
            className="bg-gradient-to-r from-purple-600 to-purple-600 rounded-3xl p-12 md:p-16 text-white text-center"
            style={staggerDelay(8)}
          >
            <p className="text-xl md:text-2xl leading-relaxed mb-8">
              <Markdown inline>{content.whatIs.consultationText.split(content.whatIs.highlightedText)[0]}</Markdown>
              <span className="font-bold"><Markdown inline>{content.whatIs.highlightedText}</Markdown></span>
              <Markdown inline>{content.whatIs.consultationText.split(content.whatIs.highlightedText)[1]}</Markdown>
            </p>
          </div>
        </section>

        {/* Why Is Restorative Dentistry Essential */}
        <section className="mb-32">
          <div
            className="bg-white rounded-3xl p-12 md:p-20 shadow-2xl border border-gray-100 text-center"
            style={staggerDelay(9)}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12">
              <Markdown inline>{content.whyEssential.title}</Markdown>
            </h2>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-10 border-l-8 border-red-500 mb-10">
              <p className="text-2xl font-bold text-gray-800 mb-6">
                <Markdown inline>{content.whyEssential.highlight}</Markdown>
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                <Markdown inline>{content.whyEssential.description}</Markdown>
              </p>
            </div>
          </div>
        </section>

        {/* Your Customized Treatment */}
        <section className="mb-32">
          <div
            className="text-center mb-20"
            style={staggerDelay(10)}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16">
              <Markdown inline>{content.treatments.title}</Markdown>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {content.treatments.items.map((treatment, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
                style={staggerDelay(11 + index)}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-lg text-gray-700 font-medium leading-relaxed">
                    <Markdown inline>{treatment}</Markdown>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Dr. Bhushan */}
        <section className="mb-32">
          <div
            className="text-center mb-20"
            style={staggerDelay(17)}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16">
              <Markdown inline>{content.whyChoose.title}</Markdown>
            </h2>

            <div className="bg-white rounded-3xl p-10 shadow-2xl inline-block mb-16 border border-gray-100 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.whyChoose.image}
                alt="Dr. Bhushan full mouth rehabilitation"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {content.whyChoose.features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon];
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 text-center"
                  style={staggerDelay(18 + index)}
                >
                  <div
                    className={`bg-gradient-to-r ${feature.gradient} w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto`}
                  >
                    {IconComponent && <IconComponent className="w-10 h-10 text-white" />}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    <Markdown inline>{feature.title}</Markdown>
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <Markdown inline>{feature.description}</Markdown>
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div
            className="bg-gradient-to-r from-purple-600 via-purple-600 to-purple-600 rounded-3xl p-12 md:p-20 text-white shadow-2xl"
            style={staggerDelay(21)}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-12">
              <Markdown inline>{content.cta.title.split("a Healthier Smile")[0]}</Markdown>
              <br />a Healthier Smile
            </h2>

            <div className="bg-white bg-opacity-15 rounded-3xl p-10 backdrop-blur-sm border border-white/20 mb-12 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.cta.image}
                alt="Full mouth rehabilitation results"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="max-w-5xl mx-auto space-y-8 mb-12">
              <p className="text-xl md:text-2xl leading-relaxed opacity-95">
                <Markdown inline>{content.cta.description}</Markdown>
              </p>

              <p className="text-lg md:text-xl leading-relaxed opacity-90">
                <Markdown inline>{content.cta.callToAction.split(content.cta.highlightedText)[0]}</Markdown>
                <span className="font-bold">
                  <Markdown inline>{content.cta.highlightedText}</Markdown>
                </span>
                <Markdown inline>{content.cta.callToAction.split(content.cta.highlightedText)[1]}</Markdown>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <button
                onClick={handleOpenChatbot}
                className="bg-purple-200 text-purple-900 px-12 py-5 rounded-full text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-4"
              >
                <Calendar className="w-7 h-7" />
                {content.cta.buttonText}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}