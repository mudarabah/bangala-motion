// All 18 scenes of the "Facebook page is a rented house, a website is your own home" video.
import React from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Building2,
  Code,
  Coins,
  Crown,
  Database,
  DoorOpen,
  Eye,
  Globe,
  House,
  KeyRound,
  Link,
  Lock,
  Megaphone,
  MessageCircle,
  Moon,
  Palette,
  Repeat,
  Scale,
  Search,
  Send,
  Server,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
  Sunrise,
  TriangleAlert,
  User,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { Easing, Img, interpolate, staticFile } from "remotion";
import { Appear, CheckBadge, Float, Glass, GradPill, Headline, IconTile, LogoCard, Pill, Pop, usePalette, useProgress, useTime, Word } from "../../components/kit";
import { fonts, greenIconTints as T } from "../../theme";
import { En, Skel, Strike } from "../../v2/ui";
import { Sweep } from "../../v4/parts";
import { MixLine, ReasonBadge, ReasonDots, Row } from "../../v5/parts";
import type { Timeline9 } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
type P<K extends keyof Timeline9> = React.FC<{ t: Timeline9[K] }>;
type MS = [string, number, boolean?, boolean?];
const WHITE = { color: "white", filter: "none" } as const;
const ROSE = "#E11D48";
const AMBER: [string, string] = ["#FDE68A", "#F59E0B"];
const BN = ["১", "২", "৩", "৪", "৫", "৬", "৭"];

// ---------- shared ----------

const Tinted: React.FC<{ words: [string, number][]; size: number; color: string; align?: "left" | "center"; style?: React.CSSProperties }> = ({ words, size, color, align = "left", style }) => (
  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: align === "center" ? "center" : "flex-start", columnGap: size * 0.26, fontFamily: fonts.display, fontWeight: 800, fontSize: size, lineHeight: 1.15, ...style }}>
    {words.map(([w, at], i) => (
      <Word key={i} text={w} at={at} style={{ color }} />
    ))}
  </div>
);

// A screenshot in a glass phone frame, scrolling slowly; `dim` greys it out and locks it.
const PhoneShot: React.FC<{ src: string; width: number; height: number; scroll?: number; dim?: number; children?: React.ReactNode }> = ({ src, width, height, scroll = 0, dim = 0, children }) => {
  const { frame } = useTime();
  const y = Math.min(frame, 240) * scroll;
  return (
    <Glass style={{ width, height, padding: 12, borderRadius: width * 0.12 }}>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: width * 0.09, overflow: "hidden", background: "white" }}>
        <Img src={staticFile(src)} style={{ position: "absolute", left: 0, top: -y, width: "100%", filter: `grayscale(${dim}) brightness(${1 - 0.15 * dim})` }} />
        {dim > 0 ? (
          <div style={{ position: "absolute", inset: 0, background: `rgba(51,65,85,${0.45 * dim})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 130, height: 130, borderRadius: 99, background: "white", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${0.6 + 0.4 * dim})`, opacity: dim }}>
              <Lock size={70} color="#334155" strokeWidth={2.4} />
            </div>
          </div>
        ) : null}
        {children}
      </div>
    </Glass>
  );
};

// Numbered benefit header (progress dots + badge + title).
const Benefit: React.FC<{ n: number; at: number; children: React.ReactNode }> = ({ n, at, children }) => (
  <>
    <ReasonDots current={n} at={at - 0.4} total={7} />
    <div style={{ position: "absolute", left: 140, top: 160, display: "flex", alignItems: "center", gap: 34 }}>
      <ReasonBadge n={n} at={at} size={120} />
      <div>{children}</div>
    </div>
  </>
);

// Numbered drawback header in amber, labelled "অসুবিধা".
const Drawback: React.FC<{ n: number; at: number; children: React.ReactNode }> = ({ n, at, children }) => (
  <div style={{ position: "absolute", left: 140, top: 110, display: "flex", alignItems: "center", gap: 34 }}>
    <Pop at={at}>
      <div style={{ width: 120, height: 120, borderRadius: 99, background: "linear-gradient(160deg, #FCD34D, #D97706)", boxShadow: "0 16px 36px rgba(217,119,6,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fonts.display, fontWeight: 800, fontSize: 72, color: "white", paddingTop: 6 }}>
        {BN[n - 1]}
      </div>
    </Pop>
    <div>
      <Appear at={at} rise={10}>
        <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 34, color: "#B45309" }}>অসুবিধা</div>
      </Appear>
      {children}
    </div>
  </div>
);

// Green "answer" strip: shield + content.
const Answer: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, children, style }) => (
  <Appear at={at} style={style}>
    <Glass active={1} style={{ padding: "22px 34px", display: "flex", alignItems: "center", gap: 24 }}>
      <IconTile icon={ShieldCheck} tint={T.green} size={84} />
      <div>{children}</div>
    </Glass>
  </Appear>
);

const RIGHT: React.CSSProperties = { position: "absolute", left: 960, top: 380, display: "flex", flexDirection: "column", gap: 24 };

// ---------- 1. hook: one morning the page is gone ----------

export const HookScene: P<"hook"> = ({ t }) => {
  const off = useProgress(t.bondho - 0.1, t.bondho + 0.4);
  const gone = useProgress(t.ek, t.shesh + 0.4);
  return (
    <>
      <Pop at={t.sokale} style={{ position: "absolute", left: 200, top: 120 }}>
        <IconTile icon={Sunrise} tint={AMBER} size={110} />
      </Pop>
      <Appear at={t.apnar} style={{ position: "absolute", left: 360, top: 200 }}>
        <PhoneShot src="products/jk-page.jpg" width={400} height={760} dim={off} />
      </Appear>
      <div style={{ position: "absolute", left: 900, top: 230 }}>
        <Headline align="left" size={56} words={[["এক", t.start], ["সকালে", t.sokale], ["ঘুম", t.ghum], ["ভেঙে", t.bhenge], ["দেখলেন", t.dekhlen]]} />
        <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginTop: 10 }}>
          <MixLine align="left" size={74} words={[["Facebook", t.facebook, false, true], ["Page", t.page, false, true]]} />
          <Tinted size={96} color={ROSE} words={[["বন্ধ", t.bondho]]} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 30 }}>
          {[
            { at: t.sob, icon: Users, words: [["সব", t.sob], ["Customer", t.customer, false, true]] as MS[] },
            { at: t.sob2, icon: ShoppingCart, words: [["সব", t.sob2], ["Order", t.order, false, true]] as MS[] },
          ].map((r, i) => (
            <Appear key={i} at={r.at}>
              <div style={{ opacity: 1 - 0.6 * gone, filter: `grayscale(${gone})` }}>
                <Row width={620}>
                  <IconTile icon={r.icon} tint={T.sky} size={80} />
                  <Strike at={t.shesh}>
                    <MixLine align="left" size={56} words={r.words} />
                  </Strike>
                </Row>
              </div>
            </Appear>
          ))}
        </div>
        <Tinted size={64} color={ROSE} style={{ marginTop: 26 }} words={[["এক", t.ek], ["মুহূর্তে", t.muhurte], ["শেষ", t.shesh]]} />
      </div>
    </>
  );
};

// ---------- 2. is your business standing on one page? ----------

export const QuestionScene: P<"question"> = ({ t }) => {
  const { frame } = useTime();
  const wobble = Math.sin(frame / 7) * 4 * useProgress(t.page, t.dariye + 0.4);
  return (
    <>
      <MixLine style={{ position: "absolute", top: 110, left: 0, right: 0 }} size={74} words={[["আপনার", t.start], ["ব্যবসা", t.byabsa, true], ["কি", t.ki], ["শুধু", t.shudhu], ["একটা", t.ekta]]} />
      <MixLine style={{ position: "absolute", top: 210, left: 0, right: 0 }} size={74} words={[["Page|-এর", t.page, false, true], ["উপর", t.upor], ["দাঁড়িয়ে", t.dariye], ["আছে?", t.ache]]} />
      <Appear at={t.byabsa} style={{ position: "absolute", left: 960 - 180, top: 360 }}>
        <div style={{ transform: `rotate(${wobble}deg)`, transformOrigin: "50% 100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Glass style={{ width: 360, height: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconTile icon={Store} tint={T.green} size={150} />
          </Glass>
          <div style={{ width: 34, height: 280, background: "linear-gradient(180deg, #93C5FD, #2563EB)", borderRadius: 10 }} />
          <Appear at={t.page} rise={10}>
            <div style={{ marginTop: -170, padding: "6px 16px", borderRadius: 12, background: "white", fontFamily: fonts.ui, fontWeight: 700, fontSize: 28, color: "#1D4ED8", boxShadow: "0 6px 16px rgba(37,99,235,0.2)" }}>Page</div>
          </Appear>
        </div>
      </Appear>
    </>
  );
};

// ---------- 3. a Facebook page is a rented house ----------

export const RentScene: P<"rent"> = ({ t }) => (
  <>
    <MixLine style={{ position: "absolute", top: 100, left: 0, right: 0 }} size={80} words={[["Facebook", t.start, false, true], ["Page", t.page, false, true], ["হলো", t.holo], ["ভাড়া", t.bhara, true], ["বাসা", t.basa, true]]} />
    <Appear at={t.bhara} style={{ position: "absolute", left: 220, top: 300 }}>
      <Glass style={{ position: "relative", width: 560, height: 600, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30 }}>
        <Float amp={6}>
          <IconTile icon={Building2} tint={T.sky} size={220} />
        </Float>
        <div style={{ padding: "10px 30px", borderRadius: 999, background: "rgba(254,243,199,0.95)", fontFamily: fonts.display, fontWeight: 800, fontSize: 52, color: "#92400E" }}>ভাড়া বাসা</div>
        <Pop at={t.chharun} style={{ position: "absolute", right: -30, top: -30 }}>
          <div style={{ width: 110, height: 110, borderRadius: 99, background: "#FFE4E6", boxShadow: "0 10px 24px rgba(225,29,72,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <DoorOpen size={60} color={ROSE} strokeWidth={2.4} />
          </div>
        </Pop>
      </Glass>
    </Appear>
    <div style={{ ...RIGHT, left: 900, top: 300 }}>
      <Appear at={t.sajate}>
        <Row width={860}>
          <IconTile icon={Sparkles} tint={T.teal} size={80} />
          <Headline align="left" size={52} words={[["সাজাতে", t.sajate], ["পারবেন", t.parben]]} />
          <Pop at={t.parben} style={{ marginLeft: "auto" }}>
            <CheckBadge size={56} />
          </Pop>
        </Row>
      </Appear>
      <Appear at={t.thakte}>
        <Row width={860}>
          <IconTile icon={House} tint={T.green} size={80} />
          <Headline align="left" size={52} words={[["থাকতে", t.thakte], ["পারবেন", t.parben2]]} />
          <Pop at={t.parben2} style={{ marginLeft: "auto" }}>
            <CheckBadge size={56} />
          </Pop>
        </Row>
      </Appear>
      <Appear at={t.kintu}>
        <Row width={860} style={{ background: "rgba(255,251,235,0.95)" }}>
          <IconTile icon={Scale} tint={AMBER} size={80} />
          <Headline align="left" size={50} words={[["নিয়ম", t.niyom], ["ঠিক", t.thik], ["করে", t.kore], ["বাড়িওয়ালা", t.bariwala, true]]} />
        </Row>
      </Appear>
      <Appear at={t.jekono}>
        <Row width={860} style={{ background: "rgba(255,241,242,0.95)" }}>
          <IconTile icon={DoorOpen} tint={T.rose} size={80} />
          <div>
            <Headline align="left" size={42} style={{ fontWeight: 600 }} words={[["যেকোনো", t.jekono], ["দিন", t.din], ["বলতে", t.bolte], ["পারে", t.pare]]} />
            <Tinted size={56} color={ROSE} words={[["বাসা", t.basa2], ["ছাড়ুন", t.chharun]]} />
          </div>
        </Row>
      </Appear>
    </div>
  </>
);

// ---------- 4. a website is your own home ----------

export const OwnScene: P<"own"> = ({ t }) => (
  <>
    <MixLine style={{ position: "absolute", top: 100, left: 0, right: 0 }} size={84} words={[["আর", t.start], ["Website", t.website, false, true], ["হলো", t.holo], ["নিজের", t.nijer, true], ["বাড়ি", t.bari, true]]} />
    <Appear at={t.nijer} style={{ position: "absolute", left: 260, top: 300 }}>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", inset: -100, background: "radial-gradient(closest-side, rgba(134,239,172,0.55), rgba(134,239,172,0))" }} />
        <Glass style={{ width: 520, height: 520, borderRadius: 999, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconTile icon={House} tint={T.green} size={240} />
        </Glass>
        <Pop at={t.bari} style={{ position: "absolute", left: 260 - 60, top: -60 }}>
          <div style={{ width: 120, height: 120, borderRadius: 99, background: "linear-gradient(160deg, #FDE68A, #F59E0B)", boxShadow: "0 12px 28px rgba(245,158,11,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Crown size={64} color="white" strokeWidth={2.2} />
          </div>
        </Pop>
      </div>
    </Appear>
    <Appear at={t.website} style={{ position: "absolute", left: 1350, top: 260 }}>
      <PhoneShot src="products/jk-site.jpg" width={360} height={690} scroll={0.5} />
    </Appear>
    <Appear at={t.jekhane} style={{ position: "absolute", left: 830, top: 880 }}>
      <Glass style={{ padding: "18px 34px", borderRadius: 999, display: "flex", alignItems: "center", gap: 18 }}>
        <KeyRound size={50} color="#16A34A" strokeWidth={2.4} />
        <Headline size={58} words={[["যেখানে", t.jekhane], ["নিয়ম", t.niyom], ["আপনার", t.apnar, true]]} />
      </Glass>
    </Appear>
  </>
);

// ---------- 5. let's see the benefits ----------

export const LetsSeeScene: P<"letsSee"> = ({ t }) => (
  <>
    <MixLine style={{ position: "absolute", top: 270, left: 0, right: 0 }} size={88} words={[["চলুন", t.start], ["দেখি", t.dekhi], ["Website", t.website, false, true], ["থাকলে", t.thakle]]} />
    <Headline style={{ position: "absolute", top: 390, left: 0, right: 0 }} size={88} words={[["কি", t.ki], ["কি", t.ki2], ["সুবিধা", t.subidha, true]]} />
    <div style={{ position: "absolute", top: 600, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 26 }}>
      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
        <ReasonBadge key={n} n={n} at={t.ki + n * 0.08} size={104} />
      ))}
    </div>
  </>
);

// ---------- 6. (1) the business is in your own hands ----------

export const B1Scene: P<"b1"> = ({ t }) => {
  const off = useProgress(t.somossa, t.holeo + 0.4);
  return (
    <>
      <Benefit n={1} at={t.start}>
        <Headline align="left" size={84} words={[["ব্যবসা", t.byabsa], ["আপনার", t.apnar], ["নিজের", t.nijer], ["হাতে", t.hate, true]]} />
      </Benefit>
      <Appear at={t.page} style={{ position: "absolute", left: 180, top: 360 }}>
        <PhoneShot src="products/jk-page.jpg" width={300} height={580} dim={off} />
      </Appear>
      <Appear at={t.website} style={{ position: "absolute", left: 540, top: 330 }}>
        <Glass active={useProgress(t.cholte - 0.2, t.cholte + 0.3)} style={{ padding: 0, borderRadius: 40 }}>
          <PhoneShot src="products/jk-site.jpg" width={320} height={620} scroll={0.6} />
        </Glass>
        <Pop at={t.cholte} style={{ position: "absolute", right: -26, top: -26 }}>
          <CheckBadge size={80} />
        </Pop>
      </Appear>
      <div style={{ ...RIGHT, left: 1000, top: 440 }}>
        <Appear at={t.page}>
          <Row width={800} style={{ background: "rgba(255,251,235,0.95)" }}>
            <IconTile icon={TriangleAlert} tint={AMBER} size={80} />
            <MixLine align="left" size={52} words={[["Page|-এ", t.page, false, true], ["সমস্যা", t.somossa], ["হলেও", t.holeo]]} />
          </Row>
        </Appear>
        <Appear at={t.apnar2}>
          <Row width={800}>
            <IconTile icon={Globe} tint={T.green} size={80} />
            <MixLine align="left" size={52} words={[["Website", t.website, false, true], ["চলতে", t.cholte, true], ["থাকে", t.thake]]} />
          </Row>
        </Appear>
      </div>
    </>
  );
};

// ---------- 7. (2) customer trust ----------

export const B2Scene: P<"b2"> = ({ t }) => (
  <>
    <Benefit n={2} at={t.start}>
      <MixLine align="left" size={84} words={[["Customer|-এর", t.customer, false, true], ["আস্থা", t.astha, true]]} />
    </Benefit>
    <Appear at={t.gochhano} style={{ position: "absolute", left: 280, top: 340 }}>
      <PhoneShot src="products/jk-site.jpg" width={340} height={660} scroll={0.8} />
      <Pop at={t.asol} style={{ position: "absolute", right: -40, top: -30 }}>
        <IconTile icon={BadgeCheck} tint={T.green} size={110} />
      </Pop>
    </Appear>
    <div style={{ ...RIGHT, left: 900, top: 420 }}>
      <Appear at={t.gochhano}>
        <Row width={880}>
          <IconTile icon={Sparkles} tint={T.teal} size={80} />
          <MixLine align="left" size={52} words={[["গোছানো", t.gochhano, true], ["একটা", t.ekta], ["Website", t.website, false, true], ["দেখলে", t.dekhle]]} />
        </Row>
      </Appear>
      <Appear at={t.customer2}>
        <Row width={880}>
          <IconTile icon={User} tint={T.sky} size={80} />
          <MixLine align="left" size={52} words={[["Customer", t.customer2, false, true], ["বোঝেন", t.bojhen]]} />
        </Row>
      </Appear>
      <Appear at={t.eta}>
        <Row width={880}>
          <IconTile icon={ShieldCheck} tint={T.green} size={80} />
          <MixLine align="left" size={56} words={[["এটা", t.eta], ["একটা", t.ekta2], ["আসল", t.asol, true], ["Brand", t.brand, true, true]]} />
        </Row>
      </Appear>
    </div>
  </>
);

// ---------- 8. (3) "price?" in the inbox ----------

export const B3Scene: P<"b3"> = ({ t }) => {
  const fade = useProgress(t.kome - 0.2, t.kome + 0.6);
  const bubbles = [t.inbox, t.dam, t.koto];
  return (
    <>
      <Benefit n={3} at={t.start}>
        <MixLine align="left" size={84} words={[["Inbox|-এ", t.inbox, false, true], ["দাম", t.dam], ["কত?", t.koto]]} />
      </Benefit>
      <Appear at={t.inbox} style={{ position: "absolute", left: 160, top: 360 }}>
        <Glass style={{ width: 380, height: 600, padding: 24, display: "flex", flexDirection: "column", gap: 18, opacity: 1 - 0.55 * fade }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <IconTile icon={MessageCircle} tint={T.sky} size={60} />
            <Skel w={160} strong />
          </div>
          {bubbles.map((at, i) => (
            <Pop key={i} at={at} style={{ alignSelf: "flex-start" }}>
              <div style={{ padding: "16px 24px", borderRadius: "24px 24px 24px 6px", background: "#E0F2FE", fontFamily: fonts.display, fontWeight: 700, fontSize: 40, color: "#0C4A6E" }}>দাম কত?</div>
            </Pop>
          ))}
        </Glass>
      </Appear>
      <Appear at={t.customer} style={{ position: "absolute", left: 590, top: 360 }}>
        <Glass style={{ width: 320, height: 600, padding: 12, borderRadius: 40 }}>
          <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 30, overflow: "hidden" }}>
            <Img src={staticFile("products/site-mudarabah-card.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <Pop at={t.order} style={{ position: "absolute", left: 0, right: 0, bottom: 20, display: "flex", justifyContent: "center" }}>
              <CheckBadge size={90} />
            </Pop>
          </div>
        </Glass>
      </Appear>
      <div style={{ ...RIGHT, left: 1000, top: 420 }}>
        <Appear at={t.message}>
          <Row width={800}>
            <IconTile icon={MessageCircle} tint={T.teal} size={80} />
            <MixLine align="left" size={50} words={[["Message|-এর", t.message, false, true], ["ঝামেলা", t.jhamela], ["কমে", t.kome, true]]} />
          </Row>
        </Appear>
        <Appear at={t.customer}>
          <Row width={800}>
            <IconTile icon={Eye} tint={T.sky} size={80} />
            <MixLine align="left" size={50} words={[["Customer", t.customer, false, true], ["নিজেই", t.nijei, true], ["দাম", t.dam2], ["দেখেন", t.dekhen]]} />
          </Row>
        </Appear>
        <Appear at={t.nijei2}>
          <Row width={800}>
            <IconTile icon={ShoppingCart} tint={T.green} size={80} />
            <MixLine align="left" size={50} words={[["নিজেই", t.nijei2, true], ["Order", t.order, false, true], ["করেন", t.koren]]} />
          </Row>
        </Appear>
      </div>
    </>
  );
};

// ---------- 9. (4) a shop open 24 hours ----------

export const B4Scene: P<"b4"> = ({ t }) => {
  const { frame, f } = useTime();
  const sweep = (frame / 30) * 30;
  const ordersFrom = f(t.order);
  return (
    <>
      <Benefit n={4} at={t.start}>
        <Headline align="left" size={84} words={[["দোকান", t.dokan], ["খোলা", t.khola], ["চব্বিশ", t.chobbish, true], ["ঘণ্টা", t.ghonta, true]]} />
      </Benefit>
      <Appear at={t.chobbish} style={{ position: "absolute", left: 230, top: 380 }}>
        <div style={{ position: "relative", width: 480, height: 480 }}>
          <Glass style={{ width: 480, height: 480, borderRadius: 999, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 200, lineHeight: 1, backgroundImage: "linear-gradient(90deg, #16A34A, #0D9488)", WebkitBackgroundClip: "text", color: "transparent", paddingTop: 20 }}>২৪</div>
          </Glass>
          <svg style={{ position: "absolute", inset: 0 }} width={480} height={480}>
            <circle cx={240} cy={240} r={226} fill="none" stroke="#22C55E" strokeWidth={10} strokeDasharray="120 1300" strokeLinecap="round" transform={`rotate(${sweep} 240 240)`} />
          </svg>
          <Pop at={t.ghumiye} style={{ position: "absolute", left: -20, top: -20 }}>
            <IconTile icon={Moon} tint={T.sky} size={110} />
          </Pop>
        </div>
      </Appear>
      <div style={{ ...RIGHT, left: 900, top: 420 }}>
        <Appear at={t.apni}>
          <Row width={860}>
            <IconTile icon={Moon} tint={T.sky} size={80} />
            <Headline align="left" size={54} words={[["আপনি", t.apni], ["ঘুমিয়ে", t.ghumiye], ["থাকলেও", t.thakleo]]} />
          </Row>
        </Appear>
        <MixLine align="left" size={72} words={[["Order", t.order, true, true], ["আসতে", t.aste], ["থাকে", t.thake]]} />
        <div style={{ position: "relative", height: 200 }}>
          {[0, 1, 2].map((k) => {
            const p = interpolate(frame - ordersFrom - k * 10, [0, 12], [0, 1], clamp);
            return (
              <div key={k} style={{ position: "absolute", left: k * 60, top: 120 - k * 60, opacity: p, transform: `translateY(${(1 - p) * 20}px)` }}>
                <Glass style={{ padding: "12px 22px", borderRadius: 20, display: "flex", alignItems: "center", gap: 14 }}>
                  <IconTile icon={Bell} tint={T.green} size={52} />
                  <ShoppingCart size={40} color="#16A34A" strokeWidth={2.4} />
                  <Skel w={120} strong />
                </Glass>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

// ---------- 10. (5) bringing customers back ----------

const PATH = [
  { x: 240, icon: User, tint: T.sky },
  { x: 620, icon: Eye, tint: T.teal },
  { x: 1000, icon: ShoppingCart, tint: T.rose },
  { x: 1380, icon: Database, tint: T.green },
  { x: 1720, icon: Megaphone, tint: T.orange },
];

export const B5Scene: P<"b5"> = ({ t }) => {
  const ats = [t.customer, t.dekhlo, t.kinte, t.mone, t.ad];
  const back = useProgress(t.firiye2 - 0.3, t.ana2 + 0.4);
  const Y = 500;
  return (
    <>
      <Benefit n={5} at={t.start}>
        <MixLine align="left" size={80} words={[["Customer|-কে", t.customer, false, true], ["আবার", t.abar], ["ফিরিয়ে", t.firiye, true], ["আনা", t.ana]]} />
      </Benefit>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        {PATH.slice(0, -1).map((p, i) => {
          const on = useProgressSafe(ats[i + 1]);
          return <line key={i} x1={p.x + 80} y1={Y} x2={p.x + 80 + (PATH[i + 1].x - p.x - 160) * on} y2={Y} stroke="#BFE8CC" strokeWidth={8} strokeLinecap="round" />;
        })}
        <path d={`M1720 ${Y + 90} C 1500 ${Y + 330}, 460 ${Y + 330}, 240 ${Y + 90}`} pathLength={1} fill="none" stroke="url(#back9)" strokeWidth={10} strokeLinecap="round" strokeDasharray={1} strokeDashoffset={1 - back} />
        <defs>
          <linearGradient id="back9" x1="1" x2="0">
            <stop offset="0" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#16A34A" />
          </linearGradient>
        </defs>
      </svg>
      {PATH.map((p, i) => (
        <Pop key={i} at={ats[i]} style={{ position: "absolute", left: p.x - 80, top: Y - 80 }}>
          <div style={{ position: "relative" }}>
            <IconTile icon={p.icon} tint={p.tint} size={160} />
            {i === 2 ? (
              <Pop at={t.na} style={{ position: "absolute", right: -16, top: -16 }}>
                <div style={{ width: 56, height: 56, borderRadius: 99, background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(225,29,72,0.25)" }}>
                  <X size={34} color={ROSE} strokeWidth={3} />
                </div>
              </Pop>
            ) : null}
          </div>
        </Pop>
      ))}
      <Headline style={{ position: "absolute", top: Y + 100, left: 620 - 200, width: 400 }} size={44} words={[["দেখলো", t.dekhlo]]} />
      <Headline style={{ position: "absolute", top: Y + 100, left: 1000 - 200, width: 400 }} size={44} words={[["কিনলো", t.kinlo], ["না", t.na]]} />
      <Headline style={{ position: "absolute", top: Y + 100, left: 1380 - 200, width: 400 }} size={44} words={[["মনে", t.mone], ["রাখে", t.rakhe, true]]} />
      <MixLine style={{ position: "absolute", top: Y + 100, left: 1720 - 200, width: 400 }} size={44} words={[["Ad", t.ad, false, true]]} />
      <MixLine
        style={{ position: "absolute", top: 900, left: 0, right: 0 }}
        size={56}
        words={[["তাই", t.tai], ["Ad", t.ad, false, true], ["দিয়ে", t.diye], ["তাকে", t.take], ["আবার", t.abar2], ["ফিরিয়ে", t.firiye2, true], ["আনা", t.ana2], ["যায়", t.jay]]}
      />
    </>
  );
};

// useProgress for a single cue (helper so the line-drawing map above stays short).
function useProgressSafe(at: number) {
  return useProgress(at - 0.3, at + 0.1);
}

// ---------- 11. (6) found on Google too ----------

export const B6Scene: P<"b6"> = ({ t }) => {
  const typed = useProgress(t.khuje, t.jay + 0.3);
  const pal = usePalette();
  return (
    <>
      <Benefit n={6} at={t.start}>
        <MixLine align="left" size={84} words={[["Google|-এও", t.google, false, true], ["খুঁজে", t.khuje], ["পাওয়া", t.paoa, true], ["যায়", t.jay]]} />
      </Benefit>
      <Appear at={t.google} style={{ position: "absolute", left: 160, top: 360 }}>
        <Glass style={{ width: 760, padding: 30, display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 24px", borderRadius: 999, background: "white", boxShadow: `0 0 0 2px ${pal.lineStrong}` }}>
            <Search size={40} color="#64748B" strokeWidth={2.4} />
            <div style={{ height: 18, width: 380 * typed, borderRadius: 9, background: pal.lineStrong }} />
            <div style={{ width: 3, height: 34, background: "#16A34A", opacity: Math.floor(useTime().frame / 15) % 2 ? 1 : 0 }} />
          </div>
          {[0, 1, 2].map((i) => (
            <Appear key={i} at={t.paoa + i * 0.15}>
              <div style={{ display: "flex", alignItems: "center", gap: 20, padding: 16, borderRadius: 20, background: i === 0 ? "rgba(220,252,231,0.9)" : "white", boxShadow: i === 0 ? "0 0 0 3px rgba(34,197,94,0.5)" : "0 4px 12px rgba(20,83,45,0.06)" }}>
                <div style={{ width: 120, height: 90, borderRadius: 14, overflow: "hidden", background: pal.tintSoft, flexShrink: 0 }}>
                  {i === 0 ? <Img src={staticFile("products/jk-site.jpg")} style={{ width: "100%", objectFit: "cover", objectPosition: "top" }} /> : null}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <Skel w={i === 0 ? 300 : 260} strong />
                  <Skel w={200} />
                </div>
              </div>
            </Appear>
          ))}
        </Glass>
      </Appear>
      <div style={{ ...RIGHT, left: 1000, top: 440 }}>
        <Appear at={t.facebook}>
          <Row width={800}>
            <IconTile icon={Globe} tint={T.teal} size={80} />
            <MixLine align="left" size={52} words={[["Facebook|-এর", t.facebook, false, true], ["বাইরেও", t.baireo, true]]} />
          </Row>
        </Appear>
        <Appear at={t.customer}>
          <Row width={800}>
            <IconTile icon={User} tint={T.sky} size={80} />
            <MixLine align="left" size={48} words={[["Customer", t.customer, false, true], ["আপনাকে", t.apnake], ["খুঁজে", t.khuje2], ["পেতে", t.pete], ["পারেন", t.paren]]} />
          </Row>
        </Appear>
      </div>
    </>
  );
};

// ---------- 12. (7) customers on your own list ----------

export const B7Scene: P<"b7"> = ({ t }) => {
  const { frame, f } = useTime();
  const pal = usePalette();
  const sent = frame - f(t.sorasori);
  return (
    <>
      <Benefit n={7} at={t.start}>
        <MixLine align="left" size={78} words={[["Customer", t.customer, false, true], ["থাকেন", t.thaken], ["নিজের", t.nijer], ["তালিকায়", t.talikay, true]]} />
      </Benefit>
      <Appear at={t.nijer} style={{ position: "absolute", left: 160, top: 360 }}>
        <Glass style={{ width: 700, padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
          {Array.from({ length: 5 }).map((_, i) => {
            const ping = interpolate(sent - i * 5, [0, 8], [0, 1], clamp);
            return (
              <Appear key={i} at={t.talikay + i * 0.1}>
                <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "14px 18px", borderRadius: 18, background: pal.tintSoft }}>
                  <div style={{ width: 54, height: 54, borderRadius: 99, background: `linear-gradient(160deg, ${[T.sky, T.rose, T.orange, T.teal, T.lime][i].join(", ")})`, border: "3px solid white" }} />
                  <Skel w={220 - i * 18} strong />
                  <div style={{ marginLeft: "auto", opacity: ping, transform: `scale(${0.6 + 0.4 * ping})` }}>
                    <IconTile icon={Bell} tint={T.green} size={50} />
                  </div>
                </div>
              </Appear>
            );
          })}
        </Glass>
        <Pop at={t.sorasori} style={{ position: "absolute", right: -30, top: -30 }}>
          <IconTile icon={Send} tint={T.green} size={100} />
        </Pop>
      </Appear>
      <div style={{ ...RIGHT, left: 960, top: 420 }}>
        <Appear at={t.notun}>
          <Row width={840}>
            <IconTile icon={Sparkles} tint={T.orange} size={80} />
            <div>
              <MixLine align="left" size={48} words={[["নতুন", t.notun], ["Collection", t.collection, true, true], ["এলে", t.ele]]} />
              <MixLine align="left" size={42} style={{ fontWeight: 600 }} words={[["পুরনো", t.puron], ["Customer|-দের", t.customer2, false, true], ["সরাসরি", t.sorasori], ["জানাতে", t.janate], ["পারেন", t.paren]]} />
            </div>
          </Row>
        </Appear>
        <Appear at={t.ekbarer}>
          <Row width={840}>
            <IconTile icon={Repeat} tint={T.teal} size={80} />
            <div>
              <MixLine align="left" size={44} style={{ fontWeight: 600 }} words={[["একবারের", t.ekbarer], ["Customer", t.customer3, false, true], ["হয়ে", t.hoye], ["যান", t.jan]]} />
              <MixLine align="left" size={56} words={[["বারবারের", t.barbarer, true], ["Customer", t.customer4, true, true]]} />
            </div>
          </Row>
        </Appear>
      </div>
    </>
  );
};

// ---------- 13. honestly, there are drawbacks too ----------

export const HonestScene: P<"honest"> = ({ t }) => (
  <>
    <Appear at={t.start} style={{ position: "absolute", left: 960 - 80, top: 170 }}>
      <IconTile icon={TriangleAlert} tint={AMBER} size={160} />
    </Appear>
    <Headline style={{ position: "absolute", top: 380, left: 0, right: 0 }} size={72} words={[["কিন্তু", t.start], ["সত্যি", t.sotti], ["কথা", t.kotha], ["বলি", t.boli]]} />
    <MixLine style={{ position: "absolute", top: 490, left: 0, right: 0 }} size={84} words={[["Website|-এর", t.website, false, true], ["কিছু", t.kichu], ["অসুবিধাও", t.osubidha], ["আছে", t.ache]]} />
    <div style={{ position: "absolute", top: 680, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 30 }}>
      {[0, 1, 2].map((i) => (
        <Pop key={i} at={t.osubidha + 0.2 + i * 0.12}>
          <div style={{ width: 110, height: 110, borderRadius: 99, background: "linear-gradient(160deg, #FCD34D, #D97706)", boxShadow: "0 14px 30px rgba(217,119,6,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fonts.display, fontWeight: 800, fontSize: 64, color: "white", paddingTop: 6 }}>
            {BN[i]}
          </div>
        </Pop>
      ))}
    </div>
  </>
);

// ---------- 14. drawback 1: a website alone does not bring customers ----------

export const C1Scene: P<"c1"> = ({ t }) => {
  const { frame, f } = useTime();
  const flow = frame - f(t.page2);
  return (
    <>
      <Drawback n={1} at={t.start}>
        <MixLine align="left" size={72} words={[["Website", t.website, false, true], ["বানালেই", t.banalei], ["Customer", t.customer, false, true], ["আসে", t.ase], ["না", t.na]]} />
        <MixLine align="left" size={44} style={{ fontWeight: 600, marginTop: 6 }} words={[["Customer", t.customer2, false, true], ["আনতে", t.ante], ["হয়", t.hoy], ["নিজেকেই", t.nijekei], ["Post", t.post, false, true], ["আর", t.ar], ["Ad", t.ad, false, true], ["দিয়ে", t.diye]]} />
      </Drawback>
      <Appear at={t.tai} style={{ position: "absolute", left: 200, top: 360 }}>
        <PhoneShot src="products/jk-page.jpg" width={280} height={540} />
      </Appear>
      <Appear at={t.tai} style={{ position: "absolute", left: 860, top: 360 }}>
        <PhoneShot src="products/jk-site.jpg" width={280} height={540} scroll={0.3} />
      </Appear>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <path d="M500 620 C 620 540, 740 540, 850 620" fill="none" stroke="#BFE8CC" strokeWidth={8} strokeLinecap="round" strokeDasharray="14 14" opacity={useProgress(t.page2 - 0.2, t.page2 + 0.3)} />
      </svg>
      {flow > 0
        ? [0, 1, 2, 3].map((k) => {
            const u = ((flow / 40 + k / 4) % 1 + 1) % 1;
            const x = 500 + 350 * u;
            const y = 620 - Math.sin(u * Math.PI) * 60;
            return (
              <div key={k} style={{ position: "absolute", left: x - 26, top: y - 26, width: 52, height: 52, borderRadius: 99, background: "linear-gradient(160deg, #7DD3FC, #0284C7)", border: "4px solid white", opacity: Math.min(1, u * 5, (1 - u) * 5) }} />
            );
          })
        : null}
      <MixLine style={{ position: "absolute", top: 920, left: 200 - 60, width: 400 }} size={42} words={[["Page|-এ", t.page2, false, true], ["Customer", t.customer3, false, true], ["আসবে", t.asbe]]} />
      <MixLine style={{ position: "absolute", top: 920, left: 860 - 60, width: 400 }} size={42} words={[["Website|-এ", t.website3, false, true], ["এসে", t.ese], ["কিনবেন", t.kinben, true]]} />
      <Appear at={t.tai} style={{ position: "absolute", left: 1220, top: 380, width: 600 }}>
        <Glass style={{ padding: "22px 28px" }}>
          <MixLine align="left" size={44} words={[["Website", t.website2, false, true], ["Page|-এর", t.page, false, true], ["জায়গা", t.jayga], ["নেয়", t.ney], ["না", t.na2, true]]} />
        </Glass>
      </Appear>
      <Answer at={t.kivabe} style={{ position: "absolute", left: 1220, top: 600, width: 600 }}>
        <MixLine align="left" size={40} words={[["কিভাবে", t.kivabe], ["Customer", t.customer4, false, true], ["আনতে", t.ante2], ["হয়", t.hoy2]]} />
        <Headline align="left" size={52} words={[["আমরা", t.amra], ["শেখাই", t.shekhai, true]]} />
      </Answer>
    </>
  );
};

// ---------- 15. drawback 2: building one yourself is hard and costly ----------

export const C2Scene: P<"c2"> = ({ t }) => {
  const cross = useProgress(t.amader - 0.1, t.amader + 0.6);
  const hard = [
    { at: t.coding, icon: Code, words: [["Coding", t.coding, false, true]] as MS[] },
    { at: t.design, icon: Palette, words: [["Design", t.design, false, true]] as MS[] },
    { at: t.server, icon: Server, words: [["Server", t.server, false, true]] as MS[] },
    { at: t.khoroch, icon: Coins, words: [["খরচও", t.khoroch], ["অনেক", t.onek]] as MS[] },
    { at: t.niyomito, icon: Wrench, words: [["নিয়মিত", t.niyomito], ["দেখাশোনা", t.dekhashona]] as MS[] },
  ];
  return (
    <>
      <Drawback n={2} at={t.start}>
        <MixLine align="left" size={70} words={[["নিজে", t.nije], ["Website", t.website, false, true], ["বানাতে", t.banate]]} />
      </Drawback>
      <div style={{ position: "absolute", left: 160, top: 340, display: "flex", flexDirection: "column", gap: 16, opacity: 1 - 0.5 * cross, filter: `grayscale(${cross})` }}>
        {hard.map((h, i) => (
          <Appear key={i} at={h.at}>
            <Row width={600} style={{ background: "rgba(255,251,235,0.95)", padding: "14px 26px" }}>
              <IconTile icon={h.icon} tint={AMBER} size={66} />
              <MixLine align="left" size={46} words={h.words} />
            </Row>
          </Appear>
        ))}
      </div>
      <Answer at={t.amader} style={{ position: "absolute", left: 860, top: 340, width: 920 }}>
        <MixLine align="left" size={46} style={{ fontWeight: 600 }} words={[["আমাদের", t.amader], ["উদ্যোক্তারা", t.uddokta], ["পান", t.pan]]} />
        <MixLine align="left" size={52} style={{ flexWrap: "nowrap", whiteSpace: "nowrap" }} words={[["নিজের", t.nijer], ["নামে", t.name], ["Ready", t.ready, true, true], ["Made", t.made, true, true], ["Website", t.website2, false, true]]} />
      </Answer>
      <div style={{ ...RIGHT, left: 860, top: 590, gap: 18 }}>
        {[
          { at: t.kono, icon: Code, words: [["কোন", t.kono], ["Coding", t.coding2, false, true], ["লাগে", t.lage2], ["না", t.na, true]] as MS[], check: t.na },
          { at: t.dekhashona2, icon: Wrench, words: [["দেখাশোনা", t.dekhashona2], ["আমরা", t.amra, true], ["করি", t.kori]] as MS[], check: t.kori },
          { at: t.shudhu, icon: Sparkles, words: [["শুধু", t.shudhu], ["একটা", t.ekta], ["মাসিক", t.masik], ["Subscription", t.subscription, true, true]] as MS[], check: t.subscription },
        ].map((r, i) => (
          <Appear key={i} at={r.at}>
            <Row width={920} style={{ padding: "16px 28px" }}>
              <IconTile icon={r.icon} tint={T.green} size={70} />
              <MixLine align="left" size={46} words={r.words} />
              <Pop at={r.check + 0.2} style={{ marginLeft: "auto" }}>
                <CheckBadge size={54} />
              </Pop>
            </Row>
          </Appear>
        ))}
      </div>
    </>
  );
};


// ---------- 16. drawback 3: many customers still want to talk ----------

export const C3Scene: P<"c3"> = ({ t }) => {
  const pal = usePalette();
  return (
    <>
      <Drawback n={3} at={t.start}>
        <MixLine align="left" size={60} words={[["অনেক", t.onek], ["Customer", t.customer, false, true], ["এখনো", t.ekhono], ["কথা", t.kotha], ["বলে", t.bole], ["কিনতে", t.kinte], ["পছন্দ", t.pochhondo], ["করেন", t.koren]]} />
        <MixLine align="left" size={42} style={{ fontWeight: 600, marginTop: 4 }} words={[["Website", t.website, false, true], ["দেখেও", t.dekheo], ["Inbox|-এ", t.inbox, false, true], ["Message", t.message, false, true], ["দেন", t.den]]} />
      </Drawback>
      <Appear at={t.inbox} style={{ position: "absolute", left: 160, top: 380 }}>
        <Glass style={{ width: 600, padding: 26, display: "flex", flexDirection: "column", gap: 16 }}>
          <Pop at={t.message} style={{ alignSelf: "flex-start" }}>
            <div style={{ padding: "18px 24px", borderRadius: "24px 24px 24px 6px", background: "#E0F2FE", display: "flex", flexDirection: "column", gap: 10 }}>
              <Skel w={260} strong />
              <Skel w={180} />
            </div>
          </Pop>
          <Pop at={t.uttor} style={{ alignSelf: "flex-end" }}>
            <div style={{ padding: "18px 24px", borderRadius: "24px 24px 6px 24px", background: "#DCFCE7", display: "flex", flexDirection: "column", gap: 10 }}>
              <Skel w={240} strong />
              <Skel w={160} />
            </div>
          </Pop>
          <Pop at={t.link} style={{ alignSelf: "flex-end" }}>
            <div style={{ padding: "16px 22px", borderRadius: "24px 24px 6px 24px", background: "linear-gradient(90deg, #16A34A, #22C55E)", display: "flex", alignItems: "center", gap: 14 }}>
              <Link size={34} color="white" strokeWidth={2.6} />
              <div style={{ width: 200, height: 14, borderRadius: 7, background: "rgba(255,255,255,0.8)" }} />
            </div>
          </Pop>
          <Pop at={t.hisab} style={{ alignSelf: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 20px", borderRadius: 999, background: pal.tintSoft }}>
              <CheckBadge size={50} />
              <ShoppingCart size={38} color="#16A34A" strokeWidth={2.4} />
            </div>
          </Pop>
        </Glass>
      </Appear>
      <Appear at={t.tai} style={{ position: "absolute", left: 860, top: 380 }}>
        <Glass style={{ padding: "18px 30px", borderRadius: 999, display: "flex", alignItems: "center", gap: 16, background: "rgba(255,251,235,0.95)" }}>
          <MessageCircle size={44} color="#D97706" strokeWidth={2.4} />
          <MixLine size={46} words={[["Customer|-এর", t.customer2, false, true], ["সাথে", t.sathe], ["কথা", t.kotha2], ["বলা", t.bola], ["বন্ধ", t.bondho], ["করবেন", t.korben], ["না", t.na, true]]} />
        </Glass>
      </Appear>
      <Answer at={t.uttor} style={{ position: "absolute", left: 860, top: 520, width: 920 }}>
        <div style={{ display: "flex", gap: 30 }}>
          <Headline align="left" size={52} words={[["উত্তর", t.uttor], ["দিন", t.din]]} />
          <Headline align="left" size={52} words={[["আস্থা", t.astha, true], ["দিন", t.din2]]} />
        </div>
        <MixLine align="left" size={46} words={[["Order", t.order, false, true], ["Website|-এর", t.website2, false, true], ["Link", t.link, true, true], ["দিয়ে", t.diye], ["নিন", t.nin]]} />
      </Answer>
      <Appear at={t.ete} style={{ position: "absolute", left: 860, top: 790 }}>
        <Row width={920}>
          <IconTile icon={BadgeCheck} tint={T.teal} size={76} />
          <MixLine align="left" size={48} words={[["Order|-এর", t.order2, false, true], ["হিসাব", t.hisab], ["থাকে", t.thake], ["গোছানো", t.gochhano, true]]} />
        </Row>
      </Appear>
    </>
  );
};

// ---------- 17. ending ----------

export const EndScene: P<"end"> = ({ t }) => (
  <>
    <div style={{ position: "absolute", top: 80, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Strike at={t.noy}>
        <Headline size={56} words={[["ভাড়া", t.start], ["বাসায়", t.basay], ["সারা", t.sara], ["জীবন", t.jibon]]} />
      </Strike>
      <Headline size={56} style={{ marginLeft: 18 }} words={[["নয়", t.noy]]} />
    </div>
    <MixLine style={{ position: "absolute", top: 170, left: 0, right: 0 }} size={74} words={[["নিজের", t.nijer], ["ব্যবসার", t.byabsar], ["জন্য", t.jonno], ["গড়ুন", t.gorun], ["নিজের", t.nijer2, true], ["ঠিকানা", t.thikana, true]]} />
    <Appear at={t.nijer} style={{ position: "absolute", left: 260, top: 330 }}>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", inset: -80, background: "radial-gradient(closest-side, rgba(134,239,172,0.5), rgba(134,239,172,0))" }} />
        <Glass style={{ width: 420, height: 420, borderRadius: 999, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconTile icon={House} tint={T.green} size={200} />
        </Glass>
        <Pop at={t.thikana} style={{ position: "absolute", left: 210 - 55, top: -55 }}>
          <div style={{ width: 110, height: 110, borderRadius: 99, background: "linear-gradient(160deg, #FDE68A, #F59E0B)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 28px rgba(245,158,11,0.4)" }}>
            <KeyRound size={56} color="white" strokeWidth={2.4} />
          </div>
        </Pop>
      </div>
    </Appear>
    <Appear at={t.aji} rise={60} style={{ position: "absolute", left: 1290 - 120, top: 320 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={240} />
        <Sweep from={t.aji + 0.2} to={t.aji + 1.2} />
      </div>
    </Appear>
    <Appear at={t.aji} style={{ position: "absolute", top: 610, left: 860, width: 860, display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", borderRadius: 999 }}>
        <GradPill size={60} icon={ArrowRight}>
          <Word text="আজই" at={t.aji} style={WHITE} /> <Word text="শুরু" at={t.shuru} style={WHITE} /> <Word text="করুন" at={t.korun} style={WHITE} />
        </GradPill>
        <Sweep from={t.korun} to={t.korun + 1} />
      </div>
    </Appear>
    <MixLine style={{ position: "absolute", top: 770, left: 860, width: 860 }} size={54} words={[["Mudarabah", t.mudarabah, false, true], ["Trade", t.trade, false, true], ["Limited|-এর", t.limited, false, true], ["সাথে", t.sathe]]} />
    <Appear at={t.sathe} style={{ position: "absolute", top: 870, left: 860, width: 860, display: "flex", justifyContent: "center" }}>
      <Pill icon={Globe} size={36}>
        <En weight={600}>uddoktajourney.com</En>
      </Pill>
    </Appear>
  </>
);
