var assert = require('chai').assert;
var app = require('../app');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);
//var token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYTkzMzZjOTFlN2QwNGVjODdiZWU1ZCIsInR5cGVfb2ZfdXNlciI6InVzZXIiLCJpYXQiOjE1NzI3OTYyNDUsImV4cCI6MTU3MzM5NjI0NX0.oFDdgze07Cvfqgrb1-PmolE0Ae_boaDqcygp_ui3iWY";

describe('Grub Hub App', function(){

    it('POST /users/login',function(){
        
            //agent.set("Authorization", "Bearer " + token)
            //return agent.get('/restroOrders/myCurrentOrders')
            return agent.post('/users/login')
            .then(function(res){ console.log("Total recordes",res.body);
                expect(res.body.searchResult.length).to.equal(3);
            });
    });
})