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

// src/services/database/ImageTableUtils/index.ts
var ImageTableUtils_exports = {};
__export(ImageTableUtils_exports, {
  getImageById: () => getImageById,
  uploadImageDB: () => uploadImageDB
});
module.exports = __toCommonJS(ImageTableUtils_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getImageById,
  uploadImageDB
});
