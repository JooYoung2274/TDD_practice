import mongoose from 'mongoose';

const producerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    produciton: {
        type: Number,
        required: true,
    },
});

export const Producer = mongoose.model('Producer', producerSchema);
