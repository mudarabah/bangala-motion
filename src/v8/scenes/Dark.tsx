// All 14 scenes of the "five dark sides of online business" video, in voice order.
// Dark-side scenes sit under a cool grey veil (never a dark background); each answer
// ("মোকাবিলা") comes back in the bright green glass.
import React from "react";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Clock,
  Globe,
  Headset,
  Lock,
  Megaphone,
  MessageCircle,
  Package,
  PhoneCall,
  PhoneMissed,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
  Target,
  ThumbsUp,
  TrendingDown,
  TriangleAlert,
  Truck,
  UserCheck,
  Users,
  Video,
  Warehouse,
  Zap,
  ChartColumn,
} from "lucide-react";
import { Easing, Img, interpolate, staticFile } from "remotion";
import { Appear, CheckBadge, Float, Glass, GradPill, Headline, IconTile, LogoCard, Pill, Pop, usePalette, useProgress, useTime, Word } from "../../components/kit";
import { fonts, greenIconTints as T } from "../../theme";
import { En, Skel } from "../../v2/ui";
import { Girl } from "../../v3/Girl";
import { Coin, Sweep, useTravel } from "../../v4/parts";
import { MixLine, Row } from "../../v5/parts";
import type { Timeline8 } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
type P<K extends keyof Timeline8> = React.FC<{ t: Timeline8[K] }>;
const WHITE = { color: "white", filter: "none" } as const;
const SLATE: [string, string] = ["#CBD5E1", "#64748B"];
const ROSE = "#E11D48";
const DIGITS = ["১", "২", "৩", "৪", "৫"];

// ---------- shared ----------

// A line of spoken words in one colour (Headline's words carry their own ink colour).
const Tinted: React.FC<{ words: [string, number][]; size: number; color: string; align?: "left" | "center"; style?: React.CSSProperties }> = ({ words, size, color, align = "left", style }) => (
  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: align === "center" ? "center" : "flex-start", columnGap: size * 0.26, fontFamily: fonts.display, fontWeight: 800, fontSize: size, lineHeight: 1.15, ...style }}>
    {words.map(([w, at], i) => (
      <Word key={i} text={w} at={at} style={{ color }} />
    ))}
  </div>
);

// Cool grey veil over the light background for the "dark side" scenes.
const Veil: React.FC<{ k?: number }> = ({ k = 1 }) => (
  <div style={{ position: "absolute", inset: -40, background: "linear-gradient(180deg, rgba(100,116,139,0.20), rgba(51,65,85,0.16))", opacity: k }} />
);

const Badge: React.FC<{ at: number; dark?: boolean; children: React.ReactNode }> = ({ at, dark, children }) => {
  const pal = usePalette();
  return (
    <Pop at={at}>
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 999,
          background: dark ? "linear-gradient(160deg, #94A3B8, #334155)" : pal.button,
          boxShadow: dark ? "0 16px 36px rgba(51,65,85,0.35)" : `0 16px 36px rgba(${pal.brandRgb},0.35)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: fonts.display,
          fontWeight: 800,
          fontSize: 72,
          color: "white",
          paddingTop: 6,
        }}
      >
        {children}
      </div>
    </Pop>
  );
};

// "কালো দিক N" header: slate badge, small label, title.
const DarkHead: React.FC<{ n: number; at: number; children: React.ReactNode }> = ({ n, at, children }) => (
  <div style={{ position: "absolute", left: 140, top: 130, display: "flex", alignItems: "center", gap: 34 }}>
    <Badge at={at} dark>
      {DIGITS[n - 1]}
    </Badge>
    <div>
      <Appear at={at} rise={10}>
        <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 34, color: "#475569", letterSpacing: 1 }}>কালো দিক {DIGITS[n - 1]}</div>
      </Appear>
      {children}
    </div>
  </div>
);

// "মোকাবিলা" header: green badge with a shield, small label, title.
const FixHead: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => (
  <div style={{ position: "absolute", left: 140, top: 130, display: "flex", alignItems: "center", gap: 34 }}>
    <Badge at={at}>
      <ShieldCheck size={64} color="white" strokeWidth={2.4} />
    </Badge>
    <div>
      <Appear at={at} rise={10}>
        <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 34, color: "#16A34A", letterSpacing: 1 }}>মোকাবিলা</div>
      </Appear>
      {children}
    </div>
  </div>
);

const RIGHT: React.CSSProperties = { position: "absolute", left: 960, top: 400, display: "flex", flexDirection: "column", gap: 24 };

// Grey cardboard box (dusty when idle).
const Box: React.FC<{ size?: number; dusty?: number; style?: React.CSSProperties }> = ({ size = 120, dusty = 0, style }) => (
  <div
    style={{
      width: size,
      height: size * 0.82,
      borderRadius: 14,
      background: `linear-gradient(160deg, #FCD9A8, #D9A066)`,
      boxShadow: "0 10px 20px rgba(120,72,20,0.18), inset 0 2px 0 rgba(255,255,255,0.4)",
      position: "relative",
      filter: `saturate(${1 - 0.7 * dusty}) brightness(${1 - 0.08 * dusty})`,
      ...style,
    }}
  >
    <div style={{ position: "absolute", left: "44%", top: 0, width: "12%", height: "100%", background: "rgba(255,255,255,0.35)" }} />
    <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: `radial-gradient(circle at 30% 20%, rgba(203,213,225,${0.7 * dusty}), rgba(203,213,225,0) 60%)` }} />
  </div>
);

// ---------- 1. hook: the glossy promise cracks ----------

export const HookScene: P<"hook"> = ({ t }) => {
  const crack = useProgress(t.kintu, t.kintu + 0.5);
  const dim = useProgress(t.kintu, t.ondhokar + 0.5);
  return (
    <>
      <Veil k={dim} />
      <MixLine
        style={{ position: "absolute", top: 90, left: 0, right: 0 }}
        size={72}
        words={[["সবাই", t.start], ["বলে", t.bole], ["Online", t.online, false, true], ["Business", t.business, false, true], ["মানেই", t.manei], ["সহজ", t.sohoj, true], ["আয়", t.ay]]}
      />
      <Appear at={t.start} style={{ position: "absolute", left: 960 - 420, top: 250 }}>
        <div style={{ position: "relative", filter: `grayscale(${dim}) brightness(${1 - 0.15 * dim})`, transform: `rotate(${-2 * crack}deg)` }}>
          <div
            style={{
              width: 840,
              height: 420,
              borderRadius: 40,
              background: "linear-gradient(135deg, #FDE68A, #F59E0B 55%, #EA580C)",
              boxShadow: "0 30px 70px rgba(234,88,12,0.35)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Sparkles size={80} color="white" strokeWidth={2} style={{ position: "absolute", left: 50, top: 40 }} />
            <Sparkles size={60} color="white" strokeWidth={2} style={{ position: "absolute", right: 60, bottom: 40 }} />
            <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 78, whiteSpace: "nowrap", color: "white", textShadow: "0 6px 20px rgba(154,52,18,0.45)" }}>ঘরে বসে লাখ টাকা আয়!</div>
            <div style={{ display: "flex", gap: 18 }}>
              {[0, 1, 2, 3].map((i) => (
                <Coin key={i} size={70} />
              ))}
            </div>
          </div>
          <svg style={{ position: "absolute", left: 0, top: 0 }} width={840} height={420}>
            <path
              d="M430 0 L400 110 L460 170 L380 260 L440 330 L410 420 M400 110 L300 140 M460 170 L600 150 M380 260 L250 300 M440 330 L560 360"
              pathLength={1}
              fill="none"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={1}
              strokeDashoffset={1 - crack}
            />
          </svg>
        </div>
      </Appear>
      <Headline style={{ position: "absolute", top: 730, left: 0, right: 0 }} size={64} words={[["কিন্তু", t.kintu], ["কেউ", t.keu], ["বলে", t.bole2], ["না", t.na]]} />
      <div style={{ position: "absolute", top: 820, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "baseline", gap: 26 }}>
        <Word text="এর" at={t.er} style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 96 }} />
        <Word text="অন্ধকার" at={t.ondhokar} style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 116, color: "#334155" }} />
        <Word text="দিকের" at={t.diker} style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 96 }} />
        <Word text="কথা" at={t.kotha} style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 96 }} />
      </div>
    </>
  );
};

// ---------- 2. intro: five dark sides, and how ours face them ----------

export const IntroScene: P<"intro"> = ({ t }) => (
  <>
    <Veil k={0.6} />
    <Appear at={t.start} style={{ position: "absolute", top: 150, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 100, color: "#1E293B" }}>অনলাইন বিজনেসের ৫টা কালো দিক</div>
    </Appear>
    <div style={{ position: "absolute", top: 340, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 30 }}>
      {DIGITS.map((d, i) => (
        <Badge key={i} at={t.sei + i * 0.12} dark>
          {d}
        </Badge>
      ))}
    </div>
    <Appear at={t.amader} style={{ position: "absolute", top: 600, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Glass style={{ padding: "30px 50px", borderRadius: 999, display: "flex", alignItems: "center", gap: 26 }}>
        <IconTile icon={ShieldCheck} tint={T.green} size={90} />
        <Headline
          size={60}
          words={[["আমাদের", t.amader], ["উদ্যোক্তারা", t.uddokta, true], ["কীভাবে", t.kivabe], ["এগুলো", t.egulo], ["মোকাবিলা", t.mokabila, true], ["করেন", t.koren]]}
        />
      </Glass>
    </Appear>
  </>
);

// ---------- 3. dark side 1: capital stuck in stock ----------

export const D1Scene: P<"d1"> = ({ t }) => {
  const dust = useProgress(t.jome, t.bhetor + 0.6);
  return (
    <>
      <Veil />
      <DarkHead n={1} at={t.start}>
        <Headline align="left" size={88} words={[["পুঁজি", t.puji], ["আটকে", t.atke, true], ["যাওয়া", t.jaoa]]} />
      </DarkHead>
      <Appear at={t.start} style={{ position: "absolute", left: 140, top: 380 }}>
        <Girl pose="stressed" width={380} style={{ filter: "saturate(0.6)" }} />
      </Appear>
      <Appear at={t.stock} style={{ position: "absolute", left: 560, top: 400 }}>
        <Glass style={{ position: "relative", width: 380, height: 520, padding: 30, display: "flex", flexWrap: "wrap", alignContent: "flex-end", gap: 14, background: "rgba(241,245,249,0.85)" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Box key={i} size={150} dusty={dust} />
          ))}
          <Pop at={t.taka} style={{ position: "absolute", right: -30, top: -30 }}>
            <div style={{ position: "relative" }}>
              <Coin size={110} style={{ filter: "grayscale(0.4)" }} />
              <div style={{ position: "absolute", right: -18, bottom: -10, width: 64, height: 64, borderRadius: 99, background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(51,65,85,0.25)" }}>
                <Lock size={36} color="#334155" strokeWidth={2.6} />
              </div>
            </div>
          </Pop>
        </Glass>
      </Appear>
      <div style={{ ...RIGHT, left: 1020, top: 430 }}>
        <MixLine align="left" size={60} words={[["Stock", t.stock, false, true], ["কিনলেন", t.kinlen]]} />
        <Tinted size={60} color={ROSE} words={[["বিক্রি", t.bikri], ["হলো", t.holo], ["না", t.na]]} />
        <Headline align="left" size={60} words={[["টাকা", t.taka], ["আটকে", t.atke2], ["গেল", t.gelo]]} />
        <Headline align="left" size={48} style={{ opacity: 0.8 }} words={[["জমে", t.jome], ["থাকা", t.thaka], ["মালের", t.maler], ["ভেতর", t.bhetor]]} />
      </div>
    </>
  );
};

// ---------- 4. answer 1: no stock to buy; the company carries unsold goods ----------

export const S1Scene: P<"s1"> = ({ t }) => {
  const fly = useTravel(t.obikrito - 0.2, t.ney + 0.4);
  return (
    <>
      <FixHead at={t.start}>
        <MixLine align="left" size={80} words={[["Stock", t.stock, false, true], ["কিনতে", t.kinte], ["হয়", t.hoy], ["না", t.na, true]]} />
      </FixHead>
      <Appear at={t.start} style={{ position: "absolute", left: 200, top: 430 }}>
        <Glass style={{ width: 300, height: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <IconTile icon={Store} tint={T.green} size={120} />
          <Headline size={44} words={[["উদ্যোক্তা", t.uddokta]]} />
        </Glass>
      </Appear>
      <Appear at={t.company} style={{ position: "absolute", left: 1380, top: 400 }}>
        <Glass active={useProgress(t.ney - 0.1, t.ney + 0.3)} style={{ width: 360, height: 360, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <IconTile icon={Warehouse} tint={T.teal} size={140} />
          <MixLine size={46} words={[["Company", t.company, false, true]]} />
        </Glass>
        <Pop at={t.ney} style={{ position: "absolute", right: -24, top: -24 }}>
          <CheckBadge size={80} />
        </Pop>
      </Appear>
      {[0, 1, 2].map((k) => {
        const u = interpolate(fly, [k * 0.12, 0.64 + k * 0.12], [0, 1], { ...clamp, easing: Easing.bezier(0.45, 0, 0.25, 1) });
        const x = 520 + (1380 - 520) * u;
        const y = 560 - Math.sin(u * Math.PI) * 180 + k * 30;
        return u > 0 && u < 1 ? <Box key={k} size={110} style={{ position: "absolute", left: x, top: y }} /> : null;
      })}
      <div style={{ position: "absolute", left: 0, right: 0, top: 820 }}>
        <Headline size={60} words={[["অবিক্রিত", t.obikrito], ["মালের", t.maler], ["ঝুঁকি", t.jhuki, true]]} />
        <MixLine size={60} words={[["Company", t.company, false, true], ["নেয়", t.ney, true]]} />
      </div>
    </>
  );
};

// ---------- 5. dark side 2: fake orders and returns ----------

export const D2Scene: P<"d2"> = ({ t }) => {
  const { frame, f } = useTime();
  const ring = Math.max(0, frame - f(t.phone));
  const shake = ring > 0 && ring < 30 ? Math.sin(ring * 1.6) * 6 * (1 - ring / 30) : 0;
  const stamp = useProgress(t.parcel - 0.1, t.parcel + 0.2, Easing.out(Easing.back(1.6)));
  return (
    <>
      <Veil />
      <DarkHead n={2} at={t.start}>
        <MixLine align="left" size={80} words={[["Fake", t.fake, false, true], ["Order", t.order, false, true], ["আর", t.ar], ["Return", t.ret, true, true]]} />
      </DarkHead>
      <Appear at={t.customer} style={{ position: "absolute", left: 200, top: 400 }}>
        <Glass style={{ width: 300, height: 300, display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(${shake}deg)` }}>
          <PhoneMissed size={150} color={ROSE} strokeWidth={1.8} />
        </Glass>
      </Appear>
      <Appear at={t.parcel} style={{ position: "absolute", left: 560, top: 450 }}>
        <div style={{ position: "relative", width: 380, height: 420 }}>
          {[[0, 220], [140, 220], [70, 100]].map(([x, y], i) => (
            <Box key={i} size={170} dusty={0.5} style={{ position: "absolute", left: x, top: y }} />
          ))}
          <div
            style={{
              position: "absolute",
              left: 40,
              top: 170,
              padding: "10px 28px",
              border: `7px solid ${ROSE}`,
              borderRadius: 14,
              fontFamily: fonts.ui,
              fontWeight: 800,
              fontSize: 64,
              color: ROSE,
              letterSpacing: 4,
              opacity: Math.min(1, stamp * 2),
              transform: `rotate(-14deg) scale(${1.6 - 0.6 * stamp})`,
              background: "rgba(255,255,255,0.75)",
            }}
          >
            RETURN
          </div>
        </div>
      </Appear>
      <div style={{ ...RIGHT, left: 1020, top: 420 }}>
        <MixLine align="left" size={56} words={[["Customer", t.customer, false, true], ["Order", t.order2, false, true], ["দিয়ে", t.diye]]} />
        <MixLine align="left" size={56} words={[["আর", t.ar2], ["Phone", t.phone, false, true], ["ধরেন", t.dhoren], ["না", t.na]]} />
        <MixLine align="left" size={56} words={[["Parcel", t.parcel, false, true], ["ফেরত", t.ferot], ["আসে", t.ase]]} />
        <Tinted size={56} color={ROSE} words={[["সাথে", t.sathe], ["আসে", t.ase2], ["বাড়তি", t.barti], ["খরচ", t.khoroch]]} />
      </div>
    </>
  );
};

// ---------- 6. answer 2: honest; we teach order confirmation ----------

export const S2Scene: P<"s2"> = ({ t }) => (
  <>
    <Appear at={t.start} style={{ position: "absolute", left: 0, right: 0, top: 110, display: "flex", justifyContent: "center" }}>
      <Glass style={{ padding: "22px 40px", borderRadius: 999, display: "flex", alignItems: "center", gap: 20, background: "rgba(255,251,235,0.95)" }}>
        <TriangleAlert size={48} color="#F59E0B" strokeWidth={2.4} />
        <Headline
          size={50}
          words={[["এই", t.start], ["ঝুঁকি", t.jhuki], ["পুরোপুরি", t.puropuri], ["শেষ", t.shesh], ["করা", t.kora], ["যায়", t.jay], ["না", t.na], ["এটা", t.eta], ["সত্যি", t.sotti]]}
        />
      </Glass>
    </Appear>
    <div style={{ position: "absolute", left: 140, top: 290, display: "flex", alignItems: "center", gap: 34 }}>
      <Badge at={t.tai}>
        <ShieldCheck size={64} color="white" strokeWidth={2.4} />
      </Badge>
      <div>
        <Appear at={t.tai} rise={10}>
          <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 34, color: "#16A34A" }}>মোকাবিলা</div>
        </Appear>
        <Headline align="left" size={80} words={[["তাই", t.tai], ["আমরা", t.amra], ["শেখাই", t.shekhai, true]]} />
      </div>
    </div>
    <Appear at={t.shekhai} style={{ position: "absolute", left: 160, top: 500 }}>
      <Glass style={{ width: 640, height: 440, padding: 20 }}>
        <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 22, background: "linear-gradient(135deg, #DCFCE7, #A7F3D0)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 130, height: 130, borderRadius: 99, background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 30px rgba(20,83,45,0.2)" }}>
            <Video size={64} color="#16A34A" strokeWidth={2.2} />
          </div>
          <div style={{ position: "absolute", left: 24, bottom: 24 }}>
            <IconTile icon={Headset} tint={T.teal} size={90} />
          </div>
        </div>
      </Glass>
    </Appear>
    <div style={{ ...RIGHT, left: 900, top: 520 }}>
      <Appear at={t.order}>
        <Row width={880}>
          <IconTile icon={PhoneCall} tint={T.green} size={88} />
          <MixLine align="left" size={54} words={[["Order", t.order, false, true], ["Confirm", t.confirm, true, true], ["করতে", t.korte], ["হয়", t.hoy]]} />
        </Row>
      </Appear>
      <Appear at={t.customer}>
        <Row width={880}>
          <IconTile icon={UserCheck} tint={T.sky} size={88} />
          <MixLine align="left" size={54} words={[["Customer|-কে", t.customer, false, true], ["চিনতে", t.chinte, true], ["হয়", t.hoy2]]} />
        </Row>
      </Appear>
      <Appear at={t.ret}>
        <Row width={880}>
          <IconTile icon={TrendingDown} tint={T.teal} size={88} />
          <MixLine align="left" size={54} words={[["Return", t.ret, false, true], ["কমে", t.kome, true]]} />
        </Row>
      </Appear>
    </div>
  </>
);

// ---------- 7. dark side 3: money wasted on ads ----------

export const D3Scene: P<"d3"> = ({ t }) => {
  const { frame, f } = useTime();
  const spend = useProgress(t.boost, t.na + 0.6);
  const likes = Math.max(0, frame - f(t.like));
  return (
    <>
      <Veil />
      <DarkHead n={3} at={t.start}>
        <MixLine align="left" size={88} words={[["Ad|-এ", t.ad, false, true], ["টাকা", t.taka], ["নষ্ট", t.noshto, true]]} />
      </DarkHead>
      <Appear at={t.boost} style={{ position: "absolute", left: 160, top: 400 }}>
        <Glass style={{ width: 720, padding: "34px 40px", display: "flex", flexDirection: "column", gap: 26, background: "rgba(241,245,249,0.9)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <IconTile icon={Megaphone} tint={SLATE} size={80} />
            <Skel w={240} strong />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Coin size={60} style={{ filter: "grayscale(0.3)" }} />
            <div style={{ flex: 1, height: 26, borderRadius: 13, background: "#E2E8F0", overflow: "hidden" }}>
              <div style={{ width: `${spend * 100}%`, height: "100%", background: "linear-gradient(90deg, #F59E0B, #E11D48)" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ flex: 1, padding: 22, borderRadius: 20, background: "white", display: "flex", alignItems: "center", gap: 16 }}>
              <ThumbsUp size={54} color="#0284C7" strokeWidth={2.2} />
              <div style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 52, color: "#0F172A" }}>{likes > 0 ? Math.min(999, Math.round(likes * 9)) : 0}</div>
            </div>
            <div style={{ flex: 1, padding: 22, borderRadius: 20, background: "white", display: "flex", alignItems: "center", gap: 16, boxShadow: `0 0 0 ${4 * useProgress(t.order, t.order + 0.3)}px rgba(225,29,72,0.6)` }}>
              <ShoppingCart size={54} color={ROSE} strokeWidth={2.2} />
              <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 56, color: ROSE }}>০</div>
            </div>
          </div>
        </Glass>
      </Appear>
      <div style={{ ...RIGHT, left: 1000, top: 440 }}>
        <MixLine align="left" size={60} words={[["Boost", t.boost, false, true], ["করলেন", t.korlen]]} />
        <MixLine align="left" size={60} words={[["Like", t.like, false, true], ["এল", t.elo]]} />
        <MixLine align="left" size={60} words={[["কিন্তু", t.kintu], ["Order", t.order, false, true], ["এল", t.elo2]]} />
        <Tinted size={60} color={ROSE} words={[["না", t.na]]} />
      </div>
    </>
  );
};

// ---------- 8. answer 3: pixel, catalog, server-side tracking, ad training ----------

export const S3Scene: P<"s3"> = ({ t }) => {
  const { frame, f } = useTime();
  const orders = Math.max(0, frame - f(t.sothik));
  return (
    <>
      <FixHead at={t.start}>
        <MixLine align="left" size={76} words={[["উদ্যোক্তাদের", t.uddokta], ["Website|-এ", t.website, false, true], ["আছে", t.ache]]} />
      </FixHead>
      <div style={{ position: "absolute", left: 160, top: 400, display: "flex", flexDirection: "column", gap: 22 }}>
        {[
          { at: t.pixel, icon: Target, tint: T.rose, words: [["Pixel", t.pixel, false, true]] },
          { at: t.facebook, icon: ShoppingCart, tint: T.sky, words: [["Facebook", t.facebook, false, true], ["Catalog", t.catalog, false, true]] },
          { at: t.server, icon: ChartColumn, tint: T.teal, words: [["Server", t.server, false, true], ["Side", t.side, false, true], ["Tracking", t.tracking, false, true]] },
          { at: t.ad, icon: BookOpen, tint: T.orange, words: [["Ad", t.ad, false, true], ["চালানোর", t.chalanor], ["Training", t.training, true, true]] },
        ].map((r, i) => (
          <Appear key={i} at={r.at}>
            <Row width={760}>
              <IconTile icon={r.icon} tint={r.tint} size={80} />
              <MixLine align="left" size={50} words={r.words as [string, number, boolean, boolean][]} />
              <Pop at={r.at + 0.3} style={{ marginLeft: "auto" }}>
                <CheckBadge size={54} />
              </Pop>
            </Row>
          </Appear>
        ))}
      </div>
      <Appear at={t.tai} style={{ position: "absolute", left: 1060, top: 400 }}>
        <div style={{ position: "relative", width: 620, height: 360 }}>
          {[0, 1, 2].map((k) => {
            const s = orders - k * 12;
            const p = interpolate(s, [0, 14], [0, 1], clamp);
            return (
              <div key={k} style={{ position: "absolute", left: 40 + k * 30, top: 220 - k * 100, opacity: p, transform: `translateY(${(1 - p) * 30}px)` }}>
                <Glass style={{ padding: "18px 26px", borderRadius: 24, display: "flex", alignItems: "center", gap: 18 }}>
                  <IconTile icon={Bell} tint={T.green} size={64} />
                  <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 40 }}>নতুন অর্ডার!</div>
                </Glass>
              </div>
            );
          })}
        </div>
      </Appear>
      <div style={{ position: "absolute", left: 960, width: 860, top: 800 }}>
        <MixLine size={56} words={[["প্রতিটা", t.protita], ["টাকা", t.taka], ["যায়", t.jay], ["সঠিক", t.sothik, true], ["Customer|-এর", t.customer, false, true], ["কাছে", t.kachhe]]} />
      </div>
    </>
  );
};

// ---------- 9. dark side 4: handling everything alone ----------

export const D4Scene: P<"d4"> = ({ t }) => {
  const { frame } = useTime();
  const tasks = [
    { at: t.message, icon: MessageCircle, words: [["Message|-এর", t.message, false, true], ["উত্তর", t.uttor]] },
    { at: t.packing, icon: Package, words: [["Packing", t.packing, false, true]] },
    { at: t.courier, icon: Truck, words: [["Courier", t.courier, false, true], ["Entry", t.entry, false, true]] },
  ];
  return (
    <>
      <Veil />
      <DarkHead n={4} at={t.start}>
        <Headline align="left" size={88} words={[["একা", t.eka, true], ["সব", t.sob], ["সামলানো", t.samlano]]} />
      </DarkHead>
      <Appear at={t.start} style={{ position: "absolute", left: 1500, top: 120 }}>
        <Glass style={{ padding: "16px 30px", borderRadius: 999, display: "flex", alignItems: "center", gap: 14 }}>
          <Clock size={44} color="#334155" strokeWidth={2.4} />
          <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 44, color: "#334155" }}>রাত ২টা</div>
        </Glass>
      </Appear>
      <Appear at={t.start} style={{ position: "absolute", left: 220, top: 400 }}>
        <Girl pose="stressed" width={400} style={{ filter: "saturate(0.6)" }} />
      </Appear>
      <div style={{ position: "absolute", left: 760, top: 400, display: "flex", flexDirection: "column", gap: 22 }}>
        {tasks.map((k, i) => (
          <Appear key={i} at={k.at}>
            <div style={{ transform: `translateX(${Math.sin(frame / 9 + i * 2) * 6}px)` }}>
              <Row width={620}>
                <IconTile icon={k.icon} tint={SLATE} size={80} />
                <MixLine align="left" size={52} words={k.words as [string, number, boolean, boolean][]} />
              </Row>
            </div>
          </Appear>
        ))}
      </div>
      <div style={{ position: "absolute", left: 760, right: 80, top: 870 }}>
        <Tinted size={56} color="#334155" words={[["দিনশেষে", t.dinshese], ["ব্যবসা", t.byabsa], ["না", t.na], ["শুধু", t.shudhu], ["ক্লান্তি", t.klanti]]} />
      </div>
    </>
  );
};

// ---------- 10. answer 4: we pack and deliver; courier entry is automatic; moderators ----------

export const S4Scene: P<"s4"> = ({ t }) => (
  <>
    <FixHead at={t.start}>
      <MixLine align="left" size={72} words={[["Packaging", t.start, false, true], ["আর", t.ar], ["Delivery", t.delivery, false, true], ["আমরা", t.amra, true], ["করি", t.kori]]} />
    </FixHead>
    <Appear at={t.start} style={{ position: "absolute", left: 220, top: 400 }}>
      <Girl pose="relaxed" width={400} />
    </Appear>
    <div style={{ ...RIGHT, left: 760, top: 420 }}>
      <Appear at={t.courier}>
        <Row width={920}>
          <IconTile icon={Zap} tint={T.orange} size={88} />
          <MixLine align="left" size={54} words={[["Courier", t.courier, false, true], ["Entry", t.entry, false, true], ["Automatic", t.automatic, true, true]]} />
          <Pop at={t.automatic} style={{ marginLeft: "auto" }}>
            <CheckBadge size={60} />
          </Pop>
        </Row>
      </Appear>
      <Appear at={t.dorkar}>
        <Row width={920}>
          <IconTile icon={Users} tint={T.teal} size={88} />
          <div>
            <MixLine align="left" size={54} words={[["প্রশিক্ষিত", t.prosikkhito], ["Moderator", t.moderator, true, true]]} />
            <Headline align="left" size={40} style={{ fontWeight: 600 }} words={[["আপনার", t.apnar], ["কাজে", t.kaje], ["সাহায্য", t.sahajjo], ["করবেন", t.korben]]} />
          </div>
        </Row>
      </Appear>
    </div>
  </>
);

// ---------- 11. dark side 5: walking alone ----------

export const D5Scene: P<"d5"> = ({ t }) => {
  const down = useProgress(t.bikri, t.gelo + 0.6);
  return (
    <>
      <Veil />
      <DarkHead n={5} at={t.start}>
        <Headline align="left" size={88} words={[["একা", t.eka, true], ["পথ", t.poth], ["চলা", t.chola]]} />
      </DarkHead>
      <Appear at={t.page} style={{ position: "absolute", left: 160, top: 400 }}>
        <Glass style={{ width: 700, padding: "26px 32px", display: "flex", alignItems: "center", gap: 22, background: "rgba(255,241,242,0.95)" }}>
          <IconTile icon={TriangleAlert} tint={T.rose} size={86} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 52, color: "#9F1239" }}>পেজ রেস্ট্রিক্টেড</div>
            <Skel w={300} />
          </div>
        </Glass>
      </Appear>
      <Appear at={t.bikri} style={{ position: "absolute", left: 160, top: 600 }}>
        <Glass style={{ width: 700, height: 300, padding: 30, background: "rgba(241,245,249,0.9)" }}>
          <svg width={640} height={240} viewBox="0 0 640 240">
            <path d="M10 40 C 140 50, 220 70, 300 110 S 480 200, 630 220" pathLength={1} fill="none" stroke={ROSE} strokeWidth={9} strokeLinecap="round" strokeDasharray={1} strokeDashoffset={1 - down} opacity={0.8} />
          </svg>
        </Glass>
      </Appear>
      <div style={{ ...RIGHT, left: 960, top: 420 }}>
        <MixLine align="left" size={56} words={[["Page|-এ", t.page, false, true], ["সমস্যা", t.somossa], ["হলো", t.holo]]} />
        <Headline align="left" size={56} words={[["বিক্রি", t.bikri], ["কমে", t.kome], ["গেল", t.gelo]]} />
        <Tinted size={84} color="#334155" style={{ marginTop: 10 }} words={[["কাকে", t.kake], ["জিজ্ঞেস", t.jiggesh], ["করবেন?", t.korben]]} />
        <Headline align="left" size={50} style={{ opacity: 0.8 }} words={[["অনেকেই", t.onekei], ["এখানে", t.ekhane], ["হাল", t.hal], ["ছেড়ে", t.chhere], ["দেন", t.den]]} />
      </div>
    </>
  );
};

// ---------- 12. answer 5: own website + an experienced mentor ----------

export const S5Scene: P<"s5"> = ({ t }) => {
  const { frame } = useTime();
  const y = Math.min(frame, 240) * 0.35;
  return (
    <>
      <FixHead at={t.start}>
        <MixLine align="left" size={78} words={[["নিজের", t.nijer], ["নামে", t.name], ["Website", t.website, true, true]]} />
      </FixHead>
      <Appear at={t.nijer} style={{ position: "absolute", left: 220, top: 380 }}>
        <Glass style={{ width: 320, height: 620, padding: 12, borderRadius: 42 }}>
          <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 32, overflow: "hidden", background: "white" }}>
            <Img src={staticFile("products/site-dotlife.jpg")} style={{ position: "absolute", left: 0, top: -y, width: "100%" }} />
          </div>
        </Glass>
      </Appear>
      <Appear at={t.mentor} style={{ position: "absolute", left: 640, top: 600 }}>
        <Glass style={{ width: 420, height: 300, padding: 16 }}>
          <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 20, background: "linear-gradient(135deg, #CCFBF1, #A7F3D0)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconTile icon={Headset} tint={T.teal} size={110} />
            <div style={{ position: "absolute", left: 16, top: 16, display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 99, background: "rgba(255,255,255,0.9)" }}>
              <Video size={26} color="#16A34A" strokeWidth={2.4} />
              <div style={{ width: 12, height: 12, borderRadius: 99, background: "#22C55E" }} />
            </div>
          </div>
        </Glass>
      </Appear>
      <div style={{ ...RIGHT, left: 1140, top: 400, gap: 28 }}>
        <Appear at={t.tai}>
          <Glass style={{ padding: "22px 30px", width: 660 }}>
            <MixLine align="left" size={46} words={[["শুধু", t.shudhu], ["একটা", t.ekta], ["Facebook", t.facebook, false, true], ["Page|-এর", t.page, false, true]]} />
            <Headline align="left" size={46} words={[["উপর", t.upor], ["নির্ভর", t.nirbhor], ["করতে", t.korte], ["হয়", t.hoy], ["না", t.na, true]]} />
          </Glass>
        </Appear>
        <Appear at={t.ar}>
          <Glass style={{ padding: "22px 30px", width: 660 }}>
            <MixLine align="left" size={56} words={[["পাশে", t.pashe], ["অভিজ্ঞ", t.obhiggo], ["Mentor", t.mentor, true, true]]} />
            <Headline align="left" size={42} style={{ fontWeight: 600 }} words={[["যেকোনো", t.jekono], ["সমস্যায়", t.somossay], ["পরামর্শ", t.poramorsho]]} />
          </Glass>
        </Appear>
      </div>
    </>
  );
};

// ---------- 13. the honest truth ----------

export const TruthScene: P<"truth"> = ({ t }) => (
  <>
    <MixLine
      style={{ position: "absolute", top: 120, left: 0, right: 0 }}
      size={68}
      words={[["আমরা", t.start], ["বলি", t.boli], ["না", t.na], ["Online", t.online, false, true], ["Business", t.business, false, true], ["ঝুঁকিহীন", t.jhukihin]]}
    />
    <Appear at={t.start} style={{ position: "absolute", left: 200, top: 300 }}>
      <Float amp={5}>
        <Girl pose="phone" width={380} />
      </Float>
    </Appear>
    <div style={{ position: "absolute", left: 760, top: 320, display: "flex", gap: 24 }}>
      <Appear at={t.porishrom}>
        <Pill icon={Sparkles} size={46}>
          <Word text="পরিশ্রম" at={t.porishrom} /> <Word text="লাগে" at={t.lage} />
        </Pill>
      </Appear>
      <Appear at={t.dhoirjo}>
        <Pill icon={Clock} size={46}>
          <Word text="ধৈর্য" at={t.dhoirjo} /> <Word text="লাগে" at={t.lage2} />
        </Pill>
      </Appear>
    </div>
    <div style={{ position: "absolute", left: 760, top: 500, width: 1000 }}>
      <MixLine align="left" size={72} words={[["কিন্তু", t.kintu], ["সঠিক", t.sothik], ["Support", t.support, true, true], ["থাকলে", t.thakle]]} />
      <Headline align="left" size={72} style={{ marginTop: 10 }} words={[["পথটা", t.pothta], ["অনেক", t.onek], ["সহজ", t.sohoj, true], ["হয়ে", t.hoye], ["যায়", t.jay]]} />
    </div>
  </>
);

// ---------- 14. ending: don't fear the dark; prepare and join ----------

export const EndScene: P<"end"> = ({ t }) => (
  <>
    <Headline style={{ position: "absolute", top: 80, left: 0, right: 0 }} size={60} words={[["অন্ধকারকে", t.start], ["ভয়", t.bhoy], ["নয়", t.noy]]} />
    <Headline style={{ position: "absolute", top: 160, left: 0, right: 0 }} size={72} words={[["প্রস্তুতি", t.prostuti, true], ["নিয়ে", t.niye], ["এগিয়ে", t.egiye], ["যান", t.jan]]} />
    <Appear at={t.start} style={{ position: "absolute", left: 230, top: 320 }}>
      <Girl pose="relaxed" width={380} />
    </Appear>
    <Pop at={t.prostuti} style={{ position: "absolute", left: 560, top: 360 }}>
      <Glass style={{ padding: "16px 24px", borderRadius: 24, display: "flex", alignItems: "center", gap: 16 }}>
        <IconTile icon={Bell} tint={T.green} size={60} />
        <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 38 }}>নতুন অর্ডার!</div>
      </Glass>
    </Pop>
    <Appear at={t.aji} rise={60} style={{ position: "absolute", left: 1390 - 130, top: 320 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={260} />
        <Sweep from={t.aji + 0.2} to={t.aji + 1.2} />
      </div>
    </Appear>
    <Appear at={t.aji} style={{ position: "absolute", top: 650, left: 960, width: 860, display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", borderRadius: 999 }}>
        <GradPill size={60} icon={ArrowRight}>
          <Word text="আজই" at={t.aji} style={WHITE} /> <Word text="যোগ" at={t.jog} style={WHITE} /> <Word text="দিন" at={t.din} style={WHITE} />
        </GradPill>
        <Sweep from={t.din} to={t.din + 1} />
      </div>
    </Appear>
    <MixLine
      style={{ position: "absolute", top: 805, left: 960, width: 860 }}
      size={54}
      words={[["Mudarabah", t.mudarabah, false, true], ["Trade", t.trade, false, true], ["Limited|-এর", t.limited, false, true], ["সাথে", t.sathe]]}
    />
    <Appear at={t.sathe} style={{ position: "absolute", top: 900, left: 960, width: 860, display: "flex", justifyContent: "center" }}>
      <Pill icon={Globe} size={36}>
        <En weight={600}>uddoktajourney.com</En>
      </Pill>
    </Appear>
  </>
);

