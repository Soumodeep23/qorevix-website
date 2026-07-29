import React from 'react'

export default function QorevixLogo({ className = '', height = 40, showSubtext = true }) {
  return (
    <div className={`qorevix-logo-wrapper ${className}`} style={{ height: `${height}px`, display: 'inline-flex', alignItems: 'center' }}>
      <svg
        viewBox="0 0 850 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: '100%', width: 'auto', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="qLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f5f6f8ff" />
            <stop offset="100%" stopColor="#fdfafaff" />
          </linearGradient>

          <filter id="qLogoGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#qLogoGlowFilter)">
          {/* DISINTEGRATING NEURAL DATA PARTICLES (TOP LEFT OF Q) */}
          <g fill="url(#qLogoGrad)" opacity="0.95">
            <rect x="75" y="62" width="7" height="7" rx="1.5" />
            <rect x="90" y="50" width="9" height="9" rx="1.5" />
            <rect x="105" y="42" width="11" height="11" rx="2" />
            <rect x="122" y="65" width="8" height="8" rx="1.5" />
            <rect x="135" y="55" width="10" height="10" rx="2" />
            <circle cx="68" cy="65" r="4" />
            <circle cx="82" cy="85" r="3.5" />
            <circle cx="98" cy="98" r="4.5" />
            <circle cx="55" cy="78" r="3" />
            <rect x="108" y="78" width="9" height="9" rx="1.5" />
            <rect x="120" y="90" width="11" height="11" rx="2" />
            <rect x="134" y="105" width="8" height="8" rx="1.5" />
          </g>

          {/* MAIN 'Q' ICON WITH BREAKAWAY CURVE */}
          <path
            d="M 200 75 A 70 70 0 1 1 128 175"
            stroke="url(#qLogoGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 195 88 A 56 56 0 1 1 138 165"
            stroke="url(#qLogoGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.75"
            fill="none"
          />
          <path
            d="M 160 145 L 235 205 L 290 205 L 205 140 Z"
            fill="url(#qLogoGrad)"
            stroke="url(#qLogoGrad)"
            strokeWidth="2"
          />

          {/* 'OREVI' FUTURISTIC GEOMETRIC TYPOGRAPHY */}
          <g stroke="url(#qLogoGrad)" strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round">
            {/* O */}
            <rect x="305" y="112" width="55" height="48" rx="14" />
            {/* R */}
            <path d="M 380 160 L 380 112 L 418 112 C 430 112 436 118 436 127 C 436 136 430 141 418 141 L 380 141 M 412 141 L 436 160" />
            {/* E */}
            <path d="M 455 160 L 455 112 L 505 112 M 455 136 L 495 136 M 455 160 L 505 160" />
            {/* V */}
            <path d="M 525 112 L 552.5 160 L 580 112" />
            {/* I */}
            <path d="M 612 112 L 612 160" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          </g>

          {/* FUTURISTIC ACCENT 'X' FLOURISH */}
          <g stroke="url(#qLogoGrad)" strokeWidth="5" strokeLinecap="round">
            <path d="M 650 185 L 790 85" />
            <path d="M 655 90 L 780 180" />
            <path d="M 715 135 L 795 60" opacity="0.8" />
            <path d="M 715 135 L 785 205" opacity="0.8" />
          </g>

          {/* UNDERLINE & SUB-TITLE 'TECHNOLOGIES' */}
          <path d="M 285 174 L 650 174" stroke="url(#qLogoGrad)" strokeWidth="3" strokeLinecap="round" />

          {showSubtext && (
            <text
              x="288"
              y="202"
              fill="#EEEEF5"
              fontFamily="Syne, sans-serif"
              fontWeight="700"
              fontSize="20"
              letterSpacing="14"
            >
              TECHNOLOGIES
            </text>
          )}
        </g>
      </svg>
    </div>
  )
}
