import { Conta } from "./Conta.model";

export class ContaPoupanca extends Conta {
  taxaJuros: number;

  constructor(numeroDaConta: number, idCliente: number, taxaJuros: number) {
    super(numeroDaConta, idCliente)
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
