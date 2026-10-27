import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import { z } from "zod";
import "./style.css";

// Input schema for toggles
const myCompSchema = z.object({
  showCode: z.boolean(),
  motionEditor: z.boolean(), // Requested by prompt
});

// 137 seconds total * 30 fps = 4110 frames
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DeltaLakeExplainer"
        component={MainVideo}
        durationInFrames={4110}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema}
        defaultProps={{
          showCode: true,
          motionEditor: false,
        }}
      />
    </>
  );
};
