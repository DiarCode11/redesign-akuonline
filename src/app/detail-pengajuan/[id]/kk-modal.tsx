import DataOrangtuaSection from "@/components/kk-component/add-data-section/data-orangtua";
import DataPerkawinanSection from "@/components/kk-component/add-data-section/data-perkawinan";
import DataPribadiSection from "@/components/kk-component/add-data-section/data-pribadi";
import DokumenIdentitasSection from "@/components/kk-component/add-data-section/dokumen-identitas";
import KondisiKhususSection from "@/components/kk-component/add-data-section/kondisi-khusus";
import Modal from "@/components/modal";
import { Button } from "@mui/material";



export default function KkModal() {


    return (
        <Modal title={"Ubah Data Anggota Keluarga"} isOpen={isEditDataModalOpen} onClose={() => setIsEditDataModalOpen(false)}>
            <div className="sm:px-3 px-2">
                {/* Section data pribadi */}
                <DataPribadiSection title="A. Data Pribadi" onChange={handleUpdateData} />
                <div className="w-full border-gray-400 my-7 border"></div>
                <DokumenIdentitasSection addMode={isAddDataModalOpen} title="B. Dokumen Identitas" onChange={handleUpdateData}/>
                <div className="w-full border-gray-400 my-7 border"></div>
                <DataPerkawinanSection title="C. Data Perkawinan" onChange={handleUpdateData} />
                <div className="w-full border-gray-400 my-7 border"></div>
                <KondisiKhususSection title="D. Kondisi Khusus" onChange={handleUpdateData}/>
                <div className="w-full border-gray-400 my-7 border"></div>
                <DataOrangtuaSection title="E. Data Orang Tua" onChange={handleUpdateData} />
                <div className="flex justify-end pt-5">
                    {/* disabled={!buatFormulirValid()} nanti tambahkan disini */}
                    <Button onClick={() => SaveEditedData()} variant="primary" size={"md"} className={"bg-sky-600 text-white px-4 py-2"}>
                        Simpan
                    </Button>
                </div>
            </div>
        </Modal>
    )
}