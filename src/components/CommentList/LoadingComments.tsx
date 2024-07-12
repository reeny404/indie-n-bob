import Image from "next/image";
import React from "react";
import loadingGif from "../../../public/loading-circle.gif";

const LoadingComments = () => {
  return (
    <div>
      <Image
        src={loadingGif}
        width={loadingGif.width}
        height={loadingGif.height}
        alt="로딩 중..."
        className="mt-52 mb-52 w-14 h-14"
      />
    </div>
  );
};

export default LoadingComments;
