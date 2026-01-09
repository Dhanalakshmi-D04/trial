import React, { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Work from "./Components/Work";
import Playreel from "./Components/Playreel";
import Images from "./Components/Images";
import Spread from "./Spread";
import Story from "./Components/Story";
import LocomotiveScroll from "locomotive-scroll";

const App = () => {
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
    });

    return () => scroll.destroy();
  }, []);

  return (
    <>
      <Navbar />

      {/* SCROLL CONTAINER */}
      <main data-scroll-container>

        <section id="home" data-scroll-section>
          <Hero />
        </section>

        <section id="about" data-scroll-section>
          <Work />
        </section>

        <section id="skills" data-scroll-section>
          <Playreel />
        </section>

        <section id="projects" data-scroll-section>
          
          <Images />
        
        </section>
        <section id="Exposures" data-scroll-section>
          
          <Spread />
        
        </section>

        

        <section id="contact" data-scroll-section>
          <Story />
        </section>
      
       
        
        
        


      </main>
    </>
  );
};

export default App;
