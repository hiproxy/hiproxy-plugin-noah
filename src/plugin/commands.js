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
    describe: '启动一个代理服务，并使用<envid>对应的Noah环境的hosts',
    usage: 'hiproxy noah <envid>',
    fn: startServer,
    options: {
      'port <port>': {
        alias: 'p',
        validate: /^\d+$/,
        describe: 'HTTP代理服务端口号，默认：5525'
      },
      // 'daemon': {
      //   alias: 'D',
      //   describe: 'Run hiproxy in background'
      // },
      'https': {
        alias: 's',
        describe: '启用HTTPS请求代理'
      },
      'middle-man-port <port>': {
        alias: 'm',
        describe: 'HTTPS代理服务端口号，默认: 10010'
      },
      'open [browser]': {
        alias: 'o',
        describe: '打开浏览器窗口，并且配置好代理（hiproxy代理）'
      },
      'pac-proxy': {
        describe: '使用' + 'Proxy auto-configuration (PAC)'.underline + '代理'
      },
      'sys-proxy <path>': {
        describe: '系统代理，没有走hiproxy代理的请求会走这个代理，格式: <ip>[:port]，' + '只在使用PAC代理时生效'.underline
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
      var hosts = data.content;
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
