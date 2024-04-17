import { GraphQLError } from 'graphql'
import { CustomContext } from '../../../..'
import {
    MealCommit,
    UserStatistics,
    User as UserType,
} from '../../../../types/graphqlTypesGenerated'
import StressData from '../../../../models/StressDataModel'
import User from '../../../../models/UserModel'
import MealRecordData from '../../../../models/MealRecordModel'

export const getUserStatiscticsResolver = async (
    _: unknown,
    __: unknown,
    { authUser }: CustomContext
): Promise<UserStatistics> => {
    if (!authUser) {
        throw new GraphQLError('Unauthorized')
    }

    const response: UserStatistics = {
        streak: 0,
        stressAvg: 0,
        records: {
            meal: 0,
            stress: 0,
        },
        chart: {
            commit: [],
            line: {
                labels: [],
                counts: [],
            },
        },
    }

    try {
        const user = await User.findOne({ _id: authUser.userId })
        if (!user) throw new GraphQLError('No user found!')

        const stressData = await StressData.findOne({ _id: user._id })
        const mealData = await MealRecordData.findOne({ userId: user._id })

        let stressAvg = 0
        let stressRecordCount = 0
        let chartCommit: MealCommit[] = []
        let labels: string[] = []
        let counts: number[] = []
        let mealRecordCount = 0
        let streak = 0

        const today = new Date()
        const dates = Array.from({ length: 7 }, (_, i) => {
            const d = new Date(today)
            d.setDate(d.getDate() - i)
            return d.toISOString().split('T')[0]
        }).reverse()

        if (stressData) {
            const validValues = stressData.records.filter(
                (record) => record.value != null
            )
            stressRecordCount = validValues.length
            const totalStress = validValues.reduce(
                (acc, record) => acc + (record.value || 0),
                0
            )
            stressAvg =
                validValues.length > 0
                    ? parseFloat((totalStress / validValues.length).toFixed(1))
                    : 0
        }

        if (mealData) {
            mealRecordCount = mealData.records.length
            const dateCountMap: Record<string, number> = {}
            mealData.records.forEach((record) => {
                const date = record.loggedDateTime.toISOString().split('T')[0]
                dateCountMap[date] = (dateCountMap[date] || 0) + 1
            })

            for (const mealCount of Object.values(dateCountMap)) {
                if (mealCount >= user.plan.length) {
                    streak++
                }
            }

            chartCommit = Object.entries(dateCountMap).map(([date, count]) => ({
                date,
                count,
            }))
            labels = dates
            counts = dates.map((date) => dateCountMap[date] || 0)
        }

        return {
            streak: streak,
            stressAvg: stressAvg,
            records: {
                meal: mealRecordCount,
                stress: stressRecordCount,
            },
            chart: {
                commit: chartCommit,
                line: { labels, counts },
            },
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}
