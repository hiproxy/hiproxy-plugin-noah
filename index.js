/**
 * @file hiproxy plugin test
 * @author zdying
 */

'use strict';

var commands = require('./src/commands');
var directives = require('./src/directives');
var routes = require('./src/routes');

module.exports = {
  // CLI commands
  commands: commands,

  // Rewrite config redirectives
  directives: directives,

  // HTTP server routes
  routes: routes
};
