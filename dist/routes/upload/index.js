"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/upload/index.ts
var upload_exports = {};
__export(upload_exports, {
  uploadRouters: () => uploadRouters
});
module.exports = __toCommonJS(upload_exports);
var import_express = require("express");
var import_multer2 = __toESM(require("multer"));

// src/services/database/prisma.ts
var import_client = require("@prisma/client");
var prismaClientDatabase = new import_client.PrismaClient();

// src/services/database/ImageTableUtils/index.ts
var getImageById = async (id) => {
  try {
    const image = await prismaClientDatabase.image.findFirst({
      where: { id },
      select: { file: true, mimeType: true }
    });
    console.log(image);
    return image;
  } catch (e) {
    console.log(e);
  } finally {
    await prismaClientDatabase.$disconnect();
  }
};
var uploadImageDB = async ({ mimeType, originalName, file }) => {
  try {
    const image = await prismaClientDatabase.image.create({
      data: { file, originalName, mimeType }
    });
    console.log(image);
    return { image };
  } catch (e) {
    console.log(e);
  } finally {
    await prismaClientDatabase.$disconnect();
  }
};

// src/routes/upload/image/uploadImage/index.ts
var uploadImage = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: "Tipo de arquivo incorreto" });
  } else {
    const fileBase64 = Buffer.from(file.buffer).toString("base64");
    const originalName = file.originalname;
    const mimeType = file.mimetype;
    const imageUpload = await uploadImageDB({
      file: fileBase64,
      mimeType,
      originalName
    });
    if (imageUpload) {
      return res.status(200).send({ image: imageUpload.image });
    }
    return res.status(500).send({ message: "error" });
  }
};

// src/services/config/multer.ts
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

// src/routes/upload/index.ts
var uploadRouters = (0, import_express.Router)();
uploadRouters.post("/images", (0, import_multer2.default)(multerConfig).single("file"), uploadImage);
uploadRouters.get("/images", async (req, res) => {
  const { id } = await req.body;
  const image = await getImageById(id);
  return res.send({ image });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  uploadRouters
});
