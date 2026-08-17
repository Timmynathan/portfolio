"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/data/nav-links";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav id="navbar" className={navScrolled ? "scrolled" : ""}>
        <div className="container">
          <div className="nav-container">
            <div className="logo"></div>

            <button
              className={`mobile-menu-toggle ${menuOpen ? "active" : ""}`}
              aria-label="Toggle mobile menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>

            <ul className={`nav-links ${menuOpen ? "active" : ""}`} id="navLinks">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} onClick={() => setMenuOpen(false)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
