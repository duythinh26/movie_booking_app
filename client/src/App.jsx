import React from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Movies from './pages/Movies.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import SeatLayout from './pages/SeatLayout.jsx'
import Favorite from './pages/Favorite.jsx'
import { Toaster } from 'react-hot-toast'
import MyBookings from './pages/MyBookings.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import AddMovie from './pages/admin/AddMovie.jsx'
import ListMovies from './pages/admin/ListMovies.jsx'
import ListBookings from './pages/admin/ListBookings.jsx'

const App = () => {

    const isAdminRoute = useLocation().pathname.startsWith('/admin')

    return (
        <>
            <Toaster />
            {!isAdminRoute &&<Navbar />}
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/movies" element={<Movies />}/>
                <Route path="/movies/:id" element={<MovieDetails />}/>
                <Route path="/movies/:id/:date" element={<SeatLayout />}/>
                <Route path="/my-bookings" element={<MyBookings />}/>
                <Route path="/favorite" element={<Favorite />}/>
                <Route path="/admin/*" element={<AdminLayout />}>
                    <Route index element={<Dashboard />}/>
                    <Route path="add-movies" element={<AddMovie />}/>
                    <Route path="movies-list" element={<ListMovies />}/>
                    <Route path="bookings-list" element={<ListBookings />}/>
                </Route>
            </Routes>
            {!isAdminRoute &&<Footer />}
        </>
    )
}

export default App