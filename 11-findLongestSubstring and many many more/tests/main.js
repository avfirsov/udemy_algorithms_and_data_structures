const findLongestSubstring = str => {
  if (!str) return 0;
  let result = 0;
  let left = 0;
  let right = 0;
  const freq = {};
  const len = str.length;

  for (; right < len; right++) {
    const c = str[right];

    if (typeof freq[c] !== 'undefined') {
      while (left < freq[c] + 1) {
        delete freq[str[left++]];
      }
    }

    freq[c] = right;
    const tmpLen = right - left + 1;
    if (tmpLen > result) result = tmpLen;
  }

  return result;
}

// const findLongestSubstring = str => {
//   if (!str) return 0;
//   let result = 0;
//   let left = 0;
//   let right = 1;
//   const freq = {[str[0]]: 0};
//   const len = str.length;

//   for (; right < len + 1; right++) {
//     const c = str[right];
//     const tmpLen = right - left;
//     if (tmpLen > result) result = tmpLen;

//     if (typeof freq[c] === 'undefined') {
//       freq[c] = right;
//     } else {
//       while (left < freq[c] + 1) {
//         delete freq[str[left++]];
//       }
//       freq[c] = right;
//     }
//   }

//   return result;
// }


var assert = chai.assert;


describe('isSubsequence - multiple pointers', function() {
  it("findLongestSubstring(''), should return 0", function() {
    assert.equal(findLongestSubstring(''), 0);
  });

  it("findLongestSubstring('rithmschool'), should return 7", function() {
    assert.equal(findLongestSubstring('rithmschool'), 7);
  });

  it("findLongestSubstring('thisisawesome'), should return 6", function() {
    assert.equal(findLongestSubstring('thisisawesome'), 6);
  });

  it("findLongestSubstring('thecatinthehat'), should return 7", function() {
    assert.equal(findLongestSubstring('thecatinthehat'), 7);
  });

  it("findLongestSubstring('bbbbbb'), should return 1", function() {
    assert.equal(findLongestSubstring('bbbbbb'), 1);
  });

  it("findLongestSubstring('longestsubstring'), should return 8", function() {
    assert.equal(findLongestSubstring('longestsubstring'), 8);
  });

  it("findLongestSubstring('thisishowwedoit'), should return 6", function() {
    assert.equal(findLongestSubstring('thisishowwedoit'), 6);
  });
});

