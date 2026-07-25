"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, CheckCircle2 } from "lucide-react";
import { useChatbot } from "@/components/chatbotContext";
import { Image } from "@imagekit/next";
import Markdown from '@/components/markdown';
import Head from "next/head";

interface BondingData {
  meta: { title: string; description: string };
  hero: {
    title: string;
    subtitle: string;
    button: string;
    image: string;
  };
  whatIs: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    image: string;
  };
  signs: {
    title: string;
    intro: string;
    items: string[];
    footer: string;
  };
  types: {
    title: string;
    intro: string;
    items: { icon: string; title: string; description: string }[];
    footer: string;
  };
  procedure: {
    title: string;
    image: string;
    steps: { title: string; description: string }[];
    footer: string;
  };
  benefits: {
    title: string;
    intro: string;
    points: string[];
    footer: string;
    image: string;
  };
  cost: {
    title: string;
    intro: string;
    factors: string[];
    footer: string;
  };
  gallery: {
    title: string;
    images: { src: string; caption: string }[];
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
    footer: string;
    phone: string;
    address: string;
  };
}

export default function CompositeBonding() {
  const { handleOpenChatbot } = useChatbot();
  const [isLoaded, setIsLoaded] = useState(false);
  const [content, setContent] = useState<BondingData | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoaded(true);
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/cosmetic/composite-bonding.json";

      const LOCAL_URL = "/data/service/cosmetic/composite-bonding.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: BondingData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: BondingData = await localRes.json();
          setContent(localData);
        } catch (localError) {
          console.error("Failed to load local fallback:", localError);
        }
      }
    }

    loadData();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  if (!content) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b overflow-hidden from-white to-purple-50 min-h-screen">
      <Head>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
      </Head>

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={fadeIn}
        className="relative pt-16 pb-32 flex content-center items-center justify-center"
        style={{ minHeight: "75vh" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 my-15 px-4 ml-auto mr-auto text-center lg:text-left">
              <motion.h1
                variants={fadeIn}
                className="text-5xl font-bold text-purple-900 leading-tight mb-6"
              >
                <Markdown inline>{content.hero.title}</Markdown>
              </motion.h1>
              <motion.h2
                variants={fadeIn}
                className="text-2xl font-medium text-purple-800 mb-12"
              >
                <Markdown inline>{content.hero.subtitle}</Markdown>
              </motion.h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenChatbot}
                className="bg-purple-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
              >
                {content.hero.button}
              </motion.button>
            </div>
            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 px-4 ml-auto mr-auto mt-12 lg:mt-0"
            >
              <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.hero.image}
                  alt="Dental bonding treatment"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute -bottom-4 -right-4 bg-purple-100 rounded-lg p-3 shadow-lg"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* What is Dental Bonding */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center text-purple-900 mb-16"
          >
            <Markdown inline>{content.whatIs.title}</Markdown>
          </motion.h2>

          <div className="flex flex-wrap items-center">
            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0"
            >
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <Markdown inline>{content.whatIs.paragraph1}</Markdown>
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                <Markdown inline>{content.whatIs.paragraph2}</Markdown>
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="w-full lg:w-1/2 px-4">
              <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.whatIs.image}
                  alt="Composite bonding material"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900 to-transparent p-4"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Signs You May Benefit */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-purple-50"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center text-purple-900 mb-6"
          >
            <Markdown inline>{content.signs.title}</Markdown>
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-10"
          >
            <Markdown inline>{content.signs.intro}</Markdown>
          </motion.p>

          <motion.div variants={fadeIn} className="grid sm:grid-cols-2 gap-4 mb-8">
            {content.signs.items.map((item, index) => (
              <div key={index} className="flex items-start bg-white rounded-lg shadow-sm p-4">
                <CheckCircle2 className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700"><Markdown inline>{item}</Markdown></span>
              </div>
            ))}
          </motion.div>

          <motion.p
            variants={fadeIn}
            className="text-lg text-gray-700 max-w-3xl mx-auto text-center"
          >
            <Markdown inline>{content.signs.footer}</Markdown>
          </motion.p>
        </div>
      </motion.section>

      {/* Types of Dental Bonding */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center text-purple-900 mb-6"
          >
            <Markdown inline>{content.types.title}</Markdown>
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12"
          >
            <Markdown inline>{content.types.intro}</Markdown>
          </motion.p>

          <div className="flex flex-wrap justify-center mb-12">
            {content.types.items.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8"
              >
                <div className="bg-purple-50 rounded-xl shadow-lg p-6 h-full">
                  <div className="text-purple-600 text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">
                    <Markdown inline>{item.title}</Markdown>
                  </h3>
                  <p className="text-gray-700">
                    <Markdown inline>{item.description}</Markdown>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={fadeIn}
            className="text-lg text-gray-700 max-w-3xl mx-auto text-center"
          >
            <Markdown inline>{content.types.footer}</Markdown>
          </motion.p>
        </div>
      </motion.section>

      {/* Step-by-Step Procedure */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-purple-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center text-purple-900 mb-16"
          >
            <Markdown inline>{content.procedure.title}</Markdown>
          </motion.h2>

          <div className="flex flex-wrap items-center">
            <motion.div variants={fadeIn} className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
              <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.procedure.image}
                  alt="Dental bonding procedure"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
            <motion.div variants={fadeIn} className="w-full lg:w-1/2 px-4">
              <div className="space-y-5">
                {content.procedure.steps.map((step, index) => (
                  <div key={index} className="flex items-start bg-white rounded-lg shadow-sm p-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                      <span className="text-purple-600 font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900 mb-1">
                        <Markdown inline>{step.title}</Markdown>
                      </h3>
                      <p className="text-gray-700 text-sm">
                        <Markdown inline>{step.description}</Markdown>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mt-6">
                <Markdown inline>{content.procedure.footer}</Markdown>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Benefits */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center text-purple-900 mb-16"
          >
            <Markdown inline>{content.benefits.title}</Markdown>
          </motion.h2>

          <div className="flex flex-wrap items-center">
            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 px-4 order-2 lg:order-1"
            >
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <Markdown inline>{content.benefits.intro}</Markdown>
              </p>

              <ul className="grid sm:grid-cols-2 gap-4 mb-6">
                {content.benefits.points.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-1">
                      <span className="text-purple-600 text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">
                      <Markdown inline>{point}</Markdown>
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-lg text-gray-700 leading-relaxed">
                <Markdown inline>{content.benefits.footer}</Markdown>
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0 order-1 lg:order-2"
            >
              <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.benefits.image}
                  alt="Dental bonding benefits"
                  fill
                  className="object-contain"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900 to-transparent p-4"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Cost */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-purple-50"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">
              <Markdown inline>{content.cost.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              <Markdown inline>{content.cost.intro}</Markdown>
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {content.cost.factors.map((factor, index) => (
                <span
                  key={index}
                  className="bg-purple-50 border border-purple-200 text-purple-700 text-sm px-4 py-2 rounded-full"
                >
                  <Markdown inline>{factor}</Markdown>
                </span>
              ))}
            </div>
            <p className="text-lg text-gray-700">
              <Markdown inline>{content.cost.footer}</Markdown>
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center text-purple-900 mb-16"
          >
            <Markdown inline>{content.gallery.title}</Markdown>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.gallery.images.map((image, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8"
              >
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={image.src}
                  alt="Dental bonding result"
                  fill
                  className="object-contain"
                  priority
                />
                <div className="p-4 bg-white">
                  <p className="text-gray-600 text-sm">
                    <Markdown inline>{image.caption}</Markdown>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-purple-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center text-purple-900 mb-16"
          >
            <Markdown inline>{content.testimonials.title}</Markdown>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.testimonials.items.map((t, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <p className="text-gray-700 italic mb-4 leading-relaxed">
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
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center text-purple-900 mb-16"
          >
            <Markdown inline>{content.faq.title}</Markdown>
          </motion.h2>

          <div className="space-y-4">
            {content.faq.items.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-purple-50 rounded-xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-6 py-4 flex justify-between items-center"
                  >
                    <span className="font-semibold text-purple-900 pr-4">
                      <Markdown inline>{item.question}</Markdown>
                    </span>
                    <span className="text-purple-600 text-2xl flex-shrink-0">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                      <Markdown inline>{item.answer}</Markdown>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-purple-600 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 variants={fadeIn} className="text-3xl font-bold mb-6">
            <Markdown inline>{content.cta.title}</Markdown>
          </motion.h2>

          <motion.p
            variants={fadeIn}
            className="text-lg max-w-3xl mx-auto mb-10"
          >
            <Markdown inline>{content.cta.description}</Markdown>
          </motion.p>

          <motion.div variants={fadeIn} className="mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#fff",
                  color: "#1e3a8a",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenChatbot}
                transition={{ duration: 0.2 }}
                className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-white hover:text-purple-900 transition duration-300"
              >
                {content.cta.button}
              </motion.button>
              <a
                href={`tel:${content.cta.phone}`}
                className="bg-white text-purple-700 font-bold px-8 py-4 rounded-lg text-lg hover:bg-purple-100 transition duration-300 flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                {content.cta.phone}
              </a>
            </div>
            <p className="text-purple-200 flex items-center justify-center mb-2">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              {content.cta.address}
            </p>
            <p className="text-purple-200">
              <Markdown inline>{content.cta.footer}</Markdown>
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}