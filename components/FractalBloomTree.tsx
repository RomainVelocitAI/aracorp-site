"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const FractalBloomTree = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let currentDepth = 0;
        const maxDepth = 9;
        let time = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const drawBranch = (x: number, y: number, angle: number, length: number, depth: number) => {
            if (depth > currentDepth || length < 2) return;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            
            const endX = x + Math.cos(angle) * length;
            const endY = y + Math.sin(angle) * length;
            
            ctx.lineTo(endX, endY);
            
            // Dynamic color based on depth and time
            const hue = (depth * 30 + time * 2) % 360;
            const opacity = 1 - (depth / maxDepth) * 0.5;
            ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${opacity})`;
            ctx.lineWidth = Math.max(1, 4 - depth * 0.4);
            ctx.stroke();

            // Mouse interaction effect
            const distToMouse = Math.hypot(endX - mouse.x, endY - mouse.y);
            const mouseEffect = Math.max(0, 1 - distToMouse / 300);
            const angleOffset = (Math.PI / 6) * mouseEffect;

            // Recursive branches with bloom effect
            if (depth < maxDepth) {
                const branchAngle = Math.PI / 5 + angleOffset;
                const lengthFactor = 0.7 + mouseEffect * 0.1;
                
                // Left branch
                drawBranch(endX, endY, angle - branchAngle, length * lengthFactor, depth + 1);
                // Right branch
                drawBranch(endX, endY, angle + branchAngle, length * lengthFactor, depth + 1);
                
                // Additional bloom branches at higher depths
                if (depth > 3 && mouseEffect > 0.3) {
                    drawBranch(endX, endY, angle - branchAngle/2, length * 0.6, depth + 1);
                    drawBranch(endX, endY, angle + branchAngle/2, length * 0.6, depth + 1);
                }
            }
        };

        const animate = () => {
            ctx.fillStyle = 'rgba(10, 33, 192, 0.05)'; // Primary color with transparency
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            time += 0.5;
            
            // Gradually increase depth for bloom effect
            if (currentDepth < maxDepth) {
                currentDepth += 0.1;
            }
            
            // Draw multiple trees from bottom
            const baseY = canvas.height - 50;
            const treeCount = 5;
            const spacing = canvas.width / (treeCount + 1);
            
            for (let i = 1; i <= treeCount; i++) {
                const x = spacing * i;
                const baseAngle = -Math.PI / 2 + Math.sin(time * 0.01 + i) * 0.1;
                const baseLength = 100 + Math.sin(time * 0.02 + i * 2) * 20;
                
                drawBranch(x, baseY, baseAngle, baseLength, 0);
            }
            
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: 'linear-gradient(to bottom, #0A21C0, #001050)' }}
        />
    );
};

export default FractalBloomTree;