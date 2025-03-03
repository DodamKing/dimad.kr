// composables/useNavigation.ts
interface NavLink {
    name: string
    path: string
    isImplemented: boolean
}

export function useNavigation() {
    const mainNavLinks: NavLink[] = [
        {
            name: '홈',
            path: '/',
            isImplemented: true
        },
        {
            name: '서비스 둘러보기',
            path: '/explore',
            isImplemented: true
        },
        {
            name: '소개',
            path: '/about',
            isImplemented: true
        }
    ] as const

    const supportLinks: NavLink[] = [
        {
            name: '문의하기',
            path: '/contact',
            isImplemented: false
        },
        {
            name: 'FAQ',
            path: '/faq',
            isImplemented: false
        }
    ] as const

    return {
        mainNavLinks,
        supportLinks
    }
}