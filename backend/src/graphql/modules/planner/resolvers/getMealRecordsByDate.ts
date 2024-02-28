import {
    MealRecord,
    QueryGetMealRecordsByDateArgs,
} from '../../../../types/graphqlTypesGenerated'
import MealRecordData from '../../../../models/MealRecordModel'

export const getMealRecordsByDate = async (
    _: unknown,
    { userId, date }: QueryGetMealRecordsByDateArgs
): Promise<Array<MealRecord>> => {
    try {
        // Convert date string to start and end of the day for comparison
        const dayStart = new Date(date)
        dayStart.setHours(0, 0, 0, 0)

        const dayEnd = new Date(date)
        dayEnd.setHours(23, 59, 59, 999)

        // Find the document by userId
        const document = await MealRecordData.findOne({
            userId,
        })

        if (!document) {
            return [] // Return an empty array if no document is found
        }

        // Filter records by date
        const filteredRecords: MealRecord[] = document.records
            .filter((record) => {
                const recordDate = record.loggedDateTime // Assuming this is a Date object
                return recordDate >= dayStart && recordDate <= dayEnd
            })
            .map((record) => ({
                ...record,
                mealId: String(record.mealId),
                loggedDateTime: record.loggedDateTime.toISOString(), // Convert Date to string
                size: record.size,
                cooked: record.cooked,
            }))
        // Return only the filtered records array
        return filteredRecords
    } catch (error) {
        console.log(error)
        throw error
    }
}
