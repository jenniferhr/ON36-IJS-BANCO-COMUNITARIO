import { IConta } from "../interfaces/IConta";

/*
Interface IConta
Interface ICliente

Classe abstrata Conta implementa interface IConta
numeroDaConta
saldo
idCliente
----
depositar()
sacar()
transferir()
gerarExtrato()

Classe ContaCorrente extende Conta
limiteChequeEspecial

Classe ContaPoupanca extende Conta
taxaJuros

Classe Cliente implementa ICliente
id
nomeCompleto
endereco
telefone
email
dataDeNascimento
cpf
----
abrirConta()

*/
export abstract class Conta implements IConta {
  numeroDaConta: number;
  idCliente: number;
  saldo: number;

  constructor(numeroDaConta: number, idCliente: number) {
    this.numeroDaConta = numeroDaConta;
    this.idCliente = idCliente;
    this.saldo = 0;
  }

  depositar(valor: number): void {
    this.saldo += valor;
  }

  sacar(valor: number): void {
    if (this.saldo >= valor) {
      this.saldo -= valor;
    } else {
      console.log(`Saldo insuficiente para a transação. Saldo atual: ${this.saldo}`)
    }
  }

  abstract transferir(valor: number, contaDestino: Conta): void;
}