<template>
    <section class="relative overflow-hidden bg-gradient-to-b from-pink-100 to-white min-h-screen flex items-center">
        <div class="container mx-auto px-4 py-12">
            <div class="max-w-2xl mx-auto bg-white shadow-2xl rounded-xl p-8">
                <h1 class="text-4xl font-bold text-pink-900 text-center mb-6">
                    기념일 계산기
                    <span
                        class="block text-2xl bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mt-2">
                        소중한 날을 계산하세요
                    </span>
                </h1>

                <p class="text-lg text-center text-slate-600 leading-relaxed mb-8">
                    특별한 날부터 주요 기념일까지의 날짜를 계산해드립니다.
                </p>

                <form @submit.prevent="calculateAnniversaries" class="space-y-6">
                    <div class="space-y-4">
                        <div>
                            <label for="anniversary-date" class="block text-slate-700 font-medium mb-2">기념일 날짜</label>
                            <input type="date" id="anniversary-date" v-model="anniversaryDate" required
                                class="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
                        </div>

                        <div class="flex items-center space-x-2">
                            <input type="checkbox" id="include-start-date" v-model="includeStartDate"
                                class="w-4 h-4 text-pink-600 border-2 border-pink-300 rounded focus:ring-pink-500" />
                            <label for="include-start-date" class="text-slate-700">
                                시작일 포함하여 계산
                                <span class="text-sm text-slate-500 block mt-1">
                                    예: 1월 1일부터 100일 → 포함 시 4월 10일, 미포함 시 4월 11일
                                </span>
                            </label>
                        </div>
                    </div>

                    <button type="submit"
                        class="w-full py-3 bg-gradient-to-r from-pink-600 to-red-600 text-white font-bold rounded-lg hover:from-pink-500 hover:to-red-500 transition-all duration-300 shadow-lg hover:shadow-xl">
                        계산하기
                    </button>
                </form>

                <!-- 결과 -->
                <TransitionGroup enter-active-class="transition duration-300 ease-out"
                    enter-from-class="transform -translate-y-4 opacity-0"
                    enter-to-class="transform translate-y-0 opacity-100"
                    leave-active-class="transition duration-200 ease-in"
                    leave-from-class="transform translate-y-0 opacity-100"
                    leave-to-class="transform -translate-y-4 opacity-0">
                    <div v-if="results.length > 0" class="mt-8 space-y-6">
                        <div class="p-4 bg-gradient-to-r from-pink-50 to-red-50 border border-pink-100 rounded-xl">
                            <h2 class="text-2xl font-bold text-pink-800 mb-4 flex items-center">
                                <span class="material-icons mr-2">celebration</span>
                                기념일 목록
                            </h2>
                            <ul class="space-y-3">
                                <li v-for="(result, index) in results" :key="index"
                                    class="flex items-center justify-between bg-white shadow-sm p-4 rounded-lg hover:shadow-md transition-shadow duration-200">
                                    <span class="text-lg text-slate-700 font-medium">{{ result.label }}</span>
                                    <span class="text-lg text-pink-800 font-semibold">{{ result.date }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </TransitionGroup>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Result {
    label: string;
    date: string;
}

const anniversaryDate = ref<string>('')
const includeStartDate = ref<boolean>(true)
const results = ref<Result[]>([])

const milestones = [
    { label: "100일", days: 100 },
    { label: "200일", days: 200 },
    { label: "300일", days: 300 },
    { label: "1주년", days: 365 },
    { label: "500일", days: 500 },
    { label: "1000일", days: 1000 },
    { label: "2주년", days: 730 },
    { label: "3주년", days: 1095 },
    { label: "5주년", days: 1825 },
    { label: "10주년", days: 3650 },
    { label: "20주년", days: 7300 },
    { label: "30주년", days: 10950 },
    { label: "50주년", days: 18250 }
]

function formatDate(date: Date): string {
    try {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: 'Asia/Seoul'
        }

        const formatter = new Intl.DateTimeFormat("ko-KR", options)
        return formatter.format(date)
    } catch (error) {
        console.error('Date formatting error:', error)
        return '날짜 형식이 올바르지 않습니다'
    }
}

function calculateAnniversaries() {
    if (!anniversaryDate.value) {
        alert("기념일을 입력해주세요.")
        return
    }

    const baseDate = new Date(anniversaryDate.value)
    baseDate.setHours(12, 0, 0, 0)  // 시간대 이슈 방지

    results.value = milestones.map(milestone => {
        const milestoneDate = new Date(baseDate)
        const adjustedDays = includeStartDate.value ? milestone.days - 1 : milestone.days
        milestoneDate.setDate(baseDate.getDate() + adjustedDays)
        return {
            label: milestone.label,
            date: formatDate(milestoneDate)
        }
    })
}

// SEO 및 메타 데이터
useHead({
    title: '기념일 계산기',
    meta: [
        {
            name: "description",
            content: "기념일 계산기로 소중한 날을 확인하세요. 100일부터 50주년까지 주요 기념일을 계산할 수 있습니다.",
        },
        {
            name: "keywords",
            content: "기념일 계산기, D-Day 계산기, 100일 계산기, 주년 계산, 기념일",
        }
    ],
})
</script>

<style scoped>
.material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
}
</style>