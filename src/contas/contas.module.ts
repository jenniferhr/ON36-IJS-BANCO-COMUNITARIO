import { Module } from '@nestjs/common';
import { ContasService } from './contas.service';
import { ContasController } from './contas.controller';
import { GerenteModule } from 'src/gerente/gerente.module';

@Module({
  imports: [GerenteModule],
  controllers: [ContasController],
  providers: [ContasService],
})
export class ContasModule {}
