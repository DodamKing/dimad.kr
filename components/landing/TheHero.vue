<template>
    <section class="relative overflow-hidden">
        <!-- 배경 애니메이션 효과 -->
        <div class="absolute inset-0 -z-10">
            <div class="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px] animate-pulse-slow"></div>
            <!-- 그라데이션 오버레이 -->
            <div class="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
        </div>

        <div class="container mx-auto px-4 pt-32 pb-24 md:pt-40 md:pb-32">
            <div class="max-w-4xl mx-auto text-center">
                <div class="inline-block mb-4">
                    <span
                        class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-800 border border-violet-100">
                        <SparklesIcon class="w-4 h-4 mr-2" />
                        DIMAD의 상상 놀이터
                    </span>
                </div>

                <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
                    창의적인 아이디어로
                    <span
                        class="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                        일상의 가치를 확장
                    </span>
                </h1>

                <p class="text-lg md:text-xl text-slate-600 mb-12">
                    간단한 계산기부터 퀴즈·테스트까지,<br class="hidden sm:block">
                    <strong>유용한 도구</strong>와 <strong>즐거운 콘텐츠</strong>를 실험하는 창의적인 공간입니다.
                    <br class="hidden sm:block">
                    <strong>일상의 편의</strong>를 높이고 <strong>재미</strong>를 더하기 위해,
                    <br class="hidden sm:block">
                    <span class="text-violet-600 font-medium">DIMAD</span>는 끊임없이 새로운 아이디어를 시도하고 있습니다.
                </p>

                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <NuxtLink to="/explore"
                        class="group px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all flex items-center justify-center">
                        <MapIcon class="w-5 h-5 mr-2" />
                        서비스 둘러보기
                        <ArrowRightIcon class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </NuxtLink>
                    <NuxtLink to="/about"
                        class="px-8 py-4 bg-white text-slate-600 rounded-full border hover:border-slate-300 transition-all flex items-center justify-center">
                        <UserIcon class="w-5 h-5 mr-2" />
                        DIMAD 소개
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { SparklesIcon, MapIcon, ArrowRightIcon, UserIcon } from '@heroicons/vue/24/outline'
</script>

<style>
.animate-pulse-slow {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: .1;
    }

    50% {
        opacity: .2;
    }
}
</style>