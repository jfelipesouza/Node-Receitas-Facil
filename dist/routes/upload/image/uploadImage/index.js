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

// src/routes/upload/image/uploadImage/index.ts
var uploadImage_exports = {};
__export(uploadImage_exports, {
  uploadImage: () => uploadImage
});
module.exports = __toCommonJS(uploadImage_exports);

// src/services/database/prisma.ts
var import_client = require("@prisma/client");
var prismaClientDatabase = new import_client.PrismaClient();

// src/services/database/ImageTableUtils/index.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  uploadImage
});
