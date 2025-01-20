import yahooFinance from 'yahoo-finance2'

export default defineEventHandler(async (event) => {
    const { symbol } = getQuery(event) as { symbol?: string }
    const stockSymbol: string = symbol || 'AAPL'

    try {
        const quote = await yahooFinance.quote(stockSymbol)
        console.log(quote)

        return {
            success: true,
            data: quote
        }
    } catch (error: any) {
        console.error('Error fetching Yahoo Finance data:', error)
        return {
            success: false,
            message: error.message
        }
    }
})