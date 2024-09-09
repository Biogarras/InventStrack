import { Role } from "./role";

export interface Usuario{
    id: number;
    nombre:string;
    username: string;
    password: string;
    email: string;
    role: Role[]
    

}