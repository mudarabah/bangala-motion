// Mishtio digital-catalog ad (2026-11-19 voice): the same inbox questions every day → Mishtio's
// one-link cake catalog → share it anywhere, update it once → "your cake, your brand, one link".
// Style: pink glass (pinkPalette). Every line on screen is a range of spoken words (../v11/sayf.tsx).
import React from "react";
import { Audio } from "@remotion/media";
import {
  CheckCheck,
  Clock,
  Crown,
  Eye,
  Image as ImageIcon,
  Inbox,
  Link2,
  MessageCircle,
  PlusCircle,
  RefreshCw,
  Search,
  Send,
  Share2,
  ShoppingBag,
  TrendingUp,
  User,
  UserMinus,
} from "lucide-react";
import { AbsoluteFill, interpolate, useVideoConfig, staticFile } from "remotion";
import { Appear, Background, CheckBadge, Float, Glass, IconTile, PaletteProvider, Pop, Scene, useProgress, useTime } from "../components/kit";
import { SfxTrack, type Cue } from "../components/SoundDesign";
import { design, motion, pinkPalette } from "../theme";
import { Skel, Strike } from "../v2/ui";
import { Sweep } from "../v4/parts";
import { makeSay } from "../v11/sayf";
import { C, Wash } from "../v11/ui";
import { BERRY, CAKES, Card, Corner, LOGO, MishtioCard, PINK, Photo, PinkBox, cake } from "../mishtio/kit";
import { audioDuration, SCENE_START, tail, W, WORDS, type SceneKey } from "./timeline";

const { t, Say } = makeSay(W, WORDS, {});
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const TOP: React.CSSProperties = { position: "absolute", left: 120, right: 220, top: 110 };
const GRID = [CAKES.drip, CAKES.forest, CAKES.straw, CAKES.lilac, CAKES.cup, CAKES.bday];

// Chat bubble: `me` = the cake maker (right, pink); otherwise the customer (left, white).
const Bubble: React.FC<{ at: number; me?: boolean; children: React.ReactNode }> = ({ at, me, children }) => (
  <Appear at={at} style={{ display: "flex", justifyContent: me ? "flex-end" : "flex-start" }}>
    <div style={{ padding: "14px 24px", borderRadius: 26, borderBottomLeftRadius: me ? 26 : 8, borderBottomRightRadius: me ? 8 : 26, background: me ? "rgba(252,231,243,0.98)" : "rgba(255,255,255,0.98)", boxShadow: "0 8px 22px rgba(131,24,67,0.08)" }}>
      {children}
    </div>
  </Appear>
);

const Chat: React.FC<{ w: number; h: number; children: React.ReactNode }> = ({ w, h, children }) => (
  <Glass style={{ width: w, height: h, padding: 24, display: "flex", flexDirection: "column", gap: 16, overflow: "hidden" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14, paddingBottom: 12, borderBottom: "2px solid rgba(251,228,239,0.9)" }}>
      <IconTile icon={User} tint={C.blue} size={56} />
      <Skel w={170} strong />
    </div>
    {children}
  </Glass>
);

// The catalog on a phone: logo bar and a grid of cakes with flavour/price chips.
const CatalogPhone: React.FC<{ at: number; w?: number; scrollAt?: number }> = ({ at, w = 400, scrollAt }) => {
  const { frame, f } = useTime();
  const y = scrollAt === undefined ? 0 : interpolate(frame, [f(scrollAt), f(scrollAt) + 60], [0, -150], clamp);
  const k = w / 400;
  return (
    <Glass style={{ padding: 14 * k, borderRadius: 50 * k }}>
      <div style={{ width: w, height: w * 1.75, borderRadius: 38 * k, background: "white", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 * k, padding: `${14 * k}px ${18 * k}px`, borderBottom: "2px solid #FBE4EF", zIndex: 1, background: "white" }}>
          <img src={LOGO} style={{ width: 48 * k, height: 45 * k }} />
          <Skel w={140 * k} strong />
        </div>
        <div style={{ padding: 14 * k, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 * k, transform: `translateY(${y}px)` }}>
          {[...GRID, CAKES.slice, CAKES.sparkle].map((c, i) => (
            <Pop key={c} at={at + 0.15 + i * 0.07}>
              <div style={{ borderRadius: 14 * k, overflow: "hidden", background: "#FFF7FA" }}>
                <img src={cake(c)} style={{ width: "100%", height: 130 * k, objectFit: "cover", display: "block" }} />
                <div style={{ padding: 8 * k, display: "flex", gap: 6 * k }}>
                  <div style={{ width: 50 * k, height: 14 * k, borderRadius: 7, background: "#FBCFE8" }} />
                  <div style={{ width: 34 * k, height: 14 * k, borderRadius: 7, background: "#FDE68A", marginLeft: "auto" }} />
                </div>
              </div>
            </Pop>
          ))}
        </div>
      </div>
    </Glass>
  );
};

const LinkChip: React.FC<{ size?: number }> = ({ size = 1 }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 12 * size, padding: `${12 * size}px ${22 * size}px`, borderRadius: 999, background: "rgba(252,231,243,0.98)", border: "3px solid #F9A8D4" }}>
    <Link2 size={36 * size} color="#E11D74" strokeWidth={2.5} />
    <img src={LOGO} style={{ width: 46 * size, height: 43 * size }} />
    <div style={{ width: 160 * size, height: 14 * size, borderRadius: 9, background: "#F472B6" }} />
  </div>
);

const Sub: React.FC<{ from: number; to: number; hi?: number[]; top?: number; size?: number }> = ({ from, to, hi, top = 880, size = 48 }) => (
  <Appear at={t(from)} style={{ position: "absolute", left: 120, right: 120, top, display: "flex", justifyContent: "center" }}>
    <Glass style={{ padding: "18px 44px", borderRadius: 999 }}>
      <Say from={from} to={to} hi={hi} size={size} />
    </Glass>
  </Appear>
);

// ---------- 1. "Apu, how much? what designs?" ----------

const Hook: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Appear at={t(0)} style={{ position: "absolute", left: 220, top: 180 }}>
      <Chat w={640} h={560}>
        <Bubble at={t(4)}>
          <Say from={4} to={6} size={50} align="left" />
        </Bubble>
        <Bubble at={t(7)}>
          <Say from={7} to={11} size={50} align="left" />
        </Bubble>
      </Chat>
    </Appear>
    <div style={{ position: "absolute", left: 980, top: 300, width: 800, display: "flex", flexDirection: "column", gap: 30 }}>
      <Say from={0} to={3} hi={[1]} size={72} align="left" />
      <div style={{ display: "flex", gap: 20 }}>
        {[CAKES.drip, CAKES.straw, CAKES.forest].map((c, i) => (
          <Pop key={c} at={t(8) + i * 0.12}>
            <img src={cake(c)} style={{ width: 200, height: 200, objectFit: "cover", borderRadius: 24, boxShadow: "0 14px 30px rgba(131,24,67,0.16)" }} />
          </Pop>
        ))}
      </div>
    </div>
  </>
);

// ---------- 2. the same questions every day ----------

const QS: [number, number][] = [
  [16, 19],
  [20, 22],
  [23, 26],
  [27, 32],
];

const Daily: React.FC = () => (
  <>
    <Wash tone="violet" />
    <Say from={12} to={15} hi={[12, 14, 15]} size={70} style={TOP} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 260, display: "flex", justifyContent: "center", gap: 40 }}>
      {[0, 1].map((col) => (
        <div key={col} style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          {QS.filter((_, i) => i % 2 === col).map(([a, b]) => (
            <Appear key={a} at={t(a)}>
              <Glass style={{ padding: "20px 30px", display: "flex", alignItems: "center", gap: 18, width: 760 }}>
                <MessageCircle size={40} color="#E11D74" strokeWidth={2.3} />
                <Say from={a} to={b} hi={[a + 1]} size={48} align="left" />
              </Glass>
            </Appear>
          ))}
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center", gap: 24 }}>
      {[CAKES.slice, CAKES.lilac, CAKES.cup, CAKES.bday].map((c, i) => (
        <Pop key={c} at={t(16) + i * 0.8}>
          <img src={cake(c)} style={{ width: 180, height: 180, objectFit: "cover", borderRadius: 22, boxShadow: "0 12px 26px rgba(131,24,67,0.14)" }} />
        </Pop>
      ))}
    </div>
  </>
);

// ---------- 3. digging through the gallery; the customer is gone ----------

const Gallery: React.FC = () => {
  const gone = useProgress(t(49), t(52) + 0.4);
  return (
    <>
      <Wash tone="amber" />
      <Appear at={t(33)} style={{ position: "absolute", left: 180, top: 160 }}>
        <Glass style={{ width: 620, padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <IconTile icon={ImageIcon} tint={C.violet} size={56} />
            <Say from={34} to={34} size={42} />
            <Search size={36} color="#A21CAF" strokeWidth={2.4} style={{ marginLeft: "auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {[...GRID, CAKES.slice, CAKES.sparkle, CAKES.candles].map((c, i) => (
              <img key={c} src={cake(c)} style={{ width: "100%", height: 130, objectFit: "cover", borderRadius: 12, opacity: 0.55 + 0.45 * ((i * 7) % 3 === 0 ? 1 : 0) }} />
            ))}
          </div>
        </Glass>
      </Appear>
      <Appear at={t(38)} style={{ position: "absolute", left: 900, top: 160 }}>
        <Chat w={560} h={520}>
          {[CAKES.drip, CAKES.straw].map((c, i) => (
            <Bubble key={c} at={t(38) + i * 0.4} me>
              <img src={cake(c)} style={{ width: 170, height: 110, objectFit: "cover", borderRadius: 12, display: "block" }} />
            </Bubble>
          ))}
          <Bubble at={t(42)} me>
            <Skel w={140} strong />
          </Bubble>
        </Chat>
      </Appear>
      <Appear at={t(47)} style={{ position: "absolute", left: 1540, top: 300, opacity: 1 - 0.75 * gone }}>
        <IconTile icon={UserMinus} tint={C.rose} size={150} />
      </Appear>
      <Say from={33} to={44} hi={[34, 35, 36, 37]} size={46} style={{ position: "absolute", left: 120, right: 120, top: 780 }} />
      <Say from={45} to={52} hi={[49, 50, 51]} size={46} style={{ position: "absolute", left: 120, right: 120, top: 870 }} />
    </>
  );
};

// ---------- 4. if baking time goes to the inbox, how will you grow? ----------

const Q: React.FC = () => {
  const drain = useProgress(t(57), t(59) + 0.4);
  return (
    <>
      <Wash tone="rose" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 200, display: "flex", justifyContent: "center", alignItems: "center", gap: 60 }}>
        <Appear at={t(53)}>
          <Photo src={CAKES.straw} w={360} h={320} style={{ opacity: 1 - 0.5 * drain }} />
        </Appear>
        <Appear at={t(55)}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <IconTile icon={Clock} tint={C.amber} size={120} />
            <div style={{ fontSize: 80, color: "#F472B6", fontWeight: 800 }}>→</div>
          </div>
        </Appear>
        <Appear at={t(57)}>
          <div style={{ transform: `scale(${1 + 0.15 * drain})` }}>
            <IconTile icon={Inbox} tint={PINK} size={200} />
          </div>
        </Appear>
      </div>
      <Say from={53} to={59} hi={[54, 55, 57]} size={58} style={{ position: "absolute", left: 120, right: 120, top: 640 }} />
      <Say from={60} to={64} hi={[61, 62]} size={72} style={{ position: "absolute", left: 120, right: 120, top: 770 }} />
    </>
  );
};

// ---------- 5. Mishtio brings your own digital cake catalog ----------

const Intro: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Appear at={t(65)} rise={70} scaleFrom={0.9} style={{ position: "absolute", left: 200, top: 210 }}>
      <div style={{ position: "relative", borderRadius: 36 }}>
        <MishtioCard w={420} />
        <Sweep from={t(65) + 0.2} to={t(65) + 1.2} />
      </div>
    </Appear>
    <div style={{ position: "absolute", left: 740, top: 300, width: 640, display: "flex", flexDirection: "column", gap: 30 }}>
      <Say from={65} to={69} size={66} align="left" />
      <Appear at={t(70)}>
        <PinkBox style={{ display: "inline-block" }}>
          <Say from={70} to={72} size={52} style={{ filter: "brightness(0) invert(1)", whiteSpace: "nowrap" }} />
          <Sweep from={t(72)} to={t(72) + 1} />
        </PinkBox>
      </Appear>
    </div>
    <Appear at={t(70)} style={{ position: "absolute", left: 1420, top: 150 }}>
      <CatalogPhone at={t(70)} w={340} />
    </Appear>
  </>
);

// ---------- 6. one link: every cake, every design in one place ----------

const LinkScene: React.FC = () => (
  <>
    <Wash tone="violet" />
    <Appear at={t(73)} style={{ position: "absolute", left: 220, top: 150 }}>
      <CatalogPhone at={t(75)} w={430} scrollAt={t(81)} />
    </Appear>
    <div style={{ position: "absolute", left: 840, top: 260, width: 900, display: "flex", flexDirection: "column", gap: 40 }}>
      <Appear at={t(73)}>
        <LinkChip size={1.3} />
      </Appear>
      <Say from={73} to={80} hi={[74, 78, 80]} size={64} align="left" />
      <Appear at={t(81)}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <IconTile icon={CheckCheck} tint={C.green} size={90} />
          <Say from={81} to={84} hi={[82, 84]} size={64} align="left" />
        </div>
      </Appear>
    </div>
  </>
);

// ---------- 7. no hunting photos; customers look and pick; prices up front ----------

const Self: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Appear at={t(85)} style={{ position: "absolute", left: 160, top: 160, display: "flex", alignItems: "center", gap: 20 }}>
      <Strike at={t(90)}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <IconTile icon={Search} tint={C.violet} size={90} />
          <Say from={85} to={90} size={56} align="left" />
        </div>
      </Strike>
    </Appear>
    <Appear at={t(91)} style={{ position: "absolute", left: 160, top: 360 }}>
      <Glass style={{ width: 1600, padding: 30, display: "flex", alignItems: "center", gap: 30 }}>
        <IconTile icon={Eye} tint={PINK} size={130} />
        <div style={{ display: "flex", gap: 18 }}>
          {[CAKES.drip, CAKES.forest, CAKES.straw, CAKES.lilac].map((c, i) => (
            <div key={c} style={{ position: "relative" }}>
              <img src={cake(c)} style={{ width: 230, height: 230, objectFit: "cover", borderRadius: 20, display: "block" }} />
              <Pop at={t(95) + i * 0.1} style={{ position: "absolute", left: 12, bottom: 12 }}>
                <div style={{ width: 80, height: 30, borderRadius: 10, background: "linear-gradient(90deg, #E11D74, #F472B6)" }} />
              </Pop>
            </div>
          ))}
        </div>
      </Glass>
    </Appear>
    <div style={{ position: "absolute", left: 0, right: 0, top: 760, display: "flex", justifyContent: "center", gap: 40 }}>
      <Appear at={t(91)}>
        <Glass style={{ padding: "18px 40px", borderRadius: 999 }}>
          <Say from={91} to={94} hi={[92]} size={50} />
        </Glass>
      </Appear>
      <Appear at={t(95)}>
        <Glass style={{ padding: "18px 40px", borderRadius: 999 }}>
          <Say from={95} to={98} hi={[95, 96]} size={50} />
        </Glass>
      </Appear>
    </div>
  </>
);

// ---------- 8. no more getting tired of "price?" ----------

const NoTired: React.FC = () => (
  <>
    <Wash tone="violet" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 180, display: "flex", justifyContent: "center", gap: 24 }}>
      {[0, 1, 2, 3].map((i) => (
        <Pop key={i} at={t(99) + i * 0.1}>
          <Strike at={t(109)}>
            <div style={{ padding: "16px 26px", borderRadius: 26, borderBottomLeftRadius: 8, background: "white", boxShadow: "0 8px 22px rgba(131,24,67,0.08)" }}>
              <Say from={99} to={100} size={44} align="left" />
            </div>
          </Strike>
        </Pop>
      ))}
    </div>
    <Appear at={t(101)} style={{ position: "absolute", left: 0, right: 0, top: 400, display: "flex", justifyContent: "center" }}>
      <Float amp={6}>
        <IconTile icon={Clock} tint={C.amber} size={170} />
      </Float>
    </Appear>
    <Say from={101} to={109} hi={[106, 108, 109]} size={66} style={{ position: "absolute", left: 120, right: 120, top: 680 }} />
  </>
);

// ---------- 9. which cake, which flavour, which size — all clear ----------

const Clear: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Appear at={t(110)} style={{ position: "absolute", left: 200, top: 200 }}>
      <Glass style={{ width: 760, padding: 26, display: "flex", flexDirection: "column", gap: 18 }}>
        <img src={cake(CAKES.forest)} style={{ width: "100%", height: 420, objectFit: "cover", borderRadius: 20 }} />
        <Skel w={300} strong />
      </Glass>
    </Appear>
    <div style={{ position: "absolute", left: 1060, top: 230, display: "flex", flexDirection: "column", gap: 26 }}>
      {[
        { a: 110, b: 111, icon: ShoppingBag, tint: PINK },
        { a: 112, b: 113, icon: Crown, tint: BERRY },
        { a: 114, b: 117, icon: TrendingUp, tint: C.amber },
      ].map((r) => (
        <Appear key={r.a} at={t(r.a)}>
          <Glass style={{ width: 640, padding: "18px 26px", display: "flex", alignItems: "center", gap: 20 }}>
            <IconTile icon={r.icon} tint={r.tint} size={80} />
            <Say from={r.a} to={r.b} hi={[r.b]} size={50} align="left" />
            <Pop at={t(119)} style={{ marginLeft: "auto" }}>
              <CheckBadge size={50} />
            </Pop>
          </Glass>
        </Appear>
      ))}
      <Say from={118} to={119} hi={[119]} size={64} align="left" />
    </div>
  </>
);

// ---------- 10. share one link: post, inbox, WhatsApp, bio ----------

const Share: React.FC = () => {
  const spread = useProgress(t(124), t(128) + 0.4);
  const spots = [
    { i: 124, j: 125, icon: ImageIcon, tint: C.blue },
    { i: 126, j: 126, icon: Inbox, tint: PINK },
    { i: 127, j: 127, icon: MessageCircle, tint: C.green },
    { i: 128, j: 128, icon: User, tint: BERRY },
  ];
  return (
    <>
      <Wash tone="teal" />
      <Say from={120} to={123} hi={[121, 122]} size={70} style={TOP} />
      <Appear at={t(120)} style={{ position: "absolute", left: 960 - 230, top: 470 }}>
        <LinkChip size={1.4} />
      </Appear>
      <Pop at={t(122)} style={{ position: "absolute", left: 960 - 50, top: 330 }}>
        <IconTile icon={Share2} tint={PINK} size={100} />
      </Pop>
      {spots.map((s, k) => {
        const x = [260, 1400, 260, 1400][k];
        const y = [300, 300, 700, 700][k];
        return (
          <Appear key={s.i} at={t(s.i)} style={{ position: "absolute", left: x, top: y }}>
            <Glass style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: 16, transform: `scale(${0.9 + 0.1 * spread})` }}>
              <IconTile icon={s.icon} tint={s.tint} size={80} />
              <Say from={s.i} to={s.j} size={48} />
            </Glass>
          </Appear>
        );
      })}
      <Sub from={129} to={131} hi={[130]} top={900} size={50} />
    </>
  );
};

// ---------- 11. spend that time baking instead ----------

const Bake: React.FC = () => (
  <>
    <Wash tone="amber" />
    <Appear at={t(132)} style={{ position: "absolute", left: 200, top: 260 }}>
      <Strike at={t(136)}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <IconTile icon={MessageCircle} tint={C.rose} size={100} />
          <Say from={132} to={137} size={52} align="left" style={{ width: 720 }} />
        </div>
      </Strike>
    </Appear>
    <Appear at={t(138)} style={{ position: "absolute", left: 200, top: 480, width: 760 }}>
      <Say from={138} to={142} hi={[140, 141]} size={76} align="left" />
    </Appear>
    <Appear at={t(140)} style={{ position: "absolute", left: 1100, top: 200 }}>
      <Photo src={CAKES.sparkle} w={500} h={640} pos="50% 55%" />
    </Appear>
  </>
);

// ---------- 12. a tidy cake brand; quicker orders; more sales ----------

const Brand: React.FC = () => {
  const up = useProgress(t(161), t(163) + 0.6);
  return (
    <>
      <Wash tone="pink" />
      <Say from={143} to={152} hi={[149, 150, 151, 152]} size={58} style={TOP} />
      <Appear at={t(149)} style={{ position: "absolute", left: 200, top: 280 }}>
        <CatalogPhone at={t(149)} w={290} />
      </Appear>
      <Appear at={t(153)} style={{ position: "absolute", left: 680, top: 300 }}>
        <Glass style={{ width: 560, padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <img src={cake(CAKES.lilac)} style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 18 }} />
          <Pop at={t(158)}>
            <div style={{ height: 70, borderRadius: 35, background: "linear-gradient(90deg, #E11D74, #F472B6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckBadge size={44} />
            </div>
          </Pop>
        </Glass>
      </Appear>
      <Appear at={t(161)} style={{ position: "absolute", left: 1320, top: 300 }}>
        <Glass style={{ width: 420, height: 420, padding: 30, display: "flex", alignItems: "flex-end", gap: 18 }}>
          {[0.3, 0.45, 0.6, 0.8, 1].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h * 90 * interpolate(up, [i * 0.1, i * 0.1 + 0.5], [0, 1], clamp)}%`, borderRadius: 12, background: "linear-gradient(180deg, #F9A8D4, #E11D74)" }} />
          ))}
        </Glass>
      </Appear>
      <Sub from={153} to={163} hi={[157, 158, 159, 162, 163]} top={860} size={46} />
    </>
  );
};

// ---------- 13. add cakes, change prices — the link updates at once ----------

const Update: React.FC = () => (
  <>
    <Wash tone="violet" />
    <div style={{ position: "absolute", left: 160, top: 220, display: "flex", flexDirection: "column", gap: 30 }}>
      <Appear at={t(164)}>
        <Glass style={{ padding: "20px 30px", display: "flex", alignItems: "center", gap: 20 }}>
          <IconTile icon={PlusCircle} tint={PINK} size={90} />
          <Say from={164} to={167} hi={[165, 166]} size={56} align="left" />
        </Glass>
      </Appear>
      <Appear at={t(168)}>
        <Glass style={{ padding: "20px 30px", display: "flex", alignItems: "center", gap: 20 }}>
          <IconTile icon={RefreshCw} tint={BERRY} size={90} />
          <Say from={168} to={169} hi={[168, 169]} size={56} align="left" />
        </Glass>
      </Appear>
    </div>
    <Appear at={t(170)} style={{ position: "absolute", left: 1220, top: 140 }}>
      <CatalogPhone at={t(170)} w={380} />
    </Appear>
    <Say from={170} to={176} hi={[172, 173, 174]} size={54} align="left" style={{ position: "absolute", left: 160, top: 640, width: 960 }} />
  </>
);

// ---------- 14. "price?" — send one link; the catalog explains the rest ----------

const OneLink: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Appear at={t(177)} style={{ position: "absolute", left: 200, top: 160 }}>
      <Chat w={760} h={520}>
        <Bubble at={t(177)}>
          <Say from={178} to={179} size={50} align="left" />
        </Bubble>
        <Bubble at={t(184)} me>
          <LinkChip />
        </Bubble>
        <Appear at={t(187)} style={{ alignSelf: "flex-end" }}>
          <CheckCheck size={36} color="#E11D74" strokeWidth={2.4} />
        </Appear>
      </Chat>
    </Appear>
    <div style={{ position: "absolute", left: 1040, top: 220, width: 760, display: "flex", flexDirection: "column", gap: 34 }}>
      <Say from={177} to={187} hi={[184, 185, 186]} size={52} align="left" />
      <Appear at={t(188)}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <IconTile icon={Send} tint={PINK} size={90} />
          <Say from={188} to={191} hi={[189]} size={60} align="left" />
        </div>
      </Appear>
    </div>
  </>
);

// ---------- 15. show your cakes as beautifully as you make them ----------

const Beauty: React.FC = () => {
  const { frame } = useTime();
  return (
    <>
      <Wash tone="violet" />
      {[CAKES.lilac, CAKES.straw, CAKES.drip, CAKES.forest].map((c, i) => (
        <Appear key={c} at={t(192) + i * 0.15} style={{ position: "absolute", left: [120, 470, 1180, 1520][i], top: [180, 600, 600, 180][i] }}>
          <div style={{ transform: `rotate(${[-5, 4, -4, 5][i]}deg) translateY(${Math.sin(frame / 40 + i) * 6}px)` }}>
            <Photo src={c} w={260} h={240} />
          </div>
        </Appear>
      ))}
      <Say from={192} to={195} hi={[195]} size={74} style={{ position: "absolute", left: 0, right: 0, top: 340 }} />
      <Say from={196} to={202} hi={[198, 200]} size={58} style={{ position: "absolute", left: 300, right: 300, top: 460 }} />
    </>
  );
};

// ---------- 16. comment "catalog" or inbox the page ----------

const Cta: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Appear at={t(203)} rise={60} style={{ position: "absolute", left: 960 - 190, top: 60 }}>
      <div style={{ position: "relative", borderRadius: 36 }}>
        <MishtioCard w={340} />
        <Sweep from={t(203) + 0.2} to={t(203) + 1.2} />
      </div>
    </Appear>
    <Say from={203} to={207} hi={[206]} size={50} style={{ position: "absolute", left: 120, right: 120, top: 460 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", justifyContent: "center", gap: 30 }}>
      <Appear at={t(208)}>
        <Glass style={{ padding: "18px 34px", borderRadius: 999, display: "flex", alignItems: "center", gap: 16 }}>
          <MessageCircle size={42} color="#E11D74" strokeWidth={2.4} />
          <Say from={208} to={211} hi={[210]} size={46} />
        </Glass>
      </Appear>
      <Appear at={t(212)}>
        <Glass style={{ padding: "18px 34px", borderRadius: 999, display: "flex", alignItems: "center", gap: 16 }}>
          <Inbox size={42} color="#A21CAF" strokeWidth={2.4} />
          <Say from={212} to={214} hi={[213]} size={46} />
        </Glass>
      </Appear>
    </div>
    <Appear at={t(215)} style={{ position: "absolute", left: 0, right: 0, top: 720, display: "flex", justifyContent: "center" }}>
      <PinkBox>
        <Say from={215} to={221} size={60} style={{ filter: "brightness(0) invert(1)" }} />
        <Sweep from={t(220)} to={t(220) + 1} />
      </PinkBox>
    </Appear>
  </>
);

// ---------- assembly ----------

const SCENES: Record<SceneKey, React.FC> = {
  hook: Hook,
  daily: Daily,
  gallery: Gallery,
  q: Q,
  intro: Intro,
  link: LinkScene,
  self: Self,
  noTired: NoTired,
  clear: Clear,
  share: Share,
  bake: Bake,
  brand: Brand,
  update: Update,
  oneLink: OneLink,
  beauty: Beauty,
  cta: Cta,
};
const ORDER = Object.keys(SCENE_START) as SceneKey[];
const PRE = 0.4;
export const TOTAL_SECONDS_19 = audioDuration + tail;
const NO_CORNER = new Set<SceneKey>(["intro", "cta"]);

const cues: Cue[] = [
  ...Object.values(SCENE_START).slice(1).map((i): Cue => [W[i] - 0.45, "whoosh"]),
  ...[4, 7, 16, 20, 23, 27, 38, 42, 73, 91, 95, 110, 112, 114, 124, 126, 127, 128, 164, 168, 184].map((i): Cue => [W[i], "pop"]),
  ...[72, 84, 98, 119, 152, 163, 176, 191, 221].map((i): Cue => [W[i], "ding"]),
  [W[52], "stamp"],
  [W[90], "stamp"],
  [W[109], "stamp"],
];

export const Video19: React.FC = () => {
  const { fps } = useVideoConfig();
  const overlap = motion.transitionFrames / fps;
  return (
    <PaletteProvider value={pinkPalette}>
      <AbsoluteFill>
        <div style={{ position: "absolute", left: 0, top: 0, width: design.width, height: design.height, zoom: design.zoom }}>
          <Background />
          {ORDER.map((key, i) => {
            const Comp = SCENES[key];
            const start = W[SCENE_START[key]];
            const to = i === ORDER.length - 1 ? TOTAL_SECONDS_19 + 1 : W[SCENE_START[ORDER[i + 1]]] - PRE + overlap;
            return (
              <Scene key={key} from={Math.max(0, start - PRE)} to={to}>
                <Comp />
                {NO_CORNER.has(key) ? null : <Corner at={start - 0.3} />}
              </Scene>
            );
          })}
        </div>
        <Audio src={staticFile("voiceover-mishtio-catalog.mp3")} />
        <SfxTrack cues={cues} />
      </AbsoluteFill>
    </PaletteProvider>
  );
};
