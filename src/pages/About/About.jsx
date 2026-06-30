import React, { useRef, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useColorMode } from '../../theme/ThemeContext';

// MUI Icons — confirmed available
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import './About.scss';

// ═══════════════════════════════════════════════════════════════
// HANDCRAFTED SVG BOTANICAL LIBRARY
// ═══════════════════════════════════════════════════════════════

const BigPoppy = ({ size = 300, delay = 0 }) => (
  <motion.svg width={size} height={size} viewBox="0 0 200 200" fill="none" aria-hidden="true"
    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "100px" }}>
    
    {/* Background Leaves (Teal - from Image 4) */}
    {[180, 225, 270, 0, 45, 90].map((deg, i) => (
      <motion.g key={`leaf-${i}`}
        style={{ originX: 0.5, originY: 0.5 }}
        variants={{
          hidden: { scale: 0, rotate: deg - 20 },
          visible: { scale: 1, rotate: deg }
        }}
        transition={{ delay: delay + i * 0.1, duration: 1, type: 'spring' }}
      >
        <rect x="0" y="0" width="200" height="200" fill="none" />
        <path d="M100 100 C 85 70, 85 30, 100 10 C 115 30, 115 70, 100 100" fill="#699b9c" opacity={i % 2 === 0 ? 1 : 0.8} />
        <path d="M100 100 L 100 20" stroke="#4a757b" strokeWidth="2" strokeLinecap="round" />
      </motion.g>
    ))}

    {/* Outer Petals (Soft Pink) */}
    {[0, 72, 144, 216, 288].map((deg, i) => (
      <motion.g key={`out-${i}`}
        style={{ originX: 0.5, originY: 0.5 }}
        variants={{
          hidden: { scale: 0, rotate: deg - 30 },
          visible: { scale: 1, rotate: deg }
        }}
        transition={{ delay: delay + 0.3 + i * 0.1, duration: 1.2, type: 'spring' }}
      >
        <rect x="0" y="0" width="200" height="200" fill="none" />
        <path d="M100 100 C 40 60, 50 5, 100 15 C 150 5, 160 60, 100 100" fill="#fbd5d5" />
      </motion.g>
    ))}

    {/* Inner Petals (Deep Pink) */}
    {[36, 108, 180, 252, 324].map((deg, i) => (
      <motion.g key={`in-${i}`}
        style={{ originX: 0.5, originY: 0.5 }}
        variants={{
          hidden: { scale: 0, rotate: deg - 20 },
          visible: { scale: 1, rotate: deg }
        }}
        transition={{ delay: delay + 0.6 + i * 0.1, duration: 1, type: 'spring' }}
      >
        <rect x="0" y="0" width="200" height="200" fill="none" />
        <path d="M100 100 C 60 70, 70 25, 100 30 C 130 25, 140 70, 100 100" fill="#f4a298" />
      </motion.g>
    ))}

    {/* Center Base */}
    <motion.circle cx="100" cy="100" r="16" fill="#e88579"
      variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
      transition={{ delay: delay + 1.2, duration: 0.5 }} />
    <motion.circle cx="100" cy="100" r="8" fill="#fff"
      variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
      transition={{ delay: delay + 1.3, duration: 0.4 }} />
    
    {/* Center white dots */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
      <motion.circle key={`dot-${i}`}
        cx={100 + 15 * Math.cos(deg * Math.PI / 180)}
        cy={100 + 15 * Math.sin(deg * Math.PI / 180)}
        r="2.5" fill="#fff"
        variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
        transition={{ delay: delay + 1.4 + i * 0.05, duration: 0.3 }} />
    ))}
  </motion.svg>
);

const LeafSpray = ({ flip = false, size = 400 }) => (
  <svg width={size} height={size * 1.25} viewBox="0 0 400 500" fill="none" aria-hidden="true"
    style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
    <defs>
      <linearGradient id={`leaf-grad-${flip ? 'r' : 'l'}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7a9e6a" />
        <stop offset="100%" stopColor="#4a6a3a" />
      </linearGradient>
    </defs>
    {/* Main stem */}
    <path d="M200 490 C 190 420, 170 360, 140 280 C 110 200, 90 130, 70 50"
      stroke="#5a7a4a" strokeWidth="5" fill="none" strokeLinecap="round" />
    {/* Big leaf top */}
    <path d="M70 50 C 20 30, 10 80, 40 105 C 70 130, 95 90, 70 50 Z"
      fill={`url(#leaf-grad-${flip ? 'r' : 'l'})`} />
    <path d="M70 50 L 42 103" stroke="#4a6030" strokeWidth="1.5" fill="none" />
    {/* Veins */}
    <path d="M70 50 L 36 68 M 70 50 L 32 85" stroke="#5a7040" strokeWidth="1" fill="none" opacity=".6" />

    {/* Mid leaf */}
    <path d="M100 160 C 52 140, 44 195, 72 215 C 100 235, 118 188, 100 160 Z"
      fill="#8aac72" />
    <path d="M100 160 L 74 213" stroke="#4a6030" strokeWidth="1.5" fill="none" />

    {/* Side branch up-right */}
    <path d="M115 200 C 150 175, 175 155, 195 120"
      stroke="#5a7a4a" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M195 120 C 225 100, 225 135, 205 148 C 185 161, 183 130, 195 120 Z"
      fill="#7a9e6a" opacity=".9" />

    {/* Lower leaf */}
    <path d="M145 295 C 95 275, 88 330, 116 352 C 144 374, 162 325, 145 295 Z"
      fill="#a0b888" />
    <path d="M145 295 L 118 350" stroke="#4a6030" strokeWidth="1.5" fill="none" />

    {/* Side branch down-right */}
    <path d="M160 335 C 200 315, 225 295, 240 265"
      stroke="#5a7a4a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M240 265 C 268 244, 268 280, 248 292 C 228 304, 226 274, 240 265 Z"
      fill="#8aac72" opacity=".85" />

    {/* Small flower buds */}
    <circle cx="68" cy="46" r="10" fill="#e08d62" opacity=".9" />
    <circle cx="63" cy="40" r="7" fill="#d97a7e" opacity=".95" />
    <circle cx="72" cy="38" r="5" fill="#f0a060" />

    {/* Another bud on side branch */}
    <circle cx="195" cy="118" r="8" fill="#d97a7e" opacity=".85" />
    <circle cx="200" cy="113" r="5" fill="#e08d62" />
  </svg>
);

const SmallBlossom = ({ color = '#d97a7e', size = 70, delay = 0 }) => (
  <motion.svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true"
    initial="hidden" whileInView="visible" viewport={{ once: true }}>
    
    {/* 5 rounded petals */}
    {[0, 72, 144, 216, 288].map((deg, i) => (
      <motion.g key={`s-petal-${i}`}
        style={{ originX: 0.5, originY: 0.5 }}
        variants={{
          hidden: { scale: 0, rotate: deg - 45 },
          visible: { scale: 1, rotate: deg }
        }}
        transition={{ delay: delay + i * 0.08, duration: 0.8, type: 'spring' }}
      >
        <rect x="0" y="0" width="100" height="100" fill="none" />
        <path d="M50 50 C 30 30, 35 10, 50 15 C 65 10, 70 30, 50 50" fill={color} opacity="0.9" />
      </motion.g>
    ))}

    {/* Center */}
    <motion.circle cx="50" cy="50" r="10" fill="#fcd24f"
      variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
      transition={{ delay: delay + 0.6, duration: 0.4 }} />
  </motion.svg>
);

const PapercutCherryBlossom = ({ size = 150, delay = 0, color = "#ffb7c5" }) => (
  <motion.svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true"
    initial="hidden" whileInView="visible" viewport={{ once: true }}>
    {[0, 72, 144, 216, 288].map((deg, i) => (
      <motion.g key={`cb-petal-${i}`}
        style={{ originX: 0.5, originY: 0.5 }}
        variants={{
          hidden: { scale: 0, rotate: deg - 45 },
          visible: { scale: 1, rotate: deg }
        }}
        transition={{ delay: delay + i * 0.1, duration: 1, type: 'spring' }}
      >
        <rect x="0" y="0" width="100" height="100" fill="none" />
        <path d="M50 50 C 25 20, 30 0, 45 10 C 50 15, 50 15, 55 10 C 70 0, 75 20, 50 50" fill={color} />
      </motion.g>
    ))}
    <motion.circle cx="50" cy="50" r="8" fill="#e88579"
      variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
      transition={{ delay: delay + 0.6, duration: 0.4 }} />
    {[0, 72, 144, 216, 288].map((deg, i) => (
      <motion.circle key={`st-${i}`}
        cx={50 + 10 * Math.cos((deg - 90) * Math.PI / 180)}
        cy={50 + 10 * Math.sin((deg - 90) * Math.PI / 180)}
        r="2" fill="#fff"
        variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
        transition={{ delay: delay + 0.8 + i * 0.05, duration: 0.3 }} />
    ))}
  </motion.svg>
);

const PapercutDaisy = ({ color = '#fff', size = 70, delay = 0 }) => (
  <motion.svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true"
    initial="hidden" whileInView="visible" viewport={{ once: true }}>
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
      <motion.g key={`daisy-petal-${i}`}
        style={{ originX: 0.5, originY: 0.5 }}
        variants={{
          hidden: { scale: 0, rotate: deg - 20 },
          visible: { scale: 1, rotate: deg }
        }}
        transition={{ delay: delay + i * 0.05, duration: 0.8, type: 'spring' }}
      >
        <rect x="0" y="0" width="100" height="100" fill="none" />
        <path d="M50 50 C 45 30, 45 10, 50 5 C 55 10, 55 30, 50 50" fill={color} opacity="0.9" />
      </motion.g>
    ))}
    <motion.circle cx="50" cy="50" r="12" fill="#fcd24f"
      variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
      transition={{ delay: delay + 0.6, duration: 0.4 }} />
    <motion.circle cx="50" cy="50" r="8" fill="#e08d62" opacity=".5"
      variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
      transition={{ delay: delay + 0.8, duration: 0.4 }} />
  </motion.svg>
);

const WildGrass = ({ size = 80 }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 80 120" fill="none" aria-hidden="true">
    <path d="M40 120 Q 38 80, 20 40" stroke="#6a8a5a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M40 120 Q 42 70, 60 30" stroke="#5a7a4a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M40 120 Q 40 75, 40 20" stroke="#7a9a6a" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M20 40 C 5 25, 8 45, 18 48 C 28 51, 25 32, 20 40 Z" fill="#8aac72" />
    <path d="M60 30 C 75 15, 72 35, 62 38 C 52 41, 53 22, 60 30 Z" fill="#7a9e6a" />
    <path d="M40 20 C 30 5, 25 18, 32 22 C 39 26, 42 10, 40 20 Z" fill="#9aba82" />
  </svg>
);

const BotanicalDivider = ({ mode = 'light' }) => (
  <svg width="380" height="36" viewBox="0 0 380 36" fill="none" aria-hidden="true" style={{ margin: '0 auto', display: 'block', maxWidth: '100%' }}>
    <line x1="0" y1="18" x2="155" y2="18" stroke={mode === 'dark' ? '#4a6a4a' : '#b8c8a8'} strokeWidth="1" />
    <line x1="225" y1="18" x2="380" y2="18" stroke={mode === 'dark' ? '#4a6a4a' : '#b8c8a8'} strokeWidth="1" />
    {[0, 72, 144, 216, 288].map((deg, i) => (
      <ellipse key={i} cx="190" cy="18" rx="8" ry="15"
        fill={i % 2 === 0 ? '#d97a7e' : '#e08d62'}
        opacity=".75"
        transform={`rotate(${deg} 190 18)`} />
    ))}
    <circle cx="190" cy="18" r="7" fill="#e08d62" />
    <path d="M162 18 C 157 11, 148 13, 151 19 C 154 25, 162 23, 162 18 Z"
      fill={mode === 'dark' ? '#5a8a5a' : '#9aaa82'} />
    <path d="M218 18 C 223 11, 232 13, 229 19 C 226 25, 218 23, 218 18 Z"
      fill={mode === 'dark' ? '#5a8a5a' : '#9aaa82'} style={{ transform: 'scaleX(-1)', transformOrigin: '218px 18px' }} />
  </svg>
);

const CornerSprig = ({ flip = false, mode = 'light' }) => (
  <svg width="90" height="90" viewBox="0 0 90 90" fill="none" aria-hidden="true"
    style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
    <path d="M10 80 Q 12 50, 50 12" stroke={mode === 'dark' ? '#5a8a5a' : '#8aac72'} strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M50 12 C 30 18, 26 42, 42 52 C 58 62, 64 38, 50 12 Z"
      fill={mode === 'dark' ? '#3a6a3a' : '#7a9e6a'} opacity=".85" />
    <path d="M26 46 C 8 52, 8 72, 22 74 C 36 76, 36 58, 26 46 Z"
      fill={mode === 'dark' ? '#4a7a4a' : '#9aaa82'} opacity=".75" />
    <circle cx="52" cy="10" r="7" fill="#d97a7e" opacity=".9" />
    <circle cx="48" cy="7" r="4.5" fill="#e08d62" />
  </svg>
);

const VineConnector = ({ height = 90, mode = 'light' }) => (
  <svg width="50" height={height} viewBox={`0 0 50 ${height}`} fill="none" aria-hidden="true">
    <path d={`M25 0 C 38 ${height * 0.25}, 12 ${height * 0.5}, 25 ${height * 0.75} S 38 ${height}, 25 ${height}`}
      stroke={mode === 'dark' ? '#5a8a5a' : '#8aac72'} strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d={`M25 ${height * 0.28} C 14 ${height * 0.24}, 10 ${height * 0.35}, 20 ${height * 0.38} C 30 ${height * 0.41}, 30 ${height * 0.31}, 25 ${height * 0.28} Z`}
      fill={mode === 'dark' ? '#4a7a4a' : '#b5c09f'} />
    <path d={`M25 ${height * 0.62} C 36 ${height * 0.58}, 40 ${height * 0.69}, 30 ${height * 0.72} C 20 ${height * 0.75}, 20 ${height * 0.65}, 25 ${height * 0.62} Z`}
      fill={mode === 'dark' ? '#4a7a4a' : '#b5c09f'} />
  </svg>
);

const FloatingPetal = ({ color = '#d97a7e', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <path d="M20 5 C 35 10, 35 25, 20 35 C 5 25, 5 10, 20 5 Z" fill={color} opacity="0.65" />
    <path d="M20 5 C 25 15, 25 25, 20 35" stroke={color} strokeWidth="1.5" opacity="0.4" fill="none" />
  </svg>
);

export const FallingPetals = () => {
  const petals = Array.from({ length: 50 });
  return (
    <div className="falling-petals-container" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 15 }}>
      {petals.map((_, i) => {
        const startX = Math.random() * 100; // random start X %
        const delay = Math.random() * 15; // random delay
        const duration = 10 + Math.random() * 10; // random duration
        const size = 15 + Math.random() * 20; // random size
        const color = Math.random() > 0.5 ? '#d97a7e' : '#f4a298'; // pink shades
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              top: '-10%',
              left: `${startX}%`,
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
              rotate: [0, Math.random() * 360, Math.random() * 720],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: 'linear',
              delay: delay,
            }}
          >
            <FloatingPetal color={color} size={size} />
          </motion.div>
        );
      })}
    </div>
  );
};

const FlyingBee = ({ delay = 0, reverse = false }) => {
  return (
    <motion.div
      style={{ position: 'absolute', width: 40, height: 40, zIndex: 50, pointerEvents: 'none' }}
      initial={{ opacity: 0, x: reverse ? '100vw' : '-10vw', y: 50 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        x: reverse ? ['100vw', '50vw', '20vw', '-10vw'] : ['-10vw', '20vw', '50vw', '100vw'], 
        y: [50, -30, 60, -50],
      }}
      transition={{ 
        duration: 12, 
        repeat: Infinity, 
        delay: delay,
        ease: "easeInOut"
      }}
    >
      <motion.svg viewBox="0 0 60 60" width="100%" height="100%" fill="none"
        animate={{ y: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        style={{ transform: reverse ? 'scaleX(-1)' : 'none' }}
      >
        {/* Wings */}
        <motion.ellipse cx="25" cy="20" rx="6" ry="12" fill="#fff" opacity="0.8"
          style={{ originX: 0.5, originY: 1 }}
          animate={{ rotate: [-25, 25] }} transition={{ repeat: Infinity, duration: 0.04, repeatType: 'reverse' }} />
        <motion.ellipse cx="35" cy="18" rx="7" ry="14" fill="#fff" opacity="0.9"
          style={{ originX: 0.5, originY: 1 }}
          animate={{ rotate: [25, -25] }} transition={{ repeat: Infinity, duration: 0.05, repeatType: 'reverse' }} />
        {/* Body */}
        <ellipse cx="30" cy="30" rx="12" ry="8" fill="#fcd24f" transform="rotate(-15 30 30)" />
        {/* Stripes */}
        <path d="M25 23 Q 23 30, 25 37" stroke="#333" strokeWidth="3" transform="rotate(-15 30 30)" />
        <path d="M30 22 Q 28 30, 30 38" stroke="#333" strokeWidth="3" transform="rotate(-15 30 30)" />
        <path d="M35 23 Q 33 30, 35 37" stroke="#333" strokeWidth="3" transform="rotate(-15 30 30)" />
        {/* Head */}
        <circle cx="42" cy="27" r="5" fill="#333" />
        {/* Stinger */}
        <path d="M19 33 L 14 35 L 18 29 Z" fill="#333" />
      </motion.svg>
    </motion.div>
  )
}

const FlyingButterfly = ({ delay = 0, reverse = false, color = "#a88bd4" }) => {
  return (
    <motion.div
      style={{ position: 'absolute', width: 60, height: 60, zIndex: 45, pointerEvents: 'none' }}
      initial={{ opacity: 0, x: reverse ? '110vw' : '-10vw', y: 150 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        x: reverse ? ['110vw', '70vw', '30vw', '-10vw'] : ['-10vw', '30vw', '70vw', '110vw'], 
        y: [150, 50, 250, 80],
      }}
      transition={{ 
        duration: 16, 
        repeat: Infinity, 
        delay: delay,
        ease: "easeInOut"
      }}
    >
      <motion.svg viewBox="0 0 60 60" width="100%" height="100%" fill="none"
        animate={{ y: [-20, 20, -20], rotate: reverse ? [-15, 15, -15] : [15, -15, 15] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        style={{ transform: reverse ? 'scaleX(-1)' : 'none' }}
      >
        {/* Left Wing */}
        <motion.g
          style={{ originX: 0.5, originY: 0.5 }}
          animate={{ scaleX: [1, 0.1, 1] }}
          transition={{ repeat: Infinity, duration: 0.35, ease: 'easeInOut' }}
        >
          <path d="M30 30 C 10 5, 0 25, 10 45 C 15 55, 25 45, 30 30 Z" fill={color} opacity="0.9" />
          <path d="M30 30 C 15 15, 10 25, 15 35 Z" fill="#fff" opacity="0.4" />
        </motion.g>

        {/* Right Wing */}
        <motion.g
          style={{ originX: 0.5, originY: 0.5 }}
          animate={{ scaleX: [1, 0.1, 1] }}
          transition={{ repeat: Infinity, duration: 0.35, ease: 'easeInOut' }}
        >
          <path d="M30 30 C 50 5, 60 25, 50 45 C 45 55, 35 45, 30 30 Z" fill={color} opacity="0.9" />
          <path d="M30 30 C 45 15, 50 25, 45 35 Z" fill="#fff" opacity="0.4" />
        </motion.g>

        {/* Body */}
        <ellipse cx="30" cy="30" rx="2" ry="12" fill="#333" />
        {/* Antennae */}
        <path d="M30 18 Q 25 5, 18 8" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M30 18 Q 35 5, 42 8" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </motion.svg>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
// SECTION 1: HERO — Vintage Botanical Festival Poster
// ═══════════════════════════════════════════════════════════════
const HeroSeed = ({ mode }) => {
  const { scrollYProgress } = useScroll();
  const leftY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const rightY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const leftRot = useTransform(scrollYProgress, [0, 0.5], [-8, 6]);
  const rightRot = useTransform(scrollYProgress, [0, 0.5], [8, -6]);
  const cardY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  const dark = mode === 'dark';

  return (
    <section className={`goc-hero ${dark ? 'goc-hero--dark' : ''}`}>

      {/* ── FLYING BEES & BUTTERFLIES ── */}
      <FlyingBee delay={1} />
      <FlyingBee delay={6} reverse={true} />
      <FlyingButterfly delay={3} color="#f2a65a" />
      <FlyingButterfly delay={8} reverse={true} color="#8ab8cc" />
      {/* ── LEFT BOTANICAL CLUSTER ── */}
      <motion.div className="hero-deco hero-deco--left" style={{ y: leftY, rotate: leftRot }}>
        <LeafSpray size={400} />
        <motion.div className="deco-poppy deco-poppy--main"
          animate={{ y: [0, -14, 0], rotate: [0, 2, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}>
          <BigPoppy size={220} />
        </motion.div>
        <motion.div className="deco-blossom deco-blossom--a"
          animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.3 }}>
          <SmallBlossom color="#d97a7e" size={72} />
        </motion.div>
        <motion.div className="deco-grass deco-grass--a"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
          <WildGrass size={70} />
        </motion.div>
      </motion.div>

      {/* ── RIGHT BOTANICAL CLUSTER (mirrored) ── */}
      <motion.div className="hero-deco hero-deco--right" style={{ y: rightY, rotate: rightRot }}>
        <LeafSpray flip size={400} />
        <motion.div className="deco-poppy deco-poppy--right"
          animate={{ y: [0, -12, 0], rotate: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut', delay: 0.8 }}>
          <BigPoppy size={190} />
        </motion.div>
        <motion.div className="deco-blossom deco-blossom--b"
          animate={{ y: [0, -8, 0], rotate: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut', delay: 1.1 }}>
          <SmallBlossom color="#e08d62" size={66} />
        </motion.div>
        <motion.div className="deco-grass deco-grass--b"
          animate={{ rotate: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut', delay: 0.4 }}>
          <WildGrass size={65} />
        </motion.div>
      </motion.div>

      {/* ── FALLING PETALS ── */}
      <FallingPetals />

      {/* ── FLOATING PAPER CARD ── */}
      <motion.div className={`hero-card ${dark ? 'hero-card--dark' : ''}`} style={{ y: cardY }}
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>

        {/* Paper layers depth */}
        <div className="card-layer card-layer--2" />
        <div className="card-layer card-layer--3" />

        <div className="card-body">
          {/* Frame corners */}
          <div className="frame-corner fc-tl"><CornerSprig mode={mode} /></div>
          <div className="frame-corner fc-tr"><CornerSprig flip mode={mode} /></div>
          <div className="frame-corner fc-bl" style={{ transform: 'rotate(90deg)' }}><CornerSprig mode={mode} /></div>
          <div className="frame-corner fc-br" style={{ transform: 'rotate(90deg)' }}><CornerSprig flip mode={mode} /></div>

          <span className="hero-eyebrow">Frontend Developer · Est. 2026</span>

          <h1 className="hero-title">
            The Garden<br />
            <em>of Code</em>
          </h1>

          <BotanicalDivider mode={mode} />

          <p className="hero-tagline">— Cultivating Digital Experiences —</p>

          <p className="hero-desc">
            A passionate developer crafting immersive digital experiences through React, modern UI systems, animation, accessibility, and performance optimization.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              View Projects <ArrowForwardIcon fontSize="small" />
            </a>
            <a href="#contact" className="btn-outline">
              Contact Me <MailOutlineIcon fontSize="small" />
            </a>
          </div>

          <div className="hero-socials">
            <motion.a href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="social-icon" aria-label="GitHub"
              whileHover={{ scale: 1.15, y: -3 }} transition={{ type: 'spring', stiffness: 400 }}>
              <GitHubIcon />
            </motion.a>
            <motion.a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="social-icon" aria-label="LinkedIn"
              whileHover={{ scale: 1.15, y: -3 }} transition={{ type: 'spring', stiffness: 400 }}>
              <LinkedInIcon />
            </motion.a>
            <motion.a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="social-icon" aria-label="Twitter"
              whileHover={{ scale: 1.15, y: -3 }} transition={{ type: 'spring', stiffness: 400 }}>
              <TwitterIcon />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* ── SCATTERED FLOATING ELEMENTS ── */}
      <motion.div className="float-el fel-a" animate={{ y: [0, -18, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}>
        <SmallBlossom color="#e08d62" size={46} />
      </motion.div>
      <motion.div className="float-el fel-b" animate={{ y: [0, -14, 0], rotate: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.2 }}>
        <WildGrass size={38} />
      </motion.div>
      <motion.div className="float-el fel-c" animate={{ y: [0, -16, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.7 }}>
        <SmallBlossom color="#d97a7e" size={40} />
      </motion.div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// SECTION 2: GROWING TREE (Timeline)
// ═══════════════════════════════════════════════════════════════
const GrowingTree = ({ mode }) => {
  const dark = mode === 'dark';
  const milestones = [
    { year: '2023', emoji: '🌱', label: 'Seed', title: 'Planting the Seed', desc: 'Began the journey — React fundamentals, JavaScript deep dives, and building the first interactive UIs from scratch.' },
    { year: '2024', emoji: '🌿', label: 'Roots', title: 'Sprouting Roots', desc: 'Mastered Redux Toolkit, TypeScript, Firebase auth, and delivered end-to-end applications with form validation & real APIs.' },
    { year: '2025', emoji: '🌳', label: 'Branches', title: 'Growing Branches', desc: 'Deep-dived into Framer Motion, GSAP, design systems, and performance optimization. Contributed to open-source projects.' },
    { year: '2026', emoji: '🌸', label: 'Canopy', title: 'Reaching the Canopy', desc: 'Crafting premium digital experiences at an Awwwards-level. Leading initiatives, mentoring, and building things that matter.' },
  ];

  return (
    <section className={`goc-section goc-experience ${dark ? 'goc--dark' : ''}`}>
      <div className="section-header">
        <span className="section-eyebrow">Chapter II</span>
        <h2 className="section-title">Growing Tree </h2>
        {/* <p className="section-sub">The journey of a thousand commits begins with a single <code>git init</code></p> */}
      </div>

      <div className="timeline">
        {milestones.map((m, i) => (
          <React.Fragment key={i}>
            <motion.div className={`tl-node ${i % 2 === 0 ? 'tl-node--left' : 'tl-node--right'}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
              <div className={`tl-card ${dark ? 'tl-card--dark' : ''}`}>
                <div className="tl-card-top">
                  <span className="tl-emoji">{m.emoji}</span>
                  <div>
                    <span className="tl-year">{m.year}</span>
                    <span className="tl-label">{m.label}</span>
                  </div>
                </div>
                <h3 className="tl-title">{m.title}</h3>
                <p className="tl-desc">{m.desc}</p>
              </div>
            </motion.div>
            {i < milestones.length - 1 && (
              <div className="tl-vine">
                <VineConnector height={90} mode={mode} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// SECTION 3: SKILLS GARDEN
// ═══════════════════════════════════════════════════════════════
const SkillsGarden = ({ mode }) => {
  const [hovered, setHovered] = useState(null);
  const dark = mode === 'dark';

  const skills = [
    { name: 'React', lvl: 95, color: '#d97a7e', desc: 'Hooks · Context · Patterns · Suspense' },
    { name: 'TypeScript', lvl: 88, color: '#e08d62', desc: 'Strict mode · Generics · Utility types' },
    { name: 'SCSS / CSS', lvl: 92, color: '#8aac72', desc: 'BEM · Variables · Keyframes · Grid' },
    { name: 'Redux Toolkit', lvl: 85, color: '#c07a50', desc: 'Slices · RTK Query · Middleware' },
    { name: 'Framer Motion', lvl: 83, color: '#d97a7e', desc: 'Spring physics · Layout · Scroll' },
    { name: 'Material UI', lvl: 87, color: '#8aac72', desc: 'Theme tokens · Component overrides' },
  ];

  return (
    <section className={`goc-section goc-skills ${dark ? 'goc--dark' : ''}`}>
      <div className="section-header">
        <span className="section-eyebrow">Chapter III</span>
        <h2 className="section-title">Skills Garden </h2>
        {/* <p className="section-sub">Each skill is a flower — nurtured through practice and patience</p> */}
      </div>

      <div className="skills-grid">
        {skills.map((skill, i) => (
          <motion.div className={`skill-card ${dark ? 'skill-card--dark' : ''}`} key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -14, transition: { type: 'spring', stiffness: 300 } }}>

            <motion.div className="skill-flower"
              animate={hovered === i ? { rotate: 360, scale: 1.15 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}>
              <PapercutDaisy color={skill.color} size={88} />
            </motion.div>

            <h3 className="skill-name">{skill.name}</h3>

            {/* Organic vertical bar — NOT a horizontal progress bar */}
            <div className="skill-growth">
              <div className="growth-track">
                <motion.div className="growth-fill"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  style={{ height: `${skill.lvl}%`, background: skill.color }}
                  transition={{ duration: 1.3, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} />
              </div>
              <span className="growth-pct" style={{ color: skill.color }}>{skill.lvl}%</span>
            </div>

            <AnimatePresence>
              {hovered === i && (
                <motion.p className="skill-desc"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.2 }}>
                  {skill.desc}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// SECTION 4: PROJECTS — Botanical Specimens
// ═══════════════════════════════════════════════════════════════
const BloomingProjects = ({ mode }) => {
  const dark = mode === 'dark';
  const projects = [
    {
      id: '01', title: 'Orchid Haven',
      tag: 'E-Commerce Platform',
      desc: 'A premium botanical marketplace with lush micro-animations, full cart flow, Firebase auth, and a handcrafted dark/light mode system.',
      stack: ['React', 'Redux Toolkit', 'SCSS', 'Firebase'],
      accent: '#d97a7e',
      blossom: '#d97a7e',
    },
    {
      id: '02', title: 'Flora & Fauna',
      tag: 'Interactive Editorial',
      desc: 'An immersive scrollytelling experience about endangered plant species, featuring parallax, SVG drawing animations, and rich data visualisation.',
      stack: ['Next.js', 'Framer Motion', 'TypeScript', 'GSAP'],
      accent: '#e08d62',
      blossom: '#e08d62',
    },
  ];

  return (
    <section id="projects" className={`goc-section goc-projects ${dark ? 'goc--dark' : ''}`}>
      <div className="section-header">
        <span className="section-eyebrow">Chapter IV</span>
        <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          Blooming Flowers <PapercutCherryBlossom size={56} color="#ffb7c5" />
        </h2>
        {/* <p className="section-sub">Selected specimens from the collection</p> */}
      </div>

      {projects.map((proj, i) => (
        <motion.div className={`specimen ${i % 2 === 1 ? 'specimen--flip' : ''}`} key={i}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>

          {/* Visual panel */}
          <div className={`specimen-art ${dark ? 'specimen-art--dark' : ''}`} style={{ '--acc': proj.accent }}>
            <div className="spec-art-inner">
              <LeafSpray flip={i % 2 === 0} size={260} />
              <motion.div className="spec-poppy"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: i * 0.5 }}>
                <PapercutCherryBlossom size={160} color={proj.blossom} delay={0.2} />
              </motion.div>
            </div>
            <div className="spec-num">No.{proj.id}</div>
          </div>

          {/* Info panel */}
          <div className="specimen-info">
            <span className="spec-tag" style={{ color: proj.accent }}>{proj.tag}</span>
            <h3 className="spec-title">{proj.title}</h3>
            <div className="spec-rule" style={{ background: proj.accent }} />
            <p className="spec-desc">{proj.desc}</p>
            <div className="spec-stack">
              {proj.stack.map((t, j) => (
                <span key={j} className="stack-chip"
                  style={{ borderColor: proj.accent, color: proj.accent }}>{t}</span>
              ))}
            </div>
            <motion.a href="#" className="spec-cta" style={{ '--acc': proj.accent }}
              whileHover={{ x: 10 }} transition={{ type: 'spring', stiffness: 350 }}>
              View Specimen <ArrowForwardIcon fontSize="small" />
            </motion.a>
          </div>
        </motion.div>
      ))}
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// SECTION 5: CONTACT — The Harvest
// ═══════════════════════════════════════════════════════════════
const TheHarvest = ({ mode }) => {
  const dark = mode === 'dark';
  return (
    <section id="contact" className={`goc-section goc-contact ${dark ? 'goc--dark' : ''}`}>
      {/* Top floating blossoms */}
      <div className="harvest-blossoms">
        {[...Array(6)].map((_, i) => (
          <motion.div key={i} className="hb-item"
            animate={{ y: [0, -(10 + i * 2), 0] }}
            transition={{ repeat: Infinity, duration: 4 + i * 0.6, ease: 'easeInOut', delay: i * 0.35 }}>
            <SmallBlossom color={i % 2 === 0 ? '#d97a7e' : '#e08d62'} size={38 + i * 8} />
          </motion.div>
        ))}
      </div>

      <motion.div className={`harvest-card ${dark ? 'harvest-card--dark' : ''}`}
        initial={{ opacity: 0, y: 60, rotate: -1 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}>

        {/* Stamp corner */}
        <div className="harvest-stamp">
          <SmallBlossom color="#e08d62" size={52} />
          <span>✉ GARDEN POST</span>
        </div>

        {/* Frame corners */}
        <div className="frame-corner fc-tl"><CornerSprig mode={mode} /></div>
        <div className="frame-corner fc-tr"><CornerSprig flip mode={mode} /></div>
        <div className="frame-corner fc-bl" style={{ transform: 'rotate(90deg)' }}><CornerSprig mode={mode} /></div>
        <div className="frame-corner fc-br" style={{ transform: 'rotate(90deg)' }}><CornerSprig flip mode={mode} /></div>

        <div className="harvest-body">
          <span className="section-eyebrow">Chapter V · Final</span>
          <h2 className="harvest-title">The Harvest </h2>
          <BotanicalDivider mode={mode} />
          <p className="harvest-msg">
            Every great garden is built with collaboration. Whether you have a project idea, a question, or just want to say hello — my inbox is always open.
          </p>
          <motion.a href="mailto:hello@gardenofcode.com" className="btn-primary harvest-cta"
            whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}>
            <MailOutlineIcon fontSize="small" /> Send a Letter
          </motion.a>

          <div className="harvest-socials">
            {[
              { Icon: GitHubIcon, href: 'https://github.com', label: 'GitHub' },
              { Icon: LinkedInIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
              { Icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
            ].map(({ Icon, href, label }) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="social-icon" aria-label={label}
                whileHover={{ scale: 1.2, y: -4 }} transition={{ type: 'spring', stiffness: 400 }}>
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// MASTER COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function About() {
  const muiTheme = useMuiTheme();
  const { toggleColorMode } = useColorMode();
  const mode = muiTheme.palette.mode; // 'light' | 'dark'

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothTouch: true }}>
      <main className={`garden-of-code ${mode === 'dark' ? 'goc-dark-root' : ''}`}>

        {/* Floating theme toggle — always visible */}
        <motion.button
          className={`theme-fab ${mode === 'dark' ? 'theme-fab--dark' : ''}`}
          onClick={toggleColorMode}
          aria-label="Toggle dark mode"
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </motion.button>

        {/* Scroll to top button */}
        <motion.button
          className={`theme-fab ${mode === 'dark' ? 'theme-fab--dark' : ''}`}
          style={{ bottom: '90px' }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          title="Scroll to top">
          <ArrowUpwardIcon />
        </motion.button>

        <HeroSeed mode={mode} />
        <GrowingTree mode={mode} />
        <SkillsGarden mode={mode} />
        <BloomingProjects mode={mode} />
        <TheHarvest mode={mode} />
      </main>
    </ReactLenis>
  );
}
