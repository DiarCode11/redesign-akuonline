"use client";
import Accordion from "@/components/accordion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CircleAlertIcon } from "lucide-react";
import InputComponent from "@/components/form-component/input-component";
import { Button } from "@/components/ui/button";
import DatePickerComponent from "@/components/form-component/datepicker-component";
import { Check } from "lucide-react";
import { Download } from "lucide-react";
import FileInput from "@/components/form-component/fileinput-component";
import { ServiceProps } from "@/lib/save-to-local-storage";
import { useAuth } from "@/context/authContext";
import { SubmitDataHelper } from "@/helper/submitDataHelper";
import Alert from "@/components/alert";
import { useRouter } from "next/navigation";

export type KkHilangProps = {
    NoKtpPemohon: string,
    TanggalKehilangan: string
}

export default function KKHilang() {
    const auth = useAuth()
    const router = useRouter()
    const [accordionActive, setAccordionActive] = useState<number>(1);
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [overflowStatus, setOverflowStatus] = useState<boolean>(true);
    const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(true);
    const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
    const [isAllDocDownloaded, setAllDocDownloaded] = useState<boolean>(false);
    const [data, setData] = useState<KkHilangProps | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);

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
    }, [isAccordionOpen])

    function nextStep(step: number) {
        setCurrentStep(step);
        setAccordionActive(step);
    }

    async function submitData() {
        try {
            const payload : ServiceProps = {
                userId: auth.id,
                userName: auth.name,
                serviceType: "KK",
                serviceName: "Kehilangan Kartu Keluarga",
                description: "Pengajuan pembuatan KK baru karena kehilangan",
                createdAt: new Date(),
                data: data
            } 

            const response = await SubmitDataHelper("/api/pengajuan", payload);
            if (response.ok) {
                console.log(response)
                setShowAlert(true)
                setTimeout(() => {
                    router.push("/")
                }, 2000)
            } else {
                console.log(response)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            {/* Alert */}
            <Alert title="Berhasil membuat pengajuan" isShow={showAlert} onClose={(data) => setShowAlert(false)} prefixIcon={<CircleAlertIcon className="text-green-800" />} />

            <div className="flex space-x-6 items-center pb-10">
                <Link href={"/"}>
                    <ArrowLeft />
                </Link>
                <h1 className="font-semibold text-xl t">Kehilangan Kartu Keluarga</h1>
            </div>
            <div className="flex flex-col space-y-2">
                <Accordion
                    title={"Informasi Pemohon"} 
                    number={1} 
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
                    <div className="py-4 grid sm:grid-cols-2 grid-cols-1 gap-3 items-end z-0">
                        <InputComponent 
                            keyname="No_KK"
                            name="Nomor KTP Pemohon"
                            dataType="number"
                            onChange={(data) => {
                                setData(prev => ({
                                    ...prev,
                                    NoKtpPemohon: data
                                }))
                            }}
                            placeholder="Masukkan nomor KTP"
                        />
                        <DatePickerComponent
                            label="Tanggal Kehilangan"
                            onChange={(data) => setData(prev => ({
                                ...prev, TanggalKehilangan: data
                            }))}
                            showCalendar={isOpenCalendar}
                            getToggleStatus={(status) => {setOverflowStatus(status)}}
                        />
                    </div>
                    <div className="pt-10 flex justify-end">
                        <Button onClick={() => {
                                    nextStep(2)
                                    setOverflowStatus(true);
                                } } 
                                className={'bg-sky-600 text-white px-4 py-2'} size={'md'} variant={'primary'}>
                            Lanjut
                        </Button>
                    </div>
                </Accordion>

                {/* Accordion 2 */}
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
                        <FileInput onChange={() => {}} id="pendaftaran_peristiwa" label="Surat Keterangan Kehilangan dari Kepolisian" />
                        <FileInput onChange={() => {}} id="ktp1" label={`Scan KTP "I Wayan Yoga Sastrawan"`} />
                        <FileInput onChange={() => {}} id="ktp2" label={`Scan KTP "Mariah Maclachlan"`} />
                        <FileInput onChange={() => {}} id="akta_kawin" label="Scan Akta Perkawinan" />
                    </div>
                    <div className="pt-10 flex justify-end">
                        <Button onClick={() => {
                                setOverflowStatus(true);
                                submitData();
                            } } 
                            className={'bg-sky-600 text-white px-4 py-2'} size={'md'} variant={'primary'}>
                            Simpan
                        </Button>
                    </div>
                </Accordion>
            </div>
        </>
    )
}