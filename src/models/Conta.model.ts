import { IConta, TipoConta } from '../interfaces/IConta';
import { Cliente } from './Cliente.model';

export abstract class Conta implements IConta {
  numeroDaConta: number;
  cliente: Cliente;
  saldo: number;
  tipo: TipoConta;

  constructor(numeroDaConta: number, cliente: Cliente) {
    this.numeroDaConta = numeroDaConta;
    this.cliente = cliente;
    this.saldo = 0;
  }

  depositar(valor: number): void {
    this.saldo += valor;
  }

  sacar(valor: number): void {
    if (this.saldo >= valor) {
      this.saldo -= valor;
    } else {
      console.log(
        `Saldo insuficiente para a transação. Saldo atual: ${this.saldo}`,
      );
    }
  }

  abstract transferir(valor: number, contaDestino: Conta): void;
}
