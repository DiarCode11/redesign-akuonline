import { ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"

type DropdownComponentProps = {
    label : string,
    data : string[],
    defaultDataIndex? : number,
    placeholder: string,
    errorMsg?: string,
    onChange : (value: string) => void
}


export default function DropdownComponent({ label, data, defaultDataIndex, placeholder, errorMsg, onChange } : DropdownComponentProps) {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [item, setItem] = useState<string>('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    function selectItem(item: string) {
        setItem(item);
        onChange(item);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, []);

    return (
        <div>
            <label htmlFor="name" className="block font-medium text-gray-700">
                {label}
            </label>
            <div ref={dropdownRef} onClick={() => setShowDropdown(!showDropdown)} className={`relative w-full h-7 border mt-1 text-sm flex pl-2 items-center border-gray-300 rounded-md ${item ? "text-black" : "text-gray-400"}`}>
                {item ? item : (defaultDataIndex ? data[defaultDataIndex]: placeholder)}
                <ChevronDown className={`absolute right-2 text-gray-400 transition-transform duration-300 ${showDropdown ? "rotate-180" : "rotate-0"}`} size={18} />
                { showDropdown &&  
                    <div className="h-32 w-full z-10 absolute shadow border border-neutral-500 rounded-md left-0 top-10 bg-white text-gray-400">
                        <ul className="overflow-y-scroll h-full">
                            {data.map((item, index) => (
                                <li onClick={() => selectItem(item)} className="py-1 px-2 cursor-pointer rounded-md hover:bg-gray-100 text-gray-400" key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
            { errorMsg && (<p className="text-red-500 text-sm">{errorMsg}</p>) }
        </div>
    )
} 