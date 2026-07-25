"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image } from "@imagekit/next";
import { useChatbot } from "@/components/chatbotContext";
import Markdown from "@/components/markdown";
import Head from "next/head";

interface SmileMakeoverData {
  meta: { title: string; description: string };

  hero: {
    title: string;
    subtitle: string;
    button: string;
    image: string;
  };

  introduction: { text: string };

  trustBadges: {
    title: string;
    items: string[];
  };

  whyChoose: {
    title: string;
    description: string;
    cards: { title: string; description: string }[];
  };

  whatIs: {
    title: string;
    description: string;
    image: string;
    points: string[];
    footer: string;
  };

  whoCanBenefit: {
    title: string;
    description: string;
    items: string[];
  };

  process: {
    title: string;
    description: string;
    footer: string;
    steps: { title: string; description: string; image: string }[];
  };

  benefits: {
    title: string;
    items: { title: string; description: string }[];
  };

  gallery: {
    title: string;
    images: string[];
  };

  cost: {
    title: string;
    description: string;
    factors: string[];
    highlights: string[];
  };

  consultation: {
    title: string;
    description: string;
    points: string[];
  };

  areasServed: {
    title: string;
    description: string;
    areas: string[];
  };

  testimonials: {
    title: string;
    items: { quote: string }[];
  };

  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };

  cta: {
    title: string;
    description1: string;
    description2: string;
    button: string;
    phone: string;
    address: string;
  };
}

export default function SmileMakeoverNearMePage() {
  const { handleOpenChatbot } = useChatbot();

  const [content, setContent] = useState<SmileMakeoverData | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/cosmetic/minimally-invasive-cosmetic.json";

      const LOCAL_URL = "/data/service/cosmetic/minimally-invasive-cosmetic.json";

      try {
        const res = await fetch(GITHUB_URL);
        if (!res.ok) throw new Error("GitHub fetch failed");
        const data: SmileMakeoverData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);
        try {
          const localRes = await fetch(LOCAL_URL);
          if (!localRes.ok) throw new Error("Local fetch failed");
          const localData: SmileMakeoverData = await localRes.json();
          setContent(localData);
        } catch (localError) {
          console.error("Failed to load local fallback:", localError);
        }
      }
    }

    loadData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (!content) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 overflow-hidden min-h-screen font-sans">
      <Head>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
      </Head>

      {/* HERO */}
      <motion.section
        className="relative bg-gradient-to-r from-purple-900 to-indigo-800 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                <Markdown inline>{content.hero.title}</Markdown>
              </h1>
              <h2 className="text-2xl md:text-3xl font-light mb-8">
                <Markdown inline>{content.hero.subtitle}</Markdown>
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenChatbot}
                className="bg-white text-indigo-800 font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:bg-gray-100 transition duration-300"
              >
                {content.hero.button}
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-80 md:h-96 max-w-full shadow-2xl rounded-xl mb-8">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.hero.image}
                  alt={content.hero.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-full"
          >
            <path
              fill="#F9FAFB"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,170.7C960,160,1056,96,1152,74.7C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </motion.div>
      </motion.section>

      <div className="container mx-auto px-6 lg:px-8 max-w-6xl py-16">
        {/* INTRODUCTION */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-700 leading-relaxed"
          >
            <Markdown inline>{content.introduction.text}</Markdown>
          </motion.p>
        </motion.div>

        {/* TRUST BADGES */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold text-indigo-900 mb-8 text-center"
          >
            <Markdown inline>{content.trustBadges.title}</Markdown>
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4">
            {content.trustBadges.items.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center bg-white border border-indigo-100 rounded-full px-5 py-2 shadow-sm"
              >
                <span className="text-amber-400 mr-2">★</span>
                <span className="text-gray-700 text-sm font-medium">
                  <Markdown inline>{item}</Markdown>
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* WHY CHOOSE US */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-indigo-900 mb-4 text-center"
          >
            <Markdown inline>{content.whyChoose.title}</Markdown>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto"
          >
            <Markdown inline>{content.whyChoose.description}</Markdown>
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.whyChoose.cards.map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-800 font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-indigo-900 mb-3">
                  <Markdown inline>{card.title}</Markdown>
                </h3>
                <p className="text-gray-700">
                  <Markdown inline>{card.description}</Markdown>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* WHAT IS A SMILE MAKEOVER */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-indigo-900 mb-6">
              <Markdown inline>{content.whatIs.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              <Markdown inline>{content.whatIs.description}</Markdown>
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              {content.whatIs.points.map((point) => (
                <li key={point}>
                  <Markdown inline>{point}</Markdown>
                </li>
              ))}
            </ul>
            <p className="text-lg text-gray-700 font-medium">
              <Markdown inline>{content.whatIs.footer}</Markdown>
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="relative h-80 md:h-96 max-w-full shadow-2xl rounded-xl mb-8">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.whatIs.image}
                alt={content.whatIs.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </motion.div>

        {/* WHO CAN BENEFIT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-10 mb-24"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-indigo-900 mb-4 text-center"
          >
            <Markdown inline>{content.whoCanBenefit.title}</Markdown>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto"
          >
            <Markdown inline>{content.whoCanBenefit.description}</Markdown>
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {content.whoCanBenefit.items.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start bg-white p-4 rounded-lg shadow-sm"
              >
                <span className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center mr-3 flex-shrink-0">
                  ✓
                </span>
                <span className="text-gray-700">
                  <Markdown inline>{item}</Markdown>
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* PROCESS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-indigo-900 mb-6 text-center"
          >
            <Markdown inline>{content.process.title}</Markdown>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 mb-12 text-center max-w-4xl mx-auto"
          >
            <Markdown inline>{content.process.description}</Markdown>
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.process.steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 max-w-full">
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 h-9 w-9 rounded-full bg-indigo-800 text-white flex items-center justify-center font-bold shadow-md">
                    {index + 1}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-indigo-900 mb-2">
                    <Markdown inline>{step.title}</Markdown>
                  </h3>
                  <p className="text-gray-700 text-sm">
                    <Markdown inline>{step.description}</Markdown>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 mt-10 max-w-4xl mx-auto text-center"
          >
            <Markdown inline>{content.process.footer}</Markdown>
          </motion.p>
        </motion.div>

        {/* BENEFITS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-indigo-900 mb-8 text-center"
          >
            <Markdown inline>{content.benefits.title}</Markdown>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.benefits.items.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-14 w-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-indigo-900 mb-2 text-center">
                  <Markdown inline>{item.title}</Markdown>
                </h3>
                <p className="text-gray-700 text-center text-sm">
                  <Markdown inline>{item.description}</Markdown>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* GALLERY */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-indigo-900 mb-12 text-center"
          >
            <Markdown inline>{content.gallery.title}</Markdown>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.gallery.images.map((image, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="relative h-80 md:h-96 bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={image}
                  alt={`Smile Transformation ${index + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* COST */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-white rounded-2xl shadow-lg p-10 mb-24"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">
              <Markdown inline>{content.cost.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              <Markdown inline>{content.cost.description}</Markdown>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {content.cost.factors.map((factor) => (
                <li key={factor}>
                  <Markdown inline>{factor}</Markdown>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-indigo-50 rounded-xl p-8 space-y-4"
          >
            {content.cost.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start">
                <span className="text-indigo-700 font-bold mr-3">✔</span>
                <span className="text-gray-800 font-medium">
                  <Markdown inline>{highlight}</Markdown>
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* SAME-DAY CONSULTATION */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-10 mb-24 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-indigo-900 mb-4"
          >
            <Markdown inline>{content.consultation.title}</Markdown>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto"
          >
            <Markdown inline>{content.consultation.description}</Markdown>
          </motion.p>
          <div className="flex flex-wrap justify-center gap-4">
            {content.consultation.points.map((point, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white px-5 py-3 rounded-lg shadow-sm text-gray-700 font-medium"
              >
                <Markdown inline>{point}</Markdown>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AREAS SERVED */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-indigo-900 mb-4"
          >
            <Markdown inline>{content.areasServed.title}</Markdown>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto"
          >
            <Markdown inline>{content.areasServed.description}</Markdown>
          </motion.p>
          <div className="flex flex-wrap justify-center gap-3">
            {content.areasServed.areas.map((area, index) => (
              <motion.span
                key={index}
                variants={itemVariants}
                className="bg-indigo-800 text-white px-5 py-2 rounded-full text-sm font-medium"
              >
                <Markdown inline>{area}</Markdown>
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* TESTIMONIALS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-indigo-900 mb-12 text-center"
          >
            <Markdown inline>{content.testimonials.title}</Markdown>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.testimonials.items.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="text-amber-400 text-lg mb-4">★★★★★</div>
                <p className="text-gray-700 italic">
                  <Markdown inline>{item.quote}</Markdown>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 max-w-4xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-indigo-900 mb-8 text-center"
          >
            <Markdown inline>{content.faq.title}</Markdown>
          </motion.h2>

          <div className="space-y-4">
            {content.faq.items.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex justify-between items-center text-left px-6 py-5"
                  >
                    <span className="text-lg font-semibold text-indigo-900 pr-4">
                      <Markdown inline>{item.question}</Markdown>
                    </span>
                    <span
                      className={`text-2xl text-indigo-700 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 overflow-hidden"
                      >
                        <p className="text-gray-700 pb-5">
                          <Markdown inline>{item.answer}</Markdown>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-800 to-purple-800 rounded-2xl p-12 text-center text-white mb-10"
        >
          <h2 className="text-3xl font-bold mb-6">
            <Markdown inline>{content.cta.title}</Markdown>
          </h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            <Markdown inline>{content.cta.description1}</Markdown>
          </p>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            <Markdown inline>{content.cta.description2}</Markdown>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-lg">
            <a
              href={`tel:${content.cta.phone}`}
              className="flex items-center gap-2 hover:underline"
            >
              📞 Call Now: {content.cta.phone}
            </a>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-2">
              📍 {content.cta.address}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenChatbot}
            className="bg-white text-indigo-800 font-bold py-4 px-10 rounded-lg text-lg shadow-lg hover:bg-gray-100 transition duration-300"
          >
            {content.cta.button}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}