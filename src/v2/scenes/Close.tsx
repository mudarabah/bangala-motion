// Closing: dashboard, payout, impact, the dream, call to action and the logo.
import React from "react";
import {
  ArrowDownToLine,
  BadgeCheck,
  Coins,
  FolderKanban,
  HandHeart,
  LayoutDashboard,
  MousePointer2,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  Store,
  TrendingUp,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import {
  Appear,
  CheckBadge,
  Glass,
  GradPill,
  Headline,
  IconTile,
  Label,
  LogoCard,
  Pill,
  Pop,
  useActive,
  useEnter,
  usePalette,
  useProgress,
  useTime,
  Word,
} from "../../components/kit";
import { fonts, greenIconTints as T } from "../../theme";
import type { Timeline2 } from "../timeline";
import { Avatar, Connector, En, GradText, IconCard, Skel } from "../ui";

// "প্রতিটি বিক্রির হিসাব Dashboard এ সরাসরি দেখবেন। কোন পণ্য কবে কত দামে বিক্রি হলো, আপনার লাভ কত দাঁড়ালো।"
export const DashboardScene: React.FC<{ t: Timeline2["dashboard"] }> = ({ t }) => {
  const pal = usePalette();
  const bars = useProgress(t.labh - 0.2, t.labh + 0.8);
  const cols: [string, number][] = [
    ["পণ্য", t.ponno],
    ["কবে", t.kobe],
    ["দাম", t.dame],
  ];
  return (
    <>
      <Headline
        style={{ position: "absolute", top: 70, left: 0, right: 0 }}
        size={84}
        words={[
          ["প্রতিটি", t.start],
          ["বিক্রির", t.bikrir],
          ["হিসাব", t.hisab, true],
        ]}
      />
      <Appear at={t.dashboard} style={{ position: "absolute", left: 150, top: 230 }}>
        <Glass style={{ width: 1620, height: 700, padding: 0, overflow: "hidden", display: "flex", background: "rgba(255,255,255,0.95)" }}>
          {/* sidebar */}
          <div style={{ width: 260, background: pal.tintSoft, padding: "34px 26px", display: "flex", flexDirection: "column", gap: 26 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <IconTile icon={LayoutDashboard} tint={T.green} size={60} />
              <div style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 28, color: pal.ink }}>Dashboard</div>
            </div>
            {[150, 120, 170, 130].map((w, i) => (
              <Skel key={i} w={w} strong={i === 0} />
            ))}
          </div>
          {/* sales table */}
          <div style={{ flex: 1, padding: "40px 44px", display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 20, padding: "0 20px" }}>
              {cols.map(([label, at]) => (
                <Word key={label} text={label} at={at} grad style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 40 }} />
              ))}
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <Appear key={i} at={t.dashboard} delay={6 + i * 4} rise={16}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 20, alignItems: "center", padding: "16px 20px", borderRadius: 18, background: pal.tintSoft }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <ShoppingBag size={34} color={["#16A34A", "#F59E0B", "#0D9488"][i % 3]} />
                    <Skel w={150 + ((i * 40) % 90)} strong />
                  </div>
                  <Skel w={110} />
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 28, color: pal.brand }}>৳</span>
                    <Skel w={90} strong />
                  </div>
                </div>
              </Appear>
            ))}
          </div>
          {/* profit card */}
          <div style={{ width: 380, padding: "40px 40px 40px 0" }}>
            <Pop at={t.labh}>
              <Glass active={1} style={{ padding: 32, display: "flex", flexDirection: "column", gap: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <IconTile icon={TrendingUp} tint={T.green} size={64} />
                  <Label size={36} style={{ fontFamily: fonts.display, fontWeight: 800 }}>
                    আপনার লাভ
                  </Label>
                </div>
                <div style={{ height: 300, display: "flex", alignItems: "flex-end", gap: 16 }}>
                  {[0.35, 0.5, 0.45, 0.7, 0.9].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h * 100 * Math.min(1, Math.max(0, bars * 1.6 - i * 0.15))}%`, borderRadius: 12, background: pal.button }} />
                  ))}
                </div>
              </Glass>
            </Pop>
          </div>
        </Glass>
      </Appear>
    </>
  );
};

// "Project শেষে হিসাব অনুমোদনের পর আসল টাকা আর লাভ তুলে নিন। চাইলে আবার বিনিয়োগ করুন।"
export const PayoutScene: React.FC<{ t: Timeline2["payout"] }> = ({ t }) => {
  const pal = usePalette();
  const fill = useProgress(t.start, t.sheshe + 0.4);
  const spin = useEnter(t.abar);
  return (
    <>
      <Appear at={t.start} style={{ position: "absolute", left: 260, top: 110 }}>
        <Glass style={{ width: 1400, display: "flex", alignItems: "center", gap: 30, padding: "30px 44px" }}>
          <IconTile icon={FolderKanban} tint={T.green} size={80} />
          <div style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 40, color: pal.ink }}>Project</div>
          <div style={{ flex: 1, height: 30, borderRadius: 99, background: pal.lineSoft, overflow: "hidden" }}>
            <div style={{ width: `${fill * 100}%`, height: "100%", borderRadius: 99, background: pal.button }} />
          </div>
          <div style={{ width: 56, height: 56 }}>
            <Pop at={t.sheshe} delay={10}>
              <CheckBadge size={56} />
            </Pop>
          </div>
        </Glass>
      </Appear>
      <Appear at={t.hisab} style={{ position: "absolute", left: 0, right: 0, top: 290, display: "flex", justifyContent: "center" }}>
        <Pill icon={BadgeCheck} size={34}>
          হিসাব অনুমোদনের পর
        </Pill>
      </Appear>

      <div style={{ position: "absolute", left: 0, right: 0, top: 420, display: "flex", justifyContent: "center", alignItems: "center", gap: 40 }}>
        <IconCard row at={t.asol} icon={Coins} tint={T.orange} label="আসল টাকা" width={460} iconSize={100} />
        <Pop at={t.labh}>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 70, color: pal.inkMuted }}>+</div>
        </Pop>
        <IconCard row at={t.labh} icon={TrendingUp} tint={T.green} label="লাভ" width={360} iconSize={100} />
      </div>
      <Appear at={t.tule} style={{ position: "absolute", left: 0, right: 0, top: 650, display: "flex", justifyContent: "center" }}>
        <GradPill icon={ArrowDownToLine} size={44} style={{ padding: "22px 56px" }}>
          তুলে নিন
        </GradPill>
      </Appear>
      <Appear at={t.abar} style={{ position: "absolute", left: 0, right: 0, top: 820, display: "flex", justifyContent: "center", alignItems: "center", gap: 24 }}>
        <div style={{ transform: `rotate(${(1 - spin) * -240}deg)` }}>
          <IconTile icon={RefreshCw} tint={T.teal} size={86} />
        </div>
        <Label size={50} style={{ fontFamily: fonts.display, fontWeight: 800 }}>
          আবার <Word text="বিনিয়োগ" at={t.biniyog} grad /> করুন
        </Label>
      </Appear>
    </>
  );
};

// "আপনার টাকা শুধু লাভই আনে না, আপনার বিনিয়োগই হাজারো নতুন উদ্যোক্তার পুঁজি।"
export const ImpactScene: React.FC<{ t: Timeline2["impact"] }> = ({ t }) => {
  const { frame, f } = useTime();
  const pal = usePalette();
  const N = 22;
  return (
    <>
      <Headline
        style={{ position: "absolute", top: 70, left: 0, right: 0 }}
        size={80}
        words={[
          ["আপনার", t.start],
          ["টাকা", t.taka],
          ["শুধু", t.shudhu],
          ["লাভই", t.labhoi, true],
          ["আনে", t.ane],
          ["না", t.na],
        ]}
      />
      {/* lines + people around the centre */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {Array.from({ length: N }).map((_, i) => {
          const a = (i / N) * Math.PI * 2;
          const on = Math.min(1, Math.max(0, (frame - (f(t.hajaro) - 4 + i * 1.1)) / 8));
          return (
            <line
              key={i}
              x1={960}
              y1={570}
              x2={960 + Math.cos(a) * 330 * on}
              y2={570 + Math.sin(a) * 260 * on}
              stroke={`rgba(${pal.glowRgb},0.35)`}
              strokeWidth={3}
            />
          );
        })}
      </svg>
      {Array.from({ length: N }).map((_, i) => {
        const a = (i / N) * Math.PI * 2;
        const on = Math.min(1, Math.max(0, (frame - (f(t.hajaro) + i * 1.1)) / 8));
        return (
          <div key={i} style={{ position: "absolute", left: 960 + Math.cos(a) * 330 - 32, top: 570 + Math.sin(a) * 260 - 32, opacity: on, transform: `scale(${0.6 + 0.4 * on})` }}>
            <Avatar size={64} tint={[T.green, T.orange, T.teal, T.sky][i % 4]} icon={User} />
          </div>
        );
      })}
      <Pop at={t.start} style={{ position: "absolute", left: 960 - 80, top: 570 - 80 }}>
        <IconTile icon={Coins} tint={T.orange} size={160} />
      </Pop>
      <Headline
        style={{ position: "absolute", top: 890, left: 0, right: 0 }}
        size={72}
        words={[
          ["হাজারো", t.hajaro, true],
          ["নতুন", t.notun],
          ["উদ্যোক্তার", t.uddokta],
          ["পুঁজি", t.puji, true],
        ]}
      />
    </>
  );
};

// "পুঁজি ছাড়াই একজন তরুণ শুরু করতে পারেন নিজের ব্যবসা, শুধু আপনার কারণে।"
export const YouthScene: React.FC<{ t: Timeline2["youth"] }> = ({ t }) => (
  <>
    <Headline
      style={{ position: "absolute", top: 80, left: 0, right: 0 }}
      words={[
        ["পুঁজি", t.start],
        ["ছাড়াই", t.chhara, true],
      ]}
    />
    <Connector x={760} y={500} width={400} from={t.shuru - 0.2} to={t.byabsa} />
    <IconCard at={t.ekjon} icon={User} tint={T.sky} label="একজন তরুণ" width={460} iconSize={150} activeFrom={t.torun} activeTo={t.byabsa} style={{ position: "absolute", left: 300, top: 280 }} />
    <IconCard at={t.byabsa} icon={Store} tint={T.green} label="নিজের ব্যবসা" width={460} iconSize={150} activeFrom={t.byabsa} style={{ position: "absolute", left: 1160, top: 280 }} />
    <Pop at={t.byabsa} delay={6} style={{ position: "absolute", left: 1560, top: 250 }}>
      <IconTile icon={Sparkles} tint={T.orange} size={80} />
    </Pop>
    <div style={{ position: "absolute", left: 0, right: 0, top: 810, display: "flex", justifyContent: "center", alignItems: "center", gap: 26 }}>
      <Pop at={t.shudhu}>
        <IconTile icon={HandHeart} tint={T.rose} size={100} />
      </Pop>
      <Headline
        size={92}
        words={[
          ["শুধু", t.shudhu],
          ["আপনার", t.apnar],
          ["কারণে", t.karone, true],
        ]}
      />
    </div>
  </>
);

// "আমাদের স্বপ্ন এক হাজার সফল উদ্যোক্তা গড়ে তোলা। পরের জন কি আপনি?"
export const Dream2Scene: React.FC<{ t: Timeline2["dream2"] }> = ({ t }) => {
  const swap = useProgress(t.porer - 0.35, t.porer + 0.1);
  const pal = usePalette();
  const { frame } = useTime();
  const you = useEnter(t.apni);
  return (
    <>
      <div style={{ position: "absolute", inset: 0, opacity: 1 - swap, filter: `blur(${swap * 12}px)` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 150, display: "flex", justifyContent: "center", gap: 16, fontFamily: fonts.display, fontWeight: 700, fontSize: 60 }}>
          <Word text="আমাদের" at={t.start} style={{ color: pal.inkMuted }} />
          <Word text="স্বপ্ন" at={t.swapno} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 290, display: "flex", justifyContent: "center" }}>
          <Pop at={t.ek}>
            <GradText size={240}>১,০০০</GradText>
          </Pop>
        </div>
        <Headline
          style={{ position: "absolute", top: 640, left: 0, right: 0 }}
          size={92}
          words={[
            ["সফল", t.sofol, true],
            ["উদ্যোক্তা", t.uddokta],
            ["গড়ে", t.gore],
            ["তোলা", t.tola],
          ]}
        />
        <div style={{ position: "absolute", left: 0, right: 0, top: 830, display: "flex", justifyContent: "center", gap: 14 }}>
          {Array.from({ length: 14 }).map((_, i) => (
            <Pop key={i} at={t.uddokta} delay={i * 1.5}>
              <Avatar size={58} tint={[T.green, T.orange, T.teal, T.sky][i % 4]} icon={User} />
            </Pop>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", inset: 0, opacity: swap }}>
        {/* spotlight on an empty seat */}
        <div
          style={{
            position: "absolute",
            left: 960 - 260,
            top: 200,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: `radial-gradient(closest-side, rgba(${pal.glowRgb},0.32), rgba(${pal.glowRgb},0))`,
            transform: `scale(${1 + Math.sin(frame / 14) * 0.03})`,
          }}
        />
        <div style={{ position: "absolute", left: 960 - 110, top: 350, opacity: 0.4 + 0.6 * you, transform: `scale(${0.9 + 0.1 * you})` }}>
          <Avatar size={220} tint={you > 0.5 ? T.green : ["#E3F3E8", "#BFE8CC"]} icon={UserPlus} />
        </div>
        <Headline
          style={{ position: "absolute", top: 700, left: 0, right: 0 }}
          size={120}
          words={[
            ["পরের", t.porer],
            ["জন", t.jon],
            ["কি", t.ki],
            ["আপনি?", t.apni, true],
          ]}
        />
      </div>
    </>
  );
};

// "আজই www.mudarabahtrade.com এ Registration করুন Reseller হিসেবে অথবা বিনিয়োগকারী হিসেবে।"
export const CtaScene: React.FC<{ t: Timeline2["cta"] }> = ({ t }) => {
  const pal = usePalette();
  const url = "www.mudarabahtrade.com";
  const typed = useProgress(t.url, t.registration - 0.3, (x) => x);
  const chars = Math.round(typed * url.length);
  const { frame } = useTime();
  const caret = Math.floor(frame / 15) % 2 === 0;
  const cursor = useProgress(t.registration - 0.6, t.registration);
  const press = useEnter(t.registration + 0.1);
  const resellerOn = useActive(t.reseller, t.biniyogkari);
  const investorOn = useActive(t.biniyogkari);
  return (
    <>
      <div style={{ position: "absolute", left: 0, right: 0, top: 110, display: "flex", justifyContent: "center" }}>
        <Headline words={[["আজই", t.start, true]]} size={100} />
      </div>
      <Appear at={t.url} style={{ position: "absolute", left: 300, top: 290 }}>
        <Glass style={{ width: 1320, padding: "26px 36px", display: "flex", alignItems: "center", gap: 26, borderRadius: 999 }}>
          <IconTile icon={Store} tint={T.green} size={80} />
          <div style={{ fontFamily: fonts.ui, fontWeight: 600, fontSize: 64, color: pal.ink, letterSpacing: 0.5 }}>
            {url.slice(0, chars)}
            <span style={{ opacity: caret && typed < 1 ? 1 : 0, color: pal.brand }}>|</span>
          </div>
        </Glass>
      </Appear>

      <div style={{ position: "absolute", left: 0, right: 0, top: 500, display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative" }}>
          <Pop at={t.registration}>
            <GradPill icon={UserPlus} size={52} style={{ padding: "28px 64px", transform: `scale(${1 - 0.06 * Math.sin(Math.min(1, press) * Math.PI)})` }}>
              <En weight={700}>Registration</En> করুন
            </GradPill>
          </Pop>
          <div style={{ position: "absolute", left: 300 + (1 - cursor) * 300, top: 70 + (1 - cursor) * 140, opacity: cursor > 0 ? 1 : 0 }}>
            <MousePointer2 size={64} color={pal.ink} fill="white" strokeWidth={2} />
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, top: 740, display: "flex", justifyContent: "center", alignItems: "center", gap: 36 }}>
        <Appear at={t.reseller}>
          <Glass active={resellerOn} style={{ display: "flex", alignItems: "center", gap: 22, padding: "24px 40px" }}>
            <IconTile icon={User} tint={T.sky} size={80} />
            <Label size={44} style={{ fontFamily: fonts.display, fontWeight: 700 }}>
              <En>Reseller</En> হিসেবে
            </Label>
          </Glass>
        </Appear>
        <Pop at={t.othoba}>
          <Pill size={32}>অথবা</Pill>
        </Pop>
        <Appear at={t.biniyogkari}>
          <Glass active={investorOn} style={{ display: "flex", alignItems: "center", gap: 22, padding: "24px 40px" }}>
            <IconTile icon={Users} tint={T.orange} size={80} />
            <Label size={44} style={{ fontFamily: fonts.display, fontWeight: 700 }}>
              বিনিয়োগকারী হিসেবে
            </Label>
          </Glass>
        </Appear>
      </div>
    </>
  );
};

// "Mudarabah Trade Limited আপনার উদ্যোক্তা যাত্রার সঙ্গী।"
export const OutroScene: React.FC<{ t: Timeline2["outro"] }> = ({ t }) => (
  <>
    <Appear at={t.start} scaleFrom={0.88} style={{ position: "absolute", left: 960 - 260, top: 120 }}>
      <LogoCard size={520} />
    </Appear>
    <Headline
      style={{ position: "absolute", top: 760, left: 0, right: 0 }}
      size={96}
      words={[
        ["আপনার", t.apnar],
        ["উদ্যোক্তা", t.uddokta],
        ["যাত্রার", t.jatrar],
        ["সঙ্গী", t.songi, true],
      ]}
    />
  </>
);
