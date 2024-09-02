import { Test, TestingModule } from '@nestjs/testing';
import { GerenteController } from './gerente.controller';
import { GerenteService } from './gerente.service';
import { GerenteRepository } from './repository/gerente.repository';

describe('GerenteController', () => {
  let controller: GerenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GerenteController],
      providers: [GerenteService, GerenteRepository],
    }).compile();

    controller = module.get<GerenteController>(GerenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
