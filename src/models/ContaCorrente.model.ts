import { TipoConta } from 'src/interfaces/IConta';
import { Cliente } from './Cliente.model';
import { Conta } from './Conta.model';
import { Gerente } from './Gerente.model';

export class ContaCorrente extends Conta {
  limiteChequeEspecial: number;

  constructor(
    numeroDaConta: number,
    cliente: Cliente,
    gerente: Gerente,
    limiteChequeEspecial: number,
  ) {
    super(numeroDaConta, cliente, gerente);
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
