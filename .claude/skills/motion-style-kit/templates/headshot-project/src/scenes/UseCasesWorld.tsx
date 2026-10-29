import type { LucideIcon } from "lucide-react";
import { Briefcase, Check, ShoppingBag, Sparkles } from "lucide-react";
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { useEnter3D, useProgress, useSceneTime } from "../components/anim";
import { Bokeh } from "../components/Ambient";
import { GlassPill } from "../components/GlassPill";
import { IconOrb } from "../components/IconOrb";
import { Reveal } from "../components/Reveal";
import { ClipThumb } from "../components/ClipThumb";
import { T } from "../data/timeline";
import { colors, fonts, glass, gradients, layout } from "../theme";

const CARD_W = 900;

// User-supplied clips (public/broll/). In the product clip the headphones are
// on screen only for the first ~4.3 s (then empty background), so only that
// part plays, repeating with a soft dissolve. The client clip (8 s) outlasts its card.
const CLIPS = {
  product: { src: "broll/product-promo.mp4", rate: 0.8, usableSec: 4.3 },
  client: { src: "broll/client-video.mp4", rate: 1, usableSec: undefined },
};

const UseCaseCard: React.FC<{
  icon: LucideIcon;
  clip: { src: string; rate: number; usableSec?: number };
  at: number;
  aiAt: number;
  exitAt: number;
  phase: number;
  children: React.ReactNode;
}> = ({ icon, clip, at, aiAt, exitAt, phase, children }) => {
  const frame = useCurrentFrame();
  const enter = useEnter3D(at, exitAt, { tilt: 28 });
  const ai = useProgress(aiAt, 12);
  const fill = interpolate(frame, [aiAt + 4, aiAt + 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.2, 1),
  });
  const done = useProgress(aiAt + 34, 10);
  return (
    <div style={{ ...enter, translate: `0px ${Math.sin(frame / 22 + phase) * 10}px` }}>
      <div style={{ width: CARD_W, padding: 40, borderRadius: 64, ...glass.onLight, position: "relative" }}>
        <ClipThumb src={clip.src} width={CARD_W - 80} startAt={at} playbackRate={clip.rate} usableSec={clip.usableSec} icon={icon} />
        <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 70, color: colors.ink, marginTop: 34, lineHeight: 1.25, minHeight: 176 }}>
          {children}
        </div>
        {/* AI edit progress */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 20, opacity: ai }}>
          <div style={{ flex: 1, height: 24, borderRadius: 99, background: "rgba(124,58,237,0.12)", overflow: "hidden" }}>
            <div style={{ width: `${fill * 100}%`, height: "100%", borderRadius: 99, background: gradients.keyword }} />
          </div>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 99,
              background: done > 0.01 ? colors.success : "rgba(124,58,237,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Check size={48} color="white" strokeWidth={3.4} style={{ opacity: done, scale: interpolate(done, [0, 1], [0.5, 1]) }} />
          </div>
        </div>
        <IconOrb icon={Sparkles} tint="magenta" at={aiAt} exitAt={exitAt} size={150} style={{ position: "absolute", right: -40, top: -50 }} />
      </div>
    </div>
  );
};

// S3 — "আপনার নিজের প্রোডাক্টের প্রমোশন অথবা আপনার ক্লায়েন্টে দেওয়া … ভিডিওগুলো … এআই দিয়ে এডিটিং করতে পারবেন".
// Lives below the footage card (card framing).
export const UseCasesWorld: React.FC = () => {
  const { at } = useSceneTime(T.useCases.start);
  const exitAt = at(T.useCases.exit);
  const aiAt = at(T.useCases.ai);
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: layout.belowCardTop - 10,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 120,
        }}
      >
        <UseCaseCard icon={ShoppingBag} clip={CLIPS.product} at={at(T.useCases.product)} aiAt={aiAt} exitAt={exitAt} phase={0}>
          প্রোডাক্টের প্রমোশন
        </UseCaseCard>
        <UseCaseCard icon={Briefcase} clip={CLIPS.client} at={at(T.useCases.client)} aiAt={aiAt + 3} exitAt={exitAt} phase={2}>
          ক্লায়েন্টের দেয়া ভিডিওগুলো
        </UseCaseCard>
        <Reveal at={at(T.useCases.or)} exitAt={exitAt} style={{ position: "absolute", top: 380, left: "50%", translate: "-50% 0" }}>
          <GlassPill variant="brand" size={64}>
            অথবা
          </GlassPill>
        </Reveal>
      </div>
      <Bokeh seed="usecases" count={6} front opacity={0.7} />
    </AbsoluteFill>
  );
};
