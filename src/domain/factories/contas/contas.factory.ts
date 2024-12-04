import { Injectable } from '@nestjs/common';
import { Cliente } from '../../../domain/entities/cliente';
import { Conta } from '../../../domain/entities/conta';
import { ContaCorrente } from '../../../domain/entities/conta-corrente';
import { ContaPoupanca } from '../../../domain/entities/conta-poupanca';
import { Gerente } from '../../../domain/entities/gerente';
import { TipoConta } from '../../../domain/interfaces/IConta';

@Injectable()
export class ContasFactory {
  criarConta(
    tipoConta: TipoConta,
    numeroDaConta: number,
    cliente: Cliente,
    gerente: Gerente,
    ...rest: any[]
  ): Conta {
    const [atributos] = rest;

    switch (tipoConta) {
      case TipoConta.Corrente:
        return new ContaCorrente(
          numeroDaConta,
          cliente,
          gerente,
          atributos.limiteChequeEspecial,
        );
      case TipoConta.Poupanca:
        return new ContaPoupanca(
          numeroDaConta,
          cliente,
          gerente,
          atributos.taxaJuros,
        );
      default:
        throw new Error('Tipo de conta inválido.');
    }
  }
}
