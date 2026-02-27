"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useChatbot } from "@/components/chatbotContext";
import { Image } from "@imagekit/next";
import { Variants } from "framer-motion";


export default function DentalJewelry() {
  const { handleOpenChatbot } = useChatbot();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

const shimmer: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      repeat: Infinity,
      repeatType: "reverse", // replaces yoyo
      duration: 1,
      ease: "easeInOut",
    },
  },
};

  return (
    <div className="bg-gradient-to-b from-purple-50  to-white overflow-hidden min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={fadeIn}
        className="relative pt-16 pb-32 flex content-center items-center justify-center"
        style={{ minHeight: "85vh" }}
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-50 opacity-50"></div>
          <motion.div
            className="absolute -top-1/2 -right-1/4 w-full h-full rounded-full bg-gradient-to-br from-pink-200 to-purple-200 opacity-20 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-1/4 -left-1/4 w-full h-full rounded-full bg-gradient-to-tr from-purple-200 to-pink-200 opacity-20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 px-4 ml-auto mr-auto text-center lg:text-left">
              <motion.h1
                variants={fadeIn}
                className="text-5xl font-bold text-purple-900 leading-tight mb-6"
              >
                Dental Jewelry
              </motion.h1>
              <motion.h2
                variants={fadeIn}
                className="text-2xl font-medium text-purple-700 mb-12"
              >
                Add Sparkle to Your Smile
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-xl text-purple-800 font-light mb-10"
              >
                Unleash the Shine and Shine Bright with Dental Jewelry
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenChatbot}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                Book Your Sparkle Session
              </motion.button>
            </div>
            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 px-4 ml-auto mr-auto mt-12 lg:mt-0"
            >
              <div className="relative h-80 md:h-96 w-full shadow-2xl rounded-xl  shadow-lg mb-8">
                <Image
                 urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src="hero/Services/cosmetic/4. Tooth jewellery/tooth-jewellery-smile-enhancement-cosmetic-dentistry-prudentia-pune.jpg"
                  alt="Modern denture solutions"
                  fill
                  className="object-cover"
                  priority
                />
                <motion.div
                  variants={shimmer}
                  animate="visible"
                  className="absolute -top-4 -left-4 w-20 h-20"
                >
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-pink-200 rounded-full blur-md opacity-70"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-300 rounded-full flex items-center justify-center">
                      <span className="text-2xl">✨</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Introduction Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.p
            variants={fadeIn}
            className="text-lg text-gray-700 leading-relaxed mb-8 max-w-4xl mx-auto text-center"
          >
            Looking for a way to add some extra sparkle to your smile? At
            Prudentia Micro Dental Care, Pimple Saudagar we bring you the latest
            trend in cosmetic dentistry, Dental Jewelry. This exciting new craze
            lets you express your unique style with high-quality, stunning tooth
            embellishments that light up your smile. Your smile is a reflection
            of your inner beauty, and we&apos;re here to help you enhance it
            with something truly dazzling!
          </motion.p>
        </div>
      </motion.section>

      {/* How Does It Work Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-gradient-to-br from-purple-50 to-pink-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center text-purple-900 mb-16"
          >
            How Does It Work?
          </motion.h2>

          <motion.p
            variants={fadeIn}
            className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12"
          >
            Dental jewelry is applied with the same precision and safety as
            placing an orthodontic bracket, a well- established, effective
            procedure that has been trusted for years.
          </motion.p>

          <motion.p
            variants={fadeIn}
            className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-8"
          >
            Here&apos;s how we do it:
          </motion.p>

          <div className="flex flex-wrap items-center mb-12">
            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0 order-2 lg:order-1"
            >
              <ol className="space-y-10">
                <motion.li
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <span className="text-purple-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-purple-800 mb-2">
                      Thorough Cleaning
                    </h3>
                    <p className="text-gray-700">
                      We first clean the selected spot on your tooth, ensuring
                      it&apos;s sterile and dry for optimal adhesion.
                    </p>
                  </div>
                </motion.li>

                <motion.li
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <span className="text-purple-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-purple-800 mb-2">
                      Placement of the Jewel
                    </h3>
                    <p className="text-gray-700">
                      Using a special adhesive, we gently place the sparkling
                      jewel onto your tooth without causing any harm to the
                      tooth structure.
                    </p>
                  </div>
                </motion.li>
              </ol>

              <motion.p
                variants={fadeIn}
                className="mt-10 text-xl text-center lg:text-left text-purple-700 font-medium"
              >
                It&apos;s painless, quick, and completely non-invasive!
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 px-4 order-1 lg:order-2"
            >
              <div className="relative h-80 md:h-96 w-full shadow-2xl rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                 urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src="hero/Services/cosmetic/4. Tooth jewellery/tooths-jewellery-smile-enhancement-cosmetic-dentistry-prudentia-pune.jpg"
                  alt="Modern denture solutions"
                  fill
                  className="object-cover"
                  priority
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900 to-transparent p-4"
                >
                  <p className="text-white">
                    {" "}
                    The dental jewelry application process
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Advantages Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center text-purple-900 mb-16"
          >
            Advantages of Dental Jewelry
          </motion.h2>

          <div className="flex flex-wrap items-center">
            <motion.div
              variants={fadeIn}
              className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0"
            >
              <div className="relative h-80 md:h-96 w-full shadow-2xl rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                 urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src="hero/Services/cosmetic/4. Tooth jewellery/tooths-jewellerys-smile-enhancement-cosmetic-dentistry-prudentia-pune.jpeg"
                  alt="Modern denture solutions"
                  fill
                  className="object-contain"
                  priority
                />

                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(168, 85, 247, 0)",
                      "0 0 20px rgba(168, 85, 247, 0.5)",
                      "0 0 0px rgba(168, 85, 247, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-xl"
                ></motion.div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="w-full lg:w-1/2 px-4">
              <ul className="space-y-8">
                <motion.li
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <span className="text-purple-600 text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-purple-800 mb-2">
                      No Drilling, No Damage
                    </h3>
                    <p className="text-gray-700">
                      The procedure is entirely tooth-friendly - no drilling, so
                      your tooth structure remains intact.
                    </p>
                  </div>
                </motion.li>

                <motion.li
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <span className="text-purple-600 text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-purple-800 mb-2">
                      Quick & Painless
                    </h3>
                    <p className="text-gray-700">
                      The process takes less than 15 minutes and is completely
                      comfortable.
                    </p>
                  </div>
                </motion.li>

                <motion.li
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <span className="text-purple-600 text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-purple-800 mb-2">
                      Customizable & Removable
                    </h3>
                    <p className="text-gray-700">
                      Want a change? No problem! The jewelry can be removed or
                      replaced at any time, allowing you to keep your smile
                      fresh and stylish.
                    </p>
                  </div>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Safe & Stunning Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20 bg-gradient-to-br from-purple-50 to-pink-50"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center text-purple-900 mb-10"
          >
            Safe & Stunning
          </motion.h2>

          <motion.div
            variants={fadeIn}
            className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
          >
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            ></motion.div>

            <p className="text-lg text-gray-700 leading-relaxed relative z-10">
              Rest assured, the jewelry used is safe, and the procedure is
              gentle and secure. It bonds seamlessly to your tooth, leaving you
              with a beautiful, lasting addition to your smile without
              compromising your dental health.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
        className="py-20  bg-purple-700  text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 variants={fadeIn} className="text-3xl font-bold mb-6">
            Ready to Sparkle?
          </motion.h2>

          <motion.p
            variants={fadeIn}
            className="text-lg max-w-3xl mx-auto mb-10"
          >
            Want to add a touch of glamour to your smile? Visit Prudentia Micro
            Dental Care today and let us help you shine brighter than ever
            before with our luxurious dental jewelry.
          </motion.p>

          <motion.div variants={fadeIn} className="mt-8">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(255, 255, 255, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenChatbot}
              transition={{ duration: 0.2 }}
              className="bg-purple-800 text-white font-bold px-10 py-4 rounded-lg text-lg border-2 border-white/20 shadow-lg"
            >
              Schedule your appointment now
            </motion.button>
            <motion.p variants={fadeIn} className="mt-6 text-purple-200">
              Take the first step toward a truly one-of-a-kind smile.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
