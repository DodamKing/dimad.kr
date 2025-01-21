<!-- pages/coming-soon.vue -->
<template>
    <main class="container mx-auto px-4">
        <div class="min-h-[80vh] flex items-center justify-center py-12 sm:py-0">
            <div class="text-center px-4 sm:px-0">
                <!-- 제목 - 모바일에서 더 작게 -->
                <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                    서비스 준비중
                </h1>

                <!-- 설명 텍스트 - 모바일에서 적절한 크기로 -->
                <p class="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                    더 나은 서비스 제공을 위해<br class="sm:hidden" /> 준비중입니다.<br>
                    조금만 기다려주세요!
                </p>

                <!-- 버튼 - 모바일에서 더 큰 터치 영역 -->
                <NuxtLink to="/"
                    class="inline-flex items-center px-6 py-3.5 sm:py-3 text-base sm:text-lg bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors active:bg-indigo-800 shadow-sm hover:shadow-md">
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
    titleTemplate: '%s | 서비스 준비중, Coming Soon!', // 오타 수정
});
</script>