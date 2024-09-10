import { Module } from '@nestjs/common';
import { GerenteService } from './gerente.service';
import { GerenteController } from './gerente.controller';
import { GerenteRepository } from './repository/gerente.repository';

@Module({
  controllers: [GerenteController],
  providers: [GerenteService, GerenteRepository],
  exports: [GerenteService],
})
export class GerenteModule {}
