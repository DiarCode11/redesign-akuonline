"use client";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { GetDataHelper } from "@/helper/getDataHelper";
import { ServiceProps } from "@/lib/save-to-local-storage";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

type Props = {
    params : Promise<{ id: string }>;
}

export default function DetailPengajuan() {
    const [data, setData] = useState<ServiceProps | null>(null);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
    const [activeStage, setActiveStage] = useState<number>(1)
    const params = useParams();
    const router = useRouter();
    const id = params?.id

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetDataHelper(`/api/pengajuan/${id}`);
                if (response.ok) {
                    console.log("Isi datanya: ", response.data.data.id);
                    setData(response.data.data as ServiceProps);
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, [])

    async function cancelPengajuan(){
        try {
            const response = await fetch(`/api/pengajuan/${id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                router.push("/")
            } else {
                console.log(response)
            }
        } catch (e) {
            console.log(e)
        }
    } 

    useEffect(() => {
        if (activeStage <= 3) {
            const interval = setInterval(() => {
                setActiveStage(activeStage + 1)
            }, 3000)

            return () => {
                console.log('Membersihkan interval...');
                clearInterval(interval);
            };
        }
    }, [activeStage])

    return (
        <>
            <div className="flex space-x-6 items-center pb-10">
                <Link href={"/"}>
                    <ArrowLeft />
                </Link>
                <h1 className="font-semibold text-xl">Detail Pengajuan</h1>
            </div>

            <Modal isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} title="Batalkan Pengajuan" width="w-[400px]">
                <>
                    <span>Apakah anda yakin ingin membatalkan pengajuan ini?</span>
                    <div className="grid grid-cols-2 gap-5 mt-5 ">
                        <Button variant="default" size="default" onClick={() => setIsModalDeleteOpen(false)} className={"bg-gray-300 w-full text-black"}>
                            Batal
                        </Button>
                        <Button variant="default" size="default" onClick={cancelPengajuan} className={"bg-red-600 w-full text-white"}>
                            Yakin
                        </Button>
                    </div>
                </>
            </Modal>

            <div className="w-full bg-white rounded-2xl p-5 mb-5 shadow-md">
                <h1 className="font-semibold">Status Pengajuan</h1>
                <div className="flex justify-between mt-3 relative">
                    <span className={`${ activeStage >= 2 ? "primary-color" : "bg-gray-200" } h-1 w-1/2 ml-5 absolute x-5 translate-y-4`}></span>
                    <span className={`${ activeStage >= 3 ? "primary-color" : "bg-gray-200" } h-1 w-1/2 right-5 absolute x-5 translate-y-4`}></span>
                    <div className="z-10">
                        <div className={`${ activeStage >= 1 ? "primary-color" : "bg-gray-200" } w-10 h-10 mx-auto rounded-full p-color flex justify-center items-center font-bold text-white`}>
                            1
                        </div>
                        <span>Diterima</span>
                    </div>
                    <div className="z-10">
                        <div className={`${ activeStage >= 2 ? "primary-color" : "bg-gray-200" } w-10 h-10 mx-auto rounded-full flex justify-center items-center font-bold text-white`}>
                            2
                        </div>
                        <span>Diproses</span>
                    </div>
                    <div className="z-10">
                        <div className={`${ activeStage >= 3 ? "primary-color" : "bg-gray-200" } w-10 h-10 mx-auto rounded-full flex justify-center items-center font-bold text-white`}>
                            3
                        </div>
                        <span>Selesai</span>
                    </div>
                </div>
            </div>

            <div className="w-full bg-white rounded-2xl p-5 shadow-md">
                <table>
                   <tbody>
                    <tr>
                        <td className="pr-5 font-semibold">Tipe Dokumen :</td>
                        <td className="">{data?.serviceType}</td>
                    </tr>
                    <tr>
                        <td className="pr-5 font-semibold">Jenis Pengajuan: </td>
                        <td className="">{data?.serviceName}</td>
                    </tr>
                    <tr>
                        <td className="pr-5 font-semibold">Tanggal Pengajuan: </td>
                        <td className="">
                            {(() => {
                                if (!data?.createdAt) return "-"; // kalau belum ada data
                                    const date = new Date(data.createdAt);

                                    if (isNaN(date.getTime())) return "-"; // kalau bukan tanggal valid

                                    return new Intl.DateTimeFormat("id-ID", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }).format(date);
                            })()}
                        </td>
                    </tr>
                   </tbody>
                </table>
            </div>
            
            { activeStage >= 3 ? (
                <div className="w-full grid grid-cols-1 mt-3 gap-6">
                    <Button variant={'primary'} onClick={() => {}} className={"bg-green-500 text-white py-3 cursor-pointer"} size={'md'}>
                        Download Dokumen
                    </Button>
                </div>
            ) : (
                <div className="w-full grid grid-cols-2 mt-3 gap-6">
                    <Button variant={'primary'} onClick={() => setIsModalDeleteOpen(true)} className={"bg-red-500 text-white py-3 cursor-pointer"} size={'md'}>
                        Batalkan pengajuan
                    </Button>
                    <Link href={`/ubah-pengajuan/${id}`}>
                        <Button variant={'primary'} className={"bg-sky-500 text-white py-3 w-full cursor-pointer"} size={'md'}>
                            Ubah pengajuan
                        </Button>
                    </Link>
                </div>
            ) }
        </>
    )
}