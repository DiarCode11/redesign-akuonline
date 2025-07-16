"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "@/components/modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menus = [
  {
    name: "Kartu Keluarga",
    icon: "KKIcon.svg",
    color: "#F25555",
    size: 100,
    id: "KK"
  },
  {
    name: "Kartu Tanda Penduduk",
    icon: "KTPIcon.svg",
    color: "#71C76C",
    size: 100,
    id: "KTP"
  },
  {
    name: "Layanan Akta",
    icon: "AktaIcon.svg",
    color: "#BC9061",
    size: 50,
    id: "akta"
  },
  {
    name: "Layanan Surat Keterangan",
    icon: "Letter.svg",
    color: "#238BCB",
    size: 60,
    id: "surat"
  },
  {
    name: "Kartu Identitas Anak",
    icon: "KIAIcon.svg",
    color: "#FF657E",
    size: 110,
    id: "KIA"
  },
]

const KK_menus = [
  {
    name: "Buat KK baru",
    icon: "newKK.svg",
    color: "#F25555",
    size: 50,
    link: "/kk/buat-kk-baru"
  },
  {
    name: "Perubahan data",
    icon: "editKK.svg",
    color: "#F25555",
    size: 40,
    link: "/kk/edit-kk"
  },
  {
    name: "KK Hilang",
    icon: "missingKK.svg",
    color: "#F25555",
    size: 50,
    link: "/kk/kk-hilang"
  },
  {
    name: "KK Rusak",
    icon: "defectiveKK.svg",
    color: "#F25555",
    size: 50,
    link: "/kk/kk-rusak"
  },
]

const KTP_menus = [
  {
    name: "Buat KTP baru",
    icon: "addKTP.svg",
    color: "#71C76C",
    size: 50
  },
  {
    name: "Perubahan data",
    icon: "editKTP.svg",
    color: "#71C76C",
    size: 50
  },
  {
    name: "KTP hilang",
    icon: "findingKTP.svg",
    color: "#71C76C",
    size: 50
  },
  {
    name: "KTP Rusak",
    icon: "defectiveKTP.svg",
    color: "#71C76C",
    size: 50
  },
]

const akta_menus = [
  {
    name: "Akta Kelahiran",
    icon: "aktaKelahiran.svg",
    color: "#BC9061",
    size: 50
  },
  {
    name: "Akta Kematian",
    icon: "aktaKematian.svg",
    color: "#BC9061",
    size: 50
  },
  {
    name: "Akta Perkawinan",
    icon: "aktaPerkawinan.svg",
    color: "#BC9061",
    size: 60
  },
  {
    name: "Akta Perceraian",
    icon: "aktaPerceraian.svg",
    color: "#BC9061",
    size: 60
  },
  {
    name: "Pengakuan Anak",
    icon: "pengakuanAnak.svg",
    color: "#BC9061",
    size: 35
  },
  {
    name: "Pengesahan Anak",
    icon: "pengesahanAnak.svg",
    color: "#BC9061",
    size: 50
  },
  {
    name: "Pengangkatan Anak",
    icon: "pengangkatanAnak.svg",
    color: "#BC9061",
    size: 60
  },
  {
    name: "Pembetulan Akta",
    icon: "pembetulanAkta.svg",
    color: "#BC9061",
    size: 50
  },
  {
    name: "Perubahan Nama",
    icon: "perubahanNama.svg",
    color: "#BC9061",
    size: 60
  },
  {
    name: "Perubahan Kewarganegaraan",
    icon: "perubahanKewarganegaraan.svg",
    color: "#BC9061",
    size: 50
  },
  {
    name: "Pembatalan Akta",
    icon: "pembatalanAkta.svg",
    color: "#BC9061",
    size: 50
  },
  {
    name: "Akta Hilang",
    icon: "aktaHilang.svg",
    color: "#BC9061",
    size: 55
  },
]

export default function ServicesComponent() {
  const [openedModal, setOpenModal] = useState(null);

  return (
    <div className="h-full w-full">
      {/* Modal KK */}
      <Modal
        isOpen={openedModal === "KK"}
        onClose={() => setOpenModal(null)}
        title="Kartu Keluarga"
        width="w-[700px]" // Bisa disesuaikan
      >
        <div className="grid sm:grid-cols-4 grid-cols-2 gap-x-10 gap-y-7 px-10 py-6">
          {KK_menus.map((menu, index) => (
            <Link href={menu.link} key={index}>
              <div className="flex justify-center items-center h-[110px] border-3 rounded-2xl" style={{ borderColor: menu.color }}>
                <Image
                  src={menu.icon}
                  alt={menu.name}
                  width={menu.size}
                  height={menu.size}
                />
              </div>
              <p className="text-center pt-2 font-semibold">{menu.name}</p>
            </Link>
          ))}
        </div>
      </Modal>

      {/* Modal KTP */}
      <Modal
        isOpen={openedModal === "KTP"}
        onClose={() => setOpenModal(null)}
        title="Kartu Keluarga"
        width="w-[700px]" // Bisa disesuaikan
      >
        <div className="grid grid-cols-4 gap-x-10 gap-y-16 px-10 py-6">
          {KTP_menus.map((menu, index) => (
            <div key={index}>
              <div className="flex justify-center items-center h-[110px] border-3 rounded-2xl" style={{ borderColor: menu.color }}>
                <Image
                  src={menu.icon}
                  alt={menu.name}
                  width={menu.size}
                  height={menu.size}
                />
              </div>
              <p className="text-center pt-2 font-semibold">{menu.name}</p>
            </div>
          ))}
        </div>
      </Modal>

      {/* Modal Akta */}
      <Modal
        isOpen={openedModal === "akta"}
        onClose={() => setOpenModal(null)}
        title="Layanan Akta"
        width="w-[700px]" // Bisa disesuaikan
      >
        <div className="grid grid-cols-4 gap-x-10 gap-y-16 px-10 py-6">
          {akta_menus.map((menu, index) => (
            <div key={index} className="cursor-pointer">
              <div className="flex justify-center items-center h-[110px] border-3 rounded-2xl" style={{ borderColor: menu.color }}>
                <Image
                  src={menu.icon}
                  alt={menu.name}
                  width={menu.size}
                  height={menu.size}
                />
              </div>
              <p className="text-center pt-2 font-semibold">{menu.name}</p>
            </div>
          ))}
        </div>
      </Modal>

      <div className="h-full rounded-t-[50px] bg-white py-10 md:px-16 px-5">
        <h1 className="md:text-2xl text-lg font-semibold w-full text-center pb-10 text-black/45">Pilih Layanan Kependudukan</h1>
        <div className="grid sm:grid-cols-4 md:grid-cols-5 grid-cols-2 md:gap-x-10 gap-x-4 gap-y-10 relative">
          {menus.map((menu, index) => (
            <div onClick={() => setOpenModal(menu.id)} key={index} className={`rounded-4xl shadow-lg select-none hover:cursor-pointer hover:-translate-y-3 hover:scale-105 duration-300 transform transition-all`} style={{ backgroundColor: menu.color }}>
              {index === 2 || index === 3 ? (
                <div className="flex flex-col hover: justify-center items-center py-5 h-48 ">
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
