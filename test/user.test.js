const request = require('supertest');
const app = require('../src/app');

//nombre del test
describe('User API', () => {
    //Prueba que get devuelva una lista vacia inicialmente
    test('GET /api/users should return an empty list initially', async () => {
        const res = await request(app).get('/api/users');
        // verifica que el status sea 200
        expect(res.statusCode).toBe(200);
        // verifica que el cuerpo de la respuesta sea un arreglo vacío
        expect(res.body).toEqual([]);

        
        
    });
        // Prueba que POST cree un nuevo usuario
    test('POST /api/users should create a new user', async () => {
        const newUser = { name: 'Alex Trejo', email: 'lanchado10@gmail.com' };
        const res = await request(app).post('/api/users').send(newUser);

        // verifica que el status sea 201
        expect(res.statusCode).toBe(201);

        // verifica que el cuerpo de la respuesta contenga el nuevo usuario
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe(newUser.name);

    });


    //Prueba que el endpoint rechaze peticiones invalidas
    test ('POST /api/users should reject fail it data in incomplete', async () => {
        const res = await request(app).post('/api/users').send({name: 'Juan'});

        // verifica que el status sea 400
        expect(res.statusCode).toBe(400);
        // verifica que el cuerpo de la respuesta contenga un mensaje de error
        expect(res.body).toHaveProperty('error', 'Name and email are required');

    });


    
    // Prueba que el endpoint rechace correos duplicados
    test('POST /api/users should reject duplicate emails', async () => {
        const user1 = { name: 'Alex', email: 'test@example.com' };
        await request(app).post('/api/users').send(user1);
        const res = await request(app).post('/api/users').send(user1);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error', 'El correo ya existe');
    });

    // Prueba el manejador 404
    test('GET /api/invalid should return 404', async () => {
        const res = await request(app).get('/api/invalid');
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'Route not found');
    }); 


    // Prueba que el endpoint rechace emails con formato inválido
    test('POST /api/users should reject invalid email format', async () => {
        const res = await request(app).post('/api/users').send({ name: 'Alex', email: 'invalid-email' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error', 'Invalid email format');
    });


});