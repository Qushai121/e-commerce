import { ReactNode } from "react"

export type Store = {
    created_at?: Date | string
    id: number
    user_id: number
    store_banner: string
    store_description: string
    store_name: string
    updated_at?: Date | string
}