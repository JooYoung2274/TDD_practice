import mongoose from 'mongoose';

const totalDataSchema = new mongoose.Schema({
    totalDataId: {
        type: Number,
        required: true,
    },
    shortFall: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
});

export const TotalData = mongoose.model('TotalData', totalDataSchema);
