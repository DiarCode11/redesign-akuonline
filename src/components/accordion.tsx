"use client";
import { ChevronDown } from "lucide-react";
import React, { useRef, useState, useEffect, useCallback } from "react";

type AccordionProps = {
  children: React.ReactNode,
  title: string,
  number: number,
  active: boolean,
  isOpen: boolean,
  bulletColor?: string,
  onToggle: (value: boolean) => void
  setOverflow?: boolean
}

export default function Accordion({ children, title, number, active, isOpen, onToggle, bulletColor = 'primary-color', setOverflow = true }: AccordionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  // Callback untuk mengupdate tinggi
  const updateHeight = useCallback(() => {
    if (contentRef.current) {
      if (isOpen && active) {
        setMaxHeight(`${contentRef.current.scrollHeight}px`);
      } else {
        setMaxHeight("0px");
      }
    }
  }, [isOpen, active]);

  // Effect untuk mengupdate tinggi ketika isOpen atau active berubah
  useEffect(() => {
    updateHeight();
  }, [updateHeight]);

  // Effect untuk mengupdate tinggi ketika children berubah
  useEffect(() => {
    if (isOpen && active && contentRef.current) {
      // Gunakan ResizeObserver untuk mendeteksi perubahan ukuran konten
      const resizeObserver = new ResizeObserver(() => {
        updateHeight();
      });

      resizeObserver.observe(contentRef.current);

      // Cleanup observer saat komponen unmount
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [isOpen, active, children, updateHeight]);

  // Effect tambahan untuk menangani perubahan children secara langsung
  useEffect(() => {
    if (isOpen && active) {
      // Delay sedikit untuk memastikan DOM sudah terupdate
      const timer = setTimeout(() => {
        updateHeight();
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [children, isOpen, active, updateHeight]);

  return (
    <section className={`bg-white w-full h-max rounded-2xl ${setOverflow && 'overflow-hidden'} shadow-sm border-2 border-gray-200`}>
      <div
        onClick={() => onToggle(!isOpen)}     
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 hover:rounded-2xl transition-colors duration-200"
      >
        <div className="flex items-center">
          <div className={`w-7 h-7 mr-4 flex justify-center items-center text-white rounded-full text-sm font-medium ${active ? bulletColor : 'bg-gray-300'}`}>
            {number}
          </div>
          <h1 className={`font-medium select-none ${active ? 'text-gray-800' : 'text-gray-400'}`}>{title}</h1>
        </div>
        <ChevronDown
          className={`transform transition-transform duration-300 ease-in-out ${
            isOpen && active ?  "rotate-0" : "rotate-180"
          } ${active ? '': 'text-gray-400'}`}
          size={20}
        />
      </div>
      <div
        ref={contentRef}
        style={{ maxHeight }}
        className="transition-all duration-300 ease-in-out overfl"
        // overflow-hidden
      >
        <div className="p-8 pt-0 border-t border-gray-100">{children}</div>
      </div>
    </section>
  );
}