import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Briefcase } from "lucide-react";
import { experiences } from "../constants";

// LEGO Brick Connector Component
const LegoBrickConnector = ({ color = "bg-red-500" }) => {
  return (
    <div className="relative flex items-center justify-center w-16 h-16">
      {/* Main brick */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`w-14 h-10 ${color} rounded-lg shadow-lg border-b-4 border-black border-opacity-30 relative`}
      >
        {/* LEGO studs on top */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-2">
          <div
            className={`w-3 h-3 ${color} rounded-full border-2 border-black border-opacity-20`}
          />
          <div
            className={`w-3 h-3 ${color} rounded-full border-2 border-black border-opacity-20`}
          />
        </div>
        {/* Inner detail */}
        <div className="absolute inset-2 border-2 border-white border-opacity-20 rounded" />
      </motion.div>
    </div>
  );
};

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Colors for LEGO bricks - rotating through classic colors
  const brickColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-yellow-400",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
  ];

  return (
    <div
      className="py-20 px-6 bg-linear-to-b from-green-200 via-yellow-200 to-orange-200 relative overflow-hidden"
      ref={containerRef}
    >
      {/* LEGO Baseplate Background */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 15 }).map((_, i) => (
          <React.Fragment key={i}>
            <div
              className="absolute w-full h-1 bg-gray-800"
              style={{ top: `${i * 7}%` }}
            />
            <div
              className="absolute h-full w-1 bg-gray-800"
              style={{ left: `${i * 7}%` }}
            />
          </React.Fragment>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black text-gray-900 uppercase mb-16 text-center"
          style={{ fontFamily: "Bungee, cursive" }}
        >
          My Work Experience
        </motion.h2>

        <div ref={ref} className="relative pb-20">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex justify-start pt-10 md:pt-32 md:gap-10"
            >
              {/* Timeline connector with LEGO brick */}
              <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
                <div className="absolute -left-[29px] md:-left-[32px]">
                  <LegoBrickConnector
                    color={brickColors[index % brickColors.length]}
                  />
                </div>

                {/* Desktop date/title */}
                <div className="hidden md:flex flex-col gap-3 md:pl-20">
                  <motion.div
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="inline-block"
                  >
                    <div className="px-6 py-3 bg-white rounded-lg shadow-lg border-b-4 border-gray-300">
                      <h3 className="text-3xl font-black text-gray-900 uppercase">
                        {item.date}
                      </h3>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="inline-block"
                  >
                    <div
                      className={`px-6 py-3 ${brickColors[index % brickColors.length]} rounded-lg shadow-lg border-b-4 border-black border-opacity-30`}
                    >
                      <h3 className="text-2xl font-black text-white uppercase">
                        {item.title}
                      </h3>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="inline-block"
                  >
                    <div className="px-6 py-3 bg-gray-800 rounded-lg shadow-lg border-b-4 border-gray-900 flex items-center gap-2">
                      <Briefcase size={20} className="text-yellow-400" />
                      <h3 className="text-xl font-bold text-white">
                        {item.job}
                      </h3>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="relative w-full pl-12 pr-4 md:pl-4">
                {/* Mobile date/title */}
                <div className="block mb-6 md:hidden space-y-3">
                  <div className="px-4 py-2 bg-white rounded-lg shadow-md border-b-4 border-gray-300 inline-block">
                    <h3 className="text-xl font-black text-gray-900 uppercase">
                      {item.date}
                    </h3>
                  </div>
                  <div
                    className={`px-4 py-2 ${brickColors[index % brickColors.length]} rounded-lg shadow-md border-b-4 border-black border-opacity-30 inline-block`}
                  >
                    <h3 className="text-lg font-black text-white uppercase">
                      {item.title}
                    </h3>
                  </div>
                  <div className="px-4 py-2 bg-gray-800 rounded-lg shadow-md border-b-4 border-gray-900 inline-flex items-center gap-2">
                    <Briefcase size={16} className="text-yellow-400" />
                    <h3 className="text-base font-bold text-white">
                      {item.job}
                    </h3>
                  </div>
                </div>

                {/* Experience content cards */}
                <div className="space-y-3">
                  {item.contents.map((content, contentIndex) => {
                    const contentColors = [
                      "bg-blue-100",
                      "bg-green-100",
                      "bg-yellow-100",
                      "bg-purple-100",
                    ];
                    return (
                      <motion.div
                        key={contentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: contentIndex * 0.1 }}
                        whileHover={{ x: 10, scale: 1.02 }}
                        className={`${contentColors[contentIndex % contentColors.length]} p-4 rounded-lg shadow-md border-l-8 ${brickColors[index % brickColors.length].replace("bg-", "border-")}`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-3 h-3 ${brickColors[index % brickColors.length]} rounded-full mt-1 shrink-0`}
                          />
                          <p className="font-bold text-gray-800 leading-relaxed">
                            {content}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Animated timeline line with LEGO studs */}
          <div
            style={{
              height: height + "px",
            }}
            className="absolute md:left-0 left-0 top-0 overflow-hidden w-[6px] bg-linear-to-b from-transparent via-gray-300 to-transparent rounded-full"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[6px] bg-linear-to-b from-red-500 via-yellow-400 to-blue-500 rounded-full shadow-lg"
            />

            {/* LEGO studs along the timeline */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-md border-2 border-white"
                style={{ top: `${i * 10}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating LEGO studs decoration */}
      <div className="absolute top-20 right-10 w-8 h-8 bg-red-500 rounded-full opacity-40 animate-pulse" />
      <div className="absolute bottom-40 left-10 w-6 h-6 bg-blue-500 rounded-full opacity-40 animate-pulse" />
      <div className="absolute top-1/2 right-20 w-7 h-7 bg-yellow-400 rounded-full opacity-40 animate-pulse" />
    </div>
  );
};

const Experiences = () => {
  return (
    <div className="w-full" id="work">
      <Timeline data={experiences} />
    </div>
  );
};

export default Experiences;
