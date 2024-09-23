import { Module } from '@nestjs/common';

import { GerenteModule } from './gerente.module';
import { ClientesController } from '../../presenter/http/controllers/clientes/clientes.controller';
import { ClientesService } from '../../application/services/clientes/clientes.service';
import { ClientesRepository } from '../persistence/repositories/clientes/clientes.repository';
import { CepService } from '../adapters/cep-adapter.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [GerenteModule, HttpModule],
  controllers: [ClientesController],
  providers: [ClientesService, ClientesRepository, CepService],
  exports: [ClientesService],
})
export class ClientesModule {}
