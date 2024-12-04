import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CriaClienteDto } from 'src/presenter/http/dto/cria-cliente.dto';

const nomeCompleto = 'Julia das Integrações';
const cep = '78700-110';
const telefone = '11982379465';
const email = 'julia.almeida@gmail.com';
const dataDeNascimento = '1998-07-24';
const cpf = '098.765.432-12';
const criaClienteObjeto = {
  nomeCompleto,
  cep,
  telefone,
  email,
  dataDeNascimento,
  cpf,
} as CriaClienteDto;

// Problema com testes de integração -- estão persistindo dados no arquivo json. Entender isso??
describe('ClientesService (integração)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    jest.resetAllMocks(); // Reseta mocks
  });

  afterAll(async () => {
    await app.close();
  });

  it('Deve criar um novo cliente', async () => {
    return request(app.getHttpServer())
      .post('/clientes')
      .send(criaClienteObjeto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject({
          nomeCompleto,
          telefone,
          email,
          dataDeNascimento,
          cpf,
        });
      });
  });

  it('Deve buscar todos os clientes', async () => {
    const clienteCriado = await request(app.getHttpServer())
      .post('/clientes')
      .send(criaClienteObjeto)
      .expect(201);

    return request(app.getHttpServer())
      .get(`/clientes`)
      .expect(200)
      .then((response) => {
        console.log(response);
        const clientes = response.body;
        expect(clientes).toContainEqual(
          expect.objectContaining(clienteCriado.body),
        );
      });
  });
});
