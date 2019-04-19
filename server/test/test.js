
/**
 * @description:fs is use to get the data from json data..
 */
var file = require('fs');
/**
 * @description:chai is one of library use to mocha test
 */
var chai = require('chai');
/**
 * @description:it is use to handle our http port 
 */
var chaiHttp = require('chai-http');
/**
 * @description:it is middleware use handle the http request
 */
chai.use(chaiHttp);
/**
 * @description:getting the express server to test the api 
 */
var server = require('../server')
//var expect = chai.expect;
/**
 * @description:it is interface is present in assertion.... use to get the status 200 or 500 
 */
const should = chai.should();

describe('Status and content', () => {
    /**
     * @description:for registration test...
     */
    describe('register page', () => {
        var readdata = readfile();
        //  console.log("register data from json==>", readdata);
        it('status', (done) => {
            chai.request(server).post('/Register')
                .send(readdata.registerdata)
                .end((err, res) => {
                    if (err) {
                        console.log("err in testing==>", err);
                    }
                    else {
                        console.log("register responce in testing==>", res.body);
                        res.should.have.status(200);
                        /**
                         * @description:login test...
                         */
                        describe('Login page', () => {

                            it('status', (done) => {
                                chai.request(server).post('/Login')
                                    .send(readdata.logindata)
                                    .end((err, res) => {
                                        if (err) {
                                            console.log("error in ending");
                                        }
                                        else {
                                            console.log("responce in test", res.body);
                                            res.should.have.status(200);
                                            /**
                                             * @description:to test the forget password api
                                             */
                                            describe('forget password', () => {
                                                it('staus', (done) => {
                                                    chai.request(server).post('/forgetpassword').send(readdata.forgetpassword)
                                                        .end((err, res) => {
                                                            if (err) {
                                                                console.log("err in ending in forget password");
                                                            }
                                                            else {
                                                                console.log("responce in forget password  test ", true);
                                                                res.should.have.status(200);
                                                                /**
                                                                 * @description:to test the resetpassword api
                                                                 */
                                                                describe('resetpassword', () => {
                                                                    //   console.log("reset password===>", readdata.resetpassword);
                                                                    it('status', (done) => {
                                                                        chai.request(server).post('/reset/:token').send(readdata.resetpassword)
                                                                            .end((err, res) => {
                                                                                if (err) {

                                                                                    console.log("err in reset password==>", err);
                                                                                }
                                                                                else {
                                                                                    console.log("responce in test for reset password==>", res.body);
                                                                                    res.should.have.status(200);


                                                                                    describe('Create note api', () => {
                                                                                        //   console.log("reset password===>", readdata.resetpassword);
                                                                                        it('status', (done) => {
                                                                                            chai.request(server).post('/CreateNote').send(readdata.createnote)
                                                                                                .end((err, res) => {
                                                                                                    if (err) {

                                                                                                        console.log("err in create note==>", err);
                                                                                                    }
                                                                                                    else {
                                                                                                        console.log("responce in test for create note==>", res.body);
                                                                                                        res.should.have.status(200);
                                                                                                        describe('get note api', () => {
                                                                                                            // console.log("reset password===>", readdata.resetpassword);
                                                                                                            it('status', (done) => {
                                                                                                                chai.request(server).get('/getnotes').send(readdata.getdata)
                                                                                                                    .end((err, res) => {
                                                                                                                        if (err) {

                                                                                                                            console.log("err in get note==>", err);
                                                                                                                        }
                                                                                                                        else {
                                                                                                                            console.log("responce in test for getnote==>", res.body);
                                                                                                                            res.should.have.status(200);
                                                                                                                            describe('update color note api', () => {
                                                                                                                                // console.log("reset password===>", readdata.resetpassword);
                                                                                                                                it('status', (done) => {
                                                                                                                                    chai.request(server).put('/updateColor').send(readdata.getdata)
                                                                                                                                        .end((err, res) => {
                                                                                                                                            if (err) {
                                    
                                                                                                                                                console.log("err in get note==>", err);
                                                                                                                                            }
                                                                                                                                            else {
                                                                                                                                                console.log("responce in test for getnote==>",res.body);
                                                                                                                                                res.should.have.status(200);
                                                                                                                                                describe('delete note api', () => {
                                                                                                                                                    // console.log("reset password===>", readdata.resetpassword);
                                                                                                                                                    it('status', (done) => {
                                                                                                                                                        chai.request(server).delete('/deleteNote').send(readdata.getdata)
                                                                                                                                                            .end((err, res) => {
                                                                                                                                                                if (err) {
                                                        
                                                                                                                                                                    console.log("err in get note==>", err);
                                                                                                                                                                }
                                                                                                                                                                else {
                                                                                                                                                                    console.log("responce in test for getnote==>",res.body);
                                                                                                                                                                    res.should.have.status(200);
                                                                                                                                      
                                                    
                                                                                                                                                                }
                                                                                                                                                                done();
                                                                                                                                                            })
                                                                                                                                                    })
                                                                                                                                                })
                                
                                                                                                                                            }
                                                                                                                                            done();
                                                                                                                                        })
                                                                                                                                })
                                                                                                                            })

                                                                                                                        }
                                                                                                                        done();
                                                                                                                    })
                                                                                                            })
                                                                                                        })


                                                                                                    }
                                                                                                    done();
                                                                                                })
                                                                                        })
                                                                                    })


                                                                                }
                                                                                done();
                                                                            })
                                                                    })
                                                                })
                                                            }
                                                            done();
                                                        })
                                                })
                                            })
                                        }
                                        done();
                                    })
                            })
                        })
                    }
                    done();
                })
        })
    })
})

function readfile() {
    var data2 = file.readFileSync('/home/admin1/Documents/fundoo/server/test/userdata.json');
    var readdata = JSON.parse(data2);
    return readdata;
    // console.log(convertdata);
}