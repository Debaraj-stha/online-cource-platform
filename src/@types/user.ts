export interface User{
    name:string|null
    email:string
    password:string|null
    id?:string
    conformPassword:string|null
}
export type Roles="student"|"guest"|"admin"|"instructor"