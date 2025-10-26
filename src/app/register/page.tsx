"use client";
import Image from "next/image";
import { Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockKeyhole, EyeOff, EyeIcon, Mail, User, Phone, ChevronDown } from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserAdditionRegisterDto, UserCommonRegisterDto } from "@/schemas/user/UserRegisterSchema";
import { CreateDataHelper } from "@/helper/createDataHelper";

const village_data = {
  "Banjar": [
    "Banjar", "Banjar Tegeha", "Banyuatis", "Banyuseri", "Cempaga", "Dencarik", "Gesing", "Gobleg",
    "Kaliasem", "Kayuputih", "Munduk", "Pedawa", "Sidetapa", "Tampekan", "Temukus", "Tigawasa", "Tirtasari"
  ],
  "Buleleng": [
    "Alasangker", "Anturan", "Bakti Seraga", "Jinengdalem", "Kalibukbuk", "Nagasepaha", "Pemaron", "Penglatan",
    "Petandakan", "Poh Bergong", "Sari Mekar", "Tukadmungga",
    "Astina", "Banjar Bali", "Banjar Jawa", "Banjar Tegal", "Banyuasri", "Banyuning", "Beratan", "Kaliuntu",
    "Kampung Anyar", "Kampung Baru", "Kampung Bugis", "Kampung Kajanan", "Kampung Singaraja", "Kendran",
    "Liligundi", "Paket Agung", "Penarukan"
  ],
  "Busung Biu": [
    "Bengkel", "Bongancina", "Busung Biu", "Kedis", "Kekeran", "Pelapuan", "Pucaksari", "Sepang", "Sepang Kelod",
    "Subuk", "Telaga", "Tinggarsari", "Tista", "Titab", "Umejero"
  ],
  "Gerokgak": [
    "Banyupoh", "Celukanbawang", "Gerokgak", "Musi", "Patas", "Pejarakan", "Pemuteran", "Pengulon", "Penyabangan",
    "Sanggalangit", "Sumberklampok", "Sumberkima", "Tinga-Tinga", "Tukadsumaga"
  ],
  "Kubutambahan": [
    "Bengkala", "Bila", "Bontihing", "Bukti", "Bulian", "Depeha", "Kubutambahan", "Mengening", "Pakisan",
    "Tajun", "Tambakan", "Tamblang", "Tunjung"
  ],
  "Sawan": [
    "Bebetin", "Bungkulan", "Galungan", "Giri Emas", "Jagaraga", "Kerobokan", "Lemukih", "Menyali", "Sangsit",
    "Sawan", "Sekumpul", "Sinabun", "Sudaji", "Suwug"
  ],
  "Seririt": [
    "Banjar Asem", "Bestala", "Bubunan", "Gunungsari", "Joanyar", "Kalianget", "Kalisada", "Lokapaksa",
    "Mayong", "Munduk Bestala", "Pangkung Paruk", "Patemon", "Pengastulan", "Rangdu", "Ringdikit",
    "Sulanyah", "Tangguwisia", "Ularan", "Umeanyar", "Unggahan", "Seririt"
  ],
  "Sukasada": [
    "Ambengan", "Git Git", "Kayu Putih", "Padang Bulia", "Pancasari", "Panji", "Panji Anom", "Pegadungan",
    "Pegayaman", "Sambangan", "Selat", "Silangjana", "Tegal Linggah", "Wanagiri", "Sukasada"
  ],
  "Tejakula": [
    "Bondalem", "Julah", "Les", "Madenan", "Pacung", "Penuktukan", "Sambirenteng", "Sembiran", "Tejakula", "Tembok"
  ]
}


export default function Register() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [sectFormActive, setSectFormActive] = useState(1);
    const [districtsName, setDistrictsName] = useState(Object.keys(village_data));
    const [showDistrictSelection, setDistrictSelection] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [showVillageSelection, setVillageSelection] = useState(false);
    const [selectedVillage, setSelectedVillage] = useState("");
    const [listVillage, setListVillage] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [disabledFirstForm, setDisabledFirstForm] = useState<boolean>(false);
    const [disabledSecondForm, setDisabledSecondForm] = useState(false);
    const [idDataToAdd, setIdDataToAdd] = useState<string>("")
    const [firstFormValues, setFirstFormValues] = useState<UserCommonRegisterDto>({
        email: "",
        nik: "",
        password: "",
        confirmPassword: ""
    });

    const [firstFormErrors, setFirstFormErrors] = useState<UserCommonRegisterDto>({
        email: "",
        nik: "",
        password: "",
        confirmPassword: ""
    });

    const [secondFormValues, setSecondFormValues] = useState<UserAdditionRegisterDto>({
        name: "",
        phone: "",
        subdistrict: "",
        village: ""
    });

    const [secondFormErrors, setSecondFormErrors] = useState<UserAdditionRegisterDto>({
        name: "",
        phone: "",
        subdistrict: "",
        village: ""
    });

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [nik, setNik] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    
    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    };

    function toggleRepeatPasswordVisibility() {
        setShowRepeatPassword(!showRepeatPassword);
    }

    function selectDistrict(district) {
        setSelectedDistrict(district);
        setDistrictSelection(false);
        setListVillage(village_data[district]);
    }

    function selectVillage(village) {
        setSelectedVillage(village);
        setVillageSelection(false);
    }

    // Deteksi perubahan di form kecamatan dan desa
    useEffect(() => {
        setSecondFormValues(prev => ({
            ...prev,
            subdistrict: selectedDistrict,
            village: selectedVillage
        }))
    }, [selectedDistrict, selectedVillage])

    useEffect(() => {
        console.log(secondFormValues)
    }, [secondFormValues])

    async function submitFirstForm() {
        setDisabledFirstForm(true);
        try {
            const result = await CreateDataHelper("/api/register?session=1", firstFormValues);
            setDisabledFirstForm(false);
            // Ketika request berhasil
            if (result.ok) {
                console.log(result);
                setIdDataToAdd(result.data.id);
                setActiveStep(activeStep + 1);
            } else {
                console.log("Terdapat kesalahan:")
                console.log(result)

                const errors_dict = result.data.errors.properties;
                setFirstFormErrors({
                    email: errors_dict.email?.errors?.[0] ?? "",
                    confirmPassword: errors_dict.confirmPassword?.errors?.[0] ?? "",
                    nik: errors_dict.nik?.errors?.[0] ?? "",
                    password: errors_dict.password?.errors?.[0] ?? "",
                });
            }

        } catch (e) {
            console.log("Error: ", e)
            setDisabledFirstForm(false);
        }
    }

    async function submitSecondForm() {
        setDisabledSecondForm(true);
        try {
            const result = await CreateDataHelper(`/api/register?session=2&id=${idDataToAdd}`, secondFormValues)
            setDisabledSecondForm(false)
            if (result.ok) {
                console.log("data berhasil ditambahkan")
                router.push("/")
            } else {
                console.log("Terdapat kesalahan:")
                console.log(result.data.errors.properties)

                const errors_dict = result.data.errors.properties;
                setSecondFormErrors({
                    name: errors_dict.name?.errors?.[0] ?? "",
                    phone: errors_dict.phone?.errors?.[0] ?? "",
                    subdistrict: errors_dict.subdistrict?.errors?.[0] ?? "",
                    village: errors_dict.village?.errors?.[0] ?? "",
                });
            }
        } catch (e) {
            console.log("Error: ", e);
            setDisabledSecondForm(false);
        }
    }

    return (
        <div className="">
            <div className="w-full overflow-hidden">
                <div className={`flex transition-transform duration-300`} 
                    style={{ transform: `translateX(-${activeStep * 100}%)` }}
                >
                    {/* First Form */}
                    <div className="min-w-full md:px-24">
                        <div className="relative  mb-5">
                            <Input
                                disabled={disabledFirstForm}
                                className={"pr-10 h-10 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:outline-none"}
                                placeholder="Masukkan Email"
                                value={firstFormValues.email}
                                type={"email"}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstFormValues(prev => ({
                                    ...prev,
                                    email: e.target.value
                                }))}
                            />
                            <Mail className="absolute top-2 right-3 text-slate-400" />
                            {firstFormErrors.email && <span className="text-red-600 text-sm">{firstFormErrors.email}</span>}
                        </div>
                        <div className="relative mb-5">
                            <Input
                                disabled={disabledFirstForm}
                                className={"h-10 pr-10 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:outline-none"}
                                placeholder="Masukkan NIK"
                                type={"text"}
                                value={firstFormValues.nik}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstFormValues(prev => ({
                                    ...prev,
                                    nik: e.target.value
                                }))}
                            />
                            <LockKeyhole className="absolute top-2 right-3 text-slate-400" />
                            {firstFormErrors.nik && <span className="text-red-600 text-sm">{firstFormErrors.nik}</span>}
                        </div>
                        <div className="relative mb-5">
                            <Input
                                disabled={disabledFirstForm}
                                className={"pr-10 h-10 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:outline-none"}
                                placeholder="Masukkan Password"
                                type={showPassword ? "text": "password"}
                                value={firstFormValues.password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstFormValues(prev => ({
                                    ...prev,
                                    password: e.target.value
                                }))}
                            />
                            <span onClick={togglePasswordVisibility} className="absolute cursor-pointer top-2 right-3 text-slate-400">
                                {showPassword ? <EyeIcon /> : <EyeOff />}
                            </span>
                            {firstFormErrors.password && <span className="text-red-600 text-sm">{firstFormErrors.password}</span>}
                        </div>
                        <div className="relative mb-5">
                            <Input
                                disabled={disabledFirstForm}
                                className={"h-10 pr-10 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:outline-none"}
                                placeholder="Ulangi Password"
                                type={showRepeatPassword ? "text": "password"}
                                value={firstFormValues.confirmPassword}
                                onChange={(e : React.ChangeEvent<HTMLInputElement>) => setFirstFormValues(prev => ({
                                    ...prev,
                                    confirmPassword: e.target.value
                                }))}
                            />
                            <span onClick={toggleRepeatPasswordVisibility} className="absolute cursor-pointer top-2 right-3 text-slate-400">
                                {showRepeatPassword ? <EyeIcon /> : <EyeOff />}
                            </span>
                            {firstFormErrors.confirmPassword && <span className="text-red-600 text-sm">{firstFormErrors.confirmPassword}</span>}
                        </div>
                    </div>

                    {/* Second Form */}
                    <div className="min-w-full md:px-24">
                        <div className="relative">
                            <Input
                                disabled={disabledSecondForm}
                                className={"pr-10 h-10 mb-5 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:outline-none"}
                                placeholder="Masukkan nomor telepon"
                                type={"number"}
                                value={secondFormValues.phone}
                                onChange={(e : React.ChangeEvent<HTMLInputElement>) => setSecondFormValues(prev => ({
                                    ...prev,
                                    phone: e.target.value
                                }))}
                            />
                            <Phone className="absolute top-2 right-3 text-slate-400" />
                            {secondFormErrors.phone && <span className="text-red-600 text-sm">{secondFormValues.phone}</span>}
                        </div>
                        <div className="relative">
                            <Input
                                disabled={disabledSecondForm}
                                className={"h-10 pr-10 mb-5 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:outline-none"}
                                placeholder="Masukkan nama"
                                type={"text"}
                                value={secondFormValues.name}
                                onChange={(e : React.ChangeEvent<HTMLInputElement>) => setSecondFormValues(prev => ({
                                    ...prev,
                                    name: e.target.value
                                }))}
                            />
                            <User className="absolute top-2 right-3 text-slate-400" />
                            {secondFormErrors.name && <span className="text-red-600 text-sm">{secondFormValues.name}</span>}
                        </div>
                        <div className="relative mb-5">
                            <div onClick={() =>setDistrictSelection(!showDistrictSelection)} className="h-10 flex items-center text-sm rounded-md cursor-pointer pl-3 w-full border">    
                                { selectedDistrict ? (<p className="">{selectedDistrict}</p>) : (<p className="text-neutral-500">Pilih Kecamatan</p>) }
                            </div>
                            {/* span error */}
                            {secondFormErrors.subdistrict && <span className="text-red-600 text-sm">{secondFormValues.subdistrict}</span>}

                            <ChevronDown className={`absolute top-2 right-3 text-slate-400 transition-all ease-in-out duration-200 ${showDistrictSelection ? "rotate-180" : ""}`} />
                            { showDistrictSelection && (
                                <div className="h-28 w-full z-10 absolute shadow border border-neutral-500 rounded-md bottom-12 bg-white">
                                    <ul className="overflow-y-scroll h-full">
                                        {districtsName.map((district, index) => (
                                            <li onClick={() => selectDistrict(district)} className="py-1 px-2 cursor-pointer rounded-md hover:bg-gray-100" key={index}>{district}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="relative mb-5">
                            <div onClick={() =>setVillageSelection(!showVillageSelection)} className="h-10 flex items-center text-sm rounded-md cursor-pointer pl-3 w-full border">
                                { selectedVillage ? (<p className="">{selectedVillage}</p>) : (<p className="text-neutral-500">Pilih Desa</p>) }
                            </div>
                            {/* span error */}
                            {secondFormErrors.village && <span className="text-red-600 text-sm">{secondFormValues.village}</span>}
                            
                            <ChevronDown className="absolute top-2 right-3 text-slate-400" />
                            { showVillageSelection && (
                                <div className="h-32 w-full z-10 absolute shadow border border-neutral-500 rounded-md bottom-12 bg-white">
                                    <ul className="h-full overflow-y-scroll">
                                        {listVillage.map((village, index) => (
                                            <li onClick={() => selectVillage(village)} className="py-1 px-2 cursor-pointer rounded-md hover:bg-gray-100" key={index}>{village}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:px-24">
                <div className="flex justify-center space-x-1">
                    <div className={`h-2 w-2 rounded-full ${activeStep == 0 ? "primary-color" : "bg-gray-500"}`}></div>
                    <div className={`h-2 w-2 rounded-full ${activeStep > 0 ? "primary-color" : "bg-gray-500"}`}></div>
                </div>
                <div className="flex justify-center gap-2 mt-6">
                    {activeStep < 1 ? (
                        <Button size={40} variant={"primary"} className="w-full primary-color text-white py-3" onClick={() => submitFirstForm()}>Lanjut</Button>
                    ) : (
                        <Button size={40} variant={"primary"} className="w-full primary-color text-white py-3" onClick={() => submitSecondForm()}>Daftar</Button>
                    )}
                </div>
                <p className="w-full flex justify-center">Sudah punya akun?
                    <Link href={"/login"} className="ml-2 primary-text font-semibold">Masuk</Link>
                </p>
            </div>
        </div>
    );
}