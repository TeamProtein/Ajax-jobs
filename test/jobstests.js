var Jobs = require("../jobs.js");
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;

var strarr = ["one", "two", "three", "five hundred"];
var strarr2 = ["this", "is", "a", "terrible", "test"];
var colsz = [9,4,6,15];

describe("Display functions", function() {

  describe("maxLength(strings)", function() {

    it('return the maximum length of an array of strings', function() {
      expect(maxLength(strarr)).to.equal(12);
    });

  });

  describe("sizeColumns(rowNames, colNames)", function() {

    it('should return an array with the sizes of columns', function() {
      expect(sizeColumns(strarr, strarr2)).to.deep.equal([12, 8, 8, 8, 8, 8]);
    });

  });

  describe("writeRow(colSizes, strings)", function() {

    it('should return a string with spaces specified in colSizes', function() {
      expect(writeRow(colsz, strarr)).to.equal("one      two three five hundred   ");
    });

  });

});
