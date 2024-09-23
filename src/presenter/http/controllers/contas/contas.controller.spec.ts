import { Test, TestingModule } from '@nestjs/testing';
import { ContasController } from './contas.controller';
import { Conta } from '../../../../domain/entities/conta';
import { CreateContaDto } from '../../dto/create-conta.dto';
import { ContasService } from '../../../../application/services/contas/contas.service';
import { GerenteModule } from '../../../../infrastructure/modules/gerente.module';
import { ClientesModule } from '../../../../infrastructure/modules/clientes.module';
import { ContasFactory } from '../../../../domain/factories/contas/contas.factory';
import { ContasRepository } from '../../../../infrastructure/persistence/repositories/contas/contas.repository';

const numeroConta = '1234';
const criaConta = {} as CreateContaDto;
const contaRetornada = {} as Conta;

describe('ContasController', () => {
  let controller: ContasController;
  let service: ContasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GerenteModule, ClientesModule],
      controllers: [ContasController],
      providers: [ContasService, ContasFactory, ContasRepository],
    }).compile();

    controller = module.get<ContasController>(ContasController);
    service = module.get<ContasService>(ContasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar service.criarConta', () => {
    const criarMockado = jest
      .spyOn(service, 'criarConta')
      .mockReturnValue(contaRetornada);

    const resultado = controller.create(criaConta);

    expect(resultado).toEqual(contaRetornada);
    expect(criarMockado).toHaveBeenCalledTimes(1);
  });

  it('deve chamar service.buscarTodosOsClientes', () => {
    const buscarTodosMockado = jest
      .spyOn(service, 'buscarTodasAsContas')
      .mockReturnValue([contaRetornada]);

    const resultado = controller.findAll();

    expect(resultado).toEqual([contaRetornada]);
    expect(buscarTodosMockado).toHaveBeenCalledTimes(1);
  });

  it('deve chamar service.buscarClientePorId', () => {
    const buscarUmMockado = jest
      .spyOn(service, 'buscarPorNumero')
      .mockReturnValue(contaRetornada);

    const resultado = controller.findOne(numeroConta);

    expect(resultado).toEqual(contaRetornada);
    expect(buscarUmMockado).toHaveBeenCalledTimes(1);
  });

  it('deve chamar service.removerCliente', () => {
    const removerMockado = jest
      .spyOn(service, 'removerConta')
      .mockReturnValue([]);

    const resultado = controller.remove(numeroConta);

    expect(resultado).toEqual([]);
    expect(removerMockado).toHaveBeenCalledTimes(1);
  });
});
