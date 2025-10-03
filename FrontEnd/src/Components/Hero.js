import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';
import { useNavigate } from 'react-router-dom';

const images = [
  
  require('../assets/hands.jpg'),
  require('../assets/download.jpg'),
  require('../assets/Hunger.jpg')
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);
  const navigate = useNavigate();

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 4000);
    return () => clearInterval(interval); // clear on unmount
  }, []);

  const handleDonateClick = () => {
    navigate('/donate-campaigns');
  };

  return (
    <div className="hero-slider">
      <div className="arrow left" onClick={goToPrev}>&#8249;</div>

      <div className="slider-window">
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`
          }}
          ref={slideRef}
        >
          {images.map((img, index) => (
            <div className="slide-card" key={index}>
              <img src={img} alt={`Slide ${index}`} className="slide-image" />
              <div className="text-overlay">
                <h1>Make a Difference Today</h1>
                <p>Your donation can change lives. Join us in making the world a better place.</p>
                <button className="donate-btn" onClick={handleDonateClick}>Donate Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="arrow right" onClick={goToNext}>&#8250;</div>
    </div>
  );
};

export default Hero;
