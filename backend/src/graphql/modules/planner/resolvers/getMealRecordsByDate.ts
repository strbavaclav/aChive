import {
    MealRecord,
    QueryGetMealRecordsByDateArgs,
} from '../../../../types/graphqlTypesGenerated'
import MealRecordData from '../../../../models/MealRecordModel'

export const getMealRecordsByDate = async (
    _: unknown,
    { userId, date }: QueryGetMealRecordsByDateArgs
): Promise<Array<MealRecord>> => {
    console.log('DATE', date)
    try {
        const dayStart = new Date(date)

        const dayEnd = new Date(date)
        dayEnd.setHours(23, 59, 59, 999)
        const timezoneOffset = dayEnd.getTimezoneOffset() * 60000
        const adjustedDayEnd = new Date(dayEnd.getTime() - timezoneOffset)

        const document = await MealRecordData.findOne({
            userId,
        })

        if (!document) {
            return []
        }

        console.log(dayStart, adjustedDayEnd)

        const filteredRecords: MealRecord[] = document.records
            .filter((record) => {
                const recordDate = record.loggedDateTime
                return recordDate >= dayStart && recordDate <= adjustedDayEnd
            })
            .map((record) => ({
                ...record,
                mealId: String(record.mealId),
                loggedDateTime: record.loggedDateTime.toISOString(),
                description: record.description,
                size: record.size,
                cooked: record.cooked,
            }))

        return filteredRecords
    } catch (error) {
        console.log(error)
        throw error
    }
}
