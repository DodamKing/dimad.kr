<template>
    <section class="relative overflow-hidden">
        <!-- 배경 애니메이션 효과 -->
        <div class="absolute inset-0 -z-10">
            <div class="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px]"></div>
        </div>

        <div class="container mx-auto px-4 pt-32 pb-24 md:pt-40 md:pb-32">
            <div class="max-w-4xl mx-auto text-center">
                <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
                    이름 궁합 테스트
                    <span
                        class="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                        재미있게 확인해보세요
                    </span>
                </h1>

                <p class="text-lg md:text-xl text-slate-600 mb-12">
                    두 사람의 이름으로 궁합을 확인하고 재미있는 결과를 받아보세요.<br class="hidden sm:block">
                    당신의 이름 궁합 점수를 지금 바로 확인해보세요!
                </p>

                <p class="text-base md:text-lg text-slate-500 mb-8">
                    이 테스트는 이름의 길이와 랜덤 요소를 결합하여 재미있는 결과를 제공합니다. <br>
                    친구, 가족 또는 연인과 함께 즐겨보세요!
                </p>

                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <form @submit.prevent="handleSubmit" class="flex flex-col items-center w-full sm:w-auto">
                        <div class="form-group mb-4">
                            <label for="name1" class="block text-slate-700 mb-2">첫 번째 이름</label>
                            <input type="text" id="name1" v-model="name1" placeholder="첫 번째 이름을 입력하세요" required
                                class="px-4 py-2 border rounded-lg w-full sm:w-80" />
                        </div>

                        <div class="form-group mb-6">
                            <label for="name2" class="block text-slate-700 mb-2">두 번째 이름</label>
                            <input type="text" id="name2" v-model="name2" placeholder="두 번째 이름을 입력하세요" required
                                class="px-4 py-2 border rounded-lg w-full sm:w-80" />
                        </div>

                        <button type="submit"
                            class="px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all">
                            궁합 확인하기
                        </button>
                    </form>
                </div>

                <div v-if="result" class="result mt-12">
                    <h2 class="text-3xl font-bold text-slate-900 mb-4">결과</h2>
                    <p class="text-xl text-slate-700">
                        <strong>{{ result.percentage }}%</strong> - {{ result.message }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
useHead({
    titleTemplate: '%s | 이름 궁합 테스트 - 재미있는 궁합 결과 확인하기',
    meta: [
        {
            name: "description",
            content:
                "이름 궁합 테스트를 통해 친구, 연인, 가족과의 궁합을 재미있게 확인하세요. 이름으로 운명적인 관계를 확인할 수 있습니다.",
        },
        {
            name: "keywords",
            content: "이름 궁합, 궁합 테스트, 재미있는 테스트, 이름으로 궁합 보기",
        },
        {
            property: "og:title",
            content: "이름 궁합 테스트 - 재미있는 궁합 결과 확인하기",
        },
        {
            property: "og:description",
            content:
                "이름 궁합 테스트를 통해 친구, 연인, 가족과의 궁합을 재미있게 확인하세요. 이름으로 운명적인 관계를 확인할 수 있습니다.",
        },
        {
            property: "og:image",
            content: "/path-to-your-image.jpg",
        },
        {
            name: "twitter:card",
            content: "summary_large_image",
        },
    ],
});

import { ref } from 'vue';

const name1 = ref('');
const name2 = ref('');
const result = ref(null);

function calculateMatch(name1, name2) {
    const asciiSum = (name) =>
        [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);

    const sum1 = asciiSum(name1);
    const sum2 = asciiSum(name2);
    const matchPercentage = Math.round(((sum1 + sum2) % 100));

    let message = '';
    if (matchPercentage > 80) {
        message = '최고의 궁합이에요! 서로 운명 같은 인연입니다.';
    } else if (matchPercentage > 60) {
        message = '좋은 궁합이에요! 잠재력이 많습니다.';
    } else if (matchPercentage > 40) {
        message = '보통 궁합이에요. 노력하면 더 좋아질 수 있습니다.';
    } else {
        message = '낮은 궁합입니다. 하지만 노력하면 가능성이 있습니다!';
    }

    return { percentage: matchPercentage, message };
}

function handleSubmit() {
    if (name1.value && name2.value) {
        result.value = calculateMatch(name1.value, name2.value);
    }
}
</script>

<style scoped>
.result {
    text-align: center;
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
