import { TipoConta } from 'src/interfaces/IConta';
import { Cliente } from './Cliente.model';
import { Conta } from './Conta.model';

export class ContaCorrente extends Conta {
  limiteChequeEspecial: number;

  constructor(
    numeroDaConta: number,
    cliente: Cliente,
    limiteChequeEspecial: number,
  ) {
    super(numeroDaConta, cliente);
    this.limiteChequeEspecial = limiteChequeEspecial;
    this.tipo = TipoConta.Corrente;
  }

  transferir(valor: number, contaDestino: Conta): void {
    if (this.saldo + this.limiteChequeEspecial >= valor) {
      this.sacar(valor);
      contaDestino.depositar(valor);
    } else {
      console.log(
        'Não há saldo ou limite no cheque especial suficiente para a transferência.',
      );
    }
  }
}
