export interface User{
    name:string|null
    email:string
    password:string|null
    id?:string|null
    confirmPassword:string|null
    role:Roles|null
    profilePicture?:string|null,
    isVerified?:boolean
}
export type Roles="student"|"guest"|"admin"|"instructor"