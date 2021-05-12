"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var tableSchema = new _mongoose.Schema({
  table_number: Number,
  need_waiter: {
    type: Boolean,
    "default": false
  }
}, {
  versionKey: false
});

var _default = (0, _mongoose.model)('Table', tableSchema);

exports["default"] = _default;