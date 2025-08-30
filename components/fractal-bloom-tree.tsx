"use client";

import React, { useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, GitBranch } from 'lucide-react';

// A utility function for class names
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

// Fractal Bloom Canvas Component
const FractalBloomCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let animationFrameId: number;
        const mouse = { x: window.innerWidth / 2, y: window.innerHeight };
        let currentDepth = 0;
        const maxDepth = 9;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const drawBranch = (x: number, y: number, angle: number, length: number, depth: number) => {
            if (depth > currentDepth) return;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            
            const endX = x + Math.cos(angle) * length;
            const endY = y + Math.sin(angle) * length;
            
            ctx.lineTo(endX, endY);
            
            const opacity = 1 - (depth / maxDepth);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.9})`; // Bleu
            ctx.lineWidth = 2 - (depth / maxDepth) * 1.5;
            ctx.stroke();

            // Mouse influence on branching angle
            const distToMouse = Math.hypot(endX - mouse.x, endY - mouse.y);
            const mouseEffect = Math.max(0, 1 - distToMouse / (canvas.height / 2));
            const angleOffset = (Math.PI / 8) * mouseEffect;

            drawBranch(endX, endY, angle - (Math.PI / 10) - angleOffset, length * 0.8, depth + 1);
            drawBranch(endX, endY, angle + (Math.PI / 10) + angleOffset, length * 0.8, depth + 1);
        };

        const animate = () => {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Fond blanc avec fading
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const startX = canvas.width / 2;
            const startY = canvas.height;
            const startLength = canvas.height / 5;
            
            drawBranch(startX, startY, -Math.PI / 2, startLength, 0);

            if (currentDepth < maxDepth) {
                currentDepth += 0.03;
            }
            
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        
        resizeCanvas();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full bg-white" />;
};


// The main hero component
const FractalBloomHero = () => {
    const fadeUpVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2 + 1.5, // Delay for fractal to grow
                duration: 0.8,
                ease: "easeInOut" as const,
            },
        }),
    };

    return (
        <div 
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        >
            <FractalBloomCanvas />
            
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent z-10"></div>

            {/* Overlay HTML Content */}
            <div className="relative z-20 text-center p-6">

                <motion.div
                    custom={1} 
                    variants={fadeUpVariants} 
                    initial="hidden" 
                    animate="visible"
                    className="mb-8"
                >
                    <img 
                        src="/logo-aracorp.png" 
                        alt="ARACORP Logo" 
                        className="h-24 md:h-32 mx-auto filter drop-shadow-2xl"
                    />
                </motion.div>

                <motion.p
                    custom={2} variants={fadeUpVariants} initial="hidden" animate="visible"
                    className="max-w-2xl mx-auto text-lg text-gray-700 mb-10"
                >
                    Un écosystème digital complet pour accélérer et pérenniser votre développement.
                </motion.p>

                <motion.div
                    custom={3} variants={fadeUpVariants} initial="hidden" animate="visible"
                >
                    <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2 mx-auto">
                        Débuter votre croissance
                        <ArrowRight className="h-5 w-5" />
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default FractalBloomHero;