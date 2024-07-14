import React from "react";
import BestInfo from "./BestInfo";
import PerformanceInfo from "./PerformanceInfo";
import Carousel from "./Carousel";

const MainPage = () => {
  return (
    <div className="mb-38">
      <div className=" absolute left-0 right-0">
        <Carousel />
      </div>
      <div className="w-full h-[500px]"></div>
      <PerformanceInfo />
      <BestInfo />
    </div>
  );
};

export default MainPage;
