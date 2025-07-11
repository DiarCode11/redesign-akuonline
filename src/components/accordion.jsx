"use client";
import { ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function Accordion({ children, title, number, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    if (isOpen) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [isOpen]);

  return (
    <section className="bg-white w-full rounded-2xl overflow-hidden shadow-sm border-2 border-gray-200">
      <div
        onClick={() => onToggle(!isOpen)}
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center">
          <div className="w-7 h-7 mr-4 primary-color flex justify-center items-center text-white rounded-full text-sm font-medium">
            {number}
          </div>
          <h1 className="font-medium text-gray-800">{title}</h1>
        </div>
        <ChevronDown
          className={`transform transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          size={20}
        />
      </div>

      <div
        ref={contentRef}
        style={{ maxHeight }}
        className="transition-all duration-300 ease-in-out overflow-hidden"
      >
        <div className="p-8 pt-0 border-t border-gray-100">{children}</div>
      </div>
    </section>
  );
}
