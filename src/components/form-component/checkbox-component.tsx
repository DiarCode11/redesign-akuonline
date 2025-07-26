import { useState } from "react"

interface CheckboxProps {
    id: string,
    label: string,
    font?: string,
    isChecked: (status: boolean) => void
}

export default function CheckboxComponent({ id, label, font = 'font-semibold', isChecked } : CheckboxProps) {
    const [checkedStatus, setCheckedStatus] = useState<boolean>(false);

    function handleChange() {
        setCheckedStatus(prev => !prev);
        isChecked(checkedStatus);
    }

    return (
        <div className="flex items-center space-x-2">
            <input type="checkbox" name={id} id={id} checked={checkedStatus} onChange={handleChange} />
            <label htmlFor={id} className={`select-none cursor-pointer ${font}`}>
                {label}
            </label>
        </div>
    )
}