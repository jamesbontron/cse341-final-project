const request = require('supertest');
const app = require('../../app');
// Enviroment variables config
const dotenv = require('dotenv');

dotenv.config();
const url = process.env.MONGODB_URL;
// Database Variables
const { MongoClient } = require('mongodb');

const api = request(app);

describe('Test Medical Appointment Scheduler API', () => {
  let db;
  let connection;
  let response;

  beforeAll(async () => {
    connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('medical_record');
  });

  afterAll(async () => {
    await connection.close();
  });
  describe('Test Invoice route CRUD Operations', () => {
    let insertedId;

    it('GET /invoice 200 OK', async () => {
      await api.get('/invoice').expect(200);
    });

    it('POST /invoice 201 Created', async () => {
      response = await api.post('/invoice').expect(201).send({
        date: '2022-07-16',
        hour: '20:26',
        doctorId: '62cc3fd838c349c8b1e90ffb',
        patientId: '62ce153b3dd916a60de8277c',
        appointmentId: '62d0a5bff2da0e802cd53a0b',
        doctorComments:
          'Reposo por 72 horas, Amoxicilina por 1 semana, 1 comprimido cada 8 horas',
        status: 'Finished',
        price: '15',
      });
      insertedId = response.body;
    });

    it('GET /invoice/:id 200 OK', async () => {
      await api.get(`/invoice/${insertedId}`).expect(200);
    });

    it('PUT /invoice/:id 201 Created', async () => {
      const putURL = `/invoice/${insertedId}`;

      await api.put(putURL).expect(201).send({
        date: '2022-07-16',
        hour: '20:26',
        doctorId: '62cc3fd838c349c8b1e90ffb',
        patientId: '62ce153b3dd916a60de8277c',
        appointmentId: '62d0a5bff2da0e802cd53a0b',
        doctorComments:
          'Reposo por 72 horas, Amoxicilina por 1 semana, 1 comprimido cada 8 horas',
        status: 'Finished',
        price: '14',
      });
    });
    it('Delete /invoice/:id 200 OK', async () => {
      await api.delete(`/invoice/${insertedId}`).expect(200);
    });
  });

  describe('Test user route CRUD Operations', () => {
    let insertedId;

    it('GET /user 200 OK', async () => {
      await api.get('/user').expect(200);
    });

    it('POST /user 201 Created', async () => {
      response = await api
        .post('/user')
        .expect(201)
        .send({
          displayName: 'Richard Jones',
          firstName: 'Richard',
          lastName: 'Jones',
          image: 'No image',
          birth: { $date: { $numberLong: '882403200000' } },
          role: 'doctor',
          password: 'richard123',
          username: 'rjones',
        });
      insertedId = response.body;
    });

    it('GET /user/:id 200 OK', async () => {
      await api.get(`/user/${insertedId}`).expect(200);
    });

    it('PUT /user/:id 201 Created', async () => {
      const putURL = `/user/${insertedId}`;

      await api
        .put(putURL)
        .expect(201)
        .send({
          displayName: 'Richard Jones',
          firstName: 'Richard',
          lastName: 'Jones',
          image: 'No image',
          birth: { $date: { $numberLong: '882403200000' } },
          role: 'administrative',
          password: 'richard123',
          username: 'rjones',
        });
    });
    it('Delete /user/:id 200 OK', async () => {
      await api.delete(`/user/${insertedId}`).expect(200);
    });
  });

  describe('Test patient route CRUD Operations', () => {
    let insertedId;

    it('GET /patient 200 OK', async () => {
      await api.get('/patient').expect(200);
    });

    it('POST /patient 201 Created', async () => {
      response = await api.post('/patient').expect(201).send({
        googleID: '100751278626564177889',
        displayName: 'José Francisco Aguirre Villarroel',
        firstName: 'José Francisco',
        image:
          'https://lh3.googleusercontent.com/a/AATXAJwUdzfuC8zB-QqlvsJ54cBad9jzCxi4ObsL8idd=s96-c',
        birth: 'pending',
        createdAt: '1656816260591',
        role: 'patient',
      });
      insertedId = response.body;
    });

    it('GET /patient/:id 200 OK', async () => {
      await api.get(`/patient/${insertedId}`).expect(200);
    });

    it('PUT /patient/:id 201 Created', async () => {
      const putURL = `/patient/${insertedId}`;

      await api.put(putURL).expect(201).send({
        googleID: '100751278626564177889',
        displayName: 'José Francisco Aguirre Villarroel',
        firstName: 'José Francisco',
        image:
          'https://lh3.googleusercontent.com/a/AATXAJwUdzfuC8zB-QqlvsJ54cBad9jzCxi4ObsL8idd=s96-c',
        birth: '04/13/1992',
        createdAt: '1656816260591',
        role: 'patient',
      });
    });
    it('Delete /patient/:id 200 OK', async () => {
      await api.delete(`/patient/${insertedId}`).expect(200);
    });
  });

  describe('Test appointment route CRUD Operations', () => {
    let insertedId;

    it('GET /appointment 200 OK', async () => {
      await api.get('/appointment').expect(200);
    });

    it('POST /appointment 201 Created', async () => {
      response = await api.post('/appointment').expect(201).send({
        date: '2022-07-16',
        hour: '20:26',
        doctorId: '62cc3fd838c349c8b1e90ffb',
        patientId: '62ce153b3dd916a60de8277c',
        patientComments: 'Me duele la cabeza',
        doctorComments:
          'Reposo por 72 horas, Amoxicilina por 1 semana, 1 comprimido cada 8 horas',
        status: 'Finished',
      });
      insertedId = response.body;
    });

    it('GET /appointment/:id 200 OK', async () => {
      await api.get(`/appointment/${insertedId}`).expect(200);
    });

    it('PUT /appointment/:id 201 Created', async () => {
      const putURL = `/appointment/${insertedId}`;

      await api.put(putURL).expect(201).send({
        date: '2022-07-16',
        hour: '20:26',
        doctorId: '62cc3fd838c349c8b1e90ffb',
        patientId: '62ce153b3dd916a60de8277c',
        patientComments: 'Me duele la cabeza',
        doctorComments:
          'Reposo por 72 horas, Amoxicilina por 1 semana, 1 comprimido cada 12 horas',
        status: 'Finished',
      });
    });
    it('Delete /appointment/:id 200 OK', async () => {
      await api.delete(`/appointment/${insertedId}`).expect(200);
    });
  });
});
