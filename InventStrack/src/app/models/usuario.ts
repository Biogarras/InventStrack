import { Role } from "./role";

export interface Usuario {
    id: number;
    nombre: string;
    nombreUsuario: string;
    email: string;
    password: string;
    role: string;
    created_at: string;
    deleted_at: string | null;
    rol_id: number;
  }