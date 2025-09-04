export interface User{
    name:string|null
    email:string
    password:string|null
    id?:string|null
    conformPassword:string|null
    role:Roles|null
    profilePicture?:string|null
}
export type Roles="student"|"guest"|"admin"|"instructor"