<!-- pages/api-test.vue -->
<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-4">API Test Page</h1>

        <!-- Basic API Test -->
        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-2">Basic API Test</h2>
            <button @click="testBasicApi" class="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700">
                Test Hello API
            </button>
            <pre v-if="basicApiResult" class="mt-4 p-4 bg-slate-100 rounded-lg">
                {{ basicApiResult }}
            </pre>
        </div>

        <!-- MongoDB Test -->
        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-2">MongoDB Test</h2>
            <button @click="testMongoApi" class="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700">
                Test MongoDB Connection
            </button>
            <pre v-if="mongoApiResult" class="mt-4 p-4 bg-slate-100 rounded-lg">
                {{ mongoApiResult }}
            </pre>
        </div>

        <!-- kanye Test -->
        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-2">Kanye Test</h2>
            <button @click="testkanyeApi" class="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700">
                Test Kanye
            </button>
            <pre v-if="kanyeApiResult" class="mt-4 p-4 bg-slate-100 rounded-lg">
                {{ kanyeApiResult }}
            </pre>
        </div>
    </div>
</template>

<script setup lang="ts">
const basicApiResult = ref<{ message: string; timestamp: string } | null>(null)
const mongoApiResult = ref<{} | null>(null)
const kanyeApiResult = ref<any>(null)

const testBasicApi = async () => {
    const { data } = await useFetch('/api/test/hello')
    basicApiResult.value = data.value
}

const testMongoApi = async () => {
    const { data } = await useFetch('/api/test/mongo')
    mongoApiResult.value = data.value
}

const testkanyeApi = async () => {
    // const { data } = await useFetch('https://api.kanye.rest')
    const { data } = await useFetch('/api/test/bored')
    kanyeApiResult.value = data.value
}
</script>