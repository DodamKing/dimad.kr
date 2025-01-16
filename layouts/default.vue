<!-- layouts/default.vue -->
<template>
    <div class="min-h-screen flex flex-col bg-slate-50">
        <CommonTheHeader />
        <main class="flex-grow pt-[72px]"> <!-- 헤더 높이만큼 상단 여백 확보 -->
            <slot />
        </main>
        <CommonTheFooter />
    </div>
</template>