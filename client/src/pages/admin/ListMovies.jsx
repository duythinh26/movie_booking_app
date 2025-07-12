import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import dateFormat from '../../lib/dateFormat';

const ListMovies = () => {

    const currency = import.meta.env.VITE_CURRENCY;

    const [shows, setShows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllShows = async () => {
        try {
            setShows([{
                movie: dummyShowsData[0],
                showDateTime: "2025-07-07T02:30:00.000Z",
                showPrice: 69000,
                occupiedSeats: {
                    A1: "user_1",
                    B2: "user_2",
                    C3: "user_3",
                }
            }])
            setIsLoading(false)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllShows();
    }, [])

    return !isLoading ? (
        <>
            <Title text1="Danh sách" text2="phim đang chiếu"/>
            <div className="max-w-4xl mt-6 overflow-x-auto">
                <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
                    <thead>
                        <tr className="bg-primary/20 text-left text-white">
                            <th className="p-2 font-medium pl-5">Tên phim</th>
                            <th className="p-2 font-medium">Thời gian chiếu</th>
                            <th className="p-2 font-medium">Số chỗ đã đặt</th>
                            <th className="p-2 font-medium">Doanh thu</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-light">
                        {shows.map((show, index) => (
                            <tr
                                key={index}
                                className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'
                            >
                                <td className="p-2 min-w-45 pl-5">{show.movie.title}</td>
                                <td className="p-2">{dateFormat(show.showDateTime)}</td>
                                <td className="p-2">{Object.keys(show.occupiedSeats).length}</td>
                                <td className="p-2">{Object.keys(show.occupiedSeats).length * show.showPrice} {currency}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    ) : <Loading />
}

export default ListMovies