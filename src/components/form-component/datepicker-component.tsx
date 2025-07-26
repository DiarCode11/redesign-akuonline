"use client";
import { ChevronDown, Calendar } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type DateDropdownProps = {
    label: string,
    placeholder?: string,
    onToggleCalendar?: () => void
    errorMsg?: string,
    defaultDate?: string, // Format: YYYY-MM-DD
    onChange: (date: string) => void
    isOpenExternally?: boolean;
    getToggleStatus: (status: boolean) => void
    showCalendar?: boolean
}

export default function DatePickerComponent({ label, placeholder = "Pilih tanggal", errorMsg, defaultDate, onToggleCalendar, isOpenExternally, onChange, getToggleStatus, showCalendar }: DateDropdownProps) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showYearDropdown, setShowYearDropdown] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const dropdownRef = useRef<HTMLDivElement>(null);
    const yearDropdownRef = useRef<HTMLDivElement>(null);

    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

    useEffect(() => {
        if (defaultDate) {
            setSelectedDate(defaultDate);
            const date = new Date(defaultDate);
            setCurrentMonth(date.getMonth());
            setCurrentYear(date.getFullYear());
        }
    }, [defaultDate]);

     useEffect(() => {
        if (showCalendar) {
            console.log("Posisi kalender berubah");
            setShowDropdown(true);
        }
    }, [showCalendar])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            const isOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(target);
            const isOutsideYearDropdown = yearDropdownRef.current && !yearDropdownRef.current.contains(target);

            if (isOutsideDropdown && isOutsideYearDropdown) {
                setShowDropdown(false);
                setShowYearDropdown(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

    function selectDate(day: number) {
        const date = new Date(currentYear, currentMonth, day);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${yyyy}-${mm}-${dd}`;
        setSelectedDate(formattedDate);
        onChange(formattedDate);
        setShowDropdown(false);
    }

    function selectYear(year: number) {
        setCurrentYear(year);
        setShowYearDropdown(false);
    }

    function generateYearOptions() {
        const years = [];
        for (let year = 1900; year <= 2050; year++) {
            years.push(year);
        }
        return years;
    }

    function formatDisplayDate(dateString: string) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    function previousMonth() {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    }

    function nextMonth() {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    }

    function renderCalendar() {
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
        const calendarDays = [];

        for (let i = 0; i < firstDay; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="w-8 h-8" />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isSelected =
                selectedDate &&
                new Date(selectedDate).getDate() === day &&
                new Date(selectedDate).getMonth() === currentMonth &&
                new Date(selectedDate).getFullYear() === currentYear;

            calendarDays.push(
                <div
                    key={day}
                    onClick={() => selectDate(day)}
                    className={`w-8 h-8 flex items-center justify-center cursor-pointer rounded-md text-sm hover:bg-gray-100 ${
                        isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-gray-700'
                    }`}
                >
                    {day}
                </div>
            );
        }

        return calendarDays;
    }

    function openCalendar() {
        getToggleStatus(showDropdown)
        setShowDropdown(!showDropdown)

        onToggleCalendar?.(); // trigger fungsi dari parent jika diset
    }

    useEffect(() => {
        if (typeof isOpenExternally === 'boolean') {
            setShowDropdown(isOpenExternally);
        }
    }, [isOpenExternally]);



    return (
        <div className="relative w-full">
            <label htmlFor="date" className="block font-medium text-sm mb-1">
                {label}
            </label>
            <div
                ref={dropdownRef}
                onClick={() => openCalendar()}
                className={`relative w-full h-9 border text-sm flex pl-2 items-center border-gray-300 rounded-md cursor-pointer ${
                    selectedDate ? "text-black" : "text-gray-400"
                }`}
            >
                {selectedDate ? formatDisplayDate(selectedDate) : placeholder}
                <Calendar className="absolute right-2 text-gray-400" size={18} />

                {showDropdown && (
                    <div className="absolute z-50 top-full left-0 mt-1 bg-white  w-full border border-gray-300 rounded-md shadow-lg">
                        <div className="p-3">
                            <div className="flex items-center justify-between mb-3">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        previousMonth();
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded"
                                >
                                    <ChevronDown className="rotate-90" size={16} />
                                </button>

                                <div className="relative flex items-center">
                                    <span className="text-sm font-medium text-gray-700 mr-2">
                                        {months[currentMonth]}
                                    </span>
                                    <span
                                        className="text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowYearDropdown(!showYearDropdown);
                                        }}
                                    >
                                        {currentYear}
                                    </span>

                                    {showYearDropdown && (
                                        <div
                                            ref={yearDropdownRef}
                                            className="absolute top-8 left-0 w-20 h-32 bg-white border border-gray-300 rounded-md shadow-lg z-50 overflow-y-auto"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {generateYearOptions().map((year) => (
                                                <div
                                                    key={year}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        selectYear(year);
                                                    }}
                                                    className={`px-2 py-1 cursor-pointer hover:bg-gray-100 text-sm ${
                                                        year === currentYear ? 'bg-blue-500 text-white' : 'text-gray-700'
                                                    }`}
                                                >
                                                    {year}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        nextMonth();
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded"
                                >
                                    <ChevronDown className="-rotate-90" size={16} />
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {days.map((day) => (
                                    <div key={day} className="text-xs text-gray-500 text-center font-medium p-1">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-1">
                                {renderCalendar()}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
        </div>
    );
}
