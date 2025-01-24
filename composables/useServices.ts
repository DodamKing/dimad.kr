// composables/useServices.ts
interface Service {
    id: string
    name: string
    description: string
    path: string
    icon: string
    isImplemented: boolean  // status 대신 isImplemented 사용
    categoryId: string  // 카테고리 구분을 위해 추가
}

const services: Service[] = [
    {
        id: 'service-1',
        name: '이름 궁합 테스트',
        description: '우리 이름 잘 맞을까?, 이름으로 보는 사랑의 적합도',
        path: '/name-match',
        icon: '💖',
        isImplemented: true,
        categoryId: 'entertainment'
    },
    {
        id: 'service-2',
        name: '기념일 계산기',
        description: '중요한 기념일을 입력하면 100일, 200일, 1주년 등 주요 날짜를 계산해줍니다. 소중한 순간을 놓치지 않도록 도와드릴게요!',
        path: '/anniversary-calculator',
        icon: '🗓️',
        isImplemented: true,
        categoryId: 'utilities'
    },
    {
        id: 'service-3',
        name: '데이트 코스 추천',
        description: '계절, 지역, 예산을 입력하면 맞춤형 데이트 코스를 추천해드립니다. AI가 다양한 장소와 활동을 조합해 특별한 데이트를 계획할 수 있도록 도와드려요!',
        path: '/date-planner',
        icon: '🎯',
        isImplemented: false,
        categoryId: 'lifestyle'
    },
    {
        id: 'service-4',
        name: '타자 러시',
        description: '하늘에서 떨어지는 단어를 빠르게 타이핑하여 점수를 얻는 게임입니다. 타자 실력도 늘리고 순위도 올려보세요!',
        path: '/typing-rush',
        icon: '⌨️',
        isImplemented: true,
        categoryId: 'games'
    },
    {
        id: 'service-5',
        name: '썸네일 메이커',
        description: '유튜브 썸네일에 최적화된 크기로 이미지를 변환하고, 텍스트와 효과를 추가할 수 있습니다. 다양한 SNS 규격에도 대응합니다.',
        path: '/thumbnail-maker',
        icon: '🎨',
        isImplemented: false,
        categoryId: 'utilities'
    },
    {
        id: 'service-6',
        name: '실수령액 계산기',
        description: '월급에서 세금, 4대 보험 등을 제외한 실제 수령액을 계산해드립니다. 나의 월급 실수령액을 쉽게 확인해보세요!',
        path: '/net-salary-calculator',
        icon: '💵',
        isImplemented: true,
        categoryId: 'finance'
    },
    {
        id: 'service-7',
        name: '대출 상환 시뮬레이터',
        description: '대출 상환 계획을 쉽게 계산하고 비교해보세요.',
        path: '/loan/repayment-planner',
        icon: '📊',
        isImplemented: true,
        categoryId: 'finance'
    }

]

export function useServices() {
    return {
        services,
        getServiceById: (id: string) => services.find(service => service.id === id),
        getServicesByCategory: (categoryId: string) => services.filter(service => service.categoryId === categoryId)
    }
}