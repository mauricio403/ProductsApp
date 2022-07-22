// Generated by https://quicktype.io

export interface LoginResponse {
    usuario: Usuario;
    token: string;
    msg?: string;
}

export interface Usuario {
    rol: string;
    estado: boolean;
    google: boolean;
    nombre: string;
    correo: string;
    uid: string;
}

export interface LoginData {
    correo: string;
    password: string;
}
