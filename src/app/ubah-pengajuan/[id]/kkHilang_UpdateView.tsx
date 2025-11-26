import { KkHilangProps } from "@/app/kk/kk-hilang/page"
import DatePickerComponent from "@/components/form-component/datepicker-component"
import FileInput from "@/components/form-component/fileinput-component"
import InputComponent, { DataType } from "@/components/form-component/input-component"
import { useEffect, useState } from "react"

type KkHilangUpdateViewProps = {
    defaultData: KkHilangProps,
    onDataChange: (data: KkHilangProps) => void
}

export default function KkHilangUpdateView({ defaultData, onDataChange } : KkHilangUpdateViewProps) {
    const [form, setForm] = useState<KkHilangProps>(defaultData);
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
                        defaultValue={form?.NoKtpPemohon}
                        keyname={"ktp-pemohon"} 
                        placeholder={"Masukkan nomor KTP"} 
                        onChange={(data) => setForm((prev) => ({
                            ...prev, dusun: data
                        }))}
                    />
                    <DatePickerComponent
                        getToggleStatus={() => {}}
                        label="Tanggal Lahir"
                        defaultDate={form?.TanggalKehilangan ?? ''}
                        onChange={(data) => {
                            setForm(prep => ({
                                ...prep, TanggalKehilangan: data
                            }))
                        }}
                    />
                </div>
            </div>
            <div className="w-full bg-white rounded-2xl p-5 mb-5 shadow-md">
                <div className="flex flex-col space-y-3">
                    <FileInput onChange={() => {}} filename="form_pendaftaran.pdf" id="form_pendaftaran" label="Formulir Pendaftaran Peristiwa Kependudukan" />
                    <FileInput onChange={() => {}} filename="pendaftaran_peristiwa.pdf" id="pendaftaran_peristiwa" label="Surat Keterangan Kehilangan dari Kepolisian" />
                    <FileInput onChange={() => {}} filename="ktp_wayan_yoga_sastrawan.pdf" id="ktp1" label={`Scan KTP "I Wayan Yoga Sastrawan"`} />
                    <FileInput onChange={() => {}} filename="ktp_mariah_maclachlan.pdf" id="ktp2" label={`Scan KTP "Mariah Maclachlan"`} />
                    <FileInput onChange={() => {}} filename="akta_perkawinan.pdf" id="akta_kawin" label="Scan Akta Perkawinan" />
                </div>
            </div>
        </>
    )
}