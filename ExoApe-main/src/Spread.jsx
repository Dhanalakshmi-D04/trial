import React, { useEffect, useRef, useState } from "react";

const certificates = [
  { id: 1, title: "GSSoC", year: "2021", desc: "Open-source contributor", image: "/cert1.png" },
  { id: 2, title: "Local Hack Day", year: "2022", desc: "MLH Hackathon", image: "/cert2.png" },
  { id: 3, title: "Symposium", year: "2023", desc: "Technical event", image: "/cert3.png" },
  { id: 4, title: "Workshop", year: "2023", desc: "AI Workshop", image: "/cert4.png" },
];

const Spread = () => {
  const orbitRef = useRef(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const rotationY = useRef(0);

  const [active, setActive] = useState(null);

  /* ========= CONSTANT AUTO ROTATION ========= */
  useEffect(() => {
    let raf;
    const animate = () => {
      if (!isDragging.current) {
        rotationY.current += 0.03; // 👈 NORMAL SLOW SPEED
      }

      if (orbitRef.current) {
        orbitRef.current.style.transform = `
          translateY(-120px)
          rotateX(-18deg)
          rotateY(${rotationY.current}deg)
        `;
      }

      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ========= MOUSE ROTATION (NO INERTIA) ========= */
  const handleMouseDown = (e) => {
    isDragging.current = true;
    lastX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.clientX - lastX.current;
    rotationY.current += delta * 0.3; // 👈 direct rotation
    lastX.current = e.clientX;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
      <section className="relative min-h-[140vh] overflow-hidden text-white">

  {/* BACKGROUND IMAGE */}
  <div className="absolute inset-0 -z-10">
    <img
      src="/bg.jpg"
      alt="background"
      className="w-full h-full object-cover"
    />
    {/* dark overlay */}
    <div className="absolute inset-0 bg-black/60" />
  </div>


      {/* HEADING */}
      <div className="pt-5 px-6">
        <h1 className="text-[4rem] sm:text-[7rem] font-bold text-neutral-200">
          Exposures
        </h1>
        <p className="text-neutral-300 mt-2">
          Knowledge motion😉
        </p>
      </div>

      {/* ORBIT */}
      <div
        className="orbit-wrapper -mt-24"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div ref={orbitRef} className="orbit-3d">
          {certificates.map((item, i) => (
            <div
              key={item.id}
              className="orbit-card"
              style={{ "--i": i, "--total": certificates.length }}
              onClick={() => setActive(item)}
            >
              <img src={item.image} alt={item.title} />
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {active && (
        <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur flex items-center justify-center px-6">
          <div className="bg-[#111] border border-neutral-800 rounded-2xl max-w-5xl w-full p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            <img src={active.image} className="w-full rounded-xl" />
            <div>
              <h2 className="text-3xl font-semibold">{active.title}</h2>
              <p className="text-neutral-400">{active.year}</p>
              <p className="mt-6 text-neutral-300">{active.desc}</p>
              <button
                onClick={() => setActive(null)}
                className="mt-8 border-b border-neutral-500 hover:border-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Spread;
