import ServicesComponent from "./service"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Home() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('auth_token')?.value

  if (!token) {
    redirect('/login') // Tidak sempat render Home sama sekali
  }

  return (
    <div className="h-full w-full">
      <div className="md:flex pl-4 ">
        <h1 className="md:text-2xl text-base font-semibold">Selamat Datang,</h1>
        <h1 className="md:pl-3 font-semibold text-2xl text-sky-600">I Wayan Yoga Sastrawan</h1>
      </div>
      <p className="pl-4 pb-10 text-slate-400">Selalu jaga kerahasiaan NIK dan Password anda</p>
      <div className="h-full w-full rounded-t-[50px] bg-white py-10 md:px-16 px-5">
        <ServicesComponent />
      </div>
    </div>
  )
}