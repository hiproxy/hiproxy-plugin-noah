/**
 * @file hiproxy routes
 * @author zdying
 */
'use strict';

var utils = require('../utils/');
var mustache = require('mustache');
var fs = require('fs');
var path = require('path');

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
      var noahData = global.hiproxy.dataProvider.getData('noah');
      var noah = noahData.get();
      var html = '';

      fs.readFile(path.join(__dirname, '..', 'views', 'noah.html'), 'utf-8', function (err, data) {
        if (err) {
          response.writeHead(500, {
            'Content-Type': 'text/html; charset=utf-8'
          });
          response.end('Page render error.');
        } else {
          response.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
          });

          html = mustache.render(data, noah);

          response.end(html);
        }
      });
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
          var hiproxyHosts = server.hosts;

          // 清空当前的hosts
          hiproxyHosts.clearFiles();
          // 更新为新环境的hosts
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