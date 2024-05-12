import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { oneTeamFromModel, teamsArrayFromModel } from './mocks/teams.mock';
import TeamsSequelizeModel from '../database/models/TeamsSequelizeModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração do endpoint /teams:', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Deve realizar a listagem de times com sucesso', async function () {
    sinon.stub(TeamsSequelizeModel, 'findAll').resolves(teamsArrayFromModel);
    const response = await chai.request(app).get('/teams');


    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('Deve realizar a listagem de apenas um time com sucesso', async function () {
    sinon.stub(TeamsSequelizeModel, 'findOne').resolves(oneTeamFromModel);
    const response = await chai.request(app).get('/teams/5');


    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('object');
  });

  it('Retorna erro se time não for encontrado', async function () {
    sinon.stub(TeamsSequelizeModel, 'findOne').resolves(null);
    const response = await chai.request(app).get('/teams/55555');


    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({message: 'Time não encontrado'});
  });
});
