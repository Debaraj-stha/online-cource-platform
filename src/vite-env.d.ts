/// <reference types="vite/client" />
interface ImportMetaEnv{
    VITE_SERVER_URL:string
    VITE_SERVER_BASE_URL:string
    VITE_EXCHANGE_RATE_API:string
    VITE_IP_API:string
}
interface ImportMeta{
    readonly env:ImportMetaEnv
}