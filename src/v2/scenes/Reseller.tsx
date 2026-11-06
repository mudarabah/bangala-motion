// How reselling works: the model, no upfront cost, three steps, orders, commission.
import React from "react";
import {
  ArrowDownToLine,
  Banknote,
  MousePointerClick,
  Package,
  ShoppingBag,
  ShoppingCart,
  Tags,
  Truck,
  User,
  UserCheck,
  UserPlus,
  Users,
  UserSearch,
  Wallet,
  Warehouse,
} from "lucide-react";
import {
  Appear,
  bn,
  CheckBadge,
  Counter,
  Glass,
  GradPill,
  Headline,
  IconTile,
  Label,
  Pill,
  Pop,
  useActive,
  useEnter,
  usePalette,
  useProgress,
  Word,
} from "../../components/kit";
import { fonts, greenIconTints as T } from "../../theme";
import type { Timeline2 } from "../timeline";
import { Connector, En, IconCard, Strike } from "../ui";

// "এখানে বিনিয়োগকারীদের টাকায় কোম্পানি পণ্য কিনে Stock করে। আর আপনি একজন Reseller হিসেবে
//  সেই পণ্য নিজের দামে বিক্রি করেন।"
export const ModelScene: React.FC<{ t: Timeline2["model"] }> = ({ t }) => {
  const pal = usePalette();
  const coin = useProgress(t.company - 0.2, t.kine);
  const box = useProgress(t.reseller - 0.2, t.reseller + 0.6);
  const xs = [330, 960, 1590];
  const W = 460;
  const travel = (p: number, a: number, b: number) => xs[a] + W / 2 + (xs[b] - xs[a] - W) * p;
  return (
    <>
      <Connector x={xs[0] + W / 2} y={500} width={xs[1] - xs[0] - W} from={t.company - 0.3} to={t.company + 0.3} />
      <Connector x={xs[1] + W / 2} y={500} width={xs[2] - xs[1] - W} from={t.reseller - 0.3} to={t.reseller + 0.3} />

      <IconCard
        at={t.biniyogkari}
        icon={Users}
        tint={T.orange}
        label="বিনিয়োগকারী"
        sub="এর টাকায়"
        width={W}
        iconSize={130}
        activeFrom={t.biniyogkari}
        activeTo={t.company}
        style={{ position: "absolute", left: xs[0] - W / 2, top: 290 }}
      />
      <IconCard
        at={t.company}
        icon={Warehouse}
        tint={T.green}
        label="কোম্পানি"
        sub={
          <>
            পণ্য কিনে <En>Stock</En> করে
          </>
        }
        width={W}
        iconSize={130}
        activeFrom={t.company}
        activeTo={t.reseller}
        style={{ position: "absolute", left: xs[1] - W / 2, top: 290 }}
      />
      <IconCard
        at={t.reseller}
        icon={User}
        tint={T.sky}
        label={<En>Reseller</En>}
        sub="আপনি"
        width={W}
        iconSize={130}
        activeFrom={t.reseller}
        style={{ position: "absolute", left: xs[2] - W / 2, top: 290 }}
      />

      {/* money travels to the company, goods travel to the reseller */}
      <div style={{ position: "absolute", left: travel(coin, 0, 1) - 30, top: 470, opacity: coin > 0 && coin < 1 ? 1 : 0 }}>
        <IconTile icon={Banknote} tint={T.orange} size={60} />
      </div>
      <div style={{ position: "absolute", left: travel(box, 1, 2) - 30, top: 470, opacity: box > 0 && box < 1 ? 1 : 0 }}>
        <IconTile icon={Package} tint={T.teal} size={60} />
      </div>

      <Appear at={t.nijer} style={{ position: "absolute", left: 0, right: 0, top: 800, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            gap: 22,
            alignItems: "center",
            padding: "20px 48px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.92)",
            boxShadow: `0 14px 34px rgba(${pal.shadowRgb},0.14)`,
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 60,
          }}
        >
          <Word text="নিজের" at={t.nijer} />
          <Word text="দামে" at={t.dame} grad />
          <Word text="বিক্রি" at={t.bikri} />
        </div>
      </Appear>
    </>
  );
};

// "আপনাকে এক টাকারও পণ্য আগে কিনতে হয় না। আপনার কাজ শুধু Customer খোঁজা আর বিক্রি করা।"
export const NoCostScene: React.FC<{ t: Timeline2["noCost"] }> = ({ t }) => (
  <>
    <div style={{ position: "absolute", left: 0, right: 0, top: 170, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <Headline
        size={128}
        words={[
          ["এক", t.ek, true],
          ["টাকারও", t.taka, true],
        ]}
      />
      <Headline
        size={88}
        words={[
          ["পণ্য", t.ponno],
          ["আগে", t.age],
          ["কিনতে", t.kinte],
          ["হয়", t.hoy],
          ["না", t.na, true],
        ]}
      />
    </div>
    <Pop at={t.kinte} style={{ position: "absolute", left: 1500, top: 180 }}>
      <div style={{ position: "relative" }}>
        <IconTile icon={ShoppingCart} tint={T.orange} size={130} />
        <Pop at={t.na} style={{ position: "absolute", right: -26, top: -26 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "linear-gradient(160deg, #FCA5A5, #EF4444)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: fonts.ui,
              fontWeight: 700,
              fontSize: 40,
              boxShadow: "0 8px 18px rgba(239,68,68,0.4)",
            }}
          >
            ✕
          </div>
        </Pop>
      </div>
    </Pop>

    <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center", alignItems: "center", gap: 40 }}>
      <IconCard
        row
        at={t.customer}
        icon={UserSearch}
        tint={T.sky}
        label={
          <>
            <En>Customer</En> খোঁজা
          </>
        }
        width={560}
        iconSize={96}
        activeFrom={t.khoja}
        activeTo={t.bikri}
      />
      <Pop at={t.bikri}>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 70, color: "#5B6F63" }}>+</div>
      </Pop>
      <IconCard row at={t.bikri} icon={ShoppingCart} tint={T.green} label="বিক্রি করা" width={480} iconSize={96} activeFrom={t.bikri} />
    </div>
  </>
);

const StepCard: React.FC<{
  n: number;
  at: number;
  next?: number;
  icon: typeof UserPlus;
  tint: [string, string];
  title: React.ReactNode;
  children?: React.ReactNode;
  x: number;
}> = ({ n, at, next, icon, tint, title, children, x }) => {
  const pal = usePalette();
  const active = useActive(at, next);
  return (
    <Appear at={at} style={{ position: "absolute", left: x, top: 290 }}>
      <Glass
        active={active}
        style={{
          width: 520,
          height: 600,
          padding: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 26,
          transform: `translateY(${-12 * active}px)`,
        }}
      >
        <div
          style={{
            alignSelf: "flex-start",
            padding: "6px 20px",
            borderRadius: 99,
            background: pal.button,
            color: "white",
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 32,
          }}
        >
          {bn(String(n).padStart(2, "0"))}
        </div>
        <IconTile icon={icon} tint={tint} size={120} />
        <Label size={42} style={{ fontFamily: fonts.display, fontWeight: 700, textAlign: "center", lineHeight: 1.3 }}>
          {title}
        </Label>
        {children}
        {next !== undefined ? (
          <Pop at={next} style={{ position: "absolute", right: 26, top: 28 }}>
            <CheckBadge size={52} />
          </Pop>
        ) : null}
      </Glass>
    </Appear>
  );
};

const Chip: React.FC<{ at: number; children: React.ReactNode; strong?: boolean }> = ({ at, children, strong }) => (
  <Pop at={at}>
    {strong ? (
      <GradPill size={28} style={{ padding: "12px 24px" }}>
        {children}
      </GradPill>
    ) : (
      <Pill size={28} style={{ padding: "12px 24px" }}>
        {children}
      </Pill>
    )}
  </Pop>
);

// "কাজটা খুব সহজ। প্রথমে Platformে Registration করুন। তারপর আমাদের Stock থেকে পছন্দের পণ্য
//  এক Clickে নিজের দোকানে যোগ করুন। Wholesale দামের উপর নিজের লাভ বসিয়ে দাম ঠিক করুন।"
export const StepsScene: React.FC<{ t: Timeline2["steps"] }> = ({ t }) => {
  const click = useEnter(t.click);
  return (
    <>
      <Headline
        style={{ position: "absolute", top: 80, left: 0, right: 0 }}
        words={[
          ["কাজটা", t.start],
          ["খুব", t.khub],
          ["সহজ", t.sohoj, true],
        ]}
      />
      <StepCard n={1} at={t.registration} next={t.stock} icon={UserPlus} tint={T.green} title={<En>Registration</En>} x={140} />
      <StepCard
        n={2}
        at={t.stock}
        next={t.wholesale}
        icon={MousePointerClick}
        tint={T.sky}
        title={
          <>
            এক <En>Click</En>-এ দোকানে যোগ
          </>
        }
        x={700}
      >
        <div style={{ position: "relative", display: "flex", gap: 14 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 100,
                height: 100,
                borderRadius: 20,
                background: i === 1 ? undefined : "rgba(240,250,243,0.92)",
                border: i === 1 ? `3px solid rgba(34,197,94,${0.3 + 0.7 * click})` : undefined,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: i === 1 ? `scale(${1 - 0.08 * Math.sin(Math.min(1, click) * Math.PI)})` : undefined,
              }}
            >
              <ShoppingBag size={44} color={i === 1 ? "#16A34A" : "#BFE8CC"} />
            </div>
          ))}
        </div>
      </StepCard>
      <StepCard
        n={3}
        at={t.wholesale}
        icon={Tags}
        tint={T.orange}
        title="নিজের লাভ বসিয়ে দাম ঠিক"
        x={1260}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <Chip at={t.wholesale}>
            <En>Wholesale</En>
          </Chip>
          <Chip at={t.labh}>+ লাভ</Chip>
          <Chip at={t.dam} strong>
            = দাম
          </Chip>
        </div>
      </StepCard>
    </>
  );
};

// "Order এলে Packing আর Courier এ পাঠানোর কাজ আমাদের। Customer পণ্য হাতে পেয়ে টাকা দেন।
//  Delivery Charge ও তিনিই দেন।"
export const OrdersScene: React.FC<{ t: Timeline2["orders"] }> = ({ t }) => {
  const truck = useProgress(t.courier, t.customer);
  const nodes = [
    { at: t.start, icon: ShoppingBag, tint: T.green, label: <En>Order</En> },
    { at: t.packing, icon: Package, tint: T.teal, label: <En>Packing</En> },
    { at: t.courier, icon: Truck, tint: T.sky, label: <En>Courier</En> },
    { at: t.customer, icon: UserCheck, tint: T.orange, label: <En>Customer</En> },
  ];
  const xs = [300, 740, 1180, 1620];
  return (
    <>
      {xs.slice(0, 3).map((x, i) => (
        <Connector key={i} x={x + 90} y={380} width={xs[i + 1] - x - 180} from={nodes[i + 1].at - 0.3} to={nodes[i + 1].at + 0.2} dashed={i === 2} />
      ))}
      {nodes.map((n, i) => (
        <Appear key={i} at={n.at} style={{ position: "absolute", left: xs[i] - 130, top: 250, width: 260, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <IconTile icon={n.icon} tint={n.tint} size={170} />
          <Label size={40} style={{ fontFamily: fonts.display, fontWeight: 700 }}>
            {n.label}
          </Label>
        </Appear>
      ))}
      {/* the parcel on its way */}
      <div style={{ position: "absolute", left: 1180 + 90 + (1620 - 1180 - 180) * truck - 34, top: 300, opacity: truck > 0 && truck < 1 ? 1 : 0 }}>
        <IconTile icon={Package} tint={T.orange} size={68} />
      </div>

      {/* "the work is ours" bracket under packing + courier */}
      <Appear at={t.amader} style={{ position: "absolute", left: 740 - 150, width: 1180 - 740 + 300, top: 520, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div style={{ width: "100%", height: 26, borderBottom: "5px solid #22C55E", borderLeft: "5px solid #22C55E", borderRight: "5px solid #22C55E", borderRadius: "0 0 18px 18px", opacity: 0.6 }} />
        <GradPill size={36}>কাজ আমাদের</GradPill>
      </Appear>

      <div style={{ position: "absolute", left: 1620 - 390, width: 600, top: 720, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 18 }}>
        <Appear at={t.taka}>
          <Pill icon={Banknote} size={32}>
            পণ্য হাতে পেয়ে টাকা দেন
          </Pill>
        </Appear>
        <Appear at={t.delivery}>
          <Pill icon={Truck} size={32}>
            <En>Delivery Charge</En>ও তিনিই দেন
          </Pill>
        </Appear>
      </div>
    </>
  );
};

// "Wholesale দাম বাদ দিয়ে বাকি টাকা মানে আপনার Commission সরাসরি চলে আসে আপনার Wallet এ।
//  পাঁচশ টাকা হলেই যেকোনো মাধ্যমে তুলে নিন।"
export const CommissionScene: React.FC<{ t: Timeline2["commission"] }> = ({ t }) => {
  const pal = usePalette();
  const fade = useProgress(t.bad, t.bad + 0.4);
  const rest = useEnter(t.baki);
  const fly = useProgress(t.sorasori, t.wallet);
  const isCommission = useActive(t.commission) > 0.5;
  return (
    <>
      <Headline
        style={{ position: "absolute", top: 80, left: 0, right: 0 }}
        words={[
          ["Commission", t.commission, true],
          ["সরাসরি", t.sorasori],
          ["Wallet-এ", t.wallet],
        ]}
      />

      {/* price bar: wholesale part is taken out, the rest becomes commission */}
      <div style={{ position: "absolute", left: 260, top: 280, width: 1400, height: 130, display: "flex", gap: 14 }}>
        <Appear at={t.start} style={{ flex: 62 }}>
          <div
            style={{
              height: 130,
              borderRadius: 30,
              background: pal.lineSoft,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 1 - 0.55 * fade,
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 44,
              color: pal.inkMuted,
            }}
          >
            <Strike at={t.bad}>
              <En>Wholesale</En> দাম
            </Strike>
          </div>
        </Appear>
        <div
          style={{
            flex: 38,
            height: 130,
            borderRadius: 30,
            background: pal.button,
            boxShadow: `0 18px 40px rgba(${pal.brandRgb},0.3)`,
            opacity: rest,
            transform: `scale(${0.9 + 0.1 * rest})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 48,
          }}
        >
          {isCommission ? <En weight={700}>Commission</En> : "বাকি টাকা"}
        </div>
      </div>

      {/* coin flies into the wallet */}
      <div
        style={{
          position: "absolute",
          left: 1260 + (960 - 1260) * fly - 34,
          top: 420 + (600 - 420) * fly,
          opacity: fly > 0 && fly < 1 ? 1 : 0,
        }}
      >
        <IconTile icon={Banknote} tint={T.orange} size={68} />
      </div>

      <Appear at={t.sorasori} style={{ position: "absolute", left: 960 - 330, top: 520 }}>
        <Glass style={{ width: 660, padding: "40px 50px", display: "flex", alignItems: "center", gap: 34 }}>
          <IconTile icon={Wallet} tint={T.green} size={150} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Label size={36} muted>
              <En>Wallet</En>
            </Label>
            <Counter
              from={t.pachsho - 0.1}
              to={t.pachsho + 0.6}
              value={500}
              prefix="৳"
              style={{
                fontFamily: fonts.display,
                fontWeight: 800,
                fontSize: 110,
                lineHeight: 1.2,
                color: pal.ink,
              }}
            />
          </div>
        </Glass>
      </Appear>
      <Appear at={t.tule} style={{ position: "absolute", left: 0, right: 0, top: 870, display: "flex", justifyContent: "center" }}>
        <GradPill icon={ArrowDownToLine} size={40} style={{ padding: "22px 50px" }}>
          {bn(500)} টাকা হলেই তুলে নিন
        </GradPill>
      </Appear>
    </>
  );
};
