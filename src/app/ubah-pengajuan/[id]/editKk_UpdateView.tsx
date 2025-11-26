import FileInput from "@/components/form-component/fileinput-component"

type EditKkUpdateViewProps = {
    defaultData: any,
    onDataChange: (data: any) => void
}

export default function EditKkUpdateView() {
    return (
        <>
        <div className="w-full bg-white rounded-2xl p-5 mb-5 shadow-md">
                <div className="flex flex-col space-y-3">
                    <FileInput onChange={() => {}} filename="form_pendaftaran.pdf" id="form_pendaftaran" label="Formulir Pendaftaran Peristiwa Kependudukan" />
                    <FileInput onChange={() => {}} filename="form_kk.pdf" id="scan_kk" label="Formulir Isian KK" />
                    <FileInput onChange={() => {}} filename="pernyataan_perubahan_elemen.pdf" id="ktp1" label={`Scan Pernyataan Perubahan Elemen`} />
                </div>
            </div>
        </>
    )
}