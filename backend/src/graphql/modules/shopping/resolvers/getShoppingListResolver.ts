import { GraphQLError } from 'graphql'
import { CustomContext } from '../../../..'

import ShoppingData from '../../../../models/ShoppingDataModel'
import { ShoppingList } from '../../../../types/graphqlTypesGenerated'

export const getShoppingListResolver = async (
    _: unknown,
    __: unknown,
    { authUser }: CustomContext
): Promise<ShoppingList> => {
    if (!authUser) throw new GraphQLError('Unauthorized')

    try {
        const shoppingData = await ShoppingData.findOne({
            userId: authUser.userId,
        }).exec()

        if (!shoppingData) {
            return {
                userId: authUser.userId,
                items: [],
            }
        }

        return {
            userId: shoppingData.userId.toString(),
            items: shoppingData.items,
        }
    } catch (error) {
        console.error(error)
        throw new GraphQLError('Error fetching shopping list')
    }
}
