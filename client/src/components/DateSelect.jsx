import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DateSelect = ({ dateTime, id }) => {

    const navigate = useNavigate();

    const [dateSelected, setDateSelected] = useState(null);

    const handleDateSelect = () => {
        if (!dateSelected) {
            return toast("Vui lòng chọn ngày trước khi đặt vé")
        }
        navigate(`/movies/${id}/${dateSelected}`);
        scrollTo(0, 0);
    }

    return (
        <div id="dateSelect" className="pt-30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg">
                <BlurCircle top='-100px' left='-100px'/>
                <BlurCircle top='100px' right='0px'/>
                <div className="">
                    <p className="text-lg font-semibold">Chọn ngày</p>
                    <div className="flex items-center gap-6 text-sm mt-5">
                        <ChevronLeftIcon width={28}/>
                        <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
                            {Object.keys(dateTime).map((date, index) => (
                                <button 
                                    onClick={() => setDateSelected(date)} 
                                    key={date} 
                                    className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${dateSelected === date ? "bg-primary text-white" : "border border-primary/50"}`}
                                >
                                    <span className="">{new Date(date).getDate()}</span>
                                    <span className="">{new Date(date).toLocaleDateString("vi-VN", {month: "short"})}</span>
                                </button>
                            ))}
                        </span>
                        <ChevronRightIcon width={28}/>
                    </div>
                </div>
                <button
                    onClick={handleDateSelect}
                    className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer"
                >
                    Đặt vé ngay
                </button>
            </div>
        </div>
    )
}

export default DateSelect