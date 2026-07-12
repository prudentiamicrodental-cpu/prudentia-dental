"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Image } from "@imagekit/next";
import { useChatbot } from "@/components/chatbotContext";
import Markdown from '@/components/markdown';
import Head from "next/head";

interface CosmeticData {
   meta: { title: string, description: string};
  hero: {
    title: string;
    subtitle: string;
    button: string;
    image: string;
  };

  introduction: {
    text: string;
  };

  whatIs: {
    title: string;
    description: string;
    image: string;
    points: string[];
    footer: string;
  };

  treatments: {
    title: string;
    description: string;
    footer: string;
    cards: {
      title: string;
      description: string;
      image: string;
    }[];
  };

  benefits: {
    title: string;
    items: {
      title: string;
      description: string;
    }[];
  };

  gallery: {
    title: string;
    images: string[];
  };

  candidate: {
    title: string;
    description: string;
    intro: string;
    image: string;
    steps: string[];
    footer: string;
  };

  cta: {
    title: string;
    description1: string;
    description2: string;
    button: string;
  };
}

export default function MinimallyInvasiveCosmeticDentistryPage() {
  const { handleOpenChatbot } = useChatbot();

  const [isLoaded, setIsLoaded] = useState(false);
  const [content, setContent] = useState<CosmeticData | null>(null);

  useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/cosmetic/minimally-invasive-cosmetic.json";

      const LOCAL_URL = "/data/service/cosmetic/minimally-invasive-cosmetic.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: CosmeticData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: CosmeticData = await localRes.json();
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
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="relative"
            >
              <div className="relative h-80 md:h-96 max-w-full shadow-2xl rounded-xl shadow-lg mb-8">
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
          transition={{
            delay: 0.3,
            duration: 0.5,
          }}
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
          animate={isLoaded ? "visible" : "hidden"}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-700 leading-relaxed"
          >
            <Markdown inline>{content.introduction.text}</Markdown>
          </motion.p>
        </motion.div>
        {/* WHAT IS MINIMALLY INVASIVE COSMETIC DENTISTRY */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20"
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
            <div className="relative h-80 md:h-96 max-w-full shadow-2xl rounded-xl shadow-lg mb-8">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.whatIs.image}
                alt={content.whatIs.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="absolute -bottom-3 -right-3 bg-white p-2 rounded shadow"></div>
          </motion.div>
        </motion.div>

        {/* HOW DOES IT IMPROVE MY SMILE */}

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
            <Markdown inline>{content.treatments.title}</Markdown>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 mb-12 text-center max-w-4xl mx-auto"
          >
            <Markdown inline>{content.treatments.description}</Markdown>
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.treatments.cards.map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-80 md:h-96 max-w-full shadow-2xl rounded-xl shadow-lg mb-8">
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-indigo-900 mb-3">
                    {index + 1}. <Markdown inline>{card.title}</Markdown>
                  </h3>

                  <p className="text-gray-700">
                    <Markdown inline>{card.description}</Markdown>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 mt-10 max-w-4xl mx-auto text-center"
          >
            <Markdown inline>{content.treatments.footer}</Markdown>
          </motion.p>
        </motion.div>

        {/* BENEFITS */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-10 mb-24"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-indigo-900 mb-8 text-center"
          >
            <Markdown inline>{content.benefits.title}</Markdown>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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

                <p className="text-gray-700 text-center">
                  <Markdown inline>{item.description}</Markdown>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* SMILE TRANSFORMATIONS */}

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

        {/* ARE YOU A CANDIDATE */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24"
        >
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-indigo-900 mb-6">
                <Markdown inline>{content.candidate.title}</Markdown>
              </h2>

              <p className="text-lg text-gray-700 mb-6">
                <Markdown inline>{content.candidate.description}</Markdown>
              </p>

              <p className="text-lg text-gray-700 mb-4">
                <Markdown inline>{content.candidate.intro}</Markdown>
              </p>

              <ul className="mb-6 space-y-3">
                {content.candidate.steps.map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.1 + 0.3,
                    }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <span className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      ✓
                    </span>

                    <span className="text-gray-700">
                      <Markdown inline>{step}</Markdown>
                    </span>
                  </motion.li>
                ))}
              </ul>

              <p className="text-lg text-gray-700">
                <Markdown inline>{content.candidate.footer}</Markdown>
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="order-1 lg:order-2 flex justify-center"
          >
            <motion.div
              whileHover={{ rotate: 2 }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              className="relative w-full max-w-md"
            >
              <div className="absolute inset-0 bg-indigo-200 rounded-xl rotate-3"></div>

              <div className="absolute inset-0 bg-purple-200 rounded-xl -rotate-3"></div>

              <div className="relative h-80 md:h-96 shadow-2xl rounded-xl">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.candidate.image}
                  alt={content.candidate.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* CTA */}

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-800 to-purple-800 rounded-2xl p-12 text-center text-white mb-20"
        >
          <h2 className="text-3xl font-bold mb-6">
            <Markdown inline>{content.cta.title}</Markdown>
          </h2>

          <p className="text-xl mb-8 max-w-3xl mx-auto">
            <Markdown inline>{content.cta.description1}</Markdown>
          </p>

          <p className="text-xl mb-10 max-w-3xl mx-auto">
            <Markdown inline>{content.cta.description2}</Markdown>
          </p>

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