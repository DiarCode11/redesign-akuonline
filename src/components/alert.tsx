"use client"
import { ReactNode, useEffect, useState } from "react"
import { X } from "lucide-react"

type AlertProps = {
    isShow: boolean
    title: string
    subtitle?: string
    prefixIcon?: ReactNode
    onClose?: (status: boolean) => void
}

export default function Alert({ isShow = false, title = "", prefixIcon = "", subtitle = "" } : AlertProps) {
    const [showAlert, setShowAlert] = useState<boolean>(false);

    useEffect(() => {
        if (isShow) {
            setShowAlert(true);
            const timeout = setTimeout(() => setShowAlert(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [isShow])
    return (
        <div className={`fixed top-0 left-1/2 z-50 transform -translate-x-1/2 px-3 pt-3 transition-all duration-300 ease-out 
            ${isShow ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`} >
            <div className="shadow-lg bg-green-50 border border-l-0 border-slate-800/15 px-5 py-3 w-[300px] sm:w-[450px] rounded-r-md relative">
            <span className="w-0.5  h-full bg-green-800 absolute top-0 left-0"></span>
            { prefixIcon && (
                <span>
                { prefixIcon }
                </span>
            ) }
            <div>
                <h1 className="text-green-800 text-sm sm:text-[17px] font-semibold">{title}</h1>
                <p className="text-slate-900/30 text-sm sm:text-[17px]">{subtitle}</p>
            </div>
            <span className="absolute right-4 top-4 cursor-pointer">
                <X size={19} />
            </span>
            </div>
        </div>
    )
}