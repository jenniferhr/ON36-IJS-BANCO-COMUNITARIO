import { TipoConta } from '../interfaces/IConta';
import { Cliente } from './cliente';
import { Conta } from './conta';
import { Gerente } from './gerente';

export class ContaCorrente extends Conta {
  limiteChequeEspecial: number;

  constructor(
    numeroDaConta: number,
    cliente: Cliente,
    gerente: Gerente,
    limiteChequeEspecial: number,
  ) {
    super(numeroDaConta, cliente, gerente, TipoConta.Corrente);
    this.limiteChequeEspecial = limiteChequeEspecial;
  }
}
