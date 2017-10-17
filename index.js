/**
 * @file hiproxy plugin test
 * @author zdying
 */

'use strict';

var commands = require('./src/plugin/commands');
var directives = require('./src/plugin/directives');
var routes = require('./src/plugin/routes');

module.exports = {
  // CLI commands
  commands: commands,

  // Rewrite config redirectives
  directives: directives,

  // HTTP server routes
  routes: routes
};
