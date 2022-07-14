// Enviroment variables config
const dotenv = require('dotenv');

dotenv.config();
const url = process.env.MONGODB_URL;
// Database Variables
const { MongoClient } = require('mongodb');

const client = new MongoClient(url);

// eslint-disable-next-line no-underscore-dangle
let _medicalRecord;

async function connectDatabase() {
  await client.connect((err, database) => {
    if (err) throw err;
    _medicalRecord = database.db('medical_record');
    console.log('Database Connected Succesfully');
  });
}

function getUser() {
  return _medicalRecord.collection('user');
}

function getPatient() {
  return _medicalRecord.collection('patient');
}

function getInvoice() {
  return _medicalRecord.collection('invoice');
}

function getAppointment() {
  return _medicalRecord.collection('appointment');
}

module.exports = {
  connectDatabase,
  getUser,
  getPatient,
  getInvoice,
  getAppointment,
};
