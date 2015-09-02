var Jobs = require("../jobs.js");
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;

var strarr = ["one", "two", "three", "five hundred"];
var strarr2 = ["this", "is", "a", "terrible", "test"];
var colsz = [15,17,17,17];

describe("Display functions", function() {

  describe("maxLength(strings)", function() {

    it('return the maximum length of an array of strings', function() {
      expect(Jobs.maxLength(strarr)).to.equal(12);
    });

  });

  describe("sizeColumns(rowNames, colNames)", function() {

    it('should return an array with the sizes of columns', function() {
      expect(Jobs.sizeColumns(strarr, strarr2)).to.deep.equal([12, 8, 8, 8, 8, 8]);
    });

  });

  describe("writeRow(colSizes, strings)", function() {
    var strarr = ["one", "two", "three", "five hundred"];
    var strarr2 = ["this", "is", "a", "terrible", "test"];
    var colsz = [15,17,17,17];

    it('should return a string including the old strings', function() {
      console.log(Jobs.writeRow(colsz, strarr));
      expect(Jobs.writeRow(colsz, strarr)).to.have.string("one");
    });

    it('...with a length equal to the total of the colSizes', function() {
      expect(Jobs.writeRow(colsz, strarr)).to.have.length(66);
    });

    it('should return a string with spaces specified in colSizes', function() {
      expect(Jobs.writeRow(colsz, strarr)).to.equal("one            two              three            five hundred     ");
    });

  });

  describe("writeJobsTable(people, jobs)", function() {

//TODO
    // it('should return a string with spaces specified in colSizes', function() {
    //   expect(Jobs.writeJobsTable(colsz, strarr)).to.equal("one      two three five hundred   ");
    // });

  });

});
