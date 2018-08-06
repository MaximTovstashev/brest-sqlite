const   async = require('async'),
        expect = require('chai').expect,
        fs = require('fs');

const brest = require('./mock/brest');
const _db = require('../index');

const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./test.sqlite');

// pool.connect()

function load(name, path) {
    describe(name, function () {
        require(path);
    });
}

describe('Brest-SQLite', function(){

    before(function(done){

            async.waterfall([
                (next) => {
                    const sql = fs.readFileSync('./test/data/test-person.sql', 'utf8');
                    db.exec(sql, next);
                    console.log('init db');
                },
                (next) => {
                    db.close(next);
                    console.log('close db');
                },
                (next) => {
                    console.log('before init');
                    _db.before_static_init(brest, next);
                  console.log('after init');
                }
            ],(err)=>{
                if (err) {
                  console.error('Init error', err);
                  return done(err);
                }
                done();
            });


    });

    it('Should initialize itself correctly', function (done) {
            expect(brest.db).to.be.not.null;
            expect(brest.db.tables).to.be.not.null;
            expect(brest.db.controllers).to.be.not.null;
            done();
    });

    load('Model', './tests/model-generic.js');
    load('Model:Row', './tests/model-row.js');

});
