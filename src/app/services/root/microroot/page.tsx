
'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiZoomIn, FiShield, FiActivity, FiClock, FiEye } from 'react-icons/fi';
import { useChatbot } from '@/components/chatbotContext';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown';


const iconMap: Record<string, React.ReactElement> = {
  FiEye: <FiEye className="text-2xl sm:text-3xl text-purple-600" />,
  FiZoomIn: <FiZoomIn className="text-2xl sm:text-3xl text-purple-600" />,
  FiShield: <FiShield className="text-2xl sm:text-3xl text-purple-600" />,
  FiActivity: <FiActivity className="text-2xl sm:text-3xl text-purple-600" />,
  FiClock: <FiClock className="text-2xl sm:text-3xl text-purple-600" />,
};

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface ProcedureStep {
  title: string;
  description: string;
}

interface ComparisonRow {
  feature: string;
  micro: string;
  conventional: string;
}

interface MicroRootData {
  meta: { title: string; description: string };
  hero: { titleHighlight: string; titleRest: string; paragraph: string; button: string; image: string; imageCaption: string };
  whatIs: { image: string; titlePrefix: string; titleHighlight: string; titleSuffix: string; paragraph: string; whyChooseTitle: string; whyChooseItems: string[]; closingParagraph: string };
  microscopeAdvantage: { titlePrefix: string; titleHighlight: string; paragraph: string; image: string; advantagesTitle: string; advantages: string[]; invasiveTitle: string; invasiveParagraph: string };
  specialist: { titlePrefix: string; titleHighlight: string; titleSuffix: string; paragraph: string; expertiseTitle: string; expertiseItems: string[]; image: string };
  procedure: { titlePrefix: string; titleHighlight: string; paragraph: string; steps: ProcedureStep[]; painTitle: string; painParagraph1: string; painParagraph2: string };
  benefitsSection: { titlePrefix: string; titleHighlight: string };
  benefits: Benefit[];
  comparisonSection: { titlePrefix: string; titleHighlight: string; paragraph: string; closingTitle: string; closingParagraph1: string; closingParagraph2: string };
  comparisonData: ComparisonRow[];
  cta: { titlePrefix: string; titleHighlight: string; paragraph: string; button: string; footnote: string };
}

const MicroRootTreatmentPage = () => {
    const { handleOpenChatbot } = useChatbot();
  const [content, setContent] = useState<MicroRootData | null>(null);

  useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/root/microroot.json";

      const LOCAL_URL = "/data/service/root/microroot.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: MicroRootData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: MicroRootData = await localRes.json();
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

  const benefits = content.benefits;
  const procedureSteps = content.procedure.steps;
  const comparisonData = content.comparisonData;

  return (
    <>
      <Head>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
      </Head>

      <div className="min-h-screen py-16 sm:py-10 overflow-hidden bg-gradient-to-b from-purple-50 to-white">
        {/* Hero Section */}
        <section className="relative py-8 sm:py-12 lg:py-20 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-center">
              <motion.div 
                className="lg:w-1/2 mb-8 lg:mb-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                  <span className="text-purple-600"><Markdown inline>{content.hero.titleHighlight}</Markdown></span><Markdown inline>{content.hero.titleRest}</Markdown>
                </h1>
                <Markdown className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8">
                  {content.hero.paragraph}
                </Markdown>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenChatbot}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-full shadow-lg transition-all duration-300 flex items-center w-full sm:w-auto justify-center"
                >
                  {content.hero.button} <FiArrowRight className="ml-2" />
                </motion.button>
              </motion.div>

              <motion.div 
                className="lg:w-1/2 lg:pl-12 w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full rounded-xl shadow-lg mb-4 sm:mb-8 overflow-hidden">
                  <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.hero.image}
                    alt="Modern micro-root treatment"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    className="object-cover"
                    priority
                  />                    
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4 sm:p-6">
                    <p className="text-white text-sm sm:text-base lg:text-lg font-medium">{content.hero.imageCaption}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What Is Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="flex flex-col lg:flex-row items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-10 w-full">
                <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-6 sm:mb-8">
                  <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.whatIs.image}
                    alt="Microscope in root canal treatment"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    className="object-contain"
                    priority
                  />                     
                </div>
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  <Markdown inline>{content.whatIs.titlePrefix}</Markdown> <span className="text-purple-600"><Markdown inline>{content.whatIs.titleHighlight}</Markdown></span><Markdown inline>{content.whatIs.titleSuffix}</Markdown>
                </h2>
                <Markdown inline className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                  {content.whatIs.paragraph}
                </Markdown>
                <div className="bg-purple-50 p-4 sm:p-6 rounded-xl border border-purple-100 mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-purple-800 mb-3"><Markdown>{content.whatIs.whyChooseTitle}</Markdown></h3>
                  <ul className="space-y-2">
                    {content.whatIs.whyChooseItems.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <FiCheck className="text-purple-600 mt-1 mr-2 flex-shrink-0 text-sm sm:text-base" />
                        <span className="text-sm sm:text-base"><Markdown inline>{item}</Markdown></span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Markdown inline className="text-gray-600 text-sm sm:text-base">
                  {content.whatIs.closingParagraph}
                </Markdown>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Microscope Advantage */}
        <section className="py-12 sm:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                <Markdown inline>{content.microscopeAdvantage.titlePrefix}</Markdown> <span className="text-purple-600">
                  <Markdown inline>{content.microscopeAdvantage.titleHighlight}</Markdown></span>
              </h2>
              <Markdown inline className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                {content.microscopeAdvantage.paragraph}
              </Markdown>
            </motion.div>

            <div className="flex flex-col lg:flex-row items-center">
              <motion.div 
                className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-10 w-full"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-6 sm:mb-8">
                  <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.microscopeAdvantage.image}
                    alt="Microscope precision in root canal"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    className="object-contain"
                    priority
                  />   
                </div>
              </motion.div>
              <motion.div 
                className="lg:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-6">
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3"><Markdown>{content.microscopeAdvantage.advantagesTitle}</Markdown></h3>
                    <ul className="space-y-3">
                      {content.microscopeAdvantage.advantages.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <FiCheck className="text-purple-600 mt-1 mr-2 flex-shrink-0 text-sm sm:text-base" />
                          <span className="text-sm sm:text-base"><Markdown inline>{item}</Markdown></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 sm:p-6 rounded-xl border border-purple-100">
                    <h3 className="text-lg sm:text-xl font-semibold text-purple-800 mb-3"><Markdown inline>{content.microscopeAdvantage.invasiveTitle}</Markdown></h3>
                    <Markdown inline className="text-gray-700 text-sm sm:text-base">
                      {content.microscopeAdvantage.invasiveParagraph}
                    </Markdown>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Specialist Section */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-center">
              <motion.div 
                className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  <Markdown inline>{content.specialist.titlePrefix}</Markdown> 
                  <span className="text-purple-600">
                    <Markdown inline>{content.specialist.titleHighlight}</Markdown>
                    </span>
                    <Markdown inline>{content.specialist.titleSuffix}</Markdown>
                </h2>
                <Markdown inline className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                  {content.specialist.paragraph}
                </Markdown>
                <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">{content.specialist.expertiseTitle}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {content.specialist.expertiseItems.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <FiCheck className="text-purple-600 mt-1 mr-2 flex-shrink-0 text-sm sm:text-base" />
                        <span className="text-sm sm:text-base"><Markdown inline>{item}</Markdown></span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              <motion.div 
                className="lg:w-1/2 w-full"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full rounded-xl overflow-hidden shadow-lg">
                 <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.specialist.image}
                    alt="Specialist performing micro-root treatment"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    className="object-cover"
                    priority
                  />   
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Procedure Steps */}
        <section className="py-12 sm:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                <Markdown inline>{content.procedure.titlePrefix}</Markdown> <span className="text-purple-600"><Markdown inline>{content.procedure.titleHighlight}</Markdown></span>
              </h2>
              <Markdown inline className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                {content.procedure.paragraph}
              </Markdown>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {procedureSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 text-center"
                >
                  <div className="text-purple-600 font-bold text-2xl sm:text-3xl mb-4">{index + 1}</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3"><Markdown inline>{step.title}</Markdown></h3>
                  <p className="text-gray-600 text-sm sm:text-base"><Markdown inline>{step.description}</Markdown></p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 sm:mt-16 bg-purple-600 text-white p-6 sm:p-8 rounded-xl max-w-4xl mx-auto"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-4">{content.procedure.painTitle}</h3>
              <Markdown inline className="mb-4 text-sm sm:text-base">
                {content.procedure.painParagraph1}
             </Markdown>
              <Markdown inline className="text-sm sm:text-base">
                {content.procedure.painParagraph2}
              </Markdown>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                <Markdown inline>
                  {content.benefitsSection.titlePrefix} 
                  </Markdown>
                <span className="text-purple-600">
                  <Markdown inline>{content.benefitsSection.titleHighlight}</Markdown>
                  </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 text-center"
                >
                  <div className="flex justify-center mb-4">
                    {iconMap[benefit.icon]}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2"><Markdown inline>{benefit.title}</Markdown></h3>
                  <p className="text-gray-600 text-sm sm:text-base"><Markdown inline>{benefit.description}</Markdown></p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Comparison */}
        <section className="py-12 sm:py-20 bg-purple-600 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-2xl sm:text-3xl font-bold mb-4">
                <Markdown inline>
                  {content.comparisonSection.titlePrefix} 
                  </Markdown>
                <span className="text-purple-200">
                  <Markdown inline>{content.comparisonSection.titleHighlight}</Markdown></span>
              </div>
              <Markdown inline className="text-lg sm:text-xl max-w-3xl mx-auto">
                {content.comparisonSection.paragraph}
             </Markdown>
            </motion.div>

            <div className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-2xl max-w-4xl mx-auto overflow-x-auto">
              <div className="min-w-full">
                <div className="grid grid-cols-3 border-b border-gray-200 font-semibold min-w-full">
                  <div className="p-3 sm:p-4 text-sm sm:text-base">Feature</div>
                  <div className="p-3 sm:p-4 text-purple-600 text-center text-sm sm:text-base">Micro-Root</div>
                  <div className="p-3 sm:p-4 text-gray-600 text-center text-sm sm:text-base">Conventional</div>
                </div>
                {comparisonData.map((row, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <div className="p-3 sm:p-4 font-medium text-sm sm:text-base"><Markdown>{row.feature}</Markdown></div>
                    <div className="p-3 sm:p-4 text-purple-600 text-center text-xs sm:text-sm"><Markdown>{row.micro}</Markdown></div>
                    <div className="p-3 sm:p-4 text-gray-600 text-center text-xs sm:text-sm"><Markdown>{row.conventional}</Markdown></div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 sm:mt-16 bg-white/10 p-6 sm:p-8 rounded-xl max-w-4xl mx-auto backdrop-blur-sm"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-4">{content.comparisonSection.closingTitle}</h3>
              <Markdown inline className="mb-4 text-sm sm:text-base">
                {content.comparisonSection.closingParagraph1}
              </Markdown>
              <Markdown inline className="font-medium text-sm sm:text-base">
                {content.comparisonSection.closingParagraph2}
              </Markdown>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                <Markdown inline>
                  {content.cta.titlePrefix} 
                  </Markdown>
                <span className="text-purple-600"><Markdown inline>{content.cta.titleHighlight}</Markdown></span>
              </h2>
              <Markdown className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto">
                {content.cta.paragraph}
              </Markdown>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenChatbot}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-full shadow-lg transition-all duration-300 flex items-center mx-auto text-base sm:text-lg w-full sm:w-auto justify-center"
              >
                {content.cta.button} <FiArrowRight className="ml-2" />
              </motion.button>
              <Markdown className="text-gray-500 mt-4 sm:mt-6 text-sm sm:text-base">
                {content.cta.footnote}
            </Markdown>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MicroRootTreatmentPage;
