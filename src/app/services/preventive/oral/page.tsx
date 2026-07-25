"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, Smile, Users, Award, Phone } from "lucide-react";
import { useChatbot } from "@/components/chatbotContext";
import { Image } from "@imagekit/next";
import Markdown from '@/components/markdown';
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";

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
interface TestimonialsData {
  title: string;
  items: { quote: string }[];
}

interface FaqData {
  title: string;
  items: { question: string; answer: string }[];
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
  testimonials: TestimonialsData;
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
  testimonials: {title: '',items:[]},
  faq: {title: '',items:[]},
  cta: { title: "", paragraph: "", buttonText: "" },
};

export default function OralHygieneInstructions() {
  const { handleOpenChatbot } = useChatbot();
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const [data, setData] = useState<OralData>(EMPTY_DATA);
  const [openFaq, setOpenFaq] = useState<number | null>(0)

 useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/preventive/oral.json";

      const LOCAL_URL = "/data/service/preventive/oral.json";

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
                    alt="Modern denture solutions"
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
                  alt="Modern denture solutions"
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
                      alt="Modern denture solutions"
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
                  alt="Modern denture solutions"
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

        {/* Personalized Care Section */}
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
                  alt="Modern denture solutions"
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
         {/* Testimonials */}
                              <section className="mb-32">
                                <div className="text-center mb-16" >
                                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                                    <Markdown inline>{data.testimonials.title}</Markdown>
                                  </h2>
                                </div>
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
                              </section>
                      
                              {/* FAQ */}
                              <section className="mb-32">
                                <div className="text-center mb-16" >
                                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                                    <Markdown inline>{data.faq.title}</Markdown>
                                  </h2>
                                </div>
                      
                                <div className="max-w-4xl mx-auto space-y-4">
                                  {data.faq.items.map((item, index) => {
                                    const isOpen = openFaq === index;
                                    return (
                                      <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                        <button
                                          onClick={() => setOpenFaq(isOpen ? null : index)}
                                          className="w-full flex justify-between items-center text-left px-8 py-6"
                                        >
                                          <span className="text-lg font-semibold text-gray-800 pr-4">
                                            <Markdown inline>{item.question}</Markdown>
                                          </span>
                                          <ChevronDown
                                            className={`w-6 h-6 text-purple-700 flex-shrink-0 transition-transform duration-300 ${
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
                                              className="px-8 overflow-hidden"
                                            >
                                              <p className="text-gray-700 pb-6 leading-relaxed">
                                                <Markdown inline>{item.answer}</Markdown>
                                              </p>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    );
                                  })}
                                </div>
                              </section>
        

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