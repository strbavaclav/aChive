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

        const itemsWithIdAsString = shoppingData.items.map((item) => ({
            ...item,
            _id: item._id ? item._id.toString() : 'null',
            itemName: item.itemName,
            quantity: item.quantity,
            unit: item.unit,
            checked: item.checked,
        }))

        return {
            userId: shoppingData.userId.toString(),
            items: itemsWithIdAsString,
        }
    } catch (error) {
        console.error(error)
        throw new GraphQLError('Error fetching shopping list')
    }
}
