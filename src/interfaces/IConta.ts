import { Cliente } from 'src/models/Cliente.model';

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
