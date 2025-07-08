import React, { useState, useEffect } from "react";
import { Props } from "@src/components/floatingImage/floatingImage";
import fetchImage from "../api/fetchImage";
import { clearWaitingQueue } from "react-toastify/dist/core/store";

const ModifyImage = ({ img, type, width, alt, disableZoom = false }: Props) => {
  const [src, setSrc] = useState("");
  useEffect(() => {
    fetchImage(img, setSrc);
  }, [img]);

  const transfiguredStyle: React.CSSProperties = {
    width: width || "50%",
    float: type === "left" ? "left" : type === "right" ? "right" : "none",
  };

  return (
    <>
      <div className="my-6">
        <div
          style={transfiguredStyle}
          className={`${
            !disableZoom ? "cursor-zoom-in hover:cursor-pointer" : ""
          }`}
        >
          <img src={src} alt={alt} className="max-w-full h-auto mb-4" />
        </div>
      </div>
    </>
  );
};

export default ModifyImage;
