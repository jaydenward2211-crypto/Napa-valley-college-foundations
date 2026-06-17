import React from "react";

interface NvcLogoProps {
  className?: string;
  showText?: boolean;
}

export default function NvcLogo({ className = "h-12", showText = true }: NvcLogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* High-Fidelity Scalable SVG reproducing Napa's vine-covered hills and grape cluster */}
      <svg
        viewBox="0 0 320 120"
        className="h-full w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Mountain Silhouettes */}
        {/* Left Mountain Ridge */}
        <path
          d="M 10 70 Q 55 20 100 45 T 160 55"
          stroke="#417757"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 15 70 C 55 35, 75 40, 115 50"
          stroke="#417757"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <path
          d="M 40 70 Q 80 45, 120 52"
          stroke="#417757"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Right Mountain Ridge */}
        <path
          d="M 160 55 Q 210 30 260 48 T 310 70"
          stroke="#417757"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 180 55 C 220 40, 240 45, 290 65"
          stroke="#417757"
          strokeWidth="1.5"
          opacity="0.8"
        />

        {/* Sun Accent Behind Grapes */}
        <circle cx="160" cy="45" r="14" fill="#E2B757" opacity="0.15" />

        {/* Grape Cluster (Dusty Purple/Gray) */}
        {/* Grape bunch positioned in center gap */}
        <g fill="#8E7C85">
          {/* Stem */}
          <path
            d="M 160 35 L 160 42"
            stroke="#598e76"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Row 1 */}
          <circle cx="150" cy="45" r="4.5" />
          <circle cx="160" cy="45" r="4.5" />
          <circle cx="170" cy="45" r="4.5" />
          {/* Row 2 */}
          <circle cx="145" cy="53" r="4.5" />
          <circle cx="155" cy="53" r="4.5" />
          <circle cx="165" cy="53" r="4.5" />
          <circle cx="175" cy="53" r="4.5" />
          {/* Row 3 */}
          <circle cx="150" cy="61" r="4.5" />
          <circle cx="160" cy="61" r="4.5" />
          <circle cx="170" cy="61" r="4.5" />
          {/* Row 4 */}
          <circle cx="155" cy="69" r="4.5" />
          <circle cx="165" cy="69" r="4.5" />
          {/* Row 5 */}
          <circle cx="160" cy="77" r="4.5" />
        </g>

        {/* BRAND TEXT LAYER (Inline formatted) */}
        {showText && (
          <>
            {/* "NAPA VALLEY" on Left */}
            <text
              x="5"
              y="98"
              fontFamily="Cinzel, Georgia, serif"
              fontSize="17.5"
              fontWeight="600"
              fill="#c49226"
              letterSpacing="2.5"
            >
              NAPA VALLEY
            </text>

            {/* "COLLEGE" on Right */}
            <text
              x="212"
              y="98"
              fontFamily="Cinzel, Georgia, serif"
              fontSize="17.5"
              fontWeight="600"
              fill="#c49226"
              letterSpacing="2.5"
            >
              COLLEGE
            </text>

            {/* "FOUNDATION" Centered underneath */}
            <text
              x="160"
              y="118"
              fontFamily="Playfair Display, Georgia, serif"
              fontSize="19"
              fontWeight="500"
              fontStyle="normal"
              fill="#598e76"
              letterSpacing="8"
              textAnchor="middle"
            >
              FOUNDATION
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
