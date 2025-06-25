import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../lib/timeFormat'
import dateFormat from '../lib/dateFormat'

const MyBookings = () => {

    const currency = import.meta.env.VITE_CURRENCY

    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    const getMyBookings = async () => {
        setBookings(dummyBookingData)
        setLoading(false)
    }

    useEffect(() => {
        getMyBookings();
    }, [])

    return !loading ? (
        <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
            <BlurCircle top='100px' left='100px'/>
            <div className="">
                <BlurCircle bottom='0px' left='600px'/>
            </div>
            <h1 className="text-lg font-semibold mb-4">Vé đã đặt</h1>

            {bookings.map((booking, index) => (
                <div key={index} className="flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl">
                    <div className="flex flex-col md:flex-row">
                        <img src={booking.show.movie.poster_path} alt="" className='md:max-w-44 aspect-video h-auto object-cover object-bottom rounded'/>
                        <div className="flex flex-col p-4">
                            <p className="text-lg font-semibold">{booking.show.movie.title}</p>
                            <p className="text-gray-500 text-sm">{timeFormat(booking.show.movie.runtime)}</p>
                            <p className="text-gray-500 text-sm mt-auto">{dateFormat(booking.show.showDateTime)}</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:items-end md:text-right justify-between p-4">
                        <div className="flex items-center gap-4">
                            <p className="text-2xl font-semibold mb-3">{booking.amount}{currency}</p>
                            {
                                !booking.isPaid 
                                && <button className="bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer">Thanh toán</button>
                            }
                        </div>
                        <div className="text-sm">
                            <p className="">
                                <span className="text-gray-500">Số vé tổng cộng: </span>
                                {booking.bookedSeats.length}
                            </p>
                            <p className="">
                                <span className="text-gray-500">Ghế: </span>
                                {booking.bookedSeats.join(', ')}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ) : <Loading />
}

export default MyBookings