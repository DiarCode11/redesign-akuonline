"use client"
import Image from "next/image"
import { Bell, X } from "lucide-react"
import React, { useEffect, useState, useRef } from "react"
import { AlarmClock } from "lucide-react"
import Link from "next/link"
import dayjs from "dayjs"
import "dayjs/locale/id"
import relativeTime from "dayjs/plugin/relativeTime"
import { useLogout } from "@/lib/hooks/useLogout"
import { useAuth } from "@/context/authContext"
import { GetDataHelper } from "@/helper/getDataHelper"
import { SubmissionHistoryType } from "@/helper/createSubmissionHistory"
import { ServiceProps } from "@/lib/save-to-local-storage"

dayjs.extend(relativeTime)
dayjs.locale('id');

export default function Navbar() {
    const user = useAuth()
    const [notifCounted, setNotifCounted] = useState< number | null >(null);
    const [showNotif, setShowNotif] = useState<boolean>(false);
    const [showLogout, setShowLogout] = useState<boolean>(false);
    const [serviceList, setServiceList] = useState<any[]>([]);
    const [SubmissionHistory, setSubmissionHistory] = useState<ServiceProps[] | []>([]);
    const serviceDropdownRef = useRef(null);
    const { logout, isLoading, error } = useLogout();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/pengajuan?userId=${user.id}`);
                console.log("Cek isi ", response)
                const result = await response.json();
                console.log("Response riwayat pengajuan: ", result);
                if (response.ok) {
                    const jsonList = result.data as ServiceProps[];
                    setSubmissionHistory(
                        jsonList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    );
                    console.log(jsonList);
                } else {
                    console.log(result);
                }
            } catch (e) {
                console.log(e);
            }
        }
        
        fetchData();
    }, []);


    return (
        <nav className="bg-white h-20 shadow-lg flex justify-between items-center px-4 fixed top-0 left-0 z-50 w-full">
            <div className="font-bold text-xl flex items-center">
                <Image
                src={"/IconNavbar.svg"}
                alt="Logo"
                width={40}
                height={40}
                />
                <h1 className="pl-2">
                Aku Online-NG
                </h1>
            </div>
            <div className="flex space-x-4 relative">
                <span className="relative">
                    <div onClick={() => setShowNotif(!showNotif)} className="cursor-pointer">
                        <Bell size={35} className="text-neutral-500" />
                        { SubmissionHistory.length > 0 && (
                            <div className="h-5 w-5 rounded-full bg-red-600 top-0 text-center  flex justify-center items-center absolute text-white text-[11px]">
                                <span>{ SubmissionHistory.length }</span>
                            </div>
                        )}
                    </div>

                    {/* Modal Notifikasi */}
                    { showNotif && (
                        <div ref={serviceDropdownRef} className="bg-white h-[400px] absolute w-[300px] sm:w-[400px] translate-x-14 rounded-t-xl right-0 top-16">
                            <div className="flex justify-between  border border-slate-300 rounded-t-xl p-4">
                                <h1 className="text-lg">Riwayat Pengajuan</h1>
                                <X onClick={() => setShowNotif(false)} />
                            </div>
                            <div className={`w-full h-full bg-white flex flex-col overflow-y-scroll rounded-b-xl border border-slate-300 overflow-hidden shadow-lg ${!serviceList && "justify-center items-center"}`}>
                                { SubmissionHistory.length > 0 ? SubmissionHistory.map((data : ServiceProps, idx) => (
                                    <div key={idx} className="py-2 h-max px-3 w-full border-b-2 border-gray-200 relative">
                                        <h3 className="pb-2 font-semibold flex justify-between">
                                            <span>{data.serviceName}</span>
                                        </h3>
                                        <p>{data.description}</p>
                                        <Link href={`/detail-pengajuan/${data.id}`}>
                                            <p className="text-sm pb-4 underline text-blue-600 cursor-pointer">Lihat detail..</p>
                                        </Link>
                                        <div>
                                            <span className="text-sm text-gray-600/70 flex space-x-2">
                                                <div><AlarmClock size={20} /></div>
                                                <div className="text-sm">{ dayjs(data.createdAt).fromNow() }</div>
                                            </span>
                                        </div>
                                        <span className="bg-yellow-500 text-white px-2 text-sm font-medium rounded absolute bottom-2 right-5">Diproses</span>
                                    </div>
                                )) : (
                                    <div className="flex w-full justify-center h-full items-center">Tidak ada riwayat pengajuan</div>
                                )}
                            </div>
                        </div>
                    )}

                    { showLogout && (
                        <div className="bg-white absolute w-[150px] sm:w-[200px] translate-x-14 rounded-xl right-0 top-16 p-3 border border-slate-200">
                            <h1 className="pb-3">{user?.name}</h1>
                            <button 
                                onClick={() => logout()}
                                disabled={isLoading}
                                className="bg-red-500 text-white w-full py-1 rounded-md hover:bg-red-600 disabled:opacity-50"
                            >
                                {isLoading ? 'Logging out...' : 'Logout'}
                            </button>
                            {error && (
                                <p className="text-red-500 text-sm mt-2">{error}</p>
                            )}
                        </div>
                    )}
                </span>
                <Image
                    src={"/ProfileIcon.svg"}
                    alt="Profile Icon"
                    width={35}
                    height={35}
                    onClick={() => setShowLogout(!showLogout)}
                />
            </div>
        </nav>
    )
}