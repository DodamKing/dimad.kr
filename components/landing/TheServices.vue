<!-- components/landing/TheServices.vue -->
<template>
    <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
            <div class="max-w-2xl mx-auto text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    Services
                </h2>
                <p class="text-lg text-slate-600">
                    다양한 서비스를 지속적으로 확장하고 있습니다.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="service in servicesList.services" :key="service.id"
                    class="group relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
                    <!-- 서비스 카드 배경 효과 -->
                    <div
                        class="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity">
                    </div>

                    <!-- 서비스 아이콘 -->
                    <div class="relative mb-6">
                        <div
                            class="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600">
                            {{ service.icon }}
                        </div>
                    </div>

                    <!-- 서비스 내용 -->
                    <div class="relative">
                        <h3 class="text-xl font-semibold mb-3">{{ service.name }}</h3>
                        <p class="text-slate-600 mb-6">{{ service.description }}</p>

                        <NuxtLink :to="service.isImplemented ? service.path : '/coming-soon'"
                            class="inline-flex items-center text-sm font-medium text-indigo-600">
                            자세히 보기
                            <span class="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const servicesList = useServices()
</script>