"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navConfig = [
  {
    name: "Home",
    href: "/home",
  },
  {
    name: "Create Prompt",
    href: "/create",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(true);

  function handleClick() {
    setOpen((open) => !open);
    console.log(open);
  }

  const drawer = open ? "translate-x-0" : "translate-x-full";

  const bgVar = open
    ? "bg-[url('../public/menu.svg')]"
    : "bg-[url('../public/close.svg')]";

  return (
    <header className="content-baseline flex justify-between pb-0 pl-8 pr-0 pt-8">
      <div className="overflow-x-hidden">
        <Image src="logo.svg" alt="Logo" width={48} height={48} priority />
      </div>

      <button
        aria-expanded="false"
        onClick={handleClick}
        className={cn(
          "absolute right-8 top-12 z-[9999] aspect-square w-8 border-0 bg-transparent bg-no-repeat  md:hidden",
          bgVar
        )}
      ></button>

      <nav className="">
        <ul
          data-visible="false"
          className={cn(
            "md:content-baseline bg-trans-pale fixed inset-y-0 left-1/3 right-0 z-[1000] m-0 flex flex-col gap-8 px-8 pt-28 backdrop-blur-md transition-transform md:static md:translate-x-0 md:flex-row md:py-2 md:pl-4 md:pr-20 md:backdrop-blur-none",
            drawer
          )}
        >
          {navConfig.map((item) => (
            <li className="py-2" key={item.name}>
              <a className="no-underline" href={item.href}>
                {item.name}
              </a>
            </li>
          ))}

          <button className="rounded-md bg-stone-400  px-2 py-2 font-semibold ">
            {"Sign out"}
          </button>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
