const getFrequency = str => [].reduce.call(str, (r, c) => Object.assign(r, {[c]: ++r[c] || 1}), {});

const objectsAreEqual = (o1, o2) => Object.keys(o1).length === Object.keys(o2).length 
  && Object.keys(o1).every(key => o1[key] === o2[key]);

const sameFrequency = (a, b) => objectsAreEqual(
    getFrequency(a.toString()),
    getFrequency(b.toString())
);


var assert = chai.assert;


describe('sameFreq', function() {
  it('should work for 123 and 321', function() {
    assert.equal(sameFrequency(123, 321), true);
  });
});