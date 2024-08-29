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
}
