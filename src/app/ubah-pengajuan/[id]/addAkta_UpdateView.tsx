import FileInput from "@/components/form-component/fileinput-component";

export default function AddAktaUpdateView() {
    return (
        <>
            <div className="w-full bg-white rounded-2xl p-5 mb-5 shadow-md">
                <div className="flex flex-col space-y-3">
                    <FileInput onChange={() => {}} filename="form_pecatatan_sipil.pdf" id="form_pendaftaran" label="F-2.01 (Formulir Pencatatan Sipil)" />
                    <FileInput onChange={() => {}} filename="form_permohonan_penerbitan_akta.pdf" id="scan_kk" label="F-2.01 (Formulir Permohonan Penerbitan Akta)" />
                    <FileInput onChange={() => {}} filename="sk_kelahiran.pdf" id="ktp1" label={`Surat Keterangan Kelahiran`} />
                    <FileInput onChange={() => {}} filename="scan_kk.pdf" id="ktp2" label={`Scan Kartu Keluarga`} />
                </div>
            </div>
        </>
    )
}