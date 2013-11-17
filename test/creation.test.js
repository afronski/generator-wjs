/*global describe, beforeEach, it*/
"use strict";

var path = require("path"),
    helpers = require("yeoman-generator").test;

describe("wjs generator", function () {

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, "temp"), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator("wjs:app", [ "../../app" ]);

      done();
    }.bind(this));
  });

  it("creates expected files", function (done) {
    var expected = [
      ".gitignore",
      ".jshintrc",

      "README.md"
    ];

    helpers.mockPrompt(this.app, { "name": "name-doesnt-matter" });

    this.app.options["skip-install"] = true;

    this.app.run({}, function () {
      helpers.assertFiles(expected);

      done();
    });
  });

  it("fills properly README file", function (done) {
    var expected = "filling-README";

    helpers.mockPrompt(this.app, { "name": expected });

    this.app.options["skip-install"] = true;

    this.app.run({}, function () {
      helpers.assertFile("README.md", new RegExp(expected, "i"));

      done();
    });
  });

});