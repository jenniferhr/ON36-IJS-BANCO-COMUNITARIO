import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { GerenteModule } from '../gerente/gerente.module';
import { ClientesRepository } from './repository/clientes.repository';

@Module({
  imports: [GerenteModule],
  controllers: [ClientesController],
  providers: [ClientesService, ClientesRepository],
  exports: [ClientesService],
})
export class ClientesModule {}
