'use strict';

var utils = require('../utils/writer.js');
var CallsByDuration = require('../service/CallsByDurationService');

module.exports.getCallsByDuration = function getCallsByDuration (req, res, next) {
  var service = req.swagger.params['Service'].value;
  var day = req.swagger.params['Day'].value;
  var country = req.swagger.params['Country'].value;
  var from = req.swagger.params['From'].value;
  var to = req.swagger.params['To'].value;
  var threshold = req.swagger.params['Threshold'].value;
  CallsByDuration.getCallsByDuration(service,day,country,from,to,threshold)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
