<!-- pages/age-calculator.vue -->
<template>
    <main class="min-h-screen bg-gradient-to-b from-violet-50 to-white py-8">
        <div class="container mx-auto px-4 sm:px-6">
            <!-- 헤더 섹션 -->
            <div class="max-w-3xl mx-auto mb-8 text-center">
                <div class="inline-block mb-6">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-800">
                        <CalendarIcon class="w-5 h-5" />
                        <span class="text-sm font-medium">나이 계산기</span>
                        <span class="text-xs px-2 py-0.5 bg-violet-200 rounded-full">2025년 기준</span>
                    </div>
                </div>
                <h1 class="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">한국 나이 · 만 나이 계산기</h1>
                <p class="text-slate-600 max-w-2xl mx-auto">
                    생년월일로 만 나이, 한국 나이(세는 나이), 연 나이를 쉽게 계산해보세요.
                    <span class="block mt-2 text-sm">
                        <span class="text-violet-600">2025년</span> 기준으로 계산되며,
                        <span class="text-slate-700">2023년 6월 28일부터 시행된 나이 통일법</span>에 따른
                        공식 나이를 확인할 수 있습니다.
                    </span>
                </p>
            </div>

            <div class="max-w-2xl mx-auto">
                <!-- 입력 폼 -->
                <div
                    class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6 hover:shadow-xl transition-shadow">
                    <form @submit.prevent="calculateAge" class="space-y-6">
                        <div class="space-y-4">
                            <!-- 생년월일 입력 -->
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-2">
                                    생년월일
                                    <span class="text-red-500">*</span>
                                </label>
                                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <!-- 연도 입력 -->
                                    <div class="relative">
                                        <input type="number" v-model="birthDate.year" placeholder="연도 (YYYY)"
                                            class="w-full h-12 pl-4 pr-4 rounded-xl border-slate-200 bg-slate-50 hover:bg-slate-100 focus:ring-2 focus:ring-violet-500 transition-colors"
                                            min="1900" :max="currentYear" required />
                                        <span
                                            class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">년</span>
                                    </div>

                                    <!-- 월 선택 -->
                                    <div class="relative">
                                        <select v-model="birthDate.month"
                                            class="w-full h-12 pl-4 pr-10 rounded-xl border-slate-200 bg-slate-50 hover:bg-slate-100 focus:ring-2 focus:ring-violet-500 transition-colors appearance-none"
                                            required>
                                            <option value="" disabled>월</option>
                                            <option v-for="month in 12" :key="month" :value="month">
                                                {{ month }}월
                                            </option>
                                        </select>
                                        <ChevronDownIcon
                                            class="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>

                                    <!-- 일 입력 -->
                                    <div class="relative">
                                        <input type="number" v-model="birthDate.day" placeholder="일"
                                            class="w-full h-12 pl-4 pr-4 rounded-xl border-slate-200 bg-slate-50 hover:bg-slate-100 focus:ring-2 focus:ring-violet-500 transition-colors"
                                            min="1" :max="maxDaysInMonth" required />
                                        <span
                                            class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">일</span>
                                    </div>
                                </div>
                                <!-- 유효성 검사 메시지 -->
                                <p v-if="validationError" class="mt-2 text-sm text-red-600">
                                    {{ validationError }}
                                </p>
                            </div>
                        </div>

                        <div class="flex gap-3">
                            <button type="submit"
                                class="flex-1 h-12 bg-violet-600 text-white rounded-xl hover:bg-violet-700 active:bg-violet-800 transition-colors">
                                나이 계산하기
                            </button>
                            <button type="button" @click="resetForm"
                                class="h-12 w-12 flex items-center justify-center border border-slate-200 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors">
                                <ArrowPathIcon class="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>

                <!-- 결과 표시 -->
                <template v-if="calculated">
                    <div
                        class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6 hover:shadow-xl transition-shadow">
                        <h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                            <span class="inline-block w-2 h-2 bg-violet-500 rounded-full"></span>
                            나이 계산 결과
                        </h2>
                        <!-- 주요 나이 결과 -->
                        <div class="grid gap-4 sm:grid-cols-2 mb-6">
                            <div
                                class="p-4 rounded-xl bg-gradient-to-br from-violet-50 to-slate-50 border border-violet-100">
                                <div class="text-sm text-violet-800 font-medium mb-1">만 나이</div>
                                <div class="text-3xl font-bold text-violet-900">{{ ages.korean }}세</div>
                                <div class="text-xs text-violet-600 mt-2 leading-relaxed">
                                    2023년 6월 28일부터<br>시행된 공식 나이
                                </div>
                            </div>
                            <div
                                class="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-100">
                                <div class="text-sm text-blue-800 font-medium mb-1">한국 나이</div>
                                <div class="text-3xl font-bold text-blue-900">{{ ages.counting }}세</div>
                                <div class="text-xs text-blue-600 mt-2 leading-relaxed">
                                    전통적인 세는 나이
                                </div>
                            </div>
                        </div>

                        <!-- 개월 수 정보 추가 -->
                        <div class="border-t border-slate-200 pt-6">
                            <div class="grid gap-4 sm:grid-cols-2">
                                <div class="p-4 rounded-xl bg-slate-50">
                                    <h3 class="text-sm font-medium text-slate-700 mb-2">총 개월 수</h3>
                                    <div class="text-2xl font-bold text-slate-900">{{ monthsInfo.totalMonths }}개월</div>
                                    <p class="text-xs text-slate-600 mt-1">생후 총 개월 수</p>
                                </div>
                                <div class="p-4 rounded-xl bg-slate-50">
                                    <h3 class="text-sm font-medium text-slate-700 mb-2">세부 정보</h3>
                                    <div class="text-sm text-slate-800">
                                        {{ monthsInfo.years }}년 {{ monthsInfo.months }}개월
                                    </div>
                                    <p class="text-xs text-slate-600 mt-1">만 나이 기준</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 상세 설명 섹션 -->
                    <div
                        class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow">
                        <h2 class="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                            <span class="inline-block w-2 h-2 bg-violet-500 rounded-full"></span>
                            나이 계산 방식 안내
                        </h2>
                        <div class="space-y-4">
                            <div class="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                                <h3 class="font-medium text-violet-900 mb-2">• 만 나이 (공식 나이)</h3>
                                <p class="text-slate-600 text-sm leading-relaxed">
                                    2023년 6월 28일부터 시행된 나이 통일법에 따른 공식 나이입니다.
                                    태어난 날부터 정확히 몇 년이 지났는지를 계산하며, 생일이 지나야 한 살 증가합니다.
                                </p>
                            </div>
                            <div class="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                                <h3 class="font-medium text-blue-900 mb-2">• 한국 나이 (세는 나이)</h3>
                                <p class="text-slate-600 text-sm leading-relaxed">
                                    태어난 해를 1살로 시작하여 매년 1월 1일에 1살씩 증가하는 전통적인 한국식 나이 계산법입니다.
                                    2023년 6월 28일 이전의 법적 나이였으며, 현재는 비공식 나이입니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </template>

                <div v-else
                    class="bg-white rounded-2xl p-8 text-center border border-slate-200 hover:shadow-xl transition-shadow">
                    <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-violet-50 flex items-center justify-center">
                        <CalendarIcon class="w-8 h-8 text-violet-400" />
                    </div>
                    <p class="text-lg text-slate-600">생년월일을 입력하여 나이를 계산해보세요</p>
                    <p class="text-sm text-slate-500 mt-2">만 나이, 한국 나이, 연 나이를 한 번에 확인할 수 있습니다</p>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowPathIcon, ChevronDownIcon, CalendarIcon } from '@heroicons/vue/24/outline'

// 현재 날짜
const today = new Date()

// 년도 범위 생성 (120년 전 ~ 현재)
const currentYear = new Date().getFullYear()
const validationError = ref('')

// 생년월일 상태
const birthDate = ref({
    year: '',
    month: '',
    day: ''
})

// 월령 정보 상태 추가
const monthsInfo = ref({
    totalMonths: 0,
    years: 0,
    months: 0
})

// 계산 결과 상태
const calculated = ref(false)
const ages = ref({
    korean: 0,
    counting: 0,
})

// 해당 월의 최대 일수 계산
const maxDaysInMonth = computed(() => {
    if (!birthDate.value.year || !birthDate.value.month) return 31
    return new Date(Number(birthDate.value.year), Number(birthDate.value.month), 0).getDate()
})

// 나이 계산 함수
const calculateAge = () => {
    const birthDateObj = new Date(
        Number(birthDate.value.year),
        Number(birthDate.value.month) - 1,
        Number(birthDate.value.day)
    )

    // 만 나이 계산
    let koreanAge = today.getFullYear() - birthDateObj.getFullYear()
    const monthDiff = today.getMonth() - birthDateObj.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        koreanAge--
    }

    // 세는 나이 계산 (태어난 해를 1살로 계산하고, 현재 년도에서 태어난 해를 뺀 후 1을 더함)
    const countingAge = today.getFullYear() - birthDateObj.getFullYear() + 1

    // 개월 수 계산 추가
    const months = calculateMonths(birthDateObj)
    monthsInfo.value = months

    ages.value = {
        korean: koreanAge,
        counting: countingAge,
    }

    calculated.value = true
}

// 폼 초기화
const resetForm = () => {
    birthDate.value = {
        year: '',
        month: '',
        day: ''
    }
    calculated.value = false
}

// 개월 수 계산 로직 추가
const calculateMonths = (birthDate: Date): { totalMonths: number; years: number; months: number } => {
    const today = new Date()
    let years = today.getFullYear() - birthDate.getFullYear()
    let months = today.getMonth() - birthDate.getMonth()

    if (today.getDate() < birthDate.getDate()) {
        months--
    }

    if (months < 0) {
        years--
        months += 12
    }

    const totalMonths = years * 12 + months

    return {
        totalMonths,
        years,
        months
    }
}

// SEO 설정
useHead({
    titleTemplate: '%s | 한국 나이 계산기 - 만 나이·세는 나이 변환기',
    meta: [
        {
            name: 'description',
            content: '생년월일로 만 나이, 한국 나이(세는 나이), 연 나이를 쉽게 계산해보세요. 2023년 6월 28일부터 시행된 나이 통일법에 따른 공식 나이를 확인할 수 있는 나이 계산기입니다.'
        },
        {
            name: 'keywords',
            content: '한국 나이 계산기, 만 나이 계산기, 나이 계산기, 한국 나이 만 나이 차이, 2025년 나이 계산, 나이 변환기, 출생일로 나이 계산, 내 나이 만 나이 변환, 나이 계산 공식'
        }
    ],
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                'name': '한국 나이 계산기',
                'description': '생년월일로 만 나이, 한국 나이(세는 나이), 연 나이를 계산하는 도구',
                'applicationCategory': '나이 계산기',
                'operatingSystem': 'Web',
                'offers': {
                    '@type': 'Offer',
                    'price': '0',
                    'priceCurrency': 'KRW'
                }
            })
        }
    ]
})
</script>

<style scoped>
select {
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;
    appearance: none;
}

/* 모바일에서 숫자 입력 화살표 제거 */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* 숫자 입력 시 고정폭 숫자 사용 */
input[type="number"],
select {
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;
}

@media (max-width: 640px) {

    input[type="number"],
    select {
        font-size: 16px;
    }
}
</style>