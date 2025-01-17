<!-- pages/typing-rush.vue -->
<template>
    <section class="py-16 md:py-24" aria-label="타자 게임">
        <div class="container mx-auto px-4">
            <!-- 게임 헤더 -->
            <div class="max-w-2xl mx-auto text-center mb-12">
                <h1 class="text-3xl font-bold text-slate-900 mb-4">타자 러시</h1>
                <p class="text-slate-600">떨어지는 단어를 빠르게 타이핑하여 높은 점수를 획득하세요!</p>
            </div>

            <!-- 게임 컨테이너 -->
            <div class="max-w-4xl mx-auto">
                <div class="bg-white rounded-2xl shadow-sm border border-slate-100">
                    <!-- 게임 상태 표시 -->
                    <div class="border-b border-slate-100 p-4">
                        <div class="flex flex-wrap justify-between items-center gap-4">
                            <div class="flex gap-6">
                                <div class="text-slate-600">
                                    <span class="font-medium">점수</span>
                                    <span class="ml-2 font-semibold text-slate-900">{{ score }}</span>
                                </div>
                                <div class="text-slate-600">
                                    <span class="font-medium">시간</span>
                                    <span class="ml-2 font-semibold text-slate-900"
                                        :class="{ 'text-red-600': time <= 10 }">
                                        {{ time }}초
                                    </span>
                                </div>
                                <div class="text-slate-600">
                                    <span class="font-medium">최고점수</span>
                                    <span class="ml-2 font-semibold text-violet-600">{{ highScore }}</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <button v-if="!isPlaying" @click="startGame"
                                    class="px-6 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors">
                                    게임 시작
                                </button>
                                <button v-else @click="stopGame"
                                    class="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors">
                                    게임 중단
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- 게임 영역 -->
                    <div class="relative h-96 overflow-hidden bg-slate-50/50">
                        <!-- 떨어지는 단어들 -->
                        <TransitionGroup name="word">
                            <div v-for="word in fallingWords" :key="word.id" :style="{
                                position: 'absolute',
                                left: word.x + 'px',
                                top: word.y + 'px',
                            }" :class="[
                                    'transition-all duration-1000 ease-linear px-2 py-1 rounded',
                                    currentInput === word.text ? 'bg-violet-100 text-violet-600 font-bold' : '',
                                ]">
                                {{ word.text }}
                            </div>
                        </TransitionGroup>
                        <!-- 입력 영역 -->
                        <div class="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100">
                            <input v-model="currentInput" @keydown.space.prevent="checkWord" @keyup.enter="checkWord"
                                type="text"
                                class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                placeholder="단어를 입력하세요" :disabled="!isPlaying" ref="inputRef" />
                        </div>
                    </div>
                </div>

                <!-- 게임 설명 -->
                <div class="mt-6 text-center space-y-2">
                    <div
                        class="inline-flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm">
                        <span class="block">⌨️ 스페이스바 또는 엔터키로 단어 입력</span>
                        <span class="block px-2 text-slate-300">|</span>
                        <span class="block">🎯 떨어지는 단어를 정확하게 입력하세요!</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!isPlaying && score > 0"
            class="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50">
            <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-xl">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-slate-900">게임 종료!</h2>
                    <button @click="closeGame" class="text-slate-400 hover:text-slate-600 p-1">
                        <XMarkIcon class="w-6 h-6" />
                    </button>
                </div>

                <div class="space-y-4 mb-6">
                    <div class="flex justify-between items-center">
                        <span class="text-slate-600">최종 점수</span>
                        <span class="text-2xl font-bold text-slate-900">{{ score }}</span>
                    </div>

                    <div class="h-px bg-slate-200"></div>

                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-slate-600">시도한 입력</span>
                            <span class="font-medium">{{ gameStats.typedWords }}회</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-slate-600">정확한 입력</span>
                            <span class="font-medium text-green-600">{{ gameStats.correctWords }}회</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-slate-600">타이핑 정확도</span>
                            <span class="font-medium">{{ gameStats.accuracy }}%</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-slate-600">놓친 단어</span>
                            <span class="font-medium text-red-600">{{ gameStats.missedWords }}개</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-slate-600">최대 연속 성공</span>
                            <span class="font-medium">{{ gameStats.longestStreak }}회</span>
                        </div>
                    </div>
                </div>

                <div class="flex justify-center gap-4 mt-8">
                    <button @click="startGame"
                        class="flex-1 px-6 py-2.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
                        다시 시작
                    </button>
                    <button @click="closeGame"
                        class="flex-1 px-6 py-2.5 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                        게임 종료
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { wordsList } from '~/composables/words'
import { XMarkIcon } from '@heroicons/vue/24/outline'

// SEO
useHead({
    titleTemplate: '%s | 타자 러시 - 재미있는 타자 게임',
    meta: [
        { name: 'description', content: '떨어지는 단어를 빠르게 타이핑하여 점수를 획득하는 타자 게임입니다. 타자 실력도 늘리고 즐거운 시간도 보내세요! 타자게임, 타자연습, 타자실력, 웹게임, 무료타자게임임' },
        { name: 'keywords', content: '타자게임,타자연습,타자실력,웹게임,무료타자게임' }
    ]
})

interface FallingWord {
    id: number;
    text: string;
    x: number;
    y: number;
    width: number;
}

const score = ref(0);
const highScore = ref(0);
const time = ref(60);
const isPlaying = ref(false);
const currentInput = ref('');
const fallingWords = ref<FallingWord[]>([]);
const inputRef = ref<HTMLInputElement | null>(null);
let gameInterval: ReturnType<typeof setInterval> | null = null;
let wordSpawnTimeout: ReturnType<typeof setTimeout> | null = null;

// 게임 설정 상수 추가
const GAME_CONFIG = {
    maxWords: 20,
    baseSpeed: 10,
    speedIncrease: 3,  // 시간당 속도 증가량
    spawnInterval: {
        start: 2000,     // 처음에는 2초마다
        end: 800,        // 나중에는 0.8초마다
    },
    gameWidth: 700,      // 게임 영역 너비
    gameHeight: 384,     // 게임 영역 높이 (96vh)
    wordPadding: 20      // 단어 간 최소 간격
}

// 게임 통계 시스템 개선
interface GameStats {
    typedWords: number;
    correctWords: number;
    missedWords: number;
    wrongWords: number;
    accuracy: number;
    averageSpeed: number;
    longestStreak: number;
    currentStreak: number;
}

const gameStats = ref<GameStats>({
    typedWords: 0,
    correctWords: 0,
    missedWords: 0,
    wrongWords: 0,
    accuracy: 0,
    averageSpeed: 0,
    longestStreak: 0,
    currentStreak: 0
});

// 게임 시작시 통계 초기화
const resetStats = () => {
    gameStats.value = {
        typedWords: 0,
        correctWords: 0,
        missedWords: 0,
        wrongWords: 0,
        accuracy: 0,
        averageSpeed: 0,
        longestStreak: 0,
        currentStreak: 0
    };
}

// 점수 계산 상수 추가
const SCORE_CONFIG = {
    baseScore: 10,          // 기본 점수
    streakBonus: 5,         // 연속 보너스
    streakThreshold: 3,     // 연속 보너스 기준
    missPenalty: 5          // 놓친 단어 페널티
}

// 로컬스토리지에서 최고 점수 불러오기
onMounted(() => {
    const savedHighScore = localStorage.getItem('typingRushHighScore');
    if (savedHighScore) {
        highScore.value = parseInt(savedHighScore);
    }
});

// 단어 생성 위치 계산 개선
const calculateWordPosition = (text: string) => {
    const wordWidth = text.length * 16; // 글자당 약 16px
    const maxX = GAME_CONFIG.gameWidth - wordWidth;

    let attempts = 0;
    const maxAttempts = 15;

    while (attempts < maxAttempts) {
        const x = Math.random() * maxX;
        let hasCollision = false;

        // 모든 현재 단어들과 충돌 체크
        for (const word of fallingWords.value) {
            const wordRight = word.x + word.width;
            const newWordRight = x + wordWidth;

            // x축 충돌 체크
            if (!(wordRight + GAME_CONFIG.wordPadding < x ||
                word.x > newWordRight + GAME_CONFIG.wordPadding)) {
                // y축 근접 체크 (50px 이내)
                if (word.y < 50) {
                    hasCollision = true;
                    break;
                }
            }
        }

        if (!hasCollision) {
            return { x, width: wordWidth };
        }

        attempts++;
    }

    // 모든 시도 실패시 가장 적절한 위치 반환
    return { x: Math.random() * maxX, width: wordWidth };
}

// 스폰 간격 계산
const calculateSpawnInterval = () => {
    const { start, end } = GAME_CONFIG.spawnInterval;
    const progress = (60 - time.value) / 60;
    return start - (start - end) * progress;
}

const scheduleNextWord = () => {
    if (!isPlaying.value) return;

    if (wordSpawnTimeout) {
        clearTimeout(wordSpawnTimeout);
    }

    const interval = calculateSpawnInterval();
    wordSpawnTimeout = setTimeout(() => {
        if (fallingWords.value.length < GAME_CONFIG.maxWords) {
            const text = getRandomWord();
            const { x, width } = calculateWordPosition(text);

            fallingWords.value.push({
                id: Date.now(),
                text,
                x,
                y: 0,
                width
            });
        }
        scheduleNextWord();
    }, interval);
}

const getRandomWord = () => {
    return wordsList[Math.floor(Math.random() * wordsList.length)];
};

// 낙하 속도 계산 함수
const calculateFallSpeed = () => {
    const timeLeft = time.value;
    const speedMultiplier = 1 + ((60 - timeLeft) * GAME_CONFIG.speedIncrease / 60);
    return GAME_CONFIG.baseSpeed * speedMultiplier;
}

const updateWords = () => {
    const speed = calculateFallSpeed();
    fallingWords.value.forEach(word => {
        word.y += speed;
    });

    // 바닥에 닿은 단어 처리
    const bottomY = GAME_CONFIG.gameHeight;
    fallingWords.value = fallingWords.value.filter(word => {
        if (word.y >= bottomY) {
            gameStats.value.missedWords++;
            score.value = Math.max(0, score.value - SCORE_CONFIG.missPenalty);
            return false;
        }
        return true;
    });
};

const calculateAccuracy = () => {
    const totalAttempts = gameStats.value.typedWords;  // 시도한 횟수만
    return totalAttempts > 0
        ? Math.round((gameStats.value.correctWords / totalAttempts) * 100)
        : 0;
};


const checkWord = (e?: KeyboardEvent) => {
    if (e?.key === ' ' && !currentInput.value.trim()) {
        e.preventDefault();
        return;
    }

    const input = currentInput.value.trim();
    if (!input) return;

    gameStats.value.typedWords++;  // 시도 횟수 증가

    const matchingWordIndex = fallingWords.value.findIndex(
        word => word.text === input
    );

    if (matchingWordIndex !== -1) {
        gameStats.value.correctWords++;
        gameStats.value.currentStreak++;
        gameStats.value.longestStreak = Math.max(
            gameStats.value.longestStreak,
            gameStats.value.currentStreak
        );

        // 점수 계산산
        const streakMultiplier = Math.floor(gameStats.value.currentStreak / SCORE_CONFIG.streakThreshold);
        const bonusScore = streakMultiplier * SCORE_CONFIG.streakBonus;
        score.value += SCORE_CONFIG.baseScore + bonusScore;

        fallingWords.value.splice(matchingWordIndex, 1);
    } else {
        gameStats.value.wrongWords++;
        gameStats.value.currentStreak = 0
    }

    gameStats.value.accuracy = calculateAccuracy();
    currentInput.value = '';
};

const stopGame = () => {
    if (wordSpawnTimeout) {
        clearTimeout(wordSpawnTimeout);
    }
    
    const confirmed = window.confirm('게임을 중단하시겠습니까? 현재 점수는 저장되지 않습니다.');
    if (confirmed) {
        isPlaying.value = false;
        if (gameInterval) {
            clearInterval(gameInterval);
        }
        score.value = 0;
        fallingWords.value = [];
        currentInput.value = '';
    }
};

const startGame = () => {
    if (isPlaying.value) return;

    resetStats();
    score.value = 0;
    time.value = 60;
    fallingWords.value = [];
    isPlaying.value = true;

    nextTick(() => {
        inputRef.value?.focus();
    });

    scheduleNextWord();

    gameInterval = setInterval(() => {
        if (time.value > 0) {
            time.value--;
            updateWords();
        } else {
            endGame();
        }
    }, 1000);
};

const endGame = () => {
    isPlaying.value = false;
    if (gameInterval) {
        clearInterval(gameInterval);
    }

    if (score.value > highScore.value) {
        highScore.value = score.value;
        localStorage.setItem('typingRushHighScore', score.value.toString());
    }
};

const closeGame = () => {
    score.value = 0;
    fallingWords.value = [];
    currentInput.value = '';
};

onUnmounted(() => {
    if (gameInterval) clearInterval(gameInterval);
    if (wordSpawnTimeout) clearTimeout(wordSpawnTimeout);
});
</script>

<style scoped>
.word-enter-active,
.word-leave-active {
    transition: all 0.3s ease;
}

.word-enter-from,
.word-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}
</style>