<!-- layouts/default.vue -->
<template>
    <div class="min-h-screen flex flex-col">
        <CommonTheHeader />
        <main class="flex-grow">
            <slot />
        </main>
        <CommonTheFooter />
    </div>
</template>