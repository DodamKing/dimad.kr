<template>
    <section class="py-16 md:py-24">
        <div class="container mx-auto px-4">
            <!-- 섹션 헤더 -->
            <div class="max-w-2xl mx-auto text-center mb-12">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-violet-50 text-violet-700 mb-4">
                    <BeakerIcon class="w-4 h-4 mr-1" />
                    Latest Projects
                </span>
                <h2 class="text-3xl font-bold text-slate-900 mb-4">최근 프로젝트</h2>
                <p class="text-slate-600">디지털 노마드의 실험실에서 만들어진 최근 프로젝트들을 확인해보세요</p>
            </div>

            <!-- 서비스 목록 -->
            <div class="relative">
                <!-- 모바일: 스크롤 가능한 목록 -->
                <div class="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                    <div class="flex space-x-4">
                        <div v-for="service in previewServices" :key="service.id"
                            class="w-[280px] flex-shrink-0 bg-white rounded-2xl p-6 border border-slate-100">
                            <div
                                class="w-12 h-12 flex items-center justify-center rounded-xl bg-violet-50 text-violet-600 mb-4">
                                {{ service.icon }}
                            </div>

                            <h3 class="text-lg font-semibold text-slate-900 mb-2">
                                {{ service.name }}
                            </h3>

                            <p class="text-sm text-slate-600 mb-4 line-clamp-2">
                                {{ service.description }}
                            </p>

                            <NuxtLink :to="service.path"
                                class="inline-flex items-center text-sm font-medium text-violet-600">
                                자세히 보기
                                <ArrowRightIcon class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- 데스크톱: 그리드 -->
                <div class="hidden md:grid md:grid-cols-3 gap-6">
                    <div v-for="service in previewServices" :key="service.id"
                        class="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-violet-200 transition-all">
                        <div
                            class="w-12 h-12 flex items-center justify-center rounded-xl bg-violet-50 text-violet-600 mb-4">
                            {{ service.icon }}
                        </div>

                        <h3 class="text-lg font-semibold text-slate-900 mb-2">
                            {{ service.name }}
                        </h3>

                        <p class="text-sm text-slate-600 mb-4 line-clamp-2">
                            {{ service.description }}
                        </p>

                        <NuxtLink :to="service.isImplemented ? service.path : '/coming-soon'"
                            class="inline-flex items-center text-sm font-medium text-violet-600">
                            자세히 보기
                            <ArrowRightIcon class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- 더보기 버튼 -->
            <div class="text-center mt-12">
                <NuxtLink to="/explore"
                    class="inline-flex items-center px-6 py-3 rounded-full bg-violet-50 text-violet-700 hover:bg-violet-100 transition-colors">
                    모든 프로젝트 보기
                    <ArrowRightIcon class="w-4 h-4 ml-2" />
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { BeakerIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

// 현재는 최신 3개 서비스만 표시 (나중에 로직 변경 가능)
const previewServices = computed(() => {
    const services = useServices()
    return [...services.services].filter(service => service.isImplemented).reverse().slice(0, 3)
})
</script>

<style scoped>
.scrollbar-hide {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari and Opera */
}
</style>