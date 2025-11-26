import { dataKtpRusakProps } from "@/app/ktp/ktp-rusak/page"
import FileInput from "@/components/form-component/fileinput-component"
import InputComponent, { DataType } from "@/components/form-component/input-component"
import { useEffect, useState } from "react"

type KtpHilangUpdateViewProps = {
    defaultData: dataKtpRusakProps,
    onDataChange: (data: dataKtpRusakProps) => void
}

export default function KtpRusakUpdateView({ defaultData, onDataChange } : KtpHilangUpdateViewProps) {
    const [form, setForm] = useState<dataKtpRusakProps | null>(defaultData)

    useEffect(() => {
        console.log("Isi form: ", form)
        onDataChange(form)
    }, [form])

    return (
        <>
            <div className="w-full bg-white rounded-2xl p-5 mb-5 shadow-md">
                <div className="grid grid-cols-1 gap-y-3">
                    <InputComponent 
                        name={"Nomor KTP Pemohon"} 
                        dataType={DataType.Text} 
                        defaultValue={form?.NoKtp}
                        keyname={"ktp-pemohon"} 
                        placeholder={"Masukkan nomor KTP"} 
                        onChange={(data) => setForm((prev) => ({
                            ...prev, dusun: data
                        }))}
                    />
                </div>
            </div>
            <div className="w-full bg-white rounded-2xl p-5 mb-5 shadow-md">
                <div className="flex flex-col space-y-3">
                    <FileInput onChange={() => {}} filename="form_pendaftaran.pdf" id="form_pendaftaran" label="Formulir Pendaftaran Peristiwa Kependudukan" />
                    <FileInput onChange={() => {}} filename="scan_ktp.pdf" id="scan_ktp" label="Scan KTP yang Rusak" />
                </div>
            </div>
        </>
    )
}