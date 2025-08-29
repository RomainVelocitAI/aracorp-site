"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Rocket, Shield } from 'lucide-react';

// Fractal Bloom Canvas Component personnalisé pour ARACORP
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
            
            // Couleurs ARACORP - bleu vers cyan
            const hue = 200 + (depth * 10); // Bleu vers cyan
            const opacity = 1 - (depth / maxDepth) * 0.5;
            ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${opacity})`;
            ctx.lineWidth = 2 - (depth / maxDepth) * 1.5;
            ctx.stroke();

            // Mouse influence on branching angle
            const distToMouse = Math.hypot(endX - mouse.x, endY - mouse.y);
            const mouseEffect = Math.max(0, 1 - distToMouse / (canvas.height / 2));
            const angleOffset = (Math.PI / 8) * mouseEffect;

            drawBranch(endX, endY, angle - (Math.PI / 10) - angleOffset, length * 0.8, depth + 1);
            drawBranch(endX, endY, angle + (Math.PI / 10) + angleOffset, length * 0.8, depth + 1);
            
            // Branches supplémentaires pour plus de densité
            if (depth < 5 && mouseEffect > 0.3) {
                drawBranch(endX, endY, angle, length * 0.7, depth + 1);
            }
        };

        const animate = () => {
            // Fond avec dégradé ARACORP
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, 'rgba(10, 33, 192, 0.05)'); // Bleu ARACORP
            gradient.addColorStop(1, 'rgba(0, 16, 80, 0.05)'); // Bleu foncé
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const startX = canvas.width / 2;
            const startY = canvas.height;
            const startLength = canvas.height / 4;
            
            // Plusieurs arbres pour effet de forêt technologique
            for (let i = -1; i <= 1; i++) {
                drawBranch(startX + (i * 200), startY, -Math.PI / 2 + (i * 0.1), startLength, 0);
            }

            if (currentDepth < maxDepth) {
                currentDepth += 0.05; // Croissance progressive
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

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 z-0 w-full h-full"
            style={{
                background: 'linear-gradient(135deg, #0A21C0 0%, #001050 50%, #000428 100%)'
            }}
        />
    );
};

// Hero Component ARACORP
const HeroAracorp = () => {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15 + 0.5,
                duration: 0.8,
                ease: "easeOut",
            },
        }),
    };

    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            <FractalBloomCanvas />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A21C0]/50 via-transparent to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#001050]/80 z-10"></div>

            {/* Content */}
            <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
                <motion.div
                    custom={0} 
                    variants={fadeUpVariants} 
                    initial="hidden" 
                    animate="visible"
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-cyan-500/30 mb-8 backdrop-blur-md"
                >
                    <Sparkles className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm font-medium text-cyan-300 tracking-wider uppercase">
                        Innovation Technologique de Pointe
                    </span>
                </motion.div>

                <motion.h1
                    custom={1} 
                    variants={fadeUpVariants} 
                    initial="hidden" 
                    animate="visible"
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-white">
                        ARACORP
                    </span>
                </motion.h1>

                <motion.p
                    custom={2} 
                    variants={fadeUpVariants} 
                    initial="hidden" 
                    animate="visible"
                    className="text-xl md:text-2xl text-cyan-100/90 mb-4 font-light"
                >
                    Transformez votre Vision Digitale en Réalité
                </motion.p>

                <motion.p
                    custom={3} 
                    variants={fadeUpVariants} 
                    initial="hidden" 
                    animate="visible"
                    className="max-w-3xl mx-auto text-base md:text-lg text-gray-300/80 mb-12 leading-relaxed"
                >
                    Solutions technologiques innovantes qui propulsent votre entreprise 
                    vers de nouveaux sommets de performance et d'efficacité. 
                    Expertise en IA, Cloud, et transformation digitale.
                </motion.p>

                <motion.div
                    custom={4} 
                    variants={fadeUpVariants} 
                    initial="hidden" 
                    animate="visible"
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center gap-3 hover:scale-105">
                        <Rocket className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                        Découvrir nos Solutions
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button className="px-8 py-4 bg-white/5 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 flex items-center gap-3 hover:scale-105">
                        <Shield className="h-5 w-5" />
                        Consultation Gratuite
                    </button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    custom={5} 
                    variants={fadeUpVariants} 
                    initial="hidden" 
                    animate="visible"
                    className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10"
                >
                    <div>
                        <p className="text-3xl md:text-4xl font-bold text-cyan-400">500+</p>
                        <p className="text-sm text-gray-400 mt-1">Projets Réalisés</p>
                    </div>
                    <div>
                        <p className="text-3xl md:text-4xl font-bold text-cyan-400">98%</p>
                        <p className="text-sm text-gray-400 mt-1">Clients Satisfaits</p>
                    </div>
                    <div>
                        <p className="text-3xl md:text-4xl font-bold text-cyan-400">24/7</p>
                        <p className="text-sm text-gray-400 mt-1">Support Expert</p>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <motion.div 
                        className="w-1 h-2 bg-cyan-400 rounded-full"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default HeroAracorp;