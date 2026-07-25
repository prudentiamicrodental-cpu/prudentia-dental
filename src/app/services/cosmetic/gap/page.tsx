"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Phone, MapPin, CheckCircle2 } from "lucide-react";
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
      staggerChildren: 0.15,
    },
  },
};

interface GapData {
  meta: { title: string; description: string };
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
  whyChooseUs: {
    title: string;
    intro: string;
    items: { title: string; icon: string; description: string }[];
  };
  signs: {
    title: string;
    intro: string;
    items: string[];
    footer: string;
  };
  treatmentTypes: {
    title: string;
    intro: string;
    items: { title: string; icon: string; description: string }[];
    footer: string;
  };
  procedure: {
    title: string;
    image: string;
    points: { title: string; description: string }[];
    footer: string;
  };
  benefits: {
    title: string;
    items: string[];
    footer: string;
  };
  cost: {
    title: string;
    intro: string;
    factors: string[];
    footer: string;
  };
  areasServed: {
    title: string;
    intro: string;
    items: string[];
    footer: string;
  };
  testimonials: {
    title: string;
    items: { quote: string; author: string }[];
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    title: string;
    description: string;
    button: string;
    phone: string;
    address: string;
  };
}

export default function GapBetweenTeethPage() {
  const { handleOpenChatbot } = useChatbot();
  const [content, setContent] = useState<GapData | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/cosmetic/gap.json";

      const LOCAL_URL = "/data/service/cosmetic/gap.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: GapData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: GapData = await localRes.json();
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
          <motion.div variants={fadeIn} className="md:w-1/2 flex justify-center w-full">
            <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-6 md:mb-8">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.hero.image}
                alt="Gap between teeth treatment"
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

      {/* What Is Gap Between Teeth Treatment */}
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
                alt="Diastema correction"
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

      {/* Why Choose Us */}
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
              <Markdown inline>{content.whyChooseUs.title}</Markdown>
            </h2>
            <p className="text-gray-600 mt-2 md:mt-4 max-w-2xl mx-auto text-sm md:text-base">
              <Markdown inline>{content.whyChooseUs.intro}</Markdown>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {content.whyChooseUs.items.map((item, index) => (
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
        </div>
      </motion.section>

      {/* Signs You May Benefit */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-12 md:py-16 px-4 bg-white"
      >
        <div className="container mx-auto max-w-4xl">
          <motion.div variants={fadeIn} className="text-center mb-6 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">
              <Markdown inline>{content.signs.title}</Markdown>
            </h2>
            <p className="text-gray-600 mt-2 md:mt-4 text-sm md:text-base">
              <Markdown inline>{content.signs.intro}</Markdown>
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {content.signs.items.map((item, index) => (
              <div key={index} className="flex items-start bg-purple-50 rounded-lg p-3 md:p-4">
                <CheckCircle2 className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base text-gray-700">
                  <Markdown inline>{item}</Markdown>
                </span>
              </div>
            ))}
          </motion.div>

          <motion.p variants={fadeIn} className="mt-6 text-center text-gray-700 text-sm md:text-base">
            <Markdown inline>{content.signs.footer}</Markdown>
          </motion.p>
        </div>
      </motion.section>

      {/* Treatment Types */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-12 md:py-16 px-4 bg-purple-50"
      >
        <div className="container mx-auto">
          <motion.div variants={fadeIn} className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">
              <Markdown inline>{content.treatmentTypes.title}</Markdown>
            </h2>
            <p className="text-gray-600 mt-2 md:mt-4 max-w-2xl mx-auto text-sm md:text-base">
              <Markdown inline>{content.treatmentTypes.intro}</Markdown>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {content.treatmentTypes.items.map((item, index) => (
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

          <motion.p variants={fadeIn} className="mt-6 md:mt-8 text-center text-gray-700 text-sm md:text-base">
            <Markdown inline>{content.treatmentTypes.footer}</Markdown>
          </motion.p>
        </div>
      </motion.section>

      {/* Procedure Steps */}
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
                src={content.procedure.image}
                alt="Gap treatment procedure"
                fill
                className="object-cover md:object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
          <motion.div variants={fadeIn} className="md:w-1/2 w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              <Markdown inline>{content.procedure.title}</Markdown>
            </h2>

            <div className="space-y-4 md:space-y-6">
              {content.procedure.points.map((point, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-purple-100 p-1 md:p-2 rounded-full mr-3 md:mr-4 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
                    <span className="text-purple-600 font-bold text-sm md:text-base">{index + 1}</span>
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
              <Markdown inline>{content.procedure.footer}</Markdown>
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-12 md:py-16 px-4 bg-purple-50"
      >
        <div className="container mx-auto max-w-4xl">
          <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            <Markdown inline>{content.benefits.title}</Markdown>
          </motion.h2>

          <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {content.benefits.items.map((item, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base text-gray-700">
                  <Markdown inline>{item}</Markdown>
                </span>
              </div>
            ))}
          </motion.div>

          <motion.p variants={fadeIn} className="mt-6 text-center text-gray-700 text-sm md:text-base">
            <Markdown inline>{content.benefits.footer}</Markdown>
          </motion.p>
        </div>
      </motion.section>

      {/* Cost */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-12 md:py-16 px-4 bg-white"
      >
        <div className="container mx-auto max-w-4xl">
          <motion.div variants={fadeIn} className="bg-gray-50 rounded-2xl shadow-md p-6 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
              <Markdown inline>{content.cost.title}</Markdown>
            </h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              <Markdown inline>{content.cost.intro}</Markdown>
            </p>

            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6">
              {content.cost.factors.map((factor, index) => (
                <span
                  key={index}
                  className="bg-white border border-purple-200 text-purple-700 text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full"
                >
                  <Markdown inline>{factor}</Markdown>
                </span>
              ))}
            </div>

            <p className="text-gray-700 text-sm md:text-base">
              <Markdown inline>{content.cost.footer}</Markdown>
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Areas Served */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-12 md:py-16 px-4 bg-purple-50"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
            <Markdown inline>{content.areasServed.title}</Markdown>
          </motion.h2>
          <motion.p variants={fadeIn} className="text-gray-600 mb-6 text-sm md:text-base">
            <Markdown inline>{content.areasServed.intro}</Markdown>
          </motion.p>
          <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-2 md:gap-3">
            {content.areasServed.items.map((area, index) => (
              <span
                key={index}
                className="bg-white shadow-sm text-gray-700 text-xs md:text-sm px-4 py-2 rounded-full flex items-center"
              >
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-600 mr-1.5" />
                <Markdown inline>{area}</Markdown>
              </span>
            ))}
          </motion.div>
          <motion.p variants={fadeIn} className="mt-6 text-gray-700 text-sm md:text-base">
            <Markdown inline>{content.areasServed.footer}</Markdown>
          </motion.p>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-12 md:py-16 px-4 bg-white"
      >
        <div className="container mx-auto">
          <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            <Markdown inline>{content.testimonials.title}</Markdown>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {content.testimonials.items.map((t, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-purple-50 rounded-xl p-5 md:p-6 shadow-sm"
              >
                <p className="text-gray-700 italic text-sm md:text-base mb-4">
                  <Markdown inline>{t.quote}</Markdown>
                </p>
                <p className="text-purple-600 font-semibold text-sm">— {t.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-12 md:py-16 px-4 bg-gray-50"
      >
        <div className="container mx-auto max-w-3xl">
          <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            <Markdown inline>{content.faq.title}</Markdown>
          </motion.h2>

          <div className="space-y-3 md:space-y-4">
            {content.faq.items.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-4 py-3 md:px-6 md:py-4 flex justify-between items-center"
                  >
                    <span className="font-semibold text-sm md:text-base pr-4">
                      <Markdown inline>{item.question}</Markdown>
                    </span>
                    <span className="text-purple-600 text-xl flex-shrink-0">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-3 md:px-6 md:pb-4 text-gray-600 text-sm md:text-base">
                      <Markdown inline>{item.answer}</Markdown>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

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

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6">
            <button
              onClick={handleOpenChatbot}
              className="bg-transparent border border-white text-white px-6 py-2 md:px-8 md:py-3 rounded-full hover:bg-purple-700 transition-colors font-bold flex items-center justify-center text-sm md:text-base"
            >
              <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              {content.cta.button}
            </button>
            <a
              href={`tel:${content.cta.phone}`}
              className="bg-white text-purple-600 px-6 py-2 md:px-8 md:py-3 rounded-full hover:bg-gray-100 transition-colors font-bold flex items-center justify-center text-sm md:text-base"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              {content.cta.phone}
            </a>
          </div>

          <p className="text-sm md:text-base flex items-center justify-center text-purple-100">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            {content.cta.address}
          </p>
        </div>
      </motion.section>
    </div>
  );
}