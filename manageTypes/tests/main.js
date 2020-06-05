const manageTypes = (input, inputMustBe, outputMustBe) => {
  if (inputMustBe.constructor === Object) {
    const handler = inputMustBe[input.constructor.name] || inputMustBe[input.constructor];

    if (typeof handler === 'undefined') {
      const altHandler = inputMustBe['default'];
      if (altHandler) {
        return altHandler(input);
      }

      throw new Error(`not supported type of ${input.constructor}`);
    }

    if (typeof outputMustBe === 'undefined') {
      return handler(input);
    } else {
      return manageTypes(handler(input), [outputMustBe].flat());
    }
  } else if (!Array.isArray(inputMustBe)) {
    return manageTypes(input, [inputMustBe], outputMustBe);
  } else {
    const compileDefaultObj = opt => ({
      ...(typeof opt === 'object' && opt),
      ...(opt !== Function && { [opt]: x => x }),
      ...(opt === Function && { [opt]: x => x() })
    });

    return manageTypes(
      input,
      inputMustBe.reduce((a, c) => Object.assign(a, compileDefaultObj(c)), {}),
      outputMustBe
    );
  }
};



const getClassNameByExpr = expr =>
  manageTypes(
    expr,
    {
      String: str => str,
      Array: arr => arr.reduce((r, c) => r.concat(getClassNameByExpr(c), ' '), '').trim(),
      Object: o => Object.keys(o).reduce((r, c) => (o[c] ? r.concat(c, ' ') : r), '').trim()
    },
    String
  );



var assert = chai.assert;

describe('getClassNameByExpr', function() {
  it('getClassNameByExpr(42) should throw Error', function() {
    assert.throws(() => getClassNameByExpr(42));
  });

  it('getClassNameByExpr("classNameByString") should be "classNameByString"', function() {
    assert.equal(getClassNameByExpr('classNameByString'), 'classNameByString');
  });

  it('getClassNameByExpr() should work for Array notation', function() {
    assert.equal(
      getClassNameByExpr(['classNameByString1', 'classNameByString2', 'classNameByString3']),
      'classNameByString1 classNameByString2 classNameByString3'
    );
  });


  it('getClassNameByExpr() should work for Object notation', function() {
    assert.equal(
      getClassNameByExpr(
        {
          'classNameByString1': 1 < 2,
          'classNameByString2': true, 
          'classNameByString3NeverShown': 10 < -10,
        }
      ),
      'classNameByString1 classNameByString2'
    );
  });

  it('getClassNameByExpr() should work for Objects nested in Arrays', function() {
    assert.equal(
      getClassNameByExpr(
        [
          'classNameByString1',
          {
            'classNameByString2': true, 
          },
          {
            'classNameByString3NeverShown': 10 < -10
          }
        ]
      ),
      'classNameByString1 classNameByString2'
    );
  });
});
