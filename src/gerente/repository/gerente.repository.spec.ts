import { Gerente } from '../../models/Gerente.model';
import { GerenteRepository } from './gerente.repository';
import { Cliente } from '../../models/Cliente.model';

import * as fs from 'fs';
jest.mock('fs');

const mockGerentes: Gerente[] = [
  {
    id: '1',
    nomeCompleto: 'Carlos Silva',
    clientes: [],
  },
  {
    id: '2',
    nomeCompleto: 'Ana Oliveira',
    clientes: [{} as Cliente],
  },
];

describe('GerenteRepository', () => {
  let gerenteRepository: GerenteRepository;

  beforeEach(() => {
    gerenteRepository = new GerenteRepository();
  });

  it('readGerentes - deve ler os gerentes do arquivo', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue(JSON.stringify(mockGerentes));

    const resultado = gerenteRepository.readGerentes();

    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    expect(resultado).toEqual(mockGerentes);
  });

  it('writeGerentes - deve escrever gerentes no arquivo', () => {
    jest.spyOn(fs, 'writeFileSync').mockReturnValue();
    const mocklistaStringified = JSON.stringify(mockGerentes, null, 2);

    gerenteRepository.writeGerentes(mockGerentes);

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.any(String),
      mocklistaStringified,
      'utf8',
    );
  });
});
