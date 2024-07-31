import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { GerenteModule } from 'src/gerente/gerente.module';

@Module({
  imports: [GerenteModule],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
