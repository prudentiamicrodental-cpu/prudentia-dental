"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";
import { useChatbot } from "@/components/chatbotContext";
import { Image } from "@imagekit/next";
import Markdown from '@/components/markdown';
import Head from "next/head";


// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

interface EnamelData {
   meta: { title: string, description: string};
  hero: {
    title: string;
    subtitle: string;
    tagline: string;
    paragraph1: string;
    paragraph2: string;
    button: string;
    image: string;
  };
  whatIs: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    image: string;
  };
  whatCanCorrect: {
    title: string;
    intro: string;
    items: { title: string; icon: string; description: string }[];
    footer: string;
  };
  treatmentExperience: {
    title: string;
    image: string;
    points: { title: string; description: string }[];
    footer: string;
  };
  safety: {
    title: string;
    description: string;
    subtitle: string;
    footer: string;
  };
  testimonials: {
    title: string;
    items: { quote: string }[];
  };
  faq :{
    title: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
}

export default function EnameloplastyPage() {
  const { handleOpenChatbot } = useChatbot();
  const [content, setContent] = useState<EnamelData | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/cosmetic/enameloplasty.json";

      const LOCAL_URL = "/data/service/cosmetic/enameloplasty.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: EnamelData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: EnamelData = await localRes.json();
          setContent(localData);
        } catch (localError) {
          console.error("Failed to load local fallback:", localError);
        }
      }
    }

    loadData();
  }, []);

  if (!content) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="font-sans overflow-hidden text-gray-800 bg-white">
        <Head>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
      </Head>
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 bg-gradient-to-b from-purple-50 to-white"
      >
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center">
          <div className="md:w-1/2 mt-6 md:mt-0">
            <motion.h1
              variants={fadeIn}
              className="text-3xl md:text-5xl font-bold leading-tight"
            >
              <Markdown inline>{content.hero.title}</Markdown>
              <span className="block text-purple-600 text-2xl md:text-4xl mt-2">
                <Markdown inline>{content.hero.subtitle}</Markdown>
              </span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl mt-4 text-gray-600">
              <Markdown inline>{content.hero.tagline}</Markdown>
            </motion.p>
            <motion.p variants={fadeIn} className="mt-4 md:mt-6 text-sm md:text-base">
              <Markdown inline>{content.hero.paragraph1}</Markdown>
            </motion.p>
            <motion.p variants={fadeIn} className="mt-2 text-sm md:text-base">
              <Markdown inline>{content.hero.paragraph2}</Markdown>
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={handleOpenChatbot}
                className="bg-purple-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-purple-700 transition-colors flex items-center justify-center text-sm md:text-base"
              >
                <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                {content.hero.button}
              </button>
            </motion.div>
          </div>
          <motion.div
            variants={fadeIn}
            className="md:w-1/2 flex justify-center w-full"
          >
            <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-6 md:mb-8">
              <Image
              urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.hero.image}
                alt="Modern denture solutions"
                fill
                className="object-cover md:object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* What is Enameloplasty */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-12 md:py-16 px-4 bg-white"
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <motion.div variants={fadeIn} className="md:w-1/2 w-full order-1 md:order-none">
            <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
              <Image
              urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.whatIs.image}
                alt="Tooth contouring procedure"
                fill
                className="object-cover md:object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
          <motion.div variants={fadeIn} className="md:w-1/2 w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              <Markdown inline>{content.whatIs.title}</Markdown>
            </h2>
            <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base">
              <Markdown inline>{content.whatIs.paragraph1}</Markdown>
            </p>
            <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base">
              <Markdown inline>{content.whatIs.paragraph2}</Markdown>
            </p>
            <p className="text-gray-700 text-sm md:text-base">
              <Markdown inline>{content.whatIs.paragraph3}</Markdown>
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* What Can It Correct */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-12 md:py-16 px-4 bg-gray-50"
      >
        <div className="container mx-auto">
          <motion.div variants={fadeIn} className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">
              <Markdown inline>{content.whatCanCorrect.title}</Markdown>
            </h2>
            <p className="text-gray-600 mt-2 md:mt-4 max-w-2xl mx-auto text-sm md:text-base">
              <Markdown inline>{content.whatCanCorrect.intro}</Markdown>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {content.whatCanCorrect.items.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-purple-600 text-3xl md:text-4xl mb-2 md:mb-4">{item.icon}</div>
                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">
                  <Markdown inline>{item.title}</Markdown>
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  <Markdown inline>{item.description}</Markdown>
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeIn} className="mt-6 md:mt-8 text-center">
            <p className="text-gray-700 text-sm md:text-base">
              <Markdown inline>{content.whatCanCorrect.footer}</Markdown>
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Treatment Experience */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-12 md:py-16 px-4 bg-white"
      >
        <div className="container mx-auto flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
          <motion.div variants={fadeIn} className="md:w-1/2 w-full">
            <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
              <Image
              urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.treatmentExperience.image}
                alt="Dental treatment process"
                fill
                className="object-cover md:object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
          <motion.div variants={fadeIn} className="md:w-1/2 w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              <Markdown inline>{content.treatmentExperience.title}</Markdown>
            </h2>

            <div className="space-y-4 md:space-y-6">
              {content.treatmentExperience.points.map((point, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-purple-100 p-1 md:p-2 rounded-full mr-3 md:mr-4">
                    <span className="block w-4 h-4 md:w-6 md:h-6 bg-purple-600 rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg md:text-xl">
                      <Markdown inline>{point.title}</Markdown>
                    </h3>
                    <p className="text-gray-700 text-sm md:text-base">
                      <Markdown inline>{point.description}</Markdown>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 md:mt-6 text-gray-700 text-sm md:text-base">
              <Markdown inline>{content.treatmentExperience.footer}</Markdown>
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Safety and Benefits */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-12 md:py-16 px-4 bg-purple-50"
      >
        <div className="container mx-auto max-w-4xl">
          <motion.div variants={fadeIn} className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">
              <Markdown inline>{content.safety.title}</Markdown>
            </h2>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center"
          >
            <p className="text-lg md:text-xl">
              <Markdown inline>{content.safety.description}</Markdown>
            </p>

            <div className="w-16 md:w-24 h-1 bg-purple-600 mx-auto my-6 md:my-8"></div>

            <h3 className="text-xl md:text-2xl font-bold text-purple-600">
              <Markdown inline>{content.safety.subtitle}</Markdown>
            </h3>
            <p className="mt-3 md:mt-4 text-sm md:text-base">
              <Markdown inline>{content.safety.footer}</Markdown>
            </p>
          </motion.div>
        </div>
      </motion.section>
                  {/* Testimonials */}
                    <section className="mb-32">
                      <div className="text-center mb-16" >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                          <Markdown inline>{content.testimonials.title}</Markdown>
                        </h2>
                      </div>
                      <div className="grid md:grid-cols-3 gap-8">
                        {content.testimonials.items.map((item, index) => (
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
                          <Markdown inline>{content.faq.title}</Markdown>
                        </h2>
                      </div>
            
                      <div className="max-w-4xl mx-auto space-y-4">
                        {content.faq.items.map((item, index) => {
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

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        className="py-12 md:py-16 px-4 bg-purple-600 text-white"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
            <Markdown inline>{content.cta.title}</Markdown>
          </h2>
          <p className="text-base md:text-xl max-w-2xl mx-auto mb-6 md:mb-8">
            <Markdown inline>{content.cta.description}</Markdown>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">

            <button
              onClick={handleOpenChatbot}
              className="bg-transparent border border-white text-white px-6 py-2 md:px-8 md:py-3 rounded-full hover:bg-purple-700 transition-colors font-bold flex items-center justify-center text-sm md:text-base"
            >
              <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              {content.cta.button}
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}