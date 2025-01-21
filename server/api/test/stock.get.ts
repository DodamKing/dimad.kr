import yahooFinance from 'yahoo-finance2'

export default defineEventHandler(async (event) => {
    const { symbol, period1, period2 } = getQuery(event) as { symbol?: string, period1: string, period2: string }
    const stockSymbol: string = symbol || 'AAPL'
    const riskFreeRate = 0.03
    const interval = '1d'

    if (!period1 || !period2) {
        return { success: false, message: 'Period1 and Period2 are required'}
    }

    try {
        // 시간별 데이터 요청
        const historical = await yahooFinance.historical(stockSymbol, { period1, period2, interval })

        const prices = historical.map((item) => item.close)
        const dates = historical.map((item) => item.date)

        // 연평균 성장률 계산
        const startPrice = prices[0]
        const endPrice = prices[prices.length - 1]
        const years = (dates[0].getTime() - dates[dates.length - 1].getTime()) / (1000 * 60 * 60 * 24 * 365)
        const cagr = ((endPrice / startPrice) ** (1 / years)) - 1

        // 최대 낙폭 계산
        let peek = prices[0]
        let maxDrawdown = 0

        for (const price of prices) {
            if (price > peek) peek = price
            const drawdown = (peek - price) / peek
            if (drawdown > maxDrawdown) maxDrawdown = drawdown
        }

        // 일간 수익률 계산
        const dailyReturns = prices.slice(1).map((price, i) => (price - prices[i]) / prices[i])

        // 평균 수익률과 표준편차 계산
        const averageReturn = dailyReturns.reduce((sum, r) => sum + r, 0) / dailyReturns.length
        const standardDeviation = Math.sqrt(dailyReturns.reduce((sum, r) => sum + (r - averageReturn) ** 2, 0) / (dailyReturns.length))

        // Sharpe Ratio 계산
        const sharpeRatio = ((averageReturn * 252) - riskFreeRate) / (standardDeviation * Math.sqrt(252))

        const data = {
            symbol: stockSymbol,
            period: { start: period1, end: period2 },
            metrics: {
                CAGR: cagr,
                MDD: maxDrawdown,
                sharpeRatio,
                averageDailyReturn: averageReturn,
                standardDeviation,
            },
            priceSeries: historical.map((item) => ({ date: item.date, close: item.close }))
        } 

        return {
            success: true,
            data: data
        }
    } catch (error) {
        console.error('Error fetching Yahoo Finance data:', error)
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error'
        }
    }
})