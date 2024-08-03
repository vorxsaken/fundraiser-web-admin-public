import { IonImg } from "@ionic/react";
import { FC, useState } from "react";
import { cn } from "../lib/utils";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface ImageViewerInterface {
  className?: string;
  src: string;
  alt: string;
}

const ImageViewer: React.FC<ImageViewerInterface> = ({
  src,
  className,
  alt,
}) => {
  const [show, setshow] = useState(false);

  return (
      <Zoom>
        <img src={src} className={cn('w-36 h-44 object-cover border border-slate-300 rounded-lg', className)} alt={alt} />
      </Zoom>
  );
};

export default ImageViewer;
