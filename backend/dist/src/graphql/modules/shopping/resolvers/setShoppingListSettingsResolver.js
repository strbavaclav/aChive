"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setShoppingListSettingsResolver = void 0;
const graphql_1 = require("graphql");
const UserModel_1 = __importDefault(require("../../../../models/UserModel"));
const setShoppingListSettingsResolver = async (_, { ShopListSettings }, { authUser }) => {
    if (!authUser)
        throw new graphql_1.GraphQLError('Unauthorized');
    try {
        const user = await UserModel_1.default.findOne({ _id: authUser.userId });
        if (!user || !user.shopping)
            throw new graphql_1.GraphQLError('User or shopping settings not found');
        const updateFields = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (ShopListSettings.prepDays && {
            'shopping.prepDays': ShopListSettings.prepDays,
        })), (ShopListSettings.prepStartTime && {
            'shopping.prepStartTime': new Date(ShopListSettings.prepStartTime),
        })), (ShopListSettings.prepEndTime && {
            'shopping.prepEndTime': new Date(ShopListSettings.prepEndTime),
        })), (ShopListSettings.shopDays && {
            'shopping.shopDays': ShopListSettings.shopDays,
        })), (ShopListSettings.shopStartTime && {
            'shopping.shopStartTime': new Date(ShopListSettings.shopStartTime),
        })), (ShopListSettings.shopEndTime && {
            'shopping.shopEndTime': new Date(ShopListSettings.shopEndTime),
        }));
        await user.set(updateFields).save();
        return user.toObject();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.setShoppingListSettingsResolver = setShoppingListSettingsResolver;
