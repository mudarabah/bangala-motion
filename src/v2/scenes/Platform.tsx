// What the platform gives a reseller: a ready shop, ad tools, courier, training and help.
import React from "react";
import { Activity, BookOpen, Headset, LayoutGrid, Megaphone, Server, ShieldCheck, ShoppingBag, Store, Truck, Video } from "lucide-react";
import {
  Appear,
  CheckBadge,
  Glass,
  GradPill,
  Headline,
  IconTile,
  Label,
  LogoMark,
  Pill,
  Pop,
  usePalette,
  useProgress,
  Word,
} from "../../components/kit";
import { fonts, greenIconTints as T } from "../../theme";
import type { Timeline2 } from "../timeline";
import { En, IconCard, Skel, Strike } from "../ui";

// "আলাদা Website বানানোর ঝামেলাও নেই। Platform এই পাবেন আপনার নিজের নামে একটি Ready-made Online দোকান।"
export const ShopScene: React.FC<{ t: Timeline2["shop"] }> = ({ t }) => {
  const pal = usePalette();
  const fill = useProgress(t.name, t.dokan + 0.4);
  return (
    <>
      <div style={{ position: "absolute", top: 80, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 22, fontFamily: fonts.display, fontWeight: 800, fontSize: 76 }}>
        <Word text="আলাদা" at={t.start} />
        <Strike at={t.nei}>
          <Word text="Website" at={t.website} style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: "0.9em" }} />
        </Strike>
        <Word text="বানানোর" at={t.banano} />
        <Word text="ঝামেলাও" at={t.jhamela} />
        <Word text="নেই" at={t.nei} grad />
      </div>

      {/* browser window with the reseller's own shop */}
      <Appear at={t.platform} style={{ position: "absolute", left: 360, top: 240 }}>
        <Glass style={{ width: 1200, height: 610, padding: 0, overflow: "hidden", background: "rgba(255,255,255,0.95)" }}>
          <div style={{ height: 64, display: "flex", alignItems: "center", gap: 12, padding: "0 26px", background: pal.tintSoft }}>
            {["#F87171", "#FBBF24", "#34D399"].map((c) => (
              <div key={c} style={{ width: 16, height: 16, borderRadius: 99, background: c }} />
            ))}
            <div style={{ marginLeft: 22, flex: 1, height: 34, borderRadius: 99, background: "white", display: "flex", alignItems: "center", paddingLeft: 20 }}>
              <Skel w={260} />
            </div>
          </div>
          <div style={{ padding: "30px 40px", display: "flex", flexDirection: "column", gap: 26 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <IconTile icon={Store} tint={T.green} size={78} />
              <Pop at={t.name}>
                <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 46, color: pal.ink }}>আপনার নিজের নামে</div>
              </Pop>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 160,
                    borderRadius: 22,
                    background: pal.tintSoft,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 14,
                    opacity: Math.min(1, Math.max(0, fill * 8 - i)),
                  }}
                >
                  <ShoppingBag size={50} color={i % 3 === 0 ? "#F59E0B" : i % 3 === 1 ? "#16A34A" : "#0D9488"} />
                  <Skel w={110} strong />
                </div>
              ))}
            </div>
          </div>
        </Glass>
      </Appear>

      <Appear at={t.ready} style={{ position: "absolute", left: 0, right: 0, top: 900, display: "flex", justifyContent: "center" }}>
        <GradPill icon={Store} size={40} style={{ padding: "20px 48px" }}>
          <En>Ready-made Online</En> দোকান
        </GradPill>
      </Appear>
    </>
  );
};

// "Facebook Pixel, Catalog Feed আর Server-side Tracking, বিজ্ঞাপন চালানোর সব Tool তৈরি।"
export const AdToolsScene: React.FC<{ t: Timeline2["adTools"] }> = ({ t }) => {
  const cards = [
    { at: t.start, icon: Activity, tint: T.sky, label: "Facebook Pixel" },
    { at: t.catalog, icon: LayoutGrid, tint: T.teal, label: "Catalog Feed" },
    { at: t.server, icon: Server, tint: T.green, label: "Server-side Tracking" },
  ];
  return (
    <>
      <Pop at={t.start} style={{ position: "absolute", left: 960 - 80, top: 110 }}>
        <IconTile icon={Megaphone} tint={T.orange} size={160} />
      </Pop>
      <div style={{ position: "absolute", left: 0, right: 0, top: 340, display: "flex", justifyContent: "center", gap: 40 }}>
        {cards.map((c, i) => (
          <Appear key={i} at={c.at}>
            <Glass style={{ width: 500, height: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26 }}>
              <IconTile icon={c.icon} tint={c.tint} size={110} />
              <div style={{ fontFamily: fonts.ui, fontWeight: 600, fontSize: 40, color: "#10261A", textAlign: "center" }}>{c.label}</div>
              <Pop at={t.toiri} delay={i * 5} style={{ position: "absolute", right: 24, top: 24 }}>
                <CheckBadge size={52} />
              </Pop>
            </Glass>
          </Appear>
        ))}
      </div>
      <Headline
        style={{ position: "absolute", top: 760, left: 0, right: 0 }}
        size={86}
        words={[
          ["বিজ্ঞাপন", t.bigyapon],
          ["চালানোর", t.chalanor],
          ["সব", t.sob],
          ["Tool", t.tool],
          ["তৈরি", t.toiri, true],
        ]}
      />
    </>
  );
};

// "চাইলে নিজের Steadfast Account দিয়ে Parcel পাঠাতে পারবেন। না থাকলে আমাদের Account তো আছেই।"
export const CourierScene: React.FC<{ t: Timeline2["courier"] }> = ({ t }) => (
  <>
    <Pop at={t.parcel} style={{ position: "absolute", left: 960 - 75, top: 100 }}>
      <IconTile icon={Truck} tint={T.sky} size={150} />
    </Pop>
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center", alignItems: "center", gap: 50 }}>
      <IconCard
        at={t.steadfast}
        icon={Truck}
        tint={T.teal}
        label={
          <>
            নিজের <En>Steadfast Account</En>
          </>
        }
        sub={
          <>
            দিয়ে <En>Parcel</En> পাঠান
          </>
        }
        width={640}
        iconSize={130}
        activeFrom={t.steadfast}
        activeTo={t.na}
      />
      <Pop at={t.na}>
        <Pill size={34}>না থাকলে</Pill>
      </Pop>
      <Appear at={t.amader}>
        <Glass active={1} style={{ width: 640, display: "flex", flexDirection: "column", alignItems: "center", gap: 22, padding: "34px 28px" }}>
          <Glass style={{ padding: "14px 22px", background: "white", borderRadius: 22 }}>
            <LogoMark width={230} />
          </Glass>
          <Label size={40} style={{ fontFamily: fonts.display, fontWeight: 700 }}>
            আমাদের <En>Account</En>
          </Label>
          <Label size={28} muted>
            তো আছেই
          </Label>
        </Glass>
      </Appear>
    </div>
  </>
);

// "নতুন বলে ভয় পাওয়ার কিছু নেই। Platform এই আছে Reselling ও Online Marketing এর Training Course।
//  অভিজ্ঞ Mentor এর সাথে সরাসরি Meeting Book করতে পারবেন। আর Order বাড়লে Customer সামলানোর জন্য
//  নিতে পারবেন প্রশিক্ষিত ও যাচাইকৃত Moderator। কাজ অনুমোদনের পরেই তার Payment হয়।"
export const SupportScene: React.FC<{ t: Timeline2["support"] }> = ({ t }) => (
  <>
    <Headline
      style={{ position: "absolute", top: 80, left: 0, right: 0 }}
      size={84}
      words={[
        ["নতুন", t.start],
        ["বলে", t.bole],
        ["ভয়", t.bhoy],
        ["পাওয়ার", t.paoar],
        ["কিছু", t.kichu],
        ["নেই", t.nei, true],
      ]}
    />
    <IconCard
      at={t.reselling}
      icon={BookOpen}
      tint={T.green}
      label={<En>Training Course</En>}
      sub={
        <>
          <En>Reselling</En> ও <En>Online Marketing</En>
        </>
      }
      width={520}
      iconSize={130}
      activeFrom={t.training}
      activeTo={t.mentor}
      style={{ position: "absolute", left: 150, top: 300 }}
    />
    <IconCard
      at={t.mentor}
      icon={Video}
      tint={T.sky}
      label={
        <>
          অভিজ্ঞ <En>Mentor</En>
        </>
      }
      sub={
        <>
          সরাসরি <En>Meeting Book</En>
        </>
      }
      width={520}
      iconSize={130}
      activeFrom={t.meeting}
      activeTo={t.order}
      style={{ position: "absolute", left: 700, top: 300 }}
    />
    <IconCard
      at={t.order}
      icon={Headset}
      tint={T.orange}
      label={<En>Moderator</En>}
      sub="প্রশিক্ষিত ও যাচাইকৃত"
      width={520}
      iconSize={130}
      activeFrom={t.moderator}
      style={{ position: "absolute", left: 1250, top: 300 }}
    />
    <Appear at={t.order} style={{ position: "absolute", left: 1250, width: 520, top: 222, display: "flex", justifyContent: "center" }}>
      <Pill size={28}>
        <En>Order</En> বাড়লে
      </Pill>
    </Appear>
    <Appear at={t.onumodon} style={{ position: "absolute", left: 0, right: 0, top: 830, display: "flex", justifyContent: "center" }}>
      <GradPill icon={ShieldCheck} size={38} style={{ padding: "20px 46px" }}>
        কাজ অনুমোদনের পরেই <En>Payment</En>
      </GradPill>
    </Appear>
  </>
);
