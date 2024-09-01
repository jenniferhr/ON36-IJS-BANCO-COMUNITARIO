import { Test, TestingModule } from '@nestjs/testing';
import { ContasService } from './contas.service';
import { GerenteModule } from '../gerente/gerente.module';
import { ClientesModule } from '../clientes/clientes.module';
import { ContasFactory } from './contas.factory';

describe('ContasService', () => {
  let service: ContasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GerenteModule, ClientesModule],
      providers: [ContasService, ContasFactory],
    }).compile();

    service = module.get<ContasService>(ContasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
