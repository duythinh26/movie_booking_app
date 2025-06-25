import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import Loading from '../components/Loading';
import { ArrowRightIcon, ClockIcon } from 'lucide-react';
import isoTimeFormat from '../lib/isoTimeFormat';
import BlurCircle from '../components/BlurCircle';
import { toast } from 'react-hot-toast';

const SeatLayout = () => {

    const groupRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

    const { id, date } = useParams();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [movie, setMovie] = useState(null);

    const navigate = useNavigate();

    const getMovie = async () => {
        const movie = dummyShowsData.find((m) => m._id === id)
        if (movie) {
            setMovie({
                movie: movie,
                dateTime: dummyDateTimeData
            });
        }
    }

    const handleSeatClick = (seatId) => {
        if (!selectedTime) {
            return toast("Vui lòng chọn thời gian chiếu trước");
        }

        setSelectedSeats((prev) => {
            // if it’s already selected, un‐select it
            if (prev.includes(seatId)) {
                return prev.filter((seat) => seat !== seatId);
            }

            if (prev.length >= 5) {
                toast("Bạn chỉ có thể chọn tối đa 5 ghế");
                return prev;
            }

            return [...prev, seatId];
        });
    };

    const renderSeats = (row, count = 16) => ( // count is the number of seats in each row
        <div key={row} className="flex xl:gap-2 mt-2">
            <div className="flex flex-wrap items-center justify-center sm:gap-1">
                {Array.from({ length: count }, (_, i) => {
                    const seatId = `${row}${i + 1}`;
                    return (
                        <button
                            key={seatId}
                            onClick={() => handleSeatClick(seatId)}
                            className={`h-5 w-5 sm:h-8 sm:w-8 max-sm:ml-0.5 sm:mx-0.5 xl:mx-1 rounded border border-primary/60 cursor-pointer ${selectedSeats.includes(seatId) && "bg-primary text-white"}`}
                        >
                            {seatId}
                        </button>
                    );
                })}
            </div>
        </div>
    )

    useEffect(() => {
        getMovie();
    }, [])

    return movie ? (
        <div className="flex flex-col lg:flex-row md:px-16 lg:px-20 xl:px-30 py-30 md:pt-50">
            {/* Available Time */}
            <div className="w-48 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max lg:sticky md:top-30">
                <p className="text-lg font-semibold px-6">Thời gian chiếu</p>
                <div className="mt-5 space-y-1">
                    {movie.dateTime[date].map((item) => (
                        <div
                            key={item.time}
                            onClick={() => setSelectedTime(item)}
                            className={`flex items-center gap-2 px-6 py-2 w-full rounded-r-md cursor-pointer transition ${selectedTime?.time === item.time ? "bg-primary text-white" : "hover:bg-primary/20"}`}
                        >
                            <ClockIcon className='w-4 h-4' />
                            <p className="text-sm">{isoTimeFormat(item.time)}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Seat Layout */}
            <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
                <BlurCircle top='-100px' left='-100px' />
                <BlurCircle bottom='0' right='0' />
                <h1 className="text-2xl font-semibold mb-4">Chọn chỗ ngồi của bạn</h1>
                <img src={assets.screenImage} alt="screen" className='w-[40%]'/>
                <p className="text-gray-400 text-sm mb-5">Màn hình</p>

                <div className="flex flex-col items-center mt-10 text-xs text-gray-400">
                    <div className="grid grid-cols-1 gap-2 mb-6">
                        {
                            groupRows.map((row) => renderSeats(row))
                        }
                    </div>
                </div>

                <button
                    onClick={() => navigate('/my-bookings')}
                    className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95'
                >
                    Đặt vé
                    <ArrowRightIcon strokeWidth={3} className='w-4 h-4' />
                </button>

            </div>
        </div>
    ) : <Loading />
}

export default SeatLayout