"use client";
import { ArrowLeft, Check, ChevronDown, CircleAlertIcon, Download, Pencil, SquarePen, Trash2 } from "lucide-react";
import Accordion from "@/components/accordion";
import { VILLAGE_DATA } from "@/lib/config";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Modal from "@/components/modal";
import Link from "next/link";
import DataPribadiSection from "@/components/kk-component/add-data-section/data-pribadi";
import InputComponent from "@/components/form-component/input-component";
import RadioComponent from "@/components/form-component/radio-component";
import DropdownComponent from "@/components/form-component/dropdown-component";
import { DataType } from "@/components/form-component/input-component";
import DokumenIdentitasSection from "@/components/kk-component/add-data-section/dokumen-identitas";
import DataPerkawinanSection from "@/components/kk-component/add-data-section/data-perkawinan";
import KondisiKhususSection from "@/components/kk-component/add-data-section/kondisi-khusus";
import DataOrangtuaSection from "@/components/kk-component/add-data-section/data-orangtua";
import { DataPribadiProps } from "@/components/kk-component/add-data-section/data-pribadi";
import { DokumenIdentitasType } from "@/components/kk-component/add-data-section/dokumen-identitas";
import { DataPerkawinanProps } from "@/components/kk-component/add-data-section/data-perkawinan";
import { KondisiKhususProps } from "@/components/kk-component/add-data-section/kondisi-khusus";
import { DataOrangtuaProps } from "@/components/kk-component/add-data-section/data-orangtua";
import FileInput from "@/components/form-component/fileinput-component";
import { ServiceProps, deleteDataTemp, deleteDataTempByIdx, getDataTempAll, getDataTempByIdx, saveToLocalStorage, saveToLocalStorageTemp, updateDataTempById } from "@/lib/save-to-local-storage";
import { SubmitDataHelper } from "@/helper/submitDataHelper";
import { useAuth } from "@/context/authContext";
import Alert from "@/components/alert";

export type formDataProps = DataPribadiProps & DokumenIdentitasType & DataPerkawinanProps & KondisiKhususProps & DataOrangtuaProps
export type dataKKProps = {
    jenis_data: string,
    kecamatan: string,
    desa: string,
    dusun: string,
    kode_pos: string,
    diwakilkan: boolean | null,
    nama_perwakilan?: string,
    nik_perwakilan?: string,
    data_keluarga?: formDataProps[]
}


export default function NewKK() {
    const auth = useAuth()
    const [familyData, setFamilyData] = useState<Partial<dataKKProps>>({});
    const [formData, setFormData] = useState<Partial<formDataProps>>({})
    const [accordionActive, setAccordionActive] = useState<number>(1);
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [dataKKList, setDataKKList] = useState<Partial<formDataProps>[]>([]);
    const [isAddDataModalOpen, setIsAddDataModalOpen] = useState<boolean>(false);
    const [isEditDataModalOpen, setIsEditDataModalOpen] = useState<boolean>(false);
    const [OldData, setOldData] = useState<formDataProps>(null);
    const [EditedData, setEditedData] = useState<formDataProps>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [isDelConfirmModalOpen, setDelConfirmModalOpen] = useState<boolean>(false);
    const [indexToDelete, setIndexToDelete] = useState<number>(null);
    const [indexToEdit, setIndexToEdit] = useState<number>(null);
    const [villages, setVillages] = useState<string[]>([]);
    const [isAllDocDownloaded, setAllDocDownloaded] = useState<boolean>(false);

    const router = useRouter();

    function submitData() {
        setAccordionActive(2);
        setIsAddDataModalOpen(false);
    }

    useEffect(() => {
        return () => {
            // Hapus local storage temp ketika komponen ditinggalkan
            deleteDataTemp();
        }
    }, [])

    function extractDataPribadi(data: formDataProps): DataPribadiProps {
        const keys = Object.keys(data).filter(key =>
            key in ({} as DataPribadiProps)
        ) as (keyof DataPribadiProps)[];

        return keys.reduce((acc, key) => {
            acc[key] = data[key];
            return acc;
        }, {} as DataPribadiProps);
    }


    function addDataToList() {
        saveToLocalStorageTemp(formData as any);
        setFormData({});
        setIsAddDataModalOpen(false);
        const listKK = getDataTempAll()
        setDataKKList(listKK);
    }

    function DeleteDataFromList(){
        if (indexToDelete !== null) {
            deleteDataTempByIdx(indexToDelete);
            const listKK = getDataTempAll()
            setDataKKList(listKK);
        }

        setDelConfirmModalOpen(false)
    }

    function ConfirmDelete(index: number) {
        setDelConfirmModalOpen(true)
        setIndexToDelete(index);
    }

    function EditData(index: number) {
        setIsEditDataModalOpen(true)
        setIndexToEdit(index);

        const data: formDataProps = getDataTempByIdx(index)
        setOldData(data)
    }

    function SaveEditedData() {
        updateDataTempById(indexToEdit, EditedData)
        setIsEditDataModalOpen(false)
        const listKK = getDataTempAll()
        setDataKKList(listKK);
    }

    async function saveData() {
        const datetimeNow = new Date(); 
        const listKK = getDataTempAll();

        // Buat final object tanpa menunggu state
        const finalData: dataKKProps = {
            ...familyData,
            data_keluarga: listKK
        } as dataKKProps;

        const new_data: ServiceProps = {
            serviceName: "Buat Kartu Keluarga",
            serviceType: "KK",
            description: "Pengajuan pembuatan kartu keluarga baru",
            createdAt: new Date(),
            userId: auth.id,
            userName: auth.name,
            data: finalData
        };

        try {
            const res = await SubmitDataHelper("/api/pengajuan", new_data)
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                router.push('/');
            }, 2000)
            console.log(res)
        } catch (error) {
            console.error(error)
        }
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
        setIsAddDataModalOpen(true);
    }

    const handleCallback = useCallback((data: Partial<formDataProps>) => {
        setFormData(prev => ({
            ...prev,
            ...data
        }))
    }, [])

    const handleUpdateData = useCallback((data: Partial<formDataProps>) => {
        setEditedData(prev => ({
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
        console.log(formData)
    }, [formData])


    return (
        <div>
             {/* Alert */}
            <Alert title="Berhasil membuat pengajuan" isShow={showAlert} onClose={(data) => setShowAlert(false)} prefixIcon={<CircleAlertIcon className="text-green-800" />} />

            <Modal title="Hapus record" width="w-[400px]" height="h-[100px]" isOpen={isDelConfirmModalOpen} onClose={() => setDelConfirmModalOpen(false)}>
                <div className="text-center py-3">
                    Yakin ingin menghapus record ini?
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Button onClick={() => setDelConfirmModalOpen(false)} variant={"normal"} size={"md"} className={"border py-2 cursor-pointer"}>
                        Batal
                    </Button>
                    <Button onClick={() => DeleteDataFromList()} variant={"primary"} size={"md"} className={"bg-red-600 text-white cursor-pointer"}>
                        Hapus
                    </Button>
                </div>
            </Modal>

            {/* Modal Create*/}
            <Modal title={"Tambah Data Anggota Keluarga"} isOpen={isAddDataModalOpen} onClose={() => setIsAddDataModalOpen(false)}>
                <div className="sm:px-3 px-2">
                    {/* Section data pribadi */}
                    <DataPribadiSection title="A. Data Pribadi" onChange={handleCallback} />
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <DokumenIdentitasSection addMode={isAddDataModalOpen} title="B. Dokumen Identitas" isWNA={formData.kewarganegaraan === 'WNA'} onChange={handleCallback}/>
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <DataPerkawinanSection title="C. Data Perkawinan" onChange={handleCallback} />
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <KondisiKhususSection title="D. Kondisi Khusus" onChange={handleCallback}/>
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <DataOrangtuaSection title="E. Data Orang Tua" onChange={handleCallback} />
                    <div className="flex justify-end pt-5">
                        {/* disabled={!buatFormulirValid()} nanti tambahkan disini */}
                        <Button disabled={!isAddFormComplete()} onClick={() => addDataToList()} variant="primary" size={"md"} className={"bg-sky-600 text-white px-4 py-2"}>
                            Simpan
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Modal Update*/}
            <Modal title={"Ubah Data Anggota Keluarga"} isOpen={isEditDataModalOpen} onClose={() => setIsEditDataModalOpen(false)}>
                <div className="sm:px-3 px-2">
                    {/* Section data pribadi */}
                    <DataPribadiSection defaultValue={OldData} title="A. Data Pribadi" onChange={handleUpdateData} />
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <DokumenIdentitasSection defaultValue={OldData} addMode={isAddDataModalOpen} title="B. Dokumen Identitas" isWNA={formData.kewarganegaraan === 'WNA'} onChange={handleUpdateData}/>
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <DataPerkawinanSection defaultValue={OldData} title="C. Data Perkawinan" onChange={handleUpdateData} />
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <KondisiKhususSection defaultValue={OldData} title="D. Kondisi Khusus" onChange={handleUpdateData}/>
                    <div className="w-full border-gray-400 my-7 border"></div>
                    <DataOrangtuaSection defaultValue={OldData} title="E. Data Orang Tua" onChange={handleUpdateData} />
                    <div className="flex justify-end pt-5">
                        {/* disabled={!buatFormulirValid()} nanti tambahkan disini */}
                        <Button onClick={() => SaveEditedData()} variant="primary" size={"md"} className={"bg-sky-600 text-white px-4 py-2"}>
                            Simpan
                        </Button>
                    </div>
                </div>
            </Modal>

            <div className="flex space-x-6 items-center pb-10">
                <Link href={"/"}>
                    <ArrowLeft />
                </Link>
                <h1 className="font-semibold text-xl t">Buat Kartu Keluarga</h1>
            </div>
            <div className="flex flex-col space-y-2">
                <Accordion 
                    title={"Buat Formulir"} 
                    number={1} 
                    active={currentStep >= 1 } 
                    isOpen={accordionActive === 1} 
                    onToggle={(isOpen) => {
                        if (1 <= currentStep) {
                            setAccordionActive(isOpen ? 1 : 0);
                        }
                    }}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 pt-4 gap-6">
                        <div className="sm:col-span-2">
                            <RadioComponent 
                                name={"Jenis Data Keluarga"} 
                                cols={"md:grid-cols-3"} 
                                item={['WNI Dalam Negeri', 'WNA Dalam Negeri', 'WNI Luar Negeri']} 
                                onChange={(data) => setFamilyData(prev => ({
                                    ...prev, jenis_data: data
                                }))} 
                            />
                        </div>
                        <DropdownComponent
                            getDropdownStatus={() => {}}
                            data={Object.keys(VILLAGE_DATA)}
                            label="Kecamatan"
                            placeholder="Pilih kecamatan"
                            onChange={(data) => {
                                getVillageList(data);
                                setFamilyData(prev => ({
                                    ...prev, kecamatan: data
                                }))
                            }}
                            />
                        <DropdownComponent
                            getDropdownStatus={() => {}}
                            data={villages}
                            label="Desa"
                            placeholder="Pilih desa"
                            onChange={(data) => {
                                setFamilyData(prev => ({
                                    ...prev, desa: data
                                }))
                            }}
                            />
                        <InputComponent 
                            name={"Dusun"} 
                            dataType={DataType.Text} 
                            keyname={"dusun"} 
                            placeholder={"Masukkan nama dusun"} 
                            onChange={(data) => {
                                setFamilyData(prev => ({
                                    ...prev, dusun: data
                                }))
                            }}
                        />
                        <InputComponent 
                            name={"Kode Pos"} 
                            dataType={DataType.Number} 
                            keyname={"kode_pos"} 
                            placeholder={"Masukkan kode pos"} 
                            onChange={(data) => {
                                setFamilyData(prev => ({
                                    ...prev, kode_pos: data
                                }))
                            }} 
                        />
                        <div className="sm:col-span-2">
                            <RadioComponent 
                                name={"Apakah pembuatan data ini diwakilkan oleh orang lain?"} 
                                cols="md:grid-cols-2" 
                                item={['Ya', 'Tidak']} 
                                onChange={(data) => {
                                    console.log(data)
                                    if (data == 'Ya') {
                                        setFamilyData(prev => ({
                                            ...prev, diwakilkan: true
                                        }));
                                    } else {
                                        setFamilyData(prev => ({
                                            ...prev, 
                                            diwakilkan: false, 
                                            nama_perwakilan: '',
                                            nik_perwakilan: ''
                                        }));
                                    }
                                }} 
                            />
                        </div>
                        { familyData.diwakilkan && (
                            <>
                                <InputComponent 
                                    name={"Nama Perwakilan"} 
                                    dataType={DataType.Text} 
                                    keyname={"nama_perwakilan"} 
                                    placeholder={"Masukkan nama perwakilan"} 
                                    onChange={(data) => {
                                        setFamilyData(prev => ({
                                            ...prev, nama_perwakilan: data
                                        }))
                                    }} 
                                />
                                <InputComponent 
                                    name={"NIK Perwakilan"} 
                                    dataType={DataType.Number} 
                                    keyname={"nik_perwakilan"} 
                                    placeholder={"Masukkan NIK"} 
                                    onChange={(data) => {
                                        setFamilyData(prev => ({
                                            ...prev, nik_perwakilan: data
                                        }))
                                    }} 
                                />
                            </>
                        ) }
                    </div>
                    <div className="flex justify-end pt-5">
                        {/* disabled={!buatFormulirValid()} nanti tambahkan disini */}
                        <Button onClick={() => nextToStep(2)} disabled={!buatFormulirValid()} variant="primary" size={"md"} className={"bg-sky-600 text-white px-4 py-2"}>
                            Lanjut
                        </Button>
                    </div>
                </Accordion>
                <Accordion 
                    title={"Buat Data Keluarga"} 
                    number={2} 
                    active={currentStep >= 2} 
                    isOpen={accordionActive === 2} 
                    onToggle={(isOpen) => {
                        if (2 <= currentStep) {
                            setAccordionActive(isOpen ? 2 : 0);
                        }
                    }}
                >
                    <p className="py-4 text-sm text-gray-400">Tambahkan data anggota keluarga secara lengkap</p>
                    { dataKKList.length !== 0 && dataKKList.map((item, index) => (
                        <div key={index} className="py-2 border-b border-gray-300 justify-between flex items-center">
                            <div>
                                { item.nama_lengkap} 
                            </div>
                            <div className="flex gap-3">
                                <Trash2 onClick={() => ConfirmDelete(index)} className="text-black" />
                                <SquarePen onClick={() => EditData(index)} className="text-black" />
                            </div>
                        </div>
                    )) }
                    <div className={`flex pt-8 ${ dataKKList.length > 0 ? 'justify-between' : 'justify-center' }`}>
                        <button onClick={() => setIsAddDataModalOpen(true)} className="flex gap-2 transition-all duration-500 ease-in-out items-center cursor-pointer border-2 border-sky-600 px-4 py-2 rounded-md text-sky-600 font-semibold sm:text-base text-sm">
                            <span>Tambah data</span>
                        </button>
                        { dataKKList.length > 0 &&
                            <button onClick={() => nextToStep(3)} className="flex gap-2 transition-all duration-500 ease-in-out items-center cursor-pointer bg-sky-600 px-4 py-2 rounded-md text-white sm:text-base text-sm">
                                <span>Lanjut</span>
                            </button>
                        }
                    </div>
                </Accordion>
                <Accordion
                    title={"Download Formulir"} 
                    number={3} 
                    active={currentStep >= 3} 
                    isOpen={accordionActive === 3} 
                    onToggle={(isOpen) => {
                        if (3 <= currentStep) {
                            setAccordionActive(isOpen ? 3 : 0);
                        }
                    }}
                >
                    <div>
                        <h3 className="text-sm py-4 text-gray-400">Unduh Formulir ini dan lakukan pengisian tandatangan/materai</h3>
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
                                        nextToStep(4);
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
                    number={4} 
                    active={currentStep >= 4} 
                    isOpen={accordionActive === 4} 
                    onToggle={(isOpen) => {
                        if (4 <= currentStep) {
                            setAccordionActive(isOpen ? 4 : 0);
                        }
                    }}
                >
                    <>
                        <h3 className="text-sm py-4 text-gray-400">Lakukan upload file yang sudah diisi tandatangan/materai. Anda harus mengupload file dalam bentuk pdf</h3>
                        <div className="flex flex-col space-y-3">
                            <FileInput onChange={() => {}} id="form_isian_kk" label="Formulir Isian KK" />
                            <FileInput onChange={() => {}} id="pendaftaran_peristiwa" label="Pendaftaran Peristiwa Kependudukan" />
                            <FileInput onChange={() => {}} id="perubahan_elemen" label="Pernyataan Perubahan Elemen" />
                        </div>
                        <div className="pt-10 flex justify-end">
                            <button onClick={() => saveData()} className="flex gap-2 transition-all duration-500 ease-in-out items-center cursor-pointer bg-sky-600 px-4 py-2 rounded-md text-white sm:text-base text-sm">
                                <span>Simpan</span>
                            </button>
                        </div>
                    </>
                </Accordion>
            </div>
        </div>
    );
}