<!-- pages/coming-soon.vue -->
<template>
    <main class="container mx-auto px-4">
        <div class="min-h-[80vh] flex items-center justify-center">
            <div class="text-center">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">서비스 준비중</h1>
                <p class="text-xl text-gray-600 mb-8">
                    더 나은 서비스 제공을 위해 준비중입니다.<br>
                    조금만 기다려주세요!
                </p>
                <NuxtLink to="/"
                    class="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    홈으로 돌아가기
                </NuxtLink>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default'
})

useHead({
    titleTemplate: '%s | 서비스 준비중, Comming Soon!',
});
</script>