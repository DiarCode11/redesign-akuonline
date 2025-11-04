import { useState } from "react";

type FileInputProps = {
    label? : string,
    id: string
    onChange? : (file: File) => void
}

export default function FileInput({ label='', id, onChange } : FileInputProps) {
    const [selectedFileName, setSelectedFileName] = useState<string>('')

    function setFile(file: File) {
        setSelectedFileName(file ? file.name : "");
        onChange(file);
    }

    return (
        <>
            <div className="">
                <h2 className="sm:text-base text-sm pb-1">{label}</h2>
                <div className="flex space-x-3">
                    <div className={`flex-1 border px-3 py-2 text-sm ${!selectedFileName && 'text-gray-500'} border-gray-800 bg-white rounded-md select-none truncate`}>
                        {selectedFileName || "Tidak ada file dipilih"}
                    </div>
                    <label
                        htmlFor="fileUpload"
                        className="cursor-pointer border-2 border-sky-600 hover:bg-sky-600 hover:text-white text-sky-600 font-medium text-sm px-4 py-2 rounded-md"
                    >
                        Browse
                    </label>
                </div>
                <input
                    id="fileUpload"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        setFile(file);
                    }}
                />
            </div>
        </>
    )
}