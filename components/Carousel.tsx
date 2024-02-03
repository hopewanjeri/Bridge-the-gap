import React, { useState, useEffect, useRef } from 'react';

const images = [
    '/deaf-girl.jpg',
    '/image-1.jpeg',
    '/image-2.jpeg',
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef<number | null>(null);

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        const interval = setInterval(goToNextSlide, 3000) as unknown as number;
        slideRef.current = interval;


        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <div className="relative w-full h-full overflow-hidden">
            <div
                className="absolute z-50 bg-black h-full w-full opacity-20"
            />
            {images.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt={`Slide ${index}`}
                    className={`w-full h-full object-fill absolute transition-opacity duration-1000 ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ transitionDelay: `${index === currentIndex ? '150ms' : '0ms'}` }}
                />
            ))}
        </div>
    );
};

export default Carousel;
