// All 13 scenes of the fashion accessory ad, in voice order.
import React from "react";
import {
  ArrowRight,
  Cake,
  Camera,
  Circle,
  Flower2,
  Gem,
  Gift,
  Globe,
  GraduationCap,
  Handbag,
  Heart,
  HeartHandshake,
  Package,
  PackageCheck,
  Play,
  Repeat,
  RotateCcw,
  Ruler,
  ShieldCheck,
  ShoppingCart,
  Shirt,
  Truck,
  TrendingUp,
  UserX,
  Wallet,
  Warehouse,
  Feather,
  CircleHelp,
} from "lucide-react";
import { Easing, Img, interpolate, staticFile } from "remotion";
import { Appear, CheckBadge, Counter, Float, Glass, GradPill, Headline, IconTile, LogoCard, Pill, Pop, usePalette, useProgress, useTime, Word } from "../../components/kit";
import { greenIconTints as T } from "../../theme";
import { En, GradText, Strike } from "../../v2/ui";
import { Girl } from "../../v3/Girl";
import { Coin, HeroWord, Sweep, Tag, useTravel } from "../../v4/parts";
import { MixLine, ProductPhoto, ReasonBadge, ReasonDots, Row, Twinkle } from "../parts";
import type { Timeline5 } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
type P<K extends keyof Timeline5> = React.FC<{ t: Timeline5[K] }>;

// Badge + title at the top-left of each reason scene.
const ReasonTitle: React.FC<{ n: number; at: number; children: React.ReactNode }> = ({ n, at, children }) => (
  <div style={{ position: "absolute", left: 140, top: 180, display: "flex", alignItems: "center", gap: 40 }}>
    <ReasonBadge n={n} at={at} />
    <div>{children}</div>
  </div>
);

// ---------- 1. hook ----------

export const HookScene: P<"hook"> = ({ t }) => (
  <>
    <Appear at={t.chhotto} rise={50} scaleFrom={0.92} style={{ position: "absolute", left: 230, top: 210 }}>
      <Float amp={6}>
        <ProductPhoto size={640} />
      </Float>
    </Appear>
    <Twinkle x={470} y={250} phase={0} />
    <Twinkle x={780} y={420} size={30} phase={2} />
    <Twinkle x={330} y={800} size={34} phase={4} />
    <div style={{ position: "absolute", left: 1000, top: 260 }}>
      <Headline align="left" size={78} words={[["ছোট্ট", t.chhotto], ["এক", t.ek], ["জোড়া", t.jora]]} />
      <Headline align="left" size={130} words={[["কানের", t.kaner], ["দুল", t.dul, true]]} />
      <Appear at={t.labh} style={{ marginTop: 40, display: "inline-block" }}>
        <Glass style={{ padding: "22px 40px", display: "flex", alignItems: "center", gap: 24, borderRadius: 999 }}>
          <Coin size={80} />
          <Headline align="left" size={76} words={[["লাভ", t.labh, true], ["কত?", t.koto]]} />
        </Glass>
      </Appear>
    </div>
  </>
);

// ---------- 2. price: 120 vs 240 ----------

const PriceCard: React.FC<{ at: number; x: number; h: number; grow: number; label: React.ReactNode; value: number; countFrom: number; countTo: number; hero?: boolean }> = ({
  at,
  x,
  h,
  grow,
  label,
  value,
  countFrom,
  countTo,
  hero,
}) => {
  const pal = usePalette();
  const height = 200 + (h - 200) * grow;
  return (
    <Appear at={at} style={{ position: "absolute", left: x - 230, top: 930 - height }}>
      <Glass active={hero ? 1 : 0} style={{ width: 460, height, padding: "36px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, overflow: "hidden" }}>
        <div style={{ textAlign: "center" }}>{label}</div>
        <GradText size={hero ? 140 : 120} style={hero ? undefined : { backgroundImage: "none", color: pal.ink }}>
          <Counter from={countFrom} to={countTo} value={value} prefix="৳" />
        </GradText>
        <div style={{ position: "absolute", left: 30, right: 30, bottom: 30, top: 260, borderRadius: 22, background: hero ? "linear-gradient(180deg, rgba(34,197,94,0.25), rgba(13,148,136,0.1))" : "rgba(226,232,229,0.6)" }} />
      </Glass>
    </Appear>
  );
};

export const PriceScene: P<"price"> = ({ t }) => {
  const g1 = useProgress(t.n120, t.taka1 + 0.4);
  const g2 = useProgress(t.n240, t.taka2 + 0.4);
  const arrow = useProgress(t.prai - 0.2, t.dwigun + 0.3);
  return (
    <>
      <PriceCard at={t.start} x={560} h={380} grow={g1} value={120} countFrom={t.n120} countTo={t.taka1} label={<Headline size={56} words={[["পাইকারি", t.start]]} />} />
      <PriceCard
        at={t.online}
        x={1360}
        h={700}
        grow={g2}
        hero
        value={240}
        countFrom={t.n240}
        countTo={t.taka2}
        label={<MixLine size={56} words={[["Online", t.online, false, true], ["বিক্রি", t.bikri]]} />}
      />
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <path d="M640 470 C 760 240, 1060 180, 1180 220" pathLength={1} fill="none" stroke="#16A34A" strokeWidth={8} strokeLinecap="round" strokeDasharray={1} strokeDashoffset={1 - arrow} opacity={0.75} />
        <path d="M1150 196 L1186 220 L1150 246" fill="none" stroke="#16A34A" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" opacity={0.75 * (arrow > 0.95 ? 1 : 0)} />
      </svg>
      <Appear at={t.prai} style={{ position: "absolute", left: 960 - 300, top: 110, width: 600, display: "flex", justifyContent: "center" }}>
        <GradPill size={52} icon={TrendingUp}>
          <Word text="প্রায়" at={t.prai} style={{ color: "white", filter: "none" }} /> <Word text="দ্বিগুণ" at={t.dwigun} style={{ color: "white", filter: "none" }} />
        </GradPill>
      </Appear>
    </>
  );
};

// ---------- 3. why so profitable? ----------

export const WhyScene: P<"why"> = ({ t }) => {
  const icons = [
    { i: Gem, tint: T.teal, x: 260, y: 220, ph: 0 },
    { i: Handbag, tint: T.orange, x: 1600, y: 200, ph: 1.4 },
    { i: Circle, tint: T.lime, x: 240, y: 760, ph: 2.6 },
    { i: Heart, tint: T.rose, x: 1620, y: 780, ph: 3.8 },
  ];
  return (
    <>
      {icons.map((c, k) => (
        <Appear key={k} at={t.start + k * 0.12} style={{ position: "absolute", left: c.x - 60, top: c.y - 60 }}>
          <Float phase={c.ph} amp={12}>
            <IconTile icon={c.i} tint={c.tint} size={120} />
          </Float>
        </Appear>
      ))}
      <MixLine
        style={{ position: "absolute", top: 300, left: 0, right: 0 }}
        size={124}
        words={[["Fashion", t.fashion, true, true], ["Accessory", t.accessory, true, true]]}
      />
      <MixLine
        style={{ position: "absolute", top: 470, left: 0, right: 0 }}
        size={96}
        words={[["ব্যবসা", t.byabsa], ["কেন", t.ken], ["এত", t.eto], ["লাভজনক?", t.labhjonok, true]]}
      />
      <div style={{ position: "absolute", top: 690, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 26 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <ReasonBadge key={n} n={n} at={t.labhjonok + 0.3 + n * 0.08} size={84} />
        ))}
      </div>
    </>
  );
};

// ---------- 4. reason 1: demand all year ----------

const FEST = [
  { k: "eid" as const, label: "ঈদ", icon: Gift, tint: T.green },
  { k: "biye" as const, label: "বিয়ে", icon: HeartHandshake, tint: T.rose },
  { k: "jonmodin" as const, label: "জন্মদিন", icon: Cake, tint: T.orange },
  { k: "boishakh" as const, label: "বৈশাখ", icon: Flower2, tint: T.teal },
];

export const DemandScene: P<"demand"> = ({ t }) => {
  const pal = usePalette();
  const lit = useProgress(t.chahida, t.bochhor + 0.6);
  return (
    <>
      <ReasonDots current={1} at={t.start - 0.4} />
      <ReasonTitle n={1} at={t.start}>
        <Headline align="left" size={104} words={[["চাহিদা", t.chahida, true], ["সারা", t.sara], ["বছর", t.bochhor]]} />
      </ReasonTitle>
      <Appear at={t.chahida} style={{ position: "absolute", left: 160, top: 430 }}>
        <Glass style={{ width: 620, padding: 34, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const on = interpolate(lit, [i / 12, (i + 1) / 12], [0, 1], clamp);
            return (
              <div
                key={i}
                style={{
                  height: 88,
                  borderRadius: 18,
                  background: on > 0 ? `linear-gradient(160deg, rgba(134,239,172,${on}), rgba(22,163,74,${on}))` : pal.lineSoft,
                  boxShadow: on > 0.5 ? "0 8px 18px rgba(22,163,74,0.25)" : undefined,
                  border: "1px solid rgba(255,255,255,0.9)",
                }}
              />
            );
          })}
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 900, top: 430, display: "grid", gridTemplateColumns: "repeat(2, 400px)", gap: 30 }}>
        {FEST.map((fst) => (
          <Appear key={fst.k} at={t[fst.k]}>
            <Glass style={{ padding: "26px 30px", display: "flex", alignItems: "center", gap: 24 }}>
              <IconTile icon={fst.icon} tint={fst.tint} size={92} />
              <Tag size={56}>{fst.label}</Tag>
            </Glass>
          </Appear>
        ))}
      </div>
      <Headline style={{ position: "absolute", top: 880, left: 900, width: 830 }} align="left" size={52} words={[["নতুন", t.notun], ["কিছু", t.kichu], ["খোঁজে", t.khoje]]} />
    </>
  );
};

// ---------- 5. reason 2: customers buy again and again ----------

export const RepeatScene: P<"repeat"> = ({ t }) => {
  const { frame, f } = useTime();
  const spin = Math.max(0, frame - f(t.barbar)) * 3;
  const dim = useProgress(t.trend - 0.2, t.trend + 0.4);
  const acc = [
    { at: t.dul, icon: Gem, tint: T.teal, label: "দুল" },
    { at: t.churi, icon: Circle, tint: T.orange, label: "চুড়ি" },
    { at: t.bag, icon: Handbag, tint: T.rose, label: "ব্যাগ" },
  ];
  return (
    <>
      <ReasonDots current={2} at={t.start - 0.4} />
      <ReasonTitle n={2} at={t.start}>
        <MixLine align="left" size={96} words={[["Customer", t.customer, false, true], ["বারবার", t.barbar, true], ["কেনে", t.kene]]} />
      </ReasonTitle>
      <Appear at={t.ekjon} style={{ position: "absolute", left: 300, top: 440, opacity: 1 - 0.55 * dim }}>
        <div style={{ position: "relative", width: 380, height: 380 }}>
          <div style={{ position: "absolute", inset: 0, transform: `rotate(${spin}deg)` }}>
            <Repeat size={380} color="#86EFAC" strokeWidth={1.4} />
          </div>
          <div style={{ position: "absolute", left: 120, top: 120 }}>
            <IconTile icon={ShoppingCart} tint={T.green} size={140} />
          </div>
        </div>
      </Appear>
      <Appear at={t.trend} style={{ position: "absolute", left: 860, top: 440 }}>
        <Pill icon={TrendingUp} size={44}>
          <En weight={700}>Trend</En> <Word text="বদলায়" at={t.bodlay} />
        </Pill>
      </Appear>
      <Appear at={t.arekta} style={{ position: "absolute", left: 860, top: 580 }}>
        <IconTile icon={Shirt} tint={T.sky} size={150} />
      </Appear>
      <div style={{ position: "absolute", left: 1060, top: 590, display: "flex", gap: 26 }}>
        {acc.map((a, i) => (
          <Pop key={i} at={a.at}>
            <Glass style={{ width: 190, padding: "22px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <IconTile icon={a.icon} tint={a.tint} size={90} />
              <Tag size={44}>{a.label}</Tag>
            </Glass>
          </Pop>
        ))}
      </div>
    </>
  );
};

// ---------- 6. reason 3: small and light ----------

export const SmallScene: P<"small"> = ({ t }) => (
  <>
    <ReasonDots current={3} at={t.start - 0.4} />
    <ReasonTitle n={3} at={t.start}>
      <Headline align="left" size={96} words={[["পণ্য", t.ponno], ["ছোট", t.chhoto, true], ["আর", t.ar], ["হালকা", t.halka, true]]} />
    </ReasonTitle>
    <Appear at={t.chhoto} style={{ position: "absolute", left: 300, top: 470 }}>
      <Float amp={16}>
        <IconTile icon={Package} tint={T.lime} size={220} />
      </Float>
    </Appear>
    <Appear at={t.halka} style={{ position: "absolute", left: 560, top: 430 }}>
      <Float phase={2} amp={22}>
        <Feather size={130} color="#22C55E" strokeWidth={1.8} />
      </Float>
    </Appear>
    <div style={{ position: "absolute", left: 900, top: 480, display: "flex", flexDirection: "column", gap: 32 }}>
      <Appear at={t.bhangar}>
        <Row>
          <IconTile icon={ShieldCheck} tint={T.teal} size={96} />
          <Headline align="left" size={64} words={[["ভাঙার", t.bhangar], ["ভয়", t.bhoy], ["কম", t.kom, true]]} />
        </Row>
      </Appear>
      <Appear at={t.shipping}>
        <Row>
          <IconTile icon={Truck} tint={T.sky} size={96} />
          <MixLine align="left" size={64} words={[["Shipping", t.shipping, false, true], ["সহজ", t.sohoj, true]]} />
        </Row>
      </Appear>
    </div>
  </>
);

// ---------- 7. reason 4: no size trouble, fewer returns ----------

export const SizeScene: P<"size"> = ({ t }) => {
  const down = useProgress(t.ret, t.kom + 0.5);
  return (
    <>
      <ReasonDots current={4} at={t.start - 0.4} />
      <ReasonTitle n={4} at={t.start}>
        <MixLine align="left" size={92} words={[["Size|-এর", t.size, false, true], ["কোনো", t.kono], ["ঝামেলা", t.jhamela], ["নেই", t.nei, true]]} />
      </ReasonTitle>
      <Appear at={t.size} style={{ position: "absolute", left: 260, top: 470 }}>
        <Glass style={{ width: 520, height: 360, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Strike at={t.nei}>
            <Ruler size={230} color="#0D9488" strokeWidth={1.6} />
          </Strike>
        </Glass>
      </Appear>
      <Appear at={t.tai} style={{ position: "absolute", left: 920, top: 470 }}>
        <Glass style={{ width: 760, height: 360, padding: "34px 40px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <IconTile icon={RotateCcw} tint={T.orange} size={90} />
            <MixLine align="left" size={64} words={[["Return|-ও", t.ret, false, true], ["কম", t.kom, true]]} />
          </div>
          <svg width={680} height={170} viewBox="0 0 680 170">
            <path d="M10 30 C 160 40, 260 60, 360 100 S 560 150, 670 155" pathLength={1} fill="none" stroke="#22C55E" strokeWidth={9} strokeLinecap="round" strokeDasharray={1} strokeDashoffset={1 - down} />
          </svg>
        </Glass>
      </Appear>
    </>
  );
};

// ---------- 8. reason 5: looks great on camera ----------

export const PhotoScene: P<"photo"> = ({ t }) => {
  const { frame, f } = useTime();
  const flash = interpolate(frame, [f(t.chhobite), f(t.chhobite) + 3, f(t.chhobite) + 14], [0, 0.9, 0], clamp);
  return (
    <>
      <ReasonDots current={5} at={t.start - 0.4} />
      <ReasonTitle n={5} at={t.start}>
        <Headline align="left" size={96} words={[["ছবিতে", t.chhobite], ["দারুণ", t.darun, true], ["দেখায়", t.dekhay]]} />
      </ReasonTitle>
      <Appear at={t.start + 0.2} style={{ position: "absolute", left: 300, top: 400 }}>
        <Glass style={{ width: 380, height: 560, padding: 16, borderRadius: 56 }}>
          <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 42, overflow: "hidden", background: "linear-gradient(180deg, #F0FDF4, #DCFCE7)" }}>
            {null}
            {[0, 1].map((i) => (
              <div key={i} style={{ position: "absolute", zIndex: 1, left: i ? 230 : 30, top: i ? 410 : 50, width: 60, height: 60, borderLeft: i ? undefined : "5px solid #FFFFFF", borderTop: i ? undefined : "5px solid #FFFFFF", borderRight: i ? "5px solid #FFFFFF" : undefined, borderBottom: i ? "5px solid #FFFFFF" : undefined, borderRadius: 8 }} />
            ))}
            <Img src={staticFile("products/earrings-green.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "white", opacity: flash }} />
          </div>
          <Pop at={t.chhobite} style={{ position: "absolute", right: -40, top: -30 }}>
            <IconTile icon={Camera} tint={T.green} size={96} />
          </Pop>
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 860, top: 480, display: "flex", flexDirection: "column", gap: 32 }}>
        <Appear at={t.model}>
          <Row>
            <IconTile icon={UserX} tint={T.rose} size={96} />
            <MixLine align="left" size={62} words={[["Model", t.model, false, true], ["লাগে", t.lage], ["না", t.na, true]]} />
          </Row>
        </Appear>
        <Appear at={t.shudhu}>
          <Row>
            <IconTile icon={Play} tint={T.teal} size={96} />
            <MixLine align="left" size={56} style={{ flexWrap: "nowrap", whiteSpace: "nowrap" }} words={[["শুধু", t.shudhu], ["ফোনেই", t.phone, true], ["সুন্দর", t.sundor], ["Video", t.video, false, true]]} />
          </Row>
        </Appear>
      </div>
    </>
  );
};

// ---------- 9. you are the customer too ----------

export const YouScene: P<"you"> = ({ t }) => (
  <>
    <Headline style={{ position: "absolute", top: 110, left: 0, right: 0 }} size={56} words={[["সবচেয়ে", t.sobcheye], ["বড়", t.boro], ["কথা", t.kotha]]} />
    <Appear at={t.start} style={{ position: "absolute", left: 250, top: 300 }}>
      <Girl pose="phone" width={440} />
    </Appear>
    <Pop at={t.customer} style={{ position: "absolute", left: 600, top: 300 }}>
      <IconTile icon={Heart} tint={T.rose} size={100} />
    </Pop>
    <div style={{ position: "absolute", left: 860, top: 330 }}>
      <Headline align="left" size={84} words={[["আপনি", t.apni], ["নিজেও", t.nijeo], ["এর", t.er]]} />
      <MixLine align="left" size={150} words={[["Customer", t.customer, true, true]]} />
      <Headline align="left" size={52} style={{ marginTop: 30 }} words={[["কোনটা", t.konta], ["চলবে", t.cholbe]]} />
      <Headline align="left" size={68} words={[["আপনিই", t.apnii, true], ["সবচেয়ে", t.sobcheye2], ["ভালো", t.bhalo], ["বোঝেন", t.bojhen]]} />
    </div>
  </>
);

// ---------- 10. the worry: capital and stock ----------

const Worry: React.FC<{ at: number; x: number; icon: typeof Wallet; children: React.ReactNode }> = ({ at, x, icon, children }) => (
  <Appear at={at} style={{ position: "absolute", left: x - 360, top: 360 }}>
    <Glass style={{ width: 720, height: 440, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 34 }}>
      <IconTile icon={icon} tint={T.orange} size={170} />
      {children}
      <Pop at={at + 0.2} style={{ position: "absolute", right: -26, top: -26 }}>
        <div style={{ width: 96, height: 96, borderRadius: 99, background: "rgba(255,251,235,0.98)", boxShadow: "0 12px 28px rgba(180,83,9,0.2), 0 0 0 3px rgba(245,158,11,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircleHelp size={60} color="#F59E0B" strokeWidth={2.4} />
        </div>
      </Pop>
    </Glass>
  </Appear>
);

export const WorryScene: P<"worry"> = ({ t }) => (
  <>
    <Headline style={{ position: "absolute", top: 150, left: 0, right: 0 }} size={72} words={[["কিন্তু", t.start], ["ভাবছেন", t.bhabchhen]]} />
    <Worry at={t.puji} x={560} icon={Wallet}>
      <Headline size={60} style={{ whiteSpace: "nowrap" }} words={[["পুঁজি", t.puji], ["কোথায়", t.kothay], ["পাবেন?", t.paben]]} />
    </Worry>
    <Worry at={t.stock} x={1360} icon={Warehouse}>
      <MixLine size={60} style={{ flexWrap: "nowrap", whiteSpace: "nowrap" }} words={[["Stock", t.stock, false, true], ["রাখবেন", t.rakhben], ["কোথায়?", t.kothay2]]} />
    </Worry>
  </>
);

// ---------- 11. that worry is ours ----------

export const OursScene: P<"ours"> = ({ t }) => (
  <>
    <Headline style={{ position: "absolute", top: 100, left: 0, right: 0 }} size={100} words={[["সেই", t.start], ["চিন্তা", t.chinta], ["আমাদের", t.amader, true]]} />
    <Appear at={t.n270} style={{ position: "absolute", left: 150, top: 330 }}>
      <Glass style={{ width: 600, height: 520, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <IconTile icon={Package} tint={T.lime} size={120} />
        <GradText size={190}>
          <Counter from={t.n270} to={t.beshi} value={270} />+
        </GradText>
        <Headline size={56} words={[["পণ্য", t.ponno]]} />
      </Glass>
    </Appear>
    <div style={{ position: "absolute", left: 830, top: 330, display: "flex", flexDirection: "column", gap: 26 }}>
      {[
        { at: t.ready, icon: PackageCheck, tint: T.green, words: [["Ready", t.ready, false, true], ["Stock", t.stock, false, true]] as const, check: t.samlai },
        { at: t.delivery, icon: Truck, tint: T.sky, words: [["Delivery", t.delivery, false, true]] as const, check: t.samlai },
        { at: t.bikri, icon: GraduationCap, tint: T.teal, words: [["বিক্রি", t.bikri], ["শেখার", t.shekhar], ["Training", t.training, false, true]] as const, check: t.dii },
      ].map((r, i) => (
        <Appear key={i} at={r.at}>
          <Row width={900}>
            <IconTile icon={r.icon} tint={r.tint} size={100} />
            <MixLine align="left" size={60} words={r.words.map((w) => [...w] as [string, number, boolean?, boolean?])} />
            <Pop at={r.check} style={{ marginLeft: "auto" }}>
              <CheckBadge size={64} />
            </Pop>
          </Row>
        </Appear>
      ))}
    </div>
  </>
);

// ---------- 12. small thing, big profit ----------

export const TaglineScene: P<"tagline"> = ({ t }) => {
  const stack = useProgress(t.boro - 0.1, t.labh + 0.6, Easing.out(Easing.cubic));
  return (
    <>
      <Appear at={t.start} style={{ position: "absolute", left: 560 - 130, top: 300 }}>
        <Float amp={8}>
          <ProductPhoto src="products/earrings-green.jpg" size={260} radius={130} />
        </Float>
      </Appear>
      <div style={{ position: "absolute", left: 1360 - 60, top: 140, width: 120, height: 470 }}>
        {Array.from({ length: 7 }).map((_, i) => {
          const on = interpolate(stack, [i / 7, (i + 1) / 7], [0, 1], clamp);
          return <Coin key={i} size={120} style={{ position: "absolute", left: 0, bottom: i * 46 + (1 - on) * 60, opacity: on }} />;
        })}
      </div>
      <Headline style={{ position: "absolute", top: 680, left: 560 - 400, width: 800 }} size={110} words={[["ছোট", t.start], ["জিনিস", t.jinis]]} />
      <div style={{ position: "absolute", top: 650, left: 1360 - 400, width: 800, display: "flex", justifyContent: "center" }}>
        <HeroWord text="বড় লাভ" at={t.boro} size={150} />
      </div>
    </>
  );
};

// ---------- 13. call to action ----------

export const CtaScene: P<"cta"> = ({ t }) => (
  <>
    <Appear at={t.start} style={{ position: "absolute", top: 90, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", borderRadius: 999 }}>
        <GradPill size={64} icon={ArrowRight}>
          <Word text="আজই" at={t.start} style={{ color: "white", filter: "none" }} /> <Word text="শুরু" at={t.shuru} style={{ color: "white", filter: "none" }} /> <Word text="করুন" at={t.korun} style={{ color: "white", filter: "none" }} />
        </GradPill>
        <Sweep from={t.korun} to={t.korun + 1} />
      </div>
    </Appear>
    <MixLine
      style={{ position: "absolute", top: 270, left: 0, right: 0 }}
      size={76}
      words={[["নিজের", t.nijer], ["Fashion", t.fashion, true, true], ["Accessory", t.accessory, true, true], ["ব্যবসা", t.byabsa]]}
    />
    <Appear at={t.mudarabah} rise={60} style={{ position: "absolute", left: 960 - 130, top: 410 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={260} />
        <Sweep from={t.mudarabah + 0.2} to={t.mudarabah + 1.2} />
      </div>
    </Appear>
    <MixLine
      style={{ position: "absolute", top: 710, left: 0, right: 0 }}
      size={66}
      words={[["Mudarabah", t.mudarabah, false, true], ["Trade", t.trade, false, true], ["Limited|-এর", t.limited, false, true], ["সাথে", t.sathe]]}
    />
    <Appear at={t.sathe} style={{ position: "absolute", top: 840, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Pill icon={Globe} size={38}>
        <En weight={600}>uddoktajourney.com</En>
      </Pill>
    </Appear>
  </>
);
