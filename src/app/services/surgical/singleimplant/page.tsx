"use client"
import React, { useState, useEffect } from 'react';
import { Smile, Shield, Heart, CheckCircle, Award, Star, Users, MapPin, Phone, HelpCircle, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useChatbot } from '@/components/chatbotContext';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown';
import Head from 'next/head';

const iconMap: { [key: string]: LucideIcon } = {
  Shield,
  Heart,
  CheckCircle,
  Award,
  Star,
  Users,
  MapPin,
  Phone,
  HelpCircle,
};

const renderIcon = (name: string, className: string) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

interface MetaData {
  title: string;
  description: string;
}

interface HeroData {
  titleLine1: string;
  titleHighlight: string;
  image: string;
}

interface IntroData {
  paragraphs: string[];
}

interface WhyChooseUsItem {
  text: string;
  icon: string;
  iconColor: string;
}

interface WhyChooseUsData {
  title: string;
  intro: string;
  subtitle: string;
  items: WhyChooseUsItem[];
  footer: string;
}

interface WhyChooseClinicItem {
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  color: string;
}

interface WhyChooseClinicData {
  title: string;
  image: string;
  items: WhyChooseClinicItem[];
  nearbyTitle: string;
  nearbyList: string[];
}

interface WhatIsData {
  title: string;
  paragraphs: string[];
  subtitle: string;
  benefitsList: string[];
  footer: string;
}

interface WhoCanBenefitData {
  title: string;
  intro: string;
  image: string;
  items: string[];
  footer: string;
}

interface ProcedureStep {
  number: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  color: string;
  borderColor: string;
}

interface ProcedureData {
  title: string;
  steps: ProcedureStep[];
}

interface BenefitItem {
  title: string;
  icon: string;
  iconColor: string;
  color: string;
}

interface BenefitsData {
  title: string;
  image: string;
  items: BenefitItem[];
}

interface CostData {
  title: string;
  intro: string;
  factorsTitle: string;
  factors: string[];
  offeringsTitle: string;
  offerings: string[];
  footer: string;
}

interface ConsultationData {
  title: string;
  intro: string;
  subtitle: string;
  items: string[];
  footer: string;
}

interface ServingAreasData {
  title: string;
  intro: string;
  areas: string[];
  footer: string;
}

interface TestimonialItem {
  quote: string;
}

interface TestimonialsData {
  title: string;
  items: TestimonialItem[];
  footer: string;
}

interface WhatToExpectItem {
  title: string;
  description: string;
  icon: string;
  iconColor: string;
}

interface WhatToExpectData {
  title: string;
  items: WhatToExpectItem[];
}

interface ConclusionData {
  title: string;
  paragraphs: string[];
  phoneLabel: string;
  phone: string;
  addressLabel: string;
  address: string;
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
  titleLine: string;
  titleHighlight: string;
  paragraph: string;
  buttonText: string;
  footerText: string;
}

interface ImplantsData {
  meta: MetaData;
  hero: HeroData;
  intro: IntroData;
  whyChooseUs: WhyChooseUsData;
  whyChooseClinic: WhyChooseClinicData;
  whatIs: WhatIsData;
  whoCanBenefit: WhoCanBenefitData;
  procedure: ProcedureData;
  benefits: BenefitsData;
  cost: CostData;
  consultation: ConsultationData;
  servingAreas: ServingAreasData;
  testimonials: TestimonialsData;
  whatToExpect: WhatToExpectData;
  conclusion: ConclusionData;
  faq: FaqData;
  finalCta: FinalCtaData;
}

const EMPTY_DATA: ImplantsData = {
  meta: { title: '', description: '' },
  hero: { titleLine1: '', titleHighlight: '', image: '' },
  intro: { paragraphs: [] },
  whyChooseUs: { title: '', intro: '', subtitle: '', items: [], footer: '' },
  whyChooseClinic: { title: '', image: '', items: [], nearbyTitle: '', nearbyList: [] },
  whatIs: { title: '', paragraphs: [], subtitle: '', benefitsList: [], footer: '' },
  whoCanBenefit: { title: '', intro: '', image: '', items: [], footer: '' },
  procedure: { title: '', steps: [] },
  benefits: { title: '', image: '', items: [] },
  cost: { title: '', intro: '', factorsTitle: '', factors: [], offeringsTitle: '', offerings: [], footer: '' },
  consultation: { title: '', intro: '', subtitle: '', items: [], footer: '' },
  servingAreas: { title: '', intro: '', areas: [], footer: '' },
  testimonials: { title: '', items: [], footer: '' },
  whatToExpect: { title: '', items: [] },
  conclusion: { title: '', paragraphs: [], phoneLabel: '', phone: '', addressLabel: '', address: '' },
  faq: { title: '', items: [] },
  finalCta: { titleLine: '', titleHighlight: '', paragraph: '', buttonText: '', footerText: '' },
};

const SingleToothImplantPage = () => {
  const { handleOpenChatbot } = useChatbot();
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [data, setData] = useState<ImplantsData>(EMPTY_DATA);

  useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/surgical/singleimplant.json";

      const LOCAL_URL = "/data/service/surgical/singleimplant.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: ImplantsData = await res.json();
        setData(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: ImplantsData = await localRes.json();
          setData(localData);
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

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [data]);

  const fadeInUp = (id: string) => ({
    opacity: isVisible[id] ? 1 : 0,
    transform: isVisible[id] ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease'
  });

  const slideInLeft = (id: string) => ({
    opacity: isVisible[id] ? 1 : 0,
    transform: isVisible[id] ? 'translateX(0)' : 'translateX(-50px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease'
  });

  const slideInRight = (id: string) => ({
    opacity: isVisible[id] ? 1 : 0,
    transform: isVisible[id] ? 'translateX(0)' : 'translateX(50px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease'
  });

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <Head>
        <title>{data.meta.title}</title>
        <meta name="description" content={data.meta.description} />
      </Head>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-700 via-purple-800 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              id="hero-content"
              data-animate
              style={slideInLeft('hero-content')}
            >
              <div className="flex items-center mb-6">
                <div className="bg-white bg-opacity-20 p-4 rounded-full backdrop-blur-sm mr-4">
                  <Smile className="w-12 h-12 text-black" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                    <Markdown inline>{data.hero.titleLine1}</Markdown>
                  </h1>
                  <p className="text-2xl lg:text-3xl text-yellow-300 font-semibold">
                    <Markdown inline>{data.hero.titleHighlight}</Markdown>
                  </p>
                </div>
              </div>
            </div>
            <div
              className="flex justify-center"
              id="hero-image"
              data-animate
              style={slideInRight('hero-image')}
            >
              <div className="bg-white bg-opacity-10 p-6 rounded-2xl backdrop-blur-sm relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                {data.hero.image && (
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={data.hero.image}
                    alt="Single tooth dental implant"
                    fill
                    className="object-contain"
                    priority
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto text-center"
            id="intro"
            data-animate
            style={fadeInUp('intro')}
          >
            {data.intro.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? "text-lg lg:text-xl text-gray-700 leading-relaxed mb-8" : "text-lg lg:text-xl text-gray-700 leading-relaxed"}
              >
                <Markdown inline>{paragraph}</Markdown>
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-gray-50 to-slate-50">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto text-center"
            id="why-choose-us"
            data-animate
            style={fadeInUp('why-choose-us')}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6">
              <Markdown inline>{data.whyChooseUs.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              <Markdown inline>{data.whyChooseUs.intro}</Markdown>
            </p>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              <Markdown inline>{data.whyChooseUs.subtitle}</Markdown>
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-8">
              {data.whyChooseUs.items.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  {renderIcon(item.icon, `w-6 h-6 flex-shrink-0 ${item.iconColor}`)}
                  <span className="text-gray-700"><Markdown inline>{item.text}</Markdown></span>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-700 leading-relaxed italic">
              <Markdown inline>{data.whyChooseUs.footer}</Markdown>
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Clinic Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div
              className="text-center mb-16"
              id="why-choose-clinic-title"
              data-animate
              style={fadeInUp('why-choose-clinic-title')}
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-8">
                <Markdown inline>{data.whyChooseClinic.title}</Markdown>
              </h2>
              {data.whyChooseClinic.image && (
                <div className="max-w-3xl mx-auto relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={data.whyChooseClinic.image}
                    alt="Prudentia Micro Dental Care implant technology"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {data.whyChooseClinic.items.map((item, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg border-2 ${item.color} p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                  id={`why-choose-clinic-${index}`}
                  data-animate
                  style={index % 2 === 0 ? slideInLeft(`why-choose-clinic-${index}`) : slideInRight(`why-choose-clinic-${index}`)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-white p-3 rounded-xl shadow-md flex-shrink-0">
                      {renderIcon(item.icon, `w-8 h-8 ${item.iconColor}`)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        <Markdown inline>{item.title}</Markdown>
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        <Markdown inline>{item.description}</Markdown>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-8"
              id="why-choose-clinic-nearby"
              data-animate
              style={fadeInUp('why-choose-clinic-nearby')}
            >
              <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">
                <Markdown inline>{data.whyChooseClinic.nearbyTitle}</Markdown>
              </h4>
              <ul className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {data.whyChooseClinic.nearbyList.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2 text-gray-700">
                    <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span><Markdown inline>{item}</Markdown></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What Is a Single Tooth Implant Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto"
            id="what-is"
            data-animate
            style={fadeInUp('what-is')}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-8 text-center">
              <Markdown inline>{data.whatIs.title}</Markdown>
            </h2>
            {data.whatIs.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 leading-relaxed mb-6">
                <Markdown inline>{paragraph}</Markdown>
              </p>
            ))}
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              <Markdown inline>{data.whatIs.subtitle}</Markdown>
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {data.whatIs.benefitsList.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white rounded-xl p-4 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700"><Markdown inline>{item}</Markdown></span>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-700 leading-relaxed italic text-center">
              <Markdown inline>{data.whatIs.footer}</Markdown>
            </p>
          </div>
        </div>
      </section>

      {/* Who Can Benefit Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div
                id="who-can-benefit-content"
                data-animate
                style={slideInLeft('who-can-benefit-content')}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                  <Markdown inline>{data.whoCanBenefit.title}</Markdown>
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  <Markdown inline>{data.whoCanBenefit.intro}</Markdown>
                </p>
                <ul className="space-y-3 mb-6">
                  {data.whoCanBenefit.items.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-lg text-gray-700"><Markdown inline>{item}</Markdown></span>
                    </li>
                  ))}
                </ul>
                <p className="text-lg text-gray-700 leading-relaxed italic">
                  <Markdown inline>{data.whoCanBenefit.footer}</Markdown>
                </p>
              </div>
              <div
                className="flex justify-center"
                id="who-can-benefit-image"
                data-animate
                style={slideInRight('who-can-benefit-image')}
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative h-80 md:h-96 w-full">
                  {data.whoCanBenefit.image && (
                    <Image
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      src={data.whoCanBenefit.image}
                      alt="Candidate for single tooth implant"
                      fill
                      className="object-contain"
                      priority
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Procedure Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-gray-50 to-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div
              className="text-center mb-16"
              id="procedure-title"
              data-animate
              style={fadeInUp('procedure-title')}
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-8">
                <Markdown inline>{data.procedure.title}</Markdown>
              </h2>
            </div>

            <div className="space-y-8">
              {data.procedure.steps.map((step, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-r ${step.color} rounded-2xl shadow-lg border-2 ${step.borderColor} overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                  id={`procedure-${index}`}
                  data-animate
                  style={index % 2 === 0 ? slideInLeft(`procedure-${index}`) : slideInRight(`procedure-${index}`)}
                >
                  <div className="lg:flex">
                    <div className="lg:w-1/4 p-8 flex flex-col items-center justify-center text-center bg-white bg-opacity-50">
                      <div className="bg-white rounded-full p-4 shadow-lg mb-4">
                        {renderIcon(step.icon, `w-10 h-10 ${step.iconColor}`)}
                      </div>
                      <div className="text-4xl font-bold text-gray-800 mb-2">
                        {step.number}
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                        <Markdown inline>{step.title}</Markdown>
                      </h3>
                    </div>
                    <div className="lg:w-3/4 p-8 flex items-center">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        <Markdown inline>{step.description}</Markdown>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div
              className="text-center mb-16"
              id="benefits-title"
              data-animate
              style={fadeInUp('benefits-title')}
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-8">
                <Markdown inline>{data.benefits.title}</Markdown>
              </h2>
              {data.benefits.image && (
                <div className="max-w-3xl mx-auto relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={data.benefits.image}
                    alt="Benefits of single tooth implant"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.benefits.items.map((benefit, index) => (
                <div
                  key={index}
                  className={`rounded-2xl shadow-md border-2 ${benefit.color} p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                  id={`benefit-${index}`}
                  data-animate
                  style={fadeInUp(`benefit-${index}`)}
                >
                  <div className="flex items-center space-x-3">
                    {renderIcon(benefit.icon, `w-7 h-7 flex-shrink-0 ${benefit.iconColor}`)}
                    <span className="text-gray-800 font-semibold"><Markdown inline>{benefit.title}</Markdown></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cost Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto"
            id="cost"
            data-animate
            style={fadeInUp('cost')}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-8 text-center">
              <Markdown inline>{data.cost.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
              <Markdown inline>{data.cost.intro}</Markdown>
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  <Markdown inline>{data.cost.factorsTitle}</Markdown>
                </h3>
                <ul className="space-y-3">
                  {data.cost.factors.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700"><Markdown inline>{item}</Markdown></span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  <Markdown inline>{data.cost.offeringsTitle}</Markdown>
                </h3>
                <ul className="space-y-3">
                  {data.cost.offerings.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700"><Markdown inline>{item}</Markdown></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed italic text-center">
              <Markdown inline>{data.cost.footer}</Markdown>
            </p>
          </div>
        </div>
      </section>

      {/* Same-Day Consultation Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto text-center"
            id="consultation"
            data-animate
            style={fadeInUp('consultation')}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6">
              <Markdown inline>{data.consultation.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              <Markdown inline>{data.consultation.intro}</Markdown>
            </p>
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              <Markdown inline>{data.consultation.subtitle}</Markdown>
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-8">
              {data.consultation.items.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700"><Markdown inline>{item}</Markdown></span>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-700 leading-relaxed italic">
              <Markdown inline>{data.consultation.footer}</Markdown>
            </p>
          </div>
        </div>
      </section>

      {/* Serving Areas Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-gray-50 to-slate-50">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto text-center"
            id="serving-areas"
            data-animate
            style={fadeInUp('serving-areas')}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6">
              <Markdown inline>{data.servingAreas.title}</Markdown>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              <Markdown inline>{data.servingAreas.intro}</Markdown>
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {data.servingAreas.areas.map((area, index) => (
                <span key={index} className="inline-flex items-center space-x-2 bg-white rounded-full px-5 py-2 shadow-sm border border-purple-200">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-700"><Markdown inline>{area}</Markdown></span>
                </span>
              ))}
            </div>
            <p className="text-lg text-gray-700 leading-relaxed italic">
              <Markdown inline>{data.servingAreas.footer}</Markdown>
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl lg:text-5xl font-bold text-gray-800 mb-12 text-center"
              id="testimonials-title"
              data-animate
              style={fadeInUp('testimonials-title')}
            >
              <Markdown inline>{data.testimonials.title}</Markdown>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {data.testimonials.items.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border-2 border-yellow-100 p-8"
                  id={`testimonial-${index}`}
                  data-animate
                  style={fadeInUp(`testimonial-${index}`)}
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star key={starIndex} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">
                    <Markdown inline>{testimonial.quote}</Markdown>
                  </p>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-700 leading-relaxed italic text-center">
              <Markdown inline>{data.testimonials.footer}</Markdown>
            </p>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl lg:text-5xl font-bold text-gray-800 mb-12 text-center"
              id="expect-title"
              data-animate
              style={fadeInUp('expect-title')}
            >
              <Markdown inline>{data.whatToExpect.title}</Markdown>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {data.whatToExpect.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-8 text-center"
                  id={`expect-${index}`}
                  data-animate
                  style={fadeInUp(`expect-${index}`)}
                >
                  <div className="bg-purple-50 rounded-full p-4 shadow-md inline-flex mb-4">
                    {renderIcon(item.icon, `w-8 h-8 ${item.iconColor}`)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    <Markdown inline>{item.title}</Markdown>
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <Markdown inline>{item.description}</Markdown>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto bg-gradient-to-r from-slate-700 via-purple-800 to-indigo-800 text-white rounded-2xl shadow-xl p-10 lg:p-16 text-center"
            id="conclusion"
            data-animate
            style={fadeInUp('conclusion')}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              <Markdown inline>{data.conclusion.title}</Markdown>
            </h2>
            {data.conclusion.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed mb-6 text-gray-100">
                <Markdown inline>{paragraph}</Markdown>
              </p>
            ))}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">{data.conclusion.phoneLabel} {data.conclusion.phone}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">{data.conclusion.addressLabel} {data.conclusion.address}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-gray-50 to-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl lg:text-5xl font-bold text-gray-800 mb-12 text-center"
              id="faq-title"
              data-animate
              style={fadeInUp('faq-title')}
            >
              <Markdown inline>{data.faq.title}</Markdown>
            </h2>
            <div className="space-y-4">
              {data.faq.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md border border-purple-100 p-6"
                  id={`faq-${index}`}
                  data-animate
                  style={fadeInUp(`faq-${index}`)}
                >
                  <div className="flex items-start space-x-3 mb-2">
                    <HelpCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <h3 className="text-lg font-bold text-gray-800">
                      <Markdown inline>{item.question}</Markdown>
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed pl-9">
                    <Markdown inline>{item.answer}</Markdown>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <Markdown inline>{data.finalCta.titleLine}</Markdown> <span className="text-purple-600"><Markdown inline>{data.finalCta.titleHighlight}</Markdown></span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              <Markdown inline>{data.finalCta.paragraph}</Markdown>
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenChatbot}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 flex items-center mx-auto text-lg"
            >
              {data.finalCta.buttonText} <FiArrowRight className="ml-2" />
            </motion.button>
            <p className="text-gray-500 mt-6">
              <Markdown inline>{data.finalCta.footerText}</Markdown>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SingleToothImplantPage;