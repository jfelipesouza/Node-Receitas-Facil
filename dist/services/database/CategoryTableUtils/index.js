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

// src/services/database/CategoryTableUtils/index.ts
var CategoryTableUtils_exports = {};
__export(CategoryTableUtils_exports, {
  createCategoryInDB: () => createCategoryInDB,
  getAllCategory: () => getAllCategory,
  getCategoryByName: () => getCategoryByName
});
module.exports = __toCommonJS(CategoryTableUtils_exports);

// src/services/database/prisma.ts
var import_client = require("@prisma/client");
var prismaClientDatabase = new import_client.PrismaClient();

// src/services/database/CategoryTableUtils/index.ts
var getAllCategory = async () => {
  try {
    const categories = await prismaClientDatabase.category.findMany({
      select: {
        id: true,
        name: true
      }
    });
    return categories;
  } catch (error) {
    console.log(error);
  } finally {
    await prismaClientDatabase.$disconnect();
  }
};
var getCategoryByName = async (name, allInformation = false) => {
  try {
    const categorie = await prismaClientDatabase.category.findFirst({
      where: {
        name
      },
      include: {
        revenues: allInformation
      }
    });
    return { categorie };
  } catch (error) {
    console.log(error);
  } finally {
    await prismaClientDatabase.$disconnect();
  }
};
var createCategoryInDB = async (name) => {
  try {
    const findCategory = await getCategoryByName(name, false);
    if (findCategory?.categorie) {
      return { message: "Categoria existente" };
    }
    const categorie = await prismaClientDatabase.category.create({
      data: {
        name
      }
    });
    return { categorie };
  } catch (error) {
    console.log(error);
  } finally {
    await prismaClientDatabase.$disconnect();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createCategoryInDB,
  getAllCategory,
  getCategoryByName
});
