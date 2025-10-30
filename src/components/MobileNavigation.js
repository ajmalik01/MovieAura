import React from "react";
import { NavLink } from "react-router-dom";
import { mobileNavigation } from "../contants/navigation";
import clsx from "clsx";

const MobileNavigation = () => {
  return (
    <nav
      className="lg:hidden fixed bottom-0 w-full h-16 bg-black/60 backdrop-blur-md z-40"
      role="navigation"
      aria-label="Mobile Navigation"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="flex justify-around items-center h-full text-neutral-400">
        {mobileNavigation.map(({ label, href, icon }, index) => (
          <NavLink
            key={`${label}-mobile-nav-${index}`}
            to={href}
            className={({ isActive }) =>
              clsx(
                "flex flex-col items-center justify-center text-sm gap-1 h-full transition-all duration-300",
                "hover:text-white hover:scale-105 px-3",
                isActive &&
                  "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              )
            }>
            <div className="text-2xl">{icon}</div>
            <p>{label}</p>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;
