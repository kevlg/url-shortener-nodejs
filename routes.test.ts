import request from "supertest";
import app from "./src/index";

test('GET /top-urls will fail without token', (done) => {
    request(app)
        .get('/top-urls')
        .then(response => {
            const statusCode = response.statusCode;
            expect(statusCode).toBe(403);
            done();
        });
});

test('GET /top-urls will return some URLs', (done) => {
    request(app)
        .post('/login')
        .set('Accept', 'application/json')
        .send({
            user: "admin",
            password: "1234"
        })
        .then(response => {
            const token = response.body.token;

            request(app)
            .get('/top-urls')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                const statusCode = response.statusCode;
                expect(statusCode).toBe(200);
                done();
            });
        });
});
