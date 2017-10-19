/**
 * 根据envid获取hosts
 *
 * @param {any} envid Noah环境编号
 * @returns Promise
 */

var hiproxy = global.hiproxy;
var noahData = hiproxy.dataProvider.getData('noah');

module.exports = {
  getHosts: function (envid) {
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
                reject(json.errMsg || errmsg);
              }
            } catch (e) {
              reject(e.message || errmsg);
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
  },

  updateHosts: function (hosts, envid) {
    var server = global.hiproxyServer;
    var logger = server.logger;

    noahData.set('hosts', hosts);
    noahData.set('envid', envid);

    server.addRule('hosts', hosts.join('\n'));
    logger.debug('Noah envid: ' + envid);
    logger.debug('Noah hosts: ' + hosts);
  }
};
