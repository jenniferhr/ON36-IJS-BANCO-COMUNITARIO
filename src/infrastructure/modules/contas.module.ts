import { Module } from '@nestjs/common';
import { GerenteModule } from './gerente.module';
import { ClientesModule } from './clientes.module';
import { ContasController } from '../../presenter/http/controllers/contas/contas.controller';
import { ContasService } from '../../application/services/contas/contas.service';
import { ContasFactory } from '../../domain/factories/contas/contas.factory';
import { ContasRepository } from '../persistence/repositories/contas/contas.repository';

@Module({
  imports: [GerenteModule, ClientesModule],
  controllers: [ContasController],
  providers: [ContasService, ContasFactory, ContasRepository],
})
export class ContasModule {}
