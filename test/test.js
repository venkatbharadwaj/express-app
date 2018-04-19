var should = require('should');
var request = require('request');
var expect = require('chai').expect;

var baseURL = 'http://localhost:3000';

describe('test register route', ()=> {
    it('should register and return success', ()=> {
        var body = {
            "username": "username21r3",
            "firstname": "firstname5",
            "lastname": "lastname5",
            "email": "email5",
            "password": "password33"
            };
        request({url: baseURL+'/users/register', method: 'post', body, json: true}, (err, res, body) => {
            expect(res.status).to.equal(200);
            expect(body).to.be.an('object');
            expect(err).to.be.null;
        })
    });

})

describe('test login route', ()=> {
    it('should login', ()=> {
        var body = {
            "username": "username21r3",
            "password": "password33"
            };
        request({url: baseURL+'/users/login', method: 'post', body, json: true}, (err, res, body) => {
            console.log(body);
            expect(body).to.be.an('object');
            expect(body).to.have.own.property('token');
            expect(body).to.have.own.property('user');
            expect(body).to.have.nested.property('username');
            expect(body).to.have.nested.property('password');
            expect(err).to.be.null;

        })
    });
    
})