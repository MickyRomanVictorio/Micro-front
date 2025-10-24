export interface Usuario {
  id: string;
  username: string;
  nombreCompleto: string;
  rol: 'FISCAL' | 'ADMIN';
}