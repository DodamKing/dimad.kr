// pages/about.vue
<template>
    <div class="min-h-screen">
        <!-- 배경 효과 -->
        <div class="fixed inset-0 -z-10">
            <!-- 베이스 그라데이션 -->
            <div class="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-white/60"></div>

            <!-- 그리드 패턴 -->
            <div class="absolute inset-0" style="background-image: linear-gradient(rgb(15 23 42 / 0.07) 1px, transparent 1px), linear-gradient(to right, rgb(15 23 42 / 0.07) 1px, transparent 1px); 
            background-size: 40px 40px;">
            </div>

            <!-- 블롭 효과 개선 -->
            <div v-for="n in 5" :key="n" class="absolute aspect-square rounded-full mix-blend-multiply animate-blob"
                :class="[
                    // PC 화면
                    'hidden sm:block',
                    n === 1 ? 'bg-violet-200/40 w-[600px] -top-[10%] right-[10%] animation-delay-2000' : '',
                    n === 2 ? 'bg-indigo-200/40 w-[500px] top-[60%] -left-[10%] animation-delay-4000' : '',
                    n === 3 ? 'bg-purple-200/40 w-[550px] top-[25%] right-[20%] animation-delay-6000' : '',
                    n === 4 ? 'bg-fuchsia-200/40 w-[700px] -bottom-[10%] right-[15%] animation-delay-8000' : '',
                    n === 5 ? 'bg-blue-200/40 w-[650px] top-[40%] -left-[5%] animation-delay-10000' : ''
                ]" />

            <!-- 모바일용 블롭 효과 추가 -->
            <div v-for="n in 3" :key="`mobile-${n}`"
                class="absolute aspect-square rounded-full mix-blend-multiply animate-blob sm:hidden" :class="[
                    // 모바일 화면
                    n === 1 ? 'bg-violet-200/40 w-[300px] -top-[5%] right-[5%] animation-delay-2000' : '',
                    n === 2 ? 'bg-indigo-200/40 w-[350px] top-[40%] -left-[20%] animation-delay-4000' : '',
                    n === 3 ? 'bg-purple-200/40 w-[320px] bottom-[10%] right-[0%] animation-delay-6000' : ''
                ]" />

            <!-- 미묘한 노이즈 텍스처 -->
            <div class="absolute inset-0 bg-noise opacity-[0.15]"></div>

            <!-- 전체 오버레이 -->
            <div class="absolute inset-0 backdrop-blur-[1px]"></div>
        </div>

        <!-- Hero Section - 모바일 여백 최적화 -->
        <section class="relative py-16 sm:py-24 md:py-32 overflow-hidden">
            <div class="absolute inset-0 -z-10">
                <div class="absolute inset-0 bg-gradient-to-b from-violet-50/50 via-white/20 to-transparent"></div>
                <!-- 모바일에서 블롭 크기 조정 -->
                <div class="absolute inset-0">
                    <div v-for="n in 4" :key="n"
                        class="absolute w-48 sm:w-72 aspect-square bg-gradient-to-r from-violet-300/20 to-indigo-300/20 rounded-full blur-2xl sm:blur-3xl animate-blob"
                        :style="{
                            'animation-delay': `${n * 2}s`,
                            left: `${(n * 30) - 20}%`,
                            top: `${(n * 20) - 20}%`
                        }" />
                </div>
            </div>

            <div class="container mx-auto px-4">
                <div class="max-w-5xl mx-auto">
                    <!-- 인트로 카드 - 모바일 패딩 조정 -->
                    <div
                        class="relative bg-white/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg">
                        <div class="absolute -top-5 left-1/2 transform -translate-x-1/2">
                            <span
                                class="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg">
                                <BeakerIcon class="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-1.5 sm:mr-2" />
                                DIMAD's Playground
                            </span>
                        </div>

                        <div class="text-center">
                            <!-- 모바일 텍스트 크기 최적화 -->
                            <h1
                                class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 sm:mb-8 leading-tight">
                                일상과 재미를 더하는
                                <br class="hidden sm:block" />
                                <span class="relative inline-block mt-2">
                                    <span
                                        class="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                                        창의와 도전의 무대
                                    </span>
                                </span>
                            </h1>
                            <p class="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
                                <strong>DIMAD</strong>는 간단한 계산기, 세금·대출 안내, 퀴즈·테스트, 웹 게임 등
                                다양한 온라인 서비스를 한곳에 모아 선보이는 디지털 공간입니다.
                                <span class="block mt-2">
                                    일상의 <strong class="text-violet-600">편의</strong>를 높이고,
                                    <strong class="text-indigo-600">재미</strong>를 더하여
                                    <strong>새로운 경험</strong>을 만들어가는 것이 DIMAD의 목표입니다.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section - 모바일 여백 조정 -->
        <section class="py-12 sm:py-20">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto space-y-12 sm:space-y-20">
                    <!-- Vision -->
                    <div class="text-center px-4 sm:px-0">
                        <span class="inline-block text-xs sm:text-sm font-medium text-violet-600 mb-3 sm:mb-4">Our
                            Vision</span>
                        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">About DIMAD</h2>
                        <p class="text-base sm:text-lg text-slate-600 leading-relaxed">
                            'DIMAD'라는 이름은 <em>Digital Nomad</em>에서 영감을 얻었지만,
                            특정 콘셉트에 얽매이지 않고
                            <strong class="text-violet-600">자유롭게 새로운 온라인 서비스를 실험</strong>하고 있습니다.
                            <span class="block mt-2">
                                일상을 편리하게 하는 <strong class="text-indigo-600">실용적 도구</strong>부터
                                호기심을 자극하는 <strong>재미 요소</strong>까지,
                                <strong>누구나 간편히</strong> 접할 수 있도록 확장해나가는 게 목표입니다.
                            </span>
                        </p>
                    </div>

                    <!-- Categories - 모바일 그리드 최적화 -->
                    <div class="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                        <div v-for="category in categories" :key="category.id"
                            class="group bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-500">
                            <div class="flex items-start gap-3 sm:gap-4">
                                <div
                                    class="flex-shrink-0 p-2.5 sm:p-3 bg-violet-50 rounded-lg sm:rounded-xl group-hover:bg-violet-100 transition-colors duration-500">
                                    <component :is="category.icon" class="w-6 h-6 sm:w-8 sm:h-8 text-violet-600" />
                                </div>
                                <div>
                                    <h3
                                        class="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3 group-hover:text-violet-600 transition-colors duration-500">
                                        {{ category.name }}
                                    </h3>
                                    <p class="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4">
                                        {{ category.description }}
                                    </p>
                                    <div class="flex flex-wrap gap-1.5 sm:gap-2">
                                        <span v-for="sub in category.subCategories" :key="sub"
                                            class="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-slate-100 text-slate-600 group-hover:bg-violet-50 group-hover:text-violet-600 transition-colors duration-500">
                                            {{ sub }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Journey - 모바일 타임라인 최적화 -->
                    <div class="space-y-8 sm:space-y-10">
                        <div class="text-center px-4 sm:px-0">
                            <span class="inline-block text-xs sm:text-sm font-medium text-violet-600 mb-3 sm:mb-4">Our
                                Journey</span>
                            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">여정</h2>
                            <p class="text-base sm:text-lg text-slate-600">
                                끊임없이 실험과 시도를 거듭하며,
                                더 나은 서비스를 만들어가는 과정입니다.
                            </p>
                        </div>

                        <!-- 모바일 최적화된 타임라인 -->
                        <div class="relative">
                            <div
                                class="absolute left-4 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-200 via-violet-300 to-indigo-300">
                            </div>

                            <div class="space-y-8 sm:space-y-12">
                                <div v-for="(phase, index) in journey" :key="index"
                                    class="relative flex flex-col md:flex-row gap-6 sm:gap-8 md:even:flex-row-reverse">
                                    <!-- 아이콘 -->
                                    <div class="relative z-10 ml-4 sm:ml-8 md:ml-0 flex-shrink-0">
                                        <div
                                            class="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center rounded-full bg-white shadow-lg border-4 border-violet-100">
                                            <component :is="phase.icon" class="w-5 sm:w-6 h-5 sm:h-6 text-violet-600" />
                                        </div>
                                    </div>
                                    <!-- 컨텐츠 -->
                                    <div class="ml-4 sm:ml-8 md:ml-0 flex-1 md:max-w-[calc(50%-48px)]">
                                        <div
                                            class="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-shadow duration-500">
                                            <h3 class="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3">
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
                </div>
            </div>
        </section>

        <!-- Collaboration Section - 모바일 패딩 최적화 -->
        <section class="py-16 sm:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto text-center">
                    <span class="inline-block text-xs sm:text-sm font-medium text-violet-300 mb-3 sm:mb-4">
                        Together
                    </span>
                    <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                        더 나은 서비스를 만들어가요
                    </h2>
                    <p class="text-base sm:text-lg text-slate-300 mb-8 sm:mb-10">
                        DIMAD는 여러분의 의견을 소중히 생각합니다.
                        <span class="block mt-2">
                            <strong class="text-white">개선 의견</strong>이나
                            <strong class="text-white">새로운 아이디어</strong>가 있다면 언제든 알려주세요.
                        </span>
                    </p>
                    <a href="/contact"
                        class="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300">
                        <ChatBubbleBottomCenterTextIcon class="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                        문의하기
                    </a>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import {
    BeakerIcon,
    RocketLaunchIcon,
    ChatBubbleBottomCenterTextIcon,
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

useHead({
    titleTemplate: '%s | 소개',
    meta: [
        {
            name: 'description',
            content: 'dimad를 소개합니다.'
        }
    ]
})
</script>

<style scoped>
.animate-blob {
    animation: blob 7s infinite;
}

.bg-noise {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 200px 200px;
}

.animation-delay-10000 {
    animation-delay: 10s;
}

@keyframes blob {

    0%,
    100% {
        transform: translate(0, 0) scale(1) rotate(0deg);
    }

    33% {
        transform: translate(50px, -50px) scale(1.1) rotate(5deg);
    }

    66% {
        transform: translate(-30px, 30px) scale(0.9) rotate(-5deg);
    }
}

@media (max-width: 640px) {
    .animate-blob {
        animation-duration: 10s;
        transform-origin: center;
    }
}
</style>