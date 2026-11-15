// Part 1 of the Facebook ads story: Rumana learns how the ad auction works, how Ads Manager is
// built, and how to read a report and her real profit. Every line on screen is spoken words.
import React from "react";
import {
  BadgeCheck,
  Banknote,
  CalendarDays,
  Coins,
  Download,
  Eye,
  Gavel,
  Globe,
  Heart,
  Image as ImageIcon,
  Layers,
  Leaf,
  MapPin,
  Megaphone,
  MessageCircle,
  MousePointerClick,
  Package,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Store,
  Target,
  ThumbsUp,
  TrendingDown,
  TrendingUp,
  Trophy,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Easing, Img, interpolate, staticFile } from "remotion";
import { Appear, CheckBadge, Float, Glass, GradPill, IconTile, Pop, usePalette, useProgress, useTime } from "../../components/kit";
import { fonts } from "../../theme";
import { Skel, Strike } from "../../v2/ui";
import { Girl } from "../../v3/Girl";
import { Coin, HeroWord, useTravel } from "../../v4/parts";
import { Row } from "../../v5/parts";
import { makeSay } from "../sayf";
import { W, WORDS } from "../timeline1";
import { BigNum, C, NumBadge, ROSE, StatCard, Wash } from "../ui";

const { t, Say } = makeSay(W, WORDS, { 23: "জেতে?", 350: "" });
type S = React.FC;
const RIGHT: React.CSSProperties = { position: "absolute", left: 960, top: 360, display: "flex", flexDirection: "column", gap: 22 };

// The earring photo in a soft frame.
const Earrings: React.FC<{ size: number; style?: React.CSSProperties }> = ({ size, style }) => (
  <Glass style={{ width: size, height: size, padding: 10, borderRadius: 36, ...style }}>
    <Img src={staticFile("products/earrings.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 26 }} />
  </Glass>
);

// A small phone-sized ad card (photo, text lines, button).
const AdCard: React.FC<{ blurry?: boolean; wearing?: boolean; width?: number; glow?: number; children?: React.ReactNode }> = ({ blurry, wearing, width = 300, glow = 0, children }) => (
  <Glass active={glow} style={{ width, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 38, height: 38, borderRadius: 99, background: "linear-gradient(160deg, #F9A8D4, #DB2777)" }} />
      <Skel w={120} strong />
    </div>
    <div style={{ position: "relative", height: width * 0.8, borderRadius: 16, overflow: "hidden", background: "white" }}>
      {wearing ? (
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #FCE7F3, #FDF2F8)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <Girl pose="relaxed" width={width * 0.62} />
        </div>
      ) : (
        <Img src={staticFile("products/earrings-green.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", filter: blurry ? "blur(7px) saturate(0.7)" : undefined }} />
      )}
    </div>
    <Skel w={width * 0.6} />
    {children}
  </Glass>
);

// ---------- 1. every ad slot is an auction ----------

export const Auction: S = () => {
  const { frame, f } = useTime();
  const pull = useProgress(t(16), t(20) + 0.6);
  return (
    <>
      <Wash tone="violet" />
      <Say from={0} to={4} size={58} style={{ position: "absolute", top: 90, left: 0, right: 0 }} />
      <Appear at={t(0)} style={{ position: "absolute", left: 960 - 190, top: 230 }}>
        <Glass style={{ width: 380, height: 640, padding: 16, borderRadius: 50, overflow: "hidden" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, transform: `translateY(${-((frame * 2) % 300)}px)` }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ height: 130, borderRadius: 20, background: i % 3 === 1 ? "linear-gradient(135deg, #EDE9FE, #DBEAFE)" : "rgba(241,245,249,0.9)", border: i % 3 === 1 ? "3px solid #8B5CF6" : undefined }} />
            ))}
          </div>
        </Glass>
      </Appear>
      <Pop at={t(13)} style={{ position: "absolute", left: 960 + 170, top: 330 }}>
        <IconTile icon={Gavel} tint={C.violet} size={130} />
      </Pop>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const r = 620 - 300 * pull;
        const on = frame - f(t(16)) > i * 2 ? 1 : 0;
        return (
          <div key={i} style={{ position: "absolute", left: 960 + Math.cos(a) * r - 36, top: 560 + Math.sin(a) * r * 0.55 - 36, opacity: on * (1 - 0.4 * pull) }}>
            <IconTile icon={Store} tint={[C.blue, C.pink, C.amber, C.teal][i % 4]} size={72} />
          </div>
        );
      })}
      <Say from={5} to={15} hi={[13]} size={46} style={{ position: "absolute", top: 900, left: 120, right: 120 }} />
      <Appear at={t(21)} style={{ position: "absolute", left: 0, right: 0, top: 160, display: "flex", justifyContent: "center" }}>
        <Glass style={{ padding: "14px 34px", borderRadius: 999 }}>
          <Say from={16} to={23} hi={[19, 20, 23]} size={50} />
        </Glass>
      </Appear>
    </>
  );
};

// ---------- 2. meet Rumana ----------

export const Rumana: S = () => (
  <>
    <Wash tone="pink" />
    <Say from={24} to={30} hi={[29]} size={56} style={{ position: "absolute", top: 90, left: 0, right: 0 }} />
    <Appear at={t(31)} style={{ position: "absolute", left: 200, top: 260 }}>
      <Float amp={6}>
        <Girl pose="phone" width={460} />
      </Float>
    </Appear>
    <div style={{ position: "absolute", left: 760, top: 260, display: "flex", flexDirection: "column", gap: 24 }}>
      <Say from={31} to={32} hi={[32]} size={96} align="left" />
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <Appear at={t(35)}>
          <Earrings size={260} />
        </Appear>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Say from={33} to={38} hi={[35, 36]} size={50} align="left" />
          <Appear at={t(39)}>
            <Glass style={{ padding: "14px 26px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 14 }}>
              <Coin size={56} />
              <Say from={39} to={44} hi={[42, 43]} size={44} align="left" />
            </Glass>
          </Appear>
        </div>
      </div>
      <Appear at={t(45)}>
        <Row width={980} style={{ background: "rgba(253,242,248,0.95)" }}>
          <IconTile icon={Megaphone} tint={C.pink} size={76} />
          <Say from={45} to={53} hi={[52]} size={44} align="left" />
        </Row>
      </Appear>
      <Appear at={t(54)}>
        <Glass active={1} style={{ padding: "16px 30px", borderRadius: 999, display: "inline-flex" }}>
          <Say from={54} to={61} hi={[58]} size={40} />
        </Glass>
      </Appear>
    </div>
  </>
);

// ---------- 3. the myth: highest payer always wins ----------

export const Myth: S = () => (
  <>
    <Wash tone="rose" />
    <Say from={62} to={67} hi={[65]} size={66} style={{ position: "absolute", top: 120, left: 0, right: 0 }} />
    <Appear at={t(68)} style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center" }}>
      <Glass style={{ padding: "40px 60px", display: "flex", alignItems: "center", gap: 40 }}>
        <IconTile icon={Banknote} tint={C.amber} size={140} />
        <Strike at={t(83)}>
          <Say from={68} to={78} hi={[71, 72]} size={60} align="left" />
        </Strike>
      </Glass>
    </Appear>
    <Appear at={t(79)} style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center" }}>
      <Glass style={{ padding: "22px 44px", borderRadius: 999, display: "flex", alignItems: "center", gap: 18, background: "rgba(255,241,242,0.95)" }}>
        <X size={52} color={ROSE} strokeWidth={3} />
        <Say from={79} to={83} hi={[81, 82]} size={64} />
      </Glass>
    </Appear>
  </>
);

// ---------- 4. Meta's three ingredients ----------

export const Formula: S = () => {
  const items = [
    { at: t(98), icon: Banknote, tint: C.amber, a: 98, b: 106, hi: [106] },
    { at: t(107), icon: MousePointerClick, tint: C.blue, a: 107, b: 120, hi: [119] },
    { at: t(121), icon: Sparkles, tint: C.violet, a: 121, b: 136, hi: [126] },
  ];
  return (
    <>
      <Wash tone="blue" />
      <Say from={84} to={97} hi={[91, 92, 95]} size={50} style={{ position: "absolute", top: 100, left: 120, right: 120 }} />
      <div style={{ position: "absolute", left: 120, right: 120, top: 330, display: "flex", gap: 30, justifyContent: "center" }}>
        {items.map((it, i) => (
          <Appear key={i} at={it.at}>
            <Glass style={{ width: 530, height: 560, padding: "34px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
              <NumBadge at={it.at} n={["১", "২", "৩"][i]} tint={it.tint} size={90} />
              <IconTile icon={it.icon} tint={it.tint} size={110} />
              <Say from={it.a} to={it.b} hi={it.hi} size={40} />
            </Glass>
          </Appear>
        ))}
      </div>
    </>
  );
};

// ---------- 5. example: shop "ka" vs Rumana ----------

const Bidder: React.FC<{ name: React.ReactNode; at: number; blurry?: boolean; lines: [number, number, number[]][]; tint: [string, string] }> = ({ name, at, blurry, lines, tint }) => (
  <Appear at={at}>
    <Glass style={{ width: 780, padding: "26px 30px", display: "flex", gap: 26, alignItems: "center" }}>
      <AdCard blurry={blurry} width={230} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <IconTile icon={Store} tint={tint} size={64} />
          {name}
        </div>
        {lines.map(([a, b, hi], i) => (
          <Say key={i} from={a} to={b} hi={hi} size={38} align="left" />
        ))}
      </div>
    </Glass>
  </Appear>
);

export const Example: S = () => (
  <>
    <Wash tone="violet" />
    <Say from={137} to={153} hi={[144]} size={46} style={{ position: "absolute", top: 90, left: 120, right: 120 }} />
    <div style={{ position: "absolute", left: 140, top: 300, display: "flex", gap: 40 }}>
      <Bidder
        at={t(154)}
        blurry
        tint={C.sky}
        name={<Say from={154} to={155} size={48} align="left" />}
        lines={[
          [156, 159, [158]],
          [160, 163, [163]],
          [164, 176, [174, 175]],
        ]}
      />
      <Bidder
        at={t(177)}
        tint={C.pink}
        name={<Say from={177} to={177} size={48} align="left" />}
        lines={[
          [178, 182, [181]],
          [183, 188, [186, 188]],
          [189, 194, [193, 194]],
        ]}
      />
    </div>
  </>
);

// ---------- 6. multiply: 50×2% = 1, 30×5% = 1.5 ----------

export const Multiply: S = () => {
  const win = useProgress(t(213), t(217) + 0.3);
  return (
    <>
      <Wash tone="amber" />
      <Say from={195} to={197} hi={[196]} size={70} style={{ position: "absolute", top: 110, left: 0, right: 0 }} />
      {[
        { at: t(198), a: 198, b: 205, tint: C.sky, icon: Store, hi: [205], win: 0 },
        { at: t(206), a: 206, b: 212, tint: C.pink, icon: User, hi: [212], win },
      ].map((r, i) => (
        <Appear key={i} at={r.at} style={{ position: "absolute", left: 200, top: 300 + i * 220 }}>
          <Glass active={r.win} style={{ width: 1520, padding: "28px 40px", display: "flex", alignItems: "center", gap: 30 }}>
            <IconTile icon={r.icon} tint={r.tint} size={96} />
            <Say from={r.a} to={r.b} hi={r.hi} size={60} align="left" />
            {i === 1 ? (
              <Pop at={t(216)} style={{ marginLeft: "auto" }}>
                <IconTile icon={Trophy} tint={C.amber} size={100} />
              </Pop>
            ) : null}
          </Glass>
        </Appear>
      ))}
      <div style={{ position: "absolute", top: 800, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Say from={213} to={217} hi={[216, 217]} size={84} />
      </div>
    </>
  );
};

// ---------- 7. the real formula is complex; Facebook wants people to stay ----------

export const RealCalc: S = () => (
  <>
    <Wash tone="blue" />
    <Say from={218} to={234} hi={[223, 228]} size={48} style={{ position: "absolute", top: 100, left: 120, right: 120 }} />
    <Appear at={t(235)} style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center" }}>
      <Glass style={{ padding: "22px 40px", borderRadius: 999, display: "flex", alignItems: "center", gap: 18 }}>
        <Heart size={48} color="#DB2777" strokeWidth={2.4} />
        <Say from={235} to={242} hi={[241, 242]} size={50} />
      </Glass>
    </Appear>
    <div style={{ position: "absolute", left: 160, right: 160, top: 470, display: "flex", gap: 40 }}>
      <Appear at={t(243)} style={{ flex: 1 }}>
        <Glass active={1} style={{ padding: "30px 34px", display: "flex", alignItems: "center", gap: 24 }}>
          <IconTile icon={TrendingUp} tint={C.green} size={100} />
          <Say from={243} to={251} hi={[244, 246, 247]} size={46} align="left" />
        </Glass>
      </Appear>
      <Appear at={t(252)} style={{ flex: 1 }}>
        <Glass style={{ padding: "30px 34px", display: "flex", alignItems: "center", gap: 24, background: "rgba(255,241,242,0.95)" }}>
          <IconTile icon={TrendingDown} tint={C.rose} size={100} />
          <Say from={252} to={260} hi={[253, 257]} size={46} align="left" />
        </Glass>
      </Appear>
    </div>
  </>
);

// ---------- 8. Ads Manager is a tree: campaign → ad set → ad ----------

export const Tree: S = () => {
  const trunk = useProgress(t(272) - 0.2, t(274) + 0.4);
  const branch = useProgress(t(275), t(278) + 0.4);
  const leaf = useProgress(t(280), t(282) + 0.4);
  return (
    <>
      <Wash tone="green" />
      <Say from={261} to={271} hi={[266, 267, 270]} size={50} style={{ position: "absolute", top: 90, left: 120, right: 120 }} />
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <path d="M640 980 L640 620" stroke="#92400E" strokeWidth={46} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - trunk} />
        <path d="M640 700 C 560 640, 480 600, 420 520 M640 660 C 720 600, 800 560, 860 480 M640 620 L640 440" stroke="#B45309" strokeWidth={22} strokeLinecap="round" fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - branch} />
      </svg>
      {[
        [420, 470],
        [860, 430],
        [640, 390],
        [520, 420],
        [760, 380],
      ].map(([x, y], i) => (
        <div key={i} style={{ position: "absolute", left: x - 60, top: y - 60, opacity: leaf, transform: `scale(${0.4 + 0.6 * leaf})` }}>
          <Leaf size={120} color="#22C55E" fill="#86EFAC" strokeWidth={1.6} />
        </div>
      ))}
      <div style={{ position: "absolute", left: 1040, top: 330, display: "flex", flexDirection: "column", gap: 26 }}>
        {[
          { at: t(272), icon: Target, tint: C.amber, a: 272, b: 274 },
          { at: t(275), icon: Layers, tint: C.blue, a: 275, b: 278 },
          { at: t(280), icon: ImageIcon, tint: C.green, a: 280, b: 282 },
        ].map((r, i) => (
          <Appear key={i} at={r.at}>
            <Row width={760}>
              <IconTile icon={r.icon} tint={r.tint} size={84} />
              <Say from={r.a} to={r.b} hi={[r.b, r.b - 1]} size={56} align="left" />
            </Row>
          </Appear>
        ))}
      </div>
    </>
  );
};

// ---------- 9. campaign: six objectives ----------

const OBJ = [
  { icon: Eye, tint: C.violet, name: [299, 299], mean: [300, 307] },
  { icon: Globe, tint: C.blue, name: [308, 308], mean: [309, 314] },
  { icon: ThumbsUp, tint: C.sky, name: [315, 315], mean: [316, 320] },
  { icon: Users, tint: C.teal, name: [321, 321], mean: [322, 328] },
  { icon: Download, tint: C.orange, name: [329, 330], mean: [331, 334] },
  { icon: ShoppingBag, tint: C.green, name: [336, 336], mean: [337, 339] },
];

export const Objectives: S = () => (
  <>
    <Wash tone="blue" />
    <Say from={287} to={298} hi={[293, 296]} size={50} style={{ position: "absolute", top: 90, left: 120, right: 120 }} />
    <div style={{ position: "absolute", left: 140, top: 270, display: "grid", gridTemplateColumns: "repeat(3, 530px)", gap: 26 }}>
      {OBJ.map((o, i) => (
        <Appear key={i} at={t(o.name[0])}>
          <Glass active={i === 5 ? 1 : 0} style={{ height: 300, padding: "26px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <IconTile icon={o.icon} tint={o.tint} size={76} />
              <Say from={o.name[0]} to={o.name[1]} size={50} align="left" hi={i === 5 ? [336] : []} />
            </div>
            <Say from={o.mean[0]} to={o.mean[1]} size={36} align="left" style={{ fontWeight: 600 }} />
          </Glass>
        </Appear>
      ))}
    </div>
  </>
);

// ---------- 10. Rumana picks Engagement: likes, one order ----------

export const Engagement: S = () => {
  const { frame, f } = useTime();
  const likes = Math.max(0, frame - f(t(353)));
  return (
    <>
      <Wash tone="blue" />
      <Say from={340} to={344} hi={[344]} size={60} style={{ position: "absolute", top: 90, left: 0, right: 0 }} />
      <Appear at={t(345)} style={{ position: "absolute", left: 180, top: 250 }}>
        <Glass style={{ width: 620, padding: "26px 30px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Coin size={70} />
            <Say from={345} to={349} hi={[346, 347]} size={48} align="left" />
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <StatCard icon={ThumbsUp} tint={C.blue} width={270} value={likes > 0 ? `${Math.min(999, Math.round(likes * 6))}` : "০"} caption={<Say from={354} to={354} size={34} />} />
            <StatCard icon={ShoppingCart} tint={C.rose} width={270} value={<Say from={358} to={359} size={60} />} caption={<Say from={356} to={356} size={34} />} />
          </div>
        </Glass>
      </Appear>
      {Array.from({ length: 14 }).map((_, i) => {
        const s = likes - i * 4;
        if (s < 0) return null;
        const y = 760 - (s % 90) * 7;
        return (
          <div key={i} style={{ position: "absolute", left: 230 + (i * 47) % 520, top: y, opacity: Math.max(0, 1 - (s % 90) / 90) }}>
            <ThumbsUp size={44} color="#2563EB" fill="#BFDBFE" strokeWidth={2} />
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 900, top: 270, width: 880, display: "flex", flexDirection: "column", gap: 20 }}>
        <Say from={360} to={360} size={90} align="left" />
        <Appear at={t(361)}>
          <Glass style={{ padding: "22px 28px" }}>
            <Say from={361} to={369} hi={[367, 368, 369]} size={42} align="left" />
          </Glass>
        </Appear>
        <Appear at={t(370)}>
          <Glass style={{ padding: "22px 28px" }}>
            <Say from={370} to={382} hi={[372, 380, 382]} size={40} align="left" />
          </Glass>
        </Appear>
        <Appear at={t(383)}>
          <Glass style={{ padding: "22px 28px", background: "rgba(255,241,242,0.95)" }}>
            <Say from={383} to={390} hi={[389, 390]} size={44} align="left" />
          </Glass>
        </Appear>
      </div>
    </>
  );
};

// ---------- 11. then Sales: fewer likes, more orders; needs a pixel ----------

export const Sales: S = () => (
  <>
    <Wash tone="green" />
    <Say from={391} to={396} hi={[396]} size={64} style={{ position: "absolute", top: 90, left: 0, right: 0 }} />
    <div style={{ position: "absolute", left: 200, top: 250, display: "flex", gap: 30 }}>
      <Appear at={t(398)}>
        <StatCard icon={ThumbsUp} tint={C.blue} value="↓" caption={<Say from={398} to={400} hi={[400]} size={40} />} />
      </Appear>
      <Appear at={t(401)}>
        <StatCard icon={ShoppingCart} tint={C.green} value="↑" caption={<Say from={401} to={405} hi={[404, 405]} size={40} />} />
      </Appear>
    </div>
    <Appear at={t(406)} style={{ position: "absolute", left: 200, top: 640 }}>
      <Glass active={1} style={{ width: 700, padding: "26px 32px" }}>
        <Say from={406} to={414} hi={[410, 411]} size={46} align="left" />
      </Glass>
    </Appear>
    <Appear at={t(415)} style={{ position: "absolute", left: 1000, top: 300 }}>
      <Glass style={{ width: 720, padding: "30px 34px", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <IconTile icon={Eye} tint={C.violet} size={90} />
          <Say from={415} to={422} hi={[420, 422]} size={48} align="left" />
        </div>
        <Say from={423} to={429} hi={[428, 429]} size={42} align="left" style={{ fontWeight: 600 }} />
      </Glass>
    </Appear>
  </>
);

// ---------- 12. ad set: audience ----------

export const AdSet: S = () => (
  <>
    <Wash tone="teal" />
    <Say from={430} to={438} hi={[432, 433, 434, 436]} size={56} style={{ position: "absolute", top: 90, left: 0, right: 0 }} />
    <div style={{ position: "absolute", left: 140, top: 230, display: "flex", alignItems: "center", gap: 30 }}>
      <NumBadge at={t(439)} n="১" tint={C.teal} />
      <Say from={440} to={443} hi={[440]} size={64} align="left" />
    </div>
    <div style={{ position: "absolute", left: 160, top: 400, display: "flex", gap: 26 }}>
      {[
        { at: t(447), icon: MapPin, a: 447, b: 447, tint: C.green },
        { at: t(448), icon: CalendarDays, a: 448, b: 451, tint: C.blue },
        { at: t(452), icon: User, a: 452, b: 452, tint: C.pink },
      ].map((r, i) => (
        <Appear key={i} at={r.at}>
          <Glass style={{ width: 500, padding: "26px 28px", display: "flex", alignItems: "center", gap: 20 }}>
            <IconTile icon={r.icon} tint={r.tint} size={84} />
            <Say from={r.a} to={r.b} size={50} align="left" />
          </Glass>
        </Appear>
      ))}
    </div>
    <Appear at={t(453)} style={{ position: "absolute", left: 160, top: 610 }}>
      <Glass style={{ width: 1580, padding: "22px 30px", display: "flex", alignItems: "center", gap: 20 }}>
        <IconTile icon={Sparkles} tint={C.violet} size={76} />
        <Say from={453} to={461} hi={[459, 461]} size={46} align="left" />
      </Glass>
    </Appear>
    <Appear at={t(462)} style={{ position: "absolute", left: 160, top: 790 }}>
      <Glass style={{ width: 1580, padding: "20px 30px", background: "rgba(255,251,235,0.95)" }}>
        <Say from={462} to={472} hi={[466, 467]} size={42} align="left" />
      </Glass>
    </Appear>
  </>
);

// ---------- 13. budget and schedule ----------

export const Budget: S = () => {
  const grow = useProgress(t(494), t(501) + 0.5);
  return (
    <>
      <Wash tone="amber" />
      <div style={{ position: "absolute", left: 140, top: 110, display: "flex", alignItems: "center", gap: 30 }}>
        <NumBadge at={t(473)} n="২" tint={C.amber} />
        <Say from={474} to={474} size={70} align="left" />
      </div>
      <div style={{ position: "absolute", left: 160, top: 280, display: "flex", flexDirection: "column", gap: 22 }}>
        <Appear at={t(475)}>
          <Row width={860}>
            <IconTile icon={Wallet} tint={C.amber} size={80} />
            <Say from={475} to={481} hi={[475]} size={44} align="left" />
          </Row>
        </Appear>
        <Appear at={t(482)}>
          <Row width={860} style={{ background: "rgba(253,242,248,0.95)" }}>
            <IconTile icon={User} tint={C.pink} size={80} />
            <Say from={482} to={487} hi={[486]} size={46} align="left" />
          </Row>
        </Appear>
        <Appear at={t(488)}>
          <Row width={860}>
            <IconTile icon={Target} tint={C.teal} size={80} />
            <Say from={488} to={493} hi={[489, 492]} size={44} align="left" />
          </Row>
        </Appear>
      </div>
      <Appear at={t(494)} style={{ position: "absolute", left: 1120, top: 280 }}>
        <Glass style={{ width: 640, height: 380, padding: 30, display: "flex", alignItems: "flex-end", gap: 24 }}>
          {[0.3, 0.3, 0.3].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${(i === 1 ? h + 0.65 * grow : h * (1 - 0.5 * grow)) * 100}%`, borderRadius: 16, background: i === 1 ? "linear-gradient(180deg, #4ADE80, #16A34A)" : "rgba(203,213,225,0.8)" }} />
          ))}
        </Glass>
        <Say from={494} to={501} hi={[500, 501]} size={38} style={{ marginTop: 12 }} />
      </Appear>
      <div style={{ position: "absolute", left: 160, top: 800, display: "flex", alignItems: "center", gap: 24 }}>
        <NumBadge at={t(502)} n="৩" tint={C.blue} size={90} />
        <Say from={503} to={507} hi={[503]} size={52} align="left" />
      </div>
    </>
  );
};

// ---------- 14. placement ----------

export const Placement: S = () => (
  <>
    <Wash tone="violet" />
    <div style={{ position: "absolute", left: 140, top: 110, display: "flex", alignItems: "center", gap: 30 }}>
      <NumBadge at={t(509)} n="৪" tint={C.violet} />
      <Say from={510} to={515} hi={[510]} size={58} align="left" />
    </div>
    <div style={{ position: "absolute", left: 160, top: 300, display: "flex", gap: 24 }}>
      {[
        { a: 516, b: 517, tint: C.blue, icon: Smartphone },
        { a: 518, b: 518, tint: C.pink, icon: ImageIcon },
        { a: 519, b: 519, tint: C.violet, icon: Sparkles },
        { a: 520, b: 520, tint: C.sky, icon: MessageCircle },
      ].map((r, i) => (
        <Appear key={i} at={t(r.a)}>
          <Glass style={{ width: 380, padding: "26px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <IconTile icon={r.icon} tint={r.tint} size={90} />
            <Say from={r.a} to={r.b} size={44} />
          </Glass>
        </Appear>
      ))}
    </div>
    <Appear at={t(521)} style={{ position: "absolute", left: 160, top: 620 }}>
      <Glass active={1} style={{ width: 1600, padding: "26px 34px", display: "flex", flexDirection: "column", gap: 12 }}>
        <Say from={521} to={531} hi={[529, 530, 531]} size={48} align="left" />
        <Say from={532} to={540} hi={[537, 540]} size={40} align="left" style={{ fontWeight: 600 }} />
      </Glass>
    </Appear>
  </>
);

// ---------- 15. the ad itself: three parts ----------

export const AdParts: S = () => (
  <>
    <Wash tone="pink" />
    <Say from={541} to={549} hi={[543, 548]} size={56} style={{ position: "absolute", top: 90, left: 0, right: 0 }} />
    <Appear at={t(547)} style={{ position: "absolute", left: 320, top: 240 }}>
      <AdCard width={420}>
        <Pop at={t(561)}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
            <Skel w={160} strong />
            <div style={{ padding: "8px 20px", borderRadius: 999, background: "linear-gradient(90deg, #DB2777, #7C3AED)", fontFamily: fonts.display, fontWeight: 700, fontSize: 28, color: "white", opacity: 1 }}>এখনই কিনুন</div>
          </div>
        </Pop>
      </AdCard>
    </Appear>
    <div style={{ position: "absolute", left: 900, top: 300, display: "flex", flexDirection: "column", gap: 24 }}>
      {[
        { at: t(550), a: 550, b: 552, icon: ImageIcon, tint: C.pink },
        { at: t(553), a: 553, b: 554, icon: MessageCircle, tint: C.blue },
        { at: t(556), a: 556, b: 560, icon: MousePointerClick, tint: C.green },
      ].map((r, i) => (
        <Appear key={i} at={r.at}>
          <Row width={860}>
            <NumBadge at={r.at} n={["১", "২", "৩"][i]} tint={r.tint} size={70} />
            <IconTile icon={r.icon} tint={r.tint} size={76} />
            <Say from={r.a} to={r.b} size={48} align="left" />
          </Row>
        </Appear>
      ))}
    </div>
  </>
);

// ---------- 16. A/B test: product shot vs model wearing it ----------

export const AbTest: S = () => {
  const { frame, f } = useTime();
  const clicks = Math.max(0, frame - f(t(599)));
  const win = useProgress(t(593), t(600) + 0.4);
  return (
    <>
      <Wash tone="violet" />
      <Say from={564} to={567} hi={[565]} size={56} style={{ position: "absolute", top: 80, left: 0, right: 0 }} />
      <Appear at={t(568)} style={{ position: "absolute", left: 200, top: 200 }}>
        <AdCard width={360} />
        <Say from={568} to={574} hi={[572]} size={34} style={{ marginTop: 10, width: 360 }} />
      </Appear>
      <Appear at={t(575)} style={{ position: "absolute", left: 640, top: 200 }}>
        <AdCard wearing width={360} glow={win} />
        <Say from={575} to={581} hi={[581]} size={34} style={{ marginTop: 10, width: 360 }} />
      </Appear>
      {Array.from({ length: 10 }).map((_, i) => {
        const s = clicks - i * 6;
        if (s < 0) return null;
        const p = Math.min(1, s / 20);
        return (
          <div key={i} style={{ position: "absolute", left: 700 + (i * 37) % 260, top: 300 + (i * 53) % 300, opacity: 1 - p, transform: `scale(${0.6 + p})` }}>
            <MousePointerClick size={44} color="#7C3AED" strokeWidth={2.3} />
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 1080, top: 230, width: 720, display: "flex", flexDirection: "column", gap: 20 }}>
        <Appear at={t(582)}>
          <Glass style={{ padding: "20px 26px" }}>
            <Say from={582} to={600} hi={[593, 598, 599]} size={38} align="left" />
          </Glass>
        </Appear>
        <Appear at={t(601)}>
          <Glass active={1} style={{ padding: "20px 26px" }}>
            <Say from={601} to={613} hi={[613]} size={42} align="left" />
          </Glass>
        </Appear>
        <Appear at={t(614)}>
          <Glass style={{ padding: "20px 26px", display: "flex", alignItems: "center", gap: 16 }}>
            <IconTile icon={Sparkles} tint={C.violet} size={70} />
            <div>
              <Say from={614} to={626} size={34} align="left" style={{ fontWeight: 600 }} />
              <Say from={627} to={629} hi={[629]} size={52} align="left" />
            </div>
          </Glass>
        </Appear>
      </div>
    </>
  );
};

// ---------- 17. learning phase ----------

export const Learning: S = () => {
  const pal = usePalette();
  const learn = useProgress(t(655), t(671) + 0.5);
  const bar = useProgress(t(682), t(694) + 0.5);
  const people = Array.from({ length: 24 }, (_, i) => ({ x: 170 + (i % 8) * 92, y: 330 + Math.floor(i / 8) * 92, fit: [2, 5, 9, 12, 14, 19, 21].includes(i) }));
  return (
    <>
      <Wash tone="teal" />
      <Say from={630} to={642} hi={[640, 641]} size={46} style={{ position: "absolute", top: 90, left: 120, right: 120 }} />
      {people.map((p, i) => {
        const on = p.fit ? learn : 0;
        return (
          <div key={i} style={{ position: "absolute", left: p.x, top: p.y, width: 74, height: 74, borderRadius: 99, display: "flex", alignItems: "center", justifyContent: "center", background: on > 0.5 ? "linear-gradient(160deg, #F9A8D4, #DB2777)" : "rgba(226,232,240,0.95)", transform: `scale(${1 + 0.12 * on})`, opacity: 1 - (p.fit ? 0 : 0.5 * learn) }}>
            <User size={38} color={on > 0.5 ? "white" : "#64748B"} strokeWidth={2.3} />
          </div>
        );
      })}
      <Say from={643} to={654} size={40} align="left" style={{ position: "absolute", left: 170, top: 640, width: 740 }} />
      <div style={{ position: "absolute", left: 1000, top: 300, width: 780, display: "flex", flexDirection: "column", gap: 18 }}>
        <Appear at={t(655)}>
          <Glass style={{ padding: "20px 26px" }}>
            <Say from={655} to={671} hi={[660]} size={38} align="left" />
          </Glass>
        </Appear>
        <Appear at={t(672)}>
          <Glass active={1} style={{ padding: "20px 26px", display: "flex", flexDirection: "column", gap: 14 }}>
            <Say from={672} to={677} hi={[676, 677]} size={46} align="left" />
            <Say from={678} to={694} hi={[685]} size={30} align="left" style={{ fontWeight: 600 }} />
            <div style={{ height: 30, borderRadius: 15, background: pal.lineSoft, overflow: "hidden" }}>
              <div style={{ width: `${bar * 100}%`, height: "100%", background: "linear-gradient(90deg, #5EEAD4, #0D9488)" }} />
            </div>
          </Glass>
        </Appear>
        <Appear at={t(695)}>
          <Glass style={{ padding: "18px 26px", background: "rgba(255,251,235,0.95)" }}>
            <Say from={695} to={709} hi={[699, 708]} size={36} align="left" />
          </Glass>
        </Appear>
      </div>
    </>
  );
};

// ---------- 18. old narrow targeting vs Advantage+ Audience ----------

export const AdvPlus: S = () => {
  const open = useProgress(t(736), t(744) + 0.5);
  return (
    <>
      <Wash tone="blue" />
      <Say from={710} to={713} hi={[712]} size={56} style={{ position: "absolute", top: 90, left: 0, right: 0 }} />
      <Appear at={t(714)} style={{ position: "absolute", left: 160, top: 220 }}>
        <Glass style={{ width: 780, padding: "26px 30px", display: "flex", flexDirection: "column", gap: 18, background: "rgba(241,245,249,0.9)" }}>
          <Say from={714} to={719} hi={[717, 718]} size={44} align="left" />
          <Strike at={t(731)}>
            <Say from={720} to={730} size={34} align="left" style={{ fontWeight: 600 }} />
          </Strike>
        </Glass>
      </Appear>
      <Appear at={t(731)} style={{ position: "absolute", left: 1000, top: 220 }}>
        <Glass active={1} style={{ width: 760, padding: "26px 30px", display: "flex", flexDirection: "column", gap: 14 }}>
          <Say from={731} to={739} hi={[737, 738]} size={40} align="left" />
          <Say from={740} to={744} hi={[742, 743, 744]} size={54} align="left" />
        </Glass>
      </Appear>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <circle cx={960} cy={740} r={70 + 170 * open} fill="rgba(96,165,250,0.12)" stroke="#2563EB" strokeWidth={5} strokeDasharray="14 12" />
      </svg>
      <div style={{ position: "absolute", left: 960 - 50, top: 690 }}>
        <IconTile icon={Users} tint={C.blue} size={100} />
      </div>
      <Say from={745} to={759} hi={[748]} size={36} align="left" style={{ position: "absolute", left: 160, top: 620, width: 560 }} />
      <Appear at={t(760)} style={{ position: "absolute", left: 1240, top: 640 }}>
        <Glass style={{ width: 520, padding: "22px 26px", display: "flex", flexDirection: "column", gap: 10 }}>
          <Say from={760} to={767} hi={[764, 766]} size={38} align="left" />
          <Say from={768} to={773} hi={[769, 772]} size={38} align="left" style={{ color: ROSE }} />
        </Glass>
      </Appear>
    </>
  );
};

// ---------- 19. the report: five numbers ----------

const REPORT = [
  { icon: Coins, tint: C.amber, a: 792, b: 797, hi: [795, 796, 797] },
  { icon: Eye, tint: C.violet, a: 798, b: 803, hi: [801, 802] },
  { icon: MousePointerClick, tint: C.blue, a: 804, b: 806, hi: [806] },
  { icon: ShoppingCart, tint: C.green, a: 807, b: 809, hi: [809] },
  { icon: Banknote, tint: C.teal, a: 810, b: 816, hi: [813, 814, 815] },
];

export const Report: S = () => (
  <>
    <Wash tone="violet" />
    <Say from={774} to={779} hi={[778]} size={56} style={{ position: "absolute", top: 80, left: 0, right: 0 }} />
    <Appear at={t(780)} style={{ position: "absolute", left: 0, right: 0, top: 170, display: "flex", justifyContent: "center" }}>
      <Glass style={{ padding: "12px 30px", borderRadius: 999 }}>
        <Say from={780} to={791} hi={[785, 786]} size={40} />
      </Glass>
    </Appear>
    <div style={{ position: "absolute", left: 140, top: 320, display: "flex", gap: 22 }}>
      {REPORT.map((r, i) => (
        <Appear key={i} at={t(r.a)}>
          <Glass style={{ width: 310, height: 420, padding: "28px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
            <IconTile icon={r.icon} tint={r.tint} size={96} />
            <Say from={r.a} to={r.b} hi={r.hi} size={40} />
          </Glass>
        </Appear>
      ))}
    </div>
  </>
);

// ---------- 20–24. CPM, CTR, CPC, cost per order, ROAS ----------

const Metric: React.FC<{ name: [number, number]; mean: [number, number]; calc: [number, number]; note?: [number, number]; icon: typeof Eye; tint: [string, string]; hi?: number[] }> = ({ name, mean, calc, note, icon, tint, hi = [] }) => (
  <>
    <Wash tone={tint === C.amber ? "amber" : tint === C.blue ? "blue" : tint === C.violet ? "violet" : "green"} />
    <div style={{ position: "absolute", left: 140, top: 110, display: "flex", alignItems: "center", gap: 30 }}>
      <Pop at={t(name[0])}>
        <IconTile icon={icon} tint={tint} size={130} />
      </Pop>
      <Say from={name[0]} to={name[1]} hi={[name[1]]} size={96} align="left" />
    </div>
    <Appear at={t(mean[0])} style={{ position: "absolute", left: 160, top: 320 }}>
      <Glass style={{ width: 1600, padding: "26px 34px" }}>
        <Say from={mean[0]} to={mean[1]} size={52} align="left" />
      </Glass>
    </Appear>
    <Appear at={t(calc[0])} style={{ position: "absolute", left: 160, top: 500 }}>
      <Glass active={1} style={{ width: 1600, padding: "34px 40px" }}>
        <Say from={calc[0]} to={calc[1]} hi={hi} size={64} align="left" />
      </Glass>
    </Appear>
    {note ? (
      <Appear at={t(note[0])} style={{ position: "absolute", left: 160, top: 740 }}>
        <Glass style={{ width: 1600, padding: "22px 34px", background: "rgba(255,251,235,0.95)" }}>
          <Say from={note[0]} to={note[1]} size={44} align="left" />
        </Glass>
      </Appear>
    ) : null}
  </>
);

export const Cpm: S = () => <Metric name={[817, 819]} mean={[820, 827]} calc={[828, 836]} note={[837, 843]} icon={Eye} tint={C.violet} hi={[835]} />;
export const Ctr: S = () => <Metric name={[844, 845]} mean={[846, 853]} calc={[854, 861]} note={[862, 874]} icon={MousePointerClick} tint={C.blue} hi={[860, 861]} />;
export const Cpc: S = () => <Metric name={[875, 876]} mean={[877, 880]} calc={[881, 887]} icon={Coins} tint={C.amber} hi={[886, 887]} />;
export const Cpo: S = () => <Metric name={[888, 891]} mean={[892, 898]} calc={[899, 904]} icon={ShoppingCart} tint={C.green} hi={[903, 904]} />;
export const Roas: S = () => (
  <>
    <Metric name={[905, 907]} mean={[908, 916]} calc={[917, 925]} icon={TrendingUp} tint={C.green} hi={[925]} />
    <Appear at={t(926)} style={{ position: "absolute", left: 160, top: 760 }}>
      <Glass style={{ width: 1600, padding: "20px 34px", display: "flex", alignItems: "center", gap: 20, background: "rgba(253,242,248,0.95)" }}>
        <IconTile icon={Heart} tint={C.pink} size={70} />
        <Say from={926} to={934} hi={[927, 931]} size={46} align="left" />
      </Glass>
    </Appear>
  </>
);

// ---------- 25. but what is the real profit? ----------

export const Profit: S = () => {
  const equal = useProgress(t(966), t(971) + 0.4);
  return (
    <>
      <Wash tone="rose" />
      <Say from={935} to={942} hi={[940, 941]} size={60} style={{ position: "absolute", top: 80, left: 0, right: 0 }} />
      <Appear at={t(943)} style={{ position: "absolute", left: 160, top: 200 }}>
        <Glass style={{ width: 780, padding: "26px 30px", display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { a: 943, b: 945, icon: ShoppingBag, tint: C.green },
            { a: 946, b: 949, icon: Package, tint: C.orange },
            { a: 950, b: 952, icon: Package, tint: C.sky },
          ].map((r, i) => (
            <Appear key={i} at={t(r.a)}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 16px", borderRadius: 16, background: "rgba(248,250,252,0.9)" }}>
                <IconTile icon={r.icon} tint={r.tint} size={60} />
                <Say from={r.a} to={r.b} size={42} align="left" />
              </div>
            </Appear>
          ))}
          <Appear at={t(953)}>
            <div style={{ padding: "12px 16px", borderRadius: 16, background: "rgba(220,252,231,0.95)" }}>
              <Say from={953} to={958} hi={[956, 957, 958]} size={48} align="left" />
            </div>
          </Appear>
        </Glass>
      </Appear>
      <Appear at={t(959)} style={{ position: "absolute", left: 1000, top: 200 }}>
        <Glass style={{ width: 760, padding: "26px 30px", display: "flex", flexDirection: "column", gap: 16 }}>
          <Say from={959} to={971} hi={[963, 970]} size={40} align="left" />
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 60, height: 200 }}>
            <div style={{ width: 120, height: 180, borderRadius: 16, background: "linear-gradient(180deg, #4ADE80, #16A34A)" }} />
            <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 90, color: "#334155", opacity: equal }}>=</div>
            <div style={{ width: 120, height: 180 * equal, borderRadius: 16, background: "linear-gradient(180deg, #FDA4AF, #E11D48)" }} />
          </div>
        </Glass>
      </Appear>
      <Appear at={t(972)} style={{ position: "absolute", left: 160, top: 740 }}>
        <Glass style={{ width: 1600, padding: "22px 34px", display: "flex", flexDirection: "column", gap: 8, background: "rgba(255,241,242,0.95)" }}>
          <Say from={972} to={981} hi={[976, 977]} size={44} align="left" />
          <Say from={982} to={995} hi={[988, 994]} size={36} align="left" style={{ fontWeight: 600 }} />
        </Glass>
      </Appear>
    </>
  );
};

// ---------- 26. break-even ROAS ----------

export const BreakEven: S = () => (
  <>
    <Wash tone="amber" />
    <Say from={996} to={1002} hi={[999, 1000, 1001]} size={56} style={{ position: "absolute", top: 80, left: 0, right: 0 }} />
    <Say from={1003} to={1011} size={42} style={{ position: "absolute", top: 170, left: 0, right: 0 }} />
    <Appear at={t(1012)} style={{ position: "absolute", left: 160, top: 290 }}>
      <Glass style={{ width: 1600, padding: "30px 40px", display: "flex", alignItems: "center", gap: 30 }}>
        <IconTile icon={Sparkles} tint={C.amber} size={90} />
        <Say from={1012} to={1019} hi={[1016]} size={54} align="left" />
      </Glass>
    </Appear>
    <Appear at={t(1020)} style={{ position: "absolute", left: 160, top: 470 }}>
      <Glass active={1} style={{ width: 1600, padding: "30px 40px", display: "flex", alignItems: "center", gap: 30 }}>
        <IconTile icon={User} tint={C.pink} size={90} />
        <Say from={1020} to={1025} hi={[1025]} size={64} align="left" />
      </Glass>
    </Appear>
    <Appear at={t(1026)} style={{ position: "absolute", left: 160, top: 650 }}>
      <Glass style={{ width: 1600, padding: "24px 40px", display: "flex", alignItems: "center", gap: 24 }}>
        <IconTile icon={TrendingUp} tint={C.green} size={80} />
        <Say from={1026} to={1034} hi={[1031, 1034]} size={48} align="left" />
      </Glass>
    </Appear>
    <Appear at={t(1035)} style={{ position: "absolute", left: 160, top: 830 }}>
      <Glass style={{ width: 1600, padding: "18px 40px", background: "rgba(255,251,235,0.95)" }}>
        <Say from={1035} to={1053} hi={[1039, 1040, 1041]} size={36} align="left" />
      </Glass>
    </Appear>
  </>
);

// ---------- 27. two ways out: combo offers, move budget → ROAS 3.5 ----------

export const Fix: S = () => {
  const rise = useProgress(t(1097), t(1100) + 0.6, Easing.out(Easing.cubic));
  return (
    <>
      <Wash tone="green" />
      <Say from={1054} to={1059} hi={[1058, 1059]} size={64} style={{ position: "absolute", top: 90, left: 0, right: 0 }} />
      <div style={{ position: "absolute", left: 160, top: 250, display: "flex", flexDirection: "column", gap: 24 }}>
        <Appear at={t(1060)}>
          <Glass style={{ width: 960, padding: "24px 30px", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <NumBadge at={t(1060)} n="১" tint={C.pink} size={70} />
              <Say from={1061} to={1064} hi={[1063, 1064]} size={50} align="left" />
            </div>
            <Say from={1065} to={1082} hi={[1069, 1070]} size={34} align="left" style={{ fontWeight: 600 }} />
          </Glass>
        </Appear>
        <Appear at={t(1083)}>
          <Glass style={{ width: 960, padding: "24px 30px", display: "flex", alignItems: "center", gap: 18 }}>
            <NumBadge at={t(1083)} n="২" tint={C.blue} size={70} />
            <Say from={1084} to={1093} hi={[1090, 1092, 1093]} size={44} align="left" />
          </Glass>
        </Appear>
      </div>
      <Appear at={t(1094)} style={{ position: "absolute", left: 1220, top: 260 }}>
        <Glass active={1} style={{ width: 540, height: 600, padding: 30, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <Say from={1094} to={1098} size={40} />
          <div style={{ display: "flex", alignItems: "flex-end", gap: 40, height: 280 }}>
            <div style={{ width: 110, height: 190, borderRadius: 16, background: "rgba(203,213,225,0.9)" }} />
            <div style={{ width: 110, height: 190 + 90 * rise, borderRadius: 16, background: "linear-gradient(180deg, #4ADE80, #16A34A)" }} />
          </div>
          <Say from={1099} to={1100} hi={[1099]} size={76} />
          <Say from={1101} to={1103} hi={[1102, 1103]} size={52} />
        </Glass>
      </Appear>
    </>
  );
};

