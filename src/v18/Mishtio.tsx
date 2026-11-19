// Mishtio ad (2026-11-19 voice): a cake maker's busy day → Mishtio puts orders, delivery schedule,
// customers, products, catalog, expenses and reports in one place → build a cake brand.
// Style: pink glass (pinkPalette). Every line on screen is a range of spoken words (../v11/sayf.tsx).
import React from "react";
import { Audio } from "@remotion/media";
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChefHat,
  Clock,
  Crown,
  Gift,
  Heart,
  Image as ImageIcon,
  Inbox,
  Link2,
  MapPin,
  MessageCircle,
  Moon,
  NotebookPen,
  Package,
  Phone,
  PlusCircle,
  Receipt,
  Search,
  Sun,
  Sunrise,
  Sunset,
  Timer,
  Truck,
  User,
  Users,
  Wallet,
} from "lucide-react";
import { AbsoluteFill, interpolate, staticFile, useVideoConfig } from "remotion";
import { Appear, Background, CheckBadge, Float, Glass, IconTile, PaletteProvider, Pop, Scene, useProgress, useTime } from "../components/kit";
import { SfxTrack, type Cue } from "../components/SoundDesign";
import { design, pinkPalette, motion } from "../theme";
import { Skel, Strike } from "../v2/ui";
import { Sweep } from "../v4/parts";
import { makeSay } from "../v11/sayf";
import { C, Wash } from "../v11/ui";
import { audioDuration, SCENE_START, tail, W, WORDS, type SceneKey } from "./timeline";

// Words 240–242 ("শুধু live হলে") are a stage note read aloud by the voice; they are hidden on screen.
const { t, Say } = makeSay(W, WORDS, { 240: "", 241: "", 242: "" });
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const TOP: React.CSSProperties = { position: "absolute", left: 120, right: 120, top: 110 };
const PINK: [string, string] = ["#F9A8D4", "#E11D74"];
const BERRY: [string, string] = ["#F0ABFC", "#A21CAF"];
const CHOC: [string, string] = ["#D6A88A", "#7C3A1D"];

const cake = (name: string) => staticFile(`products/cakes/${name}.jpg`);
const CAKES = {
  drip: "cake-white-choco-drip",
  forest: "cake-black-forest",
  sparkle: "cake-sparkler-orange",
  straw: "cake-strawberry-naked",
  cup: "cupcake-strawberry",
  candles: "cake-choco-candles-dark",
  lilac: "cake-lilac-blackberry",
  slice: "cake-choco-slice",
  bday: "cake-birthday-candles",
};

// ---------- shared pieces ----------

const Card: React.FC<{ w?: number; h?: number; active?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ w = 320, h = 300, active, children, style }) => (
  <Glass active={active} style={{ width: w, height: h, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, position: "relative", ...style }}>
    {children}
  </Glass>
);

// A cake photo in a glass frame.
const Photo: React.FC<{ src: string; w: number; h: number; pos?: string; style?: React.CSSProperties }> = ({ src, w, h, pos = "center", style }) => (
  <Glass style={{ padding: 10, borderRadius: 32, ...style }}>
    <img src={cake(src)} style={{ width: w, height: h, objectFit: "cover", objectPosition: pos, borderRadius: 24, display: "block" }} />
  </Glass>
);

// The Mishtio logo on a white glass card (trimmed logo is 1006x950).
const MishtioCard: React.FC<{ w: number }> = ({ w }) => (
  <Glass style={{ padding: 18, borderRadius: 36, background: "rgba(255,255,255,0.97)" }}>
    <img src={staticFile("brand/mishtio-logo-trim.png")} style={{ width: w, height: (w * 950) / 1006, display: "block", mixBlendMode: "multiply" }} />
  </Glass>
);

const Corner: React.FC<{ at: number }> = ({ at }) => (
  <Appear at={at} rise={0} style={{ position: "absolute", right: 60, top: 30 }}>
    <Glass style={{ padding: "6px 10px", borderRadius: 22, background: "rgba(255,255,255,0.95)" }}>
      <img src={staticFile("brand/mishtio-logo-trim.png")} style={{ width: 96, height: 91, display: "block", mixBlendMode: "multiply" }} />
    </Glass>
  </Appear>
);

// Pink pill holding white spoken words.
const PinkPill: React.FC<{ from: number; to: number; size?: number; sweepAt?: number }> = ({ from, to, size = 64, sweepAt }) => (
  <div style={{ position: "relative", padding: "22px 54px", borderRadius: 999, background: "linear-gradient(90deg, #E11D74, #F472B6)", boxShadow: "0 18px 40px rgba(225,29,116,0.32)", overflow: "hidden" }}>
    <Say from={from} to={to} size={size} style={{ filter: "brightness(0) invert(1)" }} />
    {sweepAt !== undefined ? <Sweep from={sweepAt} to={sweepAt + 1} /> : null}
  </div>
);

// Feature title: icon tile + spoken feature name, top-left.
const FeatureHead: React.FC<{ icon: typeof Inbox; tint: [string, string]; from: number; to: number; hi?: number[] }> = ({ icon, tint, from, to, hi }) => (
  <Appear at={t(from)} style={{ position: "absolute", left: 140, top: 100, display: "flex", alignItems: "center", gap: 26 }}>
    <IconTile icon={icon} tint={tint} size={110} />
    <Say from={from} to={to} hi={hi} size={74} align="left" />
  </Appear>
);

const Sub: React.FC<{ from: number; to: number; hi?: number[]; top?: number; size?: number }> = ({ from, to, hi, top = 880, size = 48 }) => (
  <Appear at={t(from)} style={{ position: "absolute", left: 120, right: 120, top, display: "flex", justifyContent: "center" }}>
    <Glass style={{ padding: "18px 44px", borderRadius: 999 }}>
      <Say from={from} to={to} hi={hi} size={size} />
    </Glass>
  </Appear>
);

// ---------- 1. baking is your job; Mishtio handles the rest ----------

const Hook: React.FC = () => {
  const { frame } = useTime();
  const cakes = [CAKES.drip, CAKES.straw, CAKES.lilac, CAKES.forest];
  return (
    <>
      <Wash tone="pink" />
      {cakes.map((c, i) => (
        <Appear key={c} at={t(0) + i * 0.12} style={{ position: "absolute", left: [110, 150, 1440, 1480][i], top: [90, 700, 150, 700][i] }}>
          <div style={{ transform: `rotate(${[-6, 4, 5, -4][i]}deg) translateY(${Math.sin(frame / 40 + i) * 6}px)` }}>
            <Photo src={c} w={[300, 260, 280, 260][i]} h={[250, 230, 250, 250][i]} />
          </div>
        </Appear>
      ))}
      <Say from={0} to={3} hi={[0, 1]} size={88} style={{ position: "absolute", left: 0, right: 0, top: 380 }} />
      <Appear at={t(4)} style={{ position: "absolute", left: 0, right: 0, top: 520, display: "flex", justifyContent: "center" }}>
        <PinkPill from={4} to={7} size={64} sweepAt={t(7)} />
      </Appear>
    </>
  );
};

// ---------- 2. a cake maker's day: morning to night ----------

const Day: React.FC = () => {
  const slots = [
    { a: 14, b: 16, icon: Sunrise, tint: C.amber, img: undefined },
    { a: 17, b: 18, icon: ChefHat, tint: PINK, img: CAKES.sparkle },
    { a: 19, b: 21, icon: Truck, tint: C.orange, img: undefined },
    { a: 22, b: 26, icon: Moon, tint: BERRY, img: undefined },
  ];
  const line = useProgress(t(14), t(26));
  return (
    <>
      <Wash tone="amber" />
      <Say from={8} to={13} hi={[9, 10, 11]} size={68} style={TOP} />
      <div style={{ position: "absolute", left: 200, top: 520, width: 1520 * line, height: 8, borderRadius: 9, background: "linear-gradient(90deg, #FCD34D, #F472B6, #A21CAF)" }} />
      <div style={{ position: "absolute", left: 120, right: 120, top: 300, display: "flex", justifyContent: "space-between" }}>
        {slots.map((s) => (
          <Appear key={s.a} at={t(s.a)}>
            <Card w={380} h={500} style={{ justifyContent: "flex-start", paddingTop: 34 }}>
              <IconTile icon={s.icon} tint={s.tint} size={110} />
              <div style={{ height: 120, display: "flex", alignItems: "center" }}>
                {s.img ? <img src={cake(s.img)} style={{ width: 150, height: 120, objectFit: "cover", borderRadius: 16 }} /> : s.a === 14 ? <Inbox size={80} color="#E11D74" strokeWidth={2} /> : s.a === 19 ? <AlertTriangle size={80} color="#F97316" strokeWidth={2} /> : <BookOpen size={80} color="#A21CAF" strokeWidth={2} />}
              </div>
              <Say from={s.a} to={s.b} hi={[s.a + 1]} size={46} />
            </Card>
          </Appear>
        ))}
      </div>
    </>
  );
};

// ---------- 3. and the fear of forgetting an order ----------

const Fear: React.FC = () => {
  const fade = useProgress(t(31), t(34) + 0.4);
  return (
    <>
      <Wash tone="rose" />
      <div style={{ position: "absolute", left: 360, top: 220, display: "flex", flexDirection: "column", gap: 20 }}>
        {[0, 1, 2, 3].map((i) => (
          <Appear key={i} at={t(27) + i * 0.1}>
            <Glass style={{ width: 620, padding: "18px 24px", display: "flex", alignItems: "center", gap: 18, opacity: i === 2 ? 1 - 0.85 * fade : 1, transform: i === 2 ? `translateX(${-120 * fade}px)` : undefined }}>
              <Package size={38} color="#E11D74" strokeWidth={2.3} />
              <Skel w={260 - i * 30} strong />
            </Glass>
          </Appear>
        ))}
      </div>
      <Pop at={t(32)} style={{ position: "absolute", left: 1080, top: 300 }}>
        <IconTile icon={AlertTriangle} tint={C.rose} size={150} />
      </Pop>
      <Say from={27} to={34} hi={[32, 34]} size={64} align="left" style={{ position: "absolute", left: 1080, top: 500, width: 720 }} />
    </>
  );
};

// ---------- 4. if only it were all in one place ----------

const Wish: React.FC = () => {
  const pull = useProgress(t(39), t(42) + 0.4);
  const icons = [Inbox, ChefHat, Truck, BookOpen];
  const tints = [PINK, BERRY, C.orange, CHOC];
  return (
    <>
      <Wash tone="violet" />
      <Say from={35} to={44} hi={[39, 40, 42]} size={66} style={TOP} />
      {icons.map((I, i) => {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const r = 300 * (1 - pull) + 130;
        return (
          <Appear key={i} at={t(35) + i * 0.1} style={{ position: "absolute", left: 960 + Math.cos(a) * r - 60, top: 600 + Math.sin(a) * r * 0.7 - 60 }}>
            <IconTile icon={I} tint={tints[i]} size={120} />
          </Appear>
        );
      })}
      <Pop at={t(42)} style={{ position: "absolute", left: 960 - 80, top: 600 - 80 }}>
        <div style={{ width: 160, height: 160, borderRadius: 999, background: "linear-gradient(160deg, #F9A8D4, #E11D74)", boxShadow: "0 20px 50px rgba(225,29,116,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Heart size={80} color="white" fill="white" />
        </div>
      </Pop>
    </>
  );
};

// ---------- 5. what each Mishtio feature does for you ----------

const Features: React.FC = () => {
  const icons = [Inbox, CalendarDays, Users, Package, Link2, Receipt, BarChart3];
  const tints = [PINK, C.orange, C.blue, BERRY, C.teal, CHOC, C.violet];
  return (
    <>
      <Wash tone="pink" />
      <Appear at={t(45)} style={{ position: "absolute", left: 960 - 170, top: 120 }}>
        <MishtioCard w={300} />
      </Appear>
      <Say from={45} to={51} hi={[45, 47]} size={70} style={{ position: "absolute", left: 120, right: 120, top: 480 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 680, display: "flex", justifyContent: "center", gap: 26 }}>
        {icons.map((I, i) => (
          <Pop key={i} at={t(48) + i * 0.1}>
            <IconTile icon={I} tint={tints[i]} size={110} />
          </Pop>
        ))}
      </div>
    </>
  );
};

// ---------- 6. order management: every channel into one list ----------

const Orders: React.FC = () => {
  const merge = useProgress(t(59), t(64));
  const src = [
    { i: 54, icon: MessageCircle, tint: C.blue },
    { i: 55, icon: MessageCircle, tint: C.green },
    { i: 56, icon: Phone, tint: C.orange },
  ];
  return (
    <>
      <Wash tone="pink" />
      <FeatureHead icon={Inbox} tint={PINK} from={52} to={53} hi={[52, 53]} />
      <div style={{ position: "absolute", left: 160, top: 300, display: "flex", flexDirection: "column", gap: 30 }}>
        {src.map((s, k) => (
          <Appear key={s.i} at={t(s.i)}>
            <Glass style={{ width: 420, padding: "18px 26px", display: "flex", alignItems: "center", gap: 20, transform: `translateX(${200 * merge}px)`, opacity: 1 - 0.6 * merge }}>
              <IconTile icon={s.icon} tint={s.tint} size={80} />
              <Say from={s.i} to={s.i} size={48} />
            </Glass>
          </Appear>
        ))}
      </div>
      <Appear at={t(61)} style={{ position: "absolute", left: 900, top: 270 }}>
        <Glass active={merge} style={{ width: 860, padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
          {[CAKES.drip, CAKES.forest, CAKES.straw, CAKES.bday].map((c, i) => (
            <Appear key={c} at={t(61) + i * 0.15}>
              <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "12px 18px", borderRadius: 18, background: "rgba(255,241,247,0.92)" }}>
                <img src={cake(c)} style={{ width: 80, height: 80, borderRadius: 14, objectFit: "cover" }} />
                <Skel w={240 - i * 20} strong />
                <div style={{ marginLeft: "auto" }}>{[<MessageCircle key="m" size={34} color="#2563EB" />, <MessageCircle key="w" size={34} color="#16A34A" />, <Phone key="p" size={34} color="#EA580C" />, <MessageCircle key="m2" size={34} color="#2563EB" />][i]}</div>
              </div>
            </Appear>
          ))}
        </Glass>
      </Appear>
      <Sub from={57} to={64} hi={[61, 62, 63]} />
    </>
  );
};

// ---------- 7. pending / baking / delivered at a glance ----------

const Status: React.FC = () => {
  const cols = [
    { a: 65, b: 67, icon: Clock, tint: C.amber, cakes: [CAKES.lilac, CAKES.cup] },
    { a: 68, b: 70, icon: ChefHat, tint: PINK, cakes: [CAKES.forest] },
    { a: 71, b: 74, icon: CheckCircle2, tint: C.green, cakes: [CAKES.drip, CAKES.straw] },
  ];
  return (
    <>
      <Wash tone="violet" />
      <Say from={75} to={78} hi={[75, 76]} size={62} style={{ ...TOP, top: 96 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 220, display: "flex", justifyContent: "center", gap: 36 }}>
        {cols.map((c) => (
          <Appear key={c.a} at={t(c.a)}>
            <Glass style={{ width: 500, height: 600, padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <IconTile icon={c.icon} tint={c.tint} size={70} />
                <Say from={c.a} to={c.b} hi={[c.b - 1]} size={40} align="left" />
              </div>
              {c.cakes.map((k, j) => (
                <Pop key={k} at={t(c.a) + 0.2 + j * 0.15}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, padding: 12, borderRadius: 18, background: "rgba(255,255,255,0.9)" }}>
                    <img src={cake(k)} style={{ width: 110, height: 110, borderRadius: 14, objectFit: "cover" }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <Skel w={180} strong />
                      <Skel w={120} />
                    </div>
                  </div>
                </Pop>
              ))}
            </Glass>
          </Appear>
        ))}
      </div>
      <Sub from={79} to={85} hi={[81, 84, 85]} top={870} size={44} />
    </>
  );
};

// ---------- 8. delivery schedule: today, tomorrow, next week ----------

const Schedule: React.FC = () => {
  const days = [
    { i: 88, cakes: [CAKES.bday, CAKES.drip] },
    { i: 89, cakes: [CAKES.straw] },
    { i: 91, j: 92, cakes: [CAKES.lilac, CAKES.forest, CAKES.cup] },
  ];
  return (
    <>
      <Wash tone="amber" />
      <FeatureHead icon={CalendarDays} tint={C.orange} from={86} to={87} hi={[86, 87]} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 290, display: "flex", justifyContent: "center", gap: 34 }}>
        {days.map((d) => (
          <Appear key={d.i} at={t(d.i)}>
            <Glass active={d.i === 88 ? 1 : undefined} style={{ width: 500, height: 440, padding: 26, display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <CalendarDays size={40} color="#E11D74" strokeWidth={2.3} />
                <Say from={d.i} to={d.j ?? d.i} size={48} align="left" />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                {d.cakes.map((k, j) => (
                  <Pop key={k} at={t(d.i) + 0.2 + j * 0.12}>
                    <div style={{ position: "relative" }}>
                      <img src={cake(k)} style={{ width: 130, height: 130, borderRadius: 18, objectFit: "cover", display: "block" }} />
                      <div style={{ position: "absolute", right: -8, bottom: -8, width: 44, height: 44, borderRadius: 99, background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 14px rgba(0,0,0,0.12)" }}>
                        <MapPin size={24} color="#E11D74" strokeWidth={2.4} />
                      </div>
                    </div>
                  </Pop>
                ))}
              </div>
            </Glass>
          </Appear>
        ))}
      </div>
      <Sub from={93} to={100} hi={[94, 95, 99]} top={800} />
    </>
  );
};

// ---------- 9. big orders prepared in time; trust grows ----------

const Big: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Say from={101} to={111} hi={[101, 103, 110]} size={60} style={TOP} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", gap: 50 }}>
      <Appear at={t(101)}>
        <Photo src={CAKES.bday} w={380} h={460} />
      </Appear>
      <Appear at={t(103)}>
        <Photo src={CAKES.lilac} w={380} h={460} />
      </Appear>
      <Appear at={t(107)}>
        <Card w={420} h={480}>
          <Float amp={6}>
            <IconTile icon={Timer} tint={PINK} size={150} />
          </Float>
          <Pop at={t(110)}>
            <CheckBadge size={80} />
          </Pop>
        </Card>
      </Appear>
    </div>
    <Sub from={112} to={117} hi={[116, 117]} top={850} size={50} />
  </>
);

// ---------- 10. customer management: name, number, address, past orders ----------

const Customers: React.FC = () => (
  <>
    <Wash tone="blue" />
    <FeatureHead icon={Users} tint={C.blue} from={118} to={119} hi={[118, 119]} />
    <Appear at={t(120)} style={{ position: "absolute", left: 260, top: 290 }}>
      <Glass style={{ width: 1400, padding: 40, display: "flex", gap: 46 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <IconTile icon={User} tint={PINK} size={170} />
          <Skel w={180} strong />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            { i: 122, icon: User },
            { i: 123, icon: Phone },
            { i: 124, icon: MapPin },
          ].map((r) => (
            <Appear key={r.i} at={t(r.i)}>
              <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "14px 20px", borderRadius: 18, background: "rgba(255,241,247,0.92)" }}>
                <r.icon size={36} color="#E11D74" strokeWidth={2.3} />
                <Say from={r.i} to={r.i} size={44} align="left" />
                <div style={{ marginLeft: "auto" }}>
                  <Skel w={260} strong />
                </div>
              </div>
            </Appear>
          ))}
          <Appear at={t(126)}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Say from={126} to={127} size={44} align="left" />
              {[CAKES.slice, CAKES.forest, CAKES.cup].map((k) => (
                <img key={k} src={cake(k)} style={{ width: 90, height: 90, borderRadius: 14, objectFit: "cover" }} />
              ))}
            </div>
          </Appear>
        </div>
      </Glass>
    </Appear>
    <Sub from={128} to={129} hi={[128]} top={880} size={50} />
  </>
);

// ---------- 11. "same cake as last time" — found at once ----------

const Repeat: React.FC = () => (
  <>
    <Wash tone="violet" />
    <Appear at={t(130)} style={{ position: "absolute", left: 200, top: 200 }}>
      <Glass style={{ width: 760, padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <IconTile icon={User} tint={PINK} size={60} />
          <Skel w={180} strong />
        </div>
        <div style={{ alignSelf: "flex-start", padding: "16px 26px", borderRadius: 28, borderBottomLeftRadius: 8, background: "white", boxShadow: "0 8px 22px rgba(15,23,42,0.08)" }}>
          <Say from={130} to={135} hi={[131, 133]} size={46} align="left" />
        </div>
      </Glass>
    </Appear>
    <Strike at={t(138)} style={{ position: "absolute", left: 220, top: 560 }}>
      <Appear at={t(136)}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Search size={50} color="#A21CAF" strokeWidth={2.4} />
          <Say from={136} to={138} size={50} align="left" />
        </div>
      </Appear>
    </Strike>
    <Appear at={t(139)} style={{ position: "absolute", left: 1080, top: 230 }}>
      <Glass active={1} style={{ width: 620, padding: 26, display: "flex", flexDirection: "column", gap: 18 }}>
        <img src={cake(CAKES.slice)} style={{ width: "100%", height: 340, objectFit: "cover", borderRadius: 20 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <CheckBadge size={56} />
          <Say from={139} to={142} hi={[139, 140]} size={50} align="left" />
        </div>
      </Glass>
    </Appear>
  </>
);

// ---------- 12. offers on special days bring repeat orders ----------

const Offer: React.FC = () => {
  const { frame, f } = useTime();
  return (
    <>
      <Wash tone="pink" />
      <Say from={143} to={151} hi={[145, 146, 147, 149]} size={62} style={TOP} />
      <Appear at={t(145)} style={{ position: "absolute", left: 300, top: 320 }}>
        <Photo src={CAKES.sparkle} w={420} h={500} pos="50% 60%" />
      </Appear>
      <Pop at={t(147)} style={{ position: "absolute", left: 860, top: 400 }}>
        <IconTile icon={Gift} tint={PINK} size={170} />
      </Pop>
      {[0, 1, 2].map((i) => {
        const on = interpolate(frame, [f(t(149)) + i * 6, f(t(149)) + i * 6 + 14], [0, 1], clamp);
        return (
          <div key={i} style={{ position: "absolute", left: 1150 + i * 160, top: 430, opacity: on, transform: `scale(${0.6 + 0.4 * on})` }}>
            <IconTile icon={Package} tint={[C.green, C.blue, BERRY][i]} size={130} />
          </div>
        );
      })}
    </>
  );
};

// ---------- 13. cake & product management: flavours, sizes, prices ----------

const Products: React.FC = () => {
  const grid = [CAKES.drip, CAKES.forest, CAKES.straw, CAKES.lilac, CAKES.cup, CAKES.slice];
  return (
    <>
      <Wash tone="pink" />
      <FeatureHead icon={Package} tint={BERRY} from={152} to={155} hi={[152, 154, 155]} />
      <Appear at={t(156)} style={{ position: "absolute", left: 160, top: 280 }}>
        <Glass style={{ width: 1000, padding: 24, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {grid.map((k, i) => (
            <Pop key={k} at={t(157) + i * 0.08}>
              <div style={{ borderRadius: 18, overflow: "hidden", background: "white" }}>
                <img src={cake(k)} style={{ width: "100%", height: 170, objectFit: "cover", display: "block" }} />
                <div style={{ padding: 12, display: "flex", gap: 8 }}>
                  <div style={{ width: 60, height: 22, borderRadius: 9, background: "#FBCFE8" }} />
                  <div style={{ width: 40, height: 22, borderRadius: 9, background: "#E9D5FF" }} />
                  <div style={{ width: 50, height: 22, borderRadius: 9, background: "#FDE68A", marginLeft: "auto" }} />
                </div>
              </div>
            </Pop>
          ))}
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 1260, top: 310, display: "flex", flexDirection: "column", gap: 24 }}>
        {[
          { i: 158, bg: "#FBCFE8" },
          { i: 159, bg: "#E9D5FF" },
          { i: 161, bg: "#FDE68A" },
        ].map((r) => (
          <Appear key={r.i} at={t(r.i)}>
            <Glass style={{ padding: "16px 30px", display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ width: 40, height: 22, borderRadius: 9, background: r.bg }} />
              <Say from={r.i} to={r.i} size={52} />
            </Glass>
          </Appear>
        ))}
      </div>
      <Sub from={162} to={164} hi={[162]} />
    </>
  );
};

// ---------- 14. add a cake or change a price in seconds ----------

const Edit: React.FC = () => {
  const { frame, f } = useTime();
  const s = Math.max(0, frame - f(t(170)));
  return (
    <>
      <Wash tone="violet" />
      <Say from={165} to={174} hi={[166, 167, 170, 171, 173, 174]} size={60} style={TOP} />
      <Appear at={t(165)} style={{ position: "absolute", left: 360, top: 280 }}>
        <Glass style={{ width: 560, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <img src={cake(CAKES.lilac)} style={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 18 }} />
          <Skel w={260} strong />
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 120, height: 40, borderRadius: 12, background: s > 0 && s < 12 ? "#F9A8D4" : "#FBCFE8", transition: "none" }} />
            <Pop at={t(170)}>
              <CheckBadge size={44} />
            </Pop>
          </div>
        </Glass>
      </Appear>
      <Pop at={t(167)} style={{ position: "absolute", left: 1040, top: 330 }}>
        <IconTile icon={PlusCircle} tint={PINK} size={150} />
      </Pop>
      <Pop at={t(173)} style={{ position: "absolute", left: 1260, top: 330 }}>
        <IconTile icon={Timer} tint={BERRY} size={150} />
      </Pop>
      <Sub from={175} to={182} hi={[180, 181, 182]} top={860} />
    </>
  );
};

// ---------- 15. digital catalog: one link shows everything ----------

const Catalog: React.FC = () => {
  const grid = [CAKES.drip, CAKES.forest, CAKES.straw, CAKES.lilac, CAKES.cup, CAKES.bday];
  return (
    <>
      <Wash tone="teal" />
      <FeatureHead icon={Link2} tint={C.teal} from={183} to={184} hi={[183, 184]} />
      <Appear at={t(185)} style={{ position: "absolute", left: 260, top: 250 }}>
        <Glass style={{ padding: 14, borderRadius: 50 }}>
          <div style={{ width: 400, height: 700, borderRadius: 38, background: "white", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 18px", borderBottom: "2px solid #FBE4EF" }}>
              <img src={staticFile("brand/mishtio-logo-trim.png")} style={{ width: 48, height: 45 }} />
              <Skel w={140} strong />
            </div>
            <div style={{ padding: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {grid.map((k, i) => (
                <Pop key={k} at={t(188) + i * 0.08}>
                  <div style={{ borderRadius: 14, overflow: "hidden", background: "#FFF7FA" }}>
                    <img src={cake(k)} style={{ width: "100%", height: 130, objectFit: "cover", display: "block" }} />
                    <div style={{ padding: 8, display: "flex", gap: 6 }}>
                      <div style={{ width: 50, height: 14, borderRadius: 7, background: "#FBCFE8" }} />
                      <div style={{ width: 34, height: 14, borderRadius: 7, background: "#FDE68A", marginLeft: "auto" }} />
                    </div>
                  </div>
                </Pop>
              ))}
            </div>
          </div>
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 820, top: 340, width: 940, display: "flex", flexDirection: "column", gap: 30 }}>
        <Appear at={t(185)}>
          <Glass style={{ padding: "18px 30px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 18 }}>
            <Link2 size={46} color="#0D9488" strokeWidth={2.5} />
            <Say from={185} to={186} size={52} />
          </Glass>
        </Appear>
        <Say from={187} to={195} hi={[190, 191, 193]} size={58} align="left" />
      </div>
    </>
  );
};

// ---------- 16. "price?" — just send the link; look like a pro brand ----------

const Price: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Appear at={t(196)} style={{ position: "absolute", left: 220, top: 160 }}>
      <Glass style={{ width: 740, padding: 28, display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ alignSelf: "flex-start", padding: "16px 26px", borderRadius: 28, borderBottomLeftRadius: 8, background: "white", boxShadow: "0 8px 22px rgba(15,23,42,0.08)" }}>
          <Say from={196} to={197} size={52} align="left" />
        </div>
        <Appear at={t(201)} style={{ alignSelf: "flex-end" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 24px", borderRadius: 28, borderBottomRightRadius: 8, background: "rgba(252,231,243,0.98)" }}>
            <Link2 size={40} color="#E11D74" strokeWidth={2.5} />
            <img src={staticFile("brand/mishtio-logo-trim.png")} style={{ width: 54, height: 51 }} />
            <div style={{ width: 200, height: 16, borderRadius: 9, background: "#F472B6" }} />
          </div>
        </Appear>
      </Glass>
    </Appear>
    <Say from={198} to={203} hi={[201, 202]} size={56} align="left" style={{ position: "absolute", left: 1060, top: 220, width: 740 }} />
    <Appear at={t(204)} style={{ position: "absolute", left: 220, top: 600, display: "flex", alignItems: "center", gap: 30 }}>
      {[CAKES.drip, CAKES.straw, CAKES.forest].map((k) => (
        <img key={k} src={cake(k)} style={{ width: 200, height: 200, borderRadius: 24, objectFit: "cover", boxShadow: "0 14px 30px rgba(131,24,67,0.18)" }} />
      ))}
      <Say from={204} to={211} hi={[208, 209, 210]} size={52} align="left" style={{ width: 760 }} />
    </Appear>
  </>
);

// ---------- 17. income and expense: flour, cream, box, delivery ----------

const Expense: React.FC = () => (
  <>
    <Wash tone="amber" />
    <FeatureHead icon={Receipt} tint={CHOC} from={212} to={214} hi={[212, 213]} />
    <Appear at={t(215)} style={{ position: "absolute", left: 360, top: 290 }}>
      <Glass style={{ width: 1200, padding: 34, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
        {[215, 216, 217, 218].map((i, k) => (
          <Appear key={i} at={t(i)}>
            <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "18px 24px", borderRadius: 20, background: "rgba(255,247,237,0.95)" }}>
              <IconTile icon={[Package, Heart, Gift, Truck][k]} tint={[CHOC, PINK, BERRY, C.orange][k]} size={70} />
              <Say from={i} to={i} size={50} align="left" />
              <div style={{ marginLeft: "auto" }}>
                <Skel w={110} strong />
              </div>
            </div>
          </Appear>
        ))}
      </Glass>
    </Appear>
    <Sub from={219} to={223} hi={[220, 221]} top={760} size={52} />
  </>
);

// ---------- 18. no lost notebooks or late nights; money always clear ----------

const Khata: React.FC = () => (
  <>
    <Wash tone="violet" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 170, display: "flex", justifyContent: "center", gap: 50 }}>
      <Appear at={t(224)}>
        <Card w={420} h={360}>
          <Strike at={t(232)}>
            <IconTile icon={BookOpen} tint={CHOC} size={150} />
          </Strike>
        </Card>
      </Appear>
      <Appear at={t(229)}>
        <Card w={420} h={360}>
          <Strike at={t(232)}>
            <IconTile icon={Moon} tint={BERRY} size={150} />
          </Strike>
        </Card>
      </Appear>
    </div>
    <Say from={224} to={232} hi={[231, 232]} size={62} style={{ position: "absolute", left: 120, right: 120, top: 590 }} />
    <Appear at={t(233)} style={{ position: "absolute", left: 0, right: 0, top: 760, display: "flex", justifyContent: "center", alignItems: "center", gap: 24 }}>
      <IconTile icon={Wallet} tint={PINK} size={100} />
      <Say from={233} to={239} hi={[238]} size={60} />
    </Appear>
  </>
);

// ---------- 19. sales and profit report: day, week, month ----------

const Report: React.FC = () => {
  const grow = useProgress(t(252), t(258) + 0.6);
  return (
    <>
      <Wash tone="pink" />
      <FeatureHead icon={BarChart3} tint={C.violet} from={243} to={246} hi={[243, 245, 246]} />
      <div style={{ position: "absolute", left: 160, top: 290, display: "flex", flexDirection: "column", gap: 20 }}>
        {[247, 248, 250].map((i) => (
          <Pop key={i} at={t(i)}>
            <Glass style={{ padding: "14px 34px", borderRadius: 999, display: "inline-flex" }}>
              <Say from={i} to={i} size={48} />
            </Glass>
          </Pop>
        ))}
      </div>
      <Appear at={t(247)} style={{ position: "absolute", left: 520, top: 270 }}>
        <Glass style={{ width: 1200, height: 520, padding: 40, display: "flex", alignItems: "flex-end", gap: 26 }}>
          {[0.35, 0.5, 0.45, 0.65, 0.6, 0.8, 0.95].map((h, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%", gap: 6 }}>
              <div style={{ height: `${h * 80 * interpolate(grow, [i * 0.08, i * 0.08 + 0.4], [0, 1], clamp)}%`, borderRadius: 12, background: "linear-gradient(180deg, #F9A8D4, #E11D74)" }} />
              <div style={{ height: `${h * 30 * interpolate(grow, [i * 0.08 + 0.2, i * 0.08 + 0.6], [0, 1], clamp)}%`, borderRadius: 12, background: "linear-gradient(180deg, #D8B4FE, #A21CAF)" }} />
            </div>
          ))}
        </Glass>
      </Appear>
      <Sub from={251} to={260} hi={[253, 256]} top={850} size={48} />
    </>
  );
};

// ---------- 20. know your best seller; decide on facts ----------

const Best: React.FC = () => (
  <>
    <Wash tone="amber" />
    <Say from={261} to={271} hi={[263, 264, 265]} size={52} style={{ ...TOP, right: 240 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 40 }}>
      {[CAKES.drip, CAKES.forest, CAKES.straw].map((k, i) => (
        <Appear key={k} at={t(261) + i * 0.12}>
          <div style={{ position: "relative", opacity: i === 1 ? 1 : 0.75, transform: `scale(${i === 1 ? 1.08 : 0.92})` }}>
            <Photo src={k} w={320} h={i === 1 ? 380 : 300} />
            {i === 1 ? (
              <Pop at={t(264)} style={{ position: "absolute", left: 340 / 2 - 50, top: -50 }}>
                <IconTile icon={Crown} tint={C.amber} size={100} />
              </Pop>
            ) : null}
          </div>
        </Appear>
      ))}
    </div>
    <Sub from={272} to={279} hi={[272, 273, 274, 275]} top={860} size={50} />
  </>
);

// ---------- 21. notebook, notepad, gallery, Messenger → one place ----------

const OnePlace: React.FC = () => {
  const pull = useProgress(t(287), t(291) + 0.4);
  const items = [
    { i: 280, icon: BookOpen, tint: CHOC },
    { i: 281, icon: NotebookPen, tint: C.amber },
    { i: 282, icon: ImageIcon, tint: C.violet },
    { i: 284, icon: MessageCircle, tint: C.blue },
  ];
  return (
    <>
      <Wash tone="pink" />
      {items.map((s, k) => {
        const x0 = [220, 1460, 220, 1460][k];
        const y0 = [220, 220, 640, 640][k];
        return (
          <Appear key={s.i} at={t(s.i)} style={{ position: "absolute", left: x0 + (860 - x0) * pull, top: y0 + (430 - y0) * pull, opacity: 1 - pull }}>
            <Glass style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: 16 }}>
              <IconTile icon={s.icon} tint={s.tint} size={80} />
              <Say from={s.i} to={s.i} size={44} />
            </Glass>
          </Appear>
        );
      })}
      <Pop at={t(289)} style={{ position: "absolute", left: 960 - 170, top: 300 }}>
        <MishtioCard w={300} />
      </Pop>
      <Say from={285} to={291} hi={[290, 291]} size={58} style={{ position: "absolute", left: 120, right: 120, top: 760 }} />
    </>
  );
};

// ---------- 22. save time, fewer mistakes, more care for the cakes ----------

const Benefits: React.FC = () => (
  <>
    <Wash tone="violet" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 160, display: "flex", justifyContent: "center", gap: 40 }}>
      {[
        { a: 292, b: 294, icon: Clock, tint: C.blue },
        { a: 295, b: 296, icon: CheckCircle2, tint: C.green },
        { a: 297, b: 304, icon: Heart, tint: PINK },
      ].map((c) => (
        <Appear key={c.a} at={t(c.a)}>
          <Card w={520} h={460} active={c.a === 297 ? 1 : undefined}>
            <IconTile icon={c.icon} tint={c.tint} size={130} />
            <Say from={c.a} to={c.b} hi={[c.a + 1]} size={50} />
          </Card>
        </Appear>
      ))}
    </div>
    <Appear at={t(298)} style={{ position: "absolute", left: 960 - 160, top: 680 }}>
      <Photo src={CAKES.straw} w={320} h={210} />
    </Appear>
  </>
);

// ---------- 23. the goal: your own successful cake brand ----------

const Brand: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Say from={305} to={311} hi={[308, 309]} size={62} style={TOP} />
    <Appear at={t(312)} style={{ position: "absolute", left: 260, top: 280 }}>
      <Photo src={CAKES.sparkle} w={400} h={560} pos="50% 55%" />
    </Appear>
    <Appear at={t(312)} style={{ position: "absolute", left: 800, top: 380, width: 900, display: "flex", flexDirection: "column", gap: 30 }}>
      <Say from={312} to={318} hi={[314, 315, 316]} size={80} align="left" />
      <Pop at={t(316)}>
        <IconTile icon={Crown} tint={C.amber} size={110} />
      </Pop>
    </Appear>
  </>
);

// ---------- 24. comment "Mishtio" or inbox the page ----------

const Cta: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Appear at={t(319)} rise={60} style={{ position: "absolute", left: 960 - 190, top: 70 }}>
      <div style={{ position: "relative", borderRadius: 36 }}>
        <MishtioCard w={340} />
        <Sweep from={t(319) + 0.2} to={t(319) + 1.2} />
      </div>
    </Appear>
    <div style={{ position: "absolute", left: 0, right: 0, top: 480, display: "flex", justifyContent: "center", gap: 30 }}>
      <Appear at={t(319)}>
        <Glass style={{ padding: "18px 34px", borderRadius: 999, display: "flex", alignItems: "center", gap: 16 }}>
          <MessageCircle size={42} color="#E11D74" strokeWidth={2.4} />
          <Say from={319} to={324} hi={[321, 323]} size={46} />
        </Glass>
      </Appear>
      <Appear at={t(325)}>
        <Glass style={{ padding: "18px 34px", borderRadius: 999, display: "flex", alignItems: "center", gap: 16 }}>
          <Inbox size={42} color="#A21CAF" strokeWidth={2.4} />
          <Say from={325} to={327} hi={[326]} size={46} />
        </Glass>
      </Appear>
    </div>
    <Appear at={t(328)} style={{ position: "absolute", left: 0, right: 0, top: 680, display: "flex", justifyContent: "center" }}>
      <PinkPill from={328} to={335} size={62} sweepAt={t(334)} />
    </Appear>
  </>
);

// ---------- assembly ----------

const SCENES: Record<SceneKey, React.FC> = {
  hook: Hook,
  day: Day,
  fear: Fear,
  wish: Wish,
  features: Features,
  orders: Orders,
  status: Status,
  schedule: Schedule,
  big: Big,
  customers: Customers,
  repeat: Repeat,
  offer: Offer,
  products: Products,
  edit: Edit,
  catalog: Catalog,
  price: Price,
  expense: Expense,
  khata: Khata,
  report: Report,
  best: Best,
  onePlace: OnePlace,
  benefits: Benefits,
  brand: Brand,
  cta: Cta,
};
const ORDER = Object.keys(SCENE_START) as SceneKey[];
const PRE = 0.4;
export const TOTAL_SECONDS_18 = audioDuration + tail;
const NO_CORNER = new Set<SceneKey>(["features", "onePlace", "cta"]);

const cues: Cue[] = [
  ...Object.values(SCENE_START).slice(1).map((i): Cue => [W[i] - 0.45, "whoosh"]),
  ...[14, 17, 19, 22, 54, 55, 56, 65, 68, 71, 88, 89, 91, 122, 123, 124, 147, 158, 159, 161, 167, 196, 201, 215, 216, 217, 218, 247, 248, 250, 280, 281, 282, 284].map((i): Cue => [W[i], "pop"]),
  ...[7, 64, 78, 117, 142, 174, 195, 239, 264, 291, 318, 335].map((i): Cue => [W[i], "ding"]),
  [W[32], "stamp"],
  [W[232], "stamp"],
];

export const Video18: React.FC = () => {
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
            const to = i === ORDER.length - 1 ? TOTAL_SECONDS_18 + 1 : W[SCENE_START[ORDER[i + 1]]] - PRE + overlap;
            return (
              <Scene key={key} from={Math.max(0, start - PRE)} to={to}>
                <Comp />
                {NO_CORNER.has(key) ? null : <Corner at={start - 0.3} />}
              </Scene>
            );
          })}
        </div>
        <Audio src={staticFile("voiceover-mishtio.mp3")} />
        <SfxTrack cues={cues} />
      </AbsoluteFill>
    </PaletteProvider>
  );
};
