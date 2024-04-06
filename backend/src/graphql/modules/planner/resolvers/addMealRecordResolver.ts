import { GraphQLError } from 'graphql'
import {
    MealRecordData as MealRecordDataType,
    MutationAddMealRecordArgs,
} from '../../../../types/graphqlTypesGenerated'
import MealRecordData from '../../../../models/MealRecordModel'

export const addMealRecordResolver = async (
    _: unknown,
    { userId, mealRecord }: MutationAddMealRecordArgs
): Promise<MealRecordDataType> => {
    try {
        let mealRecordData = await MealRecordData.findOne({ userId })
        if (mealRecordData) {
            mealRecordData.records.push(mealRecord)
        } else {
            mealRecordData = new MealRecordData({
                userId,
                records: [mealRecord],
            })
        }

        await mealRecordData.save()

        return {
            ...mealRecordData.toObject(),
            records: mealRecordData.records.map((record) => ({
                ...record,
                _id: String(record._id),
                mealId: String(record.mealId),
                size: record.size,
                cooked: record.cooked,
                loggedDateTime: record.loggedDateTime.toISOString(),
                extraMealName: record.extraMealName,
            })),
        } as MealRecordDataType
    } catch (error) {
        console.log(error)
        throw new GraphQLError('ADD_MEAL_FAILED', {
            extensions: { code: 'ADD_MEAL_FAILED' },
        })
    }
}
