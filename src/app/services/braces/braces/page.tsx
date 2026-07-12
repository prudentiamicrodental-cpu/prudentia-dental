'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useChatbot } from '@/components/chatbotContext';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown';

interface BracesData {
  meta: { title: string; description: string };
  hero: { title: string; image: string; description: string };
  duration: { title: string; description: string };
  types: { title: string; image: string; items: { title: string; description: string }[] };
  cta: { title: string; image: string; description: string; button: string; footer: string };
}

export default function ConventionalBraces() {
     const { handleOpenChatbot } = useChatbot();
  const [loaded, setLoaded] = useState(false);
  const [content, setContent] = useState<BracesData | null>(null);

 useEffect(() => {
    async function loadData() {
      setLoaded(true);
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/braces/conventional-braces.json";

      const LOCAL_URL = "/data/service/braces/conventional-braces.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: BracesData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: BracesData = await localRes.json();
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
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-purple-50 to-white">
      <Head>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
      </Head>

      <main className="container mx-auto px-4 py-25">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">
            <Markdown inline>{content.hero.title}</Markdown>
          </h1>
          
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={loaded ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8"
          >
            <Image
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
              src={content.hero.image}
              alt="Modern conventional braces"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto"
          >
            <Markdown inline>{content.hero.description}</Markdown>
          </motion.p>
        </motion.section>

        {/* Treatment Duration */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 bg-white p-8 rounded-xl shadow-md"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-6">
            <Markdown inline>{content.duration.title}</Markdown>
          </h2>
          <p className="text-gray-700 text-lg">
            <Markdown inline>{content.duration.description}</Markdown>
          </p>
        </motion.section>

        {/* Types of Braces */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-6 text-center">
            <Markdown inline>{content.types.title}</Markdown>
          </h2>
          
          <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-10">
            <Image
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
              src={content.types.image}
              alt="Types of conventional braces"
              fill
              className="object-contain"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {content.types.items.map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-semibold text-purple-700 mb-4">
                  <Markdown inline>{item.title}</Markdown>
                </h3>
                <p className="text-gray-700">
                  <Markdown inline>{item.description}</Markdown>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">
            <Markdown inline>{content.cta.title}</Markdown>
          </h2>
          
          <div className="relative h-80 md:h-96 w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg mb-10">
            <Image
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
              src={content.cta.image}
              alt="Smile transformation with braces"
              fill
              className="object-contain"
            />
          </div>

          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
            <Markdown inline>{content.cta.description}</Markdown>
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenChatbot}
            className="inline-block"
          >
            <div 
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg"
            >
              {content.cta.button}
            </div>
          </motion.div>

          <p className="mt-8 text-gray-600">
            <Markdown inline>{content.cta.footer}</Markdown>
          </p>
        </motion.section>
      </main>
    </div>
  );
}