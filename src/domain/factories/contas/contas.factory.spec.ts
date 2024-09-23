import { Test, TestingModule } from '@nestjs/testing';
import { ContasFactory } from './contas.factory';
import { Cliente } from '../../../domain/entities/cliente';
import { ContaCorrente } from '../../../domain/entities/conta-corrente';
import { ContaPoupanca } from '../../../domain/entities/conta-poupanca';
import { Gerente } from '../../../domain/entities/gerente';
import { TipoConta } from '../../../domain/interfaces/IConta';

const nomeCliente = 'Maria Silva';
const enderecoCliente = 'Rua das Flores, 42, Pedrinhas - São Paulo, SP';
const telefoneCliente = '11982379465';
const emailCliente = 'julia.almeida@gmail.com';
const dataDeNascimentoCliente = '1998-07-24';
const cpfCliente = '098.765.432-12';
const nomeGerente = 'Mario Dantas';
const cliente = new Cliente(
  nomeCliente,
  enderecoCliente,
  telefoneCliente,
  emailCliente,
  dataDeNascimentoCliente,
  cpfCliente,
);
const gerente = new Gerente(nomeGerente);
const numeroDaConta = 123456;

describe('ContasFactory', () => {
  let factory: ContasFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContasFactory],
    }).compile();

    factory = module.get<ContasFactory>(ContasFactory);
  });

  it('deve criar uma conta corrente corretamente', () => {
    const limiteChequeEspecial = 1000;

    const conta = factory.criarConta(
      TipoConta.Corrente,
      numeroDaConta,
      cliente,
      gerente,
      { limiteChequeEspecial },
    ) as ContaCorrente;

    expect(conta).toBeInstanceOf(ContaCorrente);
    expect(conta.numeroDaConta).toBe(numeroDaConta);
    expect(conta.cliente).toBe(cliente);
    expect(conta.gerente).toBe(gerente.nomeCompleto);
    expect(conta.limiteChequeEspecial).toBe(limiteChequeEspecial);
  });

  it('deve criar uma conta poupança corretamente', () => {
    const taxaJuros = 2;

    const conta = factory.criarConta(
      TipoConta.Poupanca,
      numeroDaConta,
      cliente,
      gerente,
      { taxaJuros },
    ) as ContaPoupanca;

    expect(conta).toBeInstanceOf(ContaPoupanca);
    expect(conta.numeroDaConta).toBe(numeroDaConta);
    expect(conta.cliente).toBe(cliente);
    expect(conta.gerente).toBe(gerente.nomeCompleto);
    expect(conta.taxaJuros).toBe(taxaJuros);
  });

  it('deve retornar caso Tipo passado não seja válida', () => {
    expect(() => {
      factory.criarConta(null, numeroDaConta, cliente, gerente);
    }).toThrow(Error);
  });
});
