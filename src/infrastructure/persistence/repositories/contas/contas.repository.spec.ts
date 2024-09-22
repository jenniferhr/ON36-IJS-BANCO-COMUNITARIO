import { Conta } from '../../../../domain/entities/conta';
import { ContasRepository } from './contas.repository';

import * as fs from 'fs';
jest.mock('fs');

const mockContas: Conta[] = [{} as Conta];

describe('ContasRepository', () => {
  let contasRepository: ContasRepository;

  beforeEach(() => {
    contasRepository = new ContasRepository();
  });

  it('readContas - deve ler as contas do arquivo', () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockContas));

    const resultado = contasRepository.readContas();

    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    expect(resultado).toEqual(mockContas);
  });

  it('writeContas - deve escrever contas no arquivo', () => {
    jest.spyOn(fs, 'writeFileSync').mockReturnValue();
    const mocklistaStringified = JSON.stringify(mockContas, null, 2);

    contasRepository.writeContas(mockContas);

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.any(String),
      mocklistaStringified,
      'utf8',
    );
  });
});
