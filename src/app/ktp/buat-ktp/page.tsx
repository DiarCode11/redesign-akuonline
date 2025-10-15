"use client";
import Accordion from "@/components/accordion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import InputComponent from "@/components/form-component/input-component";
import { Button } from "@/components/ui/button";
import DatePickerComponent from "@/components/form-component/datepicker-component";
import { Check } from "lucide-react";
import { Download } from "lucide-react";
import FileInput from "@/components/form-component/fileinput-component";
import { CircleAlert } from "lucide-react";


export default function BuatKTP() {
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
                <h1 className="font-semibold text-xl t">Pembuatan KTP</h1>
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
                            name="NIK Calon Pemegang KTP"
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
                            <div className="flex bg-green-100 px-5 py-3 space-x-4 mt-2 rounded-2xl">
                                <span>
                                    <CircleAlert size={30} className="text-green-700" />
                                </span>
                                <span className="">
                                    <h3 className="font-semibold text-green-700 text-sm">Selamat I Wayan Yoga Sastrawan, anda layak mengajukan KTP</h3>
                                    <p className="text-green-600 text-sm">Berdasarkan tanggal lahir, anda sudah memenuhi syarat untuk memiliki KTP</p>
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
                    title={"Download Formulir"} 
                    number={2} 
                    bulletColor="bg-green-600"
                    active={currentStep >= 2} 
                    isOpen={accordionActive === 2} 
                    onToggle={(isOpen) => {
                        if (2 <= currentStep) {
                            setAccordionActive(isOpen ? 2 : 0);
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
                                        nextStep(3);
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

                {/* Accordion 3 */}
                <Accordion
                    title={"Upload Formulir"} 
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
                    <h3 className="text-sm py-4 text-gray-400">Lakukan upload file yang sudah diisi tandatangan/materai. Anda harus mengupload file dalam bentuk pdf</h3>
                    <div className="flex flex-col space-y-3">
                        <FileInput onChange={() => {}} id="form_pendaftaran" label="Formulir Pendaftaran Peristiwa Kependudukan" />
                        <FileInput onChange={() => {}} id="scan_kk" label="Scan Kartu Keluarga" />
                    </div>
                    <div className="pt-10 flex justify-end">
                        <Button 
                            onClick={() => nextStep(4)} 
                            className={'bg-sky-600 text-white px-4 py-2'} size={'md'} variant={'primary'}>
                            Lanjut
                        </Button>
                    </div>
                </Accordion>

                {/* Accordion 4 */}
                <Accordion
                    title={"Penjadwalan Perekaman KTP"} 
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
                    <h3 className="text-sm py-4 ">Terima kasih, permohonan KTP elektronik anda telah berhasil terkirim</h3>
                    <table>
                        <tbody className="">
                            <tr>
                                <th className="pr-8 text-left py-2">Nomor Registrasi</th>
                                <th className="pr-8 text-left">R-001</th>
                            </tr>
                            <tr>
                                <th className="pr-8 text-left py-2">Tanggal Perekaman</th>
                                <th className="pr-8 text-left">Jumat, 4 Juli 2025</th>
                            </tr>
                            <tr>
                                <th className="pr-8 text-left py-2">Tempat Perekaman</th>
                                <th className="pr-8 text-left">Disdukcapil Buleleng</th>
                            </tr>
                        </tbody>
                    </table>
                    <div className="pt-10 flex justify-end">
                        { scheduleCreated ? (
                            <Link href={'/'}>
                                <Button 
                                    className={'bg-sky-600 text-white px-4 py-2'} size={'md'} variant={'primary'}>
                                    Selesai
                                </Button>
                            </Link>
                        ) : (
                            <Button 
                                onClick={() => setScheduleCreated(true)}
                                className={'bg-sky-600 text-white px-4 py-2'} size={'md'} variant={'primary'}>
                                Dowload Bukti Pendaftaran
                            </Button>
                        )}
                    </div>
                </Accordion>
            </div>
        </>
    )
}