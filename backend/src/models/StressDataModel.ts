import mongoose from 'mongoose'

const stressDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    records: [{ timestamp: Date, value: Number, note: String }],
})

const StressData = mongoose.model('StressData', stressDataSchema)

export default StressData
