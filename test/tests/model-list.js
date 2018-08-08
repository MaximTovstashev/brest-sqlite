const _db = require('../../index'),
  expect = require('chai').expect;

const TABLE_TEST_PERSON = 'test_person';

it('Should return all records with empty filters', function(done){
  const TestPerson = _db.tbl(TABLE_TEST_PERSON);
  TestPerson.list()
    .then(persons => {
        expect(persons).to.have.lengthOf(5);
        expect(persons[0]).to.be.an('object');
        expect(persons[0]).to.have.all.keys(['id', 'name', 'attitude', 'height', 'iq']);
        expect(persons[0].id).to.be.equal(1);
        expect(persons[0].name).to.be.equal('John Doe');
        expect(persons[0].attitude).to.be.equal('bad');
        expect(persons[0].height).to.be.equal(180);
        expect(persons[0].iq).to.be.equal(90);
        done();
    })
    .catch(done);
});
