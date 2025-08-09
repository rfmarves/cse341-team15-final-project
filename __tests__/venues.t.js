const express = require('express');
const request = require('supertest');
const venuesController = require('../controllers/venues');
const venuesRoute = require('../routes/venues');

const app = express();
app.use(express.json());
app.use('/', venuesRoute);

jest.mock('../controllers/venues');

describe('Venues API endpoints', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /', () => {
        it('Should return all venues', async () => {
            const mockVenues = [
                { 
                    _id: '1', 
                    venueName: 'Madison Square Garden', 
                    city: 'New York',
                    country: 'United States',
                    address: '4 Pennsylvania Plaza, New York, NY 10001'
                },
                { 
                    _id: '2', 
                    venueName: 'Staples Center', 
                    city: 'Los Angeles',
                    country: 'United States',
                    address: '1111 S Figueroa St, Los Angeles, CA 90015'
                }
            ];

            venuesController.getAll.mockImplementation((req, res) => {
                res.status(200).json(mockVenues);
            });

            const response = await request(app).get('/');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockVenues);
            expect(venuesController.getAll).toHaveBeenCalled();
        });

        it('Should handle errors when getting all venues', async () => {
            venuesController.getAll.mockImplementation((req, res) => {
                res.status(500).json({ error: 'Internal Server Error' });
            });

            const response = await request(app).get('/');
            expect(response.status).toBe(500);
            expect(venuesController.getAll).toHaveBeenCalled();
        });
    });

    describe('GET /:id', () => {
        it('Should return a single venue', async () => {
            const venueId = '689667ef5256f75688e725f5';
            const mockVenue = { 
                _id: venueId, 
                venueName: 'Madison Square Garden',
                city: 'New York',
                country: 'United States',
                address: '4 Pennsylvania Plaza, New York, NY 10001',
                gpsCoordinates: {
                    latitude: 40.7505,
                    longitude: -73.9934
                }
            };

            venuesController.getSingle.mockImplementation((req, res) => {
                res.status(200).json(mockVenue);
            });

            const response = await request(app).get(`/${venueId}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockVenue);
            expect(venuesController.getSingle).toHaveBeenCalled();
        });

        it('Should handle invalid venue ID', async () => {
            const invalidId = 'invalid-id';

            venuesController.getSingle.mockImplementation((req, res) => {
                res.status(400).json({ error: 'Invalid ID' });
            });

            const response = await request(app).get(`/${invalidId}`);
            expect(response.status).toBe(400);
            expect(venuesController.getSingle).toHaveBeenCalled();
        });

        it('Should handle venue not found', async () => {
            const nonExistentId = '689667ef5256f75688e725f9';

            venuesController.getSingle.mockImplementation((req, res) => {
                res.status(404).json({ error: 'Venue not found' });
            });

            const response = await request(app).get(`/${nonExistentId}`);
            expect(response.status).toBe(404);
            expect(venuesController.getSingle).toHaveBeenCalled();
        });
    });
});
