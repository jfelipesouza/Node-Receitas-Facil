"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/config/multer.ts
var multer_exports = {};
__export(multer_exports, {
  multerConfig: () => multerConfig
});
module.exports = __toCommonJS(multer_exports);
var import_multer = require("multer");
var import_path = require("path");
var import_crypto = require("crypto");
var uploadDir = (0, import_path.resolve)(__dirname, "..", "..", "uploads");
var storage = {
  disk: (0, import_multer.diskStorage)({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      (0, import_crypto.randomBytes)(16, (err, hash) => {
        if (err)
          cb(err, err.message);
        file.key = `${hash.toString("hex")}-${file.originalname}`;
        cb(null, file.key);
      });
    }
  }),
  memory: (0, import_multer.memoryStorage)()
};
var multerConfig = {
  dest: uploadDir,
  storage: storage.disk,
  limits: {
    fileSize: 2 * 1024 * 1024
    // 2mb
  },
  fileFilter: (req, file, cb) => {
    const allowFormat = [
      "image/pjpeg",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg",
      "image/webp"
    ];
    if (allowFormat.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid type"));
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  multerConfig
});
