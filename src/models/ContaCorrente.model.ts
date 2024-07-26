import { Conta } from "./Conta.model";

export class ContaCorrente extends Conta {
  limiteChequeEspecial: number;

  constructor(numeroDaConta: number, idCliente: number, limiteChequeEspecial: number) {
    super(numeroDaConta, idCliente)
    this.limiteChequeEspecial = limiteChequeEspecial;
  }

  transferir(valor: number, contaDestino: Conta): void {
    if ((this.saldo + this.limiteChequeEspecial) >= valor) {
      this.sacar(valor);
      contaDestino.depositar(valor);
    } else {
      console.log("Não há saldo ou limite no cheque especial suficiente para a transferência.");
    }
  };
}