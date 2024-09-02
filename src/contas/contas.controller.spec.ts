import { Test, TestingModule } from '@nestjs/testing';
import { ContasController } from './contas.controller';
import { ContasService } from './contas.service';
import { ContasFactory } from './contas.factory';
import { GerenteModule } from '../gerente/gerente.module';
import { ClientesModule } from '../clientes/clientes.module';
import { ContasRepository } from './repository/contas.repository';

describe('ContasController', () => {
  let controller: ContasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GerenteModule, ClientesModule],
      controllers: [ContasController],
      providers: [ContasService, ContasFactory, ContasRepository],
    }).compile();

    controller = module.get<ContasController>(ContasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
