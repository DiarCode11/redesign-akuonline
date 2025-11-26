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
import KkRusakUpdateView from "./kkRusak_UpdateView";
import AddKtpUpdateView from "./addKtp_UpdateView";
import KtpHilangUpdateView from "./ktpHilang_UpdateView";
import KtpRusakUpdateView from "./ktpRusak_UpdateView";
import { dataKtpRusakProps } from "@/app/ktp/ktp-rusak/page";
import EditKkUpdateView from "./editKk_UpdateView";
import EditKtpUpdateView from "./editKtp_UpdateView";
import AddAktaUpdateView from "./addAkta_UpdateView";
import EditAktaUpdateView from "./editAkta_UpdateView";
import { PerubahanKewarganegaraanForm } from "@/components/akta-component/akta-form";
import PerubahanKewarganegaraanUpdateView from "./perubahanKewarganegaraan_UpdateView";
import AktaRusakUpdateView from "./aktaRusak_UpdateView";

export default function UbahPengajuan() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id
    const [dataKk, setDataKk] = useState<dataKKProps | null>(null)
    const [dataKkHilang, setDataKkHilang] = useState<KkHilangProps | null>(null)
    const [dataKtpHilang, setDataKtpHilang] = useState<KkHilangProps | null>(null)
    const [dataKtpRusak, setDataKtpRusak] = useState<dataKtpRusakProps | null>(null)
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
                        case "Kehilangan KTP":
                            setDataKtpHilang(detailPengajuan.data);
                            break;
                        case "Kerusakan KTP":
                            setDataKtpRusak(detailPengajuan.data)
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
                    {/* KARTU KELUARGA */}
                    { detailPengajuan?.serviceName === "Buat Kartu Keluarga" && (
                        <AddKkUpdateView defaultData={dataKk} onDataChange={handleCallback} />
                    ) }
                    { detailPengajuan?.serviceName === "Perubahan Kartu Keluarga" && (
                        <EditKkUpdateView />
                    ) }
                    { detailPengajuan?.serviceName === "Kehilangan Kartu Keluarga" && (
                        <KkHilangUpdateView defaultData={dataKkHilang} onDataChange={handleCallback} />
                    ) }
                    { detailPengajuan?.serviceName === "Kartu Keluarga Rusak" && (
                        <KkRusakUpdateView />
                    ) }

                    {/* KTP */}
                    { detailPengajuan?.serviceName === "Buat KTP" && (
                        <AddKtpUpdateView />
                    ) }
                    { detailPengajuan?.serviceName === "BPerubahan Data KTP" && (
                        <EditKtpUpdateView />
                    ) }
                    { detailPengajuan?.serviceName === "Kehilangan KTP" && (
                        <KtpHilangUpdateView defaultData={dataKtpHilang} onDataChange={handleCallback} />
                    ) }
                    { detailPengajuan?.serviceName === "Kerusakan KTP" && (
                        <KtpRusakUpdateView defaultData={dataKtpRusak} onDataChange={handleCallback} />
                    ) }

                    {/* AKTA */}
                    { detailPengajuan?.serviceName.startsWith("Pembuatan Akta") && !detailPengajuan?.serviceName.startsWith("Pembuatan Akta karena rusak") && (
                        <AddAktaUpdateView />
                    ) }
                    { detailPengajuan?.serviceName.startsWith("Perubahan Data Akta") && (
                        <EditAktaUpdateView />
                    ) }
                    { detailPengajuan?.serviceName.startsWith("Perubahan Kewarganegaraan") && (
                        <PerubahanKewarganegaraanUpdateView />
                    ) }
                    { detailPengajuan?.serviceName.startsWith("Pembuatan Akta karena rusak") && (
                        <AktaRusakUpdateView />
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