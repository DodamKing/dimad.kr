// composables/useServices.ts
interface Service {
    id: string
    name: string
    description: string
    path: string
    icon: string
    isImplemented: boolean  // status 대신 isImplemented 사용
}

const services: Service[] = [
    {
        id: 'service-1',
        name: '이름 궁합 테스트',
        description: '우리 이름 잘 맞을까?, 이름으로 보는 사랑의 적합도',
        path: '/name-match',
        icon: '💖',
        isImplemented: true
    },
    {
        id: 'service-2',
        name: '기념일 계산기',
        description: '중요한 기념일을 입력하면 100일, 200일, 1주년 등 주요 날짜를 계산해줍니다. 소중한 순간을 놓치지 않도록 도와드릴게요!',
        path: '/anniversary-calculator',
        icon: '🗓️',
        isImplemented: true
    }
]

export function useServices() {
    return {
        services
    }
}