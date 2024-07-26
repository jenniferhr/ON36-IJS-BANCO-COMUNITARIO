import { Cliente } from "./Cliente.model";
import { Conta } from "./Conta.model";

export class ContaPoupanca extends Conta {
  taxaJuros: number;

  constructor(numeroDaConta: number, cliente: Cliente, taxaJuros: number) {
    super(numeroDaConta, cliente)
    this.taxaJuros = taxaJuros;
  }

  transferir(valor: number, contaDestino: Conta): void {
    if (this.saldo >= valor) {
      this.sacar(valor);
      contaDestino.depositar(valor);
    } else {
      console.log(`Saldo insuficiente para a transação. Saldo atual: ${this.saldo}`)
    }
  };
}
