import * as sinon from 'sinon';
import * as chai from 'chai';
import 'mocha';
// @ts-ignore
import * as chaiHttp from 'chai-http';

import { app } from '../app';

import UserSequelizeModel from '../database/models/UserSequelizeModel';
import { oneUserFromModel, validToken } from './mocks/users.mock';
import { Login } from '../types/Login';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração do endpoint /login:', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Deve realizar login com sucesso', async function () {
    const data: Login = {
      email: "admin@admin.com",
      password: "secret_admin",
    }

    sinon.stub(UserSequelizeModel, 'findOne').resolves(oneUserFromModel);
    const response = (await chai.request(app).post('/login').send(data));


    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('token');
  });

  it('Retorna erro se email for inválido', async function () {

    sinon.stub(UserSequelizeModel, 'findOne').resolves(oneUserFromModel);
    const data: Login = {
      email: "admin.com",
      password: "secret_admin",
    }

    const response = await chai.request(app).post('/login').send(data);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body).to.be.deep.equal({message: 'Invalid email or password'});   
  });

  it('Retorna erro se email for válido mas não está cadastrado', async function () {
    sinon.stub(UserSequelizeModel, 'findOne').resolves(null);
    
    const data: Login = {
      email: "administrador@admin.com",
      password: "secret_admin",
    }

    const response = await chai.request(app).post('/login').send(data);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body).to.be.deep.equal({message: 'Invalid email or password'});   
  });

  it('Retorna erro se email não é fornecido', async function () {
    sinon.stub(UserSequelizeModel, 'findOne').resolves(null);
    
    const data = {
      password: "secret_admin",
    }

    const response = await chai.request(app).post('/login').send(data);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({message: 'All fields must be filled'});   
  });

  it('Retorna erro se senha for inválida', async function () {

    sinon.stub(UserSequelizeModel, 'findOne').resolves(oneUserFromModel);
    const data: Login = {
      email: "admin@admin.com",
      password: "12345",
    }

    const response = await chai.request(app).post('/login').send(data);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body).to.be.deep.equal({message: 'Invalid email or password'});   
  });

  it('Retorna erro se senha for válida mas não está cadastrada', async function () {

    sinon.stub(UserSequelizeModel, 'findOne').resolves(oneUserFromModel);
    const data: Login = {
      email: "admin@admin.com",
      password: "secret_admin2",
    }

    const response = await chai.request(app).post('/login').send(data);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body).to.be.deep.equal({message: 'Invalid email or password'});   
  });

  it('Retorna erro se senha não é fornecida', async function () {
    sinon.stub(UserSequelizeModel, 'findOne').resolves(null);
    
    const data = {
      email: "admin@admin.com",
    }

    const response = await chai.request(app).post('/login').send(data);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({message: 'All fields must be filled'});   
  });
});

describe('Testes de integração do endpoint /login/role', () => {
  beforeEach(() => {
    sinon.restore();
  });
  it('Retorna erro se token não é fornecido', async function () {    
    const response = await chai.request(app).get('/login/role');

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Token not found' });   
  });

  it('Retorna erro se token não é válido', async function () {    
    const response = await chai.request(app)
    .get('/login/role')
    .set('Authorization', 'kjhasdy.gauyidgauy.DGBAUIJKSD');

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Token must be a valid token' });   
  });

  it('Deve retornar o tipo de usuário se token é válido', async function () {    
    const response = await chai.request(app)
    .get('/login/role')
    .set('Authorization', validToken);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ role: 'admin' });   
  });
    
});