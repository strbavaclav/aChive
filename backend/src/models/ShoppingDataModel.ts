import mongoose from 'mongoose'

const shoppingItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        default: false,
        required: true,
    },
})

const shoppingDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [shoppingItemSchema],
})

const ShoppingData = mongoose.model('ShoppingData', shoppingDataSchema)

export default ShoppingData
