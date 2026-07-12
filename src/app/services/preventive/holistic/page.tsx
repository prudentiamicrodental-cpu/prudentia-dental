"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, Heart, Shield, Leaf, Users, LucideIcon } from "lucide-react";
import { useChatbot } from "@/components/chatbotContext";
import { Image } from "@imagekit/next";
import Markdown from '@/components/markdown';
import Head from "next/head";

const iconMap: { [key: string]: LucideIcon } = {
  Heart,
  Shield,
  Leaf,
  Users,
};

const renderIcon = (name: string, className: string) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

interface ApproachItem {
  icon: string;
  iconColor: string;
  title: string;
}

interface WhyChooseItem {
  icon: string;
  iconColor: string;
  text: string;
  spanClass: string;
}


interface MetaData{
  title: string;
  description: string 
};

interface HeroData {
  titleLine1: string;
  titleHighlight: string;
  subtitle: string;
  image: string;
}

interface IntroData {
  paragraphs: string[];
  approaches: ApproachItem[];
  closingParagraph: string;
}

interface DifferentData {
  title: string;
  paragraph: string;
  image: string;
}

interface MercuryData {
  title: string;
  images: string[];
  contentParagraphs: string[];
  commitmentTitle: string;
  commitmentItems: string[];
}

interface DietData {
  image: string;
  title: string;
  paragraphs: string[];
}

interface LifestyleData {
  title: string;
  introParagraph: string;
  items: string[];
  closingParagraph: string;
  image: string;
}

interface WhyChooseData {
  title: string;
  items: WhyChooseItem[];
}

interface CtaBoxData {
  title: string;
  paragraph: string;
}

interface LocationData {
  title: string;
  paragraph: string;
  ctaBox: CtaBoxData;
  image: string;
}

interface ContactData {
  title: string;
  paragraph: string;
  buttonText: string;
}

interface HolisticData {
  meta: MetaData;
  hero: HeroData;
  intro: IntroData;
  different: DifferentData;
  mercury: MercuryData;
  diet: DietData;
  lifestyle: LifestyleData;
  whyChoose: WhyChooseData;
  location: LocationData;
  contact: ContactData;
}

const EMPTY_DATA: HolisticData = {
  meta: { title: '', description: '' },
  hero: { titleLine1: "", titleHighlight: "", subtitle: "", image: "" },
  intro: { paragraphs: [], approaches: [], closingParagraph: "" },
  different: { title: "", paragraph: "", image: "" },
  mercury: { title: "", images: [], contentParagraphs: [], commitmentTitle: "", commitmentItems: [] },
  diet: { image: "", title: "", paragraphs: [] },
  lifestyle: { title: "", introParagraph: "", items: [], closingParagraph: "", image: "" },
  whyChoose: { title: "", items: [] },
  location: { title: "", paragraph: "", ctaBox: { title: "", paragraph: "" }, image: "" },
  contact: { title: "", paragraph: "", buttonText: "" },
};

const HolisticDentistryPage = () => {
  const { handleOpenChatbot } = useChatbot();
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [data, setData] = useState<HolisticData>(EMPTY_DATA);

 useEffect(() => {
    async function loadData() {
      const GITHUB_URL =
        "https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/service/preventive/holistic.json";

      const LOCAL_URL = "/data/service/preventive/holistic.json";

      try {
        const res = await fetch(GITHUB_URL);

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data: HolisticData = await res.json();
        setData(data);
      } catch (error) {
        console.warn("Using local fallback:", error);

        try {
          const localRes = await fetch(LOCAL_URL);

          if (!localRes.ok) {
            throw new Error("Local fetch failed");
          }

          const localData: HolisticData = await localRes.json();
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
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [data]);

  const fadeInUp = (id: string) => ({
    opacity: isVisible[id] ? 1 : 0,
    transform: isVisible[id] ? "translateY(0)" : "translateY(30px)",
    transition: "opacity 0.8s ease, transform 0.8s ease",
  });

  const slideInLeft = (id: string) => ({
    opacity: isVisible[id] ? 1 : 0,
    transform: isVisible[id] ? "translateX(0)" : "translateX(-50px)",
    transition: "opacity 0.8s ease, transform 0.8s ease",
  });

  const slideInRight = (id: string) => ({
    opacity: isVisible[id] ? 1 : 0,
    transform: isVisible[id] ? "translateX(0)" : "translateX(50px)",
    transition: "opacity 0.8s ease, transform 0.8s ease",
  });

  return (
    <div className="min-h-screen overflow-hidden py-5 bg-gradient-to-br from-purple-50 to-white overflow-x-hidden">
      <Head>
        <title>{data.meta.title}</title>
        <meta name="description" content={data.meta.description} />
      </Head>
      {/* Hero Section */}
      <section className="relative  bg-gradient-to-r from-purple-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 py-16 sm:py-20 lg:py-32">
          <div
            className="text-center max-w-4xl mx-auto"
            id="hero"
            data-animate
            style={fadeInUp("hero")}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight break-words">
              <Markdown inline>{data.hero.titleLine1}</Markdown>
              <br />
              <span className="text-pink-300"><Markdown inline>{data.hero.titleHighlight}</Markdown></span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90 break-words">
              <Markdown inline>{data.hero.subtitle}</Markdown>
            </p>
            {data.hero.image && (
              <div className="bg-white bg-opacity-20 relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8 rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm border border-white border-opacity-30">
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={data.hero.image}
                  alt="Modern denture solutions"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-70" />
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto text-center"
            id="intro"
            data-animate
            style={fadeInUp("intro")}
          >
            {data.intro.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8 px-2"
              >
                <Markdown inline>{paragraph}</Markdown>
              </p>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {data.intro.approaches.map((approach, index) => (
                <div
                  key={index}
                  className={`bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                    index === data.intro.approaches.length - 1 ? "sm:col-span-2 md:col-span-1" : ""
                  }`}
                >
                  {renderIcon(approach.icon, "w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 " + approach.iconColor)}
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    <Markdown inline>{approach.title}</Markdown>
                  </h3>
                </div>
              ))}
            </div>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed px-2">
              <Markdown inline>{data.intro.closingParagraph}</Markdown>
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Different Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div
                id="different"
                data-animate
                style={slideInLeft("different")}
                className="order-2 lg:order-1"
              >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 px-2 text-center lg:text-left">
                  <Markdown inline>{data.different.title}</Markdown>
                </h2>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed px-2">
                  <Markdown inline>{data.different.paragraph}</Markdown>
                </p>
              </div>
              <div
                className="flex relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8 justify-center order-1 lg:order-2"
                id="different-img"
                data-animate
                style={slideInRight("different-img")}
              >
                {data.different.image && (
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={data.different.image}
                    alt="Modern denture solutions"
                    fill
                    className="object-contain"
                    priority
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mercury-Free Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div
              className="text-center mb-8 sm:mb-12"
              id="mercury-title"
              data-animate
              style={fadeInUp("mercury-title")}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">
                <Markdown inline>{data.mercury.title}</Markdown>
              </h2>
              <div className="flex  flex-col sm:flex-row justify-center sm:space-x-4 space-y-4 sm:space-y-0 w-full max-w-4xl mx-auto">
                {data.mercury.images.map((image, index) => (
                  <div key={index} className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                    <Image
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      src={image}
                      alt="Modern denture solutions"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="bg-red-50 border-l-4 border-red-400 p-4 sm:p-6 mb-6 sm:mb-8 rounded-r-lg mx-2"
              id="mercury-content"
              data-animate
              style={fadeInUp("mercury-content")}
            >
              {data.mercury.contentParagraphs.map((paragraph, index) => (
                <p key={index} className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
                  <Markdown inline>{paragraph}</Markdown>
                </p>
              ))}
            </div>

            <div
              className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg mx-2"
              id="mercury-commitment"
              data-animate
              style={fadeInUp("mercury-commitment")}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
                <Markdown inline>{data.mercury.commitmentTitle}</Markdown>
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {data.mercury.commitmentItems.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 sm:mt-3 mr-3 sm:mr-4 flex-shrink-0"></div>
                    <p className="text-base sm:text-lg text-gray-700">
                      <Markdown inline>{item}</Markdown>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diet Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div
                className="flex justify-center order-2 lg:order-1"
                id="diet-img"
                data-animate
                style={slideInLeft("diet-img")}
              >
                <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                  {data.diet.image && (
                    <Image
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      src={data.diet.image}
                      alt="Modern denture solutions"
                      fill
                      className="object-contain"
                      priority
                    />
                  )}
                </div>
              </div>
              <div
                className="order-1 lg:order-2"
                id="diet-content"
                data-animate
                style={slideInRight("diet-content")}
              >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 px-2 text-center lg:text-left">
                  <Markdown inline>{data.diet.title}</Markdown>
                </h2>
                {data.diet.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={
                      index < data.diet.paragraphs.length - 1
                        ? "text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 px-2"
                        : "text-base sm:text-lg text-gray-700 leading-relaxed px-2"
                    }
                  >
                    <Markdown inline>{paragraph}</Markdown>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div
                id="lifestyle-content"
                data-animate
                style={slideInLeft("lifestyle-content")}
                className="order-2 lg:order-1"
              >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 px-2 text-center lg:text-left">
                  <Markdown inline>{data.lifestyle.title}</Markdown>
                </h2>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 px-2">
                  <Markdown inline>{data.lifestyle.introParagraph}</Markdown>
                </p>
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 px-2">
                  {data.lifestyle.items.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3 sm:mr-4 flex-shrink-0"></div>
                      <span className="text-base sm:text-lg text-gray-700">
                        <Markdown inline>{item}</Markdown>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed px-2">
                  <Markdown inline>{data.lifestyle.closingParagraph}</Markdown>
                </p>
              </div>
              <div
                className="flex justify-center order-1 lg:order-2"
                id="lifestyle-img"
                data-animate
                style={slideInRight("lifestyle-img")}
              >
                <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                  {data.lifestyle.image && (
                    <Image
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      src={data.lifestyle.image}
                      alt="Modern denture solutions"
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

      {/* Why Choose Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-8 sm:mb-12 px-2"
              id="why-choose-title"
              data-animate
              style={fadeInUp("why-choose-title")}
            >
              <Markdown inline>{data.whyChoose.title}</Markdown>
            </h2>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              id="why-choose-grid"
              data-animate
              style={fadeInUp("why-choose-grid")}
            >
              {data.whyChoose.items.map((item, index) => (
                <div
                  key={index}
                  className={`bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${item.spanClass}`}
                >
                  {renderIcon(item.icon, "w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 " + item.iconColor)}
                  <p className="text-base sm:text-lg text-gray-700">
                    <Markdown inline>{item.text}</Markdown>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div
                id="location-content"
                data-animate
                style={slideInLeft("location-content")}
                className="order-2 lg:order-1"
              >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 px-2 text-center lg:text-left">
                  <Markdown inline>{data.location.title}</Markdown>
                </h2>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8 px-2">
                  <Markdown inline>{data.location.paragraph}</Markdown>
                </p>
                <div className="bg-gradient-to-r from-purple-600 to-purple-600 text-white p-4 sm:p-6 rounded-lg mx-2">
                  <p className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                    <Markdown inline>{data.location.ctaBox.title}</Markdown>
                  </p>
                  <p className="text-base sm:text-lg opacity-90">
                    <Markdown inline>{data.location.ctaBox.paragraph}</Markdown>
                  </p>
                </div>
              </div>
              <div
                className="flex justify-center order-1 lg:order-2"
                id="location-img"
                data-animate
                style={slideInRight("location-img")}
              >
                <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
                  {data.location.image && (
                    <Image
                      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                      src={data.location.image}
                      alt="Modern denture solutions"
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

      {/* Contact Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-purple-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto text-center"
            id="contact"
            data-animate
            style={fadeInUp("contact")}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 px-2">
              <Markdown inline>{data.contact.title}</Markdown>
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 px-2">
              <Markdown inline>{data.contact.paragraph}</Markdown>
            </p>
            <button
              onClick={handleOpenChatbot}
              className="bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {data.contact.buttonText}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HolisticDentistryPage;