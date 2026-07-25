"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useChatbot } from '@/components/chatbotContext';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown';
import Head from 'next/head';

interface DentistNearMeData {
  meta: { title: string; description: string };
  banner: { image: string; title: string; subtitle: string };
  intro: { description: string };
  trustedDentist: { title: string; description: string; listTitle: string; items: string[]; note: string };
  whyChoose: {
    title: string;
    description: string;
    image: string;
    items: { title: string; description: string }[];
  };
  comprehensiveCare: { title: string; description: string; image: string; listTitle: string; items: string[]; note: string };
  experiencedCare: { title: string; description: string; image: string; listTitle: string; items: string[]; note: string };
  areasServed: { title: string; description: string; listTitle: string; items: string[]; note: string };
  testimonials: { title: string; description: string; listTitle: string; items: string[]; note: string };
  visitInfo: { title: string; description: string; clinicName: string; address: string; phone: string; note: string };
  cta: { title: string; description: string; button: string; footer: string };
  conclusion: { title: string; description: string };
  faqs: { title: string; items: { question: string; answer: string }[] };
}

// Helper component for scroll-triggered animations
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(sectionElement);

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className={`opacity-0 translate-y-10 transition-all duration-700 ease-out ${className}`}>
      {children}
    </div>
  );
};

// Small reusable checklist used across several sections
const CheckList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-4 text-lg text-gray-700">
    {items.map((item, index) => (
      <li key={index} className="flex items-start">
        <svg className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
        </svg>
        <Markdown>{item}</Markdown>
      </li>
    ))}
  </ul>
);

export default function DentalImplantsNearMe() {
  const { handleOpenChatbot } = useChatbot();
  const [content, setContent] = useState<DentistNearMeData | null>(null);

  useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/whymicrodentistry/dentalimplants.json";

      const LOCAL_URL = "/data/whymicrodentistry/dentalimplants.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: DentistNearMeData = await res.json();
        setContent(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: DentistNearMeData = await localRes.json();
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
    <div className="font-inter antialiased text-gray-800 bg-gray-50">
      <Head>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
      </Head>

      <main>
        {/* Banner Section */}
        <section className="relative h-96 flex items-center justify-center text-white overflow-hidden">
          <Image
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
            src={content.banner.image}
            alt="Dentist Near Me in Pimple Saudagar Banner"
            fill
            className="object-cover z-0"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-purple-900 opacity-70 z-10"></div>
          <AnimatedSection className="relative z-20 text-center p-4">
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
              <Markdown>{content.banner.title}</Markdown>
            </h2>
            <Markdown className="mt-4 text-xl md:text-2xl font-medium drop-shadow-md">
              {content.banner.subtitle}
            </Markdown>
          </AnimatedSection>
        </section>

        {/* Intro Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <AnimatedSection>
              <Markdown className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
                {content.intro.description}
              </Markdown>
            </AnimatedSection>
          </div>
        </section>

        {/* Trusted Dentist Section */}
        <section className="py-16 bg-purple-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <AnimatedSection>
              <h2 className="text-4xl font-bold text-center text-purple-800 mb-8">
                <Markdown>{content.trustedDentist.title}</Markdown>
              </h2>
              <Markdown className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 text-center max-w-3xl mx-auto">
                {content.trustedDentist.description}
              </Markdown>
            </AnimatedSection>
            <AnimatedSection className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-purple-700 mb-6 text-center">
                <Markdown>{content.trustedDentist.listTitle}</Markdown>
              </h3>
              <CheckList items={content.trustedDentist.items} />
              <Markdown className="mt-8 text-lg text-gray-700 leading-relaxed text-center italic">
                {content.trustedDentist.note}
              </Markdown>
            </AnimatedSection>
          </div>
        </section>

        {/* Why Patients Choose Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <AnimatedSection>
              <h2 className="text-4xl font-bold text-center text-purple-800 mb-6">
                <Markdown>{content.whyChoose.title}</Markdown>
              </h2>
              <Markdown className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 text-center max-w-3xl mx-auto">
                {content.whyChoose.description}
              </Markdown>
            </AnimatedSection>

            <div className="flex flex-col md:flex-row items-center md:space-x-12 mt-10">
              <AnimatedSection className="w-full md:w-1/2 mb-8 md:mb-0">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.whyChoose.image}
                  alt="Why Patients Choose Prudentia Micro Dental Care"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg w-full h-auto object-cover"
                />
              </AnimatedSection>
              <AnimatedSection className="w-full md:w-1/2">
                <div className="space-y-6">
                  {content.whyChoose.items.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <div>
                        <h4 className="text-xl font-semibold text-purple-700 mb-1">
                          <Markdown>{item.title}</Markdown>
                        </h4>
                        <Markdown className="text-lg text-gray-700 leading-relaxed">
                          {item.description}
                        </Markdown>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Comprehensive Care Section */}
        <section className="py-16 bg-purple-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <AnimatedSection>
              <h2 className="text-4xl font-bold text-center text-purple-800 mb-6">
                <Markdown>{content.comprehensiveCare.title}</Markdown>
              </h2>
              <Markdown className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 text-center max-w-3xl mx-auto">
                {content.comprehensiveCare.description}
              </Markdown>
            </AnimatedSection>

            <div className="flex flex-col md:flex-row-reverse items-center md:space-x-reverse md:space-x-12 mt-10">
              <AnimatedSection className="w-full md:w-1/2 mb-8 md:mb-0">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.comprehensiveCare.image}
                  alt="Comprehensive Dental Care Near You"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg w-full h-auto object-cover"
                />
              </AnimatedSection>
              <AnimatedSection className="w-full md:w-1/2">
                <h3 className="text-2xl font-semibold text-purple-700 mb-6">
                  <Markdown>{content.comprehensiveCare.listTitle}</Markdown>
                </h3>
                <CheckList items={content.comprehensiveCare.items} />
                <Markdown className="mt-8 text-lg text-gray-700 leading-relaxed">
                  {content.comprehensiveCare.note}
                </Markdown>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Experienced and Patient-Focused Care Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <AnimatedSection>
              <h2 className="text-4xl font-bold text-center text-purple-800 mb-6">
                <Markdown>{content.experiencedCare.title}</Markdown>
              </h2>
              <Markdown className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 text-center max-w-3xl mx-auto">
                {content.experiencedCare.description}
              </Markdown>
            </AnimatedSection>

            <div className="flex flex-col md:flex-row items-center md:space-x-12 mt-10">
              <AnimatedSection className="w-full md:w-1/2 mb-8 md:mb-0">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={content.experiencedCare.image}
                  alt="Experienced and Patient-Focused Dental Care"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg w-full h-auto object-cover"
                />
              </AnimatedSection>
              <AnimatedSection className="w-full md:w-1/2">
                <h3 className="text-2xl font-semibold text-purple-700 mb-6">
                  <Markdown>{content.experiencedCare.listTitle}</Markdown>
                </h3>
                <CheckList items={content.experiencedCare.items} />
                <Markdown className="mt-8 text-lg text-gray-700 leading-relaxed">
                  {content.experiencedCare.note}
                </Markdown>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Areas Served Section */}
        <section className="py-16 bg-purple-100">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <AnimatedSection>
              <h2 className="text-4xl font-bold text-purple-800 mb-6">
                <Markdown>{content.areasServed.title}</Markdown>
              </h2>
              <Markdown className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
                {content.areasServed.description}
              </Markdown>
              <h3 className="text-2xl font-semibold text-purple-700 mb-6">
                <Markdown>{content.areasServed.listTitle}</Markdown>
              </h3>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {content.areasServed.items.map((item, index) => (
                  <span
                    key={index}
                    className="bg-white text-purple-700 font-semibold px-6 py-2 rounded-full shadow-md text-lg"
                  >
                    <Markdown>{item}</Markdown>
                  </span>
                ))}
              </div>
              <Markdown className="text-lg text-gray-700 leading-relaxed italic">
                {content.areasServed.note}
              </Markdown>
            </AnimatedSection>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <AnimatedSection className="text-center">
              <h2 className="text-4xl font-bold text-purple-800 mb-6">
                <Markdown>{content.testimonials.title}</Markdown>
              </h2>
              <Markdown className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
                {content.testimonials.description}
              </Markdown>
              <h3 className="text-2xl font-semibold text-purple-700 mb-6">
                <Markdown>{content.testimonials.listTitle}</Markdown>
              </h3>
            </AnimatedSection>
            <AnimatedSection className="max-w-2xl mx-auto">
              <CheckList items={content.testimonials.items} />
              <Markdown className="mt-8 text-lg text-gray-700 leading-relaxed text-center italic">
                {content.testimonials.note}
              </Markdown>
            </AnimatedSection>
          </div>
        </section>

        {/* Visit Info Section */}
        <section className="py-16 bg-purple-50">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <AnimatedSection>
              <h2 className="text-4xl font-bold text-purple-800 mb-6">
                <Markdown>{content.visitInfo.title}</Markdown>
              </h2>
              <Markdown className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                {content.visitInfo.description}
              </Markdown>
              <div className="bg-white rounded-xl shadow-lg p-8 text-left inline-block">
                <div className="text-lg text-gray-800 mb-2">
                  <span className="font-semibold text-purple-700">Clinic Name: </span>
                  <Markdown className="inline">{content.visitInfo.clinicName}</Markdown>
                </div>
                <div className="text-lg text-gray-800 mb-2">
                  <span className="font-semibold text-purple-700">Address: </span>
                  <Markdown className="inline">{content.visitInfo.address}</Markdown>
                </div>
                <div className="text-lg text-gray-800">
                  <span className="font-semibold text-purple-700">Phone: </span>
                  <Markdown className="inline">{content.visitInfo.phone}</Markdown>
                </div>
              </div>
              <Markdown className="mt-8 text-lg text-gray-700 leading-relaxed">
                {content.visitInfo.note}
              </Markdown>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA / Book Appointment Section */}
        <section className="py-16 bg-purple-900 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <AnimatedSection>
              <h2 className="text-4xl font-bold mb-6">
                <Markdown>{content.cta.title}</Markdown>
              </h2>
              <Markdown className="text-lg md:text-xl leading-relaxed mb-10 max-w-3xl mx-auto opacity-90">
                {content.cta.description}
              </Markdown>
              <button
                onClick={handleOpenChatbot}
                className="inline-block bg-white hover:bg-purple-100 text-purple-800 font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                {content.cta.button}
              </button>
              <Markdown className="mt-6 text-md opacity-80">
                {content.cta.footer}
              </Markdown>
            </AnimatedSection>
          </div>
        </section>

        {/* Conclusion Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <AnimatedSection>
              <h2 className="text-4xl font-bold text-center text-purple-800 mb-6">
                <Markdown>{content.conclusion.title}</Markdown>
              </h2>
              <Markdown className="text-lg md:text-xl text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
                {content.conclusion.description}
              </Markdown>
            </AnimatedSection>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 bg-purple-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <AnimatedSection>
              <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">
                <Markdown>{content.faqs.title}</Markdown>
              </h2>
            </AnimatedSection>
            <div className="space-y-6">
              {content.faqs.items.map((faq, index) => (
                <AnimatedSection key={index} className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">
                    <Markdown>{faq.question}</Markdown>
                  </h3>
                  <Markdown className="text-lg text-gray-700 leading-relaxed">
                    {faq.answer}
                  </Markdown>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}