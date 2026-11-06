// The investor side: real business, real goods, the Mudarabah principle, the 50:50 split,
// fairness, and investing together in a project.
import React from "react";
import {
  Banknote,
  Briefcase,
  Coins,
  Eye,
  FolderKanban,
  MousePointer2,
  Package,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import {
  Appear,
  bn,
  Counter,
  Glass,
  GradPill,
  Headline,
  IconTile,
  Label,
  LogoMark,
  Pill,
  Pop,
  useEnter,
  usePalette,
  useProgress,
  useTime,
  Word,
} from "../../components/kit";
import { fonts, greenIconTints as T } from "../../theme";
import type { Timeline2 } from "../timeline";
import { Avatar, Connector, En, GradText, IconCard, Strike } from "../ui";

// "আর যারা বিক্রি নয় বিনিয়োগ করতে চান, আপনার জন্যও আছে দারুণ সুযোগ।
//  Mudarabah Trade Limited এ বিনিয়োগ মানে বাস্তব ব্যবসায় বিনিয়োগ।"
export const InvestPivotScene: React.FC<{ t: Timeline2["investPivot"] }> = ({ t }) => {
  const swap = useProgress(t.mudarabah - 0.35, t.mudarabah + 0.1);
  return (
    <>
      <div style={{ position: "absolute", inset: 0, opacity: 1 - swap, filter: `blur(${swap * 12}px)` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center", gap: 34, fontFamily: fonts.display, fontWeight: 800, fontSize: 130 }}>
          <Strike at={t.noy}>
            <Word text="বিক্রি" at={t.bikri} style={{ color: "#5B6F63" }} />
          </Strike>
          <Word text="নয়" at={t.noy} />
          <Word text="বিনিয়োগ" at={t.biniyog} grad />
        </div>
        <Appear at={t.darun} style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center" }}>
          <GradPill icon={Sparkles} size={54} style={{ padding: "26px 60px" }}>
            দারুণ সুযোগ
          </GradPill>
        </Appear>
      </div>

      <div style={{ position: "absolute", inset: 0, opacity: swap }}>
        <Appear at={t.mudarabah} style={{ position: "absolute", left: 960 - 190, top: 150 }}>
          <Glass style={{ padding: "18px 30px", background: "white" }}>
            <LogoMark width={320} />
          </Glass>
        </Appear>
        <div style={{ position: "absolute", left: 0, right: 0, top: 470, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <Label size={52} muted style={{ fontFamily: fonts.display, fontWeight: 700 }}>
            এ বিনিয়োগ মানে
          </Label>
          <Headline
            size={120}
            words={[
              ["বাস্তব", t.bastob, true],
              ["ব্যবসায়", t.byabsay],
              ["বিনিয়োগ", t.biniyogEnd],
            ]}
          />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 820, display: "flex", justifyContent: "center", gap: 40 }}>
          {[Store, Briefcase, TrendingUp].map((icon, i) => (
            <Pop key={i} at={t.byabsay} delay={i * 5}>
              <IconTile icon={icon} tint={[T.green, T.orange, T.teal][i]} size={100} />
            </Pop>
          ))}
        </div>
      </div>
    </>
  );
};

// "আপনার টাকায় কেনা হয় আসল পণ্য, যা আমাদের Reseller রা প্রতিদিন বিক্রি করছেন।
//  ইতিমধ্যে তেইশ জন বিনিয়োগকারী আমাদের সাথে যুক্ত আছেন।"
export const RealGoodsScene: React.FC<{ t: Timeline2["realGoods"] }> = ({ t }) => {
  const pal = usePalette();
  const { frame, f } = useTime();
  const xs = [330, 960, 1590];
  return (
    <>
      <Connector x={xs[0] + 210} y={300} width={xs[1] - xs[0] - 420} from={t.asol - 0.3} to={t.asol + 0.2} />
      <Connector x={xs[1] + 210} y={300} width={xs[2] - xs[1] - 420} from={t.reseller - 0.3} to={t.reseller + 0.2} />
      <IconCard row at={t.start} icon={Banknote} tint={T.orange} label="আপনার টাকায়" width={420} iconSize={86} style={{ position: "absolute", left: xs[0] - 210, top: 230 }} />
      <IconCard row at={t.asol} icon={Package} tint={T.teal} label="আসল পণ্য" width={420} iconSize={86} activeFrom={t.asol} activeTo={t.reseller} style={{ position: "absolute", left: xs[1] - 210, top: 230 }} />
      <IconCard
        row
        at={t.reseller}
        icon={Users}
        tint={T.sky}
        label={
          <>
            <En>Reseller</En>রা
          </>
        }
        sub={<Word text="প্রতিদিন বিক্রি" at={t.protidin} />}
        width={420}
        iconSize={86}
        activeFrom={t.protidin}
        activeTo={t.teish}
        style={{ position: "absolute", left: xs[2] - 210, top: 210 }}
      />

      <Appear at={t.itimoddhe} style={{ position: "absolute", left: 260, top: 500 }}>
        <Glass style={{ width: 1400, height: 420, padding: "40px 60px", display: "flex", alignItems: "center", gap: 60 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4, width: 520 }}>
            <Label size={38} muted>
              ইতিমধ্যে
            </Label>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
              <Counter
                from={t.teish - 0.1}
                to={t.teish + 0.7}
                value={23}
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 800,
                  fontSize: 170,
                  lineHeight: 1.1,
                  padding: "0 0.04em",
                  backgroundImage: pal.keyword,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              />
              <Label size={60} style={{ fontFamily: fonts.display, fontWeight: 800 }}>
                জন
              </Label>
            </div>
            <Label size={42} style={{ fontFamily: fonts.display, fontWeight: 700 }}>
              বিনিয়োগকারী <Word text="যুক্ত আছেন" at={t.jukto} grad />
            </Label>
          </div>
          {/* 23 investors light up one by one */}
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(6, 80px)", gap: 18, justifyContent: "center" }}>
            {Array.from({ length: 23 }).map((_, i) => {
              const on = Math.min(1, Math.max(0, (frame - (f(t.teish) - 4 + i * 1.2)) / 6));
              return (
                <div key={i} style={{ opacity: 0.25 + 0.75 * on, transform: `scale(${0.8 + 0.2 * on})` }}>
                  <Avatar size={74} tint={on > 0.5 ? [T.green, T.orange, T.teal][i % 3] : ["#E3F3E8", "#BFE8CC"]} icon={User} />
                </div>
              );
            })}
          </div>
        </Glass>
      </Appear>
    </>
  );
};

// "আমাদের বিনিয়োগ ব্যবস্থা পরিচালিত হয় ইসলামী মুদারাবাহ নীতির ভিত্তিতে।"
export const PrincipleScene: React.FC<{ t: Timeline2["principle"] }> = ({ t }) => {
  const pal = usePalette();
  const seal = useEnter(t.islami);
  const { frame } = useTime();
  return (
    <>
      <div style={{ position: "absolute", left: 0, right: 0, top: 120, display: "flex", justifyContent: "center", gap: 16, fontFamily: fonts.display, fontWeight: 700, fontSize: 58 }}>
        <Word text="আমাদের" at={t.start} style={{ color: pal.inkMuted }} />
        <Word text="বিনিয়োগ" at={t.biniyog} style={{ color: pal.inkMuted }} />
        <Word text="ব্যবস্থা" at={t.byabostha} style={{ color: pal.inkMuted }} />
      </div>
      <div style={{ position: "absolute", left: 960 - 170, top: 250, width: 340, height: 340 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 999,
            border: `4px dashed rgba(${pal.glowRgb},0.5)`,
            opacity: seal,
            transform: `rotate(${frame * 0.4}deg) scale(${0.8 + 0.2 * seal})`,
          }}
        />
        <div style={{ position: "absolute", inset: 50, display: "flex", alignItems: "center", justifyContent: "center", opacity: seal, transform: `scale(${0.6 + 0.4 * seal})` }}>
          <IconTile icon={Scale} tint={T.green} size={220} />
        </div>
      </div>
      <Headline
        style={{ position: "absolute", top: 650, left: 0, right: 0 }}
        size={110}
        words={[
          ["ইসলামী", t.islami],
          ["মুদারাবাহ", t.mudarabah, true],
        ]}
      />
      <Headline
        style={{ position: "absolute", top: 800, left: 0, right: 0 }}
        size={72}
        words={[
          ["নীতির", t.nitir],
          ["ভিত্তিতে", t.vitti],
        ]}
      />
    </>
  );
};

const Half: React.FC<{ from: number; side: "left" | "right"; colour: [string, string] }> = ({ from, side, colour }) => {
  const p = useProgress(from - 0.1, from + 0.6);
  const r = 150;
  const c = Math.PI * r;
  const id = `half-${side}`;
  return (
    <svg width={400} height={400} viewBox="-200 -200 400 400" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={colour[0]} />
          <stop offset="1" stopColor={colour[1]} />
        </linearGradient>
      </defs>
      <circle
        r={r}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth={70}
        strokeDasharray={`${(c - 8) * p} ${2 * c}`}
        transform={side === "left" ? "rotate(90) " : "rotate(-90)"}
      />
    </svg>
  );
};

// "আপনার মূলধন দিয়ে পণ্য সংগ্রহ করা হয় এবং সেই পণ্য বিক্রি থেকে অর্জিত মোট মুনাফা
//  বিনিয়োগকারী ও কোম্পানির মধ্যে পঞ্চাশ অনুপাত পঞ্চাশ অনুপাতে বন্টিত হয়।"
export const ProfitSplitScene: React.FC<{ t: Timeline2["profitSplit"] }> = ({ t }) => {
  const steps = [
    { at: t.muldhon, icon: Coins, tint: T.orange, label: "মূলধন" },
    { at: t.songroho, icon: Package, tint: T.teal, label: "পণ্য সংগ্রহ" },
    { at: t.bikri, icon: ShoppingCart, tint: T.sky, label: "বিক্রি" },
    { at: t.munafa, icon: TrendingUp, tint: T.green, label: "মোট মুনাফা" },
  ];
  const xs = [360, 760, 1160, 1560];
  return (
    <>
      {xs.slice(0, 3).map((x, i) => (
        <Connector key={i} x={x + 80} y={200} width={xs[i + 1] - x - 160} from={steps[i + 1].at - 0.3} to={steps[i + 1].at + 0.1} />
      ))}
      {steps.map((s, i) => (
        <Appear key={i} at={s.at} style={{ position: "absolute", left: xs[i] - 150, top: 110, width: 300, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <IconTile icon={s.icon} tint={s.tint} size={130} />
          <Label size={36} style={{ fontFamily: fonts.display, fontWeight: 700 }}>
            {s.label}
          </Label>
        </Appear>
      ))}

      {/* 50 : 50 */}
      <div style={{ position: "absolute", left: 960 - 200, top: 440, width: 400, height: 400 }}>
        <Half from={t.p1} side="left" colour={T.green} />
        <Half from={t.p2} side="right" colour={T.orange} />
        <Pop at={t.p1} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <GradText size={66}>
            {bn(50)}:{bn(50)}
          </GradText>
        </Pop>
      </div>
      <IconCard
        row
        at={t.biniyogkari}
        icon={User}
        tint={T.green}
        label="বিনিয়োগকারী"
        sub={<Word text={`${bn(50)}%`} at={t.p1} grad style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 44 }} />}
        width={480}
        iconSize={90}
        style={{ position: "absolute", left: 150, top: 560 }}
      />
      <IconCard
        row
        at={t.company}
        icon={Briefcase}
        tint={T.orange}
        label="কোম্পানি"
        sub={<Word text={`${bn(50)}%`} at={t.p2} grad style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 44 }} />}
        width={480}
        iconSize={90}
        style={{ position: "absolute", left: 1290, top: 560 }}
      />
      <Appear at={t.bontito} style={{ position: "absolute", left: 0, right: 0, top: 900, display: "flex", justifyContent: "center" }}>
        <Pill icon={Scale} size={34}>
          অনুপাতে বন্টিত
        </Pill>
      </Appear>
    </>
  );
};

// "অর্থাৎ আপনার মুনাফা নির্ধারিত হয় প্রকৃত ব্যবসায়িক ফলাফলের ভিত্তিতে, সম্পূর্ণ স্বচ্ছ ও ন্যায্য প্রক্রিয়ায়।"
export const FairScene: React.FC<{ t: Timeline2["fair"] }> = ({ t }) => {
  const pal = usePalette();
  const draw = useProgress(t.prokrito - 0.2, t.folafol + 0.6);
  const pts = [
    [0, 260],
    [120, 220],
    [240, 236],
    [360, 170],
    [480, 182],
    [600, 120],
    [720, 70],
    [840, 40],
  ];
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ");
  return (
    <>
      <Headline
        style={{ position: "absolute", top: 80, left: 0, right: 0 }}
        words={[
          ["আপনার", t.apnar],
          ["মুনাফা", t.munafa, true],
          ["নির্ধারিত", t.nirdharito],
        ]}
      />
      <Appear at={t.prokrito} style={{ position: "absolute", left: 150, top: 260 }}>
        <Glass style={{ width: 1000, height: 600, padding: 50, display: "flex", flexDirection: "column", gap: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <IconTile icon={TrendingUp} tint={T.green} size={80} />
            <Label size={42} style={{ fontFamily: fonts.display, fontWeight: 700 }}>
              প্রকৃত ব্যবসায়িক ফলাফল
            </Label>
          </div>
          <svg width={900} height={330} viewBox="-20 -20 880 300" style={{ overflow: "visible" }}>
            {[0, 80, 160, 240].map((y) => (
              <line key={y} x1={0} x2={840} y1={y} y2={y} stroke={pal.lineSoft} strokeWidth={2} />
            ))}
            <path d={d} fill="none" stroke="#16A34A" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${1100 * draw} 1100`} />
            {draw > 0.98 ? <circle cx={840} cy={40} r={14} fill="#16A34A" stroke="white" strokeWidth={5} /> : null}
          </svg>
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 1220, top: 300, display: "flex", flexDirection: "column", gap: 40 }}>
        <IconCard row at={t.swachchho} icon={Eye} tint={T.sky} label="সম্পূর্ণ স্বচ্ছ" width={540} iconSize={100} activeFrom={t.swachchho} activeTo={t.nayyo} />
        <IconCard row at={t.nayyo} icon={ShieldCheck} tint={T.green} label="ন্যায্য প্রক্রিয়া" width={540} iconSize={100} activeFrom={t.nayyo} />
      </div>
    </>
  );
};

// "বড় অঙ্কের টাকা না থাকলেও সমস্যা নেই। একটি Project এ একাধিক বিনিয়োগকারী মিলে বিনিয়োগ
//  করতে পারেন। Online এই Project দেখে আবেদন করুন।"
export const PoolScene: React.FC<{ t: Timeline2["pool"] }> = ({ t }) => {
  const pal = usePalette();
  const fill = useProgress(t.ekadhik, t.mile + 0.8);
  const press = useEnter(t.abedon);
  const cursor = useProgress(t.onlinei, t.abedon - 0.1);
  const shares = [0.3, 0.25, 0.2, 0.25];
  return (
    <>
      <div style={{ position: "absolute", left: 0, right: 0, top: 80, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <Label size={46} muted style={{ fontFamily: fonts.display, fontWeight: 700 }}>
          <Word text="বড় অঙ্কের টাকা না থাকলেও" at={t.start} style={{ color: pal.inkMuted }} />
        </Label>
        <Headline
          words={[
            ["সমস্যা", t.somossa],
            ["নেই", t.nei, true],
          ]}
        />
      </div>

      <Appear at={t.project} style={{ position: "absolute", left: 360, top: 330 }}>
        <Glass style={{ width: 1200, padding: "44px 56px", display: "flex", flexDirection: "column", gap: 34 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <IconTile icon={FolderKanban} tint={T.green} size={90} />
            <div style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 52, color: pal.ink }}>Project</div>
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex" }}>
              {shares.map((_, i) => (
                <Pop key={i} at={t.ekadhik} delay={i * 5} style={{ marginLeft: i ? -16 : 0 }}>
                  <Avatar size={78} tint={[T.green, T.orange, T.teal, T.sky][i]} icon={User} />
                </Pop>
              ))}
            </div>
          </div>
          {/* the pot fills from several investors */}
          <div style={{ height: 46, borderRadius: 99, background: pal.lineSoft, overflow: "hidden", display: "flex" }}>
            {shares.map((s, i) => {
              const before = shares.slice(0, i).reduce((a, b) => a + b, 0);
              const w = Math.min(s, Math.max(0, fill - before));
              return <div key={i} style={{ width: `${w * 100}%`, background: `linear-gradient(90deg, ${[T.green, T.orange, T.teal, T.sky][i].join(", ")})` }} />;
            })}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Label size={38} style={{ fontFamily: fonts.display, fontWeight: 700 }}>
              একাধিক বিনিয়োগকারী <Word text="মিলে" at={t.mile} grad />
            </Label>
            <div style={{ position: "relative" }}>
              <Pop at={t.onlinei}>
                <GradPill size={36} style={{ transform: `scale(${1 - 0.06 * Math.sin(Math.min(1, press) * Math.PI)})` }}>
                  আবেদন করুন
                </GradPill>
              </Pop>
              <div
                style={{
                  position: "absolute",
                  left: 120 + (1 - cursor) * 260,
                  top: 40 + (1 - cursor) * 160,
                  opacity: cursor > 0 ? 1 : 0,
                }}
              >
                <MousePointer2 size={56} color={pal.ink} fill="white" strokeWidth={2} />
              </div>
            </div>
          </div>
        </Glass>
      </Appear>
      <Appear at={t.onlinei} style={{ position: "absolute", left: 0, right: 0, top: 860, display: "flex", justifyContent: "center" }}>
        <Pill size={32}>
          <En>Online</En>-এই <En>Project</En> দেখে আবেদন
        </Pill>
      </Appear>
    </>
  );
};
