import { FC } from "react";
import Image from "next/image";

const Carousel: FC = () => {
  return (
    <div className="relative w-full">
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner w-full">
          <div className="carousel-item active">
            <div className="relative w-[100%] h-[500px]">
              <Image
                src="/SILICAGEL.webp"
                layout="fill"
                className="d-block object-cover"
                alt="First slide"
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white text-2xl p-4">
                실리카겔(SILICA GEL)
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="relative w-[100%] h-[500px]">
              <Image
                src="/Jannabi.jpg"
                layout="fill"
                className="d-block object-cover"
                alt="Second slide"
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-black text-2xl p-4">
                잔나비(Jannabi)
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="relative w-[100%] h-[500px]">
              <Image
                src="/Lucy.jpg"
                layout="fill"
                className="d-block object-cover"
                alt="Third slide"
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white text-2xl p-4">
                루시(Lucy)
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
