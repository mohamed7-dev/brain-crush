import React from "react";
import { CldVideoPlayer, CldVideoPlayerProps } from "next-cloudinary";

import "next-cloudinary/dist/cld-video-player.css";

export function OptimizedVideo({ ...props }: CldVideoPlayerProps) {
  return (
    <CldVideoPlayer
      {...props}
      showJumpControls
      controls
      sourceTypes={["hls", "dash"]}
      transformation={{ streaming_profile: "hd" }}
    />
  );
}
