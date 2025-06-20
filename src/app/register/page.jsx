"use client";
import Image from "next/image";
import { Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockKeyhole, EyeOff, EyeIcon, Mail, User, Phone, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

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


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [sectFormActive, setSectFormActive] = useState(1);
    const [districtsName, setDistrictsName] = useState(Object.keys(village_data));
    const [showDistrictSelection, setDistrictSelection] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [showVillageSelection, setVillageSelection] = useState(false);
    const [selectedVillage, setSelectedVillage] = useState("");
    const [listVillage, setListVillage] = useState([]);

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

    useEffect(() => {
        console.log(Object.keys(village_data));
    });

    return (
        <div className="flex justify-center items-center">
            { sectFormActive === 1 ? (
                <div className="w-[400px] flex flex-col space-y-6">
                    <div className="relative">
                        <Input
                            className={"pr-10 h-10 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:outline-none"}
                            placeholder="Masukkan Email"
                            value={email}
                            type={"email"}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Mail className="absolute top-2 right-3 text-slate-400" />
                    </div>
                    <div className="relative">
                        <Input
                            className={"h-10 pr-10 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:outline-none"}
                            placeholder="Masukkan NIK"
                            type={"text"}
                            value={nik}
                            onChange={(e) => setNik(e.target.value)}
                        />
                        <LockKeyhole className="absolute top-2 right-3 text-slate-400" />
                    </div>
                    <div className="relative">
                        <Input
                            className={"pr-10 h-10 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:outline-none"}
                            placeholder="Masukkan Password"
                            type={showPassword ? "text": "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span onClick={togglePasswordVisibility} className="absolute cursor-pointer top-2 right-3 text-slate-400">
                            {showPassword ? <EyeIcon /> : <EyeOff />}
                        </span>
                    </div>
                    <div className="relative">
                        <Input
                            className={"h-10 pr-10 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:outline-none"}
                            placeholder="Ulangi Password"
                            type={showRepeatPassword ? "text": "password"}
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                        <span onClick={toggleRepeatPasswordVisibility} className="absolute cursor-pointer top-2 right-3 text-slate-400">
                            {showRepeatPassword ? <EyeIcon /> : <EyeOff />}
                        </span>
                    </div>
                    <div className="flex justify-center space-x-1">
                        <div className="h-2 w-2 rounded-full primary-color"></div>
                        <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                    </div>
                    <Button onClick={() => setSectFormActive(2)} className={"primary-color text-white"}>
                        Lanjut
                    </Button>
                    <p className="w-full flex justify-center">Sudah punya akun?
                        <Link href={"/login"} className="ml-2 primary-text font-semibold">Masuk</Link>
                    </p>
                </div>
            ) : (
                <div className="w-[400px] flex flex-col space-y-6">
                    <div className="relative">
                        <Input
                            className={"pr-10 h-10 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:outline-none"}
                            placeholder="Masukkan nomor telepon"
                            type={"text"}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <Phone className="absolute top-2 right-3 text-slate-400" />
                    </div>
                    <div className="relative">
                        <Input
                            className={"h-10 pr-10 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus:outline-none"}
                            placeholder="Masukkan nama"
                            type={"text"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <User className="absolute top-2 right-3 text-slate-400" />
                    </div>
                    <div className="relative">
                        <div onClick={() =>setDistrictSelection(!showDistrictSelection)} className="h-10 flex items-center text-sm rounded-md cursor-pointer pl-3 w-full border">    
                            { selectedDistrict ? (<p className="">{selectedDistrict}</p>) : (<p className="text-neutral-500">Pilih Kecamatan</p>) }
                        </div>
                        <ChevronDown className={`absolute top-2 right-3 text-slate-400 transition-all ease-in-out duration-200 ${showDistrictSelection ? "rotate-180" : ""}`} />
                        { showDistrictSelection && (
                            <div className="h-32 w-full z-10 absolute shadow border border-neutral-500 rounded-md top-12 bg-white">
                                <ul className="overflow-y-scroll h-full">
                                    {districtsName.map((district, index) => (
                                        <li onClick={() => selectDistrict(district)} className="py-1 px-2 cursor-pointer rounded-md hover:bg-gray-100" key={index}>{district}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <div onClick={() =>setVillageSelection(!showVillageSelection)} className="h-10 flex items-center text-sm rounded-md cursor-pointer pl-3 w-full border">
                            { selectedVillage ? (<p className="">{selectedVillage}</p>) : (<p className="text-neutral-500">Pilih Desa</p>) }
                        </div>
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
                    <div className="flex justify-center space-x-1">
                        <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                        <div className="h-2 w-2 rounded-full primary-color"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Button onClick={() => setSectFormActive(1)} className={"bg-gray-400 cursor-pointer text-white"}>
                            Kembali
                        </Button>
                        <Button className={"primary-color cursor-pointer text-white"}>
                            Daftar
                        </Button>
                    </div>
                    <p className="w-full flex justify-center">Sudah punya akun?
                        <Link href={"/login"} className="ml-2 primary-text font-semibold">Masuk</Link>
                    </p>
                </div>
            ) }
        </div>
    );
}