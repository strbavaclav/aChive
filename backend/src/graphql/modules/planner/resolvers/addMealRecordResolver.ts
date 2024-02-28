import { GraphQLError } from 'graphql'
import User from '../../../../models/UserModel'
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
            if (
                mealRecordData.records.some(
                    (meal) => String(meal.mealId) !== mealRecord.mealId
                )
            ) {
                mealRecordData.records.push(mealRecord)
            } else {
                throw new Error()
            }
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
                mealId: String(record.mealId),
                size: record.size,
                cooked: record.cooked,
                loggedDateTime: record.loggedDateTime.toISOString(),
            })),
        } as MealRecordDataType
    } catch (error) {
        console.log(error)
        throw new GraphQLError('ONBOARD_FAIL', {
            extensions: { code: 'ONBOARD_FAILED' },
        })
    }
}
