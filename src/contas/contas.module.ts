import { Module } from '@nestjs/common';
import { ContasService } from './contas.service';
import { ContasController } from './contas.controller';
import { GerenteModule } from '../gerente/gerente.module';
import { ClientesModule } from '../clientes/clientes.module';
import { ContasFactory } from './contas.factory';

@Module({
  imports: [GerenteModule, ClientesModule],
  controllers: [ContasController],
  providers: [ContasService, ContasFactory],
})
export class ContasModule {}
