'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import * as THREE from 'three';

// --- Default Images (used if no cardImages prop is provided) ---
const defaultCardImages = [
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b55e654d1341fb06f8_4.1.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5a080a31ee7154b19_1.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5c1e4919fd69672b8_3.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5f6a5e232e7beb4be_2.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5bea2f1b07392d936_4.png",
];

// --- Helper function to generate ASCII-like code ---
const ASCII_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";
const generateCode = (width: number, height: number): string => {
  let text = "";
  for (let i = 0; i < width * height; i++) {
    text += ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
  }
  let out = "";
  for (let i = 0; i < height; i++) {
    out += text.substring(i * width, (i + 1) * width) + "\n";
  }
  return out;
};

// --- Component Props Type Definition ---
type ScannerCardStreamProps = {
  showControls?: boolean;
  showSpeed?: boolean;
  initialSpeed?: number;
  direction?: -1 | 1;
  cardImages?: string[];
  repeat?: number;
  cardGap?: number;
  friction?: number;
  scanEffect?: 'clip' | 'scramble';
};

// --- The Main Component ---
const ScannerCardStream = ({
  showControls = false,
  showSpeed = false,
  initialSpeed = 150,
  direction = -1,
  cardImages = defaultCardImages,
  repeat = 6,
  cardGap = 60,
  friction = 0.95,
  scanEffect = 'scramble',
}: ScannerCardStreamProps) => {

  const [speed, setSpeed] = useState(initialSpeed);
  const [isPaused, setIsPaused] = useState(false);
  const [isScanning, setIsScanning] = useState(false); // New state for scanner visibility
  
  const cards = useMemo(() => {
    const totalCards = cardImages.length * repeat;
    return Array.from({ length: totalCards }, (_, i) => ({
      id: i,
      image: cardImages[i % cardImages.length],
      ascii: generateCode(Math.floor(400 / 6.5), Math.floor(250 / 13)),
    }))
  }, [cardImages, repeat]);

  const cardLineRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null);
  const originalAscii = useRef(new Map<number, string>());

  const cardStreamState = useRef({
    position: 0, velocity: initialSpeed, direction: direction, isDragging: false,
    lastMouseX: 0, lastTime: performance.now(), cardLineWidth: (400 + cardGap) * cards.length,
    friction: friction, minVelocity: 30,
  });

  const scannerState = useRef({ isScanning: false });
  
  const toggleAnimation = useCallback(() => setIsPaused(prev => !prev), []);
  const resetPosition = useCallback(() => {
    if (cardLineRef.current) {
        cardStreamState.current.position = cardLineRef.current.parentElement?.offsetWidth || 0;
        cardStreamState.current.velocity = initialSpeed;
        cardStreamState.current.direction = direction;
        setIsPaused(false);
    }
  }, [initialSpeed, direction]);
  const changeDirection = useCallback(() => { cardStreamState.current.direction *= -1; }, []);

  useEffect(() => {
    const cardLine = cardLineRef.current;
    const scannerCanvas = scannerCanvasRef.current;

    if (!cardLine || !scannerCanvas) return;
    
    cards.forEach(card => originalAscii.current.set(card.id, card.ascii));
    let animationFrameId: number;

    // --- Scanner canvas setup ---
    const ctx = scannerCanvas.getContext('2d')!;
    scannerCanvas.width = window.innerWidth;
    scannerCanvas.height = 300;
    let scannerParticles: any[] = [];
    const baseMaxParticles = 800;
    let currentMaxParticles = baseMaxParticles;
    const scanTargetMaxParticles = 2500;
    const createScannerParticle = () => ({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 3, y: Math.random() * 300, vx: Math.random() * 0.8 + 0.2, vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 0.6 + 0.4, alpha: Math.random() * 0.4 + 0.6, life: 1.0, decay: Math.random() * 0.02 + 0.005,
    });
    for (let i = 0; i < baseMaxParticles; i++) scannerParticles.push(createScannerParticle());
    
    const runScrambleEffect = (element: HTMLElement, cardId: number) => {
        if (element.dataset.scrambling === 'true') return;
        element.dataset.scrambling = 'true';
        const originalText = originalAscii.current.get(cardId) || '';
        let scrambleCount = 0;
        const maxScrambles = 10;
        const interval = setInterval(() => {
            element.textContent = generateCode(Math.floor(400 / 6.5), Math.floor(250 / 13));
            scrambleCount++;
            if (scrambleCount >= maxScrambles) {
                clearInterval(interval);
                element.textContent = originalText;
                delete element.dataset.scrambling;
            }
        }, 30);
    };

    const updateCardEffects = () => {
      const scannerX = window.innerWidth / 2;
      const scannerWidth = 8;
      const scannerLeft = scannerX - scannerWidth / 2;
      const scannerRight = scannerX + scannerWidth / 2;
      let anyCardIsScanning = false;
      cardLine.querySelectorAll<HTMLElement>(".card-wrapper").forEach((wrapper, index) => {
        const rect = wrapper.getBoundingClientRect();
        const normalCard = wrapper.querySelector<HTMLElement>(".card-normal")!;
        const asciiCard = wrapper.querySelector<HTMLElement>(".card-ascii")!;
        const asciiContent = asciiCard.querySelector<HTMLElement>('pre')!;
        if (rect.left < scannerRight && rect.right > scannerLeft) {
          anyCardIsScanning = true;
          if (scanEffect === 'scramble' && wrapper.dataset.scanned !== 'true') {
              runScrambleEffect(asciiContent, index);
          }
          wrapper.dataset.scanned = 'true';
          const intersectLeft = Math.max(scannerLeft - rect.left, 0);
          const intersectRight = Math.min(scannerRight - rect.left, rect.width);
          normalCard.style.setProperty("--clip-right", `${(intersectLeft / rect.width) * 100}%`);
          asciiCard.style.setProperty("--clip-left", `${(intersectRight / rect.width) * 100}%`);
        } else {
          delete wrapper.dataset.scanned;
          if (rect.right < scannerLeft) {
            normalCard.style.setProperty("--clip-right", "100%");
            asciiCard.style.setProperty("--clip-left", "100%");
          } else {
            normalCard.style.setProperty("--clip-right", "0%");
            asciiCard.style.setProperty("--clip-left", "0%");
          }
        }
      });
      // Update state for scanner visibility
      setIsScanning(anyCardIsScanning);
      scannerState.current.isScanning = anyCardIsScanning;
    };
    
    const handleMouseDown = (e: MouseEvent | TouchEvent) => { /* ... */ };
    const handleMouseMove = (e: MouseEvent | TouchEvent) => { /* ... */ };
    const handleMouseUp = () => { /* ... */ };
    const handleWheel = (e: WheelEvent) => { /* ... */ };
    cardLine.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    cardLine.addEventListener("touchstart", handleMouseDown, { passive: true });
    window.addEventListener("touchmove", handleMouseMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);
    cardLine.addEventListener("wheel", handleWheel, { passive: false });

    const animate = (currentTime: number) => {
      // --- (ANIMATION LOOP LOGIC - no changes here) ---
      const deltaTime = (currentTime - cardStreamState.current.lastTime) / 1000;
      cardStreamState.current.lastTime = currentTime;
      if (!isPaused && !cardStreamState.current.isDragging) {
        if (cardStreamState.current.velocity > cardStreamState.current.minVelocity) {
            cardStreamState.current.velocity *= cardStreamState.current.friction;
        }
        cardStreamState.current.position += cardStreamState.current.velocity * cardStreamState.current.direction * deltaTime;
        setSpeed(Math.round(cardStreamState.current.velocity));
      }
      const { position, cardLineWidth } = cardStreamState.current;
      const containerWidth = cardLine.parentElement?.offsetWidth || 0;
      if (position < -cardLineWidth) cardStreamState.current.position = containerWidth;
      else if (position > containerWidth) cardStreamState.current.position = -cardLineWidth;
      cardLine.style.transform = `translateX(${cardStreamState.current.position}px)`;
      updateCardEffects();
      ctx.clearRect(0, 0, window.innerWidth, 300);
      const targetCount = scannerState.current.isScanning ? scanTargetMaxParticles : baseMaxParticles;
      currentMaxParticles += (targetCount - currentMaxParticles) * 0.05;
      while (scannerParticles.length < currentMaxParticles) scannerParticles.push(createScannerParticle());
      while (scannerParticles.length > currentMaxParticles) scannerParticles.pop();
      scannerParticles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        if (p.life <= 0 || p.x > window.innerWidth) Object.assign(p, createScannerParticle());
        ctx.globalAlpha = p.alpha * p.life; ctx.fillStyle = "white";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    
    return () => { /* ... (CLEANUP LOGIC - no changes here) ... */ };
  }, [isPaused, cards, cardGap, friction, scanEffect]);

  return (
    <main className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      <style jsx global>{`
        @keyframes glitch { 0%, 16%, 50%, 100% { opacity: 1; } 15%, 99% { opacity: 0.9; } 49% { opacity: 0.8; } }
        .animate-glitch { animation: glitch 0.1s infinite linear alternate-reverse; }
        
        /* New pulse animation for the scanner line */
        @keyframes scanPulse {
          0% { opacity: 0.75; transform: scaleY(1); }
          100% { opacity: 1; transform: scaleY(1.03); }
        }
        .animate-scan-pulse {
          animation: scanPulse 1.5s infinite alternate ease-in-out;
        }
      `}</style>
      
      {/* --- (Controls and Speed Indicator JSX - no changes here) --- */}

      <canvas ref={scannerCanvasRef} className="absolute top-0 left-0 w-screen h-[300px] z-10 pointer-events-none" />


      <div
        className={`
          scanner-line absolute top-[125px] left-1/2 h-[280px] w-0.5 -translate-x-1/2 
          bg-gradient-to-b from-transparent via-violet-500 to-transparent rounded-full
          transition-opacity duration-300 z-20 pointer-events-none animate-scan-pulse
          ${isScanning ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          boxShadow: `
            0 0 10px #a78bfa, 0 0 20px #a78bfa, 
            0 0 30px #8b5cf6, 0 0 50px #6366f1`
        }}
      />
      {/* ==================================================================== */}

      <div className="absolute top-0 w-screen h-[250px] flex items-center">
        <div ref={cardLineRef} className="flex items-center whitespace-nowrap cursor-grab select-none will-change-transform" style={{ gap: `${cardGap}px` }}>
          {cards.map(card => (
            <div key={card.id} className="card-wrapper relative w-[400px] h-[250px] shrink-0">
              <div className="card-normal card absolute top-0 left-0 w-full h-full rounded-[15px] overflow-hidden bg-transparent shadow-[0_15px_40px_rgba(0,0,0,0.4)] z-[2] [clip-path:inset(0_0_0_var(--clip-right,0%))]">
                <img src={card.image} alt="Card" className="w-full h-full object-cover rounded-[15px] transition-all duration-300 ease-in-out brightness-110 contrast-110 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] hover:brightness-125 hover:contrast-125" />
              </div>
              <div className="card-ascii card absolute top-0 left-0 w-full h-full rounded-[15px] overflow-hidden bg-transparent z-[1] [clip-path:inset(0_calc(100%-var(--clip-left,0%))_0_0)]">
                <pre className="ascii-content absolute top-0 left-0 w-full h-full text-[rgba(220,210,255,0.6)] font-mono text-[11px] leading-[13px] overflow-hidden whitespace-pre m-0 p-0 text-left align-top box-border [mask-image:linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(0,0,0,0.8)_30%,rgba(0,0,0,0.6)_50%,rgba(0,0,0,0.4)_80%,rgba(0,0,0,0.2)_100%)] animate-glitch">
                  {card.ascii}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export {ScannerCardStream};