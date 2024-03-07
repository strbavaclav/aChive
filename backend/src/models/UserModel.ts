import mongoose from 'mongoose'

const requiredIfOnboarded = function (this: { onboarded: boolean }) {
    return this.onboarded
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
    password: {
        type: String,
        required: [true, 'Password is required'],
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
})

const User = mongoose.model('User', userShema)

export default User
