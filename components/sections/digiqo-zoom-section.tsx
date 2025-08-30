"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DigiqoZoomSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 15]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center bg-gradient-to-b from-[#020617] to-[#0a0e27] overflow-hidden">
        <motion.h1
          style={{ scale, opacity }}
          className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400"
        >
          DIGIQO
        </motion.h1>
      </div>
    </div>
  );
};

export default DigiqoZoomSection;