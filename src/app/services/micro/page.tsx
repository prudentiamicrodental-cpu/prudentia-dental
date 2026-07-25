'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiZoomIn, FiEye, FiShield, FiActivity } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { useChatbot } from '@/components/chatbotContext';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown';
import { ChevronDown } from 'lucide-react';


const ICONS: Record<string, IconType> = { FiZoomIn, FiEye, FiShield, FiActivity };

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface ProcedureStep {
  title: string;
  description: string;
}

interface MetaData{
  title: string;
  description: string 
};


interface HeroData {
  titleLine1: string;
  titleHighlight: string;
  paragraph: string;
  buttonText: string;
  image: string;
  imageCaption: string;
}

interface WhyMattersItem {
  title: string;
  description: string;
}

interface PhilosophyBox {
  title: string;
  items: string[];
}

interface WhyMattersBox {
  title: string;
  paragraph: string;
  items: WhyMattersItem[];
}

interface MicroConsultationData {
  title: string;
  titleHighlight: string;
  subtitle: string;
  images: string[];
  philosophyBox: PhilosophyBox;
  whyMattersBox: WhyMattersBox;
}

interface WhyChooseData {
  title: string;
  titleHighlight: string;
  paragraph: string;
  image: string;
}

interface ProcessItem {
  label: string;
  text: string;
}

interface ProcessBox {
  title: string;
  items: ProcessItem[];
}

interface LongTermBox {
  title: string;
  paragraph: string;
}

interface AdvancedCleaningData {
  title: string;
  titleHighlight: string;
  subtitle: string;
  image: string;
  processBox: ProcessBox;
  longTermBox: LongTermBox;
}

interface HealthConnectionData {
  titleLine: string;
  titleHighlight: string;
  paragraph1: string;
  paragraph2: string;
  buttonText: string;
}
interface TestimonialsData {
  title: string;
  items: { quote: string }[];
}

interface FaqData {
  title: string;
  items: { question: string; answer: string }[];
}

interface CtaData {
  title: string;
  titleHighlight: string;
  paragraph: string;
  buttonText: string;
  footerText: string;
}

interface MicroData {
  meta: MetaData;
  hero: HeroData;
  microConsultation: MicroConsultationData;
  whyChoose: WhyChooseData;
  benefits: Benefit[];
  advancedCleaning: AdvancedCleaningData;
  healthConnection: HealthConnectionData;
  testimonials: TestimonialsData;
  faq: FaqData;
  cta: CtaData;
  procedureSteps: ProcedureStep[];
}

const EMPTY_DATA: MicroData = {
  meta: { title: '', description: '' },
  hero: { titleLine1: '', titleHighlight: '', paragraph: '', buttonText: '', image: '', imageCaption: '' },
  microConsultation: {
    title: '',
    titleHighlight: '',
    subtitle: '',
    images: [],
    philosophyBox: { title: '', items: [] },
    whyMattersBox: { title: '', paragraph: '', items: [] },
  },
  whyChoose: { title: '', titleHighlight: '', paragraph: '', image: '' },
  benefits: [],
  advancedCleaning: {
    title: '',
    titleHighlight: '',
    subtitle: '',
    image: '',
    processBox: { title: '', items: [] },
    longTermBox: { title: '', paragraph: '' },
  },
  healthConnection: { titleLine: '', titleHighlight: '', paragraph1: '', paragraph2: '', buttonText: '' },
  testimonials: {title: '',items:[]},
  faq: {title: '',items:[]},
  cta: { title: '', titleHighlight: '', paragraph: '', buttonText: '', footerText: '' },
  procedureSteps: [],
};

const MicroscopeDentistryPage = () => {
  const { handleOpenChatbot } = useChatbot();
  const [data, setData] = useState<MicroData>(EMPTY_DATA);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/micro/micro.json";

      const LOCAL_URL = "/data/service/micro/micro.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: MicroData = await res.json();
        setData(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: MicroData = await localRes.json();
          setData(localData);
        } catch (localError) {
          console.error("Failed to load local fallback:", localError);
        }
      }
    }

    loadData();
  }, []);

  const { meta,hero, microConsultation, whyChoose, benefits, advancedCleaning, healthConnection,testimonials,faq, cta, procedureSteps } = data;

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>

      <div className="min-h-screen py-10 overflow-hidden bg-gradient-to-b from-purple-50 to-white">
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-center">
              <motion.div 
                className="w-full lg:w-1/2 mb-8 lg:mb-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  <Markdown inline>{hero.titleLine1}</Markdown> <span className="text-purple-600"><Markdown inline>{hero.titleHighlight}</Markdown></span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
                  <Markdown inline>{hero.paragraph}</Markdown>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenChatbot}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-full shadow-lg transition-all duration-300 flex items-center text-sm sm:text-base"
                >
                  {hero.buttonText} <FiArrowRight className="ml-2" />
                </motion.button>
              </motion.div>

              <motion.div 
                className="w-full lg:w-1/2 lg:pl-8 xl:pl-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-xl shadow-lg mb-4 sm:mb-8 overflow-hidden">
                  {hero.image && (
                    <Image
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      src={hero.image}
                      alt="Dental microscope equipment for precision dentistry"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4 sm:p-6">
                    <p className="text-white text-sm sm:text-lg font-medium">
                      <Markdown inline>{hero.imageCaption}</Markdown>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What Is Micro-Consultation */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                <Markdown inline>{microConsultation.title}</Markdown> <span className="text-purple-600"><Markdown inline>{microConsultation.titleHighlight}</Markdown></span>?
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                <Markdown inline>{microConsultation.subtitle}</Markdown>
              </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row items-center">
              <motion.div 
                className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-8 xl:pr-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {microConsultation.images.map((image, index) => (
                    <div key={index} className="relative h-48 sm:h-64 md:h-80 w-full rounded-xl overflow-hidden shadow-lg">
                      <Image
                        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                        src={image}
                        alt="Microscopic view of dental examination"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <div className="col-span-1 sm:col-span-2 bg-purple-50 p-4 sm:p-6 rounded-xl border border-purple-100 mt-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-purple-800 mb-3">
                      <Markdown inline>{microConsultation.philosophyBox.title}</Markdown>
                    </h3>
                    <ul className="space-y-2">
                      {microConsultation.philosophyBox.items.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <FiCheck className="text-purple-600 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm sm:text-base">
                            <Markdown inline>{item}</Markdown>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-gray-50 p-6 sm:p-8 rounded-xl">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    <Markdown inline>{microConsultation.whyMattersBox.title}</Markdown>
                  </h3>
                  <p className="text-gray-600 mb-6">
                    <Markdown inline>{microConsultation.whyMattersBox.paragraph}</Markdown>
                  </p>
                  <div className="space-y-4">
                    {microConsultation.whyMattersBox.items.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-purple-100 p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                          <FiCheck className="text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">
                            <Markdown inline>{item.title}</Markdown>
                          </p>
                          <p className="text-gray-600 text-sm sm:text-base">
                            <Markdown inline>{item.description}</Markdown>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Microscopic Dentistry */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="flex flex-col lg:flex-row items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-8 xl:pr-10 order-2 lg:order-1">
                <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
                  {whyChoose.image && (
                    <Image
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      src={whyChoose.image}
                      alt="Benefits of microscopic dentistry"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="w-full lg:w-1/2 order-1 lg:order-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  <Markdown inline>{whyChoose.title}</Markdown> <span className="text-purple-600"><Markdown inline>{whyChoose.titleHighlight}</Markdown></span>?
                </h2>
                <p className="text-gray-600 mb-6 sm:mb-8">
                  <Markdown inline>{whyChoose.paragraph}</Markdown>
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {benefits.map((benefit, index) => {
                    const BenefitIcon = ICONS[benefit.icon];
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100"
                      >
                        <div className="flex items-center mb-3 sm:mb-4">
                          {BenefitIcon && <BenefitIcon className="text-2xl sm:text-3xl text-purple-600" />}
                          <p className="text-lg sm:text-xl font-semibold ml-3">
                            <Markdown inline>{benefit.title}</Markdown>
                          </p>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base">
                          <Markdown inline>{benefit.description}</Markdown>
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Advanced Cleaning Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                <Markdown inline>{advancedCleaning.title}</Markdown> <span className="text-purple-600"><Markdown inline>{advancedCleaning.titleHighlight}</Markdown></span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                <Markdown inline>{advancedCleaning.subtitle}</Markdown>
              </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row items-center">
              <motion.div 
                className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-8 xl:pr-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
                  {advancedCleaning.image && (
                    <Image
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      src={advancedCleaning.image}
                      alt="Advanced dental cleaning with microscope"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      className="object-cover"
                    />
                  )}
                </div>
              </motion.div>

              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-6">
                  <div className="bg-purple-50 p-4 sm:p-6 rounded-xl border border-purple-100">
                    <h3 className="text-lg sm:text-xl font-semibold text-purple-800 mb-3">
                      <Markdown inline>{advancedCleaning.processBox.title}</Markdown>
                    </h3>
                    <ul className="space-y-3">
                      {advancedCleaning.processBox.items.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <FiCheck className="text-purple-600 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm sm:text-base">
                            <strong><Markdown inline>{item.label}</Markdown>:</strong> <Markdown inline>{item.text}</Markdown>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                    <p className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                      <Markdown inline>{advancedCleaning.longTermBox.title}</Markdown>
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base">
                      <Markdown inline>{advancedCleaning.longTermBox.paragraph}</Markdown>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Health Connection Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-purple-100 text-black">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                  <Markdown inline>{healthConnection.titleLine}</Markdown> <span className="text-purple-800"><Markdown inline>{healthConnection.titleHighlight}</Markdown></span>
                </h2>
                <p className="text-lg sm:text-xl mb-6 sm:mb-8">
                  <Markdown inline>{healthConnection.paragraph1}</Markdown>
                </p>
                <p className="text-base sm:text-lg text-purple-700 mb-8 sm:mb-10">
                  <Markdown inline>{healthConnection.paragraph2}</Markdown>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenChatbot}
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3 px-6 sm:px-8 rounded-full shadow-lg transition-all duration-300 flex items-center mx-auto text-sm sm:text-base"
                >
                  {healthConnection.buttonText} <FiArrowRight className="ml-2" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Testimonials */}
                <section className="mb-32">
                  <div className="text-center mb-16" >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                      <Markdown inline>{testimonials.title}</Markdown>
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.items.map((item, index) => (
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
                      <Markdown inline>{faq.title}</Markdown>
                    </h2>
                  </div>
        
                  <div className="max-w-4xl mx-auto space-y-4">
                    {faq.items.map((item, index) => {
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

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  <Markdown inline>{cta.title}</Markdown> <span className="text-purple-600"><Markdown inline>{cta.titleHighlight}</Markdown></span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10">
                  <Markdown inline>{cta.paragraph}</Markdown>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
                  {procedureSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 text-left"
                    >
                      <div className="text-purple-600 font-bold text-xl sm:text-2xl mb-2">{index + 1}.</div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                        <Markdown inline>{step.title}</Markdown>
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        <Markdown inline>{step.description}</Markdown>
                      </p>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenChatbot}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-full shadow-lg transition-all duration-300 flex items-center mx-auto text-base sm:text-lg"
                >
                  {cta.buttonText} <FiArrowRight className="ml-2" />
                </motion.button>
                <p className="text-gray-500 mt-4 sm:mt-6 text-sm sm:text-base">
                  <Markdown inline>{cta.footerText}</Markdown>
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MicroscopeDentistryPage;