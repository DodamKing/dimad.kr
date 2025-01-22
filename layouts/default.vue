<!-- layouts/default.vue -->
<template>
    <div>
        <CommonTheHeader />
        <main class="pt-[72px]"> <!-- 헤더 높이만큼 상단 여백 확보 -->
            <slot />
        </main>
        <CommonTheFooter />
    </div>
</template>