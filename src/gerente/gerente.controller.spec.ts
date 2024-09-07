import { Test, TestingModule } from '@nestjs/testing';
import { GerenteController } from './gerente.controller';
import { GerenteService } from './gerente.service';
import { GerenteRepository } from './repository/gerente.repository';
import { Gerente } from 'src/models/Gerente.model';

const nomeGerente = 'Pedro Teste da Silva';
const idGerente = '3356b815-ab52-41c2-9cb1-38654234c34b';
const gerenteRetornado = {
  id: idGerente,
  nomeCompleto: nomeGerente,
  clientes: [],
} as Gerente;

describe.only('GerenteController', () => {
  let controller: GerenteController;
  let service: GerenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GerenteController],
      providers: [GerenteService, GerenteRepository],
    }).compile();

    controller = module.get<GerenteController>(GerenteController);
    service = module.get<GerenteService>(GerenteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.criarGerente', () => {
    const criarMockado = jest
      .spyOn(service, 'criarGerente')
      .mockReturnValue(gerenteRetornado);

    const resultado = controller.create({ nomeCompleto: nomeGerente });

    expect(resultado).toEqual(gerenteRetornado);
    expect(criarMockado).toHaveBeenCalledTimes(1);
  });

  it('should call service.buscarPorId', () => {
    const buscarPorIdMockado = jest
      .spyOn(service, 'buscarPorId')
      .mockReturnValue(gerenteRetornado);

    const resultado = controller.findOne(idGerente);

    expect(resultado).toEqual(gerenteRetornado);
    expect(buscarPorIdMockado).toHaveBeenCalledTimes(1);
  });
});
