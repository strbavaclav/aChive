import mongoose from 'mongoose'

const mealRecordSchema = new mongoose.Schema({
    mealId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    loggedDateTime: {
        type: Date,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    cooked: {
        type: Boolean,
        required: true,
    },
})

const mealRecordDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    records: [mealRecordSchema],
})

const MealRecordData = mongoose.model('MealRecordData', mealRecordDataSchema)

export default MealRecordData
