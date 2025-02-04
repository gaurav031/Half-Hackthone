import React, { useEffect } from "react";
import "./carousel.css"; // Keep your CSS

// Import the images
import img1 from "../../assets/Plumber.jpg";
import img2 from "../../assets/electrician.jpg";
import img3 from "../../assets/carpenter.JPG";
import img4 from "../../assets/tiffins.jpg";
import { Link } from "react-router-dom";

const Carousel = () => {
  useEffect(() => {
    const nextDom = document.getElementById("next");
    const prevDom = document.getElementById("prev");
    const carouselDom = document.querySelector(".carousel");
    const SliderDom = carouselDom.querySelector(".list");
    const thumbnailBorderDom = document.querySelector(".thumbnail");
    const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");
    const timeRunning = 3000;
    const timeAutoNext = 7000;

    // Cycle the first thumbnail to the end
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

    const showSlider = (type) => {
      const SliderItemsDom = SliderDom.querySelectorAll(".list .item");
      const thumbnailItemsDom = document.querySelectorAll(".thumbnail .item");

      if (type === "next") {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add("next");
      } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(
          thumbnailItemsDom[thumbnailItemsDom.length - 1]
        );
        carouselDom.classList.add("prev");
      }

      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(() => {
        carouselDom.classList.remove("next", "prev");
      }, timeRunning);

      clearTimeout(runNextAuto);
      runNextAuto = setTimeout(() => {
        nextDom.click();
      }, timeAutoNext);
    };

    let runTimeOut;
    let runNextAuto = setTimeout(() => {
      nextDom.click();
    }, timeAutoNext);

    nextDom.onclick = () => {
      showSlider("next");
    };

    prevDom.onclick = () => {
      showSlider("prev");
    };

    return () => {
      clearTimeout(runTimeOut);
      clearTimeout(runNextAuto);
    };
  }, []);

  return (
    <div className="carousel">
      {/* List Items */}
      <div className="list">
        {/* Slider Item for Plumber */}
        <div className="item">
          <img src={img1} alt="Plumber" />
          <div className="content">
            <div className="author">Expert Plumbers</div>
            <div className="title">Quality Plumbing</div>
            <div className="topic">Residential & Commercial</div>
            <div className="des">
              Reliable plumbing services, 24/7 emergency support, and affordable rates.
            </div>
            <div className="buttons">
              <Link to="/plumber">
                <button>SEE MORE</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Slider Item for Electrician */}
        <div className="item">
          <img src={img2} alt="Electrician" />
          <div className="content">
            <div className="author">Certified Electricians</div>
            <div className="title">Electrical Solutions</div>
            <div className="topic">Safe & Efficient</div>
            <div className="des">
              Expert electrical repairs, installations, and maintenance with utmost safety.
            </div>
            <div className="buttons">
              <Link to="/electrician">
                <button>SEE MORE</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Slider Item for Carpenter */}
        <div className="item">
          <img src={img3} alt="Carpenter" />
          <div className="content">
            <div className="author">Skilled Carpenters</div>
            <div className="title">Custom Woodwork</div>
            <div className="topic">Bespoke Furniture</div>
            <div className="des">
              Handcrafted woodwork, custom furniture design, and installation services.
            </div>
            <div className="buttons">
              <Link to="/carpenter">
                <button>SEE MORE</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Slider Item for Tiffin Services */}
        <div className="item">
          <img src={img4} alt="Tiffin Services" />
          <div className="content">
            <div className="author">Homemade Tiffins</div>
            <div className="title">Delicious Meals</div>
            <div className="topic">Fresh & Healthy</div>
            <div className="des">
              Enjoy the taste of freshly prepared, home-cooked meals delivered to your doorstep.
            </div>
            <div className="buttons">
              <Link to="/tiffin">
                <button>SEE MORE</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Items */}
      <div className="thumbnail">
        <div className="item">
          <img src={img1} alt="Thumbnail Plumber" />
        </div>
        <div className="item">
          <img src={img2} alt="Thumbnail Electrician" />
        </div>
        <div className="item">
          <img src={img3} alt="Thumbnail Carpenter" />
        </div>
        <div className="item">
          <img src={img4} alt="Thumbnail Tiffin" />
        </div>
      </div>

      {/* Next/Prev Buttons */}
      <div className="arrows">
        <button id="prev">&lt;</button>
        <button id="next">&gt;</button>
      </div>

      {/* Time Indicator */}
      <div className="time"></div>
    </div>
  );
};

export default Carousel;
