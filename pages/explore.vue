<!-- pages/explore.vue -->
<template>
    <section class="py-16 md:py-24 relative overflow-hidden">
        <!-- 배경 효과 -->
        <div class="absolute inset-0 -z-10">
            <div class="absolute inset-0 bg-grid-slate-900/[0.02] bg-[size:16px_16px] sm:bg-[size:20px_20px]"></div>
            <!-- 동적 그라디언트 블롭 -->
            <div v-for="n in 3" :key="n"
                class="absolute w-48 sm:w-72 md:w-96 aspect-square rounded-full blur-2xl sm:blur-3xl animate-blob opacity-30"
                :class="[
                    n === 1 ? 'bg-violet-100 top-0 right-0 animation-delay-2000' : '',
                    n === 2 ? 'bg-indigo-100 bottom-0 left-0 animation-delay-4000' : '',
                    n === 3 ? 'bg-purple-100 top-1/2 left-1/3 animation-delay-6000' : ''
                ]"></div>
            <div class="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80 backdrop-blur-sm">
            </div>
        </div>

        <div class="container mx-auto px-4">
            <!-- 헤더 섹션 -->
            <div class="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                <span
                    class="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-violet-500/10 to-indigo-500/10 text-violet-700 border border-violet-100/50 shadow-lg mb-4 sm:mb-6">
                    <BeakerIcon class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    디지털 서비스
                </span>
                <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                    서비스 둘러보기
                </h2>
                <p class="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
                    더 나은 디지털 경험을 위한<br class="sm:hidden" /> 다양한 서비스를 제공합니다.<br>
                    새로운 서비스를 지속적으로 업데이트하고 있어요.
                </p>
            </div>

            <!-- 카테고리 탭 -->
            <div class="fixed top-20 left-0 right-0 bg-white/80 backdrop-blur-sm z-30 ">
                <div class="container mx-auto px-4">
                    <div class="overflow-x-auto scrollbar-hide py-2">
                        <div class="flex gap-2 min-w-max">
                            <button v-for="category in activeCategories" :key="category.id"
                                @click="scrollToCategory(category.id)"
                                class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                                :class="[
                                    activeCategoryId === category.id
                                        ? 'bg-violet-600 text-white shadow-md'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-200'
                                ]">
                                <component :is="category.icon" class="w-4 h-4" />
                                {{ category.name }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 카테고리별 서비스 목록 -->
            <div class="space-y-16 md:space-y-20">
                <div v-for="category in activeCategories" :key="category.id"
                    :ref="(el) => setCategoryRef(el as HTMLElement | null, category.id)" class="space-y-6">
                    <!-- 카테고리 헤더 -->
                    <div class="relative">
                        <div class="flex items-start sm:items-center gap-4">
                            <div class="p-3 rounded-xl bg-violet-50 text-violet-600">
                                <component :is="category.icon" class="w-6 h-6" />
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold text-slate-900">{{ category.name }}</h3>
                                <p class="text-slate-600 mt-1">{{ category.description }}</p>
                            </div>
                        </div>
                        <div
                            class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-violet-200 via-indigo-200 to-transparent">
                        </div>
                    </div>

                    <!-- 모바일: 가로 스크롤 서비스 목록 -->
                    <div class="md:hidden relative -mx-4 px-4">
                        <div class="overflow-x-auto scrollbar-hide">
                            <div class="flex gap-4 min-w-max pb-4">
                                <div v-for="service in getServicesByCategory(category.id)" :key="service.id"
                                    class="w-[280px] flex-shrink-0">
                                    <div
                                        class="group h-full bg-white rounded-xl border border-slate-100 hover:border-violet-200 p-5 shadow-sm hover:shadow-md transition-all duration-300">
                                        <!-- 서비스 상태 뱃지 -->
                                        <div class="relative mb-5"> <!-- 컨테이너 추가 -->
                                            <!-- 서비스 아이콘 -->
                                            <div
                                                class="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-violet-50 to-indigo-50 text-violet-600 text-xl group-hover:scale-110 transition-transform duration-300">
                                                {{ service.icon }}
                                            </div>

                                            <!-- 서비스 상태 뱃지 - 위치 조정 -->
                                            <div class="absolute -top-2 -right-2">
                                                <span v-if="service.isImplemented"
                                                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                    <div class="w-1 h-1 rounded-full bg-green-500 mr-1 animate-pulse">
                                                    </div>
                                                    운영중
                                                </span>
                                                <span v-else
                                                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                                                    <BeakerIcon class="w-2.5 h-2.5 mr-1" />
                                                    실험중
                                                </span>
                                            </div>
                                        </div>

                                        <!-- 서비스 내용 -->
                                        <h3
                                            class="text-lg font-semibold mb-2 text-slate-900 group-hover:text-violet-600 transition-colors">
                                            {{ service.name }}
                                        </h3>
                                        <p class="text-sm text-slate-600 mb-4 line-clamp-2">{{ service.description }}
                                        </p>

                                        <NuxtLink :to="service.isImplemented ? service.path : '/coming-soon'"
                                            class="inline-flex items-center text-sm font-medium text-violet-600 hover:text-violet-700">
                                            {{ service.isImplemented ? '사용해보기' : '준비중' }}
                                            <ArrowRightIcon
                                                class="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 스와이프 안내 -->
                        <div
                            class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none flex items-center justify-start z-10">
                            <ChevronRightIcon class="w-5 h-5 text-slate-400 animate-bounce-x" />
                        </div>
                    </div>

                    <!-- 데스크톱: 그리드 레이아웃 -->
                    <div class="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="service in getServicesByCategory(category.id)" :key="service.id"
                            class="group relative">
                            <div
                                class="absolute inset-0 bg-gradient-to-br from-violet-50/0 to-indigo-50/0 rounded-2xl group-hover:from-violet-50/50 group-hover:to-indigo-50/50 transition-colors duration-500">
                            </div>

                            <div
                                class="relative h-full p-6 bg-white rounded-2xl border border-slate-100 group-hover:border-violet-200 shadow-sm hover:shadow-md transition-all duration-300">
                                <!-- 서비스 상태 뱃지 -->
                                <div class="absolute top-4 right-4">
                                    <span v-if="service.isImplemented"
                                        class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                        <div class="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></div>
                                        운영중
                                    </span>
                                    <span v-else
                                        class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                                        <BeakerIcon class="w-3 h-3 mr-1.5" />
                                        실험중
                                    </span>
                                </div>

                                <!-- 서비스 아이콘 -->
                                <div class="mb-6">
                                    <div
                                        class="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 text-violet-600 text-2xl group-hover:scale-110 transition-transform duration-300">
                                        {{ service.icon }}
                                    </div>
                                </div>

                                <!-- 서비스 내용 -->
                                <h3
                                    class="text-xl font-semibold mb-3 text-slate-900 group-hover:text-violet-600 transition-colors duration-300">
                                    {{ service.name }}
                                </h3>
                                <p class="text-slate-600 mb-6 line-clamp-2">{{ service.description }}</p>

                                <NuxtLink :to="service.isImplemented ? service.path : '/coming-soon'"
                                    class="inline-flex items-center text-sm font-medium text-violet-600 hover:text-violet-700">
                                    {{ service.isImplemented ? '사용해보기' : '준비중' }}
                                    <ArrowRightIcon
                                        class="w-4 h-4 ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 서비스가 없을 경우 -->
            <div v-if="activeCategories.length === 0"
                class="flex flex-col items-center justify-center py-16 sm:py-20 text-center px-4">
                <div
                    class="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 rounded-full bg-slate-100 flex items-center justify-center">
                    <BeakerIcon class="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                </div>
                <p class="text-base sm:text-lg text-slate-600">아직 서비스가 준비되지 않았습니다.</p>
                <p class="text-sm sm:text-base text-slate-500 mt-2">새로운 서비스로 곧 찾아뵙겠습니다!</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { BeakerIcon, ArrowRightIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const servicesList = useServices()
const { categories } = useCategories()

const activeCategoryId = ref('')
const categoryRefs = ref<Record<string, HTMLElement | null>>({})
const setCategoryRef = (el: HTMLElement | null, categoryId: string) => {
    if (el) categoryRefs.value[categoryId] = el
}

// 활성화된 카테고리들
const activeCategories = computed(() => {
    const servicesWithCategories = servicesList.services.map(service => service.categoryId)
    const uniqueCategories = [...new Set(servicesWithCategories)]
    const filteredCategories = categories.filter(category => uniqueCategories.includes(category.id))

    // 초기 활성 카테고리 설정
    if (filteredCategories.length > 0 && !activeCategoryId.value) {
        activeCategoryId.value = filteredCategories[0].id
    }

    return filteredCategories
})

// 스크롤 핸들링
const scrollToCategory = (categoryId: string) => {
    nextTick(() => {
        activeCategoryId.value = categoryId
        const element = categoryRefs.value[categoryId]
        if (element) {
            const headerOffset = 180 // 메인 헤더(80px) + 카테고리 탭 높이(60px) + 여백(40px)
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            const offsetPosition = elementPosition - headerOffset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    })
}

// 스크롤 위치에 따른 활성 카테고리 업데이트
const updateActiveCategory = () => {
    let closestCategory = activeCategories.value[0]?.id
    let minDistance = Infinity

    for (const category of activeCategories.value) {
        const element = categoryRefs.value[category.id]
        if (element) {
            const rect = element.getBoundingClientRect()
            const distance = Math.abs(rect.top - 140) // 헤더 높이만큼 offset

            if (distance < minDistance) {
                minDistance = distance
                closestCategory = category.id
            }
        }
    }

    if (closestCategory && closestCategory !== activeCategoryId.value) {
        activeCategoryId.value = closestCategory
    }
}

const debouncedUpdateActiveCategory = () => {
    if (window.requestAnimationFrame) {
        window.requestAnimationFrame(updateActiveCategory)
    } else {
        updateActiveCategory()
    }
}

onMounted(() => {
    // 초기 카테고리 설정
    if (activeCategories.value.length > 0) {
        activeCategoryId.value = activeCategories.value[0].id
    }

    window.addEventListener('scroll', debouncedUpdateActiveCategory, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', debouncedUpdateActiveCategory)
})

const getServicesByCategory = (categoryId: string) => {
    return servicesList.services.filter(service => service.categoryId === categoryId)
}
</script>

<style scoped>
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.animate-blob {
    animation: blob 12s infinite;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animation-delay-4000 {
    animation-delay: 4s;
}

.animation-delay-6000 {
    animation-delay: 6s;
}

@keyframes blob {

    0%,
    100% {
        transform: translate(0, 0) scale(1);
        opacity: 0.3;
    }

    33% {
        transform: translate(30px, -30px) scale(1.2);
        opacity: 0.2;
    }

    66% {
        transform: translate(-20px, 20px) scale(0.8);
        opacity: 0.4;
    }
}

@keyframes bounce-x {

    0%,
    100% {
        transform: translateX(0);
    }

    50% {
        transform: translateX(25%);
    }
}

.animate-bounce-x {
    animation: bounce-x 1s infinite;
}
</style>