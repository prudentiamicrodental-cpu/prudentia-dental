"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useChatbot } from "@/components/chatbotContext";
import { Image } from "@imagekit/next";
import Markdown from '@/components/markdown';
import Head from "next/head";

interface BondingData {
  meta: { title: string, description: string};
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
  discoloredTeeth: {
    title: string;
    intro: string;
    causes: { icon: string; title: string; description: string }[];
    footer: string;
  };
  improveSmile: {
    title: string;
    intro: string;
    points: string[];
    footer: string;
    image: string;
  };
  gallery: {
    title: string;
    images: { src: string; caption: string }[];
  };
  cta: {
    title: string;
    description: string;
    button: string;
    footer: string;
  };
}

export default function CompositeBonding() {
  const { handleOpenChatbot } = useChatbot();
  const [isLoaded, setIsLoaded] = useState(false);
  const [content, setContent] = useState<BondingData | null>(null);

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
        staggerChildren: 0.3,
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
                  alt="Modern denture solutions"
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

      {/* What is Composite Bonding */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className=" bg-white"
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
                  alt="Modern denture solutions"
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

      {/* Discolored Teeth Section */}
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
            className="text-3xl font-bold text-center text-purple-900 mb-10"
          >
            <Markdown inline>{content.discoloredTeeth.title}</Markdown>
          </motion.h2>

          <motion.p
            variants={fadeIn}
            className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12"
          >
            <Markdown inline>{content.discoloredTeeth.intro}</Markdown>
          </motion.p>

          <div className="flex flex-wrap justify-center mb-12">
            {content.discoloredTeeth.causes.map((cause, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="w-full md:w-1/3 px-4 mb-8"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                  <div className="text-purple-600 text-4xl mb-4">{cause.icon}</div>
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">
                    <Markdown inline>{cause.title}</Markdown>
                  </h3>
                  <p className="text-gray-700">
                    <Markdown inline>{cause.description}</Markdown>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={fadeIn}
            className="text-lg text-gray-700 max-w-3xl mx-auto text-center"
          >
            <Markdown inline>{content.discoloredTeeth.footer}</Markdown>
          </motion.p>
        </div>
      </motion.section>

      {/* How Bonding Improves Your Smile */}
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
            <Markdown inline>{content.improveSmile.title}</Markdown>
          </motion.h2>

          <div className="flex flex-wrap items-center">
            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 px-4 order-2 lg:order-1"
            >
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <Markdown inline>{content.improveSmile.intro}</Markdown>
              </p>

              <ul className="space-y-4 mb-6">
                {content.improveSmile.points.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-1">
                      <span className="text-purple-600 text-sm">✓</span>
                    </div>
                    <span className="text-lg text-gray-700">
                      <Markdown inline>{point}</Markdown>
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-lg text-gray-700 leading-relaxed">
                <Markdown inline>{content.improveSmile.footer}</Markdown>
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0 order-1 lg:order-2"
            >
              <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.improveSmile.image}
                  alt="Modern denture solutions"
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

      {/* Gallery Section */}
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
                  alt="Modern denture solutions"
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
            <p className="mt-4 text-purple-200">
              <Markdown inline>{content.cta.footer}</Markdown>
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}