<!-- pages/coming-soon.vue -->
<template>
    <main class="container mx-auto px-4 relative overflow-hidden">
        <!-- 배경 장식 -->
        <div class="absolute inset-0 max-w-6xl mx-auto -z-10">
            <div class="absolute top-1/4 -right-20 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-60"></div>
            <div class="absolute bottom-1/4 -left-20 w-96 h-96 bg-violet-300 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div class="min-h-[80vh] flex items-center justify-center py-12 sm:py-0">
            <div class="text-center max-w-lg mx-auto">
                <!-- 아이콘 -->
                <div class="mb-8 flex justify-center">
                    <div
                        class="w-20 h-20 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl flex items-center justify-center">
                        <BeakerIcon class="w-10 h-10 text-indigo-600" />
                    </div>
                </div>

                <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                    서비스 준비중
                </h1>

                <p class="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed">
                    더 나은 서비스 제공을 위해<br class="sm:hidden" /> 준비중입니다.<br>
                    조금만 기다려주세요!
                </p>

                <div class="space-y-4 sm:space-y-0 sm:space-x-4">
                    <NuxtLink to="/"
                        class="inline-flex items-center px-6 py-3.5 sm:py-3 text-base sm:text-lg bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all active:bg-indigo-800 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                        <ArrowLeftIcon class="w-5 h-5 mr-2" />
                        홈으로 돌아가기
                    </NuxtLink>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { BeakerIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'

useHead({
    // title: '서비스 준비중',
    titleTemplate: '%s | Coming Soon!'
});
</script>