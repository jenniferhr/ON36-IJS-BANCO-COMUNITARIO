import { Module } from '@nestjs/common';
import { ContasService } from './contas.service';
import { ContasController } from './contas.controller';
import { GerenteModule } from 'src/gerente/gerente.module';
import { ClientesModule } from 'src/clientes/clientes.module';

@Module({
  imports: [GerenteModule, ClientesModule],
  controllers: [ContasController],
  providers: [ContasService],
})
export class ContasModule {}
