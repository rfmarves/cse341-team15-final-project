const express = require('express');
const request = require('supertest');
const ticketsController = require('../controllers/tickets');
const ticketsRoute = require('../routes/tickets');

const app = express();
app.use(express.json());
app.use('/', ticketsRoute);

jest.mock('../controllers/tickets');
jest.mock('../middleware/authenticate', () => ({
    isAuthenticated: (req, res, next) => next() // Mock authentication for testing
}));

describe('Tickets API endpoints', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /', () => {
        it('Should return all tickets', async () => {
            const mockTickets = [
                { 
                    _id: '1', 
                    customerId: '689667ef5256f75688e725f5',
                    eventId: '689667ef5256f75688e725f6',
                    ticketStatus: 'Active',
                    amountPaid: 85.50,
                    seat: 'A1'
                },
                { 
                    _id: '2', 
                    customerId: '689667ef5256f75688e725f7',
                    eventId: '689667ef5256f75688e725f8',
                    ticketStatus: 'Used',
                    amountPaid: 120.00,
                    seat: 'B3'
                }
            ];

            ticketsController.getAll.mockImplementation((req, res) => {
                res.status(200).json(mockTickets);
            });

            const response = await request(app).get('/');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockTickets);
            expect(ticketsController.getAll).toHaveBeenCalled();
        });

        it('Should handle errors when getting all tickets', async () => {
            ticketsController.getAll.mockImplementation((req, res) => {
                res.status(500).json({ error: 'Internal Server Error' });
            });

            const response = await request(app).get('/');
            expect(response.status).toBe(500);
            expect(ticketsController.getAll).toHaveBeenCalled();
        });
    });

    describe('GET /:id', () => {
        it('Should return a single ticket', async () => {
            const ticketId = '689667ef5256f75688e725f5';
            const mockTicket = { 
                _id: ticketId, 
                customerId: '689667ef5256f75688e725f5',
                eventId: '689667ef5256f75688e725f6',
                ticketStatus: 'Active',
                amountPaid: 85.50,
                purchaseDate: '2025-05-01',
                paymentMethod: 'Credit Card',
                seat: 'A1'
            };

            ticketsController.getSingle.mockImplementation((req, res) => {
                res.status(200).json(mockTicket);
            });

            const response = await request(app).get(`/${ticketId}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockTicket);
            expect(ticketsController.getSingle).toHaveBeenCalled();
        });

        it('Should handle invalid ticket ID', async () => {
            const invalidId = 'invalid-id';

            ticketsController.getSingle.mockImplementation((req, res) => {
                res.status(400).json({ error: 'Invalid ID' });
            });

            const response = await request(app).get(`/${invalidId}`);
            expect(response.status).toBe(400);
            expect(ticketsController.getSingle).toHaveBeenCalled();
        });

        it('Should handle ticket not found', async () => {
            const nonExistentId = '689667ef5256f75688e725f9';

            ticketsController.getSingle.mockImplementation((req, res) => {
                res.status(404).json({ error: 'Ticket not found' });
            });

            const response = await request(app).get(`/${nonExistentId}`);
            expect(response.status).toBe(404);
            expect(ticketsController.getSingle).toHaveBeenCalled();
        });
    });

    describe('GET /status/:id', () => {
        it('Should return ticket status', async () => {
            const ticketId = '689667ef5256f75688e725f5';
            const mockStatus = { 
                ticketId: ticketId,
                status: 'Active',
                lastUpdated: '2025-05-01T10:30:00Z'
            };

            ticketsController.getStatus.mockImplementation((req, res) => {
                res.status(200).json(mockStatus);
            });

            const response = await request(app).get(`/status/${ticketId}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockStatus);
            expect(ticketsController.getStatus).toHaveBeenCalled();
        });

        it('Should handle invalid ticket ID for status check', async () => {
            const invalidId = 'invalid-id';

            ticketsController.getStatus.mockImplementation((req, res) => {
                res.status(400).json({ error: 'Invalid ID' });
            });

            const response = await request(app).get(`/status/${invalidId}`);
            expect(response.status).toBe(400);
            expect(ticketsController.getStatus).toHaveBeenCalled();
        });

        it('Should handle ticket not found for status check', async () => {
            const nonExistentId = '689667ef5256f75688e725f9';

            ticketsController.getStatus.mockImplementation((req, res) => {
                res.status(404).json({ error: 'Ticket not found' });
            });

            const response = await request(app).get(`/status/${nonExistentId}`);
            expect(response.status).toBe(404);
            expect(ticketsController.getStatus).toHaveBeenCalled();
        });
    });
});
