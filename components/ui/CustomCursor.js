"use client";

import { useEffect, useState, useRef } from "react";
import { GiSpiderAlt } from "react-icons/gi";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [webs, setWebs] = useState([]);
  const nextId = useRef(0);

  useEffect(() => {
    const canHover = window.matchMedia("(pointer: fine)").matches;
    if (!canHover) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    function handleMove(e) {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target.closest("a, button, input, textarea");
      setIsPointer(Boolean(target));
    }

    function handleClick(e) {
      const id = nextId.current++;
      setWebs((current) => [...current, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setWebs((current) => current.filter((w) => w.id !== id));
      }, 600);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {webs.map((web) => (
        <svg
          key={web.id}
          viewBox="0 0 60 60"
          className="animate-web-burst fixed pointer-events-none z-[200] text-cyan"
          style={{ left: web.x - 30, top: web.y - 30, width: 60, height: 60 }}
        >
          <g stroke="currentColor" strokeWidth="1.5" fill="none">
            <line x1="30" y1="30" x2="30" y2="4" />
            <line x1="30" y1="30" x2="30" y2="56" />
            <line x1="30" y1="30" x2="4" y2="30" />
            <line x1="30" y1="30" x2="56" y2="30" />
            <line x1="30" y1="30" x2="10" y2="10" />
            <line x1="30" y1="30" x2="50" y2="50" />
            <line x1="30" y1="30" x2="10" y2="50" />
            <line x1="30" y1="30" x2="50" y2="10" />
            <circle cx="30" cy="30" r="10" />
            <circle cx="30" cy="30" r="20" />
          </g>
        </svg>
      ))}

      <div
        className="fixed pointer-events-none z-[200] transition-transform duration-150"
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
        }}
      >
        <GiSpiderAlt className={isPointer ? "text-pink" : "text-cyan"} size={22} />
      </div>
    </>
  );
}