'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useChatbot } from '@/components/chatbotContext';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown';

interface AlignersData {
  meta: { title: string; description: string };
  hero: { title: string; image: string; description: string };
  whatAre: { title: string; image: string; description: string };
  benefits: { title: string; image: string; items: { title: string; content: string }[] };
  cta: { title: string; image: string; description: string; button: string };
}

export default function AlignerTreatment() {
    const { handleOpenChatbot } = useChatbot();
  const [loaded, setLoaded] = useState(false);
  const [content, setContent] = useState<AlignersData | null>(null);

 useEffect(() => {
    async function loadData() {
      setLoaded(true);
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/braces/clear-aligners.json";

      const LOCAL_URL = "/data/service/braces/clear-aligners.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: AlignersData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: AlignersData = await localRes.json();
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
              alt="Person smiling with aligners"
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

        {/* What Are Aligners */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-6">
            <Markdown inline>{content.whatAre.title}</Markdown>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative h-64 md:h-80 w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg"
            >
              <Image
              urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.whatAre.image}
                alt="Clear aligners demonstration"
                fill
                className="object-contain"
              />
            </motion.div>
            
            <div className="w-full md:w-1/2">
              <p className="text-gray-700 text-lg">
                <Markdown inline>{content.whatAre.description}</Markdown>
              </p>
            </div>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-6">
            <Markdown inline>{content.benefits.title}</Markdown>
          </h2>
          
          <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-10">
            <Image
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
              src={content.benefits.image}
              alt="Benefits of aligners"
              fill
              className="object-contain"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.benefits.items.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-semibold text-purple-700 mb-3">
                  <Markdown inline>{benefit.title}</Markdown>
                </h3>
                <p className="text-gray-700">
                  <Markdown inline>{benefit.content}</Markdown>
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
              alt="Smile transformation with aligners"
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
        </motion.section>
      </main>
    </div>
  );
}