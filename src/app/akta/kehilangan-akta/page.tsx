"use client";
import Link from "next/link";
import { ArrowLeft, CircleAlertIcon } from "lucide-react";
import InputComponent from "@/components/form-component/input-component";
import FileInput from "@/components/form-component/fileinput-component";
import { Button } from "@/components/ui/button";
import Alert from "@/components/alert";
import { useState } from "react";
import { SubmitDataHelper } from "@/helper/submitDataHelper";
import { ServiceProps } from "@/lib/save-to-local-storage";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function KehilanganAkta() {
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [nik, setNik] = useState<string>("")
    const auth = useAuth()
    const router = useRouter()

    async function saveData() {
        try {
            const payload : ServiceProps = {
                userId: auth.id,
                userName: auth.name,
                serviceType: "Akta",
                serviceName: "Pembuatan Akta karena rusak",
                description: "Pengajuan Pembuatan Akta karena rusak",
                createdAt: new Date(),
                data: nik
            } 

            const response = await SubmitDataHelper("/api/pengajuan", payload);
            if (response.ok) {
                console.log(response.data)
                setShowAlert(true)
                setTimeout(() => {
                    router.push("/")
                }, 2000)
            } else {
                console.log(response)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (    
        <>
            {/* Alert */}
            <Alert title="Berhasil membuat pengajuan" isShow={showAlert} onClose={(data) => setShowAlert(false)} prefixIcon={<CircleAlertIcon className="text-green-800" />} />
            <div className="flex space-x-6 items-center pb-10">
                <Link href={"/"}>
                    <ArrowLeft />
                </Link>
                <h1 className="font-semibold text-xl">Kehilangan Akta</h1>
            </div>
            <div className="bg-white p-5 rounded-md">
                <h2 className="font-medium select-none pb-4"></h2>
                <InputComponent
                    keyname="No_KK"
                    name="Nomor Kartu Keluarga"
                    dataType="number"
                    onChange={(data) => {setNik(data)}}
                    placeholder="Masukkan Nomor KK"
                />
                <FileInput onChange={() => {}} id="perubahan_elemen" label="Scan Kartu Keluarga (Pdf)" />
                <div className="flex justify-end pt-8">
                    <Button onClick={() => saveData()} size={'md'} variant={'primary'} className="bg-sky-600 text-white px-4 py-2">
                        Simpan
                    </Button>
                </div>
            </div>
        </>
    )
}