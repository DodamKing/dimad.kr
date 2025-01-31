<!-- components/common/TheFooter.vue -->
<template>
    <footer class="bg-slate-900 text-slate-300">
        <!-- 메인 푸터 콘텐츠 -->
        <div class="container mx-auto px-4 py-16">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16">
                <!-- DIMAD 소개 섹션 -->
                <div class="md:col-span-4">
                    <h3 class="text-xl font-bold text-white mb-6">DIMAD</h3>
                    <p class="text-slate-300 leading-relaxed mb-6 text-[15px]">
                        실용적인 도구부터 재미있는 콘텐츠까지,
                        <br class="hidden sm:block" />
                        자유로운 실험과 혁신을 추구하는
                        <br class="hidden sm:block" />
                        디지털 실험실입니다.
                    </p>
                    <a href="/about"
                        class="text-slate-400 hover:text-white transition-all duration-300 inline-flex items-center gap-2">
                        <CodeBracketIcon class="w-6 h-6" />
                        <span>About Us</span>
                    </a>
                </div>

                <!-- 서비스 섹션 -->
                <div class="md:col-span-5">
                    <div v-if="activeCategories.length > 0">
                        <h4 class="text-white font-semibold mb-6">서비스</h4>
                        <div class="space-y-2">
                            <div v-for="category in activeCategories" :key="category.id"
                                class="transition-colors duration-300 hover:bg-slate-800/30 rounded-lg overflow-hidden">
                                <button @click="toggleCategory(category.id)"
                                    class="w-full text-left flex items-center justify-between text-slate-300 hover:text-white transition-all duration-300 px-4 py-3"
                                    :aria-expanded="openCategories[category.id]"
                                    :aria-controls="`category-${category.id}`">
                                    <span class="font-medium">{{ category.name }}</span>
                                    <ChevronDownIcon
                                        class="w-4 h-4 transform transition-transform duration-300 ease-in-out text-slate-400"
                                        :class="{ 'rotate-180': openCategories[category.id] }" />
                                </button>
                                <div v-show="openCategories[category.id]" :id="`category-${category.id}`"
                                    class="transition-all duration-300"
                                    :class="{ 'opacity-100 max-h-[500px]': openCategories[category.id], 'opacity-0 max-h-0': !openCategories[category.id] }">
                                    <div class="px-4 pb-3 space-y-2">
                                        <NuxtLink v-for="service in getServicesByCategory(category.id)"
                                            :key="service.id"
                                            :to="service.isImplemented ? service.path : '/coming-soon'"
                                            class="text-slate-400 hover:text-white transition-all duration-300 block py-2 pl-4">
                                            {{ service.name }}
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 고객지원 섹션 -->
                <!-- 고객지원 섹션 -->
                <div class="md:col-span-3">
                    <h4 class="text-white font-semibold mb-6">고객지원</h4>
                    <div class="space-y-4">
                        <NuxtLink to="/contact"
                            class="text-slate-400 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                            <ChatBubbleBottomCenterTextIcon class="w-4 h-4" />
                            문의하기
                        </NuxtLink>
                        <!-- <NuxtLink to="/faq" -->
                        <NuxtLink to="/coming-soon"
                            class="text-slate-400 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                            <QuestionMarkCircleIcon class="w-4 h-4" />
                            FAQ
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>

        <!-- 하단 저작권 섹션 - 모바일 최적화 -->
        <div class="border-t border-slate-800">
            <div class="container mx-auto px-4">
                <div class="py-6 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                    <p class="text-slate-400 text-sm text-center sm:text-left">
                        © {{ new Date().getFullYear() }} DIMAD. All rights reserved.
                    </p>
                    <div class="flex gap-6">
                        <NuxtLink to="/coming-soon"
                            class="text-sm text-slate-400 hover:text-white transition-all duration-300">
                            개인정보 처리방침
                        </NuxtLink>
                        <NuxtLink to="/coming-soon"
                            class="text-sm text-slate-400 hover:text-white transition-all duration-300">
                            이용약관
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
// script 부분은 동일하게 유지
import { ref } from 'vue'
import {
    ChevronDownIcon,
    ChatBubbleBottomCenterTextIcon,
    CodeBracketIcon,
    QuestionMarkCircleIcon
} from '@heroicons/vue/24/outline'

const servicesList = useServices()
const { categories } = useCategories()

const openCategories = ref<Record<string, boolean>>({})

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