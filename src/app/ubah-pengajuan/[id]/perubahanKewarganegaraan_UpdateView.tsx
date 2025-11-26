import FileInput from "@/components/form-component/fileinput-component";

export default function PerubahanKewarganegaraanUpdateView() {
    return (
        <>
            <div className="w-full bg-white rounded-2xl p-5 mb-5 shadow-md">
                <div className="flex flex-col space-y-3">
                        <FileInput onChange={() => {}} id="form_1" label="F-2.01 (Formulir Pencatatan Sipil)" filename="form_pencatatan_sipil.pdf" />
                        <FileInput onChange={() => {}} id="form_2" label="Scan Putusan Menteri" filename="scan_putusan_menteri.pdf" />
                        <FileInput onChange={() => {}} id="form_3" label="Scan Berita Acara Pengucapan Sumpah" filename="berita_acara_pengucapan_sumpah.pdf" />
                        <FileInput onChange={() => {}} id="form_4" label="Kutipan Akta Pencatatan Sipil" filename="kutipan_akta.pdf" />
                        <FileInput onChange={() => {}} id="form_5" label="Scan Kartu Keluarga" filename="scan_kk.pdf" />
                        <FileInput onChange={() => {}} id="form_6" label="Scan KTP" filename="scan_ktp.pdf" />
                    </div>
            </div>
        </>
    )
}