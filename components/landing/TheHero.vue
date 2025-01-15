<!-- components/landing/TheHero.vue -->
<template>
    <section class="relative overflow-hidden">
        <!-- 배경 애니메이션 효과 -->
        <div class="absolute inset-0 -z-10">
            <div class="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px]"></div>
        </div>

        <div class="container mx-auto px-4 pt-32 pb-24 md:pt-40 md:pb-32">
            <div class="max-w-4xl mx-auto text-center">
                <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
                    당신의 디지털 경험을
                    <span
                        class="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                        한 단계 높여보세요
                    </span>
                </h1>

                <p class="text-lg md:text-xl text-slate-600 mb-12">
                    필요한 모든 서비스를 한 곳에서 편리하게 이용하세요.<br class="hidden sm:block">
                    단순하지만 강력한, 새로운 디지털 허브를 경험해보세요.
                </p>

                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button class="px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all">
                        시작하기
                    </button>
                    <button
                        class="px-8 py-4 bg-white text-slate-600 rounded-full border hover:border-slate-300 transition-all">
                        서비스 둘러보기
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>