import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import dateFormat from '../../lib/dateFormat';
import { useAppContext } from '../../context/AppContext';

const ListShows = () => {

    const currency = import.meta.env.VITE_CURRENCY;

    const { axios, getToken, user } = useAppContext();

    const [shows, setShows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllShows = async () => {
        try {
            const { data } = await axios.get('/api/admin/all-shows', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })

            setShows(data.shows)
            setIsLoading(false)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (user) {
            getAllShows();
        }
    }, [user])

    return !isLoading ? (
        <>
            <Title text1="Danh sách" text2="phim đang chiếu" />
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

export default ListShows