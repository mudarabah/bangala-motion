// "আমরা সরাসরি চীন থেকে fashion accessories আমদানি করি এবং বাংলাদেশে খুচরা ও পাইকারি পর্যায়ে বিক্রি করি।"
// China card → dashed arc with a travelling ship → Bangladesh card; accessories float
// above the arc; retail and wholesale cards land under it.
import React from "react";
import { Gem, Glasses, Globe, MapPin, Ship, ShoppingBag, Store, Warehouse, Watch } from "lucide-react";
import { Appear, CheckBadge, Float, Glass, GradPill, Headline, IconTile, Label, Pill, Pop, useActive, useProgress } from "../components/kit";
import type { Timeline } from "../data/timeline";
import { colors, iconTints } from "../theme";

const A = { x: 360, y: 560 }; // China node centre
const B = { x: 1560, y: 560 }; // Bangladesh node centre
const C = { x: 960, y: 250 }; // arc control point
const pointOnArc = (t: number) => ({
  x: (1 - t) ** 2 * A.x + 2 * (1 - t) * t * C.x + t ** 2 * B.x,
  y: (1 - t) ** 2 * A.y + 2 * (1 - t) * t * C.y + t ** 2 * B.y,
});

export const ImportScene: React.FC<{ t: Timeline["import"] }> = ({ t }) => {
  const draw = useProgress(t.chin, t.amdani + 0.4);
  const ship = useProgress(t.amdani, t.bangladesh + 0.3);
  const shipPos = pointOnArc(ship);
  const bdActive = useActive(t.bangladesh);
  const len = 1500; // approx arc length for the dash reveal

  return (
    <>
      <Headline
        style={{ position: "absolute", top: 90, left: 0, right: 0 }}
        words={[
          ["সরাসরি", t.sorasori, true],
          ["চীন", t.chin],
          ["থেকে", t.theke],
          ["আমদানি", t.amdani, true],
        ]}
      />

      {/* Route */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="route" x1="0" x2="1">
            <stop offset="0" stopColor={colors.brand} />
            <stop offset="1" stopColor={colors.magenta} />
          </linearGradient>
        </defs>
        <path
          d={`M ${A.x} ${A.y} Q ${C.x} ${C.y} ${B.x} ${B.y}`}
          fill="none"
          stroke="url(#route)"
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray={`${len * draw} ${len}`}
          opacity={0.75}
        />
      </svg>

      {/* Ship travelling along the route */}
      <div
        style={{
          position: "absolute",
          left: shipPos.x - 42,
          top: shipPos.y - 42,
          opacity: ship > 0 && ship < 1 ? 1 : 0,
        }}
      >
        <IconTile icon={Ship} tint={iconTints.animation} size={84} />
      </div>

      {/* Nodes */}
      <Appear at={t.chin} style={{ position: "absolute", left: A.x - 150, top: A.y - 110 }}>
        <Glass style={{ width: 300, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, padding: 30 }}>
          <IconTile icon={Globe} tint={iconTints.camera} size={100} />
          <Label size={44} style={{ fontWeight: 700 }}>
            চীন
          </Label>
        </Glass>
      </Appear>
      <Appear at={t.bangladesh} style={{ position: "absolute", left: B.x - 150, top: B.y - 110 }}>
        <Glass active={bdActive} style={{ width: 300, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, padding: 30 }}>
          <IconTile icon={MapPin} tint={iconTints.briefcase} size={100} />
          <Label size={44} style={{ fontWeight: 700 }}>
            বাংলাদেশ
          </Label>
        </Glass>
      </Appear>

      {/* Fashion accessories floating above the arc */}
      {[
        { icon: Watch, tint: iconTints.video, x: 700, y: 300, s: 92, ph: 0 },
        { icon: ShoppingBag, tint: iconTints.image, x: 860, y: 230, s: 104, ph: 1.2 },
        { icon: Glasses, tint: iconTints.animation, x: 1040, y: 240, s: 92, ph: 2.1 },
        { icon: Gem, tint: iconTints.coin, x: 1190, y: 310, s: 84, ph: 3.3 },
      ].map((it, i) => (
        <Pop key={i} at={t.fashion} delay={i * 4} style={{ position: "absolute", left: it.x - it.s / 2, top: it.y - it.s / 2 + 60 }}>
          <Float phase={it.ph}>
            <IconTile icon={it.icon} tint={it.tint} size={it.s} />
          </Float>
        </Pop>
      ))}
      <Appear at={t.fashion} delay={6} style={{ position: "absolute", left: 0, right: 0, top: 545, display: "flex", justifyContent: "center" }}>
        <Pill size={30}>
          fashion accessories
        </Pill>
      </Appear>

      {/* Retail and wholesale */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 770, display: "flex", justifyContent: "center", gap: 48 }}>
        <Appear at={t.khuchra}>
          <Glass style={{ display: "flex", alignItems: "center", gap: 22, padding: "24px 40px" }}>
            <IconTile icon={Store} tint={iconTints.image} size={76} />
            <Label size={42} style={{ fontWeight: 700 }}>
              খুচরা
            </Label>
          </Glass>
        </Appear>
        <Appear at={t.paikari}>
          <Glass style={{ display: "flex", alignItems: "center", gap: 22, padding: "24px 40px" }}>
            <IconTile icon={Warehouse} tint={iconTints.shop} size={76} />
            <Label size={42} style={{ fontWeight: 700 }}>
              পাইকারি
            </Label>
          </Glass>
        </Appear>
        <Pop at={t.bikri} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <GradPill size={40} style={{ padding: "26px 44px" }}>
            বিক্রি
          </GradPill>
          <CheckBadge size={52} />
        </Pop>
      </div>
    </>
  );
};
