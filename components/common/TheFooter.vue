<!-- components/common/TheFooter.vue -->
<template>
    <footer class="bg-slate-900 text-slate-300">
        <!-- 메인 푸터 콘텐츠 -->
        <div class="container mx-auto px-4 py-16">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                <!-- DIMAD 소개 섹션 -->
                <div class="md:col-span-4">
                    <h3 class="text-xl font-bold text-white mb-6">DIMAD</h3>
                    <p class="text-slate-400 mb-6">
                        실용적인 도구부터 재미있는 콘텐츠까지<br class="hidden sm:block">
                        디지털 노마드의 자유로운 실험실입니다.
                    </p>
                    <!-- GitHub 링크 -->
                    <a href="https://github.com/yourid" target="_blank" rel="noopener noreferrer"
                        class="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2">
                        <CodeBracketIcon class="w-6 h-6" />
                        <span>GitHub</span>
                    </a>
                </div>

                <!-- 서비스 섹션 (있는 카테고리만 표시) -->
                <!-- 서비스 섹션 수정 부분 -->
                <div class="md:col-span-5"> <!-- 고정 너비로 변경 -->
                    <div v-if="activeCategories.length > 0">
                        <h4 class="text-white font-semibold mb-6">서비스</h4>
                        <div class="space-y-6"> <!-- grid를 제거하고 space-y로 수직 간격 설정 -->
                            <div v-for="category in activeCategories" :key="category.id">
                                <button @click="toggleCategory(category.id)"
                                    class="w-full text-left flex items-center justify-between text-slate-300 hover:text-white transition-colors group mb-2"
                                    :aria-expanded="openCategories[category.id]"
                                    :aria-controls="`category-${category.id}`">
                                    <span class="font-medium">{{ category.name }}</span>
                                    <ChevronDownIcon
                                        class="w-4 h-4 transition-transform duration-200 text-slate-400 group-hover:text-white"
                                        :class="{ 'rotate-180': openCategories[category.id] }" />
                                </button>
                                <div v-show="openCategories[category.id]" :id="`category-${category.id}`"
                                    class="ml-4 space-y-2">
                                    <div v-for="service in getServicesByCategory(category.id)" :key="service.id">
                                        <NuxtLink :to="service.isImplemented ? service.path : '/coming-soon'"
                                            class="text-slate-400 hover:text-white transition-colors block py-1 flex items-center gap-2">
                                            {{ service.name }}
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 고객지원 섹션 -->
                <div class="md:col-span-3">
                    <h4 class="text-white font-semibold mb-6">고객지원</h4>
                    <div class="space-y-4">
                        <NuxtLink v-for="link in navigation.supportLinks" :key="link.path"
                            :to="link.isImplemented ? link.path : '/coming-soon'"
                            class="text-slate-400 hover:text-white transition-colors block">
                            {{ link.name }}
                        </NuxtLink>
                        <div class="pt-4 border-t border-slate-800">
                            <h5 class="text-white font-medium mb-3">Contact Us</h5>
                            <a href="mailto:contact@dimad.com"
                                class="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                                <EnvelopeIcon class="w-4 h-4" />
                                contact@dimad.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 하단 저작권 섹션 -->
        <div class="border-t border-slate-800">
            <div class="container mx-auto px-4 py-6">
                <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p class="text-slate-400 text-sm">
                        © {{ new Date().getFullYear() }} DIMAD. All rights reserved.
                    </p>
                    <div class="flex gap-6 text-sm">
                        <NuxtLink to="/#" class="text-slate-400 hover:text-white transition-colors"> <!-- privacy -->
                            개인정보 처리방침
                        </NuxtLink>
                        <NuxtLink to="/#" class="text-slate-400 hover:text-white transition-colors"> <!-- terms -->
                            이용약관
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
    ChevronDownIcon,
    EnvelopeIcon,
    CodeBracketIcon
} from '@heroicons/vue/24/outline'

const servicesList = useServices()
const navigation = useNavigation()
const { categories } = useCategories()

const openCategories = ref<Record<string, boolean>>({})

// 실제 서비스가 있는 카테고리만 필터링
const activeCategories = computed(() => {
    const servicesWithCategories = servicesList.services.map(service => service.categoryId)
    const uniqueCategories = [...new Set(servicesWithCategories)]
    return categories.filter(category => uniqueCategories.includes(category.id))
})

const toggleCategory = (categoryId: string) => {
    openCategories.value[categoryId] = !openCategories.value[categoryId]
}

const getServicesByCategory = (categoryId: string) => {
    return servicesList.services.filter(service => service.categoryId === categoryId)
}
</script>