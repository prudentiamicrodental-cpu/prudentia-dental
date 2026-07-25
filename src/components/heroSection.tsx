"use client"; // Required for Swiper in Next.js 13+

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Image } from "@imagekit/next";
import { useChatbot } from '@/components/chatbotContext';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Markdown from "./markdown";


interface BannerInfo {
  id: string;
  title: string;
  subtitle?: string;
  ctaText: string;
}

const HeroSection = () => {
  const { handleOpenChatbot } = useChatbot();
  const [banners, setBanners] = useState<BannerInfo[]>([]);

useEffect(() => {
    let isMounted = true;

    const GITHUB_URL =
      'https://raw.githubusercontent.com/prudentiamicrodental-cpu/Content/main/home/hero-banners.json';
    const LOCAL_URL = '/data/home/hero-banners.json';

    const loadLocal = () =>
      fetch(LOCAL_URL)
        .then((res) => {
          if (!res.ok) throw new Error(`Local fetch failed: ${res.status}`);
          return res.json();
        })
        .then((data: BannerInfo[]) => {
          if (isMounted) setBanners(data);
        })
        .catch((err) => console.error('Failed to load local hero banners:', err));

    fetch(GITHUB_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub fetch failed: ${res.status}`);
        return res.json();
      })
      .then((data: BannerInfo[]) => {
        if (isMounted) setBanners(data);
      })
      .catch((err) => {
        console.warn('Failed to load hero banners from GitHub, falling back to local:', err);
        return loadLocal();
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const getImageSrc = (imageName: string) => {
    return {
      desktop: `hero/desktop/${imageName}.jpg`,
      tablet: `hero/tablet/${imageName}.jpg`,
      mobile: `hero/mobile/${imageName}.jpg`,
    };
  };


  return (
    <section className="relative w-full h-[90vh] min-h-[500px] max-h-[1200px]">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 2000 }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        {banners.map((banner, index) => {
          const imageSrc = getImageSrc(banner.id);
          return (
            <SwiperSlide key={index}>
              <div  className=" relative w-full h-full">
                {/* Desktop Image */}
                <div className="hidden md:block relative w-full h-full">
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={imageSrc.desktop}
                    alt={`${banner.id} desktop`}
                    fill
                    priority={index === 0}
                    quality={100}
                    loading="eager"
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>

                {/* Tablet Image */}
                <div className="hidden sm:block md:hidden relative w-full h-full">
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={imageSrc.tablet}
                    alt={`${banner.id} tablet`}
                    fill
                    quality={100}
                    priority={index === 0}
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>

                {/* Mobile Image */}
                <div className="block sm:hidden relative w-full h-full">
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={imageSrc.mobile}
                    alt={`${banner.id} mobile`}
                    fill
                    quality={80}
                    priority={index === 0}
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30"></div>

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="text-white text-center max-w-4xl">
                    <Markdown className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                      {banner.title}
                    </Markdown>
                    {banner.subtitle && (
                      <Markdown className="text-xl sm:text-2xl mb-6">
                        {banner.subtitle}
                      </Markdown>
                    )}
                    <button className="px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    onClick={handleOpenChatbot}>
                      {banner.ctaText}
                    </button>
                  </div>
                </div>
              </div>
              
            </SwiperSlide>
            
          );
        })}
      </Swiper>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
     
    </section>
  );
};

export default HeroSection;