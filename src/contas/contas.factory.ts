import { Injectable } from '@nestjs/common';
import { TipoConta } from 'src/interfaces/IConta';
import { Cliente } from 'src/models/Cliente.model';
import { Conta } from 'src/models/Conta.model';
import { ContaCorrente } from 'src/models/ContaCorrente.model';
import { ContaPoupanca } from 'src/models/ContaPoupanca.model';
import { Gerente } from 'src/models/Gerente.model';

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
