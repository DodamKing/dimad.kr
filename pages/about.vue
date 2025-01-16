<!-- pages/about.vue -->
<template>
    <div class="min-h-screen">
        <!-- 히어로 섹션 -->
        <section class="relative py-20 overflow-hidden">
            <div class="absolute inset-0 -z-10">
                <div class="absolute inset-0 bg-gradient-to-b from-violet-50/50 to-white"></div>
                <!-- 배경 애니메이션 효과 -->
                <div class="absolute inset-0">
                    <div v-for="n in 3" :key="n"
                        class="absolute w-40 h-40 bg-gradient-to-r from-violet-300/20 to-indigo-300/20 rounded-full blur-3xl animate-blob"
                        :style="{
                            'animation-delay': `${n * 2}s`,
                            left: `${n * 30}%`,
                            top: `${n * 20}%`
                        }">
                    </div>
                </div>
            </div>

            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto">
                    <!-- 인트로 카드 -->
                    <div
                        class="relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-lg border border-white/20">
                        <div class="absolute -top-6 left-1/2 transform -translate-x-1/2">
                            <span
                                class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-violet-600 text-white shadow-lg">
                                <BeakerIcon class="w-4 h-4 mr-2" />
                                Digital Nomad's Lab
                            </span>
                        </div>

                        <div class="text-center mb-8">
                            <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                                디지털로 경험하는
                                <span class="relative">
                                    <span
                                        class="relative z-10 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                                        새로운 가치
                                    </span>
                                </span>
                            </h1>
                            <p class="text-lg text-slate-600 leading-relaxed">
                                실용적인 도구부터 재미있는 콘텐츠까지,<br class="hidden sm:block">
                                당신의 디지털 경험을 더 풍부하게 만들어갑니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 실험실 소개 섹션 -->
        <section class="py-20">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto space-y-16">
                    <!-- 비전 -->
                    <div class="text-center">
                        <h2 class="text-3xl font-bold text-slate-900 mb-6">Vision</h2>
                        <p class="text-lg text-slate-600 leading-relaxed">
                            디지털 노마드의 자유로운 라이프스타일을 추구하며,<br class="hidden sm:block">
                            더 많은 사람들에게 가치있는 디지털 경험을 제공합니다.
                        </p>
                    </div>

                    <!-- 카테고리별 서비스 -->
                    <div class="grid md:grid-cols-2 gap-6">
                        <div v-for="category in categories" :key="category.id"
                            class="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                            <div class="flex items-start gap-4">
                                <div class="flex-shrink-0">
                                    <component :is="category.icon" class="w-8 h-8 text-violet-500" />
                                </div>
                                <div>
                                    <h3 class="text-xl font-semibold text-slate-900 mb-2">{{ category.name }}</h3>
                                    <p class="text-slate-600 mb-4">{{ category.description }}</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span v-for="sub in category.subCategories" :key="sub"
                                            class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-600">
                                            {{ sub }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 여정 -->
                    <div class="space-y-8">
                        <div class="text-center">
                            <h2 class="text-3xl font-bold text-slate-900 mb-6">Journey</h2>
                            <p class="text-lg text-slate-600">끊임없는 실험과 도전을 통해 성장합니다</p>
                        </div>

                        <div class="relative border-l-2 border-violet-200 ml-4 space-y-8">
                            <div v-for="(phase, index) in journey" :key="index" class="relative pl-8">
                                <div
                                    class="absolute -left-[41px] w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                                    <component :is="phase.icon" class="w-4 h-4 text-violet-600" />
                                </div>
                                <div class="bg-white rounded-xl p-6 shadow-sm">
                                    <h3 class="text-lg font-medium text-slate-900 mb-2">{{ phase.title }}</h3>
                                    <p class="text-slate-600">{{ phase.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 협업 섹션 -->
        <section class="py-20 bg-slate-900 text-white">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto text-center">
                    <h2 class="text-3xl font-bold mb-6">함께 만들어가요</h2>
                    <p class="text-slate-300 mb-8">
                        새로운 아이디어나 협업 제안을 기다립니다.<br>
                        여러분의 의견이 새로운 가치가 됩니다.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="mailto:contact@dimad.com"
                            class="inline-flex items-center px-6 py-3 rounded-full bg-white text-slate-900 hover:bg-slate-100 transition-colors">
                            <EnvelopeIcon class="w-5 h-5 mr-2" />
                            이메일로 제안하기
                        </a>
                        <a href="https://github.com/yourusername" target="_blank"
                            class="inline-flex items-center px-6 py-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors">
                            GitHub 방문하기
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
        description: '실용적인 도구들로 시작한 디지털 실험실. 일상의 불편함을 해결하는 것부터 시작했습니다.',
        icon: BeakerIcon
    },
    {
        title: '확장',
        description: '실용성에 재미를 더해 다양한 형태의 디지털 콘텐츠로 가치를 확장합니다.',
        icon: RocketLaunchIcon
    },
    {
        title: '성장',
        description: '사용자들의 피드백과 제안을 통해 더 나은 서비스를 만들어갑니다.',
        icon: SparklesIcon
    },
    {
        title: '자유',
        description: '디지털 가치 창출을 통해 장소에 구애받지 않는 자유로운 라이프스타일을 실현합니다.',
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
        transform: translate(30px, -50px) scale(1.1);
    }

    66% {
        transform: translate(-20px, 20px) scale(0.9);
    }

    100% {
        transform: translate(0px, 0px) scale(1);
    }
}
</style>