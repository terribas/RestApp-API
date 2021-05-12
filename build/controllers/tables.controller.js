"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTableById = exports.updateTableById = exports.createTable = exports.getTableById = exports.getTables = void 0;

var _Table = _interopRequireDefault(require("../models/Table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getTables = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var tables;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Table["default"].find();

          case 3:
            tables = _context.sent;
            res.json(tables);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(400).json({
              message: "An error occured"
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getTables(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getTables = getTables;

var getTableById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var table;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Product.findById(req.params.tableId);

          case 3:
            table = _context2.sent;
            res.status(201).json(table);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(400).json({
              message: "An error occured"
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getTableById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getTableById = getTableById;

var createTable = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var table_number, newTable, tableSaved;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            table_number = req.body.table_number;

            if (table_number) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              message: "Table number must be provided"
            }));

          case 4:
            newTable = new _Table["default"](req.body);
            _context3.next = 7;
            return newTable.save();

          case 7:
            tableSaved = _context3.sent;
            res.status(201).json(tableSaved);
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            res.status(400).json({
              message: "An error occured"
            });

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 11]]);
  }));

  return function createTable(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createTable = createTable;

var updateTableById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var updatedTable;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _Table["default"].findByIdAndUpdate(req.params.tableId, req.body, {
              "new": true
            });

          case 3:
            updatedTable = _context4.sent;
            res.status(204).json(updatedTable);
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            res.status(400).json({
              message: "An error occured"
            });

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function updateTableById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateTableById = updateTableById;

var deleteTableById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var deletedTable;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _Table["default"].findByIdAndDelete(req.params.tableId);

          case 3:
            deletedTable = _context5.sent;
            console.log(deletedTable);
            res.status(204).json();
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            res.status(400).json({
              message: "An error occured"
            });

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 8]]);
  }));

  return function deleteTableById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteTableById = deleteTableById;