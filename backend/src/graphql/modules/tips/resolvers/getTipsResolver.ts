import { GraphQLError } from 'graphql'
import { CustomContext } from '../../../..'

import { TipItem } from '../../../../types/graphqlTypesGenerated'
import User from '../../../../models/UserModel'
import { Tips } from '../../../../mocks/Tips'
import MealRecordData from '../../../../models/MealRecordModel'

export const getTipsResolver = async (
    _: unknown,
    __: unknown,
    { authUser }: CustomContext
): Promise<Array<TipItem>> => {
    if (!authUser) throw new GraphQLError('Unauthorized')

    try {
        const user = await User.findOne({ _id: authUser.userId })
        if (!user) {
            throw new GraphQLError('User not found', {
                extensions: { code: 'USER_NOT_FOUND' },
            })
        }

        const mealRecords = await MealRecordData.findOne({
            userId: authUser.userId,
        })
        if (!mealRecords) {
            return []
        }

        console.log(user.plan.length)

        const dateCountMap: Record<string, number> = {}
        mealRecords.records.forEach((record) => {
            const date = record.loggedDateTime.toISOString().split('T')[0]
            if (!dateCountMap[date]) {
                dateCountMap[date] = 0
            }
            dateCountMap[date]++
        })

        console.log(dateCountMap)

        const tipsWithDates: TipItem[] = []
        let tipIndex = 0
        for (const [date, count] of Object.entries(dateCountMap)) {
            if (count >= user.plan.length) {
                tipsWithDates.push({
                    ...Tips[tipIndex % Tips.length],
                    date: date,
                })
                tipIndex++
            }
        }

        return tipsWithDates
    } catch (error) {
        console.error(error)
        throw new GraphQLError('Error fetching shopping list')
    }
}
