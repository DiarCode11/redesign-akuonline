"use client";
import Image from "next/image";
import { useState } from "react";
import Modal from "@/components/modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const menus = [
  {
    name: "Kartu Keluarga",
    icon: "KKIcon.svg",
    color: "#F25555",
    size: 100
  },
  {
    name: "Kartu Tanda Penduduk",
    icon: "KTPIcon.svg",
    color: "#71C76C",
    size: 100
  },
  {
    name: "Layanan Akta",
    icon: "AktaIcon.svg",
    color: "#BC9061",
    size: 50
  },
  {
    name: "Layanan Surat Keterangan",
    icon: "Letter.svg",
    color: "#238BCB",
    size: 60
  },
  {
    name: "Kartu Identitas Anak",
    icon: "KIAIcon.svg",
    color: "#FF657E",
    size: 110
  },
]

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full w-full">
      {/* Modal KK */}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Judul Modal"
        width="w-[700px]" // Bisa disesuaikan
      >
        <p>Ini isi modalnya. Kamu bisa taruh apa saja di sini.</p>
      </Modal>

      {/* Modal KTP */}
      {/* Modal Surat */}
      {/* Modal KIA */}
      {/* Modal Akta */}

      <div className="md:flex pl-4 ">
        <h1 className="md:text-2xl text-base font-semibold">Selamat Datang,</h1>
        <h1 className="md:pl-3 font-semibold text-2xl text-sky-600">I Wayan Yoga Sastrawan</h1>
      </div>
      <p className="pl-4 pb-10 text-slate-400">Selalu jaga kerahasiaan NIK dan Password anda</p>
      <div className="h-full rounded-t-[50px] bg-white py-10 md:px-16 px-5">
        <h1 className="md:text-2xl text-lg font-semibold w-full text-center pb-10 text-black/45">Pilih Layanan Kependudukan</h1>
        <div className="grid sm:grid-cols-4 md:grid-cols-5 grid-cols-2 md:gap-x-10 gap-x-4 gap-y-10 relative">
          {menus.map((menu, index) => (
            <div onClick={() => setOpen(true)} key={index} className={`rounded-4xl shadow-lg select-none`} style={{ backgroundColor: menu.color }}>
              {index === 2 || index === 3 ? (
                <div className="flex flex-col justify-center items-center py-5 h-48 ">
                  <Image
                    src={menu.icon}
                    alt="login icon"
                    width={menu.size}
                    height={menu.size}
                  />
                  <p className="text-center font-semibold text-lg text-white pt-5 px-4 ">{menu.name}</p>
                </div>
              ): (
                <div className="flex flex-col justify-center items-center py-5 h-48">
                  <Image
                    src={menu.icon}
                    alt="login icon"
                    width={menu.size}
                    height={menu.size}
                  />
                  <p className="text-center font-semibold text-lg text-white px-4">{menu.name}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
