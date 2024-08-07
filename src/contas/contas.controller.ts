import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ContasService } from './contas.service';
import { CreateContaDto } from './dto/create-conta.dto';

@Controller('contas')
export class ContasController {
  constructor(private readonly contasService: ContasService) {}

  @Post()
  create(@Body() createContaDto: CreateContaDto) {
    return this.contasService.criarConta(createContaDto);
  }

  @Get()
  findAll() {
    return this.contasService.buscarTodasAsContas();
  }

  @Get(':numeroDaConta')
  findOne(@Param('numeroDaConta') numeroDaConta: string) {
    return this.contasService.buscarPorNumero(+numeroDaConta);
  }

  TODO: 'Implementar mudança de tipo de conta';
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateContaDto: UpdateContaDto) {
  //   return this.contasService.update(+id, updateContaDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contasService.removerConta(+id);
  }
}
