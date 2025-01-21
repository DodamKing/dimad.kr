<!-- components/home/LatestProjects.vue -->
<template>
    <section class="py-24 md:py-32 relative overflow-hidden">
        <!-- 배경 효과 -->
        <div class="absolute inset-0 bg-slate-50/50 -z-10">
            <div
                class="absolute right-0 top-1/4 w-1/2 aspect-square rounded-full bg-gradient-to-b from-violet-100/40 to-transparent blur-3xl">
            </div>
            <div
                class="absolute left-0 bottom-1/4 w-1/2 aspect-square rounded-full bg-gradient-to-t from-indigo-100/40 to-transparent blur-3xl">
            </div>
        </div>

        <div class="container mx-auto px-4">
            <!-- 섹션 헤더 -->
            <div class="max-w-2xl mx-auto text-center mb-16">
                <span
                    class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-700 border border-violet-100/50 shadow-sm">
                    <BeakerIcon class="w-4 h-4 mr-2" />
                    Latest Projects
                </span>
                <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mt-6 mb-4">
                    새로운 실험,
                    <span class="text-violet-600 block sm:inline">최근 프로젝트</span>
                </h2>
                <p class="xl:text-lg text-slate-600">디지털 노마드의 실험실에서 탄생한 신선한 아이디어를 만나보세요</p>
            </div>

            <!-- 서비스 목록 -->
            <div class="relative">
                <!-- 모바일: 스크롤 가능한 목록 -->
                <div class="md:hidden overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
                    <div class="flex space-x-5">
                        <div v-for="service in previewServices" :key="service.id" class="w-[300px] flex-shrink-0">
                            <div
                                class="group h-full bg-white rounded-2xl p-6 border border-slate-100 hover:border-violet-200 shadow-sm hover:shadow-md transition-all duration-300">
                                <div class="flex items-start justify-between mb-6">
                                    <div
                                        class="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 text-violet-600 group-hover:scale-110 transition-transform duration-300">
                                        {{ service.icon }}
                                    </div>
                                    <span
                                        class="text-xs font-medium text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full">New</span>
                                </div>

                                <h3
                                    class="text-xl font-semibold text-slate-900 mb-3 group-hover:text-violet-600 transition-colors">
                                    {{ service.name }}
                                </h3>

                                <p class="text-slate-600 mb-6 line-clamp-3">
                                    {{ service.description }}
                                </p>

                                <NuxtLink :to="service.isImplemented ? service.path : '/coming-soon'"
                                    class="inline-flex items-center text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors">
                                    자세히 보기
                                    <ArrowRightIcon
                                        class="w-4 h-4 ml-1 group-hover:translate-x-1.5 transition-transform duration-300" />
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 데스크톱: 그리드 -->
                <div class="hidden md:grid md:grid-cols-3 gap-8">
                    <div v-for="service in previewServices" :key="service.id" class="group relative">
                        <!-- 호버 시 배경 효과 -->
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-violet-100/0 to-indigo-100/0 rounded-2xl group-hover:from-violet-100/50 group-hover:to-indigo-100/50 -z-10 transition-colors duration-300">
                        </div>

                        <div
                            class="h-full bg-white rounded-2xl p-8 border border-slate-100 group-hover:border-violet-200 shadow-sm hover:shadow-md transition-all duration-300">
                            <div class="flex items-start justify-between mb-6">
                                <div
                                    class="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 text-violet-600 group-hover:scale-110 transition-transform duration-300">
                                    {{ service.icon }}
                                </div>
                                <span
                                    class="text-xs font-medium text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full">New</span>
                            </div>

                            <h3
                                class="text-xl font-semibold text-slate-900 mb-3 group-hover:text-violet-600 transition-colors">
                                {{ service.name }}
                            </h3>

                            <p class="text-slate-600 mb-6 line-clamp-3">
                                {{ service.description }}
                            </p>

                            <NuxtLink :to="service.isImplemented ? service.path : '/coming-soon'"
                                class="inline-flex items-center text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors">
                                자세히 보기
                                <ArrowRightIcon
                                    class="w-4 h-4 ml-1 group-hover:translate-x-1.5 transition-transform duration-300" />
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 더보기 버튼 -->
            <div class="text-center mt-16">
                <NuxtLink to="/explore"
                    class="inline-flex items-center px-8 py-4 rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 transition-all duration-300 group">
                    모든 프로젝트 보기
                    <ArrowRightIcon class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { BeakerIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

// 최신 3개 프로젝트만 표시
const previewServices = computed(() => {
    const services = useServices()
    return [...services.services]
        .filter(service => service.isImplemented)
        .reverse()
        .slice(0, 3)
})
</script>

<style scoped>
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>