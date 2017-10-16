/**
 * @file hiproxy sub-commands
 * @author zdying
 */
'use strict';

module.exports = [
  {
    command: 'noah',
    describe: 'Start a proxy server and use Noah environment by an `envid`',
    usage: 'hiproxy noah <envid>',
    fn: function () {
      var cliArgs = this;
      var envid = cliArgs._ && cliArgs._[1];

      if (!envid) {
        console.log('Error: You should give me an `envid`, for example: `hiproxy noah 12345`');
        return;
      }

      getHosts(envid)
      .then(function (data) {
        var hosts = data.content.join('\n');
        var hiproxy = global.hiproxy;
        var commands = hiproxy.commands;

        // 禁止自动查找hosts
        cliArgs.autoFindConf = false;

        commands.start.fn.call(cliArgs).then(function (servers) {
          global.hiproxyServer.addRule('hosts', hosts);
        });
      })
      .catch(function (msg) {
        console.log('Get hosts failed:', msg);
      });
    },
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
 * 根据envid获取hosts
 *
 * @param {any} envid Noah环境编号
 * @returns Promise
 */
function getHosts (envid) {
  return new Promise(function (resolve, reject) {
    var http = require('http');
    var url = 'http://qa.corp.qunar.com/qodin/api/common/noah/getHost?source=hiproxy-cli&envId=' + envid;
    var errmsg = 'hosts get failed, please check your network or the envid';
    var req = http.request(url, function (res) {
      var statusCode = res.statusCode;
      var body = '';

      if (statusCode >= 200 && statusCode < 400) {
        res.on('data', (chunk) => {
          body += chunk.toString();
        });
        res.on('end', () => {
          try {
            var json = JSON.parse(body);
            var data = json.data;
            var isOK = json.ret && data && Array.isArray(data.content) && data.content.length > 0;

            if (isOK) {
              resolve(data);
            } else {
              reject(json.errMsg);
            }
          } catch (e) {
            reject(e.message);
          }
        });
      } else {
        reject(errmsg);
      }
    });

    req.on('error', function (e) {
      reject(errmsg);
    });

    req.end();
  });
}
