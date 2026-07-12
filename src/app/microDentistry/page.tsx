"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useChatbot } from '@/components/chatbotContext';
import { Image } from '@imagekit/next';
import Markdown from '@/components/markdown';
import Head from 'next/head';


interface MicroDentistryData {
  meta: { title: string; description: string };
  banner: { image: string; title: string; subtitle: string };
  whyChoose: { title: string; description: string; image: string; listTitle: string; items: string[] };
  benefits: { title: string; description: string; image: string; items: string[]; note: string };
  treatments: { title: string; description: string; image: string; items: string[] };
  cta: { title: string; description: string; button: string; footer: string };
}

// Helper component for scroll-triggered animations
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current; // Store the current value in a variable
    
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

    // Cleanup uses the stored variable
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

export default function MicroDentistry() {
  const { handleOpenChatbot } = useChatbot();
  const [content, setContent] = useState<MicroDentistryData | null>(null);

useEffect(() => {
  async function loadData() {
    const GITHUB_URL =
      "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/whymicrodentistry/microDentistry.json";

    const LOCAL_URL = "/data/whymicrodentistry/microDentistry.json";

    try {
      const res = await fetch(GITHUB_URL);

      if (!res.ok) throw new Error("GitHub fetch failed");

      const data: MicroDentistryData = await res.json();
      setContent(data);
    } catch (error) {
      console.warn("Using local fallback:", error);

      try {
        const localRes = await fetch(LOCAL_URL);

        if (!localRes.ok) {
          throw new Error("Local fetch failed");
        }

        const localData: MicroDentistryData = await localRes.json();
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
      {/* Main Content */}
      <main>
        {/* Banner Section */}
        <section className="relative h-96 flex items-center justify-center text-white overflow-hidden">
          <Image
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
            src={content.banner.image}
            alt="Micro-Dentistry Banner"
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

        {/* Why Choose Micro-Dentistry? Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <AnimatedSection>
              <h2 className="text-4xl font-bold text-center text-purple-800 mb-12"><Markdown>{content.whyChoose.title}</Markdown></h2>
              <Markdown className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 text-center max-w-3xl mx-auto">
                {content.whyChoose.description}</Markdown>
            
            </AnimatedSection>

            <div className="flex flex-col md:flex-row items-center md:space-x-12 mt-10">
              <AnimatedSection className="w-full md:w-1/2 mb-8 md:mb-0">
                 <Image
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
            src={content.whyChoose.image}
                  alt="Micro-Dentistry Precision"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg w-full h-auto object-cover"
                />
              </AnimatedSection>
              <AnimatedSection className="w-full md:w-1/2">
                <h3 className="text-2xl font-semibold text-purple-700 mb-6"><Markdown>{content.whyChoose.listTitle}</Markdown></h3>
                <ul className="space-y-4 text-lg text-gray-700">
                  {content.whyChoose.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <Markdown>{item}</Markdown>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* How You Benefit from Micro-Dentistry Section */}
        <section className="py-16 bg-purple-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <AnimatedSection>
              <h2 className="text-4xl font-bold text-center text-purple-800 mb-12"><Markdown>{content.benefits.title}</Markdown></h2>
              <Markdown className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 text-center max-w-3xl mx-auto">
                {content.benefits.description}
                </Markdown>
              
            </AnimatedSection>

            <div className="flex flex-col md:flex-row-reverse items-center md:space-x-reverse md:space-x-12 mt-10">
              <AnimatedSection className="w-full md:w-1/2 mb-8 md:mb-0">
                 <Image
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
            src={content.benefits.image}
                  alt="Micro-Dentistry Benefits"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg w-full h-auto object-cover"
                />
              </AnimatedSection>
              <AnimatedSection className="w-full md:w-1/2">
                <ul className="space-y-4 text-lg text-gray-700">
                  {content.benefits.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <Markdown>{item}</Markdown>
                    </li>
                  ))}
                </ul>
                <AnimatedSection className="mt-8 text-lg md:text-xl text-gray-700 leading-relaxed">
                  
                   <Markdown>
                     {content.benefits.note}
                     </Markdown>
                  
                </AnimatedSection>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Treatments Performed with Micro-Dentistry Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <AnimatedSection>
              <Markdown className="text-4xl font-bold text-center text-purple-800 mb-12">{content.treatments.title}</Markdown>
              <Markdown className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 text-center max-w-3xl mx-auto">
                {content.treatments.description}
              </Markdown>
            </AnimatedSection>

            <div className="flex flex-col md:flex-row items-center md:space-x-12 mt-10">
              <AnimatedSection className="w-full md:w-1/2 mb-8 md:mb-0">
                 <Image
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
            src={content.treatments.image}
                  alt="Micro-Dentistry Treatments"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg w-full h-auto object-cover"
                />
              </AnimatedSection>
              <AnimatedSection className="w-full md:w-1/2">
                <ul className="space-y-4 text-lg text-gray-700">
                  {content.treatments.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <Markdown>{item}</Markdown>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Experience the Future of Dental Care Section */}
        <section className="py-16 bg-purple-100">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <AnimatedSection>
              <Markdown className="text-4xl font-bold text-purple-800 mb-8">{content.cta.title}</Markdown>
              <Markdown className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 max-w-3xl mx-auto">
                {content.cta.description}
              </Markdown>
              <button
                onClick={handleOpenChatbot}
                className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                {content.cta.button}
              </button>
              <Markdown className="mt-6 text-md text-gray-600">
                {content.cta.footer}
              </Markdown>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </div>
  );
}