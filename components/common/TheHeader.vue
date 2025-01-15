<!-- components/common/TheHeader.vue -->
<template>
    <nav :class="[
        'fixed w-full z-50 transition-all duration-300',
        scrolled
            ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50'
            : 'bg-transparent'
    ]">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between h-20"> <!-- 높이 증가 -->
                <NuxtLink to="/" class="flex items-center">
                    <span
                        class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        DIMAD
                    </span>
                </NuxtLink>

                <!-- 데스크탑 네비게이션 -->
                <div class="hidden md:flex items-center gap-8">
                    <NuxtLink v-for="link in navigation.mainNavLinks" :key="link.path"
                        :to="link.isImplemented ? link.path : '/coming-soon'"
                        class="relative px-2 py-1 text-gray-600 hover:text-gray-900 transition-colors group">
                        {{ link.name }}
                        <span
                            class="absolute inset-x-0 bottom-0 h-0.5 bg-gray-200 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </NuxtLink>
                </div>

                <!-- 모바일 메뉴 버튼 -->
                <button ref="menuButtonRef"
                    class="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
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
        <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-1">
            <div v-show="isMenuOpen" ref="menuDropdownRef"
                class="md:hidden absolute top-16 inset-x-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200">
                <div class="container mx-auto py-4">
                    <NuxtLink v-for="link in navigation.mainNavLinks" :key="link.path"
                        :to="link.isImplemented ? link.path : '/coming-soon'"
                        class="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        @click="closeMenu">
                        {{ link.name }}
                    </NuxtLink>
                </div>
            </div>
        </Transition>
    </nav>
</template>

<script setup lang="ts">
const scrolled = ref(false)
const isMenuOpen = ref(false)
const navigation = useNavigation()
const menuButtonRef = ref<HTMLElement | null>(null)
const menuDropdownRef = ref<HTMLElement | null>(null)

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
    isMenuOpen.value = false
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside, true)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    document.removeEventListener('click', handleClickOutside, true)
})

function handleScroll() {
    scrolled.value = window.scrollY > 50
}

function handleClickOutside(event: MouseEvent) {
    if (isMenuOpen.value &&
        menuButtonRef.value &&
        menuDropdownRef.value &&
        !menuButtonRef.value.contains(event.target as Node) &&
        !menuDropdownRef.value.contains(event.target as Node)) {
        isMenuOpen.value = false
    }
}
</script>