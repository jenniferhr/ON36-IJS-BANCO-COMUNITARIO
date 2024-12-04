import { Module } from '@nestjs/common';
import { GerenteModule } from './infrastructure/modules/gerente.module';
import { ClientesModule } from './infrastructure/modules/clientes.module';
import { ContasModule } from './infrastructure/modules/contas.module';
import { AppController } from './presenter/http/controllers/app.controller';
import { AppService } from './application/services/app.service';

@Module({
  imports: [GerenteModule, ClientesModule, ContasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
