// pages/about.vue
<template>
    <div class="min-h-screen">
        <!-- Hero Section -->
        <section class="relative py-12 sm:py-20 overflow-hidden">
            <div class="absolute inset-0 -z-10">
                <div class="absolute inset-0 bg-gradient-to-b from-violet-50/50 to-white" />
                <!-- Background Animation -->
                <div class="absolute inset-0">
                    <div v-for="n in 3" :key="n"
                        class="absolute w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-r from-violet-300/20 to-indigo-300/20 rounded-full blur-2xl sm:blur-3xl animate-blob"
                        :style="{
                            'animation-delay': `${n * 2}s`,
                            left: `${n * 25}%`,
                            top: `${n * 15}%`
                        }" />
                </div>
            </div>

            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto">
                    <!-- Intro Card -->
                    <div
                        class="relative bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg border border-white/20">
                        <div class="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2">
                            <span
                                class="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm font-medium bg-violet-600 text-white shadow-lg">
                                <BeakerIcon class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                                DIMAD's Playground
                            </span>
                        </div>

                        <div class="text-center mb-6 sm:mb-8">
                            <h1
                                class="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                                일상과 재미를 더하는
                                <br class="hidden sm:block" />
                                <span class="relative">
                                    <span
                                        class="relative z-10 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                                        창의와 도전의 무대
                                    </span>
                                </span>
                            </h1>
                            <p class="text-base sm:text-lg text-slate-600 leading-relaxed px-2 sm:px-0">
                                <strong>DIMAD</strong>는 간단한 계산기, 세금·대출 안내, 퀴즈·테스트, 웹 게임 등
                                다양한 온라인 서비스를 한곳에 모아 선보이는 아이디어 랩입니다.
                                일상의 <strong>편의</strong>를 높이고, <strong>재미</strong>를 더하여
                                <strong>새로운 경험</strong>을 만들어가는 것이 DIMAD의 목표입니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section class="py-12 sm:py-20">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto space-y-12 sm:space-y-16">
                    <!-- Vision -->
                    <div class="text-center px-2 sm:px-0">
                        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">About DIMAD</h2>
                        <p class="text-base sm:text-lg text-slate-600 leading-relaxed">
                            'DIMAD'라는 이름은 <em>Digital Nomad</em>에서 영감을 얻었지만,
                            특정 콘셉트에 얽매이지 않고
                            <strong>자유롭게 새로운 온라인 서비스를 실험</strong>하고 있습니다.
                            일상을 편리하게 하는 <strong>실용적 도구</strong>부터
                            호기심을 자극하는 <strong>재미 요소</strong>까지,
                            <strong>누구나 간편히</strong> 접할 수 있도록 확장해나가는 게 목표입니다.
                        </p>
                    </div>

                    <!-- Categories -->
                    <div class="grid gap-4 sm:gap-6 md:grid-cols-2">
                        <div v-for="category in categories" :key="category.id"
                            class="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                            <div class="flex items-start gap-3 sm:gap-4">
                                <div class="flex-shrink-0">
                                    <component :is="category.icon" class="w-6 h-6 sm:w-8 sm:h-8 text-violet-500" />
                                </div>
                                <div>
                                    <h3 class="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                                        {{ category.name }}
                                    </h3>
                                    <p class="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4">
                                        {{ category.description }}
                                    </p>
                                    <div class="flex flex-wrap gap-1.5 sm:gap-2">
                                        <span v-for="sub in category.subCategories" :key="sub"
                                            class="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-slate-100 text-slate-600">
                                            {{ sub }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Journey -->
                    <div class="space-y-6 sm:space-y-8">
                        <div class="text-center px-2 sm:px-0">
                            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">Journey</h2>
                            <p class="text-base sm:text-lg text-slate-600">
                                끊임없이 실험과 시도를 거듭하며,
                                더 나은 서비스를 만들어가는 과정입니다.
                            </p>
                        </div>

                        <div class="relative border-l-2 border-violet-200 ml-2 sm:ml-4 space-y-6 sm:space-y-8">
                            <div v-for="(phase, index) in journey" :key="index" class="relative pl-6 sm:pl-8">
                                <div
                                    class="absolute -left-[33px] sm:-left-[41px] w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-violet-100 flex items-center justify-center">
                                    <component :is="phase.icon" class="w-3 h-3 sm:w-4 sm:h-4 text-violet-600" />
                                </div>
                                <div class="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
                                    <h3 class="text-base sm:text-lg font-medium text-slate-900 mb-2">
                                        {{ phase.title }}
                                    </h3>
                                    <p class="text-sm sm:text-base text-slate-600">
                                        {{ phase.description }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Collaboration Section -->
        <section class="py-12 sm:py-20 bg-slate-600 text-white">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto text-center">
                    <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">함께 만들어가요</h2>
                    <p class="text-slate-300 mb-6 sm:mb-8 px-2 sm:px-0">
                        DIMAD는 계속해서 새로운 아이디어와 피드백을 통해 발전합니다.
                        <strong>사용자가 느끼는 불편함</strong>이나
                        <strong>새로운 협업 제안</strong>이 있다면 언제든지 환영합니다.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <a href="mailto:contact@dimad.com"
                            class="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-slate-900 hover:bg-slate-100 transition-colors text-sm sm:text-base">
                            <EnvelopeIcon class="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
                            이메일로 제안하기
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import {
    BeakerIcon,
    RocketLaunchIcon,
    EnvelopeIcon,
    GlobeAltIcon,
    SparklesIcon
} from '@heroicons/vue/24/outline'

const { categories } = useCategories()

const journey = [
    {
        title: '시작',
        description: '간단한 계산기, 세금·대출 안내 등 기초적인 도구로 첫발을 내딛었습니다. 일상 속 불편함을 해결하는 작은 아이디어부터 차근차근 실현하고 있습니다.',
        icon: BeakerIcon
    },
    {
        title: '확장',
        description: '퀴즈·테스트, 웹 게임 등 재미 요소를 더하고 다양한 서비스를 추가해 갈 예정입니다.',
        icon: RocketLaunchIcon
    },
    {
        title: '성장',
        description: '사용자 의견을 듣고 협업 제안을 받아들여, 더 깊이 있고 유용한 기능을 확장할 계획입니다. 기술적 완성도와 안정성을 높이는 데 집중합니다.',
        icon: SparklesIcon
    },
    {
        title: '자유',
        description: '장소와 시간에 구애받지 않고, 누구나 편리하게 즐길 수 있는 온라인 실험실이 되길 꿈꿉니다. 끊임없이 새로운 가치를 창출하고자 합니다.',
        icon: GlobeAltIcon
    }
]
</script>

<style scoped>
.animate-blob {
    animation: blob 7s infinite;
}

@keyframes blob {
    0% {
        transform: translate(0px, 0px) scale(1);
    }

    33% {
        transform: translate(20px, -30px) scale(1.1);
    }

    66% {
        transform: translate(-15px, 15px) scale(0.9);
    }

    100% {
        transform: translate(0px, 0px) scale(1);
    }
}

@media (max-width: 640px) {
    .animate-blob {
        animation-duration: 10s;
        transform-origin: center;
    }
}
</style>