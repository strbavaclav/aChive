import { GraphQLError } from 'graphql'
import { CustomContext } from '../../../..'
import {
    MutationAddShoppingListItemArgs,
    ShoppingList,
} from '../../../../types/graphqlTypesGenerated'
import ShoppingData from '../../../../models/ShoppingDataModel'

export const addShoppingListItemResolver = async (
    _: unknown,
    { item }: MutationAddShoppingListItemArgs,
    { authUser }: CustomContext
): Promise<ShoppingList> => {
    if (!authUser) throw new GraphQLError('Unauthorized')

    try {
        let shoppingData = await ShoppingData.findOne({
            userId: authUser.userId,
        })

        if (!shoppingData) {
            shoppingData = new ShoppingData({
                userId: authUser.userId,
                items: [item],
            })
        } else {
            shoppingData.items.push(item)
        }

        const savedShoppingData = await shoppingData.save()

        const result = {
            userId: savedShoppingData.userId.toString(),
            items: savedShoppingData.items,
        }

        return result
    } catch (error) {
        console.error(error)
        throw new GraphQLError('Error updating shopping list')
    }
}
