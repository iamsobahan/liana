'use client';
import Image from 'next/image';
import banner1 from '../../assets/banner3.jpg';
import banner from '../../assets/banner2.jpg';
import dynamic from 'next/dynamic';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const slides = [{ image: banner }, { image: banner1 }];

const settings = {
  dots: false,
  fade: true,
  arrows: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Banner = () => {
  return (
    <div className="w-full">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full aspect-[16/9]">
            <Image
              src={slide.image}
              alt={`Banner ${index + 1}`}
              fill
              className="object-cover rounded-none"
              placeholder="blur"
            />
            <div className="absolute inset-0 flex items-center justify-end pr-4 sm:pr-10 md:pr-16 bg-black/20">
              {/* Optional content like text or button */}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
