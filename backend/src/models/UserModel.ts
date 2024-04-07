import mongoose from 'mongoose'

const requiredIfOnboarded = function (this: { onboarded: boolean }) {
    return this.onboarded
}

const requiredIfClassic = function (this: { method: string }) {
    return this.method === 'classic'
}

const userShema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,
        lovercase: true,
        validate: {
            validator: function (value: string) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            },
            message: (props: { value: string }) =>
                `${props.value} is not a valid email address!`,
        },
    },
    method: { type: String, required: true, default: 'classic' },
    password: {
        type: String,
        required: [requiredIfClassic, 'password is required!'],
    },
    onboarded: {
        type: Boolean,
        default: false,
    },
    username: {
        type: String,
        required: [requiredIfOnboarded],
    },
    firstName: {
        type: String,
        required: [requiredIfOnboarded],
    },
    lastName: {
        type: String,
        required: [requiredIfOnboarded],
    },
    gender: {
        type: String,
        required: [requiredIfOnboarded],
    },
    bornDate: {
        type: Date,
        required: [requiredIfOnboarded],
    },
    language: {
        type: String,
        required: true,
        default: 'en',
    },
    body: {
        height: { type: Number },
        weight: { type: Number },
    },
    eatHabitGoal: {
        type: String,
        require: [requiredIfOnboarded],
    },
    plan: {
        type: [
            {
                mealName: String,
                mealSize: String,
                startTime: Date,
                endTime: Date,
            },
        ],
        required: [requiredIfOnboarded, 'Plan is required if onboarded'],
    },
    shopping: {
        prepDays: {
            type: [Number],
            default: [],
        },
        prepStartTime: Date,
        prepEndTime: Date,
        shopDays: {
            type: [Number],
            default: [],
        },
        shopStartTime: Date,
        shopEndTime: Date,
    },
    notifications: {
        plannerMealTime: { type: Boolean },
        logMealTime: { type: Boolean },
        listCreationTime: { type: Boolean },
        shoppingTime: { type: Boolean },
        logStressTime: { type: Boolean },
    },
})

const User = mongoose.model('User', userShema)

export default User
