import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Scene1 } from "./Scene1";
import { Scene2 } from "./Scene2";
import { Scene3 } from "./Scene3";
import { Scene4 } from "./Scene4";
import { Scene5 } from "./Scene5";
import { Scene6 } from "./Scene6";
import { Scene7 } from "./Scene7";
import { Scene8 } from "./Scene8";
import { Scene9 } from "./Scene9";
import { Scene10 } from "./Scene10";
import { Scene11 } from "./Scene11";
import { Scene12 } from "./Scene12";
import { StoragePanel } from "./StoragePanel";
import { useStorageData } from "./StorageDataState";

export const FPS = 30;
export const DURATION_SCENE_1 = 6 * FPS;
export const DURATION_SCENE_2 = 13 * FPS;
export const DURATION_SCENE_3 = 11 * FPS;
export const DURATION_SCENE_4 = 13 * FPS;
export const DURATION_SCENE_5 = 13 * FPS;
export const DURATION_SCENE_6 = 11 * FPS;
export const DURATION_SCENE_7 = 13 * FPS;
export const DURATION_SCENE_8 = 13 * FPS;
export const DURATION_SCENE_9 = 12 * FPS;
export const DURATION_SCENE_10 = 11 * FPS;
export const DURATION_SCENE_11 = 11 * FPS;
export const DURATION_SCENE_12 = 10 * FPS;

export const MainVideo: React.FC<{ showCode?: boolean }> = ({ showCode = true }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const { dataFiles, logChips, version, activeCount, note, tScene3, tScene12 } = useStorageData(frame, fps);

  // Panel exit animation logic for Scene 12
  let storagePanelStyle: React.CSSProperties = {};
  if (frame >= tScene12) {
    const localFrame = frame - tScene12;
    const panelSlide = spring({ frame: localFrame - 15, fps, config: { damping: 12 } });
    storagePanelStyle = {
      transform: `translateX(${interpolate(panelSlide, [0, 1], [0, 1000])}px)`,
      opacity: interpolate(panelSlide, [0, 1], [1, 0])
    };
  }

  // Chapter Timeline calculation
  const chapters = [
    { name: "Intro", start: 0, length: DURATION_SCENE_1 },
    { name: "The Problem", start: DURATION_SCENE_1, length: DURATION_SCENE_2 },
    { name: "Create", start: DURATION_SCENE_1 + DURATION_SCENE_2, length: DURATION_SCENE_3 },
    { name: "Atomic Commits", start: DURATION_SCENE_1 + DURATION_SCENE_2 + DURATION_SCENE_3, length: DURATION_SCENE_4 },
    { name: "Concurrency", start: DURATION_SCENE_1 + DURATION_SCENE_2 + DURATION_SCENE_3 + DURATION_SCENE_4, length: DURATION_SCENE_5 },
    { name: "Schema", start: DURATION_SCENE_1 + DURATION_SCENE_2 + DURATION_SCENE_3 + DURATION_SCENE_4 + DURATION_SCENE_5, length: DURATION_SCENE_6 },
    { name: "Updates", start: DURATION_SCENE_1 + DURATION_SCENE_2 + DURATION_SCENE_3 + DURATION_SCENE_4 + DURATION_SCENE_5 + DURATION_SCENE_6, length: DURATION_SCENE_7 },
    { name: "Time Travel", start: DURATION_SCENE_1 + DURATION_SCENE_2 + DURATION_SCENE_3 + DURATION_SCENE_4 + DURATION_SCENE_5 + DURATION_SCENE_6 + DURATION_SCENE_7, length: DURATION_SCENE_8 },
    { name: "Checkpoints", start: DURATION_SCENE_1 + DURATION_SCENE_2 + DURATION_SCENE_3 + DURATION_SCENE_4 + DURATION_SCENE_5 + DURATION_SCENE_6 + DURATION_SCENE_7 + DURATION_SCENE_8, length: DURATION_SCENE_9 },
    { name: "Optimize", start: DURATION_SCENE_1 + DURATION_SCENE_2 + DURATION_SCENE_3 + DURATION_SCENE_4 + DURATION_SCENE_5 + DURATION_SCENE_6 + DURATION_SCENE_7 + DURATION_SCENE_8 + DURATION_SCENE_9, length: DURATION_SCENE_10 },
    { name: "Data Skipping", start: DURATION_SCENE_1 + DURATION_SCENE_2 + DURATION_SCENE_3 + DURATION_SCENE_4 + DURATION_SCENE_5 + DURATION_SCENE_6 + DURATION_SCENE_7 + DURATION_SCENE_8 + DURATION_SCENE_9 + DURATION_SCENE_10, length: DURATION_SCENE_11 },
    { name: "Recap", start: tScene12, length: DURATION_SCENE_12 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#f2eee6", fontFamily: "Geist, sans-serif", color: "#111" }}>
      <Sequence from={0} durationInFrames={DURATION_SCENE_1}>
        <Scene1 />
      </Sequence>
      <Sequence from={DURATION_SCENE_1} durationInFrames={DURATION_SCENE_2}>
        <Scene2 />
      </Sequence>
      <Sequence from={DURATION_SCENE_1 + DURATION_SCENE_2} durationInFrames={DURATION_SCENE_3}>
        <Scene3 showCode={showCode} />
      </Sequence>
      <Sequence from={DURATION_SCENE_1 + DURATION_SCENE_2 + DURATION_SCENE_3} durationInFrames={DURATION_SCENE_4}>
        <Scene4 showCode={showCode} />
      </Sequence>
      <Sequence from={DURATION_SCENE_1 + DURATION_SCENE_2 + DURATION_SCENE_3 + DURATION_SCENE_4} durationInFrames={DURATION_SCENE_5}>
        <Scene5 showCode={showCode} />
      </Sequence>
      <Sequence from={DURATION_SCENE_1 + DURATION_SCENE_2 + DURATION_SCENE_3 + DURATION_SCENE_4 + DURATION_SCENE_5} durationInFrames={DURATION_SCENE_6}>
        <Scene6 showCode={showCode} />
      </Sequence>
      <Sequence from={DURATION_SCENE_1 + DURATION_SCENE_2 + DURATION_SCENE_3 + DURATION_SCENE_4 + DURATION_SCENE_5 + DURATION_SCENE_6} durationInFrames={DURATION_SCENE_7}>
        <Scene7 showCode={showCode} />
      </Sequence>
      <Sequence from={DURATION_SCENE_1 + DURATION_SCENE_2 + DURATION_SCENE_3 + DURATION_SCENE_4 + DURATION_SCENE_5 + DURATION_SCENE_6 + DURATION_SCENE_7} durationInFrames={DURATION_SCENE_8}>
        <Scene8 showCode={showCode} />
      </Sequence>
      <Sequence from={DURATION_SCENE_1 + DURATION_SCENE_2 + DURATION_SCENE_3 + DURATION_SCENE_4 + DURATION_SCENE_5 + DURATION_SCENE_6 + DURATION_SCENE_7 + DURATION_SCENE_8} durationInFrames={DURATION_SCENE_9}>
        <Scene9 showCode={showCode} />
      </Sequence>
      <Sequence from={DURATION_SCENE_1 + DURATION_SCENE_2 + DURATION_SCENE_3 + DURATION_SCENE_4 + DURATION_SCENE_5 + DURATION_SCENE_6 + DURATION_SCENE_7 + DURATION_SCENE_8 + DURATION_SCENE_9} durationInFrames={DURATION_SCENE_10}>
        <Scene10 showCode={showCode} />
      </Sequence>
      <Sequence from={DURATION_SCENE_1 + DURATION_SCENE_2 + DURATION_SCENE_3 + DURATION_SCENE_4 + DURATION_SCENE_5 + DURATION_SCENE_6 + DURATION_SCENE_7 + DURATION_SCENE_8 + DURATION_SCENE_9 + DURATION_SCENE_10} durationInFrames={DURATION_SCENE_11}>
        <Scene11 showCode={showCode} />
      </Sequence>
      <Sequence from={tScene12} durationInFrames={DURATION_SCENE_12}>
        <Scene12 />
      </Sequence>

      {/* Persistent Storage Panel from Scene 3 onwards */}
      {frame >= tScene3 && (
        <StoragePanel
          dataFiles={dataFiles}
          logChips={logChips}
          version={version}
          activeCount={activeCount}
          note={note}
          style={storagePanelStyle}
        />
      )}

      {/* Chapter Timeline */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "30px",
        display: "flex",
        backgroundColor: "rgba(0,0,0,0.05)",
        zIndex: 50
      }}>
        {chapters.map((chap, i) => {
          const widthPercent = (chap.length / durationInFrames) * 100;
          const isPast = frame > chap.start + chap.length;
          const isCurrent = frame >= chap.start && frame < chap.start + chap.length;

          let fillPercent = 0;
          if (isPast) fillPercent = 100;
          else if (isCurrent) fillPercent = ((frame - chap.start) / chap.length) * 100;

          return (
            <div key={i} style={{
              width: `${widthPercent}%`,
              height: "100%",
              position: "relative",
              borderRight: "1px solid rgba(255,255,255,0.5)",
              boxSizing: "border-box",
              overflow: "hidden"
            }}>
              {/* Progress fill */}
              <div style={{
                position: "absolute",
                top: 0, left: 0, height: "100%",
                width: `${fillPercent}%`,
                backgroundColor: "#0e7a76",
                opacity: 0.8
              }} />
              {/* Label */}
              <div style={{
                position: "absolute",
                top: "0", left: "4px", height: "100%",
                display: "flex", alignItems: "center",
                fontSize: "10px", color: isPast || isCurrent ? "#fff" : "#888",
                fontWeight: "bold", fontFamily: "Geist Mono",
                whiteSpace: "nowrap", textShadow: isPast || isCurrent ? "0 1px 2px rgba(0,0,0,0.5)" : "none"
              }}>
                {chap.name}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
