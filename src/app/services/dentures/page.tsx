"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { useChatbot } from "@/components/chatbotContext";
import { Image } from "@imagekit/next";
import Markdown from "@/components/markdown";

interface Feature {
  title: string;
  description: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
}

interface ExpectItem {
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface DenturesData {
  meta: { title: string; description: string };
  hero: { title: string; image: string; description: string };
  topRated: {
    title: string;
    description: string;
    points: string[];
    footnote: string;
  };
  whyChooseLocation: {
    title: string;
    features: Feature[];
    address: string;
  };
  whatAre: {
    title: string;
    description: string;
    advantages: string[];
    footnote: string;
  };
  candidate: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    image: string;
  };
  typesOverview: {
    title: string;
    items: Feature[];
  };
  types: {
    title: string;
    image: string;
    items: { id: string; title: string; content: string }[];
  };
  process: {
    title: string;
    steps: ProcessStep[];
  };
  implantBenefits: { title: string; image: string; items: string[] };
  benefits: {
    title: string;
    items: string[];
    footnote: string;
  };
  cost: {
    title: string;
    description: string;
    factors: string[];
    highlights: string[];
  };
  sameDayConsultation: {
    title: string;
    description: string;
    items: string[];
    footnote: string;
  };
  trustedAreas: {
    title: string;
    description: string;
    areas: string[];
    footnote: string;
  };
  testimonials: {
    title: string;
    items: Testimonial[];
    footnote: string;
  };
  whatToExpect: {
    title: string;
    items: ExpectItem[];
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  cta: {
    title: string;
    description: string;
    conclusionTitle: string;
    conclusion: string;
    button: string;
    phone: string;
    address: string;
  };
}

export default function DenturesTreatment() {
  const { handleOpenChatbot } = useChatbot();
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("full");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [content, setContent] = useState<DenturesData | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // Guards against a stale/old-shaped JSON (missing the newer sections)
    // being served from the CDN cache or an un-updated fallback file.
    function isValidSchema(data: any): data is DenturesData {
      return (
        !!data &&
        typeof data === "object" &&
        !!data.hero &&
        !!data.topRated &&
        !!data.whyChooseLocation &&
        !!data.whatAre &&
        !!data.candidate &&
        !!data.types &&
        !!data.process &&
        !!data.implantBenefits &&
        !!data.benefits &&
        !!data.cost &&
        !!data.faq &&
        !!data.cta
      );
    }

    async function loadData() {
      setLoaded(true);
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/dentures/dentures.json";

      const LOCAL_URL = "/data/service/dentures/dentures.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: DenturesData = await res.json();

        if (!isValidSchema(data)) {
          throw new Error("GitHub JSON is stale / missing expected fields");
        }

        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: DenturesData = await localRes.json();

          if (!isValidSchema(localData)) {
            throw new Error("Local JSON is stale / missing expected fields");
          }

          setContent(localData);
        } catch (localError) {
          console.error("Failed to load valid denture data:", localError);
          setLoadError(true);
        }
      }
    }

    loadData();
  }, []);

  if (!content) {
    return (
      <div className="min-h-screen flex justify-center items-center text-center px-4">
        {loadError
          ? "We couldn't load this page's content right now. Please refresh, or try again shortly."
          : "Loading..."}
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
              alt="Dentures near me in Pimple Saudagar"
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

        {/* Top Rated */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 bg-white p-8 md:p-12 rounded-xl shadow-md"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-6 text-center">
            <Markdown inline>{content.topRated.title}</Markdown>
          </h2>
          <p className="text-gray-700 text-lg mb-8 text-center max-w-3xl mx-auto">
            <Markdown inline>{content.topRated.description}</Markdown>
          </p>
          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-8">
            {content.topRated.points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <span className="text-yellow-400 text-xl">⭐</span>
                <span className="text-gray-700 text-lg">
                  <Markdown inline>{point}</Markdown>
                </span>
              </motion.div>
            ))}
          </div>
          <p className="text-gray-600 italic text-center">
            <Markdown inline>{content.topRated.footnote}</Markdown>
          </p>
        </motion.section>

        {/* Why Choose Location */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-8 text-center">
            <Markdown inline>{content.whyChooseLocation.title}</Markdown>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {content.whyChooseLocation.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold text-purple-700 mb-3">
                  <Markdown inline>{feature.title}</Markdown>
                </h3>
                <p className="text-gray-700">
                  <Markdown inline>{feature.description}</Markdown>
                </p>
              </motion.div>
            ))}
          </div>
          <div className="bg-purple-800 text-white rounded-xl p-6 text-center text-lg font-medium">
            📍 <Markdown inline>{content.whyChooseLocation.address}</Markdown>
          </div>
        </motion.section>

        {/* What Are Dentures */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 bg-white p-8 md:p-12 rounded-xl shadow-md"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-6 text-center">
            <Markdown inline>{content.whatAre.title}</Markdown>
          </h2>
          <p className="text-gray-700 text-lg mb-8 max-w-3xl mx-auto text-center">
            <Markdown inline>{content.whatAre.description}</Markdown>
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {content.whatAre.advantages.map((adv, index) => (
              <div
                key={index}
                className="bg-purple-50 rounded-lg p-4 text-center text-gray-700 font-medium"
              >
                <Markdown inline>{adv}</Markdown>
              </div>
            ))}
          </div>
          <p className="text-gray-600 italic text-center">
            <Markdown inline>{content.whatAre.footnote}</Markdown>
          </p>
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
                <Markdown inline>{content.candidate.title}</Markdown>
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                <Markdown inline>{content.candidate.paragraph1}</Markdown>
              </p>
              <p className="text-gray-700 text-lg">
                <Markdown inline>{content.candidate.paragraph2}</Markdown>
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

        {/* Types Overview */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-8 text-center">
            <Markdown inline>{content.typesOverview.title}</Markdown>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.typesOverview.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <h3 className="text-lg font-semibold text-purple-700 mb-3">
                  <Markdown inline>{item.title}</Markdown>
                </h3>
                <p className="text-gray-700 text-sm">
                  <Markdown inline>{item.description}</Markdown>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Types of Dentures (tabbed) */}
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
                  <Markdown inline>{type.title.split(" ")[0]}</Markdown>
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
                  <Markdown inline>
                    {dentureTypes.find((t) => t.id === activeTab)?.title || ""}
                  </Markdown>
                </h3>
                <p className="text-gray-700">
                  <Markdown inline>
                    {dentureTypes.find((t) => t.id === activeTab)?.content || ""}
                  </Markdown>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Process */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-8 text-center">
            <Markdown inline>{content.process.title}</Markdown>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.process.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-purple-700 mb-3">
                  <Markdown inline>{step.title}</Markdown>
                </h3>
                <p className="text-gray-700 text-sm">
                  <Markdown inline>{step.description}</Markdown>
                </p>
              </motion.div>
            ))}
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
            <Markdown inline>{content.implantBenefits.title}</Markdown>
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
                    <span className="text-gray-700">
                      <Markdown inline>{item}</Markdown>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Benefits */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-8 text-center">
            <Markdown inline>{content.benefits.title}</Markdown>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {content.benefits.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white p-5 rounded-lg shadow-md text-center text-gray-700 font-medium"
              >
                <Markdown inline>{item}</Markdown>
              </motion.div>
            ))}
          </div>
          <p className="text-gray-600 italic text-center">
            <Markdown inline>{content.benefits.footnote}</Markdown>
          </p>
        </motion.section>

        {/* Cost */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 bg-white p-8 md:p-12 rounded-xl shadow-md"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-6 text-center">
            <Markdown inline>{content.cost.title}</Markdown>
          </h2>
          <p className="text-gray-700 text-lg mb-8 max-w-3xl mx-auto text-center">
            <Markdown inline>{content.cost.description}</Markdown>
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-purple-700 mb-4">
                Factors Affecting Cost
              </h3>
              <ul className="space-y-3">
                {content.cost.factors.map((factor, index) => (
                  <li key={index} className="text-gray-700">
                    • <Markdown inline>{factor}</Markdown>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-700 mb-4">
                What We Provide
              </h3>
              <ul className="space-y-3">
                {content.cost.highlights.map((highlight, index) => (
                  <li key={index} className="text-gray-700 font-medium">
                    ✔ <Markdown inline>{highlight}</Markdown>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Same Day Consultation */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 bg-purple-800 text-white p-8 md:p-12 rounded-xl text-center"
        >
          <h2 className="text-3xl font-semibold mb-6">
            <Markdown inline>{content.sameDayConsultation.title}</Markdown>
          </h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto opacity-95">
            <Markdown inline>{content.sameDayConsultation.description}</Markdown>
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {content.sameDayConsultation.items.map((item, index) => (
              <span key={index} className="text-lg font-medium">
                ✔ <Markdown inline>{item}</Markdown>
              </span>
            ))}
          </div>
          <p className="italic opacity-90">
            <Markdown inline>{content.sameDayConsultation.footnote}</Markdown>
          </p>
        </motion.section>

        {/* Trusted Areas */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-6">
            <Markdown inline>{content.trustedAreas.title}</Markdown>
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            <Markdown inline>{content.trustedAreas.description}</Markdown>
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {content.trustedAreas.areas.map((area, index) => (
              <span
                key={index}
                className="bg-white shadow-md border border-purple-100 text-purple-700 font-semibold px-6 py-3 rounded-full"
              >
                <Markdown inline>{area}</Markdown>
              </span>
            ))}
          </div>
          <p className="text-gray-600 italic">
            <Markdown inline>{content.trustedAreas.footnote}</Markdown>
          </p>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-8 text-center">
            <Markdown inline>{content.testimonials.title}</Markdown>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {content.testimonials.items.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <p className="text-gray-700 italic mb-4">
                  "<Markdown inline>{testimonial.quote}</Markdown>"
                </p>
                <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
              </motion.div>
            ))}
          </div>
          <p className="text-gray-600 italic text-center">
            <Markdown inline>{content.testimonials.footnote}</Markdown>
          </p>
        </motion.section>

        {/* What to Expect */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-8 text-center">
            <Markdown inline>{content.whatToExpect.title}</Markdown>
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {content.whatToExpect.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <h3 className="text-lg font-semibold text-purple-700 mb-3">
                  <Markdown inline>{item.title}</Markdown>
                </h3>
                <p className="text-gray-700 text-sm">
                  <Markdown inline>{item.description}</Markdown>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-8 text-center">
            <Markdown inline>{content.faq.title}</Markdown>
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {content.faq.items.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  >
                    <span className="text-lg font-semibold text-purple-800">
                      <Markdown inline>{item.question}</Markdown>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-purple-600 flex-shrink-0"
                    >
                      ▼
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-5"
                      >
                        <p className="text-gray-700">
                          <Markdown inline>{item.answer}</Markdown>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* CTA / Conclusion Section */}
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

          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
            <Markdown inline>{content.cta.description}</Markdown>
          </p>

          <div className="bg-white p-8 md:p-12 rounded-xl shadow-md max-w-4xl mx-auto mb-10 text-left">
            <h3 className="text-2xl font-semibold text-purple-800 mb-4 text-center">
              <Markdown inline>{content.cta.conclusionTitle}</Markdown>
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              <Markdown inline>{content.cta.conclusion}</Markdown>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-lg font-medium text-purple-800">
              <a href={`tel:${content.cta.phone}`}>📞 {content.cta.phone}</a>
              <span>
                📍 <Markdown inline>{content.cta.address}</Markdown>
              </span>
            </div>
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
                <Markdown inline>{content.cta.button}</Markdown>
              </motion.button>
            </div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}