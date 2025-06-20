"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children, width = "w-[600px]" }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Effect untuk mencegah scroll pada body ketika modal terbuka
  useEffect(() => {
    if (isOpen) {
      // Simpan scroll position saat ini
      const scrollY = window.scrollY;
      
      // Prevent scrolling pada body
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      
      return () => {
        // Restore scroll behavior ketika modal ditutup
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle click pada backdrop untuk menutup modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-lg shadow-xl transform transition-all duration-300 scale-100 opacity-100 ${width} max-w-full max-h-[90vh] overflow-hidden flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body - dengan scroll internal jika konten terlalu panjang */}
        <div className="p-4 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

// Contoh penggunaan Modal
function ModalExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Modal Example</h1>
      
      {/* Konten untuk testing scroll */}
      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="p-4 bg-gray-100 rounded">
            Ini adalah paragraf ke-{i + 1}. Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
      >
        Buka Modal
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Contoh Modal"
        width="w-[500px]"
      >
        <div className="space-y-4">
          <p>Ini adalah konten modal. Background seharusnya tidak bisa di-scroll.</p>
          
          {/* Konten panjang untuk testing scroll dalam modal */}
          {Array.from({ length: 15 }, (_, i) => (
            <p key={i} className="text-gray-700">
              Konten modal ke-{i + 1}. Modal ini memiliki scroll internal jika konten 
              terlalu panjang, tetapi background tetap tidak bisa di-scroll.
            </p>
          ))}
          
          <div className="flex gap-2 pt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Tutup
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Aksi Lain
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}