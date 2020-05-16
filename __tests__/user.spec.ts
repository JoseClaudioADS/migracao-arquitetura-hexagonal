import { Connection, getRepository, getConnection } from 'typeorm';
import request from 'supertest';
import bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';
import app from '../src/app';
import User from '../src/domain/users/user';
import Token, { TokenType } from '../src/domain/tokens/token';

import createConnection from '../src/database';

let connection: Connection;

describe('User', () => {
    beforeAll(async () => {
        connection = await createConnection('test-connection');
        await connection.runMigrations();
    });

    beforeEach(async () => {
        await connection.query('DELETE FROM tokens');
        await connection.query('DELETE FROM users');
    });

    afterAll(async () => {
        const mainConnection = getConnection();

        await connection.close();
        await mainConnection.close();
    });

    it('should be able to create a new user', async () => {
        const usersRepository = getRepository(User);
        const tokensRepository = getRepository(Token);

        const response = await request(app).post('/users').send({
            name: 'Jose',
            email: 'email@email.com',
            password: '123123',
            phoneNumber: '818181818181',
        });

        expect(response.status).toBe(201);

        expect(response.body.password).toBeFalsy();

        const user = await usersRepository.findOne({
            where: { email: 'email@email.com' },
        });

        expect(user).toBeTruthy();
        expect(user).toMatchObject({
            name: 'Jose',
            email: 'email@email.com',
            phoneNumber: '818181818181',
            activated_at: null,
        });
        expect(await bcrypt.compare('123123', user.password)).toBeTruthy();

        const token = await tokensRepository.findOne({
            where: { user },
        });

        expect(token).toBeTruthy();
        expect(token).toMatchObject({
            type: TokenType.EMAIL_CONFIRMATION,
        });
        expect(token.expires_at.getHours()).toBe(new Date().getHours() + 1);
    });

    it('should not be able to create a new user with email already used', async () => {
        await request(app).post('/users').send({
            name: 'Jose',
            email: 'email@email.com',
            password: '123123',
            phoneNumber: '818181818181',
        });

        const response = await request(app).post('/users').send({
            name: 'Jose',
            email: 'email@email.com',
            password: '123123',
            phoneNumber: '818181818181',
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
            'Email já está sendo utilizado por outra conta',
        );
    });

    it('should not be able to create a new user with wrong fields', async () => {
        let response = await request(app).post('/users').send({});

        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                'name is a required field',
                'email is a required field',
                'phoneNumber is a required field',
                'password is a required field',
            ]),
        );

        response = await request(app).post('/users').send({
            email: 'email',
        });

        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                'name is a required field',
                'email must be a valid email',
                'phoneNumber is a required field',
                'password is a required field',
            ]),
        );
    });

    it('should be able to confirm user by email token', async () => {
        const tokensRepository = getRepository(Token);
        const usersRepository = getRepository(User);

        let response = await request(app).post('/users').send({
            name: 'Jose',
            email: 'email@email.com',
            password: '123123',
            phoneNumber: '818181818181',
        });

        const token = await tokensRepository.findOne({
            user_id: response.body.id,
            type: TokenType.EMAIL_CONFIRMATION,
        });

        expect(token).toBeTruthy();

        response = await request(app).get(`/users/email-confirmation`).query({
            token: token.id,
        });

        expect(response.status).toBe(204);

        const user = await usersRepository.findOne({
            where: { email: 'email@email.com' },
        });

        expect(user.activated_at).toBeTruthy();
        expect(user.activated_at).toBeInstanceOf(Date);

        const tokenCount = await tokensRepository.count({ id: token.id });

        expect(tokenCount).toBe(0);
    });

    it('should not be able to confirm user by a not found email token', async () => {
        let response = await request(app).post('/users').send({
            name: 'Jose',
            email: 'email@email.com',
            password: '123123',
            phoneNumber: '818181818181',
        });

        response = await request(app).get(`/users/email-confirmation`).query({
            token: uuid(),
        });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Token não encontrado');
    });

    it('should not be able to confirm user without token', async () => {
        let response = await request(app).post('/users').send({
            name: 'Jose',
            email: 'email@email.com',
            password: '123123',
            phoneNumber: '818181818181',
        });

        response = await request(app).get(`/users/email-confirmation`);

        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual(
            expect.arrayContaining(['token is a required field']),
        );
    });

    it('should not be able to confirm user with expired token', async () => {
        const tokensRepository = getRepository(Token);
        let response = await request(app).post('/users').send({
            name: 'Jose',
            email: 'email@email.com',
            password: '123123',
            phoneNumber: '818181818181',
        });

        await connection.query("UPDATE tokens set expires_at = '2020-04-30'");

        const token = await tokensRepository.findOne({
            where: { user_id: response.body.id },
        });

        response = await request(app).get(`/users/email-confirmation`).query({
            token: token.id,
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Token expirado');
    });
});
