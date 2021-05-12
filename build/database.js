"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dbUrl = 'mongodb+srv://piUser:piPassword@cluster0.wmz1v.mongodb.net/restobar?retryWrites=true&w=majority';

_mongoose["default"].connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(function (db) {
  return console.log('Database is connected');
})["catch"](function (error) {
  return console.log(error);
});