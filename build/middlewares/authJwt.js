"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyWaiterToken = exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var verifyToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var token, decoded, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.headers['x-access-token'];

            if (token) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              message: 'No token provided'
            }));

          case 4:
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            _context.next = 7;
            return _User["default"].findById(decoded.id, {
              password: 0
            });

          case 7:
            user = _context.sent;

            if (user) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              message: 'User not found'
            }));

          case 10:
            next();
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(401).json({
              message: 'Authentication failed'
            }));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;

var verifyWaiterToken = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var token, decoded, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            token = req.headers['x-access-token'];

            if (token) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", res.status(403).json({
              message: 'No token provided'
            }));

          case 4:
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            _context2.next = 7;
            return _User["default"].findById(decoded.id, {
              password: 0
            });

          case 7:
            user = _context2.sent;

            if (user) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(403).json({
              message: 'User not found'
            }));

          case 10:
            if (user.isWaiter) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              message: 'Unauthorized: You are not a waiter'
            }));

          case 12:
            next();
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(401).json({
              message: 'Authentication failed'
            }));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 15]]);
  }));

  return function verifyWaiterToken(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.verifyWaiterToken = verifyWaiterToken;