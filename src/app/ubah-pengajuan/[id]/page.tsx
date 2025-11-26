"use client"
import { dataKKProps } from "@/app/kk/buat-kk-baru/page";
import { GetDataHelper } from "@/helper/getDataHelper";
import { ServiceProps } from "@/lib/save-to-local-storage";
import { ArrowLeft, CircleAlertIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AddKkUpdateView from "./addKk_UpdateView";
import { Button } from "@/components/ui/button";
import { UpdateDataHelper } from "@/helper/updateDataHelper";
import Alert from "@/components/alert";
import { KkHilangProps } from "@/app/kk/kk-hilang/page";
import KkHilangUpdateView from "./kkHilang_UpdateView";

export default function UbahPengajuan() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id
    const [dataKk, setDataKk] = useState<dataKKProps | null>(null)
    const [dataKkHilang, setDataKkHilang] = useState<KkHilangProps | null>(null)
    const [detailPengajuan, setDetailPengajuan] = useState<ServiceProps>(null)
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [serviceType, setServiceType] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetDataHelper(`/api/pengajuan/${id}`);
                if (response.ok) {
                    console.log("DATA PADA UPDATE PENGAJUAN: ", response.data?.data);
                    const detailPengajuan: ServiceProps = response.data?.data
                    setDetailPengajuan(detailPengajuan);
                    switch(response.data?.data?.serviceName) {
                        case "Buat Kartu Keluarga":
                            const dataJson: dataKKProps = response.data?.data.data;
                            setDataKk(detailPengajuan.data)
                            break;
                        case "Kehilangan Kartu Keluarga":
                            setDataKkHilang(detailPengajuan.data);
                            break;
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, [])


    const handleCallback = useCallback((data: any) => {
        setDetailPengajuan((prev) => ({
            ...prev, data
        }))
    }, [])

    useEffect(() => {
        console.log("Data di ubah pengajuan: ", detailPengajuan)
    }, [detailPengajuan])

    async function saveChanges() {
        try {
            const response = await UpdateDataHelper(`/api/pengajuan/${id}`, detailPengajuan);
            if (response.ok) {
                console.log(response.data)
                setShowAlert(true)
                setTimeout(() => {
                    router.push(`/detail-pengajuan/${id}`)
                }, 200);
            } else {
                console.log(response.data)
            }
        } catch (e) {
            console.error(e?.message)
        }
    }

    return (
        <>
            { detailPengajuan !== null && (
                <>
                    {/* Alert */}
                    <Alert title="Berhasil memperbarui pengajuan" isShow={showAlert} onClose={(data) => setShowAlert(false)} prefixIcon={<CircleAlertIcon className="text-green-800" />} />
                    
                    <div className="flex space-x-6 items-center pb-10">
                        <Link href={`/detail-pengajuan/${id}`}>
                            <ArrowLeft />
                        </Link>
                        <h1 className="font-semibold text-xl">Ubah Pengajuan {detailPengajuan.serviceName}</h1>
                    </div>
                    {/*  */}
                    { detailPengajuan?.serviceName === "Buat Kartu Keluarga" && (
                        <AddKkUpdateView defaultData={dataKk} onDataChange={handleCallback} />
                    ) }
                    { detailPengajuan?.serviceName === "Kehilangan Kartu Keluarga" && (
                        <KkHilangUpdateView defaultData={dataKkHilang} onDataChange={handleCallback} />
                    ) }

                    <div className="flex justify-end">
                        <Button onClick={() => saveChanges()} className={"text-white bg-sky-600 p-3"} variant={""} size={20}>
                            Simpan Perubahan
                        </Button>
                    </div>
                </>
            ) }
        </>
    )
}