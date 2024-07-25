import { Conta } from "./Conta.model";

export class ContaPoupanca extends Conta {
  taxaJuros: number;

  constructor(numeroDaConta: number, idCliente: number, saldo: number, taxaJuros: number) {
    super(numeroDaConta, idCliente, saldo)
    this.taxaJuros = taxaJuros;
  }
}
