import { GraphQLError } from 'graphql'
import { CustomContext } from '../../../..'
import { MutationSyncShoppingListArgs } from '../../../../types/graphqlTypesGenerated'
import ShoppingData from '../../../../models/ShoppingDataModel'

export const syncShoppingListResolver = async (
    _: unknown,
    { items }: MutationSyncShoppingListArgs,
    { authUser }: CustomContext
): Promise<string> => {
    if (!authUser) throw new GraphQLError('Unauthorized')

    try {
        let shoppingData = await ShoppingData.findOne({
            userId: authUser.userId,
        })

        if (!shoppingData) {
            // Optionally handle the case where there is no existing document for the user
            shoppingData = new ShoppingData({
                userId: authUser.userId,
                items: [],
            })
        }
        if (items) {
            // Map incoming items to match the MongoDB schema, particularly handling the MongoDB ObjectId
            const updatedItems = items?.map((item) => ({
                _id: item._id,
                itemName: item.itemName,
                quantity: item.quantity,
                unit: item.unit,
                checked: item.checked,
            }))

            //@ts-ignore
            shoppingData.items = updatedItems

            // Save the changes to MongoDB
            await shoppingData.save()
        }

        return 'succes'
    } catch (error) {
        console.error(error)
        throw new GraphQLError('Error updating shopping list')
    }
}
