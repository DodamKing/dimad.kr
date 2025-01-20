// composables/useCategories.ts
import { WrenchScrewdriverIcon, SparklesIcon, PlayIcon, HeartIcon, BeakerIcon, BanknotesIcon } from '@heroicons/vue/24/outline'

export const useCategories = () => {
    const categories = [
        {
            id: 'utilities',
            name: '유틸리티',
            description: '일상의 불편함을 해결하는 실용적인 도구들',
            icon: WrenchScrewdriverIcon,
            subCategories: ['계산기', '변환기', '날짜', '시간']
        },
        {
            id: 'finance',
            name: '금융',
            description: '재정 관리와 금융 계획을 도와주는 서비스',
            icon: BanknotesIcon,
            subCategories: ['계산기', '대출', '소득']
        },
        {
            id: 'entertainment',
            name: '엔터테인먼트',
            description: '재미있게 즐기는 다양한 컨텐츠',
            icon: SparklesIcon,
            subCategories: ['이름/운세', 'MBTI', '테스트']
        },
        {
            id: 'games',
            name: '게임',
            description: '잠깐의 휴식이 필요할 때 즐기는 웹게임',
            icon: PlayIcon,
            subCategories: ['퍼즐', '카드', '아케이드']
        },
        {
            id: 'lifestyle',
            name: '라이프스타일',
            description: '더 나은 일상을 위한 다양한 서비스',
            icon: HeartIcon,
            subCategories: ['건강', '습관', '생산성']
        },
        {
            id: 'others',
            name: '기타',
            description: '다양한 실험적 서비스와 특별한 프로젝트',
            icon: BeakerIcon,
            subCategories: ['실험실', '특별 프로젝트', '공개 예정']
        }
    ]

    return {
        categories,
        getCategoryById: (id: string) => categories.find(cat => cat.id === id)
    }
}