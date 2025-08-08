import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// Importa los estilos de Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import type { RootObject, SectionsHomeAbout } from "../../interfaces/dbData";
import Counter from "../global/Counter";
import ButtonContent from "../buttons/Buttons";
import { useEffect, useState } from "react";

interface HeroSection2Props {
  data: RootObject; // Asegúrate de que RootObject está bien definido y accesible.
  blockSection: SectionsHomeAbout[];
}

const HeroSection2: React.FC<HeroSection2Props> = ({ data, blockSection }) => {
  const yearExperiense = data.yearsExperience;
  const miles = data.milesCover;
  const city = data.dataGeneral.location[0].city;
  const [currentSlide, setCurrentSlide] = useState(0);

   // Cambiar slide automáticamente cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [currentSlide]); // Escucha los cambios en `currentSlide`

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === blockSection[0].additionalImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? blockSection[0].additionalImages.length - 1 : prev - 1));
  };


  //como puedo poner lo anterior en un array ? que sea parameter y label

  const dataCounter = [
    {
      label: "Experience",
      subLabel: "Years of",
      parameter: yearExperiense,
    },
    {
      label: city,
      subLabel: "miles around",
      parameter: miles,
    },
    {
      label: "On Time",
      subLabel: "%",
      parameter: 100,
    },
  ];

  return (
    <div className="w-full flex md:flex-row flex-col relative">
      <div className="w-full h-auto pt-64 pb-20 relative z-10">
        <div className="md:w-[80%] mx-auto w-full h-full flex flex-col  md:px-1 px-3 relative z-20">
          <div className="md:w-[80%] mx-auto w-full flex flex-col justify-center items-center  pb-[160px]">
            <div className="px-4 my-4 text-center">
              <span className="md:text-[30px] text-[20px] font-bold text-white">
                {data.name}
              </span>
              <h1 className="md:text-[50px] text-[30px] font-bold text-white">
                {data.slogan[0]}
              </h1>
            </div>
            <p className="text-white mb-4 text-center">{data.valuesContent.mission}</p>
            <ButtonContent />
          </div>
        </div>
      </div>
      <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 ">
       {
          blockSection[0].additionalImages.map((img, index) => (
            <div key={index} className={` ${index === currentSlide ? 'block' : 'hidden'}`}>
              <img
                src={img}
                alt={`slide-${index}`}
                className="w-full h-full object-cover absolute top-0 left-0"
              />
            </div>
          ))
        }
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>

    </div>
  );
};

export default HeroSection2;
