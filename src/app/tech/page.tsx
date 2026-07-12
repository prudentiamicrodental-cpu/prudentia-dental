'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiPhoneCall } from 'react-icons/fi';
import { useChatbot } from '@/components/chatbotContext';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown';



interface TechFeature {
  title: string;
  description: string;
  benefits: string[];
  image: string;
}

interface TechData {
  meta: { title: string; description: string };
  hero: { titleMain: string; titleHighlight: string; titleEnd: string; paragraph: string; button: string; image: string };
  fear: { title: string; paragraph1: string; paragraph2: string; callToAction: string; promiseTitle: string; promiseItems: string[] };
  featuresSection: { title: string; subtitle: string };
  features: TechFeature[];
  sterilization: { image: string; title: string; paragraph: string; items: { title: string; description: string }[] };
  cta: { title: string; paragraph: string; cards: { title: string; description: string }[]; button: string };
}

const DentalTechnologyPage = () => {
    const { handleOpenChatbot } = useChatbot();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [content, setContent] = useState<TechData | null>(null);

useEffect(() => {
  async function loadData() {
    const GITHUB_URL =
      "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/tech/tech.json";

    const LOCAL_URL = "/data/tech/tech.json";

    try {
      const res = await fetch(GITHUB_URL);

      if (!res.ok) throw new Error("GitHub fetch failed");

      const data: TechData = await res.json();
      setContent(data);
    } catch (error) {
      console.warn("Using local fallback:", error);

      try {
        const localRes = await fetch(LOCAL_URL);

        if (!localRes.ok) {
          throw new Error("Local fetch failed");
        }

        const localData: TechData = await localRes.json();
        setContent(localData);
      } catch (localError) {
        console.error("Failed to load local fallback:", localError);
      }
    }
  }

  loadData();
}, []);

  const features = content?.features ?? [];

  useEffect(() => {
    if (features.length === 0) return;
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  if (!content) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                <Markdown inline>
                  {content.hero.titleMain} 
                </Markdown>
                <span className="text-purple-600">
                  <Markdown inline> 
                    {content.hero.titleHighlight}
                    </Markdown>
                  </span> 
                  <Markdown  >{content.hero.titleEnd}</Markdown>
              </h1>
              <Markdown className="text-xl text-gray-600 mb-10">
                {content.hero.paragraph}
              </Markdown>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenChatbot}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
              >
                <Markdown>{content.hero.button}</Markdown>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 rounded-xl overflow-hidden shadow-2xl relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8"
            >
          <Image
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.hero.image}
                alt="Modern denture solutions"
                fill
                className="object-contain"
                priority
              />               
            </motion.div>
          </div>
        </section>

        {/* Fear of Dentist Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div 
                className="md:w-1/2 mb-10 md:mb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Markdown inline className="text-3xl font-bold text-gray-900 mb-6">
                  {content.fear.title}
                </Markdown>
                <Markdown inline className="text-gray-600 mb-6">
                  {content.fear.paragraph1}
                </Markdown>
                <Markdown inline className="text-gray-600 mb-8">
                  {content.fear.paragraph2}
                </Markdown>
                <div className="flex items-center space-x-4">
                  <FiPhoneCall className="text-purple-600 text-2xl" />
                  <span className="text-lg font-medium"><Markdown>{content.fear.callToAction}</Markdown></span>
                </div>
              </motion.div>
              <motion.div 
                className="md:w-1/2 md:pl-12"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-purple-50 p-8 rounded-xl border border-purple-100">
                  <h3 className="text-xl font-semibold text-purple-800 mb-4"><Markdown>{content.fear.promiseTitle}</Markdown></h3>
                  <ul className="space-y-3">
                    {content.fear.promiseItems.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <FiCheckCircle className="text-purple-600 mt-1 mr-2 flex-shrink-0" />
                        <span><Markdown>{item}</Markdown></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Technology */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                <Markdown inline>{content.featuresSection.title}</Markdown>
              </h2>
              <Markdown inline className="text-xl text-gray-600 max-w-3xl mx-auto">
                {content.featuresSection.subtitle}</Markdown>
             
            </motion.div>

            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFeature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        <Markdown>{features[currentFeature].title}</Markdown>
                      </h3>
                      <Markdown inline className="text-gray-600 mb-6">
                        {features[currentFeature].description}</Markdown>
                      
                      <ul className="space-y-2 mb-8">
                        {features[currentFeature].benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <FiCheckCircle className="text-purple-600 mt-1 mr-2 flex-shrink-0" />
                            <span><Markdown>{benefit}</Markdown></span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex space-x-4">
                        {features.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentFeature(index)}
                            className={`w-3 h-3 rounded-full ${currentFeature === index ? 'bg-purple-600' : 'bg-gray-300'}`}
                            aria-label={`View feature ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.div 
                className="lg:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-video">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentFeature}
                      src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/${features[currentFeature].image}`}
                      alt={features[currentFeature].title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-contain"
                    />
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sterilization Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div 
                className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-square relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                 <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.sterilization.image}
                    alt="Modern denture solutions"
                    fill
                    className="object-contain"
                    priority
                  /> 
                </div>
              </motion.div>
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  <Markdown>{content.sterilization.title}</Markdown>
                </h2>
                <Markdown className="text-gray-600 mb-8">
                  {content.sterilization.paragraph}</Markdown>
                
                
                <div className="space-y-6">
                  {content.sterilization.items.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-purple-100 p-3 rounded-full mr-4">
                        <FiCheckCircle className="text-purple-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-purple-600 text-white">
          <div className="container mx-auto px-6 text-center" style={{position: 'relative'}}>
    
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
                
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <Markdown>{content.cta.title}</Markdown>
              </h2>
              <Markdown className="text-xl mb-10 max-w-3xl mx-auto">
                {content.cta.paragraph}</Markdown>
              
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                {content.cta.cards.map((card, index) => (
                  <div key={index} className="bg-white/10 p-6 rounded-xl backdrop-blur-sm max-w-xs">
                    <h3 className="font-semibold text-lg mb-2"><Markdown>{card.title}</Markdown></h3>
                    <Markdown className="text-purple-100">{card.description}</Markdown>
                  </div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenChatbot}
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-4 px-10 rounded-full shadow-lg transition-all duration-300 text-lg flex items-center mx-auto"
              >
                {content.cta.button}
                <FiArrowRight className="ml-2" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DentalTechnologyPage;