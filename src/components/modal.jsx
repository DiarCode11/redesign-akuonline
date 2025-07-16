"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Modal({ isOpen, onClose, title, children, width = "w-[600px]", height = "max-h-[90vh]" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Effect untuk mengatur transisi
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Delay sedikit untuk memastikan element sudah di-render sebelum animasi
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
      // Delay untuk menunggu animasi selesai sebelum unmount
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // 300ms sesuai dengan durasi transisi
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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

  const handleClose = () => {
    setIsVisible(false);
    // Delay untuk menunggu animasi selesai sebelum memanggil onClose
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!shouldRender) return null;

  // Handle click pada backdrop untuk menutup modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center  transition-all duration-300 ease-out ${
        isVisible 
          ? 'bg-black/40 opacity-100' 
          : 'bg-black/0 opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white mx-3 rounded-2xl shadow-xl max-w-full min-h-[300px] ${height} overflow-hidden flex flex-col transition-all duration-300 ease-out transform ${width} ${
          isVisible
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 flex-shrink-0">
          <h2 className="sm:text-lg font-semibold ">{title}</h2>
          <button
            onClick={handleClose}
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

// Contoh penggunaan Modal dengan berbagai jenis transisi
function ModalExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Modal Transitions Example</h1>
      
      {/* Konten untuk testing scroll */}
      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="p-4 bg-gray-100 rounded">
            Ini adalah paragraf ke-{i + 1}. Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>

      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
        >
          Modal Fade + Scale
        </button>
        
        <button
          onClick={() => setIsModal2Open(true)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors shadow-lg"
        >
          Modal Slide Up
        </button>
        
        <button
          onClick={() => setIsModal3Open(true)}
          className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors shadow-lg"
        >
          Modal Bounce
        </button>
      </div>

      {/* Modal dengan Fade + Scale (default) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Fade + Scale Transition"
        width="w-[500px]"
      >
        <div className="space-y-4">
          <p>Modal ini menggunakan transisi fade in/out dengan scale effect.</p>
          <p>Efek: Muncul dari kecil ke besar, menghilang dari besar ke kecil.</p>
          
          <div className="flex gap-2 pt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal dengan Slide Up */}
      <SlideUpModal
        isOpen={isModal2Open}
        onClose={() => setIsModal2Open(false)}
        title="Slide Up Transition"
        width="w-[500px]"
      >
        <div className="space-y-4">
          <p>Modal ini menggunakan transisi slide up dari bawah.</p>
          <p>Efek: Muncul dari bawah ke atas, menghilang dari atas ke bawah.</p>
          
          <div className="flex gap-2 pt-4">
            <button
              onClick={() => setIsModal2Open(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </SlideUpModal>

      {/* Modal dengan Bounce */}
      <BounceModal
        isOpen={isModal3Open}
        onClose={() => setIsModal3Open(false)}
        title="Bounce Transition"
        width="w-[500px]"
      >
        <div className="space-y-4">
          <p>Modal ini menggunakan transisi bounce yang playful.</p>
          <p>Efek: Muncul dengan efek bounce, menghilang dengan scale down.</p>
          
          <div className="flex gap-2 pt-4">
            <button
              onClick={() => setIsModal3Open(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </BounceModal>
    </div>
  );
}

// Modal dengan Slide Up Transition
function SlideUpModal({ isOpen, onClose, title, children, width = "w-[600px]" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-end justify-center backdrop-blur-sm transition-all duration-300 ease-out ${
        isVisible 
          ? 'bg-black/40 opacity-100' 
          : 'bg-black/0 opacity-0'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className={`bg-white rounded-t-lg shadow-xl max-w-full max-h-[90vh] overflow-hidden flex flex-col transition-all duration-300 ease-out transform ${width} ${
          isVisible
            ? 'translate-y-0'
            : 'translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

// Modal dengan Bounce Transition
function BounceModal({ isOpen, onClose, title, children, width = "w-[600px]" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ease-out ${
        isVisible 
          ? 'bg-black/40 opacity-100' 
          : 'bg-black/0 opacity-0'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className={`bg-white rounded-lg shadow-xl max-w-full max-h-[90vh] overflow-hidden flex flex-col ${width} ${
          isVisible
            ? 'animate-bounce-in'
            : 'animate-scale-out'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isVisible 
            ? 'bounce-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)' 
            : 'scale-out 0.4s ease-in-out'
        }}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

// Custom CSS untuk bounce animation (dalam komponen React, kita simulate dengan inline styles)
const bounceKeyframes = `
  @keyframes bounce-in {
    0% { transform: scale(0.3); opacity: 0; }
    50% { transform: scale(1.05); }
    70% { transform: scale(0.9); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes scale-out {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(0.8); opacity: 0; }
  }
`;