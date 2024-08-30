import { TipoConta } from 'src/interfaces/IConta';
import { Cliente } from './Cliente.model';
import { Conta } from './Conta.model';
import { Gerente } from './Gerente.model';

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
