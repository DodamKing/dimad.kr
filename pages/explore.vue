<!-- pages/explore.vue -->
<template>
    <section class="py-24 relative overflow-hidden">
        <!-- 배경 패턴 -->
        <div class="absolute inset-0 -z-10">
            <div class="absolute inset-0 bg-grid-slate-900/[0.02] bg-[size:20px_20px]"></div>
            <div class="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
        </div>

        <div class="container mx-auto px-4">
            <!-- 헤더 섹션 -->
            <div class="max-w-2xl mx-auto text-center mb-16">
                <span
                    class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-800 border border-violet-100 mb-4">
                    <BeakerIcon class="w-4 h-4 mr-2" />
                    디지털 서비스
                </span>
                <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    서비스 둘러보기
                </h2>
                <p class="text-lg text-slate-600">
                    더 나은 디지털 경험을 위한 다양한 서비스를 제공합니다.<br>
                    새로운 서비스를 지속적으로 업데이트하고 있어요.
                </p>
            </div>

            <!-- 카테고리별 서비스 섹션 -->
            <div class="space-y-20">
                <div v-for="category in activeCategories" :key="category.id" class="space-y-8">
                    <!-- 카테고리 헤더 -->
                    <div class="flex items-center gap-3 pb-2 border-b border-slate-200">
                        <component :is="category.icon" class="w-6 h-6 text-violet-600" />
                        <div>
                            <h3 class="text-2xl font-bold text-slate-900">{{ category.name }}</h3>
                            <p class="text-sm text-slate-500">{{ category.description }}</p>
                        </div>
                    </div>

                    <!-- 카테고리별 서비스 그리드 -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div v-for="service in getServicesByCategory(category.id)" :key="service.id"
                            class="group relative p-8 bg-white rounded-2xl border border-slate-100 hover:border-violet-200 transition-all duration-300">
                            <!-- 서비스 카드 배경 효과 -->
                            <div
                                class="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity">
                            </div>

                            <!-- 서비스 상태 뱃지 -->
                            <div class="absolute top-4 right-4">
                                <span v-if="service.isImplemented"
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <div class="w-2 h-2 rounded-full bg-green-600 mr-1"></div>
                                    운영중
                                </span>
                                <span v-else
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                    <BeakerIcon class="w-2 h-2 mr-1" />
                                    실험중
                                </span>
                            </div>

                            <!-- 서비스 아이콘 -->
                            <div class="relative mb-6">
                                <div
                                    class="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 text-violet-600 text-2xl">
                                    {{ service.icon }}
                                </div>
                            </div>

                            <!-- 서비스 내용 -->
                            <div class="relative">
                                <h3 class="text-xl font-semibold mb-3 text-slate-900">{{ service.name }}</h3>
                                <p class="text-slate-600 mb-6">{{ service.description }}</p>

                                <NuxtLink :to="service.isImplemented ? service.path : '/coming-soon'"
                                    class="inline-flex items-center text-sm font-medium text-violet-600 hover:text-violet-700">
                                    {{ service.isImplemented ? '사용해보기' : '준비중' }}
                                    <ArrowRightIcon
                                        class="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 서비스가 없을 경우 -->
            <div v-if="activeCategories.length === 0" class="text-center py-12">
                <p class="text-slate-600">아직 서비스가 준비되지 않았습니다.</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { BeakerIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

const servicesList = useServices()
const { categories } = useCategories()

// 실제 서비스가 있는 카테고리만 필터링
const activeCategories = computed(() => {
    const servicesWithCategories = servicesList.services.map(service => service.categoryId)
    const uniqueCategories = [...new Set(servicesWithCategories)]
    return categories.filter(category => uniqueCategories.includes(category.id))
})

const getServicesByCategory = (categoryId: string) => {
    return servicesList.services.filter(service => service.categoryId === categoryId)
}
</script>