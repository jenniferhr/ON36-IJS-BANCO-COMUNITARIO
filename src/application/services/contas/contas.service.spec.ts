import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GerenteService } from '../gerente/gerente.service';
import { ClientesService } from '../clientes/clientes.service';
import { CreateContaDto } from '../../../presenter/http/dto/create-conta.dto';
import { Conta } from '../../../domain/entities/conta';
import { ContasService } from './contas.service';
import { ContasRepository } from '../../../infrastructure/persistence/repositories/contas/contas.repository';
import { ContasFactory } from '../../../domain/factories/contas/contas.factory';
import { GerenteModule } from '../../../infrastructure/modules/gerente.module';
import { ClientesModule } from '../../../infrastructure/modules/clientes.module';
import { Gerente } from '../../../domain/entities/gerente';
import { Cliente } from '../../../domain/entities/cliente';

const criaContaObjeto = {} as CreateContaDto;
const contaSimulada = {} as Conta;

describe('ContasService', () => {
  let service: ContasService;
  let repository: ContasRepository;
  let gerenteService: GerenteService;
  let clientesService: ClientesService;
  let contasFactory: ContasFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GerenteModule, ClientesModule],
      providers: [ContasService, ContasFactory, ContasRepository],
    }).compile();

    service = module.get<ContasService>(ContasService);
    repository = module.get<ContasRepository>(ContasRepository);
    gerenteService = module.get<GerenteService>(GerenteService);
    clientesService = module.get<ClientesService>(ClientesService);
    contasFactory = module.get<ContasFactory>(ContasFactory);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve criar conta com sucesso', () => {
    const buscarGerenteSpy = jest
      .spyOn(gerenteService, 'buscarPorId')
      .mockReturnValue({} as Gerente);

    const buscarClienteSpy = jest
      .spyOn(clientesService, 'buscarClientePorId')
      .mockReturnValue({} as Cliente);

    const criarContaSpy = jest
      .spyOn(contasFactory, 'criarConta')
      .mockReturnValue(contaSimulada);

    const adicionarAClienteSpy = jest
      .spyOn(clientesService, 'adicionarContaACliente')
      .mockReturnValue();

    const adicionarAGerenteSpy = jest
      .spyOn(gerenteService, 'adicionarClienteAoGerente')
      .mockReturnValue();

    jest.spyOn(repository, 'readContas').mockReturnValue([]);
    jest.spyOn(repository, 'writeContas').mockReturnValue();

    const resposta = service.criarConta(criaContaObjeto);

    expect(resposta).toEqual(contaSimulada);
    expect(buscarGerenteSpy).toHaveBeenCalledTimes(1);
    expect(buscarClienteSpy).toHaveBeenCalledTimes(1);
    expect(criarContaSpy).toHaveBeenCalledTimes(1);
    expect(adicionarAClienteSpy).toHaveBeenCalledTimes(1);
    expect(adicionarAGerenteSpy).toHaveBeenCalledTimes(1);
  });

  it('deve fazer throw de NotFoundException caso gerente não exista', () => {
    const buscarGerenteSpy = jest
      .spyOn(gerenteService, 'buscarPorId')
      .mockReturnValue(null);

    expect(() => {
      service.criarConta(criaContaObjeto);
    }).toThrow(NotFoundException);
    expect(buscarGerenteSpy).toHaveBeenCalledTimes(1);
  });

  it('deve fazer throw de NotFoundException caso cliente não exista', () => {
    const buscarGerenteSpy = jest
      .spyOn(gerenteService, 'buscarPorId')
      .mockReturnValue({} as Gerente);

    const buscarClienteSpy = jest
      .spyOn(clientesService, 'buscarClientePorId')
      .mockReturnValue(null);

    expect(() => {
      service.criarConta(criaContaObjeto);
    }).toThrow(NotFoundException);
    expect(buscarGerenteSpy).toHaveBeenCalledTimes(1);
    expect(buscarClienteSpy).toHaveBeenCalledTimes(1);
  });

  it('deve retornar todas as contas existentes', () => {
    jest.spyOn(repository, 'readContas').mockReturnValue([contaSimulada]);

    const resposta = service.buscarTodasAsContas();

    expect(resposta).toStrictEqual([contaSimulada]);
  });

  it('deve retornar uma conta se existir com o numero passado', () => {
    jest.spyOn(repository, 'readContas').mockReturnValue([contaSimulada]);

    const resposta = service.buscarPorNumero(criaContaObjeto.numeroConta);

    expect(resposta).toStrictEqual(contaSimulada);
  });

  it('deve fazer throw de NotFoundException caso não exista conta com o numero', () => {
    const numeroContaNaoExistente = 1;
    jest.spyOn(repository, 'readContas').mockReturnValue([contaSimulada]);

    expect(() => {
      service.buscarPorNumero(numeroContaNaoExistente);
    }).toThrow(NotFoundException);
  });

  it('deve remover uma conta', () => {
    const buscarPorNumeroSpy = jest
      .spyOn(ContasService.prototype as any, 'buscarPorNumero')
      .mockReturnValue({} as Conta);
    jest.spyOn(repository, 'readContas').mockReturnValue([contaSimulada]);
    jest.spyOn(repository, 'writeContas').mockReturnValue();
    const removerDeClienteSpy = jest
      .spyOn(clientesService, 'removerContaDeCliente')
      .mockReturnValue();

    const resposta = service.removerConta(criaContaObjeto.numeroConta);

    expect(resposta).toStrictEqual([]);
    expect(buscarPorNumeroSpy).toHaveBeenCalledTimes(1);
    expect(removerDeClienteSpy).toHaveBeenCalledTimes(1);
  });
});
