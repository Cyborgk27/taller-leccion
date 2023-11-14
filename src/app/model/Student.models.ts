export interface Student {
    cedula: string;
    apellido: string;
    nombre: string;
    nota1: number;
    nota2: number;
    asistencia: number;
    promedio: number;
    estado?: string;
}