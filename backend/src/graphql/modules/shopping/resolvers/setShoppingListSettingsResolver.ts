import { GraphQLError } from 'graphql'
import { CustomContext } from '../../../..'
import {
    MutationSetShoppingListSettingsArgs,
    ShopListSettingsInput,
    User as UserType,
} from '../../../../types/graphqlTypesGenerated'
import User from '../../../../models/UserModel'

export const setShoppingListSettingsResolver = async (
    _: unknown,
    { ShopListSettings }: MutationSetShoppingListSettingsArgs,
    { authUser }: CustomContext
): Promise<UserType> => {
    if (!authUser) throw new GraphQLError('Unauthorized')

    try {
        const user = await User.findOne({ _id: authUser.userId })

        if (!user || !user.shopping)
            throw new GraphQLError('User or shopping settings not found')

        const updateFields = {
            ...(ShopListSettings.prepDays && {
                'shopping.prepDays': ShopListSettings.prepDays,
            }),
            ...(ShopListSettings.prepStartTime && {
                'shopping.prepStartTime': new Date(
                    ShopListSettings.prepStartTime
                ),
            }),
            ...(ShopListSettings.prepEndTime && {
                'shopping.prepEndTime': new Date(ShopListSettings.prepEndTime),
            }),
            ...(ShopListSettings.shopDays && {
                'shopping.shopDays': ShopListSettings.shopDays,
            }),
            ...(ShopListSettings.shopStartTime && {
                'shopping.shopStartTime': new Date(
                    ShopListSettings.shopStartTime
                ),
            }),
            ...(ShopListSettings.shopEndTime && {
                'shopping.shopEndTime': new Date(ShopListSettings.shopEndTime),
            }),
        }

        await user.set(updateFields).save()

        return user.toObject() as UserType
    } catch (error) {
        console.log(error)
        throw error
    }
}
