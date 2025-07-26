import { Button } from "@mui/material"
import { Minus, Plus } from "lucide-react"
import { useEffect, useState } from "react"

type CounterComponentProps = {
    label: string,
    onChange: (value: number) => void
}

export default function CounterComponent({ label, onChange }: CounterComponentProps) {
    const [value, setValue] = useState<number>(1);

    useEffect(() => {
        onChange(value);
    }, [value, onChange])

    return (
        <div className="w-full">
            <h3>{label}</h3>
            <div className="flex space-x-6 items-center pt-1">
                <button 
                    className="border p-1 cursor-pointer active:bg-sky-600 active:border-sky-600 active:text-white rounded-md"
                    onClick={() => {
                        if (value !== 1) {
                            setValue(value - 1);
                            onChange(value);
                        }
                    }}  
                >
                    <Minus size={18} />
                </button>
                <span>
                    {value}
                </span>
                <button 
                    className="border p-1 cursor-pointer active:bg-sky-600 active:border-sky-600 active:text-white rounded-md"
                    onClick={() => {
                        setValue(value + 1);
                        onChange(value);
                    }}    
                >
                    <Plus size={18}/>
                </button>
            </div>
        </div>
    )
}