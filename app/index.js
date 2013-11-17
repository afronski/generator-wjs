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

  var prompts = [
    {
      name: "name",
      message: "What do you want to call your project?",

      default: "html5-canvas-playground"
    },
    {
      name: "description",
      message: "Description:",

      default: ""
    },
  ];

  this.prompt(prompts, function (properties) {
    this.name = properties.name;
    this.description = properties.description;

    this.year = (new Date()).getFullYear().toString();

    callback();
  }.bind(this));
};

WjsGenerator.prototype.app = function app() {
  this.mkdir("css");
  this.mkdir("js");

  this.copy("css/main.css", "css/main.css");
  this.copy("js/main.js", "js/main.js");

  this.template("_index.html", "index.html");
  this.template("_package.json", "package.json");
};

WjsGenerator.prototype.projectfiles = function projectfiles() {
  this.copy("License - MIT.md", "License - MIT.md");

  this.copy(".jshintrc", ".jshintrc");
  this.copy(".gitignore", ".gitignore");

  this.template("_README.md", "README.md");
};