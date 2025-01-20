<!-- pages/net-salary-calculator.vue -->
<template>
    <div>
        <section class="py-8 sm:py-12">
            <div class="container mx-auto px-4">
                <div class="max-w-3xl mx-auto text-center mb-8">
                    <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        급여 실수령액 계산기
                        <span class="text-violet-600 block sm:inline">(2025년 기준)</span>
                    </h1>
                    <p class="text-slate-600 text-base sm:text-lg">
                        연봉 또는 월급 기준으로 실제 수령하게 될
                        <span class="block sm:inline">금액을 계산해 드립니다.</span>
                    </p>
                </div>
                <div class="max-w-5xl mx-auto">
                    <div class="grid gap-8 lg:grid-cols-5">
                        <!-- 입력 폼 섹션 -->
                        <div class="lg:col-span-3">
                            <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
                                <h2 class="text-xl font-bold text-slate-900 mb-6">급여 정보 입력</h2>

                                <div class="space-y-8">
                                    <!-- 급여 유형 & 금액 -->
                                    <div class="grid gap-6 sm:grid-cols-2">
                                        <div class="space-y-2">
                                            <label class="block text-sm font-medium text-slate-700">
                                                급여 유형
                                                <span class="text-xs text-slate-500 font-normal">(선택)</span>
                                            </label>
                                            <select v-model="salaryType"
                                                class="h-11 w-full rounded-lg border-slate-200 text-base text-slate-900 shadow-sm focus:border-violet-500 focus:ring-violet-500">
                                                <option value="yearly">연봉</option>
                                                <option value="monthly">월급</option>
                                            </select>
                                        </div>
                                        <div class="space-y-2">
                                            <label class="block text-sm font-medium text-slate-700">
                                                {{ salaryType === 'yearly' ? '연봉' : '월급' }} 금액
                                                <span class="text-xs text-slate-500 font-normal">(필수)</span>
                                            </label>
                                            <div class="relative">
                                                <input type="text" v-model="salary"
                                                    class="h-11 block w-full rounded-lg border-slate-200 pr-28 text-base text-slate-900 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                                                    placeholder="금액을 입력하세요" @input="formatSalary">
                                                <div class="absolute inset-y-0 right-3 flex items-center space-x-1">
                                                    <span class="text-sm text-violet-600 font-medium">
                                                        {{ formatUnit(Number(salary.replace(/[^0-9]/g, ''))) }}
                                                    </span>
                                                    <span class="text-slate-400">원</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 부양가족 정보 -->
                                    <div class="space-y-4">
                                        <h3 class="font-medium text-slate-900 flex items-center">
                                            부양가족 정보
                                            <button
                                                class="ml-2 text-xs text-violet-600 hover:text-violet-700 focus:outline-none"
                                                @click="showDependentInfo = true">
                                                <InformationCircleIcon class="w-4 h-4" />
                                            </button>
                                        </h3>
                                        <div class="grid gap-4 sm:grid-cols-2">
                                            <div class="space-y-2">
                                                <label class="block text-sm font-medium text-slate-700">
                                                    부양가족 수 (본인 포함)
                                                </label>
                                                <select v-model="dependents"
                                                    class="h-11 w-full rounded-lg border-slate-200 text-base text-slate-900 shadow-sm focus:border-violet-500 focus:ring-violet-500">
                                                    <option v-for="n in 8" :key="n" :value="n">{{ n }}명</option>
                                                </select>
                                            </div>
                                            <div class="space-y-2">
                                                <label class="block text-sm font-medium text-slate-700">
                                                    20세 이하 자녀 수
                                                </label>
                                                <select v-model="childrenUnder20"
                                                    class="h-11 w-full rounded-lg border-slate-200 text-base text-slate-900 shadow-sm focus:border-violet-500 focus:ring-violet-500">
                                                    <option value="0">없음</option>
                                                    <option v-for="n in 5" :key="n" :value="n">{{ n }}명</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 비과세 입력 -->
                                    <div class="space-y-4">
                                        <div class="flex justify-between items-center">
                                            <h3 class="font-medium text-slate-900">비과세 금액</h3>
                                            <button
                                                class="text-xs text-violet-600 hover:text-violet-700 flex items-center space-x-1"
                                                @click="showTaxFreeInfo = true">
                                                <InformationCircleIcon class="w-4 h-4" />
                                                <span>비과세 항목 안내</span>
                                            </button>
                                        </div>
                                        <div class="relative">
                                            <input type="text" v-model="taxFree"
                                                class="h-11 block w-full rounded-lg border-slate-200 pr-28 text-base text-slate-900 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                                                placeholder="식대, 자차운전보조금 등" @input="formatTaxFree">
                                            <div class="absolute inset-y-0 right-3 flex items-center space-x-1">
                                                <span class="text-sm text-violet-600 font-medium">
                                                    {{ formatUnit(Number(taxFree.replace(/[^0-9]/g, ''))) }}
                                                </span>
                                                <span class="text-slate-400">원</span>
                                            </div>
                                        </div>
                                        <!-- 비과세 빠른 입력 버튼 -->
                                        <div class="flex flex-wrap gap-2">
                                            <button v-for="amount in quickTaxFreeAmounts" :key="amount"
                                                @click="setQuickTaxFree(amount)"
                                                class="px-3 py-1.5 rounded-full text-sm bg-violet-50 text-violet-700 hover:bg-violet-100 transition-colors">
                                                {{ formatNumber(amount) }}원
                                            </button>
                                        </div>
                                    </div>

                                    <!-- 계산하기 버튼 -->
                                    <button @click="calculateSalary" class="w-full h-12 bg-violet-600 text-white rounded-lg hover:bg-violet-700 
                           transition-colors font-medium shadow-sm flex items-center justify-center
                           text-base">
                                        <CalculatorIcon class="w-5 h-5 mr-2" />
                                        실수령액 계산하기
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- 결과 표시 섹션 -->
                        <div class="lg:col-span-2">
                            <div v-if="showResult" class="space-y-6">
                                <!-- 실수령액 카드 -->
                                <div
                                    class="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-violet-100">
                                    <div class="text-center">
                                        <h3 class="text-lg font-semibold text-violet-900 mb-2">예상 실수령액</h3>
                                        <div class="text-3xl font-bold text-violet-700 mb-1">
                                            {{ formatNumber(netSalary) }}
                                            <span class="text-lg">원</span>
                                        </div>
                                        <div class="text-base text-violet-600 font-medium">
                                            {{ formatUnit(netSalary) }}원
                                        </div>
                                        <div class="mt-2 text-sm text-violet-600">
                                            {{ salaryType === 'yearly' ? '월 평균' : '매월' }} 실수령액
                                        </div>
                                    </div>
                                </div>

                                <!-- 공제 내역 카드 -->
                                <div class="bg-white rounded-xl shadow-lg border border-slate-200">
                                    <div class="p-6">
                                        <h3 class="text-lg font-semibold text-slate-900 mb-4">공제 내역</h3>
                                        <div class="space-y-3">
                                            <div v-for="(amount, type) in deductions" :key="type"
                                                class="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                                                <span class="text-slate-600">{{ type }}</span>
                                                <div class="text-right">
                                                    <div class="font-medium text-slate-900">
                                                        {{ formatNumber(amount) }}원
                                                    </div>
                                                    <div class="text-xs text-slate-500">
                                                        {{ formatUnit(amount) }}
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- 총 공제액 -->
                                            <div class="pt-3 border-t border-slate-200">
                                                <div class="flex justify-between items-center font-semibold">
                                                    <span class="text-slate-900">총 공제액</span>
                                                    <div class="text-right">
                                                        <div class="text-violet-700">
                                                            {{ formatNumber(totalDeductions) }}원
                                                        </div>
                                                        <div class="text-xs text-violet-500">
                                                            {{ formatUnit(totalDeductions) }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- 상세 정보 -->
                                <div class="text-xs text-slate-500 space-y-1">
                                    <p>• 모든 금액은 원 단위에서 반올림된 값입니다.</p>
                                    <p>• 실제 공제액은 회사 정책에 따라 다를 수 있습니다.</p>
                                </div>
                            </div>

                            <!-- 초기 상태 안내 -->
                            <div v-else class="bg-white rounded-xl p-8 text-center border border-slate-200 shadow-sm">
                                <CalculatorIcon class="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                <p class="text-slate-600">
                                    급여 정보를 입력하고 계산하기 버튼을 클릭하세요.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- 설명 섹션 -->
                    <div class="mt-12 grid gap-6 sm:grid-cols-2">
                        <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0">
                                    <InformationCircleIcon class="w-6 h-6 text-violet-500" />
                                </div>
                                <div>
                                    <h2 class="text-lg font-semibold text-slate-900 mb-2">
                                        2024년 기준 세금 계산 방법
                                    </h2>
                                    <div class="text-sm text-slate-600 space-y-2">
                                        <p>
                                            • 소득세는 부양가족 수, 자녀 수에 따라 기본공제가 적용됩니다.
                                        </p>
                                        <p>
                                            • 비과세는 과세대상에서 제외되어 세금이 부과되지 않습니다.
                                        </p>
                                        <p>
                                            • 실수령액 = 급여 - (4대보험 + 소득세 + 지방소득세) + 비과세
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0">
                                    <ChartBarIcon class="w-6 h-6 text-violet-500" />
                                </div>
                                <div>
                                    <h2 class="text-lg font-semibold text-slate-900 mb-2">
                                        2025년 공제율
                                    </h2>
                                    <div class="grid grid-cols-2 gap-2 text-sm text-slate-600">
                                        <div>• 국민연금: 4.5%</div>
                                        <div>• 건강보험: 3.545%</div>
                                        <div>• 고용보험: 0.9%</div>
                                        <div>• 장기요양: 12.95%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 모달: 부양가족 정보 -->
        <div v-if="showDependentInfo"
            class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-xl max-w-md w-full p-6">
                <h3 class="text-lg font-semibold text-slate-900 mb-4">부양가족 공제 안내</h3>
                <div class="text-sm text-slate-600 space-y-3">
                    <p>• 부양가족 1인당 연 150만원의 기본공제가 적용됩니다.</p>
                    <p>• 20세 이하 자녀는 추가로 연 150만원의 공제가 적용됩니다.</p>
                    <p>• 본인을 포함한 부양가족 수를 입력해 주세요.</p>
                </div>
                <button @click="showDependentInfo = false"
                    class="mt-6 w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
                    확인
                </button>
            </div>
        </div>

        <!-- 모달: 비과세 정보 -->
        <div v-if="showTaxFreeInfo"
            class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-xl max-w-md w-full p-6">
                <h3 class="text-lg font-semibold text-slate-900 mb-4">비과세 항목 안내</h3>
                <div class="text-sm text-slate-600 space-y-3">
                    <h4 class="font-medium">대표적인 비과세 항목</h4>
                    <ul class="space-y-2 pl-4">
                        <li>• 식대보조금: 월 20만원 한도</li>
                        <li>• 자가운전보조금: 월 20만원 한도</li>
                        <li>• 출산/보육수당: 월 10만원 한도</li>
                        <li>• 육아수당: 월 10만원 한도</li>
                    </ul>
                    <p class="text-xs text-slate-500">
                        * 회사 정책에 따라 비과세 한도와 항목이 다를 수 있습니다.
                    </p>
                </div>
                <button @click="showTaxFreeInfo = false"
                    class="mt-6 w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
                    확인
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CalculatorIcon, ChartBarIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'

useHead({
    titleTemplate: '%s | 급여 실수령액 계산기 2025 - 연봉/월급 실수령액 계산',
    meta: [
        {
            name: 'description',
            content: '2025년 기준 연봉/월급 실수령액 계산기입니다. 4대보험, 소득세 등을 반영한 정확한 실수령액 계산이 가능합니다.'
        }
    ]
})

// 상태 관리
const salaryType = ref('yearly')
const salary = ref('')
const dependents = ref(1)
const childrenUnder20 = ref(0)
const taxFree = ref('')
const showResult = ref(false)
const showDependentInfo = ref(false)
const showTaxFreeInfo = ref(false)

// 빠른 비과세 입력 금액 (월 기준)
const quickTaxFreeAmounts = [200000, 400000, 500000] // 20만원, 40만원, 50만원

// 결과 상태
const deductions = ref({
    '국민연금': 0,
    '건강보험': 0,
    '장기요양': 0,
    '고용보험': 0,
    '소득세': 0,
    '지방소득세': 0
})

const netSalary = ref(0)
const totalDeductions = computed(() => {
    return Object.values(deductions.value).reduce((sum, val) => sum + val, 0)
})

// 단위 포맷팅 (만 원 단위)
const formatUnit = (value: number) => {
    if (value === 0) return ''
    if (value < 10000) return `${value}`
    const man = Math.floor(value / 10000)
    const rest = Math.floor(value % 10000)
    return rest > 0 ? `${man}만 ${rest}` : `${man}만`
}

// 금액 포맷팅
const formatSalary = () => {
    const value = salary.value.replace(/[^0-9]/g, '')
    salary.value = value ? Number(value).toLocaleString() : ''
}

const formatTaxFree = () => {
    const value = taxFree.value.replace(/[^0-9]/g, '')
    taxFree.value = value ? Number(value).toLocaleString() : ''
}

// 빠른 비과세 금액 설정
const setQuickTaxFree = (amount: number) => {
    taxFree.value = amount.toLocaleString()
}

// 숫자 포맷팅
const formatNumber = (num: number) => {
    const truncated = Math.floor(num / 10) * 10
    return truncated.toLocaleString('ko-KR')
}

// 소득세 계산
const calculateIncomeTax = (yearlyIncome: number) => {
    // 소득세율 구간 (2025년 기준)
    const TAX_BRACKETS = [
        { limit: 14000000, rate: 0.06, progressive: 0 },
        { limit: 50000000, rate: 0.15, progressive: 1260000 },
        { limit: 88000000, rate: 0.24, progressive: 5760000 },
        { limit: 150000000, rate: 0.35, progressive: 15440000 },
        { limit: 300000000, rate: 0.38, progressive: 19940000 },
        { limit: 500000000, rate: 0.40, progressive: 25940000 },
        { limit: 1000000000, rate: 0.42, progressive: 35940000 },
        { limit: Infinity, rate: 0.45, progressive: 65940000 },
    ];

    // 기본공제 계산
    const basicDeduction = 1500000 * dependents.value; // 1인당 150만 원 공제
    const childDeduction = 1500000 * childrenUnder20.value; // 자녀 추가 공제
    const taxableIncome = yearlyIncome - basicDeduction - childDeduction;

    // 과세표준이 0 이하인 경우
    if (taxableIncome <= 0) return 0;

    // 소득세 계산: 각 구간별로 누진 과세 적용
    let tax = 0;
    let remainingIncome = taxableIncome;

    for (const bracket of TAX_BRACKETS) {
        if (remainingIncome <= 0) break;

        const taxableInThisBracket = Math.min(remainingIncome, bracket.limit);
        tax += taxableInThisBracket * bracket.rate - bracket.progressive;
        remainingIncome -= taxableInThisBracket;
    }

    // 자녀 세액공제
    let childTaxCredit = 0;
    if (childrenUnder20.value === 1) {
        childTaxCredit = 150000;  // 15만원
    } else if (childrenUnder20.value === 2) {
        childTaxCredit = 350000;  // 35만원
    } else if (childrenUnder20.value >= 3) {
        childTaxCredit = 350000 + ((childrenUnder20.value - 2) * 300000);  // 35만원 + 추가자녀당 30만원
    }

    // 근로소득세액공제 계산 (예: 간이세액표 기준 적용)
    let taxCredit = 0;
    if (taxableIncome <= 55000000) { // 연소득 5,500만 원 이하
        taxCredit = tax * 0.55; // 최대 45% 공제
    } else if (taxableIncome <= 70000000) { // 연소득 7,000만 원 이하
        taxCredit = tax * 0.30; // 최대 30% 공제
    }

    const finalTax = Math.max(tax - taxCredit - childTaxCredit, 0);  // 음수 방지

    // 월 소득세 반환 (10원 단위 절사)
    return Math.floor(finalTax / 12 / 10) * 10;
}

// 실수령액 계산
const calculateSalary = () => {
    const rawSalary = Number(salary.value.replace(/[^0-9]/g, ''))
    const monthlyTaxFree = Number(taxFree.value.replace(/[^0-9]/g, ''))

    if (!rawSalary) {
        alert('급여를 입력해주세요.')
        return
    }

    const monthlyIncome = salaryType.value === 'yearly' ? rawSalary / 12 : rawSalary
    const yearlyIncome = salaryType.value === 'yearly' ? rawSalary : rawSalary * 12

    // 4대보험 계산
    const nationalPension = Math.floor(monthlyIncome * 0.045 / 10) * 10 
    const healthInsurance = Math.floor(monthlyIncome * 0.03545 / 10) * 10
    const longTermCare = Math.floor(healthInsurance * 0.1295 / 10) * 10
    const employmentInsurance = Math.floor(monthlyIncome * 0.009 / 10) * 10

    // 소득세 계산
    const incomeTax = Math.floor(calculateIncomeTax(yearlyIncome) / 10) * 10
    const localIncomeTax = Math.floor(incomeTax * 0.1 / 10) * 10 

    // 결과 저장
    deductions.value = {
        '국민연금': nationalPension,
        '건강보험': healthInsurance,
        '장기요양': longTermCare,
        '고용보험': employmentInsurance,
        '소득세': incomeTax,
        '지방소득세': localIncomeTax
    }

    const totalDeductions = Object.values(deductions.value).reduce((sum, val) => sum + val, 0)
    netSalary.value = Math.floor((monthlyIncome - totalDeductions + monthlyTaxFree) / 10) * 10
    showResult.value = true
}
</script>

<style scoped>
/* 숫자 입력 필드 스타일 */
input[type="text"] {
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;
}

/* 모바일에서 더 큰 폰트 사이즈 */
@media (max-width: 640px) {
    .text-3xl {
        font-size: 1.75rem;
    }

    .text-base {
        font-size: 1rem;
    }

    .text-sm {
        font-size: 0.875rem;
    }
}
</style>