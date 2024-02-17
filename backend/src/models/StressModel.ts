import mongoose from 'mongoose'

const stressSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    stressJournal: [{ timestamp: Date, value: Number, note: String }],
})

const Stress = mongoose.model('Stress', stressSchema)

export default Stress
