// HeroSlide.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HeroSlide.css";

const UNSPLASH_API_KEY = "qT2xcpYOXth_hJOUVZ6ELdjPRjTiJVyx_aVjqQ8oLA8";
const UNSPLASH_URL = `https://api.unsplash.com/search/photos?query=snow+mountains&per_page=3&client_id=${UNSPLASH_API_KEY}`;

const HeroSlide = () => {
  const [images, setImages] = useState([]);
  const [headings, setHeadings] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(UNSPLASH_URL);
        const imageUrls = response.data.results.map((img) => img.urls.regular);
        const imageHeadings = response.data.results.map(
          (img) => img.alt_description || "Snow Mountain"
        );
        setImages(imageUrls);
        setHeadings(imageHeadings);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div
      className="hero-slide-container"
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    >
      <nav className="navbar">
        <img
          className="logo"
          src="https://via.placeholder.com/150x50?text=Logo"
          alt="Logo"
        />
        <div>
          <a className="nav-item" href="#">
            Home
          </a>
          <a className="nav-item" href="#">
            About
          </a>
          <a className="nav-item" href="#">
            Contact
          </a>
        </div>
      </nav>
      <div className="content">
        <div className="heading">{headings[currentImage]}</div>
        <div className="paragraph">
          This is a small paragraph that describes the current slide. It
          provides additional information or context for the heading and image
          displayed.
        </div>
      </div>
      <div className="dots-container">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentImage ? "active" : ""}`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlide;
