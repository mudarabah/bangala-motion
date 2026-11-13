// All 12 scenes of the probashi (expat) investor video, in voice order.
import React from "react";
import {
  BarChart3,
  Coins,
  EyeOff,
  FileSignature,
  FolderKanban,
  Globe,
  House,
  Moon,
  Phone,
  Plane,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Sun,
  TrendingUp,
  TriangleAlert,
  Users,
  Wallet,
  Eye,
  Package,
  Sprout,
} from "lucide-react";
import { Easing, Img, interpolate, staticFile } from "remotion";
import { Appear, CheckBadge, Float, Glass, GradPill, Headline, IconTile, LogoCard, Pill, Pop, usePalette, useProgress, useTime, Word } from "../../components/kit";
import { greenIconTints as T } from "../../theme";
import { Connector, En, Skel } from "../../v2/ui";
import { Girl } from "../../v3/Girl";
import { Coin, HeroWord, Sweep, Tag, useTravel } from "../../v4/parts";
import { MixLine, Row } from "../../v5/parts";
import type { Timeline7 } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
type P<K extends keyof Timeline7> = React.FC<{ t: Timeline7[K] }>;
const WHITE = { color: "white", filter: "none" } as const;

// A screenshot in a glass phone frame, scrolling down slowly.
const PhoneShot: React.FC<{ src: string; width: number; height: number; scroll?: number; children?: React.ReactNode }> = ({ src, width, height, scroll = 0, children }) => {
  const { frame } = useTime();
  const y = Math.min(frame, 240) * scroll;
  return (
    <Glass style={{ width, height, padding: 12, borderRadius: width * 0.12 }}>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: width * 0.09, overflow: "hidden", background: "white" }}>
        <Img src={staticFile(src)} style={{ position: "absolute", left: 0, top: -y, width: "100%" }} />
        {children}
      </div>
    </Glass>
  );
};

// Point on a quadratic curve.
const q = (a: [number, number], c: [number, number], b: [number, number], u: number): [number, number] => [
  (1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0],
  (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1],
];

// ---------- 1. behind every taka ----------

export const SacrificeScene: P<"sacrifice"> = ({ t }) => {
  const line = useProgress(t.hajar - 0.1, t.durotto + 0.6);
  const plane = useTravel(t.hajar, t.durotto + 0.8);
  return (
    <>
      <div style={{ position: "absolute", top: 110, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 30 }}>
        <Pop at={t.start}>
          <Coin size={100} />
        </Pop>
        <Headline size={86} words={[["প্রতিটা", t.start], ["টাকার", t.takar], ["পেছনে", t.pechhone]]} />
      </div>
      <div style={{ position: "absolute", top: 330, left: 150, display: "flex", gap: 40 }}>
        <Appear at={t.rode}>
          <Glass style={{ width: 460, height: 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
            <Float amp={8}>
              <IconTile icon={Sun} tint={T.orange} size={150} />
            </Float>
            <Headline size={56} style={{ flexWrap: "nowrap", whiteSpace: "nowrap" }} words={[["রোদে", t.rode], ["পোড়া", t.pora], ["দিন", t.din]]} />
          </Glass>
        </Appear>
        <Appear at={t.ghumhin}>
          <Glass style={{ width: 460, height: 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
            <Float amp={8} phase={1.5}>
              <IconTile icon={Moon} tint={T.sky} size={150} />
            </Float>
            <Headline size={60} words={[["ঘুমহীন", t.ghumhin], ["রাত", t.rat]]} />
          </Glass>
        </Appear>
        <Appear at={t.poribar}>
          <Glass style={{ position: "relative", width: 560, height: 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", gap: 24, paddingBottom: 50 }}>
            <svg style={{ position: "absolute", left: 0, top: 0 }} width={560} height={260}>
              <path d="M90 190 Q 280 40 470 190" pathLength={1} fill="none" stroke="#86EFAC" strokeWidth={6} strokeDasharray="0.02 0.02" strokeDashoffset={0} opacity={line} />
            </svg>
            <div style={{ position: "absolute", left: 40, top: 150 }}>
              <IconTile icon={House} tint={T.green} size={100} />
            </div>
            <div style={{ position: "absolute", right: 40, top: 150 }}>
              <IconTile icon={Globe} tint={T.teal} size={100} />
            </div>
            {plane > 0 && plane < 1 ? (
              (() => {
                const [x, y] = q([470, 190], [280, 40], [90, 190], plane);
                return (
                  <div style={{ position: "absolute", left: x - 30, top: y - 30, transform: "scaleX(-1)" }}>
                    <Plane size={60} color="#0D9488" strokeWidth={2.2} />
                  </div>
                );
              })()
            ) : null}
            <Headline size={56} words={[["হাজার", t.hajar], ["মাইলের", t.mailer], ["দূরত্ব", t.durotto, true]]} />
          </Glass>
        </Appear>
      </div>
    </>
  );
};

// ---------- 2. sending money home: is it working for you? ----------

const ARC_A: [number, number] = [1500, 420];
const ARC_C: [number, number] = [960, 140];
const ARC_B: [number, number] = [420, 420];

export const SendScene: P<"send"> = ({ t }) => {
  const { frame, f } = useTime();
  const arc = useProgress(t.deshe - 0.2, t.pathachchhen + 0.4);
  return (
    <>
      <Appear at={t.start} style={{ position: "absolute", left: ARC_A[0] - 110, top: ARC_A[1] - 110 }}>
        <Glass style={{ width: 220, height: 220, borderRadius: 999, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconTile icon={Globe} tint={T.teal} size={110} />
        </Glass>
      </Appear>
      <Appear at={t.deshe} style={{ position: "absolute", left: ARC_B[0] - 110, top: ARC_B[1] - 110 }}>
        <Glass style={{ width: 220, height: 220, borderRadius: 999, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconTile icon={House} tint={T.green} size={110} />
        </Glass>
      </Appear>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <path
          d={`M${ARC_A[0] - 120} ${ARC_A[1] - 40} Q${ARC_C[0]} ${ARC_C[1]} ${ARC_B[0] + 120} ${ARC_B[1] - 40}`}
          pathLength={1}
          fill="none"
          stroke="url(#send7)"
          strokeWidth={9}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={1 - arc}
          opacity={0.75}
        />
        <defs>
          <linearGradient id="send7" x1="1" x2="0">
            <stop offset="0" stopColor="#0D9488" />
            <stop offset="1" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
      {[0, 1, 2].map((k) => {
        const s = f(t.pathachchhen) + k * 8;
        const u = interpolate(frame, [s, s + 40], [0, 1], { ...clamp, easing: Easing.bezier(0.45, 0, 0.25, 1) });
        if (u <= 0 || u >= 1) return null;
        const [x, y] = q([ARC_A[0] - 120, ARC_A[1] - 40], ARC_C, [ARC_B[0] + 120, ARC_B[1] - 40], u);
        return <Coin key={k} size={60} style={{ position: "absolute", left: x - 30, top: y - 30 }} />;
      })}
      <Headline style={{ position: "absolute", top: 600, left: 0, right: 0 }} size={72} words={[["এত", t.start], ["কষ্টের", t.koshter], ["টাকা", t.taka], ["দেশে", t.deshe], ["পাঠাচ্ছেন", t.pathachchhen]]} />
      <Headline style={{ position: "absolute", top: 720, left: 0, right: 0 }} size={56} words={[["কিন্তু", t.kintu], ["আপনার", t.apnar], ["জন্য", t.jonno]]} />
      <div style={{ position: "absolute", top: 800, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <HeroWord text="কাজ করছে?" at={t.kaj} size={120} />
      </div>
    </>
  );
};

// ---------- 3. what usually happens ----------

export const WasteScene: P<"waste"> = ({ t }) => {
  const drain = useProgress(t.khoroch, t.jay + 0.6);
  return (
    <>
      <Appear at={t.start} style={{ position: "absolute", left: 330, top: 260 }}>
        <div style={{ position: "relative", width: 300, height: 640 }}>
          {Array.from({ length: 9 }).map((_, i) => {
            const gone = i < 2 ? 0 : interpolate(drain, [(8 - i) / 7, (9 - i) / 7], [0, 1], clamp);
            return <Coin key={i} size={150} style={{ position: "absolute", left: 75, bottom: i * 54, opacity: 1 - gone, transform: `translateY(${gone * 40}px)`, filter: `saturate(${1 - 0.6 * drain})` }} />;
          })}
        </div>
      </Appear>
      <div style={{ position: "absolute", left: 860, top: 230, display: "flex", flexDirection: "column", gap: 30 }}>
        <Appear at={t.start}>
          <Row width={900}>
            <IconTile icon={Wallet} tint={T.orange} size={96} />
            <Headline align="left" size={56} words={[["শুধু", t.shudhu], ["খরচ", t.khoroch, true], ["হয়ে", t.hoye], ["যায়", t.jay]]} />
          </Row>
        </Appear>
        <Appear at={t.keu}>
          <Row width={900}>
            <IconTile icon={TriangleAlert} tint={T.rose} size={96} />
            <div>
              <Headline align="left" size={52} words={[["ভুল", t.bhul, true], ["জায়গায়", t.jaygay], ["বিনিয়োগ", t.biniyog]]} />
              <Headline align="left" size={52} words={[["সব", t.sob], ["হারান", t.haran]]} />
            </div>
          </Row>
        </Appear>
        <Appear at={t.dure}>
          <Row width={900}>
            <IconTile icon={EyeOff} tint={T.sky} size={96} />
            <Headline align="left" size={52} words={[["দূরে", t.dure], ["বসে", t.bose], ["দেখারও", t.dekharo], ["উপায়", t.upay], ["থাকে", t.thake], ["না", t.na, true]]} />
          </Row>
        </Appear>
      </div>
    </>
  );
};

// ---------- 4. the dream: come home to your own income ----------

export const DreamScene: P<"dream"> = ({ t }) => {
  const fly = useTravel(t.ekdin, t.phirben + 0.6);
  const road = useProgress(t.hate, t.poth + 0.5);
  const [px, py] = q([1700, 140], [1200, 120], [960, 420], fly);
  return (
    <>
      <Headline style={{ position: "absolute", top: 90, left: 0, right: 0 }} size={72} words={[["অথচ", t.start], ["স্বপ্ন", t.swapno, true], ["তো", t.to], ["একটাই", t.ektai]]} />
      <Appear at={t.ekdin} style={{ position: "absolute", left: 960 - 130, top: 380 }}>
        <Glass style={{ width: 260, height: 260, borderRadius: 999, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconTile icon={House} tint={T.green} size={130} />
        </Glass>
      </Appear>
      {fly > 0 && fly < 1 ? (
        <div style={{ position: "absolute", left: px - 45, top: py - 45, transform: `rotate(${150 + 40 * fly}deg)`, opacity: 1 - interpolate(fly, [0.85, 1], [0, 1], clamp) }}>
          <Plane size={90} color="#0D9488" strokeWidth={2} />
        </div>
      ) : null}
      <Headline style={{ position: "absolute", top: 200, left: 0, right: 0 }} size={60} words={[["একদিন", t.ekdin], ["দেশে", t.deshe], ["ফিরবেন", t.phirben]]} />
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <path d="M1090 560 C 1300 600, 1420 520, 1620 380" pathLength={1} fill="none" stroke="url(#road7)" strokeWidth={14} strokeLinecap="round" strokeDasharray={1} strokeDashoffset={1 - road} />
        <defs>
          <linearGradient id="road7" x1="0" x2="1">
            <stop offset="0" stopColor="#86EFAC" />
            <stop offset="1" stopColor="#16A34A" />
          </linearGradient>
        </defs>
      </svg>
      <Pop at={t.poth} style={{ position: "absolute", left: 1620 - 60, top: 380 - 130 }}>
        <IconTile icon={Sprout} tint={T.green} size={120} />
      </Pop>
      <Headline style={{ position: "absolute", top: 720, left: 0, right: 0 }} size={64} words={[["হাতে", t.hate], ["থাকবে", t.thakbe], ["নিজের", t.nijer], ["একটা", t.ekta]]} />
      <div style={{ position: "absolute", top: 810, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <HeroWord text="আয়ের পথ" at={t.ayer} size={130} />
      </div>
    </>
  );
};

// ---------- 5. the company ----------

export const BrandScene: P<"brand"> = ({ t }) => (
  <>
    <Appear at={t.start} rise={70} scaleFrom={0.9} style={{ position: "absolute", left: 200, top: 170 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={300} />
        <Sweep from={t.start + 0.2} to={t.start + 1.2} />
      </div>
    </Appear>
    <div style={{ position: "absolute", left: 200, top: 520, width: 960 }}>
      <MixLine align="left" size={74} words={[["Mudarabah", t.start, false, true], ["Trade", t.trade, false, true], ["Limited", t.limited, false, true]]} />
      <Headline align="left" size={60} style={{ marginTop: 18 }} words={[["আপনার", t.apnar], ["পুঁজি", t.puji, true], ["নিয়ে", t.niye], ["কাজ", t.kaj], ["করে", t.kore]]} />
      <Appear at={t.islami} style={{ marginTop: 30, display: "inline-block" }}>
        <Glass style={{ padding: "18px 34px", borderRadius: 999, display: "flex", alignItems: "center", gap: 18 }}>
          <ShieldCheck size={48} color="#16A34A" strokeWidth={2.4} />
          <Headline align="left" size={52} words={[["ইসলামী", t.islami], ["মুদারাবাহ", t.mudarabah, true], ["পদ্ধতিতে", t.poddhoti]]} />
        </Glass>
      </Appear>
    </div>
    <Appear at={t.trade} style={{ position: "absolute", left: 1260, top: 150 }}>
      <PhoneShot src="products/fb-page.jpg" width={460} height={790} scroll={0.25} />
    </Appear>
  </>
);

// ---------- 6. how your money works ----------

const FlowCard: React.FC<{ at: number; x: number; icon: typeof Wallet; tint: [string, string]; children: React.ReactNode; badgeAt?: number }> = ({ at, x, icon, tint, children, badgeAt }) => (
  <Appear at={at} style={{ position: "absolute", left: x - 200, top: 150 }}>
    <Glass style={{ width: 400, height: 360, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22 }}>
      <IconTile icon={icon} tint={tint} size={130} />
      <div style={{ textAlign: "center" }}>{children}</div>
      {badgeAt !== undefined ? (
        <Pop at={badgeAt} style={{ position: "absolute", right: -18, top: -18 }}>
          <CheckBadge size={70} />
        </Pop>
      ) : null}
    </Glass>
  </Appear>
);

export const FlowScene: P<"flow"> = ({ t }) => {
  const split = useTravel(t.ordhek1 - 0.1, t.ordhek2 + 0.6);
  return (
    <>
      <FlowCard at={t.start} x={380} icon={Wallet} tint={T.orange}>
        <Headline size={46} words={[["আপনার", t.start], ["টাকায়", t.takay]]} />
      </FlowCard>
      <FlowCard at={t.ponno} x={960} icon={Package} tint={T.lime}>
        <Headline size={46} words={[["পণ্য", t.ponno], ["কেনা", t.kena]]} />
      </FlowCard>
      <FlowCard at={t.uddokta} x={1540} icon={Store} tint={T.green} badgeAt={t.bikri}>
        <Headline size={46} words={[["উদ্যোক্তারা", t.uddokta, true]]} />
        <Headline size={36} style={{ fontWeight: 600 }} words={[["বিক্রি", t.bikri], ["করেন", t.koren]]} />
      </FlowCard>
      <Connector x={585} y={330} width={170} from={t.takay} to={t.ponno} />
      <Connector x={1165} y={330} width={170} from={t.amader} to={t.uddokta} />
      <Appear at={t.muldhon} style={{ position: "absolute", left: 180, top: 620 }}>
        <Row width={720}>
          <IconTile icon={Wallet} tint={T.orange} size={96} />
          <Headline align="left" size={64} words={[["মূলধন", t.muldhon, true], ["ফেরত", t.ferot, true]]} />
        </Row>
      </Appear>
      <Appear at={t.labh} style={{ position: "absolute", left: 980, top: 600 }}>
        <Glass style={{ width: 760, height: 300, padding: "26px 40px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <Headline size={56} words={[["লাভ", t.labh, true], ["ভাগ", t.bhag], ["চুক্তি", t.chukti], ["অনুযায়ী", t.onujayi]]} />
          <div style={{ position: "relative", width: 600, height: 160 }}>
            {[-1, 1].map((d) => (
              <div key={d} style={{ position: "absolute", left: 300 - 55 + d * (8 + 170 * split), top: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <Coin size={110} />
              </div>
            ))}
            <Headline style={{ position: "absolute", left: 300 - 190 - 170, top: 120, width: 380 }} size={40} words={[["অর্ধেক", t.ordhek1, true]]} />
            <Headline style={{ position: "absolute", left: 300 - 190 + 170, top: 120, width: 380 }} size={40} words={[["অর্ধেক", t.ordhek2, true]]} />
          </div>
        </Glass>
      </Appear>
    </>
  );
};

// ---------- 7. watch it all from your phone, wherever you are ----------

export const PhoneScene: P<"phone"> = ({ t }) => {
  const pal = usePalette();
  const bars = useProgress(t.koto, t.holo2 + 0.5, Easing.out(Easing.cubic));
  return (
    <>
      <Headline style={{ position: "absolute", top: 90, left: 0, right: 0 }} size={64} words={[["আপনি", t.apni], ["যেখানেই", t.jekhanei], ["থাকুন", t.thakun]]} />
      <Appear at={t.phonei} style={{ position: "absolute", left: 300, top: 220 }}>
        <Glass style={{ width: 400, height: 780, padding: 16, borderRadius: 60 }}>
          <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 46, overflow: "hidden", background: "linear-gradient(180deg, #FFFFFF, #F0FAF3)", padding: 26, display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <IconTile icon={FolderKanban} tint={T.teal} size={70} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Skel w={170} strong />
                <Skel w={110} />
              </div>
            </div>
            <div style={{ height: 300, borderRadius: 24, background: pal.tintSoft, display: "flex", alignItems: "flex-end", justifyContent: "space-around", padding: "24px 18px" }}>
              {[0.4, 0.55, 0.5, 0.75, 0.95].map((h, i) => (
                <div key={i} style={{ width: 40, height: 240 * h * interpolate(bars, [i * 0.1, i * 0.1 + 0.5], [0, 1], clamp), borderRadius: 10, background: "linear-gradient(180deg, #22C55E, #0D9488)" }} />
              ))}
            </div>
            {[0, 1].map((i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", borderRadius: 18, background: "white", boxShadow: "0 4px 12px rgba(20,83,45,0.06)" }}>
                <IconTile icon={i ? Coins : ShoppingBag} tint={i ? T.orange : T.green} size={48} />
                <Skel w={140 - i * 30} strong />
              </div>
            ))}
          </div>
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 860, top: 260, display: "flex", flexDirection: "column", gap: 28 }}>
        <MixLine align="left" size={70} words={[["ফোনেই", t.phonei, true], ["দেখতে", t.dekhte], ["পাবেন", t.paben]]} />
        <Appear at={t.taka}>
          <Row width={880}>
            <IconTile icon={FolderKanban} tint={T.teal} size={90} />
            <MixLine align="left" size={56} words={[["টাকা", t.taka], ["কোন", t.kon], ["Project", t.project, false, true], ["আছে", t.ache]]} />
          </Row>
        </Appear>
        <Appear at={t.koto}>
          <Row width={880}>
            <IconTile icon={BarChart3} tint={T.sky} size={90} />
            <Headline align="left" size={56} words={[["কত", t.koto], ["বিক্রি", t.bikri], ["হলো", t.holo]]} />
          </Row>
        </Appear>
        <Appear at={t.koto2}>
          <Row width={880}>
            <IconTile icon={TrendingUp} tint={T.green} size={90} />
            <Headline align="left" size={56} words={[["কত", t.koto2], ["লাভ", t.labh, true], ["হলো", t.holo2]]} />
          </Row>
        </Appear>
      </div>
    </>
  );
};

// ---------- 8. it is a business, so there is risk; we hide nothing ----------

export const RiskScene: P<"risk"> = ({ t }) => (
  <>
    <div style={{ position: "absolute", left: 150, top: 160, display: "flex", flexDirection: "column", gap: 28 }}>
      <Appear at={t.start}>
        <Row width={920}>
          <IconTile icon={TriangleAlert} tint={T.orange} size={96} />
          <Headline align="left" size={56} words={[["এটা", t.start], ["ব্যবসা", t.byabsa], ["তাই", t.tai], ["ঝুঁকিও", t.jhuki], ["আছে", t.ache]]} />
        </Row>
      </Appear>
      <Appear at={t.amra}>
        <Row width={920}>
          <IconTile icon={Eye} tint={T.teal} size={96} />
          <Headline align="left" size={56} words={[["আমরা", t.amra], ["সেটা", t.seta], ["লুকাই", t.lukai], ["না", t.na, true]]} />
        </Row>
      </Appear>
      <Appear at={t.sobkichu}>
        <Row width={920}>
          <IconTile icon={FileSignature} tint={T.green} size={96} />
          <div>
            <Headline align="left" size={56} words={[["লিখিত", t.likhito], ["চুক্তি", t.chuktite]]} />
            <Headline align="left" size={56} words={[["স্বচ্ছ", t.swachchho, true], ["হিসাব", t.hisabe]]} />
          </div>
        </Row>
      </Appear>
    </div>
    <Appear at={t.amra} style={{ position: "absolute", left: 1200, top: 120 }}>
      <PhoneShot src="products/fb-group.jpg" width={520} height={590} />
      <Pop at={t.swachchho} style={{ position: "absolute", right: -30, bottom: 120 }}>
        <CheckBadge size={90} />
      </Pop>
    </Appear>
  </>
);

// ---------- 9. a mother or sister builds a business at home ----------

export const FamilyScene: P<"family"> = ({ t }) => {
  const shop = useProgress(t.dar - 0.2, t.koran + 0.3, Easing.out(Easing.back(1.4)));
  return (
    <>
      <Headline style={{ position: "absolute", top: 90, left: 0, right: 0 }} size={64} words={[["আপনার", t.start], ["পাঠানো", t.pathano], ["টাকায়", t.takay]]} />
      <Appear at={t.desher} style={{ position: "absolute", left: 250, top: 240 }}>
        <Glass style={{ position: "relative", width: 640, height: 700, padding: 0, overflow: "hidden", borderRadius: 40 }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 150, background: "linear-gradient(180deg, #4ADE80, #16A34A)", clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
          <div style={{ position: "absolute", left: 120, top: 200 }}>
            <Girl pose="phone" width={400} />
          </div>
          <div style={{ position: "absolute", right: 30, top: 230, opacity: Math.min(1, shop * 2), transform: `scale(${0.6 + 0.4 * shop})` }}>
            <IconTile icon={Store} tint={T.orange} size={110} />
          </div>
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 990, top: 330 }}>
        <Headline align="left" size={64} words={[["দেশের", t.desher], ["কোন", t.kon], ["এক", t.ek], ["ঘরে", t.ghore]]} />
        <Headline align="left" size={96} style={{ marginTop: 16 }} words={[["একজন", t.ekjon], ["মা", t.ma, true], ["বা", t.ba], ["বোন", t.bon, true]]} />
        <Headline align="left" size={64} style={{ marginTop: 16 }} words={[["নিজের", t.nijer], ["ব্যবসা", t.byabsa], ["দাঁড়", t.dar], ["করান", t.koran]]} />
      </div>
    </>
  );
};

// ---------- 10. jobs for people at home ----------

export const JobsScene: P<"jobs"> = ({ t }) => {
  const spread = useProgress(t.manusher - 0.2, t.kore + 0.4);
  const nodes = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    return { x: 960 + Math.cos(a) * 330, y: 480 + Math.sin(a) * 250 };
  });
  return (
    <>
      <Headline style={{ position: "absolute", top: 80, left: 0, right: 0 }} size={64} words={[["আপনার", t.start], ["কষ্টের", t.koshter], ["টাকা", t.taka]]} />
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        {nodes.map((n, i) => {
          const on = interpolate(spread, [i / 8, (i + 1) / 8], [0, 1], clamp);
          return <line key={i} x1={960} y1={480} x2={960 + (n.x - 960) * on} y2={480 + (n.y - 480) * on} stroke="#86EFAC" strokeWidth={6} strokeLinecap="round" />;
        })}
      </svg>
      <Pop at={t.start} style={{ position: "absolute", left: 960 - 75, top: 480 - 75 }}>
        <Coin size={150} />
      </Pop>
      {nodes.map((n, i) => {
        const on = interpolate(spread, [(i + 0.6) / 8, (i + 1) / 8], [0, 1], clamp);
        return (
          <div key={i} style={{ position: "absolute", left: n.x - 50, top: n.y - 50, opacity: on, transform: `scale(${0.6 + 0.4 * on})` }}>
            <IconTile icon={i % 2 ? Users : Store} tint={i % 2 ? T.teal : T.green} size={100} />
          </div>
        );
      })}
      <Headline style={{ position: "absolute", top: 820, left: 0, right: 0 }} size={64} words={[["দেশের", t.desher], ["মানুষের", t.manusher]]} />
      <div style={{ position: "absolute", top: 900, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "baseline", gap: 24 }}>
        <HeroWord text="কর্মসংস্থান" at={t.kormo} size={96} />
      </div>
    </>
  );
};

// ---------- 11. tagline ----------

const Pillar: React.FC<{ at: number; x: number; h: number; icon: typeof Coins; tint: [string, string]; children: React.ReactNode; sweepAt?: number }> = ({ at, x, h, icon, tint, children, sweepAt }) => {
  const p = useTravel(at - 0.15, at + 0.6);
  return (
    <div style={{ position: "absolute", left: x - 245, top: 960 - h, width: 490, height: h, overflow: "hidden", borderRadius: "36px 36px 0 0" }}>
      <div style={{ transform: `translateY(${(1 - p) * (h + 40)}px)`, height: "100%" }}>
        <Glass style={{ height: h + 40, borderRadius: "36px 36px 0 0", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 54, gap: 30 }}>
          <IconTile icon={icon} tint={tint} size={130} />
          {children}
          {sweepAt !== undefined ? <Sweep from={sweepAt} to={sweepAt + 1} /> : null}
        </Glass>
      </div>
    </div>
  );
};

export const TaglineScene: P<"tagline"> = ({ t }) => {
  const line = useProgress(t.halal - 0.2, t.munafa + 0.4);
  return (
    <>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <path d="M420 500 Q 690 360 960 440 Q 1230 360 1500 500" pathLength={1} fill="none" stroke="url(#tag7)" strokeWidth={8} strokeLinecap="round" strokeDasharray={1} strokeDashoffset={1 - line} />
        <defs>
          <linearGradient id="tag7" x1="0" x2="1">
            <stop offset="0" stopColor="#0D9488" />
            <stop offset="0.5" stopColor="#22C55E" />
            <stop offset="1" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
      <Pillar at={t.start} x={420} h={420} icon={Plane} tint={T.teal}>
        <Headline size={60} style={{ flexWrap: "nowrap", whiteSpace: "nowrap" }} words={[["প্রবাসের", t.start], ["ঘাম", t.gham]]} />
      </Pillar>
      <Pillar at={t.desher} x={960} h={480} icon={Store} tint={T.green}>
        <Headline size={60} style={{ flexWrap: "nowrap", whiteSpace: "nowrap" }} words={[["দেশের", t.desher], ["ব্যবসা", t.byabsa]]} />
      </Pillar>
      <Pillar at={t.halal} x={1500} h={420} icon={Sparkles} tint={T.orange} sweepAt={t.munafa}>
        <Headline size={60} style={{ flexWrap: "nowrap", whiteSpace: "nowrap" }} words={[["হালাল", t.halal, true], ["মুনাফা", t.munafa, true]]} />
      </Pillar>
    </>
  );
};

// ---------- 12. call to action ----------

export const CtaScene: P<"cta"> = ({ t }) => (
  <>
    <Appear at={t.start} rise={60} style={{ position: "absolute", left: 960 - 140, top: 80 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={280} />
        <Sweep from={t.start + 0.2} to={t.start + 1.2} />
      </div>
    </Appear>
    <Headline style={{ position: "absolute", top: 400, left: 0, right: 0 }} size={64} words={[["বিস্তারিত", t.start], ["জানতে", t.janate]]} />
    <Appear at={t.aji} style={{ position: "absolute", top: 500, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", borderRadius: 999 }}>
        <GradPill size={58} icon={Phone}>
          <Word text="আজই" at={t.aji} style={WHITE} /> <Word text="যোগাযোগ" at={t.jogajog} style={WHITE} /> <Word text="করুন" at={t.korun} style={WHITE} />
        </GradPill>
        <Sweep from={t.korun} to={t.korun + 1} />
      </div>
    </Appear>
    <MixLine
      style={{ position: "absolute", top: 690, left: 0, right: 0 }}
      size={68}
      words={[["Mudarabah", t.mudarabah, false, true], ["Trade", t.trade, false, true], ["Limited|-এর", t.limited, false, true], ["সাথে", t.sathe]]}
    />
    <Appear at={t.sathe} style={{ position: "absolute", top: 820, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Pill icon={Globe} size={40}>
        <En weight={600}>www.mudarabahtrade.com</En>
      </Pill>
    </Appear>
  </>
);

