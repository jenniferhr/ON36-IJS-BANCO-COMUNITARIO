import { IConta, TipoConta } from '../interfaces/IConta';
import { Cliente } from './Cliente.model';
import { Gerente } from './Gerente.model';

export abstract class Conta implements IConta {
  numeroDaConta: number;
  cliente: Cliente;
  saldo: number;
  tipo: TipoConta;
  gerente: string;

  constructor(numeroDaConta: number, cliente: Cliente, gerente: Gerente) {
    this.numeroDaConta = numeroDaConta;
    this.cliente = cliente;
    this.saldo = 0;
    this.gerente = gerente.nomeCompleto;
  }
}
