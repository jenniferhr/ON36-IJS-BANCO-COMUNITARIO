import { Test, TestingModule } from '@nestjs/testing';
import { GerenteService } from './gerente.service';
import { GerenteRepository } from './repository/gerente.repository';
import { Gerente } from '../models/Gerente.model';
import * as uuid from 'uuid';
import { NotFoundException } from '@nestjs/common';
jest.mock('uuid');

const nomeGerente = 'Mario Silva';
const idGerente = '3356b815-ab52-41c2-9cb1-38654234c34b';

describe('GerenteService', () => {
  let service: GerenteService;
  let repository: GerenteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GerenteService, GerenteRepository],
    }).compile();

    service = module.get<GerenteService>(GerenteService);
    repository = module.get<GerenteRepository>(GerenteRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve criar gerente', () => {
    const params = { nomeCompleto: nomeGerente };
    jest.spyOn(repository, 'readGerentes').mockReturnValue([]);
    jest.spyOn(repository, 'writeGerentes').mockReturnValue();

    const esperado = new Gerente(nomeGerente);
    esperado.id = idGerente;

    jest.spyOn(uuid, 'v4').mockReturnValue(idGerente);

    const resposta = service.criarGerente(params);

    expect(resposta).toStrictEqual(esperado);
  });

  it('deve retornar um gerente caso exista um com o id passado', () => {
    const gerenteExistente = {
      id: idGerente,
      nomeCompleto: nomeGerente,
      clientes: [],
    };
    jest.spyOn(repository, 'readGerentes').mockReturnValue([gerenteExistente]);

    const response = service.buscarPorId(idGerente);

    expect(response).toEqual(gerenteExistente);
  });

  it('deve fazer throw de NotFoundException caso não exista gerente com o id passado', () => {
    jest.spyOn(repository, 'readGerentes').mockReturnValue([]);
    expect(() => {
      service.buscarPorId(idGerente);
    }).toThrow(NotFoundException);
  });

  it.todo('deve atualizar a lista de clientes adicionando o cliente');
});
