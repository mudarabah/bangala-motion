// All 14 scenes of the "ideal e-commerce website" video, in voice order.
import React from "react";
import {
  ArrowRight,
  ChartColumn,
  Check,
  Code,
  Coins,
  Crown,
  Eye,
  FileText,
  Flag,
  Gem,
  Gift,
  Globe,
  GraduationCap,
  Handbag,
  Headset,
  Heart,
  LogOut,
  Megaphone,
  Package,
  Percent,
  Plus,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Star,
  Store,
  Target,
  Ticket,
  TrendingUp,
  Truck,
  User,
  Watch,
  X,
  Zap,
} from "lucide-react";
import { Easing, Img, interpolate, staticFile } from "remotion";
import { Appear, CheckBadge, Counter, Float, Glass, GradPill, Headline, IconTile, LogoCard, Pill, Pop, usePalette, useProgress, useTime, Word } from "../../components/kit";
import { greenIconTints as T } from "../../theme";
import { En, GradText, Skel, Strike } from "../../v2/ui";
import { Girl } from "../../v3/Girl";
import { HeroWord, Sweep } from "../../v4/parts";
import { MixLine, ReasonBadge, ReasonDots, Row } from "../../v5/parts";
import type { Timeline6 } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
type P<K extends keyof Timeline6> = React.FC<{ t: Timeline6[K] }>;
const WHITE = { color: "white", filter: "none" } as const;

// ---------- shared ----------

// A browser window in glass: three dots, an address bar, and content below.
const Browser: React.FC<{ width: number; height: number; children: React.ReactNode; dull?: number; style?: React.CSSProperties }> = ({
  width,
  height,
  children,
  dull = 0,
  style,
}) => {
  const pal = usePalette();
  return (
    <Glass style={{ width, height, padding: 0, overflow: "hidden", filter: dull ? `grayscale(${dull})` : undefined, ...style }}>
      <div style={{ height: 54, display: "flex", alignItems: "center", gap: 10, padding: "0 22px", borderBottom: `1px solid ${pal.lineSoft}`, background: "rgba(255,255,255,0.7)" }}>
        {["#F87171", "#FBBF24", "#34D399"].map((c) => (
          <div key={c} style={{ width: 14, height: 14, borderRadius: 99, background: c }} />
        ))}
        <div style={{ marginLeft: 18, flex: 1, height: 26, borderRadius: 13, background: pal.tintSoft, boxShadow: `inset 0 0 0 1px ${pal.lineSoft}` }} />
      </div>
      <div style={{ position: "relative", height: height - 54 }}>{children}</div>
    </Glass>
  );
};

// A real seller shop screenshot (public/products/site-*.jpg) in a glass phone frame,
// scrolling down slowly so it never sits still.
const PhoneShot: React.FC<{ src: string; width: number; height?: number; scroll?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({
  src,
  width,
  height = width * 1.94,
  scroll = 0,
  style,
  children,
}) => {
  const { frame } = useTime();
  const y = Math.min(frame, 240) * scroll;
  return (
    <Glass style={{ width, height, padding: 12, borderRadius: width * 0.13, ...style }}>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: width * 0.1, overflow: "hidden", background: "white" }}>
        <Img src={staticFile(src)} style={{ position: "absolute", left: 0, top: -y, width: "100%" }} />
        {children}
      </div>
    </Glass>
  );
};

const GOODS = [
  { i: Gem, t: T.teal },
  { i: Handbag, t: T.orange },
  { i: Watch, t: T.sky },
  { i: Shirt, t: T.lime },
  { i: ShoppingBag, t: T.rose },
  { i: Sparkles, t: T.green },
];

// A colourful shop page: banner, then a row of products (the first is the earring photo).
const ShopPage: React.FC<{ at: number; cols?: number; photo?: boolean }> = ({ at, cols = 3, photo = true }) => {
  const pal = usePalette();
  return (
    <div style={{ position: "absolute", inset: 0, padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <Appear at={at} rise={14}>
        <div style={{ height: 120, borderRadius: 22, background: "linear-gradient(120deg, #DCFCE7, #A7F3D0 60%, #FDE68A)", display: "flex", alignItems: "center", gap: 20, padding: "0 26px" }}>
          <IconTile icon={Store} tint={T.green} size={76} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Skel w={200} strong />
            <Skel w={130} />
          </div>
        </div>
      </Appear>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 18, flex: 1 }}>
        {Array.from({ length: cols }).map((_, k) => (
          <Pop key={k} at={at} delay={4 + k * 3}>
            <div style={{ height: "100%", minHeight: 150, borderRadius: 18, background: "white", boxShadow: `0 6px 16px rgba(${pal.shadowRgb},0.08)`, padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ flex: 1, borderRadius: 12, overflow: "hidden", background: pal.tintSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {photo && k === 0 ? (
                  <Img src={staticFile("products/earrings-green.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <IconTile icon={GOODS[k % GOODS.length].i} tint={GOODS[k % GOODS.length].t} size={64} />
                )}
              </div>
              <Skel w={90} strong />
            </div>
          </Pop>
        ))}
      </div>
    </div>
  );
};

// Progress dots + numbered badge + title for each of the eight features.
const Feature: React.FC<{ n: number; at: number; title: React.ReactNode }> = ({ n, at, title }) => (
  <>
    <ReasonDots current={n} at={at - 0.4} total={8} />
    <div style={{ position: "absolute", left: 140, top: 170, display: "flex", alignItems: "center", gap: 36 }}>
      <ReasonBadge n={n} at={at} size={130} />
      <div>{title}</div>
    </div>
  </>
);

const RIGHT: React.CSSProperties = { position: "absolute", left: 950, top: 400, display: "flex", flexDirection: "column", gap: 26 };

// ---------- 1. hook: the customer came, looked, and left ----------

export const HookScene: P<"hook"> = ({ t }) => {
  const enter = useProgress(t.start - 0.2, t.elo + 0.3, Easing.out(Easing.cubic));
  const leave = useProgress(t.chole, t.gelo + 0.5, Easing.in(Easing.cubic));
  const x = 1560 - 380 * enter - 1300 * leave;
  return (
    <>
      <MixLine
        style={{ position: "absolute", top: 90, left: 0, right: 0 }}
        size={76}
        words={[["Customer", t.start, false, true], ["এল", t.elo], ["দেখল", t.dekhlo], ["আর", t.ar], ["চলে", t.chole], ["গেল", t.gelo]]}
      />
      <Appear at={t.start} style={{ position: "absolute", left: 530, top: 240 }}>
        <Browser width={860} height={540} dull={0.85}>
          <ShopPage at={t.start} photo={false} />
        </Browser>
      </Appear>
      <div style={{ position: "absolute", left: x - 70, top: 420, opacity: 1 - leave }}>
        <div style={{ width: 140, height: 140, borderRadius: 99, background: "linear-gradient(160deg, #7DD3FC, #0284C7)", border: "5px solid white", boxShadow: "0 16px 36px rgba(2,132,199,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <User size={76} color="white" strokeWidth={2.2} />
        </div>
        <Pop at={t.dekhlo} style={{ position: "absolute", right: -30, top: -30 }}>
          <div style={{ width: 70, height: 70, borderRadius: 99, background: "white", boxShadow: "0 8px 20px rgba(20,83,45,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {leave > 0 ? <LogOut size={38} color="#E11D48" strokeWidth={2.4} /> : <Eye size={38} color="#0284C7" strokeWidth={2.4} />}
          </div>
        </Pop>
      </div>
      <div style={{ position: "absolute", top: 820, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <HeroWord text="কেন?" at={t.keno} size={130} />
      </div>
    </>
  );
};

// ---------- 2. a website is not enough; it must be ideal ----------

export const NotJustScene: P<"notJust"> = ({ t }) => (
  <>
    <MixLine
      style={{ position: "absolute", top: 110, left: 0, right: 0 }}
      size={76}
      words={[["শুধু", t.shudhu], ["Website", t.website, false, true], ["থাকলেই", t.thaklei], ["হয়", t.hoy], ["না", t.na]]}
    />
    <Appear at={t.website} style={{ position: "absolute", left: 230, top: 290 }}>
      <Browser width={620} height={420} dull={1} style={{ opacity: 0.8 }}>
        <ShopPage at={t.website} cols={3} photo={false} />
      </Browser>
      <Pop at={t.na} style={{ position: "absolute", right: -30, top: -30 }}>
        <div style={{ width: 90, height: 90, borderRadius: 99, background: "#FEE2E2", boxShadow: "0 10px 24px rgba(225,29,72,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <X size={54} color="#E11D48" strokeWidth={3} />
        </div>
      </Pop>
    </Appear>
    <Appear at={t.website2} style={{ position: "absolute", left: 1390 - 135, top: 230 }}>
      <PhoneShot src="products/site-mudarabah.jpg" width={270} scroll={0.5} />
      <Pop at={t.adorsho} style={{ position: "absolute", right: -44, top: -34 }}>
        <div style={{ width: 100, height: 100, borderRadius: 99, background: "linear-gradient(160deg, #FDE68A, #F59E0B)", boxShadow: "0 12px 28px rgba(245,158,11,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Star size={56} color="white" fill="white" strokeWidth={2} />
        </div>
      </Pop>
    </Appear>
    <MixLine
      style={{ position: "absolute", top: 800, left: 1070, width: 640 }}
      size={72}
      words={[["Website", t.website2, false, true], ["হতে", t.hote], ["হয়", t.hoy2]]}
    />
    <div style={{ position: "absolute", top: 875, left: 1070, width: 640, display: "flex", justifyContent: "center" }}>
      <HeroWord text="আদর্শ" at={t.adorsho} size={110} />
    </div>
  </>
);

// ---------- 3. what should an ideal site have, and what do ours have? ----------

export const LetsSeeScene: P<"letsSee"> = ({ t }) => (
  <>
    <MixLine
      style={{ position: "absolute", top: 170, left: 0, right: 0 }}
      size={84}
      words={[["একটা", t.ekta], ["আদর্শ", t.adorsho, true], ["E-commerce", t.ecommerce, false, true], ["Website|-এ", t.website, false, true]]}
    />
    <Headline style={{ position: "absolute", top: 290, left: 0, right: 0 }} size={84} words={[["কী", t.ki], ["কী", t.ki2], ["থাকা", t.thaka], ["দরকার", t.dorkar]]} />
    <div style={{ position: "absolute", top: 470, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 24 }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
        <ReasonBadge key={n} n={n} at={t.dorkar + 0.1 + n * 0.08} size={96} />
      ))}
    </div>
    <Appear at={t.ar} style={{ position: "absolute", top: 680, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Glass style={{ padding: "30px 50px", borderRadius: 999 }}>
        <MixLine
          size={58}
          words={[["আর", t.ar], ["আমাদের", t.amader], ["উদ্যোক্তাদের", t.uddokta, true], ["Website|-এ", t.website2, false, true], ["কী", t.ki3], ["আছে?", t.ache]]}
        />
      </Glass>
    </Appear>
  </>
);

// ---------- 4. (1) trust at first sight ----------

export const F1Scene: P<"f1"> = ({ t }) => (
  <>
    <Feature n={1} at={t.start} title={<Headline align="left" size={92} words={[["প্রথম", t.prothom], ["দেখাতেই", t.dekhatei], ["আস্থা", t.astha, true]]} />} />
    <Appear at={t.sundor} style={{ position: "absolute", left: 540, top: 430, transform: "rotate(4deg)" }}>
      <PhoneShot src="products/site-rupkar.jpg" width={290} scroll={0.6} />
    </Appear>
    <Appear at={t.prothom} style={{ position: "absolute", left: 190, top: 390, transform: "rotate(-4deg)" }}>
      <PhoneShot src="products/site-dotlife.jpg" width={300} scroll={0.4} />
      <Pop at={t.astha} style={{ position: "absolute", left: -30, top: -30 }}>
        <IconTile icon={ShieldCheck} tint={T.green} size={96} />
      </Pop>
      <Pop at={t.premium} style={{ position: "absolute", right: -34, top: -34 }}>
        <div style={{ width: 100, height: 100, borderRadius: 99, background: "linear-gradient(160deg, #FDE68A, #F59E0B)", boxShadow: "0 12px 28px rgba(245,158,11,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Crown size={54} color="white" strokeWidth={2.2} />
        </div>
      </Pop>
    </Appear>
    <div style={RIGHT}>
      <Appear at={t.sundor}>
        <Row>
          <IconTile icon={Sparkles} tint={T.teal} size={90} />
          <MixLine align="left" size={56} words={[["সুন্দর", t.sundor], ["পরিষ্কার", t.porishkar], ["Design", t.design, false, true]]} />
        </Row>
      </Appear>
      <Appear at={t.asol}>
        <Row>
          <IconTile icon={Store} tint={T.green} size={90} />
          <MixLine align="left" size={56} words={[["আসল", t.asol, true], ["Brand|-এর", t.brand, false, true], ["দোকান", t.dokan]]} />
        </Row>
      </Appear>
      <Appear at={t.nijer}>
        <Row>
          <IconTile icon={Crown} tint={T.orange} size={90} />
          <MixLine align="left" size={56} words={[["নিজের", t.nijer], ["নামে", t.name], ["Premium", t.premium, true, true]]} />
        </Row>
      </Appear>
    </div>
  </>
);

// ---------- 5. (2) a good product collection ----------

export const F2Scene: P<"f2"> = ({ t }) => {
  const added = useProgress(t.jog - 0.1, t.kora + 0.4);
  return (
    <>
      <Feature n={2} at={t.start} title={<MixLine align="left" size={88} words={[["ভালো", t.bhalo], ["Product", t.product, false, true], ["Collection", t.collection, true, true]]} />} />
      <Appear at={t.product} style={{ position: "absolute", left: 150, top: 400 }}>
        <Glass style={{ width: 720, padding: 30, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {Array.from({ length: 6 }).map((_, k) => (
            <Pop key={k} at={t.collection} delay={k * 3}>
              <div style={{ position: "relative", height: 200, borderRadius: 22, background: "white", boxShadow: "0 8px 20px rgba(20,83,45,0.08)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {k === 0 ? (
                  <Img src={staticFile("products/earrings-green.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <IconTile icon={GOODS[k].i} tint={GOODS[k].t} size={96} />
                )}
                <div style={{ position: "absolute", right: 10, top: 10, opacity: interpolate(added, [k / 6, (k + 1) / 6], [0, 1], clamp) }}>
                  <CheckBadge size={44} />
                </div>
              </div>
            </Pop>
          ))}
        </Glass>
      </Appear>
      <Appear at={t.n270} style={{ position: "absolute", left: 950, top: 390 }}>
        <Glass style={{ width: 820, padding: "30px 40px", display: "flex", alignItems: "center", gap: 30 }}>
          <GradText size={150}>
            <Counter from={t.n270} to={t.beshi} value={270} />+
          </GradText>
          <MixLine align="left" size={60} words={[["Product", t.product2, false, true]]} />
        </Glass>
      </Appear>
      <Appear at={t.sohoje} style={{ position: "absolute", left: 950, top: 680 }}>
        <Row width={820}>
          <div style={{ width: 90, height: 90, borderRadius: 26, background: "linear-gradient(160deg, #4ADE80, #16A34A)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${1 + 0.12 * Math.sin(added * Math.PI)})` }}>
            <Plus size={54} color="white" strokeWidth={3} />
          </div>
          <MixLine align="left" size={56} words={[["নিজের", t.nijer], ["Shop|-এ", t.shop, false, true], ["যোগ", t.jog, true], ["করা", t.kora]]} />
        </Row>
      </Appear>
    </>
  );
};

// ---------- 6. (3) easy ordering ----------

export const F3Scene: P<"f3"> = ({ t }) => {
  const { frame, f } = useTime();
  const taps = [t.koyek, t.tap, t.order2];
  const done = useProgress(t.paren - 0.1, t.paren + 0.3);
  return (
    <>
      <Feature n={3} at={t.start} title={<MixLine align="left" size={92} words={[["সহজে", t.sohoje, true], ["Order", t.order, false, true], ["করা", t.kora]]} />} />
      <Appear at={t.sohoje} style={{ position: "absolute", left: 330, top: 360 }}>
        <Glass style={{ width: 360, height: 640, padding: 16, borderRadius: 56 }}>
          <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 42, overflow: "hidden", background: "linear-gradient(180deg, #FFFFFF, #F0FAF3)" }}>
            <Img src={staticFile("products/site-mudarabah-card.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            {taps.map((at, i) => {
              const r = interpolate(frame, [f(at), f(at) + 14], [0, 1], clamp);
              if (r <= 0 || r >= 1) return null;
              return <div key={i} style={{ position: "absolute", left: 236 - 60 * r, top: 541 - 60 * r, width: 120 * r, height: 120 * r, borderRadius: 99, border: "6px solid rgba(124,58,237,0.75)", background: "rgba(124,58,237,0.12)", opacity: 1 - r }} />;
            })}
            <div style={{ position: "absolute", inset: 0, background: "rgba(240,253,244,0.92)", opacity: done, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ transform: `scale(${0.6 + 0.4 * done})` }}>
                <CheckBadge size={150} />
              </div>
            </div>
          </div>
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 900, top: 450 }}>
        <MixLine align="left" size={120} words={[["কয়েক", t.koyek], ["Tap|-এই", t.tap, true, true]]} />
        <MixLine align="left" size={64} style={{ marginTop: 26 }} words={[["Customer", t.customer, false, true], ["Order", t.order2, false, true], ["করতে", t.korte], ["পারেন", t.paren]]} />
      </div>
    </>
  );
};

// ---------- 7. (4) encouraging bigger orders ----------

export const F4Scene: P<"f4"> = ({ t }) => {
  const glow = useProgress(t.milestone - 0.1, t.milestone + 0.4) * (1 - 0.5 * useProgress(t.minimum, t.minimum + 0.5));
  return (
    <>
      <Feature
        n={4}
        at={t.start}
        title={<MixLine align="left" size={76} words={[["Customer|-কে", t.customer, false, true], ["আরও", t.aro], ["কিনতে", t.kinte], ["উৎসাহ", t.utsaho, true]]} />}
      />
      <Appear at={t.website} style={{ position: "absolute", left: 150, top: 400 }}>
        <Glass style={{ width: 720, padding: 12, borderRadius: 34 }}>
          <div style={{ position: "relative", borderRadius: 24, overflow: "hidden" }}>
            <Img src={staticFile("products/site-rupkar-top.jpg")} style={{ width: "100%", display: "block" }} />
            {/* the "৳500+ / ৳1,000+ surprise gift" milestone strip glows when it is named */}
            <div style={{ position: "absolute", left: 0, right: 0, top: "38%", height: "15%", boxShadow: `inset 0 0 0 ${6 * glow}px rgba(250,204,21,0.95), 0 0 ${40 * glow}px rgba(250,204,21,${0.8 * glow})` }} />
          </div>
        </Glass>
        <Pop at={t.milestone} style={{ position: "absolute", right: -30, top: 150 }}>
          <IconTile icon={Gift} tint={T.orange} size={96} />
        </Pop>
      </Appear>
      <div style={RIGHT}>
        <Appear at={t.milestone}>
          <Row>
            <IconTile icon={Flag} tint={T.orange} size={90} />
            <MixLine align="left" size={58} words={[["Milestone", t.milestone, false, true], ["Bar", t.bar, false, true]]} />
          </Row>
        </Appear>
        <Appear at={t.minimum}>
          <Row>
            <IconTile icon={SlidersHorizontal} tint={T.teal} size={90} />
            <MixLine align="left" size={58} words={[["Minimum", t.minimum, false, true], ["Order", t.order, false, true], ["Setting", t.setting, false, true]]} />
          </Row>
        </Appear>
        <Appear at={t.ordarer}>
          <Row>
            <IconTile icon={TrendingUp} tint={T.green} size={90} />
            <MixLine align="left" size={58} words={[["Order|-এর", t.ordarer, false, true], ["আকার", t.akar], ["বাড়ে", t.bare, true]]} />
          </Row>
        </Appear>
      </div>
    </>
  );
};

// ---------- 8. (5) offers and discounts ----------

export const F5Scene: P<"f5"> = ({ t }) => (
  <>
    <Feature n={5} at={t.start} title={<MixLine align="left" size={92} words={[["Offer", t.offer, false, true], ["আর", t.ar], ["Discount", t.discount, true, true]]} />} />
    <Appear at={t.offer} style={{ position: "absolute", left: 200, top: 430 }}>
      <div style={{ transform: "rotate(-6deg)" }}>
        <Glass style={{ width: 620, height: 340, padding: 0, display: "flex", overflow: "hidden" }}>
          <div style={{ width: 230, background: "linear-gradient(160deg, #4ADE80, #0D9488)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Percent size={130} color="white" strokeWidth={2.4} />
          </div>
          <div style={{ flex: 1, borderLeft: "4px dashed rgba(22,163,74,0.35)", padding: 40, display: "flex", flexDirection: "column", justifyContent: "center", gap: 22 }}>
            <Skel w={220} strong />
            <Skel w={160} />
            <div style={{ marginTop: 10, height: 60, borderRadius: 14, border: "3px dashed rgba(22,163,74,0.5)", background: "rgba(240,253,244,0.8)" }} />
          </div>
          <Sweep from={t.coupon} to={t.coupon + 1} />
        </Glass>
      </div>
    </Appear>
    <div style={RIGHT}>
      <Appear at={t.nijer}>
        <Row>
          <IconTile icon={Ticket} tint={T.green} size={90} />
          <MixLine align="left" size={56} words={[["নিজের", t.nijer], ["Coupon", t.coupon, true, true], ["বানানো", t.banano]]} />
        </Row>
      </Appear>
      <Appear at={t.company}>
        <Row>
          <IconTile icon={Megaphone} tint={T.orange} size={90} />
          <div>
            <MixLine align="left" size={46} words={[["Company|-র", t.company, false, true], ["Campaign", t.campaign, false, true]]} />
            <MixLine align="left" size={46} words={[["খরচ", t.khoroch], ["Company", t.company2, false, true], ["দেয়", t.dey, true]]} />
          </div>
        </Row>
      </Appear>
      <Appear at={t.apnar}>
        <Row>
          <IconTile icon={ShieldCheck} tint={T.teal} size={90} />
          <Headline align="left" size={56} words={[["আপনার", t.apnar], ["লাভ", t.labh, true], ["কমে", t.kome], ["না", t.na]]} />
        </Row>
      </Appear>
    </div>
  </>
);

// ---------- 9. (6) every taka of ad spend accounted for ----------

export const F6Scene: P<"f6"> = ({ t }) => {
  const hit = useProgress(t.sothik - 0.3, t.sothik + 0.2, Easing.in(Easing.cubic));
  const { frame, f } = useTime();
  const ring = interpolate(frame, [f(t.sothik) + 4, f(t.sothik) + 24], [0, 1], clamp);
  return (
    <>
      <Feature
        n={6}
        at={t.start}
        title={<MixLine align="left" size={84} words={[["Ad|-এর", t.ad, false, true], ["প্রতিটা", t.protita], ["টাকার", t.takar], ["হিসাব", t.hisab, true]]} />}
      />
      <Appear at={t.ad} style={{ position: "absolute", left: 230, top: 400 }}>
        <div style={{ position: "relative", width: 520, height: 520 }}>
          {[1, 0.74, 0.48, 0.22].map((s, i) => (
            <div key={i} style={{ position: "absolute", left: 260 - 260 * s, top: 260 - 260 * s, width: 520 * s, height: 520 * s, borderRadius: 999, background: i % 2 ? "rgba(255,255,255,0.95)" : "linear-gradient(160deg, #BBF7D0, #4ADE80)", boxShadow: i === 0 ? "0 24px 60px rgba(20,83,45,0.16)" : undefined }} />
          ))}
          {ring > 0 && ring < 1 ? <div style={{ position: "absolute", left: 260 - 200 * ring, top: 260 - 200 * ring, width: 400 * ring, height: 400 * ring, borderRadius: 999, border: "6px solid rgba(255,255,255,0.9)", opacity: 1 - ring }} /> : null}
          <div style={{ position: "absolute", left: 260 + 420 * (1 - hit) - 50, top: 260 - 300 * (1 - hit) - 50, opacity: Math.min(1, hit * 4) }}>
            <IconTile icon={Megaphone} tint={T.orange} size={100} />
          </div>
          <Pop at={t.customer} style={{ position: "absolute", left: 210, top: 210 }}>
            <div style={{ width: 100, height: 100, borderRadius: 99, background: "linear-gradient(160deg, #7DD3FC, #0284C7)", border: "5px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <User size={54} color="white" strokeWidth={2.4} />
            </div>
          </Pop>
        </div>
      </Appear>
      <div style={RIGHT}>
        {[
          { at: t.pixel, icon: Target, tint: T.rose, words: [["Pixel", t.pixel, false, true]] },
          { at: t.facebook, icon: ShoppingBag, tint: T.sky, words: [["Facebook", t.facebook, false, true], ["Catalog", t.catalog, false, true]] },
          { at: t.server, icon: ChartColumn, tint: T.teal, words: [["Server-side", t.server, false, true], ["Tracking", t.tracking, false, true]] },
        ].map((r, i) => (
          <Appear key={i} at={r.at}>
            <Row>
              <IconTile icon={r.icon} tint={r.tint} size={84} />
              <MixLine align="left" size={54} words={r.words as [string, number, boolean, boolean][]} />
              <Pop at={t.setup} style={{ marginLeft: "auto" }}>
                <CheckBadge size={58} />
              </Pop>
            </Row>
          </Appear>
        ))}
        <MixLine align="left" size={60} style={{ marginTop: 6 }} words={[["সঠিক", t.sothik, true], ["Customer|-এর", t.customer, false, true], ["কাছে", t.kachhe]]} />
      </div>
    </>
  );
};

// ---------- 10. (7) automatic delivery ----------

export const F7Scene: P<"f7"> = ({ t }) => {
  const pal = usePalette();
  const fillRows = useProgress(t.data, t.automatic + 0.8);
  const toggle = useProgress(t.automatic - 0.15, t.automatic + 0.2);
  return (
    <>
      <Feature n={7} at={t.start} title={<MixLine align="left" size={92} words={[["স্বয়ংক্রিয়", t.swoyonkriyo, true], ["Delivery", t.delivery, false, true]]} />} />
      <Appear at={t.courier} style={{ position: "absolute", left: 150, top: 400 }}>
        <Glass style={{ width: 720, padding: "34px 40px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <IconTile icon={FileText} tint={T.green} size={70} />
            <Skel w={220} strong />
            <div style={{ marginLeft: "auto", width: 110, height: 58, borderRadius: 29, background: toggle > 0.5 ? "linear-gradient(90deg, #16A34A, #22C55E)" : pal.lineStrong, position: "relative" }}>
              <div style={{ position: "absolute", top: 6, left: 6 + 52 * toggle, width: 46, height: 46, borderRadius: 99, background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Zap size={26} color={toggle > 0.5 ? "#16A34A" : pal.inkMuted} strokeWidth={2.6} />
              </div>
            </div>
          </div>
          {Array.from({ length: 5 }).map((_, i) => {
            const on = interpolate(fillRows, [i / 5, (i + 1) / 5], [0, 1], clamp);
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 18px", borderRadius: 14, background: pal.tintSoft }}>
                <Skel w={160} strong p={on} />
                <Skel w={120} p={on} />
                <div style={{ marginLeft: "auto", opacity: on }}>
                  <Check size={32} color="#16A34A" strokeWidth={3} />
                </div>
              </div>
            );
          })}
        </Glass>
      </Appear>
      <div style={RIGHT}>
        <Appear at={t.courier}>
          <Row>
            <IconTile icon={FileText} tint={T.sky} size={90} />
            <MixLine
              align="left"
              size={52}
              words={[["Courier|-এ", t.courier, false, true], ["Data", t.data, false, true], ["Entry", t.entry, false, true], ["Automatic", t.automatic, true, true]]}
            />
          </Row>
        </Appear>
        <Appear at={t.packaging}>
          <Row>
            <IconTile icon={Package} tint={T.lime} size={90} />
            <MixLine align="left" size={52} words={[["Packaging", t.packaging, false, true], ["আর", t.ar], ["Delivery", t.delivery2, false, true]]} />
          </Row>
        </Appear>
        <Appear at={t.amrai}>
          <Row>
            <IconTile icon={Truck} tint={T.green} size={90} />
            <Headline align="left" size={60} words={[["আমরাই", t.amrai, true], ["সামলাই", t.samlai]]} />
          </Row>
        </Appear>
      </div>
    </>
  );
};

// ---------- 11. (8) clear accounts ----------

export const F8Scene: P<"f8"> = ({ t }) => {
  const sales = useProgress(t.bikri, t.holo + 0.6, Easing.out(Easing.cubic));
  const profit = useProgress(t.labh, t.holo2 + 0.6, Easing.out(Easing.cubic));
  const Stat: React.FC<{ icon: typeof Coins; tint: [string, string]; p: number; at: number; heights: number[] }> = ({ icon, tint, p, at, heights }) => (
    <Appear at={at} style={{ flex: 1 }}>
      <div style={{ height: 380, borderRadius: 26, background: "white", boxShadow: "0 8px 20px rgba(20,83,45,0.08)", padding: 26, display: "flex", flexDirection: "column", gap: 20 }}>
        <IconTile icon={icon} tint={tint} size={76} />
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 14 }}>
          {heights.map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h * 100 * interpolate(p, [i * 0.12, i * 0.12 + 0.5], [0, 1], clamp)}%`, borderRadius: 10, background: `linear-gradient(180deg, ${tint[0]}, ${tint[1]})` }} />
          ))}
        </div>
      </div>
    </Appear>
  );
  return (
    <>
      <Feature n={8} at={t.start} title={<Headline align="left" size={92} words={[["পরিষ্কার", t.porishkar, true], ["হিসাব", t.hisab]]} />} />
      <Appear at={t.porishkar} style={{ position: "absolute", left: 150, top: 400 }}>
        <Glass style={{ width: 720, padding: 30, display: "flex", gap: 24 }}>
          <Stat icon={ChartColumn} tint={T.teal} p={sales} at={t.bikri} heights={[0.4, 0.55, 0.5, 0.75, 0.95]} />
          <Stat icon={Coins} tint={T.orange} p={profit} at={t.labh} heights={[0.3, 0.45, 0.4, 0.6, 0.8]} />
        </Glass>
      </Appear>
      <div style={{ ...RIGHT, top: 430, gap: 20 }}>
        <Headline align="left" size={72} words={[["কত", t.koto], ["বিক্রি", t.bikri], ["হলো", t.holo]]} />
        <Headline align="left" size={72} words={[["কত", t.koto2], ["লাভ", t.labh, true], ["হলো", t.holo2]]} />
        <Appear at={t.sob} style={{ marginTop: 20 }}>
          <Glass style={{ display: "inline-flex", padding: "20px 34px", borderRadius: 999, alignItems: "center", gap: 20 }}>
            <IconTile icon={Check} tint={T.green} size={64} />
            <Headline align="left" size={60} words={[["সব", t.sob], ["এক", t.ek], ["জায়গায়", t.jaygay, true]]} />
          </Glass>
        </Appear>
      </div>
    </>
  );
};

// ---------- 12. you are never alone ----------

export const SupportScene: P<"support"> = ({ t }) => (
  <>
    <Appear at={t.start} style={{ position: "absolute", left: 200, top: 330 }}>
      <Girl pose="relaxed" width={440} />
    </Appear>
    <Pop at={t.mentor} style={{ position: "absolute", left: 600, top: 330 }}>
      <IconTile icon={Headset} tint={T.teal} size={110} />
    </Pop>
    <div style={{ position: "absolute", left: 860, top: 250 }}>
      <Headline align="left" size={92} style={{ flexWrap: "nowrap", whiteSpace: "nowrap" }} words={[["আপনি", t.apni], ["কখনো", t.kokhono], ["একা", t.eka], ["নন", t.non, true]]} />
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 40 }}>
        <Appear at={t.training}>
          <Row width={860}>
            <IconTile icon={GraduationCap} tint={T.green} size={90} />
            <MixLine align="left" size={58} words={[["Training", t.training, false, true]]} />
          </Row>
        </Appear>
        <Appear at={t.mentor}>
          <Row width={860}>
            <IconTile icon={Headset} tint={T.teal} size={90} />
            <MixLine align="left" size={58} words={[["Mentor|-এর", t.mentor, false, true], ["Support", t.support, false, true]]} />
          </Row>
        </Appear>
        <Appear at={t.sobsomoy}>
          <Pill icon={Heart} size={46}>
            <Word text="সবসময়" at={t.sobsomoy} /> <Word text="সাথে" at={t.sathe} /> <Word text="আছে" at={t.ache} />
          </Pill>
        </Appear>
      </div>
    </div>
  </>
);

// ---------- 13. your own ideal site, no coding ----------

export const IdealScene: P<"ideal"> = ({ t }) => (
  <>
    <MixLine
      style={{ position: "absolute", top: 90, left: 0, right: 0 }}
      size={74}
      words={[["আপনার", t.start], ["নিজের", t.nijer], ["আদর্শ", t.adorsho, true], ["E-commerce", t.ecommerce, false, true], ["Website", t.website, false, true]]}
    />
    {[
      { src: "products/site-dotlife.jpg", x: 600, rot: -6, top: 250, at: t.start + 0.15 },
      { src: "products/site-rupkar.jpg", x: 1320, rot: 6, top: 250, at: t.start + 0.3 },
      { src: "products/site-mudarabah.jpg", x: 960, rot: 0, top: 210, at: t.start },
    ].map((p, i) => (
      <Appear key={i} at={p.at} style={{ position: "absolute", left: p.x - 150, top: p.top, transform: `rotate(${p.rot}deg)` }}>
        <div style={{ position: "relative", borderRadius: 40 }}>
          <PhoneShot src={p.src} width={300} height={i === 2 ? 600 : 560} scroll={0.35} />
          {i === 2 ? <Sweep from={t.adorsho} to={t.adorsho + 1.1} /> : null}
        </div>
      </Appear>
    ))}
    <Appear at={t.kono} style={{ position: "absolute", top: 840, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Glass style={{ padding: "18px 40px", borderRadius: 999, display: "flex", alignItems: "center", gap: 24 }}>
        <Code size={52} color="#0D9488" strokeWidth={2.4} />
        <MixLine size={60} words={[["কোনো", t.kono]]} />
        <Strike at={t.chhara}>
          <MixLine size={60} words={[["Coding", t.coding, false, true]]} />
        </Strike>
        <MixLine size={60} words={[["ছাড়াই", t.chhara, true]]} />
      </Glass>
    </Appear>
  </>
);

// ---------- 14. call to action ----------

export const CtaScene: P<"cta"> = ({ t }) => (
  <>
    <Appear at={t.start} style={{ position: "absolute", top: 120, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", borderRadius: 999 }}>
        <GradPill size={68} icon={ArrowRight}>
          <Word text="আজই" at={t.start} style={WHITE} /> <Word text="শুরু" at={t.shuru} style={WHITE} /> <Word text="করুন" at={t.korun} style={WHITE} />
        </GradPill>
        <Sweep from={t.korun} to={t.korun + 1} />
      </div>
    </Appear>
    <Appear at={t.mudarabah} rise={60} style={{ position: "absolute", left: 960 - 140, top: 330 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={280} />
        <Sweep from={t.mudarabah + 0.2} to={t.mudarabah + 1.2} />
      </div>
    </Appear>
    <MixLine
      style={{ position: "absolute", top: 660, left: 0, right: 0 }}
      size={68}
      words={[["Mudarabah", t.mudarabah, false, true], ["Trade", t.trade, false, true], ["Limited|-এর", t.limited, false, true], ["সাথে", t.sathe]]}
    />
    <Appear at={t.sathe} style={{ position: "absolute", top: 800, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Pill icon={Globe} size={40}>
        <En weight={600}>uddoktajourney.com</En>
      </Pill>
    </Appear>
  </>
);
