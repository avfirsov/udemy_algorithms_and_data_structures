const power = (base, pow) => {
  if (pow === 1) return base;
  return base * power(base, pow - 1);
}

// var assert = chai.assert;


// describe('isSubsequence - multiple pointers', function() {
//   it("findLongestSubstring(''), should return 0", function() {
//     assert.equal(findLongestSubstring(''), 0);
//   });

//   it("findLongestSubstring('rithmschool'), should return 7", function() {
//     assert.equal(findLongestSubstring('rithmschool'), 7);
//   });

//   it("findLongestSubstring('thisisawesome'), should return 6", function() {
//     assert.equal(findLongestSubstring('thisisawesome'), 6);
//   });

//   it("findLongestSubstring('thecatinthehat'), should return 7", function() {
//     assert.equal(findLongestSubstring('thecatinthehat'), 7);
//   });

//   it("findLongestSubstring('bbbbbb'), should return 1", function() {
//     assert.equal(findLongestSubstring('bbbbbb'), 1);
//   });

//   it("findLongestSubstring('longestsubstring'), should return 8", function() {
//     assert.equal(findLongestSubstring('longestsubstring'), 8);
//   });

//   it("findLongestSubstring('thisishowwedoit'), should return 6", function() {
//     assert.equal(findLongestSubstring('thisishowwedoit'), 6);
//   });
// });

