"use client"
import React, { useState, useEffect } from 'react';
import { Star, Award, Users, Clock, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { useChatbot } from '@/components/chatbotContext';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown';
import Head from 'next/head';

interface CrookedTeethData {
  meta: { title: string; description: string };
  hero: {
    titleLine1: string;
    titleLine2: string;
    tagline: string;
    image: string;
    description: string;
  };
  whatIs: {
    title: string;
    description: string;
    concerns: string[];
    footer: string;
    image: string;
  };
  signs: {
    title: string;
    intro: string;
    items: string[];
    footer: string;
  };
  types: {
    title: string;
    image: string;
    items: { icon: string; iconBg: string; iconColor: string; title: string; description: string }[];
    footer: string;
  };
  procedure: {
    title: string;
    image: string;
    steps: { title: string; description: string }[];
    footer: string;
  };
  benefits: {
    title: string;
    image: string;
    intro: string;
    items: string[];
    footer: string;
  };
  cost: {
    title: string;
    intro: string;
    factors: string[];
    footer: string;
  };
  different: {
    title: string;
    items: { icon: string; gradient: string; title: string }[];
    footer: string;
  };
  testimonials: {
    title: string;
    items: { quote: string; author: string }[];
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    title: string;
    description: string;
    button: string;
    phone: string;
    address: string;
  };
}

const iconMap: { [key: string]: React.ElementType } = { Star, Award, Users, Clock };

const CrookedTeethPage = () => {
  const { handleOpenChatbot } = useChatbot();
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [content, setContent] = useState<CrookedTeethData | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/cosmetic/crooked-teeth.json";

      const LOCAL_URL = "/data/service/cosmetic/crooked-teeth.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: CrookedTeethData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: CrookedTeethData = await localRes.json();
          setContent(localData);
        } catch (localError) {
          console.error("Failed to load local fallback:", localError);
        }
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [content]);

  const fadeInUp = (id: string) => ({
    opacity: isVisible[id] ? 1 : 0,
    transform: isVisible[id] ? 'translateY(0)' : 'translateY(30px)',
    transition: 'all 0.6s ease-out'
  });

  if (!content) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden py-5 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Head>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
      </Head>

      {/* Header/Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div
            id="hero"
            data-animate
            style={fadeInUp('hero')}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <Markdown inline>{content.hero.titleLine1}</Markdown><br />
              <span className="text-yellow-300"><Markdown inline>{content.hero.titleLine2}</Markdown></span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 font-light">
              <Markdown inline>{content.hero.tagline}</Markdown>
            </p>
            <div className="relative h-80 md:h-96 max-w-full shadow-2xl rounded-xl shadow-lg mb-8">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={content.hero.image}
                alt="Crooked teeth orthodontic treatment"
                fill
                className="object-contain"
                priority
              />
            </div>
            <p className="text-lg md:text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
              <Markdown inline>{content.hero.description}</Markdown>
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* What Is Crooked Teeth Treatment */}
        <section
          id="what-is"
          data-animate
          style={fadeInUp('what-is')}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                <Markdown inline>{content.whatIs.title}</Markdown>
              </h2>
              <div className="w-20 h-1 bg-purple-600 mb-6"></div>
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  <Markdown inline>{content.whatIs.description}</Markdown>
                </p>
                <ul className="space-y-3 text-gray-700">
                  {content.whatIs.concerns.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><Markdown inline>{item}</Markdown></span>
                    </li>
                  ))}
                </ul>
                <p className="text-lg text-gray-700 mt-6 font-medium bg-purple-50 p-4 rounded-lg">
                  <Markdown inline>{content.whatIs.footer}</Markdown>
                </p>
              </div>
            </div>
            <div className="lg:order-first">
              <div className="relative h-80 md:h-96 max-w-full shadow-2xl rounded-xl shadow-lg mb-8">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl opacity-10"></div>
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.whatIs.image}
                  alt="Teeth alignment concerns"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Signs You May Need Treatment */}
        <section
          id="signs"
          data-animate
          style={fadeInUp('signs')}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              <Markdown inline>{content.signs.title}</Markdown>
            </h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              <Markdown inline>{content.signs.intro}</Markdown>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.signs.items.map((item, index) => (
              <div key={index} className="flex items-start bg-white rounded-xl shadow-md p-4 border border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm md:text-base"><Markdown inline>{item}</Markdown></span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-lg text-gray-700 bg-purple-50 p-6 rounded-xl max-w-3xl mx-auto">
              <Markdown inline>{content.signs.footer}</Markdown>
            </p>
          </div>
        </section>

        {/* Types of Crooked Teeth Treatments */}
        <section
          id="types-of-treatment"
          data-animate
          style={fadeInUp('types-of-treatment')}
          className="mb-20"
        >
          <div className="text-center mb-12 relative h-80 md:h-96 max-w-full shadow-2xl rounded-xl shadow-lg mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              <Markdown inline>{content.types.title}</Markdown>
            </h2>
            <div className="bg-purple-100 mx-auto mb-6">
              <div className="relative h-80 md:h-96 max-w-full shadow-2xl rounded-xl shadow-lg mb-8">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.types.image}
                  alt="Orthodontic treatment options"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {content.types.items.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-16 h-16 ${item.iconBg} rounded-full flex items-center justify-center mb-6`}>
                    <Icon className={`w-8 h-8 ${item.iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    <Markdown inline>{item.title}</Markdown>
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <Markdown inline>{item.description}</Markdown>
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <p className="text-lg text-gray-700 bg-gray-50 p-6 rounded-xl max-w-3xl mx-auto">
              <Markdown inline>{content.types.footer}</Markdown>
            </p>
          </div>
        </section>

        {/* Step-by-Step Procedure */}
        <section
          id="procedure"
          data-animate
          style={fadeInUp('procedure')}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative h-80 md:h-96 max-w-full shadow-2xl rounded-xl shadow-lg mb-8">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.procedure.image}
                  alt="Orthodontic treatment procedure"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                <Markdown inline>{content.procedure.title}</Markdown>
              </h2>
              <div className="w-20 h-1 bg-purple-600 mb-8"></div>
              <div className="space-y-5">
                {content.procedure.steps.map((step, index) => (
                  <div key={index} className="flex items-start bg-white rounded-xl shadow-md p-4 border border-gray-100">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-purple-600 font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        <Markdown inline>{step.title}</Markdown>
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        <Markdown inline>{step.description}</Markdown>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-lg text-gray-700 mt-6 font-medium bg-purple-50 p-4 rounded-lg">
                <Markdown inline>{content.procedure.footer}</Markdown>
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section
          id="benefits"
          data-animate
          style={fadeInUp('benefits')}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-800 rounded-3xl p-8 md:p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <Markdown inline>{content.benefits.title}</Markdown>
                </h2>
                <div className="w-20 h-1 bg-yellow-300 mb-8"></div>
                <div className="relative h-80 md:h-96 max-w-full shadow-2xl rounded-xl shadow-lg mb-8">
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={content.benefits.image}
                    alt="Orthodontic treatment benefits"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <div>
                <p className="text-xl mb-8 text-purple-100">
                  <Markdown inline>{content.benefits.intro}</Markdown>
                </p>
                <div className="grid gap-4">
                  {content.benefits.items.map((benefit, index) => (
                    <div key={index} className="flex items-center bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                      <Star className="w-6 h-6 text-yellow-300 mr-4 flex-shrink-0" />
                      <span className="text-lg text-black"><Markdown inline>{benefit}</Markdown></span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                  <p className="text-lg font-medium text-black">
                    <Markdown inline>{content.benefits.footer}</Markdown>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Section */}
        <section
          id="cost"
          data-animate
          style={fadeInUp('cost')}
          className="mb-20"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              <Markdown inline>{content.cost.title}</Markdown>
            </h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              <Markdown inline>{content.cost.intro}</Markdown>
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {content.cost.factors.map((factor, index) => (
                <span
                  key={index}
                  className="bg-purple-50 border border-purple-200 text-purple-700 text-sm px-4 py-2 rounded-full"
                >
                  <Markdown inline>{factor}</Markdown>
                </span>
              ))}
            </div>
            <p className="text-lg text-gray-700 font-medium bg-purple-50 p-4 rounded-lg max-w-2xl mx-auto">
              <Markdown inline>{content.cost.footer}</Markdown>
            </p>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section
          id="what-makes-different"
          data-animate
          style={fadeInUp('what-makes-different')}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              <Markdown inline>{content.different.title}</Markdown>
            </h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {content.different.items.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={index} className="text-center bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className={`w-20 h-20 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    <Markdown inline>{item.title}</Markdown>
                  </h3>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              <Markdown inline>{content.different.footer}</Markdown>
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials"
          data-animate
          style={fadeInUp('testimonials')}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              <Markdown inline>{content.testimonials.title}</Markdown>
            </h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {content.testimonials.items.map((t, index) => (
              <div key={index} className="bg-purple-50 rounded-2xl p-6 shadow-md border border-purple-100">
                <p className="text-gray-700 italic mb-4 leading-relaxed">
                  <Markdown inline>{t.quote}</Markdown>
                </p>
                <p className="text-purple-600 font-semibold text-sm">— {t.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          data-animate
          style={fadeInUp('faq')}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              <Markdown inline>{content.faq.title}</Markdown>
            </h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {content.faq.items.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-6 py-4 flex justify-between items-center"
                  >
                    <span className="font-semibold text-gray-800 pr-4">
                      <Markdown inline>{item.question}</Markdown>
                    </span>
                    <span className="text-purple-600 text-2xl flex-shrink-0">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                      <Markdown inline>{item.answer}</Markdown>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="cta"
          data-animate
          style={fadeInUp('cta')}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <Markdown inline>{content.cta.title}</Markdown>
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              <Markdown inline>{content.cta.description}</Markdown>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button onClick={handleOpenChatbot} className="bg-white text-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
                {content.cta.button}
              </button>
              <a
                href={`tel:${content.cta.phone}`}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-700 transition-all duration-300 flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                {content.cta.phone}
              </a>
            </div>
            <p className="flex items-center justify-center text-purple-100 text-sm md:text-base">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              {content.cta.address}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CrookedTeethPage;