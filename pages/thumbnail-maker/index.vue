// pages/thumbnail-maker.vue
<template>
    <section class="py-8 md:py-12 bg-slate-50 min-h-screen">
        <div class="container mx-auto px-4">
            <!-- 헤더 -->
            <div class="max-w-2xl mx-auto text-center mb-8">
                <h1 class="text-3xl font-bold text-slate-900 mb-3">썸네일 메이커</h1>
                <p class="text-slate-600">클릭을 부르는 썸네일을 쉽고 빠르게 만들어보세요</p>
            </div>

            <!-- 메인 에디터 -->
            <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-7 gap-6">
                <!-- 에디터 영역 -->
                <div class="lg:col-span-5 space-y-4">
                    <!-- 플랫폼 선택 -->
                    <div class="flex gap-2">
                        <select v-model="selectedPlatform"
                            class="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            @change="handlePlatformChange">
                            <option v-for="(preset, key) in platformPresets" :key="key" :value="key">
                                {{ preset.label }}
                            </option>
                        </select>
                    </div>

                    <!-- 캔버스 컨테이너 -->
                    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <!-- 캔버스 영역 -->
                        <client-only>
                            <div class="relative bg-slate-100 cursor-pointer"
                                :style="{ aspectRatio: `${currentPreset.width} / ${currentPreset.height}` }"
                                @drop.prevent="handleDrop" @dragover.prevent @click="!image && triggerFileInput()"
                                @mousemove="handleDragMove" @mouseup="handleDragEnd" @mouseleave="handleDragEnd"
                                @touchmove="handleDragMove" @touchend="handleDragEnd" @touchcancel="handleDragEnd">
                                <canvas ref="canvas" class="w-full h-full"></canvas>

                                <!-- 초기 업로드 오버레이 -->
                                <div v-if="!image" class="absolute inset-0 flex flex-col items-center justify-center">
                                    <div class="p-4 rounded-full bg-slate-200 mb-3">
                                        <ArrowUpTrayIcon class="w-6 h-6 text-slate-600" />
                                    </div>
                                    <p class="text-slate-600 mb-1">이미지를 드래그하거나 클릭하여 업로드</p>
                                    <p class="text-sm text-slate-500">권장 크기: {{ currentPreset.width }}x{{
                                        currentPreset.height }}px</p>
                                </div>

                                <!-- 텍스트 레이어 -->
                                <div v-for="layer in textLayers" :key="layer.id"
                                    class="absolute cursor-move select-none text-layer"
                                    :class="{ 'ring-2 ring-blue-500': layer.isSelected }" :style="{
                                        left: `${layer.x}px`,
                                        top: `${layer.y}px`,
                                        color: layer.color,
                                        fontSize: `${layer.fontSize}px`,
                                        textShadow: layer.shadow ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none',
                                        touchAction: 'none'  // 모바일에서 스크롤 방지
                                    }" @mousedown="(e) => handleDragStart(e, layer.id)"
                                    @touchstart="(e) => handleDragStart(e, layer.id)"
                                    @click.stop="selectLayer(layer.id)">
                                    {{ layer.text }}
                                </div>
                            </div>
                        </client-only>

                        <!-- 텍스트 레이어 관리 -->
                        <div class="p-4 border-t border-slate-200">
                            <div class="space-y-3">
                                <!-- 레이어 목록 -->
                                <div class="space-y-2">
                                    <div v-for="layer in textLayers" :key="layer.id"
                                        class="flex items-center gap-2 p-2 bg-slate-50 rounded">
                                        <input v-model="layer.text" type="text"
                                            class="flex-1 px-2 py-1 text-sm border rounded" @input="updateCanvas" />
                                        <button class="p-1 text-red-500 hover:bg-red-50 rounded"
                                            @click="removeTextLayer(layer.id)">
                                            <TrashIcon class="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <!-- 새 텍스트 추가 -->
                                <button
                                    class="w-full px-3 py-2 text-sm text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50"
                                    @click="addTextLayer">
                                    + 텍스트 추가
                                </button>

                                <button class="w-full px-3 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                    @click="downloadImage" :disabled="!image">
                                    다운로드
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 사이드바 -->
                <div class="lg:col-span-2 space-y-4">
                    <!-- 선택된 텍스트 레이어 스타일 -->
                    <div v-if="selectedLayer" class="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                        <h3 class="font-medium text-slate-900 mb-4">텍스트 스타일</h3>
                        <div class="space-y-4">
                            <!-- 폰트 색상 -->
                            <div>
                                <label class="block text-sm text-slate-600 mb-2">폰트 색상</label>
                                <div class="flex gap-2">
                                    <button v-for="color in textColors" :key="color"
                                        class="w-8 h-8 rounded-full border-2"
                                        :class="selectedLayer?.color === color ? 'border-blue-500' : 'border-transparent'"
                                        :style="{ backgroundColor: color }"
                                        @click="updateLayerStyle('color', color)"></button>
                                </div>
                            </div>

                            <!-- 글자 크기 -->
                            <div>
                                <label class="block text-sm text-slate-600 mb-2">
                                    글자 크기: {{ selectedLayer?.fontSize }}px
                                </label>
                                <input :value="selectedLayer?.fontSize" type="range" min="20" max="80" class="w-full"
                                    @input="e => updateLayerStyle('fontSize', Number((e.target as HTMLInputElement).value))" />
                            </div>

                            <!-- 그림자 효과 -->
                            <div class="flex items-center justify-between">
                                <label class="text-sm text-slate-600">그림자 효과</label>
                                <button class="px-3 py-1 rounded-lg"
                                    :class="selectedLayer?.shadow ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'"
                                    @click="updateLayerStyle('shadow', !selectedLayer?.shadow)">
                                    {{ selectedLayer?.shadow ? 'ON' : 'OFF' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 숨겨진 파일 입력 -->
        <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileInput" />
    </section>
</template>

<script setup lang="ts">
import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/vue/24/outline'

interface TextLayer {
    id: string;
    text: string;
    x: number;
    y: number;
    fontSize: number;
    color: string;
    shadow: boolean;
    isDragging: boolean;
    dragOffset: { x: number; y: number };
    isSelected: boolean;
}

interface PlatformPreset {
    width: number;
    height: number;
    label: string;
}

// 플랫폼 프리셋
const platformPresets: Record<string, PlatformPreset> = {
    youtube: { width: 1280, height: 720, label: 'YouTube 썸네일' },
    instagram: { width: 1080, height: 1080, label: 'Instagram 게시물' },
    tiktok: { width: 1080, height: 1920, label: 'TikTok 커버' },
    facebook: { width: 1200, height: 630, label: 'Facebook 링크' }
}

// 상태 관리
const canvas = ref<HTMLCanvasElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const image = ref<HTMLImageElement | null>(null)
const selectedPlatform = ref('youtube')
const textLayers = ref<TextLayer[]>([])
const selectedLayerId = ref<string | null>(null)
const textColors = ['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00']

// 계산된 속성
const currentPreset = computed(() => platformPresets[selectedPlatform.value])
const selectedLayer = computed(() =>
    textLayers.value.find(layer => layer.id === selectedLayerId.value)
)

// 텍스트 레이어 관리
const addTextLayer = () => {
    if (!image.value) return

    textLayers.value.forEach(layer => layer.isSelected = false)

    const newLayer: TextLayer = {
        id: `layer-${Date.now()}`,
        text: '새로운 텍스트',
        x: canvas.value ? canvas.value.width / 2 : 0,
        y: canvas.value ? canvas.value.height / 2 : 0,
        fontSize: 48,
        color: '#FFFFFF',
        shadow: true,
        isDragging: false,
        dragOffset: { x: 0, y: 0 },
        isSelected: true
    }
    textLayers.value.push(newLayer)
    selectedLayerId.value = newLayer.id
    updateCanvas()
}

const removeTextLayer = (id: string) => {
    textLayers.value = textLayers.value.filter(layer => layer.id !== id)
    if (selectedLayerId.value === id) {
        selectedLayerId.value = textLayers.value[0]?.id || null
    }
    updateCanvas()
}

const updateLayerStyle = <K extends keyof TextLayer>(property: K, value: TextLayer[K]) => {
    const layer = selectedLayer.value
    if (layer) {
        layer[property] = value
        updateCanvas()
    }
}

// 플랫폼 변경 처리
const handlePlatformChange = () => {
    if (image.value) {
        updateCanvas()
    }
}

// 파일 업로드 처리
const handleFileInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files?.[0]) {
        loadImage(target.files[0])
    }
}

const handleDrop = (event: DragEvent) => {
    const file = event.dataTransfer?.files[0]
    if (file) {
        loadImage(file)
    }
}

const loadImage = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
            image.value = img
            updateCanvas()
        }
        img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
}

// 캔버스 업데이트
const updateCanvas = () => {
    if (!canvas.value || !image.value) return

    const ctx = canvas.value.getContext('2d')
    if (!ctx) return

    const preset = currentPreset.value
    canvas.value.width = preset.width
    canvas.value.height = preset.height

    // 이미지만 그리기 (텍스트는 DOM으로 표시)
    const scale = Math.max(
        preset.width / image.value.width,
        preset.height / image.value.height
    )
    const scaledWidth = image.value.width * scale
    const scaledHeight = image.value.height * scale
    const x = (preset.width - scaledWidth) / 2
    const y = (preset.height - scaledHeight) / 2

    ctx.drawImage(image.value, x, y, scaledWidth, scaledHeight)
}

// 유틸리티 함수들
const triggerFileInput = () => {
    fileInput.value?.click()
}

const downloadImage = () => {
    if (!canvas.value) return

    // 다운로드를 위한 임시 캔버스 생성
    const tempCanvas = document.createElement('canvas')
    const ctx = tempCanvas.getContext('2d')
    if (!ctx) return

    // 원본 캔버스 크기로 설정
    tempCanvas.width = canvas.value.width
    tempCanvas.height = canvas.value.height

    // 배경 이미지 복사
    ctx.drawImage(canvas.value, 0, 0)

    // 텍스트 레이어 추가
    textLayers.value.forEach(layer => {
        ctx.font = `${layer.fontSize}px Arial`
        ctx.textAlign = 'center'
        ctx.fillStyle = layer.color

        if (layer.shadow) {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.7)'
            ctx.shadowBlur = 10
            ctx.shadowOffsetX = 2
            ctx.shadowOffsetY = 2
        }

        ctx.fillText(layer.text, layer.x, layer.y)

        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
    })

    // 다운로드
    const link = document.createElement('a')
    const platform = selectedPlatform.value
    link.download = `thumbnail-${platform}.png`
    link.href = tempCanvas.toDataURL('image/png')
    link.click()
}

const handleDragStart = (e: MouseEvent | TouchEvent, layerId: string) => {
    e.stopPropagation()  // 캔버스 이벤트 전파 방지
    const layer = textLayers.value.find(l => l.id === layerId)
    if (layer) {
        layer.isDragging = true
        layer.isSelected = true
        selectedLayerId.value = layerId
    }
}

const handleDragMove = (e: MouseEvent | TouchEvent) => {
    const layer = textLayers.value.find(l => l.isDragging)
    if (!layer || !canvas.value) return

    const rect = canvas.value.getBoundingClientRect()
    const pos = 'touches' in e ? e.touches[0] : e

    layer.x = Math.min(Math.max(0, pos.clientX - rect.left), rect.width)
    layer.y = Math.min(Math.max(0, pos.clientY - rect.top), rect.height)
    updateCanvas()
}

const handleDragEnd = () => {
    textLayers.value.forEach(layer => layer.isDragging = false)
}

const selectLayer = (layerId: string) => {
    textLayers.value.forEach(layer => {
        layer.isSelected = layer.id === layerId
    })
    selectedLayerId.value = layerId
}

// SEO
useHead({
    titleTemplate: '%s | YouTube 썸네일 메이커 - 클릭을 부르는 썸네일 제작',
    meta: [
        {
            name: 'description',
            content: '무료로 YouTube 썸네일을 쉽고 빠르게 만들어보세요. 드래그 앤 드롭으로 이미지를 업로드하고, 클릭을 부르는 썸네일을 제작할 수 있습니다.'
        },
        {
            name: 'keywords',
            content: 'YouTube 썸네일, 썸네일 메이커, 썸네일 제작, 유튜브 썸네일 제작, 무료 썸네일'
        }
    ]
});
</script>