<!-- pages/loan/repayment-planner.vue -->
<template>
    <main class="py-8 sm:py-12">
        <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto mb-12">
                <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">대출 상환 플래너</h1>
                <p class="text-lg text-gray-600">원리금균등상환과 원금균등상환의 차이를 비교하고 최적의 상환 계획을 세워보세요.</p>
            </div>

            <div class="max-w-5xl mx-auto">
                <div class="grid gap-8 lg:grid-cols-12">
                    <!-- 입력 폼 -->
                    <div class="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">대출금액</label>
                            <div class="relative">
                                <input type="text" v-model="formattedAmount" @input="formatAmount"
                                    class="block w-full px-4 py-3 rounded-lg border-gray-300 focus:border-violet-500 focus:ring-violet-500"
                                    placeholder="1억원 = 100,000,000" />
                                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">원</span>
                            </div>
                            <p v-if="convertedAmount" class="text-sm text-gray-600">
                                {{ convertedAmount }}
                            </p>
                        </div>

                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">대출기간</label>
                            <div class="relative">
                                <select v-model="form.term"
                                    class="block w-full px-4 py-3 rounded-lg border-gray-300 focus:border-violet-500 focus:ring-violet-500">
                                    <option value="12">1년 (12개월)</option>
                                    <option value="24">2년 (24개월)</option>
                                    <option value="36">3년 (36개월)</option>
                                    <option value="60">5년 (60개월)</option>
                                    <option value="120">10년 (120개월)</option>
                                    <option value="180">15년 (180개월)</option>
                                    <option value="240">20년 (240개월)</option>
                                    <option value="360">30년 (360개월)</option>
                                </select>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">연이자율</label>
                            <div class="relative">
                                <input type="number" v-model="form.rate" step="0.1"
                                    class="block w-full px-4 py-3 rounded-lg border-gray-300 focus:border-violet-500 focus:ring-violet-500"
                                    placeholder="3.5" min="0" max="20" />
                                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                            </div>
                        </div>

                        <button @click="calculateLoan"
                            class="w-full py-3 px-4 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
                            계산하기
                        </button>
                    </div>

                    <!-- 결과 영역 -->
                    <div class="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div v-if="!calculated" class="h-[400px] flex items-center justify-center text-gray-500">
                            대출 정보를 입력하고 계산해주세요
                        </div>
                        <div v-else>
                            <!-- 차트 영역 -->

                            <!-- 요약 정보 -->
                            <div class="mt-6 grid grid-cols-2 gap-4">
                                <div class="p-4 bg-gray-50 rounded-lg">
                                    <h4 class="text-sm font-medium text-gray-600 mb-2">원리금균등 총 이자</h4>
                                    <p class="text-lg font-bold text-gray-900">{{
                                        formatCurrency(equalPaymentTotalInterest) }}원</p>
                                </div>
                                <div class="p-4 bg-gray-50 rounded-lg">
                                    <h4 class="text-sm font-medium text-gray-600 mb-2">원금균등 총 이자</h4>
                                    <p class="text-lg font-bold text-gray-900">{{
                                        formatCurrency(equalPrincipalTotalInterest) }}원</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
interface LoanForm {
    amount: string;
    term: string;
    rate: number;
}

interface PaymentData {
    month: number;
    equalPayment: { amount: number; interest: number };
    equalPrincipal: { amount: number; interest: number };
}

const form = ref<LoanForm>({
    amount: '',
    term: '360',
    rate: 3.5
});

const calculated = ref(false);
const chartData = ref<PaymentData[]>([]);
const equalPaymentTotalInterest = ref(0);
const equalPrincipalTotalInterest = ref(0);

const chartOptions = ref({
    chart: {
        type: 'line',
        toolbar: {
            show: false
        }
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    xaxis: {
        title: { text: '납입 개월 수' }
    },
    yaxis: {
        title: { text: '월 상환금액' },
        labels: {
            formatter: (value: number) => formatCurrency(value)
        }
    },
    colors: ['#8b5cf6', '#6366f1'],
    legend: {
        position: 'top'
    }
});

function formatAmount(event: Event) {
    const input = event.target as HTMLInputElement;
    form.value.amount = input.value.replace(/[^0-9]/g, '');
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('ko-KR').format(Math.round(value));
}

function calculateEqualPayment(principal: number, monthlyRate: number, term: number) {
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) /
        (Math.pow(1 + monthlyRate, term) - 1);
}

function calculateEqualPrincipal(principal: number, monthlyRate: number, term: number, month: number) {
    const monthlyPrincipal = principal / term;
    const remainingPrincipal = principal - (monthlyPrincipal * (month - 1));
    return monthlyPrincipal + (remainingPrincipal * monthlyRate);
}

const { toast } = useToast();

function calculateLoan() {
    if (!form.value.amount) {
        toast.error("대출금액을 입력해주세요");
        return;
    }

    const principal = parseInt(form.value.amount);
    if (isNaN(principal) || principal <= 0) {
        toast.error("올바른 대출금액을 입력해주세요");
        return;
    }

    const term = parseInt(form.value.term);
    const yearlyRate = form.value.rate / 100;
    const monthlyRate = yearlyRate / 12;

    const equalPaymentAmount = calculateEqualPayment(principal, monthlyRate, term);
    let equalPaymentInterestSum = 0;
    let equalPrincipalInterestSum = 0;

    const newChartData: PaymentData[] = [];
    for (let month = 1; month <= term; month++) {
        const equalPrincipalAmount = calculateEqualPrincipal(principal, monthlyRate, term, month);
        const remainingPrincipal = principal - (principal / term * (month - 1));
        const monthlyInterest = remainingPrincipal * monthlyRate;

        newChartData.push({
            month,
            equalPayment: {
                amount: equalPaymentAmount,
                interest: monthlyInterest
            },
            equalPrincipal: {
                amount: equalPrincipalAmount,
                interest: monthlyInterest
            }
        });

        equalPaymentInterestSum += monthlyInterest;
        equalPrincipalInterestSum += monthlyInterest;
    }

    equalPaymentTotalInterest.value = equalPaymentInterestSum;
    equalPrincipalTotalInterest.value = equalPrincipalInterestSum;

    chartData.value = newChartData;
    calculated.value = true;
}

const convertedAmount = computed(() => {
    const num = parseInt(form.value.amount);
    if (isNaN(num)) return '';

    const units = ['', '만', '억', '조'];
    let result = '';
    let remain = num;

    for (let i = 0; remain > 0 && i < units.length; i++) {
        const mod = remain % 10000;
        if (mod > 0) result = `${mod}${units[i]} ${result}`;
        remain = Math.floor(remain / 10000);
    }

    return result.trim();
});

const formattedAmount = computed(() => {
    const num = parseInt(form.value.amount);
    if (isNaN(num)) return '';
    return new Intl.NumberFormat('ko-KR').format(num);
});

useHead({
    titleTemplate: '%s | 대출 상환 플래너',
    meta: [{ name: 'description', content: '원리금균등상환과 원금균등상환의 차이를 비교하고 최적의 상환 계획을 세워보세요.' }]
});
</script>