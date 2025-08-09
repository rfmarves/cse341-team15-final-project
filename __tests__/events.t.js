const express = require('express');
const request = require('supertest');
const eventsController= require('../controllers/events');
const eventsRoute = require('../routes/events');

const app = express();
app.use (express.json());
app.use ('/', eventsRoute);

jest.mock('../controllers/events');


describe('Events API endpoints', () => {
    describe('GET / ', () => {
        it('Should return all events', async () => {
            eventsController.getAll.mockImplementation((req,res)=> {
                res.status(200).send(``);
            })

            const response = await request(app).get(``);
            expect(response.status).toBe(200);
            expect(eventsController.getAll).toHaveBeenCalled();
        })
    })
    describe('GET / ', () => {
        it('Should return a single event', async () => {
            const eventId = '689667ef5256f75688e725f5';
            eventsController.getSingle.mockImplementation((req,res)=> {
                res.status(200).send(`eventId: ${req.params.id}`);
            })

            const response = await request(app).get(`/${eventId}`);
            expect(response.status).toBe(200);
            expect(response.text).toEqual(`eventId: ${eventId}`);
            expect(eventsController.getSingle).toHaveBeenCalled();
        })
    })
})