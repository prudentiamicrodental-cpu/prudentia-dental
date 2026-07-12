"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { useChatbot } from "@/components/chatbotContext";
import { Image } from "@imagekit/next";
import Markdown from "@/components/markdown"; 

interface DenturesData {
  meta: { title: string; description: string };
  hero: { title: string; image: string; description: string };
  candidate: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    image: string;
  };
  types: {
    title: string;
    image: string;
    items: { id: string; title: string; content: string }[];
  };
  implantBenefits: { title: string; image: string; items: string[] };
  cta: { title: string; description: string; button: string };
}

export default function DenturesTreatment() {
  const { handleOpenChatbot } = useChatbot();
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("full");
  const [content, setContent] = useState<DenturesData | null>(null);

 useEffect(() => {
    async function loadData() {
      setLoaded(true);
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/dentures/dentures.json";

      const LOCAL_URL = "/data/service/dentures/dentures.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: DenturesData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: DenturesData = await localRes.json();
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

  const dentureTypes = content.types.items;

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
            {content.hero.title}
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
              alt="Modern denture solutions"
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
            {content.hero.description}
          </motion.p>
        </motion.section>

        {/* Candidate Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-semibold text-purple-800 mb-6">
                {content.candidate.title}
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                {content.candidate.paragraph1}
              </p>
              <p className="text-gray-700 text-lg">
                {content.candidate.paragraph2}
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-64 md:h-80 w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.candidate.image}
                alt="Denture candidate evaluation"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Types of Dentures */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-6 text-center">
            {content.types.title}
          </h2>

          <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-10">
            <Image
              urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
              src={content.types.image}
              alt="Types of dentures"
              fill
              className="object-contain"
            />
          </div>

          <div className="mb-10">
            <div className="flex border-b border-purple-200 mb-6">
              {dentureTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  className={`px-6 py-3 font-medium text-lg transition-colors ${activeTab === type.id ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600 hover:text-purple-500"}`}
                >
                  {type.title.split(" ")[0]}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-2xl font-semibold text-purple-700 mb-4">
                  {dentureTypes.find((t) => t.id === activeTab)?.title}
                </h3>
                <p className="text-gray-700">
                  {dentureTypes.find((t) => t.id === activeTab)?.content}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Implant Benefits */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 bg-white p-8 rounded-xl shadow-md"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-6">
            {content.implantBenefits.title}
          </h2>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.implantBenefits.image}
                  alt="Benefits of implant-supported dentures"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="lg:w-1/2">
              <ul className="space-y-4">
                {content.implantBenefits.items.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <span className="inline-block bg-purple-100 text-purple-800 rounded-full p-1 mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
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
            {content.cta.title}
          </h2>

          <div className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
            <Markdown>
              {content.cta.description}
            </Markdown>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <div className="flex justify-center">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#800080",
                  color: " #ffff",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenChatbot}
                transition={{ duration: 0.2 }}
                className="bg-transparent border-2 border-black text-black font-bold px-8 py-4 rounded-lg text-lg hover:bg-white hover:text-purple-900 transition duration-300"
              >
                {content.cta.button}
              </motion.button>
            </div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}
