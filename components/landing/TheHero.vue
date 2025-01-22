<!-- components/home/HeroSection.vue -->
<template>
    <section class="relative overflow-hidden flex items-center">
        <!-- 인터랙티브 배경 효과 -->
        <div class="absolute inset-0 -z-10">
            <!-- 동적 그리드 패턴 -->
            <div
                class="absolute inset-0 bg-slate-900/[0.04] bg-[size:20px_20px] grid grid-cols-[20px] grid-rows-[20px]">
            </div>

            <!-- 애니메이션 원형 그라데이션 -->
            <div
                class="absolute top-0 -left-1/4 w-1/2 aspect-square rounded-full bg-gradient-to-r from-violet-500/40 to-fuchsia-500/40 blur-3xl animate-blob">
            </div>
            <div
                class="absolute bottom-0 -right-1/4 w-1/2 aspect-square rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl animate-blob animation-delay-2000">
            </div>

            <!-- 오버레이 -->
            <div class="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/60 backdrop-blur-[2px]">
            </div>
        </div>

        <div class="container mx-auto px-4 py-12 sm:py-16 md:py-24 lg:py-32">
            <div class="max-w-5xl mx-auto">
                <!-- 상단 뱃지 -->
                <div class="perspective-1000">
                    <div class="inline-block mb-6 animate-float">
                        <span
                            class="inline-flex items-center px-4 py-2 rounded-full text-xs xl:text-sm font-medium bg-gradient-to-r from-violet-500/10 to-indigo-500/10 text-violet-700 border border-violet-200/50 shadow-lg shadow-violet-500/5">
                            <SparklesIcon class="w-4 h-4 mr-2 animate-pulse" />
                            DIMAD's Creative Lab
                        </span>
                    </div>
                </div>

                <!-- 메인 헤드라인 -->
                <h1
                    class="text-3xl sm:text-4xl md:text-7xl xl:text-8xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
                    <span class="relative inline-block mb-2">
                        창의적인 아이디어로
                        <div
                            class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-indigo-500 transform scale-x-0 animate-expand-line">
                        </div>
                    </span>
                    <br />
                    <span class="relative">
                        <span
                            class="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">일상의
                            가치</span>를
                        <span class="relative inline-block">
                            확장
                            <svg class="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 100 8"
                                preserveAspectRatio="none">
                                <path d="M0,0 C50,8 50,8 100,0" stroke="url(#gradient)" stroke-width="2" fill="none" />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style="stop-color: rgb(124, 58, 237)" />
                                        <stop offset="100%" style="stop-color: rgb(79, 70, 229)" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                    </span>
                </h1>

                <!-- 서브 텍스트 -->
                <p class="text-m md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                    <span class="block mb-4 transition-all hover:text-slate-900">
                        간단한 계산기부터 퀴즈·테스트까지,
                        <br>
                        <strong class="text-violet-600">유용한 도구</strong>와
                        <strong class="text-indigo-600">즐거운 콘텐츠</strong>를 실험합니다.
                    </span>
                    <span class="block transition-all hover:text-slate-900">
                        당신의 <strong class="text-violet-600">일상</strong>에
                        <strong class="text-indigo-600">영감</strong>을 불어넣는
                        <span class="font-semibold">디지털 실험실</span>입니다.
                    </span>
                </p>

                <!-- CTA 버튼 -->
                <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <NuxtLink to="/explore"
                        class="group relative px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all flex items-center justify-center overflow-hidden shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20">
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        </div>
                        <span class="relative flex items-center">
                            <MapIcon class="w-5 h-5 mr-2" />
                            서비스 둘러보기
                            <ArrowRightIcon
                                class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </span>
                    </NuxtLink>
                    <NuxtLink to="/about"
                        class="group px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-600 rounded-full border border-slate-200 hover:bg-white hover:border-slate-300 hover:text-slate-900 transition-all flex items-center justify-center shadow-lg shadow-slate-900/5 hover:shadow-slate-900/10">
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

<style scoped>
.perspective-1000 {
    perspective: 1000px;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0) rotateX(0);
    }

    50% {
        transform: translateY(-10px) rotateX(5deg);
    }
}

@keyframes blob {

    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }

    25% {
        transform: translate(20px, -20px) scale(1.1);
    }

    50% {
        transform: translate(-20px, 20px) scale(0.9);
    }

    75% {
        transform: translate(20px, 20px) scale(1.05);
    }
}

@keyframes expand-line {
    from {
        transform: scaleX(0);
    }

    to {
        transform: scaleX(1);
    }
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}

.animate-blob {
    animation: blob 10s infinite;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animate-expand-line {
    animation: expand-line 1s ease-out forwards;
    animation-delay: 0.5s;
}
</style>