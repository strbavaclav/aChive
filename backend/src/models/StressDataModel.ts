import mongoose from 'mongoose'

const stressDataSchema = new mongoose.Schema({
    records: [{ timestamp: Date, value: Number, note: String }],
})

const StressData = mongoose.model('StressData', stressDataSchema)

export default StressData
