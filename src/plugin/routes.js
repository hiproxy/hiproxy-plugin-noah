/**
 * @file hiproxy routes
 * @author zdying
 */
'use strict';

var utils = require('../utils/');

module.exports = [
  {
    route: '/noah',
    render: function (route, request, response) {
      response.writeHead(302, {
        'Location': '/noah/'
      });

      response.end();
    }
  },
  {
    route: '/noah/',
    render: function (route, request, response) {
      response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });

      var noahData = global.hiproxy_data.noah;

      response.write('<h1>欢迎使用Noah插件</h1>');
      response.write('<div>当前ID:' + noahData.envid + '</div>');
      response.write('<div>当前Hosts:</div>');
      response.write('<pre style="background: lightgray; border-radius: 5px; padding: 10px;">' + noahData.hosts + '</pre>');
      response.end();
    }
  },
  {
    route: '/noah/api/set-env/(:id)',
    render: function (route, req, res) {
      var server = global.hiproxyServer;
      var logger = server.logger;

      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
      });

      if (!route.id) {
        logger.error('Invalid or empty envid query string.');
        res.end(JSON.stringify({
          status: 1,
          message: 'Invalid or empty envid query string'
        }));

        return;
      }

      utils.getHosts(route.id)
        .then(function (data) {
          var hosts = data.content.join('\n');
          utils.updateHosts(hosts, route.id);

          res.end(JSON.stringify({
            status: 0,
            route: route,
            hosts: hosts,
            message: null
          }));
        })
        .catch(function (msg) {
          res.end(JSON.stringify({
            status: 1,
            message: msg
          }));
        });
    }
  }
];
