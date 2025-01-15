<template>
    <section class="relative overflow-hidden bg-gradient-to-b from-pink-100 to-white min-h-screen flex items-center">
        <div class="container mx-auto px-4 py-20">
            <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 class="text-4xl font-bold text-pink-900 text-center mb-6">
                    기념일 계산기
                    <span class="inline-block bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                        소중한 날을 계산하세요
                    </span>
                </h1>

                <p class="text-lg text-center text-slate-600 leading-relaxed mb-8">
                    중요한 기념일을 입력하면 100일, 200일, 1주년까지의 날짜를 계산해드립니다. 기념일을 잊지 않도록 도와줄게요!
                </p>

                <!-- 사용자 경험 개선된 캘린더 -->
                <form @submit.prevent="calculateAnniversaries" class="space-y-4">
                    <div>
                        <label for="anniversary-date" class="block text-slate-700 font-medium mb-2">기념일 입력</label>
                        <client-only>
                            <input type="date" id="anniversary-date" v-model="anniversaryDate" required
                                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
                        </client-only>
                    </div>

                    <button type="submit"
                        class="w-full py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-500 transition">
                        기념일 계산하기
                    </button>
                </form>

                <!-- 결과 -->
                <div v-if="results.length > 0" class="mt-8 p-4 bg-pink-50 border border-pink-200 rounded-lg">
                    <h2 class="text-2xl font-bold text-pink-600 mb-4">결과</h2>
                    <ul class="space-y-4">
                        <li v-for="(result, index) in results" :key="index"
                            class="flex items-center justify-between bg-white shadow-md p-4 rounded-lg">
                            <span class="text-lg text-slate-700 font-medium">{{ result.label }}</span>
                            <span class="text-lg text-pink-800 font-semibold">{{ result.date }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
useHead({
    titleTemplate: '%s | 기념일 계산기 - 중요한 날을 놓치지 마세요!',
    meta: [
        {
            name: "description",
            content:
                "기념일 계산기로 소중한 날을 확인하세요. 100일, 200일, 1주년, 1000일까지 주요 기념일을 빠르고 쉽게 계산할 수 있습니다.",
        },
        {
            name: "keywords",
            content: "기념일 계산기, D-Day 계산기, 100일 계산기, 1주년 계산, 특별한 날",
        },
        {
            name: "author",
            content: "dimad",
        },
    ],
});

import { ref } from 'vue';

const anniversaryDate = ref(null);
const results = ref([]);

function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("ko-KR", options).format(date);
}
function calculateAnniversaries() {
    if (!anniversaryDate.value) {
        alert("기념일을 입력해주세요.");
        return;
    }

    const baseDate = new Date(anniversaryDate.value);

    const milestones = [
        { label: "100일", days: 100 },
        { label: "200일", days: 200 },
        { label: "300일", days: 300 },
        { label: "1주년", days: 365 },
        { label: "500일", days: 500 },
        { label: "1000일", days: 1000 },
        { label: "2주년", days: 730 },
        { label: "3주년", days: 1095 },
    ];

    results.value = milestones.map((milestone) => {
        const milestoneDate = new Date(baseDate);
        milestoneDate.setDate(baseDate.getDate() + milestone.days);
        return {
            label: milestone.label,
            date: formatDate(milestoneDate),
        };
    });
}
</script>

<style scoped>
body {
    font-family: "Arial", sans-serif;
}

h1 {
    font-size: 2.5rem;
}

p {
    font-size: 1.125rem;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    font-size: 1rem;
    line-height: 1.5rem;
}

@media (max-width: 768px) {
    h1 {
        font-size: 2rem;
    }

    .container {
        padding: 1rem;
    }

    p {
        font-size: 1rem;
    }

    li {
        font-size: 0.875rem;
    }
}
</style>
