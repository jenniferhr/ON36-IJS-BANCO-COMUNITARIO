import { Test, TestingModule } from '@nestjs/testing';
import { GerenteService } from './gerente.service';

const gerenteCriado = {
  id: 1,
  nomeCompleto: 'Pedro Santos',
  clientes: [],
};

const nomeGerente = 'Pedro Santos';

describe('GerenteService', () => {
  let service: GerenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GerenteService],
    }).compile();

    service = module.get<GerenteService>(GerenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.only('deve criar gerente', () => {
    const params = { nomeCompleto: nomeGerente };

    const response = service.criarGerente(params);

    expect(response).toEqual(gerenteCriado);
  });
});
