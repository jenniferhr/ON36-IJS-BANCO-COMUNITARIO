import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GerenteModule } from './gerente/gerente.module';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [GerenteModule, ClientesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
