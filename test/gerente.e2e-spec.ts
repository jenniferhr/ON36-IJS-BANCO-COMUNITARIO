import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

const criaGerente = {
  nomeCompleto: 'Pedro Silva',
};

describe('GerenteService (integração)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Deve criar um novo gerente', async () => {
    return request(app.getHttpServer())
      .post('/gerente')
      .send(criaGerente)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('nomeCompleto', 'Pedro Silva');
      });
  });

  it('Deve buscar um gerente', async () => {
    const gerenteCriado = await request(app.getHttpServer())
      .post('/gerente')
      .send(criaGerente)
      .expect(201);

    const idGerente = gerenteCriado.body.id;

    return request(app.getHttpServer())
      .get(`/gerente/${idGerente}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchObject({
          id: idGerente,
          nomeCompleto: criaGerente.nomeCompleto,
          clientes: [],
        });
      });
  });
});
