import { Cliente } from './Cliente.model';
import { Conta } from './Conta.model';
import { ContaCorrente } from './ContaCorrente.model';

export class Gerente {
  id: number;
  nomeCompleto: string;
  clientes: Cliente[] = [];

  constructor(id: number, nomeCompleto: string) {
    this.id = id;
    this.nomeCompleto = nomeCompleto;
    this.clientes = [];
  }

  criarCliente(
    nomeCompleto: string,
    endereco: string,
    telefone: string,
    email: string,
    dataDeNascimento: string,
    cpf: string,
  ): Cliente {
    const novoCliente = new Cliente(
      nomeCompleto,
      endereco,
      telefone,
      email,
      dataDeNascimento,
      cpf,
      this,
    );
    this.clientes.push(novoCliente);
    return novoCliente;
  }

  removerCliente(clienteId: number): void {
    this.clientes = this.clientes.filter((cliente) => cliente.id !== clienteId);
  }

  abrirContaCorrente(
    numeroDaConta: number,
    clienteId: number,
    limiteChequeEspecial: number,
  ): Conta {
    const clienteDaConta = this.clientes.find(
      (cliente) => cliente.id !== clienteId,
    );
    const contaCorrenteNova = new ContaCorrente(
      numeroDaConta,
      clienteDaConta,
      limiteChequeEspecial,
    );
    return contaCorrenteNova;
  }

  abrirContaPoupanca(
    numeroDaConta: number,
    clienteId: number,
    taxaJuros: number,
  ): Conta {
    const clienteDaConta = this.clientes.find(
      (cliente) => cliente.id !== clienteId,
    );
    const contaPoupancaNova = new ContaCorrente(
      numeroDaConta,
      clienteDaConta,
      taxaJuros,
    );
    return contaPoupancaNova;
  }

  adicionarContasACliente(cliente: Cliente, conta: Conta): void {
    cliente.adicionarConta(conta);
  }

  fecharConta(clienteId: number, numeroDaConta: number): void {
    const cliente = this.clientes.find((cliente) => cliente.id === clienteId);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }
    cliente.removerConta(numeroDaConta);
  }
}
