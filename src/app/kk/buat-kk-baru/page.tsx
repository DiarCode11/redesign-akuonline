"use client";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Accordion from "@/components/accordion";
import { VILLAGE_DATA } from "@/lib/config";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Modal from "@/components/modal";
import Link from "next/link";
import { Trash2, Pencil } from "lucide-react";
import AddFamilyForm from "@/components/kk-component/add_family_form";
import InputComponent from "@/components/form-component/input-component";
import RadioComponent from "@/components/form-component/radio-component";
import DropdownComponent from "@/components/form-component/dropdown-component";
import { DataType } from "@/components/form-component/input-component";

export default function NewKK() {
    const [familyData, setFamilyData] = useState([]);
    const [accordionActive, setAccordionActive] = useState<number>(1);
    const [isAddDataModalOpen, setIsAddDataModalOpen] = useState(false);
    const [villages, setVillages] = useState<string[]>([]);

    function submitData() {
        setAccordionActive(2);
        setIsAddDataModalOpen(false);
    }

    function getVillageList(subdistrict: string) {
        setVillages(VILLAGE_DATA[subdistrict]);
    }

    function openAddDataModal() {
        setAccordionActive(null);
        setIsAddDataModalOpen(true);
    }

    return (
        <div>
            <Modal title={"Tambah Data Anggota Keluarga"} isOpen={isAddDataModalOpen} onClose={() => setIsAddDataModalOpen(false)}>
                <AddFamilyForm onClose={submitData} onSubmit={() => {} } />
            </Modal>
            <div className="flex space-x-6 items-center pb-10">
                <Link href={"/"}>
                    <ArrowLeft />
                </Link>
                <h1 className="font-semibold text-xl t">Buat Kartu Keluarga</h1>
            </div>
            <div className="flex flex-col space-y-2">
                <Accordion title={"Buat Formulir"} number={1} isOpen={accordionActive === 1} onToggle={(data) => setAccordionActive(data ? 1 : null)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="sm:col-span-2">
                            <RadioComponent 
                                name={"Jenis Data Keluarga"} 
                                cols="md:grid-cols-3" 
                                item={['WNI Dalam Negeri', 'WNA Dalam Negeri', 'WNI Luar Negeri']} 
                                defaultItem={'WNI Dalam Negeri'}
                                onChange={() => {}} 
                            />
                        </div>
                        <DropdownComponent
                            data={Object.keys(VILLAGE_DATA)}
                            label="Kecamatan"
                            placeholder="Pilih kecamatan"
                            onChange={(data) => getVillageList(data)}
                            />
                        <DropdownComponent
                            data={villages}
                            label="Desa"
                            placeholder="Pilih desa"
                            onChange={(data) => {console.log(data)}}
                            />
                        <InputComponent 
                            name={"Dusun"} 
                            dataType={DataType.Text} 
                            keyname={"dusun"} 
                            placeholder={"Masukkan nama dusun"} 
                            onChange={() => {}} 
                        />
                        <InputComponent 
                            name={"Kode Pos"} 
                            dataType={DataType.Number} 
                            keyname={"kode_pos"} 
                            placeholder={"Masukkan kode pos"} 
                            onChange={() => {}} 
                        />
                        <div className="sm:col-span-2">
                            <RadioComponent 
                                name={"Apakah pembuatan data ini diwakilkan oleh orang lain?"} 
                                cols="md:grid-cols-2" 
                                item={['Ya', 'Tidak']} 
                                onChange={() => {}} 
                            />
                        </div>
                    </div>
                    <div className="flex justify-end pt-5">
                        <Button onClick={() => setAccordionActive(2)} variant="primary" size={"md"} className={"primary-color text-white px-4 py-2"}>
                            Lanjut
                        </Button>
                    </div>
                </Accordion>
                <Accordion title={"Buat Data Keluarga"} number={2} isOpen={accordionActive === 2} onToggle={(data) => setAccordionActive(data ? 2 : null)}>
                    { familyData.length !== 0 && familyData.map((item, index) => (
                        <div key={index} className="py-2 border-b border-gray-300 justify-between flex items-center">
                            <div>
                                { item.name } 
                            </div>
                            <div className="flex gap-3">
                                <Trash2 className="text-black" />
                                <Pencil className="text-black" />
                            </div>
                        </div>
                    )) }
                    <div className="flex justify-center pt-8">
                        <button onClick={openAddDataModal} className="flex gap-2 hover:gap-4 transition-all duration-500 ease-in-out items-center cursor-pointer ">
                            <Plus size={18}/>
                            <span>Tambah data baru</span>
                        </button>
                    </div>
                    <div className="flex justify-end pt-5">
                        <Button variant={"default"} size={"md"} className={"bg-gray-200 text-white"}>
                            Lanjut
                        </Button>
                    </div>
                </Accordion>
            </div>

        </div>
    );
}