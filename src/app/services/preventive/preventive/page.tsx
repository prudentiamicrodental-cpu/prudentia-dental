"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, Smile, Users, Award, Phone, CheckCircle, MapPin, Calendar } from "lucide-react";
import { useChatbot } from "@/components/chatbotContext";
import { Image } from "@imagekit/next";
import Markdown from '@/components/markdown';
import Head from "next/head";

type VisibilityState = {
  [key: string]: boolean;
};

interface MetaData{
  title: string;
  description: string 
};


interface Guideline {
  number: string;
  title: string;
  gradient: string;
  image: string | null;
  paragraphs: string[];
}

interface HeroData {
  title: string;
  subtitle: string;
  image: string;
}

interface IntroData {
  title: string;
  paragraphs: string[];
}

interface GuidelinesHeaderData {
  title: string;
  image: string;
}

interface WhyMattersData {
  title: string;
  image: string;
  paragraph: string;
}

interface PersonalizedData {
  title: string;
  image: string;
  paragraph: string;
}

interface ProcessStep {
  title: string;
  description: string;
}

interface ProcessData {
  title: string;
  steps: ProcessStep[];
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

interface WhatToExpectItem {
  icon: string;
  title: string;
  description: string;
}

interface WhatToExpectData {
  title: string;
  items: WhatToExpectItem[];
}

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqData {
  title: string;
  items: FaqItem[];
}

interface ConclusionData {
  title: string;
  paragraph1: string;
  paragraph2: string;
  phone: string;
  address: string;
}

interface CtaData {
  title: string;
  paragraph: string;
  buttonText: string;
}

interface OralData {
  meta: MetaData;
  hero: HeroData;
  intro: IntroData;
  guidelinesHeader: GuidelinesHeaderData;
  guidelines: Guideline[];
  whyMatters: WhyMattersData;
  personalized: PersonalizedData;
  process: ProcessData;
  benefits: BenefitsData;
  cost: CostData;
  consultation: ConsultationData;
  areasServed: AreasServedData;
  testimonials: TestimonialsData;
  whatToExpect: WhatToExpectData;
  conclusion: ConclusionData;
  faq: FaqData;
  cta: CtaData;
}

const EMPTY_DATA: OralData = {
  meta: { title: '', description: '' },
  hero: { title: "", subtitle: "", image: "" },
  intro: { title: "", paragraphs: [] },
  guidelinesHeader: { title: "", image: "" },
  guidelines: [],
  whyMatters: { title: "", image: "", paragraph: "" },
  personalized: { title: "", image: "", paragraph: "" },
  process: { title: "", steps: [] },
  benefits: { title: "", items: [], footer: "" },
  cost: { title: "", paragraph: "", factors: [], highlights: [] },
  consultation: { title: "", paragraph: "", points: [] },
  areasServed: { title: "", paragraph: "", areas: [] },
  testimonials: { title: "", items: [] },
  whatToExpect: { title: "", items: [] },
  conclusion: { title: "", paragraph1: "", paragraph2: "", phone: "", address: "" },
  faq: { title: "", items: [] },
  cta: { title: "", paragraph: "", buttonText: "" },
};

export default function PreventiveDentistryPage() {
  const { handleOpenChatbot } = useChatbot();
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const [data, setData] = useState<OralData>(EMPTY_DATA);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

 useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/preventive/preventive.json";

      const LOCAL_URL = "/data/service/preventive/preventive.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: OralData = await res.json();
        setData(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: OralData = await localRes.json();
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
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[id^="section-"]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [data]);

  const fadeInUp = (sectionId: string) => ({
    opacity: isVisible[sectionId] ? 1 : 0,
    transform: isVisible[sectionId] ? "translateY(0)" : "translateY(30px)",
    transition: "all 0.6s ease-out",
  });

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <Head>
              <title>{data.meta.title}</title>
              <meta name="description" content={data.meta.description} />
        </Head>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div
            id="section-hero"
            className="text-center transform transition-all duration-1000"
            style={fadeInUp("section-hero")}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <Markdown inline>{data.hero.title}</Markdown>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              <Markdown inline>{data.hero.subtitle}</Markdown>
            </p>

            {data.hero.image && (
              <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-white bg-opacity-20 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8 rounded-2xl p-8 backdrop-blur-sm border border-white border-opacity-30">
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={data.hero.image}
                    alt="Preventive dentistry near me"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white opacity-70" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div
          id="section-intro"
          className="mb-16 transform transition-all duration-700 delay-200"
          style={fadeInUp("section-intro")}
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-8">
              <Smile className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                <Markdown inline>{data.intro.title}</Markdown>
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {data.intro.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={index === 0 ? "text-lg md:text-xl mb-6" : "text-lg md:text-xl"}
                >
                  <Markdown inline>{paragraph}</Markdown>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* General Guidelines Header */}
        <div
          id="section-guidelines-header"
          className="mb-12 transform transition-all duration-700 delay-300"
          style={fadeInUp("section-guidelines-header")}
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              <Markdown inline>{data.guidelinesHeader.title}</Markdown>
            </h2>

            {data.guidelinesHeader.image && (
              <div className="max-w-2xl  relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8 mx-auto">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={data.guidelinesHeader.image}
                  alt="Preventive dentistry services near me"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}
          </div>
        </div>

        {/* Guidelines List */}
        <div className="space-y-8 mb-16">
          {data.guidelines.map((guideline) => (
            <div
              key={guideline.number}
              id={`section-guideline-${guideline.number}`}
              className="transform transition-all duration-700"
              style={fadeInUp(`section-guideline-${guideline.number}`)}
            >
              <div className={`bg-gradient-to-r ${guideline.gradient} rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {guideline.number}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                    <Markdown inline>{guideline.title}</Markdown>
                  </h3>
                </div>

                {guideline.image && (
                  <div className="ml-16 mb-6 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
                    <Image
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      src={guideline.image}
                      alt="Preventive dentistry service"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                )}

                <div className="ml-16 space-y-3 text-gray-700">
                  {guideline.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-lg">
                      <Markdown inline>{paragraph}</Markdown>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why This Matters Section */}
        <div
          id="section-matters"
          className="mb-16 transform transition-all duration-700 delay-900"
          style={fadeInUp("section-matters")}
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-8">
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <Markdown inline>{data.whyMatters.title}</Markdown>
              </h2>
            </div>

            {data.whyMatters.image && (
              <div className="max-w-2xl mx-auto mb-8 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={data.whyMatters.image}
                  alt="What is preventive dentistry"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}

            <div className="text-center">
              <p className="text-lg md:text-xl leading-relaxed">
                <Markdown inline>{data.whyMatters.paragraph}</Markdown>
              </p>
            </div>
          </div>
        </div>

        {/* Personalized / Signs Section */}
        <div
          id="section-personalized"
          className="mb-16 transform transition-all duration-700 delay-1000"
          style={fadeInUp("section-personalized")}
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-8">
              <Users className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                <Markdown inline>{data.personalized.title}</Markdown>
              </h2>
            </div>

            {data.personalized.image && (
              <div className="max-w-2xl mx-auto mb-8 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={data.personalized.image}
                  alt="Signs you should schedule a preventive dental visit"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}

            <div className="text-center">
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                <Markdown inline>{data.personalized.paragraph}</Markdown>
              </p>
            </div>
          </div>
        </div>

        {/* What Happens During Your Visit (Process) */}
        <div
          id="section-process"
          className="mb-16 transform transition-all duration-700"
          style={fadeInUp("section-process")}
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
              <Markdown inline>{data.process.title}</Markdown>
            </h2>
            <div className="space-y-6">
              {data.process.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-purple-50 rounded-2xl p-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      <Markdown inline>{step.title}</Markdown>
                    </h3>
                    <p className="text-lg text-gray-700">
                      <Markdown inline>{step.description}</Markdown>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div
          id="section-benefits"
          className="mb-16 transform transition-all duration-700"
          style={fadeInUp("section-benefits")}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
            <Markdown inline>{data.benefits.title}</Markdown>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {data.benefits.items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 flex items-start space-x-3"
              >
                <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">
                  <Markdown inline>{item}</Markdown>
                </span>
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            <Markdown inline>{data.benefits.footer}</Markdown>
          </p>
        </div>

        {/* Cost */}
        <div
          id="section-cost"
          className="mb-16 transform transition-all duration-700"
          style={fadeInUp("section-cost")}
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
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
            <div className="bg-purple-50 rounded-2xl p-8 space-y-4">
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

        {/* Same-Day Consultation */}
        <div
          id="section-consultation"
          className="mb-16 transform transition-all duration-700"
          style={fadeInUp("section-consultation")}
        >
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              <Markdown inline>{data.consultation.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              <Markdown inline>{data.consultation.paragraph}</Markdown>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {data.consultation.points.map((point, index) => (
                <div key={index} className="bg-white px-6 py-3 rounded-xl shadow-md text-gray-700 font-medium">
                  <Markdown inline>{point}</Markdown>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Areas Served */}
        <div
          id="section-areas"
          className="mb-16 transform transition-all duration-700"
          style={fadeInUp("section-areas")}
        >
          <div className="text-center">
            <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <Markdown inline>{data.areasServed.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              <Markdown inline>{data.areasServed.paragraph}</Markdown>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {data.areasServed.areas.map((area, index) => (
                <span key={index} className="bg-purple-700 text-white px-6 py-2 rounded-full font-medium">
                  <Markdown inline>{area}</Markdown>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div
          id="section-testimonials"
          className="mb-16 transform transition-all duration-700"
          style={fadeInUp("section-testimonials")}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
            <Markdown inline>{data.testimonials.title}</Markdown>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {data.testimonials.items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="text-amber-400 text-lg mb-4">★★★★★</div>
                <p className="text-gray-700 italic leading-relaxed">
                  <Markdown inline>{item.quote}</Markdown>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What to Expect */}
        <div
          id="section-what-to-expect"
          className="mb-16 transform transition-all duration-700"
          style={fadeInUp("section-what-to-expect")}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
            <Markdown inline>{data.whatToExpect.title}</Markdown>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {data.whatToExpect.items.map((item, index) => (
              <div
                key={index}
                className="bg-purple-50 rounded-2xl p-8 shadow-md text-center"
              >
                <div className="text-purple-600 text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  <Markdown inline>{item.title}</Markdown>
                </h3>
                <p className="text-gray-700">
                  <Markdown inline>{item.description}</Markdown>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <div
          id="section-conclusion"
          className="mb-16 transform transition-all duration-700"
          style={fadeInUp("section-conclusion")}
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              <Markdown inline>{data.conclusion.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-4xl mx-auto">
              <Markdown inline>{data.conclusion.paragraph1}</Markdown>
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-4xl mx-auto">
              <Markdown inline>{data.conclusion.paragraph2}</Markdown>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-purple-800 font-semibold text-lg">
              <a href={`tel:${data.conclusion.phone}`} className="hover:underline">
                📞 Call Now: {data.conclusion.phone}
              </a>
              <span className="hidden sm:inline">|</span>
              <span>📍 {data.conclusion.address}</span>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div
          id="section-faq"
          className="mb-16 transform transition-all duration-700"
          style={fadeInUp("section-faq")}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
            <Markdown inline>{data.faq.title}</Markdown>
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {data.faq.items.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-md border border-purple-100 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex justify-between items-center text-left px-8 py-6"
                  >
                    <span className="text-lg font-semibold text-gray-800 pr-4">
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
                      <p className="text-gray-700 leading-relaxed">
                        <Markdown inline>{item.answer}</Markdown>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div
          id="section-cta"
          className="transform transition-all duration-700 delay-1100"
          style={fadeInUp("section-cta")}
        >
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-3xl p-8 md:p-12 shadow-xl text-center">
            <Phone className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              <Markdown inline>{data.cta.title}</Markdown>
            </h2>
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              <Markdown inline>{data.cta.paragraph}</Markdown>
            </p>
            <button
              onClick={handleOpenChatbot}
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {data.cta.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}