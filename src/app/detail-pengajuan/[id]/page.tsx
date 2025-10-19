"use client";
import { Button } from "@/components/ui/button";
import { ServiceProps } from "@/lib/save-to-local-storage";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";

type Props = {
    params : Promise<{ id: string }>;
}

export default function DetailPengajuan({ params }: Props) {
    const param = use(params); 
    console.log(param.id);

    const [dataAnggota, setDataAnggota] = useState<any[]>([
        {
            id: 1,
            nama: 'I Wayan Yoga Sastrawan',
            status: 'Kepala Keluarga',
            jenis_kelamin: 'Laki-laki'
        },
        {
            id: 2,
            nama: 'John Smith',
            status: 'Saudara',
            jenis_kelamin: 'Laki-laki'
        },
        {
            id: 3,
            nama: 'Mariah Maclach',
            status: 'Istri',
            jenis_kelamin: 'Perempuan'
        }
    ])

    const data : string = localStorage.getItem("data");
    const json_data : any[] = JSON.parse(data || "[]");

    const data_by_id = json_data.filter((data) => data.id == param.id ) 
    useEffect(() => {
        console.log("Data lokal: ", data_by_id[0])
    }, [])

    return (
        <>
            <div className="flex space-x-6 items-center pb-10">
                <Link href={"/"}>
                    <ArrowLeft />
                </Link>
                <h1 className="font-semibold text-xl">Detail Pengajuan</h1>
            </div>

            <div className="w-full bg-white rounded-2xl p-5 mb-5 shadow-md">
                <h1 className="font-semibold">Status Pengajuan</h1>
                <div className="flex justify-between mt-3 relative">
                    <span className="h-1 w-1/2 ml-5 bg-gray-200 absolute x-5 translate-y-4"></span>
                    <span className="h-1 w-1/2 right-5 bg-gray-200 absolute x-5 translate-y-4"></span>
                    <div className="z-10">
                        <div className="w-10 h-10 mx-auto rounded-full primary-color flex justify-center items-center font-bold text-white">
                            1
                        </div>
                        <span>Diterima</span>
                    </div>
                    <div className="z-10">
                        <div className="w-10 h-10 mx-auto rounded-full bg-gray-300 flex justify-center items-center font-bold text-white">
                            2
                        </div>
                        <span>Diproses</span>
                    </div>
                    <div className="z-10">
                        <div className="w-10 h-10 mx-auto rounded-full bg-gray-300 flex justify-center items-center font-bold text-white">
                            3
                        </div>
                        <span>Selesai</span>
                    </div>
                </div>
            </div>

            <div className="w-full bg-white rounded-2xl p-5 shadow-md">
                <table>
                    <tr>
                        <td className="pr-8 pb-2 font-semibold">Jenis Pengajuan</td>
                        <td className="pb-2">{data_by_id[0].serviceName}</td>
                    </tr>
                    <tr>
                        <td className="pr-8 pb-2 font-semibold">Tanggal Pengajuan</td>
                        <td className="pb-2">{data_by_id[0].created_at}</td>
                    </tr>
                    <tr>
                        <td className="pr-8 pb-2 font-semibold">Data :</td>
                    </tr>
                </table>
                <table className="w-full">
                    <tr>
                        <td className=" pb-2 font-bold">No</td>
                        <td className="pr-8 pb-2 font-bold">Nama</td>
                        <td className="pr-8 pb-2 font-bold">Hubungan Keluarga</td>
                    </tr>
                    {dataAnggota.map((data, idx) => (
                        <tr key={data.id} className="">
                            <td className=" pb-2">{idx + 1}</td>
                            <td className="pr-8 pb-2">{data.nama}</td>
                            <td className="pr-8 pb-2">{data.status}</td>
                        </tr>
                    ))}
                </table>
            </div>
            
            <div className="w-full grid grid-cols-2 mt-3 gap-6">
                <Button variant={'primary'} className={"bg-red-500 text-white py-3"} size={'md'}>
                    Batalkan pengajuan
                </Button>
                <Button variant={'primary'} className={"bg-sky-500 text-white py-3"} size={'md'}>
                    Ubah pengajuan
                </Button>
            </div>
        </>
    )
}