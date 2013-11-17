"use strict";

var util = require("util"),
    path = require("path"),

    yeoman = require("yeoman-generator"),

    WjsGenerator;

WjsGenerator = module.exports = function WjsGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on("end", function () {
    this.installDependencies({
      skipInstall: options["skip-install"]
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, "../package.json")));
};

util.inherits(WjsGenerator, yeoman.generators.Base);

WjsGenerator.prototype.askFor = function () {
  var callback = this.async();

  console.log(this.yeoman);

  var prompts = [{
    name: "name",
    message: "What do you want to call your application?",

    default: "test-wjs-application"
  }];

  this.prompt(prompts, function (props) {
    this.name = props.name;

    callback();
  }.bind(this));
};

WjsGenerator.prototype.app = function app() {

};

WjsGenerator.prototype.projectfiles = function projectfiles() {
  this.copy("License - MIT.md", "License - MIT.md");

  this.copy(".jshintrc", ".jshintrc");
  this.copy(".gitignore", ".gitignore");

  this.template("_README.md", "README.md");
};