/*global describe, it*/
"use strict";

var assert = require("assert");

describe("wjs generator", function () {

  it("can be imported without blowing up", function () {
    assert(typeof(require("../app")) !== "undefined");
  });

});