"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChatbot } from "@/components/chatbotContext";
import { Image } from "@imagekit/next";
import { Variants } from "framer-motion";
import Markdown from '@/components/markdown';
import Head from "next/head";
import { ChevronDown } from "lucide-react";

interface JewelleryData {
  meta: { title: string, description: string};
  hero: {
    title: string;
    subtitle: string;
    tagline: string;
    button: string;
    image: string;
  };
  introduction: {
    text: string;
  };
  howItWorks: {
    title: string;
    description: string;
    intro: string;
    steps: { title: string; description: string }[];
    footer: string;
    image: string;
    imageCaption: string;
  };
  advantages: {
    title: string;
    image: string;
    items: { title: string; description: string }[];
  };
  safeAndStunning: {
    title: string;
    description: string;
  };
  testimonials: {
    title: string;
    items: { quote: string }[];
  }
  faq :{
    title: string;
    items: { question: string; answer: string }[];
  }
  cta: {
    title: string;
    description: string;
    button: string;
    footer: string;
  };
}

export default function DentalJewelry() {
  const { handleOpenChatbot } = useChatbot();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<JewelleryData | null>(null);
   const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    async function loadData() {
      setIsLoaded(true);
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/cosmetic/dental-jewellery.json";

      const LOCAL_URL = "/data/service/cosmetic/dental-jewellery.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: JewelleryData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: JewelleryData = await localRes.json();
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

const shimmer: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      repeat: Infinity,
      repeatType: "reverse", // replaces yoyo
      duration: 1,
      ease: "easeInOut",
    },
  },
};
  const staggerDelay = (index: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(60px)",
    transition: `all 1s ease-out ${index * 0.15}s`,
  });

  if (!content) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-purple-50  to-white overflow-hidden min-h-screen">
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
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-50 opacity-50"></div>
          <motion.div
            className="absolute -top-1/2 -right-1/4 w-full h-full rounded-full bg-gradient-to-br from-pink-200 to-purple-200 opacity-20 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-1/4 -left-1/4 w-full h-full rounded-full bg-gradient-to-tr from-purple-200 to-pink-200 opacity-20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
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
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                {content.hero.button}
              </motion.button>
            </div>
            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 px-4 ml-auto mr-auto mt-12 lg:mt-0"
            >
              <div className="relative h-80 md:h-96 w-full shadow-2xl rounded-xl  shadow-lg mb-8">
                <Image
                 urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.hero.image}
                  alt="Modern denture solutions"
                  fill
                  className="object-cover"
                  priority
                />
                <motion.div
                  variants={shimmer}
                  animate="visible"
                  className="absolute -top-4 -left-4 w-20 h-20"
                >
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-pink-200 rounded-full blur-md opacity-70"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-300 rounded-full flex items-center justify-center">
                      <span className="text-2xl">✨</span>
                    </div>
                  </div>
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
            <Markdown inline>{content.introduction.text}</Markdown>
          </motion.p>
        </div>
      </motion.section>

      {/* How Does It Work Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-gradient-to-br from-purple-50 to-pink-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center text-purple-900 mb-16"
          >
            <Markdown inline>{content.howItWorks.title}</Markdown>
          </motion.h2>

          <motion.p
            variants={fadeIn}
            className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12"
          >
            <Markdown inline>{content.howItWorks.description}</Markdown>
          </motion.p>

          <motion.p
            variants={fadeIn}
            className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-8"
          >
            <Markdown inline>{content.howItWorks.intro}</Markdown>
          </motion.p>

          <div className="flex flex-wrap items-center mb-12">
            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0 order-2 lg:order-1"
            >
              <ol className="space-y-10">
                {content.howItWorks.steps.map((step, index) => (
                  <motion.li
                    key={index}
                    variants={fadeIn}
                    whileHover={{ x: 5 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                      <span className="text-purple-600 font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-purple-800 mb-2">
                        <Markdown inline>{step.title}</Markdown>
                      </h3>
                      <p className="text-gray-700">
                        <Markdown inline>{step.description}</Markdown>
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>

              <motion.p
                variants={fadeIn}
                className="mt-10 text-xl text-center lg:text-left text-purple-700 font-medium"
              >
                <Markdown inline>{content.howItWorks.footer}</Markdown>
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 px-4 order-1 lg:order-2"
            >
              <div className="relative h-80 md:h-96 w-full shadow-2xl rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                 urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.howItWorks.image}
                  alt="Modern denture solutions"
                  fill
                  className="object-cover"
                  priority
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900 to-transparent p-4"
                >
                  <p className="text-white">
                    <Markdown inline>{content.howItWorks.imageCaption}</Markdown>
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Advantages Section */}
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
            <Markdown inline>{content.advantages.title}</Markdown>
          </motion.h2>

          <div className="flex flex-wrap items-center">
            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0"
            >
              <div className="relative h-80 md:h-96 w-full shadow-2xl rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                 urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.advantages.image}
                  alt="Modern denture solutions"
                  fill
                  className="object-contain"
                  priority
                />

                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(168, 85, 247, 0)",
                      "0 0 20px rgba(168, 85, 247, 0.5)",
                      "0 0 0px rgba(168, 85, 247, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-xl"
                ></motion.div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="w-full lg:w-1/2 px-4">
              <ul className="space-y-8">
                {content.advantages.items.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={fadeIn}
                    whileHover={{ x: 5 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                      <span className="text-purple-600 text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-purple-800 mb-2">
                        <Markdown inline>{item.title}</Markdown>
                      </h3>
                      <p className="text-gray-700">
                        <Markdown inline>{item.description}</Markdown>
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Safe & Stunning Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-gradient-to-br from-purple-50 to-pink-50"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center text-purple-900 mb-10"
          >
            <Markdown inline>{content.safeAndStunning.title}</Markdown>
          </motion.h2>

          <motion.div
            variants={fadeIn}
            className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
          >
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            ></motion.div>

            <p className="text-lg text-gray-700 leading-relaxed relative z-10">
              <Markdown inline>{content.safeAndStunning.description}</Markdown>
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

      {/* Call to Action */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20  bg-purple-700  text-white"
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
                boxShadow: "0 0 25px rgba(255, 255, 255, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenChatbot}
              transition={{ duration: 0.2 }}
              className="bg-purple-800 text-white font-bold px-10 py-4 rounded-lg text-lg border-2 border-white/20 shadow-lg"
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