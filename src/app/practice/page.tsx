"use client"

import { useChatbot } from '@/components/chatbotContext';
import Markdown from '@/components/markdown';
import { Image } from '@imagekit/next';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useState, useEffect } from 'react';

interface TeamMember {
  image: string;
  alt: string;
  name: string;
  credentials: string;
  heading: string;
  paragraphs: string[];
  quote?: string;
  expertise?: string;
}

interface PracticeData {
   meta: { title: string; description: string };
  hero: { image: string; alt: string; titleLine1: string; titleLine2: string; subtitle: string };
  intro: { title: string; paragraph: string; quote: string; image: string; alt: string };
  technology: {
    title: string;
    description: string;
    image: string;
    alt: string;
    items: { title: string; description: string }[];
    note: string;
    button: string;
  };
  team: { title: string; members: TeamMember[] };
  cta: { title: string; description: string; button: string };
}

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } }
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function PrudentiaMicroDentalCare() {
  const { handleOpenChatbot } = useChatbot();
  const [content, setContent] = useState<PracticeData | null>(null);

useEffect(() => {
  async function loadData() {
    const GITHUB_URL =
      "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/practice/practice.json";

    const LOCAL_URL = "/data/practice/practice.json";

    try {
      const res = await fetch(GITHUB_URL);

      if (!res.ok) throw new Error("GitHub fetch failed");

      const data: PracticeData = await res.json();
      setContent(data);
    } catch (error) {
      console.warn("Using local fallback:", error);

      try {
        const localRes = await fetch(LOCAL_URL);

        if (!localRes.ok) {
          throw new Error("Local fetch failed");
        }

        const localData: PracticeData = await localRes.json();
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

  const [drBhushan, drDisha, ayesha] = content.team.members;

  return (
    <div className="bg-white">
      <Head>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
      </Head>
      {/* Hero Banner with Tagline */}
      <motion.div 
        className="relative h-[70vh] min-h-[500px] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
          src={content.hero.image}
          alt={content.hero.alt}
          fill
          className="object-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
        <motion.div 
          className="absolute bottom-8 right-8 text-right max-w-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            <Markdown>{content.hero.titleLine1}</Markdown>
            <Markdown>{content.hero.titleLine2}</Markdown>
          </div>
          <Markdown className="text-purple-100 font-medium">{content.hero.subtitle}</Markdown>
        </motion.div>
      </motion.div>

      {/* Introduction Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
        <motion.div 
          className="flex flex-col lg:flex-row gap-12 items-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="lg:w-1/2" variants={slideInFromLeft}>
            <Markdown className="text-3xl font-bold text-gray-900 mb-6">
              {content.intro.title}
            </Markdown>
            <Markdown className="text-lg text-gray-600 mb-6">
              {content.intro.paragraph}
            </Markdown>
            <motion.div 
              className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Markdown className="text-purple-800 font-medium">
                {content.intro.quote}
              </Markdown>
            </motion.div>
          </motion.div>
          <motion.div 
            className="lg:w-1/2 rounded-xl overflow-hidden shadow-xl"
            variants={slideInFromRight}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
          src={content.intro.image}
              alt={content.intro.alt}
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Markdown className="text-3xl font-bold text-gray-900 mb-4">{content.technology.title}</Markdown>
            <motion.div 
              className="w-20 h-1 bg-purple-600 mx-auto mb-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <Markdown className="text-lg text-gray-600 max-w-3xl mx-auto">
              {content.technology.description}
            </Markdown>
          </motion.div>

          <motion.div 
            className="flex flex-col lg:flex-row gap-12 items-center"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="lg:w-1/2 rounded-xl overflow-hidden shadow-lg"
              variants={slideInFromLeft}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
               urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
          src={content.technology.image}
                alt={content.technology.alt}
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </motion.div>
            <motion.div className="lg:w-1/2" variants={slideInFromRight}>
              <motion.ul className="space-y-4" variants={container}>
                {content.technology.items.map((tech, index) => (
                  <motion.li className="flex items-start" variants={item} key={index}>
                    <div className="flex-shrink-0 h-6 w-6 text-purple-600 mt-1">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3 text-lg text-gray-700"><span className="font-semibold"><Markdown>{tech.title}</Markdown></span> <Markdown>{tech.description}</Markdown></div>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div 
                className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Markdown className="text-lg text-gray-700 mb-4">
                  {content.technology.note}
               </Markdown>
                <motion.button 
                  onClick={handleOpenChatbot} 
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Markdown>{content.technology.button}</Markdown>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Markdown className="text-3xl font-bold text-gray-900 mb-4">{content.team.title}</Markdown>
          <motion.div 
            className="w-20 h-1 bg-purple-600 mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        {/* Dr. Bhushan Mahajan */}
        <motion.div 
          className="flex flex-col lg:flex-row gap-12 items-center mb-20"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="lg:w-1/3" variants={scaleUp}>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
          src={drBhushan.image}
                alt={drBhushan.alt}
                width={400}
                height={500}
                className="w-full h-auto"
              />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-center text-gray-900">{drBhushan.name}</h3>
            <p className="text-center text-purple-600">{drBhushan.credentials}</p>
          </motion.div>
          <motion.div className="lg:w-2/3" variants={fadeIn}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {drBhushan.heading}
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              {drBhushan.paragraphs[0]}
            </p>
            <p className="text-lg text-gray-600 mb-6">
              {drBhushan.paragraphs[1]}
            </p>
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="text-gray-700 italic">
                {drBhushan.quote}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Dr. Disha Avhad Mahajan */}
        <motion.div 
          className="flex flex-col lg:flex-row-reverse gap-12 items-center mb-20"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="lg:w-1/3" variants={scaleUp}>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <Image
               urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
          src={drDisha.image}
                alt={drDisha.alt}
                width={400}
                height={500}
                className="w-full h-auto"
              />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-center text-gray-900">{drDisha.name}</h3>
            <p className="text-center text-purple-600">{drDisha.credentials}</p>
          </motion.div>
          <motion.div className="lg:w-2/3" variants={fadeIn}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {drDisha.heading}
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              {drDisha.paragraphs[0]}
            </p>
            <p className="text-lg text-gray-600 mb-6">
              {drDisha.paragraphs[1]}
            </p>
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex-shrink-0 h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700">
                <span className="font-semibold">Expertise:</span> {drDisha.expertise}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Ayesha S */}
        <motion.div 
          className="flex flex-col lg:flex-row gap-12 items-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="lg:w-1/3" variants={scaleUp}>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
          src={ayesha.image}
                alt={ayesha.alt}
                width={400}
                height={500}
                className="w-full h-auto"
              />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-center text-gray-900">{ayesha.name}</h3>
            <p className="text-center text-purple-600">{ayesha.credentials}</p>
          </motion.div>
          <motion.div className="lg:w-2/3" variants={fadeIn}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {ayesha.heading}
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              {ayesha.paragraphs[0]}
            </p>
            <p className="text-lg text-gray-600 mb-6">
              {ayesha.paragraphs[1]}
            </p>
            <p className="text-lg text-gray-600">
              {ayesha.paragraphs[2]}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 bg-purple-600 text-white overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Markdown>{content.cta.title}</Markdown>
          </motion.h2>
          <motion.h1 
            className="text-xl mb-8 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Markdown>{content.cta.description}</Markdown>
          </motion.h1>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button 
              onClick={handleOpenChatbot} 
              className="px-8 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Markdown>{content.cta.button}</Markdown>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}