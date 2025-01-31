<!-- pages/loan-calculator.vue -->
<template>
    <main class="min-h-screen bg-gradient-to-b from-slate-50 to-white py-6 sm:py-8">
        <div class="container mx-auto px-4 sm:px-6">
            <!-- 헤더 섹션 -->
            <div class="max-w-3xl mx-auto mb-8 text-center sm:mb-8">
                <h1 class="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">대출 상환 시뮬레이터</h1>
                <p class="text-slate-600">대출 금액과 조건을 입력하면 월별 상환 계획을 보여드립니다.</p>
            </div>

            <div class="max-w-7xl mx-auto">
                <div class="grid gap-6 lg:grid-cols-12 lg:gap-8">
                    <!-- 입력 폼 섹션 -->
                    <div class="w-full lg:col-span-5">
                        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                            <h2 class="text-lg font-semibold text-slate-900 mb-6">대출 정보 입력</h2>
                            <form @submit.prevent="calculateLoan" class="space-y-6">
                                <!-- 대출금액 입력 -->
                                <div class="space-y-2">
                                    <label class="text-sm font-medium text-slate-700">
                                        대출금액 <span class="text-red-500">*</span>
                                    </label>
                                    <div class="flex items-center gap-3">
                                        <div class="relative flex-1">
                                            <input type="text" v-model="form.amount" @input="formatAmount"
                                                class="w-full h-11 px-4 rounded-lg border-slate-200 pr-16"
                                                placeholder="0" required />
                                            <span
                                                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">원</span>
                                        </div>
                                        <div v-if="displayAmount" class="text-violet-600 text-sm whitespace-nowrap">
                                            {{ displayAmount }}원
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-1 sm:flex sm:flex-wrap gap-2">
                                        <button type="button" v-for="amount in quickAmounts" :key="amount"
                                            @click="setQuickAmount(amount)"
                                            class="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition">
                                            {{ formatNumber(amount) }}원
                                        </button>
                                    </div>
                                </div>

                                <!-- 대출기간 선택 -->
                                <div class="space-y-2">
                                    <label class="text-sm font-medium text-slate-700">
                                        대출기간
                                        <span class="text-red-500">*</span>
                                    </label>
                                    <select v-model="form.term" class="w-full h-11 px-4 rounded-lg border-slate-200"
                                        required>
                                        <option v-for="term in terms" :key="term" :value="term">
                                            {{ term >= 12 ? `${term / 12}년` : `${term}개월` }}
                                        </option>
                                    </select>
                                </div>

                                <!-- 연이자율 입력 -->
                                <div class="space-y-2">
                                    <label class="text-sm font-medium text-slate-700">
                                        연이자율
                                        <span class="text-red-500">*</span>
                                    </label>
                                    <div class="relative">
                                        <input type="number" v-model.number="form.rate" step="0.1"
                                            class="w-full h-11 px-4 rounded-lg border-slate-200 pr-16" placeholder="0.0"
                                            required />
                                        <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                                    </div>
                                </div>

                                <!-- 상환방식 선택 -->
                                <div class="space-y-2">
                                    <label class="text-sm font-medium text-slate-700">
                                        상환방식
                                        <span class="text-red-500">*</span>
                                    </label>
                                    <select v-model="form.method" class="w-full h-11 px-4 rounded-lg border-slate-200"
                                        required>
                                        <option value="equal-payment">원리금균등상환</option>
                                        <option value="equal-principal">원금균등상환</option>
                                        <option value="bullet">만기일시상환</option>
                                    </select>
                                </div>

                                <div class="flex gap-3">
                                    <button type="submit"
                                        class="flex-1 h-12 bg-slate-900 text-white rounded-lg hover:bg-slate-800">
                                        계산하기
                                    </button>
                                    <button type="button" @click="resetForm"
                                        class="h-12 px-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                                        <ArrowPathIcon class="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- 결과 섹션 -->
                    <div class="w-full lg:col-span-7 space-y-6">
                        <template v-if="calculated">
                            <!-- 요약 카드 -->
                            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                                <h3 class="text-lg font-semibold text-slate-900 mb-4">상환 요약</h3>
                                <div class="grid gap-4 sm:grid-cols-3">
                                    <div class="p-4 bg-slate-50 rounded-lg">
                                        <div class="text-sm text-slate-600 mb-1">월 상환액</div>
                                        <div class="text-lg font-semibold text-slate-900">
                                            {{ formatNumber(summary.monthlyPayment) }}원
                                        </div>
                                    </div>
                                    <div class="p-4 bg-slate-50 rounded-lg">
                                        <div class="text-sm text-slate-600 mb-1">총 상환액</div>
                                        <div class="text-lg font-semibold text-slate-900">
                                            {{ formatNumber(summary.totalPayment) }}원
                                        </div>
                                    </div>
                                    <div class="p-4 bg-slate-50 rounded-lg">
                                        <div class="text-sm text-slate-600 mb-1">총 이자</div>
                                        <div class="text-lg font-semibold text-slate-900">
                                            {{ formatNumber(summary.totalInterest) }}원
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 차트 섹션 -->
                            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 mb-6">
                                <div class="grid gap-6 sm:grid-cols-2">
                                    <!-- 원금/이자 비율 파이 차트 -->
                                    <div>
                                        <h3 class="text-sm font-medium text-slate-700 mb-4">원금/이자 비율</h3>
                                        <ClientOnly>
                                            <apexchart type="pie" :options="pieChartOptions" :series="pieSeries"
                                                height="250" />
                                        </ClientOnly>
                                    </div>
                                    <!-- 상환 계획 라인 차트 -->
                                    <div>
                                        <h3 class="text-sm font-medium text-slate-700 mb-4">잔여 원금 추이</h3>
                                        <apexchart type="line" :options="lineChartOptions" :series="lineSeries"
                                            height="250" />
                                    </div>
                                </div>
                            </div>

                            <!-- 상환 계획 테이블 -->
                            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden">
                                <button @click="toggleSchedule"
                                    class="flex justify-between items-center w-full p-3 hover:bg-slate-50 rounded-lg">
                                    <div class="flex items-center gap-2">
                                        <h3 class="text-lg font-semibold text-slate-900">월별 상환 계획</h3>
                                        <span class="text-sm text-slate-500">(클릭하여 {{ isScheduleExpanded ? '접기' : '펼치기'
                                            }})</span>
                                    </div>
                                    <ChevronDownIcon :class="{ 'rotate-180': isScheduleExpanded }"
                                        class="w-5 h-5 text-slate-400 transition-transform" />
                                </button>
                                <div v-show="isScheduleExpanded" class="mt-4 overflow-x-auto">
                                    <!-- 데스크톱 테이블 -->
                                    <div class="hidden md:block overflow-x-auto">
                                        <table class="w-full">
                                            <thead>
                                                <tr class="border-b border-slate-200">
                                                    <th class="py-3 px-4 text-left text-sm font-medium text-slate-600">
                                                        회차
                                                    </th>
                                                    <th class="py-3 px-4 text-right text-sm font-medium text-slate-600">
                                                        납입금액
                                                    </th>
                                                    <th class="py-3 px-4 text-right text-sm font-medium text-slate-600">
                                                        원금
                                                    </th>
                                                    <th class="py-3 px-4 text-right text-sm font-medium text-slate-600">
                                                        이자
                                                    </th>
                                                    <th class="py-3 px-4 text-right text-sm font-medium text-slate-600">
                                                        잔액
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(payment, index) in schedule" :key="index"
                                                    class="border-b border-slate-100">
                                                    <td class="py-3 px-4 text-sm text-slate-600">{{ payment.month }}회차
                                                    </td>
                                                    <td class="py-3 px-4 text-right text-sm text-slate-900">
                                                        {{ formatNumber(payment.payment) }}원
                                                    </td>
                                                    <td class="py-3 px-4 text-right text-sm text-slate-900">
                                                        {{ formatNumber(payment.principal) }}원
                                                    </td>
                                                    <td class="py-3 px-4 text-right text-sm text-slate-900">
                                                        {{ formatNumber(payment.interest) }}원
                                                    </td>
                                                    <td class="py-3 px-4 text-right text-sm text-slate-900">
                                                        {{ formatNumber(payment.balance) }}원
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <!-- 모바일 카드 뷰 -->
                                    <div class="md:hidden">
                                        <div v-for="payment in schedule" :key="payment.month"
                                            class="mb-3 border-b border-slate-100 pb-3 last:border-0">
                                            <div class="flex justify-between items-center mb-2">
                                                <span class="font-medium text-slate-800">{{ payment.month }}회차</span>
                                                <span class="text-base sm:text-lg font-bold text-slate-900">{{
                                                    formatNumber(payment.payment) }}원</span>
                                            </div>

                                            <div class="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                                                <div class="text-center p-1.5 sm:p-2 bg-slate-50 rounded">
                                                    <div class="text-slate-500 mb-0.5 sm:mb-1">원금</div>
                                                    <div class="font-medium truncate">{{ formatNumber(payment.principal)
                                                        }}원</div>
                                                </div>
                                                <div class="text-center p-1.5 sm:p-2 bg-slate-50 rounded">
                                                    <div class="text-slate-500 mb-0.5 sm:mb-1">이자</div>
                                                    <div class="font-medium truncate">{{ formatNumber(payment.interest)
                                                        }}원</div>
                                                </div>
                                                <div class="text-center p-1.5 sm:p-2 bg-slate-50 rounded">
                                                    <div class="text-slate-500 mb-0.5 sm:mb-1">잔액</div>
                                                    <div class="font-medium truncate">{{ formatNumber(payment.balance)
                                                        }}원</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div v-else class="bg-white rounded-xl p-8 text-center border border-slate-200">
                            <CalculatorIcon class="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p class="text-lg text-slate-600">계산기를 통해 최적의 대출 상환 계획을 확인해보세요</p>
                        </div>
                    </div>
                </div>

                <!-- FAQ 섹션 -->
                <div class="mt-12 max-w-3xl mx-auto">
                    <h2 class="text-xl font-bold text-slate-900 mb-4">자주 묻는 질문</h2>
                    <div class="space-y-4">
                        <div class="bg-white rounded-lg p-4 shadow-sm">
                            <h3 class="font-medium text-slate-900">상환 방식의 차이는 무엇인가요?</h3>
                            <p class="mt-2 text-slate-600 text-sm">
                                원리금균등상환은 매월 납입하는 총 금액이 동일하고, 원금균등상환은 매월 납입하는 원금이 동일합니다.
                                만기일시상환은 대출 기간 동안 이자만 납입하고 만기에 원금을 전액 상환하는 방식입니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowPathIcon, ChevronDownIcon, CalculatorIcon } from '@heroicons/vue/24/outline'

const form = ref({
    amount: '',
    term: 360,
    rate: 3.5,
    method: 'equal-payment'
})

const terms = [12, 24, 36, 48, 60, 120, 180, 240, 360]
const quickAmounts = [50000000, 100000000, 300000000] // 5천만원, 1억원, 3억원

const calculated = ref(false)
const summary = ref({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0
})
interface PaymentSchedule {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
}

const schedule = ref<PaymentSchedule[]>([])

// 차트 옵션
const pieChartOptions = {
    labels: ['원금', '이자'],
    colors: ['#6366f1', '#e11d48'],
    legend: {
        position: 'bottom'
    }
}

const isScheduleExpanded = ref(false)

const formatNumber = (num: number) => {
    return (Math.round(num / 10) * 10).toLocaleString('ko-KR')
}

const formatAmount = () => {
    form.value.amount = form.value.amount.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const setQuickAmount = (amount: number) => {
    form.value.amount = formatNumber(amount)
}

const calculateLoan = () => {
    const principal = parseInt(form.value.amount.replace(/[^0-9]/g, ''))
    const term = form.value.term
    const monthlyRate = form.value.rate / 100 / 12

    let monthlyPayment = 0
    const newSchedule = []

    if (form.value.method === 'equal-payment') {
        // 원리금균등상환 계산
        monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) /
            (Math.pow(1 + monthlyRate, term) - 1)

        let balance = principal
        let totalInterest = 0

        for (let month = 1; month <= term; month++) {
            const interest = balance * monthlyRate
            const principalPayment = monthlyPayment - interest
            balance -= principalPayment
            totalInterest += interest

            newSchedule.push({
                month,
                payment: monthlyPayment,
                principal: principalPayment,
                interest,
                balance: Math.max(0, balance)
            })
        }

        summary.value = {
            monthlyPayment,
            totalPayment: monthlyPayment * term,
            totalInterest
        }
    } else if (form.value.method === 'equal-principal') {
        // 원금균등상환 계산
        const monthlyPrincipal = principal / term
        let balance = principal
        let totalInterest = 0

        for (let month = 1; month <= term; month++) {
            const interest = balance * monthlyRate
            balance -= monthlyPrincipal
            totalInterest += interest

            newSchedule.push({
                month,
                payment: monthlyPrincipal + interest,
                principal: monthlyPrincipal,
                interest,
                balance: Math.max(0, balance)
            })
        }

        summary.value = {
            monthlyPayment: newSchedule[0].payment,
            totalPayment: principal + totalInterest,
            totalInterest
        }
    } else if (form.value.method === 'bullet') {
        // 만기일시상환 계산
        const monthlyInterest = principal * monthlyRate
        const totalInterest = monthlyInterest * term

        for (let month = 1; month <= term; month++) {
            newSchedule.push({
                month,
                payment: month === term ? principal + monthlyInterest : monthlyInterest,
                principal: month === term ? principal : 0,
                interest: monthlyInterest,
                balance: month === term ? 0 : principal
            })
        }

        summary.value = {
            monthlyPayment: monthlyInterest,
            totalPayment: principal + totalInterest,
            totalInterest
        }
    }

    schedule.value = newSchedule
    calculated.value = true
}

const displayAmount = computed(() => {
    const num = parseInt(form.value.amount.replace(/[^0-9]/g, ''))
    if (isNaN(num)) return ''
    const units = ['', '만', '억']
    let result = ''
    let remain = num
    for (let i = 0; remain > 0 && i < units.length; i++) {
        const mod = remain % 10000
        if (mod > 0) result = `${mod}${units[i]} ${result}`
        remain = Math.floor(remain / 10000)
    }
    return result.trim()
})

const lineChartOptions = {
    chart: {
        toolbar: {
            show: false
        }
    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        type: 'numeric',
        title: {
            text: '납입 회차'
        },
        labels: {
            formatter: (value: number) => `${Math.round(value)}회`
        }
    },
    yaxis: {
        title: {
            text: '잔여 원금'
        },
        labels: {
            formatter: (value: number) => formatNumber(value)
        }
    }
}

// 차트 데이터
const pieSeries = computed(() => {
    const principal = parseInt(form.value.amount.replace(/[^0-9]/g, ''))
    return [principal, summary.value.totalInterest]
})

const lineSeries = computed(() => [{
    name: '잔여 원금',
    data: schedule.value.map(item => ({
        x: item.month,
        y: item.balance
    }))
}])

const resetForm = () => {
    form.value = {
        amount: '',
        term: 360,
        rate: 3.5,
        method: 'equal-payment'
    }
    calculated.value = false
}

const toggleSchedule = () => isScheduleExpanded.value = !isScheduleExpanded.value

useHead({
    titleTemplate: '%s | 대출 상환 시뮬레이터',
    meta: [
        { name: 'description', content: '대출 상환 계획을 쉽게 계산하고 비교해보세요.' }
    ]
})
</script>

<style scoped>
input[type="text"],
input[type="number"] {
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;
}
</style>