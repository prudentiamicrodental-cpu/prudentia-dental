"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useChatbot } from "@/components/chatbotContext";
import { Image } from "@imagekit/next";
import Markdown from '@/components/markdown';
import Head from "next/head";

interface SealantsData {
  meta: { title: string, description: string};
  hero: {
    title: string;
    subtitle: string;
    tagline: string;
    button: string;
    image: string;
  };
  introduction: {
    paragraph1: string;
    paragraph2: string;
  };
  whoShouldGet: {
    title: string;
    intro: string;
    groups: { icon: string; title: string; description: string }[];
    footer: string;
  };
  whyImportant: {
    title: string;
    image: string;
    imageCaption: string;
    intro: string;
    points: string[];
    footer: string;
  };
  benefits: {
    title: string;
    items: { icon: string; title: string; description: string }[];
  };
  howLongLast: {
    title: string;
    description: string;
  };
  procedure: {
    title: string;
    subtitle: string;
    intro: string;
    steps: string[];
    footer: string;
    image: string;
    imageCaption: string;
  };
  preventionTips: {
    title: string;
    image: string;
    imageCaption: string;
    intro: string;
    tips: { icon: string; strong: string | null; text: string }[];
  };
  cta: {
    title: string;
    description: string;
    button: string;
    footer: string;
  };
}

export default function DentalSealants() {
  const { handleOpenChatbot } = useChatbot();
  const [isLoaded, setIsLoaded] = useState(false);
  const [content, setContent] = useState<SealantsData | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoaded(true);
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/cosmetic/dental-sealants.json";

      const LOCAL_URL = "/data/service/cosmetic/dental-sealants.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: SealantsData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: SealantsData = await localRes.json();
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
        staggerChildren: 0.3,
      },
    },
  };

  const slideIn = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
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
    <div className=" overflow-hidden bg-gradient-to-b from-purple-50 to-white min-h-screen">
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
        style={{ minHeight: "85vh" }}
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-50 opacity-30"></div>
          <motion.div
            className="absolute -top-1/4 -right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-purple-200 to-purple-200 opacity-20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 px-4 ml-auto mr-auto text-center lg:text-left">
              <motion.h1
                variants={fadeIn}
                className="text-5xl font-bold text-purple-900 leading-tight mb-6"
              >
                <Markdown inline>{content.hero.title}</Markdown>
              </motion.h1>
              <motion.h2
                variants={fadeIn}
                className="text-2xl font-medium text-purple-700 mb-12"
              >
                <Markdown inline>{content.hero.subtitle}</Markdown>
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-xl text-purple-800 font-light mb-10"
              >
                <Markdown inline>{content.hero.tagline}</Markdown>
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenChatbot}
                className="bg-purple-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
              >
                {content.hero.button}
              </motion.button>
            </div>
            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 px-4 ml-auto mr-auto mt-12 lg:mt-0"
            >
              <div className="relative h-80 md:h-96 max-w-full shadow-2xl rounded-xl  shadow-lg mb-8">
                <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.hero.image}
                  alt="Modern denture solutions"
                  fill
                  className="object-contain"
                  priority
                />

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -bottom-6 -right-6 bg-purple-100 rounded-full p-4 shadow-lg"
                >
                  <div className="text-purple-600 text-3xl">🛡️</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Introduction Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.p
            variants={fadeIn}
            className="text-lg text-gray-700 leading-relaxed mb-8 max-w-4xl mx-auto text-center"
          >
            <Markdown inline>{content.introduction.paragraph1}</Markdown>
          </motion.p>

          <motion.p
            variants={fadeIn}
            className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto text-center"
          >
            <Markdown inline>{content.introduction.paragraph2}</Markdown>
          </motion.p>
        </div>
      </motion.section>

      {/* Who Should Get Sealants */}
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
            <Markdown inline>{content.whoShouldGet.title}</Markdown>
          </motion.h2>

          <motion.p
            variants={fadeIn}
            className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12"
          >
            <Markdown inline>{content.whoShouldGet.intro}</Markdown>
          </motion.p>

          <div className="flex flex-wrap justify-center">
            {content.whoShouldGet.groups.map((group, index) => (
              <motion.div
                key={index}
                variants={slideIn}
                whileHover={{ y: -5 }}
                className="w-full md:w-1/2 px-4 mb-8"
              >
                <div className="bg-white rounded-xl shadow-lg p-8 h-full border-l-4 border-purple-500">
                  <div className="text-purple-600 text-4xl mb-4">{group.icon}</div>
                  <h3 className="text-xl font-semibold text-purple-900 mb-4">
                    <Markdown inline>{group.title}</Markdown>
                  </h3>
                  <p className="text-gray-700">
                    <Markdown inline>{group.description}</Markdown>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={fadeIn}
            className="text-lg text-center text-purple-800 max-w-3xl mx-auto mt-8 font-medium"
          >
            <Markdown inline>{content.whoShouldGet.footer}</Markdown>
          </motion.p>
        </div>
      </motion.section>

      {/* Why Are Sealants Important */}
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
            <Markdown inline>{content.whyImportant.title}</Markdown>
          </motion.h2>

          <div className="flex flex-wrap items-center">
            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0"
            >
              <div className="relative h-80 md:h-96 max-w-full shadow-2xl rounded-xl  shadow-lg mb-8">
                <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.whyImportant.image}
                  alt="Modern denture solutions"
                  fill
                  className="object-contain"
                  priority
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900 to-transparent p-4"
                >
                  <p className="text-white">
                    <Markdown inline>{content.whyImportant.imageCaption}</Markdown>
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="w-full lg:w-1/2 px-4">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <Markdown inline>{content.whyImportant.intro}</Markdown>
              </p>

              <ol className="space-y-4 mb-8">
                {content.whyImportant.points.map((point, index) => (
                  <motion.li key={index} variants={slideIn} className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-1">
                      <span className="text-purple-600 font-bold text-sm">{index + 1}</span>
                    </div>
                    <span className="text-lg text-gray-700">
                      <Markdown inline>{point}</Markdown>
                    </span>
                  </motion.li>
                ))}
              </ol>

              <p className="text-lg text-gray-700 leading-relaxed">
                <Markdown inline>{content.whyImportant.footer}</Markdown>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Key Benefits */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-gradient-to-br from-purple-50 to-purple-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center text-purple-900 mb-16"
          >
            <Markdown inline>{content.benefits.title}</Markdown>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.benefits.items.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <div className="text-purple-600 text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-purple-900 mb-3">
                  <Markdown inline>{item.title}</Markdown>
                </h3>
                <p className="text-gray-700">
                  <Markdown inline>{item.description}</Markdown>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How Long Do They Last */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center text-purple-900 mb-10"
          >
            <Markdown inline>{content.howLongLast.title}</Markdown>
          </motion.h2>

          <motion.div
            variants={fadeIn}
            className="bg-purple-50 rounded-2xl shadow-xl p-8"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              <Markdown inline>{content.howLongLast.description}</Markdown>
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Procedure Section */}
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
            className="text-3xl font-bold text-center text-purple-900 mb-6"
          >
            <Markdown inline>{content.procedure.title}</Markdown>
          </motion.h2>

          <motion.p
            variants={fadeIn}
            className="text-2xl font-medium text-center text-purple-700 mb-12"
          >
            <Markdown inline>{content.procedure.subtitle}</Markdown>
          </motion.p>

          <motion.p
            variants={fadeIn}
            className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12"
          >
            <Markdown inline>{content.procedure.intro}</Markdown>
          </motion.p>

          <div className="flex flex-wrap items-center">
            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0 order-2 lg:order-1"
            >
              <ol className="space-y-8">
                {content.procedure.steps.map((step, index) => (
                  <motion.li
                    key={index}
                    variants={slideIn}
                    whileHover={{ x: 5 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                      <span className="text-purple-600 font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 pt-1">
                      <Markdown inline>{step}</Markdown>
                    </p>
                  </motion.li>
                ))}
              </ol>

              <motion.p
                variants={fadeIn}
                className="mt-8 text-lg text-purple-700 font-medium"
              >
                <Markdown inline>{content.procedure.footer}</Markdown>
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 px-4 order-1 lg:order-2"
            >
              <div className="relative h-80 md:h-96 max-w-full shadow-2xl rounded-xl  shadow-lg mb-8">
                <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.procedure.image}
                  alt="Modern denture solutions"
                  fill
                  className="object-contain"
                  priority
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900 to-transparent p-4">
                  <p className="text-white"><Markdown inline>{content.procedure.imageCaption}</Markdown></p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Prevention Tips */}
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
            <Markdown inline>{content.preventionTips.title}</Markdown>
          </motion.h2>

          <div className="flex flex-wrap items-center">
            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0"
            >
              <div className="relative h-80 md:h-96 max-w-full shadow-2xl rounded-xl  shadow-lg mb-8">
                <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.preventionTips.image}
                  alt="Modern denture solutions"
                  fill
                  className="object-contain"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900 to-transparent p-4">
                  <p className="text-white"><Markdown inline>{content.preventionTips.imageCaption}</Markdown></p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="w-full lg:w-1/2 px-4">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <Markdown inline>{content.preventionTips.intro}</Markdown>
              </p>

              <ul className="space-y-6">
                {content.preventionTips.tips.map((tip, index) => (
                  <motion.li key={index} variants={slideIn} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-1">
                      <span className="text-purple-600 text-sm">{tip.icon}</span>
                    </div>
                    {tip.strong ? (
                      <div>
                        <strong className="text-gray-800">
                          <Markdown inline>{tip.strong}</Markdown>
                        </strong>
                        <span className="text-gray-700">
                          {" "}
                          <Markdown inline>{tip.text}</Markdown>
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-700">
                        <Markdown inline>{tip.text}</Markdown>
                      </span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-gradient-to-br from-purple-900 to-purple-800 text-white"
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenChatbot}
              transition={{ duration: 0.2 }}
              className="bg-white text-purple-900 font-bold px-10 py-4 rounded-lg text-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              {content.cta.button}
            </motion.button>
            <motion.p variants={fadeIn} className="mt-6 text-purple-200">
              <Markdown inline>{content.cta.footer}</Markdown>
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}