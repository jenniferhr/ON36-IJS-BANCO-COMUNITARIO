import { Conta } from "./Conta.model";

export class ContaCorrente extends Conta {
  limiteChequeEspecial: number;

  constructor(numeroDaConta: number, idCliente: number, saldo: number, limiteChequeEspecial: number) {
    super(numeroDaConta, idCliente, saldo)
    this.limiteChequeEspecial = limiteChequeEspecial;
  }
}