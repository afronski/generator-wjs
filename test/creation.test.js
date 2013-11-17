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

      "css/main.css",
      "js/main.js",

      "index.html",

      "License - MIT.md",
      "README.md",

      "package.json"
    ];

    helpers.mockPrompt(this.app, { "name": "name-doesnt-matter" });

    this.app.options["skip-install"] = true;

    this.app.run({}, function () {
      helpers.assertFiles(expected);

      done();
    });
  });

  it("fills properly README file", function (done) {
    var expectedName = "filling-README",
        expectedDescription = "Filling description inside readme file.";

    helpers.mockPrompt(this.app, {
      "name": expectedName,
      "description": expectedDescription
    });

    this.app.options["skip-install"] = true;

    this.app.run({}, function () {
      helpers.assertFile("README.md", new RegExp(expectedName, "i"));
      helpers.assertFile("README.md", new RegExp(expectedDescription, "i"));

      done();
    });
  });

  it("fills properly package.json file", function (done) {
    var expectedName = "filling-package-json",
        expectedDescription = "Filling description inside package.json file.";

    helpers.mockPrompt(this.app, {
      "name": expectedName,
      "description": expectedDescription
    });

    this.app.options["skip-install"] = true;

    this.app.run({}, function () {
      helpers.assertFile("package.json", new RegExp(expectedName, "i"));
      helpers.assertFile("package.json", new RegExp(expectedDescription, "i"));

      done();
    });
  });

  it("fills properly HTML file", function (done) {
    var expectedName = "HtmlProjectName",
        expectedDescription = "Sample Description",
        expectedYear = (new Date()).getFullYear().toString();

    helpers.mockPrompt(this.app, {
      "name": expectedName,
      "description": expectedDescription,
      "year": expectedYear
    });

    this.app.options["skip-install"] = true;

    this.app.run({}, function () {
      helpers.assertFile("index.html", new RegExp(expectedName, "i"));
      helpers.assertFile("index.html", new RegExp(expectedDescription, "i"));
      helpers.assertFile("index.html", new RegExp(expectedYear, "i"));

      done();
    });
  });

});