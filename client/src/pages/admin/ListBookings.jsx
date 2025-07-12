import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import dateFormat from '../../lib/dateFormat';

const ListBookings = () => {

    const currency = import.meta.env.VITE_CURRENCY;

    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllBookings = async () => {
        setBookings(dummyBookingData);
        setIsLoading(false);
    }

    useEffect(() => {
        getAllBookings();
    }, [])

    return !isLoading ? (
        <>
            <Title text1="Danh sách" text2="đặt chỗ"/>
            <div className="max-w-4xl mt-6 overflow-x-auto">
                <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
                    <thead>
                        <tr className="bg-primary/20 text-left text-white">
                            <th className="p-2 font-medium pl-5">Tên người dùng</th>
                            <th className="p-2 font-medium">Tên phim</th>
                            <th className="p-2 font-medium">Suất chiếu</th>
                            <th className="p-2 font-medium">Ghế</th>
                            <th className="p-2 font-medium">Số lượng</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-light">
                        {bookings.map((booking, index) => (
                            <tr
                                key={index}
                                className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'
                            >
                                <td className="p-2 min-w-45 pl-5">{booking.user.name}</td>
                                <td className="p-2">{booking.show.movie.title}</td>
                                <td className="p-2">{dateFormat(booking.show.showDateTime)}</td>
                                <td className="p-2">{Object.keys(booking.bookedSeats).map((seat) => booking.bookedSeats[seat]).join(", ")}</td>
                                <td className="p-2">{booking.amount} {currency}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    ) : <Loading />
}

export default ListBookings