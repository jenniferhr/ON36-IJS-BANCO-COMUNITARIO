import { Module } from '@nestjs/common';
import { GerenteController } from '../../presenter/http/controllers/gerente/gerente.controller';
import { GerenteService } from '../../application/services/gerente/gerente.service';
import { GerenteRepository } from '../persistence/repositories/gerente/gerente.repository';

@Module({
  controllers: [GerenteController],
  providers: [GerenteService, GerenteRepository],
  exports: [GerenteService],
})
export class GerenteModule {}
