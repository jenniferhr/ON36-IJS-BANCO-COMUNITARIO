import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';
import { ClientesRepository } from './repository/clientes.repository';

describe('ClientesService', () => {
  let service: ClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientesService, ClientesRepository],
    }).compile();

    service = module.get<ClientesService>(ClientesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
