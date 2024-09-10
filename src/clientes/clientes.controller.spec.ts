import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { ClientesRepository } from './repository/clientes.repository';
import { Cliente } from 'src/models/Cliente.model';
import { CriaClienteDto } from './dto/cria-cliente.dto';

const id = '1';
const criaCliente = {} as CriaClienteDto;
const clienteRetornado = {} as Cliente;

describe('ClientesController', () => {
  let controller: ClientesController;
  let service: ClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [ClientesService, ClientesRepository],
    }).compile();

    controller = module.get<ClientesController>(ClientesController);
    service = module.get<ClientesService>(ClientesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar service.criarClienteNovo', () => {
    const criarMockado = jest
      .spyOn(service, 'criarClienteNovo')
      .mockReturnValue(clienteRetornado);

    const resultado = controller.create(criaCliente);

    expect(resultado).toEqual(clienteRetornado);
    expect(criarMockado).toHaveBeenCalledTimes(1);
  });

  it('deve chamar service.buscarTodosOsClientes', () => {
    const buscarTodosMockado = jest
      .spyOn(service, 'buscarTodosOsClientes')
      .mockReturnValue([clienteRetornado]);

    const resultado = controller.buscarTodos();

    expect(resultado).toEqual([clienteRetornado]);
    expect(buscarTodosMockado).toHaveBeenCalledTimes(1);
  });

  it('deve chamar service.buscarClientePorId', () => {
    const buscarUmMockado = jest
      .spyOn(service, 'buscarClientePorId')
      .mockReturnValue(clienteRetornado);

    const resultado = controller.buscarUm(id);

    expect(resultado).toEqual(clienteRetornado);
    expect(buscarUmMockado).toHaveBeenCalledTimes(1);
  });

  it('deve chamar service.removerCliente', () => {
    const removerMockado = jest
      .spyOn(service, 'removerCliente')
      .mockReturnValue([]);

    const resultado = controller.removeUm(id);

    expect(resultado).toEqual([]);
    expect(removerMockado).toHaveBeenCalledTimes(1);
  });
});
