"use client";

import Link from "next/link";
import { ArrowLeft, Check, CircleAlertIcon, Download } from "lucide-react";
import Accordion from "@/components/accordion";
import { ReactNode, useCallback, useEffect, useState } from "react";
import InputComponent from "@/components/form-component/input-component";
import { Button } from "@/components/ui/button";
import RadioComponent from "@/components/form-component/radio-component";
import AktaForm, { jenisAktaProps } from "@/components/akta-component/akta-view-form";
import FileInput from "@/components/form-component/fileinput-component";
import DropdownComponent from "@/components/form-component/dropdown-component";
import { jenis_akta, VILLAGE_DATA } from "@/lib/config";
import { ServiceProps } from "@/lib/save-to-local-storage";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { SubmitDataHelper } from "@/helper/submitDataHelper";
import Alert from "@/components/alert";

export type PembetulanKkProps = {
    kecamatan: string,
    desa: string,
    jenisAkta: string
}

export default function PembetulanAkta() {
    const [villages, setVillages] = useState<string[]>([]);
    const [isAllDocDownloaded, setAllDocDownloaded] = useState<boolean>(false);
    const [overflowStatus, setOverflowStatus] = useState<boolean>(true);
    const [accordionStatus, setAccordionStatus] = useState<boolean>(true);
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [formState, setFormState] = useState<{ currentStep: number; accordionActive: number }>({
        currentStep: 1,
        accordionActive: 1,
    });

    const [dataAkta, setDataAkta] = useState<Partial<PembetulanKkProps>>({});
    const auth = useAuth()
    const router = useRouter()

    useEffect(() => {
        console.log(dataAkta)
    }, [dataAkta])

    const handleVillages = useCallback((villages: string[]) => {
        setVillages(villages);
    }, [])

    const nextToStep = useCallback((value: number) => {
        setFormState(prev => ({
            currentStep: Math.max(prev.currentStep, value),
            accordionActive: value
        }));
    }, []);


    useEffect(() => {
        if (formState.accordionActive === 0 || formState.accordionActive > 1) {
            setOverflowStatus(true);
        }
    }, [formState.accordionActive])

    async function saveData() {
        try {
            const payload : ServiceProps = {
                userId: auth.id,
                userName: auth.name,
                serviceType: `Akta ${dataAkta.jenisAkta}`,
                serviceName: `Perubahan Data Akta ${dataAkta.jenisAkta}`,
                description: `Pengajuan perubahan data Akta ${dataAkta.jenisAkta}`,
                createdAt: new Date(),
                data: dataAkta
            } 

            const response = await SubmitDataHelper("/api/pengajuan", payload);
            if (response.ok) {
                console.log(response.data)
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
                <h1 className="font-semibold text-xl">Pembetulan Akta</h1>
            </div>

            <div className="flex flex-col space-y-2">
                {/* Accordion 1 */}
                <Accordion
                    title="Informasi Dasar"
                    number={1}
                    bulletColor="bg-yellow-700"
                    setOverflow={overflowStatus}
                    active={formState.currentStep >= 1}
                    isOpen={formState.accordionActive === 1}
                    onToggle={(isOpen) => {
                        if (1 <= formState.currentStep) {
                            setFormState(prev => ({
                                ...prev,
                                accordionActive: isOpen ? 1 : 0
                            }));

                            if (!isOpen) {
                                setOverflowStatus(true);
                            }
                        }
                    }}
                >
                    <div className="py-4 grid sm:grid-cols-2 gap-4">
                        <DropdownComponent 
                            getDropdownStatus={(status) => {status && setOverflowStatus(false)} } 
                            data={Object.keys(VILLAGE_DATA)} 
                            label="Kecamatan" 
                            onChange={(data) => {
                                handleVillages(VILLAGE_DATA[data]);
                                setDataAkta((prev) => ({
                                    ...prev, kecamatan: data
                                }))
                            }} 
                            placeholder="Pilih kecamatan" 
                        />
                        <DropdownComponent 
                            getDropdownStatus={(status) => {status && setOverflowStatus(false)} } 
                            data={villages} 
                            label="Desa" 
                            onChange={(data) => setDataAkta((prev) => ({
                                ...prev, desa: data
                            }))} 
                            placeholder="Pilih desa" 
                        />
                        <DropdownComponent 
                            getDropdownStatus={(status) => {status && setOverflowStatus(false)} } 
                            data={jenis_akta} 
                            label="Jenis akta" 
                            onChange={(data) => setDataAkta((prev) => ({
                                ...prev, jenisAkta: data
                            }))} 
                            placeholder="Pilih jenis akta" 
                        />
                    </div> 
                    <div className="flex justify-end pt-5">
                        <Button onClick={() => nextToStep(2)} variant="primary" size="md" className="bg-sky-600 text-white px-4 py-2">
                            Simpan
                        </Button>
                    </div>
                </Accordion>

                {/* Accordion 2 */}
                <Accordion
                    title="Masukkan Data"
                    number={2}
                    bulletColor="bg-yellow-700"
                    active={formState.currentStep >= 2}
                    isOpen={formState.accordionActive === 2}
                    onToggle={(isOpen) => {
                        if (2 <= formState.currentStep) {
                            setFormState(prev => ({
                                ...prev,
                                accordionActive: isOpen ? 2 : 0
                            }));
                        }
                    }}
                >
                    {/* Tampilkan data sesuai akta yang dipilih */}
                    <AktaForm type="Perubahan Kewarganegaraan" />
                    <div className="flex justify-end pt-5">
                        <Button onClick={() => nextToStep(3)} variant="primary" size="md" className="bg-sky-600 text-white px-4 py-2">
                            Simpan
                        </Button>
                    </div>
                </Accordion>

                {/* Accordion 3 */}
                <Accordion
                    title="Download Dokumen"
                    number={3}
                    bulletColor="bg-yellow-700"
                    active={formState.currentStep >= 3}
                    isOpen={formState.accordionActive === 3}
                    onToggle={(isOpen) => {
                        if (3 <= formState.currentStep) {
                            setFormState(prev => ({
                                ...prev,
                                accordionActive: isOpen ? 3 : 0
                            }));
                        }
                    }}
                >
                    <div>
                        <h3 className="text-sm py-4 text-gray-400">Unduh Formulir ini dan lakukan pengisian tandatangan/materai. Anda harus mengupload file dalam bentuk pdf</h3>
                        <div className="flex flex-col space-y-1">
                            <span className="flex items-center space-x-2">
                                {isAllDocDownloaded ? (<Check size={18} />) : (<Download size={18} />)}
                                <p>F-2.01 (Formulir Pencatatan Sipil)</p>
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

                {/* Accordion 4 */}
                <Accordion
                    title="Upload Dokumen"
                    number={4}
                    bulletColor="bg-yellow-700"
                    active={formState.currentStep >= 4}
                    isOpen={formState.accordionActive === 4}
                    onToggle={(isOpen) => {
                        if (4 <= formState.currentStep) {
                            setFormState(prev => ({
                                ...prev,
                                accordionActive: isOpen ? 4 : 0
                            }));
                        }
                    }}
                >
                    <h3 className="text-sm py-4 text-gray-400">Lakukan upload file yang sudah diisi tandatangan/materai</h3>
                    <div className="flex flex-col space-y-3">
                        <FileInput onChange={() => {}} id="form_isian" label="F-2.01 (Formulir Pencatatan Sipil)" />
                        <FileInput onChange={() => {}} id="perubahan_elemen" label="Scan Kartu Keluarga" />
                    </div>
                    <div className="flex justify-end pt-5">
                        <Button onClick={() => saveData()} variant="primary" size="md" className="bg-sky-600 text-white px-4 py-2">
                            Selesai
                        </Button>
                    </div>
                </Accordion>
            </div>
        </>
    );
}
