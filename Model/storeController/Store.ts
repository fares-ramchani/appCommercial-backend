import mongoose, { model } from "mongoose";

const storeSchema = new mongoose.Schema({
    store: {
        type: Number,
        required: true,
        unique: true
        // Code 
    },
    storeLabel: {
        type: String,
        // Libellé famille
    },
})
const Store = model('Store', storeSchema);

export default Store