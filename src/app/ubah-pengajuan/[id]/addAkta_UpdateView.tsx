"use client"
import { dataKKProps, formDataProps } from "@/app/kk/buat-kk-baru/page";
import DropdownComponent from "@/components/form-component/dropdown-component";
import FileInput from "@/components/form-component/fileinput-component";
import InputComponent, { DataType } from "@/components/form-component/input-component";
import RadioComponent from "@/components/form-component/radio-component";
import DataOrangtuaSection, { DataOrangtuaProps } from "@/components/kk-component/add-data-section/data-orangtua";
import DataPerkawinanSection, { DataPerkawinanProps } from "@/components/kk-component/add-data-section/data-perkawinan";
import DataPribadiSection, { DataPribadiProps } from "@/components/kk-component/add-data-section/data-pribadi";
import DokumenIdentitasSection, { DokumenIdentitasType } from "@/components/kk-component/add-data-section/dokumen-identitas";
import KondisiKhususSection, { KondisiKhususProps } from "@/components/kk-component/add-data-section/kondisi-khusus";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { VILLAGE_DATA } from "@/lib/config";
import { ServiceProps } from "@/lib/save-to-local-storage";
import { useCallback, useEffect, useState } from "react";

type AddKkUpdateViewProps = {
    defaultData: dataKKProps,
    onDataChange: (data: dataKKProps) => void
}

export default function AddKkUpdateView({defaultData, onDataChange} : AddKkUpdateViewProps) {
    const [form, setForm] = useState<dataKKProps>(defaultData);
    const [villageList, setVillageList] = useState<string[]>(VILLAGE_DATA[defaultData.kecamatan])
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [editingIdx, setEditingIdx] = useState<number>(null);
    const [deletingIdx, setDeletingIdx] = useState<number>(null);
    const [addedDataKeluarga, setAddedDataKeluarga] = useState<formDataProps | null>(null);
    const [isAddDataModalOpen, setIsAddDataModalOpen] = useState<boolean>(false)


    const [selectedUpdateData, setSelectedUpdateData] = useState<formDataProps>(null);
    const [drafUpdatedData, setDrafUpdatedData] = useState<formDataProps | null>(null)


    const handleCallback = useCallback((data: Partial<formDataProps>) => {
        setDrafUpdatedData(prev => ({
            ...prev,
            ...data
        }))
    }, [])

    const dataKeluargaCallback = useCallback((data: Partial<formDataProps>) => {
        setAddedDataKeluarga(prev => ({
            ...prev,
            ...data
        }))
    }, [])

    useEffect(() => {
        onDataChange(form)
    }, [form])

    useEffect(() => {
        console.log(addedDataKeluarga)
    }, [addedDataKeluarga])

    function saveAddedData() {
        setForm((prev) => ({
            ...prev,
            data_keluarga: [
                ...form.data_keluarga, {
                    ...addedDataKeluarga
                }
            ]
        }));
        setIsAddDataModalOpen(false);
        setAddedDataKeluarga(null);
    }

    function saveUpdatedData () {
        setForm((prev) => {
            const editedFamilyData = [...prev.data_keluarga]
            editedFamilyData[editingIdx] = {
                ...editedFamilyData[editingIdx],
                ...drafUpdatedData
            }

            return {
                ...prev,
                data_keluarga: editedFamilyData
            }
        });

        setIsUpdateModalOpen(false);
    }

    function saveDeletedData () {
        const existsData = form.data_keluarga.filter((data, index) => index != deletingIdx)
        setForm((prev) => ({
            ...prev, data_keluarga: existsData
        }));
        
        setIsDeleteModalOpen(false);
    }

    return (
        <>
            {/* MODAL ADD DATA */}
            <Modal title={"Tambah Data Anggota Keluarga"} isOpen={isAddDataModalOpen} onClose={() => setIsAddDataModalOpen(false)}>
                <div className="sm:px-3 px-2">
                    {/* Section data pribadi */}
                    <DataPribadiSection title="A. Data Pribadi" onChange={dataKeluargaCallback} />
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <DokumenIdentitasSection addMode={isAddDataModalOpen} title="B. Dokumen Identitas" onChange={dataKeluargaCallback}/>
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <DataPerkawinanSection title="C. Data Perkawinan" onChange={dataKeluargaCallback} />
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <KondisiKhususSection title="D. Kondisi Khusus" onChange={dataKeluargaCallback}/>
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <DataOrangtuaSection title="E. Data Orang Tua" onChange={dataKeluargaCallback} />
                    <div className="flex justify-end pt-5">
                        {/* disabled={!buatFormulirValid()} nanti tambahkan disini */}
                        <Button onClick={() => saveAddedData()} variant="primary" size={"md"} className={"bg-sky-600 text-white px-4 py-2"}>
                            Simpan
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* MODAL UPDATE DATA */}
            <Modal isOpen={isUpdateModalOpen} title="Ubah Data" onClose={() => setIsUpdateModalOpen(false)}>
                <div className="sm:px-3 px-2">
                    {/* Section data pribadi */}
                    <DataPribadiSection defaultValue={form.data_keluarga[editingIdx] as Partial<DataPribadiProps>} title="A. Data Pribadi" onChange={handleCallback} />
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <DokumenIdentitasSection defaultValue={form.data_keluarga[editingIdx] as Partial<DokumenIdentitasType>} addMode={false} title="B. Dokumen Identitas" onChange={handleCallback}/>
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <DataPerkawinanSection defaultValue={form.data_keluarga[editingIdx] as Partial<DataPerkawinanProps>} title="C. Data Perkawinan" onChange={handleCallback} />
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <KondisiKhususSection defaultValue={form.data_keluarga[editingIdx] as Partial<KondisiKhususProps>} title="D. Kondisi Khusus" onChange={handleCallback}/>
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <DataOrangtuaSection defaultValue={form.data_keluarga[editingIdx] as Partial<DataOrangtuaProps>} title="E. Data Orang Tua" onChange={handleCallback} />
                    <div className="flex justify-end pt-5">
                        {/* disabled={!buatFormulirValid()} nanti tambahkan disini */}
                        <Button onClick={() => saveUpdatedData()} variant="primary" size={"md"} className={"bg-sky-600 text-white px-4 py-2"}>
                            Simpan
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* MODAL DELETE */}
            <Modal title="Konfirmasi Hapus" width="w-[400px]" isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <span>Apakah and ayakin ingin menghapus record <b>{form?.data_keluarga?.[deletingIdx]?.nama_lengkap}</b> ?</span>
                <div className="mt-5 grid grid-cols-2 gap-2">
                    <Button onClick={() => setIsDeleteModalOpen(false)} className={"py-2 bg-gray-200 cursor-pointer"} size={40} variant={""}>
                        Tidak
                    </Button>
                    <Button onClick={() => saveDeletedData()} className={"bg-red-600 text-white cursor-pointer"} size={40} variant={""}>
                        Ya
                    </Button>
                </div>
            </Modal>

            {/* FORM STATUS PENGAJUAN */}
            <div className="w-full bg-white rounded-2xl p-5 mb-5 shadow-md">
                <h1 className="font-semibold">Status Pengajuan</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 pt-4 gap-6">
                    <div className="sm:col-span-2">
                        <RadioComponent 
                            name={"Jenis Data Keluarga"} 
                            cols={"md:grid-cols-3"} 
                            defaultItem={form.jenis_data}
                            item={['WNI Dalam Negeri', 'WNA Dalam Negeri', 'WNI Luar Negeri']} 
                            onChange={(data) => setForm((prev) => ({
                                ...prev, jenis_data: data
                            }))} 
                        />
                    </div>
                    <DropdownComponent
                        getDropdownStatus={() => {}}
                        data={Object.keys(VILLAGE_DATA)}
                        label="Kecamatan"
                        defaultData={form.kecamatan}
                        placeholder="Pilih kecamatan"
                        onChange={(data) => {
                            setVillageList(VILLAGE_DATA[data])
                            setForm((prev) => ({
                                ...prev, kecamatan: data
                            }))
                        }}
                        />
                    <DropdownComponent
                        getDropdownStatus={() => {}}
                        data={villageList}
                        label="Desa"
                        defaultData={form.desa}
                        placeholder="Pilih desa"
                        onChange={(data) => setForm((prev) => ({
                            ...prev, desa: data
                        }))}
                        />
                    <InputComponent 
                        name={"Dusun"} 
                        dataType={DataType.Text} 
                        defaultValue={form.dusun}
                        keyname={"dusun"} 
                        placeholder={"Masukkan nama dusun"} 
                        onChange={(data) => setForm((prev) => ({
                            ...prev, dusun: data
                        }))}
                    />
                    <InputComponent 
                        name={"Kode Pos"} 
                        dataType={DataType.Number} 
                        keyname={"kode_pos"} 
                        defaultValue={form.kode_pos}
                        placeholder={"Masukkan kode pos"} 
                        onChange={(data) => setForm((prev) => ({
                            ...prev, kode_pos: data
                        }))} 
                    />
                    <div className="sm:col-span-2">
                        <RadioComponent 
                            name={"Apakah pembuatan data ini diwakilkan oleh orang lain?"} 
                            cols="md:grid-cols-2" 
                            item={['Ya', 'Tidak']} 
                            defaultItem={form.diwakilkan ? "Ya" : "Tidak"}
                            onChange={(data) => {
                                console.log(data)
                                if (data == 'Ya') {
                                    setForm((prev) => ({
                                        ...prev, diwakilkan: true
                                    }))
                                } else {
                                    setForm((prev) => ({
                                        ...prev, diwakilkan: false
                                    }))
                                }
                            }} 
                        />
                    </div>
                    { form?.diwakilkan && (
                        <>
                            <InputComponent 
                                name={"Nama Perwakilan"} 
                                dataType={DataType.Text} 
                                keyname={"nama_perwakilan"} 
                                defaultValue={form.nama_perwakilan}
                                placeholder={"Masukkan nama perwakilan"} 
                                onChange={(data) => setForm((prev) => ({
                                    ...prev, nama_perwakilan: data
                                }))} 
                            />
                            <InputComponent 
                                name={"NIK Perwakilan"} 
                                dataType={DataType.Number} 
                                keyname={"nik_perwakilan"} 
                                defaultValue={form.nik_perwakilan}
                                placeholder={"Masukkan NIK"} 
                                onChange={(data) => setForm((prev) => ({
                                    ...prev, nik_perwakilan: data
                                }))} 
                            />
                        </>
                    ) }
                </div>
            </div>

            {/* FORM DATA KELUARGA */}
            <div className="w-full bg-white rounded-2xl p-5 mb-5 shadow-md">
                <h1 className="font-semibold">Data Keluarga</h1>
                <div className="mt-4 overflow-x-scroll md:overflow-x-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-sky-600 text-white">
                                <th className="text-left font-normal px-2">Nama</th>
                                <th className="text-left font-normal px-2">Status</th>
                                <th className="text-left font-normal px-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            { form && form.data_keluarga.map((data, index) => (
                                <tr className="border-b border-neutral-300" key={index}>
                                    <th className="text-left font-normal px-2 py-2">{data.nama_lengkap}</th>
                                    <th className="text-left font-normal px-2">{data.hubungan_keluarga}</th>
                                    <th className="text-left font-normal px-2">
                                        <Button
                                            variant={"text"} size={undefined}
                                            onClick={() => {
                                                setEditingIdx(index)
                                                setIsUpdateModalOpen(true)
                                            }}
                                            className="bg-yellow-600 text-white mr-1 cursor-pointer"
                                        >
                                            Ubah
                                        </Button>

                                        { form?.data_keluarga?.length != 1 && (
                                            <Button
                                                variant={undefined} size={undefined}
                                                onClick={() => {
                                                    setDeletingIdx(index)
                                                    setIsDeleteModalOpen(true)
                                                }}
                                                className="bg-red-600 text-white cursor-pointer"
                                            >
                                                Hapus
                                            </Button>
                                        ) }
                                    </th>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                    <div className="mt-6 flex justify-center">
                        <Button className={"bg-sky-600 py-2 px-4 text-white"} variant={""} onClick={() => setIsAddDataModalOpen(true)} size={30}>
                            Tambah
                        </Button>
                    </div>
                </div>
            </div>

            {/* FORM DOKUMEN */}
            <div className="w-full bg-white rounded-2xl p-5 mb-5 shadow-md">
                <h1 className="font-semibold pb-2">Dokumen</h1>
                <FileInput onChange={() => {}} id="form_isian_kk" label="Formulir Isian KK" filename="form_isian_kk.pdf" />
                <FileInput onChange={() => {}} id="pendaftaran_peristiwa" label="Pendaftaran Peristiwa Kependudukan" filename="pendaftaran_peristiwa_kependudukan.pdf" />
                <FileInput onChange={() => {}} id="perubahan_elemen" label="Pernyataan Perubahan Elemen" filename="pernyataan_perubahan_elemen.pdf" />
            </div>
        </>
    )
}