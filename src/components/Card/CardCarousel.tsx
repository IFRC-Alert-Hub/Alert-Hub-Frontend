import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AlertCard from "./AlertCard";

interface CardInfo {
  title: string;
  updatedTime: string;
  country: string;
  severity: string;
  event: string;
  instruction: string;
}

interface CardCarouselProps {
  cards: CardInfo[];
}

const CardCarousel = ({ cards }: CardCarouselProps) => {
  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // only show the first eight alerts
  if (cards.length > 8) {
    cards = cards.slice(0, 8);
  }

  return (
    <div>
      <Slider {...settings}>
        {cards.map((card) => (
          <AlertCard cardInfo={card} />
        ))}
      </Slider>
    </div>
  );
};

export default CardCarousel;
