import mongoose from 'mongoose';

const showSchema = new mongoose.Schema(
    {
        movie: { type: String, required: true, ref: 'Movie' },
        showDateTime: { type: Date, required: true },
        showPrice: { type: Number, required: true },
        occupiedSeats: { type: Object, default: {} }
    },
    { minimize: false } // Using minimize = false to prevents mongoose from removing empty objects
);

const Show = mongoose.model("Show", showSchema);

export default Show;
