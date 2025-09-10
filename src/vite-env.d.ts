/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_SERVER_URL: string
    VITE_SERVER_BASE_URL: string
    VITE_EXCHANGE_RATE_API: string
    VITE_IP_API: string
    VITE_KHALTI_PUBLIC_KEY: string
    VITE_KHALTI_SECRET_KEY: string
    VITE_KHALTI_URL: string
    VITE_KHALTI_INITIATE_PAYMENT: string
    VITE_FRONTEND_URL:string
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}