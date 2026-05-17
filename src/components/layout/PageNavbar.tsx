// src/components/layout/PageNavbar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/layout/BrandLogo";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function PageNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <motion.nav
        className="page-nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "var(--nav-h, 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          background: scrolled ? "rgba(8, 8, 8, 0.85)" : "rgba(8, 8, 8, 0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "0.5px solid rgba(200, 169, 110, 0.15)"
            : "0.5px solid rgba(255, 255, 255, 0.07)",
          transition: "background 0.4s ease, border-bottom 0.4s ease",
        }}
      >
        <BrandLogo />

        <ul
          className="page-nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                style={{
                  fontSize: "0.875rem",
                  color:
                    pathname === item.href
                      ? "var(--white, #f5f3ef)"
                      : "var(--muted, rgba(245, 243, 239, 0.45))",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  position: "relative",
                  transition: "color 0.2s",
                }}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    style={{
                      position: "absolute",
                      bottom: "-6px",
                      left: 0,
                      right: 0,
                      height: "1px",
                      background: "var(--accent, #c8a96e)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="nav-cta"
          style={{
            fontSize: "0.8rem",
            fontWeight: 500,
            padding: "9px 22px",
            borderRadius: "100px",
            background: "var(--white, #f5f3ef)",
            color: "var(--black, #080808)",
            textDecoration: "none",
            letterSpacing: "0.02em",
            transition: "opacity 0.2s, box-shadow 0.2s",
          }}
        >
          Book a call
        </Link>

        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "10px",
            zIndex: 1001,
          }}
        >
          <div className={`hamburger ${mobileMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="mobile-menu-inner">
              <ul className="mobile-nav-links">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      style={{
                        color:
                          pathname === item.href
                            ? "var(--accent, #c8a96e)"
                            : "var(--white, #f5f3ef)",
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mobile-menu-footer">
                <Link
                  href="/contact"
                  className="btn-primary"
                  onClick={closeMenu}
                >
                  Book a free call
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}