import React, { ReactNode, useState } from "react";
import { Portal } from "react-portal";

export interface Props {
  img: any;
  type?: "left" | "right" | "center";
  width?: string;
  alt?: string;
  disableZoom?: boolean;
}

export default function FloatingImage({
  img,
  type,
  width,
  alt,
  disableZoom = false,
}: Props) {
  const [zoomBox, setZoomBox] = useState<ReactNode>(<></>);
  const isImportedViaRequire: boolean = img.__esModule ? img.__esModule : false;
  const isImageSVG: boolean = typeof img.default == "function";
  if (!isImportedViaRequire) {
    throw Error("Image was not imported via required");
  }

  var transfiguredStyle = {};

  const appliedWidth = width ? width : "50%"; // Defaults to 50% width
  var appliedType = type ? type : "center"; // Defaults to center
  switch (appliedType) {
    case "left": {
      transfiguredStyle = {
        width: appliedWidth,
        float: "left",
        marginRight: "1.5rem",
        marginBottom: "1rem",
        display: "inline-block",
        shapeOutside: "margin-box",
      };
      break;
    }
    case "right": {
      transfiguredStyle = {
        width: appliedWidth,
        float: "right",
        marginLeft: "1.5rem",
        marginBottom: "1rem",
        display: "inline-block",
        shapeOutside: "margin-box",
      };
      break;
    }
    case "center": {
      transfiguredStyle = {
        width: appliedWidth,
        display: "block",
        margin: "1.5rem auto",
      };
      break;
    }
  }

  function onZoomOut() {
    setZoomBox(null);
  }

  function onZoomIn() {
    setZoomBox(
      <Portal
        node={document && document.getElementById("image-zoom-box-placeholder")}
      >
        <div
          onClick={onZoomOut}
          className="fixed overscroll-none bg-white-80-alpha hover:cursor-zoom-out"
        >
          <div
            className={
              "flex place-content-center h-screen w-screen px-6 py-6 pt-14"
            }
          >
            {getImage({
              maxWidth: "100%",
              maxHeight: "100%",
              className: "object-scale-down",
            })}
          </div>
        </div>
      </Portal>
    );
  }
  // @ts-ignore
  function getImage(props?) {
    if (!isImageSVG) {
      return <img src={img.default} alt={alt} className={"mb-4"} {...props} />;
    }
    return (
      <img.default
        {...props}
        alt={alt}
        className="bg-white mb-4 inline-block w-full"
        height={"auto"}
      />
    );
  }

  return (
    <>
      {disableZoom ? null : zoomBox}
      <div className="my-6">
        <div
          // @ts-ignore
          onClick={disableZoom ? null : onZoomIn}
          style={transfiguredStyle}
          className={`px-6 ${disableZoom ? null : "hover:cursor-zoom-in"}`}
        >
          {getImage({
            maxWidth: "100%",
            maxHeight: "100%",
            className: "object-scale-down mb-4",
          })}
          {disableZoom ? null : (
            <div className="text-center">
              <span className="text-gray-500 text-xs">Click to enlarge</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
