// First half of the Uddokta Journey video: the dream, how it got buried, and how much
// work starting a business alone takes.
import React from "react";
import {
  CirclePause,
  FileText,
  ClipboardList,
  GraduationCap,
  Heart,
  House,
  Package,
  Star,
  UserRound,
  Users,
} from "lucide-react";
import { Easing } from "remotion";
import { Appear, Float, Glass, GradPill, Headline, IconTile, Label, Pill, Pop, useEnter, usePalette, useProgress, Word } from "../../components/kit";
import { Girl } from "../Girl";
import { HASSLES, HassleBlock } from "../hassles";
import { fonts, greenIconTints as T } from "../../theme";
import type { Timeline3 } from "../timeline";
import { GradText, IconCard, Strike } from "../../v2/ui";

// "পড়াশোনা শেষ করেছেন। অনেক স্বপ্ন ছিল, নিজের একটা পরিচয় হবে।"
export const StudyScene: React.FC<{ t: Timeline3["study"] }> = ({ t }) => (
  <>
    <Pop at={t.start} style={{ position: "absolute", left: 960 - 80, top: 120 }}>
      <Float>
        <IconTile icon={GraduationCap} tint={T.green} size={160} />
      </Float>
    </Pop>
    <Headline
      style={{ position: "absolute", top: 330, left: 0, right: 0 }}
      size={100}
      words={[
        ["পড়াশোনা", t.start],
        ["শেষ", t.shesh],
        ["করেছেন", t.korechen, true],
      ]}
    />
    <Headline
      style={{ position: "absolute", top: 500, left: 0, right: 0 }}
      size={72}
      words={[
        ["অনেক", t.onek],
        ["স্বপ্ন", t.swapno, true],
        ["ছিল", t.chhilo],
      ]}
    />
    <Appear at={t.nijer} style={{ position: "absolute", left: 0, right: 0, top: 700, display: "flex", justifyContent: "center" }}>
      <Glass active={1} style={{ display: "flex", alignItems: "center", gap: 30, padding: "26px 46px" }}>
        <IconTile icon={UserRound} tint={T.orange} size={96} />
        <Headline
          size={64}
          words={[
            ["নিজের", t.nijer],
            ["একটা", t.ekta],
            ["পরিচয়", t.porichoy, true],
            ["হবে", t.hobe],
          ]}
        />
      </Glass>
    </Appear>
  </>
);

// "সংসার, পরিবার সবকিছুর মাঝে স্বপ্নটা কোথাও চাপা পড়ে গেছে।"
export const BuriedScene: React.FC<{ t: Timeline3["buried"] }> = ({ t }) => {
  const sink = useProgress(t.chapa, t.gechhe + 0.6);
  return (
    <>
      <IconCard at={t.start} icon={House} tint={T.orange} label="সংসার" width={380} iconSize={120} style={{ position: "absolute", left: 230, top: 260 }} />
      <IconCard at={t.poribar} icon={Users} tint={T.sky} label="পরিবার" width={380} iconSize={120} style={{ position: "absolute", left: 1310, top: 260 }} />
      <Appear at={t.sobkichur} style={{ position: "absolute", left: 0, right: 0, top: 150, display: "flex", justifyContent: "center" }}>
        <Pill size={34}>সবকিছুর মাঝে</Pill>
      </Appear>
      <Appear at={t.swapnota} style={{ position: "absolute", left: 760, top: 290 }}>
        <div
          style={{
            transform: `translateY(${sink * 90}px) scale(${1 - sink * 0.12})`,
            opacity: 1 - sink * 0.55,
            filter: `grayscale(${sink}) blur(${sink * 3}px)`,
          }}
        >
          <Glass active={1 - sink} style={{ width: 400, display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: "34px 28px" }}>
            <IconTile icon={Star} tint={T.green} size={120} />
            <Label size={44} style={{ fontFamily: fonts.display, fontWeight: 700 }}>
              স্বপ্ন
            </Label>
          </Glass>
        </div>
      </Appear>
      <Headline
        style={{ position: "absolute", top: 800, left: 0, right: 0 }}
        size={80}
        words={[
          ["স্বপ্নটা", t.swapnota],
          ["কোথাও", t.kothao],
          ["চাপা", t.chapa, true],
          ["পড়ে", t.pore],
          ["গেছে", t.gechhe],
        ]}
      />
    </>
  );
};

// "কিন্তু মনের ভেতর আজও একটা ইচ্ছে আছে নিজের কিছু করার।"
export const WishScene: React.FC<{ t: Timeline3["wish"] }> = ({ t }) => (
  <>
    <Pop at={t.moner} style={{ position: "absolute", left: 960 - 80, top: 130 }}>
      <Float>
        <IconTile icon={Heart} tint={T.rose} size={160} />
      </Float>
    </Pop>
    <Headline
      style={{ position: "absolute", top: 360, left: 0, right: 0 }}
      size={88}
      words={[
        ["কিন্তু", t.start],
        ["মনের", t.moner],
        ["ভেতর", t.bhetor],
        ["আজও", t.ajo],
      ]}
    />
    <Headline
      style={{ position: "absolute", top: 500, left: 0, right: 0 }}
      size={96}
      words={[
        ["একটা", t.ekta],
        ["ইচ্ছে", t.icche, true],
        ["আছে", t.achhe],
      ]}
    />
    <Appear at={t.nijer} style={{ position: "absolute", left: 0, right: 0, top: 740, display: "flex", justifyContent: "center" }}>
      <GradPill icon={Star} size={44} style={{ padding: "22px 54px" }}>
        নিজের কিছু করার
      </GradPill>
    </Appear>
  </>
);

// "আসুন একটা business শুরু করি। কী কী লাগবে?"
// Storyboard: a woman with a phone, thinking "নিজের একটা ফ্যাশন বিজনেস?"
export const LetsStartScene: React.FC<{ t: Timeline3["letsStart"] }> = ({ t }) => (
  <>
    <Appear at={t.start} style={{ position: "absolute", left: 170, top: 330 }}>
      <Float amp={6}>
        <Girl pose="phone" width={440} />
      </Float>
    </Appear>
    <Pop at={t.start} delay={6} style={{ position: "absolute", left: 120, top: 120 }}>
      <Glass style={{ padding: "22px 38px", borderRadius: 40, background: "rgba(255,255,255,0.95)" }}>
        <Label size={40} style={{ fontFamily: fonts.display, fontWeight: 700 }}>
          নিজের একটা ফ্যাশন বিজনেস?
        </Label>
      </Glass>
      <div style={{ position: "absolute", left: 250, top: 112, width: 34, height: 34, borderRadius: 99, background: "white", boxShadow: "0 6px 14px rgba(20,83,45,0.12)" }} />
      <div style={{ position: "absolute", left: 286, top: 160, width: 20, height: 20, borderRadius: 99, background: "white", boxShadow: "0 6px 14px rgba(20,83,45,0.12)" }} />
    </Pop>
    <div style={{ position: "absolute", top: 290, left: 760, right: 80, display: "flex", flexWrap: "wrap", alignItems: "baseline", columnGap: 24, lineHeight: 1.15, fontFamily: fonts.display, fontWeight: 800, fontSize: 92 }}>
      <Word text="আসুন" at={t.start} />
      <Word text="একটা" at={t.ekta} />
      <Word text="Business" at={t.business} grad style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: "0.88em" }} />
      <Word text="শুরু" at={t.shuru} />
      <Word text="করি" at={t.kori} />
    </div>
    <Appear at={t.ki} style={{ position: "absolute", left: 760, top: 660 }}>
      <Glass active={1} style={{ display: "flex", alignItems: "center", gap: 30, padding: "26px 50px" }}>
        <IconTile icon={ClipboardList} tint={T.orange} size={100} />
        <GradText size={88}>কী কী লাগবে?</GradText>
      </Glass>
    </Appear>
  </>
);

// Shows its children from `at` until `to` (fades in and out).
const During: React.FC<{ at: number; to?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ at, to, style, children }) => {
  const inP = useEnter(at);
  const outP = useEnter(to ?? 1e9);
  return <div style={{ position: "absolute", inset: 0, opacity: inP * (1 - outP), transform: `translateY(${(1 - inP) * 24}px)`, ...style }}>{children}</div>;
};

// Mini illustrations for each step of the checklist.
const QuestionMarks: React.FC = () => (
  <>
    {[
      [-190, -80, 64],
      [170, -110, 80],
      [-150, 120, 54],
      [200, 90, 60],
    ].map(([x, y, s], i) => (
      <Float key={i} phase={i} style={{ position: "absolute", left: 300 + x, top: 230 + y }}>
        <GradText size={s}>?</GradText>
      </Float>
    ))}
  </>
);

const StepVisual: React.FC<{ i: number; t: Timeline3["checklist"] }> = ({ i, t }) => {
  const pal = usePalette();
  const load = useProgress(t.website, t.order);
  const rows = useProgress(t.protita, t.protita + 2.4);
  const h = HASSLES[i];
  const center = { position: "absolute" as const, left: 300 - 70, top: 230 - 70 };
  if (i === 0)
    return (
      <>
        <IconTile icon={Package} tint={h.tint} size={140} style={center} />
        <QuestionMarks />
      </>
    );
  if (i === 1)
    return (
      <>
        <IconTile icon={House} tint={T.orange} size={130} style={{ position: "absolute", left: 120, top: 150 }} />
        {[
          [300, 250],
          [380, 250],
          [460, 250],
          [340, 180],
          [420, 180],
          [380, 110],
        ].map(([x, y], k) => (
          <Pop key={k} at={t.basatei} delay={k * 3} style={{ position: "absolute", left: x, top: y }}>
            <div style={{ width: 74, height: 66, borderRadius: 10, background: "linear-gradient(160deg, #FCD9A8, #E0A86A)", boxShadow: "inset 0 -6px 0 rgba(0,0,0,0.08)", borderTop: "8px solid #C98B4E" }} />
          </Pop>
        ))}
      </>
    );
  if (i === 2)
    return (
      <div style={{ position: "absolute", left: 90, top: 90, width: 420, display: "flex", flexDirection: "column", gap: 16 }}>
        {[260, 340, 200, 300, 230].map((w, k) => (
          <div key={k} style={{ display: "flex", gap: 12, marginLeft: (k % 3) * 34 }}>
            <div style={{ height: 14, width: w * 0.35, borderRadius: 8, background: ["#86EFAC", "#7DD3FC", "#FCD34D"][k % 3] }} />
            <div style={{ height: 14, width: w * 0.5, borderRadius: 8, background: pal.lineStrong }} />
          </div>
        ))}
        <div style={{ marginTop: 26, height: 26, borderRadius: 99, background: pal.lineSoft, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${load * 100}%`, background: pal.button }} />
        </div>
      </div>
    );
  if (i === 3)
    return (
      <>
        {[
          [120, 200, -14, 120],
          [300, 150, 9, 140],
          [440, 240, -6, 100],
        ].map(([x, y, r, s], k) => (
          <IconTile key={k} icon={Package} tint={T.lime} size={s} style={{ position: "absolute", left: x, top: y, transform: `rotate(${r}deg)` }} />
        ))}
        <div style={{ position: "absolute", left: 200, top: 360, width: 200, height: 22, borderRadius: 8, background: "#D6B98C", transform: "rotate(8deg)" }} />
      </>
    );
  if (i === 4)
    return (
      <div style={{ position: "absolute", left: 160, top: 70, width: 280, height: 330, borderRadius: 22, background: "white", boxShadow: `0 14px 30px rgba(${pal.shadowRgb},0.12)`, padding: 30, display: "flex", flexDirection: "column", gap: 22 }}>
        <FileText size={56} color={h.tint[1]} />
        {[1, 2, 3, 4].map((k) => (
          <div key={k} style={{ height: 30, borderRadius: 8, border: `3px solid ${pal.lineStrong}` }} />
        ))}
      </div>
    );
  return (
    <div style={{ position: "absolute", left: 80, top: 80, width: 440, borderRadius: 18, background: "white", boxShadow: `0 14px 30px rgba(${pal.shadowRgb},0.12)`, overflow: "hidden" }}>
      {Array.from({ length: 7 }).map((_, r) => (
        <div key={r} style={{ display: "flex", borderBottom: `2px solid ${pal.lineSoft}`, height: 44 }}>
          {[0.25, 0.45, 0.3].map((w, c) => (
            <div key={c} style={{ flex: w, borderRight: `2px solid ${pal.lineSoft}`, display: "flex", alignItems: "center", padding: "0 10px" }}>
              {r === 0 ? (
                <div style={{ height: 12, width: "70%", borderRadius: 6, background: pal.lineStrong }} />
              ) : (
                <div style={{ height: 10, width: "80%", borderRadius: 6, background: "#FDA4AF", opacity: rows * 7 > r ? 1 : 0 }} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// "প্রথমে product sourcing ... প্রতিটা orderের courier data entry।"
// Storyboard: each step gets its own picture, and the "pile of hassles" grows with it.
export const ChecklistScene: React.FC<{ t: Timeline3["checklist"] }> = ({ t }) => {
  const at = [t.sourcing, t.warehouse, t.website, t.order, t.courier, t.protita];
  return (
    <>
      <Appear at={t.sourcing} style={{ position: "absolute", left: 130, top: 170 }}>
        <Glass style={{ width: 760, height: 720, padding: 0, overflow: "hidden" }}>
          {HASSLES.map((h, i) => (
            <During key={i} at={at[i]} to={at[i + 1]}>
              <div style={{ position: "absolute", left: 80, top: 60, width: 600, height: 460 }}>
                <StepVisual i={i} t={t} />
              </div>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 70, display: "flex", justifyContent: "center" }}>
                <GradText size={64}>{h.label}</GradText>
              </div>
            </During>
          ))}
        </Glass>
      </Appear>
      {/* the pile grows from the bottom up */}
      {HASSLES.map((h, i) => {
        const tilt = [-3, 2, -1.5, 3, -2.5, 1.5][i];
        return (
          <Drop key={i} at={at[i]} style={{ position: "absolute", left: 1080 + [0, 40, 10, 50, 20, 30][i], top: 800 - i * 104 }}>
            <HassleBlock h={h} width={600} style={{ transform: `rotate(${tilt}deg)` }} />
          </Drop>
        );
      })}
    </>
  );
};

// Falls into place from above (no bounce).
const Drop: React.FC<{ at: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ at, style, children }) => {
  const p = useEnter(at);
  return <div style={{ ...style, opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * -160}px)` }}>{children}</div>;
};

// Where the pile sits over the woman in the overwhelm scene (and where it shatters from).
const PILE_X = 700;
const pileSlot = (i: number) => ({ left: PILE_X - 230 + (i % 2) * 20 - 10, top: 500 - i * 62, tilt: [-4, 3, -2, 4, -3, 2][i] });

// "এত কিছু একা সামলানো? শুরু করার আগেই তো স্বপ্নটা আবার থেমে যায়।"
// Storyboard: all six hassles press down on her; she sits with a hand on her forehead.
export const OverwhelmScene: React.FC<{ t: Timeline3["overwhelm"] }> = ({ t }) => {
  const press = useProgress(t.start, t.samlano + 0.4);
  return (
    <>
      <Headline
        style={{ position: "absolute", top: 70, left: 0, right: 0 }}
        size={84}
        words={[
          ["এত", t.start],
          ["কিছু", t.kichu],
          ["একা", t.eka, true],
          ["সামলানো?", t.samlano],
        ]}
      />
      <div style={{ position: "absolute", left: PILE_X - 210, top: 560 + press * 18 }}>
        <Girl pose="stressed" width={420} />
      </div>
      {HASSLES.map((h, i) => {
        const s = pileSlot(i);
        return (
          <Drop key={i} at={t.start + i * 0.12} style={{ position: "absolute", left: s.left, top: s.top + press * 18 }}>
            <HassleBlock h={h} width={460} style={{ transform: `rotate(${s.tilt}deg)` }} />
          </Drop>
        );
      })}
      <div style={{ position: "absolute", left: 1220, right: 80, top: 430, display: "flex", flexDirection: "column", gap: 20 }}>
        <Headline
          align="left"
          size={62}
          words={[
            ["শুরু", t.shuru],
            ["করার", t.korar],
            ["আগেই", t.agei],
            ["তো", t.toh],
          ]}
        />
        <Headline
          align="left"
          size={80}
          words={[
            ["স্বপ্নটা", t.swapnota],
            ["আবার", t.abar],
            ["থেমে", t.theme, true],
            ["যায়", t.jay],
          ]}
        />
        <Pop at={t.theme}>
          <CirclePause size={84} color="#EF4444" strokeWidth={2.2} />
        </Pop>
      </div>
    </>
  );
};

// "না, এত ঝামেলা আর নয়।"  Storyboard: the hassles break like glass and fly away.
export const NoMoreScene: React.FC<{ t: Timeline3["noMore"] }> = ({ t }) => {
  const burst = useProgress(t.start, t.start + 1.1, Easing.out(Easing.cubic));
  const shards = Array.from({ length: 18 }).map((_, k) => {
    const ang = (k / 18) * Math.PI * 2 + (k % 3) * 0.3;
    const dist = 380 + (k % 5) * 120;
    return { ang, dist, size: 40 + (k % 4) * 22, rot: (k % 2 ? 1 : -1) * (120 + k * 17) };
  });
  return (
    <>
      {/* the pile, cracking apart and flying out */}
      {HASSLES.map((h, i) => {
        const s = pileSlot(i);
        const dir = i % 2 ? 1 : -1;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.left,
              top: s.top,
              opacity: 1 - burst,
              filter: `blur(${burst * 6}px)`,
              transform: `translate(${dir * burst * (500 + i * 60)}px, ${(i - 2.5) * burst * 160 - burst * 120}px) rotate(${s.tilt + dir * burst * 50}deg) scale(${1 - burst * 0.3})`,
            }}
          >
            <HassleBlock h={h} width={460} />
          </div>
        );
      })}
      {shards.map((sh, k) => (
        <div
          key={k}
          style={{
            position: "absolute",
            left: PILE_X + Math.cos(sh.ang) * sh.dist * burst,
            top: 330 + Math.sin(sh.ang) * sh.dist * 0.7 * burst,
            width: sh.size,
            height: sh.size,
            clipPath: "polygon(50% 0%, 100% 70%, 20% 100%)",
            background: "linear-gradient(160deg, rgba(255,255,255,0.95), rgba(187,247,208,0.7))",
            opacity: burst > 0 ? (1 - burst) * 0.9 : 0,
            transform: `rotate(${sh.rot * burst}deg)`,
          }}
        />
      ))}
      <Pop at={t.start} style={{ position: "absolute", left: 0, right: 0, top: 170, display: "flex", justifyContent: "center" }}>
        <GradText size={240}>না</GradText>
      </Pop>
      <div style={{ position: "absolute", top: 600, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 28, fontFamily: fonts.display, fontWeight: 800, fontSize: 104 }}>
        <Word text="এত" at={t.ato} />
        <Strike at={t.noy}>
          <Word text="ঝামেলা" at={t.jhamela} />
        </Strike>
        <Word text="আর" at={t.ar} />
        <Word text="নয়" at={t.noy} grad />
      </div>
    </>
  );
};
