"use client"
import ServicesComponent from "./service"
import { useAuth } from "@/context/authContext";

export default function Home() {
  const auth = useAuth();

  return (
    <div className="h-full w-full">
      <div className="md:flex pl-4 ">
        <h1 className="md:text-2xl text-base font-semibold">Selamat Datang,</h1>
        <h1 className="md:pl-3 font-semibold text-2xl text-sky-600">{auth?.name}</h1>
      </div>
      <p className="pl-4 pb-10 text-slate-400">Selalu jaga kerahasiaan NIK dan Password anda</p>
      <div className="h-full w-full rounded-t-[50px] bg-white py-10 md:px-16 px-5">
        <ServicesComponent />
      </div>
    </div>
  )
}