import { useEffect, useRef, useState } from "react";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      // back at the hero: nothing is "current"
      if (window.scrollY <= 100) setActive("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Keep the active link in sync with the section the reader is actually on.
     The band ignores sections that are only clipping the top/bottom edge. */
  useEffect(() => {
    const sections = navLinks
      .map((nav) => {
        const anchor = document.getElementById(nav.id);
        const section = anchor?.closest("section") || anchor;
        return section ? { title: nav.title, section } : null;
      })
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const match = sections.find((s) => s.section === entry.target);
          if (match) setActive(match.title);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s.section));
    return () => observer.disconnect();
  }, []);

  /* Mobile menu: close on Escape and on a click outside the panel/button */
  useEffect(() => {
    if (!toggle) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setToggle(false);
        buttonRef.current?.focus();
      }
    };

    const onPointerDown = (e) => {
      if (
        menuRef.current?.contains(e.target) ||
        buttonRef.current?.contains(e.target)
      ) {
        return;
      }
      setToggle(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [toggle]);

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
            className="w-11 h-11 md:w-12 md:h-12 object-contain transition-transform duration-200 group-hover:scale-105"
          />

          <p className="text-white text-[19px] md:text-[21px] font-semibold tracking-wide cursor-pointer flex transition-opacity duration-200 group-hover:opacity-90">
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
            >
              <a
                href={`#${nav.id}`}
                aria-current={active === nav.title ? "true" : undefined}
              >
                {nav.title}
              </a>

              {/* Active underline indicator */}
              {active === nav.title && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-highlight rounded-full" />
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            ref={buttonRef}
            type="button"
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
            aria-controls="mobile-menu"
            onClick={() => setToggle((prev) => !prev)}
            className="p-1 rounded-md transition-transform duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
          >
            <img
              src={toggle ? close : menu}
              alt=""
              aria-hidden="true"
              className="w-[26px] h-[26px] object-contain"
            />
          </button>

          {/* Premium Mobile Menu (glass + slide) */}
          <div
            id="mobile-menu"
            ref={menuRef}
            aria-hidden={!toggle}
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
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.title);
                  }}
                >
                  <a
                    href={`#${nav.id}`}
                    // not reachable by keyboard while the panel is hidden
                    tabIndex={toggle ? 0 : -1}
                    aria-current={active === nav.title ? "true" : undefined}
                  >
                    {nav.title}
                  </a>
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
