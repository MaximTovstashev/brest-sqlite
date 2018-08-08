const _db = require('../../index'),
  expect = require('chai').expect;

const TABLE_TEST_PERSON = 'test_person';

it('Should return all records with empty filters', function(done){
  const TestPerson = _db.tbl(TABLE_TEST_PERSON);
  TestPerson.insert({
    name: 'Alice Wonder',
    attitude: 'strange',
    height: 155,
    iq: 110
  })
    .then(person => {
      expect(person).to.be.an('object');
      expect(person).to.have.all.keys(['id', 'name', 'attitude', 'height', 'iq']);
      expect(person.id).to.be.a('number');
      expect(person.name).to.be.equal('Alice Wonder');
      expect(person.attitude).to.be.equal('strange');
      expect(person.height).to.be.equal(155);
      expect(person.iq).to.be.equal(110);
      done();
    })
    .catch(done);
});
