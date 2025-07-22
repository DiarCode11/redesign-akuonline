import { useState } from "react";
import { ChangeEvent } from "react";


export enum DataType {
    Text = "text",
    Number = "number"
}

type InputComponentProps = {
    name: string,
    placeholder: string,
    keyname: string,
    dataType?: DataType | string,
    errorMsg?: string,
    defaultValue?: string,
    disabled?: boolean,
    onChange: (value: string) => void
}

export default function InputComponent({name, placeholder, keyname, dataType, errorMsg, defaultValue='', disabled = false, onChange} : InputComponentProps) {
    const [value, setValue] = useState<string>(defaultValue);
    const [type, setType] = useState<string>('');

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const newVal = e.target.value;
        if (dataType === DataType.Text) {
            setType("text");
            setValue(newVal);
            onChange(newVal);
        } else if (dataType === DataType.Number) {
            setType("text");
            if (/^\d*$/.test(newVal)) {
                setValue(newVal);
                onChange(newVal);
            }
        } else {
            setType(dataType);
            setValue(newVal);
            onChange(newVal);
        }
    }

    return (
        <div className="w-full">
            <label htmlFor={keyname} className="block text-sm font-medium">
                {name}
            </label>
            <input
                type={type}
                id={keyname}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={handleChange}
                className={`mt-1 p-2 w-full h-9 border border-gray-300 text-sm rounded-md ${disabled && 'bg-gray-200 text-gray-500'}`}
            />
            { errorMsg && (<p className="text-red-500 text-sm">{errorMsg}</p>) }
        </div>
    )
}