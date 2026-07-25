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
  MapPin,
  Phone,
  ClipboardList,
  ChevronDown,
  Quote,
  Users,
} from "lucide-react";
import { useChatbot } from "@/components/chatbotContext";
import { Image } from "@imagekit/next";
import Markdown from "@/components/markdown";
import Head from "next/head";

interface WhyChooseFeature {
  icon: string;
  title: string;
  description: string;
  gradient: string;
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
  icon: string;
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface FullMouthRehabilitationData {
  meta: { title: string; description: string };
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
  topRated: {
    title: string;
    description: string;
    points: string[];
    footnote: string;
  };
  whyChooseLocation: {
    title: string;
    image: string;
    features: WhyChooseFeature[];
    address: { line: string };
  };
  whatIs: {
    title: string;
    image: string;
    description: string;
    treatments: string[];
    consultationText: string;
    highlightedText: string;
  };
  whoCanBenefit: {
    title: string;
    description: string;
    items: string[];
    footnote: string;
  };
  process: {
    title: string;
    steps: ProcessStep[];
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
  cta: {
    title: string;
    image: string;
    description: string;
    callToAction: string;
    highlightedText: string;
    buttonText: string;
    buttonIcon: string;
    phone: string;
    address: string;
  };
  faq: {
    title: string;
    items: FaqItem[];
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
  MapPin,
  Phone,
  ClipboardList,
  Users,
};

export default function FullMouthRehabilitation() {
  const { handleOpenChatbot } = useChatbot();
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<FullMouthRehabilitationData | null>(
    null
  );
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/restorative/full-mouth-rehabilitation.json";

      const LOCAL_URL =
        "/data/service/restorative/full-mouth-rehabilitation.json";

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
          <div className="text-center space-y-10" style={fadeInUp}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <Markdown inline>{content.hero.title}</Markdown>{" "}
              <span className="text-yellow-300">
                <Markdown inline>{content.hero.highlightedText}</Markdown>
              </span>
              , <Markdown inline>{content.hero.subtitle}</Markdown>
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
                  alt="Full mouth rehabilitation near me in Pimple Saudagar"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Introduction */}
        <section className="mb-32">
          <div className="text-center max-w-6xl mx-auto" style={staggerDelay(1)}>
            <div className="bg-white rounded-3xl p-12 md:p-20 shadow-2xl border border-gray-100">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                <Markdown inline>{content.introduction.paragraph1}</Markdown>
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                <Markdown inline>
                  {
                    content.introduction.paragraph2.split(
                      content.introduction.highlightedText
                    )[0]
                  }
                </Markdown>
                <span className="font-bold text-purple-600">
                  <Markdown inline>
                    {content.introduction.highlightedText}
                  </Markdown>
                </span>
                <Markdown inline>
                  {
                    content.introduction.paragraph2.split(
                      content.introduction.highlightedText
                    )[1]
                  }
                </Markdown>
              </p>
            </div>
          </div>
        </section>

        {/* Top Rated Near You */}
        <section className="mb-32">
          <div className="text-center mb-16" style={staggerDelay(2)}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10">
              <Markdown inline>{content.topRated.title}</Markdown>
            </h2>
            <div className="bg-white rounded-3xl p-12 md:p-16 shadow-xl border border-gray-100 max-w-6xl mx-auto">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10">
                <Markdown inline>{content.topRated.description}</Markdown>
              </p>
              <div className="grid sm:grid-cols-2 gap-6 text-left mb-10">
                {content.topRated.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 flex-shrink-0 mt-1" />
                    <p className="text-lg text-gray-700 font-medium leading-relaxed">
                      <Markdown inline>{point}</Markdown>
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-lg text-gray-600 italic leading-relaxed">
                <Markdown inline>{content.topRated.footnote}</Markdown>
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Prudentia for Full Mouth Rehabilitation Near Me */}
        <section className="mb-32">
          <div className="text-center mb-20" style={staggerDelay(3)}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16">
              <Markdown inline>{content.whyChooseLocation.title}</Markdown>
            </h2>
            <div className="bg-white rounded-3xl p-10 shadow-2xl inline-block mb-16 border border-gray-100 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.whyChooseLocation.image}
                alt="Prudentia Micro Dental Care clinic"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {content.whyChooseLocation.features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon];
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 text-center"
                  style={staggerDelay(4 + index)}
                >
                  <div
                    className={`bg-gradient-to-r ${feature.gradient} w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto`}
                  >
                    {IconComponent && (
                      <IconComponent className="w-10 h-10 text-white" />
                    )}
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

          <div
            className="bg-gradient-to-r from-purple-600 to-purple-600 rounded-3xl p-10 md:p-12 text-white text-center flex flex-col sm:flex-row items-center justify-center gap-4"
            style={staggerDelay(9)}
          >
            <MapPin className="w-8 h-8 flex-shrink-0" />
            <p className="text-lg md:text-xl font-medium leading-relaxed">
              <Markdown inline>{content.whyChooseLocation.address.line}</Markdown>
            </p>
          </div>
        </section>

        {/* What Is Full Mouth Rehabilitation */}
        <section className="mb-32">
          <div className="text-center mb-20" style={staggerDelay(10)}>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-16">
              <Markdown inline>{content.whatIs.title}</Markdown>
            </h2>

            <div className="bg-white rounded-3xl p-10 shadow-2xl inline-block mb-16 border border-gray-100 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
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
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                <Markdown inline>{content.whatIs.description}</Markdown>
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {content.whatIs.treatments.map((treatment, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center"
                style={staggerDelay(11 + index)}
              >
                <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <p className="text-lg font-semibold text-gray-800">
                  <Markdown inline>{treatment}</Markdown>
                </p>
              </div>
            ))}
          </div>

          <div
            className="bg-gradient-to-r from-purple-600 to-purple-600 rounded-3xl p-12 md:p-16 text-white text-center"
            style={staggerDelay(19)}
          >
            <p className="text-xl md:text-2xl leading-relaxed">
              <Markdown inline>
                {
                  content.whatIs.consultationText.split(
                    content.whatIs.highlightedText
                  )[0]
                }
              </Markdown>
              <span className="font-bold">
                <Markdown inline>{content.whatIs.highlightedText}</Markdown>
              </span>
              <Markdown inline>
                {
                  content.whatIs.consultationText.split(
                    content.whatIs.highlightedText
                  )[1]
                }
              </Markdown>
            </p>
          </div>
        </section>

        {/* Who Can Benefit */}
        <section className="mb-32">
          <div
            className="bg-white rounded-3xl p-12 md:p-20 shadow-2xl border border-gray-100"
            style={staggerDelay(20)}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">
              <Markdown inline>{content.whoCanBenefit.title}</Markdown>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 text-center">
              <Markdown inline>{content.whoCanBenefit.description}</Markdown>
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {content.whoCanBenefit.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 bg-purple-50 rounded-2xl p-6"
                >
                  <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <p className="text-lg text-gray-700 font-medium leading-relaxed">
                    <Markdown inline>{item}</Markdown>
                  </p>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-600 italic leading-relaxed text-center">
              <Markdown inline>{content.whoCanBenefit.footnote}</Markdown>
            </p>
          </div>
        </section>

        {/* Step-by-Step Process */}
        <section className="mb-32">
          <div className="text-center mb-20" style={staggerDelay(21)}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16">
              <Markdown inline>{content.process.title}</Markdown>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {content.process.steps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center"
                style={staggerDelay(22 + index)}
              >
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto text-white text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  <Markdown inline>{step.title}</Markdown>
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  <Markdown inline>{step.description}</Markdown>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-32">
          <div className="text-center mb-16" style={staggerDelay(27)}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16">
              <Markdown inline>{content.benefits.title}</Markdown>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
            {content.benefits.items.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center"
                style={staggerDelay(28 + index)}
              >
                <Zap className="w-7 h-7 text-purple-600 mx-auto mb-3" />
                <p className="text-base font-semibold text-gray-800">
                  <Markdown inline>{benefit}</Markdown>
                </p>
              </div>
            ))}
          </div>
          <p className="text-lg md:text-xl text-gray-600 italic text-center leading-relaxed">
            <Markdown inline>{content.benefits.footnote}</Markdown>
          </p>
        </section>

        {/* Cost */}
        <section className="mb-32">
          <div
            className="bg-white rounded-3xl p-12 md:p-20 shadow-2xl border border-gray-100"
            style={staggerDelay(38)}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">
              <Markdown inline>{content.cost.title}</Markdown>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 text-center">
              <Markdown inline>{content.cost.description}</Markdown>
            </p>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-6">
                  Factors Affecting Cost
                </h4>
                <div className="space-y-4">
                  {content.cost.factors.map((factor, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                      <p className="text-lg text-gray-700">
                        <Markdown inline>{factor}</Markdown>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-purple-50 rounded-2xl p-8">
                <h4 className="text-xl font-bold text-gray-800 mb-6">
                  What We Provide
                </h4>
                <div className="space-y-4">
                  {content.cost.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                      <p className="text-lg text-gray-700 font-medium">
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
        <section className="mb-32">
          <div
            className="bg-gradient-to-r from-purple-600 to-purple-600 rounded-3xl p-12 md:p-20 text-white text-center"
            style={staggerDelay(43)}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <Markdown inline>{content.sameDayConsultation.title}</Markdown>
            </h2>
            <p className="text-lg md:text-xl leading-relaxed mb-10 opacity-95">
              <Markdown inline>{content.sameDayConsultation.description}</Markdown>
            </p>
            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto text-left mb-10">
              {content.sameDayConsultation.items.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <p className="text-lg font-medium leading-relaxed">
                    <Markdown inline>{item}</Markdown>
                  </p>
                </div>
              ))}
            </div>
            <p className="text-lg opacity-90 italic leading-relaxed">
              <Markdown inline>{content.sameDayConsultation.footnote}</Markdown>
            </p>
          </div>
        </section>

        {/* Trusted Areas */}
        <section className="mb-32">
          <div className="text-center" style={staggerDelay(44)}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              <Markdown inline>{content.trustedAreas.title}</Markdown>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10">
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
            <p className="text-lg text-gray-600 italic leading-relaxed">
              <Markdown inline>{content.trustedAreas.footnote}</Markdown>
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-32">
          <div className="text-center mb-16" style={staggerDelay(45)}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16">
              <Markdown inline>{content.testimonials.title}</Markdown>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {content.testimonials.items.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
                style={staggerDelay(46 + index)}
              >
                <Quote className="w-10 h-10 text-purple-300 mb-4" />
                <p className="text-lg text-gray-700 leading-relaxed italic mb-6">
                  <Markdown inline>{testimonial.quote}</Markdown>
                </p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-600 italic text-center leading-relaxed">
            <Markdown inline>{content.testimonials.footnote}</Markdown>
          </p>
        </section>

        {/* What to Expect */}
        <section className="mb-32">
          <div className="text-center mb-20" style={staggerDelay(49)}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16">
              <Markdown inline>{content.whatToExpect.title}</Markdown>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.whatToExpect.items.map((item, index) => {
              const IconComponent = iconMap[item.icon];
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center"
                  style={staggerDelay(50 + index)}
                >
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                    {IconComponent && (
                      <IconComponent className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    <Markdown inline>{item.title}</Markdown>
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    <Markdown inline>{item.description}</Markdown>
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-32">
          <div className="text-center mb-16" style={staggerDelay(54)}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16">
              <Markdown inline>{content.faq.title}</Markdown>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-5">
            {content.faq.items.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                  style={staggerDelay(55 + index)}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 text-left px-8 py-6"
                  >
                    <span className="text-lg md:text-xl font-semibold text-gray-800">
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
                      <p className="text-lg text-gray-700 leading-relaxed">
                        <Markdown inline>{item.answer}</Markdown>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA / Conclusion Section */}
        <section className="text-center">
          <div
            className="bg-gradient-to-r from-purple-600 via-purple-600 to-purple-600 rounded-3xl p-12 md:p-20 text-white shadow-2xl"
            style={staggerDelay(62)}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-12">
              <Markdown inline>{content.cta.title}</Markdown>
            </h2>

            <div className="bg-white bg-opacity-15 rounded-3xl p-10 backdrop-blur-sm border border-white/20 mb-12 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
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
                <Markdown inline>
                  {content.cta.callToAction.split(content.cta.highlightedText)[0]}
                </Markdown>
                <span className="font-bold">
                  <Markdown inline>{content.cta.highlightedText}</Markdown>
                </span>
                <Markdown inline>
                  {content.cta.callToAction.split(content.cta.highlightedText)[1]}
                </Markdown>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4 text-lg font-medium">
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6" />
                  <a href={`tel:${content.cta.phone}`}>{content.cta.phone}</a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6" />
                  <span>{content.cta.address}</span>
                </div>
              </div>
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