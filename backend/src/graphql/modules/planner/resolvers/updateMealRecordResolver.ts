import { GraphQLError } from 'graphql'
import MealRecordData from '../../../../models/MealRecordModel'
import {
    MealRecordData as MealRecordDataType,
    MutationUpdateMealRecordByIdArgs,
} from '../../../../types/graphqlTypesGenerated'

export const updateMealRecordByIdResolver = async (
    _: unknown,
    { userId, recordId, updatedRecord }: MutationUpdateMealRecordByIdArgs
): Promise<MealRecordDataType> => {
    try {
        let mealRecordData = await MealRecordData.findOne({ userId })
        if (!mealRecordData) {
            throw new Error('Meal record data not found.')
        }

        const recordIndex = mealRecordData.records.findIndex(
            (record) => String(record._id) === recordId
        )

        if (recordIndex === -1) {
            throw new Error('Meal record not found.')
        }

        //@ts-ignore
        mealRecordData.records[recordIndex] = {
            ...mealRecordData.records[recordIndex],
            ...updatedRecord,
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
        throw new GraphQLError('UPDATE_FAIL', {
            extensions: { code: 'UPDATE_FAILED' },
        })
    }
}
