// Opening: the dream, the questions, the promise, and the company.
import React from "react";
import { Coins, Globe, HelpCircle, Package, ShoppingBag, ShoppingCart, Smartphone, Sparkles, Store, Truck, User } from "lucide-react";
import {
  Appear,
  CheckBadge,
  Float,
  Glass,
  GradPill,
  Headline,
  IconTile,
  Label,
  LogoCard,
  LogoMark,
  Pop,
  useActive,
  useEnter,
  usePalette,
  useTime,
  Word,
} from "../../components/kit";
import { fonts, greenIconTints as T } from "../../theme";
import type { Timeline2 } from "../timeline";
import { En } from "../ui";

// "অনলাইনে ব্যবসা করার স্বপ্ন আছে?"
export const DreamScene: React.FC<{ t: Timeline2["dream"] }> = ({ t }) => (
  <>
    {[
      { icon: Store, tint: T.green, x: 330, y: 300, s: 130, ph: 0 },
      { icon: ShoppingBag, tint: T.orange, x: 1560, y: 280, s: 120, ph: 1.4 },
      { icon: Smartphone, tint: T.teal, x: 420, y: 760, s: 110, ph: 2.6 },
      { icon: Sparkles, tint: T.lime, x: 1480, y: 760, s: 100, ph: 3.7 },
    ].map((it, i) => (
      <Pop key={i} at={t.start} delay={4 + i * 4} style={{ position: "absolute", left: it.x - it.s / 2, top: it.y - it.s / 2 }}>
        <Float phase={it.ph} amp={10}>
          <IconTile icon={it.icon} tint={it.tint} size={it.s} />
        </Float>
      </Pop>
    ))}
    <div style={{ position: "absolute", left: 0, right: 0, top: 380 }}>
      <Headline
        size={118}
        words={[
          ["অনলাইনে", t.start],
          ["ব্যবসা", t.byabsa, true],
        ]}
      />
      <Headline
        size={118}
        words={[
          ["করার", t.korar],
          ["স্বপ্ন", t.swapno, true],
          ["আছে?", t.ache],
        ]}
      />
    </div>
  </>
);

const QCard: React.FC<{ at: number; icon: typeof Coins; tint: [string, string]; label: React.ReactNode; x: number; y: number; ph: number; pressed: number }> = ({
  at,
  icon,
  tint,
  label,
  x,
  y,
  ph,
  pressed,
}) => (
  <Appear at={at} style={{ position: "absolute", left: x, top: y }}>
    <Float phase={ph} amp={6}>
      <Glass style={{ display: "flex", alignItems: "center", gap: 22, padding: "24px 34px", transform: `scale(${1 - 0.04 * pressed})` }}>
        <IconTile icon={icon} tint={tint} size={78} />
        <Label size={42} style={{ fontFamily: fonts.display, fontWeight: 700, whiteSpace: "nowrap" }}>
          {label}
        </Label>
      </Glass>
    </Float>
  </Appear>
);

// "কিন্তু মাথায় হাজারটা প্রশ্ন। পুঁজি কোথায় পাবেন? পণ্য Stock করবেন কিভাবে?
//  Delivery, Website এত কিছু একা সামলাবেন কিভাবে?"
export const QuestionsScene: React.FC<{ t: Timeline2["questions"] }> = ({ t }) => {
  const pal = usePalette();
  const orb = useEnter(t.proshno);
  const alone = useEnter(t.eka);
  const { frame } = useTime();
  const pulse = 1 + Math.sin(frame / 9) * 0.03 * alone;
  return (
    <>
      <Headline
        style={{ position: "absolute", top: 80, left: 0, right: 0 }}
        words={[
          ["মাথায়", t.mathay],
          ["হাজারটা", t.hajar, true],
          ["প্রশ্ন", t.proshno],
        ]}
      />

      {/* centre: a question orb that turns into one person on "একা" */}
      <div style={{ position: "absolute", left: 960 - 110, top: 560 - 110, width: 220, height: 220 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 999,
            background: pal.button,
            boxShadow: `0 30px 70px rgba(${pal.brandRgb},0.35), inset 0 3px 0 rgba(255,255,255,0.4)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: orb * (1 - alone),
            transform: `scale(${(0.6 + 0.4 * orb) * (1 - 0.3 * alone)})`,
          }}
        >
          <HelpCircle size={120} color="white" strokeWidth={2.2} />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            opacity: alone,
            transform: `scale(${(0.7 + 0.3 * alone) * pulse})`,
          }}
        >
          <IconTile icon={User} tint={T.sky} size={150} />
          <Label size={44} style={{ fontFamily: fonts.display, fontWeight: 800 }}>
            একা?
          </Label>
        </div>
      </div>

      <QCard at={t.puji} icon={Coins} tint={T.orange} label="পুঁজি কোথায়?" x={240} y={300} ph={0} pressed={alone} />
      <QCard
        at={t.ponno}
        icon={Package}
        tint={T.teal}
        label={
          <>
            পণ্য <En>Stock</En>?
          </>
        }
        x={1240}
        y={300}
        ph={1.3}
        pressed={alone}
      />
      <QCard at={t.delivery} icon={Truck} tint={T.sky} label={<En>Delivery?</En>} x={300} y={720} ph={2.2} pressed={alone} />
      <QCard at={t.website} icon={Globe} tint={T.green} label={<En>Website?</En>} x={1300} y={720} ph={3.1} pressed={alone} />
    </>
  );
};

// "যদি বলি এই সব ঝামেলা আমরা সামলাবো আর আপনি শুধু বিক্রি করবেন।"
export const WeHandleScene: React.FC<{ t: Timeline2["weHandle"] }> = ({ t }) => {
  const youActive = useActive(t.shudhu);
  const rows: [typeof Coins, [string, string], React.ReactNode][] = [
    [Coins, T.orange, "পুঁজি"],
    [Package, T.teal, <En key="s">Stock</En>],
    [Truck, T.sky, <En key="d">Delivery</En>],
    [Globe, T.green, <En key="w">Website</En>],
  ];
  return (
    <>
      <Appear at={t.start} style={{ position: "absolute", left: 140, top: 150 }}>
        <Glass style={{ width: 860, height: 780, padding: 50, display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <Glass style={{ padding: "10px 16px", borderRadius: 18, background: "white" }}>
              <LogoMark width={150} />
            </Glass>
            <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 70, lineHeight: 1.2, display: "flex", gap: 20 }}>
              <Word text="আমরা" at={t.amra} />
              <Word text="সামলাবো" at={t.samlabo} grad />
            </div>
          </div>
          {rows.map(([icon, tint, label], i) => (
            <Appear key={i} at={t.jhamela} delay={i * 4} rise={20}>
              <div style={{ display: "flex", alignItems: "center", gap: 24, padding: "14px 22px", borderRadius: 22, background: "rgba(240,250,243,0.92)" }}>
                <IconTile icon={icon} tint={tint} size={70} />
                <Label size={40} style={{ flex: 1, fontFamily: fonts.display, fontWeight: 700 }}>
                  {label}
                </Label>
                <div style={{ width: 52, height: 52 }}>
                  <Pop at={t.samlabo} delay={4 + i * 5}>
                    <CheckBadge size={52} />
                  </Pop>
                </div>
              </div>
            </Appear>
          ))}
        </Glass>
      </Appear>

      <Appear at={t.apni} style={{ position: "absolute", left: 1080, top: 150 }}>
        <Glass
          active={youActive}
          style={{ width: 700, height: 780, padding: 50, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 34 }}
        >
          <IconTile icon={User} tint={T.sky} size={170} />
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 70 }}>
            <Word text="আপনি" at={t.apni} />
          </div>
          <Pop at={t.shudhu}>
            <GradPill icon={ShoppingCart} size={52} style={{ padding: "26px 56px" }}>
              শুধু বিক্রি
            </GradPill>
          </Pop>
        </Glass>
      </Appear>
    </>
  );
};

// "পরিচয় করিয়ে দিই, Mudarabah Trade Limited।"
export const IntroScene: React.FC<{ t: Timeline2["intro"] }> = ({ t }) => {
  const pal = usePalette();
  const { frame, f } = useTime();
  const since = Math.max(0, frame - f(t.mudarabah)) / 30;
  return (
    <>
      <div style={{ position: "absolute", top: 90, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 64, display: "flex", gap: 18 }}>
          <Word text="পরিচয়" at={t.start} />
          <Word text="করিয়ে" at={t.koriye} />
          <Word text="দিই" at={t.dii} />
        </div>
      </div>
      {[0, 1].map((k) => {
        const r = ((since + k * 0.9) % 1.8) / 1.8;
        return (
          <div
            key={k}
            style={{
              position: "absolute",
              left: 960 - 330,
              top: 570 - 330,
              width: 660,
              height: 660,
              borderRadius: 999,
              border: `3px solid rgba(${pal.glowRgb},0.6)`,
              opacity: since > 0 ? (1 - r) * 0.6 : 0,
              transform: `scale(${0.8 + r * 0.5})`,
            }}
          />
        );
      })}
      <Appear at={t.mudarabah} scaleFrom={0.85} style={{ position: "absolute", left: 960 - 250, top: 570 - 250 }}>
        <LogoCard size={500} />
      </Appear>
      <div style={{ position: "absolute", left: 0, right: 0, top: 880, display: "flex", justifyContent: "center", gap: 22, fontFamily: fonts.ui, fontWeight: 600, fontSize: 52, letterSpacing: 1 }}>
        <Word text="Mudarabah" at={t.mudarabah} grad />
        <Word text="Trade" at={t.trade} />
        <Word text="Limited" at={t.limited} />
      </div>
    </>
  );
};
