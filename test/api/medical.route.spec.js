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
});
