import FileInput from "@/components/form-component/fileinput-component";

export default function EditKtpUpdateView() {
    return (
        <>
            <div className="w-full bg-white rounded-2xl p-5 mb-5 shadow-md">
                <div className="flex flex-col space-y-3">
                    <FileInput onChange={() => {}} filename="form_pendaftaran.pdf" id="form_pendaftaran" label="Formulir Pendaftaran Peristiwa Kependudukan" />
                    <FileInput onChange={() => {}} filename="scan_kk.pdf" id="scan_kk" label="Scan Kartu Keluarga" />
                </div>
            </div>
        </>
    )
}