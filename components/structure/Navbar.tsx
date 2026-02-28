"use client";

import { useState } from "react";
import { ArrowDropDownIcon } from "@/app/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* eslint-disable @next/next/no-img-element */

const navLinks = [
  { url: "/", title: "Home" },
  { url: "/track-move", title: "Track Move" },
  { url: "/how-it-works", title: "How it Works" },
  { url: "/about", title: "About" },
  { url: "/blog", title: "Blog" },
  { url: "/contact", title: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  console.log(pathname);

  return (
    <>
      <nav className="flex items-center relative z-40">
        {/* Logo */}
        <div className="flex items-center gap-x-2 lg:gap-x-4">
         <Link href={"/"}>
          <img src="/logo.svg" className="lg:h-11 w-8 h-8 lg:w-11" alt="Logo" />
         </Link>
          <p className="uppercase text-xl lg:text-4xl text-dark font-bold">
            Zinter
          </p>
        </div>

        {/* Desktop Nav */}
        <div className="mx-auto border-b-2 border-[#D3E6FA] hidden xl:flex gap-x-5 justify-center">
          {navLinks.map((link) => {
            const matchedLink = navLinks.find((l) => l.url === pathname);

            const isActive = matchedLink
              ? pathname === link.url
              : link.url === "/";

            return (
              <Link
                href={link.url}
                key={link.title}
                className={`pb-1.5 px-2 ${
                  isActive
                    ? "text-theme font-medium -mb-px border-b-2 border-theme"
                    : "text-grey"
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </div>

        {/* Desktop Right */}
        <div className="hidden xl:flex items-center gap-x-8">
          <div className="flex rounded-[80px] gap-x-2 items-center p-2 border border-dark/10">
            <div className="h-8.5 w-8.5 border relative border-dark-shade rounded-full">
              <img
                src="/flag.png"
                className="absolute top-0 left-0 w-full h-full rounded-full"
                alt="Flag"
              />
            </div>
            <p className="text-lg text-dark">NL</p>
            <ArrowDropDownIcon />
          </div>

          <button className="bg-theme text-sm lg:text-xl font-medium rounded-lg lg:rounded-2xl py-2.5 lg:py-5 px-6 lg:px-10 text-white">
            Partner
          </button>
        </div>

        {/* Floating Mobile Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="xl:hidden bg-white h-10 w-10 rounded-full fixed lg:static ml-auto top-4 right-4 z-50 text-dark border border-grey/10 shadow-xl flex items-center justify-center"
        >
          <i className="bi bi-list text-lg"></i>
        </button>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6">
          <p className="text-xl font-bold">Menu</p>
          <button onClick={() => setIsOpen(false)}>
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>

        <div className="flex flex-col p-6 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.url}
              onClick={() => setIsOpen(false)}
              className={`
                font-medium text-sm
                ${pathname == link.url ? "text-theme" : "text-grey"}
                `}
            >
              {link.title}
            </Link>
          ))}

          <button className="mt-6 bg-theme text-white py-3 rounded-xl">
            Partner
          </button>
        </div>
      </div>
    </>
  );
}
