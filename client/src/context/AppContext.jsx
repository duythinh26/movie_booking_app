import { createContext, use, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

    const [isAdmin, setIsAdmin] = useState(false)
    const [shows, setShows] = useState([])
    const [favoriteMovies, setFavoriteMovies] = useState([])

    const { user } = useUser()
    const { getToken } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const fetchIsAdmin = async () => {
        try {
            const { data } = await axios.get('/api/admin/is-admin', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            setIsAdmin(data.isAdmin)

            if (!data.isAdmin && location.pathname.startsWith('/admin')) {
                navigate('/')
                toast.error("Bạn không có quyền truy cập trang này!")
            }
        } catch (error) {
            console.error("Error checking admin status:", error)
        }
    }

    const fetchShows = async () => {
        try {
            const { data } = await axios.get('/api/show/all')
            if (data.success) {
                setShows(data.shows)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error fetching shows:', error)
        }
    }

    const fetchFavoriteMovies = async () => {
        try {
            const { data } = await axios.get('/api/user/favorites', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })

            if (data.success) {
                setFavoriteMovies(data.movies)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error fetching favorite movies:', error)
        }
    }

    useEffect(() => {
        fetchShows()
    }, [])

    useEffect(() => {
        if (user) {
            fetchIsAdmin()
            fetchFavoriteMovies()
        }
    }, [user])

    const value = {
        axios,
        fetchIsAdmin,
        user,
        getToken,
        navigate,
        isAdmin,
        shows,
        favoriteMovies,
        fetchFavoriteMovies,
        imageBaseUrl
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}

export const useAppContext = () => useContext(AppContext)