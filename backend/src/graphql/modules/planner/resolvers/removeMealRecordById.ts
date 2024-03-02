import { MutationRemoveMealRecordByIdArgs } from '../../../../types/graphqlTypesGenerated'
import MealRecordData from '../../../../models/MealRecordModel'
import mongoose from 'mongoose'

export const removeMealRecordByIdResolver = async (
    _: unknown,
    { userId, recordId }: MutationRemoveMealRecordByIdArgs
): Promise<string> => {
    const userIdObjectId = new mongoose.Types.ObjectId(userId)
    const recordIdObject = new mongoose.Types.ObjectId(recordId)
    try {
        const user = await MealRecordData.findOne({
            userId,
        })

        if (!user) {
            throw new Error('User not found')
        }

        const filtered = user.records.filter(
            (record) => record._id?.toString() !== recordId
        )
        console.log(filtered)

        //@ts-ignore
        user.records = filtered

        await user.save()

        return 'success'
    } catch (error) {
        console.log(error)
        throw error
    }
}
