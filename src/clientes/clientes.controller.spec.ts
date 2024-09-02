import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { ClientesRepository } from './repository/clientes.repository';

describe('ClientesController', () => {
  let controller: ClientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [ClientesService, ClientesRepository],
    }).compile();

    controller = module.get<ClientesController>(ClientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
