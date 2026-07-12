"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useChatbot } from '@/components/chatbotContext';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown'; // Import the Markdown component
import Head from 'next/head';

interface MetaData{
  title: string;
  description: string 
};

interface HeroData {
  title: string;
  subtitle: string;
}


interface IntroData {
  paragraph: string;
  imageIndex: number;
}

interface SectionData {
  title: string;
  intro: string;
  bullets: string[];
  outro: string;
  imageIndex: number;
}

interface ConclusionData {
  imageIndex: number;
  title: string;
  paragraph: string;
  buttonText: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqData {
  title: string;
  items: FaqItem[];
}

interface FinalCtaData {
  title: string;
  paragraph: string;
  buttonText: string;
}

interface ApicoectomyData {
  meta: MetaData;
  hero: HeroData;
  images: string[];
  intro: IntroData;
  sections: SectionData[];
  conclusion: ConclusionData;
  faq: FaqData;
  finalCta: FinalCtaData;
}

const EMPTY_DATA: ApicoectomyData = {
  meta: { title: '', description: '' },
  hero: { title: '', subtitle: '' },
  images: [],
  intro: { paragraph: '', imageIndex: 0 },
  sections: [],
  conclusion: { imageIndex: 0, title: '', paragraph: '', buttonText: '' },
  faq: { title: '', items: [] },
  finalCta: { title: '', paragraph: '', buttonText: '' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function ApicoectomyPage() {
  const { handleOpenChatbot } = useChatbot();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<ApicoectomyData>(EMPTY_DATA);

  useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/root/microsurgical.json";

      const LOCAL_URL = "/data/service/root/microsurgical.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: ApicoectomyData = await res.json();
        setData(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: ApicoectomyData = await localRes.json();
          setData(localData);
        } catch (localError) {
          console.error("Failed to load local fallback:", localError);
        }
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-gray-50 overflow-hidden min-h-screen font-sans">
      <Head>
              <title>{data.meta.title}</title>
              <meta name="description" content={data.meta.description} />
        </Head>
      {/* Hero Section */}
      <motion.section 
        className="relative bg-gradient-to-r from-purple-900 to-purple-700 text-white py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto my-10 px-6 lg:px-8 max-w-6xl">
          <motion.div 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              <Markdown inline>{data.hero.title}</Markdown>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              <Markdown inline>{data.hero.subtitle}</Markdown>
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
            <path fill="#F9FAFB" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,170.7C960,160,1056,96,1152,74.7C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          {/* Introduction */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <p className="text-lg text-gray-700 mb-8">
              <Markdown inline>{data.intro.paragraph}</Markdown>
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="order-first lg:order-last relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
            {data.images[data.intro.imageIndex] && (
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={data.images[data.intro.imageIndex]}
                alt="Modern denture solutions"
                fill
                className="object-contain"
                priority
              />
            )}
          </motion.div>
        </motion.div>

        {/* Content Sections */}
        {data.sections.map((section, index) => (
          <motion.div
            key={index}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-purple-900 mb-6">
                <Markdown inline>{section.title}</Markdown>
              </h2>
              <p className={section.bullets.length > 0 ? "text-lg text-gray-700 mb-4" : "text-lg text-gray-700"}>
                <Markdown inline>{section.intro}</Markdown>
              </p>
              {section.bullets.length > 0 && (
                <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                  {section.bullets.map((bullet, bIndex) => (
                    <li key={bIndex}>
                      <Markdown inline>{bullet}</Markdown>
                    </li>
                  ))}
                </ul>
              )}
              {section.outro && (
                <p className="text-lg text-gray-700">
                  <Markdown inline>{section.outro}</Markdown>
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="order-first lg:order-last relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
              {data.images[section.imageIndex] && (
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={data.images[section.imageIndex]}
                  alt="Modern denture solutions"
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </motion.div>
          </motion.div>
        ))}

        {/* Conclusion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 mb-12"
        >
          <motion.div 
            variants={itemVariants} 
            className="bg-gradient-to-r from-purple-100 to-purple-50 p-8 rounded-xl shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                {data.images[data.conclusion.imageIndex] && (
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={data.images[data.conclusion.imageIndex]}
                    alt="Modern denture solutions"
                    fill
                    className="object-contain"
                    priority
                  />
                )}
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-purple-900 mb-6">
                  <Markdown inline>{data.conclusion.title}</Markdown>
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  <Markdown inline>{data.conclusion.paragraph}</Markdown>
                </p>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex space-x-4"
                >
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpenChatbot}
                    className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300"
                  >
                    {data.conclusion.buttonText}
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 mb-12"
        >
          <h2 className="text-3xl font-bold text-purple-900 mb-10 text-center">
            <Markdown inline>{data.faq.title}</Markdown>
          </h2>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {data.faq.items.map((item, index) => (
              <motion.div key={index} variants={itemVariants} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-lg text-purple-800 mb-2">
                  <Markdown inline>{item.question}</Markdown>
                </h3>
                <p className="text-gray-700">
                  <Markdown inline>{item.answer}</Markdown>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Call To Action */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-16"
      >
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            <Markdown inline>{data.finalCta.title}</Markdown>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            <Markdown inline>{data.finalCta.paragraph}</Markdown>
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenChatbot}
            className="bg-white text-purple-800 font-bold py-3 px-8 rounded-lg text-lg"
          >
            {data.finalCta.buttonText}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}