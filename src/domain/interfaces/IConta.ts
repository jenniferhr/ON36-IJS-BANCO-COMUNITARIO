import { Cliente } from '../entities/cliente';

export enum TipoConta {
  Corrente = 'Corrente',
  Poupanca = 'Poupança',
}

export interface IConta {
  numeroDaConta: number;
  cliente: Cliente;
  saldo: number;
  tipo: TipoConta;
  ativa: boolean;
}
