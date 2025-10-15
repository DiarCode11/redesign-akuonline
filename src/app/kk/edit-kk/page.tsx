"use client";
import React from "react";
import { ArrowLeft, Check, ChevronDown, Download, Pencil, SquarePen, Trash2 } from "lucide-react";
import Accordion from "@/components/accordion";
import { VILLAGE_DATA } from "@/lib/config";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Modal from "@/components/modal";
import Link from "next/link";
import DataPribadiSection from "@/components/kk-component/edit-data-section/data-pribadi";
import InputComponent from "@/components/form-component/input-component";
import RadioComponent from "@/components/form-component/radio-component";
import DropdownComponent from "@/components/form-component/dropdown-component";
import { DataType } from "@/components/form-component/input-component";
import DokumenIdentitasSection from "@/components/kk-component/edit-data-section/dokumen-identitas";
import DataPerkawinanSection from "@/components/kk-component/edit-data-section/data-perkawinan";
import KondisiKhususSection from "@/components/kk-component/edit-data-section/kondisi-khusus";
import DataOrangtuaSection from "@/components/kk-component/edit-data-section/data-orangtua";
import { DataPribadiProps } from "@/components/kk-component/edit-data-section/data-pribadi";
import { DokumenIdentitasType } from "@/components/kk-component/edit-data-section/dokumen-identitas";
import { DataPerkawinanProps } from "@/components/kk-component/edit-data-section/data-perkawinan";
import { KondisiKhususProps } from "@/components/kk-component/edit-data-section/kondisi-khusus";
import { DataOrangtuaProps } from "@/components/kk-component/edit-data-section/data-orangtua";
import { hubunganKeluarga } from "@/components/kk-component/edit-data-section/data-pribadi";
import FileInput from "@/components/form-component/fileinput-component";
import AddingDataReason from "@/components/kk-component/edit-data-section/alasan-penambahan";

type dataKKProps = {
    jenis_data: string,
    kecamatan: string,
    desa: string,
    dusun: string,
    kode_pos: string,
    diwakilkan: boolean | null,
    nama_perwakilan?: string,
    nik_perwakilan?: string
}

type formDataProps = DataPribadiProps & DokumenIdentitasType & DataPerkawinanProps & KondisiKhususProps & DataOrangtuaProps

type dataKeluargaProps = {
    nama: string,
    status: string,
    jenis_kelamin: string,
}



type addAnddeleteDataProps = {
    alasan: string
}

export default function EditKK() {
    const [familyData, setFamilyData] = useState<Partial<dataKKProps>>({});
    const [formData, setFormData] = useState<Partial<formDataProps & addAnddeleteDataProps>>({})
    const [accordionActive, setAccordionActive] = useState<number>(1);
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [dataKKList, setDataKKList] = useState<Partial<formDataProps>[]>([]);
    const [isAddDataModalOpen, setIsAddDataModalOpen] = useState<boolean>(false);
    const [isEditDataModalOpen, setIsEditDataModalOpen] = useState<boolean>(false);
    const [isDeleteDataModalOpen, setIsDeleteDataModalOpen] = useState<boolean>(false);
    const [villages, setVillages] = useState<string[]>([]);
    const [isAllDocDownloaded, setAllDocDownloaded] = useState<boolean>(false);
    const [showDataAnggota, setShowDataAnggota] = useState<boolean>(false);
    const [activateSearch, setActivateSearch] = useState<boolean>(false);
    const [deletedData, setDeletedData] = useState<Partial<dataKeluargaProps & addAnddeleteDataProps>>({});
    const [addedData, setAddedData] = useState<Partial<dataKeluargaProps & addAnddeleteDataProps>>({});
    const [updatedData, setUpdatedData] = useState<Partial<dataKeluargaProps>>({});
    const [listUpdatedData, setListUpdatedData] = useState<dataKeluargaProps[]>([]);
    const [listDeletedData, setListDeletedData] = useState<Partial<dataKeluargaProps & addAnddeleteDataProps>[]>([]);
    const [listAddedData, setListAddedData] = useState<Partial<formDataProps & addAnddeleteDataProps>[]>([]);
    const [showDeletedData, setShowDeletedData] = useState<boolean>(false);
    const [showUpdatedData, setShowUpdatedData] = useState<boolean>(false);
    const [disableDelete, setDisableDelete] = useState<boolean>(true);
    const [dataAnggota, setDataAnggota] = useState<dataKeluargaProps[]>([
        {
            nama: 'I Wayan Yoga Sastrawan',
            status: 'Kepala Keluarga',
            jenis_kelamin: 'Laki-laki'
        },
        {
            nama: 'John Smith',
            status: 'Saudara',
            jenis_kelamin: 'Laki-laki'
        },
        {
            nama: 'Mariah Maclach',
            status: 'Istri',
            jenis_kelamin: 'Perempuan'
        }
    ])

    function submitData() {
        setAccordionActive(2);
        setIsEditDataModalOpen(false);
    }

    function nextToStep(value: number) {
        setCurrentStep(Math.max(accordionActive, value));
        setAccordionActive(value);
    }

    function getVillageList(subdistrict: string) {
        setVillages(VILLAGE_DATA[subdistrict]);
    }

    function openAddDataModal() {
        setAccordionActive(null);
        setIsEditDataModalOpen(true);
    }

    const handleCallback = useCallback((data: Partial<formDataProps & addAnddeleteDataProps>) => {
        setFormData(prev => ({
            ...prev,
            ...data
        }))
    }, [])

    function isAddFormComplete() {
        const basicValid: boolean = !!(formData.nama_lengkap &&
            formData.hubungan_keluarga &&
            formData.jenis_kelamin &&
            formData.golongan_darah &&
            formData.tempat_lahir &&
            formData.tanggal_lahir &&
            formData.agama &&
            formData.kewarganegaraan && 
            formData.pendidikan_terakhir &&
            formData.pekerjaan &&
            formData.no_akta_lahir &&
            formData.status_perkawinan &&
            formData.disabilitas &&
            formData.kelainan &&
            formData.nama_ayah && 
            formData.nik_ayah &&
            formData.nama_ibu && 
            formData.nik_ibu)

        if (formData.kewarganegaraan === 'WNA') {
            return !!(basicValid &&
                formData.no_paspor &&
                formData.tgl_akhir_paspor &&
                formData.tipe_sponsor &&
                formData.nama_sponsor &&
                formData.alamat_sponsor && 
                formData.dokumen_ijin_tinggal &&
                formData.no_kitas_kitap &&
                formData.tmp_terbit_kitas_kitap &&
                formData.tgl_terbit_kitas_kitap &&
                formData.tgl_akhir_kitas_kitap &&
                formData.tmp_datang_pertama &&
                formData.tgl_datang_pertama)
        }

        return basicValid;
    }

    const buatFormulirValid = () => {
        const { jenis_data, kecamatan, desa, dusun, kode_pos, diwakilkan, nama_perwakilan, nik_perwakilan } = familyData;

        const basicValid =
            jenis_data !== "" &&
            kecamatan !== "" &&
            desa !== "" &&
            dusun!== "" &&
            kode_pos !== "" &&
            diwakilkan !== null;

        if (diwakilkan === true) {
            return (
                basicValid &&
                nama_perwakilan !== "" &&
                nik_perwakilan !== ""
            );
        }

        return basicValid;
    };


    useEffect(() => {
        console.log("Accordion aktif saat ini: ", accordionActive);
        console.log("Stage saat ini: ", currentStep);
    }, [accordionActive, currentStep])

    useEffect(() => {
        console.log("Isi terbaru dari familyData:", familyData);
    }, [familyData]);

    useEffect(() => {
        console.log("Data form: ", formData)
    }, [formData])

    useEffect(() => {
        console.log("Tes Update data: ", updatedData)
    }, [updatedData])

    function deleteData(index : number) {
        const data : dataKeluargaProps = dataAnggota[index]
        setDataAnggota(prev => prev.filter((_, i) => i !== index));
    } 

    function updateData(index : number) {
        const data : dataKeluargaProps = dataAnggota[index]
        setUpdatedData(data);
        setIsEditDataModalOpen(true)
    }

    function saveAddData() {
        setListAddedData(prev => [...prev, formData as formDataProps])
        setFormData({});
        setIsAddDataModalOpen(false);
    }

    function cancelAddData(index: number) {
        setListAddedData(prev => prev.filter((_, i) => i = index));
    }

    function cancelUpdate(index: number) {
        const canceledData = listUpdatedData[index];
        setDataAnggota(prev => [...prev, canceledData]);
        setListUpdatedData(prev => prev.filter((_, i) => i !== index));
    }

    function cancelDelete(index: number) {
        const canceledData = listDeletedData[index];
        const validData: dataKeluargaProps = {
            nama: canceledData.nama || '',
            status: canceledData.status || '',
            jenis_kelamin: canceledData.jenis_kelamin || ''
        };
        setDataAnggota(prev => [...prev, validData]);
        setListDeletedData(prev => prev.filter((_, i) => i != index))
    }

    function saveData() {
        setShowUpdatedData(true);
        if (updatedData.nama && updatedData.status && updatedData.jenis_kelamin) { 
            setDataAnggota(prev => prev.filter(item => item.nama !== updatedData.nama));
            setListUpdatedData(prev => [...prev, updatedData as dataKeluargaProps]);
        }
        setIsEditDataModalOpen(false);
    }

    function selectDeletedData(index: number) {
        const data : dataKeluargaProps = dataAnggota[index]
        setDeletedData(data)
        setIsDeleteDataModalOpen(true);
    }

    function confirmDelete() {
        setDataAnggota(prev => prev.filter(item => item.nama !== deletedData.nama));
        setListDeletedData(prev => [...prev, deletedData as dataKeluargaProps]);
        setIsDeleteDataModalOpen(false);
        setDeletedData({} as dataKeluargaProps);
        setShowDeletedData(true); // untuk munculkan tabel
    }


    useEffect(() => {
        console.log("Data yang akan dihapus: ", deletedData.nama);
    }, [deletedData])

    useEffect(() => {
        setDisableDelete(!deletedData.alasan);
    }, [deletedData.alasan])


    return (
        <div>
            {/* Modal Tambah */}
            <Modal title={"Tambah Data Anggota Keluarga"} isOpen={isAddDataModalOpen} onClose={() =>  {
                setIsAddDataModalOpen(false);
            } }>
                <div className="sm:px-3 px-2 pb-7">
                    {/* Section data pribadi */}
                    <section>
                        <h1 className="text-md font-semibold">A. Alasan Penambahan</h1>
                        <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-6 gap-x-8 mt-5">
                            <DropdownComponent
                                getDropdownStatus={() => {}}
                                data={['Kelahiran', 'Menikah', 'Pindah datang', 'Adopsi']}
                                label="Alasan"
                                onChange={(data) => {handleCallback({alasan: data})}}
                                placeholder="Pilih alasan"
                            />
                        </div>
                    </section>
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <DataPribadiSection title="B. Data Pribadi" onChange={handleCallback} />
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <DokumenIdentitasSection addMode={isAddDataModalOpen} title="C. Dokumen Identitas" onChange={handleCallback}/>
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <DataPerkawinanSection addMode={isAddDataModalOpen} title="D. Data Perkawinan" onChange={handleCallback} />
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <KondisiKhususSection title="E. Kondisi Khusus" onChange={handleCallback}/>
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <DataOrangtuaSection addMode={isAddDataModalOpen} title="F. Data Orang Tua" onChange={handleCallback} />
                    <div className="flex justify-end pt-5">
                        {/* disabled={!buatFormulirValid()} nanti tambahkan disini */}
                        <Button onClick={() => saveAddData()} variant="primary" size={"md"} className={"bg-sky-600 text-white px-4 py-2"}>
                            Simpan
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Modal Hapus */}
            <Modal title={`Hapus Data Anggota Keluarga`} isOpen={isDeleteDataModalOpen} width="sm:w-[350px]" height="h-[200px]" onClose={() => {
                setIsDeleteDataModalOpen(false);
            }}>
                <>
                    <DropdownComponent 
                        getDropdownStatus={() => {}}
                        data={['Kesalahan data', 'Meninggal dunia', 'Perceraian', 'Pernikahan', 'Pindah Domisili', 'Pisah KK']} 
                        label={`Alasan pengurangan anggota "${deletedData.nama}"`}
                        onChange={(data) => { 
                            setDeletedData(prev => ({...prev, alasan: data}))}
                        }
                        placeholder="Pilih alasan"
                    />
                    <div className="flex justify-end mt-6">
                        <Button disabled={disableDelete} onClick={() => confirmDelete()} variant="primary" size={"md"} className={"bg-red-600 text-white px-4 py-2"}>
                            Hapus
                        </Button>
                    </div>
                </>
            </Modal>

            {/* Modal Edit */}
            <Modal title={"Edit Data Anggota Keluarga"} isOpen={isEditDataModalOpen} onClose={() =>  {
                setIsEditDataModalOpen(false);
                setUpdatedData({})
            } }>
                <div className="sm:px-3 px-2 pb-7">
                    {/* Section data pribadi */}
                    <DataPribadiSection defaultData={{nama: updatedData.nama, status: updatedData.status, jenis_kelamin: updatedData.jenis_kelamin }} title="A. Data Pribadi" onChange={handleCallback} />
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <DokumenIdentitasSection addMode={false} title="B. Dokumen Identitas" isWNA={formData.kewarganegaraan === 'WNA'} onChange={handleCallback}/>
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <DataPerkawinanSection addMode={false} title="C. Data Perkawinan" onChange={handleCallback} />
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <KondisiKhususSection title="D. Kondisi Khusus" onChange={handleCallback}/>
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <DataOrangtuaSection addMode={false} title="E. Data Orang Tua" onChange={handleCallback} />
                    <div className="flex justify-end pt-5">
                        {/* disabled={!buatFormulirValid()} nanti tambahkan disini */}
                        <Button onClick={() => saveData()} variant="primary" size={"md"} className={"bg-sky-600 text-white px-4 py-2"}>
                            Simpan
                        </Button>
                    </div>
                </div>
            </Modal>
            <div className="flex space-x-6 items-center pb-10">
                <Link href={"/"}>
                    <ArrowLeft />
                </Link>
                <h1 className="font-semibold text-xl t">Edit Kartu Keluarga</h1>
            </div>
            <div className="flex flex-col space-y-2">
                <Accordion 
                    title={"Infomasi Kartu Keluarga"} 
                    number={1} 
                    active={currentStep >= 1 } 
                    isOpen={accordionActive === 1} 
                    onToggle={(isOpen) => {
                        if (1 <= currentStep) {
                            setAccordionActive(isOpen ? 1 : 0);
                        }
                    }}
                >
                    <div className="py-4 flex space-x-3 items-end">
                        < InputComponent 
                            keyname="No_KK"
                            name="Nomor KK"
                            dataType="number"
                            onChange={(data) => {
                                data.length >= 8 ? (setActivateSearch(true)) : ((setActivateSearch(false)))
                            }}
                            placeholder="Masukkan nomor KK"
                        />
                        <Button disabled={!activateSearch} onClick={() => setShowDataAnggota(true)}  variant={"primary"} size={"md"} className={"bg-sky-600 text-white sm:px-8 px-2 h-9"}>
                            Cari
                        </Button>
                    </div>
                    { showDataAnggota && (
                        <div>
                            <h3>Data Kartu Keluarga</h3>
                            <div className="overflow-x-auto">
                                <table className="sm:w-full w-max">
                                    <thead>
                                        <tr className="bg-gray-600 w-full">
                                            <th className="text-left w-[200px] px-5 text-white">Nama</th>
                                            <th className="text-left w-[250px] text-white">Status Dalam Keluarga</th>
                                            <th className="text-center text-white">Perubahan Data</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-medium">
                                        { dataAnggota.map((item, index)=> (
                                            <tr key={index} className="font-medium border-b border-gray-400">
                                                <th className="font-medium text-left px-5">{item.nama}</th>
                                                <th className="font-medium text-left">{item.status}</th>
                                                <th className="flex space-x-2 px-5">
                                                    <Button onClick={() => updateData(index)} className={'bg-yellow-600 cursor-pointer my-2 text-white px-4 py-1'} size={'md'} variant={'primary'}>
                                                        Ubah
                                                    </Button>
                                                    <Button onClick={() => selectDeletedData(index)} className={'bg-red-600 my-2 cursor-pointer text-white px-4 py-1'} size={'md'} variant={'primary'}>
                                                        Hapus
                                                    </Button>
                                                </th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mb-7 mt-3 flex justify-center ">
                                <Button onClick={() => {setIsAddDataModalOpen(true)}} className={'border-2 rounded-md border-sky-600 text-sky-600 px-4 py-1'} size={'md'} variant={'primary'}>
                                    Tambah data baru
                                </Button>
                            </div>
                            {/* <span className="text-gray-500 text-sm mt-4">Pilih jenis perubahan di kolom <b>Perubahan Data</b></span> */}
                        </div>
                    )}

                    {/* Tabel Ubah Data */}
                     { showUpdatedData && updatedData && listUpdatedData.length > 0 && (
                        <div className="pt-8">
                            <h3>Data yang berubah</h3>
                            <div className="overflow-x-auto">
                                <table className="sm:w-full w-max">
                                    <thead className="">
                                        <tr className="bg-gray-600 w-full">
                                            <th className="text-left px-5 w-[200px] text-white">Nama</th>
                                            <th className="text-left w-[250px] text-white">Data yang berubah</th>
                                            <th className="text-center text-white">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-medium">
                                        { listUpdatedData.map((item, index)=> (
                                            <tr key={index} className="font-medium border-b border-gray-400">
                                                <th className="font-medium text-left px-5">{item.nama}</th>
                                                <th className="font-medium text-left">Status Perkawinan</th>
                                                <th className="flex space-x-2 px-5">
                                                    <Button onClick={() => updateData(index)} className={'bg-yellow-600 cursor-pointer my-2 text-white px-4 py-1'} size={'md'} variant={'primary'}>
                                                        Ubah
                                                    </Button>
                                                    <Button onClick={() => cancelUpdate(index)} className={'bg-red-600 my-2 cursor-pointer text-white px-4 py-1'} size={'md'} variant={'primary'}>
                                                        Batal
                                                    </Button>
                                                </th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Tabel Hapus */}
                    { listDeletedData.length > 0 && (
                        <div className="pt-8">
                            <h3>Data yang dihapus</h3>
                            <div className="overflow-x-auto">
                                <table className="sm:w-full w-max">
                                    <thead className="">
                                        <tr className="bg-gray-600 w-full">
                                            <th className="text-left w-[200px] px-5 text-white">Nama</th>
                                            <th className="text-left w-[250px] text-white">Alasan dihapus</th>
                                            <th className="text-center text-white">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-medium">
                                        { listDeletedData.map((item, index)=> (
                                            <tr key={index} className="font-medium border-b border-gray-400">
                                                <th className="font-medium text-left px-5">{item.nama}</th>
                                                <th className="font-medium text-left">{item.alasan}</th>
                                                <th className="flex justify-center space-x-2 px-5">
                                                    <Button onClick={() => cancelDelete(index)} className={'bg-red-600 my-2 cursor-pointer text-white px-4 py-1'} size={'md'} variant={'primary'}>
                                                        Batal
                                                    </Button>
                                                </th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Tabel Tambah Data  */}
                    { listAddedData.length > 0 && (
                        <div className="pt-8">
                            <h3>Data yang ditambahkan</h3>
                            <div className="overflow-x-auto">
                                <table className="sm:w-full w-max">
                                    <thead className="">
                                        <tr className="bg-gray-600 w-full">
                                            <th className="text-left w-[200px] px-5 text-white">Nama</th>
                                            <th className="text-left w-[250px] text-white">Alasan penambahan</th>
                                            <th className="text-center text-white">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-medium">
                                        { listAddedData.map((item, index)=> (
                                            <tr key={index} className="font-medium border-b border-gray-400">
                                                <th className="font-medium text-left px-5">{item.nama_lengkap}</th>
                                                <th className="font-medium text-left">{item.alasan}</th>
                                                <th className="flex justify-center space-x-2 px-5">
                                                    <Button onClick={() => cancelAddData(index)} className={'bg-red-600 my-2 cursor-pointer text-white px-4 py-1'} size={'md'} variant={'primary'}>
                                                        Batal
                                                    </Button>
                                                </th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    { (listDeletedData.length > 0 || listUpdatedData.length > 0 || listAddedData.length > 0) && (
                        <div className="flex justify-end pt-10">
                            {/* disabled={!buatFormulirValid()} nanti tambahkan disini */}
                            <Button onClick={() => nextToStep(2)} variant="primary" size={"md"} className={"bg-sky-600 text-white px-4 py-2"}>
                                Lanjut
                            </Button>
                        </div>
                    ) }
                </Accordion>
                <Accordion
                    title={"Download Formulir"} 
                    number={2} 
                    active={currentStep >= 2} 
                    isOpen={accordionActive === 2} 
                    onToggle={(isOpen) => {
                        if (2 <= currentStep) {
                            setAccordionActive(isOpen ? 2 : 0);
                        }
                    }}
                >
                    <div>
                        <h3 className="text-sm py-4 text-gray-400">Unduh Formulir ini dan lakukan pengisian tandatangan/materai. Anda harus mengupload file dalam bentuk pdf</h3>
                        <div className="flex flex-col space-y-1">
                            <span className="flex items-center space-x-2">
                                {isAllDocDownloaded ? (<Check size={18} />) : (<Download size={18} />)}
                                <p>Formulir Isian KK</p>
                            </span>
                            <span className="flex items-center space-x-2">
                                {isAllDocDownloaded ? (<Check size={18} />) : (<Download size={18} />)}
                                <p>Pendaftaran Peristiwa Kependudukan</p>
                            </span>
                            <span className="flex items-center space-x-2">
                                {isAllDocDownloaded ? (<Check size={18} />) : (<Download size={18} />)}
                                <p>Pernyataan Perubahan Elemen</p>
                            </span>
                        </div>
                        <div className="pt-4 flex justify-end">
                            <button 
                                onClick={() => {
                                    if (isAllDocDownloaded) {
                                        nextToStep(3);
                                    } else {
                                        setAllDocDownloaded(true);
                                    }   
                                }} 
                                className="flex gap-2 transition-all duration-500 ease-in-out items-center cursor-pointer bg-sky-600 px-4 py-2 rounded-md text-white sm:text-base text-sm"
                            >
                                <span>{isAllDocDownloaded ? 'Lanjut' : 'Download semua'}</span>
                            </button>
                        </div>
                    </div>
                </Accordion>
                <Accordion
                    title={"Upload Formulir"} 
                    number={3} 
                    active={currentStep >= 3} 
                    isOpen={accordionActive === 3} 
                    onToggle={(isOpen) => {
                        if (3 <= currentStep) {
                            setAccordionActive(isOpen ? 3 : 0);
                        }
                    }}
                >
                    <>
                        <h3 className="text-sm py-4 text-gray-400">Lakukan upload file yang sudah diisi tandatangan/materai</h3>
                        <div className="flex flex-col space-y-3">
                            <FileInput onChange={() => {}} id="form_isian_kk" label="Formulir Isian KK" />
                            <FileInput onChange={() => {}} id="pendaftaran_peristiwa" label="Pendaftaran Peristiwa Kependudukan" />
                            <FileInput onChange={() => {}} id="perubahan_elemen" label="Pernyataan Perubahan Elemen" />
                            <FileInput onChange={() => {}} id="kk" label="Scan Kartu Keluarga" />
                        </div>
                        <div className="pt-10 flex justify-end">
                            <Link href={"/"}>
                                <button onClick={() => nextToStep(3)} className="flex gap-2 transition-all duration-500 ease-in-out items-center cursor-pointer bg-sky-600 px-4 py-2 rounded-md text-white sm:text-base text-sm">
                                    <span>Simpan</span>
                                </button>
                            </Link>
                        </div>
                    </>
                </Accordion>
            </div>
        </div>
    );
}