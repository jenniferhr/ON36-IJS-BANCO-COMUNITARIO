import { Injectable } from '@nestjs/common';
import { TipoConta } from '../interfaces/IConta';
import { Cliente } from '../models/Cliente.model';
import { Conta } from '../models/Conta.model';
import { ContaCorrente } from '../models/ContaCorrente.model';
import { ContaPoupanca } from '../models/ContaPoupanca.model';
import { Gerente } from '../models/Gerente.model';

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
        return null;
    }
  }
}
