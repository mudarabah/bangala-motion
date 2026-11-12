// Scenes 12–22 of the Mudarabah explainer: written contract, transparency, shared effort,
// the company, how the money works, the payoff and the call to action.
import React from "react";
import {
  ChartColumn,
  Coins,
  Eye,
  Globe,
  Hammer,
  MapPin,
  MousePointer2,
  Package,
  Phone,
  ScrollText,
  Shirt,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Wallet,
} from "lucide-react";
import { Easing, interpolate } from "remotion";
import { Appear, CheckBadge, Glass, GradPill, Headline, IconTile, LogoCard, Pill, Pop, usePalette, useProgress, useTime, Word } from "../../components/kit";
import { fonts, greenIconTints as T } from "../../theme";
import { Connector, En, Skel, Strike } from "../../v2/ui";
import { Coin, HeroWord, Jar, Clock, PartnerNode, Sweep, Tag, useTravel } from "../parts";
import type { Timeline4 } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
type P<K extends keyof Timeline4> = React.FC<{ t: Timeline4[K] }>;

// ---------- 12. written contract, clear accounts ----------

export const ContractScene: P<"contract"> = ({ t }) => {
  const pal = usePalette();
  const sign = useProgress(t.chuktite - 0.1, t.chuktite + 0.8);
  const clear = useProgress(t.swachchho, t.swachchho + 0.7);
  return (
    <>
      <Appear at={t.start} style={{ position: "absolute", left: 250, top: 120, transform: "rotate(-3deg)" }}>
        <Glass style={{ width: 540, height: 820, padding: "56px 56px", display: "flex", flexDirection: "column", gap: 22, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <IconTile icon={ScrollText} tint={T.green} size={84} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Skel w={240} strong />
              <Skel w={170} />
            </div>
          </div>
          <div style={{ position: "relative", marginTop: 20, display: "flex", flexDirection: "column", gap: 20 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderRadius: 16, background: pal.tintSoft }}>
                <Skel w={[200, 160, 220, 180, 150][i]} strong />
                <div style={{ width: 90, height: 18, borderRadius: 9, background: i === 4 ? "#22C55E" : "#BBF7D0" }} />
              </div>
            ))}
            {/* frost that clears when the accounts become "transparent" */}
            <div style={{ position: "absolute", inset: -10, background: "rgba(236,242,238,0.96)", borderRadius: 18, opacity: 1 - clear }} />
          </div>
          <svg width={420} height={120} viewBox="0 0 420 120" style={{ marginTop: "auto" }}>
            <path
              d="M10 80 C 40 20, 70 20, 80 70 S 120 110, 140 60 S 170 10, 190 60 S 230 100, 260 60 C 280 40, 300 50, 320 70 L 400 70"
              pathLength={1}
              fill="none"
              stroke="#16A34A"
              strokeWidth={6}
              strokeLinecap="round"
              strokeDasharray={1}
              strokeDashoffset={1 - sign}
            />
            <line x1={10} y1={100} x2={410} y2={100} stroke={pal.lineStrong} strokeWidth={3} />
          </svg>
          <Sweep from={t.swachchho} to={t.swachchho + 1} />
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 930, top: 330 }}>
        <Headline align="left" size={110} words={[["লিখিত", t.likhito], ["চুক্তি", t.chuktite]]} />
        <Headline align="left" size={110} style={{ marginTop: 10 }} words={[["স্বচ্ছ", t.swachchho, true], ["হিসাব", t.hisabe]]} />
      </div>
    </>
  );
};

// ---------- 13. the investor sees everything ----------

const PhoneMock: React.FC<{ t: Timeline4["dashboard"] }> = ({ t }) => {
  const pal = usePalette();
  const route = useProgress(t.start, t.gelo + 0.4);
  const bars = useProgress(t.koto, t.holo + 0.5, Easing.out(Easing.cubic));
  const H = [0.45, 0.62, 0.5, 0.8, 0.95];
  return (
    <Glass style={{ width: 400, height: 820, padding: 18, borderRadius: 64 }}>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 48, background: "linear-gradient(180deg, #FFFFFF, #F0FAF3)", overflow: "hidden", boxShadow: "inset 0 0 0 1px rgba(22,163,74,0.12)" }}>
        <div style={{ position: "absolute", left: 140, top: 18, width: 84, height: 22, borderRadius: 11, background: pal.lineStrong }} />
        {/* money route */}
        <div style={{ position: "absolute", left: 30, top: 80, right: 30, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {[Wallet, Package, Store].map((I, i) => (
            <div key={i} style={{ opacity: interpolate(route, [i * 0.3, i * 0.3 + 0.2], [0.25, 1], clamp) }}>
              <IconTile icon={I} tint={[T.orange, T.lime, T.green][i]} size={78} />
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 100, top: 116, width: 156 * route, height: 6, borderRadius: 3, background: pal.keyword, opacity: 0.7 }} />
        {/* sales chart */}
        <div style={{ position: "absolute", left: 30, right: 30, top: 230, height: 300, borderRadius: 24, background: pal.tintSoft, display: "flex", alignItems: "flex-end", justifyContent: "space-around", padding: "24px 20px" }}>
          {H.map((h, i) => (
            <div key={i} style={{ width: 38, height: 240 * h * interpolate(bars, [i * 0.1, i * 0.1 + 0.5], [0, 1], clamp), borderRadius: 10, background: "linear-gradient(180deg, #22C55E, #0D9488)" }} />
          ))}
        </div>
        {/* rows */}
        <div style={{ position: "absolute", left: 30, right: 30, top: 560, display: "flex", flexDirection: "column", gap: 18 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 16, background: "white", boxShadow: "0 4px 12px rgba(20,83,45,0.06)" }}>
              <div style={{ width: 34, height: 34, borderRadius: 99, background: pal.lineSoft }} />
              <Skel w={150 - i * 20} strong />
              <div style={{ marginLeft: "auto" }}>
                <Skel w={50} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Glass>
  );
};

const InfoRow: React.FC<{ at: number; icon: typeof MapPin; tint: [string, string]; children: React.ReactNode }> = ({ at, icon, tint, children }) => (
  <Appear at={at}>
    <Glass style={{ width: 900, padding: "26px 36px", display: "flex", alignItems: "center", gap: 30 }}>
      <IconTile icon={icon} tint={tint} size={96} />
      {children}
    </Glass>
  </Appear>
);

export const DashboardScene: P<"dashboard"> = ({ t }) => (
  <>
    <Appear at={t.start - 0.2} style={{ position: "absolute", left: 220, top: 130 }}>
      <PhoneMock t={t} />
    </Appear>
    <div style={{ position: "absolute", left: 790, top: 220, display: "flex", flexDirection: "column", gap: 34 }}>
      <InfoRow at={t.start} icon={MapPin} tint={T.orange}>
        <Headline align="left" size={64} words={[["কোথায়", t.start], ["টাকা", t.taka], ["গেল", t.gelo]]} />
      </InfoRow>
      <InfoRow at={t.koto} icon={ChartColumn} tint={T.teal}>
        <Headline align="left" size={64} words={[["কত", t.koto], ["বিক্রি", t.bikri], ["হলো", t.holo]]} />
      </InfoRow>
      <InfoRow at={t.pujidata} icon={Eye} tint={T.green}>
        <Headline align="left" size={64} words={[["সবকিছু", t.sobkichu], ["জানবেন", t.janben, true]]} />
        <Pop at={t.janben} style={{ marginLeft: "auto" }}>
          <CheckBadge size={64} />
        </Pop>
      </InfoRow>
    </div>
  </>
);

// ---------- 14. no one carries the load alone ----------

const SHARDS = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2 + (i % 3) * 0.3;
  return { dx: Math.cos(a) * (260 + (i % 4) * 70), dy: Math.sin(a) * (180 + (i % 5) * 50) - 60, r: (i * 47) % 180, s: 24 + (i % 4) * 10 };
});

const Sprout: React.FC<{ grow: number; leaves: number }> = ({ grow, leaves }) => (
  <svg width={300} height={340} viewBox="0 0 300 340" style={{ overflow: "visible" }}>
    <path d="M150 340 C 150 280, 140 220, 150 100" pathLength={1} fill="none" stroke="#16A34A" strokeWidth={14} strokeLinecap="round" strokeDasharray={1} strokeDashoffset={1 - grow} />
    <g style={{ transformOrigin: "150px 200px", transform: `scale(${leaves})` }}>
      <path d="M148 200 C 100 190, 70 150, 80 120 C 120 120, 146 160, 148 200 Z" fill="#4ADE80" />
      <path d="M152 160 C 200 150, 230 110, 220 80 C 180 80, 154 120, 152 160 Z" fill="#22C55E" />
    </g>
    <ellipse cx={150} cy={336} rx={110} ry={16} fill="rgba(20,83,45,0.12)" />
  </svg>
);

export const NoBurdenScene: P<"noBurden"> = ({ t }) => {
  const { frame, f } = useTime();
  const drop = useTravel(t.start, t.bojha + 0.2);
  const shatter = useProgress(t.na, t.na + 0.9, Easing.out(Easing.cubic));
  const grow = useProgress(t.obodan - 0.2, t.rakhen + 0.6);
  const leaves = useProgress(t.obodan + 0.2, t.rakhen + 0.8, Easing.out(Easing.cubic));
  const fruitOut = useTravel(t.fol + 0.3, t.pan + 0.6);
  const fruitIn = useProgress(t.fol - 0.1, t.fol + 0.3, Easing.out(Easing.back(1.6)));
  const blockGone = frame > f(t.na) + 2;
  const L = { x: 400, y: 760 };
  const R = { x: 1520, y: 760 };
  return (
    <>
      {!blockGone ? (
        <div style={{ position: "absolute", left: 960 - 230, top: -260 + 560 * drop, width: 460 }}>
          <Glass style={{ height: 230, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(226,232,229,0.95)" }}>
            <Strike at={t.na - 0.25}>
              <Word text="বোঝা" at={t.bojha} style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 110, color: "#475569" }} />
            </Strike>
          </Glass>
        </div>
      ) : null}
      {shatter > 0 && shatter < 1
        ? SHARDS.map((s, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 960 - s.s / 2 + s.dx * shatter,
                top: 415 - s.s / 2 + s.dy * shatter,
                width: s.s,
                height: s.s,
                borderRadius: 6,
                background: "rgba(226,232,229,0.95)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.9)",
                opacity: 1 - shatter,
                transform: `rotate(${s.r * shatter}deg)`,
              }}
            />
          ))
        : null}
      <Headline style={{ position: "absolute", top: 110, left: 0, right: 0 }} size={76} words={[["দুজনেই", t.dujonei], ["অবদান", t.obodan], ["রাখেন", t.rakhen]]} />
      <Headline style={{ position: "absolute", top: 210, left: 0, right: 0 }} size={76} words={[["দুজনেই", t.dujonei2], ["ফল", t.fol, true], ["পান", t.pan]]} />
      <div style={{ position: "absolute", left: 960 - 150, top: 560 }}>
        <Sprout grow={grow} leaves={leaves} />
      </div>
      <PartnerNode x={L.x} y={L.y} icon={Coins} tint={T.orange} at={t.dujonei} size={190} />
      <PartnerNode x={R.x} y={R.y} icon={Store} tint={T.green} at={t.dujonei} size={190} />
      {[L, R].map((n, i) => {
        const sx = 960 + (i === 0 ? -40 : 40);
        const sy = 690;
        const x = sx + (n.x - sx) * fruitOut;
        const y = sy + (n.y - 150 - sy) * fruitOut - Math.sin(fruitOut * Math.PI) * 120;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - 32,
              top: y - 32,
              width: 64,
              height: 64,
              borderRadius: 99,
              background: i === 0 ? "radial-gradient(circle at 35% 30%, #FEF3C7, #F59E0B)" : "radial-gradient(circle at 35% 30%, #DCFCE7, #16A34A)",
              boxShadow: "0 10px 24px rgba(20,83,45,0.2)",
              transform: `scale(${fruitIn})`,
            }}
          />
        );
      })}
    </>
  );
};

// ---------- 15. profit from a real business ----------

export const RealBizScene: P<"realBiz"> = ({ t }) => {
  const { frame, f } = useTime();
  const rising = frame - f(t.start);
  const goods = [Package, Shirt, ShoppingBag, Package, ShoppingBag, Shirt];
  const tints = [T.lime, T.sky, T.orange, T.teal, T.rose, T.green];
  return (
    <>
      <Appear at={t.start - 0.2} style={{ position: "absolute", left: 960 - 340, top: 150 }}>
        <div style={{ position: "relative", width: 680 }}>
          {/* awning */}
          <div style={{ height: 96, borderRadius: "28px 28px 10px 10px", overflow: "hidden", display: "flex", boxShadow: "0 14px 30px rgba(20,83,45,0.16)" }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ flex: 1, background: i % 2 ? "rgba(255,255,255,0.95)" : "linear-gradient(180deg, #4ADE80, #16A34A)" }} />
            ))}
          </div>
          <Glass style={{ marginTop: -8, height: 400, borderRadius: "0 0 32px 32px", padding: "40px 50px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30, alignItems: "center", justifyItems: "center" }}>
            {goods.map((g, i) => (
              <Pop key={i} at={t.sottikarer} delay={i * 3}>
                <IconTile icon={g} tint={tints[i]} size={118} />
              </Pop>
            ))}
          </Glass>
        </div>
      </Appear>
      {rising > 0
        ? [0, 1, 2, 3].map((k) => {
            const u = ((rising / 70 + k / 4) % 1 + 1) % 1;
            return (
              <Coin
                key={k}
                size={56}
                style={{ position: "absolute", left: 960 - 200 + k * 130, top: 150 - u * 140, opacity: Math.min(1, u * 5, (1 - u) * 3) * Math.min(1, rising / 15) }}
              />
            );
          })
        : null}
      <Headline style={{ position: "absolute", top: 700, left: 0, right: 0 }} size={92} words={[["সত্যিকারের", t.sottikarer, true], ["ব্যবসা", t.byabsa, true]]} />
      <Headline style={{ position: "absolute", top: 830, left: 0, right: 0 }} size={64} words={[["পরিশ্রম", t.porishrom]]} />
    </>
  );
};

// ---------- 16. the company ----------

export const CompanyScene: P<"company"> = ({ t }) => (
  <>
    <Appear at={t.start} rise={90} scaleFrom={0.9} style={{ position: "absolute", left: 960 - 160, top: 110 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={320} />
        <Sweep from={t.start + 0.2} to={t.start + 1.2} />
      </div>
    </Appear>
    <Headline style={{ position: "absolute", top: 500, left: 0, right: 0 }} size={96} words={[["মুদারাবাহ", t.start], ["ট্রেড", t.trade], ["লিমিটেড", t.limited]]} />
    <Headline style={{ position: "absolute", top: 650, left: 0, right: 0 }} size={62} words={[["এই", t.ei], ["নীতিতেই", t.niti, true], ["কাজ", t.kaj], ["করে", t.kore]]} />
  </>
);

// ---------- 17. investor money → goods → our entrepreneurs sell ----------

const FlowCard: React.FC<{ at: number; x: number; icon: typeof Wallet; tint: [string, string]; children: React.ReactNode; badgeAt?: number }> = ({
  at,
  x,
  icon,
  tint,
  children,
  badgeAt,
}) => (
  <Appear at={at} style={{ position: "absolute", left: x - 210, top: 290 }}>
    <Glass style={{ width: 420, height: 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26 }}>
      <IconTile icon={icon} tint={tint} size={150} />
      <div style={{ textAlign: "center" }}>{children}</div>
      {badgeAt !== undefined ? (
        <Pop at={badgeAt} style={{ position: "absolute", right: -18, top: -18 }}>
          <CheckBadge size={72} />
        </Pop>
      ) : null}
    </Glass>
  </Appear>
);

export const FlowScene: P<"flow"> = ({ t }) => {
  const c1 = useTravel(t.takay, t.ponno + 0.2);
  const c2 = useTravel(t.amader, t.uddokta + 0.4);
  return (
    <>
      <FlowCard at={t.start} x={360} icon={Wallet} tint={T.orange}>
        <Tag size={50}>বিনিয়োগকারী</Tag>
      </FlowCard>
      <FlowCard at={t.ponno} x={960} icon={Package} tint={T.lime}>
        <Headline size={50} words={[["পণ্য", t.ponno], ["কেনা", t.kena]]} />
      </FlowCard>
      <FlowCard at={t.uddokta} x={1560} icon={Store} tint={T.green} badgeAt={t.bikri}>
        <Headline size={50} words={[["উদ্যোক্তারা", t.uddokta, true]]} />
        <Headline size={38} style={{ fontWeight: 600, marginTop: 4 }} words={[["বিক্রি", t.bikri], ["করেন", t.koren]]} />
      </FlowCard>
      <Connector x={575} y={490} width={170} from={t.takay} to={t.ponno} />
      <Connector x={1175} y={490} width={170} from={t.amader} to={t.uddokta} />
      {c1 > 0 && c1 < 1 ? <Coin size={50} style={{ position: "absolute", left: 575 + 170 * c1 - 25, top: 440 - 25 }} /> : null}
      {c2 > 0 && c2 < 1 ? (
        <div style={{ position: "absolute", left: 1175 + 170 * c2 - 30, top: 440 - 30 }}>
          <IconTile icon={Package} tint={T.lime} size={60} />
        </div>
      ) : null}
    </>
  );
};

// ---------- 18. capital comes back, profit is shared ----------

const ARC_A: [number, number] = [1500, 600];
const ARC_C: [number, number] = [960, 900];
const ARC_B: [number, number] = [420, 600];
const qp = (u: number): [number, number] => [
  (1 - u) * (1 - u) * ARC_A[0] + 2 * (1 - u) * u * ARC_C[0] + u * u * ARC_B[0],
  (1 - u) * (1 - u) * ARC_A[1] + 2 * (1 - u) * u * ARC_C[1] + u * u * ARC_B[1],
];

export const ReturnsScene: P<"returns"> = ({ t }) => {
  const pal = usePalette();
  const { frame, f } = useTime();
  const arc = useProgress(t.start, t.muldhon + 0.4);
  const split = useTravel(t.bhag, t.bhag + 0.9);
  return (
    <>
      <PartnerNode x={420} y={460} icon={Wallet} tint={T.orange} at={t.start - 1} size={220} active={useProgress(t.ferot, t.ferot + 0.5)} />
      <PartnerNode x={1500} y={460} icon={Store} tint={T.green} at={t.start - 1} size={220} />
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <path
          d={`M${ARC_A[0]} ${ARC_A[1]} Q${ARC_C[0]} ${ARC_C[1]} ${ARC_B[0]} ${ARC_B[1]}`}
          pathLength={1}
          fill="none"
          stroke={pal.lineStrong}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={1 - arc}
        />
      </svg>
      {[0, 1, 2].map((k) => {
        const s = f(t.muldhon) + k * 6;
        const u = interpolate(frame, [s, s + 36], [0, 1], { ...clamp, easing: Easing.bezier(0.45, 0, 0.25, 1) });
        if (u <= 0 || u >= 1) return null;
        const [x, y] = qp(u);
        return <Coin key={k} size={58} style={{ position: "absolute", left: x - 29, top: y - 29 }} />;
      })}
      <Headline style={{ position: "absolute", top: 120, left: 0, right: 0 }} size={92} words={[["মূলধন", t.muldhon, true], ["ফেরত", t.ferot, true]]} />
      <Pop at={t.labh} style={{ position: "absolute", left: 0, top: 0 }}>
        {[-1, 1].map((d) => (
          <Coin
            key={d}
            size={110}
            style={{
              position: "absolute",
              left: 960 - 55 + d * (12 + 460 * split),
              top: 420 - 55 + 40 * split,
              opacity: 1 - 0.8 * interpolate(split, [0.8, 1], [0, 1], clamp),
            }}
          />
        ))}
      </Pop>
      <Headline style={{ position: "absolute", top: 560, left: 0, right: 0 }} size={64} words={[["লাভ", t.labh], ["ভাগ", t.bhag]]} />
      <Appear at={t.chukti} style={{ position: "absolute", top: 880, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Pill icon={ScrollText} size={40}>
          <Word text="চুক্তি" at={t.chukti} /> <Word text="অনুযায়ী" at={t.onujayi} />
        </Pill>
      </Appear>
    </>
  );
};

// ---------- 19. your money works the halal way ----------

export const HalalScene: P<"halal"> = ({ t }) => {
  const fog = 1 - useProgress(t.apnar, t.halal + 0.3);
  const glow = useProgress(t.halal, t.kaj + 0.5);
  const lift = useProgress(t.kaj, t.kaj + 0.6);
  return (
    <>
      <div style={{ position: "absolute", left: 160, top: 320 }}>
        <Headline align="left" size={132} words={[["হালাল", t.halal, true], ["উপায়ে", t.upaye]]} />
        <Headline align="left" size={88} style={{ marginTop: 14 }} words={[["কাজ", t.kaj], ["করে", t.kore]]} />
      </div>
      <Appear at={t.start - 0.4} rise={0} style={{ position: "absolute", left: 1120, top: 250 }}>
        <div style={{ filter: `saturate(${1 - 0.55 * fog})` }}>
          <Jar fog={fog} glow={glow} lift={lift} />
        </div>
      </Appear>
      <Appear at={t.start - 0.4} rise={0} style={{ position: "absolute", left: 1580, top: 230 }}>
        <Clock startAt={t.kaj} />
      </Appear>
    </>
  );
};

// ---------- 20. a family smiles ----------

const House: React.FC<{ t: Timeline4["family"] }> = ({ t }) => {
  const warm = useProgress(t.poribarer, t.poribarer + 0.8);
  const smile = useProgress(t.hasi - 0.1, t.hasi + 0.6);
  const stall = useProgress(t.dar - 0.2, t.dar + 0.3, Easing.out(Easing.back(1.5)));
  const win = (x: number) => (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 70,
        width: 120,
        height: 110,
        borderRadius: 18,
        background: `linear-gradient(180deg, rgba(255,255,255,0.9), rgba(220,252,231,0.8))`,
        boxShadow: `inset 0 0 0 3px rgba(22,163,74,0.18), 0 0 ${60 * warm}px rgba(251,191,36,${0.65 * warm}), inset 0 0 ${80 * warm}px rgba(251,191,36,${0.9 * warm})`,
      }}
    />
  );
  return (
    <div style={{ position: "relative", width: 620, height: 540 }}>
      {/* warm glow behind */}
      <div style={{ position: "absolute", inset: -160, background: `radial-gradient(closest-side, rgba(253,214,140,${0.55 * warm}), rgba(253,214,140,0))` }} />
      {/* roof */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 620,
          height: 210,
          clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
          background: "linear-gradient(180deg, #4ADE80, #16A34A)",
        }}
      />
      <Glass style={{ position: "absolute", left: 70, top: 200, width: 480, height: 340, padding: 0, borderRadius: "0 0 28px 28px" }}>
        {win(50)}
        {win(310)}
        {/* smile */}
        <svg style={{ position: "absolute", left: 140, top: 190 }} width={200} height={60} viewBox="0 0 200 60">
          <path d="M10 10 Q 100 70 190 10" pathLength={1} fill="none" stroke="#F59E0B" strokeWidth={9} strokeLinecap="round" strokeDasharray={1} strokeDashoffset={1 - smile} />
        </svg>
        {/* door */}
        <div style={{ position: "absolute", left: 190, top: 250, width: 100, height: 90, borderRadius: "16px 16px 0 0", background: "linear-gradient(180deg, #BBF7D0, #86EFAC)" }} />
      </Glass>
      {/* the home business: phone + parcel at the door */}
      <Pop at={t.byabsa} style={{ position: "absolute", left: 600, top: 330 }}>
        <IconTile icon={Smartphone} tint={T.teal} size={110} />
      </Pop>
      <div style={{ position: "absolute", left: -90, top: 400, opacity: Math.min(1, stall * 2), transform: `translateY(${(1 - stall) * 40}px)` }}>
        <IconTile icon={Package} tint={T.lime} size={110} />
      </div>
    </div>
  );
};

export const FamilyScene: P<"family"> = ({ t }) => (
  <>
    <Appear at={t.start} style={{ position: "absolute", left: 960 - 310, top: 70 }}>
      <House t={t} />
    </Appear>
    <Headline style={{ position: "absolute", top: 650, left: 0, right: 0 }} size={62} words={[["ঘরে", t.ghore], ["বসে", t.bose], ["নিজের", t.nijer], ["ব্যবসা", t.byabsa]]} />
    <div style={{ position: "absolute", top: 740, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 30 }}>
      <HeroWord text="হাসি" at={t.hasi} size={140} />
      <Word text="ফোটে" at={t.fote} style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 140, lineHeight: 1.2 }} />
    </div>
  </>
);

// ---------- 21. your capital, our effort, blessing for all ----------

const Pillar: React.FC<{ at: number; x: number; h: number; icon: typeof Coins; tint: [string, string]; children: React.ReactNode; sweepAt?: number }> = ({
  at,
  x,
  h,
  icon,
  tint,
  children,
  sweepAt,
}) => {
  const p = useTravel(at - 0.15, at + 0.6);
  return (
    <div style={{ position: "absolute", left: x - 245, top: 940 - h, width: 490, height: h, overflow: "hidden", borderRadius: "36px 36px 0 0" }}>
      <div style={{ transform: `translateY(${(1 - p) * (h + 40)}px)`, height: "100%" }}>
        <Glass style={{ height: h + 40, borderRadius: "36px 36px 0 0", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 50, gap: 30 }}>
          <IconTile icon={icon} tint={tint} size={130} />
          {children}
          {sweepAt !== undefined ? <Sweep from={sweepAt} to={sweepAt + 1} /> : null}
        </Glass>
      </div>
    </div>
  );
};

export const TaglineScene: P<"tagline"> = ({ t }) => {
  const line = useProgress(t.sobar, t.barkat + 0.3);
  const glow = useProgress(t.barkat, t.barkat + 0.5);
  return (
    <>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <path
          d="M420 470 Q 690 330 960 410 Q 1230 330 1500 470"
          pathLength={1}
          fill="none"
          stroke="url(#tag4)"
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={1 - line}
          style={{ filter: `drop-shadow(0 0 ${14 * glow}px rgba(34,197,94,0.8))` }}
        />
        <defs>
          <linearGradient id="tag4" x1="0" x2="1">
            <stop offset="0" stopColor="#F59E0B" />
            <stop offset="0.5" stopColor="#22C55E" />
            <stop offset="1" stopColor="#0D9488" />
          </linearGradient>
        </defs>
      </svg>
      <Pillar at={t.start} x={420} h={420} icon={Coins} tint={T.orange}>
        <Headline size={56} style={{ flexWrap: "nowrap", whiteSpace: "nowrap" }} words={[["আপনার", t.start], ["পুঁজি", t.puji]]} />
      </Pillar>
      <Pillar at={t.amader} x={960} h={500} icon={Hammer} tint={T.teal}>
        <Headline size={56} style={{ flexWrap: "nowrap", whiteSpace: "nowrap" }} words={[["আমাদের", t.amader], ["পরিশ্রম", t.porishrom]]} />
      </Pillar>
      <Pillar at={t.sobar} x={1500} h={420} icon={Sparkles} tint={T.green} sweepAt={t.barkat}>
        <Headline size={56} style={{ flexWrap: "nowrap", whiteSpace: "nowrap" }} words={[["সবার", t.sobar], ["বরকত", t.barkat, true]]} />
      </Pillar>
    </>
  );
};

// ---------- 22. contact ----------

export const CtaScene: P<"cta"> = ({ t }) => {
  const { frame, f } = useTime();
  const cur = useTravel(t.jogajog + 0.1, t.jogajog + 0.7);
  const click = interpolate(frame, [f(t.korun), f(t.korun) + 4, f(t.korun) + 10], [1, 0.95, 1], clamp);
  return (
    <>
      <Appear at={t.start} rise={60} style={{ position: "absolute", left: 960 - 140, top: 80 }}>
        <div style={{ position: "relative", borderRadius: 32 }}>
          <LogoCard size={280} />
          <Sweep from={t.start + 0.2} to={t.start + 1.2} />
        </div>
      </Appear>
      <Headline style={{ position: "absolute", top: 400, left: 0, right: 0 }} size={64} words={[["বিস্তারিত", t.start], ["জানতে", t.janate]]} />
      <Appear at={t.jogajog} style={{ position: "absolute", top: 510, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ transform: `scale(${click})` }}>
          <GradPill icon={Phone} size={54}>
            <Word text="যোগাযোগ" at={t.jogajog} style={{ color: "white", filter: "none" }} />{" "}
            <Word text="করুন" at={t.korun} style={{ color: "white", filter: "none" }} />
          </GradPill>
        </div>
      </Appear>
      {cur > 0 ? (
        <div style={{ position: "absolute", left: 1320 - 250 * cur, top: 760 - 150 * cur, opacity: Math.min(1, cur * 3) }}>
          <MousePointer2 size={64} color="#10261A" fill="white" strokeWidth={2} />
        </div>
      ) : null}
      <Headline style={{ position: "absolute", top: 700, left: 0, right: 0 }} size={68} words={[["মুদারাবাহ", t.mudarabah], ["ট্রেড", t.trade], ["লিমিটেড", t.limiteder]]} />
      <Appear at={t.sathe} style={{ position: "absolute", top: 830, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Pill icon={Globe} size={38}>
          <En weight={600}>uddoktajourney.com</En>
        </Pill>
      </Appear>
    </>
  );
};
