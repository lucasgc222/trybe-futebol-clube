import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import MatchesSequelizeModel from '../database/models/MatchesSequelizeModel';
import { createdMatch, matchInfo, matcheFinished, matcheInProgress, matchesFromSequelize, updateGoals } from './mocks/matche.mock';
import { validToken } from './mocks/users.mock';
import TeamsSequelizeModel from '../database/models/TeamsSequelizeModel';
import { teamsArray } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração do endpoint /matches:', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Deve realizar a listagem de todas partidas com sucesso', async function () {
    sinon.stub(MatchesSequelizeModel, 'findAll').resolves(matchesFromSequelize);
    const response = await chai.request(app).get('/matches');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('Deve realizar a listagem de partidas em andamento', async function () {
    sinon.stub(MatchesSequelizeModel, 'findAll').resolves(matcheInProgress);
    const response = await chai.request(app).get('/matches').query({ inProgress: true });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.have.deep.equal(matcheInProgress);
  });

  it('Deve realizar a listagem de partidas finalizadas', async function () {
    sinon.stub(MatchesSequelizeModel, 'findAll').resolves(matcheFinished);
    const response = await chai.request(app).get('/matches').query({ inProgress: false });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.have.deep.equal(matcheFinished);
  });

  it('Deve realizar a atualização de uma partida em andamento para finalizada', async function () {
    sinon.stub(MatchesSequelizeModel, 'findOne').resolves(matcheInProgress[0]);
    sinon.stub(MatchesSequelizeModel, 'update').resolves([1]);
    
    const response = await chai.request(app).patch('/matches/41/finish')
      .set('Authorization', validToken);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.deep.equal({ message: "Finished" });
  });

  it('Não deve permitir atualizar uma partida se não estiver autenticado', async function () {
    sinon.stub(MatchesSequelizeModel, 'findOne').resolves(matcheInProgress[0]);
    sinon.stub(MatchesSequelizeModel, 'update').resolves([1]);
    
    const response = await chai.request(app).patch('/matches/41/finish');

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.deep.equal({ message: "Token not found" });
  });

  it('Retorna erro se partida não for encontrada', async function () {
    sinon.stub(MatchesSequelizeModel, 'findOne').resolves(null);
    
    const response = await chai.request(app).patch('/matches/41/finish')
      .set('Authorization', validToken);

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.deep.equal({ message: "Partida não encontrada" });
  });

  it('Retorna erro se partida já foi atualizada', async function () {
    sinon.stub(MatchesSequelizeModel, 'findOne').resolves(matcheInProgress[0]);
    sinon.stub(MatchesSequelizeModel, 'update').resolves([0]);
    
    const response = await chai.request(app).patch('/matches/41/finish')
      .set('Authorization', validToken);

    expect(response.status).to.be.equal(409);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.deep.equal({ message: 'Partida já atualizada' });
  });

  it('Deve ser possível atualizar placar da partida em andamento', async function () {
    const matcheInProgressFromModel = MatchesSequelizeModel.build(matcheInProgress[0].dataValues);
    sinon.stub(MatchesSequelizeModel, 'findOne').resolves(matcheInProgressFromModel);
    sinon.stub(MatchesSequelizeModel, 'update').resolves([1]);
    
    const response = await chai.request(app).patch('/matches/41')
      .set('Authorization', validToken)
      .send(updateGoals);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.deep.equal({ message: 'Finished' });
  });

  it('Retorna erro se partida não existe', async function () {
    sinon.stub(MatchesSequelizeModel, 'findOne').resolves(null);
    
    const response = await chai.request(app).patch('/matches/41555555')
      .set('Authorization', validToken)
      .send(updateGoals);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.deep.equal({ message: 'Partida inválida' });
  });

  it('Retorna erro se tentar atualizar partida que já finalizou', async function () {
    const matcheFinishedFromModel = MatchesSequelizeModel.build(matcheFinished[0].dataValues);
    sinon.stub(MatchesSequelizeModel, 'findOne').resolves(matcheFinishedFromModel);
    sinon.stub(MatchesSequelizeModel, 'update').resolves([0]);
    
    const response = await chai.request(app).patch('/matches/1')
      .set('Authorization', validToken)
      .send(updateGoals);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.deep.equal({ message: 'Partida inválida' });
  });

  it('Retorna erro se tentar atualizar partida com valores errados', async function () {    
    const response = await chai.request(app).patch('/matches/1')
      .set('Authorization', validToken)
      .send({ homeTeamGoals: 'sete', awayTeamGoals: 'dois'});

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.deep.equal({ message: '"homeTeamGoals" must be a number' });

    const response2 = await chai.request(app).patch('/matches/1')
      .set('Authorization', validToken)
      .send({ awayTeamGoals: 'dois' });
    
    expect(response2.status).to.be.equal(400);
    expect(response2.body).to.have.deep.equal({ message: '"homeTeamGoals" is required' });
  });
});


describe('Testes relacionados a criação de partida em /matches:', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Deve ser possível criar uma partida', async function () {
    const team1 = TeamsSequelizeModel.build(teamsArray[0]);
    const team2 = TeamsSequelizeModel.build(teamsArray[1]);
    sinon.stub(TeamsSequelizeModel, 'findOne').resolves(team1).resolves(team2);
    sinon.stub(MatchesSequelizeModel, 'create').resolves(createdMatch);
    
    const response = await chai.request(app).post('/matches')
      .set('Authorization', validToken)
      .send(matchInfo);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.have.deep.equal(createdMatch);
  });

  it('Retorna erro se times são iguais', async function () {
    const response = await chai.request(app).post('/matches')
      .set('Authorization', validToken)
      .send({
        homeTeamId: 1,
        awayTeamId: 1,
        homeTeamGoals: 1,
        awayTeamGoals: 3,
    });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.deep.equal({ 
      message: 'It is not possible to create a match with two equal teams' });
  });

  it('Retorna erro se times não existem', async function () {
    sinon.stub(TeamsSequelizeModel, 'findOne').resolves(null).resolves(null);
    const response = await chai.request(app).post('/matches')
      .set('Authorization', validToken)
      .send(matchInfo);

    expect(response.status).to.be.equal(404);
    expect(response.body).to.have.deep.equal({ message: 'There is no team with such id!' });
  });

  it('Retorna erro se dados passados são incorretos', async function () {
    const response = await chai.request(app).post('/matches')
      .set('Authorization', validToken)
      .send({
        awayTeamId: 1,
        homeTeamGoals: 1,
        awayTeamGoals: 3,
    });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.deep.equal({ message: '"homeTeamId" is required' });
  });
});