process.env.NODE_ENV = 'test';

// let mongoose = require("mongoose");
const JWTHandler = require("../core/jwt");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index').server;
let should = chai.should();


chai.use(chaiHttp);

describe('customers', () => {
    describe('/POST/login customer', () => {
        var token;
        it('it should GET return valid token on login', (done) => {
            let body = {
                username: "user",
                password: "password"
            }
            chai.request(server)
                .post('/login')
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('token');
                    token = res.body.token;
                    done();
                });
        });
        it('token should be valid', (done) => {
            const verificationResult = JWTHandler.verifyAccessToken(
                token
            );
            console.log(`error: ${verificationResult.error}`);
            chai.assert.isUndefined(verificationResult.error);
            chai.assert.isTrue(verificationResult.valid);
            done();
        });
    });
});