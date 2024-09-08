import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';
import { ClientesRepository } from './repository/clientes.repository';
import { CriaClienteDto } from './dto/cria-cliente.dto';
import { Cliente } from '../models/Cliente.model';
import * as uuid from 'uuid';
import { ConflictException, NotFoundException } from '@nestjs/common';

jest.mock('uuid');

const idCliente = '3356b815-ab52-41c2-9cb1-38654234c34b';
const nomeCompleto = 'maria da Silva Almeida';
const endereco = 'Rua das Flores, 42, Pedrinhas - São Paulo, SP';
const telefone = '11982379465';
const email = 'julia.almeida@gmail.com';
const dataDeNascimento = '1998-07-24';
const cpf = '098.765.432-12';
const criaClienteObjeto = {
  nomeCompleto,
  endereco,
  telefone,
  email,
  dataDeNascimento,
  cpf,
} as CriaClienteDto;

const clienteSimulado = new Cliente(
  nomeCompleto,
  endereco,
  telefone,
  email,
  dataDeNascimento,
  cpf,
);
clienteSimulado.id = idCliente;

describe('ClientesService', () => {
  let service: ClientesService;
  let repository: ClientesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientesService, ClientesRepository],
    }).compile();

    service = module.get<ClientesService>(ClientesService);
    repository = module.get<ClientesRepository>(ClientesRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve criar novo cliente com sucesso', () => {
    const buscarPorCPFSpy = jest
      .spyOn(ClientesService.prototype as any, 'buscarPorCPF')
      .mockReturnValue(null);
    jest.spyOn(repository, 'readClientes').mockReturnValue([]);
    jest.spyOn(repository, 'writeClientes').mockReturnValue();

    jest.spyOn(uuid, 'v4').mockReturnValue(idCliente);

    const resposta = service.criarClienteNovo(criaClienteObjeto);

    expect(buscarPorCPFSpy).toHaveBeenCalledTimes(1);
    expect(resposta).toStrictEqual(clienteSimulado);
  });

  it('deve fazer throw de ConflictException caso tente criar cliente já existente', () => {
    const buscarPorCPFSpy = jest
      .spyOn(ClientesService.prototype as any, 'buscarPorCPF')
      .mockReturnValue(clienteSimulado);

    expect(() => {
      service.criarClienteNovo(criaClienteObjeto);
    }).toThrow(ConflictException);
    expect(buscarPorCPFSpy).toHaveBeenCalledTimes(1);
  });

  it('deve retornar todos os clientes salvos', () => {
    jest.spyOn(repository, 'readClientes').mockReturnValue([clienteSimulado]);

    const resposta = service.buscarTodosOsClientes();

    expect(resposta).toStrictEqual([clienteSimulado]);
  });

  it('deve retornar um cliente se existir um com o id passado', () => {
    const buscarPorIdSpy = jest
      .spyOn(ClientesService.prototype as any, 'buscarPorIdInterno')
      .mockReturnValue(clienteSimulado);

    const resposta = service.buscarClientePorId(idCliente);

    expect(buscarPorIdSpy).toHaveBeenCalledTimes(1);
    expect(resposta).toStrictEqual(clienteSimulado);
  });

  it('deve fazer throw de NotFoundException caso não exista cliente com o id passdo', () => {
    const buscarPorIdSpy = jest
      .spyOn(ClientesService.prototype as any, 'buscarPorIdInterno')
      .mockReturnValue(null);

    expect(() => {
      service.buscarClientePorId(idCliente);
    }).toThrow(NotFoundException);
    expect(buscarPorIdSpy).toHaveBeenCalledTimes(1);
  });

  it('deve remover um cliente', () => {
    jest.spyOn(repository, 'readClientes').mockReturnValue([clienteSimulado]);
    jest.spyOn(repository, 'writeClientes').mockReturnValue();

    const resposta = service.removerCliente(idCliente);

    expect(resposta).toStrictEqual([]);
  });

  it.todo('deve adicionar conta a lista de contas de um cliente');

  it.todo('deve remover uma conta da lista de contas de um cliente');
});
