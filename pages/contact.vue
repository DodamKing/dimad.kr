<!-- pages/contact.vue -->
<template>
    <main class="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 sm:py-12">
        <div class="container mx-auto px-4 sm:px-6">
            <!-- 헤더 섹션 -->
            <div class="max-w-3xl mx-auto mb-8 text-center">
                <div class="inline-block mb-6">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-800">
                        <EnvelopeIcon class="w-5 h-5" />
                        <span class="text-sm font-medium">문의하기</span>
                    </div>
                </div>
                <h1 class="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">무엇을 도와드릴까요?</h1>
                <p class="text-slate-600 max-w-2xl mx-auto">
                    서비스 이용 중 궁금한 점이나 개선사항이 있다면 언제든 문의해주세요.
                </p>
            </div>

            <div class="max-w-xl mx-auto">
                <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
                    <div class="mb-6">
                        <div class="w-16 h-16 bg-violet-50 rounded-full flex items-center justify-center mx-auto">
                            <EnvelopeIcon class="w-8 h-8 text-violet-600" />
                        </div>
                    </div>

                    <h2 class="text-xl font-semibold text-slate-900 mb-2">이메일 문의</h2>
                    <p class="text-slate-600 mb-6">
                        아래 이메일로 문의사항을 보내주시면<br />
                        최대한 빠르게 답변 드리도록 하겠습니다.
                    </p>

                    <div class="inline-flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-lg">
                        <span class="text-lg font-medium text-slate-900">dimad.contact@gmail.com</span>
                        <button @click="copyEmail" class="p-2 hover:bg-white rounded-lg transition-colors"
                            :class="{ 'text-green-600': copied }">
                            <DocumentDuplicateIcon v-if="!copied" class="w-5 h-5" />
                            <CheckIcon v-else class="w-5 h-5" />
                        </button>
                    </div>

                    <div class="mt-8 pt-6 border-t border-slate-200">
                        <h3 class="font-medium text-slate-900 mb-3">안내사항</h3>
                        <ul class="text-sm text-slate-600 space-y-2">
                            <li>평일 기준 24시간 이내 답변드립니다.</li>
                            <li>자주 묻는 질문은 FAQ를 참고해주세요.</li>
                            <li>문의 시 캡처 화면을 함께 보내주시면 더 빠른 답변이 가능합니다.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { EnvelopeIcon, DocumentDuplicateIcon, CheckIcon } from '@heroicons/vue/24/outline'

const copied = ref(false)

const copyEmail = () => {
    navigator.clipboard.writeText('dimad.contact@gmail.com')
    copied.value = true
    setTimeout(() => {
        copied.value = false
    }, 2000)
}

// SEO
useHead({
    titleTemplate: '%s | 문의하기',
    meta: [
        {
            name: 'description',
            content: '서비스 이용 문의, 오류 신고, 기능 제안 등 궁금한 점이 있으시다면 언제든 문의해주세요.'
        }
    ]
})
</script>