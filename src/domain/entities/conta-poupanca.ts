import { TipoConta } from '../interfaces/IConta';
import { Cliente } from './cliente';
import { Conta } from './conta';
import { Gerente } from './gerente';

export class ContaPoupanca extends Conta {
  taxaJuros: number;

  constructor(
    numeroDaConta: number,
    cliente: Cliente,
    gerente: Gerente,
    taxaJuros: number,
  ) {
    super(numeroDaConta, cliente, gerente, TipoConta.Poupanca);
    this.taxaJuros = taxaJuros;
  }
}
