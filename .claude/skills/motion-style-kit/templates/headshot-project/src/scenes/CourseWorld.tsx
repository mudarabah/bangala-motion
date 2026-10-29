import { Braces, Flame, Heart, Laugh, Mic, Smile, TrendingUp } from "lucide-react";
import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { useEnter3D, useProgress, useSceneTime } from "../components/anim";
import { Bokeh } from "../components/Ambient";
import { GlassPill } from "../components/GlassPill";
import { GlassWindow } from "../components/GlassWindow";
import { HeroWord } from "../components/HeroWord";
import { IconOrb } from "../components/IconOrb";
import { Reveal } from "../components/Reveal";
import { T } from "../data/timeline";
import { colors, glass, gradients, layout } from "../theme";

const PANEL: React.CSSProperties = {
  position: "absolute",
  left: 120,
  right: 120,
  top: layout.belowCardTop,
  height: 1000,
};

// ── Panel 1: voice generator ────────────────────────────────────────────────
const Waveform: React.FC<{ emotionAt: number }> = ({ emotionAt }) => {
  const frame = useCurrentFrame();
  const emo = useProgress(emotionAt, 16);
  const BARS = 54;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, height: 340 }}>
      {Array.from({ length: BARS }, (_, i) => {
        const base = 0.18 + 0.22 * Math.abs(Math.sin(i * 0.9 + frame * 0.32)) + 0.1 * random(`w${i}`);
        const rich = 0.3 + 0.7 * Math.abs(Math.sin(i * 0.45 + frame * 0.22) * Math.cos(i * 0.17 - frame * 0.09));
        const h = interpolate(emo, [0, 1], [base, rich]);
        return (
          <div
            key={i}
            style={{
              width: 16,
              height: `${h * 100}%`,
              borderRadius: 99,
              background: emo > 0.02 ? gradients.keyword : "#C4B5FD",
              opacity: 0.55 + 0.45 * emo,
            }}
          />
        );
      })}
    </div>
  );
};

const VoicePanel: React.FC<{ at: number; emotionAt: number; exitAt: number }> = ({ at, emotionAt, exitAt }) => {
  const frame = useCurrentFrame();
  const style = useEnter3D(at, exitAt, { axis: "x", rise: 260, tilt: 18 });
  const ring = (k: number) => ((frame - at + k * 14) % 42) / 42;
  return (
    <div style={{ ...PANEL, ...style }}>
      <div style={{ height: "100%", borderRadius: 72, ...glass.onLight, display: "flex", alignItems: "center", gap: 70, padding: "0 80px" }}>
        <div style={{ position: "relative", width: 300, height: 300, flexShrink: 0 }}>
          {[0, 1, 2].map((k) => (
            <div
              key={k}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 999,
                border: "6px solid rgba(124,58,237,0.5)",
                scale: 1 + ring(k) * 0.7,
                opacity: 1 - ring(k),
              }}
            />
          ))}
          <IconOrb icon={Mic} at={at + 2} size={300} bob={false} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 40, height: 210 }}>
            <GlassPill icon={Mic} variant="light" size={70}>
              ভয়েসওভার
            </GlassPill>
            <HeroWord at={emotionAt} fill="gradient" size={170}>
              ইমোশন
            </HeroWord>
          </div>
          <Waveform emotionAt={emotionAt} />
          <div style={{ display: "flex", gap: 36, height: 130 }}>
            {[Smile, Heart, Laugh, Flame].map((Icon, i) => (
              <IconOrb key={i} icon={Icon} at={emotionAt + 6 + i * 4} size={130} tint={i % 2 ? "magenta" : "brand"} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Panel 2: JSON prompt editor ─────────────────────────────────────────────
const KEY = "#7C3AED";
const STR = "#C026D3";
const NUM = "#D97706";
const PUN = "#6B6488";
const CODE: [string, string][][] = [
  [["{", PUN]],
  [['  "voice"', KEY], [": ", PUN], ['"warm"', STR], [",", PUN]],
  [['  "emotion"', KEY], [": ", PUN], ['"excited"', STR], [",", PUN]],
  [['  "pace"', KEY], [": ", PUN], ["1.1", NUM], [",", PUN]],
  [['  "style"', KEY], [": ", PUN], ['"premium"', STR], [",", PUN]],
  [['  "motion"', KEY], [": ", PUN], ['"smooth"', STR]],
  [["}", PUN]],
];

const CodeTyping: React.FC<{ at: number; charsPerFrame: number }> = ({ at, charsPerFrame }) => {
  const frame = useCurrentFrame();
  let budget = Math.max(0, Math.floor((frame - at) * charsPerFrame));
  const total = CODE.flat().reduce((n, [t]) => n + t.length, 0);
  const done = budget >= total;
  return (
    <div style={{ fontFamily: "Menlo, monospace", fontSize: 64, lineHeight: 1.55, fontWeight: 600, padding: "40px 60px" }}>
      {CODE.map((line, li) => {
        const spans = line.map(([t, c], si) => {
          const shown = t.slice(0, Math.max(0, budget));
          budget -= t.length;
          return (
            <span key={si} style={{ color: c, whiteSpace: "pre" }}>
              {shown}
            </span>
          );
        });
        return (
          <div key={li} style={{ display: "flex", alignItems: "center", minHeight: 99 }}>
            <span style={{ color: "rgba(107,100,136,0.45)", width: 70, flexShrink: 0 }}>{li + 1}</span>
            {spans}
            {!done && budget < 0 && budget > -line.reduce((n, [t]) => n + t.length, 0) - 1 ? (
              <span style={{ width: 6, height: 70, background: colors.brand, marginLeft: 4 }} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

const JsonPanel: React.FC<{ at: number; exitAt: number }> = ({ at, exitAt }) => {
  const style = useEnter3D(at, exitAt, { axis: "x", rise: 260, tilt: 18 });
  return (
    <div style={{ ...PANEL, ...style, display: "flex", gap: 60, alignItems: "center" }}>
      <GlassWindow title="prompt.json" style={{ width: 1180, height: "100%", flexShrink: 0 }}>
        <CodeTyping at={at + 6} charsPerFrame={2.4} />
      </GlassWindow>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <IconOrb icon={Braces} at={at + 4} size={240} />
        <HeroWord at={at + 6} fill="gradient" size={180}>
          JSON
        </HeroWord>
        <HeroWord at={at + 10} fill="gradient" size={180} style={{ marginTop: -50 }}>
          prompt
        </HeroWord>
      </div>
    </div>
  );
};

// ── Panel 3: next level ─────────────────────────────────────────────────────
const LevelPanel: React.FC<{ at: number; levelAt: number; exitAt: number }> = ({ at, levelAt, exitAt }) => {
  const frame = useCurrentFrame();
  const style = useEnter3D(at, exitAt, { axis: "x", rise: 260, tilt: 18 });
  const heights = [0.22, 0.36, 0.52, 0.72, 1];
  const line = interpolate(frame, [levelAt, levelAt + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });
  return (
    <div style={{ ...PANEL, ...style, display: "flex", gap: 60, alignItems: "center" }}>
      <div style={{ width: 1080, height: "100%", borderRadius: 72, ...glass.onLight, position: "relative", padding: 80, display: "flex", alignItems: "flex-end", gap: 50 }}>
        {heights.map((h, i) => {
          const grow = interpolate(frame, [at + 6 + i * 4, at + 22 + i * 4], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${h * 78 * grow}%`,
                borderRadius: 36,
                background: i === heights.length - 1 ? gradients.keyword : "rgba(124,58,237,0.22)",
                boxShadow: i === heights.length - 1 ? "0 24px 60px rgba(124,58,237,0.4)" : undefined,
              }}
            />
          );
        })}
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" style={{ position: "absolute", inset: 80, width: "calc(100% - 160px)", height: "calc(100% - 160px)", overflow: "visible" }}>
          <path
            d="M 60 820 L 280 690 L 480 560 L 700 380 L 940 70"
            fill="none"
            stroke={colors.magenta}
            strokeWidth={16}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - line}
          />
        </svg>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <IconOrb icon={TrendingUp} at={at + 4} size={220} tint="success" />
        <Reveal at={at + 4} exitAt={levelAt}>
          <GlassPill variant="light" size={70}>
            এডিটিং স্কিলটাকে
          </GlassPill>
        </Reveal>
        <HeroWord at={levelAt} fill="gradient" size={180} style={{ marginTop: -150 }}>
          নেক্সট
        </HeroWord>
        <HeroWord at={levelAt + 3} fill="gradient" size={180} style={{ marginTop: -50 }}>
          লেভেলে
        </HeroWord>
      </div>
    </div>
  );
};

// S5b — "এআই দিয়ে আপনি যে ভয়েস ওভার জেনারেট করবেন সেটাতে কীভাবে ইমোশন যুক্ত করতে হয়,
// কীভাবে JSON প্রম্পট ব্যবহার করার মাধ্যমে আপনার এডিটিং স্কিলটাকে নেক্সট লেভেলে নিয়ে যেতে পারেন".
// Lives below the footage card; panels push in from the right one after another.
export const CourseWorld: React.FC = () => {
  const { at } = useSceneTime(T.course.start);
  const exitAt = at(T.course.exit);
  return (
    <AbsoluteFill>
      <VoicePanel at={at(T.course.voiceover)} emotionAt={at(T.course.emotion)} exitAt={at(T.course.json)} />
      <JsonPanel at={at(T.course.json)} exitAt={at(T.course.skill)} />
      <LevelPanel at={at(T.course.skill)} levelAt={at(T.course.level)} exitAt={exitAt} />
      <Bokeh seed="course" count={6} front opacity={0.6} />
    </AbsoluteFill>
  );
};
