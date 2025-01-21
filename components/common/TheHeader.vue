<!-- components/common/TheHeader.vue -->
<template>
    <div> <!-- 전체 래퍼 추가 -->
        <!-- 배경 오버레이 - 위치 이동 및 z-index 조정 -->
        <div v-if="isMenuOpen" class="fixed inset-0 bg-black/20 z-30" @click="closeMenu"></div>

        <nav :class="[
            'fixed w-full z-40 transition-all duration-300', // z-index 조정
            scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/50'
                : 'bg-white/60 backdrop-blur-sm'
        ]">
            <!-- 나머지 nav 내용은 동일 -->
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between h-20">
                    <!-- 로고 -->
                    <NuxtLink to="/" class="flex items-center relative z-50">
                        <span
                            class="text-2xl font-bold text-brand-primary hover:text-brand-secondary transition-colors duration-300">
                            DIMAD
                        </span>
                    </NuxtLink>

                    <!-- 데스크탑 네비게이션 -->
                    <div class="hidden md:flex items-center gap-8">
                        <NuxtLink v-for="link in navigation.mainNavLinks" :key="link.path"
                            :to="link.isImplemented ? link.path : '/coming-soon'"
                            class="relative px-3 py-2 text-gray-600 transition-all duration-300 hover:text-brand-primary group">
                            {{ link.name }}
                            <span
                                class="absolute inset-x-0 -bottom-0.5 h-0.5 bg-brand-primary/80 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"></span>
                        </NuxtLink>
                    </div>

                    <!-- 모바일 메뉴 버튼 -->
                    <button ref="menuButtonRef"
                        class="md:hidden w-12 h-12 flex items-center justify-center rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation relative z-50"
                        @click="toggleMenu" aria-label="메뉴 열기">
                        <svg class="w-6 h-6" :class="{ 'hidden': isMenuOpen }" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg class="w-6 h-6" :class="{ 'hidden': !isMenuOpen }" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- 모바일 메뉴 드롭다운 -->
            <Transition enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-150 ease-in" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2">
                <div v-show="isMenuOpen" ref="menuDropdownRef"
                    class="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40">
                    <div class="container mx-auto py-4 px-4">
                        <NuxtLink v-for="link in navigation.mainNavLinks" :key="link.path"
                            :to="link.isImplemented ? link.path : '/coming-soon'"
                            class="block px-4 py-3 text-gray-600 hover:text-brand-primary hover:bg-gray-50 rounded-lg transition-colors"
                            @click="closeMenu">
                            {{ link.name }}
                        </NuxtLink>
                    </div>
                </div>
            </Transition>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const isMenuOpen = ref(false)
const navigation = useNavigation()
const menuButtonRef = ref<HTMLElement | null>(null)
const menuDropdownRef = ref<HTMLElement | null>(null)

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value

    if (isMenuOpen.value) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
}

function closeMenu() {
    isMenuOpen.value = false
    document.body.style.overflow = ''
}

function handleScroll() {
    scrolled.value = window.scrollY > 50
}

function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isMenuOpen.value) {
        closeMenu()
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<style>
:root {
    --brand-primary: #2563eb;
    --brand-secondary: #4f46e5;
}

.text-brand-primary {
    color: var(--brand-primary);
}

.text-brand-secondary {
    color: var(--brand-secondary);
}

.hover\:text-brand-primary:hover {
    color: var(--brand-primary);
}

.hover\:text-brand-secondary:hover {
    color: var(--brand-secondary);
}

.bg-brand-primary {
    background-color: var(--brand-primary);
}

.active\:text-brand-secondary:active {
    color: var(--brand-secondary);
}
</style>