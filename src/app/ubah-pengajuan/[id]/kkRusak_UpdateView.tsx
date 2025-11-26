import FileInput from "@/components/form-component/fileinput-component";

export default function KkRusakUpdateView() {
    return (
        <>
            <div className="w-full bg-white rounded-2xl p-5 mb-5 shadow-md">
                <div className="flex flex-col space-y-3">
                    <FileInput onChange={() => {}} filename="form_pendaftaran.pdf" id="form_pendaftaran" label="Formulir Pendaftaran Peristiwa Kependudukan" />
                    <FileInput onChange={() => {}} filename="scan_kk.pdf" id="scan_kk" label="Scan KK yang Rusak" />
                    <FileInput onChange={() => {}} filename="ktp_wayan_yoga_sastrawan.pdf" id="ktp1" label={`Scan KTP "I Wayan Yoga Sastrawan"`} />
                    <FileInput onChange={() => {}} filename="ktp_mariah_maclachlan.pdf" id="ktp2" label={`Scan KTP "Mariah Maclachlan"`} />
                    <FileInput onChange={() => {}} filename="akta_perkawinan.pdf" id="akta_kawin" label="Scan Akta Perkawinan" />
                </div>
            </div>
        </>
    )
}