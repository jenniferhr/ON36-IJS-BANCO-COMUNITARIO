import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GerenteService } from './gerente.service';
import { CreateGerenteDto } from './dto/create-gerente.dto';

@Controller('gerente')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Post()
  create(@Body() createGerenteDto: CreateGerenteDto) {
    return this.gerenteService.criarGerente(createGerenteDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gerenteService.buscarPorId(+id);
  }
}
