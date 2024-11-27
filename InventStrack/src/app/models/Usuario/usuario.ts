import { Role } from "../role";

export interface Usuario {
    usuario_id: number;
    nombre: string;
    nombreUsuario: string;
    email: string;
    password: string;
    role: string;
    created_at: string;
    deleted_at: string | null;
    role_id: number;
  }