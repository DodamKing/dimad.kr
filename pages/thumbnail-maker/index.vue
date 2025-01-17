// pages/thumbnail-maker.vue
<template>
    <section class="py-16 md:py-24">
        <div class="container mx-auto px-4">
            <!-- 헤더 -->
            <div class="max-w-2xl mx-auto text-center mb-12">
                <h1 class="text-3xl font-bold text-slate-900 mb-4">썸네일 메이커</h1>
                <p class="text-slate-600">이미지를 업로드하고 템플릿을 선택하여 멋진 썸네일을 만들어보세요</p>
            </div>

            <!-- 메인 에디터 -->
            <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                <!-- 에디터 영역 -->
                <div class="lg:col-span-8 space-y-4">
                    <!-- 캔버스 컨테이너 -->
                    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                        <!-- 캔버스 영역 -->
                        <div class="relative aspect-video bg-slate-100">
                            <canvas id="editor" class="w-full h-full"></canvas>

                            <!-- 초기 업로드 오버레이 -->
                        </div>

                        <!-- 텍스트 입력 -->
                        <div class="p-4 border-t border-slate-200">
                            <div class="flex gap-4">
                            </div>
                        </div>
                    </div>

                    <!-- 다운로드 버튼 -->
                </div>

                <!-- 사이드바 - 템플릿 & 설정 -->
                <div class="lg:col-span-4 space-y-4">
                    <!-- 템플릿 선택 -->
                    <div class="bg-white rounded-2xl border border-slate-200 p-4">
                        <h3 class="font-medium text-slate-900 mb-4">템플릿</h3>
                    </div>

                    <!-- 설정 -->
                    <div class="bg-white rounded-2xl border border-slate-200 p-4">
                        <h3 class="font-medium text-slate-900 mb-4">설정</h3>
                        <div class="space-y-4">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

// SEO
useHead({
    titleTemplate: '%s | 썸네일 메이커 - 쉽고 빠른 썸네일 제작',
    meta: [
        { name: 'description', content: '드래그 앤 드롭으로 이미지를 업로드하고 텍스트를 추가하여 멋진 썸네일을 만들어보세요. 유튜브 썸네일에 최적화된 크기를 제공합니다.' }
    ]
});
</script>