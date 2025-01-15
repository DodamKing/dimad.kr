// types/index.ts
export interface SocialLink {
    name: string
    url: string
    icon: string
}

export interface Service {
    id: string
    name: string
    description: string
    path: string
    icon?: string
    status: 'active' | 'coming-soon' | 'maintenance'
    category: 'tool' | 'utility' | 'content'
}