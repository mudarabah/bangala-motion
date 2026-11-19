// Mishtio "two nights" ad (2026-11-19 voice): 11 pm, cakes done, but the notebook, Messenger and lost
// numbers keep you up → the same 11 pm with Mishtio: list ready, one tap, profit, best seller, offers,
// catalogue link, five minutes, sleep → "which night do you want?".
// Style: pink glass (pinkPalette); the first night uses cooler violet/rose washes, never a dark field.
import React from "react";
import { Audio } from "@remotion/media";
import {
  BookOpen,
  CalendarDays,
  CheckCheck,
  Clock,
  Crown,
  Frown,
  Gift,
  HelpCircle,
  Inbox,
  Link2,
  MapPin,
  MessageCircle,
  Moon,
  Phone,
  Smile,
  Sparkles,
  Stars,
  Truck,
  User,
  Wallet,
} from "lucide-react";
import { AbsoluteFill, interpolate, staticFile, useVideoConfig } from "remotion";
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
const NIGHT: [string, string] = ["#C7D2FE", "#4F46E5"];

// An analog clock at 11 o'clock; the minute hand ticks slowly.
const ElevenClock: React.FC<{ size?: number; tint?: string }> = ({ size = 300, tint = "#E11D74" }) => {
  const { frame } = useTime();
  const r = size / 2;
  return (
    <div style={{ position: "relative", width: size, height: size, borderRadius: 999, background: "rgba(255,255,255,0.94)", border: `${size * 0.035}px solid ${tint}33`, boxShadow: `0 20px 50px ${tint}2a` }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", left: r - 3, top: size * 0.06, width: 6, height: size * 0.06, borderRadius: 4, background: "#CBD5E1", transformOrigin: `3px ${r - size * 0.06}px`, transform: `rotate(${i * 30}deg)` }} />
      ))}
      <div style={{ position: "absolute", left: r - 6, top: r - size * 0.26, width: 12, height: size * 0.26, borderRadius: 8, background: "#3B1A10", transformOrigin: "50% 100%", transform: "rotate(-30deg)" }} />
      <div style={{ position: "absolute", left: r - 4, top: r - size * 0.38, width: 8, height: size * 0.38, borderRadius: 8, background: tint, transformOrigin: "50% 100%", transform: `rotate(${(frame / 30) * 6}deg)` }} />
      <div style={{ position: "absolute", left: r - 12, top: r - 12, width: 24, height: 24, borderRadius: 99, background: "#3B1A10" }} />
    </div>
  );
};

const Bubble: React.FC<{ at: number; me?: boolean; children: React.ReactNode }> = ({ at, me, children }) => (
  <Appear at={at} style={{ display: "flex", justifyContent: me ? "flex-end" : "flex-start" }}>
    <div style={{ padding: "14px 24px", borderRadius: 26, borderBottomLeftRadius: me ? 26 : 8, borderBottomRightRadius: me ? 8 : 26, background: me ? "rgba(252,231,243,0.98)" : "rgba(255,255,255,0.98)", boxShadow: "0 8px 22px rgba(131,24,67,0.08)" }}>
      {children}
    </div>
  </Appear>
);

// A phone showing the Mishtio app: logo bar + content.
const MishtioPhone: React.FC<{ w?: number; children: React.ReactNode }> = ({ w = 420, children }) => (
  <Glass style={{ padding: 14, borderRadius: 50 }}>
    <div style={{ width: w, height: w * 1.75, borderRadius: 38, background: "white", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderBottom: "2px solid #FBE4EF" }}>
        <img src={LOGO} style={{ width: 52, height: 49 }} />
        <Skel w={150} strong />
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>{children}</div>
    </div>
  </Glass>
);

const Sub: React.FC<{ from: number; to: number; hi?: number[]; top?: number; size?: number }> = ({ from, to, hi, top = 880, size = 48 }) => (
  <Appear at={t(from)} style={{ position: "absolute", left: 120, right: 120, top, display: "flex", justifyContent: "center" }}>
    <Glass style={{ padding: "18px 44px", borderRadius: 999 }}>
      <Say from={from} to={to} hi={hi} size={size} />
    </Glass>
  </Appear>
);

// ---------- NIGHT ONE ----------

// 1. 11 pm. Cakes done; your work isn't.
const N1: React.FC = () => (
  <>
    <Wash tone="violet" />
    <Appear at={t(0)} style={{ position: "absolute", left: 260, top: 230 }}>
      <ElevenClock size={380} tint="#6366F1" />
    </Appear>
    <Pop at={t(0)} style={{ position: "absolute", left: 560, top: 180 }}>
      <IconTile icon={Moon} tint={NIGHT} size={110} />
    </Pop>
    <div style={{ position: "absolute", left: 860, top: 260, width: 900, display: "flex", flexDirection: "column", gap: 26 }}>
      <Say from={0} to={1} hi={[1]} size={96} align="left" />
      <Appear at={t(2)} style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <img src={cake(CAKES.drip)} style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 20 }} />
        <Say from={2} to={4} size={60} align="left" />
        <Pop at={t(4)}>
          <CheckBadge size={56} />
        </Pop>
      </Appear>
      <Say from={5} to={10} hi={[8, 9, 10]} size={60} align="left" />
    </div>
  </>
);

// 2. Sore shoulders, notebook in hand, scrolling Messenger to count tomorrow's orders.
const N1a: React.FC = () => {
  const { frame, f } = useTime();
  const y = interpolate(frame, [f(t(15)), f(t(22)) + 20], [0, -260], clamp);
  return (
    <>
      <Wash tone="rose" />
      <div style={{ position: "absolute", left: 160, top: 200, display: "flex", flexDirection: "column", gap: 26 }}>
        <Appear at={t(11)}>
          <Glass style={{ padding: "18px 28px", display: "flex", alignItems: "center", gap: 18 }}>
            <IconTile icon={Frown} tint={C.rose} size={80} />
            <Say from={11} to={12} size={52} />
          </Glass>
        </Appear>
        <Appear at={t(13)}>
          <Glass style={{ padding: "18px 28px", display: "flex", alignItems: "center", gap: 18 }}>
            <IconTile icon={BookOpen} tint={C.amber} size={80} />
            <Say from={13} to={14} size={52} />
          </Glass>
        </Appear>
      </div>
      <Appear at={t(15)} style={{ position: "absolute", left: 780, top: 150 }}>
        <Glass style={{ padding: 14, borderRadius: 50 }}>
          <div style={{ width: 380, height: 620, borderRadius: 38, background: "white", overflow: "hidden" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: 18, transform: `translateY(${y}px)` }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 99, background: ["#BFDBFE", "#FBCFE8", "#DDD6FE", "#FDE68A"][i % 4] }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <Skel w={180 - (i % 3) * 30} strong />
                    <Skel w={220 - (i % 4) * 25} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Glass>
      </Appear>
      <Say from={15} to={22} hi={[18, 19, 20]} size={54} align="left" style={{ position: "absolute", left: 1260, top: 330, width: 560 }} />
    </>
  );
};

// 3. Friday's 2-pound chocolate cake — whose was it? Name forgotten, number lost in chat.
const N1b: React.FC = () => (
  <>
    <Wash tone="violet" />
    <Appear at={t(23)} style={{ position: "absolute", left: 200, top: 190 }}>
      <Glass style={{ width: 640, padding: 26, display: "flex", flexDirection: "column", gap: 16 }}>
        <img src={cake(CAKES.slice)} style={{ width: "100%", height: 330, objectFit: "cover", borderRadius: 18 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <CalendarDays size={38} color="#E11D74" strokeWidth={2.3} />
          <Say from={26} to={30} hi={[26]} size={42} align="left" />
        </div>
      </Glass>
    </Appear>
    <Say from={23} to={33} hi={[32, 33]} size={56} align="left" style={{ position: "absolute", left: 960, top: 180, width: 840 }} />
    <div style={{ position: "absolute", left: 960, top: 450, display: "flex", flexDirection: "column", gap: 24 }}>
      <Appear at={t(34)}>
        <Glass style={{ padding: "18px 28px", display: "flex", alignItems: "center", gap: 18 }}>
          <IconTile icon={User} tint={C.blue} size={74} />
          <Say from={34} to={36} hi={[36]} size={50} />
          <Pop at={t(36)}>
            <HelpCircle size={46} color="#E11D74" strokeWidth={2.4} />
          </Pop>
        </Glass>
      </Appear>
      <Appear at={t(37)}>
        <Glass style={{ width: 820, padding: "18px 28px", display: "flex", alignItems: "center", gap: 18 }}>
          <IconTile icon={Phone} tint={C.orange} size={74} />
          <Say from={37} to={42} hi={[41, 42]} size={48} align="left" />
        </Glass>
      </Appear>
    </div>
  </>
);

// 4. Lots of orders this month, yet little money in hand — and you can't see why.
const N1c: React.FC = () => {
  const { frame, f } = useTime();
  const piles = interpolate(frame, [f(t(43)), f(t(47))], [0, 1], clamp);
  return (
    <>
      <Wash tone="rose" />
      <Say from={43} to={47} hi={[45, 46]} size={64} style={TOP} />
      <div style={{ position: "absolute", left: 200, top: 300, display: "grid", gridTemplateColumns: "repeat(4, 150px)", gap: 20 }}>
        {[CAKES.drip, CAKES.forest, CAKES.straw, CAKES.lilac, CAKES.cup, CAKES.bday, CAKES.slice, CAKES.sparkle].map((c, i) => {
          const on = interpolate(piles, [i / 8, (i + 1) / 8], [0, 1], clamp);
          return <img key={c} src={cake(c)} style={{ width: 150, height: 150, objectFit: "cover", borderRadius: 18, opacity: on, transform: `scale(${0.7 + 0.3 * on})` }} />;
        })}
      </div>
      <Appear at={t(48)} style={{ position: "absolute", left: 1040, top: 300 }}>
        <Card w={720} h={420}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <IconTile icon={Wallet} tint={C.amber} size={130} />
            <Pop at={t(53)}>
              <IconTile icon={HelpCircle} tint={C.rose} size={90} />
            </Pop>
          </div>
          <Say from={48} to={57} hi={[50, 52, 53]} size={46} style={{ padding: "0 30px" }} />
        </Card>
      </Appear>
    </>
  );
};

// 5. If this feels familiar: you're not alone.
const Alone: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Say from={58} to={65} size={58} style={{ position: "absolute", left: 120, right: 120, top: 150 }} />
    <Appear at={t(66)} style={{ position: "absolute", left: 0, right: 0, top: 270, display: "flex", justifyContent: "center" }}>
      <PinkBox>
        <Say from={66} to={68} size={76} style={{ filter: "brightness(0) invert(1)" }} />
      </PinkBox>
    </Appear>
    <div style={{ position: "absolute", left: 0, right: 0, top: 480, display: "flex", justifyContent: "center", gap: 24 }}>
      {[C.blue, PINK, BERRY, C.amber, C.teal, C.violet, C.orange].map((tint, i) => (
        <Pop key={i} at={t(69) + i * 0.1}>
          <IconTile icon={User} tint={tint} size={100} />
        </Pop>
      ))}
    </div>
    <Say from={69} to={75} hi={[69, 73, 74]} size={56} style={{ position: "absolute", left: 120, right: 120, top: 660 }} />
  </>
);

// 6. Now imagine another night.
const Other: React.FC = () => {
  const glow = useProgress(t(76), t(81) + 0.5);
  return (
    <>
      <Wash tone="pink" k={0.6 + 0.6 * glow} />
      <Pop at={t(76)} style={{ position: "absolute", left: 960 - 80, top: 230 }}>
        <Float amp={8}>
          <IconTile icon={Stars} tint={PINK} size={160} />
        </Float>
      </Pop>
      <Say from={76} to={81} hi={[78, 79, 80]} size={90} style={{ position: "absolute", left: 120, right: 120, top: 470 }} />
    </>
  );
};

// ---------- NIGHT TWO ----------

// 7. 11 pm. Cakes done. One look at Mishtio.
const N2: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Appear at={t(82)} style={{ position: "absolute", left: 200, top: 260 }}>
      <ElevenClock size={340} />
    </Appear>
    <div style={{ position: "absolute", left: 640, top: 270, width: 600, display: "flex", flexDirection: "column", gap: 26 }}>
      <Say from={82} to={83} hi={[83]} size={84} align="left" />
      <Appear at={t(84)} style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <img src={cake(CAKES.straw)} style={{ width: 110, height: 110, objectFit: "cover", borderRadius: 18 }} />
        <Say from={84} to={86} size={56} align="left" />
        <Pop at={t(86)}>
          <CheckBadge size={52} />
        </Pop>
      </Appear>
      <Say from={87} to={92} hi={[89, 91, 92]} size={54} align="left" />
    </div>
    <Appear at={t(89)} style={{ position: "absolute", left: 1340, top: 180 }}>
      <MishtioPhone w={340}>
        {[0, 1, 2].map((i) => (
          <Pop key={i} at={t(89) + 0.2 + i * 0.1}>
            <div style={{ height: 90, borderRadius: 16, background: ["#FCE7F3", "#F3E8FF", "#FEF3C7"][i] }} />
          </Pop>
        ))}
      </MishtioPhone>
    </Appear>
  </>
);

// 8. Tomorrow's delivery list is ready: three cakes — which, when, where.
const List: React.FC = () => (
  <>
    <Wash tone="pink" />
    <div style={{ position: "absolute", left: 140, top: 110, display: "flex", alignItems: "center", gap: 22 }}>
      <IconTile icon={Truck} tint={PINK} size={100} />
      <Say from={93} to={98} hi={[94, 95, 96, 97]} size={66} align="left" />
    </div>
    <Appear at={t(97)} style={{ position: "absolute", left: 260, top: 280 }}>
      <Glass style={{ width: 1400, padding: 26, display: "flex", flexDirection: "column", gap: 16 }}>
        {[CAKES.forest, CAKES.bday, CAKES.lilac].map((c, i) => (
          <Pop key={c} at={t(97) + i * 0.15}>
            <div style={{ display: "flex", alignItems: "center", gap: 30, padding: "14px 20px", borderRadius: 20, background: "rgba(255,241,247,0.92)" }}>
              <img src={cake(c)} style={{ width: 110, height: 110, objectFit: "cover", borderRadius: 16 }} />
              {[
                { i: 99, icon: Sparkles },
                { i: 100, icon: Clock },
                { i: 101, icon: MapPin },
              ].map((k) => (
                <div key={k.i} style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                  <k.icon size={34} color="#E11D74" strokeWidth={2.3} />
                  <Skel w={160 - i * 20} strong />
                </div>
              ))}
            </div>
          </Pop>
        ))}
      </Glass>
    </Appear>
    <div style={{ position: "absolute", left: 0, right: 0, top: 860, display: "flex", justifyContent: "center", gap: 30 }}>
      {[99, 100, 101].map((i) => (
        <Pop key={i} at={t(i)}>
          <Glass style={{ padding: "12px 30px", borderRadius: 999 }}>
            <Say from={i} to={i} size={46} />
          </Glass>
        </Pop>
      ))}
      <Appear at={t(102)}>
        <Glass style={{ padding: "12px 30px", borderRadius: 999 }}>
          <Say from={102} to={105} hi={[103, 104]} size={46} />
        </Glass>
      </Appear>
    </div>
  </>
);

// 9. Friday's chocolate cake? Name, number, address — one tap.
const Tap: React.FC = () => {
  const r = useProgress(t(115), t(116) + 0.4);
  return (
    <>
      <Wash tone="violet" />
      <Appear at={t(106)} style={{ position: "absolute", left: 220, top: 160 }}>
        <MishtioPhone w={400}>
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 14, padding: 12, borderRadius: 18, background: "#FCE7F3", border: "3px solid #F9A8D4" }}>
            <img src={cake(CAKES.slice)} style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 14 }} />
            <Skel w={160} strong />
            {r > 0 && r < 1 ? <div style={{ position: "absolute", left: 200 - 80 * r, top: 57 - 80 * r, width: 160 * r, height: 160 * r, borderRadius: 999, border: "6px solid rgba(225,29,116,0.5)", opacity: 1 - r }} /> : null}
          </div>
          {[User, Phone, MapPin].map((I, i) => (
            <Pop key={i} at={t(111 + i)}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 16, background: "#FFF7FA" }}>
                <I size={30} color="#E11D74" strokeWidth={2.3} />
                <Skel w={200 - i * 20} strong />
              </div>
            </Pop>
          ))}
        </MishtioPhone>
      </Appear>
      <Say from={106} to={108} hi={[107, 108]} size={66} align="left" style={{ position: "absolute", left: 840, top: 200, width: 900 }} />
      <div style={{ position: "absolute", left: 840, top: 360, display: "flex", flexDirection: "column", gap: 22 }}>
        {[
          { a: 109, b: 111, icon: User, tint: C.blue },
          { a: 112, b: 112, icon: Phone, tint: C.green },
          { a: 113, b: 113, icon: MapPin, tint: PINK },
        ].map((k) => (
          <Appear key={k.a} at={t(k.a)}>
            <Glass style={{ padding: "14px 26px", display: "flex", alignItems: "center", gap: 18 }}>
              <IconTile icon={k.icon} tint={k.tint} size={70} />
              <Say from={k.a} to={k.b} size={48} />
            </Glass>
          </Appear>
        ))}
        <Say from={114} to={119} hi={[115, 116]} size={58} align="left" />
      </div>
    </>
  );
};

// 10. Expenses and sales side by side: the real profit.
const Profit: React.FC = () => {
  const up = useProgress(t(120), t(126) + 0.4);
  return (
    <>
      <Wash tone="amber" />
      <Say from={120} to={127} hi={[122, 124, 125]} size={60} style={TOP} />
      <Appear at={t(122)} style={{ position: "absolute", left: 160, top: 280 }}>
        <Glass style={{ width: 820, height: 500, padding: 40, display: "flex", alignItems: "flex-end", gap: 40 }}>
          {[0, 1, 2, 3].map((m) => (
            <div key={m} style={{ flex: 1, height: "100%", display: "flex", alignItems: "flex-end", gap: 10 }}>
              <div style={{ flex: 1, height: `${(30 + m * 6) * interpolate(up, [m * 0.1, m * 0.1 + 0.5], [0, 1], clamp)}%`, borderRadius: 10, background: "linear-gradient(180deg, #FDE68A, #F59E0B)" }} />
              <div style={{ flex: 1, height: `${(55 + m * 10) * interpolate(up, [m * 0.1 + 0.1, m * 0.1 + 0.6], [0, 1], clamp)}%`, borderRadius: 10, background: "linear-gradient(180deg, #F9A8D4, #E11D74)" }} />
            </div>
          ))}
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 1080, top: 320, display: "flex", flexDirection: "column", gap: 26 }}>
        {[
          { i: 122, tint: C.amber },
          { i: 124, tint: PINK },
        ].map((k) => (
          <Appear key={k.i} at={t(k.i)}>
            <Glass style={{ padding: "14px 28px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(160deg, ${k.tint[0]}, ${k.tint[1]})` }} />
              <Say from={k.i} to={k.i} size={50} />
            </Glass>
          </Appear>
        ))}
        <Appear at={t(127)}>
          <Glass active={1} style={{ padding: "18px 28px", display: "flex", alignItems: "center", gap: 16 }}>
            <IconTile icon={Wallet} tint={C.green} size={80} />
            <Say from={128} to={131} hi={[128]} size={50} />
          </Glass>
        </Appear>
      </div>
    </>
  );
};

// 11. The report shows red velvet sells best: next month's offer.
const Best: React.FC = () => {
  const up = useProgress(t(132), t(134) + 0.6);
  return (
    <>
      <Wash tone="pink" />
      <Say from={132} to={138} hi={[134, 135, 136, 137]} size={62} style={TOP} />
      <Appear at={t(132)} style={{ position: "absolute", left: 260, top: 280 }}>
        <Glass style={{ width: 900, height: 460, padding: 40, display: "flex", alignItems: "flex-end", gap: 30 }}>
          {[0.45, 0.6, 1, 0.5, 0.35].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h * 90 * interpolate(up, [i * 0.08, i * 0.08 + 0.5], [0, 1], clamp)}%`, borderRadius: 14, background: i === 2 ? "linear-gradient(180deg, #FB7185, #BE123C)" : "linear-gradient(180deg, #FBCFE8, #F9A8D4)", position: "relative" }}>
              {i === 2 ? (
                <Pop at={t(136)} style={{ position: "absolute", left: "50%", top: -90, transform: "translateX(-50%)" }}>
                  <IconTile icon={Crown} tint={C.amber} size={80} />
                </Pop>
              ) : null}
            </div>
          ))}
        </Glass>
      </Appear>
      <Appear at={t(139)} style={{ position: "absolute", left: 1260, top: 340 }}>
        <Card w={520} h={380}>
          <IconTile icon={Gift} tint={PINK} size={130} />
          <Say from={139} to={144} hi={[143]} size={46} style={{ padding: "0 24px" }} />
        </Card>
      </Appear>
    </>
  );
};

// 12. Pick last month's customers for the new offer.
const Offer: React.FC = () => (
  <>
    <Wash tone="violet" />
    <Say from={145} to={157} hi={[147, 148, 149, 155, 156]} size={56} style={TOP} />
    <Appear at={t(147)} style={{ position: "absolute", left: 300, top: 300 }}>
      <Glass style={{ width: 900, padding: 26, display: "flex", flexDirection: "column", gap: 14 }}>
        {[0, 1, 2, 3, 4].map((i) => {
          const picked = i % 2 === 0;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, padding: "12px 18px", borderRadius: 16, background: "rgba(255,247,250,0.95)" }}>
              <IconTile icon={User} tint={[C.blue, PINK, BERRY, C.amber, C.teal][i]} size={56} />
              <Skel w={260 - i * 20} strong />
              <div style={{ marginLeft: "auto" }}>
                {picked ? (
                  <Pop at={t(151) + i * 0.12}>
                    <CheckBadge size={44} />
                  </Pop>
                ) : (
                  <div style={{ width: 44, height: 44, borderRadius: 99, border: "3px solid #F6C6DC" }} />
                )}
              </div>
            </div>
          );
        })}
      </Glass>
    </Appear>
    <Pop at={t(155)} style={{ position: "absolute", left: 1340, top: 420 }}>
      <Float amp={8}>
        <IconTile icon={Gift} tint={PINK} size={180} />
      </Float>
    </Pop>
  </>
);

// 13. Someone asks the price in the inbox? Send the catalogue link.
const LinkScene: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Appear at={t(158)} style={{ position: "absolute", left: 220, top: 200 }}>
      <Glass style={{ width: 760, padding: 26, display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, paddingBottom: 12, borderBottom: "2px solid #FBE4EF" }}>
          <IconTile icon={User} tint={C.blue} size={56} />
          <Skel w={170} strong />
        </div>
        <Bubble at={t(160)}>
          <Say from={161} to={163} size={48} align="left" />
        </Bubble>
        <Bubble at={t(165)} me>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link2 size={36} color="#E11D74" strokeWidth={2.5} />
            <img src={LOGO} style={{ width: 46, height: 43 }} />
            <div style={{ width: 170, height: 14, borderRadius: 9, background: "#F472B6" }} />
          </div>
        </Bubble>
        <Appear at={t(170)} style={{ alignSelf: "flex-end" }}>
          <CheckCheck size={36} color="#E11D74" strokeWidth={2.4} />
        </Appear>
      </Glass>
    </Appear>
    <div style={{ position: "absolute", left: 1060, top: 260, width: 740, display: "flex", flexDirection: "column", gap: 34 }}>
      <Say from={158} to={163} hi={[161, 162]} size={58} align="left" />
      <Say from={164} to={170} hi={[165, 166, 167, 168]} size={58} align="left" />
    </div>
  </>
);

// 14. Five minutes, all done. Phone down, sleep in peace.
const Sleep: React.FC = () => (
  <>
    <Wash tone="violet" />
    <Appear at={t(171)} style={{ position: "absolute", left: 260, top: 240 }}>
      <Card w={520} h={460}>
        <IconTile icon={Clock} tint={PINK} size={150} />
        <Say from={171} to={175} hi={[171, 172]} size={56} />
        <Pop at={t(175)}>
          <CheckBadge size={70} />
        </Pop>
      </Card>
    </Appear>
    <Appear at={t(176)} style={{ position: "absolute", left: 960, top: 240 }}>
      <Card w={660} h={460}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Float amp={10}>
            <IconTile icon={Moon} tint={NIGHT} size={140} />
          </Float>
          <IconTile icon={Smile} tint={PINK} size={110} />
        </div>
        <Say from={176} to={180} hi={[178, 179]} size={56} />
      </Card>
    </Appear>
  </>
);

// 15. The difference isn't the cake, it's the method.
const Diff: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Say from={181} to={184} hi={[181, 184]} size={80} style={{ position: "absolute", left: 120, right: 120, top: 120 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 290, display: "flex", justifyContent: "center", gap: 60 }}>
      <Appear at={t(185)}>
        <Photo src={CAKES.lilac} w={360} h={300} />
      </Appear>
      <Appear at={t(190)}>
        <Photo src={CAKES.lilac} w={360} h={300} />
      </Appear>
    </div>
    <Say from={185} to={191} hi={[188, 191]} size={52} style={{ position: "absolute", left: 120, right: 120, top: 680 }} />
    <Sub from={192} to={196} hi={[194, 195, 196]} top={800} size={56} />
  </>
);

// 16. From notebook and Messenger chaos to a tidy, professional cake brand.
const Brand: React.FC = () => {
  const go = useProgress(t(201), t(203));
  return (
    <>
      <Wash tone="pink" />
      <div style={{ position: "absolute", left: 200, top: 300, display: "flex", flexDirection: "column", gap: 30, opacity: 1 - 0.6 * go, transform: `translateX(${-60 * go}px)` }}>
        <Appear at={t(197)}>
          <Strike at={t(202)}>
            <IconTile icon={BookOpen} tint={C.amber} size={130} />
          </Strike>
        </Appear>
        <Appear at={t(199)}>
          <Strike at={t(202)}>
            <IconTile icon={MessageCircle} tint={C.blue} size={130} />
          </Strike>
        </Appear>
      </div>
      <div style={{ position: "absolute", left: 480, top: 470, fontSize: 100, color: "#F472B6", fontWeight: 800 }}>→</div>
      <Appear at={t(203)} style={{ position: "absolute", left: 700, top: 230 }}>
        <div style={{ position: "relative", borderRadius: 36 }}>
          <MishtioCard w={360} />
          <Sweep from={t(205)} to={t(205) + 1} />
        </div>
      </Appear>
      <Say from={197} to={208} hi={[204, 205, 206, 207]} size={58} align="left" style={{ position: "absolute", left: 1160, top: 300, width: 660 }} />
    </>
  );
};

// 17. Which night do you want? Want the second: comment "Mishtio" or inbox the page.
const Choice: React.FC = () => (
  <>
    <Wash tone="violet" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 150, display: "flex", justifyContent: "center", gap: 60 }}>
      <Appear at={t(209)}>
        <Card w={420} h={300} style={{ opacity: 0.7 }}>
          <IconTile icon={Frown} tint={NIGHT} size={110} />
          <IconTile icon={BookOpen} tint={C.amber} size={70} />
        </Card>
      </Appear>
      <Appear at={t(213)}>
        <Card w={420} h={300} active={1}>
          <IconTile icon={Smile} tint={PINK} size={110} />
          <img src={LOGO} style={{ width: 80, height: 76 }} />
        </Card>
      </Appear>
    </div>
    <Say from={209} to={212} hi={[211]} size={72} style={{ position: "absolute", left: 120, right: 120, top: 510 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 680, display: "flex", justifyContent: "center", gap: 30 }}>
      <Appear at={t(213)}>
        <Glass style={{ padding: "18px 34px", borderRadius: 999, display: "flex", alignItems: "center", gap: 16 }}>
          <MessageCircle size={42} color="#E11D74" strokeWidth={2.4} />
          <Say from={213} to={220} hi={[213, 214, 219]} size={44} />
        </Glass>
      </Appear>
      <Appear at={t(221)}>
        <Glass style={{ padding: "18px 34px", borderRadius: 999, display: "flex", alignItems: "center", gap: 16 }}>
          <Inbox size={42} color="#A21CAF" strokeWidth={2.4} />
          <Say from={221} to={224} hi={[223]} size={44} />
        </Glass>
      </Appear>
    </div>
  </>
);

// 18. Mishtio. Baking is your job; keeping it organised is ours.
const Cta: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Appear at={t(225)} rise={60} style={{ position: "absolute", left: 960 - 200, top: 90 }}>
      <div style={{ position: "relative", borderRadius: 36 }}>
        <MishtioCard w={360} />
        <Sweep from={t(225) + 0.2} to={t(225) + 1.2} />
      </div>
    </Appear>
    <Appear at={t(226)} style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", justifyContent: "center" }}>
      <PinkBox>
        <Say from={226} to={232} size={64} style={{ filter: "brightness(0) invert(1)" }} />
        <Sweep from={t(231)} to={t(231) + 1} />
      </PinkBox>
    </Appear>
    {[CAKES.drip, CAKES.straw, CAKES.forest, CAKES.lilac].map((c, i) => (
      <Pop key={c} at={t(229) + i * 0.1} style={{ position: "absolute", left: [180, 480, 1260, 1560][i], top: 760 }}>
        <img src={cake(c)} style={{ width: 180, height: 180, objectFit: "cover", borderRadius: 22, boxShadow: "0 12px 26px rgba(131,24,67,0.16)" }} />
      </Pop>
    ))}
  </>
);

// ---------- assembly ----------

const SCENES: Record<SceneKey, React.FC> = {
  n1: N1,
  n1a: N1a,
  n1b: N1b,
  n1c: N1c,
  alone: Alone,
  other: Other,
  n2: N2,
  list: List,
  tap: Tap,
  profit: Profit,
  best: Best,
  offer: Offer,
  link: LinkScene,
  sleep: Sleep,
  diff: Diff,
  brand: Brand,
  choice: Choice,
  cta: Cta,
};
const ORDER = Object.keys(SCENE_START) as SceneKey[];
const PRE = 0.4;
export const TOTAL_SECONDS_20 = audioDuration + tail;
const NO_CORNER = new Set<SceneKey>(["n1", "n1a", "n1b", "n1c", "brand", "cta"]);

const cues: Cue[] = [
  ...Object.values(SCENE_START).slice(1).map((i): Cue => [W[i] - 0.45, "whoosh"]),
  ...[11, 13, 34, 37, 89, 97, 99, 100, 101, 109, 112, 113, 122, 124, 139, 151, 165].map((i): Cue => [W[i], "pop"]),
  ...[86, 96, 116, 131, 136, 170, 175, 208, 232].map((i): Cue => [W[i], "ding"]),
  [W[36], "stamp"],
  [W[42], "stamp"],
  [W[57], "stamp"],
];

export const Video20: React.FC = () => {
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
            const to = i === ORDER.length - 1 ? TOTAL_SECONDS_20 + 1 : W[SCENE_START[ORDER[i + 1]]] - PRE + overlap;
            return (
              <Scene key={key} from={Math.max(0, start - PRE)} to={to}>
                <Comp />
                {NO_CORNER.has(key) ? null : <Corner at={start - 0.3} />}
              </Scene>
            );
          })}
        </div>
        <Audio src={staticFile("voiceover-mishtio-night.mp3")} />
        <SfxTrack cues={cues} />
      </AbsoluteFill>
    </PaletteProvider>
  );
};

