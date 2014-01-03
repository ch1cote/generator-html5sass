'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var Html5sassGenerator = module.exports = function Html5sassGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.bowerInstall([ 'git@github.com:inlikealion/Sass-File-Structure.git'], { save: true });
    this.installDependencies({ 
      skipInstall: options['skip-install'],
      callback: function(){
        // Emit a new event - dependencies installed //http://stackoverflow.com/questions/18841273/how-to-run-a-grunt-task-after-my-yeoman-generator-finishes-installing
          this.emit('dependenciesInstalled');
      }.bind(this)

       });
  });

  //No you can bind to the dependencies installed event
  this.on('dependenciesInstalled', function(){
    this.spawnCommand('grunt', ['setup']);
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Html5sassGenerator, yeoman.generators.Base);

Html5sassGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'confirm',
    name: 'someOption',
    message: 'Would you like to enable this option?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    cb();
  }.bind(this));
};

Html5sassGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('_bower.json', 'bower.json');
};

Html5sassGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
