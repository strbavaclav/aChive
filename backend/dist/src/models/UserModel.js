"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const requiredIfOnboarded = function () {
    return this.onboarded;
};
const userShema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,
        lovercase: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: (props) => `${props.value} is not a valid email address!`,
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
    plan: [
        { mealName: String, mealSize: String, startTime: Date, endTime: Date },
    ],
});
const User = mongoose_1.default.model('User', userShema);
exports.default = User;
