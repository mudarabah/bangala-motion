// A simple flat illustrated woman (waist up) in the green-glass palette, in four poses.
// Drawn with plain SVG shapes so it stays crisp at 4K.
import React from "react";

export type Pose = "phone" | "stressed" | "relaxed";

const SKIN = "#F1C6A4";
const SKIN_SHADE = "#E4AE8A";
const HAIR = "#2E1F18";
const TOP = "#22C55E";
const SLEEVE = "#16A34A";
const INK = "#3A2A22";

// An arm from shoulder through elbow to hand, ending in a round hand.
const Arm: React.FC<{ d: string; hand: [number, number] }> = ({ d, hand }) => (
  <>
    <path d={d} fill="none" stroke={SLEEVE} strokeWidth={38} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={hand[0]} cy={hand[1]} r={20} fill={SKIN} />
  </>
);

export const Girl: React.FC<{ pose: Pose; width?: number; style?: React.CSSProperties }> = ({ pose, width = 400, style }) => {
  const eyesClosed = pose === "stressed";
  return (
    <svg viewBox="0 0 400 480" width={width} height={width * 1.2} style={{ overflow: "visible", ...style }}>
      <defs>
        <linearGradient id="girl-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={TOP} />
          <stop offset="1" stopColor="#15803D" />
        </linearGradient>
      </defs>
      {/* hair behind */}
      <path d="M116,150 Q116,66 200,64 Q284,66 284,150 L292,300 Q200,326 108,300 Z" fill={HAIR} />
      {/* neck and body */}
      <rect x={180} y={196} width={40} height={60} rx={14} fill={SKIN_SHADE} />
      <path d="M92,480 L92,338 Q92,262 200,256 Q308,262 308,338 L308,480 Z" fill="url(#girl-top)" />
      <path d="M170,258 Q200,292 230,258" fill="none" stroke="#15803D" strokeWidth={6} strokeLinecap="round" />
      {/* head */}
      <ellipse cx={200} cy={150} rx={64} ry={70} fill={SKIN} />
      <path d="M136,150 Q134,80 200,78 Q266,80 264,150 Q246,104 200,108 Q164,104 136,150 Z" fill={HAIR} />
      {/* face */}
      {eyesClosed ? (
        <>
          <path d="M170,156 Q178,150 186,156" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
          <path d="M214,156 Q222,150 230,156" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
          <path d="M186,192 Q200,182 214,192" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
          <path d="M168,138 L186,144 M232,138 L214,144" stroke={INK} strokeWidth={3.5} strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx={178} cy={155} rx={6} ry={7.5} fill={INK} />
          <ellipse cx={222} cy={155} rx={6} ry={7.5} fill={INK} />
          <path
            d={pose === "phone" ? "M190,188 Q200,192 210,188" : "M184,184 Q200,198 216,184"}
            fill="none"
            stroke={INK}
            strokeWidth={4}
            strokeLinecap="round"
          />
        </>
      )}
      <circle cx={162} cy={176} r={11} fill="#F87171" opacity={0.25} />
      <circle cx={238} cy={176} r={11} fill="#F87171" opacity={0.25} />

      {pose === "phone" ? (
        <>
          {/* one hand at the chin, thinking; the other holds a phone */}
          <Arm d="M118,312 Q86,420 168,226" hand={[168, 222]} />
          <Arm d="M282,312 Q320,420 246,372" hand={[244, 370]} />
          <rect x={214} y={300} width={62} height={104} rx={12} fill="#10261A" transform="rotate(-10 245 352)" />
          <rect x={221} y={309} width={48} height={82} rx={7} fill="#BBF7D0" transform="rotate(-10 245 352)" />
        </>
      ) : null}

      {pose === "stressed" ? (
        <>
          {/* hand on the forehead, the other arm hanging */}
          <Arm d="M118,312 Q70,300 170,112" hand={[172, 112]} />
          <Arm d="M282,312 Q318,400 300,470" hand={[300, 470]} />
        </>
      ) : null}

      {pose === "relaxed" ? (
        <>
          {/* both hands round a cup of tea */}
          <Arm d="M118,312 Q100,430 176,372" hand={[178, 370]} />
          <Arm d="M282,312 Q300,430 224,372" hand={[222, 370]} />
          <path d="M172,334 L228,334 L222,392 Q200,400 178,392 Z" fill="white" />
          <path d="M228,346 Q248,348 246,364 Q244,378 224,376" fill="none" stroke="white" strokeWidth={7} />
          <path d="M188,322 Q182,310 190,298 M208,322 Q202,306 210,292" fill="none" stroke="#CBD5E1" strokeWidth={4} strokeLinecap="round" />
          <circle cx={178} cy={370} r={20} fill={SKIN} />
          <circle cx={222} cy={370} r={20} fill={SKIN} />
        </>
      ) : null}
    </svg>
  );
};
