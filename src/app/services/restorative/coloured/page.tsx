"use client";
import React, { useState, useEffect } from "react";
import {
  Shield,
  Eye,
  CheckCircle,
  Star,
  Calendar,
  MapPin,
  Phone,
  ChevronDown,
  Quote,
} from "lucide-react";
import { useChatbot } from "@/components/chatbotContext";
import { Image } from "@imagekit/next";
import Markdown from "@/components/markdown";
import Head from "next/head";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface SimpleFeature {
  title: string;
  description: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
}

interface ExpectItem {
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface FillingsData {
  meta: { title: string; description: string };
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
  topRated: {
    title: string;
    description: string;
    points: string[];
    footnote: string;
  };
  whyChooseLocation: {
    title: string;
    features: SimpleFeature[];
    address: string;
  };
  whatAreFillings: {
    title: string;
    description: string;
    items: string[];
    footnote: string;
  };
  fillingTypes: {
    title: string;
    items: SimpleFeature[];
  };
  technology: {
    title: string;
    description: string;
    image: string;
    features: Feature[];
    highlight: string;
  };
  process: {
    title: string;
    steps: ProcessStep[];
    footnote: string;
  };
  benefits: {
    title: string;
    items: string[];
    footnote: string;
  };
  cost: {
    title: string;
    description: string;
    factors: string[];
    highlights: string[];
  };
  sameDayConsultation: {
    title: string;
    description: string;
    items: string[];
    footnote: string;
  };
  trustedAreas: {
    title: string;
    description: string;
    areas: string[];
    footnote: string;
  };
  testimonials: {
    title: string;
    items: Testimonial[];
    footnote: string;
  };
  whatToExpect: {
    title: string;
    items: ExpectItem[];
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  cta: {
    title: string;
    description: string;
    callToAction: string;
    highlightedText: string;
    buttonText: string;
    buttonIcon: string;
    conclusionTitle: string;
    conclusion: string;
    phone: string;
    address: string;
  };
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Shield,
  Eye,
  CheckCircle,
  Star,
  Calendar,
  MapPin,
};

const featureIconColors: { [key: string]: string } = {
  Shield: "from-blue-500 to-indigo-600",
  Eye: "from-purple-500 to-violet-600",
  Star: "from-yellow-500 to-orange-600",
  CheckCircle: "from-green-500 to-emerald-600",
};

export default function Fillings() {
  const { handleOpenChatbot } = useChatbot();
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<FillingsData | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    function isValidSchema(data: any): data is FillingsData {
      return (
        !!data &&
        typeof data === "object" &&
        !!data.meta &&
        !!data.hero &&
        !!data.introduction &&
        !!data.topRated &&
        !!data.whyChooseLocation &&
        !!data.whatAreFillings &&
        !!data.fillingTypes &&
        !!data.technology &&
        !!data.process &&
        !!data.benefits &&
        !!data.cost &&
        !!data.sameDayConsultation &&
        !!data.trustedAreas &&
        !!data.testimonials &&
        !!data.whatToExpect &&
        !!data.faq &&
        !!data.cta
      );
    }

    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/restorative/composite-fillings.json";

      const LOCAL_URL = "/data/service/restorative/composite-fillings.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: FillingsData = await res.json();

        if (!isValidSchema(data)) {
          throw new Error("GitHub JSON is stale / missing expected fields");
        }

        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: FillingsData = await localRes.json();

          if (!isValidSchema(localData)) {
            console.error("Local data missing fields:");
            throw new Error("Local JSON is stale / missing expected fields");
          }

          setContent(localData);
        } catch (localError) {
          console.error("Failed to load valid fillings data:", localError);
          setLoadError(true);
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
          {loadError ? (
            <div>
              <p className="text-gray-600 text-lg px-4 mb-4">
                We couldn't load this page's content right now. Please refresh,
                or try again shortly.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          ) : (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading...</p>
            </>
          )}
        </div>
      </div>
    );
  }

  const fadeInUp = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(50px)",
    transition: "all 0.9s ease-out",
  };

  const staggerDelay = (index: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(50px)",
    transition: `all 0.9s ease-out ${index * 0.2}s`,
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
          <div className="text-center space-y-8" style={fadeInUp}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <Markdown inline>{content.hero.title}</Markdown>{" "}
              <span className="text-purple-400">
                <Markdown inline>{content.hero.highlightedText}</Markdown>
              </span>
              ,<br />
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
              <div className="bg-white bg-opacity-10 rounded-3xl p-8 backdrop-blur-sm border border-white/20 max-w-4xl mx-auto relative h-80 md:h-96 w-full overflow-hidden shadow-lg mb-8">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.hero.image}
                  alt="Dental fillings near me in Pimple Saudagar"
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
          <div className="text-center max-w-6xl mx-auto" style={staggerDelay(1)}>
            <div className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl border border-purple-100">
              <p className="text-lg md:text-2xl text-purple-700 leading-relaxed">
                <Markdown inline>
                  {content.introduction.text.split(content.introduction.highlightedText)[0]}
                </Markdown>
                <span className="font-bold text-purple-600">
                  <Markdown inline>{content.introduction.highlightedText}</Markdown>
                </span>
                <Markdown inline>
                  {content.introduction.text.split(content.introduction.highlightedText)[1]}
                </Markdown>
              </p>
            </div>
          </div>
        </section>

        {/* Top Rated */}
        <section className="mb-28">
          <div
            className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl border border-purple-100"
            style={staggerDelay(2)}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-8 text-center">
              <Markdown inline>{content.topRated.title}</Markdown>
            </h2>
            <p className="text-lg text-purple-700 leading-relaxed mb-10 text-center max-w-3xl mx-auto">
              <Markdown inline>{content.topRated.description}</Markdown>
            </p>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
              {content.topRated.points.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 flex-shrink-0 mt-1" />
                  <p className="text-purple-700 text-lg font-medium">
                    <Markdown inline>{point}</Markdown>
                  </p>
                </div>
              ))}
            </div>
            <p className="text-purple-600 italic text-center leading-relaxed">
              <Markdown inline>{content.topRated.footnote}</Markdown>
            </p>
          </div>
        </section>

        {/* Why Choose Location */}
        <section className="mb-28">
          <div className="text-center mb-12" style={staggerDelay(3)}>
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-12">
              <Markdown inline>{content.whyChooseLocation.title}</Markdown>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {content.whyChooseLocation.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                style={staggerDelay(4 + index)}
              >
                <h3 className="text-xl font-bold text-purple-800 mb-3">
                  <Markdown inline>{feature.title}</Markdown>
                </h3>
                <p className="text-purple-700 leading-relaxed">
                  <Markdown inline>{feature.description}</Markdown>
                </p>
              </div>
            ))}
          </div>
          <div
            className="bg-gradient-to-r from-slate-800 to-purple-800 rounded-2xl p-8 text-white text-center flex flex-col sm:flex-row items-center justify-center gap-4"
            style={staggerDelay(9)}
          >
            <MapPin className="w-7 h-7 flex-shrink-0" />
            <p className="text-lg font-medium">
              <Markdown inline>{content.whyChooseLocation.address}</Markdown>
            </p>
          </div>
        </section>

        {/* What Are Dental Fillings */}
        <section className="mb-28">
          <div
            className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl border border-purple-100"
            style={staggerDelay(10)}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-8 text-center">
              <Markdown inline>{content.whatAreFillings.title}</Markdown>
            </h2>
            <p className="text-lg text-purple-700 leading-relaxed mb-10 text-center max-w-3xl mx-auto">
              <Markdown inline>{content.whatAreFillings.description}</Markdown>
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {content.whatAreFillings.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-purple-50 rounded-xl p-5 text-center text-purple-700 font-medium"
                >
                  <Markdown inline>{item}</Markdown>
                </div>
              ))}
            </div>
            <p className="text-purple-600 italic text-center leading-relaxed">
              <Markdown inline>{content.whatAreFillings.footnote}</Markdown>
            </p>
          </div>
        </section>

        {/* Filling Types */}
        <section className="mb-28">
          <div className="text-center mb-12" style={staggerDelay(11)}>
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-12">
              <Markdown inline>{content.fillingTypes.title}</Markdown>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.fillingTypes.items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-xl border border-purple-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-center"
                style={staggerDelay(12 + index)}
              >
                <h3 className="text-lg font-bold text-purple-800 mb-3">
                  <Markdown inline>{item.title}</Markdown>
                </h3>
                <p className="text-purple-700 text-sm leading-relaxed">
                  <Markdown inline>{item.description}</Markdown>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Section */}
        <section className="mb-28">
          <div className="text-center mb-16" style={staggerDelay(16)}>
            <h2 className="text-4xl md:text-6xl font-bold text-purple-800 mb-12">
              <Markdown inline>{content.technology.title}</Markdown>
            </h2>

            <div className="bg-white rounded-3xl p-8 shadow-xl inline-block mb-12 border border-purple-100 relative h-80 md:h-96 w-full overflow-hidden shadow-lg mb-8">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.technology.image}
                alt="Dental filling technology"
                fill
                className="object-contain"
              />
            </div>

            <p className="text-xl text-purple-700 max-w-5xl mx-auto leading-relaxed mb-16">
              <Markdown inline>{content.technology.description}</Markdown>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {content.technology.features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon];
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100 hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300"
                  style={staggerDelay(17 + index)}
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
            style={staggerDelay(20)}
          >
            <div className="bg-purple-500 bg-opacity-20 rounded-2xl p-8 border border-purple-400/30">
              <p className="text-lg text-center leading-relaxed">
                <Markdown inline>{content.technology.highlight}</Markdown>
              </p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="mb-28">
          <div className="text-center mb-16" style={staggerDelay(21)}>
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-12">
              <Markdown inline>{content.process.title}</Markdown>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {content.process.steps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-center"
                style={staggerDelay(22 + index)}
              >
                <div className="bg-gradient-to-r from-purple-500 to-cyan-600 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto text-white text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-purple-800 mb-3">
                  <Markdown inline>{step.title}</Markdown>
                </h3>
                <p className="text-purple-700 text-sm leading-relaxed">
                  <Markdown inline>{step.description}</Markdown>
                </p>
              </div>
            ))}
          </div>
          <p className="text-purple-600 italic text-center leading-relaxed max-w-3xl mx-auto">
            <Markdown inline>{content.process.footnote}</Markdown>
          </p>
        </section>

        {/* Benefits */}
        <section className="mb-28">
          <div className="text-center mb-12" style={staggerDelay(26)}>
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-12">
              <Markdown inline>{content.benefits.title}</Markdown>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {content.benefits.items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center"
                style={staggerDelay(27 + index)}
              >
                <Star className="w-7 h-7 text-purple-600 mx-auto mb-3" />
                <p className="text-purple-700 font-medium">
                  <Markdown inline>{item}</Markdown>
                </p>
              </div>
            ))}
          </div>
          <p className="text-purple-600 italic text-center leading-relaxed max-w-3xl mx-auto">
            <Markdown inline>{content.benefits.footnote}</Markdown>
          </p>
        </section>

        {/* Cost */}
        <section className="mb-28">
          <div
            className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl border border-purple-100"
            style={staggerDelay(31)}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-8 text-center">
              <Markdown inline>{content.cost.title}</Markdown>
            </h2>
            <p className="text-lg text-purple-700 leading-relaxed mb-10 text-center max-w-3xl mx-auto">
              <Markdown inline>{content.cost.description}</Markdown>
            </p>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl font-bold text-purple-800 mb-6">
                  Factors Affecting Cost
                </h3>
                <div className="space-y-4">
                  {content.cost.factors.map((factor, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                      <p className="text-purple-700">
                        <Markdown inline>{factor}</Markdown>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-purple-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-purple-800 mb-6">
                  What We Provide
                </h3>
                <div className="space-y-4">
                  {content.cost.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                      <p className="text-purple-700 font-medium">
                        <Markdown inline>{highlight}</Markdown>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Same Day Consultation */}
        <section className="mb-28">
          <div
            className="bg-gradient-to-r from-slate-800 to-purple-800 rounded-3xl p-10 md:p-16 text-white text-center"
            style={staggerDelay(32)}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              <Markdown inline>{content.sameDayConsultation.title}</Markdown>
            </h2>
            <p className="text-lg leading-relaxed mb-10 opacity-95 max-w-3xl mx-auto">
              <Markdown inline>{content.sameDayConsultation.description}</Markdown>
            </p>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
              {content.sameDayConsultation.items.map((item, index) => (
                <div key={index} className="flex items-start gap-3 justify-center">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <p className="font-medium">
                    <Markdown inline>{item}</Markdown>
                  </p>
                </div>
              ))}
            </div>
            <p className="opacity-90 italic leading-relaxed">
              <Markdown inline>{content.sameDayConsultation.footnote}</Markdown>
            </p>
          </div>
        </section>

        {/* Trusted Areas */}
        <section className="mb-28">
          <div className="text-center" style={staggerDelay(33)}>
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-8">
              <Markdown inline>{content.trustedAreas.title}</Markdown>
            </h2>
            <p className="text-lg text-purple-700 leading-relaxed mb-10">
              <Markdown inline>{content.trustedAreas.description}</Markdown>
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {content.trustedAreas.areas.map((area, index) => (
                <span
                  key={index}
                  className="bg-white shadow-md border border-purple-100 text-purple-700 font-semibold px-8 py-4 rounded-full text-lg"
                >
                  <Markdown inline>{area}</Markdown>
                </span>
              ))}
            </div>
            <p className="text-purple-600 italic leading-relaxed">
              <Markdown inline>{content.trustedAreas.footnote}</Markdown>
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-28">
          <div className="text-center mb-16" style={staggerDelay(34)}>
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-12">
              <Markdown inline>{content.testimonials.title}</Markdown>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {content.testimonials.items.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                style={staggerDelay(35 + index)}
              >
                <Quote className="w-9 h-9 text-purple-300 mb-4" />
                <p className="text-purple-700 leading-relaxed italic mb-6">
                  <Markdown inline>{testimonial.quote}</Markdown>
                </p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-purple-600 italic text-center leading-relaxed">
            <Markdown inline>{content.testimonials.footnote}</Markdown>
          </p>
        </section>

        {/* What to Expect */}
        <section className="mb-28">
          <div className="text-center mb-16" style={staggerDelay(38)}>
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-12">
              <Markdown inline>{content.whatToExpect.title}</Markdown>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {content.whatToExpect.items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-center"
                style={staggerDelay(39 + index)}
              >
                <h3 className="text-xl font-bold text-purple-800 mb-4">
                  <Markdown inline>{item.title}</Markdown>
                </h3>
                <p className="text-purple-700 leading-relaxed">
                  <Markdown inline>{item.description}</Markdown>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-28">
          <div className="text-center mb-16" style={staggerDelay(42)}>
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-12">
              <Markdown inline>{content.faq.title}</Markdown>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-5">
            {content.faq.items.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden"
                  style={staggerDelay(43 + index)}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 text-left px-8 py-6"
                  >
                    <span className="text-lg md:text-xl font-semibold text-purple-800">
                      <Markdown inline>{item.question}</Markdown>
                    </span>
                    <ChevronDown
                      className={`w-6 h-6 text-purple-600 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-8 pb-6">
                      <p className="text-purple-700 leading-relaxed">
                        <Markdown inline>{item.answer}</Markdown>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div
            className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl border border-purple-100"
            style={staggerDelay(50)}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-8">
              <Markdown inline>{content.cta.title}</Markdown>
            </h2>

            <p className="text-lg md:text-xl text-purple-700 leading-relaxed mb-8 max-w-4xl mx-auto">
              <Markdown inline>{content.cta.description}</Markdown>
            </p>

            <p className="text-lg text-purple-700 leading-relaxed mb-10 max-w-4xl mx-auto">
              <Markdown inline>
                {content.cta.callToAction.split(content.cta.highlightedText)[0]}
              </Markdown>
              <span className="font-bold text-purple-600">
                <Markdown inline>{content.cta.highlightedText}</Markdown>
              </span>
              <Markdown inline>
                {content.cta.callToAction.split(content.cta.highlightedText)[1]}
              </Markdown>
            </p>

            <div className="bg-gradient-to-r from-slate-800 to-purple-800 rounded-2xl p-8 text-white max-w-3xl mx-auto mb-10 text-left">
              <h3 className="text-2xl font-bold mb-4 text-center">
                <Markdown inline>{content.cta.conclusionTitle}</Markdown>
              </h3>
              <p className="leading-relaxed mb-6 opacity-95">
                <Markdown inline>{content.cta.conclusion}</Markdown>
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-lg font-medium">
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6" />
                  <a href={`tel:${content.cta.phone}`}>{content.cta.phone}</a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6" />
                  <Markdown inline>{content.cta.address}</Markdown>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleOpenChatbot}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Calendar className="w-6 h-6" />
                <Markdown inline>{content.cta.buttonText}</Markdown>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}