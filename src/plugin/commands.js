/**
 * @file hiproxy sub-commands
 * @author zdying
 */
'use strict';

var utils = require('../utils');
var noahData = global.hiproxy.dataProvider.getData('noah');

module.exports = [
  {
    command: 'noah',
    describe: 'Start a proxy server and use Noah environment by an `envid`',
    usage: 'hiproxy noah <envid>',
    fn: startServer,
    options: {
      'port <port>': {
        alias: 'p',
        validate: /^\d+$/,
        describe: 'HTTP proxy port, default: 5525'
      },
      // 'daemon': {
      //   alias: 'D',
      //   describe: 'Run hiproxy in background'
      // },
      'https': {
        alias: 's',
        describe: 'Enable HTTPS proxy'
      },
      'middle-man-port <port>': {
        alias: 'm',
        describe: 'The HTTPS proxy port, default: 10010'
      },
      'open [browser]': {
        alias: 'o',
        describe: 'Open a browser window and use hiproxy proxy'
      },
      'pac-proxy': {
        describe: 'Use ' + 'Proxy auto-configuration (PAC)'.underline
      },
      'sys-proxy <path>': {
        describe: 'Your own proxy server path, format: <ip>[:port], only works when use PAC'
      }
    }
  }
];

/**
 * 启动代理服务并使用Noah的hosts
 *
 * @returns
 */
function startServer () {
  var cliArgs = this;
  var envid = cliArgs._ && cliArgs._[1];

  noahData.set('envid', envid);

  if (!envid) {
    console.log();
    console.log('Error: You should give me an `envid`, for example: `hiproxy noah 12345`');
    console.log();
    return;
  }

  utils.getHosts(envid)
    .then(function (data) {
      var hosts = data.content.join('\n');
      var hiproxy = global.hiproxy;
      var commands = hiproxy.commands;

      // 禁止自动查找hosts
      cliArgs.autoFindConf = false;

      // 启动服务（复用hiproxy的`start` command）
      commands.start.fn.call(cliArgs).then(function (servers) {
        utils.updateHosts(hosts, envid);
      });
    })
    .catch(function (msg) {
      console.log();
      console.log('[Error]: ' + msg);
      console.log();
    });
}
