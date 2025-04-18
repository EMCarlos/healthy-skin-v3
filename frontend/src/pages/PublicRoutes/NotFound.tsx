import notFound from "@/assets/not-found.png";
import Navbar from "@/components/Navbar";
import { ghostImages } from "@/constants";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

const NotFound = () => {
  const location = useLocation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let mousex = 0;
    let mousey = 0;

    const handleMouseMove = (event: MouseEvent) => {
      if (Math.abs(event.clientX - mousex) > 50 || Math.abs(event.clientY - mousey) > 50) {
        const elems = imgRefs.current;
        const nextIndex = (activeIndex + 1) % ghostImages.length;

        elems.forEach((img, i) => {
          if (!img) return;
          img.classList.remove("active");
          if (i === nextIndex) {
            img.style.top = `${event.clientY}px`;
            img.style.left = `${event.clientX}px`;
            img.classList.add("active");
          }
        });

        setTimeout(() => {
          setActiveIndex(nextIndex);
        }, 150);
        mousex = event.clientX;
        mousey = event.clientY;
      }
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, [activeIndex]);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden "
        style={{ fontFamily: "'FK', Arial, sans-serif", background: "#E0DCC7", minHeight: "100vh" }}
        ref={sectionRef}
      >
        <div
          className="w-full h-full fixed top-0 left-0 object-cover z-0 transition-all duration-200"
          style={{
            backgroundImage: `url(${notFound})`,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            pointerEvents: "none",
          }}
        />
        <div className="w-full h-full flex items-center justify-center flex-col z-10 relative">
          <h1 className="text-5xl font-bold text-center z-10 relative flex flex-col items-center">
            <span className="text-[120px] text-gray-200">Page</span>
            <span className="serif text-[100px] text-gray-400">not found</span>
          </h1>
          <Link to={"/"}>
            <button className="mt-8 py-3 px-6 bg-white bg-opacity-20 text-white text-xl hover:text-black text-md rounded-md shadow hover:bg-peach transition duration-200 z-10 relative">
              Go Back Home
            </button>
          </Link>
        </div>

        <section
          className="hero not-found__section"
          style={{ position: "fixed", width: "100dvw", height: "100dvh" }}
        >
          {ghostImages.map((src, index) => (
            <img
              key={index}
              className="mov__img"
              src={src}
              alt={`404-${index + 1}`}
              data-feat={index + 1}
              ref={(el) => {
                imgRefs.current[index] = el;
              }}
              loading="lazy"
            />
          ))}
        </section>
      </div>
    </>
  );
};

export default NotFound;
