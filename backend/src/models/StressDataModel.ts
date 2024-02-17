import mongoose from 'mongoose'

const stressDataSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    stressJournal: [{ timestamp: Date, value: Number, note: String }],
})

const StressData = mongoose.model('StressData', stressDataSchema)

export default StressData
