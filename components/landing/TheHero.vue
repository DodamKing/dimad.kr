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
                        Digital Nomad의 작은 실험실
                    </span>
                </div>

                <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
                    자유롭게 만드는
                    <span
                        class="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                        디지털 가치
                    </span>
                </h1>

                <p class="text-lg md:text-xl text-slate-600 mb-12">
                    실용적인 도구부터 재미있는 콘텐츠까지,<br class="hidden sm:block">
                    더 나은 디지털 경험을 위한 다양한 실험을 이어갑니다.<br class="hidden sm:block">
                    <span class="text-violet-600 font-medium">Digital Nomad</span>의 자유로운 여정에 함께해주세요.
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

const navigation = useNavigation()
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