import React, { useEffect, useState } from "react";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        ${styles.paddingX}
        w-full fixed top-0 z-20
        transition-all duration-300
        ${scrolled
          ? "bg-black/60 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
        }
      `}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto py-4">
        {/* Logo + Name */}
        <a
          href="#"
          className="flex items-center gap-2 group"
          onClick={(e) => {
            e.preventDefault();
            setActive("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="w-9 h-9 object-contain transition-transform duration-200 group-hover:scale-105"
          />

          <p className="text-white text-[17px] font-semibold cursor-pointer flex transition-opacity duration-200 group-hover:opacity-90">
            {/* Reduced from 18px → 17px */}
            Abhilash&nbsp;
            <span className="sm:block hidden text-white/70">
              | Portfolio
            </span>
          </p>
        </a>

        {/* Desktop Menu */}
        <ul className="list-none hidden sm:flex flex-row gap-8">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              onClick={() => setActive(nav.title)}
              className={`
                relative cursor-pointer
                text-[15px] font-medium
                transition-all duration-200
                ${active === nav.title
                  ? "text-white"
                  : "text-white/60 hover:text-white"
                }
                hover:-translate-y-[1px]
              `}
            // 15px font for premium UI
            >
              <a href={`#${nav.id}`}>{nav.title}</a>

              {/* Active underline indicator */}
              {active === nav.title && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#915EFF] rounded-full" />
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[26px] h-[26px] object-contain cursor-pointer transition-transform duration-200 active:scale-95"
            onClick={() => setToggle(!toggle)}
          />

          {/* Premium Mobile Menu (glass + slide) */}
          <div
            className={`
              fixed top-20 left-4 right-4 z-50
              rounded-2xl p-6
              bg-black/80 backdrop-blur-md
              border border-white/10
              transition-all duration-300
              ${toggle
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
              }
            `}
          >
            <ul className="list-none flex flex-col gap-5">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`
                    text-[17px] font-medium
                    transition-colors duration-200
                    ${active === nav.title
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                    }
                  `}
                  // Slightly larger on mobile for tap comfort
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
