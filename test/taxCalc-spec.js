'use strict';

const Chai = require('chai');
const expect = Chai.expect;

const taxCalc = require('../taxCalc.js');

const taxBracket2017 = [
  [.10, 0, 9325],
  [.15, 9326, 37950],
  [.25, 37951, 91900],
  [.28, 91901, 191650],
  [.33, 191651, 416700],
  [.35, 416701, 418400],
  [.396, 418401, 1000000000000],
];

// Normalizes bracket for usage in this program.
// Minus 1 from all minimum threshholds greater than 0.
// Convert dollars into cents by multiplying all threshholds by 100.
const normalizedTaxBracket2017 = [
  [.10, 0, 932500],
  [.15, 932500, 3795000],
  [.25, 3795000, 9190000],
  [.28, 9190000, 19165000],
  [.33, 19165000, 41670000],
  [.35, 41670000, 41840000],
  [.396, 41840000, 1000000000000],
];

describe('#Calculate effective tax rate', function() {
  it('taxCalc.js file should exist', function() {
      expect(taxCalc).to.not.be.undefined;
  });

  it('should calculate effective tax rate', function() {
      let taxAmount;
/*
      // Check tax on $19,000. Should be $2,383.75
      //taxAmount = taxCalc.calculateTax(taxRates2017, 19000);
      expect(taxCalc.calculateTax(taxRates2017, 19000)).to.equal(2383.75);

      // Check tax on $80,000. Should be $15,738.75
      //taxAmount = taxCalc.calculateTax(taxRates2017, 80000);
      expect(taxCalc.calculateTax(taxRates2017, 80000)).to.equal(15738.75);

*/
  });
});

describe('#Which tax bracket', function() {
  // Function should exist
  it('whichBracket function should exist', function() {
    expect(taxCalc.whichBracket).to.not.be.undefined;
  });

  // Check tax bracket for $80,000. Should be 2.
  it('should return the tax bracket based on income ($80,000)', function() {
    expect(taxCalc.whichBracket(normalizedTaxBracket2017, 8000000)).to.equal(2);
  });

  // Check tax bracket for $19,000. Should be 1.
  it('should return the tax bracket based on income ($19,000)', function() {
    expect(taxCalc.whichBracket(normalizedTaxBracket2017, 1900000)).to.equal(1);
  });

  // Check tax bracket for $191,651. Should be 4.
  it('should return the tax bracket based on income ($191,651)', function() {
    expect(taxCalc.whichBracket(normalizedTaxBracket2017, 19165100)).to.equal(4);
  });
});

describe('#Calculate single tax bracket', function() {
  it('calculateSingleBracket function should exist', function() {
    expect(taxCalc.calculateSingleBracket).to.not.be.undefined;
  });

  it('should retun tax owed for bracket ($91,900.00)', function() {
    expect( taxCalc.calculateSingleBracket([.25, 3795000, 9190000],
      9190000)).to.be.equal(1348750);
  });

  it('should retun tax owed for bracket ($115,000.00)', function() {
    expect( taxCalc.calculateSingleBracket([.28, 9190000, 19165000],
      11500000)).to.be.equal(646800);
  });

  it('should retun tax owed for bracket ($107,000.00)', function() {
    expect( taxCalc.calculateSingleBracket([.28, 9190000, 19165000],
      10700000)).to.be.equal(422800);
  });

  it('should retun tax owed for bracket ($106,187.61)', function() {
    expect( taxCalc.calculateSingleBracket([.28, 9190000, 19165000],
      10618761)).to.be.equal(400053);
  });
});