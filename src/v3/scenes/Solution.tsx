// Second half of the Uddokta Journey video: what the platform does, the first order,
// and the call to start.
import React from "react";
import {
  ArrowRight,
  Banknote,
  Gem,
  Glasses,
  Handbag,
  Watch,
  Bell,
  Globe,
  House,
  Keyboard,
  Package,
  PackageCheck,
  ShoppingBag,
  Shirt,
  Sparkles,
  Store,
  Truck,
  Warehouse,
  Zap,
} from "lucide-react";
import {
  Appear,
  CheckBadge,
  Counter,
  Float,
  Glass,
  GradPill,
  Headline,
  IconTile,
  Label,
  Pop,
  usePalette,
  useProgress,
  Word,
} from "../../components/kit";
import { fonts, greenIconTints as T } from "../../theme";
import type { Timeline3 } from "../timeline";
import { En, GradText, Skel, Strike } from "../../v2/ui";
import { Girl } from "../Girl";

// The brand name as spoken: "উদ্যোক্তা Journey", set in the keyword gradient.
export const Wordmark: React.FC<{ size: number }> = ({ size }) => (
  <GradText size={size} style={{ whiteSpace: "nowrap" }}>
    উদ্যোক্তা <span style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: "0.86em" }}>Journey</span>
  </GradText>
);

// A soft band of light that passes once across a glass card.
const Sweep: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const p = useProgress(from, to);
  return (
    <div
      style={{
        position: "absolute",
        top: -40,
        bottom: -40,
        width: 180,
        left: `${-30 + p * 140}%`,
        transform: "skewX(-18deg)",
        background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.75), rgba(255,255,255,0))",
        opacity: p > 0 && p < 1 ? 1 : 0,
      }}
    />
  );
};

// "আপনার স্বপ্ন সহজ করতে উদ্যোক্তা Journey সব করে দেবে।"
export const BrandScene: React.FC<{ t: Timeline3["brand"] }> = ({ t }) => (
  <>
    <Headline
      style={{ position: "absolute", top: 110, left: 0, right: 0 }}
      size={80}
      words={[
        ["আপনার", t.start],
        ["স্বপ্ন", t.swapno],
        ["সহজ", t.sohoj, true],
        ["করতে", t.korte],
      ]}
    />
    <Appear at={t.uddokta} rise={120} scaleFrom={0.9} style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center" }}>
      <Glass active={1} style={{ display: "flex", alignItems: "center", gap: 44, padding: "50px 80px", background: "linear-gradient(160deg, rgba(255,255,255,0.96), rgba(220,252,231,0.9))", overflow: "hidden" }}>
        <IconTile icon={Sparkles} tint={T.green} size={150} />
        <Wordmark size={140} />
        <Sweep from={t.uddokta + 0.2} to={t.sob} />
      </Glass>
    </Appear>
    <Appear at={t.sob} style={{ position: "absolute", left: 0, right: 0, top: 790, display: "flex", justifyContent: "center" }}>
      <GradPill size={46} style={{ padding: "22px 60px" }}>
        সব করে দেবে
      </GradPill>
    </Appear>
  </>
);

// "দুইশো সত্তরটির বেশি product ready। কোনো পুঁজি লাগবে না।"
export const ProductsScene: React.FC<{ t: Timeline3["products"] }> = ({ t }) => (
  <>
    <Appear at={t.start} style={{ position: "absolute", left: 200, top: 230 }}>
      <Glass active={1} style={{ width: 720, height: 560, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
        <div style={{ display: "flex", gap: 18 }}>
          {[
            { icon: Gem, tint: T.sky },
            { icon: Handbag, tint: T.orange },
            { icon: Watch, tint: T.teal },
            { icon: Shirt, tint: T.rose },
            { icon: Glasses, tint: T.lime },
          ].map((p, i) => (
            <Pop key={i} at={t.start} delay={i * 3}>
              <IconTile icon={p.icon} tint={p.tint} size={92} />
            </Pop>
          ))}
        </div>
        <GradText size={170}>
          <Counter from={t.start} to={t.beshi} value={270} />
          <Word text="+" at={t.beshi} />
        </GradText>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Label size={52} style={{ fontFamily: fonts.ui, fontWeight: 700 }}>
            Product Ready
          </Label>
          <Pop at={t.ready}>
            <CheckBadge size={56} />
          </Pop>
        </div>
      </Glass>
    </Appear>
    <Appear at={t.kono} style={{ position: "absolute", left: 1000, top: 230 }}>
      <Glass style={{ width: 720, height: 560, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 34 }}>
        <IconTile icon={Banknote} tint={T.green} size={150} />
        <Headline
          size={66}
          words={[
            ["কোনো", t.kono],
            ["পুঁজি", t.puji],
            ["লাগবে", t.lagbe],
            ["না", t.na, true],
          ]}
        />
      </Glass>
    </Appear>
  </>
);

// "Stock থাকবে আমাদের warehouse-এ, আপনার ঘরে নয়।"
export const StockScene: React.FC<{ t: Timeline3["stock"] }> = ({ t }) => (
  <>
    <div style={{ position: "absolute", top: 90, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 26, fontFamily: fonts.display, fontWeight: 800, fontSize: 92 }}>
      <Word text="Stock" at={t.start} grad style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: "0.88em" }} />
      <Word text="থাকবে" at={t.thakbe} />
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 320, display: "flex", justifyContent: "center", gap: 90 }}>
      <Appear at={t.amader}>
        <Glass active={1} style={{ width: 620, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, padding: "44px 30px" }}>
          <IconTile icon={Warehouse} tint={T.green} size={150} />
          <Label size={50} style={{ fontFamily: fonts.display, fontWeight: 700 }}>
            আমাদের <En>Warehouse</En>-এ
          </Label>
          <Pop at={t.warehouse} style={{ position: "absolute", right: 28, top: 28 }}>
            <CheckBadge size={64} />
          </Pop>
        </Glass>
      </Appear>
      <Appear at={t.apnar}>
        <Glass style={{ width: 620, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, padding: "44px 30px" }}>
          <IconTile icon={House} tint={T.orange} size={150} />
          <Label size={50} style={{ fontFamily: fonts.display, fontWeight: 700 }}>
            <Strike at={t.noy}>আপনার ঘরে</Strike>
          </Label>
          <Pop at={t.noy} style={{ position: "absolute", right: 28, top: 28 }}>
            <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 40, color: "#EF4444" }}>নয়</div>
          </Pop>
        </Glass>
      </Appear>
    </div>
    <FlyingBoxes from={t.ghore} to={t.noy + 0.8} />
  </>
);

// Three boxes travel from the home card (right) to the warehouse card (left).
const FlyingBoxes: React.FC<{ from: number; to: number }> = ({ from, to }) => (
  <>
    {[0, 1, 2].map((i) => (
      <FlyingBox key={i} from={from + i * 0.12} to={to + i * 0.12} lane={i} />
    ))}
  </>
);
const FlyingBox: React.FC<{ from: number; to: number; lane: number }> = ({ from, to, lane }) => {
  const p = useProgress(from, to);
  const x = 1350 - p * 780;
  const y = 470 + (lane - 1) * 70 - Math.sin(p * Math.PI) * 160;
  return (
    <div style={{ position: "absolute", left: x, top: y, opacity: p > 0 && p < 1 ? 1 : 0, transform: `rotate(${(1 - p) * 12}deg)` }}>
      <div style={{ width: 70, height: 62, borderRadius: 10, background: "linear-gradient(160deg, #FCD9A8, #E0A86A)", borderTop: "8px solid #C98B4E", boxShadow: "0 10px 20px rgba(0,0,0,0.12)" }} />
    </div>
  );
};

// "আপনার নিজের নামে readymade website, packaging, courier, delivery সব আমরা করব।"
export const WeDoScene: React.FC<{ t: Timeline3["weDo"] }> = ({ t }) => {
  const cards = [
    { at: t.readymade, icon: Globe, tint: T.teal, label: "Readymade Website" },
    { at: t.packaging, icon: Package, tint: T.lime, label: "Packaging" },
    { at: t.courier, icon: Truck, tint: T.sky, label: "Courier" },
    { at: t.delivery, icon: PackageCheck, tint: T.orange, label: "Delivery" },
  ];
  return (
    <>
      <div style={{ position: "absolute", top: 100, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 30 }}>
        <Pop at={t.start}>
          <IconTile icon={Store} tint={T.green} size={110} />
        </Pop>
        <Headline
          size={84}
          words={[
            ["আপনার", t.start],
            ["নিজের", t.nijer],
            ["নামে", t.name, true],
          ]}
        />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center", gap: 34 }}>
        {cards.map((c, i) => (
          <Appear key={i} at={c.at}>
            <Glass style={{ width: 380, height: 330, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26 }}>
              <IconTile icon={c.icon} tint={c.tint} size={120} />
              <div style={{ fontFamily: fonts.ui, fontWeight: 600, fontSize: 38, color: "#10261A", textAlign: "center" }}>{c.label}</div>
              <Pop at={t.korbo} delay={i * 4} style={{ position: "absolute", right: 22, top: 22 }}>
                <CheckBadge size={52} />
              </Pop>
            </Glass>
          </Appear>
        ))}
      </div>
      <Headline
        style={{ position: "absolute", top: 780, left: 0, right: 0 }}
        size={96}
        words={[
          ["সব", t.sob],
          ["আমরা", t.amra],
          ["করব", t.korbo, true],
        ]}
      />
    </>
  );
};

// "Courier entry-ও হবে automatic।"
export const AutoScene: React.FC<{ t: Timeline3["auto"] }> = ({ t }) => {
  const pal = usePalette();
  const on = useProgress(t.automatic, t.automatic + 0.45);
  return (
    <Appear at={t.start} style={{ position: "absolute", left: 0, right: 0, top: 230, display: "flex", justifyContent: "center" }}>
      <Glass active={on} style={{ width: 1100, display: "flex", flexDirection: "column", alignItems: "center", gap: 46, padding: "60px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <IconTile icon={Keyboard} tint={T.sky} size={120} />
          <Label size={72} style={{ fontFamily: fonts.display, fontWeight: 800 }}>
            <En weight={700}>Courier Entry</En>-ও
          </Label>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {/* toggle that switches on as "automatic" is spoken */}
          <div style={{ position: "relative", width: 230, height: 116, borderRadius: 99, background: pal.lineStrong, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: pal.button, opacity: on }} />
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 10 + on * 114,
                width: 96,
                height: 96,
                borderRadius: 99,
                background: "white",
                boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Zap size={48} color={pal.brand} strokeWidth={2.4} style={{ opacity: on }} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 22, fontFamily: fonts.display, fontWeight: 800, fontSize: 96 }}>
            <Word text="হবে" at={t.hobe} />
            <Word text="Automatic" at={t.automatic} grad style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: "0.9em" }} />
          </div>
        </div>
        <AutoSheet from={t.automatic} />
      </Glass>
    </Appear>
  );
};

// A spreadsheet whose rows fill on their own.
const AutoSheet: React.FC<{ from: number }> = ({ from }) => {
  const pal = usePalette();
  const rows = useProgress(from, from + 1.2);
  return (
    <div style={{ width: 900, borderRadius: 18, background: "white", boxShadow: `0 10px 24px rgba(${pal.shadowRgb},0.10)`, overflow: "hidden" }}>
      {Array.from({ length: 4 }).map((_, r) => (
        <div key={r} style={{ display: "flex", height: 40, borderBottom: r < 3 ? `2px solid ${pal.lineSoft}` : undefined }}>
          {[0.2, 0.4, 0.25, 0.15].map((w, c) => (
            <div key={c} style={{ flex: w, borderRight: `2px solid ${pal.lineSoft}`, display: "flex", alignItems: "center", padding: "0 12px" }}>
              <div style={{ height: 10, borderRadius: 6, width: `${Math.min(1, Math.max(0, rows * 4 - r)) * 80}%`, background: c === 3 ? "#22C55E" : pal.lineStrong }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// "আপনি শুধু নিজের business চালাবেন আর মুনাফা করবেন।"
export const YouJustScene: React.FC<{ t: Timeline3["youJust"] }> = ({ t }) => {
  return (
    <>
      <div style={{ position: "absolute", top: 110, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "baseline", gap: 24, fontFamily: fonts.display, fontWeight: 800, fontSize: 88 }}>
        <Word text="আপনি" at={t.start} />
        <Word text="শুধু" at={t.shudhu} grad />
        <Word text="নিজের" at={t.nijer} />
        <Word text="Business" at={t.business} style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: "0.88em" }} />
        <Word text="চালাবেন" at={t.chalaben} />
      </div>
      <Headline
        style={{ position: "absolute", top: 260, left: 0, right: 0 }}
        size={96}
        words={[
          ["আর", t.ar],
          ["মুনাফা", t.munafa, true],
          ["করবেন", t.korben],
        ]}
      />
      <Appear at={t.start} style={{ position: "absolute", left: 420, top: 420 }}>
        <Float amp={5}>
          <Girl pose="relaxed" width={380} />
        </Float>
      </Appear>
      <Appear at={t.munafa} rise={-40} style={{ position: "absolute", left: 960, top: 560 }}>
        <Glass active={1} style={{ width: 600, display: "flex", alignItems: "center", gap: 28, padding: "30px 36px" }}>
          <IconTile icon={Bell} tint={T.orange} size={100} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Label size={46} style={{ fontFamily: fonts.display, fontWeight: 800 }}>
              নতুন অর্ডার!
            </Label>
            <GradText size={60}>লাভ ৳৩৫০</GradText>
          </div>
        </Glass>
      </Appear>
    </>
  );
};

// "প্রথম orderের notification, নিজের উপার্জনের প্রথম টাকা, সেদিন বুঝবেন স্বপ্নটা আসলে কখনো হারায়নি।"
export const FirstOrderScene: React.FC<{ t: Timeline3["firstOrder"] }> = ({ t }) => {
  const pal = usePalette();
  return (
    <>
      {/* phone with the first order notification */}
      <Appear at={t.start} style={{ position: "absolute", left: 300, top: 90 }}>
        <div style={{ width: 400, height: 660, borderRadius: 60, background: "#10261A", padding: 14, boxShadow: `0 30px 70px rgba(${pal.shadowRgb},0.25)` }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 48, background: pal.base, padding: "60px 22px", display: "flex", flexDirection: "column", gap: 18 }}>
            <Appear at={t.notification} rise={-30}>
              <Glass active={1} style={{ padding: "20px 20px", borderRadius: 24, display: "flex", alignItems: "center", gap: 16 }}>
                <IconTile icon={Bell} tint={T.orange} size={64} />
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <Label size={26} style={{ fontFamily: fonts.display, fontWeight: 700 }}>
                    প্রথম <En>Order</En>
                  </Label>
                  <Label size={20} muted>
                    <En>Notification</En>
                  </Label>
                </div>
              </Glass>
            </Appear>
            <Skel w={300} />
            <Skel w={220} />
            <Skel w={260} />
          </div>
        </div>
      </Appear>
      <Appear at={t.nijer} style={{ position: "absolute", left: 860, top: 230 }}>
        <Glass active={1} style={{ width: 760, display: "flex", alignItems: "center", gap: 34, padding: "40px 44px" }}>
          <IconTile icon={Banknote} tint={T.green} size={130} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Label size={38} muted style={{ fontFamily: fonts.display, fontWeight: 600 }}>
              নিজের উপার্জনের
            </Label>
            <Headline
              align="left"
              size={76}
              words={[
                ["প্রথম", t.prothom],
                ["টাকা", t.taka, true],
              ]}
            />
          </div>
        </Glass>
      </Appear>
      <Headline
        style={{ position: "absolute", top: 820, left: 80, right: 80 }}
        size={66}
        words={[
          ["সেদিন", t.sedin],
          ["বুঝবেন", t.bujhben],
          ["স্বপ্নটা", t.swapnota],
          ["আসলে", t.asole],
          ["কখনো", t.kokhono],
          ["হারায়নি", t.haraini, true],
        ]}
      />
    </>
  );
};

// "ঘরে বসেই শুরু করুন নিজের fashion brand।"
export const HomeScene: React.FC<{ t: Timeline3["home"] }> = ({ t }) => (
  <>
    <Pop at={t.start} style={{ position: "absolute", left: 960 - 75, top: 110 }}>
      <IconTile icon={House} tint={T.orange} size={150} />
    </Pop>
    <Headline
      style={{ position: "absolute", top: 320, left: 0, right: 0 }}
      size={100}
      words={[
        ["ঘরে", t.start],
        ["বসেই", t.bosei, true],
        ["শুরু", t.shuru],
        ["করুন", t.korun],
      ]}
    />
    <Appear at={t.nijer} style={{ position: "absolute", left: 0, right: 0, top: 600, display: "flex", justifyContent: "center" }}>
      <GradPill icon={Shirt} size={60} style={{ padding: "30px 70px" }}>
        নিজের <En weight={700}>Fashion Brand</En>
      </GradPill>
    </Appear>
    <Appear at={t.brand} style={{ position: "absolute", left: 0, right: 0, top: 790, display: "flex", justifyContent: "center" }}>
      <Label size={38} muted style={{ fontFamily: fonts.display, fontWeight: 600 }}>
        গৃহিণী ও ছাত্রীদের জন্য
      </Label>
    </Appear>
    {[
      { x: 330, y: 560, icon: Shirt, tint: T.rose },
      { x: 1480, y: 520, icon: ShoppingBag, tint: T.teal },
    ].map((d, i) => (
      <Pop key={i} at={t.fashion} delay={i * 4} style={{ position: "absolute", left: d.x, top: d.y }}>
        <Float phase={i * 2}>
          <IconTile icon={d.icon} tint={d.tint} size={110} />
        </Float>
      </Pop>
    ))}
  </>
);

// "আপনার স্বপ্নের যাত্রা শুরু হোক আজই উদ্যোক্তা Journey-র সাথে।"
export const OutroScene: React.FC<{ t: Timeline3["outro"] }> = ({ t }) => (
  <>
    <Headline
      style={{ position: "absolute", top: 170, left: 0, right: 0 }}
      size={84}
      words={[
        ["আপনার", t.start],
        ["স্বপ্নের", t.swapner],
        ["যাত্রা", t.jatra],
        ["শুরু", t.shuru],
        ["হোক", t.hok],
        ["আজই", t.aji, true],
      ]}
    />
    <Appear at={t.uddokta} scaleFrom={0.9} style={{ position: "absolute", left: 0, right: 0, top: 420, display: "flex", justifyContent: "center" }}>
      <Glass active={1} style={{ display: "flex", alignItems: "center", gap: 44, padding: "54px 84px", background: "rgba(255,255,255,0.92)" }}>
        <IconTile icon={Sparkles} tint={T.green} size={160} />
        <Wordmark size={150} />
      </Glass>
    </Appear>
    <Appear at={t.sathe} style={{ position: "absolute", left: 0, right: 0, top: 780, display: "flex", justifyContent: "center" }}>
      <GradPill icon={ArrowRight} size={52} style={{ padding: "26px 66px", flexDirection: "row-reverse" }}>
        আজই যোগ দিন
      </GradPill>
    </Appear>
  </>
);
