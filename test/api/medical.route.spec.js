const request = require('supertest');
const app = require('../../routes');
const dbconnection = require('../../model/dbconnection');
//Connection to a database
dbconnection.connectDatabase();

describe('Test the medical API', () => {

    describe('GET /invoice', () => {
        let response;
        beforeEach(async () => {
            response = await request(app).get('/invoice').send();
        })

        it('Invoice route works', async () => {
            expect(response.status).toBe(200);
            //expect(response.headers['content-type']).toContain('json');
        });
        
        it('Array of invoices', async () => {
            expect(response.body).toBeInstanceOf(Array);
        });
    });
})
