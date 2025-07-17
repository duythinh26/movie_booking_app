import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

// Function to check if selected seats are available for a show
const checkSeatsAvailability = async (showId, selectedSeats) => {
    try {
        const showData = await Show.findById(showId);
        if (!showData) return false;

        const occupiedSeats = showData.occupiedSeats;

        // Check if any of the selected seats are already occupied
        const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

        return !isAnySeatTaken;

    } catch (error) {
        console.log(error.message);
        return false;
    }
}

// Function to create a booking
export const createBooking = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { showId, selectedSeats } = req.body;
        const { origin } = req.headers;

        const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
        if (!isAvailable) {
            return res.json({ success: false, message: "Selected seats are not available." });
        }

        // Get showtime and movie details
        const showData = await Show.findById(showId).populate('movie');

        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: showData.showPrice * selectedSeats.length,
            bookedSeats: selectedSeats
        });

        // Update the status of selected seats to occupied
        selectedSeats.map(seat => {
            showData.occupiedSeats[seat] = userId;
        });

        // Notify Mongoose that the occupiedSeats field has been changed.
        showData.markModified('occupiedSeats');

        await showData.save();

        // Stripe Gateway Initialize


        res.json({ success: true, message: 'Booked successfully' });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

export const getOccupiedSeats = async (req, res) => {
    try {
        const { showId } = req.params;
        const showData = await Show.findById(showId);

        const occupiedSeats = Object.keys(showData.occupiedSeats);

        res.json({ success: true, occupiedSeats });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}