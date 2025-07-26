"use client";
import { useState, ChangeEvent } from "react"

type RadioComponentProps = {
    name: string;
    item: string[],
    defaultItem?: string,
    cols: string,
    errorMsg?: string
    onChange: (value: string) => void,
}

export default function RadioComponent({name, item, defaultItem, cols, errorMsg, onChange}: RadioComponentProps) {
    const [activeItem, setActiveItem] = useState(defaultItem);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        onChange(e.target.value);
        setActiveItem(e.target.value);
    } 
    return (
        <div className="w-full">
            <p className="text-sm font-medium">{name}</p>
            <div className={`grid ${cols} grid-cols-1  pt-2`}>
                {item.map((data, index) => (
                    <div className="flex gap-3 py-2" key={index}>
                        <input type="radio" name={data} id={data} onChange={handleChange} value={data} checked={activeItem == data} />
                        <label htmlFor={data} className="flex items-center text-gray-500">
                            {data}
                        </label>
                    </div>
                ))}
            </div>
            { errorMsg && (<p className="text-red-500 text-sm">{errorMsg}</p>)}
        </div>
    )
}