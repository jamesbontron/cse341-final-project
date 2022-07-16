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

  it('GET /invoice 200 OK', async () => {
    await api.get('/invoice').expect(200);
  });

  it('POST /invoice 200 OK', async () => {
    await api.get('/invoice').expect(200).send({
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
  });
});
