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

  constructor(numeroDaConta: number, idCliente: number, saldo: number) {
    this.numeroDaConta = numeroDaConta;
    this.idCliente = idCliente;
    this.saldo = saldo;
  }

  depositar(valor: number): void {

  }
  sacar(valor: number): void {

  }
  transferir(valor: number, numeroDaConta: number): void {

  }
  gerarExtrato(): void {
    
  }
}