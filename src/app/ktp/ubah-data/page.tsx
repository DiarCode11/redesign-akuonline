"use client";
import Accordion from "@/components/accordion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import InputComponent from "@/components/form-component/input-component";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Download } from "lucide-react";
import FileInput from "@/components/form-component/fileinput-component";
import CheckboxComponent from "@/components/form-component/checkbox-component";
import { stat } from "fs";
import DropdownComponent from "@/components/form-component/dropdown-component";
import DatePickerComponent from "@/components/form-component/datepicker-component";

type CheckedProps = {
    nama: boolean,
    tempat_lahir: boolean,
    tgl_lahir: boolean,
    agama: boolean,
    alamat: boolean,
    pekerjaan: boolean,
    perkawinan: boolean,
    kewarganegaraan: boolean
}

export default function EditKTP() {
    const [accordionActive, setAccordionActive] = useState<number>(1);
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [overflowStatus, setOverflowStatus] = useState<boolean>(true);
    const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(true);
    const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
    const [isAllDocDownloaded, setAllDocDownloaded] = useState<boolean>(false);
    const [NIKPemohon, setNIKPemohon] = useState<string>('');
    const [buttonActive, setButtonActive] = useState<boolean>(false);
    const [checkClicked, setCheckClicked] = useState<boolean>(false);
    const [currentNIK, setCurrentNIK] = useState<string>('');
    const [scheduleCreated, setScheduleCreated] = useState<boolean>(false);
    const [checkboxStatus, setCheckboxStatus] = useState<Partial<CheckedProps>>({});
    const [jenisPerubahanSelected, setJenisPerubahanSelected] = useState<boolean>(false);

    function accordionStatus(status: boolean) {
        if (!status) {
            setOverflowStatus(true);
            setIsOpenCalendar(false);

        } else {
            const timeOut = setTimeout(() => {
                setOverflowStatus(false);
            }, 100);
            // Clean up
            return () => clearTimeout(timeOut);
        }
    }
    // Ketika Accordion Open
    useEffect(() => {
        // Ketika accordion ditutup
        accordionStatus(isAccordionOpen);
    }, [isAccordionOpen]);

    useEffect(() => {
        if (NIKPemohon !== currentNIK) {
            setCheckClicked(false);
        }
        if (NIKPemohon.length > 0) {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }, [NIKPemohon]);

    useEffect(() => {
        const atLeastOneTruthy = Object.values(checkboxStatus).some(Boolean);
        console.log("jenis Perubahan selected: ", atLeastOneTruthy);
        if (atLeastOneTruthy) {
            setJenisPerubahanSelected(true);
        } else {
            setJenisPerubahanSelected(false);
        }
    }, [checkboxStatus, jenisPerubahanSelected]);

    function nextStep(step: number) {
        setCurrentStep(step);
        setAccordionActive(step);
    }

    function submitNIK() {
        setCurrentNIK(NIKPemohon);
        setCheckClicked(true);
    }

    return (
        <>
            <div className="flex space-x-6 items-center pb-10">
                <Link href={"/"}>
                    <ArrowLeft />
                </Link>
                <h1 className="font-semibold text-xl t">Perubahan Data KTP</h1>
            </div>
            <div className="flex flex-col space-y-2">
                <Accordion
                    title={"Informasi Pemohon"} 
                    number={1} 
                    bulletColor="bg-green-600"
                    active={currentStep >= 1 } 
                    isOpen={accordionActive === 1} 
                    setOverflow={overflowStatus}
                    onToggle={(isOpen) => {
                        console.log("status accordion: ", isOpen)
                        setIsAccordionOpen(isOpen);
                        if (1 <= currentStep) {
                            setAccordionActive(isOpen ? 1 : 0);
                        }
                    }}
                >
                    <div className="py-4 flex items-end space-x-3 z-0">
                        <InputComponent 
                            keyname="No_KK"
                            name="NIK"
                            dataType="number"
                            onChange={(data) => {
                                setNIKPemohon(data);
                            }}
                            placeholder="Masukkan NIK"
                        />
                        <Button onClick={() => submitNIK()} className={"bg-sky-600 cursor-pointer h-10 text-white px-5"} size={'md'} variant={'primary'} disabled={!buttonActive}>
                            Cek
                        </Button>
                    </div>
                    
                    {checkClicked && (
                        <>
                            <div className="">
                                <span className="">
                                    <h3 className="font-semibold text-sm">Data ditemukan:</h3>
                                    <p className=" text-sm">I Wayan Yoga Sastrawan</p>
                                </span>
                            </div>
                            <div className="pt-10 flex justify-end">
                                <Button 
                                    onClick={() => {
                                        nextStep(2)
                                        setOverflowStatus(true);
                                    } } 
                                    className={'bg-sky-600 text-white px-4 py-2'} 
                                    size={'md'} 
                                    variant={'primary'}
                                >
                                    Lanjut
                                </Button>
                            </div>
                        </>
                    )}
                </Accordion>

                {/* Accordion 2 */}
                <Accordion
                    active={currentStep >= 2}
                    number={2}
                    title="Jenis Perubahan"
                    isOpen={accordionActive === 2}
                    bulletColor="bg-green-600"
                    onToggle={(isOpen) => {
                        if (2 <= currentStep) {
                            setAccordionActive(isOpen ? 2 : 0);
                        }
                    }}
                >
                    <>
                        <h3 className="py-2 font-semibold">Komponen yang berubah</h3>
                        <CheckboxComponent id="Nama" isChecked={(status) => {setCheckboxStatus(prev => ({...prev, nama: !status}))}} label="Nama" />
                        {checkboxStatus.nama && (
                            <div className="grid sm:grid-cols-2 grid-cols-1 pl-3 ml-1.5 my-3 border-l border-gray-500 gap-4">
                                <InputComponent disabled={true} keyname="currentName" name="Sebelumnya" onChange={() => {}} placeholder="" defaultValue="I Wayan Yoga Sastrawan" />
                                <InputComponent keyname="newName" name="Menjadi" onChange={() => {}} placeholder="Masukkan nama baru" />
                            </div>
                        )}
                        <CheckboxComponent id="tempat_lahir" isChecked={(status) => {setCheckboxStatus(prev => ({...prev, tempat_lahir: !status}))}} label="Tempat Lahir" />
                        {checkboxStatus.tempat_lahir && (
                            <div className="grid sm:grid-cols-2 grid-cols-1 pl-3 ml-1.5 my-3 border-l border-gray-500 gap-4">
                                <InputComponent keyname="currentAgama" name="Sebelumnya" onChange={() => {}} placeholder="" disabled={true} defaultValue="Kintamani" />
                                <InputComponent keyname="newAgama" name="Menjadi" onChange={() => {}} placeholder="Masukkan nama baru" />
                            </div>
                        )}
                        <CheckboxComponent id="tgl_lahir" isChecked={(status) => {setCheckboxStatus(prev => ({...prev, tgl_lahir: !status}))}} label="Tanggal Lahir" />
                        {checkboxStatus.tgl_lahir && (
                            <div className="grid sm:grid-cols-2 grid-cols-1 pl-3 ml-1.5 my-3 border-l border-gray-500 gap-4">
                                <InputComponent keyname="currentAgama" name="Sebelumnya" onChange={() => {}} placeholder="" disabled={true} defaultValue="31-12-2000" />
                                <DatePickerComponent label="Menjadi" onChange={() => {}} getToggleStatus={() => {}} />
                            </div>
                        )}
                        <CheckboxComponent id="Agama" isChecked={(status) => {setCheckboxStatus(prev => ({...prev, agama: !status}))}} label="Agama" />
                        {checkboxStatus.agama && (
                            <div className="grid sm:grid-cols-2 grid-cols-1 pl-3 ml-1.5 my-3 border-l border-gray-500 gap-4">
                                <InputComponent keyname="currentAgama" name="Sebelumnya" onChange={() => {}} placeholder="" disabled={true} defaultValue="Hindu" />
                                <DropdownComponent getDropdownStatus={() => {}} data={[]} label="Menjadi" onChange={() => {}} placeholder="Pilih Agama"/>
                            </div>
                        )}
                        <CheckboxComponent id="Alamat" isChecked={(status) => {setCheckboxStatus(prev => ({...prev, alamat: !status}))}} label="Alamat" />
                        {checkboxStatus.alamat && (
                            <>
                                <div className="grid sm:grid-cols-2 grid-cols-1 pl-3 ml-1.5 my-3 border-l border-gray-500 gap-4">
                                    <InputComponent keyname="currentName" name="Provinsi Sebelumnya" onChange={() => {}} placeholder="" defaultValue="BALI"  disabled={true} />
                                    <DropdownComponent getDropdownStatus={() => {}} data={[]} label="Provinsi Saat Ini" onChange={() => {}} placeholder="Pilih Provinsi"/>
                                    <span className="w-full h-1 sm:col-span-2 border-gray-200 border-b"></span>
                                    
                                    <InputComponent keyname="currentName" name="Kabupaten Sebelumnya" onChange={() => {}} placeholder="" defaultValue="BANGLI" disabled={true} />
                                    <DropdownComponent getDropdownStatus={() => {}} data={[]} label="Kabupaten Saat Ini" onChange={() => {}} placeholder="Pilih Kabupaten"/>
                                    <span className="w-full h-1 sm:col-span-2 border-gray-200 border-b"></span>
                                    
                                    <InputComponent keyname="currentName" name="Kecamatan Sebelumnya" onChange={() => {}} placeholder="" defaultValue="KINTAMANI" disabled={true} />
                                    <DropdownComponent getDropdownStatus={() => {}} data={[]} label="Kecamatan Saat Ini" onChange={() => {}} placeholder="Pilih Kecamatan"/>
                                    <span className="w-full h-1 sm:col-span-2 border-gray-200 border-b"></span>
                                    
                                    <InputComponent keyname="currentName" name="Desa Sebelumnya" onChange={() => {}} placeholder="" defaultValue="YANGAPI" disabled={true} />
                                    <DropdownComponent getDropdownStatus={() => {}} data={[]} label="Desa Saat Ini" onChange={() => {}} placeholder="Pilih Desa"/>
                                    <span className="w-full h-1 sm:col-span-2 border-gray-200 border-b"></span>
                                    
                                    <InputComponent keyname="currentName" name="RT/RW/Banjar Dinas Sebelumnya" onChange={() => {}} placeholder="" defaultValue="QWERTY" disabled={true} />
                                    <InputComponent keyname="newName" name="RT/RW/Banjar Dinas Saat Ini" onChange={() => {}} placeholder="Masukkan nama baru" />
                                    <span className="w-full h-1 sm:col-span-2 border-gray-200 border-b"></span>
                                </div>
                            </>
                        )}
                        <CheckboxComponent id="StatusPerkawinan" isChecked={(status) => {setCheckboxStatus(prev => ({...prev, perkawinan: !status}))}} label="Status Perkawinan" />
                        {checkboxStatus.perkawinan && (
                            <div className="grid sm:grid-cols-2 grid-cols-1 pl-3 ml-1.5 my-3 border-l border-gray-500 gap-4">
                                <InputComponent keyname="currentName" name="Sebelumnya" onChange={() => {}} placeholder="" defaultValue="Belum Kawin" disabled={true}/>
                                <DropdownComponent getDropdownStatus={() => {}} data={[]} label="Menjadi" onChange={() => {}} placeholder="Pilih status" />
                            </div>
                        )}
                        <CheckboxComponent id="Pekerjaan" isChecked={(status) => {setCheckboxStatus(prev => ({...prev, pekerjaan: !status}))}} label="Pekerjaan" />
                        {checkboxStatus.pekerjaan && (
                            <div className="grid sm:grid-cols-2 grid-cols-1 pl-3 ml-1.5 my-3 border-l border-gray-500 gap-4">
                                <InputComponent keyname="currentName" name="Sebelumnya" onChange={() => {}} placeholder="" defaultValue="Belum/Tidak Bekerja" disabled={true}/>
                                <DropdownComponent getDropdownStatus={() => {}} data={[]} label="Menjadi" onChange={() => {}} placeholder="Pilih jenis pekerjaan" />
                            </div>
                        )}
                        {jenisPerubahanSelected && (
                            <div className="pt-10 flex justify-end">
                                <Button 
                                    onClick={() => nextStep(3)} 
                                    className={'bg-sky-600 text-white px-4 py-2'} size={'md'} variant={'primary'}>
                                    Lanjut
                                </Button>
                            </div>
                        )}
                    </>
                </Accordion>

                {/* Accordion 3 */}
                <Accordion
                    title={"Download Formulir"} 
                    number={3} 
                    bulletColor="bg-green-600"
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
                                <p>F-1.02 (Pendaftaran Peristiwa Kependudukan)</p>
                            </span>
                        </div>
                        <div className="pt-4 flex justify-end">
                            <button 
                                onClick={() => {
                                    if (isAllDocDownloaded) {
                                        nextStep(4);
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

                {/* Accordion 4 */}
                <Accordion
                    title={"Upload Formulir"} 
                    number={4} 
                    bulletColor="bg-green-600"
                    active={currentStep >= 4} 
                    isOpen={accordionActive === 4} 
                    onToggle={(isOpen) => {
                        if (4 <= currentStep) {
                            setAccordionActive(isOpen ? 4 : 0);
                        }
                    }}
                >
                    <h3 className="text-sm py-4 text-gray-400">Lakukan upload file yang sudah diisi tandatangan/materai</h3>
                    <div className="flex flex-col space-y-3">
                        <FileInput onChange={() => {}} id="form_pendaftaran" label="Formulir Pendaftaran Peristiwa Kependudukan" />
                        <FileInput onChange={() => {}} id="scan_kk" label="Scan Kartu Keluarga" />
                    </div>
                    <div className="pt-10 flex justify-end">
                        <Link href={'/'}>
                            <Button 
                                className={'bg-sky-600 text-white px-4 py-2'} size={'md'} variant={'primary'}>
                                Lanjut
                            </Button>
                        </Link>
                    </div>
                </Accordion>
            </div>
        </>
    )
}